# TechMYPE — Software para MYPES Perú

Landing page de alta conversión para servicios de software B2B dirigida a MYPES en Perú.

## Stack Tecnológico

- **Framework:** Next.js 14 (App Router)
- **Estilos:** Tailwind CSS
- **Animaciones:** Framer Motion
- **Base de datos:** PostgreSQL
- **Validación:** Zod
- **Lenguaje:** TypeScript

## Requisitos Previos

- Node.js 18+
- PostgreSQL 14+ (o cuenta en Neon)
- npm o yarn

## Instalación Local

```bash
# 1. Clonar el repositorio
git clone <tu-repositorio>
cd techmype

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# 4. Crear la base de datos
psql -U tu_usuario -d tu_base_de_datos -f schema.sql

# 5. Iniciar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Variables de Entorno

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | Connection string de PostgreSQL |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de WhatsApp (formato: 51XXXXXXXXX) |
| `NEXT_PUBLIC_WHATSAPP_DEFAULT_MSG` | Mensaje predeterminado de WhatsApp |
| `ADMIN_API_KEY` | API key para acceder al endpoint GET /api/leads |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID (opcional) |
| `NEXT_PUBLIC_APP_URL` | URL pública del sitio |

## Estructura del Proyecto

```
app/
├── layout.tsx            # Layout raíz con metadatos SEO
├── page.tsx              # Landing page principal
├── globals.css           # Variables CSS + Tailwind
└── api/
    ├── leads/route.ts    # POST/GET para leads
    └── contact/route.ts  # POST para contacto
components/
├── layout/               # Navbar, Footer
├── sections/             # Secciones de la landing
└── ui/                   # Componentes reutilizables
lib/
├── db.ts                 # Conexión PostgreSQL
├── validations.ts        # Schemas Zod
├── whatsapp.ts           # Helpers WhatsApp
└── utils.ts              # Utilidades (cn)
```

## Deploy en Vercel + Neon

### 1. Crear base de datos en Neon

1. Ir a [neon.tech](https://neon.tech) y crear una cuenta gratuita
2. Crear un nuevo proyecto
3. Copiar el connection string proporcionado

### 2. Deploy en Vercel

1. Ir a [vercel.com](https://vercel.com)
2. Importar el repositorio desde GitHub
3. Configurar las variables de entorno:
   - `DATABASE_URL` → connection string de Neon
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` → tu número de WhatsApp
   - `NEXT_PUBLIC_WHATSAPP_DEFAULT_MSG` → mensaje predeterminado
   - `ADMIN_API_KEY` → generar con `openssl rand -base64 32`
4. Deploy

### 3. Ejecutar el schema SQL

Desde la consola SQL de Neon, ejecutar el contenido de `schema.sql`.

## API Endpoints

### POST /api/leads
Captura leads del formulario de contacto.

```json
{
  "name": "Juan Pérez",
  "businessName": "Bodega Don Juan",
  "phone": "987654321",
  "city": "Lima",
  "serviceInterest": "pos",
  "message": "Necesito un sistema POS",
  "source": "landing_form"
}
```

### GET /api/leads
Lista leads (requiere autenticación).

```
GET /api/leads?status=new&city=Lima&page=1&limit=20
Authorization: Bearer <ADMIN_API_KEY>
```

### POST /api/contact
Envío de mensajes de contacto.

## Licencia

Todos los derechos reservados © 2025 TechMYPE.
