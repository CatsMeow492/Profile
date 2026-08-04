import { Metadata } from 'next';
import { personalInfo } from '@/content/personal';

// Audited 2026-08-04. The previous version shipped placeholders straight to production:
//   siteUrl was 'https://taylormohney.com', a domain that does not resolve. robots.txt therefore
//   pointed Google's sitemap at a dead host, sitemap.xml advertised dead URLs, and og:image resolved
//   to https://taylormohney.com/images/og-image.jpg (dead domain AND a path that never existed), so
//   every LinkedIn/Slack/iMessage share of this site rendered with no preview image at all.
//   The description claimed "PhD researcher", the GitHub handle was 'taylormohney' (it is
//   CatsMeow492, so the schema.org sameAs link 404'd), the email was taylor@taylormohney.com, and
//   alumniOf/worksFor were the literal strings "Academic Institution" and "Research Institution".
// Identity now derives from src/content/personal.ts so it cannot drift out of sync again.
const SITE_URL = 'https://www.youngmohney.com';

export const seoConfig = {
  siteName: `${personalInfo.name} - ${personalInfo.title}`,
  siteUrl: SITE_URL,
  author: personalInfo.name,
  description:
    'Senior Software Engineer with 10+ years shipping production AI and ML products, from agentic developer tooling to large-scale model serving. TypeScript, Python and Go on Docker, Kubernetes, AWS and GCP.',
  keywords: [
    'Taylor Mohney',
    'Senior Software Engineer',
    'Principal Engineer',
    'AI Engineer',
    'Machine Learning Engineer',
    'LLM Agents',
    'RAG',
    'MLOps',
    'Model Serving',
    'TypeScript',
    'Python',
    'Go',
    'React',
    'Next.js',
    'Kubernetes',
    'AWS',
    'Full Stack Developer',
    'Remote Software Engineer',
    'Las Vegas',
  ],
  social: {
    linkedin: personalInfo.socialLinks.linkedin,
    github: personalInfo.socialLinks.github,
    email: personalInfo.email,
  },
  locale: 'en_US',
  type: 'website',
};

// schema.org Person. Only asserts what can be backed up: no degrees, no institutions,
// no job titles that are not on the resume.
export const generatePersonStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: seoConfig.author,
    url: seoConfig.siteUrl,
    description: seoConfig.description,
    jobTitle: personalInfo.title,
    email: `mailto:${seoConfig.social.email}`,
    telephone: personalInfo.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      addressCountry: 'US',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Kindly Robotics',
      url: 'https://kindly.fyi',
    },
    knowsAbout: [
      'Software Engineering',
      'Machine Learning Engineering',
      'LLM Agents',
      'Retrieval-Augmented Generation',
      'Model Serving and MLOps',
      'Full Stack Development',
      'Cloud Infrastructure',
    ],
    sameAs: [seoConfig.social.linkedin, seoConfig.social.github],
  };
};

export const generateMetadata = ({
  title,
  description = seoConfig.description,
  url = seoConfig.siteUrl,
  type = 'website',
}: {
  title?: string;
  description?: string;
  url?: string;
  type?: 'website' | 'article';
} = {}): Metadata => {
  const fullTitle = title ? `${title} | ${seoConfig.siteName}` : seoConfig.siteName;

  return {
    metadataBase: new URL(seoConfig.siteUrl),
    title: fullTitle,
    description,
    keywords: seoConfig.keywords,
    authors: [{ name: seoConfig.author, url: seoConfig.siteUrl }],
    creator: seoConfig.author,
    publisher: seoConfig.author,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // NOTE: `images` is deliberately omitted. Next generates a real 1200x630 card from
    // src/app/opengraph-image.tsx and wires it up automatically, but ONLY when metadata does not
    // set openGraph.images explicitly. The old explicit entry overrode that working generator with
    // a dead URL, which is why previews were blank.
    openGraph: {
      type,
      title: fullTitle,
      description,
      url,
      siteName: seoConfig.siteName,
      locale: seoConfig.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    alternates: {
      canonical: url,
    },
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
      : {}),
  };
};
