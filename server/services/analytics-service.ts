export class AnalyticsService {
  private events: Array<{
    id: string;
    event: string;
    category: string;
    label?: string;
    value?: number;
    userId?: string;
    sessionId: string;
    timestamp: Date;
    metadata?: Record<string, any>;
  }> = [];

  // Event tracking
  async trackEvent(
    event: string,
    category: string,
    options: {
      label?: string;
      value?: number;
      userId?: string;
      sessionId: string;
      metadata?: Record<string, any>;
    }
  ): Promise<void> {
    const eventData = {
      id: crypto.randomUUID(),
      event,
      category,
      ...options,
      timestamp: new Date()
    };

    this.events.push(eventData);

    // In a real microservice, this would:
    // - Send to Google Analytics
    // - Store in analytics database
    // - Send to other tracking services (Mixpanel, Amplitude, etc.)
    console.log('Event tracked:', eventData);
  }

  // Page view tracking
  async trackPageView(
    path: string,
    options: {
      title?: string;
      userId?: string;
      sessionId: string;
      referrer?: string;
    }
  ): Promise<void> {
    await this.trackEvent('page_view', 'navigation', {
      label: path,
      ...options,
      metadata: {
        path,
        title: options.title,
        referrer: options.referrer
      }
    });
  }

  // Service-specific tracking for TechVantage
  async trackServiceInterest(service: string, sessionId: string, userId?: string): Promise<void> {
    await this.trackEvent('service_interest', 'services', {
      label: service,
      sessionId,
      userId,
      metadata: { service }
    });
  }

  async trackContactForm(type: 'contact' | 'quote', sessionId: string, userId?: string): Promise<void> {
    await this.trackEvent('form_submission', 'conversion', {
      label: type,
      value: type === 'quote' ? 2 : 1, // Quote requests are more valuable
      sessionId,
      userId,
      metadata: { formType: type }
    });
  }

  async trackProjectView(projectId: string, category: string, sessionId: string): Promise<void> {
    await this.trackEvent('project_view', 'content', {
      label: category,
      sessionId,
      metadata: { projectId, category }
    });
  }

  async trackBlogRead(blogId: string, category: string, sessionId: string): Promise<void> {
    await this.trackEvent('blog_read', 'content', {
      label: category,
      sessionId,
      metadata: { blogId, category }
    });
  }

  // Analytics reporting
  async getEventsByTimeRange(startDate: Date, endDate: Date) {
    return this.events.filter(event => 
      event.timestamp >= startDate && event.timestamp <= endDate
    );
  }

  async getTopEvents(limit: number = 10) {
    const eventCounts = this.events.reduce((acc, event) => {
      const key = `${event.category}:${event.event}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(eventCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([event, count]) => ({ event, count }));
  }

  async getServiceInterestAnalytics() {
    const serviceEvents = this.events.filter(e => e.event === 'service_interest');
    const serviceCounts = serviceEvents.reduce((acc, event) => {
      const service = event.metadata?.service || 'unknown';
      acc[service] = (acc[service] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(serviceCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([service, count]) => ({ service, count }));
  }

  async getConversionFunnel() {
    const pageViews = this.events.filter(e => e.event === 'page_view').length;
    const serviceInterests = this.events.filter(e => e.event === 'service_interest').length;
    const formSubmissions = this.events.filter(e => e.event === 'form_submission').length;

    return {
      pageViews,
      serviceInterests,
      formSubmissions,
      interestRate: pageViews > 0 ? ((serviceInterests / pageViews) * 100).toFixed(2) : '0.00',
      conversionRate: serviceInterests > 0 ? ((formSubmissions / serviceInterests) * 100).toFixed(2) : '0.00'
    };
  }

  // Real-time analytics dashboard data
  async getDashboardMetrics(timeframe: 'today' | 'week' | 'month' = 'today') {
    const now = new Date();
    let startDate: Date;

    switch (timeframe) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
    }

    const eventsInPeriod = await this.getEventsByTimeRange(startDate, now);

    const metrics = {
      totalEvents: eventsInPeriod.length,
      pageViews: eventsInPeriod.filter(e => e.event === 'page_view').length,
      serviceInterests: eventsInPeriod.filter(e => e.event === 'service_interest').length,
      formSubmissions: eventsInPeriod.filter(e => e.event === 'form_submission').length,
      topServices: {} as Record<string, number>,
      topPages: {} as Record<string, number>
    };

    // Calculate top services
    eventsInPeriod
      .filter(e => e.event === 'service_interest')
      .forEach(event => {
        const service = event.metadata?.service || 'unknown';
        metrics.topServices[service] = (metrics.topServices[service] || 0) + 1;
      });

    // Calculate top pages
    eventsInPeriod
      .filter(e => e.event === 'page_view')
      .forEach(event => {
        const page = event.metadata?.path || 'unknown';
        metrics.topPages[page] = (metrics.topPages[page] || 0) + 1;
      });

    return metrics;
  }

  // Google Analytics integration helper
  async getGoogleAnalyticsConfig() {
    return {
      measurementId: process.env.VITE_GA_MEASUREMENT_ID,
      isConfigured: !!process.env.VITE_GA_MEASUREMENT_ID,
      customDimensions: {
        service_interest: 'custom_dimension_1',
        user_type: 'custom_dimension_2',
        project_category: 'custom_dimension_3'
      }
    };
  }

  // Health check for this microservice
  healthCheck(): { status: string; service: string; timestamp: string; events: number } {
    return {
      status: "healthy",
      service: "analytics-service",
      timestamp: new Date().toISOString(),
      events: this.events.length
    };
  }

  // Clear analytics data (for testing/development)
  async clearAnalytics(): Promise<void> {
    this.events = [];
  }
}

export const analyticsService = new AnalyticsService();