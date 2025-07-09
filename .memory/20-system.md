# System Architecture - youngmohney.com Portfolio

## System Overview
The portfolio website follows a modern JAMstack architecture using Next.js 15 with static site generation, deployed on Vercel's edge network with custom domain routing through Route 53.

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   DNS (Route53) │────│  Vercel Edge CDN │────│  Next.js 15 App │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                │                        │
                       ┌────────▼────────┐      ┌────────▼────────┐
                       │  Static Assets  │      │  Content Data   │
                       │  (Images, CSS)  │      │  (JSON/MDX)     │
                       └─────────────────┘      └─────────────────┘
```

## Component Breakdown

### Frontend Layer (Next.js 15 App Router)
- **Layout Components:** Root layout with navigation and footer
- **Page Components:** Single-page application with section-based routing
- **UI Components:** Reusable components for consistent design system
- **Content Components:** Dynamic components consuming JSON/MDX data

### Data Layer
- **Static Content:** JSON files for structured data (experience, certifications)
- **Dynamic Content:** MDX files for rich content (research, projects)
- **Assets:** Optimized images, documents (CV PDF), icons

### Infrastructure Layer
- **Hosting:** Vercel platform with automatic deployments
- **CDN:** Global edge network for asset delivery
- **DNS:** Route 53 for domain management
- **CI/CD:** GitHub Actions for automated testing and deployment

## Design Patterns

### Application Architecture
- **Single Page Application (SPA):** Client-side routing with smooth scrolling
- **Static Site Generation (SSG):** Pre-rendered pages for optimal performance
- **Component-Based Architecture:** Reusable UI components with TypeScript
- **Data-Driven Design:** Content separation from presentation logic

### Component Patterns
- **Compound Components:** Complex UI elements with multiple sub-components
- **Render Props:** Flexible component composition for dynamic content
- **Higher-Order Components:** Cross-cutting concerns like analytics, theming
- **Custom Hooks:** Reusable stateful logic for theme, scroll position, etc.

### Code Organization
```
src/
├── app/                    # App Router pages and layouts
│   ├── (site)/            # Route group for main site
│   │   ├── layout.tsx     # Root layout component
│   │   └── page.tsx       # Home page component
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── sections/         # Page section components
│   └── layout/           # Layout-specific components
├── content/              # Static content data
│   ├── experience.ts     # Work experience data
│   ├── research.ts       # Publications and research
│   └── certifications.ts # Professional certifications
├── lib/                  # Utility functions and configurations
└── types/               # TypeScript type definitions
```

## Data Flow

### Content Management Flow
1. **Source:** PDF resume and manual content entry
2. **Transformation:** Convert to typed JSON/MDX files
3. **Consumption:** Components import and render data
4. **Updates:** Git-based versioning for content changes

### User Interaction Flow
1. **Request:** User visits youngmohney.com
2. **DNS Resolution:** Route 53 → Vercel edge locations
3. **Static Delivery:** Pre-rendered HTML + hydrated React components
4. **Client Navigation:** Smooth scroll to sections, dynamic interactions
5. **Analytics:** User behavior tracking and performance monitoring

## Integration Points

### External Services
- **GitHub API:** Automated project data fetching (optional)
- **Vercel Analytics:** Performance and user behavior tracking
- **Google Analytics:** Detailed user journey analysis
- **Lighthouse CI:** Automated performance monitoring

### Content Sources
- **Static Files:** JSON/MDX content in repository
- **Asset CDN:** Optimized images through Vercel's image optimization
- **External Links:** Direct links to research papers, live demos

## Architectural Decisions

### Technology Choices
- **Next.js 15:** Latest features, React 19 support, stable Turbopack
- **TypeScript:** Type safety, better developer experience
- **Tailwind CSS:** Utility-first styling, consistent design system
- **App Router:** Modern routing with layout support
- **Static Generation:** Optimal performance for content-heavy site

### Performance Optimizations
- **Image Optimization:** Next.js automatic image optimization
- **Code Splitting:** Automatic route-based code splitting
- **Tree Shaking:** Eliminate unused code from bundles
- **Edge Caching:** Vercel CDN for global content delivery
- **Critical CSS:** Inline critical styles for faster initial paint

### Security Considerations
- **Static Deployment:** No server-side vulnerabilities
- **HTTPS Only:** Automatic SSL/TLS through Vercel
- **Content Security Policy:** Prevent XSS attacks
- **Input Sanitization:** Sanitize any user inputs (contact forms)

## Non-Functional Requirements

### Performance Targets
- **Lighthouse Performance:** ≥ 95
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **Time to Interactive:** < 3s

### Scalability Considerations
- **Static Generation:** Scales infinitely with CDN
- **Content Updates:** Git-based workflow for content changes
- **Feature Extensions:** Component-based architecture for easy additions
- **Performance Monitoring:** Automated alerts for performance degradation

### Reliability Requirements
- **Uptime:** 99.9% availability (Vercel SLA)
- **Error Monitoring:** Automatic error tracking and alerting
- **Backup Strategy:** Git repository as source of truth
- **Rollback Capability:** Git tags for version management

*Last Updated: Initial creation* 