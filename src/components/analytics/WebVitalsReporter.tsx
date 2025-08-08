'use client';

import { useEffect } from 'react';
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals';
import { portfolioEvents } from '@/lib/analytics';

export const WebVitalsReporter = () => {
  useEffect(() => {
    const report = (metric: { name: string; value: number }) => {
      portfolioEvents.performanceMetric(metric.name, metric.value);
    };
    onLCP(report);
    onINP(report);
    onCLS(report);
    onFCP(report);
    onTTFB(report);
  }, []);
  return null;
};

export default WebVitalsReporter;


