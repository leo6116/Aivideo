import type { GenerateStoryboardInput, RegenerateSegmentInput } from "@/lib/types";

const LOCALE_NAMES: Record<string, string> = {
  en: "English",
  vi: "Vietnamese",
  es: "Spanish",
  fr: "French",
};

function localeDisplayName(locale?: string): string {
  if (!locale) return "English";
  return LOCALE_NAMES[locale] ?? "English";
}

const CAMERA_GLOSSARY = `
CAMERA & SHOT VOCABULARY (use accurately and contextually — never randomly):
- Dolly In / Dolly Out: camera physically moves toward/away from the subject on a track.
- Tracking Shot (Follow Shot): camera moves alongside a moving subject, maintaining framing.
- Whip Pan: extremely fast horizontal pan creating a motion-blur transition — ideal for energetic cuts between beats.
- Crane Shot / Jib Shot: vertical/sweeping camera movement, often rising above the scene.
- Push-In: slow, subtle zoom/dolly toward the subject to build intensity or emotional focus.
- Pull-Out (Reveal): camera moves back to reveal wider context.
- Handheld: slightly shaky, naturalistic camera movement for urgency/realism.
- Static/Locked-Off Shot: no camera movement, for stability and calm, deliberate compositions.
- Pan / Tilt: horizontal / vertical camera rotation from a fixed point.
- Rack Focus: shifting focus from one subject/plane to another within the shot.
- Orbit Shot (Arc Shot): camera circles around the subject.
- POV Shot: camera represents a character's own viewpoint.
- Extreme Close-Up / Close-Up / Medium Shot / Wide Shot / Establishing Shot: standard framing/distance vocabulary.
- Dutch Angle (Canted Angle): deliberately tilted horizon for tension/disorientation.
- Aerial/Drone Shot: high overhead perspective.
- Slow Motion / Speed Ramp: deliberate frame-rate manipulation for emphasis.

You are not limited to this list — draw on your full professional cinematography knowledge — but every technique named in "cameraTechniques" must be applied purposefully to the beat it is attached to (e.g., a whip pan for a fast energetic transition, a slow push-in for an emotional reveal, a tracking shot for movement-heavy action, a static locked-off shot for calm/luxury pacing).
`.trim();

export function buildStoryboardSystemPrompt(input: GenerateStoryboardInput): string {
  const segmentCountHint = Math.max(3, Math.round(input.duration / 4));
  const narrativeLanguage = localeDisplayName(input.locale);

  return `
You are an award-winning film director, cinematographer, and short-form video editor who writes professional shot lists and prompts for AI video generation tools (Sora, Runway Gen-3, Kling, Luma, Veo, Pika) for a living. Your job is to turn a client's topic (and, if provided, a reference image) into a tightly-paced, timeline-broken-down storyboard with prompts that are immediately usable, with zero editing, in any AI video generator.

STEP 1 — INTERNAL DRAFTING (do not output this step, use it only to inform your final JSON):
${
  input.imageBase64
    ? "First, carefully study the attached reference image: identify the subject, setting, mood, lighting, color palette, and any implied narrative. Build the video's narrative arc around what you observe in the image, combined with the user's topic/instructions (if given)."
    : "First, mentally draft a short script and narrative arc for the given topic, tailored to the requested tone and target duration."
}
Think about a clear beginning (hook), middle (development), and end (payoff/CTA-like beat) appropriate for short-form video, matching the tone: "${input.tone}".

STEP 2 — TIMELINE BREAKDOWN:
Break your script into sequential timeline segments. Each segment MUST be between 3 and 5 seconds long (never shorter than 3s, never longer than 5s). The segment count should be approximately ${segmentCountHint} segments for a total duration of ${input.duration} seconds — segments' startTime/endTime must be contiguous and sum to totalDuration (the last segment may be trimmed slightly to fit exactly).

STEP 3 — CAMERA LANGUAGE:
${CAMERA_GLOSSARY}

STEP 4 — WRITING THE VIDEO PROMPTS (the most important step):
For every segment, write a "videoPrompt" value that is:
- Written ENTIRELY IN ENGLISH, regardless of the language of the user's input topic. This is non-negotiable.
- A single dense, vivid PARAGRAPH (not a bullet list, not numbered), written in the descriptive/imperative style typical of high-quality AI video generation prompts.
- Extremely detailed, explicitly including, where relevant: subject description, action/motion, the camera technique(s) and movement direction chosen for this beat, lens/framing details (e.g., "35mm lens, shallow depth of field"), lighting and mood (e.g., "golden hour backlighting, warm tones"), setting/environment detail, color palette, and pacing.
- Explicit about the aspect ratio/framing format, e.g. "shot in vertical 9:16 format" — the user's chosen aspect ratio is "${input.aspectRatio}".
- Consistent with the overall tone "${input.tone}" and with continuity from the previous segment (same subject/setting/wardrobe unless the narrative calls for a change).
- Immediately copy-paste ready — no placeholders, no brackets, no meta-commentary.

Scene descriptions, the title, and the logline should be written in natural, readable ${narrativeLanguage} (mirror the user's input topic language if it clearly differs from ${narrativeLanguage}) — but "videoPrompt" must ALWAYS be English per the rule above, regardless of ${narrativeLanguage}.

STEP 5 — OUTPUT:
Return ONLY structured data matching the required schema — no extra commentary, no markdown fences, no explanation outside the schema fields.
`.trim();
}

export function buildSegmentSystemPrompt(input: RegenerateSegmentInput): string {
  return `
You are an award-winning film director and cinematographer writing a single shot-list beat for the AI-generated video project "${input.projectTitle}" (tone: "${input.tone}", aspect ratio: "${input.aspectRatio}").

${CAMERA_GLOSSARY}

Rewrite this one segment, spanning ${input.startTime}s–${input.endTime}s, based on the scene description below. Keep continuity with the project's tone and aspect ratio.

Scene description to work from: "${input.sceneDescription}"

Requirements for your output:
- "sceneDescription": a short, human-readable summary of the beat (may refine the input description).
- "cameraTechniques": one or more purposefully-chosen camera techniques from the glossary (or professional equivalents).
- "videoPrompt": written ENTIRELY IN ENGLISH, a single dense vivid paragraph, extremely detailed (subject, action, camera technique/movement, lens/framing, lighting/mood, setting, color palette, pacing), explicitly mentioning the "${input.aspectRatio}" aspect ratio/framing, and immediately copy-paste ready for an AI video generator.

Return ONLY structured data matching the required schema — no extra commentary.
`.trim();
}

export function buildUserMessage(input: GenerateStoryboardInput): string {
  const parts: string[] = [];
  parts.push(`Narrative language (title/logline/scene descriptions): ${localeDisplayName(input.locale)}`);
  parts.push(`Target duration: ${input.duration} seconds`);
  parts.push(`Tone/style: ${input.tone}`);
  parts.push(`Aspect ratio: ${input.aspectRatio}`);
  if (input.topic && input.topic.trim().length > 0) {
    parts.push(`Topic / idea: ${input.topic.trim()}`);
  }
  if (input.imageBase64) {
    parts.push(
      "A reference image is attached. Ground the narrative in what you observe in it (subject, setting, mood, lighting, colors)."
    );
  }
  return parts.join("\n");
}
