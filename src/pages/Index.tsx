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
    bgColor: '#000000',
    textColor: '#FFFFFF',
    links: [
      { label: 'Me', href: '#about', ariaLabel: 'About Me' },
      { label: 'Careers', href: '#services', ariaLabel: 'Careers' },
    ],
  },
  {
    label: 'Projects',
    bgColor: '#000000',
    textColor: '#FFFFFF',
    links: [
      { label: 'Portfolio', href: '#projects', ariaLabel: 'Featured Projects' },
      { label: 'Case Studies', href: '#projects', ariaLabel: 'Project Case Studies' },
    ],
  },
  {
    label: 'Contact',
    bgColor: '#000000',
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
        baseColor="#F2F3ED"
        menuColor="#000000"
        buttonBgColor="#000000"
        buttonTextColor="#FFFFFF"
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
