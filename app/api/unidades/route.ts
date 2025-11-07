import { NextResponse } from 'next/server'
import { getUnits } from '@/src/lib/sanity'

export async function GET() {
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

    return NextResponse.json({ units: formattedUnits })
  } catch (error) {
    console.error('Error fetching units from Sanity:', error)
    return NextResponse.json(
      { error: 'Failed to fetch units', units: [] },
      { status: 500 }
    )
  }
}
