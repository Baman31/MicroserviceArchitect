import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Plus, Edit, Trash2, Crown, UserCheck, Settings, Activity } from "lucide-react";
import { Admin, User } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AdminFormData {
  userId: string;
  role: string;
  permissions: string[];
  status: string;
}

const emptyFormData: AdminFormData = {
  userId: "",
  role: "content_manager",
  permissions: [],
  status: "active"
};

const AVAILABLE_PERMISSIONS = [
  { id: 'users.read', label: 'View Users', category: 'Users' },
  { id: 'users.write', label: 'Manage Users', category: 'Users' },
  { id: 'users.delete', label: 'Delete Users', category: 'Users' },
  { id: 'admins.read', label: 'View Admins', category: 'Admin Management' },
  { id: 'admins.write', label: 'Manage Admins', category: 'Admin Management' },
  { id: 'content.read', label: 'View Content', category: 'Content' },
  { id: 'content.write', label: 'Manage Content', category: 'Content' },
  { id: 'content.publish', label: 'Publish Content', category: 'Content' },
  { id: 'analytics.read', label: 'View Analytics', category: 'Analytics' },
  { id: 'settings.read', label: 'View Settings', category: 'System' },
  { id: 'settings.write', label: 'Manage Settings', category: 'System' },
  { id: 'notifications.send', label: 'Send Notifications', category: 'Communications' },
];

const ROLE_PERMISSIONS = {
  super_admin: AVAILABLE_PERMISSIONS.map(p => p.id),
  admin: ['users.read', 'users.write', 'content.read', 'content.write', 'content.publish', 'analytics.read', 'notifications.send'],
  moderator: ['users.read', 'content.read', 'content.write', 'analytics.read'],
  content_manager: ['content.read', 'content.write', 'content.publish']
};

export default function AdminManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [formData, setFormData] = useState<AdminFormData>(emptyFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch admins and users
  const { data: admins = [], isLoading: adminsLoading } = useQuery<Admin[]>({
    queryKey: ['/api/admin/admins'],
  });

  const { data: users = [], isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ['/api/admin/users'],
  });

  // Create admin mutation
  const createMutation = useMutation({
    mutationFn: async (data: AdminFormData) => {
      return apiRequest('POST', '/api/admin/admins', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/admins'] });
      toast({
        title: "Success!",
        description: "Admin created successfully.",
      });
      handleCloseDialog();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create admin. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Update admin mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: Partial<AdminFormData> }) => {
      return apiRequest('PUT', `/api/admin/admins/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/admins'] });
      toast({
        title: "Success!",
        description: "Admin updated successfully.",
      });
      handleCloseDialog();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update admin. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleOpenDialog = (admin?: Admin) => {
    if (admin) {
      setEditingAdmin(admin);
      setFormData({
        userId: admin.userId,
        role: admin.role,
        permissions: Array.isArray(admin.permissions) ? admin.permissions : [],
        status: admin.status || "active"
      });
    } else {
      setEditingAdmin(null);
      setFormData(emptyFormData);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingAdmin(null);
    setFormData(emptyFormData);
    setIsSubmitting(false);
  };

  const handleSubmit = async () => {
    if (!formData.userId || !formData.role) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    if (editingAdmin) {
      updateMutation.mutate({ id: editingAdmin.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleRoleChange = (role: string) => {
    setFormData(prev => ({
      ...prev,
      role,
      permissions: ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS] || []
    }));
  };

  const handlePermissionToggle = (permissionId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked 
        ? [...prev.permissions, permissionId]
        : prev.permissions.filter(p => p !== permissionId)
    }));
  };

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? `${user.username} (${user.email || 'No email'})` : 'Unknown User';
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin': return <Crown className="h-4 w-4 text-yellow-600" />;
      case 'admin': return <Shield className="h-4 w-4 text-blue-600" />;
      case 'moderator': return <UserCheck className="h-4 w-4 text-green-600" />;
      case 'content_manager': return <Edit className="h-4 w-4 text-purple-600" />;
      default: return <Settings className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'admin': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'moderator': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'content_manager': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const permissionsByCategory = AVAILABLE_PERMISSIONS.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, typeof AVAILABLE_PERMISSIONS>);

  return (
    <>
      <Helmet>
        <title>Admin Management - Admin Portal</title>
        <meta name="description" content="Manage admin accounts, roles, and permissions." />
      </Helmet>

      <div className="container mx-auto px-6 py-8" data-testid="admin-management">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Management</h1>
            <p className="text-muted-foreground">
              Manage admin accounts, roles, and permissions. {admins.length} total admins
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => handleOpenDialog()}
                className="gap-2"
                data-testid="add-admin-button"
              >
                <Plus className="h-4 w-4" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingAdmin ? "Edit Admin" : "Add New Admin"}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">User *</label>
                    <Select
                      value={formData.userId}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, userId: value }))}
                      disabled={!!editingAdmin}
                    >
                      <SelectTrigger data-testid="admin-user-select">
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                      <SelectContent>
                        {users
                          .filter(user => !admins.some(admin => admin.userId === user.id))
                          .map(user => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.username} ({user.email || 'No email'})
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Role *</label>
                    <Select
                      value={formData.role}
                      onValueChange={handleRoleChange}
                    >
                      <SelectTrigger data-testid="admin-role-select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="super_admin">Super Admin</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="content_manager">Content Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger data-testid="admin-status-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-4 block">Permissions</label>
                  <div className="space-y-6">
                    {Object.entries(permissionsByCategory).map(([category, permissions]) => (
                      <div key={category} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-3">{category}</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {permissions.map((permission) => (
                            <div key={permission.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={permission.id}
                                checked={formData.permissions.includes(permission.id)}
                                onCheckedChange={(checked) => 
                                  handlePermissionToggle(permission.id, checked as boolean)
                                }
                                data-testid={`permission-${permission.id}`}
                              />
                              <label 
                                htmlFor={permission.id} 
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {permission.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={handleCloseDialog} data-testid="cancel-admin-button">
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    data-testid="save-admin-button"
                  >
                    {isSubmitting ? "Saving..." : editingAdmin ? "Update" : "Create"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Admins Table */}
        <Card data-testid="admins-table">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              System Administrators
            </CardTitle>
          </CardHeader>
          <CardContent>
            {adminsLoading || usersLoading ? (
              <div className="space-y-4" data-testid="admins-loading">
                {[...Array(3)].map((_, i) => (
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
            ) : admins.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Admin User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {admins.map((admin) => (
                      <TableRow 
                        key={admin.id}
                        data-testid={`admin-row-${admin.id}`}
                      >
                        <TableCell>
                          <div>
                            <div className="font-medium">{getUserName(admin.userId)}</div>
                            <div className="text-sm text-muted-foreground">ID: {admin.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={getRoleColor(admin.role)}
                            data-testid={`admin-role-${admin.id}`}
                          >
                            <div className="flex items-center gap-1">
                              {getRoleIcon(admin.role)}
                              {admin.role.replace('_', ' ')}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={admin.status === 'active' ? 'default' : 'secondary'}
                            data-testid={`admin-status-${admin.id}`}
                          >
                            {admin.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {Array.isArray(admin.permissions) ? admin.permissions.length : 0} permissions
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{formatDate(admin.createdAt)}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOpenDialog(admin)}
                              data-testid={`edit-admin-${admin.id}`}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            
                            {admin.role !== 'super_admin' && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive hover:text-destructive"
                                    data-testid={`delete-admin-${admin.id}`}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Admin</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to remove admin privileges for this user? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => {/* TODO: Implement delete */}}>
                                      Remove Admin
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-20" data-testid="admins-empty">
                <div className="mb-8">
                  <div className="bg-muted w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-16 h-16 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">No Admins Found</h3>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    No admin accounts have been created yet. Create your first admin to get started.
                  </p>
                </div>
                <Button onClick={() => handleOpenDialog()} data-testid="add-first-admin">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Admin
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}