import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    console.log('🎬 API Movies - Iniciando...')
    
    // Verificar variables de entorno
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('❌ Variables de entorno de Supabase no configuradas')
      return NextResponse.json(
        { error: 'Configuración de Supabase faltante' },
        { status: 500 }
      )
    }

    const supabase = createClient()
    console.log('✅ Cliente Supabase creado')

    // Primero intentar obtener solo las películas básicas
    console.log('🔍 Consultando películas...')
    const { data: movies, error } = await supabase
      .from('movies')
      .select(`
        id,
        title,
        year,
        rating,
        duration,
        director,
        poster,
        description,
        genre_id,
        genres:genre_id (
          name,
          icon,
          color
        )
      `)
      .order('rating', { ascending: false })

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
    console.log('📊 Datos:', movies)

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
