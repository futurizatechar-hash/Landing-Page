const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const userDir = path.join(process.env.USERPROFILE, '.gemini', 'antigravity-ide', 'brain', '6e538743-e436-44ab-82b5-fea5e40331ee', '.user_uploaded');

async function processImages() {
  // Map images from .user_uploaded to their target locations
  const tasks = [
    // FuturizaTech CRM
    {
      src: 'media_1789779465712.png',
      dest: 'public/projects/futuriza/futuriza-bandeja-ia.webp'
    },
    {
      src: 'media_1789779465736.png',
      dest: 'public/projects/futuriza/futuriza-centro-mando.webp'
    },
    {
      src: 'media_1789779465785.png',
      dest: 'public/projects/futuriza/futuriza-embudo.webp'
    },
    // GuardForce Web
    {
      src: 'media_1789779465801.png',
      dest: 'public/projects/guardforce/guardforce-web.webp'
    },
    // Masecor Almacén
    {
      src: 'media_1789779465853.png',
      dest: 'public/projects/masecor/masecor-almacen.webp'
    }
  ];

  for (const task of tasks) {
    const srcPath = path.join(userDir, task.src);
    const destPath = path.join(__dirname, '..', task.dest);
    
    // Ensure dir exists
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await sharp(srcPath)
      .resize(1280, 720, { fit: 'cover', position: 'top' }) // position top in case it's taller
      .webp({ quality: 92 })
      .toFile(destPath);
      
    console.log(`✓ Processed ${task.dest}`);
  }
}

processImages().catch(console.error);
