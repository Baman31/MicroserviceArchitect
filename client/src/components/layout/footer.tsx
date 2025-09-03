import { Link } from "wouter";
import { MapPin, Phone, Mail, Linkedin, Twitter, Facebook, Instagram, Zap, ArrowUp, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden" data-testid="footer">
      {/* Background with gradient */}
      <div className="absolute inset-0 gradient-primary opacity-90"></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }}></div>
      
      <div className="relative z-10 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-8" data-testid="footer-logo">
                <div className="flex items-center group cursor-pointer">
                  <div className="p-2 rounded-xl bg-white/10 mr-3 group-hover:bg-white/20 transition-all duration-300">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold font-poppins text-white">TechVantage</span>
                    <span className="text-sm text-white/80 block -mt-1">Solutions</span>
                  </div>
                </div>
              </div>
              <p className="text-white/90 mb-8 leading-relaxed" data-testid="footer-description">
                Your trusted digital engineering partner in Rajasthan, delivering innovative IT solutions that drive business growth and digital transformation.
              </p>
              
              {/* Enhanced Social Links */}
              <div className="flex space-x-4" data-testid="social-links">
                <a href="#" className="glassmorphism w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/20 hover:shadow-glow transition-all duration-300 group" data-testid="social-linkedin">
                  <Linkedin className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="glassmorphism w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/20 hover:shadow-glow transition-all duration-300 group" data-testid="social-twitter">
                  <Twitter className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="glassmorphism w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/20 hover:shadow-glow transition-all duration-300 group" data-testid="social-facebook">
                  <Facebook className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="glassmorphism w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/20 hover:shadow-glow transition-all duration-300 group" data-testid="social-instagram">
                  <Instagram className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-xl font-bold font-poppins mb-6 text-white" data-testid="footer-services-title">
                Our Services
              </h3>
              <ul className="space-y-3">
                <li><Link href="/services/web-development" className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 block" data-testid="footer-service-web-dev">→ Web Development</Link></li>
                <li><Link href="/services/web-applications" className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 block" data-testid="footer-service-web-apps">→ Web Applications</Link></li>
                <li><Link href="/services/seo-marketing" className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 block" data-testid="footer-service-seo">→ SEO & Marketing</Link></li>
                <li><Link href="/services/cloud-solutions" className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 block" data-testid="footer-service-cloud">→ Cloud Solutions</Link></li>
                <li><Link href="/services/devops" className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 block" data-testid="footer-service-devops">→ DevOps Services</Link></li>
                <li><Link href="/services/optimization" className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 block" data-testid="footer-service-optimization">→ Web Optimization</Link></li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h3 className="text-xl font-bold font-poppins mb-6 text-white" data-testid="footer-company-title">
                Company
              </h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 block" data-testid="footer-about">→ About Us</Link></li>
                <li><Link href="/portfolio" className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 block" data-testid="footer-portfolio">→ Portfolio</Link></li>
                <li><Link href="/blog" className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 block" data-testid="footer-blog">→ Blog</Link></li>
                <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 block" data-testid="footer-careers">→ Careers</a></li>
                <li><Link href="/contact" className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 block" data-testid="footer-contact">→ Contact</Link></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold font-poppins mb-6 text-white" data-testid="footer-contact-title">
                Get In Touch
              </h3>
              <div className="space-y-4">
                <div className="glassmorphism p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group" data-testid="footer-address">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 mt-1 flex-shrink-0 text-white/80 group-hover:text-white transition-colors" />
                    <div className="text-white/90">
                      <div className="font-medium">Malviya Nagar</div>
                      <div className="text-sm text-white/70">Jaipur, Rajasthan 302017</div>
                    </div>
                  </div>
                </div>
                
                <div className="glassmorphism p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group" data-testid="footer-phone">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 flex-shrink-0 text-white/80 group-hover:text-white transition-colors" />
                    <span className="text-white/90 font-medium">+91 9876543210</span>
                  </div>
                </div>
                
                <div className="glassmorphism p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group" data-testid="footer-email">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 flex-shrink-0 text-white/80 group-hover:text-white transition-colors" />
                    <span className="text-white/90 font-medium">hello@techvantagesolutions.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="border-t border-white/20 pt-8 mt-12">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="text-white/70 text-center lg:text-left">
                <p className="flex items-center justify-center lg:justify-start gap-2">
                  &copy; 2024 TechVantage Solutions. Made with <Heart className="h-4 w-4 text-red-400" /> in Jaipur
                </p>
                <div className="flex gap-6 mt-2 justify-center lg:justify-start">
                  <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Privacy Policy</a>
                  <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Terms of Service</a>
                  <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Cookie Policy</a>
                </div>
              </div>
              
              {/* Scroll to top */}
              <Button 
                onClick={scrollToTop}
                className="glassmorphism hover:bg-white/20 hover:shadow-glow w-12 h-12 rounded-xl transition-all duration-300 group"
                size="icon"
                data-testid="scroll-to-top"
              >
                <ArrowUp className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}