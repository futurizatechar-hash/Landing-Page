# Guía de Mantenimiento y Keep-Alive de Supabase

Esta guía detalla la configuración para mantener activa la base de datos de Supabase (**Futuriza-CRM**, ID: `hfiyrtnfhnzfcexmnubu`) y asegurar que **nunca más se pause por inactividad**.

---

## 1. ¿Por qué se pausaba la base de datos?

Supabase pausa los proyectos del tier gratuito tras **7 días sin consultas**.
- Un simple `curl` al dominio o un ping HTTP básico **no cuenta como actividad**.
- Supabase requiere una **consulta real a la base de datos PostgreSQL** (por ejemplo, a través de la API REST de PostgREST con la clave de API correspondiente).

---

## 2. Configuración en GitHub Actions

### En este repositorio (`futuriza-landing`)
Ya dejamos creado el workflow en:
`.github/workflows/keep-supabase-alive.yml`

Se ejecuta automáticamente cada **2 días** y realiza una lectura ligera de 1 registro a la tabla `leads_futuriza`:
```bash
GET https://hfiyrtnfhnzfcexmnubu.supabase.co/rest/v1/leads_futuriza?select=id&limit=1
```

### En el repositorio hermano (`futurizatechar-hash/futuriza-crm`)
En tu otro repositorio, abre el archivo existente (ej. `.github/workflows/keep-alive.yml` o similar) y reemplaza su contenido por el siguiente:

```yaml
name: Keep Supabase Alive

on:
  schedule:
    - cron: '0 11 */2 * *' # Cada 2 días a las 11:00 UTC (8:00 AM ARG)
  workflow_dispatch:

jobs:
  ping-supabase:
    name: Ping Supabase Postgres
    runs-on: ubuntu-latest
    steps:
      - name: Send Query to Supabase via PostgREST
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_URL || 'https://hfiyrtnfhnzfcexmnubu.supabase.co' }}
          SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY || 'sb_publishable_VyCnuNBCv1s8ADixhllTJQ_CUrbTdHr' }}
        run: |
          echo "🚀 Ejecutando consulta activa a PostgreSQL en Supabase..."
          
          HTTP_STATUS=$(curl -s -o response.json -w "%{http_code}" \
            -X GET "$SUPABASE_URL/rest/v1/leads_futuriza?select=id&limit=1" \
            -H "apikey: $SUPABASE_ANON_KEY" \
            -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
            -H "Content-Type: application/json")
          
          echo "Código HTTP recibido: $HTTP_STATUS"
          cat response.json
          echo ""

          if [ "$HTTP_STATUS" -ge 200 ] && [ "$HTTP_STATUS" -lt 300 ]; then
            echo "✅ Supabase está activo y respondiendo."
          else
            echo "❌ Error de conexión con Supabase. Código HTTP: $HTTP_STATUS"
            exit 1
          fi
```

---

## 3. Monitor Externo Gratuito (Respaldo Permanente Recomendado)

GitHub Actions tiene una regla interna: si un repositorio pasa **60 días sin commits**, GitHub desactiva silenciosamente los cron jobs programados.

Para tener una garantía del 100% que nunca expire, puedes configurar en 2 minutos un monitor gratuito en **[cron-job.org](https://cron-job.org)**:

1. Crea una cuenta gratuita en [cron-job.org](https://cron-job.org).
2. Hacé clic en **"Create Cronjob"**.
3. Configuración del Job:
   - **Title:** `Keep Supabase Alive - Futuriza`
   - **URL:** `https://hfiyrtnfhnzfcexmnubu.supabase.co/rest/v1/leads_futuriza?select=id&limit=1`
   - **Schedule:** Cada 2 o 3 días (ej. a las 12:00 hs).
   - **Request Method:** `GET`
   - **Headers:** Agregá estos dos encabezados:
     - `apikey`: `sb_publishable_VyCnuNBCv1s8ADixhllTJQ_CUrbTdHr`
     - `Authorization`: `Bearer sb_publishable_VyCnuNBCv1s8ADixhllTJQ_CUrbTdHr`
4. Guarda el Cronjob.

Con esto, **cron-job.org** enviará la consulta a Postgres de por vida, manteniendo tu base de datos siempre despierta sin importar la actividad de GitHub.
