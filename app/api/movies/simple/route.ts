import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    console.log('🎬 API Movies Simple - Iniciando...')
    
    const supabase = createClient()
    console.log('✅ Cliente Supabase creado')

    // Consulta muy simple sin JOINs
    console.log('🔍 Consultando películas sin JOINs...')
    const { data: movies, error } = await supabase
      .from('movies')
      .select('*')
      .limit(6)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Error de Supabase:', error)
      return NextResponse.json(
        { 
          error: 'Error al obtener las películas',
          details: error.message 
        },
        { status: 500 }
      )
    }

    console.log(`✅ Películas obtenidas: ${movies?.length || 0}`)
    
    return NextResponse.json({ 
      movies: movies || [],
      count: movies?.length || 0
    })
  } catch (error) {
    console.error('💥 Error inesperado:', error)
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    )
  }
}
