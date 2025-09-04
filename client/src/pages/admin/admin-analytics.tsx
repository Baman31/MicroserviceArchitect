import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown, Users, Activity, Mail, Globe, Calendar, BarChart3 } from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function AdminAnalytics() {
  const [timeframe, setTimeframe] = useState<'today' | 'week' | 'month' | 'year'>('month');
  const [analyticsType, setAnalyticsType] = useState<'overview' | 'users' | 'content' | 'performance'>('overview');

  const { data: adminAnalytics = {}, isLoading: analyticsLoading } = useQuery({
    queryKey: ['/api/admin/analytics/overview', timeframe],
    refetchInterval: 60000,
  });

  const { data: serviceAnalytics, isLoading: serviceLoading } = useQuery({
    queryKey: ['/api/analytics/service-usage'],
    refetchInterval: 60000,
  });

  const { data: webAnalytics, isLoading: webLoading } = useQuery({
    queryKey: ['/api/analytics/web-metrics'],
    refetchInterval: 60000,
  });

  const isLoading = analyticsLoading || serviceLoading || webLoading;

  // Mock data for demonstration
  const userGrowthData = [
    { month: 'Jan', users: 65, newUsers: 12 },
    { month: 'Feb', users: 78, newUsers: 13 },
    { month: 'Mar', users: 92, newUsers: 14 },
    { month: 'Apr', users: 108, newUsers: 16 },
    { month: 'May', users: 125, newUsers: 17 },
    { month: 'Jun', users: 143, newUsers: 18 },
  ];

  const activityData = [
    { name: 'Login', count: 1247, color: '#0088FE' },
    { name: 'Page Views', count: 3892, color: '#00C49F' },
    { name: 'Contact Forms', count: 89, color: '#FFBB28' },
    { name: 'Quote Requests', count: 156, color: '#FF8042' },
  ];

  const trafficSourcesData = [
    { name: 'Direct', value: 45, color: '#0088FE' },
    { name: 'Google Search', value: 32, color: '#00C49F' },
    { name: 'Social Media', value: 15, color: '#FFBB28' },
    { name: 'Referrals', value: 8, color: '#FF8042' },
  ];

  const performanceData = [
    { metric: 'Page Load Time', value: '2.3s', trend: 'down', good: false },
    { metric: 'Time to Interactive', value: '3.1s', trend: 'down', good: false },
    { metric: 'Core Web Vitals Score', value: '89/100', trend: 'up', good: true },
    { metric: 'Server Response Time', value: '180ms', trend: 'up', good: true },
  ];

  return (
    <>
      <Helmet>
        <title>Analytics - Admin Portal</title>
        <meta name="description" content="Comprehensive analytics and performance monitoring for your website and users." />
      </Helmet>

      <div className="container mx-auto px-6 py-8" data-testid="admin-analytics">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Advanced Analytics</h1>
            <p className="text-muted-foreground">
              Comprehensive insights into user behavior, content performance, and system metrics
            </p>
          </div>
          
          <div className="flex gap-3">
            <Select value={timeframe} onValueChange={(value) => setTimeframe(value as any)}>
              <SelectTrigger className="w-40" data-testid="analytics-timeframe-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={analyticsType} onValueChange={(value) => setAnalyticsType(value as any)}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview" data-testid="analytics-overview">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" data-testid="analytics-users">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="content" data-testid="analytics-content">
              <Globe className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="performance" data-testid="analytics-performance">
              <Activity className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card data-testid="total-users-metric">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{(adminAnalytics as any)?.totalUsers || 0}</div>
                    <p className="text-xs text-muted-foreground">
                      +{(adminAnalytics as any)?.newUsersInPeriod || 0} new this {timeframe}
                    </p>
                  </CardContent>
                </Card>

                <Card data-testid="total-contacts-metric">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{(adminAnalytics as any)?.totalContacts || 0}</div>
                    <p className="text-xs text-muted-foreground">
                      +{(adminAnalytics as any)?.newContactsInPeriod || 0} new this {timeframe}
                    </p>
                  </CardContent>
                </Card>

                <Card data-testid="content-items-metric">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Content Items</CardTitle>
                    <Globe className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {((adminAnalytics as any)?.totalProjects || 0) + ((adminAnalytics as any)?.totalTestimonials || 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Projects + Testimonials
                    </p>
                  </CardContent>
                </Card>

                <Card data-testid="activity-metric">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{(adminAnalytics as any)?.recentActivities || 0}</div>
                    <p className="text-xs text-muted-foreground">
                      Actions this {timeframe}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card data-testid="user-growth-chart">
                  <CardHeader>
                    <CardTitle>User Growth Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="users" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card data-testid="activity-breakdown-chart">
                  <CardHeader>
                    <CardTitle>Activity Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={activityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card data-testid="user-status-breakdown">
                <CardHeader>
                  <CardTitle>User Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Active', value: adminAnalytics?.userStatusBreakdown?.active || 0, color: '#10B981' },
                          { name: 'Blocked', value: adminAnalytics?.userStatusBreakdown?.blocked || 0, color: '#EF4444' },
                          { name: 'Pending', value: adminAnalytics?.userStatusBreakdown?.pending || 0, color: '#F59E0B' },
                          { name: 'Suspended', value: adminAnalytics?.userStatusBreakdown?.suspended || 0, color: '#8B5CF6' },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {[
                          { name: 'Active', value: adminAnalytics?.userStatusBreakdown?.active || 0, color: '#10B981' },
                          { name: 'Blocked', value: adminAnalytics?.userStatusBreakdown?.blocked || 0, color: '#EF4444' },
                          { name: 'Pending', value: adminAnalytics?.userStatusBreakdown?.pending || 0, color: '#F59E0B' },
                          { name: 'Suspended', value: adminAnalytics?.userStatusBreakdown?.suspended || 0, color: '#8B5CF6' },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card data-testid="user-engagement-chart">
                <CardHeader>
                  <CardTitle>User Engagement Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="newUsers" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card data-testid="projects-analytics">
                  <CardHeader>
                    <CardTitle className="text-lg">Projects Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Total Projects</span>
                        <Badge>{adminAnalytics?.totalProjects || 0}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Featured Projects</span>
                        <Badge variant="secondary">{adminAnalytics?.featuredProjects || 0}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Categories</span>
                        <Badge variant="outline">6</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card data-testid="testimonials-analytics">
                  <CardHeader>
                    <CardTitle className="text-lg">Testimonials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Total Testimonials</span>
                        <Badge>{adminAnalytics?.totalTestimonials || 0}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Featured</span>
                        <Badge variant="secondary">{adminAnalytics?.featuredTestimonials || 0}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Average Rating</span>
                        <Badge variant="outline">4.8/5</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card data-testid="engagement-analytics">
                  <CardHeader>
                    <CardTitle className="text-lg">Engagement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Contact Forms</span>
                        <Badge>{adminAnalytics?.totalContacts || 0}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Conversion Rate</span>
                        <Badge variant="secondary">12.5%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Response Rate</span>
                        <Badge variant="outline">95%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card data-testid="traffic-sources-chart">
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={trafficSourcesData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {trafficSourcesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {performanceData.map((metric, index) => (
                  <Card key={index} data-testid={`performance-metric-${index}`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
                      {metric.trend === 'up' ? (
                        <TrendingUp className={`h-4 w-4 ${metric.good ? 'text-green-600' : 'text-red-600'}`} />
                      ) : (
                        <TrendingDown className={`h-4 w-4 ${metric.good ? 'text-green-600' : 'text-red-600'}`} />
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <p className={`text-xs ${metric.good ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.good ? 'Good performance' : 'Needs improvement'}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card data-testid="system-health-chart">
                <CardHeader>
                  <CardTitle>System Health Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="users" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}