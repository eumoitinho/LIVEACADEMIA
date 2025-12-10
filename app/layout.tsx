import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { UnitProvider } from "@/contexts/unit-context"
import GTM from '@/src/components/analytics/gtm'
import { VisualEditing } from "next-sanity/visual-editing"
import { DisableDraftMode } from "@/components/DisableDraftMode"
import { SanityLive } from "@/lib/sanity-live"
import { draftMode } from "next/headers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Live Academia | Rede de Academias em Manaus",
  description:
    "Transforme seu corpo e sua vida na maior rede de academias de Manaus. Sem fidelidade, sem anuidade, sem pegadinha.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
    return (
      <html lang="pt-BR" suppressHydrationWarning>
        <head>
          {/* Google Tag Manager */}
          <GTM gtmId={process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'} />
          
          {/* Widget de Chat */}
          <script 
            type="application/javascript" 
            src="https://cdn.oihe.in/scripts/widget/v2/h-widget-min.js" 
            data-companyid="fe8c1ee1-1719-417c-8f76-1f3dde7cce83" 
            data-widgetid="92358358-493a-4600-bfc7-41941aa88bc5"
            async
          />
          <link 
            href="https://cdn.oihe.in/scripts/widget/v2/h-widget-min.css?v=2" 
            rel="stylesheet" 
          />
          
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
            <div className="relative min-h-screen flex flex-col">
              <Header />
              <div className="flex-grow">{children}</div>
              <Footer />
            </div>
          </UnitProvider>
          <SanityLive />
          {(await draftMode()).isEnabled && (
            <>
              <VisualEditing />
              <DisableDraftMode />
            </>
          )}
        </body>
      </html>
    )
}
