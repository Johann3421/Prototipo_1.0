import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ServicesGrid from '@/components/sections/ServicesGrid';
import SocialProof from '@/components/sections/SocialProof';
import ProcessSection from '@/components/sections/ProcessSection';
import PricingCards from '@/components/sections/PricingCards';
import ContactForm from '@/components/sections/ContactForm';
import WhatsAppFloatingBtn from '@/components/ui/WhatsAppFloatingBtn';
import Script from 'next/script';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TechMYPE',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Android, iOS',
  description: 'Software de ventas y gestión para MYPES en Perú',
  url: 'https://techmype.pe',
  offers: [
    {
      '@type': 'Offer',
      name: 'Plan Emprendedor',
      price: '99',
      priceCurrency: 'PEN',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        billingDuration: 'P1M',
      },
    },
    {
      '@type': 'Offer',
      name: 'Plan Negocio',
      price: '249',
      priceCurrency: 'PEN',
    },
  ],
  provider: {
    '@type': 'Organization',
    name: 'TechMYPE',
    url: 'https://techmype.pe',
    logo: 'https://techmype.pe/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+51-999-999-999',
      contactType: 'customer support',
      availableLanguage: 'Spanish',
      areaServed: 'PE',
    },
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
        <div className="border-t border-[var(--border-default)]" />
        <ServicesGrid />
        <SocialProof />
        <div className="border-t border-[var(--border-default)]" />
        <ProcessSection />
        <PricingCards />
        <div className="border-t border-[var(--border-default)]" />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFloatingBtn />
    </>
  );
}
