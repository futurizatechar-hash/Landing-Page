const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const userDir = path.join(process.env.USERPROFILE, '.gemini', 'antigravity-ide', 'brain', '6e538743-e436-44ab-82b5-fea5e40331ee', '.user_uploaded');
const srcPath = path.join(userDir, 'media_1789780076401.png');
const destPath = path.join(__dirname, '..', 'public', 'projects', 'masecor', 'masecor-web.webp');

async function processImage() {
  await sharp(srcPath)
    .resize(1280, 720, { fit: 'cover', position: 'top' })
    .webp({ quality: 92 })
    .toFile(destPath);
    
  console.log(`✓ Processed Masecor Landing image to ${destPath}`);
}

processImage().catch(console.error);
