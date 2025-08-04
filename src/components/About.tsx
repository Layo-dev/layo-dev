import { Badge } from '@/components/ui/badge';

const About = () => {
  const skills = [
    'React', 'TypeScript', 'Node.js', 'Next.js', 'Python', 'PostgreSQL',
    'MongoDB', 'AWS', 'Docker', 'GraphQL', 'Tailwind CSS', 'Figma'
  ];

  return (
    <section id="about" className="py-16 xs:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-dark">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 xs:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 xs:space-y-8 animate-fade-in">
            <div>
              <h2 className="font-poppins text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 xs:mb-6 text-center lg:text-left px-2 xs:px-0">
                About Me
              </h2>
              <div className="space-y-3 xs:space-y-4 font-inter text-base xs:text-lg text-muted-foreground leading-relaxed px-2 xs:px-0">
                <p>
                  I'm a passionate full-stack developer with 5+ years of experience creating 
                  digital solutions that make a difference. I specialize in modern web technologies 
                  and have a keen eye for design.
                </p>
                <p>
                  My journey started with a curiosity about how things work, and it has evolved 
                  into a career focused on building scalable, user-friendly applications that 
                  solve real-world problems.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing 
                  to open-source projects, or sharing knowledge with the developer community.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-poppins text-xl xs:text-2xl font-semibold text-foreground mb-3 xs:mb-4 text-center lg:text-left">
                Technical Skills
              </h3>
              <div className="flex flex-wrap gap-2 xs:gap-3 justify-center lg:justify-start">
                {skills.map((skill, index) => (
                  <Badge 
                    key={index}
                    variant="secondary"
                    className="bg-secondary/50 text-foreground hover:bg-gradient-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 px-3 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm font-medium animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 xs:gap-8 animate-slide-up">
            <div className="text-center p-4 xs:p-6 bg-card/50 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-orange group">
              <div className="font-poppins text-2xl xs:text-4xl font-bold text-primary mb-1 xs:mb-2 group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <div className="font-inter text-xs xs:text-base text-muted-foreground">
                Projects Completed
              </div>
            </div>

            <div className="text-center p-4 xs:p-6 bg-card/50 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-orange group">
              <div className="font-poppins text-2xl xs:text-4xl font-bold text-primary mb-1 xs:mb-2 group-hover:scale-110 transition-transform duration-300">
                30+
              </div>
              <div className="font-inter text-xs xs:text-base text-muted-foreground">
                Happy Clients
              </div>
            </div>

            <div className="text-center p-4 xs:p-6 bg-card/50 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-orange group">
              <div className="font-poppins text-2xl xs:text-4xl font-bold text-primary mb-1 xs:mb-2 group-hover:scale-110 transition-transform duration-300">
                5+
              </div>
              <div className="font-inter text-xs xs:text-base text-muted-foreground">
                Years Experience
              </div>
            </div>

            <div className="text-center p-4 xs:p-6 bg-card/50 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-orange group">
              <div className="font-poppins text-2xl xs:text-4xl font-bold text-primary mb-1 xs:mb-2 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="font-inter text-xs xs:text-base text-muted-foreground">
                Support Available
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;