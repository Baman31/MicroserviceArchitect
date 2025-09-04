import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Shield, Activity, Settings, Bell, BarChart3, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Sparkles, Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const COLORS = [
  'hsl(217, 91%, 60%)', // Primary blue
  'hsl(160, 84%, 39%)', // Secondary green  
  'hsl(45, 93%, 58%)', // Chart yellow
  'hsl(271, 81%, 56%)', // Chart purple
  'hsl(0, 84%, 60%)', // Chart red
  'hsl(180, 84%, 45%)' // Chart cyan
];

export default function AdminDashboard() {
  const [timeframe, setTimeframe] = useState<'today' | 'week' | 'month'>('today');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { data: adminAnalytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['/api/admin/analytics/overview', timeframe],
    refetchInterval: 30000,
  });

  const { data: activityLogs, isLoading: activityLoading } = useQuery({
    queryKey: ['/api/admin/activity-logs'],
    refetchInterval: 60000,
  });

  const { data: healthStatus, isLoading: healthLoading } = useQuery({
    queryKey: ['/api/health'],
    refetchInterval: 30000,
  });

  const isLoading = analyticsLoading || activityLoading || healthLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen relative overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(66, 153, 225, 0.1) 0%, transparent 50%), var(--gradient-bg)`,
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float animate-morph"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }}></div>
          <div className="absolute top-10 left-10 w-4 h-4 bg-primary/20 rounded-full animate-particle-float" style={{ animationDelay: '-1s' }}></div>
          <div className="absolute top-20 right-20 w-3 h-3 bg-secondary/30 rounded-full animate-particle-float" style={{ animationDelay: '-3s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto p-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="modern-card animate-pulse glassmorphism border border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="h-4 bg-primary/20 rounded w-1/2"></div>
                  <div className="h-4 bg-primary/20 rounded w-4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-primary/20 rounded w-1/3 mb-1"></div>
                  <div className="h-3 bg-primary/20 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const recentActivities = (activityLogs || []).slice(0, 10);
  
  const userStatusData = adminAnalytics?.userStatusBreakdown ? [
    { name: 'Active', value: adminAnalytics.userStatusBreakdown.active, color: '#10B981' },
    { name: 'Blocked', value: adminAnalytics.userStatusBreakdown.blocked, color: '#EF4444' },
    { name: 'Pending', value: adminAnalytics.userStatusBreakdown.pending, color: '#F59E0B' },
    { name: 'Suspended', value: adminAnalytics.userStatusBreakdown.suspended, color: '#8B5CF6' },
  ] : [];

  const contactStatusData = adminAnalytics?.contactStatusBreakdown ? [
    { name: 'New', value: adminAnalytics.contactStatusBreakdown.new },
    { name: 'Contacted', value: adminAnalytics.contactStatusBreakdown.contacted },
    { name: 'Qualified', value: adminAnalytics.contactStatusBreakdown.qualified },
    { name: 'Converted', value: adminAnalytics.contactStatusBreakdown.converted },
  ] : [];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - TechVantage Solutions</title>
        <meta name="description" content="Comprehensive admin portal for managing users, content, and system settings." />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(66, 153, 225, 0.1) 0%, transparent 50%), var(--gradient-bg)`,
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float animate-morph"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/2 rounded-full blur-2xl animate-float" style={{ animationDelay: '-4s' }}></div>
          
          {/* Particle Effects */}
          <div className="absolute top-10 left-10 w-4 h-4 bg-primary/20 rounded-full animate-particle-float" style={{ animationDelay: '-1s' }}></div>
          <div className="absolute top-20 right-20 w-3 h-3 bg-secondary/30 rounded-full animate-particle-float" style={{ animationDelay: '-3s' }}></div>
          <div className="absolute bottom-32 left-16 w-5 h-5 bg-primary/15 rounded-full animate-particle-float" style={{ animationDelay: '-5s' }}></div>
          <div className="absolute bottom-20 right-32 w-2 h-2 bg-secondary/40 rounded-full animate-particle-float" style={{ animationDelay: '-7s' }}></div>
          
          {/* Pulsing Rings */}
          <div className="absolute top-1/3 right-1/3 w-20 h-20 border-2 border-primary/10 rounded-full animate-pulse-ring" style={{ animationDelay: '0s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-16 h-16 border-2 border-secondary/10 rounded-full animate-pulse-ring" style={{ animationDelay: '-1s' }}></div>
        </div>

        <div className="container mx-auto px-6 py-8 relative z-10" data-testid="admin-dashboard">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 animate-fade-in-up">
            <div>
              <div className="glassmorphism px-6 py-3 rounded-full inline-flex items-center space-x-2 mb-6 animate-glow-pulse">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold text-foreground">System Command Center</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black mb-3 text-gradient animate-scale-in" style={{ animationDelay: '0.2s' }}>Admin Dashboard</h1>
              <p className="text-lg text-muted-foreground max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Comprehensive overview of your system management and analytics with real-time insights
              </p>
            </div>
            
            <Tabs value={timeframe} onValueChange={(value) => setTimeframe(value as any)} className="animate-slide-in-right">
              <TabsList className="glassmorphism border border-primary/20 shadow-glow">
                <TabsTrigger value="today" data-testid="timeframe-today" className="hover-lift text-sm font-semibold">Today</TabsTrigger>
                <TabsTrigger value="week" data-testid="timeframe-week" className="hover-lift text-sm font-semibold">This Week</TabsTrigger>
                <TabsTrigger value="month" data-testid="timeframe-month" className="hover-lift text-sm font-semibold">This Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card data-testid="metric-total-users" className="modern-card glassmorphism border border-primary/20 hover-lift group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-foreground">Total Users</CardTitle>
                <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                  <Users className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-foreground mb-1 stat-counter">{adminAnalytics?.totalUsers || 0}</div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-secondary" />
                  +{adminAnalytics?.newUsersInPeriod || 0} new this period
                </p>
              </CardContent>
            </Card>

            <Card data-testid="metric-active-users" className="modern-card glassmorphism border border-secondary/20 hover-lift group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-foreground">Active Users</CardTitle>
                <div className="p-2 rounded-xl bg-secondary/10 group-hover:bg-secondary/20 transition-all duration-300">
                  <CheckCircle className="h-5 w-5 text-secondary group-hover:scale-110 transition-transform animate-glow-pulse" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-foreground mb-1 stat-counter">{adminAnalytics?.activeUsers || 0}</div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Zap className="h-4 w-4 text-secondary" />
                  {Math.round(((adminAnalytics?.activeUsers || 0) / Math.max(adminAnalytics?.totalUsers || 1, 1)) * 100)}% of total
                </p>
              </CardContent>
            </Card>

            <Card data-testid="metric-total-contacts" className="modern-card glassmorphism border border-yellow-500/20 hover-lift group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-foreground">Total Contacts</CardTitle>
                <div className="p-2 rounded-xl bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-all duration-300">
                  <Activity className="h-5 w-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-foreground mb-1 stat-counter">{adminAnalytics?.totalContacts || 0}</div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-yellow-400" />
                  +{adminAnalytics?.newContactsInPeriod || 0} new this period
                </p>
              </CardContent>
            </Card>

            <Card data-testid="metric-system-health" className="modern-card glassmorphism border border-purple-500/20 hover-lift group animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-foreground">System Health</CardTitle>
                <div className="p-2 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-all duration-300">
                  <BarChart3 className="h-5 w-5 text-purple-400 group-hover:scale-110 transition-transform" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    variant={healthStatus?.overall === 'healthy' ? 'default' : 'destructive'}
                    data-testid="system-health-badge"
                    className={`font-bold ${healthStatus?.overall === 'healthy' ? 'bg-secondary/20 text-secondary border-secondary/30 shadow-glow-secondary' : 'shadow-glow'}`}
                  >
                    {healthStatus?.overall || 'unknown'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Activity className="h-4 w-4 text-purple-400" />
                  {adminAnalytics?.recentActivities || 0} recent activities
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* User Status Distribution */}
            <Card data-testid="user-status-chart" className="modern-card glassmorphism border border-primary/20 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gradient">
                  <Users className="h-5 w-5 text-primary" />
                  User Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={userStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {userStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Contact Status Breakdown */}
            <Card data-testid="contact-status-chart" className="modern-card glassmorphism border border-secondary/20 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gradient">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  Contact Status Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={contactStatusData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        background: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="value" fill="hsl(217, 91%, 60%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Content Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card data-testid="projects-overview" className="modern-card glassmorphism border border-primary/10 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              <CardHeader>
                <CardTitle className="text-lg text-gradient">Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Projects</span>
                    <span className="font-semibold text-foreground">{adminAnalytics?.totalProjects || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Featured</span>
                    <span className="font-semibold text-primary">{adminAnalytics?.featuredProjects || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="testimonials-overview" className="modern-card glassmorphism border border-secondary/10 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <CardHeader>
                <CardTitle className="text-lg text-gradient">Testimonials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Testimonials</span>
                    <span className="font-semibold text-foreground">{adminAnalytics?.totalTestimonials || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Featured</span>
                    <span className="font-semibold text-secondary">{adminAnalytics?.featuredTestimonials || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="activity-overview" className="modern-card glassmorphism border border-purple-500/10 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
              <CardHeader>
                <CardTitle className="text-lg text-gradient">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recent Activities</span>
                    <span className="font-semibold text-foreground">{adminAnalytics?.recentActivities || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">System Status</span>
                    <Badge variant={healthStatus?.overall === 'healthy' ? 'default' : 'destructive'} className="font-bold">
                      {healthStatus?.overall || 'unknown'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Log */}
          <Card data-testid="recent-activity-log" className="modern-card glassmorphism border border-primary/10 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gradient">
                <Activity className="h-5 w-5 text-primary" />
                Recent Activity Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentActivities.length > 0 ? (
                <div className="space-y-4">
                  {recentActivities.map((log: any) => (
                    <div 
                      key={log.id} 
                      className="flex items-center justify-between p-4 glassmorphism border border-border/50 rounded-xl hover-lift group"
                      data-testid={`activity-log-${log.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="group-hover:border-primary/30 transition-colors">{log.action}</Badge>
                        <div>
                          <p className="font-medium text-foreground">{log.entity || 'System'}</p>
                          <p className="text-sm text-muted-foreground">
                            {log.details ? JSON.stringify(log.details) : 'No details'}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(log.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No recent activity</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}