'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2, AlertCircle, FileText } from 'lucide-react'
import type { ParqResponse, ParqAnswer, ParqPergunta } from '@/lib/api/pacto-checkout-types'

interface ParqStepProps {
  unidadeId: string
  leadId: string
  onComplete: () => void
  onSkip?: () => void
}

export function ParqStep({
  unidadeId,
  leadId,
  onComplete,
  onSkip
}: ParqStepProps) {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [parqData, setParqData] = useState<ParqResponse | null>(null)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasPositiveAnswers, setHasPositiveAnswers] = useState(false)

  // Fetch PAR-Q questionnaire
  useEffect(() => {
    const fetchParq = async () => {
      try {
        const response = await fetch(`/api/pacto-v3/parq/${unidadeId}`)
        const data = await response.json()

        if (data.success && data.data) {
          setParqData(data.data)
        } else {
          setError('Não foi possível carregar o questionário PAR-Q')
        }
      } catch (err) {
        console.error('Error fetching PAR-Q:', err)
        setError('Erro ao carregar questionário')
      } finally {
        setLoading(false)
      }
    }

    fetchParq()
  }, [unidadeId])

  // Check if any answer is positive (Sim = 1)
  useEffect(() => {
    const hasPositive = Object.values(answers).some(answer => answer === 1)
    setHasPositiveAnswers(hasPositive)
  }, [answers])

  // Handle answer change
  const handleAnswerChange = (perguntaCodigo: number, respostaCodigo: number) => {
    setAnswers({
      ...answers,
      [perguntaCodigo]: respostaCodigo
    })
  }

  // Check if all questions are answered
  const allQuestionsAnswered = () => {
    if (!parqData?.parq?.perguntas) return false
    return parqData.parq.perguntas.every(pergunta =>
      answers[pergunta.codigo] !== undefined
    )
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (!allQuestionsAnswered()) {
      setError('Por favor, responda todas as perguntas')
      return
    }

    if (parqData?.apresentarLeiParq && !acceptTerms) {
      setError('Você deve aceitar os termos para continuar')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      // Format answers for API
      const respostas: ParqAnswer[] = Object.entries(answers).map(([perguntaCodigo, respostaCodigo]) => ({
        perguntaCodigo: parseInt(perguntaCodigo),
        respostaCodigo
      }))

      // Submit PAR-Q answers
      const response = await fetch(`/api/pacto-v3/parq/${unidadeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          leadId,
          respostas,
          aceitouTermos: acceptTerms
        })
      })

      const data = await response.json()

      if (!data.success && !data.warning) {
        throw new Error(data.error || 'Erro ao enviar questionário')
      }

      // Success - continue to next step
      onComplete()
    } catch (err) {
      console.error('Error submitting PAR-Q:', err)
      setError(
        err instanceof Error
          ? err.message
          : 'Erro ao enviar questionário. Você pode continuar.'
      )
      // Allow user to continue even on error
      setTimeout(() => {
        onComplete()
      }, 3000)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-600" />
        <span className="ml-3 text-gray-600">Carregando questionário...</span>
      </div>
    )
  }

  if (!parqData?.parq) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            Não foi possível carregar o questionário PAR-Q, mas você pode continuar com seu cadastro.
          </p>
        </div>
        <Button
          onClick={onComplete}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold"
        >
          Continuar para o Checkout
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <FileText className="h-12 w-12 text-yellow-600 mx-auto" />
        <h3 className="text-2xl font-bold text-gray-900">
          Questionário de Prontidão para Atividade Física
        </h3>
        <p className="text-gray-600">
          Por favor, responda às perguntas abaixo com sinceridade
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {parqData.parq.perguntas.map((pergunta: ParqPergunta, index: number) => (
          <div key={pergunta.codigo} className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <Label className="text-sm font-medium">
              {index + 1}. {pergunta.descricao}
            </Label>
            <RadioGroup
              value={answers[pergunta.codigo]?.toString()}
              onValueChange={(value) => handleAnswerChange(pergunta.codigo, parseInt(value))}
            >
              {pergunta.respostas.map((resposta) => (
                <div key={resposta.codigo} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={resposta.codigo.toString()}
                    id={`${pergunta.codigo}-${resposta.codigo}`}
                  />
                  <Label
                    htmlFor={`${pergunta.codigo}-${resposta.codigo}`}
                    className={`cursor-pointer ${
                      resposta.codigo === 1 ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {resposta.descricao}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>

      {/* Warning if has positive answers */}
      {hasPositiveAnswers && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="ml-3">
              <h4 className="text-sm font-medium text-amber-900">
                Atenção: Consulte um médico
              </h4>
              <p className="mt-1 text-sm text-amber-700">
                Você respondeu "Sim" a uma ou mais perguntas. Recomendamos que consulte um médico
                antes de iniciar ou aumentar suas atividades físicas.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Terms acceptance */}
      {parqData.apresentarLeiParq && (
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
              Li e concordo com os termos do questionário PAR-Q e entendo que devo consultar
              um médico se respondi "Sim" a qualquer pergunta.
              {parqData.siglaEstadoLeiParq && (
                <span className="text-xs text-gray-500 ml-1">
                  (Lei estadual - {parqData.siglaEstadoLeiParq})
                </span>
              )}
            </Label>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        {onSkip && (
          <Button
            type="button"
            variant="outline"
            onClick={onSkip}
            disabled={submitting}
            className="flex-1"
          >
            Pular
          </Button>
        )}
        <Button
          onClick={handleSubmit}
          disabled={submitting || !allQuestionsAnswered() || (parqData.apresentarLeiParq && !acceptTerms)}
          className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Enviando...
            </>
          ) : (
            'Continuar'
          )}
        </Button>
      </div>

      {/* Info text */}
      <p className="text-xs text-center text-gray-500">
        Este questionário é para sua segurança e bem-estar durante as atividades físicas.
      </p>
    </div>
  )
}