import { NextResponse } from 'next/server'

export async function GET() {
  const slug = 'centro'
  const envKeyName = `PACTO_API_KEY_${slug.toUpperCase().replace(/-/g, '_')}`
  const hasKey = !!process.env[envKeyName]
  const keyPreview = process.env[envKeyName]?.substring(0, 10)

  return NextResponse.json({
    envKeyName,
    hasKey,
    keyPreview: keyPreview ? keyPreview + '...' : null,
    allEnvKeys: Object.keys(process.env).filter(k => k.startsWith('PACTO_API_KEY_')),
    hasEncryptionSecret: !!process.env.ENCRYPTION_SECRET,
  })
}
