import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import ProjectCard, { ProjectCardData } from '@/components/ProjectCard';
import { useOptimizedProjects } from '@/hooks/useOptimizedQuery';
import { getOptimizedAnimationProps } from '@/utils/performance';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const { data: projects = [], isLoading: loading } = useOptimizedProjects(6);
  const { shouldAnimate, animationDuration } = getOptimizedAnimationProps();
  const navigate = useNavigate();


  if (loading) {
    return (
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="h-8 bg-muted animate-pulse rounded w-64 mx-auto mb-4" />
            <div className="h-4 bg-muted animate-pulse rounded w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-muted animate-pulse" />
                <CardContent className="p-6 space-y-4">
                  <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-muted animate-pulse rounded w-16" />
                    <div className="h-6 bg-muted animate-pulse rounded w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12 xs:mb-16 animate-fade-in">
            <h2 className="font-poppins text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 px-2 xs:px-0">
              Projects
            </h2>
            <p className="font-inter text-base xs:text-lg text-foreground max-w-2xl mx-auto leading-relaxed px-2 xs:px-0">
              A showcase of my recent work, demonstrating expertise in modern web development,
              user experience design, and scalable solutions.
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="font-poppins text-xl text-foreground mb-4">No projects yet</h3>
              <p className="text-foreground">Check back soon for new projects!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
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

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="group" onClick={() => navigate('/projects')}>
              View All Projects
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </section>

    </>
  );
};

export default Projects;
