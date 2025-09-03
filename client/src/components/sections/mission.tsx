import { Award, Handshake } from "lucide-react";

export default function Mission() {
  return (
    <section className="py-20 bg-card" data-testid="mission-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="mission-title">
              Our Mission: Complete Client Success
            </h2>
            <p className="text-lg text-muted-foreground mb-6" data-testid="mission-description-1">
              We are committed to delivering exceptional IT solutions that drive real business value. Our mission is to empower organizations across Rajasthan and India with cutting-edge technology, innovative approaches, and unwavering dedication to their success.
            </p>
            <p className="text-lg text-muted-foreground mb-8" data-testid="mission-description-2">
              Every project we undertake is guided by our core values: excellence, integrity, innovation, and partnership. We don't just deliver solutions; we build lasting relationships that fuel long-term growth.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center" data-testid="value-excellence">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Award className="text-primary h-6 w-6" />
                </div>
                <h4 className="font-semibold">Excellence</h4>
              </div>
              <div className="text-center" data-testid="value-partnership">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Handshake className="text-primary h-6 w-6" />
                </div>
                <h4 className="font-semibold">Partnership</h4>
              </div>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Modern office workspace with team collaboration" 
              className="rounded-xl shadow-lg w-full h-auto" 
              data-testid="mission-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
