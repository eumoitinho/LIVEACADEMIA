import { NextRequest, NextResponse } from 'next/server'

// GET /api/pacto-v3/unidades
// Endpoint legado para unidades (depreciado na migração para negociação)
export async function GET(_req: NextRequest) {
  return NextResponse.json(
    {
      error: 'Endpoint deprecated. Use the negotiation flow endpoints for client and plan lookup.',
      deprecated: true,
    },
    { status: 410 }
  )
}
