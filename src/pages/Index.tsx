import CardNav from '@/components/CardNav';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Blog from '@/components/Blog';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useWebVitals } from '@/hooks/useWebVitals';

const navItems = [
  {
    label: 'About',
    bgColor: '#1B1722',
    textColor: '#FFFFFF',
    links: [
      { label: 'Company', href: '#about', ariaLabel: 'About Company' },
      { label: 'Careers', href: '#services', ariaLabel: 'Careers' },
    ],
  },
  {
    label: 'Projects',
    bgColor: '#2F293A',
    textColor: '#FFFFFF',
    links: [
      { label: 'Featured', href: '#projects', ariaLabel: 'Featured Projects' },
      { label: 'Case Studies', href: '#projects', ariaLabel: 'Project Case Studies' },
    ],
  },
  {
    label: 'Contact',
    bgColor: '#2F293A',
    textColor: '#FFFFFF',
    links: [
      { label: 'Email', href: '#contact', ariaLabel: 'Email us' },
      { label: 'Twitter', href: '#contact', ariaLabel: 'Twitter' },
      { label: 'LinkedIn', href: '#contact', ariaLabel: 'LinkedIn' },
    ],
  },
];

const Index = () => {
  useWebVitals();

  return (
    <div className="min-h-screen bg-background font-inter">
      <CardNav
        items={navItems}
        logoText="Layo.Dev"
        baseColor="#FAFAF7"
        menuColor="#111111"
        buttonBgColor="#111111"
        buttonTextColor="#FAFAF7"
        ease="power3.out"
      />


      <main>
        <Hero />
        <Services />
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
