import { Movie, Genre, MovieWithGenre } from './types'

const API_BASE_URL = '/api'

// Función para manejar respuestas de la API
async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Error de red' }))
    throw new Error(error.error || `Error ${response.status}`)
  }
  return response.json()
}

// Obtener todas las películas
export async function getMovies(): Promise<{ movies: MovieWithGenre[] }> {
  const response = await fetch(`${API_BASE_URL}/movies`)
  return handleResponse(response)
}

// Obtener una película por ID
export async function getMovieById(id: string): Promise<{ movie: MovieWithGenre }> {
  const response = await fetch(`${API_BASE_URL}/movies/${id}`)
  return handleResponse(response)
}

// Obtener todos los géneros
export async function getGenres(): Promise<{ genres: Genre[] }> {
  const response = await fetch(`${API_BASE_URL}/genres`)
  return handleResponse(response)
}

// Obtener películas por género
export async function getMoviesByGenre(genre: string): Promise<{ movies: MovieWithGenre[], genre: string }> {
  const params = new URLSearchParams({ genre })
  const response = await fetch(`${API_BASE_URL}/movies/genres?${params.toString()}`)
  return handleResponse(response)
}

// Buscar películas
export async function searchMovies(query: string, limit?: number): Promise<{ 
  movies: MovieWithGenre[], 
  query: string, 
  count: number 
}> {
  const params = new URLSearchParams({ q: query })
  if (limit) params.append('limit', limit.toString())
  
  const response = await fetch(`${API_BASE_URL}/movies/search?${params.toString()}`)
  return handleResponse(response)
}
