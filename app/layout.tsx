import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ConditionalHeader from '@/src/components/layout/conditional-header'
import Footer from '@/components/layout/footer'
import { UnitProvider } from "@/contexts/unit-context"
import GTM from '@/src/components/analytics/gtm'

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
      <html lang="pt-BR" suppressHydrationWarning>
        <head>
          {/* Google Tag Manager */}
          <GTM gtmId={process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'} />
          
          <script src="https://api.tracking.ninetwo.com.br/script/live-academia" async></script>
          <script dangerouslySetInnerHTML={{
            __html: `
              /* Animações on scroll quando visível */
              (function () {
                // Injeta CSS para estados paused/running
                const style = document.createElement("style");
                style.textContent = \`
                  /* Default: paused */
                  .animate-on-scroll { animation-play-state: paused !important; }
                  /* Ativado por JS */
                  .animate-on-scroll.animate { animation-play-state: running !important; }
                \`;
                document.head.appendChild(style);

                const once = true;

                if (!window.__inViewIO) {
                  window.__inViewIO = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                        entry.target.classList.add("animate");
                        if (once) window.__inViewIO.unobserve(entry.target);
                      }
                    });
                  }, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
                }

                window.initInViewAnimations = function (selector = ".animate-on-scroll") {
                  document.querySelectorAll(selector).forEach((el) => {
                    window.__inViewIO.observe(el); // observar duas vezes é um no-op
                  });
                };

                document.addEventListener("DOMContentLoaded", () => initInViewAnimations());
              })();
            `
          }} />
        </head>
        <body className={`${inter.className} min-h-screen antialiased overflow-x-hidden text-white bg-neutral-950`}>
          <UnitProvider>
                {/* Background parallax - hero.jpg com blur progressivo */}
                <div 
                  className="fixed top-0 w-full h-screen bg-cover bg-center -z-10" 
                  style={{
                    backgroundImage: "url('/hero.jpg')",
                    animation: "scrollBlur linear both",
                    animationTimeline: "view()",
                    animationRange: "entry 100% exit 50%"
                  }}
                />
            
            <div className="relative z-20 min-h-screen flex flex-col">
              <ConditionalHeader />
              <div className="flex-grow">{children}</div>
              <Footer />
            </div>
          </UnitProvider>
        </body>
      </html>
    )
}
