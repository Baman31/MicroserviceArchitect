import { useEffect, useState } from "react";
import { TrendingUp, Users, Calendar, Clock } from "lucide-react";

const stats = [
  { 
    value: "100+", 
    label: "Successful Projects", 
    testId: "stat-projects", 
    icon: TrendingUp,
    suffix: "",
    description: "Projects delivered with excellence" 
  },
  { 
    value: "98", 
    label: "Client Satisfaction Rate", 
    testId: "stat-satisfaction", 
    icon: Users,
    suffix: "%",
    description: "Happy clients worldwide" 
  },
  { 
    value: "3", 
    label: "Years of Excellence", 
    testId: "stat-experience", 
    icon: Calendar,
    suffix: "+",
    description: "Years of industry expertise" 
  },
  { 
    value: "24/7", 
    label: "Support Available", 
    testId: "stat-support", 
    icon: Clock,
    suffix: "",
    description: "Round-the-clock assistance" 
  }
];

export default function Statistics() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats-section" className="py-24 lg:py-32 bg-gradient-to-br from-primary/5 to-blue-50 relative overflow-hidden" data-testid="statistics-section">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight text-foreground" data-testid="statistics-title">
            Our <span className="text-gradient">Track Record</span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed" data-testid="statistics-description">
            Numbers that showcase our commitment to excellence, innovation, and client satisfaction across every project we deliver.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index} 
                className={`modern-card text-center group ${isVisible ? 'animate-scale-in' : 'opacity-0'} hover:shadow-glow-secondary`}
                style={{ animationDelay: `${index * 0.2}s` }}
                data-testid={stat.testId}
              >
                {/* Icon */}
                <div className="glassmorphism w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all duration-500">
                  <IconComponent className="h-10 w-10 text-primary group-hover:scale-110 transition-all duration-300" />
                </div>

                {/* Value */}
                <div className="text-5xl lg:text-6xl font-bold mb-3 text-primary group-hover:text-gradient transition-all duration-300" data-testid={`${stat.testId}-value`}>
                  {stat.value}{stat.suffix}
                </div>

                {/* Label */}
                <div className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300" data-testid={`${stat.testId}-label`}>
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-sm text-muted-foreground opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {stat.description}
                </div>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500 rounded-full"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
