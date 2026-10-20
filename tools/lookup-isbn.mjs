// Looks up real metadata + a cover (when available) for one or more ISBNs via the Open Library
// API, and saves any found cover into tools/originals/catalog/<isbn>.jpg. Prints a result you
// can hand-copy into lib/catalog.ts (see CATALOG_REVIEW.md for the full workflow).
//
// Usage: node tools/lookup-isbn.mjs 9780000000000 9780000000001
import { mkdir, writeFile } from "node:fs/promises";

const isbns = process.argv.slice(2);
if (isbns.length === 0) {
  console.error("Usage: node tools/lookup-isbn.mjs <isbn> [isbn...]");
  process.exit(1);
}

async function getJSON(url) {
  const res = await fetch(url, { headers: { "User-Agent": "otp-catalog-lookup/1.0" } });
  if (!res.ok) return null;
  return res.json();
}

async function saveCoverIfReal(coverId, isbn) {
  const res = await fetch(`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`);
  const buf = await res.arrayBuffer();
  if (buf.byteLength <= 1000) return false; // Open Library's 1x1 "no cover" placeholder
  await mkdir("tools/originals/catalog", { recursive: true });
  await writeFile(`tools/originals/catalog/${isbn}.jpg`, Buffer.from(buf));
  return true;
}

async function lookup(isbn) {
  const edition = await getJSON(`https://openlibrary.org/isbn/${isbn}.json`);
  if (!edition) {
    console.log(`\n=== ${isbn} — NOT FOUND in Open Library ===`);
    console.log("Try https://openlibrary.org/search.json?q=<title> to find it under a different edition/ISBN.");
    return;
  }

  const authorNames = [];
  for (const a of edition.authors || []) {
    const author = await getJSON(`https://openlibrary.org${a.key}.json`);
    if (author?.name) authorNames.push(author.name);
  }

  const workKey = edition.works?.[0]?.key;
  const work = workKey ? await getJSON(`https://openlibrary.org${workKey}.json`) : null;
  const desc = work?.description;
  const description = typeof desc === "string" ? desc : desc?.value;

  const covers = edition.covers || work?.covers || [];
  let coverSaved = false;
  for (const c of covers) {
    if (c > 0 && (await saveCoverIfReal(c, isbn))) {
      coverSaved = true;
      break;
    }
  }

  console.log(`\n=== ${isbn} ===`);
  console.log("title:", edition.full_title || edition.title);
  console.log("authors:", authorNames.join(", ") || "(none found — check manually)");
  console.log("publisher:", edition.publishers?.[0] || "(unknown)");
  console.log("publishDate:", edition.publish_date || "(unknown)");
  console.log("pages:", edition.pagination || edition.number_of_pages || "(unknown)");
  console.log("format:", edition.physical_format || "(unknown)");
  console.log("cover:", coverSaved ? `saved to tools/originals/catalog/${isbn}.jpg` : "NOT FOUND — use BookCoverPlaceholder");
  if (description) console.log("description (paraphrase, don't copy verbatim):", description.slice(0, 300));
}

for (const isbn of isbns) {
  await lookup(isbn);
  await new Promise((r) => setTimeout(r, 250));
}
