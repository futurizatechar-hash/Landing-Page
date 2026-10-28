export type PortfolioCategory = 'gestion' | 'web' | 'marketing';

export interface GallerySlide {
  url: string;
  label: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  sector: string;
  typeBadge: string;
  category: PortfolioCategory;
  pillarBadge: string;
  statusBadge?: string;
  isPrivate: boolean;
  isOwnEngine?: boolean;
  image: string;
  gallery?: GallerySlide[];
  painEliminated: string;
  businessImpact: string;
  description: string;
  outcomes: string[];
  technologies: string[];
  painSelectValue: string;
  links: {
    live: string | null;
    isDemo?: boolean;
    demoNote?: string;
  };
}

export const PORTFOLIO_FILTERS = [
  { id: 'todos', label: 'Todos los Sistemas' },
  { id: 'gestion', label: 'Sistemas de Gestión (ERP / CRM)' },
  { id: 'web', label: 'Plataformas Web & E-commerce' },
  { id: 'marketing', label: 'Marketing, IA & Auditoría' },
] as const;

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'quadra-pizza-erp',
    title: 'Quadra Pizza ERP Multipanel',
    sector: 'Gastronomía Consolidada',
    typeBadge: 'ERP a Medida en Tiempo Real',
    category: 'gestion',
    pillarBadge: 'Pilar 03 · Gestión',
    isPrivate: true,
    image: '/projects/quadra/quadra-gerencia.webp',
    gallery: [
      { url: '/projects/quadra/quadra-gerencia.webp', label: 'Mando Central (Gerencia)' },
      { url: '/projects/quadra/quadra-recepcion.webp', label: 'Punto de Venta (Recepción)' },
      { url: '/projects/quadra/quadra-cocina-comandas.webp', label: 'Monitor de Comandas (Cocina)' },
      { url: '/projects/quadra/quadra-cocina-insumos.webp', label: 'Control de Insumos Críticos' },
      { url: '/projects/quadra/quadra-delivery.webp', label: 'Despacho y Hoja de Ruta (Delivery)' },
    ],
    painEliminated: 'Comandas en papel, descontrol de insumos en cocina y caja a ciegas entre turnos.',
    businessImpact:
      'Recepción, cocina, reparto y gerencia sincronizados al segundo sin pagar comisiones ni licencias por cajero.',
    description:
      'Sistema central desarrollado desde cero para ordenar de punta a punta la operación gastronómica de alto volumen. Conecta el punto de venta con monitores digitales en cocina, alertas automáticas de insumos críticos, despacho de repartidores y tablero financiero gerencial en vivo.',
    outcomes: [
      'Cuatro tableros operativos conectados en tiempo real (Recepción, Cocina, Reparto y Gerencia) con cero recarga manual.',
      'Descuento automático de insumos por receta y alertas tempranas antes de quedarse sin mercadería en hora pico.',
      'Propiedad 100% de la empresa sin abonos mensuales por terminal ni dependencia de software gastronómico enlatado.',
    ],
    technologies: ['Next.js', 'Supabase Realtime', 'PostgreSQL RLS', 'TailwindCSS'],
    painSelectValue: 'Ordenar mi operación interna / Salir de planillas de Excel (Pilar 3)',
    links: { live: null },
  },
  {
    id: 'motor-carruseles-api',
    title: 'Motor Programático de Carruseles & Publicación API',
    sector: 'Motor Propio FuturizaTech · B2B & Comercio',
    typeBadge: 'Automatización de Contenido (M-01)',
    category: 'marketing',
    pillarBadge: 'Pilar 01 · Captación',
    statusBadge: 'Motor Propio Activo',
    isPrivate: true,
    isOwnEngine: true,
    image: '/projects/motores/motor-carruseles.webp',
    painEliminated: 'Meses sin publicar por falta de tiempo o depender de diseñadores y agencias manuales.',
    businessImpact:
      'De una idea o novedad comercial a un carrusel de alta resolución publicado por API oficial con tu identidad exacta.',
    description:
      'Maquinaria propia de ingeniería de contenidos: transforma el conocimiento real de tu negocio en guiones estructurados de conversión, renderiza diapositivas milimétricas 1080×1440 por código HTML/CSS respetando tu manual de marca y las publica automáticamente vía Meta Graph API.',
    outcomes: [
      'Plantillas codificadas a medida con los colores, tipografías y sellos exactos de tu empresa (cero diseños genéricos de plantilla).',
      'Flujo completo asistido por agentes con aprobación humana rápida antes de publicar y renovación automática de tokens.',
      'Disponible tanto en instalación llave en mano para tu equipo como en operación mensual ejecutada por FuturizaTech.',
    ],
    technologies: ['Node.js', 'HTML/CSS Render Engine', 'Meta Graph API', 'Flujos Multi-Agente IA'],
    painSelectValue: 'Conseguir clientes constantes / Automatizar mi marketing (Pilar 1)',
    links: { live: null },
  },
  {
    id: 'inox-ecommerce',
    title: 'Inox E-commerce Industrial',
    sector: 'Comercialización Masiva & Mayorista',
    typeBadge: 'E-commerce Sincronizado a Stock',
    category: 'web',
    pillarBadge: 'Pilar 02 · Conversión',
    statusBadge: 'En Evolución Modular',
    isPrivate: false,
    image: '/projects/inox/inox-ecommerce.webp',
    gallery: [
      { url: '/projects/inox/inox-ecommerce.webp', label: 'Portada Comercial (Home)' },
      { url: '/projects/inox/inox-catalogo.webp', label: 'Catálogo Masivo y Filtros Técnicos' },
      { url: '/projects/inox/inox-login.webp', label: 'Portal Privado de Clientes' },
    ],
    painEliminated: 'Vender online productos sin stock real o cargar pedidos web a mano en administración.',
    businessImpact:
      'Catálogo masivo con cobro integrado y sincronización bidireccional en vivo con depósito, ventas y gerencia.',
    description:
      'Plataforma de comercio electrónico diseñada para altos volúmenes de catálogo y rotación constante. Conecta cada compra online directamente con el inventario físico y la facturación interna, eliminando quiebres de stock y tareas administrativas duplicadas.',
    outcomes: [
      'Sincronización bidireccional instantánea entre la tienda pública, el depósito y el tablero comercial de gerencia.',
      'Portal de clientes con historial, carrito persistente de alto volumen y pasarelas de pago integradas.',
      'Arquitectura propia sin comisiones por venta de plataformas alquiladas.',
    ],
    technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'TailwindCSS'],
    painSelectValue: 'Nueva plataforma web rápida / Medir bien mis anuncios (Pilar 2)',
    links: { live: 'https://inox.futurizatech.com/' },
  },
  {
    id: 'suite-auditoria-tecnica',
    title: 'Suite Ejecutiva de Auditoría: Medición, Google & Competencia',
    sector: 'Motor Propio FuturizaTech · Auditoría 3–7 Días',
    typeBadge: 'Diagnóstico Técnico (M-06 / M-09 / M-10)',
    category: 'marketing',
    pillarBadge: 'Pilares 01 & 02 · Datos',
    statusBadge: 'Motor Propio Activo',
    isPrivate: true,
    isOwnEngine: true,
    image: '/projects/motores/suite-auditoria.webp',
    painEliminated: 'Invertir en anuncios con píxeles rotos, perder búsquedas en Google o ignorar qué le funciona al competidor.',
    businessImpact:
      'Radiografía exacta en 3 a 7 días hábiles con panel ejecutivo interactivo y correcciones listas (100% acreditable).',
    description:
      'Conjunto de herramientas programáticas conectadas a las APIs oficiales de Google Tag Manager, Google Search Console y extractores de mercado. Detecta eventos de conversión duplicados o caídos, cuellos de indexación orgánica y las piezas de mayor rendimiento real de tus competidores.',
    outcomes: [
      'Detección automática de fugas de medición en Tag Manager y armado de correcciones en un espacio de prueba seguro.',
      'Diagnóstico priorizado (P0/P1/P2) de páginas no indexadas, consultas con alto potencial y salud SEO técnica.',
      'Extracción de métricas reales de competidores compilada en CSV verificable y tablero HTML ejecutivo listo para directorio.',
    ],
    technologies: ['Google Tag Manager API v2', 'Search Console API', 'Python & Node.js', 'Dashboards HTML'],
    painSelectValue: 'Auditoría técnica puntual en 3 a 7 días hábiles (100% acreditable)',
    links: { live: null },
  },
  {
    id: 'masecor-almacen',
    title: 'Masecor Depósito & Control Logístico',
    sector: 'Infraestructura & Logística B2B',
    typeBadge: 'Sistema de Stock en Tiempo Real',
    category: 'gestion',
    pillarBadge: 'Pilar 03 · Gestión',
    isPrivate: true,
    image: '/projects/masecor/masecor-almacen.webp',
    painEliminated: 'Diferencias de inventario en galpón, planillas desactualizadas y demoras al despachar mercadería.',
    businessImpact:
      'Entradas, salidas y movimientos masivos registrados en segundos por operarios y visibles al instante en gerencia.',
    description:
      'Sistema logístico de alta velocidad construido para el trabajo diario de depósito. Permite buscar, filtrar y registrar movimientos sobre miles de ítems sin tiempos de espera, manteniendo alineados a almacén, compras, ventas y dirección.',
    outcomes: [
      'Interfaz operativa ágil pensada para uso intensivo en planta sin curvas de aprendizaje complejas.',
      'Trazabilidad completa de entradas, salidas y responsables en tiempo real.',
      'Integración directa con ventas y administración eliminando planillas paralelas.',
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'TailwindCSS'],
    painSelectValue: 'Ordenar mi operación interna / Salir de planillas de Excel (Pilar 3)',
    links: {
      live: 'https://masecor-almacen.futurizatech.com/',
      isDemo: true,
      demoNote:
        'Enlace a entorno interactivo de demostración con datos simulados para resguardar la confidencialidad operativa del cliente.',
    },
  },
  {
    id: 'monitor-precios-ecommerce',
    title: 'Radar Automatizado de Precios y Márgenes',
    sector: 'Motor Propio FuturizaTech · E-commerce & Distribución',
    typeBadge: 'Inteligencia de Precios (M-07)',
    category: 'marketing',
    pillarBadge: 'Pilar 01 · Márgenes',
    statusBadge: 'Motor Propio Activo',
    isPrivate: true,
    isOwnEngine: true,
    image: '/projects/motores/monitor-precios.webp',
    painEliminated: 'Quedar fuera de precio en Mercado Libre o tiendas online, o bajar precios a ciegas perdiendo margen neto.',
    businessImpact:
      'Cruza automáticamente tus costos contra los precios vivos de tus competidores y marca en rojo/verde tu rentabilidad.',
    description:
      'Extractor programado que releva publicaciones reales de competidores en marketplaces y tiendas online a partir de tu catálogo y costos internos. Calcula precio promedio de mercado, brecha porcentual y margen neto real, entregando tanto planilla Excel con fórmulas vivas como panel interactivo.',
    outcomes: [
      'Relevamiento automatizado de precios vigentes sin perder horas revisando competidores artículo por artículo.',
      'Planilla Excel (.xlsx) fechada con formato condicional automático (verde rentable / alerta de margen comprometido).',
      'Tablero visual HTML para tomar decisiones rápidas de reposicionamiento comercial con datos frescos.',
    ],
    technologies: ['Python', 'Scrapers Estructurados', 'OpenPyXL (.xlsx)', 'Panel Ejecutivo HTML'],
    painSelectValue: 'Conseguir clientes constantes / Automatizar mi marketing (Pilar 1)',
    links: { live: null },
  },
  {
    id: 'spartan-gym-cms',
    title: 'Spartan Gym Gestor Inteligente por Voz',
    sector: 'Cadena Deportiva & Servicios',
    typeBadge: 'Automatización Operativa con IA',
    category: 'marketing',
    pillarBadge: 'Pilar 04 · IA Operativa',
    isPrivate: true,
    image: '/projects/spartan/spartan-admin-login.webp',
    gallery: [
      { url: '/projects/spartan/spartan-admin-login.webp', label: 'Acceso Seguro de Administración' },
      { url: '/projects/spartan/spartan-admin-grilla.webp', label: 'Grilla Pública en Vivo' },
      { url: '/projects/spartan/spartan-admin-borrador.webp', label: 'Previsualización Asistida por IA' },
    ],
    painEliminated: 'Depender de un programador cada vez que cambia un horario, sede o profesor en la grilla comercial.',
    businessImpact:
      'Administración dicta un audio o texto natural y la IA actualiza horarios con vista previa segura antes de publicar.',
    description:
      'Panel operativo a medida que reemplaza paneles técnicos complejos por lenguaje humano. El equipo administrativo graba un mensaje de voz desde el navegador indicando los cambios del mes; la IA estructura los horarios, muestra comparativa borrador vs. publicado y actualiza el sitio en un clic.',
    outcomes: [
      'Interpretación precisa de audios y textos cotidianos para reestructurar grillas completas en segundos.',
      'Control humano obligatorio (comparativa borrador vs. producción) que evita errores frente a los clientes.',
      'Ahorro total de horas de soporte técnico para cambios operativos frecuentes.',
    ],
    technologies: ['Next.js', 'Google Gemini AI', 'Audio / Voz API', 'TypeScript'],
    painSelectValue: 'Integrar sistemas / Asistentes IA 24/7 (Pilar 4)',
    links: { live: null },
  },
  {
    id: 'masecor-web',
    title: 'Masecor Plataforma Corporativa B2B',
    sector: 'Obras, Industria & Servicios B2B',
    typeBadge: 'Sitio Corporativo Ultrarrápido (M-11)',
    category: 'web',
    pillarBadge: 'Pilar 02 · Conversión',
    isPrivate: false,
    image: '/projects/masecor/masecor-web.webp',
    painEliminated: 'Presencia digital lenta o desactualizada que no refleja la solvencia real de la empresa ante licitaciones y compras.',
    businessImpact:
      'Carga instantánea con puntaje óptimo en Google Lighthouse y estructura B2B enfocada en generar consultas calificadas.',
    description:
      'Plataforma institucional desarrollada con arquitectura estática de última generación. Proyecta respaldo técnico frente a gerentes de compras e industrias, posiciona servicios clave en buscadores y canaliza pedidos de cotización sin fricción.',
    outcomes: [
      'Velocidad de carga instantánea en redes móviles y escritorio con costo cero de mantenimiento de servidores pesados.',
      'Estructura semántica SEO y tratamiento optimizado de fotografía de obra pesada.',
      'Recorrido comercial directo hacia solicitud de presupuesto corporativo.',
    ],
    technologies: ['Astro SSG', 'TypeScript', 'TailwindCSS', 'Cloudflare Edge'],
    painSelectValue: 'Nueva plataforma web rápida / Medir bien mis anuncios (Pilar 2)',
    links: { live: 'https://www.masecor.com.ar/' },
  },
  {
    id: 'futuriza-crm',
    title: 'FuturizaTech CRM & Embudo Comercial IA',
    sector: 'Operación Comercial B2B',
    typeBadge: 'CRM Propietario & Seguimiento IA',
    category: 'gestion',
    pillarBadge: 'Pilar 03 · Gestión',
    isPrivate: true,
    image: '/projects/futuriza/futuriza-centro-mando.webp',
    gallery: [
      { url: '/projects/futuriza/futuriza-centro-mando.webp', label: 'Centro de Mando Comercial' },
      { url: '/projects/futuriza/futuriza-embudo.webp', label: 'Embudo Kanban de Oportunidades' },
      { url: '/projects/futuriza/futuriza-bandeja-ia.webp', label: 'Bandeja Conversacional con IA' },
    ],
    painEliminated: 'Prospectos perdidos en chats de WhatsApp personales sin seguimiento ni visibilidad de cierre.',
    businessImpact:
      'Cada consulta web o de WhatsApp ingresa al embudo Kanban centralizado con contexto automático y métricas de cierre.',
    description:
      'Nuestro propio centro de comando comercial en producción: centraliza los prospectos captados desde la web y canales directos, organiza cada etapa de diagnóstico y propuesta en tablero Kanban e integra asistencia conversacional con IA.',
    outcomes: [
      'Recepción instantánea de leads web con calificación automática del cuello de botella de cada empresa.',
      'Tablero visual de etapas comerciales y métricas de conversión en tiempo real.',
      'Base exacta que adaptamos e instalamos como propiedad 100% de nuestros clientes B2B.',
    ],
    technologies: ['Next.js', 'Supabase PostgreSQL', 'TailwindCSS', 'IA Conversacional'],
    painSelectValue: 'Ordenar mi operación interna / Salir de planillas de Excel (Pilar 3)',
    links: { live: null },
  },
  {
    id: 'spartan-gym-app',
    title: 'Spartan Gym App Socios (PWA con IA)',
    sector: 'Salud, Fitness & Membresías',
    typeBadge: 'App Móvil Propietaria Offline-First',
    category: 'gestion',
    pillarBadge: 'Pilares 03 & 04 · App + IA',
    statusBadge: 'En Desarrollo Final',
    isPrivate: true,
    image: '/projects/spartan/spartan-app.webp',
    painEliminated: 'Rutinas en papel, baja retención de socios, cobros manuales y caída del servicio si se corta internet en sala.',
    businessImpact:
      'Planes personalizados con IA, cobro de membresías, ingreso por QR y seguimiento en sala que sigue funcionando sin Wi-Fi.',
    description:
      'Aplicación progresiva instalable para socios que digitaliza toda la experiencia del gimnasio: ficha médica guiada, generación asistida de planes de entrenamiento y nutrición, tienda de membresías con pasarela de pagos, sistema de puntos e ingreso ágil por QR.',
    outcomes: [
      'Continuidad operativa garantizada en sala mediante memoria local resiliente ante cortes de conectividad.',
      'Planes de entrenamiento y nutrición asistidos por IA junto con cronómetro interactivo de series y descansos.',
      'Cobro integrado de cuotas y fidelización por puntos sin pagar comisiones mensuales por socio.',
    ],
    technologies: ['React 19', 'TypeScript', 'PWA Offline-First', 'Integración IA'],
    painSelectValue: 'Ordenar mi operación interna / Salir de planillas de Excel (Pilar 3)',
    links: { live: null },
  },
  {
    id: 'quadra-pizza-store',
    title: 'Quadra Pizza Tienda Móvil & Pedidos',
    sector: 'Gastronomía & Delivery Propio',
    typeBadge: 'Tienda Online sin Comisiones',
    category: 'web',
    pillarBadge: 'Pilar 02 · Conversión',
    isPrivate: false,
    image: '/projects/quadra/quadra-store.webp',
    gallery: [
      { url: '/projects/quadra/quadra-store-principal.webp', label: 'Catálogo Móvil y Promociones' },
      { url: '/projects/quadra/quadra-store-bebidas.webp', label: 'Menú Dinámico Sincronizado' },
      { url: '/projects/quadra/quadra-store-carrito.webp', label: 'Resumen Ágil de Pedido' },
      { url: '/projects/quadra/quadra-store-checkout.webp', label: 'Confirmación Directa conectada al ERP' },
    ],
    painEliminated: 'Ceder entre 25% y 35% de margen a apps de delivery externas o tomar pedidos mal escritos por teléfono.',
    businessImpact:
      'Canal propio de venta móvil ultrarrápido conectado al stock real de cocina y confirmación limpia por WhatsApp.',
    description:
      'Tienda virtual optimizada para el celular del cliente hambriento: permite armar el pedido en segundos sobre disponibilidad real del local y enviarlo estructurado sin errores ni intermediarios que se queden con el margen del negocio.',
    outcomes: [
      'Experiencia móvil veloz pensada para cerrar el pedido en menos de un minuto.',
      'Sincronización directa de precios y productos disponibles con el sistema central del local.',
      '100% del margen de venta directo para el comercio y base de clientes propia.',
    ],
    technologies: ['Next.js', 'React', 'TailwindCSS', 'Integración WhatsApp'],
    painSelectValue: 'Nueva plataforma web rápida / Medir bien mis anuncios (Pilar 2)',
    links: { live: 'https://quadrapizza.com' },
  },
  {
    id: 'guardforce-web',
    title: 'GuardForce Seguridad Corporativa',
    sector: 'Seguridad Privada & Servicios B2B',
    typeBadge: 'Plataforma Comercial B2B',
    category: 'web',
    pillarBadge: 'Pilar 02 · Conversión',
    isPrivate: false,
    image: '/projects/guardforce/guardforce-web.webp',
    painEliminated: 'Falta de respaldo corporativo digital para cerrar contratos de seguridad con empresas, barrios y consorcios.',
    businessImpact:
      'Presencia ejecutiva de alta autoridad orientada a convertir visitas corporativas en solicitudes formales de cotización.',
    description:
      'Plataforma web corporativa diseñada para empresas de seguridad física y electrónica. Combina estética ejecutiva oscura, presentación clara de divisiones operativas y llamados a la acción directos para decisores empresariales.',
    outcomes: [
      'Arquitectura de información pensada para gerentes de operaciones, industrias y administraciones.',
      'Carga veloz y adaptación impecable en teléfonos y computadoras de escritorio.',
      'Canalización directa de prospectos hacia el equipo comercial.',
    ],
    technologies: ['React', 'Vite', 'TailwindCSS', 'SEO Técnico'],
    painSelectValue: 'Nueva plataforma web rápida / Medir bien mis anuncios (Pilar 2)',
    links: { live: 'https://guardforcesegurity.com/' },
  },
  {
    id: 'nairda-web',
    title: 'Nairda Studio Web & Reserva de Turnos',
    sector: 'Servicios Profesionales & Estética',
    typeBadge: 'Plataforma de Turnos Paso a Paso',
    category: 'web',
    pillarBadge: 'Pilar 02 · Conversión',
    isPrivate: false,
    image: '/projects/nairda/nairda-web.webp',
    gallery: [
      { url: '/projects/nairda/nairda-landing-hero.webp', label: 'Portada y Acceso a Reserva' },
      { url: '/projects/nairda/nairda-landing-calendario.webp', label: 'Selección de Fecha y Horario Libre' },
      { url: '/projects/nairda/nairda-landing-confirmacion.webp', label: 'Confirmación Automática por WhatsApp' },
      { url: '/projects/nairda/nairda-landing-menu.webp', label: 'Catálogo de Servicios y Valores' },
    ],
    painEliminated: 'Horas perdidas respondiendo mensajes uno por uno para coordinar horarios disponibles.',
    businessImpact:
      'Los clientes eligen servicio, día y horario real las 24 horas y confirman su turno listo sin ida y vuelta manual.',
    description:
      'Plataforma comercial con motor guiado de reserva de citas en tres pasos simples. Muestra únicamente disponibilidad real, ordena la agenda diaria del negocio y dispara confirmación inmediata por WhatsApp.',
    outcomes: [
      'Autogestión de turnos 24/7 que convierte visitas nocturnas o de fin de semana en agenda llena.',
      'Reducción drástica de ausencias y mensajes manuales de coordinación.',
      'Conectada de forma nativa con el panel interno de administración del salón.',
    ],
    technologies: ['Next.js', 'React', 'TailwindCSS', 'Flujo de Agenda'],
    painSelectValue: 'Nueva plataforma web rápida / Medir bien mis anuncios (Pilar 2)',
    links: { live: 'https://nairda.futurizatech.com/' },
  },
  {
    id: 'nairda-pwa',
    title: 'Nairda Studio Panel de Gestión (PWA)',
    sector: 'Administración de Servicios',
    typeBadge: 'Panel Interno de Agenda y Caja',
    category: 'gestion',
    pillarBadge: 'Pilar 03 · Gestión',
    isPrivate: true,
    image: '/projects/nairda/nairda-pwa.webp',
    painEliminated: 'Anotar turnos en cuadernos o perder de vista la recaudación real de cada profesional y semana.',
    businessImpact:
      'Control privado desde el celular sobre turnos del día, ingresos netos y campañas comerciales en un solo panel.',
    description:
      'Aplicación privada de administración que centraliza la operación diaria del estudio: agenda en tiempo real, seguimiento de ingresos y métricas del negocio accesibles desde cualquier teléfono o computadora con clave segura.',
    outcomes: [
      'Visión clara de caja, servicios más rentables y ocupación semanal sin planillas sueltas.',
      'Instalable como aplicación directa en el teléfono del dueño con acceso restringido.',
      'Cero abonos mensuales por profesional agregado.',
    ],
    technologies: ['Next.js', 'PWA Móvil', 'TailwindCSS'],
    painSelectValue: 'Ordenar mi operación interna / Salir de planillas de Excel (Pilar 3)',
    links: { live: null },
  },
  {
    id: 'spartan-gym-web',
    title: 'Spartan Gym Plataforma Web 3D',
    sector: 'Expansión Comercial & Franquicias',
    typeBadge: 'Experiencia Web 3D de Captación',
    category: 'web',
    pillarBadge: 'Pilar 02 · Conversión',
    isPrivate: false,
    image: '/projects/spartan/spartan-web.webp',
    painEliminated: 'Páginas genéricas que no diferencian a una marca líder frente a competidores de menor escala.',
    businessImpact:
      'Experiencia interactiva 3D fluida que multiplica el impacto de marca y convierte visitas locales en nuevos socios.',
    description:
      'Plataforma pública de alto impacto visual con modelos tridimensionales interactivos optimizados para mantener fluidez y velocidad de carga, conectada en vivo con la grilla de horarios administrada por IA.',
    outcomes: [
      'Diferenciación visual inmediata con renderizado 3D optimizado sin sacrificar tiempos de respuesta.',
      'Integración directa con las grillas dinámicas de horarios y planes vigentes.',
      'Diseñada para maximizar inscripciones desde campañas locales.',
    ],
    technologies: ['Next.js', 'Three.js', 'GSAP', 'TailwindCSS'],
    painSelectValue: 'Nueva plataforma web rápida / Medir bien mis anuncios (Pilar 2)',
    links: { live: 'https://spartan-gym.futurizatech.com/' },
  },
];
