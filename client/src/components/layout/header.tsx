import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
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

  const isActive = (path: string) => location === path;

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm" data-testid="header">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0" data-testid="logo-link">
              <span className="text-2xl font-bold font-poppins text-primary">TechVantage</span>
              <span className="text-sm text-muted-foreground ml-2">Solutions</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                href="/" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/") ? "text-primary" : "text-foreground hover:text-primary"
                }`}
                data-testid="nav-home"
              >
                Home
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors flex items-center" data-testid="nav-services">
                  Services <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {services.map((service) => (
                    <DropdownMenuItem key={service.href} asChild>
                      <Link href={service.href} className="w-full" data-testid={`nav-service-${service.href.split('/').pop()}`}>
                        {service.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Link 
                href="/portfolio" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/portfolio") ? "text-primary" : "text-foreground hover:text-primary"
                }`}
                data-testid="nav-portfolio"
              >
                Portfolio
              </Link>
              
              <Link 
                href="/about" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/about") ? "text-primary" : "text-foreground hover:text-primary"
                }`}
                data-testid="nav-about"
              >
                About
              </Link>
              
              <Link 
                href="/blog" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/blog") ? "text-primary" : "text-foreground hover:text-primary"
                }`}
                data-testid="nav-blog"
              >
                Blog
              </Link>
              
              <Link 
                href="/contact" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/contact") ? "text-primary" : "text-foreground hover:text-primary"
                }`}
                data-testid="nav-contact"
              >
                Contact
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <Button asChild data-testid="button-get-quote">
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link 
                    href="/" 
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium hover:text-primary transition-colors"
                    data-testid="mobile-nav-home"
                  >
                    Home
                  </Link>
                  
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-muted-foreground">Services</p>
                    {services.map((service) => (
                      <Link 
                        key={service.href}
                        href={service.href} 
                        onClick={() => setIsOpen(false)}
                        className="block pl-4 text-sm hover:text-primary transition-colors"
                        data-testid={`mobile-nav-service-${service.href.split('/').pop()}`}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                  
                  <Link 
                    href="/portfolio" 
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium hover:text-primary transition-colors"
                    data-testid="mobile-nav-portfolio"
                  >
                    Portfolio
                  </Link>
                  
                  <Link 
                    href="/about" 
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium hover:text-primary transition-colors"
                    data-testid="mobile-nav-about"
                  >
                    About
                  </Link>
                  
                  <Link 
                    href="/blog" 
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium hover:text-primary transition-colors"
                    data-testid="mobile-nav-blog"
                  >
                    Blog
                  </Link>
                  
                  <Link 
                    href="/contact" 
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium hover:text-primary transition-colors"
                    data-testid="mobile-nav-contact"
                  >
                    Contact
                  </Link>
                  
                  <Button asChild className="mt-4" data-testid="mobile-button-get-quote">
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
