import { NextRequest, NextResponse } from 'next/server';
import { getHomepage } from '@/lib/strapi';
import { isPreviewModeServer } from '@/lib/preview';

/**
 * API Route to fetch homepage data from Strapi
 */
export async function GET(request: NextRequest) {
  try {
    const preview = await checkPreview();
    const response = await getHomepage(preview);
    
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error fetching Strapi homepage:', error);
    return NextResponse.json(
      { 
        error: 'Error fetching homepage data',
        message: error.message,
        data: null 
      },
      { status: 500 }
    );
  }
}

