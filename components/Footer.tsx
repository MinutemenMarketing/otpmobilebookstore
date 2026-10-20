import Link from "next/link";
import { RouteLine } from "./RouteLine";
import { InstagramIcon, TikTokIcon } from "./icons";
import { NewsletterSignup } from "./NewsletterSignup";

export function Footer() {
  return (
    <footer className="on-ink border-t border-line-dark bg-ink text-cream">
      <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-12 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <span className="font-display text-xl font-extrabold uppercase tracking-tight">
              Off the Page
            </span>
            <p className="max-w-[32ch] font-body text-sm text-cream/70">
              A mobile bookstore, built to roll up wherever readers are.
            </p>
            <RouteLine width={44} />
          </div>

          <nav aria-label="Footer" className="flex gap-8">
            <ul className="flex flex-col gap-2 font-body text-sm">
              <li>
                <Link href="/" className="text-cream/80 hover:text-cream">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-cream/80 hover:text-cream">
                  About
                </Link>
              </li>
              <li>
                <Link href="/merch" className="text-cream/80 hover:text-cream">
                  Merch
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-cream/80 hover:text-cream">
                  Events
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <span className="font-body text-xs font-semibold uppercase tracking-wide text-cream/60">
              Follow along
            </span>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/offthepagebook_club/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Off the Page on Instagram"
                className="flex h-10 w-10 items-center justify-center border border-cream/30 text-cream transition-colors hover:border-cream hover:text-golden-yellow"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@offthepagebook_club"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Off the Page on TikTok"
                className="flex h-10 w-10 items-center justify-center border border-cream/30 text-cream transition-colors hover:border-cream hover:text-golden-yellow"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
            <span className="font-body text-xs text-cream/50">@offthepagebook_club</span>
          </div>

          <NewsletterSignup variant="dark" className="w-full max-w-[360px]" />
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line-dark pt-6 font-body text-xs text-cream/45 md:flex-row md:items-center md:justify-between">
          <span>&copy; {new Date().getFullYear()} Off the Page Mobile Bookstore</span>
          <span>otpmobilebookstore.com — coming soon</span>
          <span>
            Powered by{" "}
            <a
              href="https://minutemenmarketing.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/70 underline-offset-2 hover:text-cream hover:underline"
            >
              Minutemen Marketing
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
