import { Helmet } from "react-helmet-async";
import { Check, Zap, Target, BarChart, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

const optimizationServices = [
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Speed up your website with advanced optimization techniques"
  },
  {
    icon: Target,
    title: "Core Web Vitals",
    description: "Improve Google's Core Web Vitals for better search rankings"
  },
  {
    icon: BarChart,
    title: "Analytics Setup",
    description: "Comprehensive tracking and performance monitoring"
  },
  {
    icon: TrendingUp,
    title: "Conversion Optimization",
    description: "Optimize user experience to increase conversion rates"
  }
];

const features = [
  "Page speed optimization",
  "Image compression & lazy loading",
  "Code minification & bundling",
  "CDN setup & configuration",
  "Database query optimization",
  "Caching strategies implementation",
  "Mobile performance optimization",
  "SEO technical improvements",
  "User experience enhancements",
  "Performance monitoring setup"
];

const optimizationAreas = [
  "Frontend Performance", "Backend Optimization", "Database Tuning", "Mobile Optimization",
  "SEO Technical", "Core Web Vitals", "User Experience", "Conversion Rate", "Security Hardening", "Monitoring Setup"
];

const performanceMetrics = [
  { metric: "300%", description: "Average speed improvement" },
  { metric: "50%", description: "Reduction in bounce rate" },
  { metric: "85%", description: "Improvement in Core Web Vitals" },
  { metric: "40%", description: "Increase in conversion rate" }
];

const packages = [
  {
    name: "Basic Optimization",
    price: "₹20,000",
    description: "Essential performance improvements",
    features: [
      "Page speed analysis",
      "Image optimization",
      "Code minification",
      "Basic caching setup",
      "Performance report",
      "1 month support"
    ]
  },
  {
    name: "Advanced Optimization",
    price: "₹50,000",
    description: "Comprehensive performance overhaul",
    features: [
      "Full performance audit",
      "Advanced optimization techniques",
      "CDN implementation",
      "Database optimization",
      "Core Web Vitals improvement",
      "3 months support",
      "Monthly monitoring"
    ],
    popular: true
  },
  {
    name: "Enterprise Optimization",
    price: "₹1,25,000",
    description: "Complete optimization solution",
    features: [
      "Custom optimization strategy",
      "Advanced monitoring setup",
      "Conversion rate optimization",
      "Security hardening",
      "Performance training",
      "6 months support",
      "Quarterly reviews"
    ]
  }
];

export default function Optimization() {
  return (
    <>
      <Helmet>
        <title>Web Optimization Services - TechVantage Solutions</title>
        <meta name="description" content="Professional web optimization services in Jaipur. Speed up your website, improve Core Web Vitals, and boost conversion rates with our expert optimization team." />
      </Helmet>

      <div data-testid="optimization-page">
        {/* Hero Section */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold font-poppins mb-6" data-testid="service-title">
                Web Optimization Services
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8" data-testid="service-description">
                Faster, better performing websites with advanced optimization techniques, improved user experience, and higher conversion rates.
              </p>
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90" data-testid="button-get-started">
                <Link href="/contact">Optimize Your Website</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Performance Metrics Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="metrics-title">
                Performance Improvements We Achieve
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="text-center" data-testid={`metric-${index}`}>
                  <div className="text-4xl lg:text-5xl font-bold text-primary font-poppins mb-2" data-testid={`metric-${index}-value`}>
                    {metric.metric}
                  </div>
                  <div className="text-muted-foreground" data-testid={`metric-${index}-description`}>
                    {metric.description}
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
                Our Optimization Services
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {optimizationServices.map((service, index) => (
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
                Optimization Techniques We Apply
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

        {/* Optimization Areas Section */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="areas-title">
                Areas of Optimization
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="areas-description">
                We optimize every aspect of your website for maximum performance
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center" data-testid="areas-list">
              {optimizationAreas.map((area) => (
                <Badge key={area} variant="outline" className="text-sm py-2 px-4">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Before/After Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="comparison-title">
                Why Website Speed Matters
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-destructive">Slow Website Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-destructive rounded-full flex-shrink-0"></div>
                      <span>Higher bounce rates (53% leave after 3 seconds)</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-destructive rounded-full flex-shrink-0"></div>
                      <span>Lower search engine rankings</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-destructive rounded-full flex-shrink-0"></div>
                      <span>Reduced conversion rates</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-destructive rounded-full flex-shrink-0"></div>
                      <span>Poor user experience</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-destructive rounded-full flex-shrink-0"></div>
                      <span>Lost revenue opportunities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-green-500/20 bg-green-50/50">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-green-600">Optimized Website Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Better user engagement and retention</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Higher search engine rankings</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Increased conversion rates</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Superior user experience</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Maximized revenue potential</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="pricing-title">
                Optimization Packages
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
              Ready to Speed Up Your Website?
            </h2>
            <p className="text-xl text-blue-100 mb-8" data-testid="cta-description">
              Let's optimize your website for better performance, higher rankings, and increased conversions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90" data-testid="button-get-audit">
                <Link href="/contact">Get Performance Audit</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" data-testid="button-speed-test">
                <Link href="/contact">Free Speed Test</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
