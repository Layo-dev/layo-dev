-- Add new columns to projects table for case study details
ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS elevator_pitch text,
ADD COLUMN IF NOT EXISTS problem_statement text,
ADD COLUMN IF NOT EXISTS solution_approach text,
ADD COLUMN IF NOT EXISTS gallery_images text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS video_url text;