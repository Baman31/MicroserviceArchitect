import { Helmet } from "react-helmet-async";
import { Check, GitBranch, Zap, Shield, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

const devopsServices = [
  {
    icon: GitBranch,
    title: "CI/CD Pipelines",
    description: "Automated continuous integration and deployment workflows"
  },
  {
    icon: Zap,
    title: "Infrastructure Automation",
    description: "Infrastructure as Code for consistent and reliable deployments"
  },
  {
    icon: Shield,
    title: "Security Integration",
    description: "DevSecOps practices with security built into the pipeline"
  },
  {
    icon: Monitor,
    title: "Monitoring & Alerting",
    description: "Comprehensive monitoring and alerting for your applications"
  }
];

const features = [
  "CI/CD pipeline setup & optimization",
  "Infrastructure as Code (IaC)",
  "Container orchestration",
  "Automated testing integration",
  "Security scanning & compliance",
  "Performance monitoring",
  "Log management & analysis",
  "Disaster recovery planning",
  "Cost optimization",
  "24/7 system monitoring"
];

const tools = [
  "Jenkins", "GitLab CI/CD", "GitHub Actions", "Docker", "Kubernetes", "Terraform",
  "Ansible", "Prometheus", "Grafana", "ELK Stack", "AWS CodePipeline", "Azure DevOps"
];

const benefits = [
  { metric: "80%", description: "Faster deployment cycles" },
  { metric: "95%", description: "Reduction in deployment errors" },
  { metric: "60%", description: "Decrease in manual tasks" },
  { metric: "99.9%", description: "System uptime achieved" }
];

const packages = [
  {
    name: "DevOps Starter",
    price: "₹40,000/month",
    description: "Basic DevOps setup for small teams",
    features: [
      "Basic CI/CD pipeline",
      "Container setup",
      "Basic monitoring",
      "Weekly reports",
      "Email support",
      "Documentation"
    ]
  },
  {
    name: "Professional DevOps",
    price: "₹1,00,000/month",
    description: "Complete DevOps solution for growing companies",
    features: [
      "Advanced CI/CD pipelines",
      "Infrastructure automation",
      "Security integration",
      "Advanced monitoring",
      "24/7 support",
      "Monthly optimization",
      "Training included"
    ],
    popular: true
  },
  {
    name: "Enterprise DevOps",
    price: "₹2,50,000/month",
    description: "Enterprise-grade DevOps for large organizations",
    features: [
      "Multi-environment pipelines",
      "Advanced security compliance",
      "Dedicated DevOps engineer",
      "Custom tool integration",
      "Disaster recovery",
      "Priority support",
      "Regular assessments"
    ]
  }
];

export default function DevOps() {
  return (
    <>
      <Helmet>
        <title>DevOps Services - TechVantage Solutions</title>
        <meta name="description" content="Professional DevOps services in Jaipur. CI/CD pipelines, infrastructure automation, monitoring, and DevSecOps solutions for efficient software delivery." />
      </Helmet>

      <div data-testid="devops-page">
        {/* Hero Section */}
        <section className="space-theme py-20 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold font-poppins mb-6" data-testid="service-title">
                DevOps Services
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8" data-testid="service-description">
                Streamline development and deployment with automated CI/CD pipelines, infrastructure management, and continuous monitoring.
              </p>
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90" data-testid="button-get-started">
                <Link href="/contact">Transform Your DevOps</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="benefits-title">
                DevOps Transformation Results
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center" data-testid={`benefit-${index}`}>
                  <div className="text-4xl lg:text-5xl font-bold text-primary font-poppins mb-2" data-testid={`benefit-${index}-metric`}>
                    {benefit.metric}
                  </div>
                  <div className="text-muted-foreground" data-testid={`benefit-${index}-description`}>
                    {benefit.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="services-title">
                Our DevOps Services
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {devopsServices.map((service, index) => (
                <Card key={index} className="text-center" data-testid={`service-${index}`}>
                  <CardHeader>
                    <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="features-title">
                DevOps Capabilities We Deliver
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

        {/* Tools Section */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="tools-title">
                DevOps Tools & Technologies
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="tools-description">
                We leverage industry-leading tools to build robust DevOps pipelines
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center" data-testid="tools-list">
              {tools.map((tool) => (
                <Badge key={tool} variant="outline" className="text-sm py-2 px-4">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="process-title">
                  Our DevOps Implementation Process
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-semibold mb-2">Assessment & Planning</h4>
                      <p className="text-muted-foreground">Evaluate current processes and create a tailored DevOps roadmap</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-semibold mb-2">Pipeline Development</h4>
                      <p className="text-muted-foreground">Build automated CI/CD pipelines for efficient deployments</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-semibold mb-2">Infrastructure Setup</h4>
                      <p className="text-muted-foreground">Implement Infrastructure as Code for consistent environments</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-semibold mb-2">Monitoring & Optimization</h4>
                      <p className="text-muted-foreground">Set up monitoring and continuously optimize performance</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="DevOps workflow visualization" 
                  className="rounded-xl shadow-lg w-full h-auto" 
                  data-testid="process-image"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="pricing-title">
                DevOps Service Packages
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
        <section className="py-20 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="cta-title">
              Ready to Accelerate Your Development?
            </h2>
            <p className="text-xl text-blue-100 mb-8" data-testid="cta-description">
              Let's implement DevOps practices that transform your software delivery
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90" data-testid="button-get-consultation">
                <Link href="/contact">Get DevOps Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" data-testid="button-devops-audit">
                <Link href="/contact">DevOps Maturity Assessment</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
