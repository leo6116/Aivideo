# SceneForge AI

An AI-powered web app that turns a single topic or reference image into a fully
structured video script, automatically broken into 3–5 second timeline segments,
with each segment translated into an ultra-detailed, cinematic, copy-paste-ready
English prompt for AI video generation tools (Sora, Runway, Kling, Luma, Veo, Pika).

## Getting started

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local` and set `AI_PROVIDER` to either `anthropic` or `openai`, then
supply the matching API key:

```bash
AI_PROVIDER=anthropic        # or "openai"
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
```

Only the key matching your selected `AI_PROVIDER` is required. If it's missing,
the app shows a friendly in-UI error instead of crashing.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint

## Project structure

```
app/
  page.tsx                     landing page
  generate/page.tsx            core generator screen (input → loading → timeline)
  history/page.tsx             locally-saved projects
  api/
    generate-script/route.ts   full storyboard generation (Node runtime)
    regenerate-segment/route.ts regenerate a single segment
components/
  layout/                      navbar, footer, custom cursor, smooth scroll, page transitions
  landing/                     hero, marquee, how-it-works, feature grid, preview showcase
  generate/                    input panel, image dropzone, loader, timeline, segment cards
  ui/                          shared primitives (Button, Badge, Textarea, ChoiceGroup, Toast, TextReveal)
lib/
  ai/                          provider-agnostic AI client + Anthropic/OpenAI implementations
  prompts/                     the storyboard & segment system prompts
  types.ts / validation.ts     shared types and zod schemas
  storage.ts                   localStorage-backed project repository
store/
  useGeneratorStore.ts         zustand store for generation state
```

## How generation works

1. The user submits a topic and/or reference image, target duration, tone, and
   aspect ratio from `/generate`.
2. `app/api/generate-script/route.ts` validates the request, then calls
   `lib/ai/client.ts`, which picks the Anthropic or OpenAI provider based on
   `AI_PROVIDER` and requests **structured output** (Anthropic tool-use /
   OpenAI `json_schema`) matching the `StoryboardResponse` shape in `lib/types.ts`.
3. The response is validated against a Zod schema; on a mismatch, one retry is
   attempted before surfacing a friendly error.
4. The client renders the result as a timeline of segment cards, each with
   camera-technique badges and a full, English, copy-paste-ready prompt.
5. The finished project is saved to `localStorage` via `lib/storage.ts` and
   appears on `/history`.

## Notes

- Built with Next.js 16 (App Router, Turbopack) and Tailwind CSS v4 — design
  tokens live in `app/globals.css` under `@theme`.
- Both AI provider calls run server-side only (Node runtime); no API keys are
  ever exposed to the client.
- Persistence is client-side (`localStorage`) for this MVP; `lib/storage.ts`
  is written as a small repository so it could be swapped for a real database
  later without touching the UI.
