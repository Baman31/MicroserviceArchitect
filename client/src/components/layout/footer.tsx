import { Link } from "wouter";
import { MapPin, Phone, Mail, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-6" data-testid="footer-logo">
              <span className="text-2xl font-bold font-poppins text-white">TechVantage</span>
              <span className="text-sm text-gray-300 ml-2">Solutions</span>
            </div>
            <p className="text-gray-300 mb-6" data-testid="footer-description">
              Your trusted digital engineering partner in Rajasthan, delivering innovative IT solutions for business growth.
            </p>
            <div className="flex space-x-4" data-testid="social-links">
              <a href="#" className="text-gray-300 hover:text-white transition-colors" data-testid="social-linkedin">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" data-testid="social-twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" data-testid="social-facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" data-testid="social-instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold font-poppins mb-4 text-white" data-testid="footer-services-title">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services/web-development" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-service-web-dev">Web Development</Link></li>
              <li><Link href="/services/web-applications" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-service-web-apps">Web Applications</Link></li>
              <li><Link href="/services/seo-marketing" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-service-seo">SEO & Marketing</Link></li>
              <li><Link href="/services/cloud-solutions" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-service-cloud">Cloud Solutions</Link></li>
              <li><Link href="/services/devops" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-service-devops">DevOps Services</Link></li>
              <li><Link href="/services/optimization" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-service-optimization">Web Optimization</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold font-poppins mb-4 text-white" data-testid="footer-company-title">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-about">About Us</Link></li>
              <li><Link href="/portfolio" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-portfolio">Portfolio</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-blog">Blog</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-careers">Careers</a></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors" data-testid="footer-contact">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold font-poppins mb-4 text-white" data-testid="footer-contact-title">Contact Info</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start" data-testid="footer-address">
                <MapPin className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <div>Malviya Nagar</div>
                  <div>Jaipur, Rajasthan 302017</div>
                </div>
              </div>
              <div className="flex items-center" data-testid="footer-phone">
                <Phone className="h-5 w-5 mr-3 flex-shrink-0" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center" data-testid="footer-email">
                <Mail className="h-5 w-5 mr-3 flex-shrink-0" />
                <span>hello@techvantagesolutions.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300" data-testid="footer-copyright">
          <p>&copy; 2024 TechVantage Solutions. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
