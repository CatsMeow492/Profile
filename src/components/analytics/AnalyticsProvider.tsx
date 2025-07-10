'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { initGA, isAnalyticsEnabled } from '@/lib/analytics';
import { 
  usePageTracking, 
  useScrollTracking, 
  usePerformanceTracking, 
  useErrorTracking 
} from '@/hooks/useAnalytics';

interface AnalyticsContextType {
  isEnabled: boolean;
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  isEnabled: false,
});

export const useAnalyticsContext = () => useContext(AnalyticsContext);

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  const isEnabled = Boolean(isAnalyticsEnabled());

  // Initialize analytics
  useEffect(() => {
    if (isEnabled) {
      initGA();
    }
  }, [isEnabled]);

  // Global tracking hooks
  usePageTracking();
  useScrollTracking();
  usePerformanceTracking();
  useErrorTracking();

  return (
    <AnalyticsContext.Provider value={{ isEnabled }}>
      {children}
    </AnalyticsContext.Provider>
  );
}; 