const sharp = require('sharp');

async function buildFinalOG() {
  console.log('Building pixel-perfect Open Graph asset with zero artifacts...');

  // 1. Prepare pristine text with NO border artifacts
  const rawText = await sharp('public/test-text.png')
    .extract({ left: 4, top: 0, width: 768, height: 105 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const data = rawText.data;
  const width = rawText.info.width;
  const height = rawText.info.height;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i+1];
    const b = data[i+2];

    // Background white elimination
    if (r > 245 && g > 245 && b > 245) {
      data[i+3] = 0;
    } else if (r > 220 && g > 220 && b > 220) {
      data[i+3] = Math.round(255 - ((r + g + b) / 3 - 220) / 25 * 255);
    } else {
      // It's part of the text
      const isOrange = r > 160 && g < 120 && b < 80;
      const isCyan = b > 140 && g > 120 && r < 100;

      if (!isOrange && !isCyan) {
        // Change dark navy letters to pure crisp white
        data[i] = 255;
        data[i+1] = 255;
        data[i+2] = 255;
      }
    }
  }

  const pristineWhiteText = await sharp(data, { raw: { width, height, channels: 4 } })
    .resize(430, 59, { fit: 'contain' })
    .png()
    .toBuffer();

  const globe = await sharp('public/favicon.webp')
    .resize(150, 150, { fit: 'contain' })
    .toBuffer();

  // 2. High-end Dark SVG Canvas (1200x630)
  const svg = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="deepDark" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stop-color="#0F2440" />
          <stop offset="55%" stop-color="#0A192F" />
          <stop offset="100%" stop-color="#050C17" />
        </radialGradient>
        <radialGradient id="cyanCenter" cx="50%" cy="30%" r="35%">
          <stop offset="0%" stop-color="#00E5FF" stop-opacity="0.22" />
          <stop offset="100%" stop-color="#00E5FF" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="orangeGlow" cx="85%" cy="80%" r="35%">
          <stop offset="0%" stop-color="#C2410C" stop-opacity="0.18" />
          <stop offset="100%" stop-color="#C2410C" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="cyanLeft" cx="12%" cy="25%" r="35%">
          <stop offset="0%" stop-color="#00E5FF" stop-opacity="0.14" />
          <stop offset="100%" stop-color="#00E5FF" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Deep Tech Background -->
      <rect width="1200" height="630" fill="url(#deepDark)" />
      <rect width="1200" height="630" fill="url(#cyanCenter)" />
      <rect width="1200" height="630" fill="url(#cyanLeft)" />
      <rect width="1200" height="630" fill="url(#orangeGlow)" />

      <!-- Subtle Cyber Grid Patterns (Side wings) -->
      <g stroke="#1E2E48" stroke-width="1" opacity="0.35">
        <line x1="80" y1="0" x2="80" y2="630" />
        <line x1="200" y1="0" x2="200" y2="630" />
        <line x1="1000" y1="0" x2="1000" y2="630" />
        <line x1="1120" y1="0" x2="1120" y2="630" />
        <line x1="0" y1="120" x2="1200" y2="120" />
        <line x1="0" y1="510" x2="1200" y2="510" />
      </g>

      <!-- Outer Frame -->
      <rect x="24" y="24" width="1152" height="582" rx="28" fill="none" stroke="#1B3352" stroke-width="1.5" />

      <!-- Top Badge (y = 68, center = 600) -->
      <g transform="translate(600, 68)" text-anchor="middle">
        <rect x="-165" y="-18" width="330" height="36" rx="18" fill="#112240" stroke="#1E385C" stroke-width="1.2" />
        <circle cx="-138" cy="0" r="4.5" fill="#00E5FF" />
        <text x="-122" y="5" font-family="'Montserrat', 'Arial', sans-serif" font-size="11" font-weight="800" fill="#E2E8F0" letter-spacing="2" text-anchor="start">
          INGENIERÍA &amp; AUTOMATIZACIÓN B2B
        </text>
      </g>

      <!-- Center Globe Glow Backing (y = 115, height = 150) -->
      <circle cx="600" cy="190" r="85" fill="#00E5FF" fill-opacity="0.08" />

      <!-- Tagline / Headline below FUTURIZA -->
      <text x="600" y="395" font-family="'Montserrat', 'Arial', sans-serif" font-size="24" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="-0.5">
        Sistemas de Gestión &amp; Software a Medida
      </text>

      <!-- Services List (y = 438) -->
      <text x="600" y="438" font-family="'Open Sans', 'Arial', sans-serif" font-size="16" font-weight="600" fill="#94A3B8" text-anchor="middle">
        Webs de Alta Performance  •  Agentes IA  •  Procesos B2B
      </text>

      <!-- Bottom Domain Pill (y = 492) -->
      <g transform="translate(600, 492)" text-anchor="middle">
        <rect x="-140" y="-18" width="280" height="36" rx="18" fill="#C2410C" />
        <text x="0" y="6" font-family="'Montserrat', 'Arial', sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" letter-spacing="2">
          FUTURIZATECH.COM
        </text>
      </g>

      <!-- Location Info (y = 555) -->
      <text x="600" y="555" font-family="'Open Sans', 'Arial', sans-serif" font-size="13" font-weight="600" fill="#64748B" text-anchor="middle">
        Córdoba, Argentina  •  Atención para toda Latinoamérica
      </text>
    </svg>
  `);

  // Globe at x = 600 - 75 = 525, y = 115
  // Text at x = 600 - 215 = 385, y = 290
  await sharp(svg)
    .composite([
      { input: globe, left: 525, top: 115 },
      { input: pristineWhiteText, left: 385, top: 290 }
    ])
    .png({ quality: 95, compressionLevel: 8 })
    .toFile('public/og-image.png');

  console.log('✔ public/og-image.png generated successfully (1200x630)');

  // 3. Generate 1:1 square simulation for WhatsApp & Instagram mobile crop
  await sharp('public/og-image.png')
    .extract({ left: 285, top: 0, width: 630, height: 630 })
    .png()
    .toFile('public/og-test-whatsapp-square.png');

  console.log('✔ public/og-test-whatsapp-square.png generated (630x630 WhatsApp Simulation)');
}

buildFinalOG().catch(console.error);
