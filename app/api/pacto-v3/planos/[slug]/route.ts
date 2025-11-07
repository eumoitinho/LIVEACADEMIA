import { NextRequest, NextResponse } from 'next/server'
import { rateLimiter } from '@/src/lib/utils/rate-limiter'
import { cacheManager, cacheKeys } from '@/src/lib/utils/cache-manager'
import { getSecretKeyEnvName, getSecretKeyDevEnvName, getPublicUnitCodeEnvName, getEnvKey } from '@/lib/utils/env-keys'
import axios from 'axios'

// GET /api/pacto-v3/planos/:slug
// Busca planos usando API V3 da Pacto com cache e rate limiting
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Rate limiting: 50 requisições por 15 minutos
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
  if (!rateLimiter.check(clientIP, 50, 15 * 60 * 1000)) {
    const info = rateLimiter.getInfo(clientIP)
    return NextResponse.json(
      { 
        error: 'Rate limit exceeded. Too many requests for planos.', 
        rateLimitInfo: {
          limit: info.limit,
          remaining: info.remaining,
          resetTime: info.resetTime
        }
      }, 
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': info.limit.toString(),
          'X-RateLimit-Remaining': info.remaining.toString(),
          'X-RateLimit-Reset': Math.ceil(info.resetTime / 1000).toString()
        }
      }
    )
  }

  // Verificar cache primeiro (30 minutos)
  const cacheKey = cacheKeys.planos(slug)
  const cached = cacheManager.get(cacheKey)
  if (cached) {
    console.log(`[Cache] Planos encontrados no cache para ${slug}`)
    return NextResponse.json({ planos: cached, fallback: false, source: 'cache' })
  }

  try {
    // Buscar chave secreta da unidade usando helper functions (que respeitam o mapeamento)
    const chaveSecret = getEnvKey(slug, 'secret') || getEnvKey(slug, 'secret-dev')
    
    if (!chaveSecret) {
      console.error(`[PactoV3] Chave secreta não encontrada para unidade ${slug}`)
      console.error(`[PactoV3] Procurando por: ${getSecretKeyEnvName(slug)} ou ${getSecretKeyDevEnvName(slug)}`)
      throw new Error(`Chave da unidade ${slug} não configurada`)
    }

    // Buscar empresa ID da unidade usando helper function
    const empresaId = getEnvKey(slug, 'public-code')
    
    if (!empresaId) {
      console.error(`[PactoV3] Código da empresa não encontrado para unidade ${slug}`)
      console.error(`[PactoV3] Procurando por: ${getPublicUnitCodeEnvName(slug)}`)
      throw new Error(`Código da empresa ${slug} não configurado`)
    }


    
    const response = await axios.get('https://apigw.pactosolucoes.com.br/planos', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${chaveSecret}`, // Header de autenticação correto
        'empresaId': '1' // Header obrigatório conforme documentação
      },
      params: {
        filters:{"site":true, "size":100, "sort":"codigo,asc"}, 
      },
      timeout: 30000
    })

    const content = response.data.content || []
    
    // Mapear os dados da API V3 para o formato esperado
    const planos = content.map((plano: any) => ({
      codigo: plano.codigo,
      nome: plano.descricao || plano.nome,
      mensalidade: plano.produtoContrato?.valorFinal || plano.planoRecorrencia?.valorMensal || 0,
      adesao: plano.planoRecorrencia?.taxaAdesao || 0,
      fidelidade: plano.planoRecorrencia?.duracaoPlano || 0,
      regimeRecorrencia: plano.regimeRecorrencia || false,
      modalidades: plano.modalidades?.map((m: any) => m.modalidade?.nome) || []
    }))

    // Armazenar no cache por 30 minutos
    cacheManager.set(cacheKey, planos, 30 * 60 * 1000)
    console.log(`[Cache] ${planos.length} planos armazenados no cache para ${slug}`)

    return NextResponse.json({ 
      planos, 
      fallback: false, 
      source: 'api',
      unidade: slug,
      total: planos.length
    })
  } catch (error: any) {
    console.error('[GET /api/pacto-v3/planos V3]', error)

    // Fallback estático em caso de erro
    const fallbackPlanos = [
      { codigo: 1, nome: "Plano Básico", mensalidade: 99.90, adesao: 0, fidelidade: 12 },
      { codigo: 2, nome: "Plano Premium", mensalidade: 149.90, adesao: 0, fidelidade: 12 }
    ]

    return NextResponse.json({ 
      planos: fallbackPlanos, 
      fallback: true, 
      source: 'static', 
      error: error.message 
    })
  }
}
