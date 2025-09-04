import { useState } from "react";
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
import { Star, Plus, Edit, Trash2, User, Building, Star as StarIcon, Calendar, Search, Filter, CheckCircle } from "lucide-react";
import { Testimonial } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";

interface TestimonialFormData {
  name: string;
  company: string;
  position: string;
  content: string;
  rating: number;
  featured: boolean;
  avatarUrl?: string;
}

const emptyFormData: TestimonialFormData = {
  name: "",
  company: "",
  position: "",
  content: "",
  rating: 5,
  featured: false,
  avatarUrl: ""
};


export default function TestimonialsAdmin() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFeatured, setFilterFeatured] = useState<"all" | "featured" | "regular">("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<TestimonialFormData>(emptyFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch testimonials
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  // Create testimonial mutation
  const createMutation = useMutation({
    mutationFn: async (data: TestimonialFormData) => {
      return apiRequest('POST', '/api/testimonials', {
        ...data,
        featured: data.featured ? 1 : null
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
      toast({
        title: "Success!",
        description: "Testimonial created successfully.",
      });
      handleCloseDialog();
      trackEvent('admin_testimonial', 'create', 'testimonial_management');
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create testimonial. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Update testimonial mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: TestimonialFormData }) => {
      return apiRequest('PUT', `/api/testimonials/${id}`, {
        ...data,
        featured: data.featured ? 1 : null
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
      toast({
        title: "Success!",
        description: "Testimonial updated successfully.",
      });
      handleCloseDialog();
      trackEvent('admin_testimonial', 'update', 'testimonial_management');
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update testimonial. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Delete testimonial mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/testimonials/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
      toast({
        title: "Success!",
        description: "Testimonial deleted successfully.",
      });
      trackEvent('admin_testimonial', 'delete', 'testimonial_management');
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete testimonial. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Filter testimonials
  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = searchQuery === "" || 
      testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFeatured = filterFeatured === "all" ||
      (filterFeatured === "featured" && testimonial.featured === 1) ||
      (filterFeatured === "regular" && testimonial.featured !== 1);

    return matchesSearch && matchesFeatured;
  });

  const handleOpenDialog = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        name: testimonial.name,
        company: testimonial.company,
        position: testimonial.position,
        content: testimonial.content,
        rating: testimonial.rating,
        featured: testimonial.featured === 1,
        avatarUrl: testimonial.avatarUrl || ""
      });
    } else {
      setEditingTestimonial(null);
      setFormData(emptyFormData);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingTestimonial(null);
    setFormData(emptyFormData);
    setIsSubmitting(false);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.company || !formData.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    if (editingTestimonial) {
      updateMutation.mutate({ id: editingTestimonial.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const featuredCount = testimonials.filter(t => t.featured === 1).length;
  const totalCount = testimonials.length;

  return (
    <>
      <Helmet>
        <title>Testimonials Management - Admin Dashboard</title>
        <meta name="description" content="Manage client testimonials, reviews, and feedback for TechVantage Solutions." />
      </Helmet>

      <div className="container mx-auto px-4 py-8" data-testid="testimonials-admin">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-poppins mb-2">Testimonials Management</h1>
            <p className="text-muted-foreground">
              Manage client testimonials and reviews. {totalCount} total • {featuredCount} featured
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => handleOpenDialog()}
                className="gap-2"
                data-testid="add-testimonial-button"
              >
                <Plus className="h-4 w-4" />
                Add Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Client Name *</label>
                    <Input
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      data-testid="testimonial-name-input"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Company *</label>
                    <Input
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      data-testid="testimonial-company-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Position</label>
                  <Input
                    placeholder="CEO, CTO, etc."
                    value={formData.position}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                    data-testid="testimonial-position-input"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Avatar URL (Optional)</label>
                  <Input
                    placeholder="https://example.com/avatar.jpg"
                    value={formData.avatarUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, avatarUrl: e.target.value }))}
                    data-testid="testimonial-avatar-input"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Rating</label>
                  <Select
                    value={formData.rating.toString()}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, rating: parseInt(value) }))}
                  >
                    <SelectTrigger data-testid="testimonial-rating-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <SelectItem key={rating} value={rating.toString()}>
                          <div className="flex items-center gap-2">
                            <span>{rating}</span>
                            <div className="flex">
                              {[...Array(rating)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-current text-yellow-500" />
                              ))}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Testimonial Content *</label>
                  <Textarea
                    placeholder="Write the testimonial content here..."
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    rows={4}
                    data-testid="testimonial-content-textarea"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                    data-testid="testimonial-featured-switch"
                  />
                  <label htmlFor="featured" className="text-sm font-medium">
                    Featured testimonial
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={handleCloseDialog} data-testid="cancel-testimonial-button">
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    data-testid="save-testimonial-button"
                  >
                    {isSubmitting ? "Saving..." : editingTestimonial ? "Update" : "Create"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search testimonials..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="testimonials-search-input"
                  />
                </div>
              </div>
              <Tabs value={filterFeatured} onValueChange={(value) => setFilterFeatured(value as any)}>
                <TabsList>
                  <TabsTrigger value="all" data-testid="filter-all">All</TabsTrigger>
                  <TabsTrigger value="featured" data-testid="filter-featured">Featured</TabsTrigger>
                  <TabsTrigger value="regular" data-testid="filter-regular">Regular</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="testimonials-loading">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-full"></div>
                      <div>
                        <div className="h-4 bg-muted rounded w-24 mb-1"></div>
                        <div className="h-3 bg-muted rounded w-20"></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 w-8 bg-muted rounded"></div>
                      <div className="h-8 w-8 bg-muted rounded"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                    <div className="h-4 bg-muted rounded w-4/6"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-16 bg-muted rounded"></div>
                    <div className="h-6 w-20 bg-muted rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredTestimonials.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="testimonials-grid">
            {filteredTestimonials.map((testimonial) => (
              <Card 
                key={testimonial.id} 
                className="hover:shadow-lg transition-shadow"
                data-testid={`testimonial-card-${testimonial.id}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {testimonial.avatarUrl ? (
                        <img 
                          src={testimonial.avatarUrl} 
                          alt={testimonial.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-sm">{testimonial.name}</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Building className="h-3 w-3" />
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {testimonial.featured === 1 && (
                        <Badge variant="secondary" className="text-xs">
                          <StarIcon className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(testimonial)}
                        className="h-8 w-8"
                        data-testid={`edit-testimonial-${testimonial.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            data-testid={`delete-testimonial-${testimonial.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this testimonial from {testimonial.name} at {testimonial.company}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(testimonial.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current text-yellow-500" />
                          ))}
                        </div>
                        <span>{testimonial.rating}/5</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(testimonial.createdAt)}
                      </div>
                    </div>
                    
                    <Badge variant="outline" className="text-xs">
                      {testimonial.rating} star review
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20" data-testid="testimonials-empty">
            <div className="mb-8">
              <div className="bg-muted w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-16 h-16 text-muted-foreground/50" />
              </div>
              <h3 className="text-2xl font-bold mb-4">No Testimonials Found</h3>
              <p className="text-muted-foreground max-w-lg mx-auto">
                {searchQuery 
                  ? `No testimonials match your search for "${searchQuery}".`
                  : "You haven't added any testimonials yet. Add your first testimonial to get started."
                }
              </p>
            </div>
            <Button onClick={() => handleOpenDialog()} data-testid="add-first-testimonial">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Testimonial
            </Button>
          </div>
        )}
      </div>
    </>
  );
}