import { useQuery } from "@tanstack/react-query";
import TestimonialCard from "@/components/ui/testimonial-card";
import { TestimonialCardSkeleton } from "@/components/ui/skeleton-components";
import { Testimonial } from "@shared/schema";

export default function Testimonials() {
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials', 'featured'],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-muted" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="testimonials-title">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="testimonials-description">
              Don't just take our word for it. See what businesses across Rajasthan are saying about our services.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <TestimonialCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/50 relative" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="testimonials-title">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="testimonials-description">
            Don't just take our word for it. See what businesses across Rajasthan are saying about our services.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                position={testimonial.position}
                company={testimonial.company}
                content={testimonial.content}
                rating={testimonial.rating}
                avatarUrl={testimonial.avatarUrl || undefined}
                testId={`testimonial-${testimonial.id}`}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12" data-testid="testimonials-empty">
              <p className="text-muted-foreground">No testimonials available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
