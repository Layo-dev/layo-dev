import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CardNav from '@/components/CardNav';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ProjectCard, { ProjectCardData } from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useOptimizedProjects } from '@/hooks/useOptimizedQuery';
import { getOptimizedAnimationProps } from '@/utils/performance';
import { navItems } from '@/config/navItems';
import logoSvg from '@/assets/CWB-logo.svg';

const ProjectsPage = () => {
  const { data: projects = [], isLoading } = useOptimizedProjects(50);
  const { shouldAnimate, animationDuration } = getOptimizedAnimationProps();

  useEffect(() => {
    document.title = 'Projects & Portfolio | Layo.Dev';
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

      <main className="pt-28 xs:pt-32 pb-16">
        <section className="px-4 sm:px-6 lg:px-8 py-8 xs:py-12">
          <div className="container mx-auto">
            <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>

            <h1 className="font-poppins text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Projects
            </h1>
            <p className="font-inter text-base xs:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Every project I've shipped — web apps, dashboards and product sites built with modern,
              maintainable technology.
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="h-48 bg-muted animate-pulse" />
                    <CardContent className="p-6 space-y-4">
                      <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
                      <div className="h-4 bg-muted animate-pulse rounded" />
                      <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="font-poppins text-xl text-foreground mb-4">No projects yet</h2>
                <p className="text-muted-foreground">Check back soon for new projects!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project as ProjectCardData}
                    index={index}
                    animate={shouldAnimate}
                    animationDuration={animationDuration}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProjectsPage;
