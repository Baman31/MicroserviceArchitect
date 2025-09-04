import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import WhatsAppChat from "@/components/ui/whatsapp-chat";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { initGA } from "./lib/analytics";
import { initSentry } from "./lib/sentry";
import { initPerformanceMonitoring } from "./lib/performance";
import { ErrorBoundary, setupGlobalErrorHandlers } from "@/components/error-boundary";
import { useAnalytics } from "./hooks/use-analytics";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import WebDevelopment from "@/pages/services/web-development";
import WebApplications from "@/pages/services/web-applications";
import SeoMarketing from "@/pages/services/seo-marketing";
import CloudSolutions from "@/pages/services/cloud-solutions";
import DevOps from "@/pages/services/devops";
import Optimization from "@/pages/services/optimization";
import Portfolio from "@/pages/portfolio";
import About from "@/pages/about";
import Blog from "@/pages/blog";
import Contact from "@/pages/contact";
import ServicesComparison from "@/pages/services-comparison";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import CookiePolicy from "@/pages/cookie-policy";
import AnalyticsDashboard from "@/pages/analytics-dashboard";
import Booking from "@/pages/booking";
import TestimonialsAdmin from "@/pages/admin/testimonials";
import NotFound from "@/pages/not-found";

function Router() {
  useAnalytics();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services/web-development" component={WebDevelopment} />
          <Route path="/services/web-applications" component={WebApplications} />
          <Route path="/services/seo-marketing" component={SeoMarketing} />
          <Route path="/services/cloud-solutions" component={CloudSolutions} />
          <Route path="/services/devops" component={DevOps} />
          <Route path="/services/optimization" component={Optimization} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/about" component={About} />
          <Route path="/blog" component={Blog} />
          <Route path="/contact" component={Contact} />
          <Route path="/services-comparison" component={ServicesComparison} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms-of-service" component={TermsOfService} />
          <Route path="/cookie-policy" component={CookiePolicy} />
          <Route path="/analytics" component={AnalyticsDashboard} />
          <Route path="/booking" component={Booking} />
          <Route path="/admin/testimonials" component={TestimonialsAdmin} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  useEffect(() => {
    // Initialize error tracking and monitoring
    initSentry();
    setupGlobalErrorHandlers();
    initPerformanceMonitoring();
    
    // Initialize Google Analytics
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Router />
          <Toaster />
          <WhatsAppChat />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
