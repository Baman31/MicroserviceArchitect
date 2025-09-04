import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Plus, Edit, Trash2, Shield, ShieldOff, CheckCircle, XCircle, Clock, Search, Filter, MoreVertical, Mail, Phone, Calendar, Sparkles, RefreshCw } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface UserFormData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  verified: boolean;
}

const emptyFormData: UserFormData = {
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  status: "active",
  verified: false
};

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "blocked" | "pending" | "suspended">("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>(emptyFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Fetch users
  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ['/api/admin/users'],
  });

  // Update user mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: Partial<UserFormData> }) => {
      return apiRequest('PUT', `/api/admin/users/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      toast({
        title: "Success!",
        description: "User updated successfully.",
      });
      handleCloseDialog();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Delete user mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/admin/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      toast({
        title: "Success!",
        description: "User deleted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Block/Unblock user mutation
  const toggleUserStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      return apiRequest('PUT', `/api/admin/users/${id}`, { status });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      toast({
        title: "Success!",
        description: `User ${variables.status === 'blocked' ? 'blocked' : 'unblocked'} successfully.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update user status. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Verify user mutation
  const verifyUserMutation = useMutation({
    mutationFn: async ({ id, verified }: { id: string, verified: boolean }) => {
      return apiRequest('PUT', `/api/admin/users/${id}`, { verified });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      toast({
        title: "Success!",
        description: `User ${variables.verified ? 'verified' : 'unverified'} successfully.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update user verification status.",
        variant: "destructive",
      });
    }
  });

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === "" || 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.firstName && user.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.lastName && user.lastName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        username: user.username,
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        status: user.status || "active",
        verified: user.verified || false
      });
    } else {
      setEditingUser(null);
      setFormData(emptyFormData);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingUser(null);
    setFormData(emptyFormData);
    setIsSubmitting(false);
  };

  const handleSubmit = async () => {
    if (!formData.username) {
      toast({
        title: "Error",
        description: "Username is required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    if (editingUser) {
      updateMutation.mutate({ id: editingUser.id, data: formData });
    }
  };

  const handleToggleStatus = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'blocked' ? 'active' : 'blocked';
    toggleUserStatusMutation.mutate({ id: userId, status: newStatus });
  };

  const handleToggleVerification = (userId: string, currentVerified: boolean) => {
    verifyUserMutation.mutate({ id: userId, verified: !currentVerified });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'blocked': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'suspended': return <ShieldOff className="h-4 w-4 text-orange-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'blocked': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'suspended': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const statusCounts = {
    all: users.length,
    active: users.filter(u => u.status === 'active').length,
    blocked: users.filter(u => u.status === 'blocked').length,
    pending: users.filter(u => u.status === 'pending').length,
    suspended: users.filter(u => u.status === 'suspended').length,
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
  };

  return (
    <>
      <Helmet>
        <title>User Management - TechVantage Solutions Admin</title>
        <meta name="description" content="Comprehensive user management system for admins to manage all user accounts." />
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

        <div className="container mx-auto px-6 py-8 relative z-10" data-testid="user-management">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 animate-fade-in-up">
            <div>
              <div className="glassmorphism px-6 py-3 rounded-full inline-flex items-center space-x-2 mb-6 animate-glow-pulse">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold text-foreground">User Control Center</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black mb-3 text-gradient">User Management</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Manage user accounts, permissions, and access levels with real-time updates. {users.length} total users registered
              </p>
            </div>
          
            <div className="flex items-center gap-4 animate-slide-in-right">
              <Button variant="outline" size="icon" onClick={handleRefresh} className="glassmorphism border-primary/20 hover:bg-primary/10">
                <RefreshCw className="h-4 w-4" />
              </Button>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    onClick={() => handleOpenDialog()}
                    className="modern-button gap-2"
                    data-testid="add-user-button"
                  >
                    <Plus className="h-4 w-4" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingUser ? "Edit User" : "Add New User"}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Username *</label>
                        <Input
                          placeholder="username"
                          value={formData.username}
                          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                          data-testid="user-username-input"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email</label>
                        <Input
                          placeholder="user@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          data-testid="user-email-input"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">First Name</label>
                        <Input
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                          data-testid="user-firstname-input"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Last Name</label>
                        <Input
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                          data-testid="user-lastname-input"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Status</label>
                        <Select
                          value={formData.status}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                        >
                          <SelectTrigger data-testid="user-status-select">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="blocked">Blocked</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2 pt-7">
                        <Switch
                          id="verified"
                          checked={formData.verified}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, verified: checked }))}
                          data-testid="user-verified-switch"
                        />
                        <label htmlFor="verified" className="text-sm font-medium">
                          Verified User
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <Button variant="outline" onClick={handleCloseDialog} data-testid="cancel-user-button">
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSubmit} 
                        disabled={isSubmitting}
                        data-testid="save-user-button"
                      >
                        {isSubmitting ? "Saving..." : editingUser ? "Update" : "Create"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
            </Dialog>
            </div>
          </div>

          {/* Filters and Search */}
          <Card className="modern-card glassmorphism border border-primary/20 mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-gradient">
                <Filter className="h-5 w-5 text-primary" />
                Filters & Search
              </CardTitle>
            </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users by username, email, name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="users-search-input"
                  />
                </div>
              </div>
            </div>
            
            <Tabs value={filterStatus} onValueChange={(value) => setFilterStatus(value as any)}>
              <TabsList className="glassmorphism border border-primary/20 grid w-full grid-cols-5">
                <TabsTrigger value="all" data-testid="filter-all" className="hover-lift font-semibold">
                  All ({statusCounts.all})
                </TabsTrigger>
                <TabsTrigger value="active" data-testid="filter-active" className="hover-lift font-semibold">
                  Active ({statusCounts.active})
                </TabsTrigger>
                <TabsTrigger value="blocked" data-testid="filter-blocked" className="hover-lift font-semibold">
                  Blocked ({statusCounts.blocked})
                </TabsTrigger>
                <TabsTrigger value="pending" data-testid="filter-pending" className="hover-lift font-semibold">
                  Pending ({statusCounts.pending})
                </TabsTrigger>
                <TabsTrigger value="suspended" data-testid="filter-suspended" className="hover-lift font-semibold">
                  Suspended ({statusCounts.suspended})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

          {/* Users Table */}
          <Card data-testid="users-table" className="modern-card glassmorphism border border-primary/20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gradient">
                <Users className="h-5 w-5 text-primary" />
                Users ({filteredUsers.length})
              </CardTitle>
            </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4" data-testid="users-loading">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-muted rounded-full"></div>
                        <div>
                          <div className="h-4 bg-muted rounded w-32 mb-1"></div>
                          <div className="h-3 bg-muted rounded w-24"></div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-8 w-16 bg-muted rounded"></div>
                        <div className="h-8 w-8 bg-muted rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Verified</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow 
                        key={user.id}
                        data-testid={`user-row-${user.id}`}
                      >
                        <TableCell>
                          <div>
                            <div className="font-medium">{user.username}</div>
                            {(user.firstName || user.lastName) && (
                              <div className="text-sm text-muted-foreground">
                                {[user.firstName, user.lastName].filter(Boolean).join(' ')}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {user.email ? (
                              <>
                                <Mail className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm">{user.email}</span>
                              </>
                            ) : (
                              <span className="text-sm text-muted-foreground">No email</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={getStatusColor(user.status || 'active')}
                            data-testid={`user-status-${user.id}`}
                          >
                            <div className="flex items-center gap-1">
                              {getStatusIcon(user.status || 'active')}
                              {user.status || 'active'}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {user.verified ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-600" />
                            )}
                            <span className="text-sm">
                              {user.verified ? 'Verified' : 'Unverified'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{formatDate(user.lastLoginAt)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{formatDate(user.createdAt)}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                data-testid={`user-actions-${user.id}`}
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleOpenDialog(user)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleVerification(user.id, user.verified || false)}>
                                {user.verified ? (
                                  <>
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Mark Unverified
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Mark Verified
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleStatus(user.id, user.status || 'active')}>
                                {user.status === 'blocked' ? (
                                  <>
                                    <Shield className="h-4 w-4 mr-2" />
                                    Unblock User
                                  </>
                                ) : (
                                  <>
                                    <ShieldOff className="h-4 w-4 mr-2" />
                                    Block User
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem 
                                    className="text-destructive"
                                    onSelect={(e) => e.preventDefault()}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete User
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete User</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete user "{user.username}"? This action cannot be undone and will remove all associated data.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(user.id)}>
                                      Delete User
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-20" data-testid="users-empty">
                <div className="mb-8">
                  <div className="bg-muted w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-16 h-16 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">No Users Found</h3>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    {searchQuery 
                      ? `No users match your search for "${searchQuery}".`
                      : "No users found in the system."
                    }
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
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