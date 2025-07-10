'use client';

import { Container } from '@/components/ui/Container';
import { experiences } from '@/content';
import type { Experience } from '@/types/content';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';

// Helper component for animated timeline line
const TimelineProgress = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.span
      style={{ scaleY }}
      className="absolute left-3 top-0 w-1 origin-top bg-gradient-to-b from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 rounded-full"
    />
  );
};

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: index * 0.1 }}
      className="relative pl-14"
    >
      {/* Dot */}
      <span className="absolute left-0 top-2 w-6 h-6 rounded-full border-4 border-white dark:border-gray-900 bg-gradient-to-tr from-blue-500 to-purple-600" />

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl ring-1 ring-gray-900/5 dark:ring-white/10 hover:scale-[1.02] hover:shadow-2xl transition-transform duration-300">
        <div className="flex items-start justify-between mb-4 flex-wrap gap-y-2">
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
            <ul className="space-y-1 list-disc list-inside">
              {experience.achievements.map((achievement, idx) => (
                <li key={idx} className="text-sm text-gray-700 dark:text-gray-300">
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}

        {experience.impact && (
          <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
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
    </motion.div>
  );
};

export const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start center', 'end end'] });

  return (
    <section ref={sectionRef} id="experience" className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Decorative background blobs */}
      <motion.div
        className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full filter blur-3xl opacity-30 dark:opacity-20" />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-full filter blur-3xl opacity-20 dark:opacity-15" />

      <Container>
        <div className="text-center mb-24" style={{ perspective: '1000px' }}>
          <motion.h2
            initial={{ rotateX: 90, opacity: 0 }}
            whileInView={{ rotateX: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 tracking-tight"
          >
            Professional Experience
          </motion.h2>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mt-4"
          >
            My journey through various roles in software engineering and research, building innovative solutions and advancing the field of machine learning optimization.
          </motion.p>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Static connecting line */}
          <div className="absolute left-3 top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
          
          {/* Vertical line progress */}
          <TimelineProgress scrollYProgress={scrollYProgress} />

          <div className="space-y-20">
            {experiences.map((experience, idx) => (
              <ExperienceCard key={experience.id} experience={experience} index={idx} />
            ))}
          </div>
        </div>

        {/* Summary Statistics */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          <StatCard value={experiences.length.toString()} label="Professional Roles" />
          <StatCard value="5+" label="Years Experience" />
          <StatCard
            value={Array.from(new Set(experiences.flatMap((exp) => exp.technologies))).length.toString()}
            label="Technologies Used"
          />
        </motion.div>
      </Container>
    </section>
  );
};

interface StatCardProps {
  value: string;
  label: string;
}

const StatCard = ({ value, label }: StatCardProps) => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl ring-1 ring-gray-900/5 dark:ring-white/10 text-center">
    <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-2">
      {value}
    </div>
    <div className="text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wide uppercase">
      {label}
    </div>
  </div>
); 