import { Helmet } from "react-helmet-async";

export default function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service - TechVantage Solutions | Service Agreement</title>
        <meta name="description" content="TechVantage Solutions terms of service. Read our service agreement covering IT services, client obligations, and business terms." />
      </Helmet>
      
      <div className="min-h-screen bg-background" data-testid="terms-of-service-page">
        {/* Header */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl lg:text-5xl font-black font-poppins mb-6 text-gradient" data-testid="terms-title">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="terms-last-updated">
              Last updated: September 4, 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
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

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Description of Services</h2>
                <p className="mb-4">TechVantage Solutions provides comprehensive IT services including:</p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Web development and design</li>
                  <li>Web application development</li>
                  <li>Cloud solutions and infrastructure</li>
                  <li>DevOps services and automation</li>
                  <li>SEO and digital marketing</li>
                  <li>Website optimization and performance enhancement</li>
                  <li>IT consulting and technical support</li>
                </ul>
                <p className="mb-4">
                  Services may be modified, updated, or discontinued at our discretion. We will provide reasonable 
                  notice of any material changes to existing services.
                </p>
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