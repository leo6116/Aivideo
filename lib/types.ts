export type AspectRatio = "9:16" | "16:9" | "1:1";

export type Tone =
  | "Cinematic"
  | "Energetic"
  | "Documentary"
  | "Luxury"
  | "Comedic";

export type Duration = 15 | 30 | 60;

export interface StoryboardSegment {
  index: number;
  startTime: number;
  endTime: number;
  sceneDescription: string;
  cameraTechniques: string[];
  videoPrompt: string;
}

export interface StoryboardResponse {
  title: string;
  logline: string;
  totalDuration: number;
  tone: string;
  aspectRatio: AspectRatio;
  segments: StoryboardSegment[];
}

export interface GenerateStoryboardInput {
  topic?: string;
  imageBase64?: string;
  imageMediaType?: string;
  duration: Duration;
  tone: Tone;
  aspectRatio: AspectRatio;
}

export interface StoryboardProject {
  id: string;
  createdAt: string;
  input: {
    topic?: string;
    duration: Duration;
    tone: Tone;
    aspectRatio: AspectRatio;
    hadImage: boolean;
  };
  storyboard: StoryboardResponse;
}

export interface RegenerateSegmentInput {
  projectTitle: string;
  tone: string;
  aspectRatio: AspectRatio;
  sceneDescription: string;
  startTime: number;
  endTime: number;
}

export type RegeneratedSegment = Pick<
  StoryboardSegment,
  "sceneDescription" | "cameraTechniques" | "videoPrompt"
>;

export interface AIProvider {
  generateStoryboard(input: GenerateStoryboardInput): Promise<StoryboardResponse>;
  regenerateSegment(input: RegenerateSegmentInput): Promise<RegeneratedSegment>;
}
