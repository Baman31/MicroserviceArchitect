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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Briefcase, Plus, Edit, Trash2, Star, Globe, Smartphone, Cloud, Code, Search, TrendingUp, Calendar } from "lucide-react";
import { Project, BlogPost } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ProjectFormData {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  category: string;
  caseStudyUrl: string;
  featured: boolean;
}

const emptyProjectFormData: ProjectFormData = {
  title: "",
  description: "",
  imageUrl: "",
  technologies: [],
  category: "web-dev",
  caseStudyUrl: "",
  featured: false
};

const PROJECT_CATEGORIES = [
  { id: 'web-dev', label: 'Web Development', icon: Globe },
  { id: 'web-apps', label: 'Web Applications', icon: Smartphone },
  { id: 'seo', label: 'SEO & Marketing', icon: TrendingUp },
  { id: 'cloud', label: 'Cloud Solutions', icon: Cloud },
  { id: 'devops', label: 'DevOps', icon: Code },
  { id: 'optimization', label: 'Optimization', icon: TrendingUp }
];

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState("projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectFormData, setProjectFormData] = useState<ProjectFormData>(emptyProjectFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch projects
  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  // Create project mutation
  const createProjectMutation = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      return apiRequest('POST', '/api/projects', {
        ...data,
        featured: data.featured ? 1 : null
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({
        title: "Success!",
        description: "Project created successfully.",
      });
      handleCloseProjectDialog();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleOpenProjectDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setProjectFormData({
        title: project.title,
        description: project.description,
        imageUrl: project.imageUrl,
        technologies: Array.isArray(project.technologies) ? project.technologies : [],
        category: project.category,
        caseStudyUrl: project.caseStudyUrl || "",
        featured: project.featured === 1
      });
    } else {
      setEditingProject(null);
      setProjectFormData(emptyProjectFormData);
    }
    setIsProjectDialogOpen(true);
  };

  const handleCloseProjectDialog = () => {
    setIsProjectDialogOpen(false);
    setEditingProject(null);
    setProjectFormData(emptyProjectFormData);
    setIsSubmitting(false);
  };

  const handleSubmitProject = async () => {
    if (!projectFormData.title || !projectFormData.description) {
      toast({
        title: "Error",
        description: "Title and description are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    createProjectMutation.mutate(projectFormData);
  };

  const handleTechnologiesChange = (value: string) => {
    const technologies = value.split(',').map(tech => tech.trim()).filter(Boolean);
    setProjectFormData(prev => ({ ...prev, technologies }));
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = PROJECT_CATEGORIES.find(c => c.id === category);
    if (categoryData) {
      const IconComponent = categoryData.icon;
      return <IconComponent className="h-4 w-4" />;
    }
    return <Briefcase className="h-4 w-4" />;
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchQuery === "" || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(project.technologies) && project.technologies.some(tech => 
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      ));

    const matchesCategory = filterCategory === "all" || project.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Content Management - Admin Portal</title>
        <meta name="description" content="Manage projects, services, and website content." />
      </Helmet>

      <div className="container mx-auto px-6 py-8" data-testid="content-management">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Content Management</h1>
            <p className="text-muted-foreground">
              Manage projects, services, and website content
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="projects" data-testid="tab-projects">
              <Briefcase className="h-4 w-4 mr-2" />
              Projects ({projects.length})
            </TabsTrigger>
            <TabsTrigger value="services" data-testid="tab-services">
              <Code className="h-4 w-4 mr-2" />
              Services
            </TabsTrigger>
            <TabsTrigger value="blog" data-testid="tab-blog">
              <FileText className="h-4 w-4 mr-2" />
              Blog Posts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <Card data-testid="projects-management">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Projects Management
                  </CardTitle>
                  
                  <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        onClick={() => handleOpenProjectDialog()}
                        className="gap-2"
                        data-testid="add-project-button"
                      >
                        <Plus className="h-4 w-4" />
                        Add Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          {editingProject ? "Edit Project" : "Add New Project"}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Project Title *</label>
                          <Input
                            placeholder="E-Commerce Platform"
                            value={projectFormData.title}
                            onChange={(e) => setProjectFormData(prev => ({ ...prev, title: e.target.value }))}
                            data-testid="project-title-input"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Description *</label>
                          <Textarea
                            placeholder="Describe the project, its features, and impact..."
                            value={projectFormData.description}
                            onChange={(e) => setProjectFormData(prev => ({ ...prev, description: e.target.value }))}
                            rows={4}
                            data-testid="project-description-input"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Category *</label>
                            <Select
                              value={projectFormData.category}
                              onValueChange={(value) => setProjectFormData(prev => ({ ...prev, category: value }))}
                            >
                              <SelectTrigger data-testid="project-category-select">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {PROJECT_CATEGORIES.map(category => (
                                  <SelectItem key={category.id} value={category.id}>
                                    <div className="flex items-center gap-2">
                                      <category.icon className="h-4 w-4" />
                                      {category.label}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium mb-2 block">Image URL *</label>
                            <Input
                              placeholder="https://example.com/image.jpg"
                              value={projectFormData.imageUrl}
                              onChange={(e) => setProjectFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                              data-testid="project-image-input"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Technologies (comma-separated)</label>
                          <Input
                            placeholder="React, Node.js, MongoDB"
                            value={projectFormData.technologies.join(', ')}
                            onChange={(e) => handleTechnologiesChange(e.target.value)}
                            data-testid="project-technologies-input"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Case Study URL</label>
                          <Input
                            placeholder="https://example.com/case-study"
                            value={projectFormData.caseStudyUrl}
                            onChange={(e) => setProjectFormData(prev => ({ ...prev, caseStudyUrl: e.target.value }))}
                            data-testid="project-casestudy-input"
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id="project-featured"
                            checked={projectFormData.featured}
                            onCheckedChange={(checked) => setProjectFormData(prev => ({ ...prev, featured: checked }))}
                            data-testid="project-featured-switch"
                          />
                          <label htmlFor="project-featured" className="text-sm font-medium">
                            Featured project
                          </label>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                          <Button variant="outline" onClick={handleCloseProjectDialog} data-testid="cancel-project-button">
                            Cancel
                          </Button>
                          <Button 
                            onClick={handleSubmitProject} 
                            disabled={isSubmitting}
                            data-testid="save-project-button"
                          >
                            {isSubmitting ? "Saving..." : editingProject ? "Update" : "Create"}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                        data-testid="projects-search-input"
                      />
                    </div>
                  </div>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {PROJECT_CATEGORIES.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Projects Grid */}
                {projectsLoading ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="projects-loading">
                    {[...Array(6)].map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardHeader>
                          <div className="h-40 bg-muted rounded"></div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="h-4 bg-muted rounded"></div>
                            <div className="h-3 bg-muted rounded w-3/4"></div>
                            <div className="h-3 bg-muted rounded w-1/2"></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : filteredProjects.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="projects-grid">
                    {filteredProjects.map((project) => (
                      <Card 
                        key={project.id} 
                        className="hover:shadow-lg transition-shadow"
                        data-testid={`project-card-${project.id}`}
                      >
                        <CardHeader className="p-0">
                          <div className="aspect-video relative overflow-hidden rounded-t-lg">
                            <img 
                              src={project.imageUrl} 
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                            {project.featured === 1 && (
                              <Badge className="absolute top-3 right-3 bg-yellow-500">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div>
                              <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {project.description}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {getCategoryIcon(project.category)}
                              <Badge variant="outline">
                                {PROJECT_CATEGORIES.find(c => c.id === project.category)?.label || project.category}
                              </Badge>
                            </div>

                            <div>
                              <div className="flex flex-wrap gap-1">
                                {Array.isArray(project.technologies) && project.technologies.slice(0, 3).map((tech, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                                {Array.isArray(project.technologies) && project.technologies.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{project.technologies.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center pt-3">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {new Date(project.createdAt).toLocaleDateString()}
                              </div>
                              
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleOpenProjectDialog(project)}
                                  data-testid={`edit-project-${project.id}`}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-destructive hover:text-destructive"
                                      data-testid={`delete-project-${project.id}`}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Project</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete "{project.title}"? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => {/* TODO: Implement delete */}}>
                                        Delete Project
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
                  <div className="text-center py-20" data-testid="projects-empty">
                    <div className="mb-8">
                      <div className="bg-muted w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Briefcase className="w-16 h-16 text-muted-foreground/50" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">No Projects Found</h3>
                      <p className="text-muted-foreground max-w-lg mx-auto">
                        {searchQuery 
                          ? `No projects match your search for "${searchQuery}".`
                          : "No projects have been created yet. Add your first project to showcase your work."
                        }
                      </p>
                    </div>
                    <Button onClick={() => handleOpenProjectDialog()} data-testid="add-first-project">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Project
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card data-testid="services-management">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Services Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Code className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Services Management</h3>
                  <p className="text-muted-foreground mb-4">
                    Manage your IT services offerings and descriptions
                  </p>
                  <Button variant="outline" data-testid="manage-services-button">
                    <Plus className="h-4 w-4 mr-2" />
                    Configure Services
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog">
            <Card data-testid="blog-management">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Blog Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Blog Management</h3>
                  <p className="text-muted-foreground mb-4">
                    Create and manage blog posts for your website
                  </p>
                  <Button variant="outline" data-testid="manage-blog-button">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Blog Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}