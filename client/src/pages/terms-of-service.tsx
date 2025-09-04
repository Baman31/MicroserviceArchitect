import { Helmet } from "react-helmet-async";
import { Scale, ShieldCheck, FileText, Users, Gavel, Clock, Globe, ArrowRight, CheckCircle } from "lucide-react";

export default function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service - TechVantage Solutions | Service Agreement</title>
        <meta name="description" content="TechVantage Solutions terms of service. Read our service agreement covering IT services, client obligations, and business terms." />
      </Helmet>
      
      <div className="min-h-screen bg-background" data-testid="terms-of-service-page">
        {/* Hero Section */}
        <section className="py-24 lg:py-32 hero-gradient text-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }}></div>
            <div className="absolute top-3/4 left-3/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-4s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="flex items-center justify-center mb-8 animate-fade-in-up">
              <div className="glassmorphism p-6 rounded-2xl">
                <Scale className="h-16 w-16 text-white mx-auto" />
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black font-poppins mb-8 leading-tight drop-shadow-2xl" data-testid="terms-title">
              <span className="animate-fade-in-up">Terms of</span>
              <br />
              <span className="text-gradient-accent animate-fade-in-up drop-shadow-lg" style={{ animationDelay: '0.2s' }}>Service</span>
            </h1>

            <p className="text-xl lg:text-2xl font-semibold mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed drop-shadow-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Clear and transparent service agreements designed to protect both your business and ours while ensuring excellent service delivery.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="glassmorphism px-4 py-2 rounded-full flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Last updated: September 4, 2025</span>
              </div>
              <div className="glassmorphism px-4 py-2 rounded-full flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">India Jurisdiction</span>
              </div>
              <div className="glassmorphism px-4 py-2 rounded-full flex items-center gap-2">
                <Gavel className="h-4 w-4" />
                <span className="text-sm font-medium">Legally Binding</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-12 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-poppins mb-4">Service Agreement Overview</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Understanding our mutual responsibilities and commitments for successful IT service delivery.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glassmorphism-card p-6 text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-primary/10 p-4 rounded-2xl mb-4 mx-auto w-fit group-hover:bg-primary/20 transition-colors">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Service Terms</h3>
                <p className="text-sm text-muted-foreground">Clear service definitions and scope</p>
              </div>
              
              <div className="glassmorphism-card p-6 text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-secondary/10 p-4 rounded-2xl mb-4 mx-auto w-fit group-hover:bg-secondary/20 transition-colors">
                  <ShieldCheck className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-bold mb-2">Responsibilities</h3>
                <p className="text-sm text-muted-foreground">Your obligations and ours</p>
              </div>
              
              <div className="glassmorphism-card p-6 text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-accent/10 p-4 rounded-2xl mb-4 mx-auto w-fit group-hover:bg-accent/20 transition-colors">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-bold mb-2">Client Rights</h3>
                <p className="text-sm text-muted-foreground">What you can expect from us</p>
              </div>
              
              <div className="glassmorphism-card p-6 text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-primary/10 p-4 rounded-2xl mb-4 mx-auto w-fit group-hover:bg-primary/20 transition-colors">
                  <Gavel className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Legal Terms</h3>
                <p className="text-sm text-muted-foreground">Dispute resolution and jurisdiction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-secondary/5 rounded-full blur-2xl"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="space-y-12">
              
              <div className="glassmorphism-card p-8 hover:shadow-glow transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold font-poppins text-gradient">1. Acceptance of Terms</h2>
                </div>
                <p className="mb-4">
                  Welcome to TechVantage Solutions. These Terms of Service ("Terms") govern your use of our website, 
                  services, and products provided by TechVantage Solutions, a company registered in India with operations 
                  in Jaipur, Rajasthan ("Company," "we," "our," or "us").
                </p>
                <p className="mb-4">
                  By accessing our website or using our services, you agree to be bound by these Terms. If you do not 
                  agree to these Terms, please do not use our services.
                </p>
              </div>

              <div className="glassmorphism-card p-8 hover:shadow-glow transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-secondary/10 p-3 rounded-xl">
                    <FileText className="h-6 w-6 text-secondary" />
                  </div>
                  <h2 className="text-3xl font-bold font-poppins text-gradient">2. Description of Services</h2>
                </div>
                <p className="mb-6 text-lg leading-relaxed">TechVantage Solutions provides comprehensive IT services including:</p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Web development and design</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Web application development</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Cloud solutions and infrastructure</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>DevOps services and automation</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>SEO and digital marketing</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Website optimization and performance</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>IT consulting and technical support</span>
                  </div>
                </div>
                <div className="bg-muted/20 p-4 rounded-lg border-l-4 border-primary">
                  <p className="text-sm italic">
                    Services may be modified, updated, or discontinued at our discretion. We will provide reasonable 
                    notice of any material changes to existing services.
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
                
                <h3 className="text-xl font-semibold mb-3">3.1 Account Security</h3>
                <p className="mb-4">
                  You are responsible for maintaining the confidentiality of any account credentials and for all 
                  activities that occur under your account.
                </p>

                <h3 className="text-xl font-semibold mb-3">3.2 Lawful Use</h3>
                <p className="mb-4">You agree to use our services only for lawful purposes and in accordance with these Terms. You will not:</p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit harmful, offensive, or illegal content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the operation of our services</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">3.3 Content and Data</h3>
                <p className="mb-4">
                  You retain ownership of any content or data you provide to us. You grant us a license to use, 
                  modify, and display such content solely for the purpose of providing our services.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Service Agreements and Payments</h2>
                
                <h3 className="text-xl font-semibold mb-3">4.1 Project Scope</h3>
                <p className="mb-4">
                  Specific project requirements, timelines, and deliverables will be outlined in separate project 
                  agreements or statements of work.
                </p>

                <h3 className="text-xl font-semibold mb-3">4.2 Payment Terms</h3>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>All fees are quoted in Indian Rupees (INR) unless otherwise specified</li>
                  <li>Payment schedules will be agreed upon in project contracts</li>
                  <li>Late payments may incur additional charges</li>
                  <li>All payments are subject to applicable Indian taxes (GST, etc.)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">4.3 Refunds</h3>
                <p className="mb-4">
                  Refund policies will be specified in individual service agreements. Generally, work completed 
                  in good faith is non-refundable.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Intellectual Property Rights</h2>
                
                <h3 className="text-xl font-semibold mb-3">5.1 Our Intellectual Property</h3>
                <p className="mb-4">
                  TechVantage Solutions retains all rights to our proprietary methodologies, frameworks, and 
                  pre-existing intellectual property.
                </p>

                <h3 className="text-xl font-semibold mb-3">5.2 Client Deliverables</h3>
                <p className="mb-4">
                  Upon full payment, clients receive ownership of custom-developed solutions, subject to any 
                  third-party licensing terms.
                </p>

                <h3 className="text-xl font-semibold mb-3">5.3 Third-Party Components</h3>
                <p className="mb-4">
                  Our solutions may incorporate third-party software or components. Clients are responsible for 
                  complying with relevant licensing terms.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. Confidentiality</h2>
                <p className="mb-4">
                  We respect the confidentiality of client information and maintain appropriate safeguards. Both 
                  parties agree to protect confidential information shared during the course of our business relationship.
                </p>
                <p className="mb-4">
                  Confidential information includes but is not limited to business plans, technical specifications, 
                  financial data, and any information marked as confidential.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Warranties and Disclaimers</h2>
                
                <h3 className="text-xl font-semibold mb-3">7.1 Service Warranty</h3>
                <p className="mb-4">
                  We warrant that our services will be performed with professional skill and care in accordance 
                  with industry standards.
                </p>

                <h3 className="text-xl font-semibold mb-3">7.2 Disclaimer</h3>
                <p className="mb-4">
                  EXCEPT AS EXPRESSLY STATED, OUR SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, 
                  EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
                  OR NON-INFRINGEMENT.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
                <p className="mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, TECHVANTAGE SOLUTIONS SHALL NOT BE LIABLE FOR ANY 
                  INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED 
                  TO LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES.
                </p>
                <p className="mb-4">
                  Our total liability for any claim shall not exceed the amount paid by the client for the 
                  specific service giving rise to the claim.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">9. Indemnification</h2>
                <p className="mb-4">
                  Clients agree to indemnify and hold harmless TechVantage Solutions from any claims, damages, 
                  or expenses arising from:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Client's use of our services in violation of these Terms</li>
                  <li>Client's content or data that infringes third-party rights</li>
                  <li>Client's breach of confidentiality obligations</li>
                  <li>Any modifications made by client to our deliverables</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">10. Termination</h2>
                
                <h3 className="text-xl font-semibold mb-3">10.1 Termination by Either Party</h3>
                <p className="mb-4">
                  Either party may terminate services with 30 days written notice. Specific termination terms 
                  will be outlined in individual service agreements.
                </p>

                <h3 className="text-xl font-semibold mb-3">10.2 Immediate Termination</h3>
                <p className="mb-4">
                  We may terminate services immediately if client breaches these Terms or fails to make required payments.
                </p>

                <h3 className="text-xl font-semibold mb-3">10.3 Effect of Termination</h3>
                <p className="mb-4">
                  Upon termination, client remains responsible for payment of services rendered. We will return 
                  client data in a reasonable format, subject to our data retention policies.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">11. Governing Law and Disputes</h2>
                <p className="mb-4">
                  These Terms are governed by the laws of India. Any disputes will be subject to the exclusive 
                  jurisdiction of the courts in Jaipur, Rajasthan.
                </p>
                <p className="mb-4">
                  We encourage resolution of disputes through direct communication before pursuing legal action.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">12. Force Majeure</h2>
                <p className="mb-4">
                  Neither party shall be liable for any failure to perform due to events beyond their reasonable 
                  control, including natural disasters, acts of government, labor disputes, or technical failures 
                  of third-party services.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">13. Modifications to Terms</h2>
                <p className="mb-4">
                  We reserve the right to modify these Terms at any time. Material changes will be communicated 
                  through our website or via email. Continued use of our services constitutes acceptance of 
                  modified Terms.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">14. Severability</h2>
                <p className="mb-4">
                  If any provision of these Terms is found to be unenforceable, the remaining provisions will 
                  continue in full force and effect.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">15. Contact Information</h2>
                <p className="mb-4">
                  For questions about these Terms or our services, please contact us:
                </p>
                <div className="bg-muted/30 p-6 rounded-lg">
                  <p className="mb-2"><strong>TechVantage Solutions</strong></p>
                  <p className="mb-2">Email: legal@techvantagesolutions.com</p>
                  <p className="mb-2">Phone: +91-141-XXXXXXX</p>
                  <p className="mb-2">Address: Jaipur, Rajasthan, India</p>
                  <p>Business Hours: Monday to Friday, 9:00 AM to 6:00 PM IST</p>
                </div>
              </div>

              <div className="mb-8 bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <h2 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-200">Important Notice</h2>
                <p className="text-blue-700 dark:text-blue-300 mb-2">
                  These Terms constitute a legal agreement. Please read them carefully before using our services.
                </p>
                <p className="text-blue-700 dark:text-blue-300">
                  For complex projects, additional terms may apply as specified in separate agreements.
                </p>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}