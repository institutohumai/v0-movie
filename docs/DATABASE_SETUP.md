# Configuración de Base de Datos - Sistema de Recomendación de Películas

## Requisitos previos

1. Cuenta en [Supabase](https://supabase.com)
2. Proyecto creado en Supabase
3. Variables de entorno configuradas

## Configuración paso a paso

### 1. Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Anota la URL del proyecto y la clave anónima

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

### 3. Ejecutar el script de configuración

1. Ve al editor SQL en tu panel de Supabase
2. Copia y pega el contenido del archivo `supabase/schema.sql`
3. Ejecuta el script

Este script hará lo siguiente:
- Crear la tabla `movies` con todas las columnas necesarias
- Crear índices para optimizar las consultas
- Insertar datos de muestra (10 películas)
- Configurar políticas de seguridad (RLS)

### 4. Verificar la instalación

Después de ejecutar el script, deberías ver:
- Una tabla `movies` con 10 registros
- Índices creados automáticamente
- Políticas de RLS habilitadas

### 5. Probar los endpoints

Una vez configurada la base de datos, puedes probar los endpoints:

```bash
# Obtener todas las películas
curl http://localhost:3000/api/movies

# Buscar películas
curl "http://localhost:3000/api/movies/search?q=dune"

# Filtrar por género
curl "http://localhost:3000/api/movies/genres?genre=Acción"

# Filtrar por estado de ánimo
curl "http://localhost:3000/api/movies/moods?mood=Feliz"
```

## Estructura de la tabla

```sql
CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  rating DECIMAL(3,1) NOT NULL,
  year INTEGER NOT NULL,
  duration VARCHAR(20) NOT NULL,
  director VARCHAR(255) NOT NULL,
  cast TEXT[] NOT NULL,
  poster VARCHAR(255) NOT NULL,
  mood VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  synopsis TEXT NOT NULL,
  tags TEXT[] NOT NULL,
  release_date DATE NOT NULL,
  country VARCHAR(100) NOT NULL,
  language VARCHAR(50) NOT NULL,
  budget VARCHAR(20),
  box_office VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Políticas de seguridad

### Lectura (SELECT)
- Permitida para usuarios anónimos y autenticados
- Útil para mostrar películas públicamente

### Escritura (INSERT/UPDATE/DELETE)
- Solo para usuarios autenticados
- Requiere login para modificar datos

### Personalización

Si quieres modificar las políticas de seguridad:

```sql
-- Ejemplo: Permitir solo lectura a usuarios anónimos
DROP POLICY "Allow read access for authenticated users" ON movies;

CREATE POLICY "Allow read access for all users" ON movies
    FOR SELECT USING (true);
```

## Agregar más películas

Para agregar más películas, puedes:

1. **Usar el panel de Supabase:**
   - Ve a Table Editor
   - Selecciona la tabla `movies`
   - Haz clic en "Insert row"

2. **Usar los endpoints de API:**
   ```javascript
   // Ejemplo con fetch (requiere autenticación)
   const newMovie = {
     title: "Nueva Película",
     genre: "Drama",
     rating: 8.0,
     // ... resto de campos
   }
   
   fetch('/api/movies', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(newMovie)
   })
   ```

3. **Ejecutar SQL directamente:**
   ```sql
   INSERT INTO movies (title, genre, rating, year, ...)
   VALUES ('Nueva Película', 'Drama', 8.0, 2024, ...);
   ```

## Respaldo y restauración

### Crear respaldo
```sql
-- Exportar datos de la tabla movies
COPY movies TO '/path/to/backup/movies.csv' DELIMITER ',' CSV HEADER;
```

### Restaurar desde respaldo
```sql
-- Importar datos desde CSV
COPY movies FROM '/path/to/backup/movies.csv' DELIMITER ',' CSV HEADER;
```

## Troubleshooting

### Problema: "relation movies does not exist"
**Solución:** Asegúrate de haber ejecutado el script `schema.sql` completamente.

### Problema: "RLS policy violation"
**Solución:** Verifica que las políticas de RLS estén configuradas correctamente o desactiva RLS temporalmente:
```sql
ALTER TABLE movies DISABLE ROW LEVEL SECURITY;
```

### Problema: Datos no aparecen en la API
**Solución:** 
1. Verifica las variables de entorno
2. Comprueba que los datos existan en Supabase
3. Revisa los logs del servidor para errores

## Monitoring y optimización

### Consultas lentas
Para identificar consultas lentas:
```sql
-- Habilitar estadísticas de consultas
SELECT * FROM pg_stat_statements WHERE query LIKE '%movies%';
```

### Índices adicionales
Si necesitas búsquedas más específicas:
```sql
-- Índice para búsqueda de texto completo en múltiples columnas
CREATE INDEX idx_movies_fulltext 
ON movies USING gin(to_tsvector('spanish', title || ' ' || description));
```
