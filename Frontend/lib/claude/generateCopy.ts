import { z } from "zod";

const requestSchema = z.object({
  productDescription: z.string().min(5).max(300),
  targetAudience: z.string().min(3).max(200),
  tone: z.enum(["bold", "professional", "warm", "playful"]),
  templateName: z.string(),
  templateStyle: z.string(),
  templateCategory: z.string(),
});

const responseSchema = z.object({
  headline: z.string().max(80),
  subheadline: z.string().max(160),
  ctaText: z.string().max(30),
  features: z.array(z.object({ title: z.string(), description: z.string() })).length(3),
  footerText: z.string().max(120),
});

export async function generateCopy(input: z.infer<typeof requestSchema>) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENROUTER_API_KEY");
  }
  const toneMap = {
    bold: "Bold and direct",
    professional: "Professional and clean",
    warm: "Warm and friendly",
    playful: "Playful and creative",
  } as const;

  const system = `You generate conversion-focused landing page copy for ${input.templateName}. Visual personality: ${input.templateStyle}. Category: ${input.templateCategory}. Tone: ${toneMap[input.tone]}. Return strict JSON only.`;
  const user = `Generate landing page copy for: ${input.productDescription}. Target audience: ${input.targetAudience}. Return ONLY JSON with { headline, subheadline, ctaText, features: [{title,description},{title,description},{title,description}], footerText }.`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-20b:free",
      temperature: 0.7,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("OpenRouter request failed");
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = payload.choices?.[0]?.message?.content;
  if (!content) throw new Error("No text response");

  const parsed = responseSchema.parse(JSON.parse(content));
  return parsed;
}

export { requestSchema };
