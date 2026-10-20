"use client";

import { useActionState, useId } from "react";
import { subscribeToNewsletter, type NewsletterResult } from "@/lib/newsletter";
import { CheckIcon } from "./icons";

async function action(_prev: NewsletterResult | null, formData: FormData): Promise<NewsletterResult> {
  const email = String(formData.get("email") || "");
  return subscribeToNewsletter(email);
}

export function NewsletterSignup({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const [state, formAction, isPending] = useActionState(action, null);
  const emailId = useId();
  const statusId = useId();
  const dark = variant === "dark";

  if (state?.status === "success") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <CheckIcon className={`h-4 w-4 shrink-0 ${dark ? "text-golden-yellow" : "text-teal"}`} />
        <p className={`font-body text-sm ${dark ? "text-cream" : "text-ink"}`}>
          You&apos;re on the list — check your inbox to confirm.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className={className} noValidate>
      <p
        className={`mb-1 font-display text-lg font-bold ${dark ? "text-cream" : "text-ink"}`}
      >
        Stay in the loop
      </p>
      <p className={`mb-3 font-body text-sm ${dark ? "text-cream/70" : "text-ink-soft"}`}>
        New books, fresh merch, and our next stops — straight to your inbox.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={emailId} className="sr-only">
          Email address
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          disabled={isPending}
          aria-describedby={statusId}
          className={`h-12 flex-1 border px-3 font-body text-sm focus:border-teal disabled:opacity-60 ${
            dark
              ? "border-cream/30 bg-transparent text-cream placeholder:text-cream/40"
              : "border-line bg-cream text-ink placeholder:text-ink-soft"
          }`}
        />
        <button
          type="submit"
          disabled={isPending}
          className={`h-12 shrink-0 px-6 font-body text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
            dark
              ? "bg-cream text-ink hover:bg-golden-yellow"
              : "bg-ink text-cream hover:bg-burnt-orange"
          }`}
        >
          {isPending ? "Signing up…" : "Sign up"}
        </button>
      </div>
      <div id={statusId} aria-live="polite">
        {state?.status === "invalid-email" && (
          <p className="mt-2 font-body text-xs font-semibold text-tomato-red">
            Enter a valid email address.
          </p>
        )}
        {state?.status === "not-configured" && (
          <p className={`mt-2 font-body text-xs ${dark ? "text-cream/60" : "text-ink-soft"}`}>
            Signups open soon — we&apos;re still connecting our mailing list.
          </p>
        )}
        {state?.status === "error" && (
          <p className="mt-2 font-body text-xs font-semibold text-tomato-red">{state.message}</p>
        )}
      </div>
      <p className={`mt-2 font-body text-xs ${dark ? "text-cream/50" : "text-ink-soft"}`}>
        No spam — just new books, merch, and markets. Unsubscribe anytime.
      </p>
    </form>
  );
}
