import { Button } from '@/components/ui/button';
import { Download, Mail } from 'lucide-react';
import { LazyImage } from '@/components/LazyImage';
import heroImage from '@/assets/hero-portrait.jpg';
const Hero = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 xs:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 xs:space-y-8 animate-fade-in">
            <div className="space-y-3 xs:space-y-4">
              <h1 className="font-poppins text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight px-2 xs:px-0">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-primary">Onah Benedict</span>
              </h1>
              <h2 className="font-poppins text-lg xs:text-xl sm:text-2xl lg:text-3xl font-medium text-muted-foreground px-2 xs:px-0">
                Full Stack Developer
              </h2>
              <p className="font-inter text-base xs:text-lg text-muted-foreground max-w-lg leading-relaxed px-2 xs:px-0">
                I'm a full-stack developer who crafts seamless digital experiences by combining Lovable's intuitive UI primitives, Supabase's robust backend services, and n8n's powerful workflow automation.
              </p>
            </div>

            <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 px-4 xs:px-0">
              <Button variant="hero" onClick={scrollToContact} className="group w-full xs:w-auto">
                <Mail className="w-5 h-5 group-hover:animate-bounce" />
                Hire Me
              </Button>
              <Button variant="outline-hero" onClick={() => window.open('/resume.pdf', '_blank')} className="w-full xs:w-auto">
                <Download className="w-5 h-5" />
                Download CV
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end animate-fade-in mt-8 lg:mt-0">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              <LazyImage 
                src={heroImage} 
                alt="Onah Benedict - Full Stack Developer" 
                className="relative w-64 h-64 xs:w-80 xs:h-80 lg:w-96 lg:h-96 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 475px) 256px, (max-width: 1024px) 320px, 384px"
                quality={90}
              />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;