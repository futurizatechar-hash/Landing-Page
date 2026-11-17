# Terminal de Mostrador & Caja — Tu Tablita Autoservicio (`M-13`)

> **Software Interno de la Empresa:** Exclusivo para Luciano Sosa y empleados de caja de Tu Tablita Autoservicio (Gral. Bustos 699, Córdoba).  
> **Acceso:** [`index.html`](./index.html)  

---

## 1. Sistema de Autenticación Unificado & Roles

La terminal cuenta con una pantalla de acceso único por **Número de Documento (DNI)** y **Contraseña**:

1. **Super-Admin (Dueño / Luciano Sosa):**
   - **DNI:** `35120450` | **Clave demo:** `admin123`
   - Acceso total a la terminal de ventas y canjes.
   - Acceso exclusivo al panel **"👥 Empleados"** para crear nuevos perfiles de cajeros, pausar/activar cuentas y eliminar accesos.
   - Auditoría total de quién realizó cada carga o canje de puntos.
2. **Cajero / Empleado (Romina Paz y equipo):**
   - **DNI:** `38901234` | **Clave demo:** `caja123`
   - Acceso enfocado a mostrador: búsqueda de clientes, carga de ventas con cálculo del 5% automático, canje de premios y consulta de catálogo.
   - Panel de gestión de empleados oculto y bloqueado por seguridad.
3. **Cierre de Turno (`🔒 Salir`):**
   - Bloquea la terminal y limpia la sesión activa en el navegador para permitir el cambio de turno entre cajeros.

---

## 2. Funcionalidades de la Terminal

1. **Búsqueda e Identificación en Caja:**
   - Escribir DNI o Nombre del cliente para seleccionarlo.
   - Si no existe, botón **"+ Nuevo Cliente"** para alta en 3 segundos pidiendo únicamente Nombre y DNI.
2. **Ficha y Auditoría del Cliente:**
   - Muestra saldo en puntos y equivalencia en pesos (`$ ARS`).
   - Muestra total gastado histórico, visitas y canjes.
   - Botón **"📜 Ver Historial"**: cronología completa de compras y canjes de ese cliente con identificación del operador de turno.
3. **Carga Rápida de Ventas con 5% Automático:**
   - Escribir el monto bruto en pesos (ej.: `$20.000`).
   - El sistema calcula al instante el 5% en puntos (`+1.000 PTS`).
   - Tocar **"＋ REGISTRAR VENTA & CARGAR PUNTOS"**.
   - Cada transacción queda sellada con el nombre, DNI y rol del operador en turno.
4. **Canje de Premios en Mostrador:**
   - Lista interactiva de premios. Al tocar **"🎁 Canjear"**, se descuentan los puntos automáticamente y se audita el canje.
5. **Gestor de Catálogo de Premios (`📦 Gestor de Catálogo`):**
   - Alta de nuevos productos (Nombre, Categoría, Emoji, Puntos requeridos).
   - Pausar / activar stock con un clic.
   - Eliminar productos.
6. **Gestor de Empleados (`👥 Empleados` — Exclusivo Super-Admin):**
   - Alta de nuevos empleados con Nombre, DNI, rol (Cajero / Administrador) y contraseña inicial.
   - Activar / pausar acceso de personal.
   - Monitoreo del total de operaciones realizadas por cada usuario.
7. **Historial del Turno:**
   - Detalle en vivo de las últimas 10 operaciones con indicación exacta de quién operó cada movimiento.

---

## 3. Puesta en Producción & Supabase

- **Modo Local:** Los datos se persisten en `localStorage` / `sessionStorage` del navegador.
- **Modo Supabase (Producción):** Ejecutar [`supabase-schema.sql`](./supabase-schema.sql) en el proyecto Supabase de Tu Tablita. Las variables de conexión (`SUPABASE_URL` y `SUPABASE_ANON_KEY`) se configuran a nivel de entorno/despliegue (`.env`), manteniendo la terminal de caja del mostrador 100% aislada y segura, sin exponer credenciales técnicas ni claves de base de datos al personal de caja.
