import SectionsRenderer from '@/components/cms/section-renderer'
import FloatingButton from '@/components/floating-button'
import { getHomePage } from '@/lib/cms'

export const revalidate = 60

export default async function Home() {
  const page = await getHomePage()
  const sections = page?.sections || []

  return (
    <main className="min-h-screen relative">
      {sections.length ? (
        <SectionsRenderer sections={sections} />
      ) : (
        <div className="max-w-4xl mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl font-semibold text-white mb-4">Sem conteúdo ainda</h1>
          <p className="text-white/60 mb-8">Crie um documento <code className="px-1.5 py-0.5 bg-white/10 rounded">page</code> com slug <strong>home</strong> no Sanity Studio (<code>/studio</code>) e adicione seções.</p>
          <div className="text-xs text-white/40">(Este fallback desaparece assim que o CMS tiver dados.)</div>
        </div>
      )}
      <FloatingButton />
    </main>
  )
}
