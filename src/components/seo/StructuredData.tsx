import { generatePersonStructuredData, generateResearchStructuredData } from '@/lib/seo';

interface StructuredDataProps {
  type?: 'person' | 'research' | 'organization';
  data?: Record<string, unknown>;
}

export const StructuredData = ({ type = 'person', data }: StructuredDataProps) => {
  const getStructuredData = () => {
    switch (type) {
      case 'person':
        return generatePersonStructuredData();
      case 'research':
        return generateResearchStructuredData();
      case 'organization':
        return data || {};
      default:
        return generatePersonStructuredData();
    }
  };

  const structuredData = getStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}; 