import { NextResponse } from 'next/server'
import { getUnitBySlug } from '@/lib/repository'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug') || 'centro'

  console.log(`[DEBUG] Testing getUnitBySlug for: ${slug}`)

  const unit = await getUnitBySlug(slug)

  if (!unit) {
    return NextResponse.json({
      error: 'Unit not found',
      slug,
      hasUnit: false,
    })
  }

  const envKeyName = `PACTO_API_KEY_${slug.toUpperCase().replace(/-/g, '_')}`
  const envKey = process.env[envKeyName]

  return NextResponse.json({
    slug: unit.slug,
    nome: unit.nome,
    codigo_unidade: unit.codigo_unidade,
    hasApiKeyPlain: !!unit.apiKeyPlain,
    apiKeyPlainPreview: unit.apiKeyPlain?.substring(0, 10),
    hasChavePublica: !!unit.chave_publica,
    chavePublicaPreview: unit.chave_publica?.substring(0, 10),
    hasEncryptedKey: !!unit.chave_api,
    encryptedKeyPreview: unit.chave_api ? JSON.parse(unit.chave_api).data?.substring(0, 10) : null,
    envKeyName,
    hasEnvKey: !!envKey,
    envKeyPreview: envKey?.substring(0, 10),
  })
}
