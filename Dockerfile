# ──────────────────────────────────────────────────────────────
# Stage 1: Instalar dependencias
# ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

# Instalar certificados para fetch de Google Fonts en build
RUN apk add --no-cache libc6-compat ca-certificates

COPY package.json package-lock.json* ./
RUN npm ci

# ──────────────────────────────────────────────────────────────
# Stage 2: Build de producción
# ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

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

RUN npm run build

# ──────────────────────────────────────────────────────────────
# Stage 3: Runner (imagen mínima de producción)
# ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Usuario no-root por seguridad
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Copiar artefactos del build standalone
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
