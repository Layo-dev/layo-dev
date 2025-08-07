import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface OptimizedQueryOptions {
  staleTime?: number;
  gcTime?: number;
  refetchOnWindowFocus?: boolean;
}

export const useOptimizedQuery = <T,>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options: OptimizedQueryOptions = {}
) => {
  const {
    staleTime = 5 * 60 * 1000, // 5 minutes
    gcTime = 10 * 60 * 1000, // 10 minutes  
    refetchOnWindowFocus = false,
    ...otherOptions
  } = options;

  return useQuery({
    queryKey,
    queryFn,
    staleTime,
    gcTime,
    refetchOnWindowFocus,
    ...otherOptions,
  } as UseQueryOptions<T>);
};

// Optimized projects query with pagination
export const useOptimizedProjects = (limit = 6, offset = 0) => {
  return useOptimizedQuery(
    ['projects', limit.toString(), offset.toString()],
    async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, description, image_url, tech_stack, live_url, github_url, featured, order_index')
        .order('order_index', { ascending: true })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;
      return data || [];
    }
  );
};

// Optimized blog posts query with pagination
export const useOptimizedBlogPosts = (limit = 3, offset = 0) => {
  return useOptimizedQuery(
    ['blog_posts', limit.toString(), offset.toString()],
    async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, excerpt, author, published_at, featured_image_url, tags, created_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;
      return data || [];
    }
  );
};