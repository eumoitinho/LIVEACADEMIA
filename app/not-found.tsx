export default function NotFound() {
  return (
    <div className="min-h-screen bg-live-bg text-live-textPrimary flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
        <p className="text-live-textSecondary">A página que você está procurando não existe.</p>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'