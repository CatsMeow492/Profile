'use client';

import { useState, useEffect } from 'react';

interface TestCase {
  id: string;
  category: string;
  description: string;
  status: 'pending' | 'passed' | 'failed';
  notes?: string;
}

const testCases: TestCase[] = [
  // Navigation Tests
  { id: 'nav-1', category: 'Navigation', description: 'Smooth scrolling to all sections', status: 'pending' },
  { id: 'nav-2', category: 'Navigation', description: 'Active section highlighting works correctly', status: 'pending' },
  { id: 'nav-3', category: 'Navigation', description: 'Mobile navigation menu opens/closes properly', status: 'pending' },
  { id: 'nav-4', category: 'Navigation', description: 'Scroll-to-top button appears and functions', status: 'pending' },
  { id: 'nav-5', category: 'Navigation', description: 'Navigation backdrop blur changes on scroll', status: 'pending' },

  // Responsive Design Tests
  { id: 'resp-1', category: 'Responsive', description: 'Mobile layout (320px-768px) displays correctly', status: 'pending' },
  { id: 'resp-2', category: 'Responsive', description: 'Tablet layout (768px-1024px) displays correctly', status: 'pending' },
  { id: 'resp-3', category: 'Responsive', description: 'Desktop layout (1024px+) displays correctly', status: 'pending' },
  { id: 'resp-4', category: 'Responsive', description: 'Ultra-wide layout (1920px+) displays correctly', status: 'pending' },

  // Content Tests
  { id: 'content-1', category: 'Content', description: 'Hero section displays personal information correctly', status: 'pending' },
  { id: 'content-2', category: 'Content', description: 'Experience timeline shows all positions', status: 'pending' },
  { id: 'content-3', category: 'Content', description: 'Research papers load with correct links', status: 'pending' },
  { id: 'content-4', category: 'Content', description: 'Projects showcase displays GitHub links', status: 'pending' },
  { id: 'content-5', category: 'Content', description: 'Certifications show verification links', status: 'pending' },

  // Accessibility Tests
  { id: 'a11y-1', category: 'Accessibility', description: 'All interactive elements are keyboard accessible', status: 'pending' },
  { id: 'a11y-2', category: 'Accessibility', description: 'ARIA labels are properly implemented', status: 'pending' },
  { id: 'a11y-3', category: 'Accessibility', description: 'Color contrast meets WCAG standards', status: 'pending' },
  { id: 'a11y-4', category: 'Accessibility', description: 'Screen reader navigation works properly', status: 'pending' },

  // Performance Tests
  { id: 'perf-1', category: 'Performance', description: 'Page loads in under 3 seconds', status: 'pending' },
  { id: 'perf-2', category: 'Performance', description: 'Smooth scrolling performance is acceptable', status: 'pending' },
  { id: 'perf-3', category: 'Performance', description: 'No memory leaks in scroll listeners', status: 'pending' },
  { id: 'perf-4', category: 'Performance', description: 'Images load and display correctly', status: 'pending' },

  // Cross-Browser Tests
  { id: 'browser-1', category: 'Browser', description: 'Chrome/Chromium compatibility', status: 'pending' },
  { id: 'browser-2', category: 'Browser', description: 'Firefox compatibility', status: 'pending' },
  { id: 'browser-3', category: 'Browser', description: 'Safari compatibility', status: 'pending' },
  { id: 'browser-4', category: 'Browser', description: 'Edge compatibility', status: 'pending' },
];

export const TestingChecklist = () => {
  const [tests, setTests] = useState<TestCase[]>(testCases);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isVisible, setIsVisible] = useState(false);

  const categories = ['All', ...Array.from(new Set(testCases.map(test => test.category)))];

  const filteredTests = selectedCategory === 'All' 
    ? tests 
    : tests.filter(test => test.category === selectedCategory);

  const updateTestStatus = (id: string, status: TestCase['status'], notes?: string) => {
    setTests(prev => prev.map(test => 
      test.id === id ? { ...test, status, notes } : test
    ));
  };

  const getStatusIcon = (status: TestCase['status']) => {
    switch (status) {
      case 'passed':
        return <span className="text-green-500">✅</span>;
      case 'failed':
        return <span className="text-red-500">❌</span>;
      default:
        return <span className="text-gray-400">⏳</span>;
    }
  };

  const getStatusCounts = () => {
    const filtered = filteredTests;
    return {
      total: filtered.length,
      passed: filtered.filter(t => t.status === 'passed').length,
      failed: filtered.filter(t => t.status === 'failed').length,
      pending: filtered.filter(t => t.status === 'pending').length,
    };
  };

  const statusCounts = getStatusCounts();

  // Only show in development
  useEffect(() => {
    setIsVisible(process.env.NODE_ENV === 'development');
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-card border border-border rounded-lg shadow-lg max-w-md max-h-96 overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-sm">Testing Checklist</h3>
        <div className="flex gap-4 text-xs mt-2">
          <span className="text-green-600">✅ {statusCounts.passed}</span>
          <span className="text-red-600">❌ {statusCounts.failed}</span>
          <span className="text-gray-500">⏳ {statusCounts.pending}</span>
        </div>
      </div>
      
      <div className="p-4">
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 text-xs border border-border rounded mb-3"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <div className="space-y-2 max-h-48 overflow-y-auto">
          {filteredTests.map((test) => (
            <div key={test.id} className="border border-border rounded p-2">
              <div className="flex items-start gap-2">
                {getStatusIcon(test.status)}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{test.description}</p>
                  <p className="text-xs text-muted-foreground">{test.category}</p>
                </div>
              </div>
              <div className="flex gap-1 mt-2">
                <button
                  onClick={() => updateTestStatus(test.id, 'passed')}
                  className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                >
                  Pass
                </button>
                <button
                  onClick={() => updateTestStatus(test.id, 'failed')}
                  className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  Fail
                </button>
                <button
                  onClick={() => updateTestStatus(test.id, 'pending')}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Reset
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 