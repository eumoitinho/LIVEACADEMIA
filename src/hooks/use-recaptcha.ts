import { useCallback, useEffect, useState } from 'react'

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
      render: (element: string | HTMLElement, options: any) => number
    }
  }
}

interface UseRecaptchaReturn {
  isLoaded: boolean
  isExecuting: boolean
  executeRecaptcha: (action?: string) => Promise<string>
  error: string | null
}

export function useRecaptcha(): UseRecaptchaReturn {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isExecuting, setIsExecuting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LfQVbIUAAAAAJkFWWnSKLo9ATaKt3axLDRvVkK9'

  useEffect(() => {
    // Carregar o script do reCAPTCHA se ainda não estiver carregado
    if (typeof window !== 'undefined' && !window.grecaptcha) {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
      script.async = true
      script.defer = true
      
      script.onload = () => {
        if (window.grecaptcha) {
          window.grecaptcha.ready(() => {
            setIsLoaded(true)
            setError(null)
            console.log('[reCAPTCHA] Carregado com sucesso')
          })
        }
      }
      
      script.onerror = () => {
        setError('Erro ao carregar reCAPTCHA')
        console.error('[reCAPTCHA] Erro ao carregar script')
      }
      
      document.head.appendChild(script)
    } else if (window.grecaptcha) {
      setIsLoaded(true)
    }

    return () => {
      // Cleanup se necessário
    }
  }, [siteKey])

  const executeRecaptcha = useCallback(async (action: string = 'submit'): Promise<string> => {
    if (!isLoaded || !window.grecaptcha) {
      throw new Error('reCAPTCHA não está carregado')
    }

    setIsExecuting(true)
    setError(null)

    try {
      const token = await window.grecaptcha.execute(siteKey, { action })
      console.log('[reCAPTCHA] Token gerado com sucesso')
      return token
    } catch (err: any) {
      const errorMessage = 'Erro ao executar reCAPTCHA'
      setError(errorMessage)
      console.error('[reCAPTCHA] Erro:', err)
      throw new Error(errorMessage)
    } finally {
      setIsExecuting(false)
    }
  }, [isLoaded, siteKey])

  return {
    isLoaded,
    isExecuting,
    executeRecaptcha,
    error,
  }
}
