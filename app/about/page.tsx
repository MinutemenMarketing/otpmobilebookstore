import Image from "next/image";
import type { Metadata } from "next";
import { RouteLine } from "@/components/RouteLine";
import { InstagramIcon, TikTokIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About",
  description: "Off the Page is a mobile bookstore — a full shop built to roll up wherever readers are.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-[1280px] px-4 py-12 md:px-12 md:py-16">
        <div className="flex max-w-[64ch] flex-col gap-4" data-reveal>
          <span className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
            About
          </span>
          <h1 className="font-display text-3xl font-extrabold leading-tight text-ink md:text-5xl">
            A bookstore built to come to you.
          </h1>
          <RouteLine width={44} />
          <p className="font-body text-base leading-relaxed text-ink-soft md:text-lg">
            Off the Page is a mobile bookstore — a full shop built inside a trailer, bringing
            books to readers instead of waiting for them to find a storefront. The business is
            still coming together; this site will grow with it as the catalog, the schedule, and
            the story behind it are confirmed.
          </p>
        </div>
      </section>

      <section className="on-ink border-y border-line-dark bg-ink py-14 text-cream md:py-20">
        <div className="mx-auto max-w-[1280px] px-4 md:px-12">
          <span className="mb-6 block font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream/60">
            Trailer concept
          </span>
          <div className="grid min-w-0 gap-5 md:grid-cols-12">
            <div className="min-w-0 overflow-hidden border border-line-dark md:col-span-8">
              <Image
                src="/images/trailer-side-concept-1536.webp"
                alt="Concept render of the Off the Page trailer, side view, black with the full logo and road graphic"
                width={1536}
                height={768}
                sizes="(min-width: 768px) 760px, 100vw"
                loading="lazy"
                className="h-auto w-full"
              />
            </div>
            <div className="min-w-0 overflow-hidden border border-line-dark md:col-span-4">
              <Image
                src="/images/trailer-rear-concept-960.webp"
                alt="Concept render of the Off the Page trailer, rear doors, with the full shield logo"
                width={960}
                height={960}
                sizes="(min-width: 768px) 360px, 100vw"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <p className="mt-4 font-body text-xs text-cream/50">
            Design concepts for the trailer build — not photographs of the finished vehicle.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-12 md:px-12 md:py-16">
        <div className="flex flex-col gap-4 border-t border-line pt-10">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
            Follow the journey
          </span>
          <p className="max-w-[50ch] font-body text-sm text-ink-soft">
            The build, the catalog, and the stops — as they happen.
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/offthepagebook_club/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 border border-ink px-4 font-body text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              <InstagramIcon className="h-4 w-4" />
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@offthepagebook_club"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 border border-ink px-4 font-body text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              <TikTokIcon className="h-4 w-4" />
              TikTok
            </a>
          </div>
          <span className="font-body text-xs text-ink-soft">@offthepagebook_club</span>
        </div>
      </section>
    </div>
  );
}
