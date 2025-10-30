import { useState } from 'react'
import { useFormValue, PatchEvent, set, unset } from 'sanity'
import { Button, Card, Checkbox, Flex, Stack, Text, Spinner, Badge, Box } from '@sanity/ui'

interface Plano {
  codigo: number
  nome: string
  valor: number | string
  categoria?: string
}

interface PlanosPermitidos {
  codigo: number
  nome?: string
  exibir?: boolean
  ordem?: number
  destaque?: boolean
  badge?: string
}

export function PlanosApiSelector(props: any) {
  const [planos, setPlanos] = useState<Plano[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Pegar o slug da unidade atual
  const slug = useFormValue(['slug', 'current']) as string
  const currentValue = props.value || []

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

  const isSelected = (codigo: number) => {
    return currentValue.some((p: any) => p?.codigo === codigo)
  }

  const getPlanoConfig = (codigo: number) => {
    return currentValue.find((p: any) => p?.codigo === codigo)
  }

  const togglePlano = (plano: Plano) => {
    const existingIndex = currentValue.findIndex((p: any) => p?.codigo === plano.codigo)

    if (existingIndex >= 0) {
      // Remover plano
      const newValue = currentValue.filter((p: any) => p?.codigo !== plano.codigo)
      props.onChange(PatchEvent.from(newValue.length > 0 ? set(newValue) : unset()))
    } else {
      // Adicionar plano
      const newPlano = {
        _key: `plano-${plano.codigo}-${Date.now()}`,
        codigo: plano.codigo,
        nome: plano.nome,
        exibir: true,
        ordem: currentValue.length,
        destaque: false
      }
      props.onChange(PatchEvent.from(set([...currentValue, newPlano])))
    }
  }

  const updatePlano = (codigo: number, updates: Partial<PlanosPermitidos>) => {
    const newValue = currentValue.map((p: any) =>
      p?.codigo === codigo ? { ...p, ...updates } : p
    )
    props.onChange(PatchEvent.from(set(newValue)))
  }

  return (
    <Stack space={4}>
      <Flex align="center" gap={3}>
        <Text weight="semibold">🔗 Planos da API</Text>
        <Button
          text={loading ? 'Carregando...' : 'Buscar Planos'}
          tone="primary"
          onClick={fetchPlanos}
          disabled={!slug || loading}
        />
      </Flex>

      {!slug && (
        <Card padding={3} tone="caution">
          <Text size={1}>
            💡 Salve a unidade com um slug primeiro para buscar os planos
          </Text>
        </Card>
      )}

      {error && (
        <Card padding={3} tone="critical">
          <Text size={1}>❌ {error}</Text>
        </Card>
      )}

      {loading && (
        <Card padding={4}>
          <Flex align="center" justify="center" gap={2}>
            <Spinner />
            <Text>Buscando planos na API...</Text>
          </Flex>
        </Card>
      )}

      {planos.length > 0 && (
        <Stack space={3}>
          <Text size={1} muted>
            ✅ Selecione quais planos devem aparecer na página:
          </Text>

          {planos.map((plano) => {
            const selected = isSelected(plano.codigo)
            const config = getPlanoConfig(plano.codigo)

            return (
              <Card
                key={plano.codigo}
                padding={3}
                tone={selected ? 'primary' : 'default'}
                border
              >
                <Stack space={3}>
                  {/* Checkbox principal */}
                  <Flex align="center" gap={3}>
                    <Checkbox
                      checked={selected}
                      onChange={() => togglePlano(plano)}
                    />
                    <Text weight="medium">
                      {plano.nome}
                    </Text>
                    <Badge tone="default">
                      #{plano.codigo}
                    </Badge>
                    <Badge tone="positive">
                      R$ {typeof plano.valor === 'number' ? plano.valor.toFixed(2) : plano.valor}
                    </Badge>
                  </Flex>

                  {/* Configurações quando selecionado */}
                  {selected && config && (
                    <Box marginLeft={4}>
                      <Stack space={3}>
                        <Flex align="center" gap={3}>
                          <Checkbox
                            checked={config.destaque || false}
                            onChange={() => updatePlano(plano.codigo, {
                              destaque: !config.destaque
                            })}
                          />
                          <Text size={1}>⭐ Plano em destaque (aparece nos cards principais)</Text>
                        </Flex>

                        <Flex align="center" gap={3}>
                          <Text size={1} style={{ minWidth: '60px' }}>🏷️ Badge:</Text>
                          <select
                            value={config.badge || ''}
                            onChange={(e) => updatePlano(plano.codigo, {
                              badge: e.target.value || undefined
                            })}
                            style={{
                              padding: '4px 8px',
                              fontSize: '12px',
                              borderRadius: '4px',
                              border: '1px solid #ccc'
                            }}
                          >
                            <option value="">Sem badge</option>
                            <option value="MAIS VENDIDO">🔥 Mais vendido</option>
                            <option value="RECOMENDADO">👑 Recomendado</option>
                            <option value="NOVIDADE">✨ Novidade</option>
                            <option value="OFERTA">💰 Oferta</option>
                            <option value="PROMOÇÃO">🎯 Promoção</option>
                          </select>
                        </Flex>

                        <Flex align="center" gap={3}>
                          <Text size={1} style={{ minWidth: '60px' }}>📊 Ordem:</Text>
                          <input
                            type="number"
                            value={config.ordem || 0}
                            onChange={(e) => updatePlano(plano.codigo, {
                              ordem: parseInt(e.target.value) || 0
                            })}
                            style={{
                              padding: '4px 8px',
                              fontSize: '12px',
                              width: '80px',
                              borderRadius: '4px',
                              border: '1px solid #ccc'
                            }}
                            min="0"
                          />
                          <Text size={1} muted>(menor número aparece primeiro)</Text>
                        </Flex>
                      </Stack>
                    </Box>
                  )}
                </Stack>
              </Card>
            )
          })}
        </Stack>
      )}

      {currentValue.length > 0 && (
        <Card padding={3} tone="positive">
          <Text size={1}>
            ✅ {currentValue.length} plano(s) configurado(s) para exibição
          </Text>
        </Card>
      )}

      {/* Renderizar o input padrão também (para debug) */}
      {props.renderDefault && (
        <details>
          <summary style={{ cursor: 'pointer', marginTop: '16px' }}>
            <Text size={1} muted>🔧 Debug: Ver dados salvos</Text>
          </summary>
          <Box marginTop={2}>
            {props.renderDefault(props)}
          </Box>
        </details>
      )}
    </Stack>
  )
}