import { StructuredData } from '@/components/seo/StructuredData';
import { HeroSection } from '@/components/sections/HeroSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ResearchSection } from '@/components/sections/ResearchSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';

// Rewritten 2026-08-04. This page was a client component that pulled every section in through
// next/dynamic with `ssr: false`. The effect: the served HTML contained the hero and nothing else.
// Experience, research, certifications and projects existed only after JavaScript ran, so search
// crawlers, link-preview bots and any no-JS reader saw an essentially empty page. Verified against
// production before the change: grepping the served HTML for "Coinbase" or "Department of Defense"
// returned zero hits while both were plainly visible in a browser.
//
// The sections are still client components (they use hooks and framer-motion) but they are now
// server-RENDERED, so the full content ships in the initial HTML and then hydrates. Code-splitting
// the only content on a single-page site was buying nothing and costing indexability.
export default function HomePage() {
  return (
    <>
      <StructuredData type="person" />
      <HeroSection />
      <ExperienceSection />
      <ResearchSection />
      <CertificationsSection />
      <ProjectsSection />
    </>
  );
}
