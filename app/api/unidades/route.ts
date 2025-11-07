import { NextRequest, NextResponse } from 'next/server'
import { getUnits } from '@/src/lib/sanity'
import { addCorsHeaders, handleOptionsRequest } from '@/src/lib/utils/cors'

export async function GET(request: NextRequest) {
  // Lidar com preflight OPTIONS
  if (request.method === 'OPTIONS') {
    const origin = request.headers.get('origin')
    return handleOptionsRequest(origin)
  }

  try {
    const units = await getUnits()
    
    const formattedUnits = units.map((unit: any) => ({
      id: unit._id,
      slug: unit.slug,
      nome: unit.name,
      endereco: unit.address,
      imagem: unit.photo?.asset?.url || unit.backgroundImage?.asset?.url || unit.images?.[0]?.asset?.url || '/images/fachada.jpg',
      latitude: unit.latitude,
      longitude: unit.longitude,
      cidade: unit.city || 'Manaus',
      estado: unit.state || 'AM',
    }))

    const origin = request.headers.get('origin')
    const response = NextResponse.json({ units: formattedUnits })
    return addCorsHeaders(response, origin)
  } catch (error) {
    console.error('Error fetching units from Sanity:', error)
    const origin = request.headers.get('origin')
    const response = NextResponse.json(
      { error: 'Failed to fetch units', units: [] },
      { status: 500 }
    )
    return addCorsHeaders(response, origin)
  }
}
