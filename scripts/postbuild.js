/* eslint-env node */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const ASSETS_DIR = path.join(DIST_DIR, 'assets');

try {
  // Read the built HTML file
  let html = fs.readFileSync(HTML_FILE, 'utf-8');

  // Find all CSS files in the assets directory
  const files = fs.readdirSync(ASSETS_DIR);
  const cssFiles = files.filter(f => f.endsWith('.css'));

  if (cssFiles.length === 0) {
    console.log('No CSS files found to inline.');
    process.exit(0);
  }

  // Read all CSS content
  let allCssContent = '';
  for (const cssFile of cssFiles) {
    const cssPath = path.join(ASSETS_DIR, cssFile);
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    allCssContent += cssContent;
    
    // Remove the `<link rel="stylesheet">` tag from HTML for this file
    const regex = new RegExp(`<link[^>]*href="[^"]*${cssFile}"[^>]*>`, 'gi');
    html = html.replace(regex, '');
  }

  // Inject the `<style>` tag into the `<head>` of HTML
  const styleTag = `<style>${allCssContent}</style>`;
  html = html.replace('</head>', `${styleTag}\n  </head>`);

  // Write the modified HTML back
  fs.writeFileSync(HTML_FILE, html, 'utf-8');
  console.log('✅ Successfully inlined CSS into index.html');

} catch (err) {
  console.error('❌ Error inlining CSS:', err);
  process.exit(1);
}
