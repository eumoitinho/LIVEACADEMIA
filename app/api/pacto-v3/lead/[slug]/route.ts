import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import type { AddLeadPayload, AddLeadResponse } from '@/lib/api/pacto-checkout-types'

// Schema for params validation
const paramsSchema = z.object({
  slug: z.string().min(1)
})

// Schema for request body validation
const requestSchema = z.object({
  email: z.string().email(),
  nome: z.string().min(2),
  telefone: z.string().min(10),
  idade: z.number().optional().default(0),
  landing: z.string().optional().default(""),
  landing_url: z.string().optional().default(""),
  mensagem: z.string().optional().default("VendasOnline2.0")
})

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params
    const { slug } = paramsSchema.parse(resolvedParams)
    const body = await request.json()
    const payload = requestSchema.parse(body)

    // Get Pacto API URL from environment
    const pactoUrl = process.env.PACTO_API_URL || 'https://apigw.pactosolucoes.com.br'

    // Get unit code from environment variables
    const envSlug = slug.toUpperCase().replace(/-/g, '_')
    const envVarName = `NEXT_PUBLIC_UNIDADE_${envSlug}`
    const codigoUnidade = process.env[envVarName] || '1'

    // Use a fixed token for lead API
    const leadToken = '67ee553e1cc600bb02f3ac7ee6184d7'
    const empresa = '1'

    // Call Pacto Lead API
    const response = await fetch(
      `${pactoUrl}/lead/${leadToken}/${empresa}/v2/addLead`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-empresa': codigoUnidade,
          'x-chave-api': process.env.PACTO_SECRET_KEY || '',
        },
        body: JSON.stringify(payload)
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Lead API error:', response.status, errorText)

      return NextResponse.json(
        {
          success: false,
          error: `Erro ao adicionar lead: ${response.status}`
        },
        { status: response.status }
      )
    }

    const data: AddLeadResponse = await response.json()

    if (!data.success) {
      return NextResponse.json(
        {
          success: false,
          error: data.error || 'Erro ao adicionar lead'
        },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      leadId: data.data?.Lead,
      message: 'Lead adicionado com sucesso'
    })

  } catch (error) {
    console.error('Error adding lead:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Dados inválidos',
          details: error.errors
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Erro interno ao adicionar lead'
      },
      { status: 500 }
    )
  }
}