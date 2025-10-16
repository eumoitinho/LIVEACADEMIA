"use client"

import { motion } from "framer-motion"
import { Check, Star, Crown, Sparkles, Clock, ArrowUpRight, Zap, MessagesSquare } from "lucide-react"
import { useState, useEffect } from "react"
import { PactoPlano } from '@/src/lib/api/pacto-v2'

interface PlanosSectionProps {
  data: {
    badge: string
    title: string
    description: string
  }
  unidadeSlug?: string // Slug da unidade para buscar planos específicos
}

const iconMap = {
  Check,
  Star,
  Crown,
  Sparkles,
  Clock,
  ArrowUpRight,
  Zap,
  MessagesSquare
}

export default function PlanosSectionDynamic({ data, unidadeSlug }: PlanosSectionProps) {
  const easing = [0.16, 1, 0.3, 1] as const
  const [planos, setPlanos] = useState<PactoPlano[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPlanos() {
      try {
        setLoading(true)
        setError(null)

        // Se não tiver unidade específica, usar uma unidade padrão ou buscar todas
        const slug = unidadeSlug || 'centro' // Unidade padrão
        
        const response = await fetch(`/api/pacto/planos/${slug}`)
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Erro ao buscar planos')
        }

        if (result.planos && Array.isArray(result.planos)) {
          setPlanos(result.planos)
        } else {
          throw new Error('Formato de resposta inválido')
        }
      } catch (err) {
        console.error('Erro ao buscar planos:', err)
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
        
        // Fallback com planos estáticos
        setPlanos([
          {
            codigo: 1000,
            nome: "PLANO TRADICIONAL",
            mensalidade: 119.90,
            primeiraParcela: 119.90,
            adesao: 0,
            fidelidade: 0,
            parcelamentoOperadora: false,
            maxDivisao: 1,
            descricaoEncantamento: "Plano tradicional com acesso completo",
            mesAnuidade: "Janeiro",
            nrVezesParcelarMatricula: 1,
            anuidade: 0,
            horario: "Livre",
            quantidadeDeDiasDuracaoPlano: 30,
            quantidadeCompartilhamentos: 0,
            valorProdutos: 0,
            valorTotalDoPlano: 119.90,
            produtos: "",
            inicioMinimo: "",
            modalidades: ["MUSCULAÇÃO"],
            diasVencimento: [5, 10, 15, 20, 25, 30],
            inicioFuturo: false,
            anuidadeAgora: false,
            cobrarPrimeiraParcelaCompra: false,
            qtdCreditoPlanoCredito: 0,
            regimeRecorrencia: true,
            renovavelAutomaticamente: false,
            matricula: 0,
            renovacao: "",
            rematricula: "",
            parcelasAnuidade: [],
            categorias: [],
            apresentarPactoFlow: true,
            vendaComTurma: false,
            modalidadesDTO: [],
            videoSiteUrl: "",
            observacaoSite: "",
            cobrarProdutoSeparado: false,
            cobrarAdesaoSeparado: false,
            permitirCompartilharPLanoNoSite: false,
            condicaoPagamentoPrePago: false,
            gerarParcelasValorDiferente: false,
            produtoTaxaCancelamento: "Sem taxa",
            percentualMultaCancelamento: 0
          },
          {
            codigo: 2000,
            nome: "PLANO DIAMANTE",
            mensalidade: 159.90,
            primeiraParcela: 159.90,
            adesao: 0,
            fidelidade: 0,
            parcelamentoOperadora: false,
            maxDivisao: 1,
            descricaoEncantamento: "Plano premium com acesso a espaços exclusivos",
            mesAnuidade: "Janeiro",
            nrVezesParcelarMatricula: 1,
            anuidade: 0,
            horario: "Livre",
            quantidadeDeDiasDuracaoPlano: 30,
            quantidadeCompartilhamentos: 2,
            valorProdutos: 0,
            valorTotalDoPlano: 159.90,
            produtos: "",
            inicioMinimo: "",
            modalidades: ["MUSCULAÇÃO"],
            diasVencimento: [5, 10, 15, 20, 25, 30],
            inicioFuturo: false,
            anuidadeAgora: false,
            cobrarPrimeiraParcelaCompra: false,
            qtdCreditoPlanoCredito: 0,
            regimeRecorrencia: true,
            renovavelAutomaticamente: false,
            matricula: 0,
            renovacao: "",
            rematricula: "",
            parcelasAnuidade: [],
            categorias: [],
            apresentarPactoFlow: true,
            vendaComTurma: false,
            modalidadesDTO: [],
            videoSiteUrl: "",
            observacaoSite: "",
            cobrarProdutoSeparado: false,
            cobrarAdesaoSeparado: false,
            permitirCompartilharPLanoNoSite: false,
            condicaoPagamentoPrePago: false,
            gerarParcelasValorDiferente: false,
            produtoTaxaCancelamento: "Sem taxa",
            percentualMultaCancelamento: 0
          },
          {
            codigo: 3000,
            nome: "PLANO VIP",
            mensalidade: 199.90,
            primeiraParcela: 199.90,
            adesao: 0,
            fidelidade: 0,
            parcelamentoOperadora: false,
            maxDivisao: 1,
            descricaoEncantamento: "Plano VIP com benefícios exclusivos",
            mesAnuidade: "Janeiro",
            nrVezesParcelarMatricula: 1,
            anuidade: 0,
            horario: "Livre",
            quantidadeDeDiasDuracaoPlano: 30,
            quantidadeCompartilhamentos: 5,
            valorProdutos: 0,
            valorTotalDoPlano: 199.90,
            produtos: "",
            inicioMinimo: "",
            modalidades: ["MUSCULAÇÃO"],
            diasVencimento: [5, 10, 15, 20, 25, 30],
            inicioFuturo: false,
            anuidadeAgora: false,
            cobrarPrimeiraParcelaCompra: false,
            qtdCreditoPlanoCredito: 0,
            regimeRecorrencia: true,
            renovavelAutomaticamente: false,
            matricula: 0,
            renovacao: "",
            rematricula: "",
            parcelasAnuidade: [],
            categorias: [],
            apresentarPactoFlow: true,
            vendaComTurma: false,
            modalidadesDTO: [],
            videoSiteUrl: "",
            observacaoSite: "",
            cobrarProdutoSeparado: false,
            cobrarAdesaoSeparado: false,
            permitirCompartilharPLanoNoSite: false,
            condicaoPagamentoPrePago: false,
            gerarParcelasValorDiferente: false,
            produtoTaxaCancelamento: "Sem taxa",
            percentualMultaCancelamento: 0
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchPlanos()
  }, [unidadeSlug])

  if (!data) return null

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL',
      minimumFractionDigits: 2
    })
  }

  const getPlanFeatures = (plano: PactoPlano) => {
    const features = []
    
    // Modalidades incluídas
    if (plano.modalidades && plano.modalidades.length > 0) {
      plano.modalidades.forEach(modalidade => {
        features.push(modalidade)
      })
    }

    // Fidelidade
    if (plano.fidelidade === 0) {
      features.push("Sem fidelidade")
    } else {
      features.push(`Fidelidade de ${plano.fidelidade} meses`)
    }

    // Taxa de cancelamento
    if (plano.percentualMultaCancelamento === 0) {
      features.push("Sem taxa de cancelamento")
    } else {
      features.push(`Taxa de cancelamento: ${plano.percentualMultaCancelamento}%`)
    }

    // Compartilhamentos
    if (plano.quantidadeCompartilhamentos > 0) {
      features.push(`${plano.quantidadeCompartilhamentos} convidado${plano.quantidadeCompartilhamentos > 1 ? 's' : ''} por mês`)
    }

    // Créditos (Day Use)
    if (plano.qtdCreditoPlanoCredito > 0) {
      features.push(`${plano.qtdCreditoPlanoCredito} acesso${plano.qtdCreditoPlanoCredito > 1 ? 's' : ''} por mês`)
    }

    // Adesão
    if (plano.adesao > 0) {
      features.push(`Taxa de adesão: ${formatCurrency(plano.adesao)}`)
    }

    // Produtos incluídos
    if (plano.produtos && plano.produtos !== "" && plano.produtos !== "ACESSO DIAMANTE R$ 0,00") {
      features.push(`Inclui: ${plano.produtos}`)
    }

    // Features específicas por tipo de plano
    if (plano.nome.toUpperCase().includes('DIAMANTE')) {
      features.push(
        "Espaços exclusivos (Relax, Yoga, Bike)",
        "Climatização em todas as unidades",
        "Acesso a todas as unidades Diamante"
      )
    }

    if (plano.nome.toUpperCase().includes('VIP')) {
      features.push(
        "Personal Trainer (1x/mês)",
        "Avaliação física completa",
        "Acesso premium a todos os serviços"
      )
    }

    // Features padrão
    features.push(
      "Acesso ao app Live Academia",
      "Aulas coletivas inclusas",
      "Horário livre"
    )

    return features
  }

  const isPopular = (plano: PactoPlano) => {
    return plano.nome.toUpperCase().includes('DIAMANTE') && 
           plano.nome.toUpperCase().includes('SEM FIDELIDADE') &&
           plano.mensalidade <= 200
  }

  const isRelevantPlan = (plano: PactoPlano) => {
    // Filtrar apenas planos relevantes para o site
    const nome = plano.nome.toUpperCase()
    
    // Excluir planos de teste, promoções antigas, etc.
    if (nome.includes('TESTE') || nome.includes('DESCONTINUADO')) {
      return false
    }
    
    // Incluir planos principais
    if (nome.includes('DIAMANTE') || nome.includes('DAY USE')) {
      return true
    }
    
    return false
  }

  const getPlanType = (plano: PactoPlano) => {
    const nome = plano.nome.toUpperCase()
    
    if (nome.includes('DAY USE')) {
      return 'day-use'
    } else if (nome.includes('DIAMANTE')) {
      return 'diamante'
    } else {
      return 'standard'
    }
  }

  return (
    <section id="planos" className="relative py-24 px-6 lg:px-12 overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,203,0,0.08),transparent_70%)]" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-yellow-400/70 font-semibold mb-4 block">
            {data.badge}
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight">
            {data.title}
          </h2>
          <p className="text-lg lg:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>
          
          {/* Status de carregamento */}
          {loading && (
            <div className="mt-8 flex items-center justify-center gap-2 text-yellow-400">
              <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Carregando planos...</span>
            </div>
          )}
          
          {error && (
            <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">
                Erro ao carregar planos: {error}
              </p>
              <p className="text-red-300/70 text-xs mt-1">
                Exibindo planos padrão
              </p>
            </div>
          )}
        </motion.div>

        {/* Planos Grid */}
        {planos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {planos.filter(isRelevantPlan).map((plano, index) => (
              <motion.div
                key={plano.codigo}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-zinc-900/50 backdrop-blur-sm rounded-3xl border border-zinc-800/50 p-8 hover:border-yellow-500/30 transition-all duration-300 group"
              >
                {/* Badges */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {isPopular(plano) && (
                    <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-4 py-1 rounded-full text-xs font-bold">
                      Mais Popular
                    </div>
                  )}
                  
                  {getPlanType(plano) === 'day-use' && (
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                      Day Use
                    </div>
                  )}
                  
                  {plano.fidelidade === 0 && getPlanType(plano) !== 'day-use' && (
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                      Sem Fidelidade
                    </div>
                  )}
                  
                  {plano.fidelidade > 0 && (
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                      {plano.fidelidade}m Fidelidade
                    </div>
                  )}
                </div>

                {/* Header do Plano */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {plano.nome}
                  </h3>
                  {plano.descricaoEncantamento && (
                    <p className="text-zinc-400 text-sm mb-4">
                      {plano.descricaoEncantamento}
                    </p>
                  )}
                  
                  {/* Preço */}
                  <div className="mb-6">
                    <span className="text-5xl font-black text-white">
                      {formatCurrency(plano.mensalidade)}
                    </span>
                    <span className="text-zinc-400 ml-2">/ mês</span>
                    
                    {/* Taxa de adesão se houver */}
                    {plano.adesao > 0 && (
                      <div className="mt-2">
                        <span className="text-sm text-zinc-400">
                          + Taxa de adesão: {formatCurrency(plano.adesao)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {getPlanFeatures(plano).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className="w-full py-4 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25">
                  Matricule-se Agora
                </button>

                {/* Indicador de Status */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${plano.regimeRecorrencia ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span className="text-xs text-zinc-500 capitalize">
                    {plano.regimeRecorrencia ? 'Disponível' : 'Indisponível'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Mensagem se não houver planos */}
        {!loading && planos.filter(isRelevantPlan).length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-400 text-lg">
              Nenhum plano disponível no momento.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
