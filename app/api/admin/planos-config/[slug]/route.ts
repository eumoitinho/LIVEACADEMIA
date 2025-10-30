import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const CONFIG_FILE = path.join(process.cwd(), 'data', 'planos-config.json')

interface PlanoConfig {
  codigo: number
  nome: string
  exibir: boolean
  ordem: number
  destaque: boolean
  badge?: string
}

// Garantir que o arquivo existe
function ensureConfigFile() {
  try {
    if (!fs.existsSync(CONFIG_FILE)) {
      fs.writeFileSync(CONFIG_FILE, '{}', 'utf8')
    }
  } catch (error) {
    console.error('Erro ao criar arquivo de configuração:', error)
  }
}

// GET - Buscar configuração de planos para uma unidade
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    ensureConfigFile()

    const data = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'))
    const config = data[slug] || []

    return NextResponse.json({ config })
  } catch (error) {
    console.error('[Admin Config] Erro ao buscar configuração:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar configuração' },
      { status: 500 }
    )
  }
}

// POST - Salvar configuração de planos para uma unidade
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const { config }: { config: PlanoConfig[] } = await request.json()

    ensureConfigFile()

    // Ler configuração atual
    const data = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'))

    // Atualizar configuração da unidade
    data[slug] = config

    // Salvar arquivo
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2), 'utf8')

    return NextResponse.json({ success: true, message: 'Configuração salva com sucesso!' })
  } catch (error) {
    console.error('[Admin Config] Erro ao salvar configuração:', error)
    return NextResponse.json(
      { error: 'Erro ao salvar configuração' },
      { status: 500 }
    )
  }
}