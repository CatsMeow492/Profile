# Project Charter - youngmohney.com Portfolio

## Project Outline
**Purpose:** Build a modern, professional portfolio website to replace the legacy Profile.git repository with a clean, performant Next.js 15 application showcasing professional experience, research, certifications, and projects.

**Vision:** Create a comprehensive digital presence that serves as both a professional portfolio and a platform for sharing research work and technical expertise.

## Core Requirements
1. **Modern Tech Stack:** Next.js 15 with TypeScript, Tailwind CSS, App Router
2. **Content Sections:** Work experience, research & publications, certifications, projects
3. **Data-Driven:** Content managed via JSON/MDX files derived from PDF resume
4. **Performance:** Lighthouse scores ≥ 95, optimized for speed and accessibility
5. **SEO & Metadata:** Proper OG tags, next-seo configuration
6. **Custom Domain:** youngmohney.com via Route 53 and Vercel
7. **Responsive Design:** Mobile-first, dark/light mode support
8. **CI/CD:** GitHub Actions with automated testing and Vercel preview deployments

## Success Criteria
- [ ] Legacy backup completed and new baseline established
- [ ] All content sections properly implemented and populated
- [ ] Domain successfully connected and HTTPS working
- [ ] Performance metrics meet targets (Lighthouse ≥ 95)
- [ ] Automated testing and deployment pipeline functional
- [ ] Production site tagged as v1.0.0

## Stakeholders
- **Primary:** Taylor Mohney (Owner/Developer)
- **Secondary:** Professional network, potential employers, research community

## Constraints
- **Timeline:** Rapid deployment focused (20-step plan suggests quick turnaround)
- **Technical:** Must maintain existing GitHub repository structure
- **Content:** Limited to information available in current PDF resume
- **Domain:** Existing Route 53 management requires careful DNS transition

## Timeline
- **Phase 1:** Project setup and baseline (Steps 1-4)
- **Phase 2:** Core development (Steps 5-12)
- **Phase 3:** Polish and optimization (Steps 13-16)
- **Phase 4:** Testing and deployment (Steps 17-20)
- **Target:** Production deployment with v1.0.0 tag

*Last Updated: Initial creation* 