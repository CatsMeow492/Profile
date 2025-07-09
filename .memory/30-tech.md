# Technology Landscape - youngmohney.com Portfolio

## Technology Stack

### Frontend Framework
- **Next.js 15:** React-based framework with App Router, React 19 support, Turbopack dev server
- **React 19:** Latest React with concurrent features and improved server components
- **TypeScript 5.x:** Static type checking with strict mode configuration

### Styling & UI
- **Tailwind CSS 3.x:** Utility-first CSS framework with custom design tokens
- **Tailwind Typography:** Rich text styling for MDX content
- **Framer Motion:** Animation library for smooth interactions (<20KB after tree-shaking)
- **Heroicons/Lucide:** Consistent icon system

### Content Management
- **MDX:** Markdown with JSX for rich content authoring
- **Gray-matter:** Front matter parsing for metadata
- **Remark/Rehype:** Markdown processing pipeline
- **TypeScript Interfaces:** Strongly typed content schemas

### Developer Experience
- **ESLint:** Code linting with Next.js configuration
- **Prettier:** Code formatting with project standards
- **Husky:** Git hooks for pre-commit validation
- **lint-staged:** Run linters on staged files only

### Testing & Quality
- **Playwright:** End-to-end testing for critical user journeys
- **@testing-library/react:** Component testing utilities
- **Jest:** Unit testing framework with React Testing Library
- **Lighthouse CI:** Automated performance auditing

### Build & Deployment
- **Vercel:** Platform-as-a-Service with automatic deployments
- **GitHub Actions:** CI/CD pipeline for testing and deployment
- **Sharp:** Image optimization during build
- **Bundle Analyzer:** Build output analysis and optimization

## Development Environment

### Required Software
```bash
# Node.js LTS (v18.17+ or v20.5+)
node --version
# npm 9+ or pnpm 8+ (recommended)
pnpm --version
# Git 2.30+
git --version
```

### Environment Setup
```bash
# Clone repository
git clone https://github.com/CatsMeow492/Profile.git
cd Profile

# Install dependencies
pnpm install

# Environment configuration
cp .env.example .env.local
# Edit .env.local with required values

# Development server
pnpm dev
# Open http://localhost:3000
```

### IDE Configuration
- **VS Code:** Recommended editor with extensions
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier
  - MDX
- **Settings:** Workspace settings for consistent formatting

## Dependencies

### Production Dependencies
```json
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "framer-motion": "^11.0.0",
  "@tailwindcss/typography": "^0.5.0",
  "@mdx-js/loader": "^3.0.0",
  "@mdx-js/react": "^3.0.0",
  "gray-matter": "^4.0.3",
  "remark": "^15.0.0",
  "rehype": "^13.0.0",
  "sharp": "^0.32.0"
}
```

### Development Dependencies
```json
{
  "@types/node": "^20.0.0",
  "@types/react": "^18.0.0",
  "@types/react-dom": "^18.0.0",
  "typescript": "^5.0.0",
  "eslint": "^8.0.0",
  "eslint-config-next": "^15.0.0",
  "prettier": "^3.0.0",
  "tailwindcss": "^3.4.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0",
  "@playwright/test": "^1.40.0",
  "husky": "^8.0.0",
  "lint-staged": "^15.0.0"
}
```

### Version Pinning Strategy
- **Exact Versions:** Critical dependencies (Next.js, React)
- **Caret Ranges:** Stable libraries with good semver practices
- **Lock Files:** pnpm-lock.yaml committed for reproducible builds
- **Dependabot:** Automated dependency updates with PR reviews

## Build & Deployment

### Build Configuration
```javascript
// next.config.js
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    NODE_OPTIONS: '--openssl-legacy-provider', // If needed for Web3 libs
  },
}
```

### Deployment Pipeline
1. **Development:** Local development with hot reloading
2. **Pull Request:** Automated preview deployments on Vercel
3. **Testing:** Playwright e2e tests, Lighthouse CI audits
4. **Staging:** Preview environment with production configuration
5. **Production:** Automatic deployment on main branch merge

### CI/CD Workflow (GitHub Actions)
```yaml
name: CI/CD Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
      - name: Setup Node.js
      - name: Install dependencies
      - name: Lint
      - name: Type check
      - name: Build
      - name: Test
      - name: Lighthouse CI
```

## Environment Configuration

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://youngmohney.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
VERCEL_URL=${VERCEL_URL}
```

### Environment Differences
- **Development:** Hot reloading, verbose logging, development tools
- **Preview:** Production build with staging configuration
- **Production:** Optimized build, analytics enabled, error monitoring

## Tool Chain

### Development Tools
- **Next.js DevTools:** Built-in performance monitoring
- **React Developer Tools:** Component debugging
- **Vercel Toolbar:** Preview deployment tools
- **Bundle Analyzer:** Build size analysis

### Monitoring & Analytics
- **Vercel Analytics:** Core Web Vitals, user sessions
- **Google Analytics 4:** User behavior and conversion tracking
- **Lighthouse CI:** Performance regression testing
- **Sentry:** Error monitoring and performance tracking (optional)

### Content Tools
- **MDX Playground:** Content preview and editing
- **Figma/Sketch:** Design assets and component specifications
- **GitHub Codespaces:** Cloud development environment

## Performance Considerations

### Build Optimizations
- **Static Generation:** Pre-render all pages at build time
- **Image Optimization:** Automatic WebP/AVIF conversion, responsive images
- **Code Splitting:** Automatic route-based and dynamic imports
- **Tree Shaking:** Remove unused code from final bundle
- **Minification:** JavaScript, CSS, and HTML compression

### Runtime Optimizations
- **Edge Caching:** Vercel CDN with intelligent cache invalidation
- **Service Worker:** Offline functionality and cache management (optional)
- **Resource Hints:** Preload critical resources
- **Critical CSS:** Inline above-the-fold styles

## Security Configuration

### Content Security Policy
```javascript
// Security headers
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline';"
  }
]
```

### Dependencies Security
- **npm audit:** Regular vulnerability scanning
- **Dependabot alerts:** Automated security updates
- **OWASP guidelines:** Secure coding practices
- **Input validation:** Sanitize user inputs

*Last Updated: Initial creation* 