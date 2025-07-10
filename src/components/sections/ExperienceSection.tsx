'use client';

import { Container } from '@/components/ui/Container';
import { experiences } from '@/content';
import type { Experience } from '@/types/content';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <div className="relative border-l-4 border-blue-500 pl-6 pb-12 last:pb-0">
      <div className="absolute -left-3 top-1.5 w-5 h-5 bg-blue-500 rounded-full border-4 border-white"></div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {experience.role}
            </h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              {experience.company} • {experience.location}
            </p>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {experience.duration}
          </span>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          {experience.description}
        </p>
        
        {experience.achievements.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Key Achievements:
            </h4>
            <ul className="space-y-1">
              {experience.achievements.map((achievement, index) => (
                <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                  <span className="text-blue-500 mr-2 mt-1 text-xs">▪</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {experience.impact && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              <span className="text-blue-600 dark:text-blue-400">Impact:</span> {experience.impact}
            </p>
          </div>
        )}
        
        {experience.technologies.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Technologies:
            </h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            My journey through various roles in software engineering and research, building innovative solutions and advancing the field of machine learning optimization.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </div>
        
        {/* Summary Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {experiences.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Professional Roles
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              5+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Years Experience
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {Array.from(new Set(experiences.flatMap(exp => exp.technologies))).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Technologies Used
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}; 