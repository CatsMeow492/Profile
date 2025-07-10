import { Experience } from '@/types/content';

export const experiences: Experience[] = [
  {
    id: 'senior-swe-current',
    company: 'Advanced AI Systems',
    role: 'Senior Software Engineer',
    location: 'Remote',
    startDate: '2023-01',
    duration: '1+ year',
    description: 'Lead development of machine learning infrastructure and optimization systems for large-scale AI applications.',
    achievements: [
      'Designed and implemented quantization-aware training pipeline reducing model size by 75% while maintaining accuracy',
      'Led team of 4 engineers in building distributed training infrastructure supporting 100B+ parameter models',
      'Developed novel compression algorithms achieving 4x speedup in inference with minimal accuracy loss',
      'Established MLOps practices reducing model deployment time from weeks to hours'
    ],
    technologies: [
      'Python', 'PyTorch', 'TensorFlow', 'CUDA', 'Docker', 'Kubernetes', 
      'AWS', 'Apache Spark', 'Redis', 'PostgreSQL', 'TypeScript', 'React'
    ],
    impact: 'Reduced infrastructure costs by $2M annually through optimization improvements',
    companyUrl: 'https://example-ai.com'
  },
  {
    id: 'ml-engineer-2022',
    company: 'DataTech Solutions',
    role: 'Machine Learning Engineer',
    location: 'San Francisco, CA',
    startDate: '2021-06',
    endDate: '2022-12',
    duration: '1.5 years',
    description: 'Developed and deployed machine learning models for real-time recommendation systems and natural language processing applications.',
    achievements: [
      'Built recommendation engine serving 10M+ daily requests with 99.9% uptime',
      'Implemented federated learning system improving model privacy and performance',
      'Optimized neural network inference achieving 3x latency reduction',
      'Published research on low-rank adaptation techniques (LoRA) for efficient fine-tuning'
    ],
    technologies: [
      'Python', 'TensorFlow', 'scikit-learn', 'Apache Kafka', 'MongoDB', 
      'Elasticsearch', 'Docker', 'Jenkins', 'Node.js', 'React'
    ],
    impact: 'Increased user engagement by 25% through improved recommendation accuracy',
    companyUrl: 'https://datatech-solutions.com'
  },
  {
    id: 'research-assistant-2021',
    company: 'University Research Lab',
    role: 'Research Assistant',
    location: 'University Campus',
    startDate: '2020-09',
    endDate: '2021-05',
    duration: '8 months',
    description: 'Conducted research on neural network quantization and compression techniques under Prof. Jane Smith.',
    achievements: [
      'Co-authored 3 peer-reviewed papers on quantization noise regularization',
      'Developed experimental framework for evaluating compression-performance trade-offs',
      'Presented research findings at International Conference on Machine Learning (ICML)',
      'Mentored 2 undergraduate students in research methodologies'
    ],
    technologies: [
      'Python', 'PyTorch', 'NumPy', 'SciPy', 'Matplotlib', 'Jupyter', 
      'LaTeX', 'Git', 'Linux', 'SLURM'
    ],
    impact: 'Research cited 150+ times, influencing industry adoption of quantization techniques',
    companyUrl: 'https://university.edu/research-lab'
  },
  {
    id: 'fullstack-dev-2020',
    company: 'StartupTech Inc',
    role: 'Full Stack Developer',
    location: 'Austin, TX',
    startDate: '2019-01',
    endDate: '2020-08',
    duration: '1.5 years',
    description: 'Developed web applications and APIs for fintech startup, focusing on scalable architecture and user experience.',
    achievements: [
      'Built customer-facing web application serving 50K+ active users',
      'Designed RESTful APIs handling 1M+ requests per day',
      'Implemented real-time payment processing system with 99.99% reliability',
      'Reduced page load times by 60% through performance optimization'
    ],
    technologies: [
      'JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 
      'PostgreSQL', 'Redis', 'AWS', 'Docker', 'Jest'
    ],
    impact: 'Contributed to $5M Series A funding round through technical excellence',
    companyUrl: 'https://startuptech.com'
  }
]; 