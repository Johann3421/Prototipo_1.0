# ──────────────────────────────────────────────────────────────
# Stage 1: Instalar dependencias
# ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

# Instalar certificados para fetch de Google Fonts en build
# openssl: necesario para que Prisma detecte linux-musl-openssl-3.0.x (Alpine 3.17+)
RUN apk add --no-cache libc6-compat ca-certificates openssl

COPY package.json package-lock.json* ./
RUN npm ci

# ──────────────────────────────────────────────────────────────
# Stage 2: Build de producción
# ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# openssl requerido para que prisma generate use el binario correcto (linux-musl-openssl-3.0.x)
RUN apk add --no-cache openssl

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables públicas (NEXT_PUBLIC_*) se hornean en el bundle en build-time
ARG NEXT_PUBLIC_WHATSAPP_NUMBER=51999999999
ARG NEXT_PUBLIC_WHATSAPP_DEFAULT_MSG="Hola, me interesa digitalizar mi negocio. ¿Me pueden orientar?"
ARG NEXT_PUBLIC_APP_URL=https://techmype.pe
ARG NEXT_PUBLIC_GA_ID=""

ENV NEXT_PUBLIC_WHATSAPP_NUMBER=$NEXT_PUBLIC_WHATSAPP_NUMBER
ENV NEXT_PUBLIC_WHATSAPP_DEFAULT_MSG=$NEXT_PUBLIC_WHATSAPP_DEFAULT_MSG
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ENV NEXT_TELEMETRY_DISABLED=1

# Genera el Prisma Client con los tipos TypeScript correctos
RUN npx prisma generate

RUN npm run build

# ──────────────────────────────────────────────────────────────
# Stage 3: Runner (imagen mínima de producción)
# ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# openssl: Prisma requiere libssl.so.3 en Alpine 3.17+ (OpenSSL 3.0)
RUN apk add --no-cache openssl

# Usuario no-root por seguridad
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Copiar artefactos del build standalone
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copiar los binarios de Prisma explícitamente (la traza de archivos de Next.js
# no siempre incluye .so.node nativos en modo standalone)
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma/client ./node_modules/@prisma/client

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
