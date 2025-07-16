"use client"

import { motion } from "framer-motion"
import { Check, Clock, MapPin, Zap } from "lucide-react"

const beneficios = [
  {
    titulo: "Acesso Diamante",
    descricao: "Acesse todas as unidades da rede Live em Manaus.",
    icon: MapPin
  },
  {
    titulo: "Serviços completos",
    descricao: "Aproveite toda a estrutura e grade de aulas da Live.",
    icon: Check
  },
  {
    titulo: "Flexibilidade de horário",
    descricao: "Utilize seu acesso em dias de semana, domingos e feriados.",
    icon: Clock
  },
  {
    titulo: "Bike Indoor",
    descricao: "Acesse o maior Studio de Ciclismo Indoor da Região Norte.",
    icon: Zap
  }
]

const faqs = [
  {
    pergunta: "Esse serviço é uma assinatura?",
    resposta: "Não! O Day Use da Live Academia é a compra de um acesso individual e intransferível. Você compra a quantidade de acessos que deseja e utiliza quando for mais conveniente para você. Consulte o regulamento completo para mais detalhes."
  },
  {
    pergunta: "Os acessos expiram se não forem usados?",
    resposta: "Sim, os acessos possuem um prazo de validade. É importante verificar essa informação no momento da contratação para garantir que você utilize seus acessos dentro do período."
  },
  {
    pergunta: "Posso usar em qualquer unidade da rede Live?",
    resposta: "Sim, com o Day Use você tem a liberdade de usar seu acesso em qualquer unidade da Live Academia em Manaus, sem restrição de dia e horário."
  },
  {
    pergunta: "Posso usar o Day Use qualquer dia?",
    resposta: "Com certeza! Seu acesso será validado apenas no dia em que você decidir utilizá-lo, dentro do período de validade."
  },
  {
    pergunta: "Onde posso comprar o Day Use?",
    resposta: "Online. Consulte a tabela de preços abaixo e garanta já o seu acesso."
  },
  {
    pergunta: "Quais serviços o Day Use contempla?",
    resposta: "Com o Day Use você terá acesso à área de musculação e cardio, aulas coletivas (consultar grade de aulas), Espaço Relax, Espaço Pose e a maior sala de Ciclismo Indoor da Região."
  }
]

const pacotes = [
  {
    titulo: "1 acesso",
    preco: "R$ 50,00",
    descricao: "Ideal para quem quer experimentar pela primeira vez ou precisa de um treino avulso.",
    popular: false
  },
  {
    titulo: "4 acessos",
    preco: "R$ 200,00",
    descricao: "Perfeito para quem busca mais flexibilidade e quer ter opções para treinar ao longo do mês.",
    popular: true
  }
]

export default function DayUse() {
  return (
    <main className="min-h-screen bg-live-bg text-live-textPrimary pt-20">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">DAY USE</h1>
          <h2 className="text-2xl font-semibold mb-6 text-live-accent">
            Acesso exclusivo para você experimentar a Live Academia
          </h2>
          <p className="text-lg text-live-textSecondary max-w-3xl mx-auto">
            Tenha acesso a todas as nossas instalações e aulas coletivas por um dia, sem a necessidade de um plano de longo prazo. Perfeito para quem está de passagem, quer experimentar antes de se matricular ou simplesmente busca um treino avulso com a qualidade Live Academia.
          </p>
          <button className="mt-8 bg-gradient-to-r from-live-accent to-yellow-500 text-black px-8 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-live-accent/25 transition-all duration-300">
            ADQUIRA SEU ACESSO!
          </button>
        </motion.div>

        {/* Benefícios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">USE QUANDO E ONDE QUISER</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {beneficios.map((beneficio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-live-accent/20 to-live-accent/40 rounded-2xl flex items-center justify-center">
                  <beneficio.icon className="w-8 h-8 text-live-accent" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-live-textPrimary">{beneficio.titulo}</h4>
                <p className="text-live-textSecondary text-sm">{beneficio.descricao}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Perguntas frequentes</h3>
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-live-bg/50 backdrop-blur-sm p-6 rounded-xl border border-live-border/30"
              >
                <h4 className="font-semibold text-live-textPrimary mb-2">{faq.pergunta}</h4>
                <p className="text-live-textSecondary">{faq.resposta}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pacotes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Conquiste seu acesso na melhor academia de Manaus
          </h3>
          <p className="text-center text-live-textSecondary mb-8">
            Escolha o pacote que melhor se adapta à sua necessidade e comece a viver a experiência Live Academia:
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pacotes.map((pacote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className={`bg-live-bg/50 backdrop-blur-sm p-8 rounded-2xl border ${
                  pacote.popular ? 'border-live-accent/50 shadow-lg shadow-live-accent/10' : 'border-live-border/30'
                }`}
              >
                {pacote.popular && (
                  <div className="bg-live-accent text-black text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">
                    Mais Popular
                  </div>
                )}
                <h4 className="text-2xl font-bold mb-2 text-live-textPrimary">{pacote.titulo}</h4>
                <div className="text-3xl font-bold text-live-accent mb-4">{pacote.preco}</div>
                <p className="text-live-textSecondary mb-6">{pacote.descricao}</p>
                <button className="w-full bg-gradient-to-r from-live-accent to-yellow-500 text-black py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-live-accent/25 transition-all duration-300">
                  COMPRE AGORA
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}