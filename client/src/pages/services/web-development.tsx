import { Helmet } from "react-helmet-async";
import { Check, Code, Monitor, Smartphone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

const technologies = [
  "React", "Next.js", "Vue.js", "Angular", "HTML5", "CSS3", "JavaScript", "TypeScript",
  "Tailwind CSS", "Bootstrap", "Sass", "PHP", "Python", "Node.js", "WordPress"
];

const processSteps = [
  {
    icon: Code,
    title: "Discovery & Planning",
    description: "Understanding your business needs and technical requirements"
  },
  {
    icon: Monitor,
    title: "Design & Prototyping",
    description: "Creating wireframes and visual designs that align with your brand"
  },
  {
    icon: Smartphone,
    title: "Development",
    description: "Building responsive, fast, and secure websites using modern technologies"
  },
  {
    icon: Globe,
    title: "Testing & Launch",
    description: "Thorough testing, optimization, and seamless deployment"
  }
];

const features = [
  "Responsive mobile-first design",
  "SEO optimization built-in",
  "Fast loading speeds",
  "Modern UI/UX design",
  "Content management system",
  "E-commerce integration",
  "Social media integration",
  "Analytics setup",
  "Security best practices",
  "Ongoing maintenance support"
];

const packages = [
  {
    name: "Starter",
    price: "₹25,000",
    description: "Perfect for small businesses and startups",
    features: [
      "Up to 5 pages",
      "Responsive design",
      "Basic SEO setup",
      "Contact form",
      "Social media links",
      "1 month support"
    ]
  },
  {
    name: "Professional",
    price: "₹50,000",
    description: "Ideal for growing businesses",
    features: [
      "Up to 10 pages",
      "Advanced SEO optimization",
      "Blog/News section",
      "Google Analytics",
      "Live chat integration",
      "3 months support",
      "Content management system"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "₹1,00,000+",
    description: "For large businesses with complex needs",
    features: [
      "Unlimited pages",
      "Custom functionality",
      "E-commerce integration",
      "Advanced security",
      "Performance optimization",
      "6 months support",
      "Priority support"
    ]
  }
];

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer: "Typically 2-8 weeks depending on complexity and features required."
  },
  {
    question: "Do you provide ongoing maintenance?",
    answer: "Yes, we offer maintenance packages to keep your website updated and secure."
  },
  {
    question: "Will my website be mobile-friendly?",
    answer: "Absolutely! All our websites are built with mobile-first responsive design."
  },
  {
    question: "Can I update the content myself?",
    answer: "Yes, we can integrate a user-friendly content management system for easy updates."
  },
  {
    question: "Do you provide hosting services?",
    answer: "We can recommend reliable hosting providers and help with setup and migration."
  }
];

export default function WebDevelopment() {
  return (
    <>
      <Helmet>
        <title>Web Development Services - TechVantage Solutions</title>
        <meta name="description" content="Professional web development services in Jaipur. Custom websites, responsive design, SEO optimization, and modern technologies. Get a quote today!" />
      </Helmet>

      <div data-testid="web-development-page">
        {/* Hero Section */}
        <section className="space-theme py-20 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold font-poppins mb-6" data-testid="service-title">
                Web Development Services
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8" data-testid="service-description">
                Create stunning, responsive websites that drive business growth with our expert web development team in Jaipur.
              </p>
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90" data-testid="button-get-started">
                <Link href="/contact">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="features-title">
                What We Deliver
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="features-description">
                Comprehensive web development solutions tailored to your business needs
              </p>
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
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="technologies-title">
                Technologies We Use
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="technologies-description">
                We work with the latest technologies to ensure your website is fast, secure, and scalable
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

        {/* Process Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="process-title">
                Our Development Process
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="process-description">
                A proven methodology that ensures project success from start to finish
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="text-center" data-testid={`process-step-${index}`}>
                  <CardHeader>
                    <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="pricing-title">
                Pricing Packages
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="pricing-description">
                Choose the perfect package for your business needs
              </p>
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
                    <Button asChild className="w-full mt-6" data-testid={`button-choose-${pkg.name.toLowerCase()}`}>
                      <Link href="/contact">Choose {pkg.name}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="faq-title">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} data-testid={`faq-${index}`}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
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
              Ready to Start Your Web Development Project?
            </h2>
            <p className="text-xl text-blue-100 mb-8" data-testid="cta-description">
              Let's discuss your requirements and create a website that drives results
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90" data-testid="button-get-quote">
                <Link href="/contact">Get Free Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" data-testid="button-view-portfolio">
                <Link href="/portfolio">View Our Portfolio</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
