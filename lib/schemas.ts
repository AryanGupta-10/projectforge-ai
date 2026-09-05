import { z } from "zod";

export const projectIdeaSchema = z.object({
  id: z.string(),
  title: z.string(),
  problem: z.string(),
  targetUser: z.string(),
  solution: z.string(),
  aiRole: z.string(),
  differentiator: z.string(),
  technologies: z.array(z.string()),
  estimatedWeeks: z.string(),
  risk: z.string(),
  scores: z.object({
    originality: z.number().min(0).max(100),
    impact: z.number().min(0).max(100),
    aiNecessity: z.number().min(0).max(100),
    technicalDepth: z.number().min(0).max(100),
    feasibility: z.number().min(0).max(100),
    skillMatch: z.number().min(0).max(100),
    demoPotential: z.number().min(0).max(100),
    scopeRisk: z.number().min(0).max(100),
  }),
});

export type ProjectIdea = z.infer<typeof projectIdeaSchema>;
export type ScoreKey = keyof ProjectIdea["scores"];
