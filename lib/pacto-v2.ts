import { logApi, getUnidadeBySlug } from './repository'

const BASE_URL = process.env.PACTO_V2_BASE_URL || 'https://apigw.pactosolucoes.com.br'

interface FetchV2Options {
  method?: 'GET' | 'POST'
  body?: any
  signal?: AbortSignal
  slug: string
  endpoint: string // pode conter placeholder {unidadeChave}
}

export async function fetchPactoV2<T>({ method = 'GET', body, signal, slug, endpoint }: FetchV2Options): Promise<T> {
  const unidade = await getUnidadeBySlug(slug)
  // getUnitBySlug returns object with decrypted key in `apiKeyPlain`
  if (!unidade || !unidade.apiKeyPlain) throw new Error('Unidade não encontrada')
  const unidadeChave = unidade.apiKeyPlain
  const resolvedEndpoint = endpoint.replace('{unidadeChave}', unidadeChave)
  const url = `${BASE_URL}${resolvedEndpoint}`
  const started = Date.now()
  let status: number | undefined
  try {
    const resp = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${unidadeChave}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined,
      signal
    })
    status = resp.status
    const json = await resp.json().catch(() => ({}))
    if (!resp.ok) {
      await logApi({ unidadeSlug: slug, direction: 'OUTBOUND', method, endpoint: resolvedEndpoint, statusCode: status, latencyMs: Date.now() - started, error: JSON.stringify(json) })
      throw new Error(`Erro V2 ${status}`)
    }
    await logApi({ unidadeSlug: slug, direction: 'OUTBOUND', method, endpoint: resolvedEndpoint, statusCode: status, latencyMs: Date.now() - started, requestBody: body })
    return json as T
  } catch (err: any) {
    if (!status) {
      await logApi({ unidadeSlug: slug, direction: 'OUTBOUND', method, endpoint: resolvedEndpoint, latencyMs: Date.now() - started, error: err?.message })
    }
    throw err
  }
}

export async function aggregatePlanos(slug: string, planoCodigos: string[]): Promise<any[]> {
  const results: any[] = []
  for (const codigo of planoCodigos) {
    try {
      const data = await fetchPactoV2<any>({ slug, endpoint: `/v2/vendas/{unidadeChave}/plano/1/${codigo}` })
      if (data?.return) results.push(data.return)
    } catch (e) {
      // ignora erros individuais
    }
  }
  return results
}
