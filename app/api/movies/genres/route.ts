import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const genre = searchParams.get('genre')

    if (!genre) {
      return NextResponse.json(
        { error: 'Género requerido' },
        { status: 400 }
      )
    }

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
      .eq('genres.name', genre)
      .order('rating', { ascending: false })

    if (error) {
      console.error('Error fetching movies by genre:', error)
      return NextResponse.json(
        { error: 'Error al obtener las películas por género' },
        { status: 500 }
      )
    }

    return NextResponse.json({ movies, genre })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
