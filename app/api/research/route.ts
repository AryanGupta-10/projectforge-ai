import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const querySchema = z.string().trim().min(3).max(120);

const githubResultSchema = z.object({
  html_url: z.string().url(),
  full_name: z.string(),
  description: z.string().nullable(),
  stargazers_count: z.number().nonnegative(),
  updated_at: z.string().nullable(),
});

export async function GET(request: NextRequest) {
  const parsed = querySchema.safeParse(request.nextUrl.searchParams.get("query"));
  if (!parsed.success) return NextResponse.json({ error: "Enter a project topic of at least three characters." }, { status: 400 });

  try {
    const response = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(parsed.data)}&per_page=5&sort=updated`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "ProjectForge-AI-research",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) {
      const message = response.status === 403 ? "GitHub research is rate-limited. Add GITHUB_TOKEN or try again later." : "Research is temporarily unavailable.";
      return NextResponse.json({ error: message }, { status: response.status });
    }
    const payload: unknown = await response.json();
    const rows = z.object({ items: z.array(githubResultSchema) }).safeParse(payload);
    if (!rows.success) return NextResponse.json({ error: "Research returned an unexpected response." }, { status: 502 });
    return NextResponse.json({
      query: parsed.data,
      sources: rows.data.items.map((item) => ({
        title: item.full_name,
        url: item.html_url,
        description: item.description || "No repository description available.",
        stars: item.stargazers_count,
        updatedAt: item.updated_at,
        sourceType: "GitHub public repository",
      })),
      disclaimer: "These are discovery leads from GitHub search. ProjectForge does not infer feature overlap without reviewing the source content.",
    }, { headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600" } });
  } catch {
    return NextResponse.json({ error: "Research unavailable. Check your connection and try again." }, { status: 503 });
  }
}
