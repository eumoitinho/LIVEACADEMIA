import { NextRequest, NextResponse } from 'next/server';
import { draftMode } from 'next/headers';

/**
 * Exit Preview Mode API Route
 * 
 * This route disables preview mode and redirects to the homepage.
 */
export async function GET(request: NextRequest) {
  // Disable Next.js draft mode
  draftMode().disable();

  return NextResponse.redirect(new URL('/', request.url));
}

