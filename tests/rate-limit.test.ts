import { describe, expect, it } from "vitest";
import { consumeRateLimit } from "../lib/rate-limit";

describe("fixed-window AI rate limiter", () => {
  it("allows only the configured number of requests in a window", () => {
    const store = new Map();
    expect(consumeRateLimit(store, "student", { limit: 2, windowMs: 60_000, now: 100 })).toBe(true);
    expect(consumeRateLimit(store, "student", { limit: 2, windowMs: 60_000, now: 200 })).toBe(true);
    expect(consumeRateLimit(store, "student", { limit: 2, windowMs: 60_000, now: 300 })).toBe(false);
  });

  it("opens a new window after expiry", () => {
    const store = new Map();
    expect(consumeRateLimit(store, "student", { limit: 1, windowMs: 100, now: 100 })).toBe(true);
    expect(consumeRateLimit(store, "student", { limit: 1, windowMs: 100, now: 200 })).toBe(true);
  });
});
