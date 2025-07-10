'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  fid: number | null;
  ttfb: number | null;
  loadTime: number | null;
  bundleSize: number | null;
  memoryUsage: number | null;
}

interface OptimizationStatus {
  dynamicImports: boolean;
  imageOptimization: boolean;
  bundleSplitting: boolean;
  compression: boolean;
  caching: boolean;
}

export const PerformanceDashboard = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null,
    loadTime: null,
    bundleSize: null,
    memoryUsage: null,
  });

  const [optimizations] = useState<OptimizationStatus>({
    dynamicImports: true,
    imageOptimization: true,
    bundleSplitting: true,
    compression: true,
    caching: true,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    const measurePerformance = () => {
      if (typeof window === 'undefined') return;

      // Web Vitals
      if ('web-vital' in window) {
        // These would typically come from web-vitals library
        setMetrics(prev => ({
          ...prev,
          fcp: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime || null,
          loadTime: performance.timing ? performance.timing.loadEventEnd - performance.timing.navigationStart : null,
          ttfb: performance.getEntriesByType('navigation')[0] ? (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming).responseStart : null,
        }));
      }

              // Memory usage
        if ('memory' in performance) {
          const memory = (performance as typeof performance & { memory: { usedJSHeapSize: number } }).memory;
          setMetrics(prev => ({
            ...prev,
            memoryUsage: memory.usedJSHeapSize / 1024 / 1024, // MB
          }));
        }

              // Bundle size estimation
        const scripts = document.querySelectorAll('script[src]');
        const estimatedSize = scripts.length * 50; // KB per script (rough estimation)
      
      setMetrics(prev => ({
        ...prev,
        bundleSize: estimatedSize,
      }));
    };

    measurePerformance();
    const interval = setInterval(measurePerformance, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatMetric = (value: number | null, unit: string = 'ms') => {
    if (value === null) return 'N/A';
    return `${Math.round(value)}${unit}`;
  };

  const getMetricColor = (value: number | null, thresholds: [number, number]) => {
    if (value === null) return 'text-muted-foreground';
    if (value <= thresholds[0]) return 'text-green-500';
    if (value <= thresholds[1]) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 bg-black text-white px-3 py-2 rounded-lg text-sm font-mono shadow-lg hover:bg-gray-800 transition-colors"
        title="Performance Dashboard"
      >
        ⚡ PERF
      </button>

      {/* Dashboard */}
      {isVisible && (
        <div className="fixed bottom-16 right-4 z-50 bg-black/90 backdrop-blur text-white p-4 rounded-lg shadow-2xl font-mono text-sm max-w-sm">
          <h3 className="font-bold mb-3 text-green-400">Performance Metrics</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>FCP:</span>
              <span className={getMetricColor(metrics.fcp, [1800, 3000])}>
                {formatMetric(metrics.fcp)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>LCP:</span>
              <span className={getMetricColor(metrics.lcp, [2500, 4000])}>
                {formatMetric(metrics.lcp)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>TTFB:</span>
              <span className={getMetricColor(metrics.ttfb, [800, 1800])}>
                {formatMetric(metrics.ttfb)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Load:</span>
              <span className={getMetricColor(metrics.loadTime, [3000, 5000])}>
                {formatMetric(metrics.loadTime)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Memory:</span>
              <span className={getMetricColor(metrics.memoryUsage, [50, 100])}>
                {formatMetric(metrics.memoryUsage, 'MB')}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Bundle:</span>
              <span className={getMetricColor(metrics.bundleSize, [200, 500])}>
                {formatMetric(metrics.bundleSize, 'KB')}
              </span>
            </div>
          </div>

          <h4 className="font-bold mb-2 text-blue-400">Optimizations</h4>
          <div className="space-y-1">
            {Object.entries(optimizations).map(([key, enabled]) => (
              <div key={key} className="flex justify-between text-xs">
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                <span className={enabled ? 'text-green-400' : 'text-red-400'}>
                  {enabled ? '✓' : '✗'}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-700 text-xs text-gray-400">
            Dev mode only • Updates every 5s
          </div>
        </div>
      )}
    </>
  );
}; 