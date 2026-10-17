"use client";

import type { CheckoutContact } from "@/lib/commerce";
import type { ContactErrors } from "@/lib/checkout-validation";

const FIELDS: Array<{ name: keyof CheckoutContact; label: string; autoComplete: string; required: boolean }> = [
  { name: "name", label: "Full name", autoComplete: "name", required: true },
  { name: "email", label: "Email", autoComplete: "email", required: true },
  { name: "address1", label: "Street address", autoComplete: "address-line1", required: true },
  { name: "address2", label: "Apt / suite (optional)", autoComplete: "address-line2", required: false },
  { name: "city", label: "City", autoComplete: "address-level2", required: true },
  { name: "state", label: "State", autoComplete: "address-level1", required: true },
  { name: "zip", label: "ZIP code", autoComplete: "postal-code", required: true },
];

export function ContactForm({
  contact,
  errors,
  onChange,
  onBlur,
}: {
  contact: CheckoutContact;
  errors: ContactErrors;
  onChange: (field: keyof CheckoutContact, value: string) => void;
  onBlur: (field: keyof CheckoutContact) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {FIELDS.map((field) => {
        const errorId = `${field.name}-error`;
        const error = errors[field.name];
        const spanFull = field.name === "address1" || field.name === "address2" || field.name === "email" || field.name === "name";
        return (
          <div key={field.name} className={`flex flex-col gap-1.5 ${spanFull ? "sm:col-span-2" : ""}`}>
            <label htmlFor={field.name} className="font-body text-xs font-semibold uppercase tracking-wide text-ink-soft">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.name === "email" ? "email" : "text"}
              autoComplete={field.autoComplete}
              value={contact[field.name] ?? ""}
              onChange={(e) => onChange(field.name, e.target.value)}
              onBlur={() => onBlur(field.name)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              className={`h-12 border bg-cream px-3 font-body text-sm text-ink focus:border-teal ${
                error ? "border-tomato-red" : "border-line"
              }`}
            />
            {error && (
              <p id={errorId} className="font-body text-xs font-semibold text-tomato-red">
                {error}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
