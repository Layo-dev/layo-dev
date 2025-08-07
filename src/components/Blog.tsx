import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { LazyImage } from '@/components/LazyImage';
import { useOptimizedBlogPosts } from '@/hooks/useOptimizedQuery';
import { getOptimizedAnimationProps } from '@/utils/performance';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  author: string;
  published_at: string | null;
  featured_image_url: string | null;
  tags: string[] | null;
  created_at: string;
}

const Blog = () => {
  const { data: posts = [], isLoading: loading } = useOptimizedBlogPosts(6);
  const { shouldAnimate, animationDuration } = getOptimizedAnimationProps();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string | null) => {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (loading) {
    return (
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="h-8 bg-muted animate-pulse rounded w-64 mx-auto mb-4" />
            <div className="h-4 bg-muted animate-pulse rounded w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-muted animate-pulse" />
                <CardContent className="p-6 space-y-3">
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                  <div className="h-3 bg-muted animate-pulse rounded" />
                  <div className="h-3 bg-muted animate-pulse rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-dark">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Latest Blog Posts
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on modern web development, technology trends, and best practices.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="font-poppins text-xl text-muted-foreground mb-4">No blog posts yet</h3>
            <p className="text-muted-foreground">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Card 
                key={post.id} 
                className={`group overflow-hidden bg-card/50 border-border backdrop-blur-sm hover:border-primary/50 transition-all hover:shadow-orange ${shouldAnimate ? 'animate-slide-up' : ''}`}
                style={{ 
                  animationDelay: shouldAnimate ? `${index * 100}ms` : undefined,
                  transitionDuration: `${animationDuration}ms`
                }}
              >
                {post.featured_image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <LazyImage
                      src={post.featured_image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  </div>
                )}
                
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {post.published_at ? formatDate(post.published_at) : formatDate(post.created_at)}
                      </span>
                    </div>
                     <div className="flex items-center space-x-1">
                       <Clock className="w-4 h-4" />
                       <span>{getReadingTime(post.excerpt)} min read</span>
                     </div>
                  </div>

                  <h3 className="font-poppins text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>

                   <p className="font-inter text-muted-foreground mb-4 line-clamp-3">
                     {post.excerpt || 'No excerpt available...'}
                   </p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex} 
                          variant="secondary" 
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <Link to={`/blog/${post.id}`}>
                    <Button
                      variant="ghost"
                      className="group/btn p-0 h-auto font-medium text-primary hover:text-primary-foreground"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="group">
            View All Posts
            <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;