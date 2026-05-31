/**
 * Verify a Cloudflare Turnstile token server-side.
 * Returns true when Turnstile is not configured (so local dev works),
 * otherwise validates against Cloudflare's siteverify endpoint.
 */
export async function verifyTurnstile(
  token: string,
  ip?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[security] TURNSTILE_SECRET_KEY is not set — bot protection is disabled",
      );
    }
    return true;
  }

  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.append("remoteip", ip);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body },
    );
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
