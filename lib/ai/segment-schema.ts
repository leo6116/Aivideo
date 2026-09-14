export const segmentJsonSchema = {
  type: "object",
  properties: {
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
  required: ["sceneDescription", "cameraTechniques", "videoPrompt"],
  additionalProperties: false,
} as const;
