'use client'

import { useState } from 'react'

interface Plano {
  codigo: number
  nome: string
  valor: number | string
  mensalidade?: number
}

export default function AdminPlanosPage() {
  const [slug, setSlug] = useState('')
  const [planos, setPlanos] = useState<Plano[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const buscarPlanos = async () => {
    if (!slug.trim()) {
      setError('Digite um slug válido')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/sanity/planos/${slug}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao buscar planos')
      }

      setPlanos(data.planos || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  const copiarConfig = (plano: Plano) => {
    const config = {
      codigo: plano.codigo,
      nome: plano.nome,
      exibir: true,
      ordem: 0,
      destaque: false,
      badge: ''
    }

    navigator.clipboard.writeText(JSON.stringify(config, null, 2))
    alert('Configuração copiada! Cole no Sanity Studio.')
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px', color: '#333' }}>
        🔧 Admin: Buscar Planos da API
      </h1>

      <p style={{ marginBottom: '30px', color: '#666', fontSize: '16px' }}>
        Use esta página para ver os planos disponíveis na API e copiar as configurações para o Sanity Studio.
      </p>

      <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          Slug da Unidade:
        </label>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Ex: torres, centro, tradicional..."
            style={{
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              width: '300px'
            }}
          />
          <button
            onClick={buscarPlanos}
            disabled={loading}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: loading ? '#ccc' : '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Buscando...' : 'Buscar Planos'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{
          padding: '15px',
          backgroundColor: '#fee',
          border: '1px solid #f66',
          borderRadius: '4px',
          marginBottom: '20px',
          color: '#d00'
        }}>
          ❌ {error}
        </div>
      )}

      {planos.length > 0 && (
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
            📋 Planos Encontrados ({planos.length})
          </h2>

          <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '4px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#0066cc' }}>📝 Como usar:</h3>
            <ol style={{ margin: 0, paddingLeft: '20px' }}>
              <li>Clique em "Copiar Config" do plano que você quer</li>
              <li>Vá no Sanity Studio, na unidade</li>
              <li>No campo "Planos da API", clique em "Add item"</li>
              <li>Cole a configuração nos campos</li>
              <li>Ajuste destaque, ordem e badge conforme necessário</li>
            </ol>
          </div>

          <div style={{ display: 'grid', gap: '15px' }}>
            {planos.map((plano) => (
              <div
                key={plano.codigo}
                style={{
                  padding: '20px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#333' }}>
                      {plano.nome}
                    </h3>
                    <div style={{ display: 'flex', gap: '15px', fontSize: '14px', color: '#666' }}>
                      <span><strong>Código:</strong> #{plano.codigo}</span>
                      <span><strong>Valor:</strong> R$ {
                        typeof plano.valor === 'number'
                          ? plano.valor.toFixed(2)
                          : plano.valor
                      }</span>
                      {plano.mensalidade && (
                        <span><strong>Mensalidade:</strong> R$ {plano.mensalidade.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => copiarConfig(plano)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    📋 Copiar Config
                  </button>
                </div>

                <div style={{
                  backgroundColor: '#f8f9fa',
                  padding: '10px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  color: '#666'
                }}>
                  <strong>Para o Sanity:</strong> Código {plano.codigo} • Nome "{plano.nome}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>💡 Unidades disponíveis:</h3>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          torres, centro, tradicional, premium, diamante, cidade-de-deus, cachoeirinha, silves, planalto
        </p>
      </div>
    </div>
  )
}