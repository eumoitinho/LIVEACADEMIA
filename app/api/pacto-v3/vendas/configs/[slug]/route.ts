import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import type { VendasConfig } from '@/lib/api/pacto-checkout-types'
import { getPublicUnitCodeEnvName, getEnvKey } from '@/lib/utils/env-keys'

// Schema for params validation
const paramsSchema = z.object({
  slug: z.string().min(1)
})

// Cache for configs
const configCache = new Map<string, { data: VendasConfig; timestamp: number }>()
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params
    const { slug } = paramsSchema.parse(resolvedParams)

    // Check cache
    const cached = configCache.get(slug)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        data: cached.data,
        source: 'cache'
      })
    }

    // Get Pacto API URL from environment
    const pactoUrl = process.env.PACTO_API_URL || 'https://apigw.pactosolucoes.com.br'

    // Get unit data from environment variables
    // Format: NEXT_PUBLIC_UNIDADE_TORRES={codigo_unidade}
    const envVarName = getPublicUnitCodeEnvName(slug)
    const codigoUnidade = getEnvKey(slug, 'public-code') || '1'

    // Get the secret key from environment
    const secretKey = process.env.PACTO_SECRET_KEY || ''

    console.log(`[vendas/configs] Using unit code from env: ${envVarName}=${codigoUnidade}`)

    // Fetch config from Pacto API with unit-specific headers
    const response = await fetch(
      `${pactoUrl}/psec/vendas/configs`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-empresa': codigoUnidade,
          'x-chave-api': secretKey,
          'x-chave-publica': '' // Not needed for this endpoint
        }
      }
    )

    if (!response.ok) {
      // Return default config on error
      const defaultConfig: VendasConfig = {
        habilitarAgendamentoAulaExperimentalLinkVisitante: false,
        configSescHabilitada: false,
        googleTagIdHotsite: "",
        cor: "#ffcc00",
        usarFormaPagamentoPlanoProduto: false,
        apresentarValorTotalDoPlanoNaTelaDeSelecaoDoPlano: false,
        urlLinkGooglePlay: "",
        apresentarCartao: true,
        apresentarCartaoVenda: true,
        urlLinkAppleStore: "",
        apresentarTermoAceiteLinkPag: false,
        apresentarCPFLinkPag: false,
        apresentarCartaoRegua: false,
        apresentarPix: true,
        analyticsId: "",
        cobrarProdutoJuntoAdesaoMatricula: "false",
        exibirTipoDocumentoTelaVendasOnline: false,
        temaescuro: false,
        primeiraCobrancaPixEGuardarCartao: false,
        tipoConvenio: "",
        detalharParcelaTelaCheckout: "false",
        apresentarBoletoRegua: false,
        selecionarUnidadeListaPlano: false,
        modalidadesIniciarSelecionadasContratoTurma: false,
        apresentarPixRegua: false,
        ativarLinksGooglePlayEAppleStore: false,
        permitirMudarTipoParcelamento: false,
        apresentarPixVenda: false,
        temaclaro: true,
        apresentarDtFaturaLinkPag: false,
        permiteVendaProdutoAlunoOutraUnidade: false,
        apresentarvaloranuidade: "false",
        apresentarBoletoVenda: false,
        permiteRenovacaoDeContrato: false,
        exibeDataUtilizacao: false,
        apresentarBoleto: false,
        camposAdicionais: [
          "TELEFONE",
          "CEP",
          "ENDERECO",
          "NUMERO",
          "BAIRRO",
          "COMPLEMENTO",
          "SEXO",
          "DT_NASCIMENTO"
        ],
        camposAdicionaisProduto: [],
        permitecontratosconcomintante: "false",
        camposAdicionaisProdutoFlow: [""],
        cobrarPrimeiraParcelaCompra: "true",
        permiteProsseguirMesmoCpfOuEmailCadastroVisitante: true,
        tokenApiConversao: "",
        verificarCpfAlunoAntesEscolha: false,
        camposAdicionaisProdutoPlano: [],
        url: "",
        camposAdicionaisPlanoFlow: [""],
        pixelId: "",
        habilitarPreCadastro: false,
        tema: "",
        googleTagId: "",
        titulocheckout: "Bora treinar?"
      }

      return NextResponse.json({
        success: true,
        data: defaultConfig,
        source: 'default'
      })
    }

    const data = await response.json()
    const config = data.return || data

    // Cache the config
    configCache.set(slug, {
      data: config,
      timestamp: Date.now()
    })

    return NextResponse.json({
      success: true,
      data: config,
      source: 'api'
    })

  } catch (error) {
    console.error('Error fetching vendas config:', error)

    // Return minimal default config on error
    const fallbackConfig: VendasConfig = {
      habilitarAgendamentoAulaExperimentalLinkVisitante: false,
      configSescHabilitada: false,
      googleTagIdHotsite: "",
      cor: "#ffcc00",
      usarFormaPagamentoPlanoProduto: false,
      apresentarValorTotalDoPlanoNaTelaDeSelecaoDoPlano: false,
      urlLinkGooglePlay: "",
      apresentarCartao: true,
      apresentarCartaoVenda: true,
      urlLinkAppleStore: "",
      apresentarTermoAceiteLinkPag: false,
      apresentarCPFLinkPag: false,
      apresentarCartaoRegua: false,
      apresentarPix: false,
      analyticsId: "",
      cobrarProdutoJuntoAdesaoMatricula: "false",
      exibirTipoDocumentoTelaVendasOnline: false,
      temaescuro: false,
      primeiraCobrancaPixEGuardarCartao: false,
      tipoConvenio: "",
      detalharParcelaTelaCheckout: "false",
      apresentarBoletoRegua: false,
      selecionarUnidadeListaPlano: false,
      modalidadesIniciarSelecionadasContratoTurma: false,
      apresentarPixRegua: false,
      ativarLinksGooglePlayEAppleStore: false,
      permitirMudarTipoParcelamento: false,
      apresentarPixVenda: false,
      temaclaro: true,
      apresentarDtFaturaLinkPag: false,
      permiteVendaProdutoAlunoOutraUnidade: false,
      apresentarvaloranuidade: "false",
      apresentarBoletoVenda: false,
      permiteRenovacaoDeContrato: false,
      exibeDataUtilizacao: false,
      apresentarBoleto: false,
      camposAdicionais: [
        "TELEFONE",
        "CEP",
        "ENDERECO",
        "NUMERO",
        "BAIRRO",
        "SEXO",
        "DT_NASCIMENTO"
      ],
      camposAdicionaisProduto: [],
      permitecontratosconcomintante: "false",
      camposAdicionaisProdutoFlow: [""],
      cobrarPrimeiraParcelaCompra: "true",
      permiteProsseguirMesmoCpfOuEmailCadastroVisitante: true,
      tokenApiConversao: "",
      verificarCpfAlunoAntesEscolha: false,
      camposAdicionaisProdutoPlano: [],
      url: "",
      camposAdicionaisPlanoFlow: [""],
      pixelId: "",
      habilitarPreCadastro: false,
      tema: "",
      googleTagId: "",
      titulocheckout: "Bora treinar?"
    }

    return NextResponse.json({
      success: true,
      data: fallbackConfig,
      source: 'fallback',
      warning: 'Usando configuração padrão devido a erro na API'
    })
  }
}