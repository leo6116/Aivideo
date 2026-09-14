import { NextRequest, NextResponse } from "next/server";
import { regenerateSegmentRequestSchema } from "@/lib/validation";
import { regenerateSegment, MissingApiKeyError } from "@/lib/ai/client";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = regenerateSegmentRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request." },
      { status: 400 }
    );
  }

  try {
    const segment = await regenerateSegment(parsed.data);
    return NextResponse.json({ segment });
  } catch (err) {
    if (err instanceof MissingApiKeyError) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    console.error("regenerate-segment error:", err);
    const message = err instanceof Error ? err.message : "Something went wrong while regenerating this segment.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
