import { Helmet } from "react-helmet-async";
import { Shield, Lock, Eye, UserCheck, FileText, Globe, Heart, Clock, ArrowRight } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - TechVantage Solutions | Data Protection & Privacy</title>
        <meta name="description" content="TechVantage Solutions privacy policy. Learn how we collect, use, and protect your personal information in compliance with Indian data protection laws." />
      </Helmet>
      
      <div className="min-h-screen bg-background" data-testid="privacy-policy-page">
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
                <Shield className="h-16 w-16 text-white mx-auto" />
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black font-poppins mb-8 leading-tight drop-shadow-2xl" data-testid="privacy-title">
              <span className="animate-fade-in-up">Your Privacy</span>
              <br />
              <span className="text-gradient-accent animate-fade-in-up drop-shadow-lg" style={{ animationDelay: '0.2s' }}>Matters to Us</span>
            </h1>

            <p className="text-xl lg:text-2xl font-semibold mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed drop-shadow-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Comprehensive data protection policies designed for Indian businesses with complete transparency and legal compliance.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="glassmorphism px-4 py-2 rounded-full flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Last updated: September 4, 2025</span>
              </div>
              <div className="glassmorphism px-4 py-2 rounded-full flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">India Compliant</span>
              </div>
              <div className="glassmorphism px-4 py-2 rounded-full flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">IT Act 2000</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-12 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-poppins mb-4">Privacy Overview</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Quick access to key privacy information and your rights under Indian data protection laws.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glassmorphism-card p-6 text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-primary/10 p-4 rounded-2xl mb-4 mx-auto w-fit group-hover:bg-primary/20 transition-colors">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Data Collection</h3>
                <p className="text-sm text-muted-foreground">What information we collect and why</p>
              </div>
              
              <div className="glassmorphism-card p-6 text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-secondary/10 p-4 rounded-2xl mb-4 mx-auto w-fit group-hover:bg-secondary/20 transition-colors">
                  <Lock className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-bold mb-2">Data Security</h3>
                <p className="text-sm text-muted-foreground">How we protect your information</p>
              </div>
              
              <div className="glassmorphism-card p-6 text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-accent/10 p-4 rounded-2xl mb-4 mx-auto w-fit group-hover:bg-accent/20 transition-colors">
                  <UserCheck className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-bold mb-2">Your Rights</h3>
                <p className="text-sm text-muted-foreground">Control over your personal data</p>
              </div>
              
              <div className="glassmorphism-card p-6 text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-primary/10 p-4 rounded-2xl mb-4 mx-auto w-fit group-hover:bg-primary/20 transition-colors">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Compliance</h3>
                <p className="text-sm text-muted-foreground">Indian legal requirements</p>
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
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold font-poppins text-gradient">1. Introduction</h2>
                </div>
                <p className="mb-4">
                  TechVantage Solutions ("we," "our," or "us") is committed to protecting your privacy and personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our 
                  website or use our services.
                </p>
                <p className="mb-4">
                  We are headquartered in Jaipur, Rajasthan, India, and comply with applicable Indian data protection laws, 
                  including the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices 
                  and Procedures and Sensitive Personal Data or Information) Rules, 2011.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold mb-3">2.1 Personal Information</h3>
                <p className="mb-4">We may collect the following personal information:</p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Company name and business details</li>
                  <li>Project requirements and service preferences</li>
                  <li>Payment information (processed through secure third-party providers)</li>
                  <li>Communication preferences and history</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">2.2 Technical Information</h3>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Website usage data and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                <p className="mb-4">We use your information for the following purposes:</p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Providing and improving our IT services</li>
                  <li>Responding to inquiries and providing customer support</li>
                  <li>Processing payments and managing contracts</li>
                  <li>Sending service updates and marketing communications (with consent)</li>
                  <li>Analyzing website usage to improve user experience</li>
                  <li>Complying with legal obligations and protecting our rights</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Information Sharing and Disclosure</h2>
                <p className="mb-4">We may share your information in the following circumstances:</p>
                
                <h3 className="text-xl font-semibold mb-3">4.1 Service Providers</h3>
                <p className="mb-4">
                  We may share information with trusted third-party service providers who assist us in operating our website, 
                  conducting business, or servicing you, provided they agree to keep this information confidential.
                </p>

                <h3 className="text-xl font-semibold mb-3">4.2 Legal Requirements</h3>
                <p className="mb-4">
                  We may disclose your information if required by law, court order, or government regulation, or to protect 
                  our rights, property, or safety.
                </p>

                <h3 className="text-xl font-semibold mb-3">4.3 Business Transfers</h3>
                <p className="mb-4">
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
                <p className="mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Regular security assessments and vulnerability testing</li>
                  <li>Access controls and authentication measures</li>
                  <li>Employee training on data protection practices</li>
                  <li>Secure hosting and data center facilities</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. Data Retention</h2>
                <p className="mb-4">
                  We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, 
                  comply with legal obligations, resolve disputes, and enforce our agreements. Typically, we retain:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Contact information: Until you request deletion or unsubscribe</li>
                  <li>Project data: For the duration of the project plus 3 years for support purposes</li>
                  <li>Payment records: As required by Indian tax and accounting laws (typically 7 years)</li>
                  <li>Website analytics: Aggregated data may be retained indefinitely</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
                <p className="mb-4">Under applicable Indian data protection laws, you have the following rights:</p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li><strong>Access:</strong> Request information about the personal data we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete personal data</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal requirements)</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a structured, machine-readable format</li>
                  <li><strong>Objection:</strong> Object to processing of your personal data for certain purposes</li>
                  <li><strong>Withdrawal of consent:</strong> Withdraw consent for processing where consent was the basis</li>
                </ul>
                <p className="mb-4">
                  To exercise these rights, please contact us at privacy@techvantagesolutions.com.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. Cookies and Tracking Technologies</h2>
                <p className="mb-4">
                  We use cookies and similar tracking technologies to enhance your browsing experience and analyze website usage. 
                  For detailed information about our use of cookies, please refer to our 
                  <a href="/cookie-policy" className="text-primary hover:underline"> Cookie Policy</a>.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">9. Third-Party Links</h2>
                <p className="mb-4">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or 
                  content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">10. Children's Privacy</h2>
                <p className="mb-4">
                  Our services are not intended for children under the age of 18. We do not knowingly collect personal information 
                  from children under 18. If we become aware that we have collected personal information from a child under 18, 
                  we will take steps to delete such information promptly.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">11. International Data Transfers</h2>
                <p className="mb-4">
                  Your information may be transferred to and processed in countries other than India, including countries that may 
                  have different data protection laws. We ensure appropriate safeguards are in place to protect your information 
                  during such transfers.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">12. Changes to This Policy</h2>
                <p className="mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. 
                  We will notify you of any material changes by posting the updated policy on our website and updating the 
                  "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the 
                  updated policy.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">13. Contact Information</h2>
                <p className="mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
                  please contact us:
                </p>
                <div className="bg-muted/30 p-6 rounded-lg">
                  <p className="mb-2"><strong>TechVantage Solutions</strong></p>
                  <p className="mb-2">Email: privacy@techvantagesolutions.com</p>
                  <p className="mb-2">Phone: +91-141-XXXXXXX</p>
                  <p className="mb-2">Address: Jaipur, Rajasthan, India</p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">14. Grievance Officer</h2>
                <p className="mb-4">
                  In accordance with Indian IT Rules, we have appointed a Grievance Officer to address your concerns regarding 
                  data protection:
                </p>
                <div className="bg-muted/30 p-6 rounded-lg">
                  <p className="mb-2"><strong>Grievance Officer</strong></p>
                  <p className="mb-2">Email: grievance@techvantagesolutions.com</p>
                  <p className="mb-2">Phone: +91-141-XXXXXXX</p>
                  <p>Response Time: Within 30 days of receiving your complaint</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}