'use client'

import React, { useState, useEffect } from 'react'
import { StringInputProps, set, unset } from 'sanity'

interface PlanoAPI {
  codigo: number
  nome: string
  valor: number | string
  mensalidade?: number
}

interface PlanoConfig {
  codigo: number
  nome: string
  exibir: boolean
  destaque: boolean
  ordem: number
  badge?: string
  tituloCustomizado?: string
  descricaoCustomizada?: string
  textoMatricular?: string
  beneficiosCustomizados?: string[]
}

export function PlanosConfigInput(props: StringInputProps) {
  const { onChange, value = '[]' } = props
  const [planosAPI, setPlanosAPI] = useState<PlanoAPI[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Parse do valor atual (JSON string)
  const configAtual: PlanoConfig[] = React.useMemo(() => {
    try {
      return JSON.parse(value || '[]')
    } catch {
      return []
    }
  }, [value])

  // Buscar planos da API
  useEffect(() => {
    const buscarPlanos = async () => {
      setLoading(true)
      setError(null)
      try {
        // Detectar o slug da unidade atual do documento
        const unidadeSlug = (props as any)?.document?.slug?.current || 'camapua'
        console.log(`Buscando planos para unidade: ${unidadeSlug}`)
        const response = await fetch(`/api/pacto-v3/planos/${unidadeSlug}`)

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        console.log('Planos recebidos:', data)
        setPlanosAPI(data.planos || [])
      } catch (err: any) {
        console.error('Erro ao buscar planos:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    buscarPlanos()
  }, [])

  const handleTogglePlano = (plano: PlanoAPI) => {
    const existe = configAtual.find(p => p.codigo === plano.codigo)
    let novaConfig: PlanoConfig[]

    if (existe) {
      // Remove o plano
      novaConfig = configAtual.filter(p => p.codigo !== plano.codigo)
    } else {
      // Adiciona o plano
      const novoPlano: PlanoConfig = {
        codigo: plano.codigo,
        nome: plano.nome,
        exibir: true,
        destaque: false,
        ordem: configAtual.length,
        badge: undefined,
        tituloCustomizado: undefined,
        descricaoCustomizada: undefined,
        textoMatricular: 'Matricular',
        beneficiosCustomizados: undefined
      }
      novaConfig = [...configAtual, novoPlano]
    }

    const jsonString = JSON.stringify(novaConfig, null, 2)
    onChange(jsonString ? set(jsonString) : unset())
  }

  const handleUpdateConfig = (codigo: number, updates: Partial<PlanoConfig>) => {
    const novaConfig = configAtual.map(p =>
      p.codigo === codigo ? { ...p, ...updates } : p
    )
    const jsonString = JSON.stringify(novaConfig, null, 2)
    onChange(set(jsonString))
  }

  const isPlanoSelecionado = (codigo: number) => {
    return configAtual.some(p => p.codigo === codigo)
  }

  return (
    <div style={{ padding: '16px', border: '1px solid #e1e5e9', borderRadius: '4px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold' }}>
        Configuração de Planos da API
      </h3>

      {loading && (
        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
          Carregando planos da API...
        </div>
      )}

      {error && (
        <div style={{
          padding: '12px',
          backgroundColor: '#fee',
          border: '1px solid #fcc',
          borderRadius: '4px',
          color: '#c00',
          marginBottom: '16px'
        }}>
          Erro: {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Planos da API */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Planos Disponíveis ({planosAPI.length})
            </h4>
            <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '4px' }}>
              {planosAPI.map(plano => (
                <div
                  key={plano.codigo}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    borderBottom: '1px solid #eee',
                    backgroundColor: isPlanoSelecionado(plano.codigo) ? '#e8f5e8' : 'white',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleTogglePlano(plano)}
                >
                  <input
                    type="checkbox"
                    checked={isPlanoSelecionado(plano.codigo)}
                    readOnly
                    style={{ marginRight: '8px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <strong>{plano.nome}</strong>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      #{plano.codigo} • R$ {typeof plano.valor === 'number' ? plano.valor.toFixed(2) : plano.valor}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Configuração dos Planos Selecionados */}
          {configAtual.length > 0 && (
            <div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>
                Planos Configurados ({configAtual.length})
              </h4>
              {configAtual.map(config => (
                <div key={config.codigo} style={{
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  marginBottom: '8px',
                  backgroundColor: config.destaque ? '#fff8dc' : 'white'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong>{config.nome}</strong>
                    <button
                      onClick={() => handleTogglePlano({ codigo: config.codigo, nome: config.nome, valor: 0 })}
                      style={{
                        padding: '4px 8px',
                        background: '#ff4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Remover
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                    <label style={{ fontSize: '12px' }}>
                      <input
                        type="checkbox"
                        checked={config.destaque}
                        onChange={(e) => handleUpdateConfig(config.codigo, { destaque: e.target.checked })}
                      />
                      {' '}Destaque
                    </label>

                    <label style={{ fontSize: '12px' }}>
                      Ordem:
                      <input
                        type="number"
                        value={config.ordem}
                        onChange={(e) => handleUpdateConfig(config.codigo, { ordem: parseInt(e.target.value) || 0 })}
                        style={{ width: '60px', marginLeft: '4px', padding: '2px' }}
                      />
                    </label>

                    <label style={{ fontSize: '12px' }}>
                      Badge:
                      <select
                        value={config.badge || ''}
                        onChange={(e) => handleUpdateConfig(config.codigo, { badge: e.target.value || undefined })}
                        style={{ marginLeft: '4px', padding: '2px' }}
                      >
                        <option value="">Sem badge</option>
                        <option value="MAIS VENDIDO">Mais vendido</option>
                        <option value="RECOMENDADO">Recomendado</option>
                        <option value="NOVIDADE">Novidade</option>
                      </select>
                    </label>
                  </div>

                  {/* Campos de Customização */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                    <label style={{ fontSize: '12px' }}>
                      Nome Customizado:
                      <input
                        type="text"
                        value={config.tituloCustomizado || ''}
                        onChange={(e) => handleUpdateConfig(config.codigo, { tituloCustomizado: e.target.value || undefined })}
                        placeholder={config.nome}
                        style={{ width: '100%', marginTop: '2px', padding: '4px', fontSize: '12px' }}
                      />
                    </label>

                    <label style={{ fontSize: '12px' }}>
                      Texto do Botão:
                      <input
                        type="text"
                        value={config.textoMatricular || 'Matricular'}
                        onChange={(e) => handleUpdateConfig(config.codigo, { textoMatricular: e.target.value || 'Matricular' })}
                        style={{ width: '100%', marginTop: '2px', padding: '4px', fontSize: '12px' }}
                      />
                    </label>
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ fontSize: '12px', display: 'block' }}>
                      Descrição Customizada:
                      <textarea
                        value={config.descricaoCustomizada || ''}
                        onChange={(e) => handleUpdateConfig(config.codigo, { descricaoCustomizada: e.target.value || undefined })}
                        placeholder="Descrição personalizada para o card"
                        style={{ width: '100%', marginTop: '2px', padding: '4px', fontSize: '12px', resize: 'vertical' }}
                        rows={2}
                      />
                    </label>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', display: 'block' }}>
                      Benefícios Personalizados (um por linha):
                      <textarea
                        value={config.beneficiosCustomizados?.join('\n') || ''}
                        onChange={(e) => {
                          const beneficios = e.target.value.split('\n').filter(b => b.trim())
                          handleUpdateConfig(config.codigo, { beneficiosCustomizados: beneficios.length > 0 ? beneficios : undefined })
                        }}
                        placeholder="Sem taxa de matrícula&#10;Sem fidelidade&#10;Acesso completo ao app"
                        style={{ width: '100%', marginTop: '2px', padding: '4px', fontSize: '12px', resize: 'vertical' }}
                        rows={3}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Valor JSON para debug */}
          <details style={{ marginTop: '16px' }}>
            <summary style={{ fontSize: '12px', color: '#666', cursor: 'pointer' }}>
              Ver JSON (debug)
            </summary>
            <pre style={{
              fontSize: '10px',
              backgroundColor: '#f5f5f5',
              padding: '8px',
              borderRadius: '4px',
              overflow: 'auto',
              maxHeight: '150px'
            }}>
              {value || '[]'}
            </pre>
          </details>
        </>
      )}
    </div>
  )
}