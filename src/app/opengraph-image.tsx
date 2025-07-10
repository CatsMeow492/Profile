import { ImageResponse } from 'next/og';
import { seoConfig } from '@/lib/seo';

export const runtime = 'edge';

export const alt = seoConfig.siteName;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center',
            padding: '40px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              marginBottom: 24,
              background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Taylor Mohney
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#e5e7eb',
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Research Scientist & Software Engineer
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#9ca3af',
              maxWidth: 800,
              textAlign: 'center',
              lineHeight: 1.3,
            }}
          >
            Machine Learning • Neural Networks • Enterprise Software
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            fontSize: 18,
            color: '#6b7280',
          }}
        >
          taylormohney.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 