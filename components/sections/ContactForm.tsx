'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactFormSchema, type ContactFormType } from '@/lib/validations';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { useDemoStore } from '@/store/demoStore';
import type { LeadApiResponse } from '@/types';

const cities = ['Lima', 'Arequipa', 'Trujillo', 'Chiclayo', 'Huánuco', 'Cusco', 'Otra'] as const;
const serviceOptions = [
  { value: 'pos', label: 'Sistema POS / Ventas' },
  { value: 'ecommerce', label: 'E-commerce / Tienda Online' },
  { value: 'saas', label: 'SaaS a Medida' },
  { value: 'web', label: 'Presencia Web' },
  { value: 'unknown', label: 'No sé aún' },
] as const;

interface FieldErrors {
  [key: string]: string | undefined;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormType>({
    name: '',
    businessName: '',
    phone: '',
    city: 'Lima',
    serviceInterest: 'pos',
    message: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submittedName, setSubmittedName] = useState('');
  const lastTriedDemo = useDemoStore((s) => s.lastTriedDemo);

  const demoLabels: Record<string, string> = {
    pos: 'Sistema POS',
    dashboard: 'Dashboard Empresarial',
    catalog: 'Catálogo WhatsApp',
    cashflow: 'Gestor de Caja',
  };

  const validateField = useCallback((field: keyof ContactFormType, value: string) => {
    const partial = { ...formData, [field]: value };
    const result = ContactFormSchema.safeParse(partial);
    if (result.success) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } else {
      const fieldError = result.error.flatten().fieldErrors[field];
      setErrors((prev) => ({
        ...prev,
        [field]: fieldError ? fieldError[0] : undefined,
      }));
    }
  }, [formData]);

  const handleChange = (field: keyof ContactFormType, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: keyof ContactFormType) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field] ?? '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = ContactFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      const flat = result.error.flatten().fieldErrors;
      for (const key of Object.keys(flat) as (keyof ContactFormType)[]) {
        fieldErrors[key] = flat[key]?.[0];
      }
      setErrors(fieldErrors);
      setTouched({
        name: true,
        businessName: true,
        phone: true,
        city: true,
        serviceInterest: true,
        message: true,
      });
      return;
    }

    setStatus('loading');
    try {
      const resp = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...result.data,
          source: 'landing_form',
          message: lastTriedDemo
            ? `[Demo probada: ${demoLabels[lastTriedDemo] ?? lastTriedDemo}] ${result.data.message ?? ''}`
            : result.data.message,
        }),
      });

      const data: LeadApiResponse = await resp.json();

      if (resp.ok && data.success) {
        setSubmittedName(result.data.name.split(' ')[0]);
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const getFieldIcon = (field: keyof ContactFormType) => {
    if (!touched[field]) return null;
    if (errors[field]) {
      return <span className="text-red-500 text-sm">✗</span>;
    }
    return <span className="text-emerald-500 text-sm">✓</span>;
  };

  if (status === 'success') {
    return (
      <section id="contacto" className="py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--bg-secondary)] rounded-2xl p-8 md:p-12 text-center max-w-lg mx-auto"
          >
            <span className="text-5xl mb-4 block">✅</span>
            <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
              ¡Perfecto, {submittedName}!
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              Te contactamos pronto. Mientras tanto, puedes escribirnos por WhatsApp ahora mismo.
            </p>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              Ir a WhatsApp ahora
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
            ¿Listo para dar el siguiente paso?
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] mt-4">
            Déjanos tus datos y un asesor te contacta en menos de 2 horas.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-[var(--bg-secondary)] rounded-2xl p-8 md:p-12 max-w-3xl mx-auto"
          noValidate
        >
          {/* Demo tracking banner */}
          {lastTriedDemo && (
            <div className="mb-6 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-4 py-3">
              <span>🎮</span>
              <span>Probaste la demo <strong>{demoLabels[lastTriedDemo]}</strong> — tu asesor sabrá exactamente qué necesitas.</span>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Nombre completo
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  placeholder="Juan Pérez"
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all ${
                    errors.name && touched.name ? 'border-red-300' : 'border-[var(--border-default)]'
                  }`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  {getFieldIcon('name')}
                </span>
              </div>
              <AnimatePresence>
                {errors.name && touched.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs text-red-500 mt-1"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Business Name */}
            <div className="relative">
              <label htmlFor="businessName" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Nombre de tu negocio
              </label>
              <div className="relative">
                <input
                  id="businessName"
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleChange('businessName', e.target.value)}
                  onBlur={() => handleBlur('businessName')}
                  placeholder="Bodega Don Juan"
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all ${
                    errors.businessName && touched.businessName ? 'border-red-300' : 'border-[var(--border-default)]'
                  }`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  {getFieldIcon('businessName')}
                </span>
              </div>
              <AnimatePresence>
                {errors.businessName && touched.businessName && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs text-red-500 mt-1"
                  >
                    {errors.businessName}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Phone */}
            <div className="relative">
              <label htmlFor="phone" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Número de WhatsApp
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--text-muted)] select-none">
                  🇵🇪 +51
                </div>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  placeholder="987654321"
                  className={`w-full pl-20 pr-10 py-3 rounded-xl border bg-white text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all ${
                    errors.phone && touched.phone ? 'border-red-300' : 'border-[var(--border-default)]'
                  }`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  {getFieldIcon('phone')}
                </span>
              </div>
              <AnimatePresence>
                {errors.phone && touched.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs text-red-500 mt-1"
                  >
                    {errors.phone}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* City */}
            <div className="relative">
              <label htmlFor="city" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Ciudad
              </label>
              <div className="relative">
                <select
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  onBlur={() => handleBlur('city')}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border-default)] bg-white text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all appearance-none"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]">
                  ▾
                </span>
              </div>
            </div>

            {/* Service Interest */}
            <div className="relative md:col-span-2">
              <label htmlFor="serviceInterest" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                ¿Qué servicio te interesa?
              </label>
              <select
                id="serviceInterest"
                value={formData.serviceInterest}
                onChange={(e) => handleChange('serviceInterest', e.target.value)}
                onBlur={() => handleBlur('serviceInterest')}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border-default)] bg-white text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all appearance-none"
              >
                {serviceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="relative md:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                ¿Qué necesitas? (opcional)
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                onBlur={() => handleBlur('message')}
                placeholder="Cuéntanos brevemente qué necesitas..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border-default)] bg-white text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all resize-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-semibold text-base transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Enviando...
              </>
            ) : (
              'Quiero que me contacten →'
            )}
          </button>

          {/* Error toast */}
          <AnimatePresence>
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 text-center"
              >
                Hubo un error al enviar. Por favor intenta de nuevo o escríbenos por WhatsApp.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}
