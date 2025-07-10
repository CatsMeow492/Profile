'use client';

import { useEffect, useState } from 'react';

interface BrowserTest {
  name: string;
  supported: boolean;
  details: string;
  critical: boolean;
}

interface BrowserInfo {
  name: string;
  version: string;
  engine: string;
  platform: string;
}

export const BrowserCompatibilityTest = () => {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);
  const [featureTests, setFeatureTests] = useState<BrowserTest[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const detectBrowser = (): BrowserInfo => {
    const ua = navigator.userAgent;
    const platform = navigator.platform;
    
    let name = 'Unknown';
    let version = 'Unknown';
    let engine = 'Unknown';

    // Chrome
    if (ua.includes('Chrome') && !ua.includes('Edg')) {
      name = 'Chrome';
      const match = ua.match(/Chrome\/(\d+)/);
      version = match ? match[1] : 'Unknown';
      engine = 'Blink';
    }
    // Firefox
    else if (ua.includes('Firefox')) {
      name = 'Firefox';
      const match = ua.match(/Firefox\/(\d+)/);
      version = match ? match[1] : 'Unknown';
      engine = 'Gecko';
    }
    // Safari
    else if (ua.includes('Safari') && !ua.includes('Chrome')) {
      name = 'Safari';
      const match = ua.match(/Version\/(\d+)/);
      version = match ? match[1] : 'Unknown';
      engine = 'WebKit';
    }
    // Edge
    else if (ua.includes('Edg')) {
      name = 'Edge';
      const match = ua.match(/Edg\/(\d+)/);
      version = match ? match[1] : 'Unknown';
      engine = 'Blink';
    }

    return { name, version, engine, platform };
  };

  const runFeatureTests = (): BrowserTest[] => {
    const tests: BrowserTest[] = [];

    // ES6+ Features
    tests.push({
      name: 'ES6 Arrow Functions',
      supported: (() => { try { eval('() => {}'); return true; } catch { return false; } })(),
      details: 'Required for modern JavaScript functionality',
      critical: true
    });

    tests.push({
      name: 'ES6 Template Literals',
      supported: (() => { try { eval('`template`'); return true; } catch { return false; } })(),
      details: 'Used throughout the application',
      critical: true
    });

    tests.push({
      name: 'ES6 Destructuring',
      supported: (() => { try { eval('const {a} = {}'); return true; } catch { return false; } })(),
      details: 'Core JavaScript feature used extensively',
      critical: true
    });

    // CSS Features
    tests.push({
      name: 'CSS Grid',
      supported: 'grid' in document.documentElement.style,
      details: 'Used for layout components',
      critical: true
    });

    tests.push({
      name: 'CSS Flexbox',
      supported: CSS.supports('display', 'flex') || 'flex' in document.documentElement.style,
      details: 'Primary layout system',
      critical: true
    });

    tests.push({
      name: 'CSS Custom Properties',
      supported: CSS.supports('color', 'var(--test)'),
      details: 'Used for theming and dynamic styles',
      critical: false
    });

    tests.push({
      name: 'CSS Backdrop Filter',
      supported: 'backdropFilter' in document.documentElement.style,
      details: 'Used for glass morphism effects',
      critical: false
    });

    // Web APIs
    tests.push({
      name: 'Intersection Observer',
      supported: 'IntersectionObserver' in window,
      details: 'Used for lazy loading and scroll tracking',
      critical: true
    });

    tests.push({
      name: 'Performance Observer',
      supported: 'PerformanceObserver' in window,
      details: 'Used for performance monitoring',
      critical: false
    });

    tests.push({
      name: 'Fetch API',
      supported: 'fetch' in window,
      details: 'Used for API requests',
      critical: true
    });

    tests.push({
      name: 'Local Storage',
      supported: (() => {
        try {
          localStorage.setItem('test', 'test');
          localStorage.removeItem('test');
          return true;
        } catch {
          return false;
        }
      })(),
      details: 'Used for client-side storage',
      critical: false
    });

    // Media Features
    tests.push({
      name: 'WebP Support',
      supported: (() => {
        const canvas = document.createElement('canvas');
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      })(),
      details: 'Used for optimized image delivery',
      critical: false
    });

    tests.push({
      name: 'Responsive Images',
      supported: 'srcset' in document.createElement('img'),
      details: 'Used for responsive image optimization',
      critical: false
    });

    // Touch and Mobile
    tests.push({
      name: 'Touch Events',
      supported: 'ontouchstart' in window,
      details: 'Required for mobile interactions',
      critical: false
    });

    tests.push({
      name: 'Viewport Meta',
      supported: !!document.querySelector('meta[name="viewport"]'),
      details: 'Required for responsive design',
      critical: true
    });

    // Modern JavaScript
    tests.push({
      name: 'Async/Await',
      supported: (() => {
        try {
          eval('async function test() { await Promise.resolve(); }');
          return true;
        } catch {
          return false;
        }
      })(),
      details: 'Used for asynchronous operations',
      critical: true
    });

    tests.push({
      name: 'Service Workers',
      supported: 'serviceWorker' in navigator,
      details: 'Future enhancement for offline support',
      critical: false
    });

    return tests;
  };

  useEffect(() => {
    setBrowserInfo(detectBrowser());
    setFeatureTests(runFeatureTests());
  }, []);

  const compatibilityScore = featureTests.length > 0 
    ? Math.round((featureTests.filter(test => test.supported).length / featureTests.length) * 100)
    : 0;

  const criticalIssues = featureTests.filter(test => test.critical && !test.supported);
  const isCompatible = criticalIssues.length === 0;

  const getBrowserIcon = (browserName: string) => {
    switch (browserName.toLowerCase()) {
      case 'chrome': return '🟢';
      case 'firefox': return '🟠';
      case 'safari': return '🔵';
      case 'edge': return '🟦';
      default: return '❓';
    }
  };

  const getCompatibilityStatus = () => {
    if (compatibilityScore >= 95) return { status: 'Excellent', color: 'text-green-600' };
    if (compatibilityScore >= 85) return { status: 'Good', color: 'text-blue-600' };
    if (compatibilityScore >= 70) return { status: 'Fair', color: 'text-yellow-600' };
    return { status: 'Poor', color: 'text-red-600' };
  };

  const compatibility = getCompatibilityStatus();

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-92 right-4 z-50 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-mono shadow-lg hover:bg-blue-700 transition-colors"
        title="Browser Compatibility"
      >
        🌐 BROWSER ({compatibilityScore}%)
      </button>

      {isVisible && (
        <div className="fixed inset-4 z-50 bg-white/95 backdrop-blur border rounded-lg shadow-2xl overflow-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Browser Compatibility Test</h2>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Browser Information */}
            {browserInfo && (
              <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Current Browser</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getBrowserIcon(browserInfo.name)}</span>
                    <div>
                      <div className="font-medium">{browserInfo.name} {browserInfo.version}</div>
                      <div className="text-sm text-gray-600">Engine: {browserInfo.engine}</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Platform: {browserInfo.platform}</div>
                    <div className={`text-sm ${compatibility.color}`}>
                      Compatibility: {compatibility.status} ({compatibilityScore}%)
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Compatibility Status */}
            <div className="mb-8">
              <div className={`p-4 rounded-lg ${isCompatible ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{isCompatible ? '✅' : '❌'}</span>
                  <div>
                    <h3 className={`font-semibold ${isCompatible ? 'text-green-800' : 'text-red-800'}`}>
                      {isCompatible ? 'Fully Compatible' : 'Compatibility Issues Detected'}
                    </h3>
                    <p className={`text-sm ${isCompatible ? 'text-green-700' : 'text-red-700'}`}>
                      {isCompatible 
                        ? 'All critical features are supported in this browser'
                        : `${criticalIssues.length} critical feature(s) not supported`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Tests */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Feature Support</h3>
              
              {/* Critical Features */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Critical Features</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {featureTests.filter(test => test.critical).map((test, index) => (
                    <div key={index} className={`flex items-start gap-3 p-3 rounded ${test.supported ? 'bg-green-50' : 'bg-red-50'}`}>
                      <span className="text-lg">{test.supported ? '✅' : '❌'}</span>
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{test.name}</h5>
                        <p className="text-sm text-gray-600 mt-1">{test.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional Features */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Optional Features</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {featureTests.filter(test => !test.critical).map((test, index) => (
                    <div key={index} className={`flex items-start gap-3 p-3 rounded ${test.supported ? 'bg-green-50' : 'bg-yellow-50'}`}>
                      <span className="text-lg">{test.supported ? '✅' : '⚠️'}</span>
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{test.name}</h5>
                        <p className="text-sm text-gray-600 mt-1">{test.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Browser Recommendations */}
            <div className="mb-8 p-6 bg-blue-50 rounded-lg">
              <h4 className="font-semibold mb-4">Recommended Browsers</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2">Desktop</h5>
                  <ul className="text-sm space-y-1">
                    <li>🟢 Chrome 90+</li>
                    <li>🟠 Firefox 88+</li>
                    <li>🔵 Safari 14+</li>
                    <li>🟦 Edge 90+</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Mobile</h5>
                  <ul className="text-sm space-y-1">
                    <li>📱 iOS Safari 14+</li>
                    <li>🤖 Chrome Mobile 90+</li>
                    <li>🦊 Firefox Mobile 88+</li>
                    <li>🌐 Samsung Internet 14+</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Compatibility Summary</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p><strong>Total Features:</strong> {featureTests.length}</p>
                  <p><strong>Supported:</strong> {featureTests.filter(t => t.supported).length}</p>
                </div>
                <div>
                  <p><strong>Critical Issues:</strong> {criticalIssues.length}</p>
                  <p><strong>Score:</strong> <span className={compatibility.color}>{compatibilityScore}%</span></p>
                </div>
                <div>
                  <p><strong>Status:</strong> <span className={compatibility.color}>{compatibility.status}</span></p>
                  <p><strong>Production Ready:</strong> {isCompatible ? '✅ Yes' : '❌ No'}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Browser compatibility testing • Modern web standards validation
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 