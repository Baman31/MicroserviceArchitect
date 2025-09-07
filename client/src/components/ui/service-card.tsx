import { Link } from "wouter";
import { LucideIcon, ArrowRight, ExternalLink } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  testId?: string;
  index?: number;
}

export default function ServiceCard({ icon: Icon, title, description, href, testId, index = 0 }: ServiceCardProps) {
  const gradientColors = [
    'from-purple-500/30 to-pink-500/30',
    'from-purple-600/25 to-purple-400/25',
    'from-pink-500/30 to-purple-500/30',
    'from-purple-400/25 to-indigo-500/25',
    'from-indigo-500/30 to-purple-500/30',
    'from-pink-600/25 to-purple-600/25'
  ];

  const iconColors = [
    'text-purple-300',
    'text-pink-300',
    'text-purple-400',
    'text-indigo-300',
    'text-pink-400',
    'text-purple-200'
  ];

  return (
    <Link href={href} data-testid={`${testId}-link`}>
      <div className="service-card group h-full" data-testid={testId}>
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors[index % gradientColors.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>
        
        {/* Content */}
        <div className="relative z-10 h-full">
          {/* Icon */}
          <div className="mb-8">
            <div className="relative">
              <div className="glassmorphism w-20 h-20 rounded-2xl flex items-center justify-center group-hover:shadow-glow transition-all duration-500">
                <Icon className={`h-10 w-10 ${iconColors[index % iconColors.length]} group-hover:scale-110 transition-all duration-300`} />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-ping"></div>
            </div>
          </div>

          {/* Text Content */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold font-poppins mb-4 group-hover:text-primary transition-colors duration-300" data-testid={`${testId}-title`}>
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed" data-testid={`${testId}-description`}>
              {description}
            </p>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-primary font-semibold group-hover:text-secondary transition-colors duration-300">
              Learn More
            </span>
            <div className="flex items-center space-x-2">
              <ArrowRight className="h-5 w-5 text-primary group-hover:text-secondary group-hover:translate-x-1 transition-all duration-300" />
              <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
          </div>

          {/* Hover Effect Lines */}
          <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-primary group-hover:w-full transition-all duration-500 rounded-full"></div>
        </div>
      </div>
    </Link>
  );
}
