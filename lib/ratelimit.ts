import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Sliding-window rate limiter backed by Upstash Redis.
 * Gracefully disabled (always allows) when Upstash env vars are absent,
 * so local dev works without credentials.
 */
const hasUpstash =
  !!process.env.UPSTASH_REDIS_REST_URL &&
  !!process.env.UPSTASH_REDIS_REST_TOKEN;

let limiter: Ratelimit | null = null;
if (hasUpstash) {
  try {
    limiter = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      prefix: "portfolio:contact",
      analytics: false,
    });
  } catch (e) {
    console.error("[ratelimit] Failed to initialize Redis — check env var format (no surrounding quotes):", e);
  }
}

export async function checkRateLimit(
  identifier: string,
): Promise<{ success: boolean }> {
  if (!limiter) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[security] Upstash env vars not set — rate limiting is disabled",
      );
    }
    return { success: true };
  }
  const { success } = await limiter.limit(identifier);
  return { success };
}
