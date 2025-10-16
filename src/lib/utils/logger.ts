/**
 * Logger condicional com suporte a níveis
 * 
 * Evita logs sensíveis em produção e fornece logging estruturado.
 * 
 * Uso:
 * ```ts
 * import { logger } from '@/lib/utils/logger'
 * 
 * logger.debug('Fetching data', { userId: 123 })
 * logger.info('User logged in', { email: 'user@example.com' })
 * logger.warn('Rate limit approaching', { remaining: 10 })
 * logger.error('Payment failed', new Error('Timeout'), { orderId: '123' })
 * ```
 * 
 * TODO: Integrar com Sentry/LogRocket em produção
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogContext {
  [key: string]: any
}

class Logger {
  private isDev: boolean
  private isDebug: boolean
  private isProd: boolean

  constructor() {
    this.isDev = process.env.NODE_ENV === 'development'
    this.isDebug = process.env.NEXT_PUBLIC_DEBUG === 'true'
    this.isProd = process.env.NODE_ENV === 'production'
  }

  /**
   * Formata timestamp para logs
   */
  private getTimestamp(): string {
    return new Date().toISOString()
  }

  /**
   * Formata mensagem de log
   */
  private format(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = this.getTimestamp()
    const levelUpper = level.toUpperCase().padEnd(5)
    
    let formatted = `[${timestamp}] ${levelUpper} ${message}`
    
    if (context && Object.keys(context).length > 0) {
      formatted += ` ${JSON.stringify(context)}`
    }
    
    return formatted
  }

  /**
   * Sanitiza contexto para evitar logging de dados sensíveis
   */
  private sanitizeContext(context?: LogContext): LogContext | undefined {
    if (!context) return undefined

    const sanitized = { ...context }
    const sensitiveKeys = [
      'password',
      'senha',
      'token',
      'apiKey',
      'api_key',
      'creditCard',
      'cardNumber',
      'cvv',
      'ccv',
      'secret',
    ]

    for (const key of Object.keys(sanitized)) {
      const lowerKey = key.toLowerCase()
      if (sensitiveKeys.some(sensitive => lowerKey.includes(sensitive))) {
        sanitized[key] = '[REDACTED]'
      }
    }

    return sanitized
  }

  /**
   * Log de debug (apenas em desenvolvimento ou com DEBUG=true)
   * Útil para troubleshooting sem poluir logs de produção
   */
  debug(message: string, context?: LogContext): void {
    if (!this.isDev && !this.isDebug) return

    const sanitized = this.sanitizeContext(context)
    const formatted = this.format('debug', message, sanitized)
    
    console.log(`🔍 ${formatted}`)
  }

  /**
   * Log de informação (apenas em desenvolvimento)
   * Para eventos normais do sistema
   */
  info(message: string, context?: LogContext): void {
    if (!this.isDev) return

    const sanitized = this.sanitizeContext(context)
    const formatted = this.format('info', message, sanitized)
    
    console.info(`ℹ️  ${formatted}`)
  }

  /**
   * Log de warning (sempre exibido)
   * Para situações anormais que não são erros críticos
   */
  warn(message: string, context?: LogContext): void {
    const sanitized = this.sanitizeContext(context)
    const formatted = this.format('warn', message, sanitized)
    
    console.warn(`⚠️  ${formatted}`)

    // TODO: Enviar para serviço de monitoramento em produção
    if (this.isProd) {
      this.sendToMonitoring('warn', message, sanitized)
    }
  }

  /**
   * Log de erro (sempre exibido)
   * Para erros críticos que requerem atenção
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const sanitized = this.sanitizeContext(context)
    
    const errorDetails: LogContext = {
      ...sanitized,
    }

    if (error instanceof Error) {
      errorDetails.error = {
        name: error.name,
        message: error.message,
        stack: this.isDev ? error.stack : undefined,
      }
    } else if (error) {
      errorDetails.error = error
    }

    const formatted = this.format('error', message, errorDetails)
    
    console.error(`❌ ${formatted}`)

    // TODO: Enviar para Sentry em produção
    if (this.isProd) {
      this.sendToMonitoring('error', message, errorDetails, error)
    }
  }

  /**
   * Envia logs para serviço de monitoramento (Sentry, LogRocket, etc.)
   * TODO: Implementar quando serviços estiverem configurados
   */
  private sendToMonitoring(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error | unknown
  ): void {
    // Placeholder para integração futura
    // 
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   if (error instanceof Error) {
    //     window.Sentry.captureException(error, {
    //       level: level as any,
    //       extra: context,
    //     })
    //   } else {
    //     window.Sentry.captureMessage(message, {
    //       level: level as any,
    //       extra: context,
    //     })
    //   }
    // }
  }

  /**
   * Helper para medir performance de operações
   */
  time(label: string): () => void {
    if (!this.isDev && !this.isDebug) return () => {}

    const start = performance.now()
    
    return () => {
      const duration = performance.now() - start
      this.debug(`⏱️  ${label}`, { durationMs: duration.toFixed(2) })
    }
  }

  /**
   * Log de chamada de API (útil para debugging)
   */
  api(method: string, endpoint: string, context?: LogContext): void {
    if (!this.isDev && !this.isDebug) return

    const sanitized = this.sanitizeContext(context)
    this.debug(`🌐 API ${method} ${endpoint}`, sanitized)
  }

  /**
   * Log de sucesso (visual feedback em dev)
   */
  success(message: string, context?: LogContext): void {
    if (!this.isDev) return

    const sanitized = this.sanitizeContext(context)
    const formatted = this.format('info', message, sanitized)
    
    console.log(`✅ ${formatted}`)
  }
}

// Singleton
export const logger = new Logger()

// Helpers exportados
export type { LogLevel, LogContext }

/**
 * Decorator para logar execução de funções (experimental)
 * 
 * @example
 * class MyService {
 *   @logExecution
 *   async fetchData() {
 *     // ...
 *   }
 * }
 */
export function logExecution(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value

  descriptor.value = async function (...args: any[]) {
    const endTimer = logger.time(`${target.constructor.name}.${propertyKey}`)
    
    try {
      const result = await originalMethod.apply(this, args)
      endTimer()
      logger.success(`${propertyKey} completed`)
      return result
    } catch (error) {
      endTimer()
      logger.error(`${propertyKey} failed`, error as Error)
      throw error
    }
  }

  return descriptor
}

/**
 * Helper para capturar e logar erros em async functions
 * 
 * @example
 * const result = await catchAndLog(
 *   async () => fetchData(),
 *   'Failed to fetch data',
 *   { userId: 123 }
 * )
 */
export async function catchAndLog<T>(
  fn: () => Promise<T>,
  errorMessage: string,
  context?: LogContext
): Promise<T | null> {
  try {
    return await fn()
  } catch (error) {
    logger.error(errorMessage, error as Error, context)
    return null
  }
}

