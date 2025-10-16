import { NextRequest, NextResponse } from 'next/server'
import { pactoV2API } from '@/src/lib/api/pacto-v2'
import { EncryptedCardData } from '@/src/lib/utils/card-tokenization'

/**
 * POST /api/pacto/tokenize-card
 * Tokeniza dados do cartão de crédito seguindo padrão PCI DSS
 * 
 * Body: {
 *   numero: string
 *   nome: string
 *   validade: string (MM/AA)
 *   cvv: string
 *   parcelas?: number
 * }
 * 
 * Response: {
 *   token: string
 *   expiresAt: number
 *   maskedCard: string
 *   brand: string
 * }
 */
export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { numero, nome, validade, cvv, parcelas } = body || {}

  // Validar campos obrigatórios
  if (!numero || !nome || !validade || !cvv) {
    return NextResponse.json({
      error: 'Campos obrigatórios: numero, nome, validade, cvv'
    }, { status: 400 })
  }

  try {
    const cardData: EncryptedCardData = {
      numero: numero.toString().trim(),
      nome: nome.toString().trim(),
      validade: validade.toString().trim(),
      cvv: cvv.toString().trim(),
      parcelas: parcelas ? parseInt(parcelas) : 1
    }

    // Tokenizar dados do cartão
    const token = pactoV2API.tokenizeCardData(cardData)
    
    // Obter informações adicionais do token
    const { detokenizeCard } = await import('@/src/lib/utils/card-tokenization')
    const tokenInfo = detokenizeCard(token)
    
    return NextResponse.json({
      success: true,
      token,
      expiresAt: Date.now() + (10 * 60 * 1000), // 10 minutos
      maskedCard: tokenInfo.numero.replace(/\d(?=\d{4})/g, '*'), // Mascarar número
      brand: tokenInfo.numero.startsWith('4') ? 'visa' : 
             tokenInfo.numero.startsWith('5') ? 'mastercard' : 'unknown'
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('[POST /api/pacto/tokenize-card]', errorMessage)
    
    return NextResponse.json({
      success: false,
      error: errorMessage
    }, { status: 400 })
  }
}
