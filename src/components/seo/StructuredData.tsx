import { generatePersonStructuredData } from '@/lib/seo';

// The 'research' variant was dropped 2026-08-04. It emitted a schema.org ScholarlyArticle whose
// publisher was the literal string "Research Publication Venue", which is exactly the kind of
// unbackable claim this site is no longer making. Nothing rendered it (page.tsx only ever asked
// for 'person'), so it was shipping dead code with a liability attached.
interface StructuredDataProps {
  type?: 'person' | 'organization';
  data?: Record<string, unknown>;
}

export const StructuredData = ({ type = 'person', data }: StructuredDataProps) => {
  const structuredData = type === 'organization' ? data || {} : generatePersonStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
};
