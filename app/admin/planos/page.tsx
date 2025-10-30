'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { AlertCircle, CheckCircle, Eye, Loader2, Save, Trash2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

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
  { value: 'torres', label: 'Torres' },
  { value: 'centro', label: 'Centro' },
  { value: 'tradicional', label: 'Tradicional' },
  { value: 'premium', label: 'Premium' },
  { value: 'diamante', label: 'Diamante' },
  { value: 'cidade-de-deus', label: 'Cidade de Deus' },
  { value: 'cachoeirinha', label: 'Cachoeirinha' },
  { value: 'silves', label: 'Silves' },
  { value: 'planalto', label: 'Planalto' },
]

const BADGES = [
  { value: '', label: 'Sem badge' },
  { value: 'MAIS VENDIDO', label: 'Mais vendido' },
  { value: 'RECOMENDADO', label: 'Recomendado' },
  { value: 'NOVIDADE', label: 'Novidade' },
  { value: 'OFERTA', label: 'Oferta' },
  { value: 'PROMOÇÃO', label: 'Promoção' },
]

export default function AdminPlanosPage() {
  const [unidadeSelecionada, setUnidadeSelecionada] = useState('torres')
  const [planosApi, setPlanosApi] = useState<Plano[]>([])
  const [configSalva, setConfigSalva] = useState<PlanoConfig[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

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
      setMessage({ type: 'error', text: 'Erro ao buscar planos da API' })
    } finally {
      setLoading(false)
    }
  }

  const buscarConfigSalva = async (slug: string) => {
    try {
      const response = await fetch(`/api/admin/planos-config/${slug}`)
      const data = await response.json()
      setConfigSalva(data.config || [])
    } catch (error) {
      console.error('Erro ao buscar configuração:', error)
    }
  }

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

      setMessage({ type: 'success', text: 'Configuração salva com sucesso!' })
    } catch (error) {
      console.error('Erro ao salvar:', error)
      setMessage({ type: 'error', text: 'Erro ao salvar configuração' })
    } finally {
      setSaving(false)
    }
  }

  const isPlanoConfigurado = (codigo: number) => {
    return configSalva.some(p => p.codigo === codigo)
  }

  const togglePlano = (plano: Plano) => {
    if (isPlanoConfigurado(plano.codigo)) {
      setConfigSalva(prev => prev.filter(p => p.codigo !== plano.codigo))
    } else {
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

  const updatePlanoConfig = (codigo: number, updates: Partial<PlanoConfig>) => {
    setConfigSalva(prev =>
      prev.map(p => p.codigo === codigo ? { ...p, ...updates } : p)
    )
  }

  useEffect(() => {
    buscarPlanosApi(unidadeSelecionada)
    buscarConfigSalva(unidadeSelecionada)
  }, [unidadeSelecionada])

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const planosDestacados = configSalva.filter(p => p.destaque).sort((a, b) => a.ordem - b.ordem)
  const outrosPlanos = configSalva.filter(p => !p.destaque).sort((a, b) => a.ordem - b.ordem)

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Administração de Planos
          </h1>
          <p className="text-gray-600">
            Configure quais planos aparecem em cada unidade e como são exibidos
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6 bg-white border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="unidade">Unidade</Label>
                <Select value={unidadeSelecionada} onValueChange={setUnidadeSelecionada}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {UNIDADES.map(unidade => (
                      <SelectItem key={unidade.value} value={unidade.value}>
                        {unidade.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={() => buscarPlanosApi(unidadeSelecionada)}
                disabled={loading}
                variant="outline"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Atualizar
              </Button>
              {configSalva.length > 0 && (
                <Button
                  onClick={salvarConfig}
                  disabled={saving}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Save className="mr-2 h-4 w-4" />
                  Salvar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Messages */}
        {message && (
          <Alert className={`mb-6 ${message.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            {message.type === 'success' ?
              <CheckCircle className="h-4 w-4 text-green-600" /> :
              <AlertCircle className="h-4 w-4 text-red-600" />
            }
            <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Planos Disponíveis */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-gray-900">
                Planos da API
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">{planosApi.length} encontrados</Badge>
              </CardTitle>
              <CardDescription className="text-gray-600">
                Selecione os planos que devem aparecer na unidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  Carregando planos...
                </div>
              ) : planosApi.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Nenhum plano encontrado
                </div>
              ) : (
                <div className="space-y-3">
                  {planosApi.map(plano => {
                    const configurado = isPlanoConfigurado(plano.codigo)
                    return (
                      <div
                        key={plano.codigo}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          configurado
                            ? 'border-green-200 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => togglePlano(plano)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              checked={configurado}
                            />
                            <div>
                              <div className="font-medium text-gray-900">
                                {plano.nome}
                              </div>
                              <div className="text-sm text-gray-500">
                                #{plano.codigo} • R$ {
                                  typeof plano.valor === 'number'
                                    ? plano.valor.toFixed(2)
                                    : plano.valor
                                }
                              </div>
                            </div>
                          </div>
                          <Badge variant={configurado ? 'default' : 'secondary'}>
                            {configurado ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Configurações */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-gray-900">
                Configuração
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">{configSalva.length} configurados</Badge>
              </CardTitle>
              <CardDescription className="text-gray-600">
                Configure a exibição dos planos selecionados
              </CardDescription>
            </CardHeader>
            <CardContent>
              {configSalva.length === 0 ? (
                <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                  Selecione planos para configurar
                </div>
              ) : (
                <div className="space-y-4">
                  {configSalva
                    .sort((a, b) => a.ordem - b.ordem)
                    .map(config => (
                    <Card key={config.codigo} className={`bg-white border-gray-200 ${config.destaque ? 'border-yellow-300 bg-yellow-50' : ''}`}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="font-medium">{config.nome}</div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePlano({ codigo: config.codigo, nome: config.nome, valor: 0 })}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={config.destaque}
                              onCheckedChange={(checked) =>
                                updatePlanoConfig(config.codigo, { destaque: checked })
                              }
                            />
                            <Label className="text-sm">Plano em destaque</Label>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`ordem-${config.codigo}`} className="text-xs">Ordem</Label>
                              <Input
                                id={`ordem-${config.codigo}`}
                                type="number"
                                value={config.ordem}
                                onChange={(e) => updatePlanoConfig(config.codigo, {
                                  ordem: parseInt(e.target.value) || 0
                                })}
                                min="0"
                                className="h-8"
                              />
                            </div>

                            <div>
                              <Label htmlFor={`badge-${config.codigo}`} className="text-xs">Badge</Label>
                              <Select
                                value={config.badge || ''}
                                onValueChange={(value) => updatePlanoConfig(config.codigo, {
                                  badge: value || undefined
                                })}
                              >
                                <SelectTrigger className="h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {BADGES.map(badge => (
                                    <SelectItem key={badge.value} value={badge.value}>
                                      {badge.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        {configSalva.length > 0 && (
          <Card className="mt-6 bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Eye className="mr-2 h-5 w-5" />
                Preview da Exibição
              </CardTitle>
              <CardDescription className="text-gray-600">
                Como os planos aparecerão no site
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Planos em Destaque</h4>
                  {planosDestacados.length === 0 ? (
                    <p className="text-gray-500 text-sm">Nenhum plano em destaque</p>
                  ) : (
                    <div className="space-y-2">
                      {planosDestacados.map(p => (
                        <div key={p.codigo} className="flex items-center justify-between p-2 bg-yellow-50 border border-yellow-200 rounded">
                          <span className="text-sm">{p.nome}</span>
                          {p.badge && <Badge variant="secondary" className="text-xs">{p.badge}</Badge>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-medium mb-3">Outros Planos</h4>
                  {outrosPlanos.length === 0 ? (
                    <p className="text-gray-500 text-sm">Nenhum outro plano</p>
                  ) : (
                    <div className="space-y-2">
                      {outrosPlanos.map(p => (
                        <div key={p.codigo} className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded">
                          <span className="text-sm">{p.nome}</span>
                          {p.badge && <Badge variant="secondary" className="text-xs">{p.badge}</Badge>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}