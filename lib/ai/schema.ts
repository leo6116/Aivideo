// Shared JSON schema for the storyboard structured output, used by both the
// Anthropic tool-use call and the OpenAI json_schema response format.
export const storyboardJsonSchema = {
  type: "object",
  properties: {
    title: { type: "string", description: "Short, punchy title for the video project." },
    logline: { type: "string", description: "One-paragraph synopsis of the video's narrative arc." },
    totalDuration: { type: "number", description: "Total duration in seconds, matching the requested duration." },
    tone: { type: "string", description: "The tone/style used for the video." },
    aspectRatio: { type: "string", enum: ["9:16", "16:9", "1:1"] },
    segments: {
      type: "array",
      items: {
        type: "object",
        properties: {
          index: { type: "number", description: "Zero-based segment index." },
          startTime: { type: "number", description: "Segment start time in seconds." },
          endTime: { type: "number", description: "Segment end time in seconds." },
          sceneDescription: { type: "string", description: "Short human-readable summary of the beat." },
          cameraTechniques: {
            type: "array",
            items: { type: "string" },
            description: "One or more camera techniques used in this segment.",
          },
          videoPrompt: {
            type: "string",
            description:
              "The full, extremely detailed, English-only, copy-paste-ready AI video generation prompt for this segment, written as a single dense paragraph.",
          },
        },
        required: [
          "index",
          "startTime",
          "endTime",
          "sceneDescription",
          "cameraTechniques",
          "videoPrompt",
        ],
        additionalProperties: false,
      },
    },
  },
  required: ["title", "logline", "totalDuration", "tone", "aspectRatio", "segments"],
  additionalProperties: false,
} as const;
