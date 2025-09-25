import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { error: 'ID de película requerido' },
        { status: 400 }
      )
    }

    const { data: movie, error } = await supabase
      .from('movies')
      .select(`
        *,
        genres:genre_id (
          id,
          name,
          icon,
          color,
          description
        ),
        movie_cast (
          actor_name
        ),
        movie_tags (
          tag
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching movie:', error)
      return NextResponse.json(
        { error: 'Error al obtener la película' },
        { status: 500 }
      )
    }

    if (!movie) {
      return NextResponse.json(
        { error: 'Película no encontrada' },
        { status: 404 }
      )
    }

    // Transformar los datos del cast y tags de objetos a array de strings
    const transformedMovie = {
      ...movie,
      cast: movie.movie_cast?.map((c: any) => c.actor_name) || [],
      tags: movie.movie_tags?.map((t: any) => t.tag) || []
    }

    // Remover movie_cast y movie_tags del objeto final ya que hemos extraído la información
    delete transformedMovie.movie_cast
    delete transformedMovie.movie_tags

    return NextResponse.json({ movie: transformedMovie })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
