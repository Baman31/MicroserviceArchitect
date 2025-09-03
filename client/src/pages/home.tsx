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
        <title>TechVantage Solutions - Leading IT Services Company in Jaipur, Rajasthan | Web Development, Cloud Solutions & Digital Transformation</title>
        <meta name="description" content="🚀 TechVantage Solutions: Premier IT services in Jaipur, Rajasthan. Expert web development, cloud solutions, DevOps, SEO & digital transformation. 100+ projects delivered. Contact us for free consultation!" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TechVantage Solutions - Leading IT Services Company in Jaipur, Rajasthan" />
        <meta property="og:description" content="Premier IT services company in Jaipur offering expert web development, cloud solutions, DevOps, SEO, and complete digital transformation services for businesses across Rajasthan and India." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630" />
        <meta property="og:url" content="/" />
        <meta property="og:site_name" content="TechVantage Solutions" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TechVantage Solutions - Leading IT Services Company in Jaipur, Rajasthan" />
        <meta name="twitter:description" content="Premier IT services company in Jaipur offering expert web development, cloud solutions, DevOps, SEO, and complete digital transformation services." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630" />

        {/* Additional SEO */}
        <meta name="keywords" content="IT services Jaipur, web development Rajasthan, cloud solutions Jaipur, DevOps services, SEO company Jaipur, digital transformation, website development, React development, Node.js development, professional IT consulting" />
        <link rel="canonical" href="/" />
        
        {/* Local Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "TechVantage Solutions",
            "image": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630",
            "description": "Leading IT services company in Jaipur offering web development, cloud solutions, DevOps, SEO, and digital transformation services for businesses across Rajasthan and India.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Malviya Nagar",
              "addressLocality": "Jaipur",
              "addressRegion": "Rajasthan",
              "postalCode": "302017",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "26.9124",
              "longitude": "75.7873"
            },
            "telephone": "+919876543210",
            "email": "hello@techvantagesolutions.com",
            "url": "/",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "09:00",
              "closes": "18:00"
            },
            "serviceArea": {
              "@type": "State",
              "name": "Rajasthan"
            },
            "priceRange": "$$",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "bestRating": "5",
              "worstRating": "1",
              "ratingCount": "50"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "IT Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Web Development",
                    "description": "Custom website development using modern technologies like React, Node.js, and responsive design."
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Cloud Solutions",
                    "description": "Secure and scalable cloud infrastructure solutions for modern businesses."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "DevOps Services",
                    "description": "Streamlined development and deployment with automated CI/CD pipelines."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "SEO & Digital Marketing",
                    "description": "Data-driven SEO strategies and digital marketing to increase online visibility."
                  }
                }
              ]
            }
          })}
        </script>

        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "TechVantage Solutions",
            "alternateName": "TechVantage IT Services",
            "url": "/",
            "logo": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+919876543210",
              "contactType": "customer service",
              "areaServed": "IN",
              "availableLanguage": ["English", "Hindi"]
            },
            "sameAs": [
              "https://www.linkedin.com/company/techvantage-solutions",
              "https://twitter.com/techvantage_in"
            ],
            "foundingDate": "2022",
            "numberOfEmployees": "10-50",
            "slogan": "Building Tomorrow's Solutions Today"
          })}
        </script>
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
