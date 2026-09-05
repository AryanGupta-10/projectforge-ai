import { describe, expect, it } from "vitest";
import { candidates } from "../lib/demo-data";
import { projectIdeaSchema } from "../lib/schemas";

describe("project idea persistence schema", () => {
  it("accepts a valid saved project", () => {
    expect(projectIdeaSchema.safeParse(candidates[0]).success).toBe(true);
  });

  it("rejects scores outside the public 0–100 scale", () => {
    expect(projectIdeaSchema.safeParse({ ...candidates[0], scores: { ...candidates[0].scores, feasibility: 101 } }).success).toBe(false);
  });
});
