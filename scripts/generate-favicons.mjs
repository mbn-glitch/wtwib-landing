import sharp from "sharp";
import { writeFileSync } from "fs";
import { join } from "path";

const PUBLIC = "C:/Users/Mrmbn/my-landing-page/public";
const SRC = "C:/Users/Mrmbn/my-landing-page/Fiper Logo white2.png";

async function createFavicon(size, filename) {
  // Create a red rounded-rect background with the white Fiper swoosh centered
  const padding = Math.round(size * 0.12);
  const cornerRadius = Math.round(size * 0.22);
  const logoSize = size - padding * 2;

  // Create the red rounded square background
  const bg = Buffer.from(`
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="${cornerRadius}" ry="${cornerRadius}" fill="#DC2626"/>
    </svg>
  `);

  // Resize the white swoosh logo to fit
  const logo = await sharp(SRC)
    .trim()
    .resize(Math.round(logoSize * 0.75), Math.round(logoSize * 0.85), {
      fit: "inside",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  const logoMeta = await sharp(logo).metadata();

  // Composite: red bg + white logo centered
  const result = await sharp(bg)
    .resize(size, size)
    .composite([
      {
        input: logo,
        left: Math.round((size - logoMeta.width) / 2),
        top: Math.round((size - logoMeta.height) / 2),
      },
    ])
    .png()
    .toBuffer();

  const outPath = join(PUBLIC, filename);
  writeFileSync(outPath, result);
  console.log(`Created ${filename} (${size}x${size})`);
  return result;
}

async function createICO(pngBuffers) {
  // Build ICO file manually — ICO format:
  // Header (6 bytes) + Directory entries (16 bytes each) + PNG data
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * numImages;

  let dataOffset = headerSize + dirSize;
  const entries = [];

  for (const { buffer, size } of pngBuffers) {
    entries.push({ buffer, size, offset: dataOffset });
    dataOffset += buffer.length;
  }

  const ico = Buffer.alloc(dataOffset);

  // ICO header: reserved(2) + type(2, 1=ico) + count(2)
  ico.writeUInt16LE(0, 0);
  ico.writeUInt16LE(1, 2);
  ico.writeUInt16LE(numImages, 4);

  // Directory entries
  entries.forEach((entry, i) => {
    const off = headerSize + i * dirEntrySize;
    ico.writeUInt8(entry.size < 256 ? entry.size : 0, off); // width
    ico.writeUInt8(entry.size < 256 ? entry.size : 0, off + 1); // height
    ico.writeUInt8(0, off + 2); // color palette
    ico.writeUInt8(0, off + 3); // reserved
    ico.writeUInt16LE(1, off + 4); // color planes
    ico.writeUInt16LE(32, off + 6); // bits per pixel
    ico.writeUInt32LE(entry.buffer.length, off + 8); // size of data
    ico.writeUInt32LE(entry.offset, off + 12); // offset to data
  });

  // Image data
  entries.forEach((entry) => {
    entry.buffer.copy(ico, entry.offset);
  });

  writeFileSync(join(PUBLIC, "favicon.ico"), ico);
  console.log("Created favicon.ico (multi-resolution)");
}

async function main() {
  console.log("Generating favicon set from Fiper white swoosh logo...\n");

  // Generate all PNG sizes
  const buf16 = await createFavicon(16, "favicon-16x16.png");
  const buf32 = await createFavicon(32, "favicon-32x32.png");
  const buf48 = await createFavicon(48, "favicon-48x48.png");
  await createFavicon(180, "apple-touch-icon.png");
  await createFavicon(192, "android-chrome-192x192.png");
  await createFavicon(512, "android-chrome-512x512.png");

  // Build multi-resolution ICO
  await createICO([
    { buffer: buf16, size: 16 },
    { buffer: buf32, size: 32 },
    { buffer: buf48, size: 48 },
  ]);

  console.log("\nAll favicons generated!");
}

main().catch(console.error);
