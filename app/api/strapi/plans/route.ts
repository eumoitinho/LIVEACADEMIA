import { NextRequest, NextResponse } from 'next/server';
import { getPlans } from '@/lib/strapi';
import { isPreviewModeServer } from '@/lib/preview';

/**
 * API Route to fetch plans from Strapi
 */
export async function GET(request: NextRequest) {
  try {
    const preview = await isPreviewModeServer();
    const response = await getPlans(preview);
    
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error fetching Strapi plans:', error);
    return NextResponse.json(
      { 
        error: 'Error fetching plans data',
        message: error.message,
        data: [] 
      },
      { status: 500 }
    );
  }
}

