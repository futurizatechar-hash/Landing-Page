const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const userDir = path.join(process.env.USERPROFILE, '.gemini', 'antigravity-ide', 'brain', '6e538743-e436-44ab-82b5-fea5e40331ee', '.user_uploaded');
const src = path.join(userDir, 'media_1789757551014.png');
const destWebp = path.join('public', 'projects', 'spartan', 'spartan-app.webp');
const destJpg = path.join('public', 'projects', 'spartan', 'spartan-app.jpg');

async function buildAppCard() {
  const bg = await sharp(src)
    .resize(1280, 720, { fit: 'cover' })
    .blur(28)
    .modulate({ brightness: 0.35 })
    .toBuffer();

  const phoneHeight = 670;
  const phoneWidth = Math.round(575 * (phoneHeight / 1024)); // ~376

  const roundedCorners = Buffer.from(
    `<svg><rect x="0" y="0" width="${phoneWidth}" height="${phoneHeight}" rx="24" ry="24"/></svg>`
  );

  const phoneScreen = await sharp(src)
    .resize(phoneWidth, phoneHeight)
    .composite([{ input: roundedCorners, blend: 'dest-in' }])
    .toBuffer();

  // Add subtle border / frame
  const borderSvg = Buffer.from(
    `<svg width="${phoneWidth}" height="${phoneHeight}"><rect x="1" y="1" width="${phoneWidth - 2}" height="${phoneHeight - 2}" rx="24" ry="24" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2"/></svg>`
  );

  const phoneWithBorder = await sharp(phoneScreen)
    .composite([{ input: borderSvg }])
    .toBuffer();

  const left = Math.round((1280 - phoneWidth) / 2);
  const top = Math.round((720 - phoneHeight) / 2);

  await sharp(bg)
    .composite([{ input: phoneWithBorder, left, top }])
    .webp({ quality: 95 })
    .toFile(destWebp);

  await sharp(destWebp)
    .jpeg({ quality: 95 })
    .toFile(destJpg);

  console.log(`Successfully generated 16:9 Spartan App showcase: ${phoneWidth}x${phoneHeight} at left:${left}, top:${top}`);
}

buildAppCard().catch(err => {
  console.error(err);
  process.exit(1);
});
