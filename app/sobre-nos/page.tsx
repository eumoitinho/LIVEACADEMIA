"use client"

import { motion } from "framer-motion"

export default function SobreNos() {
  return (
    <main className="min-h-screen bg-live-bg text-live-textPrimary pt-20">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl font-bold text-center mb-12">SOBRE A LIVE ACADEMIA</h1>
          <h2 className="text-3xl font-bold text-center mb-8 text-live-accent">
            Mais do que uma academia, um estilo de vida
          </h2>
          
          <div className="space-y-6 text-live-textSecondary text-lg leading-relaxed">
            <p>
              Somos a maior rede de academias de Manaus, e nosso compromisso vai além do treino: é sobre transformar vidas, inspirar hábitos saudáveis e construir uma comunidade forte e unida.
            </p>
            
            <p>
              Desde nossa inauguração em outubro de 2012, temos a missão de oferecer espaços acolhedores, onde cada pessoa se sinta motivada a superar seus limites e alcançar seus objetivos.
            </p>
            
            <p>
              Nossa estrutura foi pensada e projetada para oferecer o que há de melhor em equipamentos, espaços e profissionais. Com unidades estrategicamente localizadas em todas as regiões de Manaus, garantimos fácil acesso a todos os públicos, democratizando a prática de atividades físicas.
            </p>
            
            <p>
              Valorizamos a inovação, a flexibilidade e a paixão pelo movimento, e é por isso que oferecemos planos sem fidelidade, tecnologia de ponta e uma variedade de aulas coletivas que se adaptam ao seu cotidiano.
            </p>
            
            <p>
              Na Live Academia, você não é apenas um aluno. Você faz parte de uma família que se apoia, se desafia e celebra cada conquista. Venha viver essa experiência e descubra o poder de uma vida mais ativa, saudável e feliz.
            </p>
            
            <p>
              Juntos, vamos construir um futuro com mais energia, bem-estar e qualidade de vida para todos.
            </p>
          </div>

          {/* Estatísticas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-live-accent mb-2">10K+</div>
              <div className="text-live-textSecondary">Alunos ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-live-accent mb-2">35+</div>
              <div className="text-live-textSecondary">Unidades</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-live-accent mb-2">4.9</div>
              <div className="text-live-textSecondary">Avaliação média</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-live-accent mb-2">10+</div>
              <div className="text-live-textSecondary">Anos de experiência</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}