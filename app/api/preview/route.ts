import { NextRequest, NextResponse } from 'next/server';
import { draftMode } from 'next/headers';

/**
 * Preview Mode API Route
 * 
 * This route enables preview mode for Strapi drafts.
 * Call this route with a secret token to activate preview mode.
 * 
 * Usage:
 * GET /api/preview?secret=YOUR_SECRET&slug=homepage
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug') || 'homepage';
  const contentType = searchParams.get('contentType') || 'homepage';

  // Verify the secret token
  const validSecret = process.env.STRAPI_PREVIEW_SECRET || 'your-preview-secret-change-this';
  
  if (secret !== validSecret) {
    return NextResponse.json(
      { message: 'Invalid secret token' },
      { status: 401 }
    );
  }

  // Enable Next.js draft mode
  draftMode().enable();

  // Redirect to the page
  const redirectUrl = slug === 'homepage' ? '/' : `/${slug}`;
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}

