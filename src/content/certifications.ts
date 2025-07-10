import { Certification } from '@/types/content';

export const certifications: Certification[] = [
  {
    id: 'aws-ml-specialty',
    name: 'AWS Machine Learning Certification - Specialty',
    issuer: 'Amazon Web Services',
    issueDate: '2025-01',
    expiryDate: '2028-01',
    credentialId: 'AWS-MLS-2025',
    verificationUrl: 'https://aws.amazon.com/certification/certified-machine-learning-specialty/',
    badgeUrl: '/badges/aws-ml-specialty.png',
    description: 'Advanced certification in Machine Learning and Artificial Intelligence training and application with AWS technologies. Certified in data preparation and analysis/science with AWS technologies.',
    skills: ['Machine Learning', 'AWS', 'Data Science', 'AI', 'Data Preparation', 'Model Training', 'Model Deployment']
  },
  {
    id: 'aws-devops-professional',
    name: 'AWS Certified DevOps Engineer – Professional',
    issuer: 'Amazon Web Services Training and Certification',
    issueDate: '2025-01',
    expiryDate: '2028-01',
    credentialId: 'AWS-DOP-2025',
    verificationUrl: 'https://aws.amazon.com/certification/certified-devops-engineer-professional/',
    badgeUrl: '/badges/aws-devops-professional.png',
    description: 'Professional-level certification in AWS DevOps technologies and applications, demonstrating expertise in implementing and managing continuous delivery systems.',
    skills: ['AWS DevOps', 'CI/CD', 'Infrastructure as Code', 'Monitoring', 'Security', 'Automation']
  },
  {
    id: 'aws-developer-associate',
    name: 'AWS Certified Developer – Associate',
    issuer: 'Amazon Web Services Training and Certification',
    issueDate: '2023-01',
    expiryDate: '2026-01',
    credentialId: 'AWS-DVA-2023',
    verificationUrl: 'https://aws.amazon.com/certification/certified-developer-associate/',
    badgeUrl: '/badges/aws-developer-associate.png',
    description: 'Certification in development with all AWS technologies, including application of cloud and serverless technologies.',
    skills: ['AWS Development', 'Cloud Technologies', 'Serverless', 'API Development', 'Lambda', 'DynamoDB']
  },
  {
    id: 'aws-cloud-practitioner',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services Training and Certification',
    issueDate: '2022-01',
    expiryDate: '2025-01',
    credentialId: 'AWS-CCP-2022',
    verificationUrl: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
    badgeUrl: '/badges/aws-cloud-practitioner.png',
    description: 'Foundational certification in AWS cloud technologies and their application, demonstrating understanding of AWS Cloud concepts and services.',
    skills: ['AWS Cloud', 'Cloud Computing', 'AWS Services', 'Security', 'Pricing', 'Architecture']
  }
]; 