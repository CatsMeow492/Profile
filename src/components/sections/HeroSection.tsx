'use client';

import { personalInfo } from '@/content/personal';
import { SocialLink } from '@/components/ui/ExternalLink';
import { Container } from '@/components/ui/Container';
import { useSectionTracking, useContactTracking, useClickTracking } from '@/hooks/useAnalytics';
import Image from 'next/image';

const HeroStats = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
      <div className="text-center lg:text-left">
        <div className="text-3xl lg:text-4xl font-bold text-white mb-2">10+</div>
        <div className="text-sm text-blue-100 font-medium">Years Experience</div>
      </div>
      <div className="text-center lg:text-left">
        <div className="text-3xl lg:text-4xl font-bold text-white mb-2">6+</div>
        <div className="text-sm text-blue-100 font-medium">Major Companies</div>
      </div>
      <div className="text-center lg:text-left">
        <div className="text-3xl lg:text-4xl font-bold text-white mb-2">4</div>
        <div className="text-sm text-blue-100 font-medium">AWS Certifications</div>
      </div>
      <div className="text-center lg:text-left">
        <div className="text-3xl lg:text-4xl font-bold text-white mb-2">99.9%</div>
        <div className="text-sm text-blue-100 font-medium">Uptime Achievement</div>
      </div>
    </div>
  );
};

const TechBadges = () => {
  const techs = ['TypeScript', 'Python', 'Go', 'React', 'AWS', 'Blockchain'];
  
  return (
    <div className="flex flex-wrap gap-3 mt-8">
      {techs.map((tech) => (
        <span 
          key={tech}
          className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white font-medium hover:bg-white/20 transition-all duration-300"
        >
          {tech}
        </span>
      ))}
    </div>
  );
};

const FloatingCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <div 
    className={`animate-pulse`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 ${className}`}>
      {children}
    </div>
  </div>
);

const ScrollIndicator = () => {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:flex">
      <div className="flex flex-col items-center text-white/60 hover:text-white/80 transition-colors cursor-pointer">
        <span className="text-sm mb-2 font-medium">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
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
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-32 w-40 h-40 bg-indigo-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyan-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating Background Cards */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingCard className="absolute top-20 right-20 w-48 hidden xl:block" delay={0}>
          <div className="text-sm text-white/80">Currently building with</div>
          <div className="text-lg font-semibold text-white mt-1">Next.js + TypeScript</div>
        </FloatingCard>
        
        <FloatingCard className="absolute bottom-32 left-20 w-52 hidden xl:block" delay={1000}>
          <div className="text-sm text-white/80">Latest achievement</div>
          <div className="text-lg font-semibold text-white mt-1">DoD Video Conferencing</div>
        </FloatingCard>
      </div>
      
      {/* Main Content */}
      <div className="relative w-full z-10">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-16 lg:py-0">
            
            {/* Left Column - Content */}
            <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 rounded-full px-4 py-2 text-green-100 text-sm font-medium">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Available for new opportunities
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight tracking-tight">
                  <span className="block">Taylor</span>
                  <span className="block bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                    Mohney
                  </span>
                </h1>
                
                <p className="text-xl sm:text-2xl lg:text-3xl text-blue-100 font-semibold leading-relaxed">
                  {personalInfo.title}
                </p>
              </div>

              {/* Enhanced Tagline */}
              <div className="space-y-4">
                <p className="text-lg sm:text-xl text-blue-200 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {personalInfo.tagline}
                </p>
                
                <p className="text-base text-blue-300/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 hidden sm:block">
                  Specialized in designing high-performance systems for Fortune 500 companies, 
                  government agencies, and cutting-edge startups.
                </p>
              </div>

              {/* Tech Badges */}
              <TechBadges />

              {/* Action Buttons */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a 
                    href="#experience" 
                    className="group bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                    onClick={(e) => trackClick(e, 'navigation', 'click', 'experience')}
                  >
                    View Experience
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  
                  <a 
                    href={personalInfo.resumeUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                    onClick={trackResumeDownload}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Resume
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex justify-center lg:justify-start space-x-6">
                  {personalInfo.socialLinks.github && (
                    <SocialLink
                      href={personalInfo.socialLinks.github}
                      platform="github"
                      className="text-white/70 hover:text-white transition-all hover:scale-110 w-6 h-6"
                      onClick={() => trackContactClick('github')}
                    >
                      <span className="sr-only">GitHub</span>
                    </SocialLink>
                  )}
                  {personalInfo.socialLinks.linkedin && (
                    <SocialLink
                      href={personalInfo.socialLinks.linkedin}
                      platform="linkedin"
                      className="text-white/70 hover:text-white transition-all hover:scale-110 w-6 h-6"
                      onClick={() => trackContactClick('linkedin')}
                    >
                      <span className="sr-only">LinkedIn</span>
                    </SocialLink>
                  )}
                  {personalInfo.email && (
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-white/70 hover:text-white transition-all hover:scale-110"
                      aria-label="Email"
                      onClick={() => trackContactClick('email')}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Professional Statistics */}
              <HeroStats />
            </div>

            {/* Right Column - Professional Image */}
            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl blur opacity-75 animate-pulse"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl"></div>
                
                {/* Main Image Container */}
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
                  <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] rounded-xl overflow-hidden">
                    <Image
                      src="/profilePic.jpeg"
                      alt="Taylor Mohney - Senior Software Engineer"
                      fill
                      className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                      priority
                      sizes="(max-width: 640px) 320px, (max-width: 1024px) 384px, (max-width: 1280px) 400px, 450px"
                    />
                    
                    {/* Overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent"></div>
                  </div>
                </div>

                {/* Floating Achievement Badge */}
                <div className="absolute -bottom-6 -right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl border-4 border-white/20 backdrop-blur-sm">
                  <div className="text-xs font-medium text-green-100">Latest Role</div>
                  <div className="text-sm font-bold">DoD Lead Developer</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}; 