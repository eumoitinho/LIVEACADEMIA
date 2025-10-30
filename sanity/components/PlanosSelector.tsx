import React, { useState, useEffect } from 'react'
import { useFormValue } from 'sanity'
import { Button, Card, Checkbox, Flex, Stack, Text, Spinner, Badge } from '@sanity/ui'

interface Plano {
  codigo: number
  nome: string
  valor: number | string
  categoria?: string
  recorrencia?: string
}

interface PlanosPermitidos {
  codigo: number
  nome?: string
  exibir?: boolean
  ordem?: number
  destaque?: boolean
  badge?: string
}

interface PlanosSelectorProps {
  value?: PlanosPermitidos[]
  onChange: (value: PlanosPermitidos[]) => void
}

export function PlanosSelector({ value = [], onChange }: PlanosSelectorProps) {
  const [planos, setPlanos] = useState<Plano[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Pegar o slug da unidade atual do formulário
  const slug = useFormValue(['slug', 'current'])

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

  const togglePlano = (plano: Plano) => {
    const existingIndex = value.findIndex(p => p.codigo === plano.codigo)

    if (existingIndex >= 0) {
      // Remover plano
      const newValue = value.filter(p => p.codigo !== plano.codigo)
      onChange(newValue)
    } else {
      // Adicionar plano
      const newPlano: PlanosPermitidos = {
        codigo: plano.codigo,
        nome: plano.nome,
        exibir: true,
        ordem: value.length,
        destaque: false
      }
      onChange([...value, newPlano])
    }
  }

  const updatePlano = (codigo: number, updates: Partial<PlanosPermitidos>) => {
    const newValue = value.map(p =>
      p.codigo === codigo ? { ...p, ...updates } : p
    )
    onChange(newValue)
  }

  const isSelected = (codigo: number) => {
    return value.some(p => p.codigo === codigo)
  }

  const getPlanoConfig = (codigo: number) => {
    return value.find(p => p.codigo === codigo)
  }

  return (
    <Stack space={4}>
      <Flex align="center" gap={3}>
        <Text weight="semibold">Planos da API</Text>
        <Button
          text="Buscar Planos"
          tone="primary"
          onClick={fetchPlanos}
          disabled={!slug || loading}
        />
      </Flex>

      {!slug && (
        <Card padding={3} tone="caution">
          <Text size={1}>
            Salve a unidade com um slug primeiro para buscar os planos
          </Text>
        </Card>
      )}

      {error && (
        <Card padding={3} tone="critical">
          <Text size={1}>{error}</Text>
        </Card>
      )}

      {loading && (
        <Flex align="center" justify="center" padding={4}>
          <Spinner />
        </Flex>
      )}

      {planos.length > 0 && (
        <Stack space={3}>
          <Text size={1} muted>
            Selecione quais planos devem aparecer na página da unidade:
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

                  {selected && config && (
                    <Stack space={2} marginLeft={4}>
                      <Flex align="center" gap={3}>
                        <Checkbox
                          checked={config.destaque || false}
                          onChange={() => updatePlano(plano.codigo, {
                            destaque: !config.destaque
                          })}
                        />
                        <Text size={1}>Plano em destaque</Text>
                      </Flex>

                      <Flex align="center" gap={3}>
                        <Text size={1} style={{ minWidth: '60px' }}>Badge:</Text>
                        <select
                          value={config.badge || ''}
                          onChange={(e) => updatePlano(plano.codigo, {
                            badge: e.target.value || undefined
                          })}
                          style={{ padding: '4px 8px', fontSize: '12px' }}
                        >
                          <option value="">Sem badge</option>
                          <option value="MAIS VENDIDO">Mais vendido</option>
                          <option value="RECOMENDADO">Recomendado</option>
                          <option value="NOVIDADE">Novidade</option>
                          <option value="OFERTA">Oferta</option>
                          <option value="PROMOÇÃO">Promoção</option>
                        </select>
                      </Flex>

                      <Flex align="center" gap={3}>
                        <Text size={1} style={{ minWidth: '60px' }}>Ordem:</Text>
                        <input
                          type="number"
                          value={config.ordem || 0}
                          onChange={(e) => updatePlano(plano.codigo, {
                            ordem: parseInt(e.target.value) || 0
                          })}
                          style={{ padding: '4px 8px', fontSize: '12px', width: '80px' }}
                        />
                      </Flex>
                    </Stack>
                  )}
                </Stack>
              </Card>
            )
          })}
        </Stack>
      )}

      {value.length > 0 && (
        <Card padding={3} tone="positive">
          <Text size={1}>
            {value.length} plano(s) selecionado(s) para exibição
          </Text>
        </Card>
      )}
    </Stack>
  )
}