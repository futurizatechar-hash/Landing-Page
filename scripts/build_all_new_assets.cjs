const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const userDir = path.join(process.env.USERPROFILE, '.gemini', 'antigravity-ide', 'brain', '6e538743-e436-44ab-82b5-fea5e40331ee', '.user_uploaded');

async function processAssets() {
  // 1. Gestor Web con IA (Spartan Admin)
  const spartanDir = path.join('public', 'projects', 'spartan');
  await sharp(path.join(userDir, 'media_1789760540649.png'))
    .webp({ quality: 92 })
    .toFile(path.join(spartanDir, 'spartan-admin-login.webp'));
  await sharp(path.join(userDir, 'media_1789760540609.png'))
    .webp({ quality: 92 })
    .toFile(path.join(spartanDir, 'spartan-admin-grilla.webp'));
  await sharp(path.join(userDir, 'media_1789760540566.png'))
    .webp({ quality: 92 })
    .toFile(path.join(spartanDir, 'spartan-admin-borrador.webp'));
  console.log('✓ Spartan Admin assets generated');

  // 2. Nairda PWA
  const nairdaDir = path.join('public', 'projects', 'nairda');
  if (!fs.existsSync(nairdaDir)) fs.mkdirSync(nairdaDir, { recursive: true });
  await sharp(path.join(userDir, 'media_1789759096624.png'))
    .webp({ quality: 92 })
    .toFile(path.join(nairdaDir, 'nairda-pwa.webp'));
  console.log('✓ Nairda PWA assets generated');

  // 3. Nairda Landing
  // Save raw screenshots
  await sharp(path.join(userDir, 'media_1789759033229.png'))
    .webp({ quality: 92 })
    .toFile(path.join(nairdaDir, 'nairda-landing-hero.webp'));
  await sharp(path.join(userDir, 'media_1789759033132.png'))
    .webp({ quality: 92 })
    .toFile(path.join(nairdaDir, 'nairda-landing-calendario.webp'));
  await sharp(path.join(userDir, 'media_1789759033099.png'))
    .webp({ quality: 92 })
    .toFile(path.join(nairdaDir, 'nairda-landing-confirmacion.webp'));
  await sharp(path.join(userDir, 'media_1789759033243.png'))
    .webp({ quality: 92 })
    .toFile(path.join(nairdaDir, 'nairda-landing-menu.webp'));

  // Build 16:9 card cover for Nairda Landing
  const nairdaHeroSrc = path.join(userDir, 'media_1789759033229.png');
  const nairdaBg = await sharp(nairdaHeroSrc)
    .resize(1280, 720, { fit: 'cover' })
    .blur(25)
    .modulate({ brightness: 0.35 })
    .toBuffer();

  const nairdaPhoneH = 680;
  const nairdaPhoneW = Math.round(471 * (nairdaPhoneH / 1024)); // ~313
  const nairdaRounded = Buffer.from(
    `<svg><rect x="0" y="0" width="${nairdaPhoneW}" height="${nairdaPhoneH}" rx="22" ry="22"/></svg>`
  );
  const nairdaPhoneScreen = await sharp(nairdaHeroSrc)
    .resize(nairdaPhoneW, nairdaPhoneH)
    .composite([{ input: nairdaRounded, blend: 'dest-in' }])
    .toBuffer();
  const nairdaBorder = Buffer.from(
    `<svg width="${nairdaPhoneW}" height="${nairdaPhoneH}"><rect x="1" y="1" width="${nairdaPhoneW - 2}" height="${nairdaPhoneH - 2}" rx="22" ry="22" fill="none" stroke="rgba(212,175,55,0.3)" stroke-width="2"/></svg>`
  );
  const nairdaPhoneWithBorder = await sharp(nairdaPhoneScreen)
    .composite([{ input: nairdaBorder }])
    .toBuffer();
  const nairdaLeft = Math.round((1280 - nairdaPhoneW) / 2);
  const nairdaTop = Math.round((720 - nairdaPhoneH) / 2);

  await sharp(nairdaBg)
    .composite([{ input: nairdaPhoneWithBorder, left: nairdaLeft, top: nairdaTop }])
    .webp({ quality: 95 })
    .toFile(path.join(nairdaDir, 'nairda-web.webp'));
  console.log('✓ Nairda Landing assets generated');
}

processAssets().catch(err => {
  console.error(err);
  process.exit(1);
});
