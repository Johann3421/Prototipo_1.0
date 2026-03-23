import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sistema POS para Ferreterías en Perú | TechMYPE — Prueba Gratis',
  description:
    'Sistema de ventas POS diseñado para ferreterías peruanas. Controla tu stock, emite boletas y cierra el día en segundos. Sin contratos • Desde S/ 99/mes.',
  openGraph: {
    title: 'Sistema POS para Ferreterías en Perú',
    description: 'Digitaliza tu ferretería hoy. Control total de ventas e inventario.',
  },
  robots: { index: true, follow: true },
};

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '51970435903';

function buildWaUrl(msg: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function POSFerreteriasLanding() {
  const waMsg = 'Hola, vi el anuncio del Sistema POS para ferreterías y quiero una demo.';

  return (
    <div className="min-h-screen bg-white font-[Inter,sans-serif]">
      {/* ── TRUST BAR ── */}
      <div className="bg-emerald-600 text-white text-center text-xs py-2 font-medium">
        🇵🇪 Software 100% peruano · Soporte en español · Sin contratos largos
      </div>

      {/* ── HERO ── */}
      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase mb-4">
          ¿Aún usas cuadernos o Excel?
        </span>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 leading-[1.1] mb-5">
          Tu ferretería merece un{' '}
          <span className="text-emerald-600 underline decoration-emerald-300">
            sistema de ventas real
          </span>
        </h1>

        <p className="text-lg text-zinc-600 mb-8 leading-relaxed max-w-xl mx-auto">
          Con TechMYPE controlas tu stock al instante, emites boletas electrónicas
          y ves cuánto ganaste hoy — todo desde tu celular.
        </p>

        <a
          href={buildWaUrl(waMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-lg font-bold px-8 py-4 rounded-2xl shadow-lg shadow-green-500/30 transition-colors"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Quiero ver una demo GRATIS
        </a>
        <p className="mt-3 text-xs text-zinc-400">Sin compromiso · Respuesta en minutos</p>
      </section>

      {/* ── PROBLEMA ── */}
      <section className="bg-zinc-50 py-14">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-zinc-900 text-center mb-8">
            ¿Cuánto te está costando no tener un sistema?
          </h2>
          <div className="space-y-4">
            {[
              { emoji: '📦', problem: 'Mercadería que "desaparece" porque no hay control de stock' },
              { emoji: '🧮', problem: 'Contar caja a mano y equivocarte al cuadrar el día' },
              { emoji: '🗒️', problem: 'Perder ventas porque no sabes qué tienes en almacén' },
              { emoji: '⏰', problem: 'Horas haciendo inventario que podrías usar en vender más' },
            ].map((item) => (
              <div
                key={item.problem}
                className="flex items-start gap-3 bg-white rounded-xl p-4 border border-zinc-100 shadow-sm"
              >
                <span className="text-2xl">{item.emoji}</span>
                <p className="text-zinc-700 font-medium leading-snug">{item.problem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUCIÓN ── */}
      <section className="py-14">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-zinc-900 text-center mb-8">
            TechMYPE resuelve todo eso desde{' '}
            <span className="text-emerald-600">S/ 99 al mes</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: '🛒', feat: 'POS táctil', desc: 'Vende desde celular o tablet, sin hardware caro.' },
              { icon: '📊', feat: 'Control de stock', desc: 'Alertas automáticas cuando un producto se acaba.' },
              { icon: '🧾', feat: 'Boletas y facturas', desc: 'Emisión electrónica validada por SUNAT.' },
              { icon: '📈', feat: 'Reporte del día', desc: 'Cierra caja y revisa tu ganancia en segundos.' },
            ].map((f) => (
              <div key={f.feat} className="p-5 rounded-2xl border border-zinc-100 bg-zinc-50">
                <span className="text-3xl mb-2 block">{f.icon}</span>
                <h3 className="font-bold text-zinc-900 text-sm mb-1">{f.feat}</h3>
                <p className="text-xs text-zinc-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-zinc-900 py-16">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">
            Empieza hoy. Sin complicaciones.
          </h2>
          <p className="text-zinc-400 mb-8">
            Setup en 24 horas · Soporte en español del equipo TechMYPE
          </p>
          <a
            href={buildWaUrl(waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-8 py-4 rounded-2xl transition-colors text-base shadow-lg shadow-green-500/20"
          >
            Hablar con Johann por WhatsApp →
          </a>
          <p className="mt-3 text-xs text-zinc-500">+51 970 435 903</p>
        </div>
      </section>

      {/* ── LEGAL FOOTER ── */}
      <footer className="text-center py-5 text-xs text-zinc-400">
        © 2026 TechMYPE · Huánuco, Perú ·{' '}
        <a href="/terminos" className="hover:text-zinc-600 underline">Términos</a>{' '}
        ·{' '}
        <a href="/privacidad" className="hover:text-zinc-600 underline">Privacidad</a>
      </footer>
    </div>
  );
}
