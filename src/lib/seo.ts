import { Metadata } from 'next';

// SEO Configuration
export const seoConfig = {
  siteName: 'Taylor Mohney - Research Scientist & Software Engineer',
  siteUrl: 'https://taylormohney.com', // Update with actual domain
  author: 'Taylor Mohney',
  description: 'Research Scientist and Software Engineer specializing in machine learning, quantization theory, and scalable software systems. PhD researcher with expertise in LoRA fine-tuning, neural network optimization, and enterprise software development.',
  keywords: [
    'Taylor Mohney',
    'Research Scientist',
    'Software Engineer',
    'Machine Learning',
    'Neural Networks',
    'Quantization Theory',
    'LoRA Fine-tuning',
    'PhD Researcher',
    'Software Development',
    'Python',
    'TypeScript',
    'React',
    'Next.js',
    'AI Research',
    'Deep Learning',
    'Optimization',
    'Enterprise Software',
    'Full Stack Developer',
    'Data Science',
    'Academic Research',
  ],
  social: {
    twitter: '@taylormohney', // Update with actual handle
    linkedin: 'taylormohney', // Update with actual profile
    github: 'taylormohney', // Update with actual username
    email: 'taylor@taylormohney.com', // Update with actual email
  },
  locale: 'en_US',
  type: 'website',
};

// Generate structured data for personal/professional profile
export const generatePersonStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: seoConfig.author,
    url: seoConfig.siteUrl,
    description: seoConfig.description,
    jobTitle: ['Research Scientist', 'Software Engineer'],
    knowsAbout: [
      'Machine Learning',
      'Neural Network Optimization',
      'Software Engineering',
      'Research Methodology',
      'Full Stack Development',
      'Data Science',
    ],
    alumniOf: {
      '@type': 'Organization',
      name: 'Academic Institution', // Update with actual institution
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Research Institution', // Update with actual workplace
    },
    sameAs: [
      `https://twitter.com/${seoConfig.social.twitter.replace('@', '')}`,
      `https://linkedin.com/in/${seoConfig.social.linkedin}`,
      `https://github.com/${seoConfig.social.github}`,
    ],
    image: `${seoConfig.siteUrl}/images/profile.jpg`, // Update with actual image
    email: seoConfig.social.email,
  };
};

// Generate structured data for research works
export const generateResearchStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Research Publications',
    description: 'Academic research papers and publications by Taylor Mohney',
    itemListElement: [
      {
        '@type': 'ScholarlyArticle',
        name: 'Quantization Bounds in LoRA Fine-tuning',
        description: 'Theoretical analysis of quantization noise in low-rank adaptation methods',
        author: {
          '@type': 'Person',
          name: seoConfig.author,
        },
        datePublished: '2024',
        publisher: {
          '@type': 'Organization',
          name: 'Research Publication Venue',
        },
      },
      // Add more research items as needed
    ],
  };
};

// Generate default metadata
export const generateMetadata = ({
  title,
  description = seoConfig.description,
  image = `${seoConfig.siteUrl}/images/og-image.jpg`,
  url = seoConfig.siteUrl,
  type = 'website',
}: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
} = {}): Metadata => {
  const fullTitle = title 
    ? `${title} | ${seoConfig.siteName}`
    : seoConfig.siteName;

  return {
    metadataBase: new URL(seoConfig.siteUrl),
    title: fullTitle,
    description,
    keywords: seoConfig.keywords,
    authors: [{ name: seoConfig.author }],
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
    openGraph: {
      type,
      title: fullTitle,
      description,
      url,
      siteName: seoConfig.siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: seoConfig.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: seoConfig.social.twitter,
      site: seoConfig.social.twitter,
    },
    alternates: {
      canonical: url,
    },
    other: {
      'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
    },
  };
};

// Generate section-specific metadata
export const sectionMetadata = {
  experience: generateMetadata({
    title: 'Professional Experience',
    description: 'Professional software engineering and research experience including enterprise development, machine learning projects, and academic research positions.',
  }),
  research: generateMetadata({
    title: 'Research & Publications',
    description: 'Academic research papers and publications focusing on machine learning, neural network optimization, and quantization theory.',
  }),
  projects: generateMetadata({
    title: 'Featured Projects',
    description: 'Portfolio of software engineering projects including full-stack applications, machine learning implementations, and research tools.',
  }),
  certifications: generateMetadata({
    title: 'Professional Certifications',
    description: 'Professional certifications and achievements in software engineering, cloud computing, and technical leadership.',
  }),
}; 