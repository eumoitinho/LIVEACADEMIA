import { NextResponse } from 'next/server'
import { getUnits } from '@/lib/sanity'

export async function GET() {
  try {
    const units = await getUnits()
    return NextResponse.json({ units })
  } catch (error) {
    console.error('Error fetching units from Sanity:', error)
    return NextResponse.json(
      { error: 'Failed to fetch units', units: [] },
      { status: 500 }
    )
  }
}
