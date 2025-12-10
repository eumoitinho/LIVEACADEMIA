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
  // Dados originais da API
  codigoApi: string
  nomeOriginal: string
  valorOriginal: string
  adesaoOriginal?: string
  fidelidadeOriginal?: string
  categoriaOriginal?: string

  // Dados personalizados de exibição
  nomeExibicao?: string
  precoExibicao?: string
  periodoExibicao?: string
  descricaoExibicao?: string
  beneficiosExibicao?: string[]
  ctaTexto?: string
  adesaoExibicao?: string
  mostrarAdesao?: boolean
  fidelidadeExibicao?: string
  mostrarFidelidade?: boolean
  observacoes?: string

  // Configurações visuais
  visivel: boolean
  destaque: boolean
  ordem: number
  badge?: string
  corCard?: string
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
  buttonSmall: {
    padding: '4px 8px',
    fontSize: '12px',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    marginTop: '4px',
  },
  textarea: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    marginTop: '4px',
    minHeight: '80px',
    resize: 'vertical' as const,
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
  labelSmall: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#6b7280',
    marginBottom: '2px',
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
  flexWrap: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
  },
  stack: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '12px',
  },
  configPanel: {
    marginTop: '12px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  },
  section: {
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid #e5e7eb',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
    marginBottom: '12px',
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
  benefitItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 10px',
    backgroundColor: '#fff',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    fontSize: '13px',
  },
  removeButton: {
    background: 'none',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    padding: '2px',
    fontSize: '16px',
    lineHeight: 1,
  },
  originalValue: {
    fontSize: '11px',
    color: '#9ca3af',
    marginTop: '2px',
  },
}

export default function PlanosSelectorInput(props: PlanosSelectorInputProps) {
  const { value = [], onChange } = props

  const slug = useFormValue(['slug', 'current']) as string | undefined

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [apiPlanos, setApiPlanos] = useState<PlanoFromAPI[]>([])
  const [expandedPlano, setExpandedPlano] = useState<string | null>(null)
  const [newBenefit, setNewBenefit] = useState<{[key: string]: string}>({})

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
      const preco = formatPrice(plano.mensalidade ?? plano.valor)
      const newConfig: PlanoConfig = {
        _key: `plano_${codigo}_${Date.now()}`,
        codigoApi: codigo,
        nomeOriginal: plano.nome,
        valorOriginal: preco,
        adesaoOriginal: plano.adesao ? formatPrice(plano.adesao) : undefined,
        fidelidadeOriginal: plano.fidelidade ? String(plano.fidelidade) : undefined,
        categoriaOriginal: plano.categoria,
        visivel: true,
        destaque: false,
        ordem: value.length,
        mostrarAdesao: true,
        mostrarFidelidade: true,
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

  const addBenefit = (codigo: string) => {
    const config = getPlanoConfig(codigo)
    const benefitText = newBenefit[codigo]?.trim()
    if (config && benefitText) {
      const currentBenefits = config.beneficiosExibicao || []
      updatePlanoConfig(codigo, {
        beneficiosExibicao: [...currentBenefits, benefitText]
      })
      setNewBenefit(prev => ({ ...prev, [codigo]: '' }))
    }
  }

  const removeBenefit = (codigo: string, index: number) => {
    const config = getPlanoConfig(codigo)
    if (config && config.beneficiosExibicao) {
      const newBenefits = config.beneficiosExibicao.filter((_, i) => i !== index)
      updatePlanoConfig(codigo, { beneficiosExibicao: newBenefits })
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
          {loading ? 'Carregando...' : '🔄 Recarregar Planos da API'}
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
                📋 Planos disponíveis para {slug} ({apiPlanos.length} planos)
              </strong>
              <p style={styles.textSmall}>
                Selecione os planos e clique em "Configurar" para personalizar todas as informações do card.
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
                                🚫 Oculto
                              </span>
                            )}
                            {config?.badge && (
                              <span style={{ ...styles.badge, backgroundColor: '#dbeafe', color: '#1e40af' }}>
                                {config.badge}
                              </span>
                            )}
                          </div>
                          <p style={styles.textSmall}>
                            Código: {codigo} | R$ {config?.precoExibicao || preco}{config?.periodoExibicao || '/mês'}
                            {plano.adesao ? ` | Adesão: R$ ${plano.adesao}` : ''}
                            {plano.fidelidade ? ` | Fidelidade: ${plano.fidelidade} meses` : ''}
                            {plano.categoria ? ` | ${plano.categoria}` : ''}
                          </p>
                        </div>

                        {selected && (
                          <button
                            style={{ ...styles.button, ...styles.buttonGhost }}
                            onClick={() => setExpandedPlano(isExpanded ? null : codigo)}
                          >
                            {isExpanded ? '✕ Fechar' : '⚙️ Configurar'}
                          </button>
                        )}
                      </div>

                      {/* Configurações expandidas - Editor completo */}
                      {selected && isExpanded && config && (
                        <div style={styles.configPanel}>
                          {/* Seção: Visibilidade e Status */}
                          <div style={styles.sectionTitle}>🎯 Visibilidade e Status</div>
                          <div style={styles.grid3}>
                            <label style={{ ...styles.flex, cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                style={styles.checkbox}
                                checked={config.visivel}
                                onChange={() => updatePlanoConfig(codigo, { visivel: !config.visivel })}
                              />
                              <span>Visível no site</span>
                            </label>

                            <label style={{ ...styles.flex, cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                style={styles.checkbox}
                                checked={config.destaque}
                                onChange={() => updatePlanoConfig(codigo, { destaque: !config.destaque })}
                              />
                              <span>Plano em destaque</span>
                            </label>

                            <div>
                              <label style={styles.labelSmall}>Ordem</label>
                              <input
                                type="number"
                                style={styles.input}
                                value={config.ordem?.toString() || '0'}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatePlanoConfig(codigo, {
                                  ordem: parseInt(e.target.value) || 0
                                })}
                              />
                            </div>
                          </div>

                          {/* Seção: Informações principais */}
                          <div style={{ ...styles.section }}>
                            <div style={styles.sectionTitle}>📝 Informações Principais</div>
                            <div style={styles.grid2}>
                              <div>
                                <label style={styles.label}>Nome do Plano</label>
                                <input
                                  type="text"
                                  style={styles.input}
                                  value={config.nomeExibicao || ''}
                                  placeholder={plano.nome}
                                  onChange={(e: ChangeEvent<HTMLInputElement>) => updatePlanoConfig(codigo, {
                                    nomeExibicao: e.target.value || undefined
                                  })}
                                />
                                <p style={styles.originalValue}>Original: {plano.nome}</p>
                              </div>

                              <div>
                                <label style={styles.label}>Preço</label>
                                <input
                                  type="text"
                                  style={styles.input}
                                  value={config.precoExibicao || ''}
                                  placeholder={preco}
                                  onChange={(e: ChangeEvent<HTMLInputElement>) => updatePlanoConfig(codigo, {
                                    precoExibicao: e.target.value || undefined
                                  })}
                                />
                                <p style={styles.originalValue}>Original: R$ {preco}</p>
                              </div>

                              <div>
                                <label style={styles.label}>Período</label>
                                <select
                                  style={styles.select}
                                  value={config.periodoExibicao || ''}
                                  onChange={(e: ChangeEvent<HTMLSelectElement>) => updatePlanoConfig(codigo, {
                                    periodoExibicao: e.target.value || undefined
                                  })}
                                >
                                  <option value="">/mês (padrão)</option>
                                  <option value="/mês">/mês</option>
                                  <option value="/ano">/ano</option>
                                  <option value="/semestre">/semestre</option>
                                  <option value="/trimestre">/trimestre</option>
                                  <option value=" mensal"> mensal</option>
                                  <option value=" anual"> anual</option>
                                </select>
                              </div>

                              <div>
                                <label style={styles.label}>Taxa de Adesão</label>
                                <div style={{ ...styles.flex, marginTop: '4px' }}>
                                  <input
                                    type="text"
                                    style={{ ...styles.input, flex: 1, marginTop: 0 }}
                                    value={config.adesaoExibicao || ''}
                                    placeholder={plano.adesao ? `${plano.adesao}` : '0'}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatePlanoConfig(codigo, {
                                      adesaoExibicao: e.target.value || undefined
                                    })}
                                  />
                                  <label style={{ ...styles.flex, cursor: 'pointer', fontSize: '12px' }}>
                                    <input
                                      type="checkbox"
                                      style={{ ...styles.checkbox, width: '14px', height: '14px' }}
                                      checked={config.mostrarAdesao !== false}
                                      onChange={() => updatePlanoConfig(codigo, { mostrarAdesao: !config.mostrarAdesao })}
                                    />
                                    <span>Exibir</span>
                                  </label>
                                </div>
                                {plano.adesao && (
                                  <p style={styles.originalValue}>Original: R$ {plano.adesao}</p>
                                )}
                              </div>

                              <div>
                                <label style={styles.label}>Fidelidade (meses)</label>
                                <div style={{ ...styles.flex, marginTop: '4px' }}>
                                  <input
                                    type="text"
                                    style={{ ...styles.input, flex: 1, marginTop: 0 }}
                                    value={config.fidelidadeExibicao || ''}
                                    placeholder={plano.fidelidade ? `${plano.fidelidade}` : '0'}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatePlanoConfig(codigo, {
                                      fidelidadeExibicao: e.target.value || undefined
                                    })}
                                  />
                                  <label style={{ ...styles.flex, cursor: 'pointer', fontSize: '12px' }}>
                                    <input
                                      type="checkbox"
                                      style={{ ...styles.checkbox, width: '14px', height: '14px' }}
                                      checked={config.mostrarFidelidade !== false}
                                      onChange={() => updatePlanoConfig(codigo, { mostrarFidelidade: !config.mostrarFidelidade })}
                                    />
                                    <span>Exibir</span>
                                  </label>
                                </div>
                                {plano.fidelidade && (
                                  <p style={styles.originalValue}>Original: {plano.fidelidade} meses</p>
                                )}
                              </div>
                            </div>

                            <div style={{ marginTop: '12px' }}>
                              <label style={styles.label}>Descrição do Plano</label>
                              <textarea
                                style={styles.textarea}
                                value={config.descricaoExibicao || ''}
                                placeholder="Adicione uma descrição personalizada para este plano..."
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updatePlanoConfig(codigo, {
                                  descricaoExibicao: e.target.value || undefined
                                })}
                              />
                            </div>
                          </div>

                          {/* Seção: Benefícios */}
                          <div style={{ ...styles.section }}>
                            <div style={styles.sectionTitle}>✨ Benefícios/Features</div>

                            {/* Lista de benefícios existentes */}
                            {config.beneficiosExibicao && config.beneficiosExibicao.length > 0 && (
                              <div style={{ ...styles.flexWrap, marginBottom: '12px' }}>
                                {config.beneficiosExibicao.map((benefit, index) => (
                                  <div key={index} style={styles.benefitItem}>
                                    <span>✓ {benefit}</span>
                                    <button
                                      style={styles.removeButton}
                                      onClick={() => removeBenefit(codigo, index)}
                                      title="Remover benefício"
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Adicionar novo benefício */}
                            <div style={styles.flex}>
                              <input
                                type="text"
                                style={{ ...styles.input, flex: 1, marginTop: 0 }}
                                value={newBenefit[codigo] || ''}
                                placeholder="Digite um benefício e pressione Enter ou clique em Adicionar"
                                onChange={(e) => setNewBenefit(prev => ({ ...prev, [codigo]: e.target.value }))}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault()
                                    addBenefit(codigo)
                                  }
                                }}
                              />
                              <button
                                style={{ ...styles.button, ...styles.buttonPrimary, ...styles.buttonSmall }}
                                onClick={() => addBenefit(codigo)}
                              >
                                + Adicionar
                              </button>
                            </div>
                          </div>

                          {/* Seção: Aparência */}
                          <div style={{ ...styles.section }}>
                            <div style={styles.sectionTitle}>🎨 Aparência do Card</div>
                            <div style={styles.grid3}>
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
                                  <option value="MAIS VENDIDO">🔥 Mais vendido</option>
                                  <option value="RECOMENDADO">⭐ Recomendado</option>
                                  <option value="NOVIDADE">🆕 Novidade</option>
                                  <option value="OFERTA">💰 Oferta</option>
                                  <option value="MELHOR CUSTO-BENEFÍCIO">🏆 Melhor custo-benefício</option>
                                  <option value="EXCLUSIVO">💎 Exclusivo</option>
                                  <option value="PROMOÇÃO">🎁 Promoção</option>
                                </select>
                              </div>

                              <div>
                                <label style={styles.label}>Cor do Card</label>
                                <select
                                  style={styles.select}
                                  value={config.corCard || ''}
                                  onChange={(e: ChangeEvent<HTMLSelectElement>) => updatePlanoConfig(codigo, {
                                    corCard: e.target.value || undefined
                                  })}
                                >
                                  <option value="">Padrão</option>
                                  <option value="gold">🌟 Dourado (Destaque)</option>
                                  <option value="blue">💙 Azul (Premium)</option>
                                  <option value="green">💚 Verde (Econômico)</option>
                                  <option value="purple">💜 Roxo (VIP)</option>
                                </select>
                              </div>

                              <div>
                                <label style={styles.label}>Texto do Botão (CTA)</label>
                                <input
                                  type="text"
                                  style={styles.input}
                                  value={config.ctaTexto || ''}
                                  placeholder="Matricule-se"
                                  onChange={(e: ChangeEvent<HTMLInputElement>) => updatePlanoConfig(codigo, {
                                    ctaTexto: e.target.value || undefined
                                  })}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Seção: Observações */}
                          <div style={{ ...styles.section }}>
                            <div style={styles.sectionTitle}>📋 Observações</div>
                            <textarea
                              style={styles.textarea}
                              value={config.observacoes || ''}
                              placeholder="Adicione notas, termos ou condições especiais para este plano..."
                              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updatePlanoConfig(codigo, {
                                observacoes: e.target.value || undefined
                              })}
                            />
                            <p style={styles.textSmall}>
                              Estas observações podem ser exibidas junto ao plano ou nos termos.
                            </p>
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
          {value.some(p => p.destaque) && ` • ${value.filter(p => p.destaque).length} em destaque`}
        </div>
      )}
    </div>
  )
}
