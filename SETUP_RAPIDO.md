# 🚀 Configuración Rápida

## ⚡ Pasos para activar la API

### 1. Configurar Supabase
Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

### 2. Configurar la base de datos
1. Ve a tu panel de Supabase
2. Abre el **SQL Editor**
3. Copia y pega el contenido de `supabase/schema.sql`
4. Ejecuta el script

### 3. Probar la aplicación
```bash
npm run dev
```

## ✅ ¿Qué se ha integrado?

- ✅ **Todas las películas** - Se cargan desde Supabase
- ✅ **Filtros por género** - Usa endpoint `/api/movies/genres`
- ✅ **Filtros por estado de ánimo** - Usa endpoint `/api/movies/moods`
- ✅ **Estados de carga** - Indicadores mientras cargan los datos
- ✅ **Manejo de errores** - Mensajes de error y botones de reintento

## 🎬 Datos incluidos

La base de datos incluye **10 películas** de muestra con todos los campos:
- Títulos, géneros, ratings, años
- Directores, cast, duraciones
- Descripciones, sinopsis, tags
- Estados de ánimo, países, idiomas
- Presupuestos y taquilla

## 🔧 Próximos pasos opcionales

1. **Búsqueda**: Integrar el endpoint `/api/movies/search`
2. **Más películas**: Agregar más datos a la tabla `movies`
3. **Autenticación**: Personalizar políticas de RLS
4. **Recomendaciones**: Algoritmos de recomendación basados en preferencias

¡La aplicación ya está funcionando con datos reales desde Supabase! 🎉
