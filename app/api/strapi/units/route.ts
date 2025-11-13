import { NextRequest, NextResponse } from 'next/server';
import { getUnits } from '@/lib/strapi';
import { isPreviewModeServer } from '@/lib/preview';

/**
 * API Route to fetch units from Strapi
 */
export async function GET(request: NextRequest) {
  try {
    const preview = await isPreviewModeServer();
    const response = await getUnits(preview);
    
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error fetching Strapi units:', error);
    return NextResponse.json(
      { 
        error: 'Error fetching units data',
        message: error.message,
        data: [] 
      },
      { status: 500 }
    );
  }
}

