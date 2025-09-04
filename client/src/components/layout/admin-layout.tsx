import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutDashboard, Users, Shield, Settings, MessageSquare, BarChart3, FileText, Briefcase, Menu, Home, LogOut, Activity } from "lucide-react";

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
      { title: "Admin Accounts", href: "/admin/admins", icon: Shield },
      { title: "Activity Logs", href: "/admin/activity", icon: Activity },
    ]
  },
  {
    title: "Content Management",
    items: [
      { title: "Projects", href: "/admin/projects", icon: Briefcase },
      { title: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
      { title: "Blog Posts", href: "/admin/blog", icon: FileText },
    ]
  },
  {
    title: "System",
    items: [
      { title: "Settings", href: "/admin/settings", icon: Settings },
      { title: "Communications", href: "/admin/communications", icon: MessageSquare },
    ]
  }
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return location === "/admin" || location === "/admin/";
    }
    return location.startsWith(href);
  };

  const NavigationContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Admin Portal</h2>
            <p className="text-xs text-muted-foreground">TechVantage Solutions</p>
          </div>
        </div>
        <Separator className="mt-4" />
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-6">
        <nav className="space-y-8">
          {ADMIN_NAVIGATION.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive(item.href) ? "secondary" : "ghost"}
                      className={`w-full justify-start gap-3 ${
                        isActive(item.href) ? "bg-secondary" : ""
                      }`}
                      onClick={() => setSidebarOpen(false)}
                      data-testid={`nav-${item.href.replace(/\//g, '-')}`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                      {isActive(item.href) && (
                        <Badge variant="outline" className="ml-auto text-xs">
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
      <div className="p-6">
        <Separator className="mb-4" />
        <div className="space-y-2">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start gap-3" data-testid="nav-home">
              <Home className="h-4 w-4" />
              Back to Website
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive" data-testid="admin-logout">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:bg-card">
        <NavigationContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-80">
          <NavigationContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 lg:ml-80">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-4 p-4 border-b bg-card">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="mobile-menu-trigger">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </Sheet>
          <h1 className="text-xl font-semibold">Admin Portal</h1>
        </div>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}