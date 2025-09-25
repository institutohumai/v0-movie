export interface Movie {
  id: string
  title: string
  year?: number
  genre_id?: string
  rating?: number
  duration?: string
  director?: string
  poster?: string
  description?: string
  synopsis?: string
  release_date?: string
  country?: string
  language?: string
  budget?: string
  box_office?: string
  created_at?: string
  cast?: string[]
  tags?: string[]
  // Relación con género
  genres?: Genre
}

export interface Genre {
  id: string
  name: string
  icon?: string
  color?: string
  description?: string
}

export interface Mood {
  name: string
  icon: string
  color: string
  description: string
}

// Tipo para película con datos expandidos (incluye género)
export interface MovieWithGenre extends Movie {
  genres: Genre
}
