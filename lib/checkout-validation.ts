import type { CheckoutContact } from "./commerce";

export type ContactErrors = Partial<Record<keyof CheckoutContact, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ZIP_RE = /^\d{5}(-\d{4})?$/;

export function validateField(field: keyof CheckoutContact, value: string): string | undefined {
  const trimmed = value.trim();
  switch (field) {
    case "name":
      return trimmed.length >= 2 ? undefined : "Enter your full name.";
    case "email":
      return EMAIL_RE.test(trimmed) ? undefined : "Enter a valid email address.";
    case "address1":
      return trimmed.length >= 3 ? undefined : "Enter a street address.";
    case "address2":
      return undefined;
    case "city":
      return trimmed.length >= 2 ? undefined : "Enter a city.";
    case "state":
      return trimmed.length >= 2 ? undefined : "Enter a state.";
    case "zip":
      return ZIP_RE.test(trimmed) ? undefined : "Enter a valid ZIP code.";
    default:
      return undefined;
  }
}

export function validateContact(contact: CheckoutContact): ContactErrors {
  const errors: ContactErrors = {};
  (Object.keys(contact) as Array<keyof CheckoutContact>).forEach((field) => {
    const message = validateField(field, contact[field] ?? "");
    if (message) errors[field] = message;
  });
  return errors;
}
