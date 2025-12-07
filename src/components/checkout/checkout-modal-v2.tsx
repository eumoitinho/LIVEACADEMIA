'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, Loader2, Check, MapPin } from 'lucide-react'
import AnimatedPaymentCard from '@/components/checkout/animated-payment-card'
import { PreCadastroStep } from './pre-cadastro-step'
import { ParqStep } from './parq-step'
import { useRecaptcha } from '@/src/hooks/use-recaptcha'
import { useDebouncedCallback } from '@/src/hooks/use-debounce'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { VendasConfig, PreCadastroData, CepData, CampoAdicional } from '@/lib/api/pacto-checkout-types'

interface SimulacaoResumo {
  valorTotal?: number | string
  parcelas?: Array<{
    numero: number
    valor: number
    vencimento?: string
  }>
}

interface PactoResponse {
  success: boolean
  error?: string
  transactionId?: string
  pixCode?: string
  boletoUrl?: string
  data?: any
}

interface CheckoutModalV2Props {
  isOpen: boolean
  onClose: () => void
  plano: {
    name: string
    price: string
    codigo?: string
    adesao?: number
    fidelidade?: number
    regimeRecorrencia?: boolean
    modalidades?: string[]
  } | null
  unidadeName: string
  unidadeId: string
}

type CheckoutStep = 'loading-config' | 'pre-cadastro' | 'parq' | 'dados-pessoais' | 'pagamento' | 'processando' | 'sucesso' | 'erro'

const normalizeToNumber = (value?: number | string | null) => {
  if (value === null || value === undefined) return NaN
  if (typeof value === 'number') return value
  let sanitized = value.replace(/[R$\s]/gi, '')
  if (sanitized.includes(',')) {
    sanitized = sanitized.replace(/\./g, '').replace(',', '.')
  }
  const parsed = Number(sanitized)
  return Number.isNaN(parsed) ? NaN : parsed
}

const formatCurrency = (value?: number | string | null) => {
  const numberValue = normalizeToNumber(value)
  if (Number.isNaN(numberValue)) return 'R$ 0,00'
  return numberValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

const formatPhone = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1')
}

const formatCEP = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1')
}

const formatCardNumber = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})\d+?$/, '$1')
}

const formatCardExpiry = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d{2})\d+?$/, '$1/$2')
}

export default function CheckoutModalV2({
  isOpen,
  onClose,
  plano,
  unidadeName,
  unidadeId
}: CheckoutModalV2Props) {
  // Config and flow state
  const [config, setConfig] = useState<VendasConfig | null>(null)
  const [configLoading, setConfigLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('loading-config')

  // Lead and PAR-Q state
  const [leadId, setLeadId] = useState<string>('')
  const [preCadastroData, setPreCadastroData] = useState<PreCadastroData | null>(null)
  const [parqCompleted, setParqCompleted] = useState(false)

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'cartao'>('cartao')
  const [loading, setLoading] = useState(false)
  const [paymentResult, setPaymentResult] = useState<PactoResponse | null>(null)
  const [simulation, setSimulation] = useState<SimulacaoResumo | null>(null)
  const [simulationLoading, setSimulationLoading] = useState(false)
  const [simulationError, setSimulationError] = useState<string | null>(null)

  // Form data
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    dataNascimento: '',
    sexo: 'M' as 'M' | 'F' | 'O',
    rg: '',
    aceiteTermos: false,
    numeroCartao: '',
    nomeCartao: '',
    validadeCartao: '',
    cvvCartao: ''
  })

  const [cepLoading, setCepLoading] = useState(false)
  const isMountedRef = useRef(true)
  const { isLoaded: recaptchaLoaded, executeRecaptcha } = useRecaptcha()

  // Load config on mount
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch(`/api/pacto-v3/vendas/configs/${unidadeId}`)
        const data = await response.json()

        if (data.success && data.data) {
          setConfig(data.data)

          // Determine initial step based on config
          if (data.data.habilitarPreCadastro) {
            setCurrentStep('pre-cadastro')
          } else if (data.data.camposAdicionais?.includes('ParQ')) {
            setCurrentStep('parq')
          } else {
            setCurrentStep('dados-pessoais')
          }
        } else {
          // Use default flow
          setCurrentStep('dados-pessoais')
        }
      } catch (error) {
        console.error('Error loading config:', error)
        // Use default flow on error
        setCurrentStep('dados-pessoais')
      } finally {
        setConfigLoading(false)
      }
    }

    if (isOpen) {
      loadConfig()
    }
  }, [isOpen, unidadeId])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  // CEP lookup
  const fetchCepData = useCallback(async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '')
    if (cleanCep.length !== 8) return

    setCepLoading(true)
    try {
      const response = await fetch(`/api/cep/consultar?cep=${cleanCep}`)
      const data = await response.json()

      if (data.success && data.data) {
        const cepData: CepData = data.data
        setFormData(prev => ({
          ...prev,
          endereco: cepData.logradouro || prev.endereco,
          bairro: cepData.bairro || prev.bairro,
          cidade: cepData.localidade || prev.cidade,
          estado: cepData.uf || prev.estado,
          complemento: cepData.complemento || prev.complemento
        }))
      }
    } catch (error) {
      console.error('Error fetching CEP:', error)
    } finally {
      setCepLoading(false)
    }
  }, [])

  // Debounced CEP lookup
  const debouncedFetchCep = useDebouncedCallback(fetchCepData, 500)

  // Handle CEP change
  const handleCepChange = (value: string) => {
    const formatted = formatCEP(value)
    setFormData(prev => ({ ...prev, cep: formatted }))
    if (formatted.replace(/\D/g, '').length === 8) {
      debouncedFetchCep(formatted)
    }
  }

  // Handle pre-cadastro completion
  const handlePreCadastroComplete = (data: PreCadastroData, newLeadId: string) => {
    setPreCadastroData(data)
    setLeadId(newLeadId)

    // Pre-fill form with lead data
    setFormData(prev => ({
      ...prev,
      nome: data.nome,
      email: data.email,
      telefone: data.telefone
    }))

    // Move to next step
    if (config?.camposAdicionais?.includes('ParQ')) {
      setCurrentStep('parq')
    } else {
      setCurrentStep('dados-pessoais')
    }
  }

  // Handle PAR-Q completion
  const handleParqComplete = () => {
    setParqCompleted(true)
    setCurrentStep('dados-pessoais')
  }

  // Check which fields are required based on config
  const isFieldRequired = (field: string): boolean => {
    if (!config) return true // Default to required if no config

    const camposAdicionais = config.camposAdicionais || []
    const fieldMap: Record<string, string> = {
      'telefone': 'TELEFONE',
      'cep': 'CEP',
      'endereco': 'ENDERECO',
      'numero': 'NUMERO',
      'bairro': 'BAIRRO',
      'complemento': 'COMPLEMENTO',
      'sexo': 'SEXO',
      'dataNascimento': 'DT_NASCIMENTO',
      'rg': 'RG'
    }

    return camposAdicionais.includes(fieldMap[field] as CampoAdicional || field.toUpperCase() as CampoAdicional)
  }

  // Validate form based on current step
  const validateForm = (): boolean => {
    if (currentStep === 'dados-pessoais') {
      // Always required fields
      if (!formData.nome || !formData.email || !formData.cpf) return false
      if (!formData.aceiteTermos) return false

      // Check config-based required fields
      if (isFieldRequired('telefone') && !formData.telefone) return false
      if (isFieldRequired('cep') && !formData.cep) return false
      if (isFieldRequired('endereco') && !formData.endereco) return false
      if (isFieldRequired('numero') && !formData.numero) return false
      if (isFieldRequired('bairro') && !formData.bairro) return false
      if (isFieldRequired('sexo') && !formData.sexo) return false
      if (isFieldRequired('dataNascimento') && !formData.dataNascimento) return false

      return true
    }

    if (currentStep === 'pagamento') {
      // Apenas cartão de crédito disponível - validar campos do cartão
      return !!(formData.numeroCartao && formData.nomeCartao &&
               formData.validadeCartao && formData.cvvCartao)
    }

    return true
  }

  // Run simulation when entering payment step
  const runSimulation = useCallback(async () => {
    if (!plano?.codigo) return

    setSimulationLoading(true)
    setSimulationError(null)

    try {
      const response = await fetch(`/api/pacto-v3/simular/${unidadeId}/${plano.codigo}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: unidadeId,
          planoId: plano.codigo,
          cliente: {
            nome: formData.nome,
            cpf: formData.cpf.replace(/\D/g, ''),
            email: formData.email,
            telefone: formData.telefone.replace(/\D/g, ''),
            endereco: formData.endereco,
            numero: formData.numero,
            complemento: formData.complemento,
            bairro: formData.bairro,
            cidade: formData.cidade,
            estado: formData.estado,
            cep: formData.cep.replace(/\D/g, ''),
            dataNascimento: formData.dataNascimento,
            sexo: formData.sexo,
            rg: formData.rg
          },
          paymentMethod
        })
      })

      const data = await response.json()

      if (data.success && data.data) {
        setSimulation(data.data)
      } else {
        throw new Error(data.error || 'Erro na simulação')
      }
    } catch (error) {
      console.error('Simulation error:', error)
      setSimulationError('Não foi possível simular o valor. Continuando com valor original.')
    } finally {
      setSimulationLoading(false)
    }
  }, [plano, unidadeId, formData, paymentMethod])

  useEffect(() => {
    if (currentStep === 'pagamento' && plano?.codigo) {
      runSimulation()
    }
  }, [currentStep, paymentMethod])

  // Process payment
  const processPayment = async () => {
    if (!validateForm()) {
      alert('Por favor, preencha todos os campos obrigatórios')
      return
    }

    if (!recaptchaLoaded) {
      alert('Sistema de segurança ainda carregando. Por favor, aguarde.')
      return
    }

    setLoading(true)
    setCurrentStep('processando')

    try {
      // Execute reCAPTCHA
      const captchaToken = await executeRecaptcha('checkout')

      let cartaoToken = ''

      // Tokenize card if payment method is card
      if (paymentMethod === 'cartao') {
        const tokenResponse = await fetch('/api/pacto/tokenize-card', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            numero: formData.numeroCartao.replace(/\s/g, ''),
            nome: formData.nomeCartao.toUpperCase(),
            validade: formData.validadeCartao,
            cvv: formData.cvvCartao,
            parcelas: 1
          })
        })

        const tokenData = await tokenResponse.json()

        if (!tokenData.success) {
          throw new Error(tokenData.error || 'Erro ao processar cartão')
        }

        cartaoToken = tokenData.token
      }

      // Process sale
      const vendaResponse = await fetch(`/api/pacto-v3/venda/${unidadeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: unidadeId,
          planoId: plano?.codigo,
          paymentMethod,
          cliente: {
            nome: formData.nome,
            cpf: formData.cpf.replace(/\D/g, ''),
            email: formData.email,
            telefone: formData.telefone.replace(/\D/g, ''),
            endereco: formData.endereco,
            numero: formData.numero,
            complemento: formData.complemento,
            bairro: formData.bairro,
            cidade: formData.cidade,
            estado: formData.estado,
            cep: formData.cep.replace(/\D/g, ''),
            dataNascimento: formData.dataNascimento,
            sexo: formData.sexo,
            rg: formData.rg,
            leadId
          },
          captchaToken,
          cartaoToken
        })
      })

      const result = await vendaResponse.json()

      if (result.success) {
        setPaymentResult(result)
        setCurrentStep('sucesso')
      } else {
        throw new Error(result.error || 'Erro ao processar pagamento')
      }
    } catch (error) {
      console.error('Payment error:', error)
      setPaymentResult({
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao processar pagamento'
      })
      setCurrentStep('erro')
    } finally {
      setLoading(false)
    }
  }

  // Reset modal state
  const handleClose = () => {
    setCurrentStep('loading-config')
    setLeadId('')
    setPreCadastroData(null)
    setParqCompleted(false)
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      cpf: '',
      endereco: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      dataNascimento: '',
      sexo: 'M',
      rg: '',
      aceiteTermos: false,
      numeroCartao: '',
      nomeCartao: '',
      validadeCartao: '',
      cvvCartao: ''
    })
    setPaymentResult(null)
    setSimulation(null)
    onClose()
  }

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 'loading-config':
        return (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-yellow-600" />
            <span className="ml-3 text-gray-600">Carregando configurações...</span>
          </div>
        )

      case 'pre-cadastro':
        return (
          <PreCadastroStep
            unidadeId={unidadeId}
            onComplete={handlePreCadastroComplete}
            initialData={preCadastroData || undefined}
          />
        )

      case 'parq':
        return (
          <ParqStep
            unidadeId={unidadeId}
            leadId={leadId}
            onComplete={handleParqComplete}
            onSkip={() => {
              setParqCompleted(false)
              setCurrentStep('dados-pessoais')
            }}
          />
        )

      case 'dados-pessoais':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900">
                {config?.titulocheckout || 'Dados Pessoais'}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Preencha seus dados para finalizar a matrícula
              </p>
            </div>

            <div className="space-y-4">
              {/* Nome */}
              <div>
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Digite seu nome completo"
                  disabled={!!preCadastroData}
                  className={preCadastroData ? 'bg-gray-100 cursor-not-allowed' : ''}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  disabled={!!preCadastroData}
                  className={preCadastroData ? 'bg-gray-100 cursor-not-allowed' : ''}
                  required
                />
              </div>

              {/* CPF */}
              <div>
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  required
                />
              </div>

              {/* Telefone */}
              {isFieldRequired('telefone') && (
                <div>
                  <Label htmlFor="telefone">Telefone/WhatsApp *</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: formatPhone(e.target.value) })}
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                    disabled={!!preCadastroData}
                    className={preCadastroData ? 'bg-gray-100 cursor-not-allowed' : ''}
                    required
                  />
                </div>
              )}

              {/* CEP */}
              {isFieldRequired('cep') && (
                <div>
                  <Label htmlFor="cep" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    CEP *
                  </Label>
                  <div className="relative">
                    <Input
                      id="cep"
                      value={formData.cep}
                      onChange={(e) => handleCepChange(e.target.value)}
                      placeholder="00000-000"
                      maxLength={9}
                      required
                    />
                    {cepLoading && (
                      <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-gray-400" />
                    )}
                  </div>
                </div>
              )}

              {/* Endereço */}
              {isFieldRequired('endereco') && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="endereco">Endereço *</Label>
                    <Input
                      id="endereco"
                      value={formData.endereco}
                      onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                      placeholder="Rua/Avenida"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="numero">Número *</Label>
                    <Input
                      id="numero"
                      value={formData.numero}
                      onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                      placeholder="123"
                      required={isFieldRequired('numero')}
                    />
                  </div>
                </div>
              )}

              {/* Complemento e Bairro */}
              {(isFieldRequired('complemento') || isFieldRequired('bairro')) && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="complemento">
                      Complemento {isFieldRequired('complemento') ? '*' : ''}
                    </Label>
                    <Input
                      id="complemento"
                      value={formData.complemento}
                      onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
                      placeholder="Apto, Bloco, etc"
                      required={isFieldRequired('complemento')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bairro">Bairro *</Label>
                    <Input
                      id="bairro"
                      value={formData.bairro}
                      onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                      placeholder="Nome do bairro"
                      required={isFieldRequired('bairro')}
                    />
                  </div>
                </div>
              )}

              {/* Cidade e Estado */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cidade">Cidade *</Label>
                  <Input
                    id="cidade"
                    value={formData.cidade}
                    onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                    placeholder="Nome da cidade"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="estado">Estado *</Label>
                  <Select
                    value={formData.estado}
                    onValueChange={(value) => setFormData({ ...formData, estado: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AC">AC - Acre</SelectItem>
                      <SelectItem value="AL">AL - Alagoas</SelectItem>
                      <SelectItem value="AP">AP - Amapá</SelectItem>
                      <SelectItem value="AM">AM - Amazonas</SelectItem>
                      <SelectItem value="BA">BA - Bahia</SelectItem>
                      <SelectItem value="CE">CE - Ceará</SelectItem>
                      <SelectItem value="DF">DF - Distrito Federal</SelectItem>
                      <SelectItem value="ES">ES - Espírito Santo</SelectItem>
                      <SelectItem value="GO">GO - Goiás</SelectItem>
                      <SelectItem value="MA">MA - Maranhão</SelectItem>
                      <SelectItem value="MT">MT - Mato Grosso</SelectItem>
                      <SelectItem value="MS">MS - Mato Grosso do Sul</SelectItem>
                      <SelectItem value="MG">MG - Minas Gerais</SelectItem>
                      <SelectItem value="PA">PA - Pará</SelectItem>
                      <SelectItem value="PB">PB - Paraíba</SelectItem>
                      <SelectItem value="PR">PR - Paraná</SelectItem>
                      <SelectItem value="PE">PE - Pernambuco</SelectItem>
                      <SelectItem value="PI">PI - Piauí</SelectItem>
                      <SelectItem value="RJ">RJ - Rio de Janeiro</SelectItem>
                      <SelectItem value="RN">RN - Rio Grande do Norte</SelectItem>
                      <SelectItem value="RS">RS - Rio Grande do Sul</SelectItem>
                      <SelectItem value="RO">RO - Rondônia</SelectItem>
                      <SelectItem value="RR">RR - Roraima</SelectItem>
                      <SelectItem value="SC">SC - Santa Catarina</SelectItem>
                      <SelectItem value="SP">SP - São Paulo</SelectItem>
                      <SelectItem value="SE">SE - Sergipe</SelectItem>
                      <SelectItem value="TO">TO - Tocantins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Data de Nascimento e Sexo */}
              {(isFieldRequired('dataNascimento') || isFieldRequired('sexo')) && (
                <div className="grid grid-cols-2 gap-4">
                  {isFieldRequired('dataNascimento') && (
                    <div>
                      <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
                      <Input
                        id="dataNascimento"
                        type="date"
                        value={formData.dataNascimento}
                        onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                        required
                      />
                    </div>
                  )}
                  {isFieldRequired('sexo') && (
                    <div>
                      <Label htmlFor="sexo">Sexo *</Label>
                      <Select
                        value={formData.sexo}
                        onValueChange={(value: 'M' | 'F' | 'O') => setFormData({ ...formData, sexo: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="M">Masculino</SelectItem>
                          <SelectItem value="F">Feminino</SelectItem>
                          <SelectItem value="O">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              )}

              {/* RG */}
              {isFieldRequired('rg') && (
                <div>
                  <Label htmlFor="rg">RG</Label>
                  <Input
                    id="rg"
                    value={formData.rg}
                    onChange={(e) => setFormData({ ...formData, rg: e.target.value })}
                    placeholder="00.000.000-0"
                  />
                </div>
              )}

              {/* Termos */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.aceiteTermos}
                  onCheckedChange={(checked) => setFormData({ ...formData, aceiteTermos: checked as boolean })}
                />
                <Label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                  Li e aceito os termos de uso, regras de utilização e política de privacidade
                </Label>
              </div>
            </div>

            <Button
              onClick={() => setCurrentStep('pagamento')}
              disabled={!validateForm()}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-6 text-lg"
            >
              Continuar para Pagamento
            </Button>
          </div>
        )

      case 'pagamento':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900">Forma de Pagamento</h3>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-2">
              {config?.apresentarCartaoVenda && (
                <button
                  onClick={() => setPaymentMethod('cartao')}
                  className={`w-full p-4 border rounded-lg flex items-center justify-between ${
                    paymentMethod === 'cartao' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5" />
                    <span className="font-medium">Cartão de Crédito</span>
                  </div>
                  {paymentMethod === 'cartao' && <Check className="h-5 w-5 text-yellow-600" />}
                </button>
              )}

            </div>

            {/* Plan Summary */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <h4 className="font-semibold text-gray-900">Resumo do Pedido</h4>
              <div className="flex justify-between">
                <span className="text-gray-600">{plano?.name}</span>
                <span className="font-semibold">{formatCurrency(plano?.price)}/mês</span>
              </div>
              {plano?.adesao && plano.adesao > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxa de Adesão</span>
                  <span className="font-semibold">{formatCurrency(plano.adesao)}</span>
                </div>
              )}
              {simulation && !simulationLoading && (
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Total Hoje</span>
                    <span className="font-bold text-yellow-600">
                      {formatCurrency(simulation.valorTotal)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Card Form */}
            {paymentMethod === 'cartao' && (
              <div className="space-y-4">
                <AnimatedPaymentCard
                  cardNumber={formData.numeroCartao}
                  cardName={formData.nomeCartao}
                  cardExpiry={formData.validadeCartao}
                />

                <div>
                  <Label htmlFor="numeroCartao">Número do Cartão</Label>
                  <Input
                    id="numeroCartao"
                    value={formData.numeroCartao}
                    onChange={(e) => setFormData({ ...formData, numeroCartao: formatCardNumber(e.target.value) })}
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                  />
                </div>

                <div>
                  <Label htmlFor="nomeCartao">Nome no Cartão</Label>
                  <Input
                    id="nomeCartao"
                    value={formData.nomeCartao}
                    onChange={(e) => setFormData({ ...formData, nomeCartao: e.target.value.toUpperCase() })}
                    placeholder="NOME COMO NO CARTÃO"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="validadeCartao">Validade</Label>
                    <Input
                      id="validadeCartao"
                      value={formData.validadeCartao}
                      onChange={(e) => setFormData({ ...formData, validadeCartao: formatCardExpiry(e.target.value) })}
                      placeholder="MM/AA"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvvCartao">CVV</Label>
                    <Input
                      id="cvvCartao"
                      value={formData.cvvCartao}
                      onChange={(e) => setFormData({ ...formData, cvvCartao: e.target.value.replace(/\D/g, '') })}
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>
            )}


            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('dados-pessoais')}
                className="flex-1"
              >
                Voltar
              </Button>
              <Button
                onClick={processPayment}
                disabled={!validateForm() || loading}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processando...
                  </>
                ) : (
                  'Finalizar Pagamento'
                )}
              </Button>
            </div>
          </div>
        )

      case 'processando':
        return (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-yellow-600" />
            <h3 className="text-xl font-semibold text-gray-900">Processando seu pagamento...</h3>
            <p className="text-gray-600">Por favor, aguarde. Não feche esta janela.</p>
          </div>
        )

      case 'sucesso':
        return (
          <div className="text-center space-y-6 py-8">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Matrícula Realizada!</h3>
            <p className="text-gray-600">
              Parabéns! Sua matrícula na {unidadeName} foi realizada com sucesso.
            </p>

            {paymentResult?.transactionId && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">ID da Transação</p>
                <p className="font-mono font-semibold">{paymentResult.transactionId}</p>
              </div>
            )}

            <p className="text-sm text-gray-600">
              Em breve você receberá um e-mail com todas as instruções para começar a treinar!
            </p>

            <Button
              onClick={handleClose}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold"
            >
              Fechar
            </Button>
          </div>
        )

      case 'erro':
        return (
          <div className="text-center space-y-6 py-8">
            <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <X className="h-10 w-10 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Erro no Pagamento</h3>
            <p className="text-gray-600">
              {paymentResult?.error || 'Ocorreu um erro ao processar seu pagamento.'}
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => setCurrentStep('pagamento')}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold"
              >
                Tentar Novamente
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal - Força tema claro para checkout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="light relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            {/* Content */}
            <div className="p-6 sm:p-8">
              {renderStep()}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}