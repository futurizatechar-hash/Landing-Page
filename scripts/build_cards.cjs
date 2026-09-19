const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function buildCards() {
  console.log('Starting card asset generation...');

  // 1. Quadra Pizza Store: Artisan square pizza (quadravariedad.png) centered on 1280x720 with warm gourmet background
  const pizza = await sharp('public/projects/quadra/quadra-variedad.png')
    .resize(680, 680, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: {
      width: 1280,
      height: 720,
      channels: 4,
      background: { r: 232, g: 90, b: 16, alpha: 1 } // Quadra warm gourmet orange
    }
  })
  .composite([
    { input: pizza, gravity: 'center' }
  ])
  .png()
  .toFile('public/projects/quadra/quadra-store.png');
  console.log('✔ Quadra Store: pizza square variety generated');

  // 2. Quadra Pizza ERP: Dark slate gourmet background with Quadra Logo
  const qLogo = await sharp('public/projects/quadra/quadra-logo.jpg')
    .resize(460, 460, { fit: 'contain' })
    .toBuffer();

  const qCardSvg = Buffer.from(`
    <svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="qg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#2a221d" />
          <stop offset="100%" stop-color="#14110f" />
        </radialGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#qg)" />
      <rect x="380" y="100" width="520" height="520" rx="36" fill="#ffffff" opacity="0.05" stroke="#e85a10" stroke-width="2" />
    </svg>
  `);

  await sharp(qCardSvg)
  .composite([
    { input: qLogo, gravity: 'center' }
  ])
  .png()
  .toFile('public/projects/quadra/quadra-erp.png');
  console.log('✔ Quadra ERP: logo on dark gourmet background generated');

  // 3. Ecoparque Industrial: Official brand blue #133963 with full logo properly framed
  const ecoLogo = await sharp('../../guardforcesegurity/ecoparque/assets/images/logo-full.png')
    .resize(850, 160, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const ecoSvg = Buffer.from(`
    <svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="eg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f2b4c" />
          <stop offset="100%" stop-color="#133963" />
        </linearGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#eg)" />
      <rect x="180" y="210" width="920" height="300" rx="28" fill="#ffffff" opacity="0.98" />
    </svg>
  `);

  await sharp(ecoSvg)
  .composite([
    { input: ecoLogo, gravity: 'center' }
  ])
  .png()
  .toFile('public/projects/ecoparque/ecoparque-mobile.png');
  console.log('✔ Ecoparque: centered full logo on corporate blue generated');

  // 4. GuardForce Web: Dark cyber navy #080e1a with glowing cyan shield centered
  const gfShield = await sharp('public/projects/guardforce/guardforce-icon.png')
    .resize(520, 520, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const gfSvg = Buffer.from(`
    <svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gg" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stop-color="#0a2a3a" />
          <stop offset="100%" stop-color="#050a12" />
        </radialGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#gg)" />
      <circle cx="640" cy="360" r="280" fill="none" stroke="#00E5FF" stroke-width="1" opacity="0.15" stroke-dasharray="8 6" />
      <circle cx="640" cy="360" r="320" fill="none" stroke="#00E5FF" stroke-width="1" opacity="0.08" />
    </svg>
  `);

  await sharp(gfSvg)
  .composite([
    { input: gfShield, gravity: 'center' }
  ])
  .jpeg({ quality: 92 })
  .toFile('public/projects/guardforce/guardforce-web.jpeg');
  console.log('✔ GuardForce: cyber glowing shield on dark background generated');

  // 5. Nairda Studio (Web): Luxury studio dark background with centered circular logo
  const nairdaCircle = await sharp('public/projects/nairda/nairda-original.jpg')
    .resize(480, 480, { fit: 'contain' })
    .toBuffer();

  const nairdaSvg = Buffer.from(`
    <svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ng" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#242424" />
          <stop offset="100%" stop-color="#0d0d0d" />
        </radialGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#ng)" />
      <circle cx="640" cy="360" r="260" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.1" />
    </svg>
  `);

  await sharp(nairdaSvg)
  .composite([
    { input: nairdaCircle, gravity: 'center' }
  ])
  .jpeg({ quality: 92 })
  .toFile('public/projects/nairda/nairda-web.jpg');

  // Nairda PWA: Gold rim subtle accent
  const nairdaPwaSvg = Buffer.from(`
    <svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="npg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#1f1a14" />
          <stop offset="100%" stop-color="#0a0908" />
        </radialGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#npg)" />
      <circle cx="640" cy="360" r="260" fill="none" stroke="#d4af37" stroke-width="1.5" opacity="0.25" />
    </svg>
  `);

  await sharp(nairdaPwaSvg)
  .composite([
    { input: nairdaCircle, gravity: 'center' }
  ])
  .png()
  .toFile('public/projects/nairda/nairda-pwa.png');
  console.log('✔ Nairda Web & PWA generated');

  // 6. Futuriza CRM: Brand navy with clean white card for the horizontal logo
  const futLogo = await sharp('../futuriza-crm-ui/public/texto-logo-horizontal.webp')
    .resize(700, 160, { fit: 'contain' })
    .toBuffer();

  const futSvg = Buffer.from(`
    <svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="fg" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stop-color="#132c52" />
          <stop offset="100%" stop-color="#0A192F" />
        </radialGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#fg)" />
      <rect x="220" y="210" width="840" height="300" rx="24" fill="#ffffff" opacity="0.96" />
    </svg>
  `);

  await sharp(futSvg)
  .composite([
    { input: futLogo, gravity: 'center' }
  ])
  .webp({ quality: 92 })
  .toFile('public/projects/futuriza/futuriza-crm.webp');
  console.log('✔ Futuriza CRM generated');

  // 7. Establecimiento Ferreyra: Angus bull logo on agro-industrial card
  const fLogo = await sharp('public/projects/ferreyra/ferreyra-logo.png')
    .resize(650, 440, { fit: 'contain' })
    .toBuffer();

  const fSvg = Buffer.from(`
    <svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ferg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#2c2722" />
          <stop offset="100%" stop-color="#151311" />
        </radialGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#ferg)" />
      <rect x="240" y="110" width="800" height="500" rx="28" fill="#ffffff" opacity="0.97" />
    </svg>
  `);

  await sharp(fSvg)
  .composite([
    { input: fLogo, gravity: 'center' }
  ])
  .webp({ quality: 92 })
  .toFile('public/projects/ferreyra/ferreyra-gestor.webp');

  await sharp(fSvg)
  .composite([
    { input: fLogo, gravity: 'center' }
  ])
  .webp({ quality: 92 })
  .toFile('public/projects/ferreyra/ferreyra-web.webp');
  console.log('✔ Ferreyra Gestor & Web generated');

  console.log('ALL CARDS BUILT SUCCESSFULLY!');
}

buildCards().catch(console.error);
