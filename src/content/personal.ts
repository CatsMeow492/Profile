import { PersonalInfo } from '@/types/content';

export const personalInfo: PersonalInfo = {
  name: 'Taylor Mohney',
  title: 'Senior Software Engineer',
  // Updated 2026-08-04 to match the resume served at /cv.pdf. The previous copy was the summary from
  // an older resume (generic "GraphQL and REST APIs" framing), so the site described a different
  // engineer than the PDF a recruiter downloaded from it thirty seconds later.
  tagline: 'Shipping production AI and ML products, from agentic developer tooling to large-scale model serving',
  bio: `Senior Software Engineer with 10+ years shipping production AI and ML products, from customer-support
        chatbots and agentic developer tooling to large-scale ML serving infrastructure. Strong in TypeScript,
        Python, and Go, with deep experience delivering LLM-powered experiences to non-technical end users and
        operating them reliably on Docker, Kubernetes, and the cloud (AWS and GCP). Skilled in prompt and context
        engineering, multi-agent orchestration, retrieval-augmented generation, production eval loops, and the
        human-in-the-loop patterns that make AI features trustworthy in the field.`,
  location: 'Las Vegas, Nevada, United States',
  email: 'TaylorMohney@icloud.com',
  phone: '702-376-4552',
  website: 'https://youngmohney.com',
  socialLinks: {
    linkedin: 'https://linkedin.com/in/taylormohney',
    github: 'https://github.com/CatsMeow492',
  },
  resumeUrl: '/cv.pdf',
}; 