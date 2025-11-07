/**
 * Utility functions to work with units based on environment variables only
 * No database dependencies - all data comes from .env
 */

import { 
  normalizeSlugForEnv, 
  getApiKeyEnvName, 
  getSecretKeyEnvName, 
  getSecretKeyDevEnvName,
  getPublicUnitCodeEnvName,
  hasEnvKey,
  getEnvKey 
} from './env-keys'

/**
 * Extract unit slug from environment variable name
 * Example: "PACTO_API_KEY_DOM_PEDRO" -> "dom-pedro"
 */
function extractSlugFromEnvVar(envVarName: string, prefix: string): string | null {
  if (!envVarName.startsWith(prefix)) return null
  
  const slugPart = envVarName.slice(prefix.length)
  if (!slugPart) return null
  
  // Convert back from ENV format (UPPERCASE_WITH_UNDERSCORES) to slug format (lowercase-with-hyphens)
  return slugPart.toLowerCase().replace(/_/g, '-')
}

/**
 * Get all unique unit slugs from environment variables
 * Checks all types of env vars (API_KEY, SECRET_KEY, SECRET_KEY_DEV, NEXT_PUBLIC_UNIDADE)
 */
export function getAllUnitSlugsFromEnv(): string[] {
  const slugs = new Set<string>()
  
  // Check all environment variable names
  Object.keys(process.env).forEach(envVarName => {
    // Check PACTO_API_KEY_*
    if (envVarName.startsWith('PACTO_API_KEY_')) {
      const slug = extractSlugFromEnvVar(envVarName, 'PACTO_API_KEY_')
      if (slug) slugs.add(slug)
    }
    
    // Check PACTO_SECRET_KEY_* (but not PACTO_SECRET_KEY_DEV_*)
    if (envVarName.startsWith('PACTO_SECRET_KEY_') && !envVarName.startsWith('PACTO_SECRET_KEY_DEV_')) {
      const slug = extractSlugFromEnvVar(envVarName, 'PACTO_SECRET_KEY_')
      if (slug) slugs.add(slug)
    }
    
    // Check PACTO_SECRET_KEY_DEV_*
    if (envVarName.startsWith('PACTO_SECRET_KEY_DEV_')) {
      const slug = extractSlugFromEnvVar(envVarName, 'PACTO_SECRET_KEY_DEV_')
      if (slug) slugs.add(slug)
    }
    
    // Check NEXT_PUBLIC_UNIDADE_*
    if (envVarName.startsWith('NEXT_PUBLIC_UNIDADE_')) {
      const slug = extractSlugFromEnvVar(envVarName, 'NEXT_PUBLIC_UNIDADE_')
      if (slug) slugs.add(slug)
    }
  })
  
  return Array.from(slugs).sort()
}

/**
 * Get unit information based on environment variables only
 */
export function getUnitFromEnv(slug: string) {
  const apiKey = getEnvKey(slug, 'api')
  const secretKey = getEnvKey(slug, 'secret')
  const secretKeyDev = getEnvKey(slug, 'secret-dev')
  const publicCode = getEnvKey(slug, 'public-code')
  
  const hasAnyKey = !!apiKey || !!secretKey || !!secretKeyDev || !!publicCode
  
  return {
    slug,
    hasApiKey: !!apiKey,
    hasSecretKey: !!secretKey,
    hasSecretKeyDev: !!secretKeyDev,
    hasPublicCode: !!publicCode,
    hasAnyKey,
    publicCode: publicCode || null,
    envKeys: {
      apiKey: {
        name: getApiKeyEnvName(slug),
        exists: !!apiKey,
        preview: apiKey?.substring(0, 10) || null,
      },
      secretKey: {
        name: getSecretKeyEnvName(slug),
        exists: !!secretKey,
        preview: secretKey?.substring(0, 10) || null,
      },
      secretKeyDev: {
        name: getSecretKeyDevEnvName(slug),
        exists: !!secretKeyDev,
        preview: secretKeyDev?.substring(0, 10) || null,
      },
      publicCode: {
        name: getPublicUnitCodeEnvName(slug),
        exists: !!publicCode,
        value: publicCode,
      },
    },
  }
}

/**
 * List all units with their environment variable status
 */
export function listAllUnitsFromEnv() {
  const slugs = getAllUnitSlugsFromEnv()
  
  return slugs.map(slug => getUnitFromEnv(slug))
}


