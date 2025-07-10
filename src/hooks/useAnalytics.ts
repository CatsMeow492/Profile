'use client';

import { useEffect, useRef, useCallback } from 'react';
import { portfolioEvents, trackConversion, trackProjectEngagement } from '@/lib/analytics';

// Hook for tracking page views and time on page
export const usePageTracking = () => {
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    startTimeRef.current = Date.now();

    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      if (timeSpent > 5) { // Only track if user spent more than 5 seconds
        portfolioEvents.timeOnPage(timeSpent);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleBeforeUnload();
    };
  }, []);
};

// Hook for tracking scroll depth
export const useScrollTracking = () => {
  const scrollDepthRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      // Track at 25%, 50%, 75%, and 100%
      const milestones = [25, 50, 75, 100];
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollDepthRef.current.has(milestone)) {
          scrollDepthRef.current.add(milestone);
          portfolioEvents.scrollDepth(milestone);
        }
      });
    };

    const throttledScroll = throttle(handleScroll, 1000);
    window.addEventListener('scroll', throttledScroll);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);
};

// Hook for tracking section visibility
export const useSectionTracking = (sectionName: string) => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasTracked.current) {
            portfolioEvents.viewSection(sectionName);
            hasTracked.current = true;
          }
        });
      },
      { threshold: 0.5, rootMargin: '-50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, [sectionName]);

  return sectionRef;
};

// Hook for tracking clicks with analytics
export const useClickTracking = () => {
  const trackClick = useCallback((
    event: React.MouseEvent,
    category: string,
    action?: string,
    label?: string
  ) => {
    const target = event.currentTarget as HTMLElement;
    const finalAction = action || 'click';
    const finalLabel = label || target.textContent || target.getAttribute('aria-label') || 'unknown';

    portfolioEvents.clickNavigation(`${category}_${finalLabel}`);
  }, []);

  return { trackClick };
};

// Hook for tracking project interactions
export const useProjectTracking = () => {
  const trackProjectView = useCallback((projectName: string) => {
    portfolioEvents.viewProject(projectName);
    trackProjectEngagement(projectName, 'view');
  }, []);

  const trackProjectClick = useCallback((
    projectName: string, 
    linkType: 'github' | 'demo' | 'docs'
  ) => {
    portfolioEvents.clickProjectLink(projectName, linkType);
    trackProjectEngagement(projectName, 'click');
    trackConversion('project_click');
  }, []);

  return { trackProjectView, trackProjectClick };
};

// Hook for tracking research interactions
export const useResearchTracking = () => {
  const trackResearchView = useCallback((paperTitle: string) => {
    portfolioEvents.viewResearchPaper(paperTitle);
    trackConversion('research_view');
  }, []);

  const trackResearchClick = useCallback((
    paperTitle: string,
    linkType: 'doi' | 'pdf' | 'arxiv'
  ) => {
    portfolioEvents.clickResearchLink(paperTitle, linkType);
  }, []);

  return { trackResearchView, trackResearchClick };
};

// Hook for tracking contact interactions
export const useContactTracking = () => {
  const trackContactClick = useCallback((method: 'email' | 'linkedin' | 'github' | 'twitter') => {
    portfolioEvents.clickContact(method);
    trackConversion('contact_form');
  }, []);

  const trackResumeDownload = useCallback(() => {
    portfolioEvents.downloadResume();
    trackConversion('resume_download');
  }, []);

  return { trackContactClick, trackResumeDownload };
};

// Hook for tracking performance metrics
export const usePerformanceTracking = () => {
  useEffect(() => {
    // Track Core Web Vitals when available
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // First Contentful Paint
      const paintObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            portfolioEvents.performanceMetric('FCP', entry.startTime);
          }
        });
      });
      paintObserver.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        portfolioEvents.performanceMetric('LCP', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        portfolioEvents.performanceMetric('CLS', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      return () => {
        paintObserver.disconnect();
        lcpObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);
};

// Hook for error tracking
export const useErrorTracking = () => {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      portfolioEvents.trackError(
        event.error?.message || 'Unknown error',
        event.filename || 'Unknown location'
      );
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      portfolioEvents.trackError(
        event.reason?.message || 'Unhandled promise rejection',
        'Promise rejection'
      );
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);
};

// Utility function for throttling
function throttle<T extends (...args: any[]) => any>(func: T, delay: number): T {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  
  return ((...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  }) as T;
} 