import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * Revalidation API Route
 * 
 * This route allows Strapi to trigger revalidation of Next.js pages
 * when content is updated. This enables live editing.
 * 
 * Usage:
 * POST /api/revalidate?secret=YOUR_SECRET&path=/homepage
 */
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const path = searchParams.get('path') || '/';

  // Verify the secret token
  const validSecret = process.env.STRAPI_REVALIDATE_SECRET || 'your-revalidate-secret-change-this';

  if (secret !== validSecret) {
    return NextResponse.json(
      { message: 'Invalid secret token' },
      { status: 401 }
    );
  }

  try {
    // Revalidate the specified path
    revalidatePath(path);
    
    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error revalidating', error: error.message },
      { status: 500 }
    );
  }
}

