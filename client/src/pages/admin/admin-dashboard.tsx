import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Shield, Activity, Settings, Bell, BarChart3, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function AdminDashboard() {
  const [timeframe, setTimeframe] = useState<'today' | 'week' | 'month'>('today');

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
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-4 bg-muted rounded w-4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-muted rounded w-1/3 mb-1"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
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

      <div className="container mx-auto px-6 py-8" data-testid="admin-dashboard">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive overview of your system management and analytics
            </p>
          </div>
          
          <Tabs value={timeframe} onValueChange={(value) => setTimeframe(value as any)}>
            <TabsList>
              <TabsTrigger value="today" data-testid="timeframe-today">Today</TabsTrigger>
              <TabsTrigger value="week" data-testid="timeframe-week">This Week</TabsTrigger>
              <TabsTrigger value="month" data-testid="timeframe-month">This Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card data-testid="metric-total-users">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminAnalytics?.totalUsers || 0}</div>
              <p className="text-xs text-muted-foreground">
                +{adminAnalytics?.newUsersInPeriod || 0} new this period
              </p>
            </CardContent>
          </Card>

          <Card data-testid="metric-active-users">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminAnalytics?.activeUsers || 0}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round(((adminAnalytics?.activeUsers || 0) / Math.max(adminAnalytics?.totalUsers || 1, 1)) * 100)}% of total
              </p>
            </CardContent>
          </Card>

          <Card data-testid="metric-total-contacts">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminAnalytics?.totalContacts || 0}</div>
              <p className="text-xs text-muted-foreground">
                +{adminAnalytics?.newContactsInPeriod || 0} new this period
              </p>
            </CardContent>
          </Card>

          <Card data-testid="metric-system-health">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={healthStatus?.overall === 'healthy' ? 'default' : 'destructive'}
                  data-testid="system-health-badge"
                >
                  {healthStatus?.overall || 'unknown'}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {adminAnalytics?.recentActivities || 0} recent activities
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Status Distribution */}
          <Card data-testid="user-status-chart">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
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
          <Card data-testid="contact-status-chart">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Contact Status Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={contactStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Content Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card data-testid="projects-overview">
            <CardHeader>
              <CardTitle className="text-lg">Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Projects</span>
                  <span className="font-semibold">{adminAnalytics?.totalProjects || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Featured</span>
                  <span className="font-semibold">{adminAnalytics?.featuredProjects || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="testimonials-overview">
            <CardHeader>
              <CardTitle className="text-lg">Testimonials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Testimonials</span>
                  <span className="font-semibold">{adminAnalytics?.totalTestimonials || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Featured</span>
                  <span className="font-semibold">{adminAnalytics?.featuredTestimonials || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="activity-overview">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Recent Activities</span>
                  <span className="font-semibold">{adminAnalytics?.recentActivities || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>System Status</span>
                  <Badge variant={healthStatus?.overall === 'healthy' ? 'default' : 'destructive'}>
                    {healthStatus?.overall || 'unknown'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Log */}
        <Card data-testid="recent-activity-log">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivities.length > 0 ? (
              <div className="space-y-4">
                {recentActivities.map((log: any) => (
                  <div 
                    key={log.id} 
                    className="flex items-center justify-between p-4 border rounded-lg"
                    data-testid={`activity-log-${log.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{log.action}</Badge>
                      <div>
                        <p className="font-medium">{log.entity || 'System'}</p>
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
    </>
  );
}