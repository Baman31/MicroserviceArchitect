import { Helmet } from "react-helmet-async";
import ServiceComparison from "@/components/ui/service-comparison";

export default function ServicesComparisonPage() {
  return (
    <>
      <Helmet>
        <title>Service Plans Comparison - TechVantage Solutions | Compare IT Service Packages</title>
        <meta name="description" content="Compare our comprehensive IT service plans. Choose from Basic, Professional, or Enterprise packages tailored to your business needs and budget." />
      </Helmet>
      
      <div className="min-h-screen bg-background" data-testid="services-comparison-page">
        {/* Hero Section */}
        <section className="py-24 lg:py-32 hero-gradient text-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-5xl lg:text-7xl font-black font-poppins mb-8 leading-tight drop-shadow-2xl" data-testid="comparison-title">
              <span className="animate-fade-in-up">Choose Your</span>
              <br />
              <span className="text-gradient-accent animate-fade-in-up drop-shadow-lg" style={{ animationDelay: '0.2s' }}>Perfect Plan</span>
            </h1>

            <p className="text-xl lg:text-2xl font-semibold mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }} data-testid="comparison-description">
              Compare our comprehensive service packages and find the perfect solution for your business needs and budget.
            </p>
          </div>
        </section>

        {/* Service Comparison Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ServiceComparison />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-black font-poppins mb-6 text-gradient" data-testid="cta-title">
              Still Not Sure Which Plan is Right for You?
            </h2>
            <p className="text-xl text-muted-foreground mb-8" data-testid="cta-description">
              Schedule a free consultation with our experts. We'll analyze your requirements and recommend the best solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-bold rounded-md hover:bg-primary/90 transition-colors"
                data-testid="button-schedule-consultation"
              >
                Schedule Free Consultation
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 border border-primary text-primary font-bold rounded-md hover:bg-primary/10 transition-colors"
                data-testid="button-get-quote"
              >
                Get Custom Quote
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}