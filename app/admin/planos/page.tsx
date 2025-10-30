'use client'

import { useState, useEffect } from 'react'

interface Plano {
  codigo: number
  nome: string
  valor: number | string
  mensalidade?: number
}

interface PlanoConfig {
  codigo: number
  nome: string
  exibir: boolean
  ordem: number
  destaque: boolean
  badge?: string
}

const UNIDADES = [
  'torres', 'centro', 'tradicional', 'premium', 'diamante',
  'cidade-de-deus', 'cachoeirinha', 'silves', 'planalto'
]

const BADGES = [
  { value: '', label: 'Sem badge' },
  { value: 'MAIS VENDIDO', label: '🔥 Mais vendido' },
  { value: 'RECOMENDADO', label: '👑 Recomendado' },
  { value: 'NOVIDADE', label: '✨ Novidade' },
  { value: 'OFERTA', label: '💰 Oferta' },
  { value: 'PROMOÇÃO', label: '🎯 Promoção' },
]

export default function AdminPlanosPage() {
  const [unidadeSelecionada, setUnidadeSelecionada] = useState('torres')
  const [planosApi, setPlanosApi] = useState<Plano[]>([])
  const [configSalva, setConfigSalva] = useState<PlanoConfig[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  // Buscar planos da API para a unidade selecionada
  const buscarPlanosApi = async (slug: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/pacto-v3/planos/${slug}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao buscar planos')
      }

      setPlanosApi(data.planos || [])
    } catch (error) {
      console.error('Erro ao buscar planos:', error)
      setMessage('❌ Erro ao buscar planos da API')
    } finally {
      setLoading(false)
    }
  }

  // Buscar configuração salva para a unidade
  const buscarConfigSalva = async (slug: string) => {
    try {
      const response = await fetch(`/api/admin/planos-config/${slug}`)
      const data = await response.json()
      setConfigSalva(data.config || [])
    } catch (error) {
      console.error('Erro ao buscar configuração:', error)
    }
  }

  // Salvar configuração
  const salvarConfig = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/admin/planos-config/${unidadeSelecionada}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: configSalva })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao salvar')
      }

      setMessage('✅ Configuração salva com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar:', error)
      setMessage('❌ Erro ao salvar configuração')
    } finally {
      setSaving(false)
    }
  }

  // Verificar se um plano está na configuração
  const isPlanoConfigurado = (codigo: number) => {
    return configSalva.some(p => p.codigo === codigo)
  }

  // Obter configuração de um plano
  const getPlanoConfig = (codigo: number) => {
    return configSalva.find(p => p.codigo === codigo)
  }

  // Adicionar/remover plano da configuração
  const togglePlano = (plano: Plano) => {
    if (isPlanoConfigurado(plano.codigo)) {
      // Remover
      setConfigSalva(prev => prev.filter(p => p.codigo !== plano.codigo))
    } else {
      // Adicionar
      const novoPlano: PlanoConfig = {
        codigo: plano.codigo,
        nome: plano.nome,
        exibir: true,
        ordem: configSalva.length,
        destaque: false,
        badge: ''
      }
      setConfigSalva(prev => [...prev, novoPlano])
    }
  }

  // Atualizar configuração de um plano
  const updatePlanoConfig = (codigo: number, updates: Partial<PlanoConfig>) => {
    setConfigSalva(prev =>
      prev.map(p => p.codigo === codigo ? { ...p, ...updates } : p)
    )
  }

  // Carregar dados quando a unidade muda
  useEffect(() => {
    buscarPlanosApi(unidadeSelecionada)
    buscarConfigSalva(unidadeSelecionada)
  }, [unidadeSelecionada])

  // Limpar mensagem após 3 segundos
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000)
      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '10px', color: '#333' }}>
          🔧 Administração de Planos por Unidade
        </h1>
        <p style={{ color: '#666', fontSize: '16px' }}>
          Configure quais planos aparecem em cada unidade, ordem de exibição e destaques.
        </p>
      </div>

      {/* Seleção de Unidade */}
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
        <label style={{ fontWeight: 'bold', minWidth: '120px' }}>
          Unidade:
        </label>
        <select
          value={unidadeSelecionada}
          onChange={(e) => setUnidadeSelecionada(e.target.value)}
          style={{
            padding: '12px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            minWidth: '200px'
          }}
        >
          {UNIDADES.map(unidade => (
            <option key={unidade} value={unidade}>
              {unidade.charAt(0).toUpperCase() + unidade.slice(1).replace('-', ' ')}
            </option>
          ))}
        </select>

        <button
          onClick={() => buscarPlanosApi(unidadeSelecionada)}
          disabled={loading}
          style={{
            padding: '12px 24px',
            backgroundColor: loading ? '#ccc' : '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Carregando...' : 'Atualizar Planos'}
        </button>
      </div>

      {/* Mensagem */}
      {message && (
        <div style={{
          padding: '15px',
          backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
          border: `1px solid ${message.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '4px',
          marginBottom: '20px',
          color: message.includes('✅') ? '#155724' : '#721c24'
        }}>
          {message}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Coluna 1: Planos Disponíveis na API */}
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
            📡 Planos da API ({planosApi.length})
          </h2>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              Carregando planos...
            </div>
          ) : planosApi.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              Nenhum plano encontrado
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '12px' }}>
              {planosApi.map(plano => {
                const configurado = isPlanoConfigurado(plano.codigo)
                return (
                  <div
                    key={plano.codigo}
                    style={{
                      padding: '15px',
                      border: `2px solid ${configurado ? '#28a745' : '#ddd'}`,
                      borderRadius: '8px',
                      backgroundColor: configurado ? '#f8fff9' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onClick={() => togglePlano(plano)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#333' }}>
                          {configurado ? '✅' : '⚪'} {plano.nome}
                        </h3>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                          <span>#{plano.codigo}</span> •
                          <span> R$ {typeof plano.valor === 'number' ? plano.valor.toFixed(2) : plano.valor}</span>
                        </div>
                      </div>
                      <div style={{
                        padding: '4px 12px',
                        backgroundColor: configurado ? '#28a745' : '#6c757d',
                        color: 'white',
                        borderRadius: '20px',
                        fontSize: '12px'
                      }}>
                        {configurado ? 'ATIVO' : 'CLIQUE PARA ATIVAR'}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Coluna 2: Configuração dos Planos Selecionados */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '24px', color: '#333', margin: 0 }}>
              ⚙️ Configuração ({configSalva.length})
            </h2>
            {configSalva.length > 0 && (
              <button
                onClick={salvarConfig}
                disabled={saving}
                style={{
                  padding: '10px 20px',
                  backgroundColor: saving ? '#ccc' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {saving ? 'Salvando...' : '💾 Salvar Configuração'}
              </button>
            )}
          </div>

          {configSalva.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#666',
              border: '2px dashed #ddd',
              borderRadius: '8px'
            }}>
              Selecione planos na coluna ao lado para configurar
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {configSalva
                .sort((a, b) => a.ordem - b.ordem)
                .map(config => (
                <div
                  key={config.codigo}
                  style={{
                    padding: '20px',
                    border: `2px solid ${config.destaque ? '#ffc107' : '#28a745'}`,
                    borderRadius: '8px',
                    backgroundColor: config.destaque ? '#fff9c4' : '#f8fff9'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#333' }}>
                      {config.destaque ? '⭐' : '✅'} {config.nome}
                    </h3>
                    <button
                      onClick={() => togglePlano({ codigo: config.codigo, nome: config.nome, valor: 0 })}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      ❌ Remover
                    </button>
                  </div>

                  <div style={{ display: 'grid', gap: '10px' }}>
                    {/* Destaque */}
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={config.destaque}
                        onChange={(e) => updatePlanoConfig(config.codigo, { destaque: e.target.checked })}
                      />
                      <span style={{ fontSize: '14px' }}>⭐ Plano em destaque (aparece nos cards principais)</span>
                    </label>

                    {/* Ordem */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <label style={{ fontSize: '14px', minWidth: '60px' }}>📊 Ordem:</label>
                      <input
                        type="number"
                        value={config.ordem}
                        onChange={(e) => updatePlanoConfig(config.codigo, { ordem: parseInt(e.target.value) || 0 })}
                        style={{
                          padding: '4px 8px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          width: '80px'
                        }}
                        min="0"
                      />
                      <span style={{ fontSize: '12px', color: '#666' }}>(menor número aparece primeiro)</span>
                    </div>

                    {/* Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <label style={{ fontSize: '14px', minWidth: '60px' }}>🏷️ Badge:</label>
                      <select
                        value={config.badge || ''}
                        onChange={(e) => updatePlanoConfig(config.codigo, { badge: e.target.value || undefined })}
                        style={{
                          padding: '4px 8px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          flex: 1
                        }}
                      >
                        {BADGES.map(badge => (
                          <option key={badge.value} value={badge.value}>
                            {badge.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preview */}
      {configSalva.length > 0 && (
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>👁️ Preview da Exibição</h3>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
            Como os planos aparecerão no site:
          </div>

          <div style={{ display: 'grid', gap: '10px' }}>
            <div>
              <strong>Planos em Destaque (cards principais):</strong>
              {configSalva.filter(p => p.destaque).length === 0 ? (
                <span style={{ color: '#999', marginLeft: '10px' }}>Nenhum</span>
              ) : (
                <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                  {configSalva
                    .filter(p => p.destaque)
                    .sort((a, b) => a.ordem - b.ordem)
                    .map(p => (
                      <li key={p.codigo}>
                        {p.nome} {p.badge && `(${p.badge})`}
                      </li>
                    ))}
                </ul>
              )}
            </div>

            <div>
              <strong>Outros Planos (seção expandível):</strong>
              {configSalva.filter(p => !p.destaque).length === 0 ? (
                <span style={{ color: '#999', marginLeft: '10px' }}>Nenhum</span>
              ) : (
                <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                  {configSalva
                    .filter(p => !p.destaque)
                    .sort((a, b) => a.ordem - b.ordem)
                    .map(p => (
                      <li key={p.codigo}>
                        {p.nome} {p.badge && `(${p.badge})`}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}