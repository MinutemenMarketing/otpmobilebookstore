"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { commerce, type CheckoutContact, type CheckoutSessionResult } from "@/lib/commerce";
import { validateContact, validateField, type ContactErrors } from "@/lib/checkout-validation";
import { formatCents } from "@/lib/money";
import { ContactForm } from "./ContactForm";
import { OrderSummary } from "./OrderSummary";
import { RouteLine } from "../RouteLine";
import { CheckIcon } from "../icons";

type Step = "details" | "review" | "complete";

const EMPTY_CONTACT: CheckoutContact = {
  name: "",
  email: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
};

const STEP_LABELS: Record<Step, string> = {
  details: "Details",
  review: "Review",
  complete: "Done",
};

export function CheckoutFlow() {
  const { lines, subtotalCents, clear } = useCart();
  const [step, setStep] = useState<Step>("details");
  const [contact, setContact] = useState<CheckoutContact>(EMPTY_CONTACT);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<CheckoutSessionResult | null>(null);

  function handleChange(field: keyof CheckoutContact, value: string) {
    setContact((prev) => ({ ...prev, [field]: value }));
  }

  function handleBlur(field: keyof CheckoutContact) {
    setErrors((prev) => ({ ...prev, [field]: validateField(field, contact[field] ?? "") }));
  }

  function handleDetailsSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validateContact(contact);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0];
      document.getElementById(firstField)?.focus();
      return;
    }
    setStep("review");
  }

  async function handlePlaceDemoOrder() {
    setSubmitting(true);
    const session = await commerce.createCheckoutSession({ lines, contact });
    setResult(session);
    clear();
    setSubmitting(false);
    setStep("complete");
  }

  if (step === "details" && lines.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="font-display text-xl font-bold text-ink">Your cart is empty.</p>
        <p className="font-body text-sm text-ink-soft">Add a book or a tee before checking out.</p>
        <Link
          href="/"
          className="inline-flex h-12 items-center bg-ink px-6 font-body text-sm font-semibold text-cream transition-colors hover:bg-burnt-orange"
        >
          Shop books
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[920px]">
      <div className="mb-6 flex items-center gap-2 border border-golden-yellow/60 bg-golden-yellow/15 px-4 py-3">
        <span className="font-body text-sm font-semibold text-burnt-orange">
          Demo checkout — no payment will be collected and no order will be placed.
        </span>
      </div>

      <ol className="mb-10 flex items-center gap-3" aria-label="Checkout steps">
        {(Object.keys(STEP_LABELS) as Step[]).map((s, i) => {
          const isCurrent = s === step;
          const isDone =
            (s === "details" && (step === "review" || step === "complete")) ||
            (s === "review" && step === "complete");
          return (
            <li key={s} className="flex items-center gap-3">
              {i > 0 && <span className="h-px w-6 bg-line" aria-hidden="true" />}
              <span
                className={`font-body text-xs font-semibold uppercase tracking-wide ${
                  isCurrent ? "text-ink" : isDone ? "text-teal" : "text-ink-soft"
                }`}
                aria-current={isCurrent ? "step" : undefined}
              >
                {i + 1}. {STEP_LABELS[s]}
              </span>
            </li>
          );
        })}
      </ol>

      {step === "details" && (
        <form onSubmit={handleDetailsSubmit} noValidate className="flex flex-col gap-8">
          <div>
            <h1 className="mb-1 font-display text-2xl font-bold text-ink">Contact &amp; shipping</h1>
            <p className="font-body text-sm text-ink-soft">
              Used only to preview the checkout flow — nothing here is saved or sent anywhere.
            </p>
          </div>
          <ContactForm contact={contact} errors={errors} onChange={handleChange} onBlur={handleBlur} />
          <div className="flex items-center justify-between gap-4">
            <span className="tabular font-body text-sm text-ink-soft">
              Subtotal {formatCents(subtotalCents)}
            </span>
            <button
              type="submit"
              className="h-12 bg-ink px-8 font-body text-sm font-semibold text-cream transition-colors hover:bg-burnt-orange"
            >
              Review order
            </button>
          </div>
        </form>
      )}

      {step === "review" && (
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="mb-1 font-display text-2xl font-bold text-ink">Review your order</h1>
            <p className="font-body text-sm text-ink-soft">Nothing is charged at this step.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <h2 className="mb-2 font-body text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Shipping to
              </h2>
              <address className="font-body text-sm not-italic leading-relaxed text-ink">
                {contact.name}
                <br />
                {contact.address1}
                {contact.address2 && (
                  <>
                    <br />
                    {contact.address2}
                  </>
                )}
                <br />
                {contact.city}, {contact.state} {contact.zip}
                <br />
                {contact.email}
              </address>
              <button
                type="button"
                onClick={() => setStep("details")}
                className="mt-3 font-body text-xs font-semibold uppercase tracking-wide text-teal underline hover:text-ink"
              >
                Edit details
              </button>
            </div>
            <div className="md:col-span-5">
              <OrderSummary lines={lines} subtotalCents={subtotalCents} totalCents={subtotalCents} />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handlePlaceDemoOrder}
              disabled={submitting}
              className="h-12 bg-ink px-8 font-body text-sm font-semibold text-cream transition-colors hover:bg-burnt-orange disabled:opacity-60"
            >
              {submitting ? "Simulating…" : "Complete demo checkout"}
            </button>
          </div>
        </div>
      )}

      {step === "complete" && result && (
        <div className="flex flex-col items-center gap-6 py-10 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal text-cream">
            <CheckIcon className="h-7 w-7" />
          </span>
          <div>
            <h1 className="font-display text-2xl font-bold text-ink">Demo checkout complete</h1>
            <p className="mx-auto mt-2 max-w-[48ch] font-body text-sm text-ink-soft">
              This simulated a completed purchase for review only. No payment was collected and no
              real order was placed with Off the Page.
            </p>
          </div>
          <RouteLine width={48} />
          <div className="font-body text-sm text-ink-soft">
            Reference <span className="tabular font-semibold text-ink">{result.orderReference}</span> ·{" "}
            <span className="tabular font-semibold text-ink">{formatCents(result.totalCents)}</span> simulated total
          </div>
          <Link
            href="/"
            className="inline-flex h-12 items-center bg-ink px-6 font-body text-sm font-semibold text-cream transition-colors hover:bg-burnt-orange"
          >
            Continue shopping
          </Link>
        </div>
      )}
    </div>
  );
}
