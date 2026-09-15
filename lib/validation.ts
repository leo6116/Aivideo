import { z } from "zod";

export const aspectRatioSchema = z.enum(["9:16", "16:9", "1:1"]);
export const toneSchema = z.enum([
  "Cinematic",
  "Energetic",
  "Documentary",
  "Luxury",
  "Comedic",
]);
export const durationSchema = z.union([z.literal(15), z.literal(30), z.literal(60)]);

export const storyboardSegmentSchema = z.object({
  index: z.number().int().nonnegative(),
  startTime: z.number().nonnegative(),
  endTime: z.number().positive(),
  sceneDescription: z.string().min(1),
  cameraTechniques: z.array(z.string().min(1)).min(1),
  videoPrompt: z.string().min(1),
});

export const storyboardResponseSchema = z.object({
  title: z.string().min(1),
  logline: z.string().min(1),
  totalDuration: z.number().positive(),
  tone: z.string().min(1),
  aspectRatio: aspectRatioSchema,
  segments: z.array(storyboardSegmentSchema).min(1),
});

export const MAX_TOPIC_LENGTH = 1200;
export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

function buildGenerateFormSchema(messages: { topicMax: string; topicRequired: string }) {
  return z
    .object({
      topic: z.string().max(MAX_TOPIC_LENGTH, messages.topicMax).optional(),
      imageBase64: z.string().optional(),
      imageMediaType: z.string().optional(),
      duration: durationSchema,
      tone: toneSchema,
      aspectRatio: aspectRatioSchema,
      locale: z.string().optional(),
    })
    .refine((data) => (data.topic && data.topic.trim().length > 0) || !!data.imageBase64, {
      message: messages.topicRequired,
      path: ["topic"],
    });
}

export const generateFormSchema = buildGenerateFormSchema({
  topicMax: "Keep your topic under 1200 characters.",
  topicRequired: "Add a topic description or upload a reference image to continue.",
});

export function makeGenerateFormSchema(messages: { topicMax: string; topicRequired: string }) {
  return buildGenerateFormSchema(messages);
}

export type GenerateFormValues = z.infer<typeof generateFormSchema>;

export const generateRequestSchema = generateFormSchema;

export const regeneratedSegmentSchema = z.object({
  sceneDescription: z.string().min(1),
  cameraTechniques: z.array(z.string().min(1)).min(1),
  videoPrompt: z.string().min(1),
});

export const regenerateSegmentRequestSchema = z.object({
  projectTitle: z.string().min(1),
  tone: z.string().min(1),
  aspectRatio: aspectRatioSchema,
  sceneDescription: z.string().min(1),
  startTime: z.number().nonnegative(),
  endTime: z.number().positive(),
});
