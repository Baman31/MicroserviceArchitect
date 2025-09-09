import { type Project, type InsertProject, type Testimonial, type InsertTestimonial, type BlogPost, type InsertBlogPost, type Contact, type InsertContact, type Quote, type InsertQuote } from "@shared/schema";
import { randomUUID } from "crypto";

// Storage interface with all CRUD methods for different entities
export interface IStorage {
  // Project methods
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  // Testimonial methods
  getTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<boolean>;

  // Blog methods
  getBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPostsByCategory(category: string): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;

  // Contact methods
  getContacts(): Promise<Contact[]>;
  getContact(id: string): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContact(id: string, contact: Partial<InsertContact>): Promise<Contact | undefined>;
  deleteContact(id: string): Promise<boolean>;

  // Quote methods
  getQuotes(): Promise<Quote[]>;
  getQuotesByContact(contactId: string): Promise<Quote[]>;
  getQuote(id: string): Promise<Quote | undefined>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  updateQuote(id: string, quote: Partial<InsertQuote>): Promise<Quote | undefined>;
  deleteQuote(id: string): Promise<boolean>;
}

// In-memory storage implementation
class MemStorage implements IStorage {
  private projects: Project[] = [
    {
      id: "67972aef-7460-4ceb-9937-fa5e16b2d5e3",
      title: "E-Commerce Platform",
      description: "Complete online shopping solution with payment integration and inventory management.",
      imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["React", "Node.js", "MongoDB"],
      category: "web-apps",
      caseStudyUrl: "#",
      featured: 1,
      createdAt: new Date(),
    },
    {
      id: "ab4d2f1e-8c93-4567-b890-1234567890ef",
      title: "Corporate Website",
      description: "Professional corporate presence with content management and SEO optimization.",
      imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["Next.js", "Tailwind", "Strapi"],
      category: "web-dev",
      caseStudyUrl: "#",
      featured: 1,
      createdAt: new Date(),
    },
    {
      id: "cd5e3f2g-9d04-5678-c901-234567890123",
      title: "Cloud Migration",
      description: "Complete infrastructure migration to AWS with monitoring and automation.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["AWS", "Docker", "Kubernetes"],
      category: "cloud",
      caseStudyUrl: "#",
      featured: 1,
      createdAt: new Date(),
    },
  ];

  private testimonials: Testimonial[] = [
    {
      id: "5eb06077-5155-45fd-881b-5c3f2e8d6b4a",
      name: "Rajesh Sharma",
      position: "CEO",
      company: "Jaipur Textiles",
      content: "TechVantage transformed our online presence completely. Their web development team created a stunning, fast website that has significantly increased our customer inquiries.",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      featured: 1,
      createdAt: new Date(),
    },
    {
      id: "7f8g9h0i-1j2k-3l4m-5n6o-789012345abc",
      name: "Priya Gupta",
      position: "CTO",
      company: "Rajasthan Fintech",
      content: "The cloud migration project was executed flawlessly. Our systems are now more efficient and secure, and the ongoing support has been exceptional.",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      featured: 1,
      createdAt: new Date(),
    },
    {
      id: "9p0q1r2s-3t4u-5v6w-7x8y-901234567def",
      name: "Amit Jain",
      position: "Founder",
      company: "Pink City Tours",
      content: "Their SEO services doubled our organic traffic within six months. The team is knowledgeable, professional, and delivers results.",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      featured: 1,
      createdAt: new Date(),
    },
  ];

  private blogPosts: BlogPost[] = [];
  private contacts: Contact[] = [];
  private quotes: Quote[] = [];

  // Project methods
  async getProjects(): Promise<Project[]> {
    return this.projects;
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return this.projects.filter(p => p.featured === 1);
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return this.projects.filter(p => p.category === category);
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.find(p => p.id === id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const newProject: Project = {
      id: randomUUID(),
      ...project,
      createdAt: new Date(),
    };
    this.projects.push(newProject);
    return newProject;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return undefined;
    
    this.projects[index] = { ...this.projects[index], ...project };
    return this.projects[index];
  }

  async deleteProject(id: string): Promise<boolean> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    this.projects.splice(index, 1);
    return true;
  }

  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return this.testimonials;
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return this.testimonials.filter(t => t.featured === 1);
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    return this.testimonials.find(t => t.id === id);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const newTestimonial: Testimonial = {
      id: randomUUID(),
      ...testimonial,
      createdAt: new Date(),
    };
    this.testimonials.push(newTestimonial);
    return newTestimonial;
  }

  async updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const index = this.testimonials.findIndex(t => t.id === id);
    if (index === -1) return undefined;
    
    this.testimonials[index] = { ...this.testimonials[index], ...testimonial };
    return this.testimonials[index];
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const index = this.testimonials.findIndex(t => t.id === id);
    if (index === -1) return false;
    
    this.testimonials.splice(index, 1);
    return true;
  }

  // Blog methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return this.blogPosts;
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return this.blogPosts.filter(bp => bp.published === 1);
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return this.blogPosts.filter(bp => bp.category === category && bp.published === 1);
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.find(bp => bp.id === id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return this.blogPosts.find(bp => bp.slug === slug);
  }

  async createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost> {
    const newBlogPost: BlogPost = {
      id: randomUUID(),
      ...blogPost,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.blogPosts.push(newBlogPost);
    return newBlogPost;
  }

  async updateBlogPost(id: string, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const index = this.blogPosts.findIndex(bp => bp.id === id);
    if (index === -1) return undefined;
    
    this.blogPosts[index] = { 
      ...this.blogPosts[index], 
      ...blogPost, 
      updatedAt: new Date() 
    };
    return this.blogPosts[index];
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const index = this.blogPosts.findIndex(bp => bp.id === id);
    if (index === -1) return false;
    
    this.blogPosts.splice(index, 1);
    return true;
  }

  // Contact methods
  async getContacts(): Promise<Contact[]> {
    return this.contacts;
  }

  async getContact(id: string): Promise<Contact | undefined> {
    return this.contacts.find(c => c.id === id);
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const newContact: Contact = {
      id: randomUUID(),
      ...contact,
      status: "new",
      createdAt: new Date(),
    };
    this.contacts.push(newContact);
    return newContact;
  }

  async updateContact(id: string, contact: Partial<InsertContact>): Promise<Contact | undefined> {
    const index = this.contacts.findIndex(c => c.id === id);
    if (index === -1) return undefined;
    
    this.contacts[index] = { ...this.contacts[index], ...contact };
    return this.contacts[index];
  }

  async deleteContact(id: string): Promise<boolean> {
    const index = this.contacts.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    this.contacts.splice(index, 1);
    return true;
  }

  // Quote methods
  async getQuotes(): Promise<Quote[]> {
    return this.quotes;
  }

  async getQuotesByContact(contactId: string): Promise<Quote[]> {
    return this.quotes.filter(q => q.contactId === contactId);
  }

  async getQuote(id: string): Promise<Quote | undefined> {
    return this.quotes.find(q => q.id === id);
  }

  async createQuote(quote: InsertQuote): Promise<Quote> {
    const newQuote: Quote = {
      id: randomUUID(),
      ...quote,
      status: "pending",
      createdAt: new Date(),
    };
    this.quotes.push(newQuote);
    return newQuote;
  }

  async updateQuote(id: string, quote: Partial<InsertQuote>): Promise<Quote | undefined> {
    const index = this.quotes.findIndex(q => q.id === id);
    if (index === -1) return undefined;
    
    this.quotes[index] = { ...this.quotes[index], ...quote };
    return this.quotes[index];
  }

  async deleteQuote(id: string): Promise<boolean> {
    const index = this.quotes.findIndex(q => q.id === id);
    if (index === -1) return false;
    
    this.quotes.splice(index, 1);
    return true;
  }
}

export const storage: IStorage = new MemStorage();