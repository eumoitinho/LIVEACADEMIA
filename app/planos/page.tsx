"use client"

import { motion } from "framer-motion"
import { Check, Crown, Sparkles } from "lucide-react"

const planos = [
  {
    nome: "TRADICIONAL",
    preco: "119,90",
    periodo: "mês",
    descricao: "Treine em todas as unidades Tradicionais, incluindo as Tradicionais Climatizadas.",
    beneficios: [
      "Sem fidelidade",
      "Sem taxa de cancelamento",
      "Sem taxa de manutenção",
      "Sem taxa de anuidade",
      "Acesso ao app Live Academia",
      "Aulas coletivas",
      "Climatização (apenas unidades Torquato Bemol e Tiradentes)",
      "Atendimento aos domingos (consultar unidade)"
    ],
    gradient: "from-zinc-700 to-zinc-900",
    icone: Check,
    popular: false
  },
  {
    nome: "DIAMANTE",
    preco: "159,90",
    periodo: "mês",
    descricao: "Treine em todas as unidades da rede em Manaus, exceto Morada do Sol e Alphaville.",
    beneficios: [
      "Sem fidelidade",
      "Sem taxa de cancelamento",
      "Sem taxa de manutenção",
      "Sem taxa de anuidade",
      "Acesso ao app Live Academia",
      "Espaço Relax",
      "Espaço Yoga",
      "Espaço Pose",
      "Acesso ao Studio de Bike",
      "Aulas coletivas",
      "Climatização",
      "Atendimento aos domingos"
    ],
    gradient: "from-amber-500 to-yellow-600",
    icone: Crown,
    popular: true,
    destaque: true,
    badge: "O mais vendido"
  }
]

export default function Planos() {
  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6">Conheça nossos planos</h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Escolha o plano que melhor se adapta às suas necessidades e comece sua jornada fitness hoje mesmo.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {planos.map((plano, idx) => (
              <motion.div
                key={plano.nome}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative group ${plano.destaque ? 'md:-mt-4' : ''}`}
              >
                {/* Card Container */}
                <div className={`relative h-full rounded-3xl overflow-hidden border transition-all duration-500 ${
                  plano.destaque 
                    ? 'border-yellow-500/50 shadow-2xl shadow-yellow-500/10' 
                    : 'border-zinc-800/50 hover:border-zinc-700/50'
                }`}>
                  
                  {/* Popular Badge */}
                  {plano.popular && (
                    <div className="absolute top-6 right-6 z-20">
                      <div className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {plano.badge}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 p-8">
                    {/* Header */}
                    <div className="mb-8">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plano.gradient} flex items-center justify-center mb-4`}>
                        <plano.icone className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{plano.nome}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">{plano.descricao}</p>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-1">
                        <span className="text-zinc-400 text-lg">R$</span>
                        <span className={`text-5xl font-bold ${
                          plano.destaque 
                            ? 'bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent' 
                            : 'text-white'
                        }`}>
                          {plano.preco}
                        </span>
                        <span className="text-zinc-400 text-lg">/{plano.periodo}</span>
                      </div>
                      <p className="text-yellow-400 text-sm font-medium mt-2">Oferta por tempo limitado</p>
                    </div>

                    {/* Benefits */}
                    <ul className="space-y-4 mb-8">
                      {plano.beneficios.map((beneficio, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            plano.destaque 
                              ? 'bg-yellow-500/20' 
                              : 'bg-zinc-800'
                          }`}>
                            <Check className={`w-3 h-3 ${
                              plano.destaque ? 'text-yellow-500' : 'text-zinc-400'
                            }`} />
                          </div>
                          <span className="text-zinc-300 text-sm leading-relaxed">{beneficio}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                      plano.destaque
                        ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:shadow-lg hover:shadow-yellow-500/25 hover:scale-[1.02]'
                        : 'bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700'
                    }`}>
                      MATRICULE-SE AGORA!
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <p className="text-zinc-400 text-sm">
              Os preços, serviços e condições promocionais podem variar de acordo com a academia escolhida.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}