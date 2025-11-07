import HomepageEditable from '@/src/components/homepage-editable'

export default function Home() {
  return <HomepageEditable />
}

// Forçar atualização dinâmica e desabilitar cache para ver mudanças do Sanity imediatamente
export const dynamic = 'force-dynamic'
export const revalidate = 0 // Sem cache - sempre buscar dados atualizados
export const fetchCache = 'force-no-store' // Forçar busca sem cache
