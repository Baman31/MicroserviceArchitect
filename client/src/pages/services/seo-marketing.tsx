import { Helmet } from "react-helmet-async";
import { Check, TrendingUp, Target, BarChart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

const services = [
  {
    icon: Search,
    title: "Search Engine Optimization",
    description: "Improve your website's visibility in search engine results"
  },
  {
    icon: Target,
    title: "Pay-Per-Click Advertising",
    description: "Targeted advertising campaigns that drive qualified traffic"
  },
  {
    icon: BarChart,
    title: "Content Marketing",
    description: "Strategic content creation that engages and converts"
  },
  {
    icon: TrendingUp,
    title: "Social Media Marketing",
    description: "Build brand awareness and engagement on social platforms"
  }
];

const features = [
  "Keyword research & analysis",
  "On-page SEO optimization",
  "Technical SEO audits",
  "Link building campaigns",
  "Content strategy & creation",
  "Local SEO optimization",
  "Google Ads management",
  "Social media campaigns",
  "Analytics & reporting",
  "Conversion optimization"
];

const packages = [
  {
    name: "Local SEO",
    price: "₹15,000/month",
    description: "Perfect for local businesses in Jaipur",
    features: [
      "Google My Business optimization",
      "Local keyword targeting",
      "Citation building",
      "Review management",
      "Monthly reporting",
      "Basic social media setup"
    ]
  },
  {
    name: "Growth Package",
    price: "₹30,000/month",
    description: "Comprehensive SEO and digital marketing",
    features: [
      "Advanced SEO optimization",
      "Content marketing strategy",
      "Social media management",
      "Google Ads campaigns",
      "Competitor analysis",
      "Weekly reporting",
      "Phone support"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "₹75,000/month",
    description: "Full-scale digital marketing solution",
    features: [
      "Multi-channel campaigns",
      "Advanced analytics setup",
      "Dedicated account manager",
      "Custom landing pages",
      "A/B testing campaigns",
      "Daily monitoring",
      "Priority support"
    ]
  }
];

const results = [
  { metric: "200%", description: "Average traffic increase" },
  { metric: "150%", description: "Lead generation improvement" },
  { metric: "85%", description: "Client retention rate" },
  { metric: "60 days", description: "Average time to see results" }
];

export default function SeoMarketing() {
  return (
    <>
      <Helmet>
        <title>SEO & Digital Marketing Services - TechVantage Solutions</title>
        <meta name="description" content="Professional SEO and digital marketing services in Jaipur. Increase your online visibility, drive traffic, and grow your business with our proven strategies." />
      </Helmet>

      <div data-testid="seo-marketing-page">
        {/* Hero Section */}
        <section className="space-theme py-20 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold font-poppins mb-6" data-testid="service-title">
                SEO & Digital Marketing
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8" data-testid="service-description">
                Increase your online visibility and reach with data-driven SEO strategies and comprehensive digital marketing campaigns.
              </p>
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90" data-testid="button-get-started">
                <Link href="/contact">Start Growing Today</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="results-title">
                Proven Results for Our Clients
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {results.map((result, index) => (
                <div key={index} className="text-center" data-testid={`result-${index}`}>
                  <div className="text-4xl lg:text-5xl font-bold text-primary font-poppins mb-2" data-testid={`result-${index}-metric`}>
                    {result.metric}
                  </div>
                  <div className="text-muted-foreground" data-testid={`result-${index}-description`}>
                    {result.description}
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
                Our Marketing Services
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
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
                What's Included in Our Service
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

        {/* Pricing Section */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="pricing-title">
                Marketing Packages
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
              Ready to Boost Your Online Presence?
            </h2>
            <p className="text-xl text-blue-100 mb-8" data-testid="cta-description">
              Let's create a digital marketing strategy that drives real results for your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90" data-testid="button-get-quote">
                <Link href="/contact">Get Marketing Strategy</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" data-testid="button-free-audit">
                <Link href="/contact">Free SEO Audit</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
