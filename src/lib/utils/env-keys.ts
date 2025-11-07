/**
 * Utility functions for normalizing slugs and finding environment variable keys
 */

import { getUnidadeConfig } from '@/src/config/unidades-chaves'

/**
 * Gets the environment variable suffix for a slug
 * Uses the mapping from unidades-chaves.ts if available, otherwise normalizes the slug
 * 
 * @example
 * getEnvSuffix('chapeu-goiano') // 'GOIANO' (from mapping)
 * getEnvSuffix('dom-pedro') // 'DOM_PEDRO' (normalized)
 */
function getEnvSuffix(slug: string): string {
  // Try to get from unidades-chaves mapping first
  try {
    const config = getUnidadeConfig(slug)
    if (config?.chaveSecret) {
      // Extract suffix from chaveSecret
      // Examples: "PACTO_SECRET_KEY_GOIANO" -> "GOIANO"
      //           "PACTO_SECRET_KEY_DEV_GOIANO" -> "GOIANO"
      const match = config.chaveSecret.match(/PACTO_SECRET_KEY_(?:DEV_)?(.+)$/)
      if (match && match[1]) {
        return match[1]
      }
    }
  } catch (e) {
    // If unidades-chaves is not available, fall back to normalization
  }
  
  // Fallback: normalize the slug
  return normalizeSlugForEnv(slug)
}

/**
 * Normalizes a slug to match environment variable naming conventions
 * Converts to uppercase and replaces hyphens with underscores
 * 
 * @example
 * normalizeSlugForEnv('dom-pedro') // 'DOM_PEDRO'
 * normalizeSlugForEnv('centro') // 'CENTRO'
 */
export function normalizeSlugForEnv(slug: string): string {
  return slug.toUpperCase().replace(/-/g, '_')
}

/**
 * Gets the environment variable name for a unit's API key
 * 
 * @param slug - The unit slug
 * @returns The environment variable name (e.g., 'PACTO_API_KEY_DOM_PEDRO' or 'PACTO_API_KEY_GOIANO' for chapeu-goiano)
 */
export function getApiKeyEnvName(slug: string): string {
  return `PACTO_API_KEY_${getEnvSuffix(slug)}`
}

/**
 * Gets the environment variable name for a unit's secret key (production)
 * 
 * @param slug - The unit slug
 * @returns The environment variable name (e.g., 'PACTO_SECRET_KEY_DOM_PEDRO' or 'PACTO_SECRET_KEY_GOIANO' for chapeu-goiano)
 */
export function getSecretKeyEnvName(slug: string): string {
  return `PACTO_SECRET_KEY_${getEnvSuffix(slug)}`
}

/**
 * Gets the environment variable name for a unit's secret key (development)
 * 
 * @param slug - The unit slug
 * @returns The environment variable name (e.g., 'PACTO_SECRET_KEY_DEV_DOM_PEDRO' or 'PACTO_SECRET_KEY_DEV_GOIANO' for chapeu-goiano)
 */
export function getSecretKeyDevEnvName(slug: string): string {
  return `PACTO_SECRET_KEY_DEV_${getEnvSuffix(slug)}`
}

/**
 * Gets the environment variable name for a unit's public code
 * 
 * @param slug - The unit slug
 * @returns The environment variable name (e.g., 'NEXT_PUBLIC_UNIDADE_DOM_PEDRO' or 'NEXT_PUBLIC_UNIDADE_GOIANO' for chapeu-goiano)
 */
export function getPublicUnitCodeEnvName(slug: string): string {
  // Try to get from unidades-chaves mapping first
  try {
    const config = getUnidadeConfig(slug)
    if (config?.chavePublic) {
      return config.chavePublic
    }
  } catch (e) {
    // If unidades-chaves is not available, fall back to normalization
  }
  
  return `NEXT_PUBLIC_UNIDADE_${getEnvSuffix(slug)}`
}

/**
 * Checks if an environment variable exists for a given slug
 * 
 * @param slug - The unit slug
 * @param keyType - Type of key to check ('api' | 'secret' | 'secret-dev' | 'public-code')
 * @returns True if the environment variable exists and has a value
 */
export function hasEnvKey(slug: string, keyType: 'api' | 'secret' | 'secret-dev' | 'public-code'): boolean {
  let envName: string
  switch (keyType) {
    case 'api':
      envName = getApiKeyEnvName(slug)
      break
    case 'secret':
      envName = getSecretKeyEnvName(slug)
      break
    case 'secret-dev':
      envName = getSecretKeyDevEnvName(slug)
      break
    case 'public-code':
      envName = getPublicUnitCodeEnvName(slug)
      break
  }
  const value = process.env[envName]
  return !!value && value.trim().length > 0
}

/**
 * Gets the value of an environment variable for a unit
 * 
 * @param slug - The unit slug
 * @param keyType - Type of key to get
 * @returns The environment variable value or null if not found
 */
export function getEnvKey(slug: string, keyType: 'api' | 'secret' | 'secret-dev' | 'public-code'): string | null {
  let envName: string
  switch (keyType) {
    case 'api':
      envName = getApiKeyEnvName(slug)
      break
    case 'secret':
      envName = getSecretKeyEnvName(slug)
      break
    case 'secret-dev':
      envName = getSecretKeyDevEnvName(slug)
      break
    case 'public-code':
      envName = getPublicUnitCodeEnvName(slug)
      break
  }
  return process.env[envName] || null
}

