const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function targetOptimize(inputPath, maxWidth, quality) {
  try {
    const inputBuf = fs.readFileSync(inputPath);
    const originalSize = inputBuf.length;
    
    let pipeline = sharp(inputBuf);
    pipeline = pipeline.resize({ width: maxWidth, fit: 'inside', withoutEnlargement: true });
    
    const buffer = await pipeline.webp({ quality: quality, effort: 6 }).toBuffer();
    
    fs.writeFileSync(inputPath, buffer);
    console.log(`Optimized ${inputPath}: ${(originalSize/1024).toFixed(1)} KiB -> ${(buffer.length/1024).toFixed(1)} KiB`);
  } catch(e) {
    console.error(`Failed to optimize ${inputPath}:`, e.message);
  }
}

async function main() {
  await targetOptimize('public/logo-horizontal.webp', 180, 80);
  await targetOptimize('public/projects/spartan/spartan-app.webp', 230, 80);
  await targetOptimize('public/projects/spartan/spartan-web.webp', 600, 80);
}

main().catch(console.error);
