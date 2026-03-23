import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Guías y recursos para digitalizar tu MYPE en Perú. Próximamente en TechMYPE.',
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 md:px-8 py-20 md:py-28">
        {/* Hero banner */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-4">
            Recursos
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">
            Blog TechMYPE
          </h1>
          <p className="text-lg text-zinc-500 max-w-xl mx-auto">
            Guías prácticas para digitalizar tu negocio, aumentar ventas y ahorrar tiempo.
          </p>
        </div>

        {/* Coming soon banner */}
        <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-10 md:p-16 text-center text-white mb-12">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Próximamente: Guías para digitalizar tu negocio
          </h2>
          <p className="text-emerald-200 text-base max-w-lg mx-auto mb-6">
            Estamos preparando artículos con estrategias reales para dueños de bodegas,
            ferreterías y MYPES. Sin tecnicismos, solo resultados.
          </p>
          <a
            href={`https://wa.me/51970435903?text=${encodeURIComponent('Hola, quiero que me avisen cuando publiquen artículos en el blog de TechMYPE.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors text-sm"
          >
            Avisarme cuando salga →
          </a>
        </div>

        {/* Topics preview */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { emoji: '🛒', topic: 'Cómo vender más con un sistema POS' },
            { emoji: '📦', topic: 'Control de inventario sin hojas de cálculo' },
            { emoji: '📱', topic: 'Catálogo digital: más ventas por WhatsApp' },
            { emoji: '🧾', topic: 'Facturación electrónica SUNAT paso a paso' },
            { emoji: '📊', topic: 'Leer tus números: flujo de caja básico' },
            { emoji: '🤖', topic: 'IA para tu bodega: qué funciona ya' },
          ].map((item) => (
            <div
              key={item.topic}
              className="rounded-2xl border border-zinc-100 bg-zinc-50 p-5 flex items-start gap-3"
            >
              <span className="text-2xl">{item.emoji}</span>
              <p className="text-sm font-medium text-zinc-700 leading-snug">{item.topic}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
