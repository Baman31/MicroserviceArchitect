import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Mail } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function CTA() {
  const handleGetConsultation = () => {
    trackEvent('click', 'cta', 'get_consultation');
  };

  const handleCallNow = () => {
    trackEvent('click', 'cta', 'call_now');
  };

  return (
    <section className="py-20 bg-primary text-white" data-testid="cta-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="cta-title">
          Ready to Transform Your Digital Presence?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto" data-testid="cta-description">
          Join the growing number of successful businesses in Rajasthan who trust TechVantage Solutions for their digital transformation journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            asChild 
            size="lg" 
            className="bg-secondary hover:bg-secondary/90 text-white"
            onClick={handleGetConsultation}
            data-testid="button-get-consultation"
          >
            <Link href="/contact">Get Free Consultation</Link>
          </Button>
          <Button 
            asChild
            variant="outline" 
            size="lg" 
            className="border-2 border-white hover:bg-white hover:text-primary text-white"
            onClick={handleCallNow}
            data-testid="button-call-now"
          >
            <a href="tel:+919876543210">
              <Phone className="mr-2 h-5 w-5" /> Call Now: +91 9876543210
            </a>
          </Button>
        </div>
        <div className="text-blue-100 space-y-2">
          <div className="flex items-center justify-center" data-testid="cta-office">
            <MapPin className="mr-2 h-5 w-5" /> 
            Office: Malviya Nagar, Jaipur, Rajasthan
          </div>
          <div className="flex items-center justify-center" data-testid="cta-email">
            <Mail className="mr-2 h-5 w-5" /> 
            Email: hello@techvantagesolutions.com
          </div>
        </div>
      </div>
    </section>
  );
}
