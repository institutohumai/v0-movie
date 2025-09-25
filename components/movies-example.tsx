'use client'

import { useState } from 'react'
import { useMovies, useMoviesByGenre, useMoviesByMood, useSearchMovies } from '@/hooks/useMovies'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

export function MoviesExample() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Hook para obtener todas las películas
  const { movies: allMovies, loading: allLoading, error: allError } = useMovies()

  // Hook para películas por género
  const { movies: genreMovies, loading: genreLoading, error: genreError } = useMoviesByGenre(selectedGenre)

  // Hook para películas por estado de ánimo
  const { movies: moodMovies, loading: moodLoading, error: moodError } = useMoviesByMood(selectedMood)

  // Hook para búsqueda
  const { movies: searchResults, loading: searchLoading, error: searchError, search, count } = useSearchMovies()

  const handleSearch = () => {
    search(searchQuery)
  }

  const genres = ['Acción', 'Comedia', 'Drama', 'Ciencia Ficción', 'Animación']
  const moods = ['Feliz', 'Emocionado', 'Pensativo', 'Aventurero', 'Nostálgico']

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Ejemplo de uso de API de Películas</h1>

      {/* Sección de búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Películas</CardTitle>
          <CardDescription>Busca películas por título, descripción o director</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Escribe aquí para buscar..."
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={searchLoading}>
              {searchLoading ? 'Buscando...' : 'Buscar'}
            </Button>
          </div>
          
          {searchError && <p className="text-red-500">Error: {searchError}</p>}
          
          {searchResults.length > 0 && (
            <div>
              <p className="font-semibold">Resultados de búsqueda: {count} películas encontradas</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {searchResults.slice(0, 6).map((movie) => (
                  <Card key={movie.id} className="p-4">
                    <h3 className="font-semibold">{movie.title}</h3>
                    <p className="text-sm text-muted-foreground">{movie.genre} • {movie.year}</p>
                    <p className="text-sm mt-2">{movie.description.substring(0, 100)}...</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-semibold">⭐ {movie.rating}</span>
                      <span className="text-sm text-muted-foreground">{movie.duration}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Filtros por género */}
      <Card>
        <CardHeader>
          <CardTitle>Filtrar por Género</CardTitle>
          <CardDescription>Selecciona un género para ver películas relacionadas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? 'default' : 'outline'}
                onClick={() => setSelectedGenre(selectedGenre === genre ? null : genre)}
              >
                {genre}
              </Button>
            ))}
          </div>

          {genreLoading && <p>Cargando películas del género...</p>}
          {genreError && <p className="text-red-500">Error: {genreError}</p>}
          
          {genreMovies.length > 0 && (
            <div>
              <p className="font-semibold">Películas de {selectedGenre}: {genreMovies.length} encontradas</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {genreMovies.slice(0, 6).map((movie) => (
                  <Card key={movie.id} className="p-4">
                    <h3 className="font-semibold">{movie.title}</h3>
                    <p className="text-sm text-muted-foreground">{movie.director} • {movie.year}</p>
                    <p className="text-sm mt-2">{movie.synopsis.substring(0, 100)}...</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-semibold">⭐ {movie.rating}</span>
                      <span className="text-sm text-muted-foreground">{movie.mood}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Filtros por estado de ánimo */}
      <Card>
        <CardHeader>
          <CardTitle>Filtrar por Estado de Ánimo</CardTitle>
          <CardDescription>Selecciona un estado de ánimo para ver películas apropiadas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {moods.map((mood) => (
              <Button
                key={mood}
                variant={selectedMood === mood ? 'default' : 'outline'}
                onClick={() => setSelectedMood(selectedMood === mood ? null : mood)}
              >
                {mood}
              </Button>
            ))}
          </div>

          {moodLoading && <p>Cargando películas del estado de ánimo...</p>}
          {moodError && <p className="text-red-500">Error: {moodError}</p>}
          
          {moodMovies.length > 0 && (
            <div>
              <p className="font-semibold">Películas para estado de ánimo {selectedMood}: {moodMovies.length} encontradas</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {moodMovies.slice(0, 6).map((movie) => (
                  <Card key={movie.id} className="p-4">
                    <h3 className="font-semibold">{movie.title}</h3>
                    <p className="text-sm text-muted-foreground">{movie.genre} • {movie.year}</p>
                    <p className="text-sm mt-2">{movie.description.substring(0, 100)}...</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-semibold">⭐ {movie.rating}</span>
                      <span className="text-sm text-muted-foreground">{movie.duration}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Todas las películas */}
      <Card>
        <CardHeader>
          <CardTitle>Todas las Películas</CardTitle>
          <CardDescription>Lista completa de películas en la base de datos</CardDescription>
        </CardHeader>
        <CardContent>
          {allLoading && <p>Cargando todas las películas...</p>}
          {allError && <p className="text-red-500">Error: {allError}</p>}
          
          {allMovies.length > 0 && (
            <div>
              <p className="font-semibold mb-4">Total de películas: {allMovies.length}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {allMovies.slice(0, 8).map((movie) => (
                  <Card key={movie.id} className="p-4">
                    <h3 className="font-semibold text-sm">{movie.title}</h3>
                    <p className="text-xs text-muted-foreground">{movie.genre}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs font-semibold">⭐ {movie.rating}</span>
                      <span className="text-xs text-muted-foreground">{movie.year}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
