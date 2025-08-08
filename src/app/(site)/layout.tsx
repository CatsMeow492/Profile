import { Navigation } from '@/components/navigation/Navigation';
import { ScrollToTop } from '@/components/navigation/ScrollToTop';
import { TestingChecklist } from '@/components/testing/TestingChecklist';
import { TestingProvider } from '@/components/testing/TestingProvider';
import { PerformanceDashboard } from '@/components/performance/PerformanceDashboard';
import { PerformanceReport } from '@/components/performance/PerformanceReport';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { SEOAudit } from '@/components/seo/SEOAudit';
import { SEOReport } from '@/components/seo/SEOReport';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { WebVitalsReporter } from '@/components/analytics/WebVitalsReporter';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';
import { FinalTestingSuite } from '@/components/testing/FinalTestingSuite';
import { BrowserCompatibilityTest } from '@/components/testing/BrowserCompatibilityTest';
import { AccessibilityTest } from '@/components/testing/AccessibilityTest';
import { DeploymentChecklist } from '@/components/deployment/DeploymentChecklist';

export const metadata = generateSEOMetadata();

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Google Analytics */}
      <GoogleAnalytics />
      
      <AnalyticsProvider>
        <TestingProvider>
          <div className="min-h-screen bg-background text-foreground">
            {/* Enhanced Navigation */}
            <Navigation />

            {/* Main content */}
            <main className="w-full">{children}</main>

            {/* Web Vitals */}
            <WebVitalsReporter />

            {/* Footer */}
            <footer className="bg-muted border-t border-border">
              <div className="container mx-auto py-8">
                <div className="text-center text-muted-foreground">
                  <p>&copy; {new Date().getFullYear()} Taylor Mohney. All rights reserved.</p>
                </div>
              </div>
            </footer>

            {/* Scroll to Top Button */}
            <ScrollToTop />
            
            {/* Development Tools - Only show in development */}
            {process.env.NODE_ENV === 'development' && (
              <>
                <TestingChecklist />
                <PerformanceDashboard />
                <PerformanceReport />
                <SEOAudit />
                <SEOReport />
                <AnalyticsDashboard />
                <FinalTestingSuite />
                <BrowserCompatibilityTest />
                <AccessibilityTest />
                <DeploymentChecklist />
              </>
            )}
          </div>
        </TestingProvider>
      </AnalyticsProvider>
    </>
  );
} 