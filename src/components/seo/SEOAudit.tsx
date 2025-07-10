'use client';

import { useEffect, useState } from 'react';
import { seoConfig } from '@/lib/seo';

interface SEOAuditItem {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  description: string;
  value?: string;
}

export const SEOAudit = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [auditResults, setAuditResults] = useState<SEOAuditItem[]>([]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const runAudit = () => {
      const results: SEOAuditItem[] = [];

      // Check meta title
      const title = document.title;
      results.push({
        name: 'Page Title',
        status: title && title.length > 0 && title.length <= 60 ? 'pass' : 'warning',
        description: 'Title should be between 1-60 characters',
        value: `${title.length} chars: "${title}"`,
      });

      // Check meta description
      const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
      results.push({
        name: 'Meta Description',
        status: metaDescription && metaDescription.length > 0 && metaDescription.length <= 160 ? 'pass' : 'warning',
        description: 'Description should be between 1-160 characters',
        value: metaDescription ? `${metaDescription.length} chars` : 'Missing',
      });

      // Check Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
      results.push({
        name: 'Open Graph Title',
        status: ogTitle ? 'pass' : 'fail',
        description: 'Required for social media sharing',
        value: ogTitle || 'Missing',
      });

      const ogDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
      results.push({
        name: 'Open Graph Description',
        status: ogDescription ? 'pass' : 'fail',
        description: 'Required for social media sharing',
        value: ogDescription ? 'Present' : 'Missing',
      });

      const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
      results.push({
        name: 'Open Graph Image',
        status: ogImage ? 'pass' : 'warning',
        description: 'Image for social media sharing',
        value: ogImage || 'Missing',
      });

      // Check Twitter Card tags
      const twitterCard = document.querySelector('meta[name="twitter:card"]')?.getAttribute('content');
      results.push({
        name: 'Twitter Card',
        status: twitterCard ? 'pass' : 'warning',
        description: 'Twitter card type',
        value: twitterCard || 'Missing',
      });

      // Check canonical URL
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      results.push({
        name: 'Canonical URL',
        status: canonical ? 'pass' : 'warning',
        description: 'Prevents duplicate content issues',
        value: canonical || 'Missing',
      });

      // Check structured data
      const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
      results.push({
        name: 'Structured Data',
        status: structuredData.length > 0 ? 'pass' : 'fail',
        description: 'JSON-LD structured data for rich snippets',
        value: `${structuredData.length} script(s)`,
      });

      // Check headings structure
      const h1s = document.querySelectorAll('h1');
      results.push({
        name: 'H1 Tags',
        status: h1s.length === 1 ? 'pass' : 'warning',
        description: 'Should have exactly one H1 per page',
        value: `${h1s.length} found`,
      });

      // Check images alt text
      const images = document.querySelectorAll('img');
      const imagesWithoutAlt = Array.from(images).filter(img => !img.getAttribute('alt'));
      results.push({
        name: 'Image Alt Text',
        status: imagesWithoutAlt.length === 0 ? 'pass' : 'warning',
        description: 'All images should have alt text',
        value: `${imagesWithoutAlt.length} missing alt text`,
      });

      setAuditResults(results);
    };

    runAudit();
    const interval = setInterval(runAudit, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'fail': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return '✓';
      case 'warning': return '⚠';
      case 'fail': return '✗';
      default: return '?';
    }
  };

  const passCount = auditResults.filter(item => item.status === 'pass').length;
  const totalCount = auditResults.length;

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-36 right-4 z-50 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-mono shadow-lg hover:bg-blue-700 transition-colors"
        title="SEO Audit"
      >
        🔍 SEO ({passCount}/{totalCount})
      </button>

      {isVisible && (
        <div className="fixed inset-4 z-50 bg-white/95 backdrop-blur border rounded-lg shadow-2xl overflow-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">SEO Audit Report</h2>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Summary */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">Passing</h3>
                <div className="text-3xl font-bold text-green-600">
                  {auditResults.filter(item => item.status === 'pass').length}
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2">Warnings</h3>
                <div className="text-3xl font-bold text-yellow-600">
                  {auditResults.filter(item => item.status === 'warning').length}
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2">Failing</h3>
                <div className="text-3xl font-bold text-red-600">
                  {auditResults.filter(item => item.status === 'fail').length}
                </div>
              </div>
            </div>

            {/* Audit Results */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Audit Results</h3>
              {auditResults.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`font-mono ${getStatusColor(item.status)}`}>
                          {getStatusIcon(item.status)}
                        </span>
                        <h4 className="font-semibold">{item.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      {item.value && (
                        <p className="text-xs font-mono bg-gray-100 p-2 rounded">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SEO Configuration */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">SEO Configuration</h4>
              <div className="text-sm space-y-1">
                <p><strong>Site Name:</strong> {seoConfig.siteName}</p>
                <p><strong>Site URL:</strong> {seoConfig.siteUrl}</p>
                <p><strong>Author:</strong> {seoConfig.author}</p>
                <p><strong>Keywords:</strong> {seoConfig.keywords.slice(0, 5).join(', ')}...</p>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Last updated: {new Date().toLocaleTimeString()} • Updates every 10s in dev mode
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 