import ServiceCard from "@/components/ui/service-card";
import { Code, Monitor, Search, Cloud, Infinity, Gauge, Sparkles } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Custom websites that drive business growth with modern technologies and responsive design.",
    href: "/services/web-development",
    testId: "service-web-development"
  },
  {
    icon: Monitor,
    title: "Web Applications",
    description: "Scalable web applications for modern businesses with robust architecture and performance.",
    href: "/services/web-applications",
    testId: "service-web-applications"
  },
  {
    icon: Search,
    title: "SEO & Digital Marketing",
    description: "Increase visibility and reach with data-driven SEO strategies and digital marketing.",
    href: "/services/seo-marketing",
    testId: "service-seo-marketing"
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Secure and scalable cloud infrastructure to power your business operations efficiently.",
    href: "/services/cloud-solutions",
    testId: "service-cloud-solutions"
  },
  {
    icon: Infinity,
    title: "DevOps Services",
    description: "Streamline development and deployment with automated CI/CD pipelines and monitoring.",
    href: "/services/devops",
    testId: "service-devops"
  },
  {
    icon: Gauge,
    title: "Web Optimization",
    description: "Faster, better performing websites with advanced optimization techniques and monitoring.",
    href: "/services/optimization",
    testId: "service-optimization"
  }
];

export default function ServicesOverview() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" data-testid="services-overview-section">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-in-up">
          {/* Section Badge */}
          <div className="glassmorphism px-6 py-3 rounded-full inline-flex items-center space-x-2 mb-8">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Our Expertise</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold font-poppins mb-8 leading-tight" data-testid="services-title">
            <span className="text-gradient">Comprehensive</span>
            <br />
            <span className="text-foreground">IT Solutions</span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed" data-testid="services-description">
            From cutting-edge web development to scalable cloud solutions, we deliver comprehensive IT services designed to accelerate your business growth and digital transformation journey.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ServiceCard 
                icon={service.icon}
                title={service.title}
                description={service.description}
                href={service.href}
                testId={service.testId}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
