import OpenAI from "openai";
import {
  buildSegmentSystemPrompt,
  buildStoryboardSystemPrompt,
  buildUserMessage,
} from "@/lib/prompts/storyboard-system-prompt";
import { storyboardJsonSchema } from "@/lib/ai/schema";
import { segmentJsonSchema } from "@/lib/ai/segment-schema";
import type {
  AIProvider,
  GenerateStoryboardInput,
  RegenerateSegmentInput,
  RegeneratedSegment,
  StoryboardResponse,
} from "@/lib/types";

const MODEL = "gpt-4o";

export class OpenAIProvider implements AIProvider {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async generateStoryboard(input: GenerateStoryboardInput): Promise<StoryboardResponse> {
    const system = buildStoryboardSystemPrompt(input);
    const userText = buildUserMessage(input);

    const userContent: OpenAI.Chat.Completions.ChatCompletionContentPart[] = [
      { type: "text", text: userText },
    ];

    if (input.imageBase64 && input.imageMediaType) {
      userContent.push({
        type: "image_url",
        image_url: { url: `data:${input.imageMediaType};base64,${input.imageBase64}` },
      });
    }

    const completion = await this.client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: userContent },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "storyboard",
          strict: true,
          schema: storyboardJsonSchema,
        },
      },
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      throw new Error("OpenAI response did not include structured JSON output.");
    }

    return JSON.parse(raw) as StoryboardResponse;
  }

  async regenerateSegment(input: RegenerateSegmentInput): Promise<RegeneratedSegment> {
    const system = buildSegmentSystemPrompt(input);

    const completion = await this.client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: "Generate the segment now." },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "segment",
          strict: true,
          schema: segmentJsonSchema,
        },
      },
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      throw new Error("OpenAI response did not include structured JSON output.");
    }

    return JSON.parse(raw) as RegeneratedSegment;
  }
}
