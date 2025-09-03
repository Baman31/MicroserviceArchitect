import ServiceCard from "@/components/ui/service-card";
import { Code, Monitor, Search, Cloud, Infinity, Gauge } from "lucide-react";

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
    <section className="py-20 bg-muted" data-testid="services-overview-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="services-title">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="services-description">
            From web development to cloud solutions, we offer comprehensive IT services tailored to drive your business growth and digital transformation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              href={service.href}
              testId={service.testId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
