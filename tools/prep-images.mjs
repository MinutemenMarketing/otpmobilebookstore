// Builds public/images from tools/originals. Run with: node tools/prep-images.mjs
import sharp from "sharp";
import toIco from "to-ico";
import { mkdir, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ORIGINALS = path.join(__dirname, "originals");
const OUT = path.join(__dirname, "..", "public", "images");
const ICONS_OUT = path.join(__dirname, "..", "public", "icons");
const APP_DIR = path.join(__dirname, "..", "app");

async function ensureOut() {
  await mkdir(OUT, { recursive: true });
  await mkdir(ICONS_OUT, { recursive: true });
}

async function widths(srcPath, name, sizes, { quality = 82 } = {}) {
  for (const w of sizes) {
    await sharp(srcPath)
      .resize({ width: w })
      .webp({ quality })
      .toFile(path.join(OUT, `${name}-${w}.webp`));
  }
}

// Removes a near-white or near-black background and feathers the edge, for the
// hand-illustrated artwork which was supplied on flat white/black canvases.
async function keyBackground(srcPath, { mode }) {
  const img = sharp(srcPath).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (mode === "white") {
      const minC = Math.min(r, g, b);
      if (minC > 235) data[i + 3] = 0;
      else if (minC > 200) data[i + 3] = Math.round((255 * (235 - minC)) / 35);
    } else {
      const maxC = Math.max(r, g, b);
      if (maxC < 14) data[i + 3] = 0;
      else if (maxC < 45) data[i + 3] = Math.round((255 * (maxC - 14)) / 31);
    }
  }
  return sharp(data, { raw: { width, height, channels } });
}

async function run() {
  await ensureOut();

  // Book cover — full cover, aspect preserved, no crop.
  await widths(path.join(ORIGINALS, "book-lion-women-of-tehran.jpg"), "book-lion-women-of-tehran", [350, 525, 700, 1050], { quality: 88 });

  // Logo + road artwork — white bg removed, used on cream grounds.
  const logoCutout = await keyBackground(path.join(ORIGINALS, "logo-artwork.jpg"), { mode: "white" });
  const logoBuf = await logoCutout.png().toBuffer();
  for (const w of [480, 800, 1200]) {
    await sharp(logoBuf).resize({ width: w }).webp({ quality: 90 }).toFile(path.join(OUT, `logo-artwork-${w}.webp`));
  }

  // Merch badge/trailer illustration — black bg removed, used on ink grounds.
  const badgeCutout = await keyBackground(path.join(ORIGINALS, "merch-badge-artwork.jpg"), { mode: "black" });
  const badgeBuf = await badgeCutout.png().toBuffer();
  for (const w of [480, 800, 1200]) {
    await sharp(badgeBuf).resize({ width: w }).webp({ quality: 90 }).toFile(path.join(OUT, `merch-badge-artwork-${w}.webp`));
  }

  // Trailer concept photography (side + rear) — straight resize, these are full photo compositions.
  await widths(path.join(ORIGINALS, "trailer-side-concept.jpg"), "trailer-side-concept", [640, 960, 1280, 1536]);
  await widths(path.join(ORIGINALS, "trailer-rear-concept.jpg"), "trailer-rear-concept", [480, 720, 960, 1254]);

  // Tee mockup — crop the black letterbox padding, split into front/back.
  const teeSrc = path.join(ORIGINALS, "tee-mockup.jpg");
  const top = 522, cropHeight = 1003 - 522 + 10, fullWidth = 706, split = 352;
  await sharp(teeSrc)
    .extract({ left: 0, top, width: split, height: cropHeight })
    .webp({ quality: 90 })
    .toFile(path.join(OUT, "tee-front-704.webp"));
  await sharp(teeSrc)
    .extract({ left: split, top, width: fullWidth - split, height: cropHeight })
    .webp({ quality: 90 })
    .toFile(path.join(OUT, "tee-back-704.webp"));
  // 2x variants for the product gallery
  await sharp(teeSrc)
    .extract({ left: 0, top, width: split, height: cropHeight })
    .resize({ width: split * 2 })
    .webp({ quality: 90 })
    .toFile(path.join(OUT, "tee-front-1408.webp"));
  await sharp(teeSrc)
    .extract({ left: split, top, width: fullWidth - split, height: cropHeight })
    .resize({ width: (fullWidth - split) * 2 })
    .webp({ quality: 90 })
    .toFile(path.join(OUT, "tee-back-1408.webp"));

  // Header wordmark — full horizontal lockup, transparent bg, padding trimmed to the real
  // artwork bounds so it isn't scaled down by invisible margin.
  const logoHorizontalTrimmed = await sharp(path.join(ORIGINALS, "logo-horizontal.webp"))
    .trim({ threshold: 10 })
    .toBuffer();
  const logoHorizontalMeta = await sharp(logoHorizontalTrimmed).metadata();
  for (const w of [600, 900, 1200]) {
    await sharp(logoHorizontalTrimmed)
      .resize({ width: w })
      .webp({ quality: 92 })
      .toFile(path.join(OUT, `logo-horizontal-${w}.webp`));
  }

  // Favicon mark — the page-and-road portion of the same artwork, already cropped square-ish
  // in tools/originals/favicon-mark.png (no lettering). Pad to a true square on a transparent
  // canvas, then render every icon size from that one square source.
  const markMeta = await sharp(path.join(ORIGINALS, "favicon-mark.png")).metadata();
  const side = Math.max(markMeta.width, markMeta.height);
  const squareMark = await sharp(path.join(ORIGINALS, "favicon-mark.png"))
    .resize({
      width: side,
      height: side,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  const icoSizes = [16, 32, 48];
  const icoPngs = await Promise.all(
    icoSizes.map((s) => sharp(squareMark).resize(s, s).png().toBuffer()),
  );
  const icoBuffer = await toIco(icoPngs);
  await writeFile(path.join(APP_DIR, "favicon.ico"), icoBuffer);

  await sharp(squareMark).resize(180, 180).png().toFile(path.join(APP_DIR, "apple-icon.png"));
  await sharp(squareMark).resize(512, 512).png().toFile(path.join(APP_DIR, "icon.png"));
  await sharp(squareMark).resize(192, 192).png().toFile(path.join(ICONS_OUT, "icon-192.png"));
  await sharp(squareMark).resize(512, 512).png().toFile(path.join(ICONS_OUT, "icon-512.png"));

  // Supplier catalog covers — one real cover per ISBN, downloaded by tools/lookup-isbn.mjs into
  // tools/originals/catalog/. Aspect preserved, no crop, same width set as the demo book cover.
  const catalogDir = path.join(ORIGINALS, "catalog");
  let catalogFiles = [];
  try {
    catalogFiles = (await readdir(catalogDir)).filter((f) => f.endsWith(".jpg"));
  } catch {
    // no catalog covers yet
  }
  if (catalogFiles.length > 0) {
    await mkdir(path.join(OUT, "catalog"), { recursive: true });
    for (const file of catalogFiles) {
      const isbn = file.replace(/\.jpg$/, "");
      for (const w of [350, 525, 700]) {
        await sharp(path.join(catalogDir, file))
          .resize({ width: w })
          .webp({ quality: 88 })
          .toFile(path.join(OUT, "catalog", `${isbn}-${w}.webp`));
      }
    }
    console.log(`Processed ${catalogFiles.length} catalog cover(s).`);
  }

  // Open Graph image: logo artwork centered on cream canvas.
  const ogLogo = await sharp(logoBuf).resize({ height: 560, fit: "inside" }).toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: "#F3E7CC" } })
    .composite([{ input: ogLogo, gravity: "center" }])
    .flatten({ background: "#F3E7CC" })
    .jpeg({ quality: 88 })
    .toFile(path.join(OUT, "og-default.jpg"));

  console.log("Header logo trimmed size:", logoHorizontalMeta.width, "x", logoHorizontalMeta.height);
  console.log("Image build complete →", OUT);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
