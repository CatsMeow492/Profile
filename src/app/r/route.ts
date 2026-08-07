import { NextRequest, NextResponse } from 'next/server';

// Tracked redirect for resume/portfolio links shared in job applications.
// Usage: https://youngmohney.com/r?c=<company>[&to=/path]
// Server-side capture fires even if the recruiter's browser blocks client JS.

const POSTHOG_HOST = process.env.POSTHOG_HOST || 'https://us.i.posthog.com';
const POSTHOG_KEY = process.env.POSTHOG_KEY || process.env.NEXT_PUBLIC_POSTHOG_KEY || '';
const SITE = 'https://youngmohney.com';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const company = (searchParams.get('c') || 'unknown').slice(0, 80);
  const toRaw = searchParams.get('to') || '/';
  const path = toRaw.startsWith('/') ? toRaw : `/${toRaw}`;

  if (POSTHOG_KEY) {
    try {
      await fetch(`${POSTHOG_HOST}/capture/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: POSTHOG_KEY,
          event: 'resume_link_clicked',
          distinct_id: `company:${company}`,
          properties: {
            company,
            referrer: req.headers.get('referer') || '',
            user_agent: req.headers.get('user-agent') || '',
            source_url: req.url,
          },
        }),
      });
    } catch {
      // non-blocking: never let telemetry break the redirect
    }
  }

  const dest = new URL(SITE + path);
  dest.searchParams.set('utm_source', 'resume');
  dest.searchParams.set('utm_medium', 'application');
  dest.searchParams.set('utm_campaign', company);
  return NextResponse.redirect(dest.toString(), 302);
}
