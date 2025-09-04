import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Mail, ArrowRight, Sparkles, Rocket } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function CTA() {
  const handleGetConsultation = () => {
    trackEvent('click', 'cta', 'get_consultation');
  };

  const handleCallNow = () => {
    trackEvent('click', 'cta', 'call_now');
  };

  return (
    <section className="py-24 lg:py-32 gradient-primary text-white relative overflow-hidden" data-testid="cta-section">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '-1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Section Badge */}
        <div className="glassmorphism px-6 py-3 rounded-full inline-flex items-center space-x-2 mb-8 animate-glow-pulse">
          <Rocket className="h-5 w-5 text-secondary" />
          <span className="text-sm font-medium text-foreground">Ready to Get Started?</span>
        </div>

        <h2 className="text-4xl lg:text-6xl font-bold font-poppins mb-8 leading-tight animate-fade-in-up" data-testid="cta-title">
          Ready to Transform Your 
          <br />
          <span className="text-gradient-accent">Digital Presence?</span>
        </h2>

        <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }} data-testid="cta-description">
          Join the growing number of successful businesses in Rajasthan who trust TechVantage Solutions for their digital transformation journey. Let's build something extraordinary together.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button 
            asChild 
            size="lg" 
            className="modern-button group px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-glow-secondary transition-all duration-500"
            onClick={handleGetConsultation}
            data-testid="button-get-consultation"
          >
            <Link href="/contact" className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span>Get Free Consultation</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button 
            asChild
            variant="outline" 
            size="lg" 
            className="glassmorphism border-2 border-white/30 hover:border-white hover:bg-white/10 text-white px-8 py-4 text-lg font-semibold hover:shadow-glow transition-all duration-500"
            onClick={handleCallNow}
            data-testid="button-call-now"
          >
            <a href="tel:+919876543210" className="flex items-center space-x-2">
              <Phone className="h-5 w-5" /> 
              <span>Call Now: +91 9876543210</span>
            </a>
          </Button>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="glassmorphism p-6 rounded-2xl hover:shadow-glow transition-all duration-300 group" data-testid="cta-office">
            <div className="flex items-center space-x-4">
              <div className="glassmorphism w-12 h-12 rounded-xl flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                <MapPin className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-left">
                <div className="text-sm text-blue-200 mb-1 text-foreground/80">Office Location</div>
                <div className="font-semibold text-foreground">Malviya Nagar, Jaipur, Rajasthan</div>
              </div>
            </div>
          </div>

          <div className="glassmorphism p-6 rounded-2xl hover:shadow-glow transition-all duration-300 group" data-testid="cta-email">
            <div className="flex items-center space-x-4">
              <div className="glassmorphism w-12 h-12 rounded-xl flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                <Mail className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-left">
                <div className="text-sm text-blue-200 mb-1 text-foreground/80">Email Us</div>
                <div className="font-semibold text-foreground">hello@techvantagesolutions.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
