"use client"

interface AnimatedPaymentCardProps {
  cardNumber?: string
  cardName?: string
  cardExpiry?: string
}

export default function AnimatedPaymentCard({
  cardNumber = '4628 9301 2457 1098',
  cardName = 'SEU NOME',
  cardExpiry = '08/27'
}: AnimatedPaymentCardProps) {
  return (
    <div className="relative w-[320px] h-[200px] md:w-[380px] md:h-[240px] bg-[#191f2e]/[.98] rounded-2xl overflow-hidden flex items-center"
         style={{boxShadow:'0 8px 40px 0 rgba(15,23,42,0.3),0 1.5px 10px 0 rgba(15,23,42,0.25)'}}>
      {/* Animated mesh gradients - Live Academia colors */}
      <div className="absolute top-1/2 left-1/2 w-[200px] h-[160px] rounded-full mesh1 pointer-events-none"
          style={{background:'linear-gradient(120deg,#ffcb00 92%,transparent 100%)',filter:'blur(24px)'}}></div>
      <div className="absolute top-1/2 left-1/2 w-[180px] h-[150px] rounded-full mesh2 pointer-events-none"
          style={{background:'linear-gradient(80deg,#ffd740 85%,transparent 100%)',filter:'blur(18px)'}}></div>
      <div className="absolute top-1/2 left-1/2 w-[160px] h-[120px] rounded-full mesh3 pointer-events-none"
          style={{background:'linear-gradient(145deg,rgba(255,255,255,0.25) 80%,transparent 100%)',filter:'blur(12px)'}}></div>
      <div className="absolute top-1/2 left-1/2 w-[90px] h-[100px] rounded-full mesh4 pointer-events-none"
          style={{background:'linear-gradient(95deg,#ffcb00 80%,transparent 100%)',filter:'blur(14px)'}}></div>

      {/* Card chip */}
      <div className="absolute top-6 left-6 flex flex-col items-center z-10">
        <svg width="46" height="32" viewBox="0 0 46 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-8">
          <rect x="1" y="1" width="44" height="30" rx="6" fill="#475569" stroke="#cbd5e1" strokeWidth="2"/>
          <rect x="7" y="7" width="32" height="18" rx="3" fill="#cbd5e1"/>
          <path d="M10.5,15 h25" stroke="#64748b" strokeWidth="1.1"/>
          <path d="M10.5,21 h25" stroke="#64748b" strokeWidth="1.1"/>
          <path d="M15,10 v12" stroke="#64748b" strokeWidth="1.1"/>
          <path d="M31,10 v12" stroke="#64748b" strokeWidth="1.1"/>
        </svg>
      </div>

      {/* Card logo - Live Academia */}
      <div className="absolute top-6 right-6 flex items-center z-10">
        <svg width="42" height="28" viewBox="0 0 42 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-7">
          <defs>
            <linearGradient id="logoGradient" x1="0" y1="0" x2="42" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffcb00"/>
              <stop offset="0.65" stopColor="#ffd740"/>
              <stop offset="1" stopColor="#ffcb00"/>
            </linearGradient>
          </defs>
          <path d="M6 22 Q21 2 36 22" stroke="url(#logoGradient)" strokeWidth="5" fill="none" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Card number */}
      <div className="absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full z-10">
        <span className="font-mono text-lg md:text-xl tracking-widest text-white/90 drop-shadow font-semibold select-none">
          {cardNumber || '•••• •••• •••• ••••'}
        </span>
      </div>

      {/* Cardholder and expiry */}
      <div className="absolute w-full left-0 flex justify-between items-end px-6 bottom-5 z-10">
        <div>
          <span className="block uppercase text-[10px] tracking-widest font-bold text-white/55 select-none">cardholder</span>
          <span className="block text-white/90 text-sm tracking-wide font-medium select-none">{cardName || 'SEU NOME'}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="uppercase text-[10px] tracking-widest font-bold text-white/55 select-none">expires</span>
          <span className="text-white/90 text-sm font-semibold select-none">{cardExpiry || 'MM/AA'}</span>
        </div>
      </div>

      <style jsx>{`
        .mesh1 { animation: mesh1 7s ease-in-out infinite alternate; }
        .mesh2 { animation: mesh2 6.3s ease-in-out infinite alternate; }
        .mesh3 { animation: mesh3 4.8s ease-in-out infinite alternate; }
        .mesh4 { animation: mesh4 8.2s ease-in-out infinite alternate; }

        @keyframes mesh1 {
          0%{transform:translate(-55%,-62%) scale(1);}
          33%{transform:translate(-38%,-46%) scale(1.34);}
          66%{transform:translate(-85%,-62%) scale(1.12);}
          100%{transform:translate(-55%,-62%) scale(1);}
        }
        @keyframes mesh2 {
          0%{transform:translate(-60%,-30%) scale(1);}
          30%{transform:translate(-42%,-32%) scale(1.27);}
          70%{transform:translate(-69%,-37%) scale(0.92);}
          100%{transform:translate(-60%,-30%) scale(1);}
        }
        @keyframes mesh3 {
          0%{transform:translate(-33%,-70%) scale(1);}
          40%{transform:translate(-18%,-33%) scale(0.82);}
          90%{transform:translate(-70%,-60%) scale(1.23);}
          100%{transform:translate(-33%,-70%) scale(1);}
        }
        @keyframes mesh4 {
          0%{transform:translate(-15%,-60%) scale(1);}
          50%{transform:translate(-49%,-67%) scale(1.36);}
          100%{transform:translate(-15%,-60%) scale(1);}
        }
      `}</style>
    </div>
  )
}
