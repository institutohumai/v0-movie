import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Test API - Verificando conexión a Supabase...')
    
    // Verificar variables de entorno
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    console.log('🔑 URL:', supabaseUrl ? '✅ Configurada' : '❌ Faltante')
    console.log('🔑 Key:', supabaseKey ? '✅ Configurada' : '❌ Faltante')
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        success: false,
        error: 'Variables de entorno faltantes',
        env: {
          url: !!supabaseUrl,
          key: !!supabaseKey
        }
      })
    }

    const supabase = createClient()
    console.log('✅ Cliente Supabase creado')

    // Probar conexión simple
    const { data, error } = await supabase
      .from('movies')
      .select('count(*)', { count: 'exact' })

    if (error) {
      console.error('❌ Error de conexión:', error)
      return NextResponse.json({
        success: false,
        error: 'Error de conexión a Supabase',
        details: error.message
      })
    }

    console.log('✅ Conexión exitosa')
    
    return NextResponse.json({
      success: true,
      message: 'Conexión a Supabase exitosa',
      movieCount: data?.[0]?.count || 0,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('💥 Error inesperado:', error)
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    })
  }
}
