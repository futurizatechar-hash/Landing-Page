# Guía de Mantenimiento y Keep-Alive de Supabase (`leads_futuriza`)

Esta guía detalla la configuración activa para mantener operativa la instancia PostgreSQL de Supabase del CRM comercial de **FuturizaTech** y evitar pausas automáticas por inactividad.

---

## 1. Motivo Técnico

Los proyectos de Supabase requieren actividad real sobre la base de datos PostgreSQL (vía API REST PostgREST autenticada) dentro de ventanas inferiores a 7 días. Un simple ping HTTP sin encabezados de autenticación no contabiliza como actividad de motor.

---

## 2. Flujo Automatizado en GitHub Actions

El repositorio incluye el flujo oficial ubicado en su ruta ejecutable estándar:

- [`.github/workflows/keep-supabase-alive.yml`](../.github/workflows/keep-supabase-alive.yml)

### Secretos Requeridos en GitHub (`Settings → Secrets and variables → Actions`)

Por seguridad estricta, ninguna clave debe escribirse en texto plano dentro del archivo YAML ni en documentación versionada. Cargá estos dos *Repository Secrets*:

| Nombre del Secreto | Descripción |
| :--- | :--- |
| `SUPABASE_URL` | URL base del proyecto en Supabase (`https://<project-ref>.supabase.co`). |
| `SUPABASE_ANON_KEY` | Clave pública (`anon` / `publishable`) con permisos RLS de lectura mínima o el rol configurado. |

El flujo corre automáticamente cada **48 horas** (`0 11 */2 * *`) y también admite ejecución manual desde la pestaña **Actions → Keep Supabase Alive → Run workflow**.

---

## 3. Respaldo Externo Opcional (`cron-job.org`)

Dado que GitHub Actions pausa tareas programadas si un repositorio supera 60 días sin nuevos commits, se recomienda mantener un monitor complementario gratuito en `cron-job.org` apuntando a:

- **Método:** `GET`
- **Endpoint:** `<SUPABASE_URL>/rest/v1/leads_futuriza?select=id&limit=1`
- **Encabezados:** `apikey: <SUPABASE_ANON_KEY>` y `Authorization: Bearer <SUPABASE_ANON_KEY>`
- **Frecuencia:** Cada 48–72 horas.
