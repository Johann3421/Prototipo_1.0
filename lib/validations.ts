import { z } from 'zod';

export const LeadSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  businessName: z.string().min(2, 'El nombre del negocio debe tener al menos 2 caracteres').max(150),
  phone: z.string().regex(
    /^(\+51|51)?[9][0-9]{8}$/,
    'Número peruano inválido. Debe empezar con 9 y tener 9 dígitos.'
  ),
  city: z.enum(['Lima', 'Arequipa', 'Trujillo', 'Chiclayo', 'Huánuco', 'Cusco', 'Otra']),
  serviceInterest: z.enum(['pos', 'ecommerce', 'saas', 'web', 'unknown']),
  message: z.string().max(1000).optional(),
  planSelected: z.string().optional(),
  source: z.enum(['landing_form', 'whatsapp_btn', 'pricing_cta']).default('landing_form'),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export type LeadSchemaType = z.infer<typeof LeadSchema>;

export const ContactFormSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  businessName: z.string().min(2, 'El nombre del negocio debe tener al menos 2 caracteres').max(150),
  phone: z.string().regex(
    /^(\+51|51)?[9][0-9]{8}$/,
    'Número peruano inválido'
  ),
  city: z.enum(['Lima', 'Arequipa', 'Trujillo', 'Chiclayo', 'Huánuco', 'Cusco', 'Otra']),
  serviceInterest: z.enum(['pos', 'ecommerce', 'saas', 'web', 'unknown']),
  message: z.string().max(1000).optional(),
});

export type ContactFormType = z.infer<typeof ContactFormSchema>;
