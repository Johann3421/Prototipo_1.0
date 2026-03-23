import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProblemsSection from '@/components/sections/ProblemsSection';
import ServicesGrid from '@/components/sections/ServicesGrid';
import DemoHub from '@/components/sections/DemoHub';
import SocialProof from '@/components/sections/SocialProof';
import ProcessSection from '@/components/sections/ProcessSection';
import PricingCards from '@/components/sections/PricingCards';
import ContactForm from '@/components/sections/ContactForm';
import WhatsAppFloatingBtn from '@/components/ui/WhatsAppFloatingBtn';
import DemoModal from '@/components/ui/DemoModal';
import Script from 'next/script';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'TechMYPE',
  description: 'Software de ventas, gestión y digitalización para MYPES en Perú',
  url: 'https://techmype.pe',
  telephone: '+51-970-435-903',
  areaServed: {
    '@type': 'Country',
    name: 'Perú',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Huánuco',
    addressRegion: 'Huánuco',
    addressCountry: 'PE',
  },
  priceRange: 'S/ 99 - S/ 249 /mes',
  currenciesAccepted: 'PEN',
  paymentAccepted: 'Yape, Plin, Transferencia bancaria',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+51-970-435-903',
    contactType: 'customer support',
    availableLanguage: 'Spanish',
    areaServed: 'PE',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Planes TechMYPE',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Plan Emprendedor',
        price: '99',
        priceCurrency: 'PEN',
        description: 'Sistema POS básico para negocios que recién empiezan.',
      },
      {
        '@type': 'Offer',
        name: 'Plan Negocio',
        price: '249',
        priceCurrency: 'PEN',
        description: 'POS completo + E-commerce + Facturación electrónica SUNAT.',
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <ProblemsSection />
        <div className="border-t border-[var(--border-default)]" />
        <ServicesGrid />
        <DemoHub />
        <SocialProof />
        <div className="border-t border-[var(--border-default)]" />
        <AboutSection />
        <ProcessSection />
        <PricingCards />
        <div className="border-t border-[var(--border-default)]" />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFloatingBtn />
      <DemoModal />
    </>
  );
}
