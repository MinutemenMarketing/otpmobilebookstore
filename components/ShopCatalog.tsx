"use client";

import { useMemo, useState } from "react";
import type { Book } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { SearchIcon, ChevronDown } from "./icons";

type SortKey = "featured" | "title-asc" | "title-desc" | "price-asc" | "price-desc";

const SORT_LABELS: Record<SortKey, string> = {
  featured: "Featured",
  "title-asc": "Title, A–Z",
  "title-desc": "Title, Z–A",
  "price-asc": "Price, low to high",
  "price-desc": "Price, high to low",
};

export function ShopCatalog({ books, genres }: { books: Book[]; genres: string[] }) {
  const [query, setQuery] = useState("");
  const [activeGenres, setActiveGenres] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("featured");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = books.filter((b) => {
      const matchesQuery = q === "" || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
      const matchesGenre = activeGenres.length === 0 || b.genres.some((g) => activeGenres.includes(g));
      return matchesQuery && matchesGenre;
    });

    list = [...list];
    switch (sort) {
      case "title-asc":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        list.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "price-asc":
        list.sort((a, b) => a.formats[0].priceCents - b.formats[0].priceCents);
        break;
      case "price-desc":
        list.sort((a, b) => b.formats[0].priceCents - a.formats[0].priceCents);
        break;
      default:
        break;
    }
    return list;
  }, [books, query, activeGenres, sort]);

  function toggleGenre(genre: string) {
    setActiveGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]));
  }

  function resetFilters() {
    setQuery("");
    setActiveGenres([]);
    setSort("featured");
  }

  const hasActiveFilters = query !== "" || activeGenres.length > 0 || sort !== "featured";

  return (
    <div id="catalog" className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 border-y border-line py-5 md:flex-row md:items-center md:justify-between">
        <label className="relative flex-1 md:max-w-[340px]">
          <span className="sr-only">Search by title or author</span>
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or author"
            className="h-11 w-full border border-line bg-cream pl-9 pr-3 font-body text-sm text-ink placeholder:text-ink-soft focus:border-ink"
          />
        </label>

        <div className="flex flex-wrap items-center gap-4">
          {genres.length > 0 && (
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by genre">
              {genres.map((genre) => {
                const active = activeGenres.includes(genre);
                return (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => toggleGenre(genre)}
                    aria-pressed={active}
                    className={`border px-3 py-1.5 font-body text-xs font-semibold uppercase tracking-wide transition-colors ${
                      active
                        ? "border-ink bg-ink text-cream"
                        : "border-line text-ink-soft hover:border-ink hover:text-ink"
                    }`}
                  >
                    {genre}
                  </button>
                );
              })}
            </div>
          )}

          <label className="relative inline-flex items-center">
            <span className="sr-only">Sort books</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-11 appearance-none border border-line bg-cream py-1 pl-3 pr-9 font-body text-sm text-ink focus:border-ink"
            >
              {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                <option key={key} value={key}>
                  {SORT_LABELS[key]}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-ink-soft" />
          </label>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <p className="font-display text-xl font-bold text-ink">No books match yet.</p>
          <p className="max-w-[40ch] font-body text-sm text-ink-soft">
            Try a different search, or clear your filters to see the full catalog.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="h-11 border border-ink px-5 font-body text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {results.map((book) => (
            <ProductCard key={book.id} book={book} />
          ))}
        </div>
      )}

      {hasActiveFilters && results.length > 0 && (
        <button
          type="button"
          onClick={resetFilters}
          className="self-start font-body text-xs font-semibold uppercase tracking-wide text-ink-soft underline hover:text-ink"
        >
          Reset filters
        </button>
      )}
    </div>
  );
}
