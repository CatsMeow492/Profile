// Analytics configuration and utilities
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export const isProduction = process.env.NODE_ENV === 'production';

// Check if analytics should be enabled
export const isAnalyticsEnabled = () => {
  return isProduction && GA_TRACKING_ID && typeof window !== 'undefined';
};

// Initialize Google Analytics
export const initGA = () => {
  if (!isAnalyticsEnabled()) return;

  // Initialize dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || [];
  
  // Define gtag function
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  
  window.gtag = gtag;

  // Configure Google Analytics
  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
    // Privacy settings
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
};

// Track page views
export const trackPageView = (url: string) => {
  if (!isAnalyticsEnabled()) return;

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    page_title: document.title,
  });
};

// Custom event tracking
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, unknown>;
}

export const trackEvent = ({ action, category, label, value, custom_parameters }: AnalyticsEvent) => {
  if (!isAnalyticsEnabled()) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...custom_parameters,
  });
};

// Portfolio-specific event tracking
export const portfolioEvents = {
  // Section interactions
  viewSection: (section: string) => {
    trackEvent({
      action: 'view_section',
      category: 'engagement',
      label: section,
    });
  },

  // Navigation events
  clickNavigation: (destination: string) => {
    trackEvent({
      action: 'click_navigation',
      category: 'navigation',
      label: destination,
    });
  },

  // Project interactions
  viewProject: (projectName: string) => {
    trackEvent({
      action: 'view_project',
      category: 'projects',
      label: projectName,
    });
  },

  clickProjectLink: (projectName: string, linkType: 'github' | 'demo' | 'docs') => {
    trackEvent({
      action: 'click_project_link',
      category: 'projects',
      label: `${projectName}_${linkType}`,
    });
  },

  // Research interactions
  viewResearchPaper: (paperTitle: string) => {
    trackEvent({
      action: 'view_research_paper',
      category: 'research',
      label: paperTitle,
    });
  },

  clickResearchLink: (paperTitle: string, linkType: 'doi' | 'pdf' | 'arxiv') => {
    trackEvent({
      action: 'click_research_link',
      category: 'research',
      label: `${paperTitle}_${linkType}`,
    });
  },

  // Contact interactions
  clickContact: (method: 'email' | 'linkedin' | 'github' | 'twitter') => {
    trackEvent({
      action: 'click_contact',
      category: 'contact',
      label: method,
    });
  },

  // Download events
  downloadResume: () => {
    trackEvent({
      action: 'download_resume',
      category: 'engagement',
      label: 'resume_pdf',
    });
  },

  // Scroll depth tracking
  scrollDepth: (percentage: number) => {
    trackEvent({
      action: 'scroll_depth',
      category: 'engagement',
      label: `${percentage}%`,
      value: percentage,
    });
  },

  // Time on page tracking
  timeOnPage: (seconds: number) => {
    trackEvent({
      action: 'time_on_page',
      category: 'engagement',
      value: seconds,
    });
  },

  // Performance events
  performanceMetric: (metric: string, value: number) => {
    trackEvent({
      action: 'performance_metric',
      category: 'performance',
      label: metric,
      value: Math.round(value),
    });
  },

  // Error tracking
  trackError: (error: string, location: string) => {
    trackEvent({
      action: 'error',
      category: 'technical',
      label: `${location}: ${error}`,
    });
  },

  // Search events (if search functionality is added)
  search: (query: string, results: number) => {
    trackEvent({
      action: 'search',
      category: 'engagement',
      label: query,
      value: results,
    });
  },
};

// Conversion tracking for portfolio goals
export const trackConversion = (conversionType: 'contact_form' | 'resume_download' | 'project_click' | 'research_view') => {
  if (!isAnalyticsEnabled()) return;

  window.gtag('event', 'conversion', {
    send_to: GA_TRACKING_ID,
    event_category: 'conversions',
    event_label: conversionType,
  });
};

// Enhanced e-commerce tracking for project portfolio
export const trackProjectEngagement = (projectName: string, engagementType: 'view' | 'click' | 'download') => {
  if (!isAnalyticsEnabled()) return;

  window.gtag('event', 'select_item', {
    item_list_id: 'portfolio_projects',
    item_list_name: 'Portfolio Projects',
    items: [
      {
        item_id: projectName.toLowerCase().replace(/\s+/g, '_'),
        item_name: projectName,
        item_category: 'project',
        item_variant: engagementType,
      },
    ],
  });
};

// User properties for segmentation
export const setUserProperties = (properties: Record<string, string>) => {
  if (!isAnalyticsEnabled()) return;

  window.gtag('config', GA_TRACKING_ID, {
    user_properties: properties,
  });
};

// Privacy and consent management
export const consent = {
  granted: () => {
    if (!isAnalyticsEnabled()) return;
    
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied', // We don't use ads
    });
  },

  denied: () => {
    if (!isAnalyticsEnabled()) return;
    
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
    });
  },

  // Check if user has given consent (implement based on your consent mechanism)
  hasConsent: (): boolean => {
    // For now, assume consent in production, deny in development
    return isProduction;
  },
}; 