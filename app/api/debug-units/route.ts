import { NextResponse } from 'next/server'
import { listAllUnitsFromEnv, getAllUnitSlugsFromEnv } from '@/lib/utils/env-units'

/**
 * Diagnostic route to check all units and their environment variable mappings
 * Uses only .env - no database
 * This helps identify units with environment variables and their status
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const checkAll = searchParams.get('all') === 'true'

    // Get all units from environment variables
    const units = listAllUnitsFromEnv()
    
    // Count units by status
    const ok = units.filter(u => u.hasAnyKey)
    const errors: any[] = [] // No errors since we're listing from env vars
    
    // Get all env var names for reference
    const allEnvVarNames = Object.keys(process.env).filter(key => 
      key.startsWith('PACTO_API_KEY_') || 
      key.startsWith('PACTO_SECRET_KEY_') || 
      key.startsWith('NEXT_PUBLIC_UNIDADE_')
    )
    
    return NextResponse.json({
      summary: {
        total: units.length,
        ok: ok.length,
        errors: errors.length,
        note: 'All units listed are from environment variables. No database queries.',
      },
      units: checkAll ? units : units,
      allEnvVarNames: allEnvVarNames.sort(),
      allSlugs: getAllUnitSlugsFromEnv(),
    })
  } catch (error) {
    console.error('[DEBUG] Error in debug-units route:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}

