# Guía de Despliegue en Dokploy

> Instrucciones paso a paso para desplegar **TechMYPE** en un servidor con [Dokploy](https://dokploy.com) usando Docker Compose.

---

## Requisitos previos

| Requisito | Mínimo recomendado |
|---|---|
| VPS / servidor | 1 vCPU · 1 GB RAM · Ubuntu 22.04 |
| Docker | 24+ |
| Docker Compose | v2+ |
| Dokploy | última versión estable |
| Dominio | con DNS apuntando al servidor |
| GitHub | repositorio del proyecto |

> Si aún no tienes Dokploy instalado, ejecuta en el servidor:
> ```bash
> curl -sSL https://dokploy.com/install.sh | sh
> ```
> Luego accede a `http://IP_SERVIDOR:3000` para la configuración inicial.

---

## 1. Subir el código a GitHub

Sube el proyecto a un repositorio en GitHub (puede ser privado).

```bash
git init
git add .
git commit -m "feat: initial commit"
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

Asegúrate de que estos archivos están incluidos en el repositorio:

- `Dockerfile`
- `docker-compose.yml`
- `schema.sql`
- `.dockerignore`
- **No** incluir `.env`, `.env.local` ni `node_modules`

---

## 2. Conectar GitHub en Dokploy

1. Ingresa al panel de Dokploy → **Settings** → **Git Providers**
2. Haz clic en **Add GitHub** y autoriza el acceso
3. Selecciona el repositorio `TechMYPE`

---

## 3. Crear el proyecto en Dokploy

1. En el panel principal → **New Project** → dale un nombre (`techmype`)
2. Dentro del proyecto → **New Service** → **Docker Compose**
3. Selecciona el repositorio conectado en el paso anterior
4. Branch: `main`
5. Compose file path: `docker-compose.yml` (por defecto)

---

## 4. Configurar las variables de entorno

En Dokploy, dentro del servicio creado → pestaña **Environment**:

| Variable | Valor de ejemplo | Obligatorio |
|---|---|---|
| `POSTGRES_PASSWORD` | `MiPass2024` | ✅ |
| `DATABASE_URL` | `postgresql://techmype:MiPass2024@postgres:5432/techmype_db` | ✅ |
| `ADMIN_SECRET` | _(contraseña del panel `/admin/login`)_ | ✅ |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `51987654321` | ✅ |
| `NEXT_PUBLIC_WHATSAPP_DEFAULT_MSG` | `Hola, me interesa digitalizar mi negocio.` | ✅ |
| `NEXT_PUBLIC_APP_URL` | `https://techmype.pe` | ✅ |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | ⛾ opcional |
| `APP_PORT` | `3010` | ⛾ (por defecto 3010) |

> ⚠️ **`DATABASE_URL` se debe configurar directamente**, no se construye automáticamente desde `POSTGRES_PASSWORD`.
> Si la contraseña contiene caracteres especiales, usa URL-encoding:
> `@` → `%40` | `!` → `%21` | `#` → `%23` | `$` → `%24` | `&` → `%26`
>
> Ejemplo con `S3cr3t_P@ss_2024!`:
> ```
> DATABASE_URL=postgresql://techmype:S3cr3t_P%40ss_2024%21@postgres:5432/techmype_db
> ```

### Generar ADMIN_SECRET seguro (contraseña del panel admin)

En cualquier terminal Linux/macOS:
```bash
openssl rand -base64 32
```
En PowerShell (Windows):
```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

> **Importante:** Las variables `NEXT_PUBLIC_*` se hornean en el bundle durante el build.
> Si las cambias, debes hacer un **redeploy** para que surtan efecto.

---

## 5. Configurar el dominio y SSL

1. En Dokploy, dentro del servicio → **Domains**
2. Haz clic en **Add Domain**
3. Ingresa tu dominio: `techmype.pe`
4. Puerto destino: `3010`
5. Activa **HTTPS / Let's Encrypt** → Dokploy genera el certificado automáticamente

> Asegúrate de que el DNS de tu dominio apunta al IP del servidor antes de activar SSL.

---

## 6. Hacer el primer deploy

1. En el servicio → pestaña **Deployments** → **Deploy** (o botón **Deploy Now**)
2. Dokploy ejecutará:
   - `git clone` del repositorio
   - `docker compose build` (construye la imagen Next.js con el Dockerfile)
   - `docker compose up -d`
3. En el primer arranque, PostgreSQL ejecuta automáticamente `schema.sql` y crea todas las tablas
4. Monitorea los logs en Dokploy → **Logs**

El proceso de build tarda ~3-5 minutos la primera vez.

---

## 7. Verificar que funciona

Una vez desplegado, comprueba:

```bash
# La landing carga correctamente
curl -I https://TU_DOMINIO

# El endpoint de leads responde
curl -X POST https://TU_DOMINIO/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","businessName":"X","phone":"987654321","city":"Lima","serviceInterest":"web"}'

# Panel de administración de métricas y leads
# URL: https://TU_DOMINIO/admin/login
# Contraseña: el valor de ADMIN_SECRET configurado en Dokploy
```

---

## 8. Configurar webhooks para deploy automático (opcional)

Para que Dokploy haga deploy cada vez que hagas `git push`:

1. Dokploy → **Settings** → copia el **Webhook URL**
2. En GitHub → **Settings** → **Webhooks** → **Add webhook**
3. Pega el URL, Content-Type: `application/json`, evento: **Push**
4. A partir de ahora cada push a `main` dispara un redeploy automático

---

## Comandos útiles de mantenimiento

### Ver logs en tiempo real
```bash
# Desde el servidor vía SSH
docker compose -p techmype logs -f app
docker compose -p techmype logs -f postgres
```

### Acceder a PostgreSQL
```bash
docker compose -p techmype exec postgres psql -U techmype -d techmype_db
```

### Hacer backup de la base de datos
```bash
docker compose -p techmype exec postgres \
  pg_dump -U techmype techmype_db > backup_$(date +%Y%m%d).sql
```

### Restaurar backup
```bash
docker compose -p techmype exec -T postgres \
  psql -U techmype -d techmype_db < backup_20240101.sql
```

### Forzar redeploy sin cambios en código
En Dokploy → **Deployments** → **Redeploy**  
O via CLI:
```bash
docker compose -p techmype up -d --force-recreate app
```

---

## Arquitectura del despliegue

```
Internet
   │
   ▼
Traefik (HTTPS / proxy) ← Dokploy lo gestiona
   │
   ▼
app:3000  (Next.js standalone)
   │
   ▼
postgres:5432  (PostgreSQL 16-alpine)
   │
   ▼
Volume: postgres_data (datos persistentes)
```

---

## Variables de entorno en detalle

### Variables de runtime (solo en el servidor, NO en el bundle)
- `DATABASE_URL` — conexión PostgreSQL. **Nunca** incluir en el código fuente
- `ADMIN_SECRET` — contraseña para el panel de administración en `/admin/login`
- `POSTGRES_PASSWORD` — contraseña del usuario PostgreSQL

### Variables de build-time (NEXT_PUBLIC_*)
Estas se **hornean** en el JavaScript del cliente durante el build de Docker:
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — número de WhatsApp con código de país (51...)
- `NEXT_PUBLIC_WHATSAPP_DEFAULT_MSG` — mensaje predeterminado al abrir WhatsApp
- `NEXT_PUBLIC_APP_URL` — URL pública del sitio (para SEO y metadatos)
- `NEXT_PUBLIC_GA_ID` — ID de Google Analytics (opcional)

> Si cambias una variable `NEXT_PUBLIC_*`, es obligatorio hacer **redeploy** para que se refleje en la aplicación.

---

## Solución de problemas

### La app arranca pero no conecta a la base de datos
- Verifica que `POSTGRES_PASSWORD` sea la misma en `app` y `postgres`
- Revisa los logs: `docker compose logs app`
- Confirma que `postgres` pasó el healthcheck: `docker compose ps`

### Authentication failed / credenciales inválidas en Prisma

Esto ocurre por dos razones:

**A) Caracteres especiales en la contraseña** — el `@`, `!`, `#` etc. rompen el parsing de la URL de PostgreSQL.
Solución: usa la contraseña URL-encoded en `DATABASE_URL`:
```bash
# Password: S3cr3t_P@ss_2024!
DATABASE_URL=postgresql://techmype:S3cr3t_P%40ss_2024%21@postgres:5432/techmype_db
```

**B) El volumen de postgres ya existe con una contraseña diferente** — PostgreSQL ignora `POSTGRES_PASSWORD` si los datos ya están inicializados.
Solución: cambiar la contraseña via SQL (sin perder datos):
```bash
# Acceder al contenedor postgres
docker compose -p techmype exec postgres psql -U techmype -d techmype_db
```
Luego dentro de psql:
```sql
ALTER USER techmype WITH PASSWORD 'tu_nuevo_password';
\q
```

O si quieres un reinicio limpio (se perderán los datos):
```bash
docker compose -p techmype down -v   # elimina volumen
docker compose -p techmype up -d     # recrear con nueva contraseña
```

### El schema no se aplicó (tablas no existen)
Esto ocurre si el volumen de PostgreSQL ya existía de un deploy anterior. Aplícalo manualmente:
```bash
docker compose -p techmype exec -T postgres \
  psql -U techmype -d techmype_db < schema.sql
```

### Error 502 desde Dokploy/Traefik
- La app puede estar aún iniciando. Espera 30s y recarga
- Verifica que el puerto configurado en Dokploy sea `3010`
- Revisa los logs del servicio app

### El número de WhatsApp no es el correcto en producción
Las variables `NEXT_PUBLIC_*` se hornean en build-time. Actualiza la variable en Dokploy y haz **redeploy**.

---

*Guía generada para TechMYPE v0.1.0 — Stack: Next.js 14 + PostgreSQL 16 + Docker*
