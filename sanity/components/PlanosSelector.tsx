import React, { useState } from 'react'
import { useFormValue } from 'sanity'
import { Button, Card, Flex, Stack, Text, Spinner } from '@sanity/ui'
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
    <Stack space={4}>
      <Flex align="center" gap={3}>
        <Text weight="semibold">Planos disponíveis da API</Text>
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
        <Card padding={3} tone="primary">
          <Stack space={3}>
            <Text weight="medium">Planos encontrados na API:</Text>
            {planos.map((plano) => (
              <Flex key={plano.codigo} align="center" gap={3}>
                <Text size={1} style={{ fontFamily: 'monospace' }}>
                  #{plano.codigo}
                </Text>
                <Text size={1}>
                  {plano.nome} - R$ {typeof plano.valor === 'number' ? plano.valor.toFixed(2) : plano.valor}
                </Text>
              </Flex>
            ))}
            <Text size={1} muted>
              Use os códigos acima para configurar os planos na seção abaixo.
            </Text>
          </Stack>
        </Card>
      )}

      {/* Renderizar o componente padrão do array */}
      {React.cloneElement(props.renderDefault(props), props)}
    </Stack>
  )
}