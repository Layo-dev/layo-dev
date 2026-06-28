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
    bgColor: '#111111',
    textColor: '#FAFAF7',
    links: [
      { label: 'Story', href: '#about', ariaLabel: 'About my story' },
      { label: 'Services', href: '#services', ariaLabel: 'Services offered' },
    ],
  },
  {
    label: 'Work',
    bgColor: '#1F1F1F',
    textColor: '#FAFAF7',
    links: [
      { label: 'Featured Projects', href: '#projects', ariaLabel: 'Featured projects' },
      { label: 'Testimonials', href: '#testimonials', ariaLabel: 'Client testimonials' },
      { label: 'Blog', href: '#blog', ariaLabel: 'Blog posts' },
    ],
  },
  {
    label: 'Contact',
    bgColor: '#111111',
    textColor: '#FAFAF7',
    links: [
      { label: 'Email', href: '#contact', ariaLabel: 'Send an email' },
      { label: 'WhatsApp', href: '#contact', ariaLabel: 'WhatsApp' },
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
        ease="power3.out"
        theme="light"
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
