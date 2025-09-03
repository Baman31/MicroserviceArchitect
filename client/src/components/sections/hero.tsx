import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const rotatingTexts = [
  'We imagine. We engineer. We modernize. We manage.',
  'Building tomorrow\'s solutions today.',
  'Your success is our mission.',
  'Innovation driven by excellence.'
];

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
        setIsVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleStartProject = () => {
    trackEvent('click', 'cta', 'start_project_hero');
  };

  const handleViewWork = () => {
    trackEvent('click', 'cta', 'view_work_hero');
  };

  return (
    <section className="hero-gradient text-white py-20 lg:py-32" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold font-poppins mb-6 leading-tight" data-testid="hero-title">
              Your Trusted Digital Engineering Partner in{" "}
              <span className="text-secondary">Rajasthan</span>
            </h1>
            <div className="text-xl lg:text-2xl mb-8 text-blue-100 min-h-[3rem] flex items-center" data-testid="hero-rotating-text">
              <span 
                className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              >
                {rotatingTexts[currentTextIndex]}
              </span>
            </div>
            <p className="text-lg mb-8 text-blue-100 max-w-lg" data-testid="hero-description">
              Empowering businesses across Jaipur and India with cutting-edge web development, cloud solutions, and digital transformation services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-white"
                onClick={handleStartProject}
                data-testid="button-start-project"
              >
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-2 border-white hover:bg-white hover:text-primary text-white"
                onClick={handleViewWork}
                data-testid="button-view-work"
              >
                <Link href="/portfolio">View Our Work</Link>
              </Button>
            </div>
          </div>
          <div className="lg:text-right">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=700" 
              alt="Professional team working on digital solutions" 
              className="rounded-xl shadow-2xl w-full h-auto" 
              data-testid="hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
