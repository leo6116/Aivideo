"use client";

import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Textarea } from "@/components/ui/Textarea";
import { ChoiceGroup } from "@/components/ui/ChoiceGroup";
import { Button } from "@/components/ui/Button";
import { ImageDropzone } from "@/components/generate/ImageDropzone";
import { makeGenerateFormSchema, type GenerateFormValues } from "@/lib/validation";
import type { AspectRatio, Duration, Tone } from "@/lib/types";

interface InputPanelProps {
  onSubmit: (values: GenerateFormValues) => void;
  submitting: boolean;
}

export function InputPanel({ onSubmit, submitting }: InputPanelProps) {
  const t = useTranslations("generate");

  const DURATIONS: { value: Duration; label: string }[] = [
    { value: 15, label: "15s" },
    { value: 30, label: "30s" },
    { value: 60, label: "60s" },
  ];

  const TONES: { value: Tone; label: string }[] = [
    { value: "Cinematic", label: t("toneCinematic") },
    { value: "Energetic", label: t("toneEnergetic") },
    { value: "Documentary", label: t("toneDocumentary") },
    { value: "Luxury", label: t("toneLuxury") },
    { value: "Comedic", label: t("toneComedic") },
  ];

  const ASPECT_RATIOS: { value: AspectRatio; label: string }[] = [
    { value: "9:16", label: t("aspectVertical") },
    { value: "16:9", label: t("aspectHorizontal") },
    { value: "1:1", label: t("aspectSquare") },
  ];

  const schema = useMemo(
    () =>
      makeGenerateFormSchema({
        topicMax: t("topicMaxError"),
        topicRequired: t("topicRequiredError"),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GenerateFormValues>({
    resolver: zodResolver(schema),
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
          {t("describeIdea")}
        </label>
        <Textarea
          id="topic"
          rows={5}
          placeholder={t("topicPlaceholder")}
          maxLength={1200}
          {...register("topic")}
        />
        <div className="mt-2 flex items-center justify-between text-xs text-muted">
          <span>{errors.topic?.message}</span>
          <span>{t("charCount", { count: (topic ?? "").length, max: 1200 })}</span>
        </div>
      </div>

      <div>
        <label className="mb-3 block text-xs font-medium uppercase tracking-widest text-muted">
          {t("referenceImage")}
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
          <ChoiceGroup label={t("targetDuration")} options={DURATIONS} value={field.value} onChange={field.onChange} />
        )}
      />

      <Controller
        control={control}
        name="tone"
        render={({ field }) => (
          <ChoiceGroup label={t("toneStyle")} options={TONES} value={field.value} onChange={field.onChange} />
        )}
      />

      <Controller
        control={control}
        name="aspectRatio"
        render={({ field }) => (
          <ChoiceGroup
            label={t("aspectRatio")}
            options={ASPECT_RATIOS}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Button type="submit" size="lg" magnetic disabled={submitting} className="w-full sm:w-auto">
        {submitting ? t("generatingButton") : t("generateButton")}
        {!submitting && <ArrowRight className="h-4 w-4" />}
      </Button>
    </form>
  );
}
