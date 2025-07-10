export interface PerformanceMetrics {
  pageLoadTime: number;
  domContentLoadedTime: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  cumulativeLayoutShift?: number;
  firstInputDelay?: number;
}

// Define performance entry interfaces
interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
}

interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

export class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMonitoring();
    }
  }

  private initializeMonitoring() {
    // Monitor navigation timing
    this.monitorNavigationTiming();

    // Monitor Web Vitals
    this.monitorWebVitals();

    // Monitor memory usage
    this.monitorMemoryUsage();
  }

  private monitorNavigationTiming() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
        this.metrics.domContentLoadedTime = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        
        console.log('Performance Metrics:', {
          pageLoadTime: `${this.metrics.pageLoadTime.toFixed(2)}ms`,
          domContentLoadedTime: `${this.metrics.domContentLoadedTime.toFixed(2)}ms`,
        });
      });
    }
  }

  private monitorWebVitals() {
    // First Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              this.metrics.firstContentfulPaint = entry.startTime;
              console.log(`First Contentful Paint: ${entry.startTime.toFixed(2)}ms`);
            }
          });
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
        this.observers.push(fcpObserver);
      } catch {
        console.warn('FCP monitoring not supported');
      }

      // Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.metrics.largestContentfulPaint = lastEntry.startTime;
          console.log(`Largest Contentful Paint: ${lastEntry.startTime.toFixed(2)}ms`);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch {
        console.warn('LCP monitoring not supported');
      }

      // Cumulative Layout Shift
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          list.getEntries().forEach((entry) => {
            const layoutShiftEntry = entry as LayoutShiftEntry;
            if (!layoutShiftEntry.hadRecentInput) {
              clsValue += layoutShiftEntry.value;
            }
          });
          this.metrics.cumulativeLayoutShift = clsValue;
          if (clsValue > 0) {
            console.log(`Cumulative Layout Shift: ${clsValue.toFixed(4)}`);
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch {
        console.warn('CLS monitoring not supported');
      }

      // First Input Delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            const firstInputEntry = entry as FirstInputEntry;
            this.metrics.firstInputDelay = firstInputEntry.processingStart - firstInputEntry.startTime;
            console.log(`First Input Delay: ${this.metrics.firstInputDelay.toFixed(2)}ms`);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch {
        console.warn('FID monitoring not supported');
      }
    }
  }

  private monitorMemoryUsage() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as { memory?: MemoryInfo }).memory;
        if (memory) {
          const memoryInfo = {
            usedJSHeapSize: (memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
            totalJSHeapSize: (memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
            jsHeapSizeLimit: (memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB',
          };
          
          // Only log if memory usage is concerning
          if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.8) {
            console.warn('High memory usage detected:', memoryInfo);
          }
        }
      }, 30000); // Check every 30 seconds
    }
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public logReport() {
    console.group('🔍 Performance Report');
    console.log('Metrics:', this.metrics);
    
    // Performance thresholds (Google recommendations)
    const thresholds = {
      pageLoadTime: 3000, // 3 seconds
      firstContentfulPaint: 1800, // 1.8 seconds
      largestContentfulPaint: 2500, // 2.5 seconds
      cumulativeLayoutShift: 0.1, // 0.1
      firstInputDelay: 100, // 100ms
    };

    // Check thresholds
    Object.entries(thresholds).forEach(([metric, threshold]) => {
      const value = this.metrics[metric as keyof PerformanceMetrics];
      if (value !== undefined) {
        const status = value <= threshold ? '✅' : '⚠️';
        console.log(`${status} ${metric}: ${value} (threshold: ${threshold})`);
      }
    });
    
    console.groupEnd();
  }

  public cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Automated testing functions
export const runBasicTests = () => {
  console.group('🧪 Running Basic Tests');

  // Test 1: Check if all sections exist
  const sections = ['hero', 'experience', 'research', 'certifications', 'projects'];
  sections.forEach(sectionId => {
    const element = document.getElementById(sectionId);
    console.log(`${element ? '✅' : '❌'} Section "${sectionId}" exists`);
  });

  // Test 2: Check navigation links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  console.log(`${navLinks.length > 0 ? '✅' : '❌'} Navigation links found: ${navLinks.length}`);

  // Test 3: Check for broken images
  const images = document.querySelectorAll('img');
  let brokenImages = 0;
  images.forEach(img => {
    if (!img.complete || img.naturalHeight === 0) {
      brokenImages++;
    }
  });
  console.log(`${brokenImages === 0 ? '✅' : '❌'} Broken images: ${brokenImages}/${images.length}`);

  // Test 4: Check external links
  const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="mailto:"]');
  console.log(`${externalLinks.length > 0 ? '✅' : '❌'} External links found: ${externalLinks.length}`);

  // Test 5: Check accessibility attributes
  const elementsWithAriaLabels = document.querySelectorAll('[aria-label], [aria-labelledby]');
  console.log(`${elementsWithAriaLabels.length > 0 ? '✅' : '❌'} Elements with ARIA labels: ${elementsWithAriaLabels.length}`);

  console.groupEnd();
};

// Initialize performance monitoring
let performanceMonitor: PerformanceMonitor | null = null;

export const initializePerformanceMonitoring = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    performanceMonitor = new PerformanceMonitor();
    
    // Run basic tests after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        runBasicTests();
        performanceMonitor?.logReport();
      }, 1000);
    });
  }
};

export const getPerformanceMonitor = () => performanceMonitor; 