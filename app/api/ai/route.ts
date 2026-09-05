import { NextRequest, NextResponse } from "next/server";
import { aiRequestSchema, buildAiPrompt, extractGeminiText } from "@/lib/ai-utils";
import { consumeRateLimit } from "@/lib/rate-limit";

const requestWindow = new Map<string, { count: number; resetAt: number }>();
const REQUEST_LIMIT = 12;
const WINDOW_MS = 60_000;

function underRateLimit(request: NextRequest) {
  const ip = request.headers.get("x-vercel-forwarded-for") || request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
  return consumeRateLimit(requestWindow, ip, { limit: REQUEST_LIMIT, windowMs: WINDOW_MS });
}

export async function POST(request: NextRequest) {
  if (!underRateLimit(request)) return NextResponse.json({ error: "Too many AI requests. Please wait one minute and try again." }, { status: 429, headers: { "Cache-Control": "no-store" } });
  const parsed = aiRequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please add a project question of at least four characters." }, { status: 400, headers: { "Cache-Control": "no-store" } });
  if (!process.env.GEMINI_API_KEY) return NextResponse.json({ error: "AI is not configured yet. Add GEMINI_API_KEY in Vercel environment variables, then redeploy." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  const prompt = buildAiPrompt(parsed.data);
  try {
    // Gemini 2.0 Flash was retired. Keep the model current and keep credentials out of URLs and logs.
    const model = "gemini-3.8-flash";
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY }, signal: AbortSignal.timeout(25_000), body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.55, maxOutputTokens: 1800 } }),
    });
    if (!response.ok) {
      const error = response.status === 401 || response.status === 403
        ? "Gemini rejected the server credential. Create a fresh Gemini API key in Google AI Studio, then update GEMINI_API_KEY in Vercel."
        : response.status === 429
          ? "Gemini quota is temporarily exhausted. Please wait a minute and try again."
          : "Gemini could not complete this request. Please try again shortly.";
      return NextResponse.json({ error }, { status: 502, headers: { "Cache-Control": "no-store" } });
    }
    const data: unknown = await response.json();
    const reply = extractGeminiText(data);
    if (!reply) return NextResponse.json({ error: "Gemini returned no usable text. Please try again." }, { status: 502, headers: { "Cache-Control": "no-store" } });
    return NextResponse.json({ reply }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "AI is temporarily unavailable. Please try again." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
