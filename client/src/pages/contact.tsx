import { Helmet } from "react-helmet-async";
import ContactForm from "@/components/ui/contact-form";
import { MapPin, Phone, Mail, Clock, Globe, Users, Award, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Contact() {

  return (
    <>
      <Helmet>
        <title>Contact Us - TechVantage Solutions | Get Free IT Consultation in Jaipur</title>
        <meta name="description" content="Contact TechVantage Solutions for expert IT services in Jaipur, Rajasthan. Free consultation, 24/7 support, and cutting-edge digital solutions. Reach out today!" />
      </Helmet>
      
      <div className="min-h-screen bg-background" data-testid="contact-page">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                <MessageCircle className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Free Consultation Available</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-foreground" data-testid="contact-title">
                Let's Build Something Amazing Together
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12" data-testid="contact-description">
                Ready to transform your business with cutting-edge technology? Our experts are here to turn your vision into reality.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Support Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">100+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">Free</div>
                  <div className="text-sm text-muted-foreground">Initial Consultation</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Information */}
              <div data-testid="contact-info">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-3xl mb-6" data-testid="contact-info-title">
                      Connect With Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-4" data-testid="contact-address">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Our Office</h3>
                        <p className="text-muted-foreground">
                          Malviya Nagar<br />
                          Jaipur, Rajasthan 302017<br />
                          India
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4" data-testid="contact-phone">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Phone</h3>
                        <p className="text-muted-foreground">+91 9876543210</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4" data-testid="contact-email">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Email</h3>
                        <p className="text-muted-foreground">hello@techvantagesolutions.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4" data-testid="contact-hours">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Business Hours</h3>
                        <p className="text-muted-foreground">
                          Monday - Friday: 9:00 AM - 6:00 PM<br />
                          Saturday: 10:00 AM - 4:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>

                    {/* Map Section */}
                    <div className="mt-8 pt-6 border-t">
                      <div className="h-64 bg-muted rounded-xl flex flex-col items-center justify-center" data-testid="contact-map">
                        <Globe className="h-12 w-12 text-primary mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Find Us Here</h3>
                        <p className="text-sm text-muted-foreground text-center">Interactive Google Maps integration<br />coming soon</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div data-testid="contact-form-section">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-3xl" data-testid="contact-form-title">
                        Send us a Message
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ContactForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose TechVantage</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience the difference with our professional approach and commitment to excellence
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Expert Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Dedicated professionals with years of experience in cutting-edge technology</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Quality Assurance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Rigorous testing and quality control processes for flawless delivery</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Timely Delivery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">On-time project completion with transparent progress tracking</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
