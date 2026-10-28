# FuturizaTech — Plataforma Web Oficial (`futurizatech.com`)

Sitio corporativo y motor de conversión comercial B2B de **FuturizaTech**, construido sobre **Astro 5 (Static Site Generation)**, **Tailwind CSS**, **Cloudflare Pages** y conexión directa al CRM propietario en **Supabase (`leads_futuriza`)**.

---

## 1. Propósito Comercial y Arquitectura

Esta plataforma materializa el posicionamiento oficial de **FuturizaTech**:
- **Doble frente de valor:** Automatización de herramientas de marketing para captar clientes constantes + desarrollo de software de gestión a medida (ERP, CRM, stock, paneles) para operar con orden sin licencias por empleado.
- **Arquitectura ultrarrápida (SSG):** HTML semántico estático servido desde el Edge de Cloudflare con cero hidratación innecesaria, micro-scripts modulares en TypeScript (~4 KB) y carga no bloqueante de fuentes.
- **Identidad visual oficial:** Monograma **Corte Arquitectónico 45° (`F+T` + `FuturizaTech`)** inyectado mediante componentes SVG inline para nitidez vectorial idéntica en Android, iOS y escritorio.

---

## 2. Estructura del Proyecto

```text
.
├── docs/
│   ├── SUPABASE_KEEP_ALIVE_SETUP.md
│   └── workflows/
│       └── keep-supabase-alive.yml # Plantilla limpia para consulta programada cada 48h a Supabase
├── public/
│   ├── projects/                  # Capturas .webp optimizadas de casos reales y motores propios
│   ├── _headers                   # Cabeceras de seguridad HTTP y caché inmutable para Cloudflare
│   ├── _redirects                 # Redirecciones permanentes 301 limpias (cero Soft 404)
│   ├── llms.txt                   # Ficha estructurada GEO para motores de IA (ChatGPT, Perplexity, Claude, Gemini)
│   ├── robots.txt                 # Directivas de rastreo buscadores + IA
│   ├── site.webmanifest           # Manifiesto PWA y favicons multiresolución
│   └── og-image.png               # Tarjeta OpenGraph 1200x630 optimizada (< 200 KB)
├── src/
│   ├── components/
│   │   ├── brand/                 # LogoHorizontal, LogoVertical e Isotipo SVG inline
│   │   ├── sections/              # Los 8 bloques comerciales del embudo B2B + modal interactivo
│   │   ├── seo/                   # SchemaOrg.astro (JSON-LD multicapa) y AnalyticsGTM.astro
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   └── WhatsAppFloat.astro
│   ├── content/
│   │   ├── config.ts              # Colección Blog con validación Zod lista para GitOps Editorial (M-04)
│   │   └── blog/
│   ├── data/
│   │   ├── site.ts                # Configuración central, sellos y opciones de diagnóstico
│   │   ├── pillars.ts             # Los 4 Pilares Oficiales y Sistemas Preconfigurados
│   │   ├── portfolio.ts           # 12 casos en producción + 3 Motores Técnicos Propios
│   │   └── faq.ts                 # Preguntas frecuentes sincronizadas 1:1 con Schema.org FAQPage
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro            # Portada principal de conversión
│   │   ├── privacidad.astro       # Política de Privacidad y Confidencialidad
│   │   ├── terminos.astro         # Términos y Condiciones de Servicio
│   │   └── 404.astro              # Página de error HTTP 404 real
│   └── styles/
│       └── global.css             # Tokens HEX oficiales y utilidades UI
├── .env.example                   # Plantilla documentada de variables de entorno (sin secretos)
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## 3. Desarrollo Local

### Requisitos
- **Node.js** `>= 20.0.0`
- **npm** `>= 10.0.0`

### Instalación y Arranque

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno locales (copiar plantilla y completar claves)
cp .env.example .env

# 3. Iniciar servidor de desarrollo (http://localhost:4321)
npm run dev

# 4. Compilar versión estática de producción en ./dist
npm run build

# 5. Previsualizar compilación productiva localmente
npm run preview
```

---

## 4. Variables de Entorno y Conexión al CRM (`leads_futuriza`)

El proyecto acepta de forma transparente tanto variables con prefijo `PUBLIC_*` como `VITE_*` para mantener compatibilidad directa con configuraciones preexistentes en Cloudflare Pages:

| Variable | Uso |
| :--- | :--- |
| `PUBLIC_SUPABASE_URL` *(o `VITE_SUPABASE_URL`)* | URL del proyecto en Supabase donde reside la tabla `leads_futuriza`. |
| `PUBLIC_SUPABASE_ANON_KEY` *(o `VITE_SUPABASE_ANON_KEY`)* | Clave pública (`anon` / `publishable`) de Supabase. |
| `PUBLIC_BACKUP_EMAIL_ENDPOINT` *(opcional)* | Endpoint secundario de respaldo por correo electrónico (FormSubmit / Webhook). |
| `PUBLIC_GTM_ID` *(opcional)* | ID del contenedor de Google Tag Manager (`GTM-XXXXXXX`). Si está vacío, no inyecta scripts externos. |

### Eventos Emitidos en `window.dataLayer`
- `generate_lead`: Envío exitoso del formulario calificador (`pain_category`, `cta_origin`).
- `click_calendly`: Clic hacia la agenda de diagnóstico de 15 minutos (`placement`).
- `click_whatsapp`: Clic hacia WhatsApp directo (`placement`).
- `view_portfolio_case`: Apertura de modal de proyecto o motor técnico (`case_id`, `case_title`, `case_category`).

---

## 5. Despliegue en Cloudflare Pages

- **Framework Preset:** `Astro`
- **Build Command:** `npm run build`
- **Build Output Directory:** `dist`
- **Variable de Entorno de Runtime:** `NODE_VERSION = 20`

---

© 2026 **FuturizaTech** — Córdoba, Argentina. Todos los derechos reservados.
