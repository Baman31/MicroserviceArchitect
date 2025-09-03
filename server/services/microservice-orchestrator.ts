import { userService } from "./user-service";
import { contentService } from "./content-service";
import { contactService } from "./contact-service";
import { analyticsService } from "./analytics-service";

export class MicroserviceOrchestrator {
  // Service registry
  private services = {
    user: userService,
    content: contentService,
    contact: contactService,
    analytics: analyticsService
  };

  // Health check for all microservices
  async healthCheck() {
    const healthChecks = await Promise.allSettled([
      Promise.resolve(this.services.user.healthCheck()),
      Promise.resolve(this.services.content.healthCheck()),
      Promise.resolve(this.services.contact.healthCheck()),
      Promise.resolve(this.services.analytics.healthCheck())
    ]);

    const results = healthChecks.map((result, index) => {
      const serviceName = Object.keys(this.services)[index];
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          status: 'unhealthy',
          service: serviceName,
          timestamp: new Date().toISOString(),
          error: result.reason
        };
      }
    });

    const allHealthy = results.every(r => r.status === 'healthy');

    return {
      overall: allHealthy ? 'healthy' : 'degraded',
      services: results,
      timestamp: new Date().toISOString()
    };
  }

  // Service discovery
  getService(serviceName: keyof typeof this.services) {
    return this.services[serviceName];
  }

  // Cross-service operations for TechVantage Solutions
  async createContactWithAnalytics(contactData: any, sessionId: string) {
    // Create contact using contact service
    const contact = await this.services.contact.createContact(contactData);
    
    // Track the event using analytics service
    await this.services.analytics.trackContactForm('contact', sessionId, contact.id);
    
    // Track service interest if provided
    if (contactData.service) {
      await this.services.analytics.trackServiceInterest(contactData.service, sessionId, contact.id);
    }
    
    return contact;
  }

  async createQuoteWithAnalytics(quoteData: any, sessionId: string, contactId?: string) {
    // Create quote using contact service
    const quote = await this.services.contact.createQuote(quoteData);
    
    // Track the event using analytics service
    await this.services.analytics.trackContactForm('quote', sessionId, contactId);
    
    // Track service interest
    await this.services.analytics.trackServiceInterest(quoteData.service, sessionId, contactId);
    
    return quote;
  }

  async getProjectWithAnalytics(projectId: string, sessionId: string) {
    // Get project using content service
    const project = await this.services.content.getProjectById(projectId);
    
    if (project) {
      // Track project view using analytics service
      await this.services.analytics.trackProjectView(projectId, project.category, sessionId);
    }
    
    return project;
  }

  async getBlogPostWithAnalytics(blogId: string, sessionId: string) {
    // Get blog post using content service
    const blogPost = await this.services.content.getBlogPostById(blogId);
    
    if (blogPost) {
      // Track blog read using analytics service
      await this.services.analytics.trackBlogRead(blogId, blogPost.category, sessionId);
    }
    
    return blogPost;
  }

  // Dashboard aggregation across all services
  async getDashboardData(timeframe: 'today' | 'week' | 'month' = 'today') {
    const [contentStats, leadAnalytics, analyticsMetrics] = await Promise.all([
      this.services.content.getContentStats(),
      this.services.contact.getLeadAnalytics(),
      this.services.analytics.getDashboardMetrics(timeframe)
    ]);

    return {
      content: contentStats,
      leads: leadAnalytics,
      analytics: analyticsMetrics,
      timestamp: new Date().toISOString()
    };
  }

  // Service metrics for monitoring
  async getServiceMetrics() {
    const health = await this.healthCheck();
    const dashboard = await this.getDashboardData('today');

    return {
      health,
      performance: {
        totalRequests: dashboard.analytics.totalEvents,
        conversionRate: dashboard.leads.conversionRate,
        contentItems: dashboard.content.projects.total + dashboard.content.blogPosts.total,
        activeServices: health.services.filter(s => s.status === 'healthy').length
      },
      timestamp: new Date().toISOString()
    };
  }

  // Batch operations for efficiency
  async batchTrackEvents(events: Array<{
    type: 'page_view' | 'service_interest' | 'project_view' | 'blog_read';
    data: any;
    sessionId: string;
  }>) {
    const trackingPromises = events.map(event => {
      switch (event.type) {
        case 'page_view':
          return this.services.analytics.trackPageView(event.data.path, {
            sessionId: event.sessionId,
            ...event.data
          });
        case 'service_interest':
          return this.services.analytics.trackServiceInterest(
            event.data.service, 
            event.sessionId
          );
        case 'project_view':
          return this.services.analytics.trackProjectView(
            event.data.projectId,
            event.data.category,
            event.sessionId
          );
        case 'blog_read':
          return this.services.analytics.trackBlogRead(
            event.data.blogId,
            event.data.category,
            event.sessionId
          );
        default:
          return Promise.resolve();
      }
    });

    await Promise.allSettled(trackingPromises);
  }
}

export const orchestrator = new MicroserviceOrchestrator();