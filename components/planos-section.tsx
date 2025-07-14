"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const plans = [
  {
    id: "tradicional",
    name: "Tradicional",
    price: 119.90,
    color: "#ffcb00",
    features: [
      "Treine em todas as unidades Tradicionais, incluindo as Tradicionais Climatizadas.",
      "Sem fidelidade",
      "Sem taxa de cancelamento",
      "Sem taxa de manutenção",
      "Sem taxa de anuidade",
      "Acesso ao app Live Academia",
      "Aulas coletivas",
      "Climatização (apenas unidades Torquato Bemol e Tiradentes)",
      "Atendimento aos domingos (consultar unidade)",
    ],
  },
  {
    id: "diamante",
    name: "Diamante (O mais vendido)",
    price: 159.90,
    color: "#afafaf",
    features: [
      "Treine em todas as unidades da rede em Manaus, exceto Morada do Sol e Alphaville.",
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
      "Atendimento aos domingos",
    ],
  },
]

export default function PlanosSection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Conheça nossos planos</h2>
          <p className="text-gray-300 mb-4">Escolha o plano que melhor se adapta às suas necessidades e comece sua jornada fitness hoje mesmo.</p>
          <p className="text-gray-400 text-sm">Os preços, serviços e condições promocionais podem variar de acordo com a academia escolhida.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-900 p-8 rounded-lg border border-gray-800"
            >
              <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6"><span className="text-sm">R$</span> {plan.price.toFixed(2)} <span className="text-sm text-gray-400">/mês</span></p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-gray-300 flex items-start gap-2">
                    <span className="text-[#ffcb00]">•</span> {feature}
                  </li>
                ))}
              </ul>
              <Link href="/planos" className="bg-[#ffcb00] text-black px-6 py-3 rounded-lg font-bold block text-center hover:bg-[#ffd740] transition">
                MATRICULE-SE AGORA
              </Link>
              <p className="text-gray-400 text-sm mt-2 text-center">Oferta por tempo limitado</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}