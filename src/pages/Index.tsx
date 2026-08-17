import CardNav from '@/components/CardNav';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Skills from '@/components/Skills';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Blog from '@/components/Blog';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useWebVitals } from '@/hooks/useWebVitals';
import logoSvg from '@/assets/CWB-logo.svg';
import { navItems } from '@/config/navItems';

const Index = () => {
  useWebVitals();

  return (
    <div className="min-h-screen bg-background font-inter">
      <CardNav
        items={navItems}
        logo={logoSvg}
        logoAlt="Layo.Dev logo"
        baseColor="#F2F3ED"
        menuColor="#000000"
        buttonBgColor="#000000"
        buttonTextColor="#FFFFFF"
        ease="power3.out"
      />


      <main>
        <Hero />
        <Services />
        <Skills />
        <About />
        <Projects />
        <Blog />
        <TestimonialCarousel />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
