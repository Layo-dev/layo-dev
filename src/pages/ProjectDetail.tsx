import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, Layers, Zap, Code2, Image as ImageIcon, Play, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useOptimizedQuery } from '@/hooks/useOptimizedQuery';
import { LazyImage } from '@/components/LazyImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import CardNav from '@/components/CardNav';
import Footer from '@/components/Footer';

const navItems = [
  { label: 'About', bgColor: '#000000', textColor: '#FFFFFF', links: [
    { label: 'Company', href: '/#about', ariaLabel: 'About Company' },
    { label: 'Careers', href: '/#services', ariaLabel: 'Careers' },
  ]},
  { label: 'Projects', bgColor: '#000000', textColor: '#FFFFFF', links: [
    { label: 'Featured', href: '/#projects', ariaLabel: 'Featured Projects' },
    { label: 'Case Studies', href: '/#projects', ariaLabel: 'Project Case Studies' },
  ]},
  { label: 'Contact', bgColor: '#000000', textColor: '#FFFFFF', links: [
    { label: 'Email', href: '/#contact', ariaLabel: 'Email us' },
    { label: 'LinkedIn', href: '/#contact', ariaLabel: 'LinkedIn' },
  ]},
];

interface ProjectTech {
  id: string;
  tech_name: string;
  tech_purpose: string | null;
  logo_url: string | null;
}

const SectionHeading = ({ icon: Icon, children }: { icon: any; children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
      <Icon className="w-5 h-5 text-foreground" strokeWidth={1.75} />
    </span>
    <h2 className="font-poppins text-2xl md:text-3xl font-bold text-foreground tracking-tight">
      {children}
    </h2>
  </div>
);

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: project, isLoading, error } = useOptimizedQuery(
    ['project', id ?? ''],
    async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id!)
        .maybeSingle();
      if (error) throw error;
      return data;
    }
  );

  const { data: projectTech = [] } = useOptimizedQuery<ProjectTech[]>(
    ['project_tech', id ?? ''],
    async () => {
      const { data, error } = await supabase
        .from('project_tech')
        .select('id, tech_name, tech_purpose, logo_url')
        .eq('project_id', id!);
      if (error) throw error;
      return data || [];
    }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (project?.title) {
      document.title = `${project.title} — Layo.Dev`;
      const desc = project.elevator_pitch || project.description || '';
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', desc.slice(0, 155));
    }
  }, [project]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="font-poppins text-3xl font-bold">Project not found</h1>
        <Button onClick={() => navigate('/#projects')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
        </Button>
      </div>
    );
  }

  const role = project.role || 'Full Stack Developer';
  const timeline = project.timeline;
  const techStack = project.tech_stack || [];
  const features: string[] = project.features || [];
  const gallery: string[] = project.gallery_images || [];

  return (
    <div className="min-h-screen bg-background font-inter">
      <CardNav
        items={navItems}
        logoText="Layo.Dev"
        baseColor="#F2F3ED"
        menuColor="#000000"
        buttonBgColor="#000000"
        buttonTextColor="#FFFFFF"
        ease="power3.out"
      />

      <main className="pt-32 pb-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 mb-10 group text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted group-hover:bg-foreground group-hover:text-background transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </span>
            <span className="font-medium">Back to Projects</span>
          </Link>

          {/* Hero header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            <div className="flex-1">
              <h1 className="font-poppins text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.05] mb-6">
                {project.title}
              </h1>
              <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                {project.elevator_pitch || project.description}
              </p>
            </div>
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start lg:self-end bg-foreground text-background rounded-full px-6 py-4 font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Visit Live Site
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Hero image */}
          {project.image_url && (
            <div className="rounded-2xl overflow-hidden border border-border mb-16 aspect-[16/9] bg-muted">
              <LazyImage
                src={project.image_url}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Two-column body */}
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 lg:gap-20">
            {/* Sidebar meta */}
            <aside className="lg:sticky lg:top-32 lg:self-start space-y-8 pb-8 lg:pb-0 border-b lg:border-b-0 border-border">
              <div>
                <p className="text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase mb-2">Role</p>
                <p className="font-poppins font-semibold text-foreground">{role}</p>
              </div>
              {timeline && (
                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase mb-2">Timeline</p>
                  <p className="font-poppins font-semibold text-foreground">{timeline}</p>
                </div>
              )}
              {techStack.length > 0 && (
                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="rounded-full px-3 py-1 font-medium">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {projectTech.length > 0 && (
                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase mb-3">Built With</p>
                  <div className="space-y-2">
                    {projectTech.map((tech) => (
                      <div key={tech.id} className="flex items-center gap-2 text-sm text-foreground">
                        {tech.logo_url && (
                          <img src={tech.logo_url} alt={tech.tech_name} className="w-4 h-4 object-contain" />
                        )}
                        <span>{tech.tech_name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>

            {/* Right content */}
            <div className="space-y-16 min-w-0">
              {/* Overview */}
              <section>
                <SectionHeading icon={Layers}>Overview</SectionHeading>
                <p className="font-inter text-base md:text-lg text-muted-foreground leading-[1.9] whitespace-pre-line">
                  {project.description}
                </p>
              </section>

              {/* Challenges & Solutions */}
              {(project.problem_statement || project.solution_approach) && (
                <section>
                  <SectionHeading icon={Zap}>Challenges &amp; Solutions</SectionHeading>
                  <div className="space-y-6">
                    {project.problem_statement && (
                      <div>
                        <h3 className="font-poppins font-semibold text-foreground mb-2">The Challenge</h3>
                        <p className="font-inter text-base md:text-lg text-muted-foreground leading-[1.9]">
                          {project.problem_statement}
                        </p>
                      </div>
                    )}
                    {project.solution_approach && (
                      <div>
                        <h3 className="font-poppins font-semibold text-foreground mb-2">The Solution</h3>
                        <p className="font-inter text-base md:text-lg text-muted-foreground leading-[1.9]">
                          {project.solution_approach}
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Key Features */}
              {features.length > 0 && (
                <section>
                  <SectionHeading icon={Code2}>Key Features</SectionHeading>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-muted rounded-full px-5 py-4"
                      >
                        <span className="w-2 h-2 rounded-full bg-foreground flex-shrink-0" />
                        <span className="font-inter text-sm md:text-base text-foreground font-medium">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Project Gallery */}
              {gallery.length > 0 && (
                <section>
                  <SectionHeading icon={ImageIcon}>Project Gallery</SectionHeading>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {gallery.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(img)}
                        className="group relative overflow-hidden rounded-xl border border-border aspect-video bg-muted"
                      >
                        <LazyImage
                          src={img}
                          alt={`${project.title} screenshot ${i + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {/* Video Demo */}
              {project.video_url && (
                <section>
                  <SectionHeading icon={Play}>Video Demo</SectionHeading>
                  <div className="aspect-video rounded-xl overflow-hidden border border-border bg-muted">
                    <iframe
                      src={getVideoEmbedUrl(project.video_url)}
                      title={`${project.title} demo`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </section>
              )}

              {/* Footer CTAs */}
              <section className="pt-8 border-t border-border flex flex-col sm:flex-row gap-3">
                {project.live_url && (
                  <Button
                    size="lg"
                    className="rounded-full sm:flex-1"
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
                    className="rounded-full sm:flex-1"
                    onClick={() => window.open(project.github_url!, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Source Code
                  </Button>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-2 bg-background/95 backdrop-blur-sm border-border">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
            aria-label="Close image"
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
    </div>
  );
};

export default ProjectDetail;
