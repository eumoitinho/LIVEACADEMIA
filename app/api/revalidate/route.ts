import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

// Mapeamento de tipos do Sanity para paths e tags que devem ser revalidados
const REVALIDATION_MAP: Record<string, { paths: string[]; tags: string[] }> = {
  // Homepage e suas dependências
  homepage: {
    paths: ['/'],
    tags: ['homepage', 'hero', 'about', 'planos', 'testimonials'],
  },

  // Unidades
  unit: {
    paths: ['/', '/unidades'],
    tags: ['units', 'unit'],
  },

  // Planos
  plano: {
    paths: ['/', '/planos'],
    tags: ['planos', 'plans'],
  },

  // Benefícios
  benefit: {
    paths: ['/'],
    tags: ['benefits'],
  },

  // Depoimentos
  testimonial: {
    paths: ['/'],
    tags: ['testimonials'],
  },

  // Recursos do App
  appFeature: {
    paths: ['/'],
    tags: ['appFeatures'],
  },
  appSection: {
    paths: ['/'],
    tags: ['appSection'],
  },

  // Modalidades
  modality: {
    paths: ['/aulas-coletivas'],
    tags: ['modalities'],
  },

  // Estrutura
  structureFeature: {
    paths: ['/'],
    tags: ['structureFeatures'],
  },

  // Wellhub
  wellhubFeature: {
    paths: ['/'],
    tags: ['wellhubFeatures'],
  },

  // Bioimpedância
  bioimpedanciaFeature: {
    paths: ['/'],
    tags: ['bioimpedanciaFeatures'],
  },

  // Seção de Benefícios
  beneficiosSection: {
    paths: ['/'],
    tags: ['beneficiosSection'],
  },

  // Day Use
  dayUse: {
    paths: ['/day-use'],
    tags: ['dayUse'],
  },

  // Sobre Nós
  sobreNos: {
    paths: ['/sobre-nos'],
    tags: ['sobreNos'],
  },

  // Contato
  contato: {
    paths: ['/contato'],
    tags: ['contato'],
  },

  // Trabalhe Conosco
  trabalheConosco: {
    paths: ['/trabalhe-conosco'],
    tags: ['trabalheConosco'],
  },

  // Sobre
  sobre: {
    paths: ['/sobre'],
    tags: ['sobre'],
  },
}

export async function POST(req: NextRequest) {
  try {
    // Verificar token de segurança
    const token = req.headers.get('x-sanity-webhook-token')
    const expectedToken = process.env.SANITY_REVALIDATE_SECRET

    if (!expectedToken) {
      console.error('SANITY_REVALIDATE_SECRET não está configurado')
      return NextResponse.json(
        { error: 'Webhook não configurado corretamente' },
        { status: 500 }
      )
    }

    if (token !== expectedToken) {
      console.error('Token de webhook inválido')
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      )
    }

    // Parse do body do webhook
    const { body, isValidSignature } = await parseBody<{
      _type: string
      slug?: { current?: string }
    }>(req, process.env.SANITY_WEBHOOK_SECRET)

    // Se houver secret configurado, validar assinatura
    if (process.env.SANITY_WEBHOOK_SECRET && !isValidSignature) {
      console.error('Assinatura do webhook inválida')
      return NextResponse.json(
        { error: 'Assinatura inválida' },
        { status: 401 }
      )
    }

    if (!body?._type) {
      return NextResponse.json(
        { error: 'Tipo de documento não especificado' },
        { status: 400 }
      )
    }

    const documentType = body._type
    const revalidationConfig = REVALIDATION_MAP[documentType]

    if (!revalidationConfig) {
      console.warn(`Tipo de documento não mapeado para revalidação: ${documentType}`)
      // Revalidar homepage por padrão
      revalidatePath('/')
      return NextResponse.json({
        revalidated: true,
        now: Date.now(),
        paths: ['/'],
        message: `Tipo ${documentType} não mapeado, revalidou homepage por padrão`,
      })
    }

    // Revalidar paths
    const revalidatedPaths: string[] = []
    for (const path of revalidationConfig.paths) {
      revalidatePath(path)
      revalidatedPaths.push(path)
      console.log(`✅ Revalidado path: ${path}`)
    }

    // Revalidar tags
    const revalidatedTags: string[] = []
    for (const tag of revalidationConfig.tags) {
      revalidateTag(tag)
      revalidatedTags.push(tag)
      console.log(`✅ Revalidado tag: ${tag}`)
    }

    // Se for uma unidade com slug, revalidar a página específica
    if (documentType === 'unit' && body.slug?.current) {
      const unitPath = `/unidades/${body.slug.current}`
      revalidatePath(unitPath)
      revalidatedPaths.push(unitPath)
      console.log(`✅ Revalidado unidade específica: ${unitPath}`)
    }

    console.log(`🔄 Revalidação completa para tipo: ${documentType}`)

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      documentType,
      paths: revalidatedPaths,
      tags: revalidatedTags,
    })
  } catch (err: any) {
    console.error('Erro no webhook de revalidação:', err)
    return NextResponse.json(
      {
        error: 'Erro ao processar webhook',
        message: err.message
      },
      { status: 500 }
    )
  }
}

// Permitir GET para teste rápido (apenas em desenvolvimento)
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Endpoint disponível apenas em desenvolvimento' },
      { status: 403 }
    )
  }

  // Testar revalidação manual
  const searchParams = req.nextUrl.searchParams
  const type = searchParams.get('type')

  if (!type) {
    return NextResponse.json({
      message: 'Use ?type=<tipo> para testar revalidação',
      availableTypes: Object.keys(REVALIDATION_MAP),
    })
  }

  const config = REVALIDATION_MAP[type]
  if (!config) {
    return NextResponse.json({
      error: 'Tipo não encontrado',
      availableTypes: Object.keys(REVALIDATION_MAP),
    }, { status: 400 })
  }

  // Revalidar
  config.paths.forEach(path => revalidatePath(path))
  config.tags.forEach(tag => revalidateTag(tag))

  return NextResponse.json({
    message: `Revalidação manual executada para tipo: ${type}`,
    paths: config.paths,
    tags: config.tags,
  })
}
