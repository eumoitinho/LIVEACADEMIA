import Link from "next/link"
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from "lucide-react"
import LiveLogo from "./live-logo"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-6">
              <LiveLogo className="h-10 w-auto" />
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforme seu corpo e sua vida na maior rede de academias de Manaus.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://instagram.com/liveacademia"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#ffcb00] hover:text-black flex items-center justify-center transition-all duration-300"
              >
                <Instagram size={18} />
              </Link>
              <Link
                href="https://facebook.com/liveacademia"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#ffcb00] hover:text-black flex items-center justify-center transition-all duration-300"
              >
                <Facebook size={18} />
              </Link>
              <Link
                href="https://youtube.com/liveacademia"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#ffcb00] hover:text-black flex items-center justify-center transition-all duration-300"
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
                { name: "APP", href: "/app" },
                { name: "Trabalhe Conosco", href: "/trabalhe-conosco" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-[#ffcb00] transition-colors">
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
                <MapPin className="mr-3 h-5 w-5 text-[#ffcb00] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  Av. Djalma Batista, 1661 - Chapada
                  <br />
                  Manaus - AM, 69050-010
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-[#ffcb00]" />
                <span className="text-gray-400">(92) 3345-6789</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-[#ffcb00]" />
                <span className="text-gray-400">contato@liveacademia.com.br</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Horários</h3>
            <div className="app-card p-4">
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-400">Segunda - Sexta:</span>
                  <span className="text-white font-medium">05:00 - 23:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Sábado:</span>
                  <span className="text-white font-medium">08:00 - 20:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Domingo:</span>
                  <span className="text-white font-medium">08:00 - 14:00</span>
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Link href="/planos" className="btn-primary w-full text-center">
                Matricule-se
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Live Academia. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="/politica-de-privacidade"
              className="text-gray-500 hover:text-[#ffcb00] text-sm transition-colors"
            >
              Política de Privacidade
            </Link>
            <Link href="/termos-de-uso" className="text-gray-500 hover:text-[#ffcb00] text-sm transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
