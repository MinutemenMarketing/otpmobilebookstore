# Catalog review — not customer-facing

This file tracks catalog entries that have real bibliographic data but are **not yet published**
to the storefront (`status: "review"` in `lib/catalog.ts`). It is intentionally kept out of the
Next.js `app/` tree so it's never bundled or served.

## Source material (as of 2026-10-20)

The client sent two kinds of BookDepot screenshots that do not share a printed, unambiguous join
key:

1. **Six screenshots** of an ISBN + title table (106 rows total, alphabetical by title) — this is
   the complete supplier order. All 106 are reconciled into `lib/catalog.ts` below.
2. **Six screenshots** of a cart view showing only **Price + Quantity** columns (106 rows,
   matching the title list's row count almost exactly) — see "The price/quantity screenshots"
   below for what was and wasn't possible to verify from these.

## All 106 books — status summary

- **106 of 106** have a confirmed ISBN and title (100% — every row from the six
  ISBN/title screenshots is in `lib/catalog.ts`).
- **42 of 106** have a verified cover image from Open Library; **64** render
  `BookCoverPlaceholder` (title/author on a styled card) until a real cover is confirmed.
- **87 of 106** have a confirmed author (from Open Library's edition record, or —
  for a few classics republished by Paper Mill Press with no indexed edition — the well-established
  public-domain author). **19** show `"Author to be confirmed"`: the ISBN has no
  edition record in Open Library and a title search returned either no result or more than one
  plausible, differently-authored match, so nothing was guessed.
- **0 of 106** have a confirmed retail price or confirmed stock. None are visible on the
  live site — all are `status: "review"` in `lib/catalog.ts`.

## The full list

| ISBN | Title | Author | Cover |
|---|---|---|---|
| 9781400347476 | A Bookseller in Madrid | Mario Escobar | Placeholder |
| 9781668219614 | A Far-Flung Life | M. L. Stedman | Placeholder |
| 9781645661900 | A Harvest of Hearts (Deluxe Stenciled Edges) | Author to be confirmed | ✅ verified |
| 9781250754776 | A Most Beautiful Thing: The True Story of America's First All-Black High School Rowing Team | Arshay Cooper | ✅ verified |
| 9781443470209 | A Murder in Paris | Author to be confirmed | Placeholder |
| 9781797211756 | A River of Dust: The Life-Giving Link Between North Africa and the Amazon | Jilanne Hoffmann, Eugenia Mello | Placeholder |
| 9781250873828 | Above the Salt | Katherine Vaz | Placeholder |
| 9781400246748 | Ace, Marvel, Spy: A Novel of Alice Marble | Jenni L. Walsh | Placeholder |
| 9780063381506 | Adam and Evie's Matchmaking Tour | Nora Nguyen | ✅ verified |
| 9780064432771 | Africa Dream | Eloise Greenfield | ✅ verified |
| 9780618127351 | Africa in My Blood: An Autobiography in Letters | Jane Goodall | ✅ verified |
| 9780063049895 | Afterparties | Anthony Veasna So | ✅ verified |
| 9780358572015 | All Day Is a Long Time | David Sanchez | Placeholder |
| 9781328915320 | All Grown Up | Jami Attenberg | Placeholder |
| 9781335993953 | All Signs Point to Malibu | Jennifer Snow | Placeholder |
| 9781250803856 | All the Dangerous Things | Stacy Willingham | ✅ verified |
| 9798217067527 | All the Other Mothers Hate Me | Sarah Harman | Placeholder |
| 9781250353528 | All the Water in the World | Eiren Caffall | ✅ verified |
| 9780593718926 | And Then There Was You | Sophie Cousens | Placeholder |
| 9781668218891 | Any Means Necessary | Author to be confirmed | Placeholder |
| 9781664300552 | As the World Goes By | Jonny Lambert | Placeholder |
| 9780316585835 | Beasts of the Sea | Iida Turpeinen (trans. David Hackston) | ✅ verified |
| 9780760381243 | Best of the '90s Coloring Book | Walter Foster Creative Team, Wesley Jones | ✅ verified |
| 9781538768464 | Big Dumb Eyes: Stories From a Simpler Mind | Nate Bargatze | ✅ verified |
| 9780063322790 | Blessing of the Lost Girls | J. A. Jance | ✅ verified |
| 9781982132125 | Blood in the Garden: The Flagrant History of the 1990s New York Knicks | Chris Herring | ✅ verified |
| 9781250342751 | Bookshops & Bonedust | Travis Baldree | ✅ verified |
| 9781503763678 | Bork | Author to be confirmed | Placeholder |
| 9781101946909 | Brave Enough | Cheryl Strayed | ✅ verified |
| 9781649379801 | Bright Lights and Summer Nights | Author to be confirmed | Placeholder |
| 9780446615884 | Cane River | Lalita Tademy | ✅ verified |
| 9781499812251 | Dear Reader: A Love Letter to Libraries | Tiffany Rose | ✅ verified |
| 9781668024843 | Death Valley | Melissa Broder | Placeholder |
| 9781639730377 | Deep as the Sky, Red as the Sea | Rita Chang-Eppig | ✅ verified |
| 9781668065488 | Didion and Babitz | Lili Anolik | Placeholder |
| 9781668067307 | Dinner for Vampires | Bethany Joy Lenz | ✅ verified |
| 9781803362571 | Doctor Strange: Dimension War | James Lovegrove | Placeholder |
| 9780762471706 | E Is for Environment: The ABCs of Conservation | Lucy Curran, Francesca Rosa | ✅ verified |
| 9781250408495 | Elsewhere | Author to be confirmed | Placeholder |
| 9781982122799 | Flesh | Author to be confirmed | Placeholder |
| 9781250866448 | Friends, Lovers, and the Big Terrible Thing | Matthew Perry | ✅ verified |
| 9780593733875 | From Here to the Great Unknown | Lisa Marie Presley, Riley Keough | Placeholder |
| 9781538774700 | Gone Before Goodbye | Reese Witherspoon, Harlan Coben | ✅ verified |
| 9780593724224 | Husbands & Lovers | Beatriz Williams | ✅ verified |
| 9781668034538 | I Fell in Love With Hope | Lancali | ✅ verified |
| 9781547618057 | If We Never End (Deluxe Limited Edition) | Author to be confirmed | Placeholder |
| 9781250832917 | Jack | Author to be confirmed | Placeholder |
| 9781839236990 | Jack and the Beanstalk (Fairy Tale Pop-Up Book) | Emma Kenttälä, Samara Hardy | Placeholder |
| 9780063377684 | Lake Effect | Cynthia D'Aprix Sweeney | Placeholder |
| 9781250372031 | Last Night in Brooklyn | Author to be confirmed | ✅ verified |
| 9781250340108 | Lenny Marks Gets Away With Murder | Kerryn Mayne | Placeholder |
| 9781982104498 | Let Us Descend | Jesmyn Ward | ✅ verified |
| 9781250075734 | Love Warrior: A Memoir | Glennon Doyle Melton | ✅ verified |
| 9781538774977 | Married to the Mafia | Author to be confirmed | Placeholder |
| 9781662512049 | Meatballs for Grandpa | Jeanette Fazzari Jones, Jaclyn Sinquett | Placeholder |
| 9781668008997 | Miss Morgan's Book Brigade | Janet Skeslien Charles | Placeholder |
| 9780062967268 | Mussolini's Daughter: The Most Dangerous Woman in Europe | Caroline Moorehead | Placeholder |
| 9781529094794 | My Heart Was a Tree: Poems and Thoughts | Michael Morpurgo, Yuval Zommer | Placeholder |
| 9781665972888 | Our Frozen Planet | Leisa Stewart-Sharpe, Kim Smith | Placeholder |
| 9781250333889 | Our Infinite Fates (Deluxe Limited Edition) | Laura Steven | ✅ verified |
| 9781250897954 | Park Avenue | Author to be confirmed | Placeholder |
| 9780593715673 | Pets and the City: True Tales of a Manhattan House Call Veterinarian | Amy Attas | Placeholder |
| 9781926444239 | Pride and Prejudice (Paper Mill Press Classics) | Jane Austen | Placeholder |
| 9780374535032 | Radiance of Tomorrow | Ishmael Beah | Placeholder |
| 9781454921523 | Rocket Shoes | Sharon Skinner, Ward Jenkins | Placeholder |
| 9781250825551 | Saturday Sancocho | Leyla Torres | Placeholder |
| 9781668023334 | Say Hello to My Little Friend | Jennine Capó Crucet | Placeholder |
| 9781538759196 | Say You'll Remember Me (Bk. 1) | Author to be confirmed | Placeholder |
| 9781804181782 | Secrets of Malta | Author to be confirmed | Placeholder |
| 9781926444192 | Sense and Sensibility (Paper Mill Press Classics) | Jane Austen | Placeholder |
| 9780593646946 | Shark at Sister Tea | Author to be confirmed | Placeholder |
| 9781626721340 | Shawn Loves Sharks | Curtis Manley | Placeholder |
| 9781509889846 | Spaghetti Hunters | Morag Hood | Placeholder |
| 9781250335005 | Starcana: Moon Magic: A Coloring Book | Ash Miyagawa | Placeholder |
| 9780593319376 | Tales of Al: The Water Rescue Dog | Lynne Cox | ✅ verified |
| 9781789095678 | Tales of Wakanda (Black Panther) | Nikki Giovanni, Tananarive Due, Cadwell Turnbull, Jesse J. Holland | ✅ verified |
| 9780593569085 | Tate's Wild Rescue | Jenny Turnbull, Izzy Burton | ✅ verified |
| 9780593729397 | The American Daughters | Maurice Carlos Ruffin | ✅ verified |
| 9781605374765 | The Big Five | Bella Makatini, Judi Abbot | ✅ verified |
| 9781250364418 | The Business Trip | Jessie Garcia | ✅ verified |
| 9781926444185 | The Call of the Wild (Paper Mill Press Classics) | Jack London | Placeholder |
| 9781250344267 | The Coven | Author to be confirmed | Placeholder |
| 9781250852656 | The Crown in Crisis: Countdown to the Abdication | Alexander Larman | ✅ verified |
| 9780593615744 | The Day Madear Voted | Wade Hudson | Placeholder |
| 9781538774960 | The Doctor's Wife | Daniel Hurst | ✅ verified |
| 9781668010075 | The Fate of the Generals: MacArthur | Jonathan Horn | Placeholder |
| 9781926444291 | The Jungle Book (Paper Mill Press Classics) | Rudyard Kipling | Placeholder |
| 9781951836849 | The Lion Queen | Rina Singh | Placeholder |
| 9781507222836 | The Official Yellowstone Bar Book | Lex Taylor, Nathan Gurr | Placeholder |
| 9780803700970 | The Patchwork Quilt | Valerie Flournoy | Placeholder |
| 9781250275721 | The Rise: Kobe Bryant and the Pursuit of Immortality | Mike Sielski | Placeholder |
| 9781774021767 | The Secret Garden (Paper Mill Press Classics) | Frances Hodgson Burnett | Placeholder |
| 9781250409256 | The Sleepless (Bk. 1) | Jen Williams | Placeholder |
| 9780593724002 | The Summer We Started Over | Nancy Thayer | ✅ verified |
| 9780374619572 | The Wayfinder | Adam Johnson | Placeholder |
| 9781774022818 | The Wizard of Oz (Paper Mill Press Classics) | L. Frank Baum | Placeholder |
| 9781668009048 | The Woman in Me | Britney Spears | ✅ verified |
| 9780593448793 | There's Always This Year: On Basketball and Ascension | Hanif Abdurraqib | ✅ verified |
| 9781472860255 | Turning The Tide: The USAAF in North Africa and Sicily | Thomas McKelvey Cleaver | Placeholder |
| 9780063088344 | Valiant Women: The Extraordinary American Servicewomen Who Helped Win World War II | Lena S. Andrews | ✅ verified |
| 9781665918275 | Where the Deer Slip Through | Author to be confirmed | Placeholder |
| 9781668043431 | Willie and Annie Nelson's Cannabis Cookbook | Willie Nelson, Annie Nelson | ✅ verified |
| 9781926444253 | Wuthering Heights (Paper Mill Press Classics) | Emily Brontë | ✅ verified |
| 9780063417250 | You Belong With Me | Author to be confirmed | Placeholder |
| 9781668037720 | You Like It Darker: Stories | Stephen King | Placeholder |
| 9780316594929 | You With the Sad Eyes: A Memoir | Author to be confirmed | Placeholder |

## The price/quantity screenshots: what was and wasn't verifiable

The client's cart screenshots (6 images, ~106 rows of Price + Quantity only) were re-examined
against the complete 106-title list, specifically looking for row continuity and overlap between
the six scrolling screenshots, per her note that the two sheets correspond.

**What supports her claim:**

- The total row count is a near-exact match: 106 price/quantity rows for 106 titles.
- One screenshot (the cart view, image showing rows around "$2.50 / 3 / 3") has a sliver of a
  **Title column bleeding in from the left edge** — the text "...nd Them" is visible in blue,
  BookDepot's link-color for item titles. This proves the cart table itself has a Title column;
  it's just scrolled out of frame in all six screenshots, which only show Price and Quantity.

**Why no quantity was written into `lib/catalog.ts`:**

Reconstructing one continuous, deduplicated sequence from six overlapping screenshots requires
knowing exactly how many rows each screenshot shares with its neighbor. That overlap is usually
visible by matching the last row of one screenshot to the first row of the next, but in this data
set common values (many rows share prices like "$3.75" or quantities like "3") make several of
those boundaries ambiguous — a boundary match on a single repeated value isn't proof of alignment,
only a plausible guess. One boundary (between the 2nd and 3rd screenshots) had a distinctive
**two-row exact match** ($2.63/qty 4 immediately followed by $2.81/qty 3, in both screenshots),
which is good evidence of a 2-row overlap there specifically — but the other four boundaries don't
have an equally distinctive anchor, so a full 106-row mapping would rest on several unverified
guesses. Getting even one boundary wrong would silently shift every quantity after it onto the
wrong book, which is worse than leaving quantity blank. Per the brief, quantity is only applied
where the alignment can actually be verified — so none is applied here.

**The actionable fix:** since the cart page clearly has a Title column (confirmed by the "...nd
Them" bleed-through), the client re-screenshotting that same cart page scrolled to show
**Title + Price + Quantity together** (or exporting it as a CSV/spreadsheet, which BookDepot likely
offers from the cart view) would let every row match by title with zero ambiguity. That's a much
smaller ask than re-entering anything by hand, and it's the only way to confirm quantity/price
with certainty rather than a best-effort guess.

Supplier cost is also not a retail price — even once quantities are confirmed, retail pricing is a
separate decision the client still needs to make per book.

## Still needed before any of these 106 can publish

- Retail price per title (the supplier cost sheet is not a retail price source)
- Confirmed stock / quantity received — see above; needs a re-screenshot with the Title column
  visible, or a CSV export, to resolve with certainty
- Genre tags were assigned conservatively from only what's verifiable (page count, imprint,
  subtitle, cover text, or — for picture books — the obvious intended age range); worth a quick
  client sanity check, not a hard blocker
- A real cover for the 64 flagged as "Placeholder" above, or explicit sign-off to keep the
  placeholder at launch
- An author for the 19 entries marked "Author to be confirmed" — these ISBNs have no
  edition record in Open Library; the client's own paperwork (a packing slip, invoice, or the
  BookDepot order confirmation email) likely has this
- Confirmation on a few edition/title notes: "Ace, Marvel, Spy" (ISBN matches a different binding
  than the large-print edition Open Library indexes), "Miss Morgan's Book Brigade" (indexed in Open
  Library under a working title, "Librarians of Rue de Picardie" — same author/publisher/year, but
  worth confirming it's the same book before publishing)

## How to add more books later

```bash
node tools/lookup-isbn.mjs 9780000000000 9780000000001
```

Prints real metadata + downloads any available cover into `tools/originals/catalog/`. If that
comes back "NOT FOUND", try `node tools/search-title.mjs "<isbn>|<title>"` for a title-based
fallback — it prints candidate author/publisher matches for reference only; it never pulls a cover
or substitutes a different edition's ISBN. Then run `node tools/prep-images.mjs` to build the
optimized cover sizes, and add the entry to `lib/catalog.ts` by hand (`status: "review"` until
price/stock are confirmed, then `"published"` with a real `formats` array).
