"use client"

import { motion } from "framer-motion"
import { Zap, Heart, Dumbbell, Music, Bike, Users, Target, Star } from "lucide-react"

const modalidades = [
  {
    nome: "Extreme 55 (Step)",
    descricao: "Extreme 55® é um programa inovador que integra trabalhos utilizando o peso do próprio corpo e diferentes estímulos para graduar a intensidade do treinamento. Com o uso de steps baixos e halteres, a aula se destaca como um elemento indispensável para a intensificação do seu trabalho muscular, promovendo o aumento da força e resistência, a redução de gordura e a definição muscular para todo o corpo.",
    icon: Dumbbell,
    categoria: "Força e Resistência"
  },
  {
    nome: "Ubound (Jump)",
    descricao: "Ao empurrar o minitrampolim, você se beneficia de uma modalidade de alta intensidade e baixíssimo impacto, com um gasto calórico aproximado de 900 calorias por sessão. O Ubound® aprimora o sistema linfático, ajudando a liberar toxinas e combater a celulite, além de ser um treinamento simples, eficaz e divertido que melhora a força, a resistência geral e o equilíbrio musculoesquelético total. A sensação de empurrar a lona e flutuar é incomparável!",
    icon: Zap,
    categoria: "Alta Intensidade"
  },
  {
    nome: "Power",
    descricao: "Power® é um programa de treinamento de força e resistência que utiliza um set de barras e anilhas e um step. Inteligentemente concebido, oferece 4 formatos de aulas (Alpha, Beta, Gama e Delta), cada um com uma combinação diferente de grupos musculares para alcançar objetivos e intensidades variadas, como força, resistência muscular ou cardiovascular. Cada aula representa um novo estímulo e um novo desafio para seus músculos, melhorando significativamente sua força e resistência muscular e cardiovascular.",
    icon: Target,
    categoria: "Força e Resistência"
  },
  {
    nome: "Eleven (HIIT)",
    descricao: "Eleven® é uma aula de HIIT de 30 minutos que utiliza exercícios atléticos/funcionais realizados apenas com o peso corporal. Os movimentos são livres, permitindo que homens e mulheres de todos os níveis participem. Seu revolucionário sistema de planejamento integra trabalhos que utilizam o peso do próprio corpo como resistência e diferentes estímulos para graduar a intensidade do treinamento, melhorando rapidamente a força e a resistência, aumentando a massa magra, acelerando o metabolismo e queimando mais calorias após o treino.",
    icon: Star,
    categoria: "Alta Intensidade"
  },
  {
    nome: "Top Ride",
    descricao: "Top Ride® é uma aula que simula rotas, percursos e pistas de treino com técnicas de ciclismo real de forma divertida, garantindo resultados em curto prazo. As aulas são baseadas em um sistema exclusivo já utilizado em diversos países do mundo, proporcionando novos estímulos em sua rotina de treinos, melhorando a resistência cardiorrespiratória, tonificando as pernas e glúteos, auxiliando no emagrecimento e aprimorando a coordenação motora.",
    icon: Bike,
    categoria: "Cardio"
  },
  {
    nome: "Megadanz",
    descricao: "A Megadanz® te convida a dançar e queimar calorias ao som de hip-hop, dance, axé, funk, jazz e até o árabe. Formado por segmentos de treinamento cardiovascular, o programa utiliza movimentos simples, organizados progressivamente em coreografias lógicas e acessíveis para todos os níveis, resultando em alto gasto calórico, aumento da autoestima e bem-estar, prevenção de doenças e promoção da interação social.",
    icon: Music,
    categoria: "Dança"
  },
  {
    nome: "Fitdance",
    descricao: "O Fitdance® é uma aula de dança que trabalha com movimentos coreográficos, proporcionando o aprendizado e a evolução do praticante. Contemplando todos os estilos musicais, é a opção perfeita para quem busca se exercitar de forma leve e descontraída, garantindo um bom gasto calórico, aumento da autoestima e bem-estar, prevenção de doenças e promoção da interação social.",
    icon: Music,
    categoria: "Dança"
  },
  {
    nome: "Pilates Solo",
    descricao: "O Pilates Solo tem como objetivo alinhar e fortalecer o corpo, isolando e treinando profundamente os músculos posturais. É uma modalidade que promove o equilíbrio e a consciência corporal, resultando no aumento da resistência física e mental, aumento da flexibilidade, correção de problemas posturais, tonificação da musculatura e alívio de dores musculares.",
    icon: Heart,
    categoria: "Flexibilidade"
  },
  {
    nome: "Live Mix",
    descricao: "A Live Mix® melhora o condicionamento cardiorrespiratório, desenvolve a coordenação, ritmo, memória, capacidade de reação e velocidade. Além disso, fortalece a autoconfiança, alivia o estresse, aumenta a resistência muscular, força e melhora a flexibilidade, proporcionando um treino abrangente e eficaz para o seu corpo.",
    icon: Users,
    categoria: "Funcional"
  },
  {
    nome: "Super Abdômen",
    descricao: "Aula voltada para diferentes tipos e séries de abdominais, criada e direcionada para o fortalecimento e a definição da musculatura abdominal. Elaborada para trabalhar a musculatura com alta intensidade, permite que os benefícios ocorram rapidamente, fortalecendo toda a região do abdômen, aumentando a resistência muscular e força abdominal, e melhorando a postura.",
    icon: Target,
    categoria: "Localizada"
  },
  {
    nome: "CFT",
    descricao: "CFT é uma aula completa, na qual o professor seleciona variados tipos de modalidades em uma única aula, proporcionando um treino dinâmico e eficaz que resulta em grande perda calórica e melhora do condicionamento físico em geral.",
    icon: Zap,
    categoria: "Funcional"
  },
  {
    nome: "GAP",
    descricao: "GAP é uma ginástica localizada que movimenta o abdômen, os glúteos e as pernas, focando na definição e tonificação dessas regiões. Esta aula auxilia na definição dos músculos do abdômen, glúteos e pernas, na perda de gordura localizada, e contribui para o emagrecimento e o ganho de massa magra.",
    icon: Target,
    categoria: "Localizada"
  },
  {
    nome: "Muay Thai Fitness",
    descricao: "O Muay Thai Fitness melhora o condicionamento físico, acelera o metabolismo, eleva a autoestima, melhora a força e a agilidade, aumenta a flexibilidade e exercita a coordenação motora. É uma aula completa para corpo e mente, que te desafia e te impulsiona a superar seus limites.",
    icon: Star,
    categoria: "Arte Marcial"
  }
]

export default function AulasColetivas() {
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
          <h1 className="text-5xl font-bold mb-6">AULAS COLETIVAS</h1>
          <h2 className="text-2xl font-semibold mb-6 text-live-accent">
            Venha suar a camisa, sorrir e se superar a cada aula!
          </h2>
          <p className="text-lg text-live-textSecondary max-w-4xl mx-auto">
            Em parceria com a Radical Fitness Brasil, trazemos para Manaus o que há de mais inovador em programas de ginástica coletiva.
          </p>
          <p className="text-lg text-live-textSecondary max-w-4xl mx-auto mt-4">
            Na Live Academia, acreditamos que treinar com energia e em grupo potencializa seus resultados e torna sua jornada fitness muito mais divertida! Nossa grade de aulas coletivas, desenvolvida em parceria com a Radical Fitness Brasil, líder mundial no desenvolvimento de programas de ginástica coletiva para academias e clubes, atende todos os níveis de condicionamento, desde iniciantes até os mais avançados.
          </p>
          <p className="text-lg text-live-textSecondary max-w-4xl mx-auto mt-4">
            Com instrutores altamente qualificados e uma metodologia comprovada, você terá o suporte necessário para alcançar seus objetivos. Venha sentir a energia que transforma!
          </p>
          <p className="text-lg text-live-textSecondary max-w-4xl mx-auto mt-4">
            Descubra a modalidade perfeita para você.
          </p>
        </motion.div>

        {/* Modalidades */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modalidades.map((modalidade, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-live-bg/50 backdrop-blur-sm p-6 rounded-2xl border border-live-border/30 hover:border-live-accent/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-live-accent/20 to-live-accent/40 rounded-xl flex items-center justify-center mb-4">
                  <modalidade.icon className="w-6 h-6 text-live-accent" />
                </div>
                <div className="text-xs text-live-accent font-semibold mb-2">{modalidade.categoria}</div>
                <h3 className="text-xl font-bold text-live-textPrimary mb-3">{modalidade.nome}</h3>
                <p className="text-live-textSecondary text-sm leading-relaxed">{modalidade.descricao}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <button className="bg-gradient-to-r from-live-accent to-yellow-500 text-black px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-live-accent/25 transition-all duration-300">
            VEJA TODAS AS MODALIDADES
          </button>
        </motion.div>
      </div>
    </main>
  )
}