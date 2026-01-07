import { NextRequest, NextResponse } from 'next/server'
import { pactoNegociacaoAPI, resolveNegociacaoAuth, ConfigsContratoDTO, PlanoModalidadeDTO } from '@/src/lib/api/pacto-negociacao'
import { rateLimiter } from '@/src/lib/utils/rate-limiter'

// POST /api/pacto-v3/simular/:slug/:plano
// Simula negociação de plano usando API de negociação
export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string; plano: string }> }) {
  const { slug, plano } = await params

  // Rate limiting: 20 requisições por 15 minutos
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
  if (!rateLimiter.check(clientIP, 20, 15 * 60 * 1000)) {
    const info = rateLimiter.getInfo(clientIP)
    return NextResponse.json(
      { 
        error: 'Rate limit exceeded. Too many simulation requests.', 
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

  try {
    const body = await req.json().catch(() => null)
    const rawConfig = (body?.config || body?.configsContrato || body?.negociacao || body) as ConfigsContratoDTO | null

    const { token, empresaId } = await resolveNegociacaoAuth(req.headers, slug)
    if (!token || !empresaId) {
      return NextResponse.json({ error: 'Token ou empresaId não configurados para negociação.' }, { status: 401 })
    }

    const config = await buildNegotiationConfig({
      token,
      empresaId,
      planoParam: plano,
      payload: body,
      config: rawConfig,
    })

    if (!config) {
      return NextResponse.json({ error: 'Payload inválido. Envie config com cliente e dados da negociação.' }, { status: 400 })
    }

    // Simular negociação
    const simulacao = await pactoNegociacaoAPI.simularNegociacao(token, empresaId, config)

    return NextResponse.json({ success: true, data: simulacao, source: 'negociacao' })
  } catch (error: any) {
    console.error('[POST /api/pacto-v3/simular Negociacao]', error)

    return NextResponse.json({ 
      error: 'Falha ao simular negociação',
      message: error.message,
      source: 'error'
    }, { status: 500 })
  }
}

async function buildNegotiationConfig({
  token,
  empresaId,
  planoParam,
  payload,
  config,
}: {
  token: string
  empresaId: string
  planoParam?: string
  payload: any
  config: ConfigsContratoDTO | null
}): Promise<ConfigsContratoDTO | null> {
  if (config?.cliente) {
    if (!config.plano && planoParam) {
      const planoNumero = parseInt(planoParam)
      if (!Number.isNaN(planoNumero)) {
        config.plano = planoNumero
      }
    }

    const empresaNumero = Number(empresaId)
    if (!config.empresa && !Number.isNaN(empresaNumero)) {
      config.empresa = empresaNumero
    }
    return config
  }

  const clienteNome = payload?.cliente?.nome || payload?.customer?.nome
  const planoId = payload?.planoId || payload?.plano || (planoParam ? parseInt(planoParam) : null)

  if (!clienteNome || !planoId) {
    return null
  }

  const clientes = await pactoNegociacaoAPI.buscarClientes(token, empresaId, clienteNome)
  const clienteEncontrado = clientes[0]
  if (!clienteEncontrado) {
    throw new Error('Cliente não encontrado para negociação')
  }

  const check = await pactoNegociacaoAPI.checkNegociacao(token, empresaId, clienteEncontrado.codigo, 0, true)
  const contratoBase = check?.codigoContratoRenovacao ?? 0
  const planoDetalhe = await pactoNegociacaoAPI.obterDadosPlano(token, empresaId, Number(planoId), contratoBase, 'ATIVO')
  if (!planoDetalhe) {
    throw new Error('Não foi possível obter dados do plano para negociação')
  }

  const duracao = planoDetalhe.duracoes?.[0]
  const condicao = duracao?.condicoes?.[0]
  const horario = planoDetalhe.horarios?.[0]

  if (!duracao || !condicao || !horario) {
    throw new Error('Dados insuficientes do plano para negociação')
  }

  const modalidades = (planoDetalhe.modalidades || []).map((modalidade): PlanoModalidadeDTO => {
    const configsVezes = (modalidade.configsVezes || []).map((configVezes) => ({
      ...configVezes,
      horario: configVezes.horario || horario.codigo,
    }))
    return {
      ...modalidade,
      configsVezes: configsVezes.length ? configsVezes : [{
        codigo: modalidade.codigo,
        vezes: modalidade.nrvezes || 1,
        duracao: duracao.codigo,
        horario: horario.codigo,
      }],
    }
  })

  const empresaNumero = Number(empresaId)
  const usuario = payload?.usuario || payload?.usuarioId

  return {
    contratoBase,
    plano: Number(planoId),
    empresa: Number.isNaN(empresaNumero) ? undefined : empresaNumero,
    usuario: usuario ? Number(usuario) : undefined,
    cliente: clienteEncontrado.codigo,
    duracao: duracao.codigo,
    condicao: condicao.codigo,
    horario: horario.codigo,
    dataLancamento: Date.now(),
    diaPrimeiraParcela: payload?.diaPrimeiraParcela || 10,
    tipoContrato: 'ESPONTANEO',
    inicio: Date.now(),
    gerarLink: true,
    modalidades,
    produtos: [],
  }
}
