# Sistema de Stock & Punto de Venta Showroom — Cenko Fragancias (MVP Visual)

> **Silo Multi-Tenant Aislado:** `operacion/clientes/cenko-fragancias/entregables/sistema-stock/` (`--tenant=cenko-fragancias`)  
> **Formato:** Single Page Application (PWA) de alto rendimiento, 100% responsiva (Móvil, Tablet, Desktop)  
> **Estética:** *Liquid Chrome & Obsidian Noir* (tokens oficiales de `brandbook-cenko.html`)  
> **Persistencia:** Reactive LocalStorage Engine con datos de demostración precargados (cero backend en esta etapa)  
> **Integración Tiendanube:** Simulación en tiempo real de llamadas a la API REST v1 y registro de eventos de inventario

---

## 1. Módulos y Pantallas Operativas

1. **Punto de Venta Showroom (`POS`):**
   - Buscador predictivo por nombre de fragancia, casa/marca y acordes olfativos.
   - Filtros rápidos por familias: *Todas, Diseñador, Árabes & Nicho, Frescos, Amaderados, Dulces*.
   - Grilla de tarjetas interactivas con badges de disponibilidad (*Stock OK*, *¡Últimas unidades!*, *Agotado*).
   - Carrito de compras reactivo con ajuste de cantidades, descuentos en `$ ARS` y selección de medio de pago (*Transferencia, Efectivo, Débito, Crédito*).
   - **Alta automática de cliente:** Si se ingresa un DNI/Nombre que no existe en el sistema, al confirmar la venta queda registrado automáticamente con su primera compra en el historial.
   - Botón directo de **Consumidor Final** para cobro instantáneo en 1 clic.
   - Modal de comprobante con opción directa de **"Enviar Comprobante por WhatsApp"** formateado para `wa.me`.
   - Pestaña **"Ventas del Día"** con desglose por medio de pago para cierre de caja diario y botón de **Anulación de Venta** (devuelve el stock automáticamente).

2. **Directorio de Clientes:**
   - Tabla completa con buscador en tiempo real por DNI, nombre o teléfono.
   - Métricas acumuladas: Total gastado histórico, cantidad de compras, ticket promedio y fecha de última visita.
   - Enlace directo con un clic a WhatsApp para fidelización y consultas.
   - Ficha detallada con historial cronológico de todas las fragancias adquiridas y notas olfativas/preferencias personalizadas del cliente.

3. **Gestión de Stock & Analítica Comercial:**
   - KPIs del período: Facturación acumulada, unidades despachadas, productos bajo stock mínimo (≤ 2 uds) y stock inmovilizado (0 ventas).
   - **Ranking de Más Vendidos (% de participación):** Cálculo matemático exacto de rotación sobre el total de unidades vendidas con barras de progreso cromadas y doradas.
   - **Alertas de Reposición & Menos Vendidos:** Detección de perfumes agotados o con baja rotación para reposición inteligente.
   - Tabla de inventario general con stock mínimo editable y modal de **Ajuste Manual de Stock** (Ingreso de mercadería, rotura, conteo o tester de showroom).
   - **Monitor Tiendanube en vivo:** Registro cronológico de peticiones REST simuladas hacia `cenkofragancias.mitiendanube.com`.

4. **Usuarios & Permisos (Super-Admin Fran):**
   - Fran es el Super-Admin inmutable del sistema.
   - Panel de control de usuarios colaboradores con plantillas (*Vendedor* vs *Encargado*).
   - Matriz de 10 permisos granulares en base de datos.
   - Botón de restablecimiento de datos de prueba para recomenzar la demo visual en estado puro.

---

## 2. PWA y Ergonomía Móvil

- **Instalable como PWA:** Incorpora `manifest.json` y `sw.js` para agregarse a la pantalla de inicio en iPhone (Safari) y Android (Chrome) sin necesidad de Play Store.
- **Header Desktop (64px):** Logotipo vectorizado original de Cenko, navegación por pestañas e indicador de estado Tiendanube.
- **Bottom Navigation Móvil (60px + Safe Area):** Barra inferior táctil optimizada para dedos con área de seguridad de iPhone (`env(safe-area-inset-bottom)`).
- **Cero dependencias externas:** Funciona offline y abre al instante con doble clic.

---

## 3. Despliegue en Línea de Demostración

Para visualizarlo en el navegador localmente:
- Abrir directamente [`index.html`](./index.html) en Chrome, Edge o Safari.

Para publicar la demo interactiva en `futurizatech.com`:
- Desplegar la carpeta `operacion/clientes/cenko-fragancias/entregables/sistema-stock/` como ruta estática en Cloudflare Pages bajo la URL:
  `https://futurizatech.com/cenko/` (o subdominio asignado).
