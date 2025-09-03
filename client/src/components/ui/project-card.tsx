import { Link } from "wouter";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  caseStudyUrl?: string;
  testId?: string;
}

export default function ProjectCard({ 
  title, 
  description, 
  imageUrl, 
  technologies, 
  caseStudyUrl,
  testId 
}: ProjectCardProps) {
  return (
    <div className="bg-muted rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-border" data-testid={testId}>
      <img 
        src={imageUrl} 
        alt={`${title} screenshot`} 
        className="w-full h-48 object-cover" 
        data-testid={`${testId}-image`}
      />
      <div className="p-6">
        <h3 className="font-semibold font-poppins mb-2" data-testid={`${testId}-title`}>{title}</h3>
        <p className="text-muted-foreground text-sm mb-4" data-testid={`${testId}-description`}>{description}</p>
        <div className="flex flex-wrap gap-2 mb-4" data-testid={`${testId}-technologies`}>
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        {caseStudyUrl && (
          <a 
            href={caseStudyUrl} 
            className="text-primary hover:text-secondary font-medium text-sm inline-flex items-center"
            data-testid={`${testId}-case-study-link`}
          >
            View Case Study <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}
