import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ExternalLink, Github, Target, Lightbulb, Wrench, Image, Play, X } from 'lucide-react';
import { LazyImage } from '@/components/LazyImage';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ProjectTech {
  id: string;
  tech_name: string;
  tech_purpose: string | null;
  logo_url: string | null;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  tech_stack: string[] | null;
  live_url: string | null;
  github_url: string | null;
  featured: boolean;
  elevator_pitch?: string | null;
  problem_statement?: string | null;
  solution_approach?: string | null;
  gallery_images?: string[] | null;
  video_url?: string | null;
}

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectModal = ({ project, open, onOpenChange }: ProjectModalProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [projectTech, setProjectTech] = useState<ProjectTech[]>([]);

  useEffect(() => {
    if (project?.id && open) {
      const fetchTech = async () => {
        const { data } = await supabase
          .from('project_tech')
          .select('id, tech_name, tech_purpose, logo_url')
          .eq('project_id', project.id);
        setProjectTech(data || []);
      };
      fetchTech();
    }
  }, [project?.id, open]);

  if (!project) return null;

  // Extract video ID for embed
  const getVideoEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be') 
        ? url.split('/').pop() 
        : new URL(url).searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-background border-border overflow-hidden">
          <ScrollArea className="max-h-[90vh]">
            <div className="p-6 md:p-8">
              {/* Header with close button */}
              <DialogHeader className="mb-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {project.featured && (
                      <Badge className="mb-2 bg-primary text-primary-foreground">
                        Featured Project
                      </Badge>
                    )}
                    <DialogTitle className="font-poppins text-2xl md:text-3xl font-bold text-foreground leading-tight">
                      {project.title}
                    </DialogTitle>
                  </div>
                </div>
              </DialogHeader>

              {/* Elevator Pitch */}
              {project.elevator_pitch ? (
                <p className="font-inter text-lg text-muted-foreground mb-8 leading-relaxed border-l-4 border-primary pl-4 italic">
                  {project.elevator_pitch}
                </p>
              ) : (
                <p className="font-inter text-lg text-muted-foreground mb-8 leading-relaxed border-l-4 border-primary pl-4 italic">
                  {project.description}
                </p>
              )}

              {/* Problem Statement */}
              {project.problem_statement && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-primary" />
                    <h3 className="font-poppins text-lg font-semibold text-foreground">
                      The Problem
                    </h3>
                  </div>
                  <p className="font-inter text-muted-foreground leading-relaxed bg-card/50 p-4 rounded-lg border border-border">
                    {project.problem_statement}
                  </p>
                </div>
              )}

              {/* Solution Approach */}
              {project.solution_approach && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    <h3 className="font-poppins text-lg font-semibold text-foreground">
                      My Solution
                    </h3>
                  </div>
                  <p className="font-inter text-muted-foreground leading-relaxed bg-card/50 p-4 rounded-lg border border-border">
                    {project.solution_approach}
                  </p>
                </div>
              )}

              {/* Tech Stack */}
              {projectTech.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Wrench className="w-5 h-5 text-primary" />
                    <h3 className="font-poppins text-lg font-semibold text-foreground">
                      Tech Stack
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {projectTech.map((tech) => (
                      <div
                        key={tech.id}
                        className="flex items-center gap-2 bg-secondary/50 border border-border rounded-lg px-3 py-2"
                      >
                        {tech.logo_url && (
                          <img
                            src={tech.logo_url}
                            alt={tech.tech_name}
                            className="w-5 h-5 object-contain"
                          />
                        )}
                        <span className="text-sm font-medium text-foreground">
                          {tech.tech_name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {project.gallery_images && project.gallery_images.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Image className="w-5 h-5 text-primary" />
                    <h3 className="font-poppins text-lg font-semibold text-foreground">
                      Project Gallery
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {project.gallery_images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className="relative overflow-hidden rounded-lg border border-border hover:border-primary/50 transition-all group aspect-video"
                      >
                        <LazyImage
                          src={image}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Video Demo */}
              {project.video_url && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Play className="w-5 h-5 text-primary" />
                    <h3 className="font-poppins text-lg font-semibold text-foreground">
                      Video Demo
                    </h3>
                  </div>
                  <div className="aspect-video rounded-lg overflow-hidden border border-border">
                    <iframe
                      src={getVideoEmbedUrl(project.video_url)}
                      title={`${project.title} demo video`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                {project.live_url && (
                  <Button
                    size="lg"
                    className="flex-1 w-full py-4 text-base sm:w-auto sm:py-3" 
                    onClick={() => window.open(project.live_url!, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Demo
                  </Button>
                )}
                {project.github_url && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={() => window.open(project.github_url!, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Source Code
                  </Button>
                )}
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Image Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-2 bg-background/95 backdrop-blur-sm border-border">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Project screenshot"
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectModal;
