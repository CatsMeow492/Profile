import { Project } from '@/types/content';

export const projects: Project[] = [
  {
    id: 'brandbeacon-demo',
    name: 'BrandBeacon Platform Demo',
    description: 'Interactive demo showcasing brand marketing and customer engagement platform capabilities',
    longDescription: `A comprehensive web application demo demonstrating modern brand marketing and customer engagement 
                      platform features. The demo showcases real-time analytics, campaign management, user targeting, 
                      and engagement tracking capabilities. Built with modern web technologies to provide an interactive 
                      experience for potential clients and stakeholders to explore platform functionality.`,
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'WebSocket', 'Node.js', 'Express'],
    liveUrl: 'https://www.brandbeacon.dev/',
    startDate: '2024-01',
    status: 'completed',
    featured: true,
    category: 'web-app',
    achievements: [
      'Interactive platform demonstration with real-time data visualization',
      'Responsive design optimized for multiple device types and screen sizes',
      'Live analytics dashboard showcasing campaign performance metrics',
      'User-friendly interface designed for marketing professionals and decision makers'
    ]
  },
  {
    id: 'llm-quantization-bounds',
    name: 'LLM Quantization Bounds Research',
    description: 'Theoretical analysis of quantization error bounds in LoRA fine-tuning with comprehensive experiments',
    longDescription: `A comprehensive research project investigating the theoretical foundations of quantization in Low-Rank Adaptation 
                      fine-tuning. This work establishes fundamental error bounds and derives optimal bit-width selection rules through 
                      rigorous mathematical analysis and systematic experimentation. The research provides practical guidelines for 
                      quantization strategies in large language model fine-tuning scenarios.`,
    technologies: ['Python', 'PyTorch', 'NumPy', 'SciPy', 'Matplotlib', 'Jupyter', 'LaTeX'],
    githubUrl: 'https://github.com/CatsMeow492/llm-quantization-bounds',
    startDate: '2024-01',
    status: 'completed',
    featured: true,
    category: 'research',
    achievements: [
      'Derived fundamental error bounds E[L(θ̂_q)] - L(θ*) ≤ Õ(√r/√N) + O(r·2^(-2b)σ_g²)',
      'Established optimal bit-width selection rule b* ≥ ½log₂(r) + ½log₂(N) + C',
      'Achieved strong theory-practice agreement (R>0.9) through systematic experiments',
      'Published comprehensive research paper with practical implementation guidelines'
    ]
  },
  {
    id: 'adaptive-lora-placement',
    name: 'Adaptive LoRA Placement',
    description: 'Novel algorithmic approach for optimal placement of LoRA adapters in large language models',
    longDescription: `An innovative research project developing adaptive strategies for LoRA module placement in transformer architectures. 
                      The work introduces gradient-based analysis and activation pattern recognition to determine optimal layer positions 
                      for parameter-efficient fine-tuning. This approach significantly reduces trainable parameters while maintaining 
                      or improving downstream task performance.`,
    technologies: ['Python', 'PyTorch', 'Transformers', 'NumPy', 'Weights & Biases', 'CUDA'],
    githubUrl: 'https://github.com/CatsMeow492/adaptive-lora-placement',
    startDate: '2024-02',
    status: 'in-progress',
    featured: true,
    category: 'research',
    achievements: [
      'Reduced trainable parameters by up to 40% compared to uniform LoRA placement',
      'Maintained comparable or better downstream task performance across benchmarks',
      'Developed novel gradient analysis algorithms for layer selection',
      'Created automated pipeline for optimal adapter placement'
    ]
  },
  {
    id: 'parameter-efficient-fine-tuning',
    name: 'Parameter-Efficient Fine-tuning Analysis',
    description: 'Comprehensive comparison and analysis of PEFT methods for large language models',
    longDescription: `A systematic research study comparing parameter-efficient fine-tuning methods including LoRA, AdaLoRA, QLoRA, 
                      and other PEFT techniques. The project provides theoretical insights into method selection criteria and offers 
                      practical guidelines based on computational constraints and performance requirements. Evaluation spans multiple 
                      model architectures from 125M to 175B parameters.`,
    technologies: ['Python', 'PyTorch', 'Transformers', 'PEFT', 'Accelerate', 'DeepSpeed', 'Jupyter'],
    githubUrl: 'https://github.com/CatsMeow492/parameter-efficient-fine-tuning-of-large-models',
    startDate: '2023-11',
    status: 'completed',
    featured: true,
    category: 'research',
    achievements: [
      'Comprehensive evaluation of PEFT methods across model sizes from 125M to 175B parameters',
      'Developed theoretical framework for method selection based on constraints',
      'Created practical guidelines for computational efficiency optimization',
      'Published detailed comparison with reproducible experimental setup'
    ]
  },
  {
    id: 'ml-optimization-dashboard',
    name: 'ML Optimization Dashboard',
    description: 'Real-time monitoring and optimization dashboard for machine learning model performance',
    longDescription: `Interactive web application for monitoring ML model performance, tracking quantization effects, 
                      and optimizing inference pipelines. Features real-time metrics, automated alerts, and 
                      performance visualization tools. Deployed across multiple production environments.`,
    technologies: ['TypeScript', 'React', 'D3.js', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
    githubUrl: 'https://github.com/CatsMeow492/ml-optimization-dashboard',
    liveUrl: 'https://ml-dashboard-demo.vercel.app',
    startDate: '2022-08',
    endDate: '2023-02',
    status: 'completed',
    featured: true,
    category: 'web-app',
    achievements: [
      'Reduced model debugging time by 70% for development teams',
      'Handles 1M+ inference requests per day monitoring',
      'Adopted by 3 major tech companies for production use',
      'Winner of Best Demo Award at MLSys 2023 conference'
    ]
  },
  {
    id: 'federated-learning-framework',
    name: 'Privacy-First Federated Learning',
    description: 'Federated learning framework with built-in differential privacy and quantization support',
    longDescription: `A production-ready federated learning framework that combines model quantization with 
                      differential privacy guarantees. Supports heterogeneous client environments and provides 
                      formal privacy analysis tools. Designed for healthcare and financial applications.`,
    technologies: ['Python', 'TensorFlow', 'gRPC', 'Kubernetes', 'Docker', 'Prometheus', 'Grafana'],
    githubUrl: 'https://github.com/CatsMeow492/federated-learning-privacy',
    startDate: '2021-10',
    endDate: '2022-06',
    status: 'completed',
    featured: true,
    category: 'library',
    achievements: [
      'Successfully deployed in 2 healthcare research studies',
      'Formal privacy audit passed by independent security firm',
      'Open-sourced with Apache 2.0 license, 300+ stars',
      'Featured in ICLR 2022 privacy workshop'
    ]
  },
  {
    id: 'portfolio-website',
    name: 'Professional Portfolio Website',
    description: 'Modern, responsive portfolio website built with Next.js 15 and TypeScript',
    longDescription: `A high-performance portfolio website showcasing professional experience, research publications, 
                      and technical projects. Features responsive design, dark mode, SEO optimization, and 
                      accessibility compliance. Built following modern web development best practices.`,
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React', 'Vercel', 'Framer Motion'],
    githubUrl: 'https://github.com/CatsMeow492/Profile',
    liveUrl: 'https://youngmohney.com',
    startDate: '2024-07',
    status: 'in-progress',
    featured: false,
    category: 'web-app',
    achievements: [
      'Lighthouse performance score: 95+',
      'WCAG 2.1 AA accessibility compliance',
      'Mobile-first responsive design',
      'Automated CI/CD with preview deployments'
    ]
  }
]; 