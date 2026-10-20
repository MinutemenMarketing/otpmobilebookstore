import type { MetadataRoute } from "next";
import { commerce } from "@/lib/commerce";

const BASE_URL = "https://otpmobilebookstore.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const books = await commerce.listBooks();

  return [
    { url: `${BASE_URL}/`, priority: 1 },
    { url: `${BASE_URL}/about`, priority: 0.6 },
    { url: `${BASE_URL}/merch`, priority: 0.8 },
    { url: `${BASE_URL}/events`, priority: 0.7 },
    ...books.map((book) => ({ url: `${BASE_URL}/product/${book.slug}`, priority: 0.7 })),
  ];
}
