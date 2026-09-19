const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\angel\\.gemini\\antigravity-ide\\brain\\c652a2f2-deeb-4820-a650-0c3b7eb24aff';
const publicDir = path.resolve(__dirname, '../public/projects');

const mappings = [
  {
    src: path.join(brainDir, 'quadra_store_artisan_1789713002529.jpg'),
    dest: path.join(publicDir, 'quadra', 'quadra-store.webp'),
    name: 'Quadra Store (Artisan Square Pizza)'
  },
  {
    src: path.join(brainDir, 'quadra_erp_management_1789713674676.jpg'),
    dest: path.join(publicDir, 'quadra', 'quadra-erp.webp'),
    name: 'Quadra ERP (Pizzeria Kitchen & Management)'
  },
  {
    src: path.join(brainDir, 'ecoparque_industrial_park_1789713047895.jpg'),
    dest: path.join(publicDir, 'ecoparque', 'ecoparque-mobile.webp'),
    name: 'Ecoparque Mobile (Aerial Industrial Park)'
  },
  {
    src: path.join(brainDir, 'guardforce_soc_shield_1789713101660.jpg'),
    dest: path.join(publicDir, 'guardforce', 'guardforce-web.webp'),
    name: 'GuardForce Web (Holographic Cyber SOC)'
  },
  {
    src: path.join(brainDir, 'nairda_luxury_salon_1789713201826.jpg'),
    dest: path.join(publicDir, 'nairda', 'nairda-web.webp'),
    name: 'Nairda Landing (Luxury Salon Interior with Logo)'
  },
  {
    src: path.join(brainDir, 'nairda_pwa_tools_1789713268002.jpg'),
    dest: path.join(publicDir, 'nairda', 'nairda-pwa.webp'),
    name: 'Nairda PWA (Luxury Branded Salon Products)'
  },
  {
    src: path.join(brainDir, 'futuriza_crm_workspace_1789713326290.jpg'),
    dest: path.join(publicDir, 'futuriza', 'futuriza-crm.webp'),
    name: 'FuturizaTech CRM (Developer Workstation with Logo)'
  },
  {
    src: path.join(brainDir, 'ferreyra_angus_pampa_1789713390262.jpg'),
    dest: path.join(publicDir, 'ferreyra', 'ferreyra-web.webp'),
    name: 'Ferreyra Web (Majestic Angus Bull in Pampa)'
  },
  {
    src: path.join(brainDir, 'ferreyra_gestor_logistics_1789713450557.jpg'),
    dest: path.join(publicDir, 'ferreyra', 'ferreyra-gestor.webp'),
    name: 'Gestor Ferreyra (Modern Logistics & Food Distribution Hub)'
  },
  {
    src: path.join(brainDir, 'masecor_laser_cnc_cutting_1789713552864.jpg'),
    dest: path.join(publicDir, 'masecor', 'masecor-web.webp'),
    name: 'Masecor Landing (CNC Fiber Laser Cutting with Sparks)'
  }
];

async function deploy() {
  console.log('Deploying final portfolio images...\n');

  for (const item of mappings) {
    if (!fs.existsSync(item.src)) {
      console.error(`ERROR: Source file missing: ${item.src}`);
      continue;
    }

    const dir = path.dirname(item.dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    await sharp(item.src)
      .resize(1280, 720, { fit: 'cover', position: 'center' })
      .webp({ quality: 88 })
      .toFile(item.dest);

    const stat = fs.statSync(item.dest);
    console.log(`✔ [DEPLOYED] ${item.name} -> ${item.dest} (${(stat.size / 1024).toFixed(1)} KB)`);
  }

  console.log('\nAll images converted and deployed to public directory successfully!');
}

deploy().catch(console.error);
