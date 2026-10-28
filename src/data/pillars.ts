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
    codeRange: 'M-01 · M-07',
    title: 'Automatización & Herramientas de Marketing',
    roleBadge: 'Sistematizar captación',
    painSolved:
      'Dejás de depender de tener tiempo libre para publicar, de adivinar qué hace tu competencia o de quemar presupuesto en campañas mal estructuradas.',
    whatWeInstall: [
      'Circuitos por código que redactan, diseñan y publican carruseles y videos cortos con IA sin trabajo artesanal diario.',
      'Monitores automáticos que vigilan precios de competidores en comercio electrónico y calculan tus márgenes netos en Excel y paneles web.',
      'Extracción automatizada de métricas reales de tu competencia y auditoría técnica profunda de tus cuentas de Meta Ads y Google Ads.',
    ],
    timeframeLabel: '3–7 DÍAS HÁBILES / 1–3 SEMANAS',
    timeframeDetail:
      'Auditorías en 3 a 7 días hábiles · Implementaciones llave en mano en 1 a 3 semanas · Operación en ciclos mensuales.',
    painSelectValue: 'Conseguir clientes constantes / Automatizar mi marketing (Pilar 1)',
    ctaLabel: 'Quiero automatizar mi captación',
  },
  {
    number: '02',
    codeRange: 'M-09 · M-12',
    title: 'Plataformas Web & Conversión',
    roleBadge: 'Convertir visitas en clientes',
    painSolved:
      'Eliminás páginas lentas, desactualizadas o sin medición confiable que nadie encuentra en Google y que dejan escapar consultas todos los días.',
    whatWeInstall: [
      'Sitios corporativos y páginas de aterrizaje ultrarrápidas diseñadas para proyectar autoridad comercial y convertir visitas en reuniones.',
      'Tiendas online conectadas en tiempo real a tu catálogo, depósito y pasarelas de cobro sin costo fijo de servidor innecesario.',
      'Corrección quirúrgica de medición técnica (Tag Manager, píxeles y API de conversiones) y salud de posicionamiento en Google Search Console.',
    ],
    timeframeLabel: '1–3 SEMANAS OPERATIVAS',
    timeframeDetail:
      'Plataformas operativas entre 1 y 3 semanas · Auditorías de medición y SEO en 3 a 7 días hábiles.',
    painSelectValue: 'Nueva plataforma web rápida / Medir bien mis anuncios (Pilar 2)',
    ctaLabel: 'Quiero renovar mi web y medición',
  },
  {
    number: '03',
    codeRange: 'M-13 · M-14',
    title: 'Sistemas de Gestión a Medida',
    roleBadge: 'Ordenar la operación',
    painSolved:
      'Erradicás de raíz el caos de planillas de Excel sueltas, la doble carga manual, el descontrol de stock y el pago eterno de licencias por empleado.',
    whatWeInstall: [
      'Tu propio ERP, CRM, sistema de depósito, punto de venta multipanel, portal de clientes o tablero gerencial en la nube, hecho exacto para tu negocio.',
      'Migración limpia de tus datos históricos desde planillas de Excel o sistemas viejos sin frenar un solo día tu actividad comercial.',
      'Capacitación práctica a todo tu equipo para que adopten la herramienta desde la primera semana sin fricción.',
    ],
    timeframeLabel: 'MVP EN 4–8 SEMANAS',
    timeframeDetail:
      'Estructurado por módulos prioritarios, con versión operativa funcional (MVP) lista entre 4 y 8 semanas.',
    painSelectValue: 'Ordenar mi operación interna / Salir de planillas de Excel (Pilar 3)',
    ctaLabel: 'Quiero ordenar mi gestión interna',
  },
  {
    number: '04',
    codeRange: 'M-08 · M-15 · M-16 · M-17',
    title: 'Automatización Operativa & Asistentes IA',
    roleBadge: 'Escalar sin sumar costos fijos',
    painSolved:
      'Cortás las demoras de respuesta comercial fuera de horario, las tareas repetitivas entre programas que no se hablan y las decisiones financieras a ciegas.',
    whatWeInstall: [
      'Integración automática en tiempo real entre tus herramientas actuales, bases de datos, facturación y canales de venta.',
      'Asistentes inteligentes 24/7 en WhatsApp y web conectados a tu stock, catálogo o agenda real, más equipos de agentes autónomos con visor 2D en vivo.',
      'Estudios de mercado cuantitativos y modelos financieros paramétricos en Excel con proyecciones dinámicas a 12 meses.',
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
    summary: 'Software ERP/CRM/Stock 100% propietario + migración limpia desde Excel y capacitación.',
  },
] as const;
