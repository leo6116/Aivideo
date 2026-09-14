import { create } from "zustand";
import type { AspectRatio, Duration, StoryboardResponse, Tone } from "@/lib/types";

export type GenerationStatus = "idle" | "loading" | "success" | "error";

interface GeneratorState {
  status: GenerationStatus;
  errorMessage: string | null;
  storyboard: StoryboardResponse | null;
  lastInput: {
    topic?: string;
    duration: Duration;
    tone: Tone;
    aspectRatio: AspectRatio;
    hadImage: boolean;
  } | null;
  startGenerating: (input: GeneratorState["lastInput"]) => void;
  setSuccess: (storyboard: StoryboardResponse) => void;
  setError: (message: string) => void;
  reset: () => void;
  loadStoryboard: (storyboard: StoryboardResponse, input: GeneratorState["lastInput"]) => void;
  updateSegment: (index: number, patch: Partial<StoryboardResponse["segments"][number]>) => void;
}

export const useGeneratorStore = create<GeneratorState>((set) => ({
  status: "idle",
  errorMessage: null,
  storyboard: null,
  lastInput: null,
  startGenerating: (input) =>
    set({ status: "loading", errorMessage: null, storyboard: null, lastInput: input }),
  setSuccess: (storyboard) => set({ status: "success", storyboard, errorMessage: null }),
  setError: (message) => set({ status: "error", errorMessage: message }),
  reset: () => set({ status: "idle", errorMessage: null, storyboard: null, lastInput: null }),
  loadStoryboard: (storyboard, input) =>
    set({ status: "success", storyboard, lastInput: input, errorMessage: null }),
  updateSegment: (index, patch) =>
    set((state) => {
      if (!state.storyboard) return state;
      const segments = state.storyboard.segments.map((seg) =>
        seg.index === index ? { ...seg, ...patch } : seg
      );
      return { storyboard: { ...state.storyboard, segments } };
    }),
}));
