import { NextResponse } from 'next/server'
import { getApiKeyEnvName, getEnvKey } from '@/lib/utils/env-keys'

export async function GET() {
  const slug = 'centro'
  const envKeyName = getApiKeyEnvName(slug)
  const key = getEnvKey(slug, 'api')
  const hasKey = !!key
  const keyPreview = key?.substring(0, 10)

  return NextResponse.json({
    envKeyName,
    hasKey,
    keyPreview: keyPreview ? keyPreview + '...' : null,
    allEnvKeys: Object.keys(process.env).filter(k => k.startsWith('PACTO_API_KEY_')),
    hasEncryptionSecret: !!process.env.ENCRYPTION_SECRET,
  })
}
