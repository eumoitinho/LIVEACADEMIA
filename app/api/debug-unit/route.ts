import { NextResponse } from 'next/server'
import { getUnitFromEnv } from '@/lib/utils/env-units'

/**
 * Debug route to check a specific unit's environment variables
 * Uses only .env - no database
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug') || 'centro'

    console.log(`[DEBUG] Checking environment variables for slug: ${slug}`)

    const unit = getUnitFromEnv(slug)

    if (!unit.hasAnyKey) {
      return NextResponse.json({
        error: 'No environment variables found for this unit',
        slug,
        hasAnyKey: false,
        unit,
      })
    }

    return NextResponse.json({
      slug,
      ...unit,
    })
  } catch (error) {
    console.error('[DEBUG] Error in debug-unit route:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}
