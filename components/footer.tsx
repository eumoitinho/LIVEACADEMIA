import Link from "next/link"
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from "lucide-react"
import LiveLogo from "./live-logo"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-6">
              <LiveLogo className="h-10 w-auto" />
            </Link>
            <p className="text-zinc-400 mb-6 leading-relaxed">
              Transforme seu corpo e sua vida na maior rede de academias de Manaus.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/liveacademiamanaus/"
                className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-amber-500 hover:text-black flex items-center justify-center transition-all duration-300"
              >
                <Instagram size={18} />
              </Link>
              <Link
                href="https://web.facebook.com/liveacademiamanaus"
                className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-amber-500 hover:text-black flex items-center justify-center transition-all duration-300"
              >
                <Facebook size={18} />
              </Link>
              <Link
                href="https://www.youtube.com/@liveacademiaoficial"
                className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-amber-500 hover:text-black flex items-center justify-center transition-all duration-300"
              >
                <Youtube size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Links Rápidos</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Unidades", href: "/unidades" },
                { name: "Planos", href: "/planos" },
                { name: "Aulas Coletivas", href: "/aulas-coletivas" },
                { name: "Day Use", href: "/day-use" },
                { name: "Trabalhe Conosco", href: "/trabalhe-conosco" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-zinc-400 hover:text-yellow-400 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-3 h-5 w-5 mt-0.5 flex-shrink-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                  <MapPin className="h-3 w-3 text-black" />
                </div>
                <span className="text-zinc-400">
                  Av. Djalma Batista, 1661 - Chapada
                  <br />
                  Manaus - AM, 69050-010
                </span>
              </li>
              <li className="flex items-center">
                <div className="mr-3 h-5 w-5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                  <Phone className="h-3 w-3 text-black" />
                </div>
                <span className="text-zinc-400">(92) 3345-6789</span>
              </li>
              <li className="flex items-center">
                <div className="mr-3 h-5 w-5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                  <Mail className="h-3 w-3 text-black" />
                </div>
                <span className="text-zinc-400">contato@liveacademia.com.br</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Horários</h3>
            <div className="bg-zinc-900/50 backdrop-blur-xl p-4 rounded-2xl border border-zinc-800/50">
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-zinc-400">Segunda - Sexta:</span>
                  <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent font-medium">05:00 - 23:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-zinc-400">Sábado:</span>
                  <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent font-medium">08:00 - 20:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-zinc-400">Domingo:</span>
                  <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent font-medium">08:00 - 14:00</span>
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Link href="/planos" className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black px-6 py-3 rounded-2xl font-semibold w-full text-center block transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25">
                Matricule-se
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Live Academia. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="/politica-de-privacidade"
              className="text-zinc-500 hover:text-yellow-400 text-sm transition-colors"
            >
              Política de Privacidade
            </Link>
            <Link href="/termos-de-uso" className="text-zinc-500 hover:text-yellow-400 text-sm transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
