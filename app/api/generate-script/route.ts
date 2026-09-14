import { NextRequest, NextResponse } from "next/server";
import { generateRequestSchema } from "@/lib/validation";
import { generateStoryboard, MissingApiKeyError } from "@/lib/ai/client";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = generateRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request." },
      { status: 400 }
    );
  }

  try {
    const storyboard = await generateStoryboard(parsed.data);
    return NextResponse.json({ storyboard });
  } catch (err) {
    if (err instanceof MissingApiKeyError) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    console.error("generate-script error:", err);
    const message =
      err instanceof Error ? err.message : "Something went wrong while generating your storyboard.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
