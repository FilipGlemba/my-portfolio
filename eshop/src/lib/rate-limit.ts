const tokensPerInterval = 10;
const interval = 60_000;

const store = new Map<string, { remaining: number; reset: number }>();

export function rateLimit(key: string) {
  const now = Date.now();
  const entry = store.get(key) ?? { remaining: tokensPerInterval, reset: now + interval };

  if (entry.reset <= now) {
    entry.remaining = tokensPerInterval;
    entry.reset = now + interval;
  }

  entry.remaining -= 1;
  store.set(key, entry);

  return {
    success: entry.remaining >= 0,
    remaining: entry.remaining,
    reset: entry.reset,
  };
}
