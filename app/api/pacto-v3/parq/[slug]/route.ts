import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import type { ParqResponse, ParqAnswer } from '@/lib/api/pacto-checkout-types'

// Schema for params validation
const paramsSchema = z.object({
  slug: z.string().min(1)
})

// Schema for POST request body
const postSchema = z.object({
  leadId: z.string().min(1),
  respostas: z.array(z.object({
    perguntaCodigo: z.number(),
    respostaCodigo: z.number()
  })),
  aceitouTermos: z.boolean().optional().default(true)
})

// GET: Fetch PAR-Q questionnaire
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params
    const { slug } = paramsSchema.parse(resolvedParams)

    // Get Pacto API URL from environment
    const pactoUrl = process.env.PACTO_API_URL || 'https://apigw.pactosolucoes.com.br'
    
    // Get unit code from environment variables
    const envSlug = slug.toUpperCase().replace(/-/g, '_')
    const envVarName = `NEXT_PUBLIC_UNIDADE_${envSlug}`
    const codigoUnidade = process.env[envVarName] || '1'
    
    const empresa = '1'
    const token = '67ee553e1cc600bb02f3ac7ee6184d7'

    // Fetch PAR-Q questionnaire
    const response = await fetch(
      `${pactoUrl}/avaliacao/${token}/parq?empresa=${empresa}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-empresa': codigoUnidade,
          'x-chave-api': process.env.PACTO_SECRET_KEY || '',
        },
      }
    )

    if (!response.ok) {
      // Return a default PAR-Q questionnaire on error
      const defaultParq: ParqResponse = {
        parq: {
          codigo: 445,
          tipoQuestionario: "parq",
          descricao: "PAR-Q - Questionário de Prontidão para Atividade Física",
          perguntas: [
            {
              codigo: 3084,
              tipoPergunta: "SIM_NAO",
              descricao: "Algum médico já lhe disse que você possui um problema cardíaco e recomendou atividades físicas apenas sob supervisão médica?",
              respostas: [
                { codigo: 1, descricao: "Sim" },
                { codigo: 2, descricao: "Não" }
              ]
            },
            {
              codigo: 3085,
              tipoPergunta: "SIM_NAO",
              descricao: "Você sente dor no peito quando pratica atividade física?",
              respostas: [
                { codigo: 1, descricao: "Sim" },
                { codigo: 2, descricao: "Não" }
              ]
            },
            {
              codigo: 3086,
              tipoPergunta: "SIM_NAO",
              descricao: "No último mês, você sentiu dor no peito quando não estava praticando atividade física?",
              respostas: [
                { codigo: 1, descricao: "Sim" },
                { codigo: 2, descricao: "Não" }
              ]
            },
            {
              codigo: 3087,
              tipoPergunta: "SIM_NAO",
              descricao: "Você perdeu o equilíbrio por causa de tontura ou alguma vez perdeu a consciência?",
              respostas: [
                { codigo: 1, descricao: "Sim" },
                { codigo: 2, descricao: "Não" }
              ]
            },
            {
              codigo: 3088,
              tipoPergunta: "SIM_NAO",
              descricao: "Você tem algum problema ósseo ou articular que poderia ser agravado por uma mudança na sua atividade física?",
              respostas: [
                { codigo: 1, descricao: "Sim" },
                { codigo: 2, descricao: "Não" }
              ]
            },
            {
              codigo: 3089,
              tipoPergunta: "SIM_NAO",
              descricao: "Seu médico está prescrevendo atualmente medicamentos para sua pressão arterial ou condição cardíaca?",
              respostas: [
                { codigo: 1, descricao: "Sim" },
                { codigo: 2, descricao: "Não" }
              ]
            },
            {
              codigo: 3090,
              tipoPergunta: "SIM_NAO",
              descricao: "Você conhece alguma outra razão pela qual não deveria fazer atividade física?",
              respostas: [
                { codigo: 1, descricao: "Sim" },
                { codigo: 2, descricao: "Não" }
              ]
            }
          ]
        },
        apresentarLeiParq: true,
        siglaEstadoLeiParq: "AM"
      }

      return NextResponse.json({
        success: true,
        data: defaultParq,
        source: 'default'
      })
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      data: data,
      source: 'api'
    })

  } catch (error) {
    console.error('Error fetching PAR-Q:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao buscar questionário PAR-Q'
      },
      { status: 500 }
    )
  }
}

// POST: Submit PAR-Q answers
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params
    const { slug } = paramsSchema.parse(resolvedParams)
    const body = await request.json()
    const payload = postSchema.parse(body)

    // Get Pacto API URL from environment
    const pactoUrl = process.env.PACTO_API_URL || 'https://apigw.pactosolucoes.com.br'
    
    // Get unit code from environment variables
    const envSlug = slug.toUpperCase().replace(/-/g, '_')
    const envVarName = `NEXT_PUBLIC_UNIDADE_${envSlug}`
    const codigoUnidade = process.env[envVarName] || '1'
    
    const empresa = '1'
    const token = '67ee553e1cc600bb02f3ac7ee6184d7'

    // Submit PAR-Q answers
    const response = await fetch(
      `${pactoUrl}/avaliacao/${token}/parq/submit?empresa=${empresa}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-empresa': codigoUnidade,
          'x-chave-api': process.env.PACTO_SECRET_KEY || '',
        },
        body: JSON.stringify({
          leadId: payload.leadId,
          respostas: payload.respostas,
          aceitouTermos: payload.aceitouTermos
        })
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('PAR-Q submit error:', response.status, errorText)

      // Even if API fails, allow user to continue
      return NextResponse.json({
        success: true,
        warning: 'PAR-Q não pôde ser enviado mas você pode continuar',
        parqSubmitted: false
      })
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      data: data,
      parqSubmitted: true,
      message: 'Questionário PAR-Q enviado com sucesso'
    })

  } catch (error) {
    console.error('Error submitting PAR-Q:', error)

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

    // Allow continuation even on error
    return NextResponse.json({
      success: true,
      warning: 'Erro ao enviar PAR-Q mas você pode continuar',
      parqSubmitted: false
    })
  }
}