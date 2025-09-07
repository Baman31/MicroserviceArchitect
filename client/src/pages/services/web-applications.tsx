import { Helmet } from "react-helmet-async";
import { Check, Database, Cloud, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

const technologies = [
  "React", "Vue.js", "Angular", "Node.js", "Express.js", "Django", "Laravel", "Spring Boot",
  "MongoDB", "PostgreSQL", "MySQL", "Redis", "AWS", "Docker", "Kubernetes"
];

const appTypes = [
  {
    icon: Database,
    title: "Enterprise Applications",
    description: "Complex business applications with advanced workflows and integrations"
  },
  {
    icon: Cloud,
    title: "SaaS Platforms",
    description: "Multi-tenant software-as-a-service solutions with subscription management"
  },
  {
    icon: Shield,
    title: "Fintech Applications",
    description: "Secure financial applications with payment processing and compliance"
  },
  {
    icon: Zap,
    title: "Real-time Applications",
    description: "Live chat, collaboration tools, and real-time data processing systems"
  }
];

const features = [
  "Scalable architecture design",
  "Real-time data processing",
  "Advanced user authentication",
  "Role-based access control",
  "API development & integration",
  "Database optimization",
  "Performance monitoring",
  "Automated testing",
  "DevOps integration",
  "24/7 technical support"
];

const packages = [
  {
    name: "MVP Development",
    price: "₹1,50,000",
    description: "Launch your idea with a minimum viable product",
    features: [
      "Core functionality development",
      "User authentication system",
      "Basic dashboard",
      "Database setup",
      "API development",
      "3 months support"
    ]
  },
  {
    name: "Full-Scale Application",
    price: "₹5,00,000",
    description: "Complete web application with advanced features",
    features: [
      "Advanced feature development",
      "Admin panel",
      "Payment integration",
      "Advanced security",
      "Performance optimization",
      "6 months support",
      "Training included"
    ],
    popular: true
  },
  {
    name: "Enterprise Solution",
    price: "₹15,00,000+",
    description: "Large-scale applications for enterprise clients",
    features: [
      "Custom enterprise features",
      "Third-party integrations",
      "Advanced analytics",
      "Scalability planning",
      "Security auditing",
      "12 months support",
      "Dedicated team"
    ]
  }
];

export default function WebApplications() {
  return (
    <>
      <Helmet>
        <title>Web Application Development Services - TechVantage Solutions</title>
        <meta name="description" content="Custom web application development in Jaipur. Scalable SaaS platforms, enterprise applications, and real-time systems. Expert development team." />
      </Helmet>

      <div data-testid="web-applications-page">
        {/* Hero Section */}
        <section className="space-theme py-20 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold font-poppins mb-6" data-testid="service-title">
                Web Application Development
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8" data-testid="service-description">
                Build powerful, scalable web applications that streamline your business operations and engage your users.
              </p>
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90" data-testid="button-get-started">
                <Link href="/contact">Start Your Project</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Application Types Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="app-types-title">
                Types of Applications We Build
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="app-types-description">
                From simple web apps to complex enterprise solutions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {appTypes.map((type, index) => (
                <Card key={index} className="text-center" data-testid={`app-type-${index}`}>
                  <CardHeader>
                    <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <type.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{type.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{type.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="features-title">
                Advanced Features We Implement
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3" data-testid={`feature-${index}`}>
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="technologies-title">
                Technology Stack
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="technologies-description">
                We use modern, proven technologies to build robust applications
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center" data-testid="technologies-list">
              {technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="text-sm py-2 px-4">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="pricing-title">
                Development Packages
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <Card key={index} className={`${pkg.popular ? 'ring-2 ring-primary' : ''}`} data-testid={`package-${index}`}>
                  <CardHeader className="text-center">
                    {pkg.popular && (
                      <Badge className="w-fit mx-auto mb-2" data-testid="popular-badge">Most Popular</Badge>
                    )}
                    <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                    <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                    <p className="text-muted-foreground">{pkg.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full mt-6" data-testid={`button-choose-${pkg.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      <Link href="/contact">Choose {pkg.name}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="space-theme py-20 text-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="cta-title">
              Ready to Build Your Web Application?
            </h2>
            <p className="text-xl text-blue-100 mb-8" data-testid="cta-description">
              Let's turn your idea into a powerful web application
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90" data-testid="button-get-quote">
                <Link href="/contact">Get Development Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" data-testid="button-view-portfolio">
                <Link href="/portfolio">View Our Work</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
