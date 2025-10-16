import crypto from 'crypto'
import { encrypt, decrypt } from './crypto'

/**
 * Sistema de Tokenização de Cartão de Crédito
 * Implementa padrão PCI DSS para segurança de dados de cartão
 * 
 * Fluxo:
 * 1. Frontend envia dados do cartão criptografados
 * 2. Backend gera token temporário único
 * 3. Dados são armazenados criptografados por tempo limitado
 * 4. Token é usado para referenciar os dados
 * 5. Dados são automaticamente expirados após uso
 */

export interface CardToken {
  token: string
  expiresAt: number
  maskedCard: string
  brand: string
}

export interface EncryptedCardData {
  numero: string
  nome: string
  validade: string
  cvv: string
  parcelas?: number
}

// Cache em memória para tokens (em produção, usar Redis)
const cardTokenCache = new Map<string, {
  data: string // dados criptografados
  expiresAt: number
  used: boolean
}>()

/**
 * Gerar token único para cartão
 */
function generateCardToken(): string {
  return `card_${crypto.randomBytes(16).toString('hex')}`
}

/**
 * Mascarar número do cartão (ex: 1234****5678)
 */
function maskCardNumber(numero: string): string {
  const cleaned = numero.replace(/\D/g, '')
  if (cleaned.length < 8) return '****'
  
  const first4 = cleaned.slice(0, 4)
  const last4 = cleaned.slice(-4)
  const middle = '*'.repeat(cleaned.length - 8)
  
  return `${first4}${middle}${last4}`
}

/**
 * Detectar bandeira do cartão
 */
function detectCardBrand(numero: string): string {
  const cleaned = numero.replace(/\D/g, '')
  
  if (/^4/.test(cleaned)) return 'visa'
  if (/^5[1-5]/.test(cleaned)) return 'mastercard'
  if (/^3[47]/.test(cleaned)) return 'amex'
  if (/^6/.test(cleaned)) return 'discover'
  if (/^35/.test(cleaned)) return 'jcb'
  
  return 'unknown'
}

/**
 * Validar dados do cartão
 */
function validateCardData(cardData: EncryptedCardData): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // Validar número do cartão
  const numero = cardData.numero.replace(/\D/g, '')
  if (numero.length < 13 || numero.length > 19) {
    errors.push('Número do cartão inválido')
  }
  
  // Validar CVV
  const cvv = cardData.cvv.replace(/\D/g, '')
  if (cvv.length < 3 || cvv.length > 4) {
    errors.push('CVV inválido')
  }
  
  // Validar validade (MM/AA)
  const validade = cardData.validade.replace(/\D/g, '')
  if (validade.length !== 4) {
    errors.push('Data de validade inválida')
  } else {
    const month = parseInt(validade.slice(0, 2))
    const year = parseInt('20' + validade.slice(2))
    
    if (month < 1 || month > 12) {
      errors.push('Mês inválido')
    }
    
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1
    
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      errors.push('Cartão expirado')
    }
  }
  
  // Validar nome
  if (!cardData.nome || cardData.nome.trim().length < 2) {
    errors.push('Nome do portador inválido')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Tokenizar dados do cartão
 * 
 * @param cardData Dados do cartão em texto plano
 * @returns Token para referenciar os dados
 */
export function tokenizeCard(cardData: EncryptedCardData): CardToken {
  // Validar dados
  const validation = validateCardData(cardData)
  if (!validation.valid) {
    throw new Error(`Dados do cartão inválidos: ${validation.errors.join(', ')}`)
  }
  
  // Gerar token único
  const token = generateCardToken()
  
  // Criptografar dados do cartão
  const encryptedData = encrypt(JSON.stringify(cardData))
  
  // Cache por 10 minutos
  const expiresAt = Date.now() + (10 * 60 * 1000)
  
  cardTokenCache.set(token, {
    data: encryptedData,
    expiresAt,
    used: false
  })
  
  return {
    token,
    expiresAt,
    maskedCard: maskCardNumber(cardData.numero),
    brand: detectCardBrand(cardData.numero)
  }
}

/**
 * Recuperar dados do cartão usando token
 * 
 * @param token Token do cartão
 * @returns Dados descriptografados do cartão
 */
export function detokenizeCard(token: string): EncryptedCardData {
  const cached = cardTokenCache.get(token)
  
  if (!cached) {
    throw new Error('Token de cartão inválido ou expirado')
  }
  
  if (cached.used) {
    throw new Error('Token de cartão já foi utilizado')
  }
  
  if (Date.now() > cached.expiresAt) {
    cardTokenCache.delete(token)
    throw new Error('Token de cartão expirado')
  }
  
  try {
    // Marcar como usado
    cached.used = true
    
    // Descriptografar dados
    const decryptedData = decrypt(cached.data)
    return JSON.parse(decryptedData)
  } catch (error) {
    throw new Error('Falha ao recuperar dados do cartão')
  }
}

/**
 * Limpar tokens expirados (chamado periodicamente)
 */
export function cleanupExpiredTokens(): void {
  const now = Date.now()
  
  for (const [token, data] of cardTokenCache.entries()) {
    if (now > data.expiresAt) {
      cardTokenCache.delete(token)
    }
  }
}

/**
 * Invalidar token específico
 */
export function invalidateToken(token: string): void {
  cardTokenCache.delete(token)
}

/**
 * Obter estatísticas dos tokens
 */
export function getTokenStats(): {
  activeTokens: number
  expiredTokens: number
  usedTokens: number
} {
  const now = Date.now()
  let activeTokens = 0
  let expiredTokens = 0
  let usedTokens = 0
  
  for (const data of cardTokenCache.values()) {
    if (data.used) {
      usedTokens++
    } else if (now > data.expiresAt) {
      expiredTokens++
    } else {
      activeTokens++
    }
  }
  
  return { activeTokens, expiredTokens, usedTokens }
}

// Limpeza automática a cada 5 minutos
setInterval(cleanupExpiredTokens, 5 * 60 * 1000)
