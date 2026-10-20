import type { Metadata } from "next";
import { getUpcomingEvents } from "@/lib/events";
import { EventCard } from "@/components/EventCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { RouteLine } from "@/components/RouteLine";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming markets, pop-ups, and appearances for Off the Page Mobile Bookstore.",
};

export default function EventsPage() {
  const upcoming = getUpcomingEvents();

  return (
    <div className="mx-auto max-w-[900px] px-4 py-10 md:px-12 md:py-16">
      <div className="flex max-w-[64ch] flex-col gap-4" data-reveal>
        <span className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
          Events
        </span>
        <h1 className="font-display text-3xl font-extrabold leading-tight text-ink md:text-5xl">
          Find us on the road.
        </h1>
        <RouteLine width={44} />
        <p className="font-body text-base leading-relaxed text-ink-soft md:text-lg">
          Markets, pop-ups, and other stops where the trailer will be parked and open.
        </p>
      </div>

      <div className="mt-10">
        {upcoming.length === 0 ? (
          <div className="flex flex-col items-center gap-6 border border-line bg-cream-high px-6 py-16 text-center">
            <p className="max-w-[46ch] font-body text-base text-ink-soft">
              Our next stops are coming soon. Join our newsletter for upcoming markets and
              pop-ups.
            </p>
            <NewsletterSignup className="w-full max-w-[420px]" />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>

      {upcoming.length > 0 && (
        <div className="mt-12 border-t border-line pt-8">
          <NewsletterSignup className="max-w-[420px]" />
        </div>
      )}
    </div>
  );
}
