import { Button } from '@/components/ui/button';
import { Download, Mail } from 'lucide-react';
import { LazyImage } from '@/components/LazyImage';
import SplitText from '@/components/SplitText';
import Squares from './squares';
import heroImage from '@/assets/3d-nft-icon-developer-male-illustration.png';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <Squares 
        speed={0.5} 
        squareSize={40}
        direction='diagonal'
        borderColor='#fff'
        hoverFillColor='#222'
      />
      <div className="container mx-auto relative z-20">
        <div className="grid lg:grid-cols-2 gap-8 xs:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 xs:space-y-8 animate-fade-in">
            <div className="space-y-3 xs:space-y-4">
              <h1 className="font-poppins text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight px-2 xs:px-0">
                <SplitText 
                  text="Hi, I'm " 
                  className="inline"
                  delay={0}
                  stagger={0.02}
                />
                <SplitText 
                  text="Onah Benedict" 
                  className="inline text-transparent bg-clip-text bg-gradient-primary"
                  delay={0.3}
                  stagger={0.02}
                />
              </h1>
              <h2 className="font-poppins text-lg xs:text-xl sm:text-2xl lg:text-3xl font-medium text-muted-foreground px-2 xs:px-0">
                <SplitText 
                  text="Full Stack Developer" 
                  delay={0.8}
                  stagger={0.015}
                />
              </h2>
              <p className="font-inter text-base xs:text-lg text-muted-foreground max-w-lg leading-relaxed px-2 xs:px-0">
                <SplitText 
                  text="I'm a full-stack developer who crafts seamless digital experiences by combining Lovable's and cusor intuitive UI primitives, Supabase's robust backend services." 
                  delay={1.2}
                  stagger={0.008}
                />
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
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;