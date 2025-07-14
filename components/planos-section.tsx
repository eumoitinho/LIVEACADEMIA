"use client"

import { CheckCircle, Star, Crown, ArrowRight, Zap, Shield, Users } from "lucide-react"

const planos = [
  {
    nome: "Tradicional",
    preco: "R$ 79,90/mês",
    destaque: false,
    beneficios: [
      "Sem fidelidade",
      "Acesso a todas as unidades tradicionais",
      "Aulas coletivas inclusas",
      "App Live Academia",
      "Sem taxa de matrícula",
    ],
    cor: "from-yellow-400 to-orange-500",
    icone: CheckCircle,
    badge: "Mais Popular",
    popularidade: "85% dos alunos"
  },
  {
    nome: "Premium",
    preco: "R$ 109,90/mês",
    destaque: true,
    beneficios: [
      "Todos os benefícios do Tradicional",
      "Acesso a unidades Premium",
      "Climatização",
      "Espaço Relax e Yoga",
      "Acesso ao Studio de Bike",
    ],
    cor: "from-yellow-500 to-amber-600",
    icone: Star,
    badge: "Recomendado",
    popularidade: "92% dos alunos"
  },
  {
    nome: "Diamante",
    preco: "R$ 149,90/mês",
    destaque: false,
    beneficios: [
      "Todos os benefícios do Premium",
      "Acesso ilimitado a todas as unidades",
      "Consultoria personalizada",
      "Acesso VIP a eventos",
      "Brindes exclusivos",
    ],
    cor: "from-amber-500 to-yellow-600",
    icone: Crown,
    badge: "Exclusivo",
    popularidade: "98% dos alunos"
  },
]

export default function PlanosSection() {
  return (
    <section className="relative py-20 px-6 lg:px-12 overflow-hidden" id="planos">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-zinc-800 px-4 py-2 mb-6">
            <span className="text-zinc-400 text-sm font-medium">Planos para todos os objetivos</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Escolha o <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">plano ideal</span> para você
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Liberdade, tecnologia e benefícios exclusivos em todos os planos.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {planos.map((plano, idx) => (
            <div
              key={plano.nome}
              className={`relative group ${
                plano.destaque 
                  ? "bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 border-2 border-yellow-500/50 shadow-2xl" 
                  : "bg-zinc-900/50 border border-zinc-800/50"
              } backdrop-blur-xl rounded-3xl p-8 hover:border-yellow-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden`}
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${plano.cor} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
              
              {/* Badge */}
              {plano.badge && (
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${plano.cor} text-black`}>
                    {plano.badge}
                  </div>
                </div>
              )}
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${plano.cor} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
                    <plano.icone className="h-8 w-8 text-black relative z-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{plano.nome}</h3>
                    <p className="text-zinc-400 text-sm">{plano.popularidade}</p>
                  </div>
                </div>
                
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                      {plano.preco.split('/')[0]}
                    </span>
                    <span className="text-zinc-400">/mês</span>
                  </div>
                  <p className="text-zinc-500 text-sm mt-1">Sem taxa de matrícula</p>
                </div>
                
                {/* Benefits */}
                <ul className="space-y-4 mb-8">
                  {plano.beneficios.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-300">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-3 w-3 text-black" />
                      </div>
                      <span className="text-sm leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <button className={`w-full py-4 rounded-2xl bg-gradient-to-r ${plano.cor} text-black font-bold shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group/btn relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
                  <span className="relative z-10">Matricule-se</span>
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300 relative z-10" />
                </button>
                
                {/* Additional Info */}
                <div className="mt-4 text-center">
                  <p className="text-zinc-500 text-xs">Cancelamento gratuito a qualquer momento</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-3xl p-8 backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ainda em dúvida?
            </h3>
            <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
              Experimente gratuitamente por 7 dias e descubra por que somos a academia mais escolhida de Manaus.
            </p>
            <button className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black px-8 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 mx-auto group">
              <span>Experimente Grátis</span>
              <Zap className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}