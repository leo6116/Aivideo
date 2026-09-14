import { regeneratedSegmentSchema, storyboardResponseSchema } from "@/lib/validation";
import type {
  AIProvider,
  GenerateStoryboardInput,
  RegenerateSegmentInput,
  RegeneratedSegment,
  StoryboardResponse,
} from "@/lib/types";

export class MissingApiKeyError extends Error {
  constructor(provider: string, envVar: string) {
    super(
      `${provider} is selected as the AI provider but ${envVar} is not set. Add it to your .env.local file (see .env.example).`
    );
    this.name = "MissingApiKeyError";
  }
}

async function resolveProvider(): Promise<AIProvider> {
  const providerName = (process.env.AI_PROVIDER || "anthropic").toLowerCase();

  if (providerName === "openai") {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new MissingApiKeyError("OpenAI", "OPENAI_API_KEY");
    const { OpenAIProvider } = await import("@/lib/ai/providers/openai");
    return new OpenAIProvider(apiKey);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new MissingApiKeyError("Anthropic", "ANTHROPIC_API_KEY");
  const { AnthropicProvider } = await import("@/lib/ai/providers/anthropic");
  return new AnthropicProvider(apiKey);
}

function normalizeSegmentTiming(storyboard: StoryboardResponse): StoryboardResponse {
  let cursor = 0;
  const segments = storyboard.segments.map((segment, i) => {
    const length = Math.max(3, Math.min(5, segment.endTime - segment.startTime || 4));
    const startTime = cursor;
    const endTime = i === storyboard.segments.length - 1 ? Math.max(startTime + length, startTime + 1) : startTime + length;
    cursor = endTime;
    return { ...segment, index: i, startTime, endTime };
  });
  return { ...storyboard, segments, totalDuration: cursor };
}

export async function generateStoryboard(
  input: GenerateStoryboardInput
): Promise<StoryboardResponse> {
  const provider = await resolveProvider();

  let lastError: unknown;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const raw = await provider.generateStoryboard(input);
      const parsed = storyboardResponseSchema.safeParse(raw);
      if (parsed.success) {
        return normalizeSegmentTiming(parsed.data);
      }
      lastError = parsed.error;
    } catch (err) {
      lastError = err;
      if (err instanceof MissingApiKeyError) throw err;
    }
  }

  console.error("Storyboard generation failed after retry:", lastError);
  throw new Error(
    "The AI provider returned a response that didn't match the expected storyboard format after a retry. Please try again."
  );
}

export async function regenerateSegment(
  input: RegenerateSegmentInput
): Promise<RegeneratedSegment> {
  const provider = await resolveProvider();

  let lastError: unknown;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const raw = await provider.regenerateSegment(input);
      const parsed = regeneratedSegmentSchema.safeParse(raw);
      if (parsed.success) {
        return parsed.data;
      }
      lastError = parsed.error;
    } catch (err) {
      lastError = err;
      if (err instanceof MissingApiKeyError) throw err;
    }
  }

  console.error("Segment regeneration failed after retry:", lastError);
  throw new Error(
    "The AI provider returned a response that didn't match the expected segment format after a retry. Please try again."
  );
}
