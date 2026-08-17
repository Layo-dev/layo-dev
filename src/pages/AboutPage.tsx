import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Palette, Globe, Sparkles, Mail, Phone, MapPin } from 'lucide-react';
import CardNav from '@/components/CardNav';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { navItems } from '@/config/navItems';
import logoSvg from '@/assets/CWB-logo.svg';

const whatIDo = [
  {
    icon: <Code className="w-6 h-6" />,
    title: 'Web Development',
    description: 'Modern, responsive websites and web apps built with React, TypeScript and Tailwind.',
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'UI/UX Design',
    description: 'Clean, accessible interfaces designed around real user journeys, not decoration.',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'APIs & Backend',
    description: 'Supabase and Node.js backends, secure data models, auth and integrations that scale.',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'AI-Assisted Builds',
    description: 'Shipping faster with AI tooling and automation, without cutting corners on quality.',
  },
];

const process = [
  { step: '01', title: 'Discover', text: 'We talk through the goal, the users and the constraints before a single line of code.' },
  { step: '02', title: 'Design', text: 'Wireframes and a clear visual direction so you can see the product before it is built.' },
  { step: '03', title: 'Build', text: 'Iterative development with working previews at every stage — no black boxes.' },
  { step: '04', title: 'Launch & Support', text: 'Deploy, measure, refine. I stay available after handover to keep things healthy.' },
];

const personalInfo = [
  { label: 'Name', value: 'Onah Benedict' },
  { label: 'Role', value: 'Full Stack Developer' },
  { label: 'Location', value: 'Nigeria (remote worldwide)' },
  { label: 'Experience', value: '2+ years' },
  { label: 'Email', value: 'benedictchinaza765@gmail.com' },
  { label: 'Phone', value: '+234 702 615 0575' },
];

const AboutPage = () => {
  useEffect(() => {
    document.title = 'About Onah Benedict — Full Stack Developer | Layo.Dev';
  }, []);

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

      <main className="pt-28 xs:pt-32">
        {/* Hero */}
        <section className="px-4 sm:px-6 lg:px-8 py-10 xs:py-16">
          <div className="container mx-auto max-w-4xl">
            <h1 className="font-poppins text-4xl xs:text-6xl sm:text-7xl lg:text-8xl font-bold text-foreground tracking-tight animate-fade-in">
              I'm Benedict.
            </h1>
            <p className="font-poppins text-2xl xs:text-3xl sm:text-4xl font-bold text-foreground mt-6 xs:mt-8 leading-tight max-w-3xl">
              A Fullstack Developer building fast, clean web products remotely from Nigeria.
            </p>
            <p className="font-inter text-base xs:text-lg text-muted-foreground mt-5 xs:mt-6 max-w-2xl leading-relaxed">
              Over the past few years I've worked across every part of web creation — from crafting
              interfaces to wiring up databases and automations. I care about products that feel
              effortless to use and are simple to maintain.
            </p>
          </div>
        </section>

        {/* Personal Information */}
        <section className="px-4 sm:px-6 lg:px-8 py-10 xs:py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-poppins text-2xl xs:text-3xl font-bold text-foreground mb-6 xs:mb-8">
              Personal Information
            </h2>
            <dl className="grid grid-cols-1 xs:grid-cols-2 gap-x-10 gap-y-5">
              {personalInfo.map((item) => (
                <div key={item.label} className="border-b border-border pb-3">
                  <dt className="font-inter text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    {item.label}
                  </dt>
                  <dd className="font-poppins text-base xs:text-lg font-medium text-foreground break-words">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-4 xs:gap-6 mt-6 font-inter text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4" /> Nigeria</span>
              <span className="inline-flex items-center gap-2"><Mail className="w-4 h-4" /> Available for work</span>
              <span className="inline-flex items-center gap-2"><Phone className="w-4 h-4" /> Replies within 24h</span>
            </div>
          </div>
        </section>

        {/* Professional Positioning */}
        <section className="px-4 sm:px-6 lg:px-8 py-10 xs:py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-poppins text-2xl xs:text-3xl font-bold text-foreground mb-5 xs:mb-6">
              Professional Positioning
            </h2>
            <p className="font-poppins text-xl xs:text-2xl sm:text-3xl font-bold text-foreground leading-snug">
              I'm not just a developer you hand a spec to — I'm the partner who questions the spec,
              designs the flow, ships the product and stays for the follow-up.
            </p>
            <p className="font-inter text-base xs:text-lg text-muted-foreground mt-5 leading-relaxed max-w-2xl">
              Founders, small teams and agencies work with me when they need one person who can take an
              idea from a blank page to a live, maintainable product.
            </p>
          </div>
        </section>

        {/* What I Do */}
        <section className="px-4 sm:px-6 lg:px-8 py-10 xs:py-16">
          <div className="container mx-auto max-w-5xl">
            <h2 className="font-poppins text-2xl xs:text-3xl font-bold text-foreground mb-8 xs:mb-10">
              What I Do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 xs:gap-6">
              {whatIDo.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-surface-dark text-surface-light p-6 sm:p-8 animate-fade-in"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-poppins text-lg xs:text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="font-inter text-sm xs:text-base opacity-80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="px-4 sm:px-6 lg:px-8 py-10 xs:py-16">
          <div className="container mx-auto max-w-5xl">
            <h2 className="font-poppins text-2xl xs:text-3xl font-bold text-foreground mb-8 xs:mb-10">
              Process
            </h2>
            <div className="rounded-3xl bg-secondary/40 border border-border p-6 xs:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xs:gap-10">
                {process.map((item) => (
                  <div key={item.step}>
                    <div className="font-poppins text-4xl xs:text-5xl font-bold text-muted-foreground/50 mb-3">
                      {item.step}
                    </div>
                    <h3 className="font-poppins text-xl xs:text-2xl font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="font-inter text-sm xs:text-base text-muted-foreground leading-relaxed max-w-md">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Background / Story */}
        <section className="px-4 sm:px-6 lg:px-8 py-10 xs:py-16">
          <div className="container mx-auto max-w-3xl">
            <h2 className="font-poppins text-2xl xs:text-3xl font-bold text-foreground mb-5 xs:mb-6">
              Short Background
            </h2>
            <div className="space-y-4 font-inter text-base xs:text-lg text-foreground leading-relaxed">
              <p>
                My journey started with a simple curiosity about how the websites I used every day were
                actually put together. That curiosity turned into late nights learning HTML and CSS, then
                JavaScript, then everything that sits behind the interface.
              </p>
              <p>
                Since then I've built dashboards, marketing sites, portfolios and internal tools — mostly
                with React, TypeScript, Supabase and modern automation tooling. Each project taught me
                something the last one didn't.
              </p>
              <p>
                Today I focus on personal projects and client work where design and engineering meet, and
                I share what I learn with other developers along the way.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 xs:py-20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-poppins text-3xl xs:text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Let's build something worth using.
            </h2>
            <p className="font-inter text-base xs:text-lg text-muted-foreground mt-5 max-w-xl leading-relaxed">
              If you have a product in mind — or just a rough idea that needs shaping — I'd love to hear
              about it.
            </p>
            <div className="flex flex-wrap gap-3 xs:gap-4 mt-8">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/#contact">Get In Touch</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link to="/projects">View Projects</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AboutPage;
