'use client';

import { personalInfo } from '@/content/personal';
import { SocialLink } from '@/components/ui/ExternalLink';
import { Container } from '@/components/ui/Container';
import { useSectionTracking, useContactTracking, useClickTracking } from '@/hooks/useAnalytics';

const HeroStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/20">
      <div className="text-center">
        <div className="text-2xl md:text-3xl font-bold text-white mb-1">4+</div>
        <div className="text-sm text-blue-100">Years Experience</div>
      </div>
      <div className="text-center">
        <div className="text-2xl md:text-3xl font-bold text-white mb-1">6+</div>
        <div className="text-sm text-blue-100">Research Papers</div>
      </div>
      <div className="text-center">
        <div className="text-2xl md:text-3xl font-bold text-white mb-1">8+</div>
        <div className="text-sm text-blue-100">Certifications</div>
      </div>
      <div className="text-center">
        <div className="text-2xl md:text-3xl font-bold text-white mb-1">20+</div>
        <div className="text-sm text-blue-100">Technologies</div>
      </div>
    </div>
  );
};

const ScrollIndicator = () => {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div className="flex flex-col items-center text-white/60 hover:text-white/80 transition-colors">
        <span className="text-sm mb-2">Scroll to explore</span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export const HeroSection = () => {
  const sectionRef = useSectionTracking('hero');
  const { trackContactClick, trackResumeDownload } = useContactTracking();
  const { trackClick } = useClickTracking();

  return (
    <section id="hero" ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900"></div>
      
      {/* Content with proper container */}
      <div className="relative w-full">
        <Container className="text-center">
          {/* Main Content */}
          <div className="space-y-8 py-16 md:py-24">
            {/* Introduction */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
                {personalInfo.name}
              </h1>
              
              <div className="space-y-4">
                <p className="max-w-2xl mx-auto text-xl md:text-2xl text-blue-100 font-medium leading-relaxed">
                  {personalInfo.title}
                </p>
                
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-blue-200 leading-relaxed">
                  {personalInfo.tagline}
                </p>
              </div>
            </div>

            {/* Enhanced Bio */}
            <div className="max-w-4xl mx-auto">
              <p className="text-base md:text-lg text-blue-100 leading-relaxed opacity-90">
                {personalInfo.bio}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6">
              {personalInfo.socialLinks.github && (
                <SocialLink
                  href={personalInfo.socialLinks.github}
                  platform="github"
                  className="text-white hover:text-blue-200 transition-colors w-8 h-8"
                  onClick={() => trackContactClick('github')}
                >
                  <span className="sr-only">GitHub</span>
                </SocialLink>
              )}
              {personalInfo.socialLinks.linkedin && (
                <SocialLink
                  href={personalInfo.socialLinks.linkedin}
                  platform="linkedin"
                  className="text-white hover:text-blue-200 transition-colors w-8 h-8"
                  onClick={() => trackContactClick('linkedin')}
                >
                  <span className="sr-only">LinkedIn</span>
                </SocialLink>
              )}
              {personalInfo.socialLinks.scholar && (
                <SocialLink
                  href={personalInfo.socialLinks.scholar}
                  platform="scholar"
                  className="text-white hover:text-blue-200 transition-colors w-8 h-8"
                >
                  <span className="sr-only">Google Scholar</span>
                </SocialLink>
              )}
              {personalInfo.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-white hover:text-blue-200 transition-colors"
                  aria-label="Email"
                  onClick={() => trackContactClick('email')}
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </a>
              )}
            </div>

            {/* Call to Action Buttons */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#experience" 
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                  onClick={(e) => trackClick(e, 'navigation', 'click', 'experience')}
                >
                  View Experience
                </a>
                <a 
                  href="#projects" 
                  className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                  onClick={(e) => trackClick(e, 'navigation', 'click', 'projects')}
                >
                  View Projects
                </a>
                <a 
                  href="#research" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
                  onClick={(e) => trackClick(e, 'navigation', 'click', 'research')}
                >
                  Research Papers
                </a>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={personalInfo.resumeUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                  onClick={trackResumeDownload}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Resume
                </a>
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/30 hover:border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-all"
                  onClick={(e) => trackClick(e, 'navigation', 'click', 'contact')}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Get In Touch
                </a>
              </div>
            </div>

            {/* Professional Statistics */}
            <HeroStats />
          </div>
        </Container>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}; 