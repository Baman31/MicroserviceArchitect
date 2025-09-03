import { Helmet } from "react-helmet-async";
import { Check, Cloud, Shield, Zap, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

const cloudServices = [
  {
    icon: Cloud,
    title: "Cloud Migration",
    description: "Seamless migration of your applications and data to the cloud"
  },
  {
    icon: Shield,
    title: "Cloud Security",
    description: "Advanced security measures to protect your cloud infrastructure"
  },
  {
    icon: Zap,
    title: "Auto-Scaling",
    description: "Automatic scaling to handle traffic spikes and optimize costs"
  },
  {
    icon: Server,
    title: "Infrastructure Management",
    description: "Complete management of your cloud infrastructure and resources"
  }
];

const features = [
  "AWS, Azure & Google Cloud expertise",
  "Infrastructure as Code (IaC)",
  "Containerization with Docker & Kubernetes",
  "Serverless architecture design",
  "Database migration & optimization",
  "Backup & disaster recovery",
  "Monitoring & alerting setup",
  "Cost optimization strategies",
  "Security compliance (SOC 2, ISO 27001)",
  "24/7 cloud support"
];

const cloudPlatforms = [
  "Amazon Web Services (AWS)", "Microsoft Azure", "Google Cloud Platform", "DigitalOcean",
  "Docker", "Kubernetes", "Terraform", "Ansible", "CloudFormation", "Jenkins"
];

const packages = [
  {
    name: "Cloud Starter",
    price: "₹25,000/month",
    description: "Basic cloud setup for small businesses",
    features: [
      "Cloud platform setup",
      "Basic security configuration",
      "Data migration assistance",
      "Email support",
      "Monthly cost reports",
      "Basic monitoring"
    ]
  },
  {
    name: "Professional Cloud",
    price: "₹75,000/month",
    description: "Complete cloud solution for growing businesses",
    features: [
      "Multi-cloud architecture",
      "Advanced security setup",
      "Auto-scaling configuration",
      "Backup & recovery setup",
      "24/7 monitoring",
      "Phone & chat support",
      "Cost optimization"
    ],
    popular: true
  },
  {
    name: "Enterprise Cloud",
    price: "₹2,00,000/month",
    description: "Enterprise-grade cloud infrastructure",
    features: [
      "Custom cloud architecture",
      "Compliance setup",
      "Dedicated cloud engineer",
      "Advanced monitoring & alerting",
      "Disaster recovery planning",
      "Priority support",
      "Regular security audits"
    ]
  }
];

export default function CloudSolutions() {
  return (
    <>
      <Helmet>
        <title>Cloud Solutions & Services - TechVantage Solutions</title>
        <meta name="description" content="Professional cloud solutions in Jaipur. AWS, Azure, Google Cloud migration, infrastructure management, and cloud security services for businesses." />
      </Helmet>

      <div data-testid="cloud-solutions-page">
        {/* Hero Section */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold font-poppins mb-6" data-testid="service-title">
                Cloud Solutions
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8" data-testid="service-description">
                Secure and scalable cloud infrastructure to power your business operations efficiently and cost-effectively.
              </p>
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90" data-testid="button-get-started">
                <Link href="/contact">Start Cloud Journey</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Cloud Services Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="services-title">
                Our Cloud Services
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {cloudServices.map((service, index) => (
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
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="features-title">
                Cloud Infrastructure Capabilities
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3" data-testid={`feature-${index}`}>
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
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
                Cloud Platforms & Tools
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="technologies-description">
                We work with leading cloud platforms and cutting-edge tools
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center" data-testid="technologies-list">
              {cloudPlatforms.map((platform) => (
                <Badge key={platform} variant="outline" className="text-sm py-2 px-4">
                  {platform}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="benefits-title">
                  Why Choose Cloud Solutions?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Cost Efficiency</h4>
                      <p className="text-muted-foreground">Pay only for resources you use, reduce infrastructure costs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Scalability</h4>
                      <p className="text-muted-foreground">Scale resources up or down based on demand automatically</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Reliability</h4>
                      <p className="text-muted-foreground">99.9% uptime with built-in redundancy and backup</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Security</h4>
                      <p className="text-muted-foreground">Enterprise-grade security with compliance standards</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Cloud infrastructure visualization" 
                  className="rounded-xl shadow-lg w-full h-auto" 
                  data-testid="benefits-image"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="pricing-title">
                Cloud Service Packages
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
              Ready to Move to the Cloud?
            </h2>
            <p className="text-xl text-blue-100 mb-8" data-testid="cta-description">
              Let's design a cloud strategy that transforms your business operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90" data-testid="button-get-consultation">
                <Link href="/contact">Get Cloud Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" data-testid="button-cloud-assessment">
                <Link href="/contact">Free Cloud Assessment</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
