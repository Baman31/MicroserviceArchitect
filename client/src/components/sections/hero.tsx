import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight, Sparkles, Code, Rocket } from "lucide-react";

const rotatingTexts = [
  { text: 'We imagine. We engineer. We modernize. We manage.', icon: Code },
  { text: 'Building tomorrow\'s solutions today.', icon: Rocket },
  { text: 'Your success is our mission.', icon: Sparkles },
  { text: 'Innovation driven by excellence.', icon: Code }
];

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handleStartProject = () => {
    trackEvent('click', 'cta', 'start_project_hero');
  };

  const handleViewWork = () => {
    trackEvent('click', 'cta', 'view_work_hero');
  };

  const CurrentIcon = rotatingTexts[currentTextIndex].icon;

  return (
    <section 
      ref={heroRef}
      className="hero-gradient text-white py-32 lg:py-48 relative overflow-hidden"
      data-testid="hero-section"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1) 0%, transparent 50%), var(--gradient-primary)`,
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '-4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-slide-in-left">
            {/* Floating Badge */}
            <div className="glassmorphism px-6 py-3 rounded-full inline-flex items-center space-x-2 mb-8 animate-glow-pulse">
              <Sparkles className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">Leading IT Solutions Provider</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold font-poppins mb-8 leading-tight" data-testid="hero-title">
              Your Trusted
              <br />
              <span className="text-gradient-accent">Digital Engineering</span>
              <br />
              Partner in{" "}
              <span className="text-secondary animate-glow-pulse">Rajasthan</span>
            </h1>

            <div className="text-xl lg:text-2xl mb-8 text-blue-100 min-h-[4rem] flex items-center" data-testid="hero-rotating-text">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl bg-white/10 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                  <CurrentIcon className="h-6 w-6" />
                </div>
                <span 
                  className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                >
                  {rotatingTexts[currentTextIndex].text}
                </span>
              </div>
            </div>

            <p className="text-lg mb-12 text-blue-100 max-w-2xl leading-relaxed" data-testid="hero-description">
              Empowering businesses across Jaipur and India with cutting-edge web development, cloud solutions, and digital transformation services that drive growth and innovation.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                asChild 
                size="lg" 
                className="modern-button group px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-glow-secondary transition-all duration-500"
                onClick={handleStartProject}
                data-testid="button-start-project"
              >
                <Link href="/contact" className="flex items-center space-x-2">
                  <span>Start Your Project</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="glassmorphism border-2 border-white/30 hover:border-white hover:bg-white/10 text-white px-8 py-4 text-lg font-semibold hover:shadow-glow transition-all duration-500"
                onClick={handleViewWork}
                data-testid="button-view-work"
              >
                <Link href="/portfolio">View Our Work</Link>
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/20">
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="text-3xl font-bold text-secondary">100+</div>
                <div className="text-sm text-blue-200">Projects Delivered</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="text-3xl font-bold text-secondary">50+</div>
                <div className="text-sm text-blue-200">Happy Clients</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div className="text-3xl font-bold text-secondary">24/7</div>
                <div className="text-sm text-blue-200">Support</div>
              </div>
            </div>
          </div>

          <div className="lg:text-right animate-slide-in-right">
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full gradient-accent opacity-20 animate-float"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full gradient-primary opacity-20 animate-float" style={{ animationDelay: '-3s' }}></div>
              
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
                  alt="Professional team working on digital solutions" 
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700" 
                  data-testid="hero-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Floating Tech Cards */}
              <div className="absolute top-8 -left-4 glassmorphism p-4 rounded-2xl animate-float">
                <div className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">React & Node.js</span>
                </div>
              </div>
              
              <div className="absolute bottom-8 -right-4 glassmorphism p-4 rounded-2xl animate-float" style={{ animationDelay: '-2s' }}>
                <div className="flex items-center space-x-2">
                  <Rocket className="h-5 w-5 text-secondary" />
                  <span className="text-sm font-medium">Cloud Native</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
