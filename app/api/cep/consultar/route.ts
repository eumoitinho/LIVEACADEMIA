import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import type { CepData } from '@/lib/api/pacto-checkout-types'

// Schema for query validation
const querySchema = z.object({
  cep: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido')
})

// Cache for CEP data
const cepCache = new Map<string, { data: CepData; timestamp: number }>()
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const cepParam = searchParams.get('cep')

    if (!cepParam) {
      return NextResponse.json(
        { success: false, error: 'CEP é obrigatório' },
        { status: 400 }
      )
    }

    // Clean CEP (remove non-digits)
    const cepClean = cepParam.replace(/\D/g, '')

    // Validate CEP format
    if (cepClean.length !== 8) {
      return NextResponse.json(
        { success: false, error: 'CEP deve ter 8 dígitos' },
        { status: 400 }
      )
    }

    // Check cache
    const cached = cepCache.get(cepClean)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        data: cached.data,
        source: 'cache'
      })
    }

    // Try ViaCEP API first (free and reliable)
    try {
      const viaCepResponse = await fetch(
        `https://viacep.com.br/ws/${cepClean}/json/`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        }
      )

      if (viaCepResponse.ok) {
        const viaCepData = await viaCepResponse.json()

        if (!viaCepData.erro) {
          const cepData: CepData = {
            cep: viaCepData.cep,
            logradouro: viaCepData.logradouro || '',
            complemento: viaCepData.complemento || '',
            bairro: viaCepData.bairro || '',
            localidade: viaCepData.localidade || '',
            uf: viaCepData.uf || '',
            ibge: viaCepData.ibge,
            gia: viaCepData.gia,
            ddd: viaCepData.ddd,
            siafi: viaCepData.siafi
          }

          // Cache the result
          cepCache.set(cepClean, {
            data: cepData,
            timestamp: Date.now()
          })

          return NextResponse.json({
            success: true,
            data: cepData,
            source: 'viacep'
          })
        }
      }
    } catch (viaCepError) {
      console.warn('ViaCEP API failed:', viaCepError)
    }

    // Try alternative API (CEP Aberto or Brasil API)
    try {
      const brasilApiResponse = await fetch(
        `https://brasilapi.com.br/api/cep/v1/${cepClean}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        }
      )

      if (brasilApiResponse.ok) {
        const brasilApiData = await brasilApiResponse.json()

        const cepData: CepData = {
          cep: brasilApiData.cep,
          logradouro: brasilApiData.street || '',
          complemento: '',
          bairro: brasilApiData.neighborhood || '',
          localidade: brasilApiData.city || '',
          uf: brasilApiData.state || ''
        }

        // Cache the result
        cepCache.set(cepClean, {
          data: cepData,
          timestamp: Date.now()
        })

        return NextResponse.json({
          success: true,
          data: cepData,
          source: 'brasilapi'
        })
      }
    } catch (brasilApiError) {
      console.warn('Brasil API failed:', brasilApiError)
    }

    // If all APIs fail, return error
    return NextResponse.json(
      {
        success: false,
        error: 'CEP não encontrado',
        cep: cepClean
      },
      { status: 404 }
    )

  } catch (error) {
    console.error('Error fetching CEP:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'CEP inválido',
          details: error.errors
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao buscar CEP'
      },
      { status: 500 }
    )
  }
}