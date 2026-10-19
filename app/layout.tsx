import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ScrollReveal } from "@/components/ScrollReveal";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://otpmobilebookstore.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Off the Page Mobile Bookstore",
    template: "%s — Off the Page Mobile Bookstore",
  },
  description:
    "Off the Page is a mobile bookstore bringing a curated catalog of books — and branded merch — on the road. Shop the demo storefront.",
  openGraph: {
    type: "website",
    siteName: "Off the Page Mobile Bookstore",
    title: "Off the Page Mobile Bookstore",
    description: "A mobile bookstore, built to roll up wherever readers are.",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Off the Page Mobile Bookstore" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Off the Page Mobile Bookstore",
    description: "A mobile bookstore, built to roll up wherever readers are.",
    images: ["/images/og-default.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${hanken.variable} h-full antialiased`}>
      <body className="flex min-h-full min-w-0 flex-col bg-cream text-ink">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <CartProvider>
          <Header />
          <main id="main" className="min-w-0 flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <ScrollReveal />
      </body>
    </html>
  );
}
