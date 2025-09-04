import { Helmet } from "react-helmet-async";

export default function CookiePolicy() {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - TechVantage Solutions | Website Cookies & Tracking</title>
        <meta name="description" content="TechVantage Solutions cookie policy. Learn about the cookies and tracking technologies we use on our website." />
      </Helmet>
      
      <div className="min-h-screen bg-background" data-testid="cookie-policy-page">
        {/* Header */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl lg:text-5xl font-black font-poppins mb-6 text-gradient" data-testid="cookie-title">
              Cookie Policy
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="cookie-last-updated">
              Last updated: September 4, 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. What Are Cookies?</h2>
                <p className="mb-4">
                  Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you 
                  visit a website. They are widely used to make websites work more efficiently and provide information 
                  to website owners.
                </p>
                <p className="mb-4">
                  TechVantage Solutions uses cookies and similar tracking technologies to enhance your browsing experience, 
                  analyze website traffic, and improve our services.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Types of Cookies We Use</h2>
                
                <h3 className="text-xl font-semibold mb-3">2.1 Essential Cookies</h3>
                <p className="mb-4">
                  These cookies are necessary for the website to function properly. They enable basic functions like 
                  page navigation, access to secure areas, and form submissions.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg mb-4">
                  <p className="font-semibold mb-2">Examples:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Session management cookies</li>
                    <li>Security cookies</li>
                    <li>Load balancing cookies</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold mb-3">2.2 Analytics Cookies</h3>
                <p className="mb-4">
                  These cookies help us understand how visitors interact with our website by collecting and reporting 
                  information anonymously.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg mb-4">
                  <p className="font-semibold mb-2">We use:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Google Analytics (if configured)</li>
                    <li>Custom analytics for performance monitoring</li>
                    <li>Page view tracking</li>
                    <li>User journey analysis</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold mb-3">2.3 Functional Cookies</h3>
                <p className="mb-4">
                  These cookies enable enhanced functionality and personalization, such as remembering your preferences 
                  and settings.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg mb-4">
                  <p className="font-semibold mb-2">Examples:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Language preferences</li>
                    <li>Theme settings (dark/light mode)</li>
                    <li>Form auto-fill preferences</li>
                    <li>Accessibility settings</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold mb-3">2.4 Performance Cookies</h3>
                <p className="mb-4">
                  These cookies collect information about how you use our website to help us improve performance and 
                  user experience.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg mb-4">
                  <p className="font-semibold mb-2">Information collected:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Page load times</li>
                    <li>Error tracking</li>
                    <li>Navigation patterns</li>
                    <li>Device and browser information</li>
                  </ul>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. Detailed Cookie Information</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">Cookie Name</th>
                        <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">Purpose</th>
                        <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">Duration</th>
                        <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 p-3">session_id</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-3">Maintains user session</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-3">Session</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-3">Essential</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 p-3">theme_preference</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-3">Remembers theme choice</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-3">1 year</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-3">Functional</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 p-3">analytics_consent</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-3">Tracks consent status</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-3">1 year</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-3">Essential</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 p-3">_ga</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-3">Google Analytics tracking</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-3">2 years</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-3">Analytics</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 p-3">performance_data</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-3">Website performance metrics</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-3">30 days</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-3">Performance</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Third-Party Cookies</h2>
                <p className="mb-4">
                  Some cookies on our website are set by third-party services. We use these services to enhance 
                  functionality and analyze website performance:
                </p>
                
                <h3 className="text-xl font-semibold mb-3">4.1 Google Analytics</h3>
                <p className="mb-4">
                  We may use Google Analytics to understand how our website is used. Google Analytics uses cookies 
                  to collect information about your interactions with our website.
                </p>
                <p className="mb-4">
                  Learn more: <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>
                </p>

                <h3 className="text-xl font-semibold mb-3">4.2 Content Delivery Networks (CDN)</h3>
                <p className="mb-4">
                  We use CDN services to deliver website content efficiently. These services may set cookies to 
                  optimize content delivery.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Managing Your Cookie Preferences</h2>
                
                <h3 className="text-xl font-semibold mb-3">5.1 Browser Settings</h3>
                <p className="mb-4">
                  Most web browsers allow you to manage cookie preferences through their settings. You can:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Block all cookies</li>
                  <li>Block third-party cookies only</li>
                  <li>Delete existing cookies</li>
                  <li>Set preferences for specific websites</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">5.2 Browser-Specific Instructions</h3>
                <div className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Chrome:</h4>
                    <p>Settings → Privacy and Security → Cookies and other site data</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Firefox:</h4>
                    <p>Settings → Privacy & Security → Cookies and Site Data</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Safari:</h4>
                    <p>Preferences → Privacy → Manage Website Data</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Edge:</h4>
                    <p>Settings → Cookies and site permissions → Cookies and site data</p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3 mt-6">5.3 Opt-Out Links</h3>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. Impact of Disabling Cookies</h2>
                <p className="mb-4">
                  While you can browse our website with cookies disabled, please note that disabling certain 
                  cookies may affect website functionality:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Some forms may not work properly</li>
                  <li>User preferences will not be saved</li>
                  <li>Website performance may be reduced</li>
                  <li>Some interactive features may be unavailable</li>
                  <li>We won't be able to provide personalized experiences</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Mobile Apps and Devices</h2>
                <p className="mb-4">
                  If you access our website through a mobile app or device, similar tracking technologies may be used. 
                  You can manage these preferences through your device settings:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li><strong>iOS:</strong> Settings → Privacy → Tracking</li>
                  <li><strong>Android:</strong> Settings → Privacy → Ads</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. Data Retention</h2>
                <p className="mb-4">
                  Different cookies have different retention periods:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                  <li><strong>Persistent cookies:</strong> Remain until expiration date or manual deletion</li>
                  <li><strong>Analytics data:</strong> Typically retained for 26 months (Google Analytics default)</li>
                  <li><strong>Performance data:</strong> Usually retained for 30-90 days</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">9. Updates to This Policy</h2>
                <p className="mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or 
                  applicable laws. We will notify you of any material changes by:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Posting the updated policy on our website</li>
                  <li>Updating the "Last updated" date</li>
                  <li>Sending email notifications for significant changes</li>
                  <li>Displaying prominent notices on our website</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                <div className="bg-muted/30 p-6 rounded-lg">
                  <p className="mb-2"><strong>TechVantage Solutions</strong></p>
                  <p className="mb-2">Email: privacy@techvantagesolutions.com</p>
                  <p className="mb-2">Phone: +91-141-XXXXXXX</p>
                  <p className="mb-2">Address: Jaipur, Rajasthan, India</p>
                </div>
              </div>

              <div className="mb-8 bg-yellow-50 dark:bg-yellow-950/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h2 className="text-2xl font-bold mb-4 text-yellow-800 dark:text-yellow-200">Important Note</h2>
                <p className="text-yellow-700 dark:text-yellow-300 mb-2">
                  Your privacy is important to us. We only use cookies that are necessary for website functionality 
                  or that you have explicitly consented to.
                </p>
                <p className="text-yellow-700 dark:text-yellow-300">
                  You can withdraw your consent at any time by adjusting your browser settings or contacting us directly.
                </p>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}