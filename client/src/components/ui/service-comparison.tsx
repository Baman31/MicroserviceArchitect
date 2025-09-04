import { useState } from "react";
import { Check, X, Star, Zap, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ServiceFeature {
  name: string;
  basic: boolean | string;
  professional: boolean | string;
  enterprise: boolean | string;
}

interface ServicePlan {
  name: string;
  description: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
  icon: React.ComponentType<any>;
  color: string;
}

const serviceComparison: ServiceFeature[] = [
  { name: "Custom Website Design", basic: true, professional: true, enterprise: true },
  { name: "Responsive Mobile Design", basic: true, professional: true, enterprise: true },
  { name: "SEO Optimization", basic: "Basic", professional: "Advanced", enterprise: "Premium" },
  { name: "Performance Optimization", basic: false, professional: true, enterprise: true },
  { name: "Content Management System", basic: false, professional: true, enterprise: true },
  { name: "E-commerce Integration", basic: false, professional: "Limited", enterprise: "Full" },
  { name: "Custom API Development", basic: false, professional: false, enterprise: true },
  { name: "Analytics & Reporting", basic: "Basic", professional: "Advanced", enterprise: "Custom" },
  { name: "24/7 Support", basic: false, professional: "Business Hours", enterprise: true },
  { name: "Maintenance & Updates", basic: "3 months", professional: "1 year", enterprise: "Lifetime" },
  { name: "Multi-language Support", basic: false, professional: false, enterprise: true },
  { name: "Advanced Security Features", basic: false, professional: "Standard", enterprise: "Enterprise" },
];

const servicePlans: ServicePlan[] = [
  {
    name: "Basic",
    description: "Perfect for small businesses and startups",
    price: "₹50,000",
    period: "one-time",
    features: ["Custom Design", "Mobile Responsive", "Basic SEO", "3 Months Support"],
    icon: Zap,
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses",
    price: "₹1,50,000",
    period: "one-time",
    popular: true,
    features: ["Everything in Basic", "CMS Integration", "Advanced SEO", "Performance Optimization", "1 Year Support"],
    icon: Star,
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Enterprise",
    description: "For large organizations with complex needs",
    price: "₹3,00,000+",
    period: "custom",
    features: ["Everything in Professional", "Custom API", "Advanced Security", "Multi-language", "Lifetime Support"],
    icon: Shield,
    color: "from-orange-500 to-red-500"
  }
];

export default function ServiceComparison() {
  const [selectedPlan, setSelectedPlan] = useState<string>("Professional");
  const [viewMode, setViewMode] = useState<"plans" | "comparison">("plans");

  const renderFeatureValue = (value: boolean | string) => {
    if (value === true) {
      return <Check className="h-5 w-5 text-green-500" data-testid="feature-check" />;
    } else if (value === false) {
      return <X className="h-5 w-5 text-red-400" data-testid="feature-cross" />;
    } else {
      return <span className="text-sm font-medium text-primary" data-testid="feature-text">{value}</span>;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6" data-testid="service-comparison">
      {/* Toggle View Mode */}
      <div className="flex justify-center mb-8">
        <div className="glassmorphism p-2 rounded-2xl inline-flex">
          <Button
            variant={viewMode === "plans" ? "default" : "ghost"}
            onClick={() => setViewMode("plans")}
            className="px-6"
            data-testid="button-plans-view"
          >
            Service Plans
          </Button>
          <Button
            variant={viewMode === "comparison" ? "default" : "ghost"}
            onClick={() => setViewMode("comparison")}
            className="px-6"
            data-testid="button-comparison-view"
          >
            Compare Features
          </Button>
        </div>
      </div>

      {viewMode === "plans" ? (
        <div className="grid md:grid-cols-3 gap-8" data-testid="service-plans">
          {servicePlans.map((plan, index) => {
            const IconComponent = plan.icon;
            const isSelected = selectedPlan === plan.name;
            
            return (
              <Card 
                key={plan.name}
                className={`relative overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-2xl ${
                  isSelected ? 'ring-2 ring-primary shadow-2xl scale-105' : 'hover:scale-102'
                } ${plan.popular ? 'border-primary' : ''}`}
                onClick={() => setSelectedPlan(plan.name)}
                data-testid={`service-plan-${plan.name.toLowerCase()}`}
              >
                {plan.popular && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground" data-testid="popular-badge">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <CardTitle className="text-2xl font-black" data-testid={`plan-title-${plan.name.toLowerCase()}`}>
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-base" data-testid={`plan-description-${plan.name.toLowerCase()}`}>
                    {plan.description}
                  </CardDescription>
                  
                  <div className="mt-4">
                    <span className="text-4xl font-black text-gradient" data-testid={`plan-price-${plan.name.toLowerCase()}`}>
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground ml-2" data-testid={`plan-period-${plan.name.toLowerCase()}`}>
                      {plan.period}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3" data-testid={`feature-${plan.name.toLowerCase()}-${featureIndex}`}>
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full font-bold ${isSelected ? 'bg-primary' : ''}`}
                    variant={isSelected ? "default" : "outline"}
                    data-testid={`button-select-${plan.name.toLowerCase()}`}
                  >
                    {isSelected ? "Selected Plan" : "Choose This Plan"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="glassmorphism rounded-3xl overflow-hidden" data-testid="feature-comparison-table">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/20">
                  <th className="text-left p-6 font-black text-xl" data-testid="features-header">Features</th>
                  {servicePlans.map((plan) => (
                    <th key={plan.name} className="text-center p-6 min-w-[200px]" data-testid={`plan-header-${plan.name.toLowerCase()}`}>
                      <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-2`}>
                          <plan.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="font-black text-lg">{plan.name}</div>
                        <div className="text-sm text-muted-foreground">{plan.price}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {serviceComparison.map((feature, index) => (
                  <tr 
                    key={feature.name} 
                    className={`border-b border-border/10 hover:bg-muted/20 transition-colors ${
                      index % 2 === 0 ? 'bg-muted/5' : ''
                    }`}
                    data-testid={`feature-row-${index}`}
                  >
                    <td className="p-6 font-semibold" data-testid={`feature-name-${index}`}>
                      {feature.name}
                    </td>
                    <td className="p-6 text-center" data-testid={`feature-basic-${index}`}>
                      {renderFeatureValue(feature.basic)}
                    </td>
                    <td className="p-6 text-center" data-testid={`feature-professional-${index}`}>
                      {renderFeatureValue(feature.professional)}
                    </td>
                    <td className="p-6 text-center" data-testid={`feature-enterprise-${index}`}>
                      {renderFeatureValue(feature.enterprise)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 bg-muted/20 border-t border-border/20">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="font-black text-lg mb-2" data-testid="cta-title">Ready to get started?</h3>
                <p className="text-muted-foreground" data-testid="cta-description">
                  Choose the plan that best fits your business needs
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="font-bold" data-testid="button-contact-sales">
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule Consultation
                </Button>
                <Button className="font-bold" data-testid="button-get-started">
                  Get Started Today
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}