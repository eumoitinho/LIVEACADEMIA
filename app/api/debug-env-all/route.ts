import { NextResponse } from 'next/server'
import { getSecretKeyEnvName, getSecretKeyDevEnvName, getPublicUnitCodeEnvName, getEnvKey } from '@/lib/utils/env-keys'
import { getAllUnitSlugsFromEnv } from '@/lib/utils/env-units'

/**
 * Rota de debug para verificar todas as variáveis de ambiente de unidades
 * Útil para diagnosticar problemas na Vercel
 */
export async function GET() {
  try {
    // Listar todas as unidades conhecidas
    const knownUnits = [
      'camapua', 'centro', 'torres', 'cachoeirinha', 'dom-pedro', 'chapeu-goiano',
      'sumauma', 'belem', 'jorge-teixeira', 'flores', 'amazonas-shopping',
      'parque-10', 'aldeia', 'coroado', 'cidade-nova', 'sao-jose', 'sao-lazaro',
      'nova-cidade', 'japiim', 'tarauca', 'ponte-negra', 'floriano-peixoto',
      'presidente-vargas', 'joaquim-nabuco', 'adrianopolis', 'alvorada',
      'compensa', 'educandos', 'petropolis', 'santo-antonio', 'centro-2'
    ]

    const unitsStatus = knownUnits.map(slug => {
      const secretKeyName = getSecretKeyEnvName(slug)
      const secretDevKeyName = getSecretKeyDevEnvName(slug)
      const publicCodeName = getPublicUnitCodeEnvName(slug)
      
      const secretKey = getEnvKey(slug, 'secret')
      const secretDevKey = getEnvKey(slug, 'secret-dev')
      const publicCode = getEnvKey(slug, 'public-code')
      
      return {
        slug,
        secretKey: {
          name: secretKeyName,
          exists: !!secretKey,
          hasValue: !!secretKey && secretKey.length > 0,
          preview: secretKey ? secretKey.substring(0, 10) + '...' : null
        },
        secretDevKey: {
          name: secretDevKeyName,
          exists: !!secretDevKey,
          hasValue: !!secretDevKey && secretDevKey.length > 0,
          preview: secretDevKey ? secretDevKey.substring(0, 10) + '...' : null
        },
        publicCode: {
          name: publicCodeName,
          exists: !!publicCode,
          hasValue: !!publicCode && publicCode.length > 0,
          value: publicCode
        },
        hasAllKeys: !!(secretKey || secretDevKey) && !!publicCode
      }
    })

    // Listar todas as variáveis de ambiente que começam com PACTO_ ou NEXT_PUBLIC_UNIDADE_
    const allPactoEnvVars = Object.keys(process.env)
      .filter(key => 
        key.startsWith('PACTO_SECRET_KEY_') || 
        key.startsWith('PACTO_SECRET_KEY_DEV_') ||
        key.startsWith('NEXT_PUBLIC_UNIDADE_')
      )
      .sort()
      .map(key => ({
        name: key,
        exists: true,
        hasValue: !!process.env[key] && process.env[key]!.length > 0,
        preview: process.env[key] ? process.env[key]!.substring(0, 20) + '...' : null
      }))

    return NextResponse.json({
      environment: process.env.NODE_ENV,
      vercel: {
        env: process.env.VERCEL_ENV,
        url: process.env.VERCEL_URL,
      },
      totalUnits: knownUnits.length,
      unitsWithKeys: unitsStatus.filter(u => u.hasAllKeys).length,
      unitsStatus,
      allPactoEnvVars,
      summary: {
        totalSecretKeys: allPactoEnvVars.filter(v => v.name.startsWith('PACTO_SECRET_KEY_') && !v.name.includes('_DEV_')).length,
        totalSecretDevKeys: allPactoEnvVars.filter(v => v.name.includes('PACTO_SECRET_KEY_DEV_')).length,
        totalPublicCodes: allPactoEnvVars.filter(v => v.name.startsWith('NEXT_PUBLIC_UNIDADE_')).length,
      }
    })
  } catch (error) {
    console.error('[debug-env-all] Error:', error)
    return NextResponse.json(
      {
        error: 'Error checking environment variables',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}


