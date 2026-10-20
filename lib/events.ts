import type { StoreEvent } from "./types";

/**
 * Single structured source of truth for markets, pop-ups, and other appearances. No confirmed
 * dates have been supplied yet, so this starts empty — the Events page shows an intentional
 * empty state rather than inventing a schedule. Add an entry here when a date is confirmed;
 * past events are automatically excluded from the upcoming list by `getUpcomingEvents`.
 *
 * `date` is ISO (YYYY-MM-DD). `directionsUrl` should be a real Google/Apple Maps link to the
 * venue address.
 */
export const events: StoreEvent[] = [];

export function getUpcomingEvents(): StoreEvent[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return events
    .filter((e) => new Date(`${e.date}T00:00:00`) >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}
