'use client'

import { useState, useEffect } from 'react'
import { MovieWithGenre, Genre } from '@/lib/types'
import { getMovies, getMovieById, getMoviesByGenre, searchMovies, getGenres } from '@/lib/api'

interface UseMoviesState {
  movies: MovieWithGenre[]
  loading: boolean
  error: string | null
}

export function useMovies() {
  const [state, setState] = useState<UseMoviesState>({
    movies: [],
    loading: true,
    error: null
  })

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }))
        const response = await getMovies()
        setState(prev => ({ ...prev, movies: response.movies, loading: false }))
      } catch (error) {
        setState(prev => ({ 
          ...prev, 
          error: error instanceof Error ? error.message : 'Error desconocido', 
          loading: false 
        }))
      }
    }

    fetchMovies()
  }, [])

  return state
}

export function useMovie(id: string | null) {
  const [movie, setMovie] = useState<MovieWithGenre | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchMovie = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getMovieById(id)
        setMovie(response.movie)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id])

  return { movie, loading, error }
}

export function useGenres() {
  const [genres, setGenres] = useState<Genre[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getGenres()
        setGenres(response.genres)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchGenres()
  }, [])

  return { genres, loading, error }
}

export function useMoviesByGenre(genre: string | null) {
  const [movies, setMovies] = useState<MovieWithGenre[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!genre) return

    const fetchMovies = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getMoviesByGenre(genre)
        setMovies(response.movies)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [genre])

  return { movies, loading, error }
}

export function useSearchMovies() {
  const [state, setState] = useState<{
    movies: MovieWithGenre[]
    loading: boolean
    error: string | null
    query: string
    count: number
  }>({
    movies: [],
    loading: false,
    error: null,
    query: '',
    count: 0
  })

  const search = async (query: string, limit?: number) => {
    if (!query.trim()) {
      setState(prev => ({ ...prev, movies: [], query: '', count: 0 }))
      return
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      const response = await searchMovies(query, limit)
      setState(prev => ({ 
        ...prev, 
        movies: response.movies,
        query: response.query,
        count: response.count,
        loading: false 
      }))
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Error desconocido', 
        loading: false 
      }))
    }
  }

  return { ...state, search }
}
