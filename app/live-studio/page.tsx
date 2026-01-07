"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock3, Dumbbell, HeartPulse, Shield, ShieldCheck, Sparkles, Users, Baby, ChevronDown } from "lucide-react"
import StudioHeader from "./studio-header"

const logoUrl = "/studio/logolivestudio.png"
const videoSrc = "/studio/video_studio.MOV"

const concerns = [
  {
    title: "Saúde em risco?",
    description: "Se você busca prevenir doenças ou precisa de um treino adaptado às suas condições de saúde, o Live Studio oferece acompanhamento especializado para melhorar sua qualidade de vida.",
    icon: HeartPulse,
  },
  {
    title: "Insegurança pré e pós-parto?",
    description: "Para gestantes que desejam manter-se ativas antes e depois do parto, o Live Studio é um ambiente controlado e seguro. Nossos profissionais criam treinos adaptados, focando no seu bem-estar e recuperação.",
    icon: Baby,
  },
  {
    title: "Desconforto na academia?",
    description: "Se a ideia de treinar em grandes grupos te intimida, no Live Studio você pode ter aulas com até 4 pessoas e receber atenção total dos profissionais em um ambiente exclusivo e acolhedor.",
    icon: Users,
  },
  {
    title: "Limitações na Melhor Idade?",
    description: "Para idosos que buscam manter a vitalidade, força e flexibilidade, nossos especialistas desenvolvem atividades que promovem a saúde óssea, muscular e articular, com foco na autonomia e qualidade de vida.",
    icon: Shield,
  },
]

const differentiators = [
  {
    title: "Acompanhamento direcionado",
    description: "Aulas com no máximo 4 alunos por profissional, garantindo atenção total e foco nos seus objetivos individuais.",
    icon: ShieldCheck,
  },
  {
    title: "Espaço exclusivo",
    description: "Um ambiente premium e reservado, projetado para seu conforto e concentração.",
    icon: Sparkles,
  },
  {
    title: "Treinos otimizados",
    description: "Sessões de 40 minutos, dinâmicas e eficientes, que maximizam seus resultados.",
    icon: Clock3,
  },
  {
    title: "Profissionais experientes",
    description: "Equipe de especialistas dedicados a te ajudar a alcançar seu potencial.",
    icon: Users,
  },
  {
    title: "Foco em musculação e alongamento",
    description: "Programa desenvolvido para fortalecer o corpo, aumentar a flexibilidade e prevenir lesões.",
    icon: Dumbbell,
  },
  {
    title: "Prevenção e bem-estar",
    description: "Treinos direcionados para gestantes, idosos e para quem busca uma vida com mais saúde e qualidade de vida.",
    icon: HeartPulse,
  },
]

const faqs = [
  {
    question: "COMO FUNCIONA O SERVIÇO?",
    answer: "Aulas com até 4 alunos por horário, totalmente focadas nos seus objetivos. Com metodologia própria, tecnologia e sessões de 40 minutos, entregamos resultados reais sem perder tempo.\nNo Studio Live, movimento é sinônimo de qualidade de vida. Aqui, os treinos são dinâmicos, eficientes e longe da monotonia, sempre com orientação, segurança e acolhimento, para você conquistar autoestima, energia e bem-estar de forma consciente, no seu ritmo e com propósito.",
  },
  {
    question: "ONDE O SERVIÇO ESTÁ DISPONÍVEL?",
    answer: "Unidade Veneza do Turismo, na Avenida do Turismo, nº 116, Tarumã",
  },
  { question: "POSSO USAR QUALQUER DIA?", answer: "Sim. Seu acesso só será validado quando você usar, mas lembre-se de verificar o período de uso." },
  {
    question: "COMO AGENDAR / REMARCAR AULAS?",
    answer: "Tudo na palma da sua mão. Com nosso app exclusivo, você agenda ou cancela suas aulas com facilidade, de onde estiver e no seu tempo. Mais autonomia, praticidade e controle total sobre a sua rotina de treinos.",
  },
  { question: "ESSE SERVIÇO É UMA ASSINATURA?", answer: "Não. Ao contratar, você adquire créditos para utilizar o serviço. Consulte o regulamento para mais informações." },
  { question: "OS ACESSOS EXPIRAM SE NÃO FOREM USADOS?", answer: "Sim, consulte no ato da contratação o prazo de validade." },
  {
    question: "COMO FUNCIONA O CANCELAMENTO?",
    answer: "Não realizamos a devolução de valores, mas você pode transferir os créditos para outro cliente do Studio Live, sem alterar o prazo de validade dos créditos. Consulte o regulamento para mais informações.",
  },
  { question: "NÃO SOU CLIENTE DA LIVE POSSO COMPRAR?", answer: "Não. Este serviço está disponível exclusivamente para clientes Live." },
  {
    question: "QUAIS OS BENEFÍCIOS DE CONTRATAR O SERVIÇO DO STUDIO LIVE?",
    answer: "– 1 avaliação física com tecnologia de bioimpedância por mês.\n– Aplicativo de agendamentos de aula.\n– Flexibilidade para agendamento e desmarcação de aulas.\n– Treinos dinâmicos e focados nos seus objetivos.",
  },
]

const plans = [
  { name: "8 créditos", price: "R$ 237,60", detail: "Validade: 1 mês" },
  { name: "12 créditos", price: "R$ 276,00", detail: "Validade: 1 mês" },
  { name: "20 créditos:", price: "2x de R$ 235,00", total: "Total: R$ 470,00", detail: "Validade: 2 meses" },
  { name: "30 créditos:", price: "3x de R$ 230,00", total: "Total: R$ 690,00", detail: "Validade: 3 meses" },
  { name: "36 créditos:", price: "3x de R$ 260,00", total: "Total: R$ 780,00", detail: "Validade: 3 meses" },
]

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/liveacademiamanaus/" },
  { label: "YouTube", href: "https://www.youtube.com/@liveacademiaoficial" },
  { label: "Facebook", href: "https://web.facebook.com/liveacademiamanaus" },
]

export default function LiveStudioPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [audioEnabled, setAudioEnabled] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Animation values for Video
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.8, 1, 1, 0.8])
  const borderRadius = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], ["2rem", "0rem", "0rem", "2rem"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0])

  // Keep autoplay reliable: start muted and only enable audio on explicit user gesture.
  // If audio is enabled, we can still fade volume on scroll without toggling `muted`.
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (!audioEnabled) return
      const videoEl = videoRef.current
      if (!videoEl) return

      // Ramp volume from 0 to 1 as scroll goes from 0 to 0.4
      // Fade out volume from 0.6 to 1
      let volume = 0
      if (latest < 0.4) {
        volume = latest / 0.4
      } else if (latest > 0.6) {
        volume = 1 - ((latest - 0.6) / 0.4)
      } else {
        volume = 1
      }

      videoEl.volume = Math.max(0, Math.min(1, volume))
    })
  }, [scrollYProgress, audioEnabled])

  const enableAudio = () => {
    const videoEl = videoRef.current
    if (!videoEl) return

    setAudioEnabled(true)

    // Must be inside a user gesture (click/tap) to work across browsers.
    try {
      videoEl.muted = false
      videoEl.volume = Math.max(videoEl.volume, 0.8)
      void videoEl.play()
    } catch {
      // Ignore: some browsers may still block; controls will still allow manual enable.
    }
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-yellow-500/30">
      <StudioHeader />
      
      {/* Background Gradients (Restored) */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,203,0,0.08),transparent_40%)]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(255,203,0,0.05),transparent_40%)]" />
      <div className="fixed inset-0 -z-10 opacity-[0.2]" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")'}}></div>

      {/* Hero Text Only */}
      <section className="relative pt-24 pb-0 px-6 lg:px-12 flex flex-col items-center justify-center text-center overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
         
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-4xl relative z-10"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.1]">
              <span className="font-extrabold uppercase block mb-1">Aulas direcionadas</span>
              <span className="font-light italic text-white/90 block my-1">e acompanhadas, com</span>
              <span className="font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 block mt-1">
                até 4 alunos por horário
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto">
              Mais atenção, orientação e treinos otimizados para você!
            </p>
            <div className="pt-8">
               <Link
                href="#planos"
                className="group relative inline-flex items-center gap-3 bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(250,204,21,0.4)]"
              >
                COMPRE CRÉDITOS E AGENDE SEU TREINO!
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
      </section>

      {/* Sticky Scroll Video Section */}
      <section ref={containerRef} className="relative h-[250vh]">
        <div className="sticky top-0 h-screen flex flex-col items-center pt-24 overflow-hidden">
          <motion.div 
            style={{ 
              scaleX: scale,
              scaleY: scale,
              borderRadius 
            }}
            className="relative w-full md:w-[90%] aspect-video md:aspect-[21/9] overflow-hidden shadow-2xl shadow-yellow-900/10 bg-neutral-900/50"
          >
            <video
              ref={videoRef}
              src={videoSrc}
              className="absolute inset-0 w-full h-full object-cover"
              playsInline
              muted={!audioEnabled}
              loop
              autoPlay
            />

            {!audioEnabled && (
              <button
                type="button"
                onClick={enableAudio}
                className="absolute bottom-6 right-6 z-10 rounded-full bg-black/70 text-white border border-white/15 px-5 py-3 text-sm font-bold tracking-widest uppercase hover:bg-black/80 transition-colors"
              >
                Ativar som
              </button>
            )}
            <motion.div 
              style={{ opacity }}
              className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-left pointer-events-none"
            >
              <p className="text-white/90 text-sm font-medium tracking-wide uppercase">
                Exclusividade, eficiência e atenção total em cada movimento
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Intro Text Block with Original BG Image */}
      <section className="py-20 px-6 lg:px-12 border-y border-white/5 bg-neutral-900/30">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] lg:aspect-square w-full max-w-md mx-auto lg:max-w-none rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
             <Image 
               src="/studio/bg-live.jpg" 
               alt="Aulas personalizadas" 
               fill 
               className="object-cover"
             />
             {/* Gradient overlay for text readability if needed, though visually it's distinct */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="flex flex-col space-y-8 text-center lg:text-left">
            <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed">
              O <strong className="text-yellow-400 font-bold">Live Studio</strong> é o mais novo produto da Live Academia: um espaço exclusivo e inovador projetado para otimizar seus resultados. Com aulas direcionadas e acompanhamento de especialistas, o espaço receberá apenas quatro alunos por horário, garantindo atenção individualizada e um treino que vai muito além dos equipamentos convencionais.
            </p>
            <div className="h-px w-24 bg-yellow-400/30 mx-auto lg:mx-0" />
            <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed">
              O Live Studio surgiu para transformar seu corpo e mente, proporcionando segurança, eficiência e um ambiente acolhedor. Inicialmente disponível na unidade Live Veneza, com planos de expansão para outras unidades, o Live Studio é a escolha ideal para quem busca um treino VIP e personalizado.
            </p>
            
            <div className="pt-8">
              <Link
                href="#planos"
                className="inline-flex items-center text-sm font-bold tracking-widest uppercase text-yellow-400 hover:text-white transition-colors border-b border-yellow-400 pb-1 hover:border-white"
              >
                COMPRE CRÉDITOS E AGENDE SEU TREINO!
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Concerns Grid */}
      <section className="py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <header className="mb-20 max-w-3xl">
            <span className="block text-sm uppercase tracking-[0.35em] text-white/40 mb-6">
               Saúde e Segurança
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
              Mais saúde e segurança para sua jornada fitness
            </h2>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {concerns.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors duration-300 flex flex-col"
              >
                <div className="w-12 h-12 bg-yellow-400/10 rounded-2xl flex items-center justify-center text-yellow-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators Section with Feature Image */}
      <section className="py-32 px-6 lg:px-12 bg-zinc-900/50 relative">
        <div className="max-w-[1400px] mx-auto">
           {/* Section Header with Feature Image integrated */}
           <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
              <div className="space-y-8">
                <div>
                   <span className="block text-sm uppercase tracking-[0.35em] text-white/40 mb-6">
                     Diferenciais
                   </span>
                   <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[0.9]">
                     O que torna o <span className="text-yellow-400">Live Studio</span> único?
                   </h2>
                </div>
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500">
                  <Image 
                    src="/studio/feature-live.jpg" 
                    alt="Diferenciais Live Studio" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-12 lg:pt-8">
                 <p className="text-white/60 text-xl leading-relaxed">
                   Uma experiência completa que une a eficiência do personal trainer com a energia do ambiente de studio.
                 </p>
                 <div className="grid gap-8">
                    {differentiators.map((item, i) => (
                      <div key={i} className="flex gap-6 group">
                        <div className="shrink-0 pt-1">
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all">
                            <item.icon className="w-5 h-5" />
                          </div>
                        </div>
                        <div>
                           <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                           <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-20">
            <span className="block text-sm uppercase tracking-[0.35em] text-white/40 mb-4">
               Tira Dúvidas
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Perguntas frequentes
            </h2>
          </header>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-white/10 rounded-2xl bg-white/5 open:bg-white/10 transition-colors">
                <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-white">
                  <span className="text-lg pr-8">{faq.question}</span>
                  <span className="ml-auto shrink-0 transition-transform duration-300 group-open:-rotate-180">
                    <ChevronDown className="h-5 w-5 text-yellow-400" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-white/70 leading-relaxed whitespace-pre-line border-t border-white/5 pt-4 mt-2 mx-6">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Planos */}
      <section id="planos" className="py-32 px-6 lg:px-12 relative overflow-hidden">
        {/* Decorative background for pricing */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-900/5 to-transparent pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <header className="text-center mb-20">
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Adquira créditos e tenha acesso exclusivo ao Live Studio
             </h2>
             <p className="text-xl text-white/60 max-w-2xl mx-auto">
               Escolha o pacote que melhor se adequa aos seus objetivos, agende sua aula e comece sua transformação hoje mesmo.
             </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {plans.map((plan, i) => (
               <motion.div
                 key={i}
                 whileHover={{ y: -10 }}
                 className={`relative flex flex-col p-8 rounded-3xl border ${i >= 2 ? 'border-yellow-400/30 bg-gradient-to-b from-yellow-900/10 to-black' : 'border-white/10 bg-white/5'} backdrop-blur-md`}
               >
                 
                 <div className="mb-6">
                   <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                   <div className="text-yellow-400 font-bold text-xl">{plan.price}</div>
                   {plan.total && <div className="text-white/50 text-sm mt-1">{plan.total}</div>}
                 </div>

                 <div className="mt-auto pt-6 border-t border-white/10 space-y-3">
                   <div className="flex items-center gap-2 text-sm text-white/70">
                     <Clock3 className="w-4 h-4 text-yellow-400" />
                     {plan.detail}
                   </div>
                   <div className="flex items-center gap-2 text-sm text-white/70">
                     <Users className="w-4 h-4 text-yellow-400" />
                     Até 4 alunos
                   </div>
                 </div>

                 <button className={`w-full mt-6 py-3 rounded-xl font-bold text-sm transition-all ${i >= 2 ? 'bg-yellow-400 text-black hover:bg-yellow-300' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                   COMPRAR
                 </button>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact Block */}
      <footer className="py-20 px-6 lg:px-12 border-t border-white/10 bg-black pb-32">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               <img src={logoUrl} alt="LIVE STUDIO" className="h-10 w-auto" />
           </div>

           <div className="flex gap-8">
             {socialLinks.map((link, i) => (
               <a 
                 key={i} 
                 href={link.href} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-sm font-bold uppercase tracking-widest hover:text-yellow-400 transition-colors"
               >
                 {link.label}
               </a>
             ))}
           </div>
        </div>
      </footer>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-t border-white/10 py-4 px-6 lg:px-12 animate-in slide-in-from-bottom duration-500">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 h-10">
          <div className="text-center sm:text-left">
            <h3 className="text-white font-bold text-lg">Live Studio</h3>
            <p className="text-white/60 text-sm hidden sm:block">Treino VIP personalizado</p>
          </div>
        </div>
      </div>
    </main>
  )
}
