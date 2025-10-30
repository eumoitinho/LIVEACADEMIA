import React, { useState } from 'react'
import { useFormValue } from 'sanity'
import type { ArrayOfObjectsInputProps } from 'sanity'

interface Plano {
  codigo: number
  nome: string
  valor: number | string
  categoria?: string
}

export function PlanosSelector(props: ArrayOfObjectsInputProps) {
  const [planos, setPlanos] = useState<Plano[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Pegar o slug da unidade atual do formulário
  const slug = useFormValue(['slug', 'current']) as string

  const fetchPlanos = async () => {
    if (!slug) {
      setError('Slug da unidade não encontrado')
      return
    }

    setLoading(true)
    setError(null)

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

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <strong>Planos disponíveis da API</strong>
        <button
          onClick={fetchPlanos}
          disabled={!slug || loading}
          style={{
            padding: '8px 16px',
            backgroundColor: slug && !loading ? '#3b82f6' : '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: slug && !loading ? 'pointer' : 'not-allowed'
          }}
        >
          {loading ? 'Carregando...' : 'Buscar Planos'}
        </button>
      </div>

      {!slug && (
        <div style={{
          padding: '12px',
          backgroundColor: '#fef3c7',
          border: '1px solid #f59e0b',
          borderRadius: '4px',
          marginBottom: '16px'
        }}>
          <small>Salve a unidade com um slug primeiro para buscar os planos</small>
        </div>
      )}

      {error && (
        <div style={{
          padding: '12px',
          backgroundColor: '#fee2e2',
          border: '1px solid #ef4444',
          borderRadius: '4px',
          marginBottom: '16px'
        }}>
          <small style={{ color: '#dc2626' }}>{error}</small>
        </div>
      )}

      {loading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div>Carregando planos...</div>
        </div>
      )}

      {planos.length > 0 && (
        <div style={{
          padding: '16px',
          backgroundColor: '#dbeafe',
          border: '1px solid #3b82f6',
          borderRadius: '4px',
          marginBottom: '16px'
        }}>
          <div style={{ marginBottom: '12px' }}>
            <strong>Planos encontrados na API:</strong>
          </div>
          {planos.map((plano) => (
            <div key={plano.codigo} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '8px',
              padding: '8px',
              backgroundColor: 'white',
              borderRadius: '4px'
            }}>
              <code style={{
                backgroundColor: '#f3f4f6',
                padding: '2px 6px',
                borderRadius: '3px',
                fontWeight: 'bold'
              }}>
                #{plano.codigo}
              </code>
              <span>
                {plano.nome} - R$ {typeof plano.valor === 'number' ? plano.valor.toFixed(2) : plano.valor}
              </span>
            </div>
          ))}
          <small style={{ color: '#6b7280', fontStyle: 'italic' }}>
            Use os códigos acima para configurar os planos na seção abaixo.
          </small>
        </div>
      )}

      {/* Renderizar o componente padrão do array */}
      {props.renderDefault(props)}
    </div>
  )
}