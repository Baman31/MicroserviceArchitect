import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown, Zap, Moon, Sun } from "lucide-react";
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
  const [isDarkMode, setIsDarkMode] = useState(true);

  const isActive = (path: string) => location === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

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
              <div className="p-2 rounded-xl gradient-primary mr-3 group-hover:shadow-glow transition-all duration-300">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold font-poppins text-gradient">TechVantage</span>
                <span className="text-sm text-muted-foreground ml-2 block -mt-1">Solutions</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-1">
              <Link 
                href="/" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
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
                  className="text-foreground hover:text-primary hover:bg-primary/5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center" 
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
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-xl hover:bg-primary/10 hover:shadow-glow transition-all duration-300"
              data-testid="button-theme-toggle"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button 
              asChild 
              className="modern-button px-6 py-2 rounded-xl font-medium shadow-lg hover:shadow-glow-secondary transition-all duration-300"
              data-testid="button-get-quote"
            >
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>
          
          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-xl hover:bg-primary/10 hover:shadow-glow transition-all duration-300"
              data-testid="button-theme-toggle-mobile"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
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
              <SheetContent side="right" className="w-[320px] glassmorphism">
                <div className="flex flex-col space-y-6 mt-8">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gradient mb-2">Navigation</h3>
                    <div className="w-12 h-0.5 gradient-primary mx-auto rounded-full"></div>
                  </div>
                  
                  <Link 
                    href="/" 
                    onClick={() => setIsOpen(false)}
                    className={`p-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                      isActive("/") 
                        ? "text-primary bg-primary/10 shadow-glow" 
                        : "hover:text-primary hover:bg-primary/5"
                    }`}
                    data-testid="mobile-nav-home"
                  >
                    Home
                  </Link>
                  
                  <div className="space-y-3">
                    <p className="text-lg font-semibold text-muted-foreground px-4">Services</p>
                    {services.map((service) => (
                      <Link 
                        key={service.href}
                        href={service.href} 
                        onClick={() => setIsOpen(false)}
                        className="block pl-8 pr-4 py-2 text-sm hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300"
                        data-testid={`mobile-nav-service-${service.href.split('/').pop()}`}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                  
                  <Link 
                    href="/portfolio" 
                    onClick={() => setIsOpen(false)}
                    className={`p-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                      isActive("/portfolio") 
                        ? "text-primary bg-primary/10 shadow-glow" 
                        : "hover:text-primary hover:bg-primary/5"
                    }`}
                    data-testid="mobile-nav-portfolio"
                  >
                    Portfolio
                  </Link>
                  
                  <Link 
                    href="/about" 
                    onClick={() => setIsOpen(false)}
                    className={`p-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                      isActive("/about") 
                        ? "text-primary bg-primary/10 shadow-glow" 
                        : "hover:text-primary hover:bg-primary/5"
                    }`}
                    data-testid="mobile-nav-about"
                  >
                    About
                  </Link>
                  
                  <Link 
                    href="/blog" 
                    onClick={() => setIsOpen(false)}
                    className={`p-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                      isActive("/blog") 
                        ? "text-primary bg-primary/10 shadow-glow" 
                        : "hover:text-primary hover:bg-primary/5"
                    }`}
                    data-testid="mobile-nav-blog"
                  >
                    Blog
                  </Link>
                  
                  <Link 
                    href="/contact" 
                    onClick={() => setIsOpen(false)}
                    className={`p-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                      isActive("/contact") 
                        ? "text-primary bg-primary/10 shadow-glow" 
                        : "hover:text-primary hover:bg-primary/5"
                    }`}
                    data-testid="mobile-nav-contact"
                  >
                    Contact
                  </Link>
                  
                  <Button 
                    asChild 
                    className="modern-button mt-6 mx-4 px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-glow-secondary transition-all duration-300" 
                    data-testid="mobile-button-get-quote"
                  >
                    <Link href="/contact" onClick={() => setIsOpen(false)}>Get Quote</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
