import * as Sentry from "@sentry/react";

// Initialize Sentry
export const initSentry = () => {
  // Only initialize in production or if DSN is provided
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  
  if (!dsn) {
    console.warn('Sentry DSN not provided - error tracking disabled');
    return;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE || 'development',
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    
    // Performance monitoring
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
    
    
    // Custom error filtering
    beforeSend(event, hint) {
      // Don't send events for development errors we expect
      if (import.meta.env.DEV) {
        // Filter out development-only errors
        if (event.exception?.values?.[0]?.value?.includes('ResizeObserver loop limit exceeded')) {
          return null;
        }
      }
      
      // Add additional context
      if (event.contexts) {
        event.contexts.app = {
          name: 'TechVantage Solutions',
          version: '1.0.0',
        };
      }
      
      return event;
    },
    
    // Set initial user context
    initialScope: {
      tags: {
        component: 'techvantage-website'
      },
      level: 'info',
    },
  });
};

// Custom error boundary component
export const ErrorBoundary = Sentry.withErrorBoundary;

// Manual error capture utilities
export const captureError = (error: Error, context?: Record<string, any>) => {
  Sentry.withScope((scope) => {
    if (context) {
      Object.keys(context).forEach(key => {
        scope.setTag(key, context[key]);
      });
    }
    Sentry.captureException(error);
  });
};

export const captureMessage = (message: string, level: Sentry.SeverityLevel = 'info', context?: Record<string, any>) => {
  Sentry.withScope((scope) => {
    scope.setLevel(level);
    if (context) {
      Object.keys(context).forEach(key => {
        scope.setTag(key, context[key]);
      });
    }
    Sentry.captureMessage(message);
  });
};

// Performance monitoring utilities
export const startTransaction = (name: string, op: string) => {
  return Sentry.startSpan({
    name,
    op,
  }, () => {});
};

export const addBreadcrumb = (message: string, category: string, data?: Record<string, any>) => {
  Sentry.addBreadcrumb({
    message,
    category,
    data,
    level: 'info',
  });
};

// User context utilities
export const setUserContext = (user: { id?: string; email?: string; username?: string }) => {
  Sentry.setUser(user);
};

export const setTagContext = (key: string, value: string) => {
  Sentry.setTag(key, value);
};

// Business metrics tracking
export const trackBusinessEvent = (event: string, properties?: Record<string, any>) => {
  addBreadcrumb(`Business Event: ${event}`, 'business', properties);
  
  // Also capture as a message for business intelligence
  captureMessage(`Business Event: ${event}`, 'info', {
    event_type: 'business',
    event_name: event,
    ...properties
  });
};

// API error tracking
export const trackAPIError = (endpoint: string, error: Error, statusCode?: number) => {
  Sentry.withScope((scope) => {
    scope.setTag('api_endpoint', endpoint);
    scope.setTag('http_status', statusCode?.toString() || 'unknown');
    scope.setLevel('error');
    Sentry.captureException(error);
  });
};

// Form error tracking
export const trackFormError = (formName: string, fieldName: string, error: string) => {
  captureMessage(`Form validation error in ${formName}`, 'warning', {
    form_name: formName,
    field_name: fieldName,
    error_message: error,
    event_type: 'form_error'
  });
};

// Export Sentry for advanced usage
export { Sentry };