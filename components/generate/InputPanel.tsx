"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { Textarea } from "@/components/ui/Textarea";
import { ChoiceGroup } from "@/components/ui/ChoiceGroup";
import { Button } from "@/components/ui/Button";
import { ImageDropzone } from "@/components/generate/ImageDropzone";
import { generateFormSchema, type GenerateFormValues } from "@/lib/validation";
import type { AspectRatio, Duration, Tone } from "@/lib/types";

interface InputPanelProps {
  onSubmit: (values: GenerateFormValues) => void;
  submitting: boolean;
}

const DURATIONS: { value: Duration; label: string }[] = [
  { value: 15, label: "15s" },
  { value: 30, label: "30s" },
  { value: 60, label: "60s" },
];

const TONES: { value: Tone; label: string }[] = [
  { value: "Cinematic", label: "Cinematic" },
  { value: "Energetic", label: "Energetic / Fast-cut" },
  { value: "Documentary", label: "Documentary" },
  { value: "Luxury", label: "Luxury / Slow" },
  { value: "Comedic", label: "Comedic" },
];

const ASPECT_RATIOS: { value: AspectRatio; label: string }[] = [
  { value: "9:16", label: "9:16 Vertical" },
  { value: "16:9", label: "16:9 Horizontal" },
  { value: "1:1", label: "1:1 Square" },
];

export function InputPanel({ onSubmit, submitting }: InputPanelProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GenerateFormValues>({
    resolver: zodResolver(generateFormSchema),
    defaultValues: {
      topic: "",
      duration: 30,
      tone: "Cinematic",
      aspectRatio: "9:16",
    },
  });

  const topic = watch("topic");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <div>
        <label htmlFor="topic" className="mb-3 block text-xs font-medium uppercase tracking-widest text-muted">
          Describe your idea
        </label>
        <Textarea
          id="topic"
          rows={5}
          placeholder="A cinematic morning routine video for a fitness influencer, energetic and motivational tone..."
          maxLength={1200}
          {...register("topic")}
        />
        <div className="mt-2 flex items-center justify-between text-xs text-muted">
          <span>{errors.topic?.message}</span>
          <span>{(topic ?? "").length}/1200</span>
        </div>
      </div>

      <div>
        <label className="mb-3 block text-xs font-medium uppercase tracking-widest text-muted">
          Reference image (optional)
        </label>
        <ImageDropzone
          onImageChange={(data) => {
            setValue("imageBase64", data?.base64 ?? undefined);
            setValue("imageMediaType", data?.mediaType ?? undefined);
          }}
        />
      </div>

      <Controller
        control={control}
        name="duration"
        render={({ field }) => (
          <ChoiceGroup label="Target duration" options={DURATIONS} value={field.value} onChange={field.onChange} />
        )}
      />

      <Controller
        control={control}
        name="tone"
        render={({ field }) => (
          <ChoiceGroup label="Tone / style" options={TONES} value={field.value} onChange={field.onChange} />
        )}
      />

      <Controller
        control={control}
        name="aspectRatio"
        render={({ field }) => (
          <ChoiceGroup
            label="Aspect ratio"
            options={ASPECT_RATIOS}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Button type="submit" size="lg" magnetic disabled={submitting} className="w-full sm:w-auto">
        {submitting ? "Generating…" : "Generate Storyboard"}
        {!submitting && <ArrowRight className="h-4 w-4" />}
      </Button>
    </form>
  );
}
