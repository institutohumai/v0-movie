import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const limit = searchParams.get('limit') || '20'

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Consulta de búsqueda requerida' },
        { status: 400 }
      )
    }

    const searchTerm = query.trim()

    const { data: movies, error } = await supabase
      .from('movies')
      .select(`
        *,
        genres:genre_id (
          id,
          name,
          icon,
          color,
          description
        )
      `)
      .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,synopsis.ilike.%${searchTerm}%,director.ilike.%${searchTerm}%`)
      .order('rating', { ascending: false })
      .limit(parseInt(limit))

    if (error) {
      console.error('Error searching movies:', error)
      return NextResponse.json(
        { error: 'Error al buscar películas' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      movies, 
      query: searchTerm,
      count: movies?.length || 0 
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
