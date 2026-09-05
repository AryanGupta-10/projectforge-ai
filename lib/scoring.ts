import type { ProjectIdea, ScoreKey } from "./schemas";

const positive: ScoreKey[] = ["originality", "impact", "aiNecessity", "technicalDepth", "feasibility", "skillMatch", "demoPotential"];
const weights: Record<ScoreKey, number> = { originality: .18, impact: .14, aiNecessity: .14, technicalDepth: .14, feasibility: .17, skillMatch: .11, demoPotential: .12, scopeRisk: 0 };

export function overallScore(project: ProjectIdea) {
  const weighted = positive.reduce((total, key) => total + project.scores[key] * weights[key], 0);
  const riskPenalty = Math.max(0, (project.scores.scopeRisk - 35) * .10);
  return Math.round(Math.max(0, Math.min(100, weighted - riskPenalty)));
}

export function confidenceFor(project: ProjectIdea) {
  const signals = [project.scores.feasibility, project.scores.skillMatch, project.scores.technicalDepth];
  return Math.round(signals.reduce((a, b) => a + b, 0) / signals.length);
}

export function mutateProject(project: ProjectIdea, action: string): ProjectIdea {
  const changes: Record<string, Partial<ProjectIdea["scores"]>> = {
    originality: { originality: 10, demoPotential: 4, scopeRisk: -3 },
    scope: { feasibility: 12, scopeRisk: -18, skillMatch: 4, technicalDepth: -3 },
    ai: { aiNecessity: 11, technicalDepth: 4, feasibility: -2 },
    depth: { technicalDepth: 10, demoPotential: 4, feasibility: -5, scopeRisk: 5 },
    value: { impact: 8, originality: 3, demoPotential: 5 },
    demo: { demoPotential: 10, feasibility: 4, scopeRisk: -5 },
    cost: { feasibility: 7, scopeRisk: -4, technicalDepth: -2 },
    complexity: { feasibility: 9, skillMatch: 5, scopeRisk: -12, technicalDepth: -4 },
  };
  const delta = changes[action] ?? {};
  const scores = { ...project.scores };
  (Object.keys(delta) as ScoreKey[]).forEach((key) => {
    scores[key] = Math.max(0, Math.min(100, scores[key] + (delta[key] ?? 0)));
  });
  const labels: Record<string, string> = { originality: "with a clinician-approved evidence trail", scope: "with a focused medication-first MVP", ai: "with a constrained source-grounded AI pipeline", depth: "with audit-ready decision logging", value: "for care-team handoffs", demo: "with a measurable 72-hour journey", cost: "with lower-cost managed services", complexity: "with a smaller and safer core" };
  return { ...project, title: project.title.replace(" — ", " v2 — "), differentiator: `${project.differentiator} The v2 is refined ${labels[action] ?? "for the stated constraints"}.`, scores };
}
