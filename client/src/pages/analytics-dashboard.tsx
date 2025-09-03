import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Users, TrendingUp, FileText, MessageSquare, Eye } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00C49F', '#FFBB28'];

export default function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState<'today' | 'week' | 'month'>('today');

  const { data: healthStatus, isLoading: healthLoading } = useQuery({
    queryKey: ['/api/health'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: dashboardData, isLoading: dashboardLoading } = useQuery({
    queryKey: ['/api/stats', timeframe],
    refetchInterval: 60000, // Refresh every minute
  });

  const { data: analyticsData, isLoading: analyticsLoading } = useQuery({
    queryKey: ['/api/analytics/dashboard', timeframe],
    refetchInterval: 60000,
  });

  const { data: serviceInterest, isLoading: serviceLoading } = useQuery({
    queryKey: ['/api/analytics/service-interest'],
    refetchInterval: 120000, // Refresh every 2 minutes
  });

  const { data: microserviceMetrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['/api/microservices/metrics'],
    refetchInterval: 30000,
  });

  const isLoading = healthLoading || dashboardLoading || analyticsLoading || serviceLoading || metricsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-4 bg-muted rounded w-4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-6 bg-muted rounded w-1/3 mb-1"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'degraded': return 'bg-yellow-500';
      case 'unhealthy': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const serviceData = Array.isArray(serviceInterest) 
    ? serviceInterest.map((item: any, index: number) => ({
        name: item.service?.replace('-', ' ')?.replace(/\b\w/g, (l: string) => l.toUpperCase()) || `Service ${index + 1}`,
        value: item.count || 0,
        color: COLORS[index % COLORS.length]
      })) 
    : [];

  return (
    <>
      <Helmet>
        <title>Analytics Dashboard - TechVantage Solutions</title>
        <meta name="description" content="Real-time analytics and microservice health monitoring for TechVantage Solutions." />
      </Helmet>
      
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Real-time insights from our microservice architecture</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Badge variant={(healthStatus as any)?.overall === 'healthy' ? 'default' : 'destructive'}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor((healthStatus as any)?.overall || 'unknown')}`}></div>
                  System {(healthStatus as any)?.overall || 'Unknown'}
                </Badge>
              </div>
              
              <Tabs value={timeframe} onValueChange={(value) => setTimeframe(value as any)}>
                <TabsList>
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Service Health Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array.isArray((healthStatus as any)?.services) && (healthStatus as any).services.map((service: any) => (
              <Card key={service.service}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium capitalize">
                    {service.service.replace('-service', '').replace('-', ' ')}
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(service.status)}`}></div>
                    <div className="text-2xl font-bold capitalize">{service.status}</div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last checked: {new Date(service.timestamp).toLocaleTimeString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(analyticsData as any)?.totalEvents || 0}</div>
                <p className="text-xs text-muted-foreground">Analytics events tracked</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(analyticsData as any)?.pageViews || 0}</div>
                <p className="text-xs text-muted-foreground">Pages visited</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contacts</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(dashboardData as any)?.leads?.totalContacts || 0}</div>
                <p className="text-xs text-muted-foreground">Total inquiries</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(dashboardData as any)?.leads?.conversionRate || '0'}%</div>
                <p className="text-xs text-muted-foreground">Contact to quote</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Detailed Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Service Interest Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Service Interest</CardTitle>
                <CardDescription>Which services are clients most interested in</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={serviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {serviceData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Content Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Content Statistics</CardTitle>
                <CardDescription>Portfolio, blog posts, and testimonials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Projects</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">{(dashboardData as any)?.content?.projects?.total || 0}</span>
                      <Badge variant="secondary">{(dashboardData as any)?.content?.projects?.featured || 0} featured</Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Blog Posts</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">{(dashboardData as any)?.content?.blogPosts?.total || 0}</span>
                      <Badge variant="secondary">{(dashboardData as any)?.content?.blogPosts?.published || 0} published</Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Testimonials</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">{(dashboardData as any)?.content?.testimonials?.total || 0}</span>
                      <Badge variant="secondary">{(dashboardData as any)?.content?.testimonials?.featured || 0} featured</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Microservice Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Microservice Performance</CardTitle>
              <CardDescription>Real-time performance metrics from our distributed architecture</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {(microserviceMetrics as any)?.performance?.activeServices || 0}/4
                  </div>
                  <p className="text-sm text-muted-foreground">Active Services</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {(microserviceMetrics as any)?.performance?.totalRequests || 0}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Requests</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {(microserviceMetrics as any)?.performance?.conversionRate || '0'}%
                  </div>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {(microserviceMetrics as any)?.performance?.contentItems || 0}
                  </div>
                  <p className="text-sm text-muted-foreground">Content Items</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}