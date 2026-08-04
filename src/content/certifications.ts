import { Certification } from '@/types/content';

// credentialId / badgeUrl / verificationUrl removed 2026-08-04: the IDs were placeholders, the badge
// images were never added to public/, and the "Verify Credential" link went to an AWS marketing page
// rather than a credential lookup. Add real Credly badge URLs here if you want verification restored.
export const certifications: Certification[] = [
  {
    id: 'aws-ml-specialty',
    name: 'AWS Machine Learning Certification - Specialty',
    issuer: 'Amazon Web Services',
    issueDate: '2025-01',
    expiryDate: '2028-01',
    description: 'Advanced certification in Machine Learning and Artificial Intelligence training and application with AWS technologies. Certified in data preparation and analysis/science with AWS technologies.',
    skills: ['Machine Learning', 'AWS', 'Data Science', 'AI', 'Data Preparation', 'Model Training', 'Model Deployment']
  },
  {
    id: 'aws-devops-professional',
    name: 'AWS Certified DevOps Engineer – Professional',
    issuer: 'Amazon Web Services Training and Certification',
    issueDate: '2025-01',
    expiryDate: '2028-01',
    description: 'Professional-level certification in AWS DevOps technologies and applications, demonstrating expertise in implementing and managing continuous delivery systems.',
    skills: ['AWS DevOps', 'CI/CD', 'Infrastructure as Code', 'Monitoring', 'Security', 'Automation']
  },
  {
    id: 'aws-developer-associate',
    name: 'AWS Certified Developer – Associate',
    issuer: 'Amazon Web Services Training and Certification',
    issueDate: '2023-01',
    expiryDate: '2026-01',
    description: 'Certification in development with all AWS technologies, including application of cloud and serverless technologies.',
    skills: ['AWS Development', 'Cloud Technologies', 'Serverless', 'API Development', 'Lambda', 'DynamoDB']
  },
  {
    id: 'aws-cloud-practitioner',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services Training and Certification',
    issueDate: '2022-01',
    expiryDate: '2025-01',
    description: 'Foundational certification in AWS cloud technologies and their application, demonstrating understanding of AWS Cloud concepts and services.',
    skills: ['AWS Cloud', 'Cloud Computing', 'AWS Services', 'Security', 'Pricing', 'Architecture']
  }
]; 