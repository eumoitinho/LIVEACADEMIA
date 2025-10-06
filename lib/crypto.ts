import crypto from 'crypto'

// AES-256-GCM encryption helper.
// Requires ENCRYPTION_SECRET (32 bytes base64 or hex). If shorter, we derive via SHA-256.

// Allow hardcoded local dev fallback ONLY if env not provided
const RAW_SECRET = process.env.ENCRYPTION_SECRET || 'a+oZvP9a2ob1vl54zwT9BlSCxHgI4o+lfMXPyjnDc2g='
if (!process.env.ENCRYPTION_SECRET) {
  console.warn('[crypto] Usando fallback hardcoded local ENCRYPTION_SECRET (não usar em produção).')
}

// Derive 32-byte key
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
