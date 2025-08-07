import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { LazyImage } from '@/components/LazyImage';
import { useOptimizedProjects } from '@/hooks/useOptimizedQuery';
import { getOptimizedAnimationProps } from '@/utils/performance';
import { useScrollOptimization } from '@/hooks/useScrollOptimization';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  tech_stack: string[] | null;
  live_url: string | null;
  github_url: string | null;
  featured: boolean;
  order_index: number;
  created_at: string;
}

const Projects = () => {
  const { data: projects = [], isLoading: loading } = useOptimizedProjects(6);
  const { shouldAnimate, animationDuration } = getOptimizedAnimationProps();
  const { shouldPause } = useScrollOptimization();

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
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12 xs:mb-16 animate-fade-in">
          <h2 className="font-poppins text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 px-2 xs:px-0">
            Featured Projects
          </h2>
          <p className="font-inter text-base xs:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2 xs:px-0">
            A showcase of my recent work, demonstrating expertise in modern web development,
            user experience design, and scalable solutions.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="font-poppins text-xl text-muted-foreground mb-4">No projects yet</h3>
            <p className="text-muted-foreground">Check back soon for new projects!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
            {projects.map((project, index) => (
              <Card 
                key={project.id} 
                className={`group overflow-hidden bg-card/50 border-border backdrop-blur-sm hover:border-primary/50 transition-all hover:shadow-orange ${shouldAnimate && !shouldPause ? 'animate-slide-up' : ''}`}
                style={{ 
                  animationDelay: shouldAnimate && !shouldPause ? `${index * 100}ms` : undefined,
                  transitionDuration: `${animationDuration}ms`,
                  transform: shouldPause ? 'translateZ(0)' : undefined
                }}
              >
                <div className="relative overflow-hidden">
                  {project.image_url ? (
                     <LazyImage
                       src={project.image_url}
                       alt={project.title}
                       className="w-full h-40 xs:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                       sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                       shouldPause={shouldPause}
                     />
                  ) : (
                    <div className="w-full h-40 xs:h-48 bg-gradient-primary flex items-center justify-center">
                      <div className="text-primary-foreground text-4xl xs:text-6xl font-bold opacity-20">
                        {project.title.charAt(0)}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {project.featured && (
                    <Badge className="absolute top-3 xs:top-4 right-3 xs:right-4 bg-primary text-primary-foreground text-xs">
                      Featured
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4 xs:p-6">
                  <h3 className="font-poppins text-lg xs:text-xl font-semibold text-foreground mb-2 xs:mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="font-inter text-sm xs:text-base text-muted-foreground mb-3 xs:mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {project.tech_stack && project.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 xs:gap-2 mb-3 xs:mb-4">
                      {project.tech_stack.slice(0, 3).map((tech, techIndex) => (
                        <Badge 
                          key={techIndex} 
                          variant="secondary" 
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.tech_stack.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tech_stack.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col xs:flex-row items-center space-y-2 xs:space-y-0 xs:space-x-3">
                    {project.live_url && (
                      <Button
                        size="sm"
                        className="w-full xs:flex-1"
                        onClick={() => window.open(project.live_url!, '_blank')}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    )}
                    
                    {project.github_url && (
                      <Button
                        variant="outline"
                        size="sm"
                        className={project.live_url ? 'w-full xs:w-auto' : 'w-full xs:flex-1'}
                        onClick={() => window.open(project.github_url!, '_blank')}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    )}
                    
                    {!project.live_url && !project.github_url && (
                      <Button variant="outline" size="sm" className="w-full xs:flex-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="group">
            View All Projects
            <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;