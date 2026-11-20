// Script de exportación de activos gráficos para Instagram de Tu Tablita
const path = require('path');
const fs = require('fs');

function loadPlaywright() {
  const localRuntime = process.env.LOCALAPPDATA
    ? path.join(process.env.LOCALAPPDATA, 'playwright-runtime', 'node_modules', 'playwright-core')
    : null;
  if (localRuntime && fs.existsSync(localRuntime)) {
    return require(localRuntime);
  }
  try {
    return require('playwright-core');
  } catch {
    return require('playwright');
  }
}

const ITEMS = [
  {
    svg: path.join(__dirname, 'activos', 'avatar-perfil-1080x1080.svg'),
    png: path.join(__dirname, 'activos', 'avatar-perfil-1080x1080.png'),
    width: 1080,
    height: 1080
  },
  {
    svg: path.join(__dirname, 'activos', 'avatar-isotipo-1080x1080.svg'),
    png: path.join(__dirname, 'activos', 'avatar-isotipo-1080x1080.png'),
    width: 1080,
    height: 1080
  },
  {
    svg: path.join(__dirname, 'activos', 'destacadas', '01-horarios-1080x1920.svg'),
    png: path.join(__dirname, 'activos', 'destacadas', '01-horarios-1080x1920.png'),
    width: 1080,
    height: 1920
  },
  {
    svg: path.join(__dirname, 'activos', 'destacadas', '02-picadas-1080x1920.svg'),
    png: path.join(__dirname, 'activos', 'destacadas', '02-picadas-1080x1920.png'),
    width: 1080,
    height: 1920
  },
  {
    svg: path.join(__dirname, 'activos', 'destacadas', '03-rubros-1080x1920.svg'),
    png: path.join(__dirname, 'activos', 'destacadas', '03-rubros-1080x1920.png'),
    width: 1080,
    height: 1920
  },
  {
    svg: path.join(__dirname, 'activos', 'destacadas', '04-club-puntos-1080x1920.svg'),
    png: path.join(__dirname, 'activos', 'destacadas', '04-club-puntos-1080x1920.png'),
    width: 1080,
    height: 1920
  },
  {
    svg: path.join(__dirname, 'activos', 'destacadas', '05-ubicacion-1080x1920.svg'),
    png: path.join(__dirname, 'activos', 'destacadas', '05-ubicacion-1080x1920.png'),
    width: 1080,
    height: 1920
  },
  {
    svg: path.join(__dirname, 'activos', 'destacadas', '06-pedidos-1080x1920.svg'),
    png: path.join(__dirname, 'activos', 'destacadas', '06-pedidos-1080x1920.png'),
    width: 1080,
    height: 1920
  }
];

(async () => {
  const { chromium } = loadPlaywright();
  let browser;
  try {
    browser = await chromium.launch({ channel: 'msedge' });
  } catch {
    browser = await chromium.launch();
  }

  for (const item of ITEMS) {
    if (!fs.existsSync(item.svg)) {
      console.warn('SVG no encontrado:', item.svg);
      continue;
    }

    const svgContent = fs.readFileSync(item.svg, 'utf8');
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Montserrat:ital,wght@0,700;0,900;1,900&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: ${item.width}px; height: ${item.height}px; overflow: hidden; background: #000; }
    svg { width: ${item.width}px; height: ${item.height}px; display: block; }
  </style>
</head>
<body>
  ${svgContent}
</body>
</html>`;

    const page = await browser.newPage({
      viewport: { width: item.width, height: item.height },
      deviceScaleFactor: 1
    });

    await page.setContent(html, { waitUntil: 'networkidle' });
    // Pequeña espera para renderizado de fuentes de Google
    await page.waitForTimeout(600);

    const dir = path.dirname(item.png);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    await page.screenshot({ path: item.png, type: 'png' });
    console.log('Exportado:', path.relative(__dirname, item.png));
    await page.close();
  }

  await browser.close();
  console.log('¡Todos los activos fueron exportados en alta definición a PNG!');
})();
