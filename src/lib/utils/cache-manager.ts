/**
 * Cache Manager para APIs
 * Implementa cache em memória com TTL (Time To Live)
 */

interface CacheEntry<T> {
  data: T
  expiry: number
  createdAt: number
}

class CacheManager {
  private cache = new Map<string, CacheEntry<any>>()
  private cleanupInterval: NodeJS.Timeout

  constructor() {
    // Limpar entradas expiradas a cada 2 minutos
    this.cleanupInterval = setInterval(() => {
      this.cleanup()
    }, 2 * 60 * 1000)
  }

  /**
   * Armazena dados no cache
   * @param key - Chave única para o cache
   * @param data - Dados para armazenar
   * @param ttlMs - Tempo de vida em milissegundos
   */
  set<T>(key: string, data: T, ttlMs: number): void {
    const entry: CacheEntry<T> = {
      data,
      expiry: Date.now() + ttlMs,
      createdAt: Date.now()
    }
    
    this.cache.set(key, entry)
  }

  /**
   * Recupera dados do cache
   * @param key - Chave para buscar
   * @returns dados ou null se expirado/não encontrado
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    
    if (!entry) {
      return null
    }

    if (Date.now() > entry.expiry) {
      this.cache.delete(key)
      return null
    }

    return entry.data as T
  }

  /**
   * Verifica se uma chave existe e não está expirada
   */
  has(key: string): boolean {
    const entry = this.cache.get(key)
    if (!entry) return false
    
    if (Date.now() > entry.expiry) {
      this.cache.delete(key)
      return false
    }
    
    return true
  }

  /**
   * Remove uma entrada específica do cache
   */
  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  /**
   * Limpa todas as entradas expiradas
   */
  private cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiry) {
        this.cache.delete(key)
      }
    }
  }

  /**
   * Limpa todo o cache
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * Obtém estatísticas do cache
   */
  getStats(): {
    size: number
    entries: Array<{
      key: string
      age: number
      ttl: number
      expired: boolean
    }>
  } {
    const now = Date.now()
    const entries = Array.from(this.cache.entries()).map(([key, entry]) => ({
      key,
      age: now - entry.createdAt,
      ttl: entry.expiry - now,
      expired: now > entry.expiry
    }))

    return {
      size: this.cache.size,
      entries
    }
  }

  /**
   * Destroi o cache manager e limpa recursos
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
    }
    this.clear()
  }
}

// Instância singleton
export const cacheManager = new CacheManager()

/**
 * Decorator para cache automático de funções
 */
export function withCache<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  keyGenerator: (...args: Parameters<T>) => string,
  ttlMs: number = 30 * 60 * 1000 // 30 minutos padrão
): T {
  return (async (...args: Parameters<T>) => {
    const key = keyGenerator(...args)
    
    // Verificar cache
    const cached = cacheManager.get(key)
    if (cached !== null) {
      console.log(`[Cache] Hit para chave: ${key}`)
      return cached
    }

    // Executar função e armazenar no cache
    console.log(`[Cache] Miss para chave: ${key}`)
    const result = await fn(...args)
    cacheManager.set(key, result, ttlMs)
    
    return result
  }) as T
}

/**
 * Utilitários para chaves de cache
 */
export const cacheKeys = {
  planos: (slug: string) => `planos:${slug}`,
  unidade: (slug: string) => `unidade:${slug}`,
  simulacao: (slug: string, planoId: string, hash: string) => `simulacao:${slug}:${planoId}:${hash}`,
  cupom: (codigo: string, planoData: string) => `cupom:${codigo}:${planoData}`,
}

export default cacheManager
