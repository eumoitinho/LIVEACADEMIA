// ========================================
// EXEMPLOS DE IMPLEMENTAÇÃO DO ANALYTICS
// ========================================

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAnalytics } from '@/src/hooks/use-analytics'

// ========================================
// 1. EXEMPLO: BOTÃO DE CALL-TO-ACTION
// ========================================

export function CTAButton({ ctaName, location, children, onClick, ...props }: {
  ctaName: string
  location: string
  children: React.ReactNode
  onClick?: () => void
  [key: string]: any
}) {
  const { trackCTAClick } = useAnalytics()

  const handleClick = () => {
    // Track do clique
    trackCTAClick(ctaName, location, {
      button_text: children,
      timestamp: new Date().toISOString()
    })

    // Executa ação original
    if (onClick) onClick()
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  )
}

// ========================================
// 2. EXEMPLO: CARD DE PLANO
// ========================================

export function PlanCard({ plano }: { plano: any }) {
  const { trackPlanView, trackPlanSelect, trackCheckoutStart } = useAnalytics()

  // Track quando o card entra na viewport
  const handleView = () => {
    trackPlanView(
      plano.id,
      plano.nome,
      plano.valor,
      plano.unidade_id
    )
  }

  // Track quando usuário clica em "Matricular"
  const handleSelect = () => {
    trackPlanSelect(
      plano.id,
      plano.nome,
      plano.valor,
      plano.unidade_id
    )
    
    // Abrir modal de checkout
    // ... lógica do modal
  }

  // Track quando checkout é iniciado
  const handleCheckoutStart = () => {
    trackCheckoutStart(
      plano.id,
      plano.nome,
      plano.valor,
      plano.unidade_id
    )
  }

  return (
    <div>
      <h3>{plano.nome}</h3>
      <p>R$ {plano.valor / 100}</p>
      <CTAButton 
        ctaName="Matricular" 
        location="plan_card"
        onClick={handleSelect}
      >
        Matricular-se
      </CTAButton>
    </div>
  )
}

// ========================================
// 3. EXEMPLO: CHECKOUT MODAL
// ========================================

export function CheckoutModal({ plano, onClose }: { plano: any, onClose: () => void }) {
  const { trackCheckoutStep, trackPaymentAttempt, trackPaymentResult } = useAnalytics()
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    { id: 1, name: 'dados_pessoais' },
    { id: 2, name: 'pagamento' },
    { id: 3, name: 'confirmacao' }
  ]

  // Track cada etapa do checkout
  const handleStepChange = (step: number) => {
    const stepName = steps.find(s => s.id === step)?.name || 'unknown'
    trackCheckoutStep(step, stepName, plano.id, plano.valor)
    setCurrentStep(step)
  }

  // Track tentativa de pagamento
  const handlePaymentAttempt = async (paymentMethod: 'pix' | 'cartao' | 'boleto') => {
    trackPaymentAttempt(paymentMethod, plano.id, plano.valor)
    
    try {
      // Processar pagamento
      const result = await processPayment(paymentMethod, plano)
      
      // Track resultado
      trackPaymentResult(
        paymentMethod,
        result.status,
        result.transaction_id,
        plano.valor,
        plano.id
      )
      
      if (result.status === 'aprovado') {
        // Redirecionar para sucesso
        router.push('/sucesso')
      }
    } catch (error) {
      trackPaymentResult(paymentMethod, 'rejeitado', '', plano.valor, plano.id)
    }
  }

  return (
    <div className="checkout-modal">
      {/* Renderizar etapa atual */}
      <div className="step-indicator">
        {steps.map(step => (
          <div 
            key={step.id}
            className={currentStep === step.id ? 'active' : ''}
            onClick={() => handleStepChange(step.id)}
          >
            {step.name}
          </div>
        ))}
      </div>
      
      {/* Conteúdo da etapa */}
      {currentStep === 1 && <PersonalDataForm onNext={() => handleStepChange(2)} />}
      {currentStep === 2 && <PaymentForm onPayment={handlePaymentAttempt} />}
      {currentStep === 3 && <ConfirmationStep />}
    </div>
  )
}

// ========================================
// 4. EXEMPLO: FORMULÁRIO DE LEAD
// ========================================

export function LeadForm({ leadType, leadSource }: { leadType: string, leadSource: string }) {
  const { trackFormStart, trackFormComplete, trackLead } = useAnalytics()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Track início do formulário
  useEffect(() => {
    trackFormStart(leadType, leadSource)
  }, [leadType, leadSource, trackFormStart])

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true)
    
    try {
      // Enviar dados
      const result = await submitLead(formData)
      
      // Track sucesso
      trackFormComplete(leadType, leadSource, true)
      trackLead({
        lead_type: leadType,
        lead_source: leadSource,
        contact_method: formData.contact_method,
        lead_value: formData.estimated_value
      })
      
      // Mostrar sucesso
      showSuccessMessage()
    } catch (error) {
      // Track erro
      trackFormComplete(leadType, leadSource, false)
      showErrorMessage()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos do formulário */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  )
}

// ========================================
// 5. EXEMPLO: PÁGINA DE UNIDADE
// ========================================

export function UnitPage({ unit }: { unit: any }) {
  const { trackUnitView, trackCTAClick } = useAnalytics()

  // Track visualização da unidade
  useEffect(() => {
    trackUnitView(unit.id, unit.name)
  }, [unit.id, unit.name, trackUnitView])

  const handleContactClick = (method: string) => {
    trackCTAClick(`Contact_${method}`, 'unit_page', {
      unit_id: unit.id,
      unit_name: unit.name,
      contact_method: method
    })
  }

  const handleDirectionsClick = () => {
    trackCTAClick('Get_Directions', 'unit_page', {
      unit_id: unit.id,
      unit_name: unit.name
    })
  }

  return (
    <div className="unit-page">
      <h1>{unit.name}</h1>
      <p>{unit.address}</p>
      
      <div className="contact-buttons">
        <button onClick={() => handleContactClick('phone')}>
          Ligar
        </button>
        <button onClick={() => handleContactClick('whatsapp')}>
          WhatsApp
        </button>
        <button onClick={handleDirectionsClick}>
          Como Chegar
        </button>
      </div>
    </div>
  )
}

// ========================================
// 6. EXEMPLO: PLAYER DE VÍDEO
// ========================================

export function VideoPlayer({ video }: { video: any }) {
  const { trackVideoPlay } = useAnalytics()

  const handlePlay = () => {
    trackVideoPlay(video.title, video.duration)
  }

  return (
    <video onPlay={handlePlay}>
      <source src={video.src} type="video/mp4" />
    </video>
  )
}

// ========================================
// 7. EXEMPLO: TRACKING DE ERROS
// ========================================

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const { trackError } = useAnalytics()

  const handleError = (error: Error, errorInfo: any) => {
    trackError('react_error_boundary', error.message, errorInfo.componentStack)
  }

  return (
    <ErrorBoundary onError={handleError}>
      {children}
    </ErrorBoundary>
  )
}

// ========================================
// 8. EXEMPLO: PIX ESPECÍFICO
// ========================================

export function PixPayment({ transactionId, valor }: { transactionId: string, valor: number }) {
  const { trackPixQRGenerated, trackPixQRDisplayed, trackPixCopyCode } = useAnalytics()
  const [qrCode, setQrCode] = useState<string>('')
  const [pixCode, setPixCode] = useState<string>('')

  useEffect(() => {
    // Gerar QR Code e código PIX
    generatePixPayment(transactionId, valor).then(result => {
      setQrCode(result.qrCode)
      setPixCode(result.pixCode)
      
      // Track geração
      trackPixQRGenerated(transactionId, valor)
      
      // Track exibição
      trackPixQRDisplayed(transactionId)
    })
  }, [transactionId, valor, trackPixQRGenerated, trackPixQRDisplayed])

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pixCode)
    trackPixCopyCode(transactionId)
    showCopySuccessMessage()
  }

  return (
    <div className="pix-payment">
      <img src={qrCode} alt="QR Code PIX" />
      <button onClick={handleCopyCode}>
        Copiar Código PIX
      </button>
    </div>
  )
}

// ========================================
// 9. EXEMPLO: PAGE VIEW CUSTOMIZADO
// ========================================

export function CustomPage({ children }: { children: React.ReactNode }) {
  const { trackPageView } = useAnalytics()
  const router = useRouter()

  useEffect(() => {
    // Track page view com dados customizados
    trackPageView(router.asPath, {
      page_type: 'custom',
      user_segment: 'premium',
      referrer: document.referrer
    })
  }, [router.asPath, trackPageView])

  return <div>{children}</div>
}

// ========================================
// 10. EXEMPLO: TRACKING DE SCROLL DEPTH
// ========================================

export function ScrollDepthTracker() {
  const { trackEvent } = useAnalytics()
  const [maxScroll, setMaxScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)

      if (scrollPercent > maxScroll) {
        setMaxScroll(scrollPercent)
        
        // Track marcos de scroll
        if (scrollPercent >= 25 && maxScroll < 25) {
          trackEvent('scroll_depth', { depth: 25 })
        } else if (scrollPercent >= 50 && maxScroll < 50) {
          trackEvent('scroll_depth', { depth: 50 })
        } else if (scrollPercent >= 75 && maxScroll < 75) {
          trackEvent('scroll_depth', { depth: 75 })
        } else if (scrollPercent >= 90 && maxScroll < 90) {
          trackEvent('scroll_depth', { depth: 90 })
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [maxScroll, trackEvent])

  return null // Componente invisível
}
