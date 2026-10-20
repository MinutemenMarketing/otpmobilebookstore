"use server";

/**
 * Server action for the newsletter signup form. No email marketing provider is connected yet —
 * see README.md for the exact Mailchimp setup this is written against. Until the env vars below
 * are set, this returns `not-configured` and never claims a subscriber was saved.
 *
 * Env vars required to go live (Mailchimp Marketing API):
 *   MAILCHIMP_API_KEY        — API key from Mailchimp account settings
 *   MAILCHIMP_SERVER_PREFIX  — the datacenter suffix on that key, e.g. "us21"
 *   MAILCHIMP_AUDIENCE_ID    — the target audience/list ID
 * All three are read server-side only (no NEXT_PUBLIC_ prefix) and are never sent to the client.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type NewsletterResult =
  | { status: "success" }
  | { status: "invalid-email" }
  | { status: "not-configured" }
  | { status: "error"; message: string };

export async function subscribeToNewsletter(email: string): Promise<NewsletterResult> {
  const trimmed = email.trim();
  if (!EMAIL_RE.test(trimmed)) {
    return { status: "invalid-email" };
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !serverPrefix || !audienceId) {
    return { status: "not-configured" };
  }

  try {
    const res = await fetch(
      `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `apikey ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: trimmed,
          status: "pending", // double opt-in; Mailchimp sends the confirmation email
        }),
      },
    );

    if (res.ok) return { status: "success" };

    const body = await res.json().catch(() => null);
    // Mailchimp reports an existing subscriber as a 400 with this title — treat as success
    // from the visitor's point of view rather than exposing their prior subscription status.
    if (body?.title === "Member Exists") return { status: "success" };

    return { status: "error", message: "Something went wrong. Please try again in a moment." };
  } catch {
    return { status: "error", message: "Something went wrong. Please try again in a moment." };
  }
}
