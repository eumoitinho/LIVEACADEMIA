"use client"

import Link from "next/link"
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail, BadgeCheck, Check, Send, Github, Twitter, Linkedin } from "lucide-react"
import LiveLogo from "@/components/shared/live-logo"
import ScrollToTopButton from '@/components/layout/scroll-to-top-button'
import { useNavigationData } from "../../../hooks/use-sanity-data"

export default function Footer() {
  const { data: navigationData, loading } = useNavigationData()

  const footerData = navigationData?.footer
  const aboutSection = footerData?.about
  const footerSections = footerData?.sections?.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) || []
  const socialMedia = footerData?.socialMedia
  const copyright = footerData?.copyright

  // Icons mapping for social media
  const socialIconMap: { [key: string]: any } = {
    instagram: Instagram,
    facebook: Facebook,
    youtube: Youtube,
    twitter: Twitter,
    linkedin: Linkedin,
  }

  return (
    <footer className="w-full sm:px-6 md:px-10 max-w-7xl mr-auto ml-auto pt-12 pr-4 pb-10 pl-4">
      <div className="relative overflow-hidden bg-neutral-900 rounded-3xl">
        <div className="relative z-10 sm:p-12 md:p-16 pt-12 pr-8 pb-8 pl-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2 mb-4">
                <BadgeCheck className="w-5 h-5 text-yellow-400" />
                <h3 className="text-2xl font-semibold text-white tracking-tight">{aboutSection?.title || 'Live Academia'}</h3>
              </div>
              <p className="text-white/70 max-w-3xl">{aboutSection?.description || 'Transforme seu corpo e sua vida na maior rede de academias de Manaus. Conte conosco para sua jornada fitness.'}</p>

              <div id="contact" className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-yellow-400/10 text-yellow-300 ring-1 ring-yellow-300/20 px-2.5 py-1 text-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
                      Matricule-se Agora
                    </div>
                    <h4 className="text-white font-semibold tracking-tight">Comece sua transformação</h4>
                    <ul className="space-y-2 text-sm text-neutral-300">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-yellow-400 mt-0.5" />
                        <span>Sem fidelidade, sem anuidade, sem pegadinhas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-yellow-400 mt-0.5" />
                        <span>Equipamentos de última geração</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-yellow-400 mt-0.5" />
                        <span>Profissionais qualificados</span>
                      </li>
                    </ul>
                    <div className="flex items-center gap-3 pt-2 text-sm">
                      <a href="mailto:contato@liveacademia.com.br"
                        className="inline-flex items-center gap-2 text-white hover:text-yellow-300 transition">
                        <Mail className="w-4 h-4" />
                        contato@liveacademia.com.br
                      </a>
                      <span className="text-white/20">•</span>
                      <a href="tel:+559233456789"
                        className="inline-flex items-center gap-2 text-white hover:text-yellow-300 transition">
                        <Phone className="w-4 h-4" />
                        (92) 3345-6789
                      </a>
                    </div>
                  </div>

                  <form id="contact-form" className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-1">
                      <label htmlFor="name" className="block text-xs font-medium text-white/80 mb-1">Seu nome</label>
                      <input id="name" name="name" type="text" required placeholder="João Silva" className="w-full placeholder-white/40 outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-yellow-300 transition text-sm text-white bg-white/10 border-white/10 border rounded-xl pt-2.5 pr-3 pb-2.5 pl-3" />
                    </div>
                    <div className="sm:col-span-1">
                      <label htmlFor="email" className="block text-xs font-medium text-white/80 mb-1">Email</label>
                      <input id="email" name="email" type="email" required placeholder="joao@email.com" className="w-full placeholder-white/40 outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-yellow-300 transition text-sm text-white bg-white/10 border-white/10 border rounded-xl pt-2.5 pr-3 pb-2.5 pl-3" />
                    </div>
                    <div className="sm:col-span-1">
                      <label htmlFor="phone" className="block text-xs font-medium text-white/80 mb-1">Telefone</label>
                      <input id="phone" name="phone" type="tel" placeholder="(92) 99999-9999" className="w-full placeholder-white/40 outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-yellow-300 transition text-sm text-white bg-white/10 border-white/10 border rounded-xl pt-2.5 pr-3 pb-2.5 pl-3" />
                    </div>
                    <div className="sm:col-span-1">
                      <label htmlFor="interest" className="block text-xs font-medium text-white/80 mb-1">Interesse</label>
                      <select id="interest" name="interest" className="w-full appearance-none outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-yellow-300 transition text-sm text-white bg-white/10 border-white/10 border rounded-xl pt-2.5 pr-3 pb-2.5 pl-3">
                        <option className="bg-neutral-900" value="musculacao">Musculação</option>
                        <option className="bg-neutral-900" value="crossfit">Crossfit</option>
                        <option className="bg-neutral-900" value="pilates">Pilates</option>
                        <option className="bg-neutral-900" value="natacao">Natação</option>
                        <option className="bg-neutral-900" value="outros">Outros</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="block text-xs font-medium text-white/80 mb-1">Mensagem</label>
                      <textarea id="message" name="message" rows={4} placeholder="Conte-nos um pouco sobre seus objetivos..." className="w-full placeholder-white/40 outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-yellow-300 transition text-sm text-white bg-white/10 border-white/10 border rounded-xl pt-2.5 pr-3 pb-2.5 pl-3"></textarea>
                    </div>
                    <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex gap-2 text-xs text-white/70 items-center">
                        <input id="newsletter" name="newsletter" type="checkbox" className="h-4 w-4 rounded bg-white/10 border-white/20 text-yellow-400 focus:ring-yellow-400/60" />
                        <label htmlFor="newsletter">Quero receber novidades e promoções</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="submit" className="inline-flex gap-2 ring-1 ring-yellow-300 hover:bg-yellow-300 transition text-sm font-medium text-neutral-900 bg-yellow-400 rounded-xl pt-2.5 pr-4 pb-2.5 pl-4 shadow items-center">
                          <Send className="w-4 h-4" />
                          Enviar mensagem
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 pt-12">
            {footerSections.map((section: any, index: number) => (
              <div key={index}>
                <h4 className="text-white/80 text-xs uppercase tracking-[0.2em]">{section.title}</h4>
                <ul className="mt-3 space-y-2 text-sm">
                  {section.links?.map((link: any, linkIndex: number) => (
                    <li key={linkIndex}>
                      {link.external ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-300 hover:text-white transition inline-flex items-center gap-2"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.url}
                          className="text-neutral-300 hover:text-white transition inline-flex items-center gap-2"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {socialMedia && (
              <div>
                <h4 className="uppercase text-xs text-white/80 tracking-[0.2em]">{socialMedia.title || 'Redes Sociais'}</h4>
                <div className="mt-4 flex items-center gap-3">
                  {socialMedia.links
                    ?.filter((social: any) => social.show !== false)
                    ?.map((social: any, index: number) => {
                      const IconComponent = socialIconMap[social.platform] || Instagram
                      return (
                        <a
                          key={index}
                          href={social.url}
                          aria-label={social.platform}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
                        >
                          <IconComponent className="w-[16px] h-[16px]" />
                        </a>
                      )
                    })}
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-white/60 text-sm">
              {copyright?.text?.replace('{year}', new Date().getFullYear().toString()) ||
               `© ${new Date().getFullYear()} ${copyright?.companyName || 'Live Academia'}. Todos os direitos reservados.`}
            </p>
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <Link href="/politica-de-privacidade" className="hover:text-white transition">Privacidade</Link>
              <span className="hidden sm:block text-white/20">•</span>
              <Link href="/termos-de-uso" className="hover:text-white transition">Termos</Link>
              <span className="hidden sm:block text-white/20">•</span>
              <ScrollToTopButton />
            </div>
          </div>
        </div>

        {/* Decorative glows */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-16 -right-10 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl"></div>
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-10 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl"></div>
      </div>
    </footer>
  )
}
