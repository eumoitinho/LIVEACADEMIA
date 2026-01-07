import { NextRequest, NextResponse } from 'next/server'
import { pactoNegociacaoAPI, resolveNegociacaoAuth, ConfigsContratoDTO, PlanoModalidadeDTO } from '@/src/lib/api/pacto-negociacao'
import { rateLimiter } from '@/src/lib/utils/rate-limiter'

// POST /api/pacto-v3/venda/:slug
// Finaliza negociação usando API de negociação
export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Rate limiting: 20 requisições por 10 minutos (menos restritivo)
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
  if (!rateLimiter.check(clientIP, 20, 10 * 60 * 1000)) {
    const info = rateLimiter.getInfo(clientIP)
    return NextResponse.json(
      { 
        error: 'Rate limit exceeded. Too many payment attempts.', 
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
      payload: body,
      config: rawConfig,
    })

    if (!config) {
      return NextResponse.json({
        error: 'Payload inválido. Envie config com cliente e dados da negociação.'
      }, { status: 400 })
    }

    if (config.gerarLink === undefined) {
      config.gerarLink = true
    }

    console.log(`[Negociacao] Finalizando negociação para ${slug}`)

    const resultado = await pactoNegociacaoAPI.finalizarNegociacao(token, empresaId, config)

    return NextResponse.json({
      success: true,
      data: resultado,
      source: 'negociacao'
    })
  } catch (error: any) {
    console.error('[POST /api/pacto-v3/venda Negociacao]', error)

    return NextResponse.json({ 
      error: 'Falha ao finalizar negociação',
      message: error.message,
      source: 'error'
    }, { status: 500 })
  }
}

async function buildNegotiationConfig({
  token,
  empresaId,
  payload,
  config,
}: {
  token: string
  empresaId: string
  payload: any
  config: ConfigsContratoDTO | null
}): Promise<ConfigsContratoDTO | null> {
  if (config?.cliente) {
    const empresaNumero = Number(empresaId)
    if (!config.empresa && !Number.isNaN(empresaNumero)) {
      config.empresa = empresaNumero
    }
    return config
  }

  const clienteNome = payload?.cliente?.nome || payload?.customer?.nome
  const planoId = payload?.planoId || payload?.plano

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
