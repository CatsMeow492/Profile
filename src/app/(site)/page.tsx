'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { StructuredData } from '@/components/seo/StructuredData';

// Dynamic imports for section components with lazy loading
const HeroSection = dynamic(() => import('@/components/sections/HeroSection').then(mod => ({ default: mod.HeroSection })), {
  ssr: true, // Keep SSR for SEO
});

const ExperienceSection = dynamic(() => import('@/components/sections/ExperienceSection').then(mod => ({ default: mod.ExperienceSection })), {
  loading: () => <SectionSkeleton />,
  ssr: false, // Lazy load after initial render
});

const ResearchSection = dynamic(() => import('@/components/sections/ResearchSection').then(mod => ({ default: mod.ResearchSection })), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

const CertificationsSection = dynamic(() => import('@/components/sections/CertificationsSection').then(mod => ({ default: mod.CertificationsSection })), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection').then(mod => ({ default: mod.ProjectsSection })), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

// Skeleton loader for better perceived performance
const SectionSkeleton = () => (
  <section className="py-16 lg:py-20">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <div className="h-12 bg-muted rounded-lg mb-4 mx-auto max-w-md animate-pulse"></div>
        <div className="h-6 bg-muted rounded-lg mx-auto max-w-2xl animate-pulse"></div>
      </div>
      <div className="grid gap-6 md:gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-48 bg-muted rounded-lg animate-pulse"></div>
        ))}
      </div>
    </div>
  </section>
);

export default function HomePage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData type="person" />
      
      <HeroSection />
      <Suspense fallback={<SectionSkeleton />}>
        <ExperienceSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ResearchSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <CertificationsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ProjectsSection />
      </Suspense>
    </>
  );
} 