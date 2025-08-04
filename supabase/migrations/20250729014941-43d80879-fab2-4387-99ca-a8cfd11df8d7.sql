-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author TEXT NOT NULL DEFAULT 'Alex Rivera',
  published_at TIMESTAMP WITH TIME ZONE,
  featured_image_url TEXT,
  tags TEXT[],
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_company TEXT,
  client_role TEXT,
  testimonial_text TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  tech_stack TEXT[],
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to published blog posts" 
ON public.blog_posts 
FOR SELECT 
USING (status = 'published');

CREATE POLICY "Allow public read access to testimonials" 
ON public.testimonials 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access to projects" 
ON public.projects 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- Create storage policies for blog images
CREATE POLICY "Blog images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'blog-images');

-- Insert sample data
INSERT INTO public.testimonials (client_name, client_company, client_role, testimonial_text, rating, featured) VALUES
('Sarah Johnson', 'TechCorp', 'CEO', 'Alex delivered an exceptional web application that exceeded our expectations. His attention to detail and technical expertise are outstanding.', 5, true),
('Michael Chen', 'StartupXYZ', 'CTO', 'Working with Alex was a pleasure. He understood our requirements perfectly and delivered a scalable solution on time.', 5, true),
('Emily Rodriguez', 'Digital Agency', 'Project Manager', 'Alex''s full-stack development skills helped us launch our product successfully. Highly recommended!', 5, false);

INSERT INTO public.projects (title, description, image_url, tech_stack, live_url, github_url, featured, order_index) VALUES
('E-Commerce Platform', 'A modern e-commerce platform built with React and Node.js, featuring real-time inventory management and secure payment processing.', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3', ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'], 'https://example.com', 'https://github.com/alexrivera/ecommerce', true, 1),
('Task Management App', 'A collaborative task management application with real-time updates, file sharing, and team collaboration features.', 'https://images.unsplash.com/photo-1611224923853-80b023f02d71', ARRAY['Vue.js', 'Express', 'MongoDB', 'Socket.io'], 'https://example.com', 'https://github.com/alexrivera/taskapp', true, 2),
('Analytics Dashboard', 'A comprehensive analytics dashboard for business intelligence with interactive charts and real-time data visualization.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', ARRAY['React', 'D3.js', 'Python', 'FastAPI'], 'https://example.com', 'https://github.com/alexrivera/analytics', false, 3);

INSERT INTO public.blog_posts (title, content, excerpt, featured_image_url, tags, status, published_at) VALUES
('Building Scalable Web Applications with React and Supabase', 
'In this comprehensive guide, we''ll explore how to build modern, scalable web applications using React and Supabase. We''ll cover everything from setting up your development environment to deploying your application to production.

## Why React and Supabase?

React has become the de facto standard for building user interfaces, while Supabase provides a powerful backend-as-a-service platform that eliminates the need for complex server management.

## Getting Started

First, let''s set up our development environment...', 
'Learn how to build modern web applications using React and Supabase, covering everything from setup to deployment.',
'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
ARRAY['React', 'Supabase', 'Web Development', 'Tutorial'],
'published',
now() - INTERVAL '2 days'),

('The Future of Full-Stack Development',
'Full-stack development is evolving rapidly, with new technologies and approaches emerging constantly. In this article, we''ll explore the trends that are shaping the future of web development.

## Current Trends

- Serverless architecture
- JAMstack approach
- Real-time applications
- Progressive Web Apps

## What to Expect

The future of full-stack development will be characterized by...',
'Exploring the trends and technologies that are shaping the future of full-stack web development.',
'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
ARRAY['Full-Stack', 'Technology', 'Future', 'Trends'],
'published',
now() - INTERVAL '5 days');

-- Enable realtime for all tables
ALTER TABLE public.blog_posts REPLICA IDENTITY FULL;
ALTER TABLE public.testimonials REPLICA IDENTITY FULL;
ALTER TABLE public.projects REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.testimonials;
ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;