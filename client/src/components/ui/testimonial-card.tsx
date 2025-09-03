import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  avatarUrl?: string;
  testId?: string;
}

export default function TestimonialCard({ 
  name, 
  position, 
  company, 
  content, 
  rating, 
  avatarUrl,
  testId 
}: TestimonialCardProps) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md border border-border" data-testid={testId}>
      <div className="flex items-center mb-4" data-testid={`${testId}-rating`}>
        <div className="flex text-secondary">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < rating ? 'fill-current' : ''}`} 
            />
          ))}
        </div>
      </div>
      <p className="text-muted-foreground mb-6" data-testid={`${testId}-content`}>
        "{content}"
      </p>
      <div className="flex items-center">
        {avatarUrl && (
          <img 
            src={avatarUrl} 
            alt={`${name} headshot`} 
            className="w-12 h-12 rounded-full mr-4" 
            data-testid={`${testId}-avatar`}
          />
        )}
        <div>
          <div className="font-semibold" data-testid={`${testId}-name`}>{name}</div>
          <div className="text-sm text-muted-foreground" data-testid={`${testId}-position`}>
            {position}, {company}
          </div>
        </div>
      </div>
    </div>
  );
}
