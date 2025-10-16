import crypto from 'crypto'

/**
 * Módulo de criptografia AES-256-GCM
 * 
 * Usado para criptografar dados sensíveis em repouso (chaves de API no banco).
 * 
 * Variável de ambiente necessária:
 * - ENCRYPTION_SECRET: Chave forte de 32+ caracteres
 * 
 * Gerar nova chave:
 * ```bash
 * openssl rand -base64 32
 * ```
 * 
 * ⚠️ ATENÇÃO: Se perder esta chave, todos os dados criptografados serão irrecuperáveis!
 * ⚠️ Nunca commitar esta chave no Git!
 * ⚠️ Usar chaves diferentes entre dev/staging/prod!
 */

const RAW_SECRET = process.env.ENCRYPTION_SECRET

if (!RAW_SECRET) {
  throw new Error(
    '❌ ENCRYPTION_SECRET não definida!\n\n' +
    'Esta variável é CRÍTICA para a segurança do sistema.\n' +
    'Defina no arquivo .env.local:\n\n' +
    'ENCRYPTION_SECRET=sua-chave-forte-aqui\n\n' +
    'Gerar nova chave:\n' +
    'openssl rand -base64 32\n\n' +
    '⚠️ IMPORTANTE:\n' +
    '- Se perder esta chave, dados criptografados serão irrecuperáveis\n' +
    '- Usar chaves diferentes entre dev/staging/prod\n' +
    '- NUNCA commitar no Git'
  )
}

if (RAW_SECRET.length < 32) {
  console.warn(
    '⚠️ [crypto] ENCRYPTION_SECRET tem menos de 32 caracteres.\n' +
    'Recomendado: usar chave de 32+ caracteres para máxima segurança.'
  )
}

// Derive 32-byte key usando SHA-256 para garantir tamanho correto
const KEY = crypto.createHash('sha256').update(RAW_SECRET).digest()

export interface EncryptedPayload {
  v: number // version
  iv: string
  tag: string
  data: string
}

export function encrypt(plain: string): string {
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv)
  const encrypted = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  const payload: EncryptedPayload = {
    v: 1,
    iv: iv.toString('base64'),
    tag: tag.toString('base64'),
    data: encrypted.toString('base64'),
  }
  return JSON.stringify(payload)
}

export function decrypt(serialized: string): string {
  try {
    const payload: EncryptedPayload = JSON.parse(serialized)
    if (payload.v !== 1) throw new Error('Versão de payload desconhecida')
    const iv = Buffer.from(payload.iv, 'base64')
    const tag = Buffer.from(payload.tag, 'base64')
    const data = Buffer.from(payload.data, 'base64')
    const decipher = crypto.createDecipheriv('aes-256-gcm', KEY, iv)
    decipher.setAuthTag(tag)
    const decrypted = Buffer.concat([decipher.update(data), decipher.final()])
    return decrypted.toString('utf8')
  } catch (err) {
    console.error('[crypto] Falha ao decriptar', err)
    throw new Error('Falha na decriptação')
  }
}

export function safeHash(input: any): string {
  const json = typeof input === 'string' ? input : JSON.stringify(input)
  return crypto.createHash('sha256').update(json).digest('hex')
}
