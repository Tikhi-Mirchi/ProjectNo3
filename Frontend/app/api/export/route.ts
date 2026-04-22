import { NextResponse } from "next/server";
import { z } from "zod";
import { buildTemplateZip } from "@/lib/export/buildZip";

const schema = z.object({
  templateId: z.string().min(1),
  userId: z.string().optional(),
  settings: z.any(),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const buffer = await buildTemplateZip(parsed.data.templateId, parsed.data.settings);
  const body = new Uint8Array(buffer);
  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename=template-${parsed.data.templateId}-${Date.now()}.zip`,
    },
  });
}
