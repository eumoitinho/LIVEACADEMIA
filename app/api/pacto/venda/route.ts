import { NextRequest, NextResponse } from 'next/server'
import { pactoV2API, formatVendaData, TokenizedVendaData } from '@/src/lib/api/pacto-v2'
import { getUnitBySlug } from '@/src/lib/api/supabase-repository'
import { rateLimiter } from '@/src/lib/utils/rate-limiter'

// POST /api/pacto/venda
// Body: { slug, planoId, paymentMethod, cliente: PactoCliente, cartaoToken?: string, captchaToken }
export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { slug, planoId, paymentMethod, cliente, cartaoToken, captchaToken } = body || {}

  if (!slug || !planoId || !paymentMethod || !cliente || !captchaToken) {
    return NextResponse.json({
      error: 'Campos obrigatórios: slug, planoId, paymentMethod, cliente, captchaToken'
    }, { status: 400 })
  }

  if (!['cartao','pix','boleto'].includes(paymentMethod)) {
    return NextResponse.json({ error: 'paymentMethod inválido' }, { status: 400 })
  }

  // Validar dados do cliente
  if (!cliente.nome || !cliente.cpf || !cliente.email) {
    return NextResponse.json({
      error: 'Nome, CPF e email do cliente são obrigatórios'
    }, { status: 400 })
  }

  // Se for cartão, validar token do cartão
  if (paymentMethod === 'cartao' && !cartaoToken) {
    return NextResponse.json({
      error: 'Token do cartão é obrigatório para pagamento com cartão'
    }, { status: 400 })
  }

  // Rate limiting muito restritivo para vendas: 3 requisições por 15 minutos
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
  if (!rateLimiter.check(clientIP, 3, 15 * 60 * 1000)) {
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
    console.log(`[Venda V2] Processando venda para unidade: ${slug}`)

    // Verificar anti-fraude
    const clientIP = pactoV2API.getClientIP(req)
    const isBlacklisted = await pactoV2API.verificarBlacklist(clientIP)

    if (isBlacklisted) {
      return NextResponse.json({
        success: false,
        error: 'Operação bloqueada por segurança'
      }, { status: 403 })
    }

    // Verificar reCAPTCHA
    const recaptchaValid = await pactoV2API.verifyRecaptcha(captchaToken)
    if (!recaptchaValid) {
      return NextResponse.json({
        success: false,
        error: 'Validação de segurança falhou'
      }, { status: 403 })
    }

    let venda

    // Processar pagamento baseado no método
    switch (paymentMethod) {
      case 'cartao':
        // Usar dados tokenizados para cartão
        const tokenizedVendaData: TokenizedVendaData = {
          unidade: 1, // codigo_unidade padrão
          plano: parseInt(planoId),
          cliente: {
            nome: cliente.nome,
            cpf: cliente.cpf,
            email: cliente.email,
            telefone: cliente.telefone,
            endereco: cliente.endereco || '',
            numero: cliente.numero || '',
            complemento: cliente.complemento || '',
            bairro: cliente.bairro || '',
            cidade: cliente.cidade || '',
            estado: cliente.estado || '',
            cep: cliente.cep || '',
            dataNascimento: cliente.dataNascimento || '01/01/1990',
            sexo: cliente.sexo || 'M',
            rg: cliente.rg || '',
          },
          cartaoToken: cartaoToken,
          termoDeUsoAceito: true,
          origemSistema: 9,
          dataUtilizacao: new Date().toLocaleDateString('pt-BR'),
          ipPublico: pactoV2API.getClientIP(req),
        }
        
        venda = await pactoV2API.processarPagamentoCartaoComToken(slug, captchaToken, tokenizedVendaData)
        break

           case 'pix':
             // Para PIX e Boleto, usar método tradicional
             const dadosVendaPIX = formatVendaData(
               slug, // Usar slug como codigo_rede
               cliente,
               null,
               1, // codigo_unidade padrão
               parseInt(planoId),
               paymentMethod,
               clientIP
             )
             venda = await pactoV2API.processarPagamentoPIX(slug, captchaToken, dadosVendaPIX)
             break

           case 'boleto':
             const dadosVendaBoleto = formatVendaData(
               slug, // Usar slug como codigo_rede
               cliente,
               null,
               1, // codigo_unidade padrão
               parseInt(planoId),
               paymentMethod,
               clientIP
             )
             venda = await pactoV2API.processarPagamentoBoleto(slug, captchaToken, dadosVendaBoleto)
             break

      default:
        return NextResponse.json({
          success: false,
          error: 'Método de pagamento inválido'
        }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      data: venda
    })
  } catch (error: any) {
    console.error('[POST /api/pacto/venda V2]', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Falha ao processar venda'
    }, { status: 500 })
  }
}
