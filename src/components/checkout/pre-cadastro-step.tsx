'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, User, Mail, Phone } from 'lucide-react'
import type { PreCadastroData } from '@/lib/api/pacto-checkout-types'

interface PreCadastroStepProps {
  unidadeId: string
  onComplete: (data: PreCadastroData, leadId: string) => void
  initialData?: Partial<PreCadastroData>
}

export function PreCadastroStep({
  unidadeId,
  onComplete,
  initialData
}: PreCadastroStepProps) {
  const [formData, setFormData] = useState<PreCadastroData>({
    nome: initialData?.nome || '',
    email: initialData?.email || '',
    telefone: initialData?.telefone || ''
  })

  const [errors, setErrors] = useState<Partial<PreCadastroData>>({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  // Format phone number
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1')
    }
    return value
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<PreCadastroData> = {}

    if (!formData.nome || formData.nome.length < 2) {
      newErrors.nome = 'Nome completo é obrigatório'
    }

    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }

    const phoneNumbers = formData.telefone.replace(/\D/g, '')
    if (!formData.telefone) {
      newErrors.telefone = 'Telefone é obrigatório'
    } else if (phoneNumbers.length < 10 || phoneNumbers.length > 11) {
      newErrors.telefone = 'Telefone inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setApiError(null)

    try {
      const response = await fetch(`/api/pacto-v3/lead/${unidadeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          idade: 0,
          landing: window.location.pathname,
          landing_url: window.location.href,
          mensagem: 'VendasOnline2.0 - Live Academia'
        })
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Erro ao cadastrar lead')
      }

      // Success - call onComplete with lead ID
      onComplete(formData, data.leadId || '')
    } catch (error) {
      console.error('Error submitting lead:', error)
      setApiError(
        error instanceof Error
          ? error.message
          : 'Erro ao processar cadastro. Tente novamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6" style={{ color: '#000000' }}>
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold" style={{ color: '#000000' }}>
          Bora treinar? 💪
        </h3>
        <p style={{ color: '#1f2937' }}>
          Precisamos apenas de 3 informações básicas
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome */}
        <div className="space-y-2">
          <Label htmlFor="nome" className="flex items-center gap-2 font-semibold" style={{ color: '#000000' }}>
            <User className="h-4 w-4" style={{ color: '#374151' }} />
            Nome Completo *
          </Label>
          <Input
            id="nome"
            type="text"
            placeholder="Digite seu nome completo"
            value={formData.nome}
            onChange={(e) => {
              setFormData({ ...formData, nome: e.target.value })
              setErrors({ ...errors, nome: undefined })
            }}
            className={errors.nome ? 'border-red-500' : ''}
            style={{ color: '#000000' }}
            disabled={loading}
          />
          {errors.nome && (
            <p className="text-sm text-red-500">{errors.nome}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2 font-semibold" style={{ color: '#000000' }}>
            <Mail className="h-4 w-4" style={{ color: '#374151' }} />
            E-mail *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value })
              setErrors({ ...errors, email: undefined })
            }}
            className={errors.email ? 'border-red-500' : ''}
            style={{ color: '#000000' }}
            disabled={loading}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Telefone */}
        <div className="space-y-2">
          <Label htmlFor="telefone" className="flex items-center gap-2 font-semibold" style={{ color: '#000000' }}>
            <Phone className="h-4 w-4" style={{ color: '#374151' }} />
            Telefone/WhatsApp *
          </Label>
          <Input
            id="telefone"
            type="tel"
            placeholder="(00) 00000-0000"
            value={formData.telefone}
            onChange={(e) => {
              const formatted = formatPhone(e.target.value)
              setFormData({ ...formData, telefone: formatted })
              setErrors({ ...errors, telefone: undefined })
            }}
            maxLength={15}
            className={errors.telefone ? 'border-red-500' : ''}
            style={{ color: '#000000' }}
            disabled={loading}
          />
          {errors.telefone && (
            <p className="text-sm text-red-500">{errors.telefone}</p>
          )}
        </div>

        {/* API Error */}
        {apiError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{apiError}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-6 text-lg"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Cadastrando...
            </>
          ) : (
            'Continuar para o Checkout'
          )}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-xs" style={{ color: '#4b5563' }}>
          Ao continuar, você concorda com nossos{' '}
          <a href="/termos" target="_blank" className="underline" style={{ color: '#1f2937' }}>
            Termos de Uso
          </a>{' '}
          e{' '}
          <a href="/privacidade" target="_blank" className="underline" style={{ color: '#1f2937' }}>
            Política de Privacidade
          </a>
        </p>
      </div>
    </div>
  )
}