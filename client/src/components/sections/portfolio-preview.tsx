import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ui/project-card";
import { ProjectCardSkeleton } from "@/components/ui/skeleton-components";
import { Project } from "@shared/schema";

export default function PortfolioPreview() {
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects', 'featured'],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-card" data-testid="portfolio-preview-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="portfolio-title">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="portfolio-description">
              Explore some of our recent work and see how we've helped businesses achieve their digital transformation goals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[...Array(3)].map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-card" data-testid="portfolio-preview-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="portfolio-title">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="portfolio-description">
            Explore some of our recent work and see how we've helped businesses achieve their digital transformation goals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.length > 0 ? (
            projects.slice(0, 3).map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                technologies={project.technologies}
                caseStudyUrl={project.caseStudyUrl || undefined}
                testId={`project-${project.id}`}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12" data-testid="portfolio-empty">
              <p className="text-muted-foreground">No featured projects available at the moment.</p>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <Button asChild data-testid="button-view-all-projects">
            <Link href="/portfolio">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
