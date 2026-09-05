import { describe, expect, it } from "vitest";
import { candidates } from "../lib/demo-data";
import { mutateProject, overallScore } from "../lib/scoring";

describe("Project DNA scoring", () => {
  it("keeps the score within the public 0–100 range", () => {
    expect(overallScore(candidates[0])).toBeGreaterThanOrEqual(0);
    expect(overallScore(candidates[0])).toBeLessThanOrEqual(100);
  });

  it("creates a distinct, reduced-scope version without changing V1", () => {
    const v1 = candidates[0];
    const v2 = mutateProject(v1, "scope");
    expect(v2).not.toBe(v1);
    expect(v2.scores.scopeRisk).toBeLessThan(v1.scores.scopeRisk);
    expect(v1.title).not.toContain("v2");
  });
});
