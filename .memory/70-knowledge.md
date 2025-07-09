# Domain & Project Knowledge - youngmohney.com Portfolio

## Domain Concepts

### Portfolio Website Architecture
**Definition:** A professional portfolio website serves as a digital representation of an individual's skills, experience, and accomplishments, optimized for both human visitors and search engines.

**Key Components:**
- **Hero Section:** First impression with name, title, and value proposition
- **Experience Timeline:** Chronological professional history with impact metrics
- **Skills Showcase:** Technology stack and competency visualization
- **Project Portfolio:** Curated work samples with live demos and code links
- **Research/Publications:** Academic or professional writing and contributions
- **Contact Integration:** Multiple professional connection pathways

### JAMstack Architecture
**Definition:** JavaScript, APIs, and Markup architecture pattern emphasizing pre-built markup and serverless functions for optimal performance and security.

**Benefits for Portfolios:**
- **Performance:** Static assets served from CDN with minimal server processing
- **Security:** Reduced attack surface with no database or server vulnerabilities
- **Scalability:** Global CDN distribution handles traffic spikes automatically
- **Cost Efficiency:** Minimal hosting costs with pay-per-use serverless functions
- **Developer Experience:** Git-based workflow with automatic deployments

### Next.js 15 Modern Features
**App Router Paradigm:**
- **Layouts:** Shared UI components across route segments
- **Server Components:** React components rendered on the server for better performance
- **Client Components:** Interactive components hydrated on the client
- **Streaming:** Progressive page loading for improved perceived performance

**Performance Optimizations:**
- **Automatic Code Splitting:** Route-based and dynamic imports
- **Image Optimization:** WebP/AVIF conversion with responsive sizing
- **Font Optimization:** Automatic font loading optimization
- **Bundle Analysis:** Built-in tools for monitoring bundle size

## Relationship Map

### Technology Stack Relationships
```
Next.js 15 (Framework)
├── React 19 (UI Library)
├── TypeScript (Type Safety)
├── Tailwind CSS (Styling)
├── Framer Motion (Animations)
└── MDX (Content)

Vercel (Hosting)
├── Edge CDN (Performance)
├── Analytics (Monitoring)
├── Preview Deployments (Workflow)
└── Domain Management (DNS)

Content Strategy
├── JSON Data (Structured Content)
├── MDX Files (Rich Content)
├── TypeScript Interfaces (Type Safety)
└── Git Workflow (Version Control)
```

### User Journey Relationships
```
Entry Points → Content Consumption → Professional Connection
├── SEO/Search → Hero Section → Contact Form
├── Social Media → Project Portfolio → GitHub Profile
├── Direct Link → Research Section → Publication Links
└── Referral → Experience Timeline → LinkedIn Profile
```

## Key Resources

### Technical Documentation
- **Next.js 15 Documentation:** https://nextjs.org/docs
- **React 19 Features:** https://react.dev/blog/2024/04/25/react-19
- **Tailwind CSS Guide:** https://tailwindcss.com/docs
- **Vercel Platform Docs:** https://vercel.com/docs
- **TypeScript Handbook:** https://www.typescriptlang.org/docs

### Performance Resources
- **Web.dev Performance:** https://web.dev/performance/
- **Core Web Vitals:** https://web.dev/vitals/
- **Lighthouse CI:** https://github.com/GoogleChrome/lighthouse-ci
- **Next.js Performance:** https://nextjs.org/docs/advanced-features/measuring-performance

### Design and UX
- **Portfolio Design Patterns:** https://www.awwwards.com/websites/portfolio/
- **Accessibility Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **Mobile-First Design:** https://web.dev/responsive-web-design-basics/
- **Typography Best Practices:** https://web.dev/learn/design/typography/

### Content Strategy
- **Resume to Portfolio Migration:** Converting traditional resume format to digital-first presentation
- **SEO for Personal Branding:** Optimizing professional visibility in search results
- **Research Presentation:** Academic publication display best practices
- **Professional Photography:** Portfolio imagery and personal branding guidelines

## Project Best Practices

### Code Organization
```typescript
// Content Type Definitions
interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  technologies: string[];
  achievements: string[];
  impact?: string;
}

// Component Structure
const ExperienceSection = () => {
  const experiences = useExperienceData();
  return (
    <Section id="experience" title="Professional Experience">
      <Timeline items={experiences} />
    </Section>
  );
};
```

### Performance Optimization
- **Image Loading:** Use Next.js Image component with priority for above-fold content
- **Font Loading:** Preload critical fonts and use font-display: swap
- **Code Splitting:** Dynamic imports for non-critical components
- **Bundle Analysis:** Regular bundle size monitoring and optimization

### Content Management
- **Type Safety:** Strict TypeScript interfaces for all content
- **Version Control:** Git-based content workflow with review process
- **Content Validation:** Schema validation for structured data
- **Asset Optimization:** Automated image compression and format conversion

### SEO and Metadata
```typescript
// Dynamic Meta Tag Generation
export const generateMetadata = ({ params }): Metadata => ({
  title: 'Taylor Mohney | Software Engineer & Researcher',
  description: 'Professional portfolio showcasing software engineering expertise and research contributions',
  openGraph: {
    title: 'Taylor Mohney | Professional Portfolio',
    description: 'Software Engineer & Researcher',
    images: ['/og-image.jpg'],
  },
});
```

### Accessibility Implementation
- **Semantic HTML:** Proper heading hierarchy and landmark elements
- **Keyboard Navigation:** Full keyboard accessibility for all interactive elements
- **Screen Reader Support:** ARIA labels and descriptions for complex interactions
- **Color Contrast:** WCAG AA compliance for all text and UI elements
- **Focus Management:** Visible focus indicators and logical tab order

## FAQ

### Development Questions

**Q: How should content updates be handled?**
A: Content updates follow a git-based workflow: edit JSON/MDX files → commit changes → automatic deployment via Vercel. This ensures version control and review process for content changes.

**Q: What's the optimal image strategy for portfolio projects?**
A: Use Next.js Image component with multiple formats (WebP, AVIF), responsive sizing, and lazy loading. Store images in `public/` directory with organized folder structure by content type.

**Q: How to handle dark mode implementation?**
A: Use Tailwind's dark mode with class strategy, implement system preference detection, and provide manual toggle with localStorage persistence for user preference.

### Performance Questions

**Q: How to maintain Lighthouse scores ≥ 95?**
A: Focus on Core Web Vitals: optimize images, minimize JavaScript bundles, use static generation, implement proper caching headers, and monitor with Lighthouse CI.

**Q: What's the animation performance budget?**
A: Limit Framer Motion to essential interactions, use transform and opacity properties for animations, avoid layout thrashing, and target 60fps on mobile devices.

### Content Strategy Questions

**Q: How detailed should project descriptions be?**
A: Provide concise summaries with key technologies, challenges solved, and impact metrics. Include external links for detailed exploration and live demos where available.

**Q: Should all GitHub repositories be displayed?**
A: Curate a selection of high-quality, representative projects. Consider using GitHub API for dynamic updates or maintain a static featured projects list for better control.

## Implicit Knowledge

### Portfolio Industry Standards
- **Load Time Expectations:** Professional portfolios should load in under 3 seconds on 3G connections
- **Mobile Traffic:** 60%+ of portfolio visits come from mobile devices
- **Attention Span:** Recruiters spend 15-30 seconds on initial portfolio scan
- **Contact Conversion:** Multiple contact methods increase connection probability by 40%

### Technical Performance Benchmarks
- **Core Web Vitals Targets:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Bundle Size Guidelines:** Initial JavaScript bundle < 200KB compressed
- **Image Optimization:** 80% size reduction through format conversion and compression
- **Cache Strategy:** Static assets cached for 1 year, HTML for 1 hour

### Professional Presentation Standards
- **Consistency:** Uniform typography, spacing, and color usage throughout
- **Hierarchy:** Clear information architecture with scannable content structure
- **Credibility:** Professional domain, HTTPS, error-free experience
- **Accessibility:** WCAG 2.1 AA compliance for inclusive professional presentation

### Content Freshness Indicators
- **Copyright Year:** Current year in footer indicates active maintenance
- **Recent Projects:** Portfolio should show work from last 2-3 years prominently
- **Technology Stack:** Current, relevant technologies demonstrate up-to-date skills
- **Contact Information:** Active, monitored contact methods ensure professional responsiveness

*Last Updated: Initial creation with foundational knowledge* 