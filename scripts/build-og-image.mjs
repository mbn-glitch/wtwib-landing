import sharp from 'sharp';
import { readFileSync } from 'fs';

const W = 1200;
const H = 630;
const CARD_WIDTH = 540;

const cardBuf = readFileSync('public/wtraders-physical-card.webp');
const cardResized = await sharp(cardBuf)
  .resize({ width: CARD_WIDTH })
  .png()
  .toBuffer();

const cardMeta = await sharp(cardResized).metadata();
const cardLeft = W - cardMeta.width - 60;
const cardTop = Math.round((H - cardMeta.height) / 2);

const textSvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .brand { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; font-weight: 700; font-size: 76px; fill: #FFFFFF; letter-spacing: -1.5px; }
    .tag   { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; font-weight: 600; font-size: 40px; fill: #C9A961; letter-spacing: -0.5px; }
    .url   { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; font-weight: 500; font-size: 22px; fill: #888888; letter-spacing: 1px; }
  </style>
  <text x="72" y="280" class="brand">Wtraders Card</text>
  <text x="72" y="350" class="tag">Real Power for Traders</text>
  <text x="72" y="540" class="url">WTRADERSCARD.COM</text>
</svg>
`;

await sharp({
  create: {
    width: W,
    height: H,
    channels: 4,
    background: { r: 10, g: 10, b: 10, alpha: 1 },
  },
})
  .composite([
    { input: cardResized, left: cardLeft, top: cardTop },
    { input: Buffer.from(textSvg), left: 0, top: 0 },
  ])
  .png()
  .toFile('public/og-image.png');

const out = await sharp('public/og-image.png').metadata();
console.log(`Created: public/og-image.png  ${out.width}x${out.height}  format=${out.format}`);
