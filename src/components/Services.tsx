import { Code, Palette, Smartphone, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Services = () => {
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Web Development',
      description: 'Modern, responsive websites built with cutting-edge technologies and best practices.'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive user interfaces that provide exceptional user experiences.'
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Mobile Apps',
      description: 'Cross-platform mobile applications that work seamlessly on any device.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'API Development',
      description: 'Robust backend systems and APIs that power your applications efficiently.'
    }
  ];

  return (
    <section id="services" className="py-16 xs:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12 xs:mb-16 animate-fade-in">
          <h2 className="font-poppins text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 px-2 xs:px-0">
            My Services
          </h2>
          <p className="font-inter text-base xs:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2 xs:px-0">
            I offer a comprehensive range of services to bring your digital vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group bg-card hover:bg-gradient-dark border-border hover:border-primary/50 transition-all duration-500 hover:shadow-orange hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4 xs:p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 xs:w-16 xs:h-16 bg-primary/10 text-primary rounded-xl mb-3 xs:mb-4 group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:scale-110 [&>svg]:w-6 [&>svg]:h-6 xs:[&>svg]:w-8 xs:[&>svg]:h-8">
                  {service.icon}
                </div>
                <h3 className="font-poppins text-lg xs:text-xl font-semibold text-foreground mb-2 xs:mb-3">
                  {service.title}
                </h3>
                <p className="font-inter text-sm xs:text-base text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;