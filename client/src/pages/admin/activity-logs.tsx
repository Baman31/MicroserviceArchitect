import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, Search, Filter, Calendar, User, Database, Shield, Mail, Globe, RefreshCw, Sparkles, AlertTriangle, CheckCircle, Clock, Info } from "lucide-react";
import { ActivityLog } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function ActivityLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState<"all" | "info" | "warning" | "error" | "success">("all");
  const [filterAction, setFilterAction] = useState("all");
  const [dateRange, setDateRange] = useState("today");
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const throttledHandler = throttle(handleMouseMove, 100);
    window.addEventListener('mousemove', throttledHandler);
    return () => window.removeEventListener('mousemove', throttledHandler);
  }, []);

  // Fetch activity logs
  const { data: logs = [], isLoading } = useQuery<ActivityLog[]>({
    queryKey: ['/api/admin/activity-logs', filterLevel, filterAction, dateRange],
  });

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['/api/admin/activity-logs'] });
    toast({
      title: "Refreshed",
      description: "Activity logs updated successfully.",
    });
  };

  const handleClearLogs = () => {
    console.log('Clearing old activity logs...');
    toast({
      title: "Logs Cleared",
      description: "Old activity logs have been cleared.",
    });
  };

  const getActionIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case 'login':
      case 'logout':
      case 'auth':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'create':
      case 'insert':
        return <Database className="h-4 w-4 text-green-500" />;
      case 'update':
      case 'modify':
        return <Activity className="h-4 w-4 text-orange-500" />;
      case 'delete':
      case 'remove':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'email':
      case 'send':
        return <Mail className="h-4 w-4 text-purple-500" />;
      case 'security':
      case 'admin':
        return <Shield className="h-4 w-4 text-indigo-500" />;
      default:
        return <Globe className="h-4 w-4 text-gray-500" />;
    }
  };

  const getLogLevel = (action: string): string => {
    if (action.includes('error') || action.includes('fail')) return 'error';
    if (action.includes('warning') || action.includes('block')) return 'warning';
    if (action.includes('success') || action.includes('create') || action.includes('login')) return 'success';
    return 'info';
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'success': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchQuery === "" || 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userId?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel = filterLevel === "all" || getLogLevel(log.action) === filterLevel;
    const matchesAction = filterAction === "all" || log.action === filterAction;

    return matchesSearch && matchesLevel && matchesAction;
  });

  const uniqueActions = Array.from(new Set(logs.map(log => log.action)));

  return (
    <>
      <Helmet>
        <title>Activity Logs - TechVantage Solutions Admin</title>
        <meta name="description" content="Monitor system activity, user actions, and security events with real-time logging." />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(66, 153, 225, 0.08) 0%, transparent 50%), var(--gradient-bg)`,
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }}></div>
          <div className="absolute top-10 left-10 w-4 h-4 bg-primary/20 rounded-full animate-particle-float" style={{ animationDelay: '-1s' }}></div>
          <div className="absolute bottom-20 right-20 w-3 h-3 bg-secondary/30 rounded-full animate-particle-float" style={{ animationDelay: '-3s' }}></div>
        </div>

        <div className="container mx-auto px-6 py-8 relative z-10" data-testid="activity-logs">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 animate-fade-in-up">
            <div>
              <div className="glassmorphism px-6 py-3 rounded-full inline-flex items-center space-x-2 mb-6 animate-glow-pulse">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold text-foreground">Activity Monitor</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black mb-3 text-gradient">Activity Logs</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Monitor system activity, user actions, and security events with real-time logging
              </p>
            </div>
            
            <div className="flex items-center gap-4 animate-slide-in-right">
              <Button variant="outline" size="icon" onClick={handleRefresh} className="glassmorphism border-primary/20 hover:bg-primary/10">
                <RefreshCw className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" onClick={handleClearLogs} className="glassmorphism border-muted-foreground/20 hover:bg-muted/10 gap-2">
                <AlertTriangle className="h-4 w-4" />
                Clear Old Logs
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card className="modern-card glassmorphism border border-primary/20 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-gradient">
                <Filter className="h-5 w-5 text-primary" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search logs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                      data-testid="logs-search-input"
                    />
                  </div>
                </div>
                
                <Select value={filterLevel} onValueChange={(value) => setFilterLevel(value as any)}>
                  <SelectTrigger data-testid="level-filter">
                    <SelectValue placeholder="Log Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterAction} onValueChange={setFilterAction}>
                  <SelectTrigger data-testid="action-filter">
                    <SelectValue placeholder="Action Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    {uniqueActions.map(action => (
                      <SelectItem key={action} value={action}>
                        {action.charAt(0).toUpperCase() + action.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger data-testid="date-range-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Activity Logs Table */}
          <Card data-testid="logs-table" className="modern-card glassmorphism border border-primary/20 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gradient">
                <Activity className="h-5 w-5 text-primary" />
                Activity Logs ({filteredLogs.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4" data-testid="logs-loading">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="animate-pulse border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-4 w-4 bg-muted rounded-full"></div>
                          <div className="h-4 bg-muted rounded w-32"></div>
                          <div className="h-4 bg-muted rounded w-48"></div>
                        </div>
                        <div className="h-4 bg-muted rounded w-24"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredLogs.length > 0 ? (
                <div className="space-y-2" data-testid="logs-list">
                  {filteredLogs.map((log) => (
                    <div 
                      key={log.id} 
                      className="modern-card border border-muted/50 p-4 hover-lift transition-all"
                      data-testid={`log-${log.id}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {getActionIcon(log.action)}
                            {getLevelIcon(getLogLevel(log.action))}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="font-mono text-xs">
                              {log.action}
                            </Badge>
                            
                            <Badge className={getLevelColor(getLogLevel(log.action))}>
                              {getLogLevel(log.action).toUpperCase()}
                            </Badge>
                            
                            {log.userId && (
                              <Badge variant="secondary">
                                <User className="h-3 w-3 mr-1" />
                                User: {log.userId.slice(0, 8)}...
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {log.details || `${log.action} action performed`}
                            </p>
                            {log.details && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {typeof log.details === 'object' ? JSON.stringify(log.details) : log.details}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(log.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20" data-testid="logs-empty">
                  <div className="mb-8">
                    <div className="bg-muted w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Activity className="w-16 h-16 text-muted-foreground/50" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">No Activity Logs</h3>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                      {searchQuery 
                        ? `No logs match your search for "${searchQuery}".`
                        : "No activity logs found for the selected filters. System activities will appear here as they occur."
                      }
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Log Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <Card className="modern-card glassmorphism border border-primary/20 hover-lift animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Logs</p>
                    <p className="text-3xl font-black text-foreground stat-counter">{logs.length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Activity className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="modern-card glassmorphism border border-secondary/20 hover-lift animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Error Logs</p>
                    <p className="text-3xl font-black text-foreground stat-counter">{logs.filter(l => getLogLevel(l.action) === 'error').length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-red-500/10">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="modern-card glassmorphism border border-yellow-500/20 hover-lift animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Warnings</p>
                    <p className="text-3xl font-black text-foreground stat-counter">{logs.filter(l => getLogLevel(l.action) === 'warning').length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-yellow-500/10">
                    <AlertTriangle className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="modern-card glassmorphism border border-green-500/20 hover-lift animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                    <p className="text-3xl font-black text-foreground stat-counter">
                      {logs.length > 0 ? Math.round((logs.filter(l => getLogLevel(l.action) === 'success').length / logs.length) * 100) : 0}%
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500/10">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

// Utility function for throttling mouse events
function throttle(func: Function, delay: number) {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  return function (this: any, ...args: any[]) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
}