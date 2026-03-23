import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Empresa',
  description: 'Conoce la visión y misión de TechMYPE: software peruano para MYPES.',
};

export default function EmpresaPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 md:px-8 py-20 md:py-28">
        {/* Eyebrow */}
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-4">
          Sobre nosotros
        </span>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 leading-[1.1] mb-6">
          Software de nivel empresarial,<br />
          <span className="text-emerald-600">accesible para tu negocio local.</span>
        </h1>

        <p className="text-lg text-zinc-600 leading-relaxed mb-10">
          Dirigido por{' '}
          <strong className="text-zinc-900">Johann Abad</strong>, especialista Técnico en
          Ingeniería de Software con IA. Operando desde{' '}
          <strong className="text-zinc-900">Huánuco para todo el Perú</strong>, nuestra misión
          es que las bodegas, ferreterías y MYPES tengan la misma ventaja tecnológica que las
          grandes cadenas, sin pagar de más. No te vendemos código; te vendemos{' '}
          <strong className="text-emerald-700">tiempo y control</strong>.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100">
            <h2 className="text-base font-bold text-zinc-900 mb-2">🎯 Misión</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Democratizar la tecnología empresarial para que cada MYPE peruana pueda
              competir en igualdad de condiciones, sin necesitar un equipo de TI ni
              grandes presupuestos.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100">
            <h2 className="text-base font-bold text-zinc-900 mb-2">🚀 Visión</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Ser la plataforma tecnológica de referencia para las micro y pequeñas empresas
              del Perú, impulsando su crecimiento con IA, automatización y herramientas
              realmente usables.
            </p>
          </div>
        </div>

        <div className="border-t border-zinc-100 pt-10 flex flex-col sm:flex-row items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center text-white text-3xl font-bold shrink-0">
            J
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 text-lg">Johann Abad</h3>
            <p className="text-sm text-emerald-600 font-medium mb-2">
              Fundador · Ingeniero de Software con IA
            </p>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Especialista en automatización de procesos para negocios locales. Con experiencia
              en arquitecturas SaaS modernas y un enfoque 100% orientado a resolver problemas
              reales del mercado peruano.
            </p>
            <a
              href={`https://wa.me/51970435903?text=${encodeURIComponent('Hola Johann, vi tu perfil en TechMYPE y me interesa tu trabajo.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-white bg-[#25D366] hover:bg-[#1ebe5d] px-4 py-2 rounded-xl transition-colors"
            >
              Conversar por WhatsApp
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
