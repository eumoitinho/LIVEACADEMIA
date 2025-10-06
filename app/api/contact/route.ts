import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json().catch(() => ({}))
    // Basic validation
    const { name, email, phone, interest, message } = data || {}
    if (!name || !email) {
      return NextResponse.json({ success: false, error: 'Nome e email são obrigatórios.' }, { status: 400 })
    }
    // In a real implementation here we'd send an email or persist to a CRM.
    console.log('[CONTACT_FORM] Nova mensagem recebida:', { name, email, phone, interest, message })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('[CONTACT_FORM] Erro ao processar', e)
    return NextResponse.json({ success: false, error: 'Erro interno.' }, { status: 500 })
  }
}
