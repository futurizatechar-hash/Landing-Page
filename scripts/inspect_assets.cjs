const fs = require('fs');
const path = require('path');

const baseDir = 'C:\\Users\\angel\\OneDrive\\futuriza\\proyectos';

function findFiles(dir, depth = 0) {
  if (depth > 4) return [];
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      if (['node_modules', '.git', '.next', 'dist', '.vite', 'cache'].includes(file)) continue;
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        results = results.concat(findFiles(fullPath, depth + 1));
      } else {
        const ext = path.extname(file).toLowerCase();
        if (['.png', '.jpg', '.jpeg', '.webp', '.svg'].includes(ext)) {
          results.push({ fullPath, size: stat.size, rel: path.relative(baseDir, fullPath) });
        }
      }
    }
  } catch (e) {}
  return results;
}

['ferreyra', 'masecor', 'guardforcesegurity', 'nairda', 'quadra-pizza', 'inactivos'].forEach(proj => {
  console.log(`\n=== PROJECT: ${proj} ===`);
  const imgs = findFiles(path.join(baseDir, proj));
  imgs.forEach(i => console.log(`  ${i.rel} (${(i.size / 1024).toFixed(1)} KB)`));
});
