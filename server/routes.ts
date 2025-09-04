import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertQuoteSchema, insertProjectSchema, insertTestimonialSchema, insertBlogPostSchema } from "@shared/schema";
import { z } from "zod";
import { orchestrator } from "./services/microservice-orchestrator";
import { contentService } from "./services/content-service";
import { contactService } from "./services/contact-service";
import { analyticsService } from "./services/analytics-service";

export async function registerRoutes(app: Express): Promise<Server> {
  // Projects API routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await contentService.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/featured", async (req, res) => {
    try {
      const featuredProjects = await contentService.getFeaturedProjects();
      res.json(featuredProjects);
    } catch (error) {
      console.error("Error fetching featured projects:", error);
      res.status(500).json({ message: "Failed to fetch featured projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const sessionId = req.headers['x-session-id'] as string || 'anonymous';
      
      const project = await orchestrator.getProjectWithAnalytics(id, sessionId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await contentService.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  // Testimonials API routes
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await contentService.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.get("/api/testimonials/featured", async (req, res) => {
    try {
      const featuredTestimonials = await contentService.getFeaturedTestimonials();
      res.json(featuredTestimonials);
    } catch (error) {
      console.error("Error fetching featured testimonials:", error);
      res.status(500).json({ message: "Failed to fetch featured testimonials" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await contentService.createTestimonial(validatedData);
      res.status(201).json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      console.error("Error creating testimonial:", error);
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });

  app.get("/api/testimonials/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const testimonial = await contentService.getTestimonialById(id);
      
      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      
      res.json(testimonial);
    } catch (error) {
      console.error("Error fetching testimonial:", error);
      res.status(500).json({ message: "Failed to fetch testimonial" });
    }
  });

  app.put("/api/testimonials/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Validate partial update data
      const partialSchema = insertTestimonialSchema.partial();
      const validatedData = partialSchema.parse(req.body);
      
      const testimonial = await contentService.updateTestimonial(id, validatedData);
      
      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      
      res.json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      console.error("Error updating testimonial:", error);
      res.status(500).json({ message: "Failed to update testimonial" });
    }
  });

  app.delete("/api/testimonials/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await contentService.deleteTestimonial(id);
      
      if (!success) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      
      res.json({ message: "Testimonial deleted successfully" });
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      res.status(500).json({ message: "Failed to delete testimonial" });
    }
  });

  // Blog posts API routes
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const { category } = req.query;
      
      let blogPosts;
      if (category && typeof category === 'string') {
        blogPosts = await contentService.getBlogPostsByCategory(category);
      } else {
        blogPosts = await contentService.getPublishedBlogPosts();
      }
      
      res.json(blogPosts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const sessionId = req.headers['x-session-id'] as string || 'anonymous';
      
      const blogPost = await contentService.getBlogPostBySlug(slug);
      
      if (!blogPost || blogPost.published !== 1) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      // Track blog read using analytics service
      await orchestrator.getBlogPostWithAnalytics(blogPost.id, sessionId);
      
      res.json(blogPost);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog-posts", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const blogPost = await contentService.createBlogPost(validatedData);
      res.status(201).json(blogPost);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });

  // Contacts API routes
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  app.get("/api/contacts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const contact = await storage.getContact(id);
      
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      
      res.json(contact);
    } catch (error) {
      console.error("Error fetching contact:", error);
      res.status(500).json({ message: "Failed to fetch contact" });
    }
  });

  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const sessionId = req.headers['x-session-id'] as string || 'anonymous';
      
      const contact = await orchestrator.createContactWithAnalytics(validatedData, sessionId);
      
      res.status(201).json({ 
        message: "Contact form submitted successfully",
        contact: contact
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      console.error("Error creating contact:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  app.put("/api/contacts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Validate partial update data
      const partialSchema = insertContactSchema.partial();
      const validatedData = partialSchema.parse(req.body);
      
      const contact = await storage.updateContact(id, validatedData);
      
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      
      res.json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      console.error("Error updating contact:", error);
      res.status(500).json({ message: "Failed to update contact" });
    }
  });

  // Quotes API routes
  app.get("/api/quotes", async (req, res) => {
    try {
      const quotes = await storage.getQuotes();
      res.json(quotes);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      res.status(500).json({ message: "Failed to fetch quotes" });
    }
  });

  app.get("/api/quotes/contact/:contactId", async (req, res) => {
    try {
      const { contactId } = req.params;
      const quotes = await storage.getQuotesByContact(contactId);
      res.json(quotes);
    } catch (error) {
      console.error("Error fetching quotes by contact:", error);
      res.status(500).json({ message: "Failed to fetch quotes" });
    }
  });

  app.get("/api/quotes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const quote = await storage.getQuote(id);
      
      if (!quote) {
        return res.status(404).json({ message: "Quote not found" });
      }
      
      res.json(quote);
    } catch (error) {
      console.error("Error fetching quote:", error);
      res.status(500).json({ message: "Failed to fetch quote" });
    }
  });

  app.post("/api/quotes", async (req, res) => {
    try {
      const validatedData = insertQuoteSchema.parse(req.body);
      const sessionId = req.headers['x-session-id'] as string || 'anonymous';
      
      const quote = await orchestrator.createQuoteWithAnalytics(
        validatedData, 
        sessionId, 
        validatedData.contactId || undefined
      );
      
      res.status(201).json(quote);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      console.error("Error creating quote:", error);
      res.status(500).json({ message: "Failed to create quote" });
    }
  });

  app.put("/api/quotes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Validate partial update data (excluding read-only fields)
      const partialSchema = insertQuoteSchema.partial();
      const validatedData = partialSchema.parse(req.body);
      
      const quote = await storage.updateQuote(id, validatedData);
      
      if (!quote) {
        return res.status(404).json({ message: "Quote not found" });
      }
      
      res.json(quote);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      console.error("Error updating quote:", error);
      res.status(500).json({ message: "Failed to update quote" });
    }
  });

  // Health check endpoint with microservice status
  app.get("/api/health", async (req, res) => {
    try {
      const healthStatus = await orchestrator.healthCheck();
      res.json(healthStatus);
    } catch (error) {
      console.error("Health check error:", error);
      res.status(503).json({
        overall: "unhealthy",
        error: "Health check failed",
        timestamp: new Date().toISOString()
      });
    }
  });

  // Enhanced dashboard endpoint with microservice data
  app.get("/api/stats", async (req, res) => {
    try {
      const { timeframe = 'today' } = req.query;
      const dashboardData = await orchestrator.getDashboardData(timeframe as 'today' | 'week' | 'month');
      res.json(dashboardData);
    } catch (error) {
      console.error("Error fetching statistics:", error);
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  // Analytics endpoints
  app.post("/api/analytics/track", async (req, res) => {
    try {
      const { event, category, label, value } = req.body;
      const sessionId = req.headers['x-session-id'] as string || 'anonymous';
      const userId = req.headers['x-user-id'] as string;
      
      await analyticsService.trackEvent(event, category, {
        label,
        value,
        sessionId,
        userId
      });
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error tracking event:", error);
      res.status(500).json({ message: "Failed to track event" });
    }
  });

  app.get("/api/analytics/dashboard", async (req, res) => {
    try {
      const { timeframe = 'today' } = req.query;
      const metrics = await analyticsService.getDashboardMetrics(timeframe as 'today' | 'week' | 'month');
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  app.get("/api/analytics/service-interest", async (req, res) => {
    try {
      const serviceAnalytics = await analyticsService.getServiceInterestAnalytics();
      res.json(serviceAnalytics);
    } catch (error) {
      console.error("Error fetching service analytics:", error);
      res.status(500).json({ message: "Failed to fetch service analytics" });
    }
  });

  app.get("/api/microservices/metrics", async (req, res) => {
    try {
      const metrics = await orchestrator.getServiceMetrics();
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching microservice metrics:", error);
      res.status(500).json({ message: "Failed to fetch metrics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
