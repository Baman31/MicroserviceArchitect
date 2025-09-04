import { Skeleton } from "@/components/ui/skeleton";

export function ServiceCardSkeleton() {
  return (
    <div className="service-card group h-full" data-testid="service-card-skeleton">
      <div className="relative z-10 h-full">
        <div className="mb-8">
          <div className="relative">
            <Skeleton className="w-20 h-20 rounded-2xl" />
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full">
              <Skeleton className="w-6 h-6 rounded-full" />
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <Skeleton className="h-6 w-24" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-4 w-4 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialCardSkeleton() {
  return (
    <div className="glassmorphism p-8 rounded-3xl" data-testid="testimonial-card-skeleton">
      <div className="flex items-center space-x-4 mb-6">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div>
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
      
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      
      <div className="flex mt-6">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-5 h-5 mr-1 rounded" />
        ))}
      </div>
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="glassmorphism rounded-3xl overflow-hidden" data-testid="project-card-skeleton">
      <Skeleton className="w-full h-64" />
      
      <div className="p-8">
        <Skeleton className="h-8 w-3/4 mb-4" />
        
        <div className="space-y-2 mb-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-full" />
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-28 rounded-md" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
    </div>
  );
}

export function ContactFormSkeleton() {
  return (
    <div className="bg-card/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-border/30" data-testid="contact-form-skeleton">
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Skeleton className="h-5 w-16 mb-2" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div>
            <Skeleton className="h-5 w-16 mb-2" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Skeleton className="h-5 w-16 mb-2" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div>
            <Skeleton className="h-5 w-20 mb-2" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Skeleton className="h-5 w-28 mb-2" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
        
        <div>
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-24 w-full rounded-md" />
        </div>
        
        <div>
          <Skeleton className="h-5 w-28 mb-2" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
        
        <Skeleton className="h-14 w-full rounded-md" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <section className="py-32 lg:py-48 bg-muted/20" data-testid="hero-skeleton">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Skeleton className="h-8 w-48 mx-auto mb-8 rounded-full" />
        
        <div className="space-y-6 mb-12">
          <Skeleton className="h-16 w-3/4 mx-auto" />
          <Skeleton className="h-16 w-2/3 mx-auto" />
        </div>
        
        <div className="space-y-4 mb-16">
          <Skeleton className="h-6 w-5/6 mx-auto" />
          <Skeleton className="h-6 w-4/6 mx-auto" />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Skeleton className="h-14 w-40 rounded-md" />
          <Skeleton className="h-14 w-32 rounded-md" />
        </div>
      </div>
    </section>
  );
}

export function StatisticsSkeleton() {
  return (
    <section className="py-16 bg-muted/10" data-testid="statistics-skeleton">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-12 w-24 mx-auto mb-4" />
              <Skeleton className="h-6 w-32 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}