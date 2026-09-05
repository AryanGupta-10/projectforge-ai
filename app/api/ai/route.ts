import { NextRequest, NextResponse } from "next/server";
import { aiRequestSchema, buildAiPrompt, extractGeminiText } from "@/lib/ai-utils";

const requestWindow = new Map<string, { count: number; resetAt: number }>();
const REQUEST_LIMIT = 12;
const WINDOW_MS = 60_000;

function underRateLimit(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
  const now = Date.now(); const existing = requestWindow.get(ip);
  if (!existing || existing.resetAt < now) { requestWindow.set(ip, { count: 1, resetAt: now + WINDOW_MS }); return true; }
  if (existing.count >= REQUEST_LIMIT) return false;
  existing.count += 1; return true;
}

export async function POST(request: NextRequest) {
  if (!underRateLimit(request)) return NextResponse.json({ error: "Too many AI requests. Please wait one minute and try again." }, { status: 429 });
  const parsed = aiRequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please add a project question of at least four characters." }, { status: 400 });
  if (!process.env.GEMINI_API_KEY) return NextResponse.json({ error: "AI is not configured yet. Add GEMINI_API_KEY in Vercel environment variables, then redeploy." }, { status: 503 });
  const prompt = buildAiPrompt(parsed.data);
  try {
    const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.55, maxOutputTokens: 1800 } }),
    });
    if (!response.ok) return NextResponse.json({ error: "Gemini could not complete this request. Check GEMINI_MODEL, your API key, and quota." }, { status: 502 });
    const data: unknown = await response.json();
    const reply = extractGeminiText(data);
    if (!reply) return NextResponse.json({ error: "Gemini returned no usable text. Please try again." }, { status: 502 });
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "AI is temporarily unavailable. Please try again." }, { status: 503 });
  }
}
