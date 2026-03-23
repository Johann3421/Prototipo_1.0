import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  robots: { index: false, follow: false },
};

export default function PrivacidadPage() {
  const fecha = '1 de enero de 2026';
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 md:px-8 py-20">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Política de Privacidad</h1>
        <p className="text-sm text-zinc-400 mb-10">Última actualización: {fecha}</p>

        <div className="prose prose-sm prose-zinc max-w-none space-y-8 text-zinc-600 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-zinc-800 mb-2">1. Información que Recopilamos</h2>
            <p>Recopilamos información que usted nos proporciona directamente, como nombre, nombre del negocio, número de teléfono (WhatsApp) y correo electrónico al completar nuestros formularios de contacto. También recopilamos automáticamente información técnica como dirección IP y datos de navegación.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-800 mb-2">2. Uso de la Información</h2>
            <p>Utilizamos su información para: (a) contactarle sobre nuestros servicios; (b) mejorar nuestra plataforma y experiencia de usuario; (c) enviarle comunicaciones comerciales relevantes, previo consentimiento; (d) cumplir con obligaciones legales.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-800 mb-2">3. Compartición de Datos</h2>
            <p>No vendemos, arrendamos ni compartimos su información personal con terceros con fines comerciales. Podemos compartir datos con proveedores de servicios que nos asisten operacionalmente, bajo contratos de confidencialidad estrictos.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-800 mb-2">4. Cookies y Analítica</h2>
            <p>Utilizamos cookies técnicas esenciales para el funcionamiento del sitio. Podemos usar herramientas de analítica agregada y anónima para entender el comportamiento de los usuarios. No utilizamos cookies de seguimiento de terceros sin su consentimiento explícito.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-800 mb-2">5. Seguridad</h2>
            <p>Implementamos medidas técnicas y organizativas apropiadas para proteger su información contra acceso no autorizado, alteración, divulgación o destrucción. Los datos se almacenan en servidores con cifrado en tránsito (TLS) y en reposo.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-800 mb-2">6. Sus Derechos (LPDP Perú)</h2>
            <p>De conformidad con la Ley N° 29733 – Ley de Protección de Datos Personales del Perú, usted tiene derecho a: acceder a sus datos, rectificarlos, cancelarlos y oponerse a su tratamiento. Para ejercer estos derechos, contáctenos a través de nuestros canales oficiales.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-800 mb-2">7. Retención de Datos</h2>
            <p>Conservamos sus datos personales durante el tiempo necesario para cumplir los fines descritos en esta política o según lo requiera la ley. Puede solicitarnos la eliminación de sus datos en cualquier momento.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-zinc-800 mb-2">8. Contacto</h2>
            <p>Si tiene preguntas sobre esta Política de Privacidad o sobre el tratamiento de sus datos personales, contáctenos en: <a href="mailto:tec_johanabad@abadgroup.tech" className="text-emerald-600 hover:underline">tec_johanabad@abadgroup.tech</a></p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
