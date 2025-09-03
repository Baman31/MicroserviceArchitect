import { Award, Handshake, Zap, Target, Sparkles } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "Delivering outstanding quality in every project"
  },
  {
    icon: Handshake,
    title: "Partnership",
    description: "Building lasting relationships with clients"
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Pioneering cutting-edge technological solutions"
  },
  {
    icon: Target,
    title: "Results",
    description: "Focused on measurable business outcomes"
  }
];

export default function Mission() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" data-testid="mission-section">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-slide-in-left">
            {/* Section Badge */}
            <div className="glassmorphism px-6 py-3 rounded-full inline-flex items-center space-x-2 mb-8">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Our Mission</span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold font-poppins mb-8 leading-tight" data-testid="mission-title">
              Complete Client 
              <br />
              <span className="text-gradient">Success</span>
            </h2>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="mission-description-1">
              We are committed to delivering exceptional IT solutions that drive real business value. Our mission is to empower organizations across Rajasthan and India with cutting-edge technology and unwavering dedication to their success.
            </p>

            <p className="text-lg text-muted-foreground mb-12 leading-relaxed" data-testid="mission-description-2">
              Every project we undertake is guided by our core values: excellence, integrity, innovation, and partnership. We don't just deliver solutions; we build lasting relationships that fuel long-term growth.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div 
                    key={index}
                    className="modern-card text-center group hover:shadow-glow transition-all duration-300"
                    data-testid={`value-${value.title.toLowerCase()}`}
                  >
                    <div className="glassmorphism w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-500">
                      <IconComponent className="text-primary h-8 w-8 group-hover:scale-110 transition-all duration-300" />
                    </div>
                    <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">{value.title}</h4>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {value.description}
                    </p>
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-primary group-hover:w-full transition-all duration-500 rounded-full"></div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="animate-slide-in-right">
            <div className="relative group">
              {/* Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full gradient-accent opacity-20 animate-float"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full gradient-primary opacity-20 animate-float" style={{ animationDelay: '-4s' }}></div>
              
              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=700" 
                  alt="Modern office workspace with team collaboration" 
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700" 
                  data-testid="mission-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Floating Info Cards */}
              <div className="absolute top-8 -left-6 glassmorphism p-4 rounded-2xl animate-float max-w-48">
                <div className="text-sm font-medium text-center">
                  <div className="text-primary font-bold text-lg">500+</div>
                  <div className="text-muted-foreground">Hours Delivered</div>
                </div>
              </div>
              
              <div className="absolute bottom-8 -right-6 glassmorphism p-4 rounded-2xl animate-float max-w-48" style={{ animationDelay: '-2s' }}>
                <div className="text-sm font-medium text-center">
                  <div className="text-secondary font-bold text-lg">5 Star</div>
                  <div className="text-muted-foreground">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
