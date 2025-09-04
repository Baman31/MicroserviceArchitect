import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown, Zap } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const services = [
  { name: "Web Development", href: "/services/web-development" },
  { name: "Web Applications", href: "/services/web-applications" },
  { name: "SEO & Digital Marketing", href: "/services/seo-marketing" },
  { name: "Cloud Solutions", href: "/services/cloud-solutions" },
  { name: "DevOps Services", href: "/services/devops" },
  { name: "Web Optimization", href: "/services/optimization" },
];

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path: string) => location === path;

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glassmorphism shadow-2xl border-b border-border/20' 
          : 'bg-transparent'
      }`} 
      data-testid="header"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group" data-testid="logo-link">
              <div className="p-3 rounded-xl gradient-primary mr-3 group-hover:shadow-glow group-hover:scale-110 transition-all duration-300 animate-glow-pulse">
                <Zap className="h-8 w-8 text-white drop-shadow-lg" />
              </div>
              <div>
                <span className="text-3xl font-black font-poppins text-gradient drop-shadow-lg tracking-tight">TechVantage</span>
                <span className="text-base font-bold text-muted-foreground ml-2 block -mt-1 drop-shadow-sm">Solutions</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-1">
              <Link 
                href="/" 
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 hover-lift ${
                  isActive("/") 
                    ? "text-primary bg-primary/10 shadow-glow" 
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
                data-testid="nav-home"
              >
                Home
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger 
                  className="text-foreground hover:text-primary hover:bg-primary/5 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 flex items-center hover-lift" 
                  data-testid="nav-services"
                >
                  Services <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 glassmorphism border-border/20 rounded-2xl p-2">
                  {services.map((service) => (
                    <DropdownMenuItem key={service.href} asChild className="rounded-xl">
                      <Link 
                        href={service.href} 
                        className="w-full p-3 text-sm hover:bg-primary/10 hover:text-primary transition-colors" 
                        data-testid={`nav-service-${service.href.split('/').pop()}`}
                      >
                        {service.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Link 
                href="/portfolio" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive("/portfolio") 
                    ? "text-primary bg-primary/10 shadow-glow" 
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
                data-testid="nav-portfolio"
              >
                Portfolio
              </Link>
              
              <Link 
                href="/about" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive("/about") 
                    ? "text-primary bg-primary/10 shadow-glow" 
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
                data-testid="nav-about"
              >
                About
              </Link>
              
              <Link 
                href="/blog" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive("/blog") 
                    ? "text-primary bg-primary/10 shadow-glow" 
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
                data-testid="nav-blog"
              >
                Blog
              </Link>
              
              <Link 
                href="/contact" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive("/contact") 
                    ? "text-primary bg-primary/10 shadow-glow" 
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
                data-testid="nav-contact"
              >
                Contact
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              asChild 
              className="modern-button px-6 py-2 rounded-xl font-bold shadow-lg hover:shadow-glow-secondary hover-lift transition-all duration-300"
              data-testid="button-get-quote"
            >
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>
          
          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center space-x-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-xl hover:bg-primary/10 hover:shadow-glow transition-all duration-300"
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[380px] glassmorphism border-l border-border/20 p-0">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="p-6 border-b border-border/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="p-3 rounded-xl gradient-primary mr-3 animate-glow-pulse">
                          <Zap className="h-6 w-6 text-white drop-shadow-lg" />
                        </div>
                        <div>
                          <span className="text-xl font-black text-gradient drop-shadow-lg">TechVantage</span>
                          <span className="text-sm font-bold text-muted-foreground block -mt-0.5 drop-shadow-sm">Solutions</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Navigate through our services and solutions</p>
                  </div>
                  
                  {/* Navigation Content */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <Link 
                      href="/" 
                      onClick={() => setIsOpen(false)}
                      className={`modern-card p-4 rounded-2xl text-lg font-semibold transition-all duration-500 hover:shadow-glow group ${
                        isActive("/") 
                          ? "text-primary bg-primary/10 shadow-glow" 
                          : "hover:text-primary hover:bg-primary/5"
                      }`}
                      data-testid="mobile-nav-home"
                    >
                      <div className="flex items-center justify-between">
                        <span>Home</span>
                        <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </Link>
                    
                    <div className="space-y-4">
                      <div className="glassmorphism p-4 rounded-2xl">
                        <p className="text-lg font-bold text-gradient mb-4">Our Services</p>
                        <div className="grid grid-cols-1 gap-3">
                          {services.map((service, index) => (
                            <Link 
                              key={service.href}
                              href={service.href} 
                              onClick={() => setIsOpen(false)}
                              className="block p-3 hover:bg-primary/10 rounded-xl transition-all duration-300 hover:shadow-glow group"
                              data-testid={`mobile-nav-service-${service.href.split('/').pop()}`}
                              style={{ animationDelay: `${index * 0.1}s` }}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium group-hover:text-primary transition-colors">{service.name}</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <Link 
                        href="/portfolio" 
                        onClick={() => setIsOpen(false)}
                        className={`modern-card p-4 rounded-2xl text-lg font-semibold transition-all duration-500 hover:shadow-glow group ${
                          isActive("/portfolio") 
                            ? "text-primary bg-primary/10 shadow-glow" 
                            : "hover:text-primary hover:bg-primary/5"
                        }`}
                        data-testid="mobile-nav-portfolio"
                      >
                        <div className="flex items-center justify-between">
                          <span>Portfolio</span>
                          <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      </Link>
                      
                      <Link 
                        href="/about" 
                        onClick={() => setIsOpen(false)}
                        className={`modern-card p-4 rounded-2xl text-lg font-semibold transition-all duration-500 hover:shadow-glow group ${
                          isActive("/about") 
                            ? "text-primary bg-primary/10 shadow-glow" 
                            : "hover:text-primary hover:bg-primary/5"
                        }`}
                        data-testid="mobile-nav-about"
                      >
                        <div className="flex items-center justify-between">
                          <span>About</span>
                          <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      </Link>
                      
                      <Link 
                        href="/contact" 
                        onClick={() => setIsOpen(false)}
                        className={`modern-card p-4 rounded-2xl text-lg font-semibold transition-all duration-500 hover:shadow-glow group ${
                          isActive("/contact") 
                            ? "text-primary bg-primary/10 shadow-glow" 
                            : "hover:text-primary hover:bg-primary/5"
                        }`}
                        data-testid="mobile-nav-contact"
                      >
                        <div className="flex items-center justify-between">
                          <span>Contact</span>
                          <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="p-6 border-t border-border/20 space-y-4">
                    <Button 
                      asChild 
                      className="w-full modern-button font-semibold shadow-lg hover:shadow-glow-secondary transition-all duration-300"
                      data-testid="mobile-nav-get-quote"
                    >
                      <Link href="/contact" onClick={() => setIsOpen(false)}>Get Free Quote</Link>
                    </Button>
                    
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">
                        Made with ❤️ in Jaipur
                      </p>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
