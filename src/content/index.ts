// Export all content
export { personalInfo } from './personal';
export { experiences } from './experience';
export { research } from './research';
export { projects } from './projects';
export { certifications } from './certifications';

// Re-export types for convenience
export type {
  PersonalInfo,
  Experience,
  Research,
  Project,
  Certification,
  PortfolioContent,
  ContentSection,
  SectionMetadata
} from '@/types/content';

import { personalInfo } from './personal';
import { experiences } from './experience';
import { research } from './research';
import { projects } from './projects';
import { certifications } from './certifications';
import type { PortfolioContent, SectionMetadata, ContentSection } from '@/types/content';

// Combined portfolio content
export const portfolioContent: PortfolioContent = {
  personalInfo,
  experiences,
  research,
  certifications,
  projects,
  skillCategories: [] // To be implemented later
};

// Section metadata for navigation and display
export const sectionMetadata: SectionMetadata[] = [
  {
    id: 'experience',
    title: 'Professional Experience',
    description: 'My professional journey and key achievements',
    order: 1
  },
  {
    id: 'research',
    title: 'Research & Publications',
    description: 'Academic research and published papers',
    order: 2
  },
  {
    id: 'certifications',
    title: 'Certifications',
    description: 'Professional certifications and credentials',
    order: 3
  },
  {
    id: 'projects',
    title: 'Featured Projects',
    description: 'Notable projects and technical contributions',
    order: 4
  },
  {
    id: 'contact',
    title: 'Get In Touch',
    description: 'Ways to connect and collaborate',
    order: 5
  }
];

// Utility functions
export const getSection = (sectionId: ContentSection): SectionMetadata | undefined => {
  return sectionMetadata.find(section => section.id === sectionId);
};

export const getFeaturedProjects = () => {
  return projects.filter(project => project.featured);
};

export const getRecentResearch = (count: number = 3) => {
  return research
    .filter(paper => paper.status === 'published')
    .sort((a, b) => b.year - a.year)
    .slice(0, count);
};

export const getCurrentExperience = () => {
  return experiences.find(exp => !exp.endDate);
};

export const getActiveCertifications = () => {
  const now = new Date();
  return certifications.filter(cert => {
    if (!cert.expiryDate) return true;
    return new Date(cert.expiryDate) > now;
  });
};

export const getTechnologies = () => {
  const techSet = new Set<string>();
  
  // Collect from experiences
  experiences.forEach(exp => {
    exp.technologies.forEach(tech => techSet.add(tech));
  });
  
  // Collect from projects
  projects.forEach(project => {
    project.technologies.forEach(tech => techSet.add(tech));
  });
  
  return Array.from(techSet).sort();
};

export const getResearchCategories = () => {
  const categories = new Set(research.map(paper => paper.category));
  return Array.from(categories);
}; 