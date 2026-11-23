// ==========================================================================
// SIMULADOR INTERACTIVO DE PICADAS — TU TABLITA AUTOSERVICIO (MALAGUEÑO)
// Arquitectura de 3 Tiempos: 1. La Picada | 2. Bebidas | 3. Postres
// ==========================================================================

// 1. Catálogo oficial de la Pizarra de Tu Tablita (32 variedades: 16 carnes, 10 quesos, 6 agregados)
const PIZARRA_TU_TABLITA = [
  // --- CARNES & EMBUTIDOS (16 variedades) ---
  { id: 'salame-fino', nombre: 'Salame picado fino', cat: 'carnes', tipo: 'peso', precio100g: 1350 },
  { id: 'salame-grueso', nombre: 'Salame picado grueso', cat: 'carnes', tipo: 'peso', precio100g: 1350 },
  { id: 'salamin', nombre: 'Salamín de campo', cat: 'carnes', tipo: 'peso', precio100g: 1400 },
  { id: 'jamon', nombre: 'Jamón cocido natural', cat: 'carnes', tipo: 'peso', precio100g: 1300 },
  { id: 'jamon-crudo', nombre: 'Jamón crudo estacionado', cat: 'carnes', tipo: 'peso', precio100g: 1950 },
  { id: 'mortadela', nombre: 'Mortadela especial', cat: 'carnes', tipo: 'peso', precio100g: 950 },
  { id: 'paleta', nombre: 'Paleta especial', cat: 'carnes', tipo: 'peso', precio100g: 850 },
  { id: 'bondiola', nombre: 'Bondiola estacionada', cat: 'carnes', tipo: 'peso', precio100g: 1650 },
  { id: 'panceta', nombre: 'Panceta ahumada', cat: 'carnes', tipo: 'peso', precio100g: 1550 },
  { id: 'salchichon', nombre: 'Salchichón primavera', cat: 'carnes', tipo: 'peso', precio100g: 1050 },
  { id: 'arrollado-cerdo', nombre: 'Arrollado de cerdo', cat: 'carnes', tipo: 'peso', precio100g: 1450 },
  { id: 'arrollado-pollo', nombre: 'Arrollado de pollo', cat: 'carnes', tipo: 'peso', precio100g: 1350 },
  { id: 'arrollado-matambre', nombre: 'Arrollado de matambre', cat: 'carnes', tipo: 'peso', precio100g: 1850 },
  { id: 'queso-cerdo', nombre: 'Queso de cerdo', cat: 'carnes', tipo: 'peso', precio100g: 1150 },
  { id: 'lomo-cerdo', nombre: 'Lomo de cerdo horneado', cat: 'carnes', tipo: 'peso', precio100g: 1750 },
  { id: 'lomo-prensado', nombre: 'Lomo prensado de campo', cat: 'carnes', tipo: 'peso', precio100g: 1650 },

  // --- QUESOS SELECCIONADOS (10 variedades) ---
  { id: 'queso-tybo', nombre: 'Queso Tybo seleccionado', cat: 'quesos', tipo: 'peso', precio100g: 980 },
  { id: 'queso-dambo', nombre: 'Queso Dambo suave', cat: 'quesos', tipo: 'peso', precio100g: 1050 },
  { id: 'mozzarella', nombre: 'Mozzarella artesanal', cat: 'quesos', tipo: 'peso', precio100g: 950 },
  { id: 'queso-cheddar', nombre: 'Queso Cheddar fundente', cat: 'quesos', tipo: 'peso', precio100g: 1250 },
  { id: 'queso-roquefort', nombre: 'Queso Roquefort / Azul', cat: 'quesos', tipo: 'peso', precio100g: 1650 },
  { id: 'provolone', nombre: 'Queso Provolone hilado', cat: 'quesos', tipo: 'peso', precio100g: 1550 },
  { id: 'queso-picada', nombre: 'Queso para picada en cubos', cat: 'quesos', tipo: 'peso', precio100g: 1100 },
  { id: 'queso-fresco', nombre: 'Queso fresco', cat: 'quesos', tipo: 'peso', precio100g: 890 },
  { id: 'queso-rallar', nombre: 'Queso para rallar', cat: 'quesos', tipo: 'peso', precio100g: 1450 },
  { id: 'ricotta', nombre: 'Ricotta fresca', cat: 'quesos', tipo: 'peso', precio100g: 750 },

  // --- ACOMPAÑAMIENTOS & AGREGADOS DE PICADA (6 variedades de mesa) ---
  { id: 'aceitunas-rellenas', nombre: 'Aceitunas Verdes rellenas con Morrón', cat: 'agregados', tipo: 'unidad', marca: 'Nucete', precio: 2800, presentacion: 'Pote' },
  { id: 'picles-mixtos', nombre: 'Picles Mixtos Agridulces en Frasco', cat: 'agregados', tipo: 'unidad', marca: 'Castell', precio: 3100, presentacion: 'Frasco' },
  { id: 'berengenas-escabeche', nombre: 'Berenjenas al Escabeche Caseras', cat: 'agregados', tipo: 'unidad', marca: 'Artesanal', precio: 3400, presentacion: 'Pote' },
  { id: 'papas-lays', nombre: 'Papas Fritas Clásicas 140g', cat: 'agregados', tipo: 'unidad', marca: "Lay's", precio: 2900, presentacion: 'Paquete' },
  { id: 'doritos-queso', nombre: 'Doritos Mega Queso 140g', cat: 'agregados', tipo: 'unidad', marca: 'Doritos', precio: 3200, presentacion: 'Paquete' },
  { id: 'mani-pehuamar', nombre: 'Maní Tostado Salado 200g', cat: 'agregados', tipo: 'unidad', marca: 'Pehuamar', precio: 2100, presentacion: 'Paquete' }
];

// 2. Catálogo oficial de Bebidas (8 opciones frías listas para servir)
const CATALOGO_BEBIDAS = [
  { id: 'coca-15', nombre: 'Coca-Cola 1.5L', marca: 'Coca-Cola', cat: 'gaseosas', precio: 3400 },
  { id: 'coca-zero', nombre: 'Coca-Cola Zero 1.5L', marca: 'Coca-Cola', cat: 'gaseosas', precio: 3400 },
  { id: 'sprite-15', nombre: 'Sprite Lima-Limón 1.5L', marca: 'Sprite', cat: 'gaseosas', precio: 3200 },
  { id: 'paso-pomelo', nombre: 'Paso de los Toros Pomelo 1.5L', marca: 'Paso de los Toros', cat: 'gaseosas', precio: 3100 },
  { id: 'patagonia-bohemian', nombre: 'Cerveza Bohemian Pilsener 730ml', marca: 'Patagonia', cat: 'cervezas', precio: 4900 },
  { id: 'patagonia-amber', nombre: 'Cerveza Amber Ale 730ml', marca: 'Patagonia', cat: 'cervezas', precio: 4900 },
  { id: 'corona-710', nombre: 'Cerveza Corona 710ml', marca: 'Corona', cat: 'cervezas', precio: 4600 },
  { id: 'stella-artois', nombre: 'Cerveza Stella Artois Noire 1L', marca: 'Stella Artois', cat: 'cervezas', precio: 5200 }
];

// 3. Catálogo oficial de Postres (2 opciones tradicionales para la sobremesa)
const CATALOGO_POSTRES = [
  { id: 'queso-dulce', nombre: 'Queso y Dulce Tradicional (Batata/Membrillo)', marca: 'La Serenísima / Arcor', precio: 3800 },
  { id: 'alfajor-artesanal', nombre: 'Caja x6 Alfajores Cordobeses Mixtos', marca: 'El Nazareno', precio: 5900 }
];

// Presets balanceados para Fiambres por Calidad
const PRESETS_FIAMBRES = {
  'Clásica': ['paleta', 'salame-fino', 'queso-tybo', 'salchichon'],
  'Semi-Premium': ['jamon', 'salame-grueso', 'bondiola', 'queso-dambo', 'arrollado-pollo'],
  'Gourmet': ['jamon-crudo', 'bondiola', 'lomo-cerdo', 'provolone', 'queso-roquefort']
};

// Estado activo del simulador
let personas = 6;
let ocasionGramos = 250;
let ocasionTexto = 'Almuerzo / Comida';
let calidadNombre = 'Semi-Premium';
let modoArmado = 'recomendado'; // 'recomendado' | 'medida'
let catPizarraActiva = 'todos'; // 'todos' | 'carnes' | 'quesos' | 'agregados'
let catBebidaActiva = 'todas'; // 'todas' | 'cervezas' | 'gaseosas'

// Estados para Modo a Medida:
let fiambresAMedida = []; // [ { id, gramos } ]
let agregadosPicadaAMedida = []; // [ { id, cantidad } ]
let bebidasSeleccionadas = []; // [ { id, cantidad } ]
let postresSeleccionados = []; // [ { id, cantidad } ]

// Función que distribuye determinísticamente en múltiplos de 50g para dar la suma exacta
function distribuirGramosExactos(targetGrams, numCortes) {
  const step = 50;
  const totalUnits = Math.round(targetGrams / step);
  const baseUnits = Math.floor(totalUnits / numCortes);
  let remainderUnits = totalUnits % numCortes;

  const distribucion = [];
  for (let i = 0; i < numCortes; i++) {
    const extra = remainderUnits > 0 ? 1 : 0;
    distribucion.push(Math.max(50, (baseUnits + extra) * step));
    if (remainderUnits > 0) remainderUnits--;
  }
  return distribucion;
}

// Carga automática del combo recomendado en los 3 tiempos
function precargarRecomendadosCompletos() {
  // 1. Agregados de picada recomendados
  const agregados = [];
  if (calidadNombre === 'Clásica') {
    agregados.push({ id: 'papas-lays', cantidad: personas > 6 ? 2 : 1 });
    agregados.push({ id: 'aceitunas-rellenas', cantidad: personas > 8 ? 2 : 1 });
  } else if (calidadNombre === 'Gourmet') {
    agregados.push({ id: 'doritos-queso', cantidad: 1 });
    agregados.push({ id: 'berengenas-escabeche', cantidad: 1 });
    agregados.push({ id: 'aceitunas-rellenas', cantidad: personas > 6 ? 2 : 1 });
  } else {
    // Semi-Premium
    agregados.push({ id: 'papas-lays', cantidad: 1 });
    agregados.push({ id: 'aceitunas-rellenas', cantidad: personas > 8 ? 2 : 1 });
    if (personas > 5) {
      agregados.push({ id: 'mani-pehuamar', cantidad: 1 });
    }
  }
  agregadosPicadaAMedida = agregados;

  // 2. Bebidas recomendadas
  const bebidas = [];
  if (calidadNombre === 'Clásica') {
    bebidas.push({ id: 'coca-15', cantidad: personas > 6 ? 2 : 1 });
  } else if (calidadNombre === 'Gourmet') {
    bebidas.push({ id: 'patagonia-bohemian', cantidad: personas > 6 ? 2 : 1 });
    if (personas > 5) {
      bebidas.push({ id: 'stella-artois', cantidad: 1 });
    }
  } else {
    // Semi-Premium
    bebidas.push({ id: 'patagonia-amber', cantidad: personas > 6 ? 2 : 1 });
    bebidas.push({ id: 'coca-15', cantidad: 1 });
  }
  bebidasSeleccionadas = bebidas;

  // 3. Postres recomendados
  const postres = [];
  if (calidadNombre === 'Clásica') {
    postres.push({ id: 'queso-dulce', cantidad: personas > 8 ? 2 : 1 });
  } else if (calidadNombre === 'Gourmet') {
    postres.push({ id: 'alfajor-artesanal', cantidad: personas > 6 ? 2 : 1 });
  } else {
    postres.push({ id: 'queso-dulce', cantidad: 1 });
  }
  postresSeleccionados = postres;
}

// Inicializa o resetea el modo a medida con la calidad activa
function precargarRecomendadosEnMedida() {
  const targetGrams = personas * ocasionGramos;
  const presetIds = PRESETS_FIAMBRES[calidadNombre] || PRESETS_FIAMBRES['Semi-Premium'];
  const distribucion = distribuirGramosExactos(targetGrams, presetIds.length);

  fiambresAMedida = presetIds.map((id, index) => ({
    id: id,
    gramos: distribucion[index]
  }));

  precargarRecomendadosCompletos();
}

// -------------------------------------------------------------
// CONTROLADORES DE INTERFAZ & EVENTOS
// -------------------------------------------------------------
function cambiarPersonas(delta) {
  personas = Math.max(1, Math.min(30, personas + delta));
  document.getElementById('val-personas').textContent = personas;
  const targetGrams = personas * ocasionGramos;
  const recGramsEl = document.getElementById('rec-target-grams');
  if (recGramsEl) recGramsEl.textContent = targetGrams.toLocaleString('es-AR') + 'g';

  if (modoArmado === 'recomendado') {
    precargarRecomendadosCompletos();
  }
  recalcularSimulador();
}

function setOcasion(tipo, gramos, texto) {
  ocasionGramos = gramos;
  ocasionTexto = texto;
  document.querySelectorAll('[id^="chip-ocasion-"]').forEach(el => el.classList.remove('active'));
  const activeEl = document.getElementById('chip-ocasion-' + tipo);
  if (activeEl) activeEl.classList.add('active');
  const targetGrams = personas * ocasionGramos;
  const recGramsEl = document.getElementById('rec-target-grams');
  if (recGramsEl) recGramsEl.textContent = targetGrams.toLocaleString('es-AR') + 'g';

  if (modoArmado === 'recomendado') {
    precargarRecomendadosCompletos();
  }
  recalcularSimulador();
}

function setModoArmado(modo) {
  modoArmado = modo;
  const btnRec = document.getElementById('btn-mode-rec');
  const btnCustom = document.getElementById('btn-mode-custom');
  const viewRec = document.getElementById('view-mode-recomendado');
  const viewCustom = document.getElementById('view-mode-medida');
  const lblModo = document.getElementById('label-modo-armado');
  const lblCalidadSub = document.getElementById('label-calidad-sub');

  if (modo === 'recomendado') {
    btnRec.classList.add('active');
    btnCustom.classList.remove('active');
    viewRec.style.display = 'block';
    viewCustom.style.display = 'none';
    if (lblModo) lblModo.textContent = '32 opciones de pizarra';
    if (lblCalidadSub) lblCalidadSub.textContent = 'Calcula proporciones y combo completo';

    precargarRecomendadosCompletos();
  } else {
    btnRec.classList.remove('active');
    btnCustom.classList.add('active');
    viewRec.style.display = 'none';
    viewCustom.style.display = 'block';
    if (lblModo) lblModo.textContent = 'Armado a Medida Gramo a Gramo';
    if (lblCalidadSub) lblCalidadSub.textContent = 'Seleccioná la calidad base y personalizá gramos';

    if (fiambresAMedida.length === 0) {
      precargarRecomendadosEnMedida();
    }
  }
  recalcularSimulador();
}

function pasarAModoMedida() {
  precargarRecomendadosEnMedida();
  setModoArmado('medida');
}

function setCalidad(nombre) {
  calidadNombre = nombre;
  document.querySelectorAll('[id^="chip-calidad-"]').forEach(el => el.classList.remove('active'));
  if (nombre === 'Clásica') document.getElementById('chip-calidad-clasica').classList.add('active');
  if (nombre === 'Semi-Premium') document.getElementById('chip-calidad-semi').classList.add('active');
  if (nombre === 'Gourmet') document.getElementById('chip-calidad-gourmet').classList.add('active');

  if (modoArmado === 'recomendado') {
    precargarRecomendadosCompletos();
  } else {
    precargarRecomendadosEnMedida();
  }
  recalcularSimulador();
}

// -------------------------------------------------------------
// GESTIÓN DE LA PIZARRA (CARNES, QUESOS & AGREGADOS)
// -------------------------------------------------------------
function cambiarGramosFiambre(id, delta) {
  const idx = fiambresAMedida.findIndex(item => item.id === id);
  if (idx !== -1) {
    fiambresAMedida[idx].gramos += delta;
    if (fiambresAMedida[idx].gramos <= 0) {
      fiambresAMedida.splice(idx, 1);
    }
  }
  recalcularSimulador();
}

function cambiarCantidadAgregadoPicada(id, delta) {
  const idx = agregadosPicadaAMedida.findIndex(item => item.id === id);
  if (idx !== -1) {
    agregadosPicadaAMedida[idx].cantidad += delta;
    if (agregadosPicadaAMedida[idx].cantidad <= 0) {
      agregadosPicadaAMedida.splice(idx, 1);
    }
  }
  recalcularSimulador();
}

function agregarItemPizarra(id) {
  if (modoArmado === 'recomendado') {
    pasarAModoMedida();
  }
  const prod = PIZARRA_TU_TABLITA.find(p => p.id === id);
  if (!prod) return;

  if (prod.tipo === 'peso') {
    const existente = fiambresAMedida.find(item => item.id === id);
    if (existente) {
      existente.gramos += 100;
    } else {
      fiambresAMedida.push({ id, gramos: 100 });
    }
  } else {
    // Es agregado de picada
    const existente = agregadosPicadaAMedida.find(item => item.id === id);
    if (existente) {
      existente.cantidad += 1;
    } else {
      agregadosPicadaAMedida.push({ id, cantidad: 1 });
    }
  }
  recalcularSimulador();
}

function filtrarCatPizarra(cat, btnEl) {
  catPizarraActiva = cat;
  document.querySelectorAll('.pizarra-tab').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderPizarraItems();
}

function filtrarPizarraFiambres() {
  renderPizarraItems();
}

function renderPizarraItems() {
  const cont = document.getElementById('pizarra-items-grid');
  const inputEl = document.getElementById('input-buscar-fiambre');
  if (!cont) return;

  const q = inputEl ? inputEl.value.trim().toLowerCase() : '';

  const filtrados = PIZARRA_TU_TABLITA.filter(prod => {
    const matchCat = (catPizarraActiva === 'todos') || (prod.cat === catPizarraActiva);
    const matchQuery = !q || prod.nombre.toLowerCase().includes(q) || (prod.marca && prod.marca.toLowerCase().includes(q));
    return matchCat && matchQuery;
  });

  if (filtrados.length === 0) {
    cont.innerHTML = `
      <div style="grid-column: 1 / -1; font-size: 12px; color: #9CA3AF; text-align: center; padding: 12px;">
        No se encontró esa variedad en la pizarra.
      </div>`;
    return;
  }

  let html = '';
  filtrados.forEach(prod => {
    let statusBadge = '';
    const isPeso = prod.tipo === 'peso';

    if (isPeso) {
      if (modoArmado === 'recomendado') {
        const presetIds = PRESETS_FIAMBRES[calidadNombre] || PRESETS_FIAMBRES['Semi-Premium'];
        if (presetIds.includes(prod.id)) {
          const gramosTotales = personas * ocasionGramos;
          const g = Math.max(50, Math.round(gramosTotales / presetIds.length / 50) * 50);
          statusBadge = `<span style="color:#22C55E; font-weight:700;">• ${g}g (Sugerido)</span>`;
        }
      } else {
        const agregado = fiambresAMedida.find(item => item.id === prod.id);
        if (agregado) {
          statusBadge = `<span style="color:#22C55E; font-weight:700;">• ${agregado.gramos}g en tabla</span>`;
        }
      }
    } else {
      // Agregado de picada
      const ag = agregadosPicadaAMedida.find(item => item.id === prod.id);
      if (ag) {
        statusBadge = `<span style="color:#10B981; font-weight:700;">• ${ag.cantidad} un. en tabla</span>`;
      }
    }

    const precioLabel = isPeso 
      ? `$${prod.precio100g.toLocaleString('es-AR')} / 100g` 
      : `$${prod.precio.toLocaleString('es-AR')} (${prod.presentacion || 'c/u'})`;

    const btnAction = isPeso ? '+ 100g' : '+ 1 un.';

    html += `
      <div class="pizarra-card">
        <div style="display: flex; flex-direction: column; min-width: 0;">
          <span class="pizarra-card-name">${prod.nombre}</span>
          <span class="pizarra-card-price">${precioLabel} ${statusBadge}</span>
        </div>
        <button type="button" class="btn-pizarra-add" onclick="agregarItemPizarra('${prod.id}')">${btnAction}</button>
      </div>
    `;
  });

  cont.innerHTML = html;
}

// -------------------------------------------------------------
// RENDER MODO A MEDIDA: FIAMBRES & AGREGADOS DE PICADA
// -------------------------------------------------------------
function renderFiambresMedidaUI() {
  const contMeats = document.getElementById('selected-meats-container');
  const contAddons = document.getElementById('selected-picada-addons-container');

  // 1. Fiambres y Quesos
  if (contMeats) {
    if (fiambresAMedida.length === 0) {
      contMeats.innerHTML = `
        <div style="font-size: 13px; color: #64748B; background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: 7px; padding: 10px; text-align: center;">
          No hay fiambres seleccionados. Tocá cualquier opción de la pizarra para sumar cortes.
        </div>`;
    } else {
      let html = '';
      fiambresAMedida.forEach(item => {
        const prod = PIZARRA_TU_TABLITA.find(p => p.id === item.id);
        if (!prod) return;
        const subtotal = Math.round((item.gramos / 100) * prod.precio100g);
        const isQueso = prod.cat === 'quesos';
        html += `
          <div class="custom-meat-row ${isQueso ? 'queso' : ''}">
            <div>
              <div class="custom-meat-name">
                ${prod.nombre}
                <span style="font-size: 10.5px; font-weight: 600; padding: 1px 5px; border-radius: 3px; background: ${isQueso ? '#FEF3C7; color:#92400E' : '#FEE2E2; color:#991B1B'}; margin-left: 4px;">
                  ${isQueso ? 'Queso' : 'Fiambre / Carne'}
                </span>
              </div>
              <div class="custom-meat-rate">
                $${prod.precio100g.toLocaleString('es-AR')} / 100g · Subtotal: <strong style="color: #111827;">$${subtotal.toLocaleString('es-AR')}</strong>
              </div>
            </div>
            <div class="meat-gram-ctrl">
              <button type="button" class="meat-gram-btn" onclick="cambiarGramosFiambre('${item.id}', -50)">−50g</button>
              <span class="meat-gram-val">${item.gramos}g</span>
              <button type="button" class="meat-gram-btn" onclick="cambiarGramosFiambre('${item.id}', 50)">+50g</button>
              <button type="button" class="meat-gram-btn" style="color: #DC2626;" onclick="cambiarGramosFiambre('${item.id}', -9999)" title="Quitar">×</button>
            </div>
          </div>
        `;
      });
      contMeats.innerHTML = html;
    }
  }

  // 2. Agregados de picada (aceitunas, papas, picles, snacks)
  if (contAddons) {
    if (agregadosPicadaAMedida.length === 0) {
      contAddons.innerHTML = `
        <div style="font-size: 12.5px; color: #64748B; background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: 7px; padding: 8px 10px; text-align: center;">
          Sin acompañamientos de mesa. Tocá "Agregados de Picada" en la pizarra para sumar aceitunas o papas.
        </div>`;
    } else {
      let html = '';
      agregadosPicadaAMedida.forEach(item => {
        const prod = PIZARRA_TU_TABLITA.find(p => p.id === item.id);
        if (!prod) return;
        const subtotal = prod.precio * item.cantidad;
        html += `
          <div class="selected-addon-row" style="background: #F0FDF4; border-color: #BBF7D0;">
            <div>
              <div style="font-weight: 700; color: #111827; line-height: 1.2;">
                ${prod.nombre} <span style="font-size: 11px; font-weight: 600; color: #065F46; background: #DCFCE7; padding: 1px 6px; border-radius: 4px;">${prod.marca}</span>
              </div>
              <div style="font-size: 11.5px; color: #6B7280; margin-top: 2px;">
                $${prod.precio.toLocaleString('es-AR')} c/u · Subtotal: <strong style="color: #111827;">$${subtotal.toLocaleString('es-AR')}</strong>
              </div>
            </div>
            <div class="qty-ctrl">
              <button type="button" class="qty-btn" onclick="cambiarCantidadAgregadoPicada('${item.id}', -1)">−</button>
              <span class="qty-val">${item.cantidad}</span>
              <button type="button" class="qty-btn" onclick="cambiarCantidadAgregadoPicada('${item.id}', 1)">+</button>
            </div>
          </div>
        `;
      });
      contAddons.innerHTML = html;
    }
  }
}

// -------------------------------------------------------------
// RENDER MODO RECOMENDADO: RESUMEN EN 3 SECCIONES TEMÁTICAS
// -------------------------------------------------------------
function renderResumenRecomendadoUI(listaFiambres, listaAgregados, listaBebidas, listaPostres) {
  const box = document.getElementById('rec-summary-box');
  if (!box) return;

  const targetGrams = personas * ocasionGramos;

  let totalFiambres = 0;
  let totalAgregados = 0;
  let totalBebidas = 0;
  let totalPostres = 0;

  // 1. BLOQUE LA PICADA
  let htmlPicada = `
    <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 8px; padding: 9px 11px; margin-bottom: 8px;">
      <div style="font-size: 12px; font-weight: 800; color: #92400E; text-transform: uppercase; font-family: var(--font-mono); display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <span>🧀 1. LA PICADA (${calidadNombre} · ${personas} personas):</span>
        <span>${targetGrams.toLocaleString('es-AR')}g</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 3px; font-size: 12.5px; color: #374151;">
  `;

  listaFiambres.forEach(item => {
    const prod = PIZARRA_TU_TABLITA.find(p => p.id === item.id);
    if (!prod) return;
    const sub = Math.round((item.gramos / 100) * prod.precio100g);
    totalFiambres += sub;
    htmlPicada += `
      <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed #FDE68A; padding-bottom: 2px;">
        <span>• <strong>${item.gramos}g</strong> ${prod.nombre}</span>
        <span style="font-family: var(--font-mono); font-size: 11.5px; color: #64748B;">$${sub.toLocaleString('es-AR')}</span>
      </div>
    `;
  });

  listaAgregados.forEach(item => {
    const prod = PIZARRA_TU_TABLITA.find(p => p.id === item.id);
    if (!prod) return;
    const sub = prod.precio * item.cantidad;
    totalAgregados += sub;
    htmlPicada += `
      <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed #FDE68A; padding-bottom: 2px; color: #047857;">
        <span>• <strong>${item.cantidad}x</strong> ${prod.nombre} (${prod.marca})</span>
        <span style="font-family: var(--font-mono); font-size: 11.5px;">$${sub.toLocaleString('es-AR')}</span>
      </div>
    `;
  });

  const subtotalPicada = totalFiambres + totalAgregados;
  htmlPicada += `
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 5px; font-size: 12px; font-weight: 700; color: #92400E;">
        <span>Subtotal La Picada:</span>
        <span style="font-family: var(--font-mono);">$${subtotalPicada.toLocaleString('es-AR')}</span>
      </div>
    </div>
  `;

  // 2. BLOQUE BEBIDAS
  let htmlBebidas = `
    <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 9px 11px; margin-bottom: 8px;">
      <div style="font-size: 12px; font-weight: 800; color: #1E40AF; text-transform: uppercase; font-family: var(--font-mono); display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <span>🍺 2. BEBIDAS (Frías y Listas):</span>
        <span style="font-size: 11px; font-weight: 600;">Listas para servir</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 3px; font-size: 12.5px; color: #374151;">
  `;

  listaBebidas.forEach(item => {
    const prod = CATALOGO_BEBIDAS.find(p => p.id === item.id);
    if (!prod) return;
    const sub = prod.precio * item.cantidad;
    totalBebidas += sub;
    htmlBebidas += `
      <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed #BFDBFE; padding-bottom: 2px;">
        <span>• <strong>${item.cantidad}x</strong> ${prod.nombre} (${prod.marca})</span>
        <span style="font-family: var(--font-mono); font-size: 11.5px; color: #64748B;">$${sub.toLocaleString('es-AR')}</span>
      </div>
    `;
  });

  htmlBebidas += `
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 5px; font-size: 12px; font-weight: 700; color: #1E40AF;">
        <span>Subtotal Bebidas:</span>
        <span style="font-family: var(--font-mono);">$${totalBebidas.toLocaleString('es-AR')}</span>
      </div>
    </div>
  `;

  // 3. BLOQUE POSTRES
  let htmlPostres = `
    <div style="background: #FAF5FF; border: 1px solid #E9D5FF; border-radius: 8px; padding: 9px 11px;">
      <div style="font-size: 12px; font-weight: 800; color: #6B21A8; text-transform: uppercase; font-family: var(--font-mono); display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <span>🍰 3. POSTRES (Cierre Dulce):</span>
        <span style="font-size: 11px; font-weight: 600;">Sobremesa</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 3px; font-size: 12.5px; color: #374151;">
  `;

  listaPostres.forEach(item => {
    const prod = CATALOGO_POSTRES.find(p => p.id === item.id);
    if (!prod) return;
    const sub = prod.precio * item.cantidad;
    totalPostres += sub;
    htmlPostres += `
      <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed #E9D5FF; padding-bottom: 2px;">
        <span>• <strong>${item.cantidad}x</strong> ${prod.nombre} (${prod.marca})</span>
        <span style="font-family: var(--font-mono); font-size: 11.5px; color: #64748B;">$${sub.toLocaleString('es-AR')}</span>
      </div>
    `;
  });

  htmlPostres += `
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 5px; font-size: 12px; font-weight: 700; color: #6B21A8;">
        <span>Subtotal Postres:</span>
        <span style="font-family: var(--font-mono);">$${totalPostres.toLocaleString('es-AR')}</span>
      </div>
    </div>
  `;

  box.innerHTML = htmlPicada + htmlBebidas + htmlPostres;
}

// -------------------------------------------------------------
// GESTIÓN DE BEBIDAS (PASO 4)
// -------------------------------------------------------------
function filtrarCatBebida(cat, btnEl) {
  catBebidaActiva = cat;
  document.querySelectorAll('.addon-chips-filter span').forEach(s => s.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderCatalogoBebidas();
}

function filtrarBebidas() {
  renderCatalogoBebidas();
}

function agregarBebida(id) {
  const existente = bebidasSeleccionadas.find(item => item.id === id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    bebidasSeleccionadas.push({ id, cantidad: 1 });
  }
  renderBebidasSeleccionadas();
  recalcularSimulador();
}

function cambiarCantidadBebida(id, delta) {
  const idx = bebidasSeleccionadas.findIndex(item => item.id === id);
  if (idx !== -1) {
    bebidasSeleccionadas[idx].cantidad += delta;
    if (bebidasSeleccionadas[idx].cantidad <= 0) {
      bebidasSeleccionadas.splice(idx, 1);
    }
  }
  renderBebidasSeleccionadas();
  recalcularSimulador();
}

function renderBebidasSeleccionadas() {
  const cont = document.getElementById('selected-drinks-box');
  if (!cont) return;

  if (bebidasSeleccionadas.length === 0) {
    cont.innerHTML = `
      <div style="font-size: 13px; color: #64748B; background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: 7px; padding: 10px; text-align: center;">
        No hay bebidas sumadas. Buscá abajo cervezas o gaseosas frías de 1.5L.
      </div>`;
    return;
  }

  let html = '';
  bebidasSeleccionadas.forEach(item => {
    const prod = CATALOGO_BEBIDAS.find(p => p.id === item.id);
    if (!prod) return;
    const subtotal = prod.precio * item.cantidad;
    html += `
      <div class="selected-addon-row" style="background: #EFF6FF; border-color: #BFDBFE;">
        <div>
          <div style="font-weight: 700; color: #111827; line-height: 1.2;">
            ${prod.nombre} <span style="font-size: 11px; font-weight: 600; color: #1D4ED8; background: #DBEAFE; padding: 1px 6px; border-radius: 4px;">${prod.marca}</span>
          </div>
          <div style="font-size: 11.5px; color: #6B7280; margin-top: 2px;">
            $${prod.precio.toLocaleString('es-AR')} c/u · Subtotal: <strong style="color: #111827;">$${subtotal.toLocaleString('es-AR')}</strong>
          </div>
        </div>
        <div class="qty-ctrl">
          <button type="button" class="qty-btn" onclick="cambiarCantidadBebida('${item.id}', -1)">−</button>
          <span class="qty-val">${item.cantidad}</span>
          <button type="button" class="qty-btn" onclick="cambiarCantidadBebida('${item.id}', 1)">+</button>
        </div>
      </div>
    `;
  });
  cont.innerHTML = html;
}

function renderCatalogoBebidas() {
  const cont = document.getElementById('drinks-results-container');
  const inputEl = document.getElementById('input-buscar-bebida');
  if (!cont) return;

  const q = inputEl ? inputEl.value.trim().toLowerCase() : '';

  const filtrados = CATALOGO_BEBIDAS.filter(prod => {
    const matchCat = (catBebidaActiva === 'todas') || (prod.cat === catBebidaActiva);
    const matchQuery = !q || prod.nombre.toLowerCase().includes(q) || prod.marca.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  if (filtrados.length === 0) {
    cont.innerHTML = `
      <div style="font-size: 12.5px; color: #94A3B8; text-align: center; padding: 12px 8px;">
        No encontramos bebidas con ese filtro.
      </div>`;
    return;
  }

  let html = '';
  filtrados.forEach(prod => {
    html += `
      <div class="addon-result-card">
        <div class="addon-result-info">
          <span class="addon-result-name">${prod.nombre}</span>
          <span class="addon-result-brand">Marca: <strong>${prod.marca}</strong></span>
        </div>
        <div class="addon-result-right">
          <span class="addon-result-price">$${prod.precio.toLocaleString('es-AR')}</span>
          <button type="button" class="btn-add-addon" onclick="agregarBebida('${prod.id}')">+ Agregar</button>
        </div>
      </div>
    `;
  });
  cont.innerHTML = html;
}

// -------------------------------------------------------------
// GESTIÓN DE POSTRES (PASO 5)
// -------------------------------------------------------------
function agregarPostre(id) {
  const existente = postresSeleccionados.find(item => item.id === id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    postresSeleccionados.push({ id, cantidad: 1 });
  }
  renderPostresSeleccionados();
  recalcularSimulador();
}

function cambiarCantidadPostre(id, delta) {
  const idx = postresSeleccionados.findIndex(item => item.id === id);
  if (idx !== -1) {
    postresSeleccionados[idx].cantidad += delta;
    if (postresSeleccionados[idx].cantidad <= 0) {
      postresSeleccionados.splice(idx, 1);
    }
  }
  renderPostresSeleccionados();
  recalcularSimulador();
}

function renderPostresSeleccionados() {
  const cont = document.getElementById('selected-desserts-box');
  if (!cont) return;

  if (postresSeleccionados.length === 0) {
    cont.innerHTML = `
      <div style="font-size: 13px; color: #64748B; background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: 7px; padding: 10px; text-align: center;">
        No hay postres sumados para el cierre dulce.
      </div>`;
    return;
  }

  let html = '';
  postresSeleccionados.forEach(item => {
    const prod = CATALOGO_POSTRES.find(p => p.id === item.id);
    if (!prod) return;
    const subtotal = prod.precio * item.cantidad;
    html += `
      <div class="selected-addon-row" style="background: #FAF5FF; border-color: #E9D5FF;">
        <div>
          <div style="font-weight: 700; color: #111827; line-height: 1.2;">
            ${prod.nombre} <span style="font-size: 11px; font-weight: 600; color: #7E22CE; background: #F3E8FF; padding: 1px 6px; border-radius: 4px;">${prod.marca}</span>
          </div>
          <div style="font-size: 11.5px; color: #6B7280; margin-top: 2px;">
            $${prod.precio.toLocaleString('es-AR')} c/u · Subtotal: <strong style="color: #111827;">$${subtotal.toLocaleString('es-AR')}</strong>
          </div>
        </div>
        <div class="qty-ctrl">
          <button type="button" class="qty-btn" onclick="cambiarCantidadPostre('${item.id}', -1)">−</button>
          <span class="qty-val">${item.cantidad}</span>
          <button type="button" class="qty-btn" onclick="cambiarCantidadPostre('${item.id}', 1)">+</button>
        </div>
      </div>
    `;
  });
  cont.innerHTML = html;
}

function renderCatalogoPostres() {
  const cont = document.getElementById('desserts-results-container');
  if (!cont) return;

  let html = '';
  CATALOGO_POSTRES.forEach(prod => {
    html += `
      <div class="addon-result-card">
        <div class="addon-result-info">
          <span class="addon-result-name">${prod.nombre}</span>
          <span class="addon-result-brand">Marca: <strong>${prod.marca}</strong></span>
        </div>
        <div class="addon-result-right">
          <span class="addon-result-price">$${prod.precio.toLocaleString('es-AR')}</span>
          <button type="button" class="btn-add-addon" onclick="agregarPostre('${prod.id}')">+ Agregar</button>
        </div>
      </div>
    `;
  });
  cont.innerHTML = html;
}

// -------------------------------------------------------------
// RECÁLCULO GENERAL Y COMANDA WHATSAPP EN 3 TIEMPOS
// -------------------------------------------------------------
function recalcularSimulador() {
  const gramosRecomendadosTotales = personas * ocasionGramos;
  document.getElementById('label-gramos').textContent = gramosRecomendadosTotales.toLocaleString('es-AR') + 'g (~' + ocasionGramos + 'g c/u)';

  let listaFiambresActiva = [];
  let totalFiambres = 0;
  let pesoTotalFiambres = 0;

  if (modoArmado === 'recomendado') {
    const presetIds = PRESETS_FIAMBRES[calidadNombre] || PRESETS_FIAMBRES['Semi-Premium'];
    const distribucion = distribuirGramosExactos(gramosRecomendadosTotales, presetIds.length);

    listaFiambresActiva = presetIds.map((id, index) => {
      const prod = PIZARRA_TU_TABLITA.find(p => p.id === id);
      const g = distribucion[index];
      const sub = Math.round((g / 100) * (prod ? prod.precio100g : 1200));
      totalFiambres += sub;
      pesoTotalFiambres += g;
      return { id, gramos: g, subtotal: sub };
    });

    renderResumenRecomendadoUI(listaFiambresActiva, agregadosPicadaAMedida, bebidasSeleccionadas, postresSeleccionados);
    renderPizarraItems();

    const recTargetEl = document.getElementById('rec-target-grams');
    if (recTargetEl) recTargetEl.textContent = gramosRecomendadosTotales.toLocaleString('es-AR') + 'g';
  } else {
    // Modo a Medida
    listaFiambresActiva = fiambresAMedida.map(item => {
      const prod = PIZARRA_TU_TABLITA.find(p => p.id === item.id);
      const sub = Math.round((item.gramos / 100) * (prod ? prod.precio100g : 1200));
      totalFiambres += sub;
      pesoTotalFiambres += item.gramos;
      return { id: item.id, gramos: item.gramos, subtotal: sub };
    });

    renderFiambresMedidaUI();
    renderPizarraItems();

    // Barra de peso
    const currentWeightEl = document.getElementById('weight-current');
    const targetWeightEl = document.getElementById('weight-target');
    const peopleWeightEl = document.getElementById('weight-people');
    const barFillEl = document.getElementById('weight-bar-fill');
    const alertWeightEl = document.getElementById('weight-alert-text');

    if (currentWeightEl) currentWeightEl.textContent = pesoTotalFiambres.toLocaleString('es-AR') + 'g';
    if (targetWeightEl) targetWeightEl.textContent = gramosRecomendadosTotales.toLocaleString('es-AR') + 'g';
    if (peopleWeightEl) peopleWeightEl.textContent = personas;

    if (barFillEl) {
      const pct = Math.min(100, Math.round((pesoTotalFiambres / gramosRecomendadosTotales) * 100));
      barFillEl.style.width = pct + '%';
    }

    if (alertWeightEl) {
      if (pesoTotalFiambres === 0) {
        alertWeightEl.textContent = 'Aún no seleccionaste fiambres para la tabla.';
        alertWeightEl.style.color = '#EF4444';
      } else if (pesoTotalFiambres < gramosRecomendadosTotales) {
        const diff = gramosRecomendadosTotales - pesoTotalFiambres;
        alertWeightEl.textContent = `Faltan ~${diff}g para el promedio recomendado de ${personas} personas (${gramosRecomendadosTotales}g).`;
        alertWeightEl.style.color = '#F59E0B';
      } else if (pesoTotalFiambres === gramosRecomendadosTotales) {
        alertWeightEl.textContent = `✓ Gramaje ideal alcanzado para ${personas} personas (${gramosRecomendadosTotales}g).`;
        alertWeightEl.style.color = '#16A34A';
      } else {
        const extra = pesoTotalFiambres - gramosRecomendadosTotales;
        alertWeightEl.textContent = `Porción abundante: +${extra}g sobre lo recomendado para ${personas} personas.`;
        alertWeightEl.style.color = '#2563EB';
      }
    }
  }

  // 1. Subtotal Agregados de Picada
  let totalAgregadosPicada = 0;
  let agregadosPicadaListText = '';
  agregadosPicadaAMedida.forEach(item => {
    const prod = PIZARRA_TU_TABLITA.find(p => p.id === item.id);
    if (prod) {
      const sub = prod.precio * item.cantidad;
      totalAgregadosPicada += sub;
      agregadosPicadaListText += `\n• ${item.cantidad}x ${prod.nombre} (${prod.marca || 'Tu Tablita'}) ($${sub.toLocaleString('es-AR')})`;
    }
  });

  const subtotalLaPicada = totalFiambres + totalAgregadosPicada;

  // 2. Subtotal Bebidas
  let totalBebidas = 0;
  let bebidasListText = '';
  bebidasSeleccionadas.forEach(item => {
    const prod = CATALOGO_BEBIDAS.find(p => p.id === item.id);
    if (prod) {
      const sub = prod.precio * item.cantidad;
      totalBebidas += sub;
      bebidasListText += `\n• ${item.cantidad}x ${prod.nombre} (${prod.marca}) ($${sub.toLocaleString('es-AR')})`;
    }
  });

  // 3. Subtotal Postres
  let totalPostres = 0;
  let postresListText = '';
  postresSeleccionados.forEach(item => {
    const prod = CATALOGO_POSTRES.find(p => p.id === item.id);
    if (prod) {
      const sub = prod.precio * item.cantidad;
      totalPostres += sub;
      postresListText += `\n• ${item.cantidad}x ${prod.nombre} (${prod.marca}) ($${sub.toLocaleString('es-AR')})`;
    }
  });

  // Total General
  const totalFinal = subtotalLaPicada + totalBebidas + totalPostres;
  const totalFormateado = '$' + totalFinal.toLocaleString('es-AR');
  document.getElementById('val-total-ars').textContent = totalFormateado;

  // Desglose de Fiambres
  let fiambresListText = '';
  listaFiambresActiva.forEach(item => {
    const prod = PIZARRA_TU_TABLITA.find(p => p.id === item.id);
    if (prod) {
      fiambresListText += `\n• ${item.gramos}g ${prod.nombre} ($${item.subtotal.toLocaleString('es-AR')})`;
    }
  });

  const modalidadArmadoText = modoArmado === 'recomendado'
    ? `Armado Recomendado (${calidadNombre})`
    : `Armado a Medida (Personalizado gramo a gramo)`;

  // Formatear bloques de WhatsApp
  const bloquePicada = `🧀 *1. LA PICADA (Fiambres, Quesos & Acompañamientos):*${fiambresListText}${agregadosPicadaListText}\nSubtotal Picada: $${subtotalLaPicada.toLocaleString('es-AR')}`;

  const bloqueBebidas = bebidasListText.length > 0
    ? `🍺 *2. BEBIDAS (Frías & Listas para Servir):*${bebidasListText}\nSubtotal Bebidas: $${totalBebidas.toLocaleString('es-AR')}`
    : `🍺 *2. BEBIDAS:* Sin bebidas seleccionadas`;

  const bloquePostres = postresListText.length > 0
    ? `🍰 *3. POSTRES (Cierre Dulce):*${postresListText}\nSubtotal Postres: $${totalPostres.toLocaleString('es-AR')}`
    : `🍰 *3. POSTRES:* Sin postres seleccionados`;

  const mensaje = `🧀 *NUEVO PEDIDO DE PICADA — TU TABLITA* 🧀
----------------------------------------
👤 *Cliente:* Juan Pérez (Web)
🛵 *Modalidad:* Envío a domicilio
⏰ *Hora solicitada:* Hoy 21:30 hs

🍽️ *DETALLE GENERAL:*
• Comensales: ${personas} personas (~${gramosRecomendadosTotales.toLocaleString('es-AR')}g recomendados)
• Ocasión: ${ocasionTexto} (${ocasionGramos}g c/u)
• Configuración: ${modalidadArmadoText}
• Peso en fiambres: ${pesoTotalFiambres.toLocaleString('es-AR')}g

${bloquePicada}

${bloqueBebidas}

${bloquePostres}

💰 *TOTAL ESTIMADO: ${totalFormateado}*
----------------------------------------
Hola Tu Tablita, armé este pedido desde la web con las opciones de su pizarra. ¿Me confirman disponibilidad y datos de seña?`;

  document.getElementById('wa-bubble-text').textContent = mensaje;

  const linkWa = 'https://wa.me/5493515178136?text=' + encodeURIComponent(mensaje);
  document.getElementById('btn-enviar-wa').href = linkWa;

  // Sincronizar listas UI
  renderBebidasSeleccionadas();
  renderPostresSeleccionados();
}

// Inicializar al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  precargarRecomendadosCompletos();
  precargarRecomendadosEnMedida();
  renderPizarraItems();
  renderCatalogoBebidas();
  renderCatalogoPostres();
  recalcularSimulador();
});
