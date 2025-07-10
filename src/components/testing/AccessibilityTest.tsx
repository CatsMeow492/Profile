'use client';

import { useState } from 'react';

interface AccessibilityTest {
  name: string;
  status: 'pass' | 'fail' | 'warning' | 'manual';
  score: number;
  details: string;
  category: string;
  wcagLevel: 'A' | 'AA' | 'AAA';
}

export const AccessibilityTest = () => {
  const [tests, setTests] = useState<AccessibilityTest[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [overallScore, setOverallScore] = useState(0);

  const runAccessibilityTests = (): AccessibilityTest[] => {
    const tests: AccessibilityTest[] = [];

    // 1. Semantic HTML Tests
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const h1Count = document.querySelectorAll('h1').length;
    
    tests.push({
      name: 'Heading Structure',
      status: h1Count === 1 ? 'pass' : h1Count === 0 ? 'fail' : 'warning',
      score: h1Count === 1 ? 100 : h1Count === 0 ? 0 : 70,
      details: `Found ${h1Count} H1 elements, ${headings.length} total headings`,
      category: 'structure',
      wcagLevel: 'A'
    });

    // Check heading hierarchy
    let hierarchyValid = true;
    let lastLevel = 0;
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1));
      if (level > lastLevel + 1) hierarchyValid = false;
      lastLevel = level;
    });

    tests.push({
      name: 'Heading Hierarchy',
      status: hierarchyValid ? 'pass' : 'warning',
      score: hierarchyValid ? 100 : 70,
      details: hierarchyValid ? 'Heading levels follow logical sequence' : 'Heading levels may skip hierarchy',
      category: 'structure',
      wcagLevel: 'AA'
    });

    // 2. Image Accessibility
    const images = document.querySelectorAll('img');
    const imagesWithAlt = Array.from(images).filter(img => img.hasAttribute('alt')).length;
    const decorativeImages = Array.from(images).filter(img => img.alt === '').length;
    
    tests.push({
      name: 'Image Alt Text',
      status: images.length === imagesWithAlt ? 'pass' : imagesWithAlt / images.length > 0.8 ? 'warning' : 'fail',
      score: images.length === 0 ? 100 : Math.round((imagesWithAlt / images.length) * 100),
      details: `${imagesWithAlt}/${images.length} images have alt attributes (${decorativeImages} decorative)`,
      category: 'images',
      wcagLevel: 'A'
    });

    // 3. Link Accessibility
    const links = document.querySelectorAll('a[href]');
    const linksWithText = Array.from(links).filter(link => {
      const text = link.textContent?.trim() || '';
      const ariaLabel = link.getAttribute('aria-label') || '';
      const title = link.getAttribute('title') || '';
      return text.length > 0 || ariaLabel.length > 0 || title.length > 0;
    }).length;

    tests.push({
      name: 'Link Accessibility',
      status: links.length === linksWithText ? 'pass' : 'warning',
      score: links.length === 0 ? 100 : Math.round((linksWithText / links.length) * 100),
      details: `${linksWithText}/${links.length} links have accessible text`,
      category: 'navigation',
      wcagLevel: 'A'
    });

    // Check for generic link text
    const genericLinks = Array.from(links).filter(link => {
      const text = link.textContent?.trim().toLowerCase() || '';
      return ['click here', 'read more', 'more', 'here', 'link'].includes(text);
    }).length;

    tests.push({
      name: 'Descriptive Link Text',
      status: genericLinks === 0 ? 'pass' : 'warning',
      score: genericLinks === 0 ? 100 : Math.max(0, 100 - (genericLinks * 20)),
      details: genericLinks === 0 ? 'All links have descriptive text' : `${genericLinks} links may have generic text`,
      category: 'navigation',
      wcagLevel: 'AA'
    });

    // 4. Form Accessibility
    const formInputs = document.querySelectorAll('input, textarea, select');
    const inputsWithLabels = Array.from(formInputs).filter(input => {
      const id = input.getAttribute('id');
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledby = input.getAttribute('aria-labelledby');
      const label = id ? document.querySelector(`label[for="${id}"]`) : null;
      return label || ariaLabel || ariaLabelledby;
    }).length;

    tests.push({
      name: 'Form Labels',
      status: formInputs.length === 0 ? 'pass' : formInputs.length === inputsWithLabels ? 'pass' : 'fail',
      score: formInputs.length === 0 ? 100 : Math.round((inputsWithLabels / formInputs.length) * 100),
      details: formInputs.length === 0 ? 'No form inputs found' : `${inputsWithLabels}/${formInputs.length} inputs have labels`,
      category: 'forms',
      wcagLevel: 'A'
    });

    // 5. Keyboard Navigation
    const focusableElements = document.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"]), [contenteditable]'
    );
    
    const elementsWithTabIndex = Array.from(focusableElements).filter(el => {
      const tabIndex = el.getAttribute('tabindex');
      return tabIndex && parseInt(tabIndex) > 0;
    }).length;

    tests.push({
      name: 'Keyboard Navigation',
      status: focusableElements.length > 0 ? 'pass' : 'warning',
      score: focusableElements.length > 0 ? 100 : 80,
      details: `${focusableElements.length} focusable elements found`,
      category: 'keyboard',
      wcagLevel: 'A'
    });

    tests.push({
      name: 'Tab Index Usage',
      status: elementsWithTabIndex === 0 ? 'pass' : 'warning',
      score: elementsWithTabIndex === 0 ? 100 : 70,
      details: elementsWithTabIndex === 0 ? 'No positive tabindex values (good)' : `${elementsWithTabIndex} elements use positive tabindex`,
      category: 'keyboard',
      wcagLevel: 'A'
    });

    // 6. ARIA Usage
    const elementsWithAriaLabels = document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby]').length;
    const elementsWithAriaRoles = document.querySelectorAll('[role]').length;

    tests.push({
      name: 'ARIA Labels',
      status: elementsWithAriaLabels > 0 ? 'pass' : 'manual',
      score: elementsWithAriaLabels > 0 ? 100 : 80,
      details: `${elementsWithAriaLabels} elements use ARIA labels`,
      category: 'aria',
      wcagLevel: 'AA'
    });

    tests.push({
      name: 'ARIA Roles',
      status: elementsWithAriaRoles > 0 ? 'pass' : 'manual',
      score: elementsWithAriaRoles > 0 ? 100 : 80,
      details: `${elementsWithAriaRoles} elements use ARIA roles`,
      category: 'aria',
      wcagLevel: 'AA'
    });

    // 7. Color and Contrast
    tests.push({
      name: 'Color Contrast',
      status: 'manual',
      score: 90,
      details: 'Tailwind CSS provides accessible color combinations (manual verification recommended)',
      category: 'visual',
      wcagLevel: 'AA'
    });

    // 8. Language and Document Structure
    const htmlLang = document.documentElement.getAttribute('lang');
    tests.push({
      name: 'Page Language',
      status: htmlLang ? 'pass' : 'fail',
      score: htmlLang ? 100 : 0,
      details: htmlLang ? `Language set to "${htmlLang}"` : 'No lang attribute on html element',
      category: 'structure',
      wcagLevel: 'A'
    });

    // 9. Document Title
    const title = document.title;
    tests.push({
      name: 'Page Title',
      status: title && title.trim().length > 0 ? 'pass' : 'fail',
      score: title && title.trim().length > 0 ? 100 : 0,
      details: title ? `Title: "${title}"` : 'No page title found',
      category: 'structure',
      wcagLevel: 'A'
    });

    // 10. Viewport and Zoom
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    const viewportContent = viewportMeta?.getAttribute('content') || '';
    const hasUserScalable = viewportContent.includes('user-scalable=no') || viewportContent.includes('maximum-scale=1');

    tests.push({
      name: 'Zoom Support',
      status: !hasUserScalable ? 'pass' : 'fail',
      score: !hasUserScalable ? 100 : 0,
      details: !hasUserScalable ? 'Zoom/pinch not restricted' : 'Zoom may be restricted by viewport meta',
      category: 'mobile',
      wcagLevel: 'AA'
    });

    // 11. Skip Links
    const skipLinks = document.querySelectorAll('a[href^="#"]');
    const skipLinkText = Array.from(skipLinks).map(link => link.textContent?.toLowerCase().trim()).join(' ');
    const hasSkipToContent = skipLinkText.includes('skip') || skipLinkText.includes('main');

    tests.push({
      name: 'Skip Links',
      status: hasSkipToContent ? 'pass' : 'manual',
      score: hasSkipToContent ? 100 : 80,
      details: hasSkipToContent ? 'Skip links detected' : 'Consider adding skip links for keyboard users',
      category: 'navigation',
      wcagLevel: 'A'
    });

    // 12. Hidden Content
    const hiddenElements = document.querySelectorAll('[aria-hidden="true"]').length;
    const screenReaderOnly = document.querySelectorAll('.sr-only, .visually-hidden').length;

    tests.push({
      name: 'Hidden Content Management',
      status: hiddenElements > 0 || screenReaderOnly > 0 ? 'pass' : 'manual',
      score: hiddenElements > 0 || screenReaderOnly > 0 ? 100 : 90,
      details: `${hiddenElements} elements hidden from screen readers, ${screenReaderOnly} screen reader only elements`,
      category: 'structure',
      wcagLevel: 'A'
    });

    // 13. Error Handling
    const errorElements = document.querySelectorAll('[role="alert"], [aria-live]').length;
    tests.push({
      name: 'Error Announcements',
      status: errorElements > 0 ? 'pass' : 'manual',
      score: errorElements > 0 ? 100 : 85,
      details: errorElements > 0 ? `${errorElements} live regions for announcements` : 'Consider adding ARIA live regions for dynamic content',
      category: 'interaction',
      wcagLevel: 'AA'
    });

    return tests;
  };

  const runTests = () => {
    setIsRunning(true);
    
    setTimeout(() => {
      const testResults = runAccessibilityTests();
      setTests(testResults);
      
      const score = Math.round(
        testResults.reduce((sum, test) => sum + test.score, 0) / testResults.length
      );
      setOverallScore(score);
      
      setIsRunning(false);
    }, 500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return '✅';
      case 'fail': return '❌';
      case 'warning': return '⚠️';
      case 'manual': return '🔍';
      default: return '⏳';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-600';
      case 'fail': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      case 'manual': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getWcagBadgeColor = (level: string) => {
    switch (level) {
      case 'A': return 'bg-blue-100 text-blue-800';
      case 'AA': return 'bg-green-100 text-green-800';
      case 'AAA': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const categorizeTests = () => {
    const categories = ['structure', 'images', 'navigation', 'forms', 'keyboard', 'aria', 'visual', 'mobile', 'interaction'];
    return categories.map(category => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      tests: tests.filter(test => test.category === category)
    })).filter(cat => cat.tests.length > 0);
  };

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-104 right-4 z-50 bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-mono shadow-lg hover:bg-indigo-700 transition-colors"
        title="Accessibility Test"
      >
        ♿ A11Y {tests.length > 0 && `(${overallScore}%)`}
      </button>

      {isVisible && (
        <div className="fixed inset-4 z-50 bg-white/95 backdrop-blur border rounded-lg shadow-2xl overflow-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Accessibility Test (WCAG 2.1)</h2>
              <div className="flex items-center gap-4">
                {tests.length > 0 && (
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>
                      {overallScore}/100
                    </div>
                    <div className="text-sm text-gray-600">A11Y Score</div>
                  </div>
                )}
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="mb-6">
              <button
                onClick={runTests}
                disabled={isRunning}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {isRunning ? 'Running Tests...' : 'Run Accessibility Tests'}
              </button>
            </div>

            {tests.length > 0 && (
              <div className="space-y-6">
                {/* Overall Status */}
                <div className={`p-4 rounded-lg border ${
                  overallScore >= 90 ? 'bg-green-50 border-green-200' :
                  overallScore >= 80 ? 'bg-blue-50 border-blue-200' :
                  overallScore >= 70 ? 'bg-yellow-50 border-yellow-200' :
                  'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {overallScore >= 90 ? '🏆' : overallScore >= 80 ? '✅' : overallScore >= 70 ? '⚠️' : '❌'}
                    </span>
                    <div>
                      <h3 className={`font-semibold ${getScoreColor(overallScore)}`}>
                        {overallScore >= 90 ? 'Excellent Accessibility' :
                         overallScore >= 80 ? 'Good Accessibility' :
                         overallScore >= 70 ? 'Needs Improvement' :
                         'Poor Accessibility'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {tests.filter(t => t.status === 'pass').length} passed, {' '}
                        {tests.filter(t => t.status === 'fail').length} failed, {' '}
                        {tests.filter(t => t.status === 'warning').length} warnings, {' '}
                        {tests.filter(t => t.status === 'manual').length} need manual review
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tests by Category */}
                {categorizeTests().map((category, categoryIndex) => (
                  <div key={categoryIndex} className="border rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {category.tests.map((test, testIndex) => (
                        <div key={testIndex} className={`flex items-start gap-3 p-3 rounded border ${
                          test.status === 'pass' ? 'bg-green-50 border-green-200' :
                          test.status === 'fail' ? 'bg-red-50 border-red-200' :
                          test.status === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                          'bg-blue-50 border-blue-200'
                        }`}>
                          <span className="text-lg">{getStatusIcon(test.status)}</span>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                {test.name}
                                <span className={`px-2 py-1 text-xs rounded ${getWcagBadgeColor(test.wcagLevel)}`}>
                                  WCAG {test.wcagLevel}
                                </span>
                              </h4>
                              <span className={`text-sm font-mono ${getScoreColor(test.score)}`}>
                                {test.score}/100
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{test.details}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* WCAG Compliance Summary */}
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-4">WCAG 2.1 Compliance Summary</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    {['A', 'AA', 'AAA'].map(level => {
                      const levelTests = tests.filter(test => test.wcagLevel === level);
                      const levelPassed = levelTests.filter(test => test.status === 'pass').length;
                      const compliance = levelTests.length > 0 ? Math.round((levelPassed / levelTests.length) * 100) : 0;
                      
                      return (
                        <div key={level} className="text-center">
                          <div className={`text-2xl font-bold ${getScoreColor(compliance)}`}>
                            {compliance}%
                          </div>
                          <div className={`text-sm px-2 py-1 rounded inline-block ${getWcagBadgeColor(level)}`}>
                            WCAG {level}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {levelPassed}/{levelTests.length} tests
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Recommendations</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Run automated accessibility testing with tools like axe-core</li>
                    <li>• Test with screen readers (NVDA, JAWS, VoiceOver)</li>
                    <li>• Verify keyboard navigation throughout the site</li>
                    <li>• Test with users who have disabilities</li>
                    <li>• Use browser accessibility dev tools for detailed analysis</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-4 text-xs text-gray-500">
              WCAG 2.1 Accessibility Testing • Manual verification recommended for complete compliance
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 