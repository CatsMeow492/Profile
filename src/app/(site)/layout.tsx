import { Navigation } from '@/components/navigation/Navigation';
import { ScrollToTop } from '@/components/navigation/ScrollToTop';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { personalInfo } from '@/content/personal';

// Cleaned up 2026-08-04. This layout used to import ELEVEN development-only components
// (TestingChecklist, TestingProvider, FinalTestingSuite, BrowserCompatibilityTest,
// AccessibilityTest, PerformanceDashboard, PerformanceReport, SEOAudit, SEOReport,
// AnalyticsDashboard, DeploymentChecklist) and render them behind a NODE_ENV check. The check meant
// visitors never SAW them, but the imports still sat in the production module graph. They were
// build-time scaffolding, not product, and they have been deleted from the repo entirely.
export const metadata = generateSEOMetadata();

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <>
      <GoogleAnalytics />
      <AnalyticsProvider>
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          {/* Keyboard and screen-reader users can jump straight to content. */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg"
          >
            Skip to content
          </a>

          <Navigation />

          <main id="main" className="w-full flex-1">
            {children}
          </main>

          <footer className="bg-muted border-t border-border">
            <div className="container mx-auto py-10">
              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
                <p className="text-sm text-muted-foreground">
                  &copy; {year} {personalInfo.name}. All rights reserved.
                </p>
                <nav aria-label="Social links" className="flex items-center gap-5 text-sm">
                  <a
                    href={personalInfo.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    GitHub
                  </a>
                  <a
                    href={personalInfo.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Email
                  </a>
                </nav>
              </div>
            </div>
          </footer>

          <ScrollToTop />
        </div>
      </AnalyticsProvider>
    </>
  );
}
