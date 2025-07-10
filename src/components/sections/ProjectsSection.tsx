'use client';

import { useState } from 'react';
import { projects } from '@/content/projects';
import { Project } from '@/types/content';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TechBadge } from '@/components/ui/Badge';
import { ExternalLink } from '@/components/ui/ExternalLink';

type ProjectCategory = 'all' | 'research' | 'web-app' | 'library';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'maintained':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getCategoryColor = (category: Project['category']) => {
    switch (category) {
      case 'research':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'web-app':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'library':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300';
      case 'tool':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const description = showFullDescription 
    ? project.longDescription || project.description 
    : project.description;

  const hasLongDescription = project.longDescription && project.longDescription !== project.description;

  return (
    <Card className="project-card group" variant="default">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 leading-tight">
              {project.name}
              {project.featured && (
                <Badge className="ml-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                  Featured
                </Badge>
              )}
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge className={getCategoryColor(project.category)}>
              {project.category.replace('-', ' ')}
            </Badge>
            <Badge className={getStatusColor(project.status)}>
              {project.status.replace('-', ' ')}
            </Badge>
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 mb-4">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
            {description}
          </p>
          
          {hasLongDescription && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline focus:outline-none focus:underline"
            >
              {showFullDescription ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 6).map((tech) => (
              <TechBadge key={tech} technology={tech} />
            ))}
            {project.technologies.length > 6 && (
              <Badge className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                +{project.technologies.length - 6} more
              </Badge>
            )}
          </div>
        </div>

        {/* Achievements */}
        {project.achievements && project.achievements.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 mb-2">
              Key Achievements
            </h4>
            <ul className="space-y-1">
              {project.achievements.slice(0, 3).map((achievement, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                  <span className="text-green-500 mt-1.5 flex-shrink-0">•</span>
                  <span className="leading-relaxed">{achievement}</span>
                </li>
              ))}
              {project.achievements.length > 3 && (
                <li className="text-sm text-gray-500 dark:text-gray-500 italic">
                  +{project.achievements.length - 3} more achievements
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Footer Links */}
        <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          {project.githubUrl && (
            <ExternalLink
              href={project.githubUrl}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              GitHub
            </ExternalLink>
          )}
          
          {project.liveUrl && (
            <ExternalLink
              href={project.liveUrl}
              className="flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </ExternalLink>
          )}
        </div>

        {/* Date range */}
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
          {project.startDate} {project.endDate ? `- ${project.endDate}` : '- Present'}
        </div>
      </div>
    </Card>
  );
};

interface ProjectStatsProps {
  projects: Project[];
}

const ProjectStats = ({ projects }: ProjectStatsProps) => {
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const inProgressProjects = projects.filter(p => p.status === 'in-progress').length;
  const featuredProjects = projects.filter(p => p.featured).length;
  const totalTechnologies = [...new Set(projects.flatMap(p => p.technologies))].length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{completedProjects}</div>
        <div className="text-sm text-emerald-800 dark:text-emerald-300">Completed</div>
      </div>
      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{inProgressProjects}</div>
        <div className="text-sm text-blue-800 dark:text-blue-300">In Progress</div>
      </div>
      <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{featuredProjects}</div>
        <div className="text-sm text-yellow-800 dark:text-yellow-300">Featured</div>
      </div>
      <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{totalTechnologies}</div>
        <div className="text-sm text-purple-800 dark:text-purple-300">Technologies</div>
      </div>
    </div>
  );
};

export const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [showAllProjects, setShowAllProjects] = useState(false);

  const filteredProjects = projects.filter(project => {
    if (selectedCategory === 'all') return true;
    return project.category === selectedCategory;
  });

  // Sort: featured first, then by status (in-progress, completed), then by date
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
    const statusOrder = { 'in-progress': 0, 'completed': 1, 'maintained': 2, 'archived': 3 };
    const statusDiff = statusOrder[a.status] - statusOrder[b.status];
    if (statusDiff !== 0) return statusDiff;
    
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  const displayedProjects = showAllProjects ? sortedProjects : sortedProjects.slice(0, 6);

  const categories: { value: ProjectCategory; label: string; count: number }[] = [
    { value: 'all', label: 'All Projects', count: projects.length },
    { value: 'research', label: 'Research', count: projects.filter(p => p.category === 'research').length },
    { value: 'web-app', label: 'Web Apps', count: projects.filter(p => p.category === 'web-app').length },
    { value: 'library', label: 'Libraries', count: projects.filter(p => p.category === 'library').length },
  ];

  return (
    <Section id="projects" title="Projects" className="py-16">
      <div className="space-y-8">
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A selection of research projects, web applications, and open-source libraries 
            spanning machine learning optimization, parameter-efficient fine-tuning, and production systems.
          </p>
        </div>

        <ProjectStats projects={projects} />

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.value
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Show More Button */}
        {sortedProjects.length > 6 && (
          <div className="text-center">
            <button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {showAllProjects ? 'Show Less' : `Show All ${sortedProjects.length} Projects`}
            </button>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No projects found in the selected category.
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}; 