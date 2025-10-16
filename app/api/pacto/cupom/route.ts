import { NextRequest, NextResponse } from 'next/server'
import { pactoV2API } from '@/src/lib/api/pacto-v2'

// POST /api/pacto/cupom
// Body: { codigo: string, dadosPlano?: any }
export async function POST(req: NextRequest) {
  try {
    const { codigo, dadosPlano } = await req.json()

    if (!codigo) {
      return NextResponse.json({ error: 'Código do cupom é obrigatório' }, { status: 400 })
    }

    // TODO: Buscar código da rede da unidade
    const codigoRede = dadosPlano?.codigoRede || 'default'
    const cupom = await pactoV2API.validarCupom(codigoRede, codigo, dadosPlano || {})

    return NextResponse.json({ 
      success: cupom.retorno?.status === 'aprovado', 
      data: cupom 
    })

  } catch (error: any) {
    console.error('[POST /api/pacto/cupom]', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Erro na validação do cupom' 
    }, { status: 500 })
  }
}
