/**
 * Hook para debounce de valores e funções
 * Evita execuções excessivas de funções
 */

import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Debounce de um valor
 * @param value - Valor para debounce
 * @param delay - Delay em milissegundos
 * @returns Valor com debounce
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Debounce de uma função
 * @param func - Função para debounce
 * @param delay - Delay em milissegundos
 * @returns Função com debounce
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 2000
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastCallRef = useRef<number>(0)

  const debouncedFunc = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()
      lastCallRef.current = now

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      return new Promise<ReturnType<T>>((resolve, reject) => {
        timeoutRef.current = setTimeout(async () => {
          // Verificar se ainda é a chamada mais recente
          if (lastCallRef.current === now) {
            try {
              const result = await func(...args)
              resolve(result)
            } catch (error) {
              reject(error)
            }
          }
        }, delay)
      })
    },
    [func, delay]
  ) as T

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedFunc
}

/**
 * Hook para controlar se uma operação está em debounce
 */
export function useDebounceState(initialValue: boolean = false) {
  const [isDebouncing, setIsDebouncing] = useState(initialValue)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const startDebounce = useCallback((delay: number = 2000) => {
    setIsDebouncing(true)
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setIsDebouncing(false)
    }, delay)
  }, [])

  const stopDebounce = useCallback(() => {
    setIsDebouncing(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    isDebouncing,
    startDebounce,
    stopDebounce
  }
}

export default useDebounce
