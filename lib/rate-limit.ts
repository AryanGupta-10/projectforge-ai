export type RateLimitBucket = { count: number; resetAt: number };

type RateLimitOptions = { limit: number; windowMs: number; now?: number; maxEntries?: number };

/** A bounded, dependency-free fixed-window guard for server routes. */
export function consumeRateLimit(store: Map<string, RateLimitBucket>, key: string, options: RateLimitOptions) {
  const now = options.now ?? Date.now();
  const maxEntries = options.maxEntries ?? 2_000;

  if (store.size >= maxEntries) {
    for (const [candidate, bucket] of store) {
      if (bucket.resetAt <= now) store.delete(candidate);
    }
  }

  const existing = store.get(key);
  if (!existing || existing.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + options.windowMs });
    return true;
  }
  if (existing.count >= options.limit) return false;
  existing.count += 1;
  return true;
}
