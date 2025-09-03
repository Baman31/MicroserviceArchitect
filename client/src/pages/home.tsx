import { Helmet } from "react-helmet-async";
import Hero from "@/components/sections/hero";
import ServicesOverview from "@/components/sections/services-overview";
import Mission from "@/components/sections/mission";
import Statistics from "@/components/sections/statistics";
import Testimonials from "@/components/sections/testimonials";
import PortfolioPreview from "@/components/sections/portfolio-preview";
import CTA from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>TechVantage Solutions - Professional IT Services in Jaipur, Rajasthan</title>
        <meta name="description" content="Leading IT services company in Jaipur offering web development, cloud solutions, DevOps, SEO, and digital transformation services for businesses across Rajasthan and India." />
        <meta property="og:title" content="TechVantage Solutions - Professional IT Services in Jaipur" />
        <meta property="og:description" content="Empowering businesses across Jaipur and India with cutting-edge web development, cloud solutions, and digital transformation services." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div data-testid="home-page">
        <Hero />
        <ServicesOverview />
        <Mission />
        <Statistics />
        <Testimonials />
        <PortfolioPreview />
        <CTA />
      </div>
    </>
  );
}
