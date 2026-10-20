import type { StoreEvent } from "@/lib/types";
import { RouteLine } from "./RouteLine";

const WEEKDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDate(iso: string): { weekday: string; month: string; day: string } {
  const d = new Date(`${iso}T00:00:00`);
  return { weekday: WEEKDAY[d.getDay()], month: MONTH[d.getMonth()], day: String(d.getDate()) };
}

function formatTimeRange(start?: string, end?: string): string | null {
  if (!start) return null;
  return end ? `${start} – ${end}` : start;
}

export function EventCard({ event }: { event: StoreEvent }) {
  const { weekday, month, day } = formatDate(event.date);
  const timeRange = formatTimeRange(event.startTime, event.endTime);

  return (
    <article className="flex gap-5 border border-line bg-cream-high p-5 sm:p-6">
      <div className="flex w-16 shrink-0 flex-col items-center justify-center border border-line bg-cream py-3 text-center">
        <span className="font-body text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
          {weekday}
        </span>
        <span className="font-display text-2xl font-extrabold leading-none text-ink">{day}</span>
        <span className="font-body text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
          {month}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h3 className="font-display text-lg font-bold leading-snug text-ink">{event.name}</h3>
        <p className="font-body text-sm text-ink-soft">
          {event.venue}
          {timeRange && <span className="tabular"> · {timeRange}</span>}
        </p>
        <p className="font-body text-sm text-ink-soft">{event.address}</p>
        {event.description && (
          <p className="font-body text-sm leading-relaxed text-ink">{event.description}</p>
        )}
        <RouteLine width={28} className="mt-1" />
        <div className="mt-1 flex flex-wrap gap-4">
          <a
            href={event.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm font-semibold text-teal underline-offset-2 hover:underline"
          >
            Directions
          </a>
          {event.websiteUrl && (
            <a
              href={event.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm font-semibold text-teal underline-offset-2 hover:underline"
            >
              Event details
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
