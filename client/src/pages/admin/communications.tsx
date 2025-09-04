import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Mail, MessageSquare, Bell, Plus, Send, Users, FileText, History, CheckCircle, Clock, XCircle, Sparkles, RefreshCw, Filter, Search, User, Calendar, Archive, Trash2, Reply, MoreVertical, Phone } from "lucide-react";
import { Contact, Quote, NotificationTemplate, Notification } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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

interface NotificationFormData {
  userIds: string[];
  templateId?: string;
  type: string;
  subject: string;
  message: string;
}

interface TemplateFormData {
  name: string;
  type: string;
  subject: string;
  body: string;
  variables: string[];
  active: boolean;
}

const emptyNotificationFormData: NotificationFormData = {
  userIds: [],
  templateId: "",
  type: "email",
  subject: "",
  message: ""
};

const emptyTemplateFormData: TemplateFormData = {
  name: "",
  type: "email",
  subject: "",
  body: "",
  variables: [],
  active: true
};

export default function Communications() {
  const [activeTab, setActiveTab] = useState("contacts");
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [notificationFormData, setNotificationFormData] = useState<NotificationFormData>(emptyNotificationFormData);
  const [templateFormData, setTemplateFormData] = useState<TemplateFormData>(emptyTemplateFormData);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

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

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch data
  const { data: users = [], isLoading: usersLoading } = useQuery<any[]>({
    queryKey: ['/api/admin/users'],
  });

  const { data: templates = [], isLoading: templatesLoading } = useQuery<NotificationTemplate[]>({
    queryKey: ['/api/admin/notification-templates'],
  });

  const { data: notifications = [], isLoading: notificationsLoading } = useQuery<Notification[]>({
    queryKey: ['/api/admin/notifications'],
  });

  // Send notification mutation
  const sendNotificationMutation = useMutation({
    mutationFn: async (data: NotificationFormData) => {
      return apiRequest('POST', '/api/admin/notifications/send', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/notifications'] });
      toast({
        title: "Success!",
        description: `Notifications sent to ${notificationFormData.userIds.length} users.`,
      });
      setIsNotificationDialogOpen(false);
      setNotificationFormData(emptyNotificationFormData);
      setSelectedUsers([]);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send notifications. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Create template mutation
  const createTemplateMutation = useMutation({
    mutationFn: async (data: TemplateFormData) => {
      return apiRequest('POST', '/api/admin/notification-templates', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/notification-templates'] });
      toast({
        title: "Success!",
        description: "Template created successfully.",
      });
      setIsTemplateDialogOpen(false);
      setTemplateFormData(emptyTemplateFormData);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create template. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSendNotification = async () => {
    if (notificationFormData.userIds.length === 0 || !notificationFormData.message) {
      toast({
        title: "Error",
        description: "Please select users and enter a message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    sendNotificationMutation.mutate(notificationFormData);
    setIsSubmitting(false);
  };

  const handleCreateTemplate = async () => {
    if (!templateFormData.name || !templateFormData.body) {
      toast({
        title: "Error",
        description: "Template name and body are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    createTemplateMutation.mutate(templateFormData);
    setIsSubmitting(false);
  };

  const handleUserSelection = (userId: string, checked: boolean) => {
    setSelectedUsers(prev => 
      checked 
        ? [...prev, userId]
        : prev.filter(id => id !== userId)
    );
    setNotificationFormData(prev => ({
      ...prev,
      userIds: checked 
        ? [...prev.userIds, userId]
        : prev.userIds.filter(id => id !== userId)
    }));
  };

  const selectAllUsers = () => {
    const allUserIds = users.filter(u => u.status === 'active').map(u => u.id);
    setSelectedUsers(allUserIds);
    setNotificationFormData(prev => ({
      ...prev,
      userIds: allUserIds
    }));
  };

  const deselectAllUsers = () => {
    setSelectedUsers([]);
    setNotificationFormData(prev => ({
      ...prev,
      userIds: []
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    queryClient.invalidateQueries({ queryKey: ['/api/quotes'] });
  };

  return (
    <>
      <Helmet>
        <title>Communications - TechVantage Solutions Admin</title>
        <meta name="description" content="Manage customer communications, contact inquiries, and quote requests." />
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

        <div className="container mx-auto px-6 py-8 relative z-10" data-testid="communications">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 animate-fade-in-up">
            <div>
              <div className="glassmorphism px-6 py-3 rounded-full inline-flex items-center space-x-2 mb-6 animate-glow-pulse">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold text-foreground">Communications Center</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black mb-3 text-gradient">Communications</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Manage customer communications, contact inquiries, and quote requests in real-time
              </p>
            </div>
            
            <div className="flex items-center gap-4 animate-slide-in-right">
              <Button variant="outline" size="icon" onClick={handleRefresh} className="glassmorphism border-primary/20 hover:bg-primary/10">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="glassmorphism border border-primary/20 grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="contacts" data-testid="tab-contacts" className="hover-lift font-semibold">
                <Mail className="h-4 w-4 mr-2" />
                Contact Messages
              </TabsTrigger>
              <TabsTrigger value="quotes" data-testid="tab-quotes" className="hover-lift font-semibold">
                <MessageSquare className="h-4 w-4 mr-2" />
                Quote Requests
              </TabsTrigger>
              <TabsTrigger value="templates" data-testid="tab-templates" className="hover-lift font-semibold">
                <FileText className="h-4 w-4 mr-2" />
                Templates
              </TabsTrigger>
            </TabsList>

          <TabsContent value="send">
            <Card data-testid="send-notification-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send Notification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* User Selection */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-sm font-medium">Select Recipients</label>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={selectAllUsers}
                          data-testid="select-all-users"
                        >
                          Select All Active
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={deselectAllUsers}
                          data-testid="deselect-all-users"
                        >
                          Deselect All
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 max-h-60 overflow-y-auto">
                      {users.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                          {users.filter(u => u.status === 'active').map((user) => (
                            <div key={user.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`user-${user.id}`}
                                checked={selectedUsers.includes(user.id)}
                                onCheckedChange={(checked) => 
                                  handleUserSelection(user.id, checked as boolean)
                                }
                                data-testid={`select-user-${user.id}`}
                              />
                              <label 
                                htmlFor={`user-${user.id}`} 
                                className="text-sm font-medium leading-none"
                              >
                                {user.username}
                                {user.email && <span className="text-muted-foreground ml-1">({user.email})</span>}
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-center py-4">No active users available</p>
                      )}
                    </div>
                    
                    {selectedUsers.length > 0 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {selectedUsers.length} users selected
                      </p>
                    )}
                  </div>

                  {/* Notification Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Notification Type</label>
                      <Select
                        value={notificationFormData.type}
                        onValueChange={(value) => setNotificationFormData(prev => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger data-testid="notification-type-select">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Email
                            </div>
                          </SelectItem>
                          <SelectItem value="sms">
                            <div className="flex items-center gap-2">
                              <MessageSquare className="h-4 w-4" />
                              SMS
                            </div>
                          </SelectItem>
                          <SelectItem value="push">
                            <div className="flex items-center gap-2">
                              <Bell className="h-4 w-4" />
                              Push Notification
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Template (Optional)</label>
                      <Select
                        value={notificationFormData.templateId}
                        onValueChange={(value) => setNotificationFormData(prev => ({ ...prev, templateId: value }))}
                      >
                        <SelectTrigger data-testid="notification-template-select">
                          <SelectValue placeholder="Choose template" />
                        </SelectTrigger>
                        <SelectContent>
                          {templates
                            .filter(t => t.type === notificationFormData.type && t.active)
                            .map(template => (
                              <SelectItem key={template.id} value={template.id}>
                                {template.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input
                      placeholder="Notification subject..."
                      value={notificationFormData.subject}
                      onChange={(e) => setNotificationFormData(prev => ({ ...prev, subject: e.target.value }))}
                      data-testid="notification-subject-input"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Message *</label>
                    <Textarea
                      placeholder="Enter your notification message here..."
                      value={notificationFormData.message}
                      onChange={(e) => setNotificationFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={5}
                      data-testid="notification-message-input"
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button 
                      onClick={handleSendNotification} 
                      disabled={isSubmitting || selectedUsers.length === 0}
                      data-testid="send-notification-button"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {isSubmitting ? "Sending..." : `Send to ${selectedUsers.length} Users`}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card data-testid="templates-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Notification Templates
                  </CardTitle>
                  
                  <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className="gap-2"
                        data-testid="add-template-button"
                      >
                        <Plus className="h-4 w-4" />
                        Add Template
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create Notification Template</DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Template Name *</label>
                            <Input
                              placeholder="Welcome Email"
                              value={templateFormData.name}
                              onChange={(e) => setTemplateFormData(prev => ({ ...prev, name: e.target.value }))}
                              data-testid="template-name-input"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Type *</label>
                            <Select
                              value={templateFormData.type}
                              onValueChange={(value) => setTemplateFormData(prev => ({ ...prev, type: value }))}
                            >
                              <SelectTrigger data-testid="template-type-select">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="sms">SMS</SelectItem>
                                <SelectItem value="push">Push Notification</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Subject</label>
                          <Input
                            placeholder="Email subject line"
                            value={templateFormData.subject}
                            onChange={(e) => setTemplateFormData(prev => ({ ...prev, subject: e.target.value }))}
                            data-testid="template-subject-input"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Message Body *</label>
                          <Textarea
                            placeholder="Enter template content here... Use {{variable}} for dynamic content"
                            value={templateFormData.body}
                            onChange={(e) => setTemplateFormData(prev => ({ ...prev, body: e.target.value }))}
                            rows={6}
                            data-testid="template-body-input"
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="template-active"
                            checked={templateFormData.active}
                            onCheckedChange={(checked) => setTemplateFormData(prev => ({ ...prev, active: checked as boolean }))}
                            data-testid="template-active-checkbox"
                          />
                          <label htmlFor="template-active" className="text-sm font-medium">
                            Active template
                          </label>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                          <Button 
                            variant="outline" 
                            onClick={() => setIsTemplateDialogOpen(false)} 
                            data-testid="cancel-template-button"
                          >
                            Cancel
                          </Button>
                          <Button 
                            onClick={handleCreateTemplate} 
                            disabled={isSubmitting}
                            data-testid="save-template-button"
                          >
                            {isSubmitting ? "Creating..." : "Create Template"}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {templatesLoading ? (
                  <div className="space-y-4" data-testid="templates-loading">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse border rounded-lg p-4">
                        <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-full mb-2"></div>
                        <div className="h-3 bg-muted rounded w-2/3"></div>
                      </div>
                    ))}
                  </div>
                ) : templates.length > 0 ? (
                  <div className="space-y-4" data-testid="templates-list">
                    {templates.map((template) => (
                      <div 
                        key={template.id} 
                        className="border rounded-lg p-4"
                        data-testid={`template-${template.id}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{template.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant={template.type === 'email' ? 'default' : 'secondary'}>
                              {template.type}
                            </Badge>
                            <Badge variant={template.active ? 'default' : 'secondary'}>
                              {template.active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                        {template.subject && (
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Subject: {template.subject}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {template.body}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Templates Found</h3>
                    <p className="text-muted-foreground mb-4">
                      Create notification templates to streamline your communication
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card data-testid="notification-history-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Notification History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {notificationsLoading ? (
                  <div className="space-y-4" data-testid="history-loading">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="animate-pulse border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="h-4 bg-muted rounded w-40 mb-2"></div>
                            <div className="h-3 bg-muted rounded w-60"></div>
                          </div>
                          <div className="h-6 w-16 bg-muted rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : notifications.length > 0 ? (
                  <Table data-testid="notifications-table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Recipient</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Sent Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {notifications.slice(0, 50).map((notification) => (
                        <TableRow 
                          key={notification.id}
                          data-testid={`notification-row-${notification.id}`}
                        >
                          <TableCell>
                            {users.find(u => u.id === notification.userId)?.username || 'Unknown User'}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{notification.type}</Badge>
                          </TableCell>
                          <TableCell>{notification.subject || 'No subject'}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(notification.status || 'pending')}
                              {notification.status || 'pending'}
                            </div>
                          </TableCell>
                          <TableCell>
                            {notification.sentAt 
                              ? new Date(notification.sentAt).toLocaleDateString()
                              : 'Not sent'
                            }
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-12">
                    <History className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Notifications Sent</h3>
                    <p className="text-muted-foreground">
                      Notification history will appear here once you start sending notifications
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </>
  );
}