import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import type { CepData } from '@/lib/api/pacto-checkout-types'

// Cache for CEP data
const cepCache = new Map<string, { data: CepData; timestamp: number }>()
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours
const FETCH_TIMEOUT = 3000 // 3 segundos de timeout

// Helper para fetch com timeout
async function fetchWithTimeout(url: string, timeout: number): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal
    })
    return response
  } finally {
    clearTimeout(timeoutId)
  }
}

// Buscar no ViaCEP
async function fetchViaCep(cep: string): Promise<CepData | null> {
  try {
    const response = await fetchWithTimeout(
      `https://viacep.com.br/ws/${cep}/json/`,
      FETCH_TIMEOUT
    )

    if (response.ok) {
      const data = await response.json()
      if (!data.erro) {
        return {
          cep: data.cep,
          logradouro: data.logradouro || '',
          complemento: data.complemento || '',
          bairro: data.bairro || '',
          localidade: data.localidade || '',
          uf: data.uf || '',
          ibge: data.ibge,
          gia: data.gia,
          ddd: data.ddd,
          siafi: data.siafi
        }
      }
    }
  } catch (error) {
    console.warn('ViaCEP failed:', error)
  }
  return null
}

// Buscar no BrasilAPI
async function fetchBrasilApi(cep: string): Promise<CepData | null> {
  try {
    const response = await fetchWithTimeout(
      `https://brasilapi.com.br/api/cep/v1/${cep}`,
      FETCH_TIMEOUT
    )

    if (response.ok) {
      const data = await response.json()
      return {
        cep: data.cep,
        logradouro: data.street || '',
        complemento: '',
        bairro: data.neighborhood || '',
        localidade: data.city || '',
        uf: data.state || ''
      }
    }
  } catch (error) {
    console.warn('BrasilAPI failed:', error)
  }
  return null
}

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

    // Check cache first (instant response)
    const cached = cepCache.get(cepClean)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        data: cached.data,
        source: 'cache'
      })
    }

    // Buscar em paralelo nas duas APIs - retorna a primeira que responder
    const results = await Promise.allSettled([
      fetchViaCep(cepClean),
      fetchBrasilApi(cepClean)
    ])

    // Encontrar o primeiro resultado válido
    let cepData: CepData | null = null
    let source = ''

    for (let i = 0; i < results.length; i++) {
      const result = results[i]
      if (result.status === 'fulfilled' && result.value) {
        cepData = result.value
        source = i === 0 ? 'viacep' : 'brasilapi'
        break
      }
    }

    if (cepData) {
      // Cache the result
      cepCache.set(cepClean, {
        data: cepData,
        timestamp: Date.now()
      })

      return NextResponse.json({
        success: true,
        data: cepData,
        source
      })
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