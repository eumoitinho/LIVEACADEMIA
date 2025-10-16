import { NextRequest, NextResponse } from 'next/server'
import { pactoV3API } from '@/src/lib/api/pacto-v3'

// GET /api/pacto-v3/cliente/:slug
// Consulta cliente por múltiplos critérios usando API V3 da Pacto
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const cpf = searchParams.get('cpf')
    const cliente = searchParams.get('cliente')
    const empresa = searchParams.get('empresa')

    // Pelo menos um critério deve ser fornecido
    if (!email && !cpf && !cliente && !empresa) {
      return NextResponse.json({ 
        error: 'Pelo menos um critério deve ser fornecido: email, cpf, cliente ou empresa' 
      }, { status: 400 })
    }

    const criterios: any = {}
    if (email) criterios.email = email
    if (cpf) criterios.cpf = cpf
    if (cliente) criterios.cliente = parseInt(cliente)
    if (empresa) criterios.empresa = parseInt(empresa)

    console.log(`[Cliente V3] Consultando cliente em ${slug} com critérios:`, criterios)

    // Consultar cliente usando API V3
    const resultado = await pactoV3API.consultarCliente(slug, criterios)

    return NextResponse.json({ 
      resultado, 
      source: 'api-v3',
      criterios,
      slug
    })
  } catch (error: any) {
    console.error('[GET /api/pacto-v3/cliente V3]', error)

    return NextResponse.json({ 
      error: 'Falha ao consultar cliente',
      message: error.message,
      source: 'error'
    }, { status: 500 })
  }
}
