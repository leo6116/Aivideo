import Anthropic from "@anthropic-ai/sdk";
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

const MODEL = "claude-sonnet-4-5";

export class AnthropicProvider implements AIProvider {
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async generateStoryboard(input: GenerateStoryboardInput): Promise<StoryboardResponse> {
    const system = buildStoryboardSystemPrompt(input);
    const userText = buildUserMessage(input);

    const content: Anthropic.MessageParam["content"] = [{ type: "text", text: userText }];

    if (input.imageBase64 && input.imageMediaType) {
      content.unshift({
        type: "image",
        source: {
          type: "base64",
          media_type: input.imageMediaType as "image/png" | "image/jpeg" | "image/webp",
          data: input.imageBase64,
        },
      });
    }

    const response = await this.client.messages.create({
      model: MODEL,
      max_tokens: 8000,
      system,
      messages: [{ role: "user", content }],
      tools: [
        {
          name: "emit_storyboard",
          description: "Return the generated storyboard in the required structured format.",
          input_schema: storyboardJsonSchema as unknown as Anthropic.Tool.InputSchema,
        },
      ],
      tool_choice: { type: "tool", name: "emit_storyboard" },
    });

    const toolUseBlock = response.content.find(
      (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
    );

    if (!toolUseBlock) {
      throw new Error("Anthropic response did not include structured tool output.");
    }

    return toolUseBlock.input as StoryboardResponse;
  }

  async regenerateSegment(input: RegenerateSegmentInput): Promise<RegeneratedSegment> {
    const system = buildSegmentSystemPrompt(input);

    const response = await this.client.messages.create({
      model: MODEL,
      max_tokens: 2000,
      system,
      messages: [{ role: "user", content: "Generate the segment now." }],
      tools: [
        {
          name: "emit_segment",
          description: "Return the regenerated segment in the required structured format.",
          input_schema: segmentJsonSchema as unknown as Anthropic.Tool.InputSchema,
        },
      ],
      tool_choice: { type: "tool", name: "emit_segment" },
    });

    const toolUseBlock = response.content.find(
      (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
    );

    if (!toolUseBlock) {
      throw new Error("Anthropic response did not include structured tool output.");
    }

    return toolUseBlock.input as RegeneratedSegment;
  }
}
