// ── Types for TechMYPE Platform ──

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceData {
  id: string;
  icon: string;
  iconBg: string;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
  size: 'large' | 'medium';
  visual?: string;
}

export interface MetricData {
  value: number;
  suffix: string;
  label: string;
}

export interface TestimonialData {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  stars: number;
}

export interface StepData {
  number: string;
  icon: string;
  title: string;
  description: string;
}

export interface PlanData {
  id: string;
  name: string;
  emoji: string;
  price: { monthly: number; annual: number };
  priceLabel?: string;
  description: string;
  features: string[];
  notIncluded: string[];
  cta: string;
  whatsappPlan: string;
  highlighted: boolean;
  badge?: string;
}

export interface LeadFormData {
  name: string;
  businessName: string;
  phone: string;
  city: string;
  serviceInterest: string;
  message: string;
}

export interface LeadApiResponse {
  success: boolean;
  leadId?: string;
  message?: string;
  errors?: Record<string, string[]>;
}
