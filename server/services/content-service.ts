import { type Project, type InsertProject, type BlogPost, type InsertBlogPost, type Testimonial, type InsertTestimonial } from "@shared/schema";
import { storage } from "../storage";

export class ContentService {
  // Project management
  async createProject(projectData: InsertProject): Promise<Project> {
    return storage.createProject(projectData);
  }

  async getAllProjects(): Promise<Project[]> {
    return storage.getProjects();
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return storage.getFeaturedProjects();
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return storage.getProjectsByCategory(category);
  }

  async getProjectById(id: string): Promise<Project | undefined> {
    return storage.getProject(id);
  }

  async updateProject(id: string, updateData: Partial<InsertProject>): Promise<Project | undefined> {
    return storage.updateProject(id, updateData);
  }

  async deleteProject(id: string): Promise<boolean> {
    return storage.deleteProject(id);
  }

  // Blog post management
  async createBlogPost(blogPostData: InsertBlogPost): Promise<BlogPost> {
    return storage.createBlogPost(blogPostData);
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return storage.getBlogPosts();
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return storage.getPublishedBlogPosts();
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return storage.getBlogPostsByCategory(category);
  }

  async getBlogPostById(id: string): Promise<BlogPost | undefined> {
    return storage.getBlogPost(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return storage.getBlogPostBySlug(slug);
  }

  async updateBlogPost(id: string, updateData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    return storage.updateBlogPost(id, updateData);
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return storage.deleteBlogPost(id);
  }

  // Testimonial management
  async createTestimonial(testimonialData: InsertTestimonial): Promise<Testimonial> {
    return storage.createTestimonial(testimonialData);
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return storage.getTestimonials();
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return storage.getFeaturedTestimonials();
  }

  async getTestimonialById(id: string): Promise<Testimonial | undefined> {
    return storage.getTestimonial(id);
  }

  async updateTestimonial(id: string, updateData: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    return storage.updateTestimonial(id, updateData);
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    return storage.deleteTestimonial(id);
  }

  // Content statistics for dashboard
  async getContentStats() {
    const [projects, blogPosts, testimonials] = await Promise.all([
      this.getAllProjects(),
      this.getAllBlogPosts(),
      this.getAllTestimonials()
    ]);

    return {
      projects: {
        total: projects.length,
        featured: projects.filter(p => p.featured === 1).length,
        byCategory: this.groupByCategory(projects)
      },
      blogPosts: {
        total: blogPosts.length,
        published: blogPosts.filter(p => p.published === 1).length,
        byCategory: this.groupByCategory(blogPosts)
      },
      testimonials: {
        total: testimonials.length,
        featured: testimonials.filter(t => t.featured === 1).length,
        averageRating: testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length || 0
      }
    };
  }

  private groupByCategory(items: (Project | BlogPost)[]): Record<string, number> {
    return items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  // Health check for this microservice
  healthCheck(): { status: string; service: string; timestamp: string } {
    return {
      status: "healthy",
      service: "content-service",
      timestamp: new Date().toISOString()
    };
  }
}

export const contentService = new ContentService();