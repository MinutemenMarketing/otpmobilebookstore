// Fallback for ISBNs with no direct Open Library edition record: searches by title to recover
// author/publisher for reference ONLY. Never pulls a cover or substitutes the alternate ISBN —
// the client-supplied ISBN stays authoritative; this just fills in metadata gaps.
// Usage: node tools/search-title.mjs "<isbn>|<title>" ["<isbn>|<title>" ...]
const pairs = process.argv.slice(2);

async function getJSON(url, attempt = 1) {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "otp-catalog-lookup/1.0" } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    if (attempt >= 3) return null;
    await new Promise((r) => setTimeout(r, 500 * attempt));
    return getJSON(url, attempt + 1);
  }
}

for (const pair of pairs) {
  const [isbn, title] = pair.split("|");
  const data = await getJSON(`https://openlibrary.org/search.json?q=${encodeURIComponent(title)}&limit=3`);
  console.log(`\n=== ${isbn} (${title}) ===`);
  if (!data?.docs?.length) {
    console.log("no search results");
  } else {
    for (const d of data.docs.slice(0, 3)) {
      console.log(`  candidate: "${d.title}" by ${(d.author_name || []).join(", ")} — ${d.publisher?.[0] || "?"} (${d.first_publish_year || "?"}) [isbn: ${(d.isbn || []).slice(0, 2).join(",")}]`);
    }
  }
  await new Promise((r) => setTimeout(r, 200));
}
