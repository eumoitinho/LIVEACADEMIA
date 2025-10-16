/**
 * Formatters e Validators centralizados
 * 
 * Funções utilitárias para formatação e validação de dados usadas em todo o projeto.
 * Centralizar evita duplicação e garante consistência.
 */

// ============================================
// FORMATTERS - Transformam dados para exibição
// ============================================

export const formatters = {
  /**
   * Formata número ou string como moeda brasileira (R$)
   * @example formatters.currency(12990) // "R$ 129,90"
   * @example formatters.currency("129.90") // "R$ 129,90"
   */
  currency: (value: number | string): string => {
    const num = typeof value === 'string' 
      ? parseFloat(value.replace(',', '.')) 
      : value
    
    if (Number.isNaN(num)) {
      return 'R$ 0,00'
    }
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(num)
  },

  /**
   * Formata centavos como moeda (útil para valores de API)
   * @example formatters.currencyFromCents(12990) // "R$ 129,90"
   */
  currencyFromCents: (cents: number): string => {
    return formatters.currency(cents / 100)
  },

  /**
   * Formata CPF: 12345678900 → 123.456.789-00
   * @example formatters.cpf("12345678900") // "123.456.789-00"
   */
  cpf: (value: string): string => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  },

  /**
   * Formata CNPJ: 12345678000190 → 12.345.678/0001-90
   * @example formatters.cnpj("12345678000190") // "12.345.678/0001-90"
   */
  cnpj: (value: string): string => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  },

  /**
   * Formata telefone: 92999999999 → (92) 99999-9999
   * @example formatters.phone("92999999999") // "(92) 99999-9999"
   */
  phone: (value: string): string => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
  },

  /**
   * Formata CEP: 69000000 → 69000-000
   * @example formatters.cep("69000000") // "69000-000"
   */
  cep: (value: string): string => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1')
  },

  /**
   * Formata número de cartão: 1234567890123456 → 1234 5678 9012 3456
   * @example formatters.cardNumber("1234567890123456") // "1234 5678 9012 3456"
   */
  cardNumber: (value: string): string => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .substring(0, 19) // 16 dígitos + 3 espaços
  },

  /**
   * Formata validade do cartão: 1225 → 12/25
   * @example formatters.cardExpiry("1225") // "12/25"
   */
  cardExpiry: (value: string): string => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .substring(0, 5)
  },

  /**
   * Mascara número de cartão para exibição segura
   * @example formatters.maskCardNumber("1234567890123456") // "**** **** **** 3456"
   */
  maskCardNumber: (value: string): string => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length < 4) return value
    const lastFour = cleaned.slice(-4)
    return `**** **** **** ${lastFour}`
  },

  /**
   * Formata data ISO para formato brasileiro
   * @example formatters.date("2025-01-15") // "15/01/2025"
   */
  date: (value: string | Date): string => {
    const date = typeof value === 'string' ? new Date(value) : value
    return new Intl.DateTimeFormat('pt-BR').format(date)
  },

  /**
   * Formata data e hora
   * @example formatters.datetime("2025-01-15T14:30:00") // "15/01/2025 14:30"
   */
  datetime: (value: string | Date): string => {
    const date = typeof value === 'string' ? new Date(value) : value
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  },

  /**
   * Formata número com separadores de milhar
   * @example formatters.number(1234567) // "1.234.567"
   */
  number: (value: number): string => {
    return new Intl.NumberFormat('pt-BR').format(value)
  },

  /**
   * Formata porcentagem
   * @example formatters.percent(0.1234) // "12,34%"
   */
  percent: (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  },
}

// ============================================
// VALIDATORS - Validam formato e regras de negócio
// ============================================

export const validators = {
  /**
   * Valida CPF (apenas formato e dígitos verificadores)
   * @example validators.cpf("123.456.789-09") // true
   */
  cpf: (cpf: string): boolean => {
    const cleaned = cpf.replace(/\D/g, '')
    
    // Verificar tamanho
    if (cleaned.length !== 11) return false
    
    // Verificar se todos os dígitos são iguais (ex: 111.111.111-11)
    if (/^(\d)\1+$/.test(cleaned)) return false
    
    // Validar primeiro dígito verificador
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleaned[i]) * (10 - i)
    }
    let digit = 11 - (sum % 11)
    if (digit >= 10) digit = 0
    if (parseInt(cleaned[9]) !== digit) return false
    
    // Validar segundo dígito verificador
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleaned[i]) * (11 - i)
    }
    digit = 11 - (sum % 11)
    if (digit >= 10) digit = 0
    return parseInt(cleaned[10]) === digit
  },

  /**
   * Valida CNPJ (apenas formato e dígitos verificadores)
   * @example validators.cnpj("12.345.678/0001-95") // true
   */
  cnpj: (cnpj: string): boolean => {
    const cleaned = cnpj.replace(/\D/g, '')
    
    if (cleaned.length !== 14) return false
    if (/^(\d)\1+$/.test(cleaned)) return false
    
    // Validar primeiro dígito
    let length = cleaned.length - 2
    let numbers = cleaned.substring(0, length)
    const digits = cleaned.substring(length)
    let sum = 0
    let pos = length - 7
    
    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--
      if (pos < 2) pos = 9
    }
    
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    if (result !== parseInt(digits.charAt(0))) return false
    
    // Validar segundo dígito
    length = length + 1
    numbers = cleaned.substring(0, length)
    sum = 0
    pos = length - 7
    
    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--
      if (pos < 2) pos = 9
    }
    
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    return result === parseInt(digits.charAt(1))
  },

  /**
   * Valida email (formato básico)
   * @example validators.email("teste@example.com") // true
   */
  email: (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  },

  /**
   * Valida telefone brasileiro (10 ou 11 dígitos)
   * @example validators.phone("(92) 99999-9999") // true
   */
  phone: (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '')
    return cleaned.length >= 10 && cleaned.length <= 11
  },

  /**
   * Valida CEP (8 dígitos)
   * @example validators.cep("69000-000") // true
   */
  cep: (cep: string): boolean => {
    const cleaned = cep.replace(/\D/g, '')
    return cleaned.length === 8
  },

  /**
   * Valida número de cartão usando algoritmo de Luhn
   * @example validators.cardNumber("4111111111111111") // true
   */
  cardNumber: (cardNumber: string): boolean => {
    const cleaned = cardNumber.replace(/\D/g, '')
    
    if (cleaned.length < 13 || cleaned.length > 19) return false
    
    // Algoritmo de Luhn
    let sum = 0
    let isEven = false
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i])
      
      if (isEven) {
        digit *= 2
        if (digit > 9) digit -= 9
      }
      
      sum += digit
      isEven = !isEven
    }
    
    return sum % 10 === 0
  },

  /**
   * Valida validade do cartão (MM/YY ou MM/YYYY)
   * @example validators.cardExpiry("12/25") // true se ainda não expirou
   */
  cardExpiry: (expiry: string): boolean => {
    const cleaned = expiry.replace(/\D/g, '')
    
    if (cleaned.length !== 4 && cleaned.length !== 6) return false
    
    const month = parseInt(cleaned.substring(0, 2))
    const yearStr = cleaned.length === 4 
      ? '20' + cleaned.substring(2, 4) 
      : cleaned.substring(2, 6)
    const year = parseInt(yearStr)
    
    if (month < 1 || month > 12) return false
    
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1
    
    if (year < currentYear) return false
    if (year === currentYear && month < currentMonth) return false
    
    return true
  },

  /**
   * Valida CVV (3 ou 4 dígitos)
   * @example validators.cvv("123") // true
   */
  cvv: (cvv: string): boolean => {
    const cleaned = cvv.replace(/\D/g, '')
    return cleaned.length === 3 || cleaned.length === 4
  },

  /**
   * Valida URL
   * @example validators.url("https://example.com") // true
   */
  url: (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },
}

// ============================================
// PARSERS - Convertem strings formatadas para valores puros
// ============================================

export const parsers = {
  /**
   * Remove formatação de CPF/CNPJ
   * @example parsers.document("123.456.789-00") // "12345678900"
   */
  document: (value: string): string => {
    return value.replace(/\D/g, '')
  },

  /**
   * Remove formatação de telefone
   * @example parsers.phone("(92) 99999-9999") // "92999999999"
   */
  phone: (value: string): string => {
    return value.replace(/\D/g, '')
  },

  /**
   * Converte moeda formatada para número
   * @example parsers.currency("R$ 1.234,56") // 1234.56
   */
  currency: (value: string): number => {
    const cleaned = value
      .replace(/[R$\s]/g, '')
      .replace(/\./g, '')
      .replace(',', '.')
    return parseFloat(cleaned) || 0
  },

  /**
   * Converte moeda para centavos (útil para APIs)
   * @example parsers.currencyToCents("R$ 129,90") // 12990
   */
  currencyToCents: (value: string): number => {
    return Math.round(parsers.currency(value) * 100)
  },
}

// ============================================
// TIPO HELPERS
// ============================================

export type Formatter = keyof typeof formatters
export type Validator = keyof typeof validators
export type Parser = keyof typeof parsers

