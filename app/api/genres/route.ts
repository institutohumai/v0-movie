import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()

    const { data: genres, error } = await supabase
      .from('genres')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching genres:', error)
      return NextResponse.json(
        { error: 'Error al obtener los géneros' },
        { status: 500 }
      )
    }

    return NextResponse.json({ genres })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
