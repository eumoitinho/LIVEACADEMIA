'use client'

import { useCallback, useEffect, useState, type ChangeEvent } from 'react'
import { set, unset } from 'sanity'
import { useFormValue } from 'sanity'

interface PlanoFromAPI {
  codigo: number
  nome: string
  valor: string | number
  mensalidade?: number
  adesao?: number
  fidelidade?: number
  categoria?: string
}

interface PlanoConfig {
  _key: string
  codigoApi: string
  nomeOriginal: string
  valorOriginal: string
  nomeExibicao?: string
  precoExibicao?: string
  descricaoExibicao?: string
  beneficiosExibicao?: string[]
  visivel: boolean
  destaque: boolean
  ordem: number
  badge?: string
}

interface PlanosSelectorInputProps {
  value?: PlanoConfig[]
  onChange: (event: any) => void
  schemaType: any
}

// Estilos inline para não depender de bibliotecas externas
const styles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  card: {
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    marginBottom: '12px',
    backgroundColor: '#fff',
  },
  cardSelected: {
    border: '2px solid #10b981',
    backgroundColor: '#f0fdf4',
  },
  cardHidden: {
    opacity: 0.6,
  },
  button: {
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
  },
  buttonPrimary: {
    backgroundColor: '#3b82f6',
    color: '#fff',
  },
  buttonGhost: {
    backgroundColor: 'transparent',
    color: '#3b82f6',
    border: '1px solid #3b82f6',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    marginTop: '4px',
  },
  select: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    marginTop: '4px',
    backgroundColor: '#fff',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#374151',
    marginBottom: '4px',
    display: 'block',
  },
  text: {
    fontSize: '14px',
    color: '#6b7280',
  },
  textSmall: {
    fontSize: '12px',
    color: '#9ca3af',
  },
  badge: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: 600,
    marginLeft: '8px',
  },
  badgeDestaque: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  badgeOculto: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  stack: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  configPanel: {
    marginTop: '12px',
    padding: '12px',
    backgroundColor: '#f9fafb',
    borderRadius: '6px',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid #e5e7eb',
    borderTopColor: '#3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  error: {
    padding: '12px',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '6px',
    color: '#991b1b',
  },
  success: {
    padding: '12px',
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '6px',
    color: '#166534',
  },
  warning: {
    padding: '12px',
    backgroundColor: '#fffbeb',
    border: '1px solid #fde68a',
    borderRadius: '6px',
    color: '#92400e',
  },
}

export default function PlanosSelectorInput(props: PlanosSelectorInputProps) {
  const { value = [], onChange } = props
  
  const slug = useFormValue(['slug', 'current']) as string | undefined
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [apiPlanos, setApiPlanos] = useState<PlanoFromAPI[]>([])
  const [expandedPlano, setExpandedPlano] = useState<string | null>(null)

  const fetchPlanos = useCallback(async () => {
    if (!slug) {
      setError('Salve a unidade com um slug primeiro para carregar os planos.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
      const response = await fetch(`${baseUrl}/api/pacto-v3/planos/${slug}`, {
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error(`Erro ao buscar planos: ${response.status}`)
      }

      const data = await response.json()
      const planos: PlanoFromAPI[] = data.planos || []
      
      setApiPlanos(planos)
      
      if (planos.length === 0) {
        setError('Nenhum plano encontrado para esta unidade.')
      }
    } catch (err: any) {
      console.error('Erro ao buscar planos:', err)
      setError(err.message || 'Erro ao buscar planos da API')
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    if (slug) {
      fetchPlanos()
    }
  }, [slug, fetchPlanos])

  const formatPrice = (val: number | string | undefined): string => {
    if (typeof val === 'number') return val.toFixed(2)
    if (!val) return '0.00'
    const numeric = String(val).replace(/\./g, '').replace(',', '.')
    const parsed = parseFloat(numeric)
    return Number.isFinite(parsed) ? parsed.toFixed(2) : '0.00'
  }

  const isPlanoSelected = (codigo: string) => {
    return value.some(p => p.codigoApi === codigo)
  }

  const getPlanoConfig = (codigo: string): PlanoConfig | undefined => {
    return value.find(p => p.codigoApi === codigo)
  }

  const togglePlano = (plano: PlanoFromAPI) => {
    const codigo = plano.codigo.toString()
    
    if (isPlanoSelected(codigo)) {
      const newValue = value.filter(p => p.codigoApi !== codigo)
      onChange(newValue.length > 0 ? set(newValue) : unset())
    } else {
      const newConfig: PlanoConfig = {
        _key: `plano_${codigo}_${Date.now()}`,
        codigoApi: codigo,
        nomeOriginal: plano.nome,
        valorOriginal: formatPrice(plano.mensalidade ?? plano.valor),
        visivel: true,
        destaque: false,
        ordem: value.length,
      }
      onChange(set([...value, newConfig]))
    }
  }

  const updatePlanoConfig = (codigo: string, updates: Partial<PlanoConfig>) => {
    const newValue = value.map(p => {
      if (p.codigoApi === codigo) {
        return { ...p, ...updates }
      }
      return p
    })
    onChange(set(newValue))
  }

  const toggleVisivel = (codigo: string) => {
    const config = getPlanoConfig(codigo)
    if (config) {
      updatePlanoConfig(codigo, { visivel: !config.visivel })
    }
  }

  const toggleDestaque = (codigo: string) => {
    const config = getPlanoConfig(codigo)
    if (config) {
      updatePlanoConfig(codigo, { destaque: !config.destaque })
    }
  }

  if (!slug) {
    return (
      <div style={styles.warning}>
        Salve a unidade com um slug primeiro para poder configurar os planos.
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      
      <div style={{ ...styles.flex, marginBottom: '16px' }}>
        <button
          style={{ ...styles.button, ...styles.buttonPrimary }}
          onClick={fetchPlanos}
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Recarregar Planos da API'}
        </button>
        {loading && <div style={styles.spinner} />}
      </div>

      {error && (
        <div style={styles.error}>{error}</div>
      )}

      {apiPlanos.length > 0 && (
        <div style={styles.card}>
          <div style={styles.stack}>
            <div>
              <strong style={{ fontSize: '16px' }}>
                Planos disponíveis para {slug} ({apiPlanos.length} planos)
              </strong>
              <p style={styles.textSmall}>
                Selecione os planos que devem aparecer nesta unidade. Configure visibilidade, destaque e textos personalizados.
              </p>
            </div>
            
            <div style={styles.stack}>
              {apiPlanos.map((plano) => {
                const codigo = plano.codigo.toString()
                const selected = isPlanoSelected(codigo)
                const config = getPlanoConfig(codigo)
                const isExpanded = expandedPlano === codigo
                const preco = formatPrice(plano.mensalidade ?? plano.valor)

                return (
                  <div 
                    key={codigo} 
                    style={{
                      ...styles.card,
                      ...(selected ? styles.cardSelected : {}),
                      ...(config && !config.visivel ? styles.cardHidden : {}),
                      marginBottom: '8px',
                    }}
                  >
                    <div style={styles.stack}>
                      {/* Header do plano */}
                      <div style={styles.flex}>
                        <input
                          type="checkbox"
                          style={styles.checkbox}
                          checked={selected}
                          onChange={() => togglePlano(plano)}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={styles.flex}>
                            <strong>{config?.nomeExibicao || plano.nome}</strong>
                            {config?.destaque && (
                              <span style={{ ...styles.badge, ...styles.badgeDestaque }}>
                                ⭐ Destaque
                              </span>
                            )}
                            {config && !config.visivel && (
                              <span style={{ ...styles.badge, ...styles.badgeOculto }}>
                                Oculto
                              </span>
                            )}
                          </div>
                          <p style={styles.textSmall}>
                            Código: {codigo} | R$ {config?.precoExibicao || preco}/mês
                            {plano.adesao ? ` | Adesão: R$ ${plano.adesao}` : ''}
                          </p>
                        </div>
                        
                        {selected && (
                          <button
                            style={{ ...styles.button, ...styles.buttonGhost }}
                            onClick={() => setExpandedPlano(isExpanded ? null : codigo)}
                          >
                            {isExpanded ? 'Fechar' : 'Configurar'}
                          </button>
                        )}
                      </div>

                      {/* Configurações expandidas */}
                      {selected && isExpanded && config && (
                        <div style={styles.configPanel}>
                          <div style={styles.stack}>
                            <label style={{ ...styles.flex, cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                style={styles.checkbox}
                                checked={config.visivel}
                                onChange={() => toggleVisivel(codigo)}
                              />
                              <span>Visível no site</span>
                            </label>
                            
                            <label style={{ ...styles.flex, cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                style={styles.checkbox}
                                checked={config.destaque}
                                onChange={() => toggleDestaque(codigo)}
                              />
                              <span>Plano em destaque (visual diferenciado)</span>
                            </label>

                            <div>
                              <label style={styles.label}>Nome de exibição (opcional)</label>
                              <input
                                type="text"
                                style={styles.input}
                                value={config.nomeExibicao || ''}
                                placeholder={plano.nome}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatePlanoConfig(codigo, { 
                                  nomeExibicao: e.target.value || undefined 
                                })}
                              />
                            </div>

                            <div>
                              <label style={styles.label}>Preço de exibição (opcional)</label>
                              <input
                                type="text"
                                style={styles.input}
                                value={config.precoExibicao || ''}
                                placeholder={preco}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatePlanoConfig(codigo, { 
                                  precoExibicao: e.target.value || undefined 
                                })}
                              />
                              <p style={styles.textSmall}>
                                O preço original (R$ {preco}) será usado no checkout.
                              </p>
                            </div>

                            <div>
                              <label style={styles.label}>Ordem de exibição</label>
                              <input
                                type="number"
                                style={styles.input}
                                value={config.ordem?.toString() || '0'}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatePlanoConfig(codigo, { 
                                  ordem: parseInt(e.target.value) || 0 
                                })}
                              />
                            </div>

                            <div>
                              <label style={styles.label}>Badge</label>
                              <select
                                style={styles.select}
                                value={config.badge || ''}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => updatePlanoConfig(codigo, { 
                                  badge: e.target.value || undefined 
                                })}
                              >
                                <option value="">Nenhum</option>
                                <option value="MAIS VENDIDO">Mais vendido</option>
                                <option value="RECOMENDADO">Recomendado</option>
                                <option value="NOVIDADE">Novidade</option>
                                <option value="OFERTA">Oferta</option>
                                <option value="MELHOR CUSTO-BENEFÍCIO">Melhor custo-benefício</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {value.length > 0 && (
        <div style={styles.success}>
          ✅ {value.filter(p => p.visivel).length} plano(s) selecionado(s) para exibição
          {value.some(p => !p.visivel) && ` (${value.filter(p => !p.visivel).length} oculto(s))`}
        </div>
      )}
    </div>
  )
}
