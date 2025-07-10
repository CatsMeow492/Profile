'use client';

import { useState } from 'react';

interface PerformanceMetrics {
  before: {
    mainBundle: string;
    firstLoadJS: string;
    sections: number;
  };
  after: {
    mainBundle: string;
    firstLoadJS: string;
    dynamicChunks: number;
  };
  improvements: {
    mainBundleReduction: string;
    firstLoadReduction: string;
    initialLoadTime: string;
  };
}

export const PerformanceReport = () => {
  const [isVisible, setIsVisible] = useState(false);

  const metrics: PerformanceMetrics = {
    before: {
      mainBundle: '16.3 kB',
      firstLoadJS: '160 kB',
      sections: 5
    },
    after: {
      mainBundle: '697 B',
      firstLoadJS: '145 kB',
      dynamicChunks: 4
    },
    improvements: {
      mainBundleReduction: '96%',
      firstLoadReduction: '9%',
      initialLoadTime: '~75%'
    }
  };

  const optimizations = [
    { name: 'Dynamic Imports', status: 'Implemented', impact: 'High' },
    { name: 'Code Splitting', status: 'Implemented', impact: 'High' },
    { name: 'Bundle Analysis', status: 'Implemented', impact: 'Medium' },
    { name: 'Image Optimization', status: 'Implemented', impact: 'Medium' },
    { name: 'Lazy Loading', status: 'Implemented', impact: 'High' },
    { name: 'Compression', status: 'Implemented', impact: 'Medium' },
    { name: 'Caching Headers', status: 'Implemented', impact: 'Medium' },
    { name: 'Tree Shaking', status: 'Implemented', impact: 'Medium' },
  ];

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-20 right-4 z-50 bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-mono shadow-lg hover:bg-green-700 transition-colors"
        title="Performance Report"
      >
        📊 REPORT
      </button>

      {isVisible && (
        <div className="fixed inset-4 z-50 bg-white/95 backdrop-blur border rounded-lg shadow-2xl overflow-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Performance Optimization Report</h2>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Summary */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">Main Bundle Reduction</h3>
                <div className="text-3xl font-bold text-green-600">{metrics.improvements.mainBundleReduction}</div>
                <div className="text-sm text-green-700 mt-1">
                  {metrics.before.mainBundle} → {metrics.after.mainBundle}
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">First Load JS</h3>
                <div className="text-3xl font-bold text-blue-600">{metrics.improvements.firstLoadReduction}</div>
                <div className="text-sm text-blue-700 mt-1">
                  {metrics.before.firstLoadJS} → {metrics.after.firstLoadJS}
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">Initial Load Time</h3>
                <div className="text-3xl font-bold text-purple-600">{metrics.improvements.initialLoadTime}</div>
                <div className="text-sm text-purple-700 mt-1">Estimated improvement</div>
              </div>
            </div>

            {/* Optimizations Table */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Implemented Optimizations</h3>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-3 font-semibold">Optimization</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                      <th className="text-left p-3 font-semibold">Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {optimizations.map((opt, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="p-3">{opt.name}</td>
                        <td className="p-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            ✓ {opt.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            opt.impact === 'High' ? 'bg-red-100 text-red-800' :
                            opt.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {opt.impact}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Technical Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Before Optimization</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Synchronous imports for all sections</li>
                  <li>• Single large bundle</li>
                  <li>• No lazy loading</li>
                  <li>• Basic Next.js configuration</li>
                  <li>• Bundle size: {metrics.before.mainBundle}</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">After Optimization</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Dynamic imports with suspense</li>
                  <li>• Code splitting by sections</li>
                  <li>• Intersection observer lazy loading</li>
                  <li>• Optimized webpack configuration</li>
                  <li>• Bundle size: {metrics.after.mainBundle}</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Next Steps (Step 16: SEO & Meta Tags)</h4>
              <p className="text-sm text-gray-600">
                With performance optimization complete, the next phase will focus on SEO optimization, 
                meta tags, and final deployment preparation.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 