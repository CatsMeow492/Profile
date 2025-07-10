'use client';

import { useEffect, useState } from 'react';
import { useAnalyticsContext } from './AnalyticsProvider';
import { GA_TRACKING_ID } from '@/lib/analytics';

interface AnalyticsEvent {
  timestamp: Date;
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const AnalyticsDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [sessionStats, setSessionStats] = useState({
    pageViews: 0,
    events: 0,
    scrollDepth: 0,
    timeOnPage: 0,
  });
  
  const { isEnabled } = useAnalyticsContext();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    // Intercept gtag calls to log events
    const originalGtag = window.gtag;
    if (originalGtag) {
      window.gtag = (...args: unknown[]) => {
        // Call original gtag
        originalGtag(...args);
        
        // Log the event
        if (args[0] === 'event' && typeof args[1] === 'string') {
          const eventAction = args[1];
          const eventData = args[2] as Record<string, unknown> || {};
          
          const newEvent: AnalyticsEvent = {
            timestamp: new Date(),
            action: eventAction,
            category: (eventData.event_category as string) || 'unknown',
            label: eventData.event_label as string,
            value: eventData.value as number,
          };
          
          setEvents(prev => [newEvent, ...prev.slice(0, 49)]); // Keep last 50 events
          setSessionStats(prev => ({
            ...prev,
            events: prev.events + 1,
          }));
        }
        
        if (args[0] === 'config') {
          setSessionStats(prev => ({
            ...prev,
            pageViews: prev.pageViews + 1,
          }));
        }
      };
    }

    return () => {
      if (originalGtag) {
        window.gtag = originalGtag;
      }
    };
  }, []);

  const analyticsFeatures = [
    { name: 'Google Analytics 4', status: isEnabled ? 'Active' : 'Disabled', description: 'Core analytics tracking' },
    { name: 'Page View Tracking', status: 'Active', description: 'Automatic page view recording' },
    { name: 'Scroll Depth Tracking', status: 'Active', description: '25%, 50%, 75%, 100% milestones' },
    { name: 'Time on Page', status: 'Active', description: 'User engagement duration' },
    { name: 'Section Visibility', status: 'Active', description: 'Portfolio section viewing' },
    { name: 'Click Tracking', status: 'Active', description: 'Link and button interactions' },
    { name: 'Project Engagement', status: 'Active', description: 'Project view and click tracking' },
    { name: 'Research Interactions', status: 'Active', description: 'Paper view and link clicks' },
    { name: 'Contact Tracking', status: 'Active', description: 'Contact method usage' },
    { name: 'Performance Metrics', status: 'Active', description: 'Core Web Vitals tracking' },
    { name: 'Error Tracking', status: 'Active', description: 'JavaScript error monitoring' },
    { name: 'Conversion Tracking', status: 'Active', description: 'Goal completion tracking' },
  ];

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600';
      case 'Disabled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-68 right-4 z-50 bg-orange-600 text-white px-3 py-2 rounded-lg text-sm font-mono shadow-lg hover:bg-orange-700 transition-colors"
        title="Analytics Dashboard"
      >
        📊 ANALYTICS ({events.length})
      </button>

      {isVisible && (
        <div className="fixed inset-4 z-50 bg-white/95 backdrop-blur border rounded-lg shadow-2xl overflow-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Status Overview */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Status</h3>
                <div className="text-2xl font-bold text-blue-600">
                  {isEnabled ? '✓ Active' : '✗ Disabled'}
                </div>
                <div className="text-sm text-blue-700 mt-1">
                  {isEnabled ? 'Production tracking' : 'Development mode'}
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">Page Views</h3>
                <div className="text-2xl font-bold text-green-600">{sessionStats.pageViews}</div>
                <div className="text-sm text-green-700 mt-1">This session</div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">Events</h3>
                <div className="text-2xl font-bold text-purple-600">{sessionStats.events}</div>
                <div className="text-sm text-purple-700 mt-1">Tracked interactions</div>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <h3 className="font-semibold text-indigo-800 mb-2">Features</h3>
                <div className="text-2xl font-bold text-indigo-600">{analyticsFeatures.length}</div>
                <div className="text-sm text-indigo-700 mt-1">Tracking capabilities</div>
              </div>
            </div>

            {/* Recent Events */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Recent Events</h3>
              <div className="bg-gray-50 rounded-lg max-h-64 overflow-y-auto">
                {events.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No events tracked yet. Interact with the page to see analytics events.
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {events.map((event, index) => (
                      <div key={index} className="p-3 hover:bg-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{event.action}</div>
                            <div className="text-sm text-gray-600">
                              {event.category} {event.label && `• ${event.label}`}
                              {event.value !== undefined && ` • Value: ${event.value}`}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 font-mono">
                            {formatTimestamp(event.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Analytics Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Analytics Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {analyticsFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className={`font-mono text-sm mt-0.5 ${getStatusColor(feature.status)}`}>
                      {feature.status === 'Active' ? '✓' : '✗'}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{feature.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Configuration */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-4">Configuration</h4>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p><strong>Tracking ID:</strong> {GA_TRACKING_ID || 'Not configured'}</p>
                  <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
                  <p><strong>Privacy Mode:</strong> IP anonymization enabled</p>
                </div>
                <div>
                  <p><strong>Ad Storage:</strong> Denied</p>
                  <p><strong>Analytics Storage:</strong> {isEnabled ? 'Granted' : 'Denied'}</p>
                  <p><strong>Cookie Settings:</strong> SameSite=Strict;Secure</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold mb-2 text-orange-900">Next Steps (Step 18: Final Testing & QA)</h4>
              <p className="text-sm text-orange-800">
                With analytics integration complete, the next phase will focus on comprehensive testing, 
                final quality assurance, and deployment preparation.
              </p>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Development mode only • Real-time event tracking • Privacy-compliant configuration
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 