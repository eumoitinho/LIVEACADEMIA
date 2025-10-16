import { NextRequest, NextResponse } from 'next/server'
import { pactoV3API } from '@/src/lib/api/pacto-v3'
import { rateLimiter } from '@/src/lib/utils/rate-limiter'

// POST /api/pacto-v3/venda/:slug
// Processa venda usando API V3 da Pacto
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
    const body = await req.json()
    const { slug: bodySlug, planoId, paymentMethod, cliente, captchaToken, cartaoToken } = body

    // Validar dados obrigatórios
    if (!planoId || !paymentMethod || !cliente || !captchaToken) {
      return NextResponse.json({ 
        error: 'Dados obrigatórios: planoId, paymentMethod, cliente, captchaToken' 
      }, { status: 400 })
    }

    // Se for cartão, validar token do cartão
    if (paymentMethod === 'cartao' && !cartaoToken) {
      return NextResponse.json({
        error: 'Token do cartão é obrigatório para pagamento com cartão'
      }, { status: 400 })
    }

    // Gerar token de venda
    console.log(`[Venda V3] Gerando token para ${slug}...`)
    const tokenResponse = await pactoV3API.gerarToken(slug, clientIP)
    const vendaToken = tokenResponse.retorno.token

    // Preparar dados da venda conforme formato da API V3
    const dadosVenda = {
      // Dados do cliente
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      cpf: cliente.cpf,
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
      
      // Dados da venda
      unidade: 1, // código da unidade sempre 1
      plano: parseInt(planoId),
      token: vendaToken,
      termoDeUsoAceito: true,
      origemSistema: 9,
      dataUtilizacao: new Date().toLocaleDateString('pt-BR'),
      ipPublico: clientIP,
      
      // Dados do cartão (se aplicável)
      ...(paymentMethod === 'cartao' && cartaoToken ? {
        numeroCartao: cartaoToken, // Token do cartão tokenizado
        nomeCartao: cliente.nome,
        validade: '', // Não necessário para token
        cvv: '', // Não necessário para token
        cpftitularcard: cliente.cpf,
        tipoParcelamentoCredito: 'CREDITO'
      } : {}),
      
      // Campos obrigatórios com valores padrão
      aulasMarcadas: [],
      clientesCadastradosComoDependentesPlanoCompartilhado: [],
      cnpj: '',
      cobrancaAntecipada: 0,
      cobrarParcelasEmAberto: false,
      codigoCategoriaPlano: 0,
      codigoColaborador: 0,
      codigoEvento: 0,
      codigoRegistroAcessoPagina: 0,
      convenioCobranca: 0,
      cpfMae: '',
      cpfPai: '',
      cpfResponsavelEmpresa: '',
      dataInicioContrato: new Date().toLocaleDateString('pt-BR'),
      dataInicioVendaProdutos: new Date().toLocaleDateString('pt-BR'),
      dataLancamento: new Date().toLocaleDateString('pt-BR'),
      diaVencimento: 10,
      enviarEmail: true,
      horariosSelecionados: [],
      locacaoAmbiente: false,
      locacoesSelecionadas: [],
      modalidadesSelecionadas: [],
      nomeResponsavelEmpresa: '',
      nowLocationIp: clientIP,
      nrVezesDividir: 1,
      nrVezesDividirMatricula: 1,
      observacaoCliente: '',
      origemCobranca: 1,
      pactoPayComunicacao: 1,
      pais: 1,
      parcelasSelecionadas: null,
      passaporte: '',
      permiteInformarDataUtilizacao: false,
      permitirRenovacao: false,
      produtos: [],
      responsavelLink: 0,
      responsavelMae: '',
      responsavelPai: '',
      respostaParqJson: '',
      todasEmAberto: false,
      usuarioResponsavel: 0,
      utm_data: '',
      vencimentoFatura: 10,
      vendaConsultor: false
    }

    console.log(`[Venda V3] Processando venda para ${slug}, plano ${planoId}, método ${paymentMethod}`)
    
    // Processar venda usando API V3
    const resultado = await pactoV3API.cadastrarVenda(slug, dadosVenda, vendaToken)

    return NextResponse.json({ 
      resultado, 
      source: 'api-v3',
      paymentMethod,
      planoId,
      slug
    })
  } catch (error: any) {
    console.error('[POST /api/pacto-v3/venda V3]', error)

    return NextResponse.json({ 
      error: 'Falha ao processar venda',
      message: error.message,
      source: 'error'
    }, { status: 500 })
  }
}
