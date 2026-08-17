import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, Eye, Layers } from 'lucide-react';
import { LazyImage } from '@/components/LazyImage';
import { useNavigate } from 'react-router-dom';

export interface ProjectCardData {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  tech_stack: string[] | null;
  live_url: string | null;
  github_url: string | null;
  featured: boolean;
}

interface ProjectCardProps {
  project: ProjectCardData;
  index?: number;
  animate?: boolean;
  animationDuration?: number;
}

const ProjectCard = ({ project, index = 0, animate = true, animationDuration = 300 }: ProjectCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className={`group overflow-hidden bg-card/50 border-border backdrop-blur-sm hover:border-primary/50 transition-all hover:shadow-orange ${animate ? 'animate-slide-up' : ''}`}
      style={{
        animationDelay: animate ? `${index * 100}ms` : undefined,
        transitionDuration: `${animationDuration}ms`,
      }}
    >
      <div className="relative overflow-hidden">
        {project.image_url ? (
          <LazyImage
            src={project.image_url}
            alt={project.title}
            className="w-full h-40 xs:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-40 xs:h-48 bg-primary flex items-center justify-center">
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

        <p className="font-inter text-sm xs:text-base text-foreground mb-3 xs:mb-4 line-clamp-3">
          {project.description}
        </p>

        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 xs:gap-2 mb-3 xs:mb-4">
            {project.tech_stack.slice(0, 3).map((tech, techIndex) => (
              <Badge key={techIndex} variant="secondary" className="text-xs">
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

        <div className="flex flex-col xs:flex-row items-center gap-2 xs:gap-3">
          <Button size="sm" className="w-full xs:flex-1" onClick={() => navigate(`/project/${project.id}`)}>
            <Layers className="w-4 h-4 mr-2" />
            View Project
          </Button>

          {project.live_url && (
            <Button
              variant="outline"
              size="sm"
              className="w-full xs:w-auto"
              onClick={() => window.open(project.live_url!, '_blank')}
            >
              <Eye className="w-4 h-4 mr-2" />
              Demo
            </Button>
          )}

          {project.github_url && (
            <Button
              variant="outline"
              size="sm"
              className="w-full xs:w-auto"
              onClick={() => window.open(project.github_url!, '_blank')}
            >
              <Github className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
