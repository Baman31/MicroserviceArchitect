import { Helmet } from "react-helmet-async";
import ContactForm from "@/components/ui/contact-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us - TechVantage Solutions</title>
        <meta name="description" content="Get in touch with TechVantage Solutions for your IT service needs. Located in Jaipur, Rajasthan. Free consultation available." />
      </Helmet>
      
      <div className="min-h-screen bg-background" data-testid="contact-page">
        {/* Hero Section */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold font-poppins mb-6" data-testid="contact-title">
              Get In Touch
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto" data-testid="contact-description">
              Have a project in mind? Let's discuss how we can help bring your vision to life.
            </p>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div data-testid="contact-info">
                <h2 className="text-3xl font-bold font-poppins mb-8" data-testid="contact-info-title">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4" data-testid="contact-address">
                    <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Our Office</h3>
                      <p className="text-muted-foreground">
                        Malviya Nagar<br />
                        Jaipur, Rajasthan 302017<br />
                        India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4" data-testid="contact-phone">
                    <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-muted-foreground">+91 9876543210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4" data-testid="contact-email">
                    <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">hello@techvantagesolutions.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4" data-testid="contact-hours">
                    <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="mt-8 h-64 bg-muted rounded-lg flex items-center justify-center" data-testid="contact-map">
                  <p className="text-muted-foreground">Google Maps integration will be implemented here</p>
                </div>
              </div>

              {/* Contact Form */}
              <div data-testid="contact-form-section">
                <h2 className="text-3xl font-bold font-poppins mb-8" data-testid="contact-form-title">
                  Send us a Message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
