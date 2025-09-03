import { Link } from "wouter";
import { LucideIcon, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  testId?: string;
}

export default function ServiceCard({ icon: Icon, title, description, href, testId }: ServiceCardProps) {
  return (
    <div className="service-card bg-card p-8 rounded-lg shadow-md hover:shadow-xl border border-border" data-testid={testId}>
      <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
        <Icon className="text-primary h-8 w-8" />
      </div>
      <h3 className="text-xl font-semibold font-poppins mb-4" data-testid={`${testId}-title`}>{title}</h3>
      <p className="text-muted-foreground mb-6" data-testid={`${testId}-description`}>{description}</p>
      <Link href={href} className="text-primary hover:text-secondary font-medium inline-flex items-center" data-testid={`${testId}-link`}>
        Learn More <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
}
