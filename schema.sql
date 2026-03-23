-- ============================================
-- TechMYPE — Schema PostgreSQL (Prisma 5 compatible)
-- ============================================

-- Enum types (deben coincidir exactamente con prisma/schema.prisma)
CREATE TYPE "ServiceType" AS ENUM ('POS_VENTAS', 'ECOMMERCE', 'SAAS_MEDIDA', 'WEB_CORPORATIVA');
CREATE TYPE "LeadSource"  AS ENUM ('ORGANIC', 'DIRECT', 'FACEBOOK_AD', 'GOOGLE_AD', 'REFERRAL');
CREATE TYPE "LeadStatus"  AS ENUM ('NUEVO', 'CONTACTADO', 'EN_NEGOCIACION', 'CERRADO_GANADO', 'CERRADO_PERDIDO');
CREATE TYPE "EventType"   AS ENUM ('DEMO_CLICK', 'WHATSAPP_CLICK', 'PRICING_VIEW', 'FORM_SUBMIT', 'PAGE_VIEW');

-- ── Admin ─────────────────────────────────────────────────────
CREATE TABLE "Admin" (
  "id"           TEXT         NOT NULL,
  "email"        TEXT         NOT NULL,
  "passwordHash" TEXT         NOT NULL,
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "lastLoginAt"  TIMESTAMP(3),
  CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- ── Lead ──────────────────────────────────────────────────────
CREATE TABLE "Lead" (
  "id"               TEXT          NOT NULL,
  "nombreContacto"   TEXT          NOT NULL,
  "nombreNegocio"    TEXT          NOT NULL,
  "telefonoWhatsApp" TEXT          NOT NULL,
  "email"            TEXT,
  "ciudad"           TEXT,
  "servicioInteres"  "ServiceType" NOT NULL,
  "origen"           "LeadSource"  NOT NULL DEFAULT 'ORGANIC',
  "estado"           "LeadStatus"  NOT NULL DEFAULT 'NUEVO',
  "notasAdmin"       TEXT,
  "planSeleccionado" TEXT,
  "createdAt"        TIMESTAMP(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"        TIMESTAMP(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Lead_estado_idx" ON "Lead"("estado");
CREATE INDEX "Lead_origen_idx" ON "Lead"("origen");

-- ── EventLog ──────────────────────────────────────────────────
CREATE TABLE "EventLog" (
  "id"        TEXT         NOT NULL,
  "eventType" "EventType"  NOT NULL,
  "target"    TEXT         NOT NULL,
  "metadata"  JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "EventLog_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "EventLog_eventType_idx" ON "EventLog"("eventType");
CREATE INDEX "EventLog_createdAt_idx" ON "EventLog"("createdAt");
