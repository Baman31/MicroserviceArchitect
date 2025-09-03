import { useEffect, useState } from 'react';

export const useSession = () => {
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    // Generate or retrieve session ID
    let session = localStorage.getItem('techvantage-session');
    if (!session) {
      session = crypto.randomUUID();
      localStorage.setItem('techvantage-session', session);
    }
    setSessionId(session);
  }, []);

  return sessionId;
};

export const useAnalyticsTracking = () => {
  const sessionId = useSession();

  const trackEvent = async (event: string, category: string, options?: {
    label?: string;
    value?: number;
  }) => {
    if (!sessionId) return;

    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-ID': sessionId,
        },
        body: JSON.stringify({
          event,
          category,
          ...options
        })
      });
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  };

  const trackServiceInterest = (service: string) => {
    trackEvent('service_interest', 'services', { label: service });
  };

  const trackProjectView = (projectId: string, category: string) => {
    trackEvent('project_view', 'content', { label: category });
  };

  const trackBlogRead = (blogId: string, category: string) => {
    trackEvent('blog_read', 'content', { label: category });
  };

  return {
    sessionId,
    trackEvent,
    trackServiceInterest,
    trackProjectView,
    trackBlogRead
  };
};