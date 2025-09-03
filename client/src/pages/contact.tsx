import { Helmet } from "react-helmet-async";
import { useState, useRef, useEffect } from "react";
import ContactForm from "@/components/ui/contact-form";
import { MapPin, Phone, Mail, Clock, Sparkles, Globe, Users, Award } from "lucide-react";

export default function Contact() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

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

  return (
    <>
      <Helmet>
        <title>Contact Us - TechVantage Solutions | Get Free IT Consultation in Jaipur</title>
        <meta name="description" content="Contact TechVantage Solutions for expert IT services in Jaipur, Rajasthan. Free consultation, 24/7 support, and cutting-edge digital solutions. Reach out today!" />
      </Helmet>
      
      <div className="min-h-screen bg-background" data-testid="contact-page">
        {/* Modern Hero Section with Advanced Effects */}
        <section 
          ref={heroRef}
          className="py-32 lg:py-48 hero-gradient text-white relative overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1) 0%, transparent 50%), var(--gradient-primary)`,
          }}
        >
          {/* Advanced Background Particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-float animate-morph"></div>
            <div className="absolute top-3/4 right-1/6 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '-4s' }}></div>
            
            {/* Particle Effects */}
            <div className="absolute top-16 left-10 w-3 h-3 bg-secondary/40 rounded-full animate-particle-float" style={{ animationDelay: '-1s' }}></div>
            <div className="absolute top-24 right-16 w-2 h-2 bg-white/30 rounded-full animate-particle-float" style={{ animationDelay: '-3s' }}></div>
            <div className="absolute bottom-32 left-20 w-4 h-4 bg-primary/20 rounded-full animate-particle-float" style={{ animationDelay: '-5s' }}></div>
            <div className="absolute bottom-20 right-24 w-1.5 h-1.5 bg-secondary/50 rounded-full animate-particle-float" style={{ animationDelay: '-7s' }}></div>
            
            {/* Pulsing Rings */}
            <div className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-white/10 rounded-full animate-pulse-ring" style={{ animationDelay: '0s' }}></div>
            <div className="absolute bottom-1/4 left-1/4 w-20 h-20 border-2 border-secondary/20 rounded-full animate-pulse-ring" style={{ animationDelay: '-1.5s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {/* Floating Badge */}
            <div className="glassmorphism px-8 py-4 rounded-full inline-flex items-center space-x-3 mb-8 animate-glow-pulse hover-lift">
              <Sparkles className="h-6 w-6 text-secondary" />
              <span className="text-base font-bold drop-shadow-sm">Free Consultation Available</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black font-poppins mb-8 leading-tight drop-shadow-2xl" data-testid="contact-title">
              <span className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>Let's Build</span>
              <br />
              <span className="text-gradient-accent animate-fade-in-up drop-shadow-lg" style={{ animationDelay: '0.3s' }}>Something Amazing</span>
              <br />
              <span className="text-secondary animate-glow-pulse font-black drop-shadow-lg" style={{ animationDelay: '0.5s' }}>Together</span>
            </h1>

            <p className="text-2xl lg:text-3xl font-semibold mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg animate-fade-in-up" style={{ animationDelay: '0.7s' }} data-testid="contact-description">
              Ready to transform your business with cutting-edge technology? Our experts are here to turn your vision into reality.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/20 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
              <div className="text-center hover-lift">
                <div className="text-4xl font-black text-secondary drop-shadow-lg">24/7</div>
                <div className="text-base font-semibold text-blue-200 drop-shadow-sm">Support Available</div>
              </div>
              <div className="text-center hover-lift">
                <div className="text-4xl font-black text-secondary drop-shadow-lg">100+</div>
                <div className="text-base font-semibold text-blue-200 drop-shadow-sm">Projects Completed</div>
              </div>
              <div className="text-center hover-lift">
                <div className="text-4xl font-black text-secondary drop-shadow-lg">Free</div>
                <div className="text-base font-semibold text-blue-200 drop-shadow-sm">Initial Consultation</div>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Contact Section */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Enhanced Contact Information */}
              <div className="animate-slide-in-left" data-testid="contact-info">
                <div className="glassmorphism p-8 rounded-3xl backdrop-blur-xl border border-border/20 hover-lift">
                  <h2 className="text-4xl font-black font-poppins mb-8 text-gradient drop-shadow-lg" data-testid="contact-info-title">
                    Connect With Us
                  </h2>
                  
                  <div className="space-y-8">
                    <div className="flex items-start space-x-6 group hover-lift" data-testid="contact-address">
                      <div className="p-4 rounded-2xl gradient-primary group-hover:shadow-glow transition-all duration-300">
                        <MapPin className="h-8 w-8 text-white drop-shadow-lg" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black mb-2 drop-shadow-sm">Our Office</h3>
                        <p className="text-lg font-semibold text-muted-foreground">
                          Malviya Nagar<br />
                          Jaipur, Rajasthan 302017<br />
                          India
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-6 group hover-lift" data-testid="contact-phone">
                      <div className="p-4 rounded-2xl gradient-primary group-hover:shadow-glow transition-all duration-300">
                        <Phone className="h-8 w-8 text-white drop-shadow-lg" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black mb-2 drop-shadow-sm">Phone</h3>
                        <p className="text-lg font-semibold text-muted-foreground">+91 9876543210</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-6 group hover-lift" data-testid="contact-email">
                      <div className="p-4 rounded-2xl gradient-primary group-hover:shadow-glow transition-all duration-300">
                        <Mail className="h-8 w-8 text-white drop-shadow-lg" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black mb-2 drop-shadow-sm">Email</h3>
                        <p className="text-lg font-semibold text-muted-foreground">hello@techvantagesolutions.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-6 group hover-lift" data-testid="contact-hours">
                      <div className="p-4 rounded-2xl gradient-primary group-hover:shadow-glow transition-all duration-300">
                        <Clock className="h-8 w-8 text-white drop-shadow-lg" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black mb-2 drop-shadow-sm">Business Hours</h3>
                        <p className="text-lg font-semibold text-muted-foreground">
                          Monday - Friday: 9:00 AM - 6:00 PM<br />
                          Saturday: 10:00 AM - 4:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Map Section */}
                  <div className="mt-10">
                    <div className="modern-card h-80 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden hover-lift" data-testid="contact-map">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
                      <Globe className="h-16 w-16 text-primary mb-4 animate-float drop-shadow-lg" />
                      <h3 className="text-xl font-black mb-2 drop-shadow-sm">Find Us Here</h3>
                      <p className="text-base font-semibold text-muted-foreground text-center">Interactive Google Maps integration<br />coming soon</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Contact Form */}
              <div className="animate-slide-in-right" data-testid="contact-form-section">
                <div className="glassmorphism p-8 rounded-3xl backdrop-blur-xl border border-border/20 hover-lift">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="p-3 rounded-2xl gradient-accent animate-glow-pulse">
                      <Mail className="h-8 w-8 text-white drop-shadow-lg" />
                    </div>
                    <h2 className="text-4xl font-black font-poppins text-gradient drop-shadow-lg" data-testid="contact-form-title">
                      Send us a Message
                    </h2>
                  </div>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="modern-card text-center hover-lift">
                <div className="p-4 rounded-2xl gradient-primary mx-auto w-fit mb-6 animate-glow-pulse">
                  <Users className="h-8 w-8 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-xl font-black mb-3 drop-shadow-sm">Expert Team</h3>
                <p className="text-base font-semibold text-muted-foreground">Dedicated professionals with years of experience in cutting-edge technology</p>
              </div>
              
              <div className="modern-card text-center hover-lift" style={{ animationDelay: '0.2s' }}>
                <div className="p-4 rounded-2xl gradient-accent mx-auto w-fit mb-6 animate-glow-pulse">
                  <Award className="h-8 w-8 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-xl font-black mb-3 drop-shadow-sm">Quality Assurance</h3>
                <p className="text-base font-semibold text-muted-foreground">Rigorous testing and quality control processes for flawless delivery</p>
              </div>
              
              <div className="modern-card text-center hover-lift" style={{ animationDelay: '0.4s' }}>
                <div className="p-4 rounded-2xl gradient-primary mx-auto w-fit mb-6 animate-glow-pulse">
                  <Clock className="h-8 w-8 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-xl font-black mb-3 drop-shadow-sm">Timely Delivery</h3>
                <p className="text-base font-semibold text-muted-foreground">On-time project completion with transparent progress tracking</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
