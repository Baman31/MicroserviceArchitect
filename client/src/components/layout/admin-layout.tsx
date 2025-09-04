import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutDashboard, Users, Shield, Settings, MessageSquare, BarChart3, FileText, Briefcase, Menu, Home, LogOut, Activity, Sparkles } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const ADMIN_NAVIGATION = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { title: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    ]
  },
  {
    title: "User Management",
    items: [
      { title: "All Users", href: "/admin/users", icon: Users },
      { title: "Activity Logs", href: "/admin/activity-logs", icon: Activity },
    ]
  },
  {
    title: "Content Management",
    items: [
      { title: "Content", href: "/admin/content", icon: Briefcase },
    ]
  },
  {
    title: "Communication",
    items: [
      { title: "Messages", href: "/admin/communications", icon: MessageSquare },
    ]
  },
  {
    title: "System",
    items: [
      { title: "Settings", href: "/admin/settings", icon: Settings },
    ]
  }
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/secure/admin/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always redirect to login regardless of API call result
      setLocation('/admin/login');
    }
  };

  const isActive = (href: string) => {
    if (href === "/admin") {
      return location === "/admin" || location === "/admin/";
    }
    return location.startsWith(href);
  };

  const NavigationContent = () => (
    <div className="flex flex-col h-full relative overflow-hidden glassmorphism border-r border-primary/20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-1s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-secondary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute top-10 right-10 w-2 h-2 bg-primary/30 rounded-full animate-particle-float" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute bottom-20 left-10 w-3 h-3 bg-secondary/20 rounded-full animate-particle-float" style={{ animationDelay: '-4s' }}></div>
      </div>
      
      {/* Header */}
      <div className="p-6 relative z-10">
        <div className="flex items-center gap-3 animate-fade-in-up">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-glow animate-glow-pulse">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-foreground">Admin Portal</h2>
            <p className="text-sm text-foreground/70 font-semibold">TechVantage Solutions</p>
          </div>
        </div>
        <div className="glassmorphism px-4 py-2 rounded-full inline-flex items-center space-x-2 mt-4 animate-fade-in-up bg-primary/20" style={{ animationDelay: '0.2s' }}>
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-xs font-bold text-foreground">System Control</span>
        </div>
        <Separator className="mt-4 bg-primary/20" />
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-6 relative z-10">
        <nav className="space-y-8">
          {ADMIN_NAVIGATION.map((section, sectionIndex) => (
            <div key={section.title} className="animate-fade-in-up" style={{ animationDelay: `${0.1 * (sectionIndex + 1)}s` }}>
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <div className="w-4 h-0.5 bg-primary rounded"></div>
                {section.title}
              </h3>
              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start gap-3 group transition-colors duration-200 ${
                        isActive(item.href) 
                          ? "glassmorphism bg-primary/15 border border-primary/30 text-primary" 
                          : "hover:bg-primary/10 text-foreground hover:text-primary"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                      data-testid={`nav-${item.href.replace(/\//g, '-')}`}
                    >
                      <div className={`p-1.5 rounded-lg transition-all duration-300 ${
                        isActive(item.href) 
                          ? "bg-primary/20 text-primary" 
                          : "bg-primary/10 text-foreground group-hover:bg-primary/15 group-hover:text-primary"
                      }`}>
                        <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="font-semibold text-inherit">{item.title}</span>
                      {isActive(item.href) && (
                        <Badge variant="outline" className="ml-auto text-xs bg-primary/10 text-primary border-primary/30 animate-glow-pulse">
                          Active
                        </Badge>
                      )}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-6 relative z-10">
        <Separator className="mb-4 bg-primary/20" />
        <div className="space-y-3">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start gap-3 group transition-colors duration-200 hover:bg-secondary/10 text-foreground hover:text-secondary" data-testid="nav-home">
              <div className="p-1.5 rounded-lg bg-secondary/10 text-secondary group-hover:bg-secondary/20 transition-all duration-300">
                <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-semibold text-inherit">Back to Website</span>
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 group transition-colors duration-200 hover:bg-destructive/10 text-destructive hover:text-destructive" 
            data-testid="admin-logout"
            onClick={handleLogout}
          >
            <div className="p-1.5 rounded-lg bg-destructive/10 text-destructive group-hover:bg-destructive/20 transition-all duration-300">
              <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-semibold text-inherit">Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: 'var(--gradient-bg)' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl animate-float animate-morph"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-secondary/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-10 left-10 w-4 h-4 bg-primary/10 rounded-full animate-particle-float" style={{ animationDelay: '-1s' }}></div>
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-secondary/15 rounded-full animate-particle-float" style={{ animationDelay: '-3s' }}></div>
      </div>
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:inset-y-0 relative z-10">
        <NavigationContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-80 glassmorphism border border-primary/20">
          <NavigationContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 lg:ml-80 relative z-10">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-4 p-4 glassmorphism border-b border-primary/20 backdrop-blur-xl">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover-lift glassmorphism hover:bg-primary/10 hover:border hover:border-primary/20" data-testid="mobile-menu-trigger">
                <Menu className="h-5 w-5 text-primary" />
              </Button>
            </SheetTrigger>
          </Sheet>
          <h1 className="text-xl font-black text-gradient flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Admin Portal
          </h1>
        </div>

        {/* Page Content */}
        <main className="flex-1 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}