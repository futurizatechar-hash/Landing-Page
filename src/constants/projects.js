export const PORTFOLIO_PROJECTS = [
  {
    id: "spartan-gym-app",
    title: "Spartan Gym App",
    type: "App Móvil PWA",
    status: "En Desarrollo",
    is_private: true,
    image: "/projects/spartan/spartan-app.webp",
    description: "Aplicación móvil (PWA) exclusiva para socios del gimnasio, potenciada por IA. Ofrece una experiencia integral que abarca desde la creación asistida de la ficha médica inicial hasta la generación de planes de entrenamiento y nutrición personalizados. Incluye e-commerce con pasarela de pagos para membresías y productos, sistema de gamificación con canje de puntos, notificaciones de clases y promociones, videoteca técnica, control de acceso por código QR y registro de evolución física. Además, permite el seguimiento interactivo de rutinas en sala con temporizador en tiempo real y garantiza continuidad operativa incluso ante cortes de internet.",
    technologies: ["React 19", "Vite", "PWA", "TypeScript", "TailwindCSS", "Integración IA"],
    technical_highlights: [
      "Arquitectura resiliente basada en Service Workers, garantizando la operatividad de la aplicación incluso ante cortes temporales de conexión.",
      "Integración de IA para diagnóstico inicial, planes de entrenamiento y guías de nutrición personalizadas.",
      "Seguimiento interactivo de series y repeticiones con cronómetro de descanso en sala de musculación, videoteca técnica y pagos integrados."
    ],
    links: {
      live: null,
      github: null
    }
  },
  {
    id: "spartan-gym-web",
    title: "Spartan Gym Sitio Web",
    type: "Plataforma Web 3D",
    is_private: false,
    image: "/projects/spartan/spartan-web.webp",
    description: "Sitio web corporativo de alto impacto visual para la expansión de la marca. Incorpora modelos 3D interactivos, animaciones fluidas y renderizado de alto rendimiento para captación de nuevos socios.",
    technologies: ["Next.js 16", "Three.js", "React Three Fiber", "GSAP", "TailwindCSS"],
    technical_highlights: [
      "Renderizado 3D interactivo en tiempo real integrado con Three.js optimizado para máxima fluidez.",
      "Animaciones cinemáticas con GSAP y tiempos de carga instantáneos."
    ],
    links: {
      live: "https://spartan-gym.futurizatech.com/",
      github: null
    }
  },
  {
    id: "spartan-gym-cms",
    title: "Spartan Gym Gestor con IA",
    type: "Gestor con IA por Voz & Texto",
    is_private: true,
    image: "/projects/spartan/spartan-admin-login.webp",
    gallery: [
      { url: "/projects/spartan/spartan-admin-login.webp", label: "Portal Administrador (Login)" },
      { url: "/projects/spartan/spartan-admin-grilla.webp", label: "Grilla Activa (Pública)" },
      { url: "/projects/spartan/spartan-admin-borrador.webp", label: "Borrador con IA (Sin Guardar)" }
    ],
    description: "Gestor de contenido web inteligente desarrollado a medida. Permite al equipo administrativo actualizar, agregar o reestructurar secciones clave del sitio web, como la grilla de horarios y clases, en tiempo real. Todo esto operado de forma intuitiva mediante dictado por voz o instrucciones escritas que son interpretadas y ejecutadas por Inteligencia Artificial.",
    technologies: ["Next.js 16", "Google Gemini AI", "Whisper / Audio API", "TypeScript", "TailwindCSS"],
    technical_highlights: [
      "Interpretación de comandos de voz grabados en el navegador y prompts escritos para modificar horarios automáticamente.",
      "Validación de cambios estructurados con previsualización en vivo (borrador vs producción) antes del despliegue final."
    ],
    links: {
      live: null,
      github: null
    }
  },
  {
    id: "inox-ecomerce",
    title: "Inox E-commerce",
    type: "E-commerce Fullstack",
    status: "En Desarrollo",
    is_private: false,
    image: "/projects/inox/inox-ecommerce.webp",
    gallery: [
      { url: "/projects/inox/inox-ecommerce.webp", label: "Inicio (Home)" },
      { url: "/projects/inox/inox-catalogo.webp", label: "Catálogo Completo & Filtros" },
      { url: "/projects/inox/inox-login.webp", label: "Portal de Clientes & Login" }
    ],
    description: "Plataforma integral de comercio electrónico diseñada para la comercialización masiva de productos. Incluye un catálogo dinámico, gestión avanzada del carrito de compras, sistema de autenticación completo (registro, login y recuperación de contraseña) y pasarelas de pago integradas. Se destaca por su sincronización bidireccional en tiempo real con los sistemas internos de la empresa, abarcando depósito, ventas y gerencia.",
    technologies: ["Next.js", "Prisma", "Zustand", "TailwindCSS"],
    technical_highlights: [
      "Desarrollo fullstack integral utilizando Next.js y base de datos relacional gestionada mediante Prisma.",
      "Manejo de estado global complejo utilizando Zustand para el carrito de compras.",
      "Conexión y sincronización en tiempo real con los sistemas operativos internos de la empresa."
    ],
    links: {
      live: "https://inox.futurizatech.com/",
      github: null
    }
  },
  {
    id: "quadra-pizza-erp",
    title: "Quadra Pizza ERP",
    type: "Sistema de Gestión Empresarial",
    is_private: true,
    image: "/projects/quadra/quadra-gerencia.webp",
    gallery: [
      { url: "/projects/quadra/quadra-gerencia.webp", label: "Mando Central (Gerencia)" },
      { url: "/projects/quadra/quadra-recepcion.webp", label: "Punto de Venta (Recepción)" },
      { url: "/projects/quadra/quadra-cocina-comandas.webp", label: "Monitor de Comandas (Cocina)" },
      { url: "/projects/quadra/quadra-cocina-insumos.webp", label: "Visor de Insumos & Stock (Cocina)" },
      { url: "/projects/quadra/quadra-delivery.webp", label: "Rutas & Despacho (Delivery)" }
    ],
    description: "Sistema ERP integral desarrollado a medida para el sector gastronómico. Cuenta con paneles específicos e interconectados para cada área operativa: Recepción (gestión de pedidos y punto de venta), Cocina (monitor digital de comandas y control de insumos), Delivery (hoja de ruta y despacho de repartidores) y Gerencia (centro de mando con analíticas y métricas financieras en tiempo real).",
    technologies: ["Next.js", "Supabase", "Radix UI", "Framer Motion"],
    technical_highlights: [
      "Ecosistema multi-panel sincronizado en tiempo real entre Recepción, Cocina, Repartidores y Gerencia.",
      "Control de inventario de insumos críticos con alertas de faltantes y analítica financiera centralizada sin dependencias de terceros."
    ],
    links: {
      live: null,
      github: null
    }
  },
  {
    id: "quadra-pizza-store",
    title: "Quadra Pizza Store",
    type: "Catálogo & Tienda Virtual",
    is_private: false,
    image: "/projects/quadra/quadra-store.webp",
    gallery: [
      { url: "/projects/quadra/quadra-store-principal.webp", label: "Catálogo Principal (Ofertas)" },
      { url: "/projects/quadra/quadra-store-bebidas.webp", label: "Bebidas & Menú Completo" },
      { url: "/projects/quadra/quadra-store-carrito.webp", label: "Carrito de Compras" },
      { url: "/projects/quadra/quadra-store-checkout.webp", label: "Checkout & Envío WhatsApp" }
    ],
    description: "Plataforma de e-commerce y catálogo virtual orientada a la recepción rápida de pedidos online. Mantiene una sincronización en tiempo real con el inventario central y presenta un diseño fuertemente optimizado para garantizar la máxima tasa de conversión en dispositivos móviles.",
    technologies: ["React", "Next.js", "TailwindCSS"],
    technical_highlights: [
      "Catálogo interactivo con carrito de compras integrado y checkout ágil.",
      "Diseño enfocado en la experiencia de usuario móvil y alta conversión."
    ],
    links: {
      live: "https://quadrapizza.com",
      github: null
    }
  },
  {
    id: "masecor-web",
    title: "Masecor Sitio Web de Alta Performance",
    type: "Web Corporativa & SEO",
    is_private: false,
    image: "/projects/masecor/masecor-web.webp",
    description: "Sitio web corporativo de alto rendimiento optimizado para el posicionamiento en motores de búsqueda y la captación de clientes B2B. Carga instantánea y presencia visual profesional para proyectar autoridad.",
    technologies: ["Astro", "TailwindCSS", "TypeScript"],
    technical_highlights: [
      "Implementación en Astro para generación estática (SSG), logrando una calificación perfecta en Lighthouse.",
      "Optimización SEO técnica avanzada y tratamiento dinámico de imágenes pesadas."
    ],
    links: {
      live: "https://www.masecor.com.ar/",
      github: null
    }
  },
  {
    id: "masecor-almacen",
    title: "Masecor Depósito",
    type: "Gestión de Depósito & Stock",
    is_private: true,
    image: "/projects/masecor/masecor-almacen.webp",
    description: "Sistema de control logístico especializado en la administración ágil de inventarios. Presenta una interfaz altamente reactiva que permite a los operarios gestionar entradas, salidas y movimientos masivos de stock sin fricciones. Se integra y sincroniza en tiempo real con el resto del ecosistema corporativo (ventas y gerencia).",
    technologies: ["React", "Vite", "Zustand", "TailwindCSS"],
    technical_highlights: [
      "Sistema de inventario rápido con estado global gestionado por Zustand.",
      "Optimización en renderización de listas masivas de productos y filtrado en cliente.",
      "Sincronización en tiempo real de movimientos de stock con los demás sectores de la empresa."
    ],
    links: {
      live: "http://masecor-almacen.futurizatech.com/",
      github: null,
      is_demo: true,
      demo_note: "Este enlace dirige a una versión de muestra interactiva (demo) y no se trata del proyecto real en producción del cliente por confidencialidad operativa."
    }
  },
  {
    id: "guardforce-web",
    title: "GuardForce Sitio Web",
    type: "Web Corporativa & B2B",
    is_private: false,
    image: "/projects/guardforce/guardforce-web.webp",
    description: "Sitio web corporativo de alto impacto visual y rendimiento diseñado para posicionar la marca y captar clientes B2B del sector de seguridad privada. Presenta soluciones tecnológicas, automatizaciones y servicios con una estética dark/cyber moderna, carga ultra rápida y diseño 100% responsivo.",
    technologies: ["React", "Vite", "TailwindCSS", "Framer Motion"],
    technical_highlights: [
      "Diseño visual moderno con estética tecnológica, micro-interacciones fluidas y animaciones con Framer Motion.",
      "Optimización de rendimiento, estructura semántica para SEO y arquitectura orientada a la conversión de leads."
    ],
    links: {
      live: "https://guardforcesegurity.com/",
      github: null
    }
  },
  {
    id: "nairda-web",
    title: "Nairda Sitio Web",
    type: "Web Corporativa & Turnos",
    is_private: false,
    image: "/projects/nairda/nairda-web.webp",
    gallery: [
      { url: "/projects/nairda/nairda-landing-hero.webp", label: "Portada & Reservar Cita (Hero)" },
      { url: "/projects/nairda/nairda-landing-calendario.webp", label: "Paso 2: Selección de Fecha y Hora" },
      { url: "/projects/nairda/nairda-landing-confirmacion.webp", label: "Paso 3: Confirmación & WhatsApp" },
      { url: "/projects/nairda/nairda-landing-menu.webp", label: "Menú & Servicios Exclusivos" }
    ],
    description: "Sitio web exclusivo para salón boutique y estética premium. Incorpora sistema interactivo de reserva de citas paso a paso con selección de fecha, turnos disponibles y confirmación directa por WhatsApp.",
    technologies: ["Next.js", "React", "TailwindCSS", "Framer Motion"],
    technical_highlights: [
      "Flujo guiado de reserva de turnos interactivo con integración de mensajería instantánea.",
      "Diseño responsive de lujo con estética oscura y tipografía editorial de alta gama."
    ],
    links: {
      live: "https://nairda.futurizatech.com/",
      github: null
    }
  },
  {
    id: "nairda-pwa",
    title: "Nairda Studio - Panel de Gestión",
    type: "Panel de Gestión & Negocio",
    is_private: true,
    image: "/projects/nairda/nairda-pwa.webp",
    description: "Panel de administración exclusivo para la gestión interna de turnos, finanzas y marketing. Acceso privado y seguro con un diseño black minimalista.",
    technologies: ["Next.js", "PWA", "TailwindCSS"],
    technical_highlights: [
      "Módulos centralizados para administración operativa de turnos, métricas de finanzas y acciones de marketing.",
      "Experiencia PWA optimizada para control rápido desde dispositivos móviles con diseño black minimalista y acceso restringido."
    ],
    links: {
      live: null,
      github: null
    }
  },
  {
    id: "futuriza-crm",
    title: "FuturizaTech CRM",
    type: "CRM & Gestión Interna",
    is_private: true,
    image: "/projects/futuriza/futuriza-centro-mando.webp",
    gallery: [
      { url: "/projects/futuriza/futuriza-centro-mando.webp", label: "Centro de Mando (Dashboard)" },
      { url: "/projects/futuriza/futuriza-embudo.webp", label: "Embudo de Ventas (Pipeline)" },
      { url: "/projects/futuriza/futuriza-bandeja-ia.webp", label: "Bandeja IA (Inactiva)" }
    ],
    description: "Plataforma CRM diseñada a medida para la gestión integral de prospectos (leads), seguimiento de proyectos y control de etapas de desarrollo. Incorpora Inteligencia Artificial conversacional para automatizar la atención a clientes, así como flujos operativos que agilizan los procesos internos de FuturizaTech.",
    technologies: ["React", "Next.js", "TailwindCSS", "IA Conversacional"],
    technical_highlights: [
      "Panel de control intuitivo con métricas de rendimiento y conversión en tiempo real.",
      "Módulo de IA conversacional para la resolución autónoma de consultas y automatización del seguimiento comercial."
    ],
    links: {
      live: null,
      github: null
    }
  }
];
