import { addBreadcrumb, captureMessage } from "./sentry";

// Simple performance monitoring utilities
export const performanceMonitor = {
  init() {
    if (typeof window === 'undefined') return;

    // Track Web Vitals and performance metrics
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.processEntry(entry);
        });
      });

      try {
        observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'layout-shift'] });
      } catch (e) {
        console.warn('Some performance metrics not supported');
      }
    }

    this.initLayoutShiftTracking();
  },

  processEntry(entry: PerformanceEntry) {
    const type = entry.entryType;

    // Track Large Contentful Paint
    if (type === 'largest-contentful-paint') {
      if (entry.startTime > 2500) { // LCP > 2.5s is poor
        captureMessage('Poor LCP Performance', 'warning', {
          metric: 'largest-contentful-paint',
          value: entry.startTime,
          threshold: 2500
        });
      }
    }
  },

  initLayoutShiftTracking() {
    let cumulativeLayoutShift = 0;
    
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
            cumulativeLayoutShift += (entry as any).value;
          }
        }
      });

      try {
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('Layout shift monitoring not supported');
      }
    }

    // Report CLS on page visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden' && cumulativeLayoutShift > 0.1) {
        captureMessage('Poor CLS Performance', 'warning', {
          metric: 'cumulative-layout-shift',
          value: cumulativeLayoutShift,
          threshold: 0.1
        });
      }
    });
  },

  measureTiming(name: string, fn: () => void) {
    const startTime = performance.now();
    
    try {
      fn();
    } finally {
      const duration = performance.now() - startTime;
      
      addBreadcrumb(`Performance: ${name}`, 'performance', {
        duration: Math.round(duration)
      });

      if (duration > 100) {
        captureMessage('Slow Operation', 'info', {
          operation: name,
          duration: Math.round(duration)
        });
      }
    }
  },

  async measureAsyncTiming<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const startTime = performance.now();
    
    try {
      return await fn();
    } finally {
      const duration = performance.now() - startTime;
      
      addBreadcrumb(`Async Performance: ${name}`, 'performance', {
        duration: Math.round(duration)
      });

      if (duration > 500) {
        captureMessage('Slow Async Operation', 'info', {
          operation: name,
          duration: Math.round(duration)
        });
      }
    }
  },

  getMetrics() {
    const metrics: Record<string, any> = {};

    // Navigation timing
    if ('navigation' in performance) {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (nav) {
        metrics.pageLoad = {
          domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart),
          loadComplete: Math.round(nav.loadEventEnd - nav.loadEventStart),
          firstByte: Math.round(nav.responseStart - nav.requestStart),
          domInteractive: Math.round(nav.domInteractive - nav.fetchStart)
        };
      }
    }

    // Paint timing
    const paintEntries = performance.getEntriesByType('paint');
    paintEntries.forEach((entry) => {
      if (entry.name === 'first-contentful-paint') {
        metrics.firstContentfulPaint = Math.round(entry.startTime);
      }
      if (entry.name === 'first-paint') {
        metrics.firstPaint = Math.round(entry.startTime);
      }
    });

    // Largest Contentful Paint
    const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
    if (lcpEntries.length > 0) {
      const lcp = lcpEntries[lcpEntries.length - 1];
      metrics.largestContentfulPaint = Math.round(lcp.startTime);
    }

    return metrics;
  },

  reportMetrics() {
    const metrics = this.getMetrics();
    
    captureMessage('Performance Metrics Report', 'info', {
      event_type: 'performance_report',
      ...metrics
    });

    return metrics;
  }
};

// Resource optimization utilities
export const resourceOptimizer = {
  preloadedResources: new Set<string>(),

  preloadResource(href: string, as: 'image' | 'script' | 'style' | 'font') {
    if (this.preloadedResources.has(href)) return;
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    
    if (as === 'font') {
      link.crossOrigin = 'anonymous';
    }
    
    document.head.appendChild(link);
    this.preloadedResources.add(href);
    
    addBreadcrumb(`Preloaded resource: ${href}`, 'resource', { type: as });
  },

  preloadCriticalImages(urls: string[]) {
    urls.forEach(url => this.preloadResource(url, 'image'));
  }
};

// Memory monitoring utilities
export const memoryMonitor = {
  getCurrentUsage() {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024), // MB
      };
    }
    return null;
  },

  startMonitoring(intervalMs = 30000) {
    return setInterval(() => {
      const usage = this.getCurrentUsage();
      if (usage && usage.used > 50) { // Alert if using more than 50MB
        captureMessage('High Memory Usage', 'warning', {
          metric: 'memory_usage',
          used_mb: usage.used,
          total_mb: usage.total,
          limit_mb: usage.limit
        });
      }
    }, intervalMs);
  }
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (typeof window === 'undefined') return;

  performanceMonitor.init();
  
  // Report metrics on page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      performanceMonitor.reportMetrics();
    }, 2000); // Wait 2s for metrics to stabilize
  });

  // Start memory monitoring in production
  if (import.meta.env.PROD) {
    memoryMonitor.startMonitoring();
  }
};