"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES } from "@/lib/validation";
import { cn } from "@/lib/utils";

interface ImageDropzoneProps {
  onImageChange: (data: { base64: string; mediaType: string; previewUrl: string } | null) => void;
  error?: string | null;
}

export function ImageDropzone({ onImageChange, error }: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      setLocalError(null);
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setLocalError("Please upload a PNG, JPEG, or WebP image.");
        return;
      }
      if (file.size > MAX_IMAGE_BYTES) {
        setLocalError("Image must be smaller than 8MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(",")[1] ?? "";
        setPreview(result);
        onImageChange({ base64, mediaType: file.type, previewUrl: result });
      };
      reader.readAsDataURL(file);
    },
    [onImageChange]
  );

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function handleRemove() {
    setPreview(null);
    setLocalError(null);
    onImageChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  if (preview) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-border">
        <Image
          src={preview}
          alt="Reference upload preview"
          width={640}
          height={360}
          unoptimized
          className="h-48 w-full object-cover"
        />
        <button
          type="button"
          onClick={handleRemove}
          data-cursor="hover"
          className="absolute right-3 top-3 rounded-full bg-background/80 p-2 text-foreground backdrop-blur hover:text-accent"
          aria-label="Remove image"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        data-cursor="hover"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        className={cn(
          "flex h-48 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed transition-colors duration-200",
          dragActive ? "border-accent bg-accent/5" : "border-border bg-surface hover:border-accent/60"
        )}
      >
        <ImagePlus className="h-6 w-6 text-muted" />
        <p className="text-sm text-muted">
          Drag &amp; drop a reference image, or <span className="text-accent">browse</span>
        </p>
        <p className="text-xs text-muted/70">PNG, JPEG, or WebP · up to 8MB</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {(localError || error) && (
        <p className="mt-2 text-xs text-red-400">{localError || error}</p>
      )}
    </div>
  );
}
