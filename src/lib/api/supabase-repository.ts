import { supabaseAdmin, isSupabaseAvailable } from './supabase'
import { encrypt, decrypt, safeHash } from '@/lib/utils/crypto'

/**
 * Novo contrato de persistência baseado em tabela única `units`.
 * (Modelo anterior com `rede` + `unidade` foi eliminado do schema.)
 */

export interface UpsertUnitInput {
  slug: string
  nome: string
  codigo_unidade?: number
  codigo_rede?: string
  chave_rede?: string
  apiKeyPlain?: string
  chave_publica?: string | null
  cidade?: string | null
  estado?: string | null
  cep?: string | null
  endereco?: string | null
  complemento?: string | null
  latitude?: string | null
  longitude?: string | null
  telefone?: string | null
  email?: string | null
  locale?: string | null
  logo?: string | null
  imagens?: string[] | null
  moeda?: string[] | null
  usarSistemaInternacional?: boolean | null
  // Se true força recriptografia mesmo se plaintext igual (ex: rotação de secret futura)
  forceReencrypt?: boolean
}

export async function upsertUnit(input: UpsertUnitInput) {
  if (!isSupabaseAvailable()) {
    throw new Error('Supabase não está configurado. Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY')
  }
  
  // Verifica existência
  const { data: existing, error: findErr } = await supabaseAdmin!
    .from('units')
    .select('id,chave_api,slug')
    .eq('slug', input.slug)
    .maybeSingle()
  if (findErr) throw findErr

  let encryptedKey: string | undefined
  let mustUpdateKey = !!input.forceReencrypt
  if (existing?.chave_api) {
    try {
      const currentPlain = decrypt(existing.chave_api)
      if (currentPlain !== input.apiKeyPlain) mustUpdateKey = true
    } catch {
      // Falha de decrypt -> recriptografar
      mustUpdateKey = true
    }
  } else {
    mustUpdateKey = true
  }
  if (mustUpdateKey && input.apiKeyPlain) {
    encryptedKey = encrypt(input.apiKeyPlain)
  }

  const basePayload = {
    nome: input.nome,
    codigo_unidade: input.codigo_unidade || input.slug.toUpperCase(),
    chave_publica: input.chave_publica ?? null,
    cidade: input.cidade ?? null,
    estado: input.estado ?? null,
    cep: input.cep ?? null,
    endereco: input.endereco ?? null,
    complemento: input.complemento ?? null,
    latitude: input.latitude ?? null,
    longitude: input.longitude ?? null,
    telefone: input.telefone ?? null,
    email: input.email ?? null,
    locale: input.locale ?? null,
    logo: input.logo ?? null,
    imagens: input.imagens ?? null,
    moeda: input.moeda ?? null,
    usarSistemaInternacional: input.usarSistemaInternacional ?? null,
    updated_at: new Date().toISOString(),
  } as const

  if (existing) {
    const updatePayload: any = { ...basePayload }
    if (encryptedKey) updatePayload.chave_api = encryptedKey
    const { data: updated, error: updErr } = await supabaseAdmin!
      .from('units')
      .update(updatePayload)
      .eq('id', existing.id)
      .select('id,slug,nome,codigo_unidade,chave_api')
      .maybeSingle()
    if (updErr) throw updErr
    return { ...updated, apiKeyPlain: input.apiKeyPlain }
  } else {
    const insertPayload: any = {
      slug: input.slug,
      chave_api: encryptedKey || (input.apiKeyPlain ? encrypt(input.apiKeyPlain) : null),
      created_at: new Date().toISOString(),
      ...basePayload,
    }
    const { data: inserted, error: insErr } = await supabaseAdmin!
      .from('units')
      .insert(insertPayload)
      .select('id,slug,nome,codigo_unidade,chave_api')
      .single()
    if (insErr) throw insErr
    return { ...inserted, apiKeyPlain: input.apiKeyPlain }
  }
}

export async function getUnitBySlug(slug: string) {
  if (!isSupabaseAvailable()) {
    console.warn('[getUnitBySlug] Supabase não está configurado, retornando null')
    return null
  }
  
  console.log(`[getUnitBySlug] Querying slug: "${slug}" (type: ${typeof slug})`)
  const { data, error } = await supabaseAdmin!
    .from('units')
    .select('id,slug,nome,codigo_unidade,chave_api,chave_publica,cidade,estado,cep,endereco,complemento,latitude,longitude,telefone,email,locale,logo,imagens,moeda,usarsistemainternacional,created_at,updated_at')
    .eq('slug', slug)
    .maybeSingle()
  console.log(`[getUnitBySlug] Result: data=${!!data}, error=${error?.message || 'none'}`)
  if (error || !data) return null

  // Priorizar env var PACTO_API_KEY_{SLUG} (descriptografada) sobre banco (criptografada)
  let apiKeyPlain: string | undefined
  const envKeyName = `PACTO_API_KEY_${slug.toUpperCase().replace(/-/g, '_')}`
  const envKey = process.env[envKeyName]

  if (envKey) {
    console.log(`[getUnitBySlug] Using API key from env var: ${envKeyName}`)
    apiKeyPlain = envKey
  } else if (data.chave_api) {
    console.log(`[getUnitBySlug] Trying to decrypt API key from database`)
    try { apiKeyPlain = decrypt(data.chave_api) } catch (err) {
      console.error(`[getUnitBySlug] Decrypt failed:`, err)
      apiKeyPlain = undefined
    }
  }

  return { ...data, apiKeyPlain }
}

// Alias DEPRECATED para retrocompatibilidade temporária
export const getUnidadeBySlug = getUnitBySlug

export async function logApi(params: { unidadeSlug?: string; direction: 'OUTBOUND' | 'INBOUND'; method: string; endpoint: string; statusCode?: number; latencyMs?: number; error?: string; requestBody?: any }) {
  if (!isSupabaseAvailable()) {
    console.warn('[logApi] Supabase não está configurado, pulando log')
    return
  }
  
  let unidadeId: string | undefined
  if (params.unidadeSlug) {
    const { data } = await supabaseAdmin!.from('units').select('id').eq('slug', params.unidadeSlug).maybeSingle()
    unidadeId = data?.id
  }
  const { error } = await supabaseAdmin!.from('api_log').insert({
    unidade_id: unidadeId,
    direction: params.direction,
    method: params.method,
    endpoint: params.endpoint,
    status_code: params.statusCode,
    latency_ms: params.latencyMs,
    error: params.error,
    request_hash: params.requestBody ? safeHash(params.requestBody) : undefined,
  })
  if (error) throw error
}

// Utilitário simples para listar units (pode ser útil em futuros scripts)
export async function listUnits(limit = 50) {
  if (!isSupabaseAvailable()) {
    console.warn('[listUnits] Supabase não está configurado, retornando array vazio')
    return []
  }
  
  const { data, error } = await supabaseAdmin!.from('units').select('id,slug,nome').limit(limit)
  if (error) throw error
  return data
}
