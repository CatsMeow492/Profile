// Core content types for portfolio
export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate?: string; // undefined for current position
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
  impact?: string;
  companyUrl?: string;
  companyLogo?: string;
}

export interface Research {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  abstract: string;
  doi?: string;
  arxivId?: string;
  pdfUrl?: string;
  category: 'machine-learning' | 'quantization' | 'optimization' | 'theory' | 'other';
  keywords: string[];
  status: 'published' | 'preprint' | 'in-review' | 'draft';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
  badgeUrl?: string;
  description: string;
  skills: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  startDate: string;
  endDate?: string;
  status: 'completed' | 'in-progress' | 'maintained' | 'archived';
  featured: boolean;
  category: 'web-app' | 'mobile-app' | 'library' | 'research' | 'tool' | 'other';
  achievements?: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  website: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    scholar?: string;
    orcid?: string;
  };
  resumeUrl: string;
  profileImageUrl?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  level: 1 | 2 | 3 | 4 | 5; // 1=beginner, 5=expert
  category: string;
  yearsOfExperience?: number;
  lastUsed?: string;
}

// Content collections
export interface PortfolioContent {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  research: Research[];
  certifications: Certification[];
  projects: Project[];
  skillCategories: SkillCategory[];
}

// Utility types
export type ContentSection = 'experience' | 'research' | 'certifications' | 'projects' | 'skills' | 'contact';

export interface SectionMetadata {
  id: ContentSection;
  title: string;
  description: string;
  icon?: string;
  order: number;
} 