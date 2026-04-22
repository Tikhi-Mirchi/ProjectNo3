import { NextResponse } from "next/server";
import { z } from "zod";
import { generateCopy, requestSchema } from "@/lib/claude/generateCopy";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request", details: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const copy = await generateCopy(parsed.data);
    return NextResponse.json(copy);
  } catch {
    return NextResponse.json({ error: "Claude parsing failed" }, { status: 422 });
  }
}
