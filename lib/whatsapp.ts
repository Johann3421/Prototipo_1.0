const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '51999999999';
const DEFAULT_MESSAGE = process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MSG ?? 'Hola, me interesa digitalizar mi negocio. ¿Me pueden orientar?';

export function buildWhatsAppUrl(plan?: string): string {
  const message = plan
    ? `Hola, me interesa digitalizar mi negocio con el plan ${plan}.`
    : DEFAULT_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
