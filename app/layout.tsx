import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { UnitProvider } from "@/contexts/unit-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Live Academia | Rede de Academias em Manaus",
  description:
    "Transforme seu corpo e sua vida na maior rede de academias de Manaus. Sem fidelidade, sem anuidade, sem pegadinha.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
    return (
      <html lang="pt-BR">
        <head>
          <script src="https://api.tracking.ninetwo.com.br/script/live-academia" async></script>
        </head>
        <body className={inter.className}>
          <UnitProvider>
            <div className="min-h-screen flex flex-col bg-live-bg text-live-textPrimary">
              <Header />
              <div className="flex-grow">{children}</div>
              <Footer />
            </div>
          </UnitProvider>
        </body>
      </html>
    )
}
