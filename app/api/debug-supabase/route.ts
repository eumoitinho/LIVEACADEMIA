import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    // Test Supabase connection
    const { data, error } = await supabaseAdmin
      .from('units')
      .select('slug, nome')
      .eq('slug', 'centro')
      .maybeSingle()

    return NextResponse.json({
      success: !error,
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      hasEncryptionSecret: !!process.env.ENCRYPTION_SECRET,
      supabaseUrl: process.env.SUPABASE_URL?.substring(0, 30) + '...',
      data: data ? { slug: data.slug, nome: data.nome } : null,
      error: error?.message || null,
    })
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message,
      stack: err.stack,
    }, { status: 500 })
  }
}
