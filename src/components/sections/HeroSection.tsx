'use client';

import { personalInfo } from '@/content/personal';
import { experiences } from '@/content/experience';
import { certifications } from '@/content/certifications';
import { research } from '@/content/research';
import { SocialLink } from '@/components/ui/ExternalLink';
import { Container } from '@/components/ui/Container';
import { useSectionTracking, useContactTracking, useClickTracking } from '@/hooks/useAnalytics';
import Image from 'next/image';

// Rebuilt 2026-08-04. The previous hero had three layout defects visible at a normal 1440x900 desktop:
//  1. The inner grid carried `min-h-screen` INSIDE a section that was already `min-h-screen
//     flex items-center`, so the content box was forced to a full viewport height and then centred
//     inside another one. The stats row and the scroll indicator were pushed below the fold and clipped.
//  2. Two decorative `FloatingCard`s were absolutely positioned at `top-20 right-20` and
//     `bottom-32 left-20` over the content column. At xl widths "Agentic IDE for Robotics" rendered
//     directly on top of the GitHub/LinkedIn/email icons, and the top-right card was cut off by the nav.
//  3. Hero stats were hardcoded, so "6+ Major Companies" and "4 AWS Certifications" silently drifted
//     as content changed, and "99.9% Uptime Achievement" presented one project's metric as a headline
//     career statistic. Stats are now derived from the content files and cannot go stale.

const YEARS_SINCE = 2016; // earliest role on the timeline (Zenbase, Dec 2016)

const HeroStats = () => {
  const stats = [
    { value: `${new Date().getFullYear() - YEARS_SINCE}+`, label: 'Years experience' },
    { value: `${experiences.length}`, label: 'Companies' },
    { value: `${certifications.length}`, label: 'AWS certifications' },
    { value: `${research.length}`, label: 'Papers & preprints' },
  ];

  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="text-center lg:text-left">
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <div className="text-3xl font-bold text-white">{s.value}</div>
            <div className="mt-1 text-sm font-medium text-blue-200">{s.label}</div>
          </dd>
        </div>
      ))}
    </dl>
  );
};

const TechBadges = () => {
  const techs = ['TypeScript', 'Python', 'Go', 'React', 'Kubernetes', 'AWS'];

  return (
    <ul className="flex flex-wrap justify-center gap-2.5 lg:justify-start">
      {techs.map((tech) => (
        <li
          key={tech}
          className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
};

export const HeroSection = () => {
  const sectionRef = useSectionTracking('hero');
  const { trackContactClick, trackResumeDownload } = useContactTracking();
  const { trackClick } = useClickTracking();

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex w-full items-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 pt-28 pb-20 lg:min-h-screen lg:pt-32 lg:pb-24"
    >
      {/* Ambient glow. pointer-events-none and behind content, so it can never eat a click. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute left-20 top-24 h-32 w-32 rounded-full bg-blue-400 blur-3xl" />
        <div className="absolute bottom-40 right-32 h-40 w-40 rounded-full bg-indigo-400 blur-3xl" />
        <div className="absolute left-1/3 top-1/2 h-24 w-24 rounded-full bg-cyan-400 blur-3xl" />
      </div>

      <div className="relative z-10 w-full">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            {/* Left column: the pitch */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-500/20 px-4 py-2 text-sm font-medium text-green-100">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Available for new opportunities
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl xl:text-7xl">
                  <span className="block">Taylor</span>
                  <span className="block bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                    Mohney
                  </span>
                </h1>
                <p className="text-xl font-semibold text-blue-100 sm:text-2xl">{personalInfo.title}</p>
              </div>

              <p className="mx-auto max-w-xl text-lg leading-relaxed text-blue-200 lg:mx-0">
                {personalInfo.tagline}
              </p>

              <TechBadges />

              <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <a
                  href="#experience"
                  className="group flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-blue-700 shadow-lg transition-colors hover:bg-blue-50"
                  onClick={(e) => trackClick(e, 'navigation', 'click', 'experience')}
                >
                  View experience
                  <svg
                    aria-hidden
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-7 py-3.5 font-semibold text-white shadow-lg transition-colors hover:bg-emerald-600"
                  onClick={trackResumeDownload}
                >
                  <svg aria-hidden className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download resume
                </a>
              </div>

              <div className="flex justify-center gap-6 lg:justify-start">
                {personalInfo.socialLinks.github && (
                  <SocialLink
                    href={personalInfo.socialLinks.github}
                    platform="github"
                    className="h-6 w-6 text-white/70 transition-colors hover:text-white"
                    onClick={() => trackContactClick('github')}
                    aria-label="GitHub profile"
                  />
                )}
                {personalInfo.socialLinks.linkedin && (
                  <SocialLink
                    href={personalInfo.socialLinks.linkedin}
                    platform="linkedin"
                    className="h-6 w-6 text-white/70 transition-colors hover:text-white"
                    onClick={() => trackContactClick('linkedin')}
                    aria-label="LinkedIn profile"
                  />
                )}
                {personalInfo.email && (
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-white/70 transition-colors hover:text-white"
                    aria-label="Email Taylor Mohney"
                    onClick={() => trackContactClick('email')}
                  >
                    <svg aria-hidden className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </a>
                )}
              </div>

              <div className="border-t border-white/10 pt-8">
                <HeroStats />
              </div>
            </div>

            {/* Right column: portrait. The role badge is anchored to the frame, not floated over the
                text column, so it cannot collide with anything at any breakpoint. */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-blue-400 to-cyan-400 opacity-60 blur-xl"
                />
                <div className="relative rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-sm">
                  <div className="relative aspect-square w-72 overflow-hidden rounded-xl sm:w-80 lg:w-[380px]">
                    <Image
                      src="/profilePic.jpeg"
                      alt={`${personalInfo.name}, ${personalInfo.title}`}
                      fill
                      className="object-cover object-center grayscale transition-all duration-700 hover:grayscale-0"
                      priority
                      sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 380px"
                    />
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-emerald-500 px-5 py-3 text-white shadow-xl lg:absolute lg:-bottom-6 lg:-left-6 lg:mt-0 lg:max-w-[280px]">
                  <div className="text-xs font-medium text-emerald-50">Current role</div>
                  <div className="text-sm font-bold">Principal Engineer, Kindly Robotics</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};
