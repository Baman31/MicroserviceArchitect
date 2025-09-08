import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import ProjectCard from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@shared/schema";

const categories = [
  { value: "all", label: "All Projects" },
  { value: "web-dev", label: "Web Development" },
  { value: "web-apps", label: "Web Applications" },
  { value: "seo", label: "SEO & Marketing" },
  { value: "cloud", label: "Cloud Solutions" },
  { value: "devops", label: "DevOps" },
  { value: "optimization", label: "Optimization" }
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Portfolio - TechVantage Solutions</title>
        <meta name="description" content="Explore our portfolio of successful IT projects including web development, cloud solutions, DevOps implementations, and digital marketing campaigns." />
      </Helmet>

      <div data-testid="portfolio-page">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-foreground" data-testid="portfolio-title">
                Our Portfolio
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8" data-testid="portfolio-description">
                Explore our successful projects and see how we've helped businesses across Rajasthan achieve their digital transformation goals.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-12 bg-muted/30 border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center" data-testid="portfolio-filters">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.value)}
                  className={selectedCategory === category.value 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "border-border text-foreground hover:bg-muted hover:text-foreground"
                  }
                  data-testid={`filter-${category.value}`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="portfolio-loading">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-muted rounded-lg overflow-hidden shadow-md border border-border animate-pulse">
                    <div className="w-full h-48 bg-muted"></div>
                    <div className="p-6">
                      <div className="h-6 bg-muted rounded mb-2"></div>
                      <div className="h-16 bg-muted rounded mb-4"></div>
                      <div className="flex gap-2 mb-4">
                        <div className="h-6 bg-muted rounded w-16"></div>
                        <div className="h-6 bg-muted rounded w-20"></div>
                      </div>
                      <div className="h-4 bg-muted rounded w-32"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="portfolio-grid">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    imageUrl={project.imageUrl}
                    technologies={project.technologies}
                    caseStudyUrl={project.caseStudyUrl || undefined}
                    testId={`portfolio-project-${project.id}`}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20" data-testid="portfolio-empty">
                <div className="mb-6">
                  <div className="bg-muted w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-12 h-12 bg-muted-foreground/20 rounded"></div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">No Projects Found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    {selectedCategory === "all" 
                      ? "We're working on adding our portfolio projects. Check back soon!"
                      : `No projects found in the ${categories.find(c => c.value === selectedCategory)?.label} category.`
                    }
                  </p>
                </div>
                {selectedCategory !== "all" && (
                  <Button 
                    onClick={() => setSelectedCategory("all")} 
                    variant="outline"
                    data-testid="button-view-all-projects"
                  >
                    View All Projects
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Technology Showcase */}
        <section className="py-20 bg-muted/50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="technologies-title">
                Technologies We Work With
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="technologies-description">
                We leverage cutting-edge technologies to deliver exceptional results
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center" data-testid="technologies-showcase">
              {[
                "React", "Next.js", "Vue.js", "Angular", "Node.js", "Python", "PHP", "Laravel",
                "Django", "AWS", "Azure", "Docker", "Kubernetes", "MongoDB", "PostgreSQL", "MySQL"
              ].map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm py-2 px-4">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-blue-50 to-primary/5 py-20 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground" data-testid="cta-title">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-muted-foreground mb-8" data-testid="cta-description">
              Let's discuss your project requirements and create something amazing together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" data-testid="button-start-project">
                <a href="/contact">Start Your Project</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" data-testid="button-view-services">
                <a href="/#services">View Our Services</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
