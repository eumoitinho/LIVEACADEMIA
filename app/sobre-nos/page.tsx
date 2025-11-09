import { redirect } from 'next/navigation'

// Redireciona /sobre-nos para /sobre
export default function SobreNosPage() {
  redirect('/sobre')
}

