export interface ServicePillar {
  number: string;
  codeRange: string;
  title: string;
  roleBadge: string;
  painSolved: string;
  whatWeInstall: string[];
  timeframeLabel: string;
  timeframeDetail: string;
  painSelectValue: string;
  ctaLabel: string;
}

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    number: '01',
    codeRange: 'M-01 · M-07 · M-19 · M-20 · M-27',
    title: 'Automatización & Herramientas de Marketing',
    roleBadge: 'Sistematizar captación',
    painSolved:
      'Dejás de depender de tener tiempo libre para publicar, de adivinar qué hace tu competencia o de quemar presupuesto en campañas mal estructuradas.',
    whatWeInstall: [
      'Circuitos por código que redactan, diseñan y publican carruseles, videos cortos con IA y posts en 6 redes sociales sin trabajo artesanal diario.',
      'Captura instantánea de prospectos en menos de 15 segundos conectando anuncios web a WhatsApp Oficial, correo y alerta directa a tu vendedor.',
      'Monitores automáticos de precios de competidores en comercio electrónico, extracción de métricas de mercado y auditoría técnica de Meta Ads y Google Ads.',
    ],
    timeframeLabel: '3–7 DÍAS HÁBILES / 1–3 SEMANAS',
    timeframeDetail:
      'Auditorías en 3 a 7 días hábiles · Implementaciones llave en mano en 1 a 3 semanas · Operación en ciclos mensuales.',
    painSelectValue: 'Conseguir clientes constantes / Automatizar mi marketing (Pilar 1)',
    ctaLabel: 'Quiero automatizar mi captación',
  },
  {
    number: '02',
    codeRange: 'M-09 · M-12 · M-18',
    title: 'Plataformas Web & Conversión',
    roleBadge: 'Convertir visitas en clientes',
    painSolved:
      'Eliminás páginas lentas, desactualizadas o sin medición confiable que nadie encuentra en Google y que dejan escapar consultas todos los días.',
    whatWeInstall: [
      'Sitios corporativos y páginas de aterrizaje ultrarrápidas (Astro / Cloudflare) diseñadas para proyectar autoridad comercial y convertir visitas en reuniones.',
      'Tiendas online (Tiendanube, Shopify, WooCommerce) con optimización SEO masiva de fichas, sincronización en vivo y medición de eventos del lado del servidor (CAPI).',
      'Corrección quirúrgica de medición técnica (Google Tag Manager, píxeles y API de conversiones) y salud de indexación en Google Search Console.',
    ],
    timeframeLabel: '1–3 SEMANAS OPERATIVAS',
    timeframeDetail:
      'Plataformas operativas entre 1 y 3 semanas · Auditorías de medición y SEO en 3 a 7 días hábiles.',
    painSelectValue: 'Nueva plataforma web rápida / Medir bien mis anuncios (Pilar 2)',
    ctaLabel: 'Quiero renovar mi web y medición',
  },
  {
    number: '03',
    codeRange: 'M-13 · M-14 · M-21 · M-22 · M-26',
    title: 'Sistemas de Gestión a Medida',
    roleBadge: 'Ordenar la operación',
    painSolved:
      'Erradicás de raíz el caos de planillas de Excel sueltas, la doble carga manual, el descontrol de stock y el pago eterno de licencias por empleado.',
    whatWeInstall: [
      'Tu propio ERP, CRM, sistema de depósito, punto de venta o portal de clientes en la nube, hecho a medida y 100% de tu propiedad.',
      'Facturación electrónica oficial ante ARCA (ex-AFIP) con CAE y QR automático, cobros y conciliación en tiempo real con Mercado Pago.',
      'Sincronización bidireccional en vivo con planillas de Google Sheets o Excel, migración limpia de datos históricos y capacitación a tu equipo.',
    ],
    timeframeLabel: 'MVP EN 4–8 SEMANAS',
    timeframeDetail:
      'Estructurado por módulos prioritarios, con versión operativa funcional (MVP) lista entre 4 y 8 semanas.',
    painSelectValue: 'Ordenar mi operación interna / Salir de planillas de Excel (Pilar 3)',
    ctaLabel: 'Quiero ordenar mi gestión interna',
  },
  {
    number: '04',
    codeRange: 'M-08 · M-15 · M-16 · M-17 · M-23 · M-24 · M-25 · M-28',
    title: 'Automatización Operativa & Asistentes IA',
    roleBadge: 'Escalar sin sumar costos fijos',
    painSolved:
      'Cortás las demoras de respuesta comercial fuera de horario, las tareas repetitivas entre programas que no se hablan y las decisiones financieras a ciegas.',
    whatWeInstall: [
      'Canales oficiales de WhatsApp Business Cloud API con plantillas HSM aprobadas para recupero de carritos, post-venta y despacho de comprobantes.',
      'Agenda automatizada en Google Calendar con bloqueo anti-solapamiento y cobro de seña, alertas en Telegram (<0.5s) y logística integrada (Andreani / Correo / Envíopack).',
      'Despliegue de equipos de agentes de IA autónomos con centro de control visual 2D en tiempo real, estudios de mercado y modelos financieros paramétricos.',
    ],
    timeframeLabel: '1–3 SEMANAS POR MÓDULO',
    timeframeDetail:
      'Integraciones, asistentes y modelos entre 1 y 3 semanas · Arquitecturas multi-agente por etapas cerradas.',
    painSelectValue: 'Integrar sistemas / Asistentes IA 24/7 (Pilar 4)',
    ctaLabel: 'Quiero automatizar procesos con IA',
  },
];

export const PRECONFIGURED_SYSTEMS = [
  {
    name: 'Sistema de Automatización de Contenido',
    modules: 'M-01 + M-02 + M-04',
    summary: 'Carruseles por API, videos cortos IA y blog técnico SEO funcionando sin carga interna.',
  },
  {
    name: 'Sistema Omnicanal de Autoridad (6 Redes)',
    modules: 'M-01 + M-02 + M-20',
    summary: 'Publicación nativa por API en Instagram, Facebook, LinkedIn, TikTok, YouTube y X con zonas seguras.',
  },
  {
    name: 'Sistema B2B de Velocidad Comercial (< 15s)',
    modules: 'M-27 + M-23 + M-24 + M-26',
    summary: 'Captura inmediata de prospectos de Meta Ads / Web + contacto por WhatsApp Oficial + alerta instantánea a ventas.',
  },
  {
    name: 'Sistema de Caja, Facturación & Planillas en Vivo',
    modules: 'M-21 + M-22 + M-26 + M-24',
    summary: 'Cobros verificados en Mercado Pago + Facturación electrónica ARCA (CAE + QR) asentados automáticamente en Google Sheets.',
  },
  {
    name: 'Sistema E-commerce Omnicanal & Logística',
    modules: 'M-18 + M-19 + M-07 + M-28',
    summary: 'Tiendanube / Shopify sincronizado en vivo con Mercado Libre, cálculo de comisiones y seguimiento con Andreani/Correo.',
  },
  {
    name: 'Sistema de Turnos, Señas & Anti-Ausentismo',
    modules: 'M-25 + M-22 + M-23',
    summary: 'Agenda en Google Calendar API con confirmación contra cobro de seña en Mercado Pago y recordatorios por WhatsApp.',
  },
  {
    name: 'Sistema de Medición & Adquisición Técnica',
    modules: 'M-05 + M-09 + M-11',
    summary: 'Landing ultrarrápida + Tag Manager/Píxeles exactos + estructura técnica de pauta sin fugas.',
  },
  {
    name: 'Sistema de Inteligencia Comercial y Precios',
    modules: 'M-06 + M-07 + M-08',
    summary: 'Radar automático de precios y márgenes + métricas de competidores + mapa de mercado.',
  },
  {
    name: 'Sistema de Gestión Operativa',
    modules: 'M-13 + M-14',
    summary: 'Software ERP/CRM/Stock 100% propietario + migración limpia desde Excel y capacitación sin licencias por empleado.',
  },
] as const;
