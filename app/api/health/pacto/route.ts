import { NextRequest, NextResponse } from 'next/server'
import { pactoV2API } from '@/src/lib/api/pacto-v2'

/**
 * Health check para verificar se as chaves da Pacto estão funcionando
 * GET /api/health/pacto
 */
export async function GET(req: NextRequest) {
  try {
    const startTime = Date.now()
    
    // Lista de redes para testar
    const redes = [
      '66F5F102B6E5E2C7F84F3471FF10CE19', // Live Academia
      // Adicione outras redes conforme necessário
    ]
    
    const results = []
    
    for (const codigoRede of redes) {
      const redeStatus = {
        codigo: codigoRede,
        chave: 'NOT_FOUND',
        teste_auth: 'NOT_TESTED',
        tempo_resposta: 0,
        erro: null as string | null
      }
      
      const redeStartTime = Date.now()
      
      try {
        // Testar se a chave existe (sem expor a chave)
        const chave = await (pactoV2API as any).getChaveRede(codigoRede)
        
        if (chave) {
          redeStatus.chave = 'OK'
          
          // Testar autenticação (gerar token)
          try {
            await pactoV2API.getUnidade(codigoRede, 1) // Testar com unidade 1
            redeStatus.teste_auth = 'OK'
          } catch (authError: any) {
            redeStatus.teste_auth = 'ERROR'
            redeStatus.erro = authError.message
          }
        } else {
          redeStatus.chave = 'NOT_FOUND'
          redeStatus.erro = 'Chave não encontrada'
        }
      } catch (error: any) {
        redeStatus.erro = error.message
      }
      
      redeStatus.tempo_resposta = Date.now() - redeStartTime
      results.push(redeStatus)
    }
    
    const totalTime = Date.now() - startTime
    const healthy = results.every(r => r.chave === 'OK')
    
    return NextResponse.json({
      status: healthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      tempo_total_ms: totalTime,
      redes: results,
      ambiente: process.env.NODE_ENV,
      versao: 'v2'
    }, {
      status: healthy ? 200 : 503
    })
    
  } catch (error: any) {
    console.error('[Health Check Pacto]', error)
    
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      erro: error.message,
      ambiente: process.env.NODE_ENV
    }, { status: 500 })
  }
}

/**
 * Método não permitido
 */
export async function POST() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
