// app/components/live-logo.tsx (Mantido igual, mas ajustado para nova cor se necessário)
export default function LiveLogo({ className = "h-10 w-auto" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 154.31 53.48" className={className}>
      <g>
        <polygon
          fill="#ffcb00"
          points="110.88 3.6 96.44 21.48 90.7 3.6 80.36 3.6 90.31 34.65 97.07 34.65 122.17 3.6 110.88 3.6"
        ></polygon>
        <polygon
          fill="#ffcb00"
          points="152.26 11.57 154.31 3.6 122.9 3.6 115.06 34.65 146.68 34.65 148.73 26.68 126.98 26.68 128.01 22.58 147.05 22.58 149.1 14.61 130.02 14.61 130.78 11.57 152.26 11.57"
        ></polygon>
        <path
          fill="#ffcb00"
          d="m40.9,25.53l4.58-20.82c-3.43,1.82-11.57,6.16-11.85,8.61l-4.71,21.33h29.68l2.05-9.12h-19.76Z"
        ></path>
        <polygon fill="#ffcb00" points="61.45 34.65 71.4 34.65 79.24 3.6 69.29 3.6 61.45 34.65"></polygon>
        <path
          fill="#000"
          d="m0,34.73c.28-.03,1.21,0,1.49,0h17.19c-.13-2.15-.19-10.68,5.37-16.29C33.4,9.02,46.97,2.48,50.32,1.55,47.07,1.43,5.84,9.84,0,34.73Z"
        ></path>
        <path
          fill="#000"
          d="m.29,7.81c0,4.31,3.36,7.81,7.5,7.81s7.5-3.5,7.5-7.81S11.94,0,7.79,0,.29,3.5.29,7.81Z"
        ></path>
      </g>
    </svg>
  )
}