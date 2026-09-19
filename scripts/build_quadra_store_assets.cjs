const sharp = require('sharp');
const path = require('path');

const userDir = path.join(process.env.USERPROFILE, '.gemini', 'antigravity-ide', 'brain', '6e538743-e436-44ab-82b5-fea5e40331ee', '.user_uploaded');
const outDir = path.join('public', 'projects', 'quadra');

const principalSrc = path.join(userDir, 'media_1789758131204.png');
const bebidasSrc = path.join(userDir, 'media_1789758131094.png');
const carritoSrc = path.join(userDir, 'media_1789758130932.png');
const checkoutSrc = path.join(userDir, 'media_1789758131019.png');

async function run() {
  // 1. Save raw webp files for each screen
  await sharp(principalSrc).webp({ quality: 92 }).toFile(path.join(outDir, 'quadra-store-principal.webp'));
  await sharp(bebidasSrc).webp({ quality: 92 }).toFile(path.join(outDir, 'quadra-store-bebidas.webp'));
  await sharp(carritoSrc).webp({ quality: 92 }).toFile(path.join(outDir, 'quadra-store-carrito.webp'));
  await sharp(checkoutSrc).webp({ quality: 92 }).toFile(path.join(outDir, 'quadra-store-checkout.webp'));

  // 2. Build 16:9 cover card for quadra-store.webp using the principal image
  const bg = await sharp(principalSrc)
    .resize(1280, 720, { fit: 'cover' })
    .blur(30)
    .modulate({ brightness: 0.35 })
    .toBuffer();

  const phoneHeight = 680;
  const phoneWidth = Math.round(768 * (phoneHeight / 1024)); // ~510

  const roundedCorners = Buffer.from(
    `<svg><rect x="0" y="0" width="${phoneWidth}" height="${phoneHeight}" rx="20" ry="20"/></svg>`
  );

  const phoneScreen = await sharp(principalSrc)
    .resize(phoneWidth, phoneHeight)
    .composite([{ input: roundedCorners, blend: 'dest-in' }])
    .toBuffer();

  const borderSvg = Buffer.from(
    `<svg width="${phoneWidth}" height="${phoneHeight}"><rect x="1" y="1" width="${phoneWidth - 2}" height="${phoneHeight - 2}" rx="20" ry="20" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2"/></svg>`
  );

  const phoneWithBorder = await sharp(phoneScreen)
    .composite([{ input: borderSvg }])
    .toBuffer();

  const left = Math.round((1280 - phoneWidth) / 2);
  const top = Math.round((720 - phoneHeight) / 2);

  await sharp(bg)
    .composite([{ input: phoneWithBorder, left, top }])
    .webp({ quality: 95 })
    .toFile(path.join(outDir, 'quadra-store.webp'));

  console.log('Quadra Store assets generated successfully');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
