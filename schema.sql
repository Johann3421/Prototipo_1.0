-- ============================================
-- TechMYPE — Schema PostgreSQL
-- ============================================

-- Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Tabla principal de Leads ──
CREATE TABLE leads (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            VARCHAR(100)    NOT NULL,
  business_name   VARCHAR(150)    NOT NULL,
  phone           VARCHAR(20)     NOT NULL,
  city            VARCHAR(50)     NOT NULL,
  service_interest VARCHAR(50)    NOT NULL
    CHECK (service_interest IN ('pos', 'ecommerce', 'saas', 'web', 'unknown')),
  message         TEXT,
  source          VARCHAR(50)     DEFAULT 'landing_form'
    CHECK (source IN ('landing_form', 'whatsapp_btn', 'pricing_cta')),
  plan_selected   VARCHAR(50),
  status          VARCHAR(30)     DEFAULT 'new'
    CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  utm_source      VARCHAR(100),
  utm_medium      VARCHAR(100),
  utm_campaign    VARCHAR(100),
  ip_address      INET,
  user_agent      TEXT,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── Tabla de Mensajes de Contacto ──
CREATE TABLE contact_messages (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id     UUID REFERENCES leads(id) ON DELETE SET NULL,
  subject     VARCHAR(200),
  body        TEXT            NOT NULL,
  read        BOOLEAN         DEFAULT false,
  replied_at  TIMESTAMP WITH TIME ZONE,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── Tabla de Vistas de Página (Analytics básico) ──
CREATE TABLE page_views (
  id          BIGSERIAL PRIMARY KEY,
  path        VARCHAR(200)    NOT NULL,
  referrer    VARCHAR(500),
  utm_source  VARCHAR(100),
  utm_medium  VARCHAR(100),
  utm_campaign VARCHAR(100),
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── Índices de performance ──
CREATE INDEX idx_leads_status       ON leads(status);
CREATE INDEX idx_leads_created_at   ON leads(created_at DESC);
CREATE INDEX idx_leads_city         ON leads(city);
CREATE INDEX idx_leads_service      ON leads(service_interest);
CREATE INDEX idx_leads_phone        ON leads(phone);

-- ── Trigger para updated_at automático ──
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ── Vista útil para dashboard interno ──
CREATE VIEW leads_summary AS
SELECT
  DATE(created_at)    AS date,
  city,
  service_interest,
  status,
  COUNT(*)            AS total,
  COUNT(CASE WHEN status = 'converted' THEN 1 END) AS converted
FROM leads
GROUP BY DATE(created_at), city, service_interest, status
ORDER BY date DESC;
