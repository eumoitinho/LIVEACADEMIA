import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Live Academia | Rede de Academias em Manaus",
  description:
    "Transforme seu corpo e sua vida na maior rede de academias de Manaus. Sem fidelidade, sem anuidade, sem pegadinha.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-live-bg text-live-textPrimary">
          <Header />
          <div className="flex-grow">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
