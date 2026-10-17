import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { commerce } from "@/lib/commerce";
import { BackToShop } from "@/components/BackToShop";
import { BookPurchasePanel } from "@/components/BookPurchasePanel";
import { CollapsibleDetails } from "@/components/CollapsibleDetails";

export async function generateStaticParams() {
  const books = await commerce.listBooks();
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = await commerce.getBook(slug);
  if (!book) return {};
  return {
    title: book.title,
    description: book.synopsis,
    openGraph: { images: [{ url: book.cover.src }] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = await commerce.getBook(slug);
  if (!book) notFound();

  const detailRows: Array<[string, string]> = [];
  if (book.publisher) detailRows.push(["Publisher", book.publisher]);
  if (book.publicationDate) detailRows.push(["Publication date", book.publicationDate]);
  if (book.pageCount) detailRows.push(["Pages", String(book.pageCount)]);
  if (book.isbn) detailRows.push(["ISBN", book.isbn]);
  if (book.language) detailRows.push(["Language", book.language]);

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-12 md:py-12">
      <div className="mb-6">
        <BackToShop />
      </div>

      <div className="grid gap-10 md:grid-cols-12 md:gap-14">
        <div className="flex items-start justify-center border border-line bg-cream-high p-6 md:col-span-5 md:p-10">
          <Image
            src={book.cover.src}
            alt={book.cover.alt}
            width={book.cover.width}
            height={book.cover.height}
            sizes="(min-width: 768px) 360px, 80vw"
            priority
            className="h-auto w-full max-w-[320px] object-contain"
          />
        </div>

        <div className="flex flex-col gap-6 md:col-span-7">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-1.5">
              {book.genres.map((g) => (
                <span
                  key={g}
                  className="border border-line px-1.5 py-0.5 font-body text-[10px] font-semibold uppercase tracking-wide text-ink-soft"
                >
                  {g}
                </span>
              ))}
            </div>
            <h1 className="font-display text-3xl font-extrabold leading-tight text-ink md:text-4xl">
              {book.title}
            </h1>
            <p className="font-body text-base text-ink-soft">{book.author}</p>
          </div>

          <BookPurchasePanel book={book} />

          <div className="border-t border-line pt-6">
            <h2 className="mb-2 font-body text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Synopsis
            </h2>
            <p className="font-body text-[15px] leading-relaxed text-ink">{book.synopsis}</p>
          </div>

          <CollapsibleDetails summary="Publication details" rows={detailRows} />
        </div>
      </div>
    </div>
  );
}
