export const SITE_CONFIG = {
  name: 'FuturizaTech',
  shortName: 'Futuriza',
  url: 'https://futurizatech.com',
  title: 'FuturizaTech | Automatización Comercial, Plataformas Web y Sistemas de Gestión a Medida',
  description:
    'Automatizamos tu marketing e instalamos software de gestión a medida para que tu empresa capte clientes y opere en orden sin licencias por empleado.',
  email: 'info@futurizatech.com',
  phoneDisplay: '+54 9 351 804 6223',
  phoneRaw: '5493518046223',
  phoneE164: '+5493518046223',
  whatsappUrl:
    'https://wa.me/5493518046223?text=' +
    encodeURIComponent(
      'Hola equipo de FuturizaTech, vengo desde la web y quiero coordinar mi diagnóstico de 15 minutos sin cargo.'
    ),
  calendlyUrl: 'https://calendly.com/futuriza-tech-ar',
  instagramUrl: 'https://www.instagram.com/futurizatech',
  githubUrl: 'https://github.com/futurizatechar-hash',
  locationShort: 'Córdoba, Argentina',
  locationFull: 'Córdoba, Argentina · Operativa 100% remota en toda Argentina y Latinoamérica',
  legalAddress: 'Antonio Nores 499, Malagueño, Provincia de Córdoba, Argentina',
  cuit: '20-40.299.684-07',
} as const;

export const NAV_LINKS = [
  { label: 'Qué Resolvemos', href: '/#que-resolvemos' },
  { label: 'Los 4 Pilares', href: '/#pilares' },
  { label: 'Cómo Trabajamos', href: '/#como-trabajamos' },
  { label: 'Casos Reales', href: '/#casos' },
  { label: 'Preguntas', href: '/#preguntas' },
] as const;

export const TRUST_SEALS = [
  {
    id: 'propiedad',
    title: 'Propiedad 100% de tu empresa',
    shortDesc: 'Código, cuentas, datos y flujos a tu nombre. Cero licencias mensuales por empleado.',
    fullDesc:
      'Todo lo que programamos e instalamos queda íntegramente a nombre de tu empresa. No cobramos alquiler de software ni licencias en dólares por cada usuario que sumás. Cuando elegís mantenimiento mensual, abonás ejecución técnica real, sin ataduras.',
  },
  {
    id: 'garantias',
    title: 'Garantías por contrato',
    shortDesc: 'Alcance técnico formal, entregables medibles y presupuesto cerrado sin letra chica.',
    fullDesc:
      'Definimos por escrito qué problema resolvemos, qué entregables recibís y en qué plazo exacto queda operativo. Sabés cuánto invertís desde el día uno, sin sorpresas ni costos ocultos a mitad de camino.',
  },
  {
    id: 'modular',
    title: 'Implementación modular y financiación',
    shortDesc: 'Empezá resolviendo un bloque puntual y escalá a tu ritmo con pagos por etapas.',
    fullDesc:
      'No tenés que cambiar toda tu empresa de golpe. Arrancás destrabando tu cuello de botella más urgente —una auditoría, un flujo automático o el núcleo de tu sistema— y sumás piezas con esquemas de financiación propia adaptados a tu caja.',
  },
] as const;

export const IDEAL_PROFILES = [
  'Pymes B2B e Industrias',
  'Distribuidoras y Logística',
  'Comercios Consolidados y Gastronomía',
  'Tiendas Online en Crecimiento',
] as const;

export const PAIN_OPTIONS = [
  {
    value: 'Conseguir clientes constantes / Automatizar mi marketing (Pilar 1)',
    label: 'Conseguir clientes constantes / Automatizar mi marketing',
  },
  {
    value: 'Ordenar mi operación interna / Salir de planillas de Excel (Pilar 3)',
    label: 'Ordenar mi operación interna / Salir de planillas de Excel (ERP / CRM / Stock)',
  },
  {
    value: 'Nueva plataforma web rápida / Medir bien mis anuncios (Pilar 2)',
    label: 'Nueva plataforma web rápida / Medir bien mis anuncios',
  },
  {
    value: 'Integrar sistemas / Asistentes IA 24/7 (Pilar 4)',
    label: 'Conectar sistemas entre sí / Asistente IA 24/7 en WhatsApp y web',
  },
  {
    value: 'Auditoría técnica puntual en 3 a 7 días hábiles (100% acreditable)',
    label: 'Auditoría técnica puntual (3 a 7 días hábiles · 100% descontable)',
  },
  {
    value: 'Tengo ambos frentes trabados: quiero el diagnóstico de 15 minutos',
    label: 'Tengo ambos dolores: quiero el diagnóstico integral de 15 minutos',
  },
] as const;
