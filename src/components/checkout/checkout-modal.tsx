"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CreditCard, QrCode, FileText, Loader2, Check, Copy, ExternalLink, Clock } from "lucide-react"
import AnimatedPaymentCard from "@/components/checkout/animated-payment-card"
import { useRecaptcha } from "@/src/hooks/use-recaptcha"
import { useDebouncedCallback, useDebounceState } from "@/src/hooks/use-debounce"

interface SimulacaoResumo {
  valorTotal?: number | string
  parcelas?: Array<{
    numero: number
    valor: number
    vencimento?: string
  }>
}

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
interface PactoResponse {
  success: boolean
  error?: string
  message?: string
  isPending?: boolean
  transactionId?: string
  pixCode?: string
  boletoUrl?: string
  data?: any
}

interface CheckoutModalProps {
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

export default function CheckoutModal({ isOpen, onClose, plano, unidadeName, unidadeId }: CheckoutModalProps) {
  const [step, setStep] = useState(1) // 1: Dados, 2: Pagamento, 3: Processando, 4: Sucesso
  const [paymentMethod, setPaymentMethod] = useState<'cartao'>('cartao')
  const [loading, setLoading] = useState(false)
  const [paymentResult, setPaymentResult] = useState<PactoResponse | null>(null)
  const [simulation, setSimulation] = useState<SimulacaoResumo | null>(null)
  const [simulationLoading, setSimulationLoading] = useState(false)
  const [simulationError, setSimulationError] = useState<string | null>(null)
  const [simulationFallback, setSimulationFallback] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    // Endereço separado
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
    // Termos
    aceiteTermos: false,
    // Dados do cartão
    numeroCartao: '',
    nomeCartao: '',
    validadeCartao: '',
    cvvCartao: ''
  })
  const isMountedRef = useRef(true)
  
  // Hook do reCAPTCHA
  const { isLoaded: recaptchaLoaded, isExecuting: recaptchaExecuting, executeRecaptcha, error: recaptchaError } = useRecaptcha()

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setPaymentMethod('cartao')
      setLoading(false)
      setPaymentResult(null)
      setSimulation(null)
      setSimulationError(null)
      setSimulationFallback(false)
      setSimulationLoading(false)
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        // Endereço separado
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
        // Termos
        aceiteTermos: false,
        // Dados do cartão
        numeroCartao: '',
        nomeCartao: '',
        validadeCartao: '',
        cvvCartao: ''
      })
    }
  }, [isOpen])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const { isDebouncing, startDebounce } = useDebounceState()

  const runSimulation = useCallback(async () => {
    if (!plano || !isMountedRef.current || isDebouncing) return

    setSimulationLoading(true)
    setSimulationError(null)
    setSimulationFallback(false)
    setSimulation(null)

    try {
      const cliente = {
        nome: formData.nome || 'Cliente Teste',
        cpf: formData.cpf || '00000000000',
        email: formData.email || 'teste@email.com',
        telefone: formData.telefone || '11999999999',
        endereco: formData.endereco || '',
        numero: formData.numero || '',
        complemento: formData.complemento || '',
        bairro: formData.bairro || '',
        cidade: formData.cidade || '',
        estado: formData.estado || '',
        cep: formData.cep || '',
        dataNascimento: formData.dataNascimento || '01/01/1990',
        sexo: formData.sexo || 'M',
        rg: formData.rg || '',
      }

      const payload = {
        slug: unidadeId,
        planoId: plano.codigo || `PLANO_${unidadeId}`,
        cliente,
        paymentMethod,
      }

      const response = await fetch(`/api/pacto-v3/simular/${unidadeId}/${plano.codigo}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || 'Falha na simulação do plano')
      }

      if (!data?.success || !data?.data) {
        if (!isMountedRef.current) return
        setSimulationError('Nenhum resultado de simulação recebido.')
        return
      }

      if (!isMountedRef.current) return
      setSimulation(data.data as SimulacaoResumo)
      setSimulationFallback(false)
    } catch (error) {
      console.error('Erro na simulação:', error)
      if (!isMountedRef.current) return
      setSimulationError(error instanceof Error ? error.message : 'Falha na simulação')
    } finally {
      if (isMountedRef.current) {
        setSimulationLoading(false)
        startDebounce(2000) // 2 segundos de debounce após simulação
      }
    }
  }, [paymentMethod, plano, unidadeId, formData, isDebouncing, startDebounce])

  useEffect(() => {
    if (step === 2 && plano) {
      runSimulation()
    }
  }, [step, plano, runSimulation])

  const handleRetrySimulation = () => {
    if (!simulationLoading && !isDebouncing) {
      runSimulation()
    }
  }

  const handleNextStep = () => {
    if (step === 1) {
      // Validar dados pessoais, endereço e termos
      const camposObrigatorios = [
        formData.nome,
        formData.email,
        formData.telefone,
        formData.cpf,
        formData.endereco,
        formData.numero,
        formData.bairro,
        formData.cidade,
        formData.estado,
        formData.cep,
        formData.dataNascimento,
        formData.sexo
      ]
      
      if (camposObrigatorios.every(campo => campo.trim() !== '') && formData.aceiteTermos) {
        setStep(2)
      } else {
        if (!formData.aceiteTermos) {
          alert('Você deve aceitar os Termos de Uso e Política de Privacidade para continuar')
        } else {
          alert('Por favor, preencha todos os campos obrigatórios (marcados com *)')
        }
      }
    } else if (step === 2) {
      processPayment()
    }
  }

  const processPayment = async () => {
    if (!recaptchaLoaded) {
      alert('reCAPTCHA ainda não foi carregado. Aguarde um momento e tente novamente.')
      return
    }

    setLoading(true)
    setStep(3)
    
    try {
      // Gerar token do reCAPTCHA
      console.log('Gerando token reCAPTCHA...')
      const captchaToken = await executeRecaptcha('checkout')
      console.log('Token reCAPTCHA gerado:', captchaToken.substring(0, 20) + '...')

      // Preparar dados para a API Pacto V2
      const cliente = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        cpf: formData.cpf,
        endereco: formData.endereco,
        numero: formData.numero,
        complemento: formData.complemento,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado,
        cep: formData.cep,
        dataNascimento: formData.dataNascimento,
        sexo: formData.sexo,
        rg: formData.rg,
      }

      const saleBody: any = {
        slug: unidadeId,
        planoId: plano?.codigo || `PLANO_${unidadeId}`,
        paymentMethod,
        cliente,
        captchaToken,
      }

      // Tokenizar dados do cartão se necessário
      if (paymentMethod === 'cartao') {
        console.log('Tokenizando dados do cartão...')
        
        const tokenizeResponse = await fetch('/api/pacto/tokenize-card', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            numero: formData.numeroCartao,
            nome: formData.nomeCartao,
            validade: formData.validadeCartao,
            cvv: formData.cvvCartao,
            parcelas: 1
          })
        })
        
        const tokenizeResult = await tokenizeResponse.json()
        
        if (!tokenizeResult.success) {
          throw new Error(tokenizeResult.error || 'Falha ao tokenizar cartão')
        }
        
        saleBody.cartaoToken = tokenizeResult.token
        console.log('Cartão tokenizado:', tokenizeResult.maskedCard)
      }

      console.log('Processando pagamento via API Pacto V3', saleBody)
      const res = await fetch(`/api/pacto-v3/venda/${unidadeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saleBody),
      })

      // Handle rate limit error
      if (res.status === 429) {
        setPaymentResult({
          success: false,
          message: 'Muitas tentativas. Seu pedido está sendo processado e você receberá um e-mail de confirmação em breve.',
          isPending: true
        })
        setStep(4) // Go to success screen with pending message
        return
      }

      const result = await res.json()

      setPaymentResult(result)

      if (result.success) {
        setStep(4)
      } else {
        console.error('Erro no pagamento:', result.error)
        alert(`Erro ao processar pagamento: ${result.error}`)
        setStep(2)
      }
    } catch (error) {
      console.error('Erro no pagamento:', error)
      if (error instanceof Error && error.message.includes('reCAPTCHA')) {
        alert('Erro na validação de segurança. Tente novamente.')
      } else {
        // Fallback message for any error
        setPaymentResult({
          success: false,
          message: 'Seu pedido está sendo processado. Você receberá um e-mail de confirmação em breve com os próximos passos.',
          isPending: true
        })
        setStep(4)
        return
      }
      setStep(2)
    } finally {
      setLoading(false)
    }
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

  const formatRG = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})\d+?$/, '$1')
  }

  if (!isOpen || !plano) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-live-bg rounded-2xl border border-live-border/30 w-full max-w-2xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-live-border/30">
            <div>
              <h2 className="text-2xl font-bold text-white">Matrícula</h2>
              <p className="text-white/80">
                {plano.name} - {unidadeName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-live-border/20 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-white/80" />
            </button>
          </div>

          {/* Progress */}
          <div className="px-6 py-4 bg-live-border/5">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    s <= step 
                      ? 'bg-live-accent text-black' 
                      : 'bg-live-border/20 text-white/80'
                  }`}>
                    {s < step || (s === step && step === 4) ? <Check className="h-4 w-4" /> : s}
                  </div>
                  {s < 4 && (
                    <div className={`w-16 h-1 mx-2 ${
                      s < step ? 'bg-live-accent' : 'bg-live-border/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {/* Step 1: Dados Pessoais */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  Dados Pessoais
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      className="w-full px-4 py-3 bg-live-border/10 border border-live-border/30 rounded-lg focus:border-live-accent focus:outline-none text-white"
                      placeholder="Digite seu nome completo"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-live-border/10 border border-live-border/30 rounded-lg focus:border-live-accent focus:outline-none text-white"
                      placeholder="seu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">
                      Telefone *
                    </label>
                    <input
                      type="text"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', formatPhone(e.target.value))}
                      className="w-full px-4 py-3 bg-live-border/10 border border-live-border/30 rounded-lg focus:border-live-accent focus:outline-none text-white"
                      placeholder="(11) 99999-9999"
                      maxLength={15}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">
                      CPF *
                    </label>
                    <input
                      type="text"
                      value={formData.cpf}
                      onChange={(e) => handleInputChange('cpf', formatCPF(e.target.value))}
                      className="w-full px-4 py-3 bg-live-border/10 border border-live-border/30 rounded-lg focus:border-live-accent focus:outline-none text-white"
                      placeholder="000.000.000-00"
                      maxLength={14}
                    />
                  </div>
                </div>
                
                {/* Endereço separado */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Endereço</h4>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-white mb-1">
                        Rua/Logradouro *
                      </label>
                      <input
                        type="text"
                        value={formData.endereco}
                        onChange={(e) => handleInputChange('endereco', e.target.value)}
                        className="w-full px-4 py-3 bg-live-border/10 border border-live-border/30 rounded-lg focus:border-live-accent focus:outline-none text-white"
                        placeholder="Rua das Flores"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Número *
                      </label>
                      <input
                        type="text"
                        value={formData.numero}
                        onChange={(e) => handleInputChange('numero', e.target.value)}
                        className="w-full px-4 py-3 bg-live-border/10 border border-live-border/30 rounded-lg focus:border-live-accent focus:outline-none text-white"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Complemento
                      </label>
                      <input
                        type="text"
                        value={formData.complemento}
                        onChange={(e) => handleInputChange('complemento', e.target.value)}
                        className="w-full px-4 py-3 bg-live-border/10 border border-live-border/30 rounded-lg focus:border-live-accent focus:outline-none text-white"
                        placeholder="Apto 101, Bloco A"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Bairro *
                      </label>
                      <input
                        type="text"
                        value={formData.bairro}
                        onChange={(e) => handleInputChange('bairro', e.target.value)}
                        className="w-full px-4 py-3 bg-live-border/10 border border-live-border/30 rounded-lg focus:border-live-accent focus:outline-none text-white"
                        placeholder="Centro"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Cidade *
                      </label>
                      <input
                        type="text"
                        value={formData.cidade}
                        onChange={(e) => handleInputChange('cidade', e.target.value)}
                        className="w-full px-4 py-3 bg-live-border/10 border border-live-border/30 rounded-lg focus:border-live-accent focus:outline-none text-white"
                        placeholder="São Paulo"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Estado *
                      </label>
                      <select
                        value={formData.estado}
                        onChange={(e) => handleInputChange('estado', e.target.value)}
                        className="w-full px-4 py-3 bg-live-border/10 border border-live-border/30 rounded-lg focus:border-live-accent focus:outline-none text-white"
                        required
                      >
                        <option value="">Selecione</option>
                        <option value="SP">São Paulo</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="PR">Paraná</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="BA">Bahia</option>
                        <option value="GO">Goiás</option>
                        <option value="PE">Pernambuco</option>
                        <option value="CE">Ceará</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        CEP *
                      </label>
                      <input
                        type="text"
                        value={formData.cep}
                        onChange={(e) => handleInputChange('cep', formatCEP(e.target.value))}
                        className="w-full px-4 py-3 bg-live-border/10 border border-live-border/30 rounded-lg focus:border-live-accent focus:outline-none text-white"
                        placeholder="01234-567"
                        maxLength={9}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Dados pessoais adicionais */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Dados Pessoais</h4>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Data de Nascimento *
                      </label>
                      <input
                        type="date"
                        value={formData.dataNascimento}
                        onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                        className="w-full px-4 py-3 bg-live-border/10 border border-live-border/30 rounded-lg focus:border-live-accent focus:outline-none text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Sexo *
                      </label>
                      <select
                        value={formData.sexo}
                        onChange={(e) => handleInputChange('sexo', e.target.value)}
                        className="w-full px-4 py-3 bg-live-border/10 border border-live-border/30 rounded-lg focus:border-live-accent focus:outline-none text-white"
                        required
                      >
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                        <option value="O">Outro</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        RG
                      </label>
                      <input
                        type="text"
                        value={formData.rg}
                        onChange={(e) => handleInputChange('rg', formatRG(e.target.value))}
                        className="w-full px-4 py-3 bg-live-border/10 border border-live-border/30 rounded-lg focus:border-live-accent focus:outline-none text-white"
                        placeholder="12.345.678-9"
                        maxLength={12}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Aceite de Termos */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Termos e Condições</h4>
                  
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="aceiteTermos"
                      checked={formData.aceiteTermos}
                      onChange={(e) => setFormData(prev => ({ ...prev, aceiteTermos: e.target.checked }))}
                      className="mt-1 h-4 w-4 text-live-accent border-live-border/30 rounded focus:ring-live-accent focus:ring-2"
                      required
                    />
                    <label htmlFor="aceiteTermos" className="text-sm text-white leading-relaxed">
                      Eu aceito os{' '}
                      <a 
                        href="/termos-de-uso" 
                        target="_blank" 
                        className="text-live-accent hover:underline font-medium"
                      >
                        Termos de Uso
                      </a>{' '}
                      e a{' '}
                      <a 
                        href="/politica-privacidade" 
                        target="_blank" 
                        className="text-live-accent hover:underline font-medium"
                      >
                        Política de Privacidade
                      </a>{' '}
                      da Live Academia, e autorizo o tratamento dos meus dados pessoais conforme descrito nos documentos. *
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Pagamento */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  Forma de Pagamento
                </h3>
                
                {/* Resumo do Plano */}
                <div className="bg-live-border/5 p-4 rounded-lg border border-live-border/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-white">{plano.name}</h4>
                      <p className="text-white/80">{unidadeName}</p>
                    </div>
                    <div className="text-2xl font-bold text-live-accent">
                      R$ {plano.price}/mês
                    </div>
                  </div>
                </div>
                
                {/* Método de Pagamento - Apenas Cartão */}
                <div className="bg-live-accent/5 border border-live-accent rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-live-accent" />
                    <span className="font-medium text-white">Cartão de Crédito</span>
                  </div>
                  <p className="text-sm text-white/80 mt-2">
                    Pagamento seguro processado pela nossa parceira de pagamentos
                  </p>
                </div>

                {/* Dados do Cartão */}
                {paymentMethod === 'cartao' && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Card Preview */}
                    <div className="flex items-center justify-center">
                      <AnimatedPaymentCard
                        cardNumber={formData.numeroCartao || '•••• •••• •••• ••••'}
                        cardName={formData.nomeCartao || 'SEU NOME'}
                        cardExpiry={formData.validadeCartao || 'MM/AA'}
                      />
                    </div>

                    {/* Card Form */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">Dados do Cartão</h4>
                      <div>
                        <label className="block text-sm font-medium text-white mb-1">
                          Número do Cartão
                        </label>
                        <input
                          type="text"
                          value={formData.numeroCartao}
                          onChange={(e) => handleInputChange('numeroCartao', formatCardNumber(e.target.value))}
                          className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-live-yellow/50 focus:outline-none text-white transition-all"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-1">
                          Nome no Cartão
                        </label>
                        <input
                          type="text"
                          value={formData.nomeCartao}
                          onChange={(e) => handleInputChange('nomeCartao', e.target.value.toUpperCase())}
                          className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-live-yellow/50 focus:outline-none text-white transition-all"
                          placeholder="NOME COMO NO CARTÃO"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-1">
                            Validade
                          </label>
                          <input
                            type="text"
                            value={formData.validadeCartao}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, '')
                              if (value.length >= 2) {
                                value = value.replace(/(\d{2})(\d)/, '$1/$2')
                              }
                              handleInputChange('validadeCartao', value)
                            }}
                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-live-yellow/50 focus:outline-none text-white transition-all"
                            placeholder="MM/AA"
                            maxLength={5}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-white mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            value={formData.cvvCartao}
                            onChange={(e) => handleInputChange('cvvCartao', e.target.value.replace(/\D/g, ''))}
                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-live-yellow/50 focus:outline-none text-white transition-all"
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 3: Processando */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Loader2 className="h-12 w-12 animate-spin text-live-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Processando Pagamento
                </h3>
                <p className="text-white/80">
                  Aguarde enquanto processamos sua matrícula...
                </p>
              </motion.div>
            )}

            {/* Step 4: Sucesso */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                {paymentResult?.isPending ? (
                  /* Tela de Processamento/Pendente */
                  <>
                    <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      Processando sua Compra
                    </h3>
                    <p className="text-white/80 mb-6">
                      {paymentResult?.message || 'Seu pedido está sendo processado. Você receberá um e-mail de confirmação em breve com os próximos passos.'}
                    </p>

                    

                    <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30 mb-6">
                      <p className="text-sm text-white/90">
                        <strong>Importante:</strong> Salve o número {formData.telefone} - entraremos em contato em breve!
                      </p>
                    </div>
                  </>
                ) : (
                  /* Tela de Sucesso Normal */
                  <>
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      Matrícula Realizada!
                    </h3>
                    <p className="text-white/80 mb-6">
                      Parabéns! Sua matrícula na {unidadeName} foi realizada com sucesso.
                    </p>
                  </>
                )}

                {/* Informações da transação */}
                {paymentResult?.transactionId && !paymentResult?.isPending && (
                  <div className="bg-live-border/5 p-4 rounded-lg border border-live-border/30 mb-6">
                    <h4 className="font-semibold text-white mb-3">Pagamento Aprovado</h4>
                    <div className="flex items-center gap-2 bg-live-bg p-3 rounded-lg">
                      <span className="text-sm text-white">ID da Transação:</span>
                      <code className="flex-1 text-sm text-live-accent font-mono">
                        {paymentResult.transactionId}
                      </code>
                      <button 
                        onClick={() => navigator.clipboard.writeText(paymentResult.transactionId!)}
                        className="p-2 hover:bg-live-border/20 rounded transition-colors"
                      >
                        <Copy className="h-4 w-4 text-live-accent" />
                      </button>
                    </div>
                    <p className="text-sm text-white/80 mt-2">
                      Sua matrícula foi ativada instantaneamente!
                    </p>
                  </div>
                )}
                
                {/* Detalhes da matrícula */}
                <div className="bg-live-border/5 p-4 rounded-lg border border-live-border/30 mb-6">
                  <h4 className="font-semibold text-white mb-2">Detalhes da Matrícula</h4>
                  <div className="text-white/80 space-y-1">
                    <p><strong>Plano:</strong> {plano?.name}</p>
                    <p><strong>Unidade:</strong> {unidadeName}</p>
                    <p><strong>Valor:</strong> R$ {plano?.price}/mês</p>
                  </div>
                </div>
                
                <p className="text-sm text-white/80">
                  Em breve você receberá um e-mail com todos os detalhes e instruções para começar a treinar!
                </p>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          {(step === 1 || step === 2) && (
            <div className="flex items-center justify-between p-6 border-t border-live-border/30">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border border-live-border/30 rounded-lg text-white hover:bg-live-border/10 transition-colors"
                >
                  Voltar
                </button>
              )}
              
              <button
                onClick={handleNextStep}
                disabled={loading || (step === 2 && !recaptchaLoaded)}
                className="ml-auto px-8 py-3 bg-gradient-to-r from-live-accent to-yellow-500 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : step === 2 && !recaptchaLoaded ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Carregando Segurança...
                  </>
                ) : (
                  <>
                    {step === 1 ? 'Continuar' : 'Finalizar Pagamento'}
                  </>
                )}
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="p-6 border-t border-live-border/30">
              <button
                onClick={onClose}
                className="w-full px-8 py-3 bg-gradient-to-r from-live-accent to-yellow-500 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Fechar
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}