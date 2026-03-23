import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  robots: { index: false, follow: false },
};

export default function TerminosPage() {
  const fecha = '1 de enero de 2026';
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 md:px-8 py-20">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Términos y Condiciones</h1>
        <p className="text-sm text-zinc-400 mb-10">Última actualización: {fecha}</p>

        <div className="prose prose-sm prose-zinc max-w-none space-y-8 text-zinc-600 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-zinc-800 mb-2">1. Aceptación de los Términos</h2>
            <p>Al acceder y utilizar los servicios de TechMYPE (&ldquo;la Empresa&rdquo;, &ldquo;nosotros&rdquo;, &ldquo;nuestro&rdquo;), usted acepta quedar vinculado por estos Términos y Condiciones. Si no está de acuerdo con alguno de estos términos, no podrá acceder al servicio.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-800 mb-2">2. Descripción del Servicio</h2>
            <p>TechMYPE ofrece software en modalidad SaaS (Software as a Service), incluyendo sistemas de punto de venta (POS), catálogos digitales, tiendas en línea y desarrollo de software a medida para micro y pequeñas empresas (MYPES) en el Perú.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-800 mb-2">3. Uso del Servicio</h2>
            <p>El usuario se compromete a utilizar el servicio de conformidad con la legislación peruana vigente, las presentes condiciones y el orden público. Queda prohibido el uso del servicio para actividades ilícitas, fraudulentas o que puedan causar daño a terceros.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-800 mb-2">4. Facturación y Pagos</h2>
            <p>Los servicios se facturan de manera mensual o anual según el plan contratado. Los precios están expresados en Soles Peruanos (PEN) e incluyen IGV. El incumplimiento de pago puede resultar en la suspensión del servicio.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-800 mb-2">5. Propiedad Intelectual</h2>
            <p>Todo el contenido, código fuente, diseño, logotipos y materiales presentes en la plataforma son propiedad de TechMYPE o de sus licenciantes y están protegidos por las leyes de propiedad intelectual del Perú y tratados internacionales.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-800 mb-2">6. Limitación de Responsabilidad</h2>
            <p>TechMYPE no será responsable por daños indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de uso del servicio. La responsabilidad máxima de la Empresa no excederá el importe pagado por el usuario en los últimos tres (3) meses.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-800 mb-2">7. Modificaciones</h2>
            <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los usuarios serán notificados con al menos 15 días de anticipación vía correo electrónico o a través de la plataforma.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-800 mb-2">8. Ley Aplicable y Jurisdicción</h2>
            <p>Estos términos se rigen por las leyes de la República del Perú. Cualquier disputa será sometida a los tribunales competentes de la ciudad de Lima, Perú.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-800 mb-2">9. Contacto</h2>
            <p>Para cualquier consulta relacionada con estos Términos, escríbenos a: <a href="mailto:tec_johanabad@abadgroup.tech" className="text-emerald-600 hover:underline">tec_johanabad@abadgroup.tech</a></p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
