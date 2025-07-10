import { Certification } from '@/types/content';

export const certifications: Certification[] = [
  {
    id: 'aws-solutions-architect',
    name: 'AWS Certified Solutions Architect - Professional',
    issuer: 'Amazon Web Services',
    issueDate: '2023-05',
    expiryDate: '2026-05',
    credentialId: 'AWS-PSA-12345678',
    verificationUrl: 'https://aws.amazon.com/verification',
    badgeUrl: '/badges/aws-solutions-architect-pro.png',
    description: 'Advanced certification demonstrating expertise in designing distributed systems and applications on AWS.',
    skills: ['Cloud Architecture', 'AWS Services', 'System Design', 'Security', 'Cost Optimization']
  },
  {
    id: 'tensorflow-developer',
    name: 'TensorFlow Developer Certificate',
    issuer: 'Google',
    issueDate: '2022-11',
    expiryDate: '2025-11',
    credentialId: 'TF-DEV-87654321',
    verificationUrl: 'https://www.credential.net/tensorflow-developer',
    badgeUrl: '/badges/tensorflow-developer.png',
    description: 'Professional certification validating skills in building and deploying machine learning models using TensorFlow.',
    skills: ['TensorFlow', 'Machine Learning', 'Neural Networks', 'Model Deployment', 'Computer Vision']
  },
  {
    id: 'kubernetes-administrator',
    name: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
    issueDate: '2023-02',
    expiryDate: '2026-02',
    credentialId: 'CKA-2023-98765',
    verificationUrl: 'https://www.cncf.io/certification/verify',
    badgeUrl: '/badges/kubernetes-administrator.png',
    description: 'Hands-on certification demonstrating skills in Kubernetes administration and cluster management.',
    skills: ['Kubernetes', 'Container Orchestration', 'DevOps', 'System Administration', 'Troubleshooting']
  },
  {
    id: 'pytorch-professional',
    name: 'PyTorch Certified Professional',
    issuer: 'PyTorch Foundation',
    issueDate: '2023-08',
    expiryDate: '2026-08',
    credentialId: 'PYTORCH-PRO-456789',
    verificationUrl: 'https://pytorch.org/certification/verify',
    badgeUrl: '/badges/pytorch-professional.png',
    description: 'Advanced certification in PyTorch framework for deep learning and neural network development.',
    skills: ['PyTorch', 'Deep Learning', 'Neural Networks', 'Research', 'Model Optimization']
  },
  {
    id: 'azure-ai-engineer',
    name: 'Azure AI Engineer Associate',
    issuer: 'Microsoft',
    issueDate: '2022-09',
    expiryDate: '2025-09',
    credentialId: 'AZURE-AI-789012',
    verificationUrl: 'https://docs.microsoft.com/en-us/learn/certifications/verify',
    badgeUrl: '/badges/azure-ai-engineer.png',
    description: 'Certification demonstrating ability to design and implement AI solutions using Microsoft Azure.',
    skills: ['Azure AI', 'Cognitive Services', 'Machine Learning', 'AI Solutions', 'Cloud Computing']
  },
  {
    id: 'scrum-master',
    name: 'Certified ScrumMaster (CSM)',
    issuer: 'Scrum Alliance',
    issueDate: '2021-03',
    expiryDate: '2025-03',
    credentialId: 'CSM-345678',
    verificationUrl: 'https://www.scrumalliance.org/community/profile/verify',
    badgeUrl: '/badges/scrum-master.png',
    description: 'Certification in Scrum framework and agile project management methodologies.',
    skills: ['Scrum', 'Agile Methodology', 'Project Management', 'Team Leadership', 'Process Improvement']
  },
  {
    id: 'docker-certified-associate',
    name: 'Docker Certified Associate',
    issuer: 'Docker Inc.',
    issueDate: '2022-01',
    expiryDate: '2025-01',
    credentialId: 'DCA-567890',
    verificationUrl: 'https://success.docker.com/certification',
    badgeUrl: '/badges/docker-certified-associate.png',
    description: 'Certification validating skills in containerization and Docker platform administration.',
    skills: ['Docker', 'Containerization', 'DevOps', 'Application Deployment', 'Microservices']
  },
  {
    id: 'github-actions-certified',
    name: 'GitHub Actions Certified',
    issuer: 'GitHub',
    issueDate: '2023-01',
    credentialId: 'GHA-234567',
    verificationUrl: 'https://github.com/certification/verify',
    badgeUrl: '/badges/github-actions.png',
    description: 'Certification in CI/CD automation using GitHub Actions and DevOps best practices.',
    skills: ['GitHub Actions', 'CI/CD', 'DevOps', 'Automation', 'Version Control']
  }
]; 