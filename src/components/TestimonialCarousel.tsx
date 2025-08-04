import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Testimonial {
  id: string;
  client_name: string;
  client_company: string | null;
  client_role: string | null;
  testimonial_text: string;
  rating: number | null;
  featured: boolean;
  created_at: string;
}

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();

    // Set up real-time subscription
    const subscription = supabase
      .channel('testimonial-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'testimonials'
      }, () => {
        fetchTestimonials();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 6000); // Auto-advance every 6 seconds

      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-dark">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="h-8 bg-muted animate-pulse rounded w-64 mx-auto mb-4" />
            <div className="h-4 bg-muted animate-pulse rounded w-96 mx-auto" />
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card/50 border-border backdrop-blur-sm">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-6">
                  <div className="h-4 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-dark">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Client Testimonials
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              What my clients say about working with me.
            </p>
          </div>
          <div className="text-center py-16">
            <h3 className="font-poppins text-xl text-muted-foreground mb-4">No testimonials yet</h3>
            <p className="text-muted-foreground">Client feedback will appear here soon!</p>
          </div>
        </div>
      </section>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-dark">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Client Testimonials
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            What my clients say about working with me and the results we've achieved together.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <Card className="bg-card/50 border-border backdrop-blur-sm overflow-hidden">
            <CardContent className="p-8 md:p-12 relative">
              <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/20" />
              
              <div className="space-y-6">
                <div className="flex justify-center">
                  {currentTestimonial.rating && (
                    <div className="flex space-x-1">
                      {renderStars(currentTestimonial.rating)}
                    </div>
                  )}
                </div>

                <blockquote className="font-inter text-lg md:text-xl text-foreground leading-relaxed text-center italic">
                  "{currentTestimonial.testimonial_text}"
                </blockquote>

                <div className="text-center">
                  <div className="font-poppins text-lg font-semibold text-foreground">
                    {currentTestimonial.client_name}
                  </div>
                  {(currentTestimonial.client_role || currentTestimonial.client_company) && (
                    <div className="font-inter text-muted-foreground">
                      {currentTestimonial.client_role}
                      {currentTestimonial.client_role && currentTestimonial.client_company && ', '}
                      {currentTestimonial.client_company}
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Controls */}
              {testimonials.length > 1 && (
                <div className="flex items-center justify-between mt-8">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevTestimonial}
                    className="p-2 hover:bg-primary/10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>

                  {/* Dots Indicator */}
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentIndex
                            ? 'bg-primary w-8'
                            : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextTestimonial}
                    className="p-2 hover:bg-primary/10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;