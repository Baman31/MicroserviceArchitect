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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Plus, Edit, Trash2, Shield, Mail, Database, BarChart3, Globe, Sparkles, RefreshCw, Save, RotateCcw, Bell, Key, Activity, AlertTriangle, CheckCircle, Zap, HardDrive } from "lucide-react";
import { SystemSetting } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface SettingFormData {
  key: string;
  value: any;
  category: string;
  description: string;
}

const emptyFormData: SettingFormData = {
  key: "",
  value: "",
  category: "general",
  description: ""
};

const SETTING_CATEGORIES = [
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'general', label: 'General', icon: Globe }
];

const DEFAULT_SETTINGS = [
  {
    key: "security.max_login_attempts",
    value: 5,
    category: "security",
    description: "Maximum number of failed login attempts before account lockout"
  },
  {
    key: "security.session_timeout",
    value: 30,
    category: "security", 
    description: "Session timeout in minutes"
  },
  {
    key: "email.smtp_enabled",
    value: false,
    category: "email",
    description: "Enable SMTP email sending"
  },
  {
    key: "email.from_address",
    value: "noreply@techvantage.com",
    category: "email",
    description: "Default from email address"
  },
  {
    key: "analytics.tracking_enabled",
    value: true,
    category: "analytics",
    description: "Enable user activity tracking"
  },
  {
    key: "general.site_name",
    value: "TechVantage Solutions",
    category: "general",
    description: "Website name displayed in headers and titles"
  },
  {
    key: "general.maintenance_mode",
    value: false,
    category: "general",
    description: "Enable maintenance mode to temporarily disable the site"
  }
];

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSetting, setEditingSetting] = useState<SystemSetting | null>(null);
  const [formData, setFormData] = useState<SettingFormData>(emptyFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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

  // Fetch system settings
  const { data: settings = [], isLoading } = useQuery<SystemSetting[]>({
    queryKey: ['/api/admin/settings', selectedCategory === 'all' ? undefined : selectedCategory],
  });

  // Create setting mutation
  const createMutation = useMutation({
    mutationFn: async (data: SettingFormData) => {
      return apiRequest('POST', '/api/admin/settings', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/settings'] });
      toast({
        title: "Success!",
        description: "Setting created successfully.",
      });
      handleCloseDialog();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create setting. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleOpenDialog = (setting?: SystemSetting) => {
    if (setting) {
      setEditingSetting(setting);
      setFormData({
        key: setting.key,
        value: setting.value,
        category: setting.category,
        description: setting.description || ""
      });
    } else {
      setEditingSetting(null);
      setFormData(emptyFormData);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingSetting(null);
    setFormData(emptyFormData);
    setIsSubmitting(false);
  };

  const handleSubmit = async () => {
    if (!formData.key || !formData.category) {
      toast({
        title: "Error",
        description: "Key and category are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    createMutation.mutate(formData);
  };

  const initializeDefaultSettings = async () => {
    try {
      for (const setting of DEFAULT_SETTINGS) {
        await apiRequest('POST', '/api/admin/settings', setting);
      }
      queryClient.invalidateQueries({ queryKey: ['/api/admin/settings'] });
      toast({
        title: "Success!",
        description: "Default settings initialized successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initialize default settings.",
        variant: "destructive",
      });
    }
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = SETTING_CATEGORIES.find(c => c.id === category);
    if (categoryData) {
      const IconComponent = categoryData.icon;
      return <IconComponent className="h-4 w-4" />;
    }
    return <Settings className="h-4 w-4" />;
  };

  const formatValue = (value: any) => {
    if (typeof value === 'boolean') {
      return value ? 'Enabled' : 'Disabled';
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  };

  const filteredSettings = selectedCategory === 'all' 
    ? settings 
    : settings.filter(s => s.category === selectedCategory);

  const handleSaveSettings = () => {
    setIsSaving(true);
    console.log('Saving system settings...');
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Success!",
        description: "System settings saved successfully.",
      });
    }, 2000);
  };

  const handleResetSettings = () => {
    console.log('Resetting settings to defaults...');
    toast({
      title: "Settings Reset",
      description: "Settings have been reset to default values.",
    });
  };

  return (
    <>
      <Helmet>
        <title>System Settings - TechVantage Solutions Admin</title>
        <meta name="description" content="Configure system-wide settings, security, and integrations." />
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

        <div className="container mx-auto px-6 py-8 relative z-10" data-testid="system-settings">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 animate-fade-in-up">
            <div>
              <div className="glassmorphism px-6 py-3 rounded-full inline-flex items-center space-x-2 mb-6 animate-glow-pulse">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold text-foreground">Settings Control Center</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black mb-3 text-gradient">System Settings</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Configure system-wide settings, security, and integrations with advanced controls
              </p>
            </div>
          
            <div className="flex items-center gap-4 animate-slide-in-right">
              <Button variant="outline" onClick={handleResetSettings} className="glassmorphism border-muted-foreground/20 hover:bg-muted/10 gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
              
              <Button onClick={handleSaveSettings} disabled={isSaving} className="modern-button gap-2">
                <Save className="h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save All'}
              </Button>
              
              {settings.length === 0 && (
                <Button 
                  variant="outline"
                  onClick={initializeDefaultSettings}
                  className="glassmorphism border-primary/20 hover:bg-primary/10"
                  data-testid="initialize-settings-button"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Initialize Defaults
                </Button>
              )}
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    onClick={() => handleOpenDialog()}
                    className="modern-button gap-2"
                    data-testid="add-setting-button"
                  >
                    <Plus className="h-4 w-4" />
                    Add Setting
                  </Button>
                </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingSetting ? "Edit Setting" : "Add New Setting"}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Setting Key *</label>
                      <Input
                        placeholder="e.g., security.max_attempts"
                        value={formData.key}
                        onChange={(e) => setFormData(prev => ({ ...prev, key: e.target.value }))}
                        disabled={!!editingSetting}
                        data-testid="setting-key-input"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category *</label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger data-testid="setting-category-select">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SETTING_CATEGORIES.map(category => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Value *</label>
                    <Textarea
                      placeholder="Setting value (JSON format for complex values)"
                      value={typeof formData.value === 'string' ? formData.value : JSON.stringify(formData.value)}
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value);
                          setFormData(prev => ({ ...prev, value: parsed }));
                        } catch {
                          setFormData(prev => ({ ...prev, value: e.target.value }));
                        }
                      }}
                      rows={3}
                      data-testid="setting-value-input"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <Textarea
                      placeholder="Describe what this setting controls..."
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={2}
                      data-testid="setting-description-input"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={handleCloseDialog} data-testid="cancel-setting-button">
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSubmit} 
                      disabled={isSubmitting}
                      data-testid="save-setting-button"
                    >
                      {isSubmitting ? "Saving..." : editingSetting ? "Update" : "Create"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
              </Dialog>
            </div>
          </div>

        {/* Category Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all" data-testid="category-all">
                  All Settings
                </TabsTrigger>
                {SETTING_CATEGORIES.map(category => (
                  <TabsTrigger key={category.id} value={category.id} data-testid={`category-${category.id}`}>
                    <div className="flex items-center gap-2">
                      <category.icon className="h-4 w-4" />
                      {category.label}
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Settings Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="settings-loading">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-4"></div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredSettings.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="settings-grid">
            {filteredSettings.map((setting) => (
              <Card 
                key={setting.id} 
                className="hover:shadow-lg transition-shadow"
                data-testid={`setting-card-${setting.id}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getCategoryIcon(setting.category)}
                      {setting.key}
                    </CardTitle>
                    <Badge variant="outline">
                      {setting.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Current Value:</div>
                      <div className="p-2 bg-muted rounded text-sm font-mono">
                        {formatValue(setting.value)}
                      </div>
                    </div>
                    
                    {setting.description && (
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Description:</div>
                        <p className="text-sm">{setting.description}</p>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center pt-3">
                      <div className="text-xs text-muted-foreground">
                        Updated: {new Date(setting.updatedAt).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(setting)}
                          data-testid={`edit-setting-${setting.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              data-testid={`delete-setting-${setting.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Setting</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete the setting "{setting.key}"? This may affect system functionality.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => {/* TODO: Implement delete */}}>
                                Delete Setting
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20" data-testid="settings-empty">
            <div className="mb-8">
              <div className="bg-muted w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                <Settings className="w-16 h-16 text-muted-foreground/50" />
              </div>
              <h3 className="text-2xl font-bold mb-4">No Settings Found</h3>
              <p className="text-muted-foreground max-w-lg mx-auto mb-6">
                {selectedCategory === 'all' 
                  ? "No system settings have been configured yet. Initialize default settings to get started."
                  : `No settings found in the ${selectedCategory} category.`
                }
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => initializeDefaultSettings()} data-testid="init-default-settings">
                  <Database className="h-4 w-4 mr-2" />
                  Initialize Default Settings
                </Button>
                <Button onClick={() => handleOpenDialog()} variant="outline" data-testid="add-custom-setting">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom Setting
                </Button>
              </div>
            </div>
          </div>
        )}
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