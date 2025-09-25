# API de Películas

Esta documentación describe los endpoints disponibles para interactuar con la base de datos de películas.

## Base URL
```
/api
```

## Endpoints

### 1. Obtener todas las películas
```http
GET /api/movies
```

#### Parámetros de consulta (opcionales)
- `genre` (string): Filtrar por género
- `mood` (string): Filtrar por estado de ánimo
- `limit` (number): Limitar número de resultados
- `search` (string): Buscar en título, descripción y sinopsis

#### Ejemplo de respuesta
```json
{
  "movies": [
    {
      "id": 1,
      "title": "Dune: Parte Dos",
      "genre": "Ciencia Ficción",
      "rating": 8.5,
      "year": 2024,
      "duration": "166 min",
      "director": "Denis Villeneuve",
      "cast": ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
      "poster": "/dune-part-two-poster.png",
      "mood": "Épico",
      "description": "Paul Atreides se une a Chani y los Fremen...",
      "synopsis": "La segunda parte de la adaptación de Denis Villeneuve...",
      "tags": ["Épico", "Aventura", "Futurista"],
      "release_date": "2024-03-01",
      "country": "Estados Unidos",
      "language": "Inglés",
      "budget": "$190M",
      "box_office": "$711M"
    }
  ]
}
```

### 2. Obtener película por ID
```http
GET /api/movies/{id}
```

#### Parámetros de ruta
- `id` (number): ID de la película

#### Ejemplo de respuesta
```json
{
  "movie": {
    "id": 1,
    "title": "Dune: Parte Dos",
    // ... resto de propiedades
  }
}
```

### 3. Obtener películas por género
```http
GET /api/movies/genres?genre={genre}
```

#### Parámetros de consulta
- `genre` (string): Nombre del género (requerido)

#### Ejemplo de respuesta
```json
{
  "movies": [...],
  "genre": "Ciencia Ficción"
}
```

### 4. Obtener películas por estado de ánimo
```http
GET /api/movies/moods?mood={mood}
```

#### Parámetros de consulta
- `mood` (string): Estado de ánimo (requerido)

#### Ejemplo de respuesta
```json
{
  "movies": [...],
  "mood": "Feliz"
}
```

### 5. Buscar películas
```http
GET /api/movies/search?q={query}
```

#### Parámetros de consulta
- `q` (string): Término de búsqueda (requerido)
- `limit` (number): Límite de resultados (opcional, por defecto 20)

#### Ejemplo de respuesta
```json
{
  "movies": [...],
  "query": "dune",
  "count": 1
}
```

## Códigos de estado HTTP

- `200 OK`: Solicitud exitosa
- `400 Bad Request`: Parámetros inválidos o faltantes
- `404 Not Found`: Recurso no encontrado
- `500 Internal Server Error`: Error del servidor

## Estructura de errores

```json
{
  "error": "Descripción del error"
}
```

## Géneros disponibles

- Acción
- Comedia
- Drama
- Terror
- Romance
- Ciencia Ficción
- Fantasía
- Thriller
- Animación
- Documental

## Estados de ánimo disponibles

- Feliz
- Triste
- Emocionado
- Relajado
- Nostálgico
- Aventurero
- Romántico
- Pensativo

## Configuración de base de datos

Para configurar la base de datos en Supabase, ejecuta el archivo `supabase/schema.sql` en el editor SQL de tu proyecto de Supabase.

## Variables de entorno requeridas

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```
