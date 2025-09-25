-- Habilitar extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear tabla de géneros
CREATE TABLE IF NOT EXISTS genres (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  icon TEXT,
  color TEXT,
  description TEXT,
  CONSTRAINT genres_pkey PRIMARY KEY (id),
  CONSTRAINT genres_name_key UNIQUE (name)
);

-- Crear tabla de películas
CREATE TABLE IF NOT EXISTS movies (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  year INTEGER,
  genre_id UUID,
  rating NUMERIC(3,1) CHECK (rating >= 0 AND rating <= 10),
  duration TEXT,
  director TEXT,
  poster TEXT,
  description TEXT,
  synopsis TEXT,
  release_date DATE,
  country TEXT,
  language TEXT,
  budget TEXT,
  box_office TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT movies_pkey PRIMARY KEY (id),
  CONSTRAINT movies_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES genres (id) ON DELETE SET NULL
);

-- Crear índices para mejorar las consultas
CREATE INDEX IF NOT EXISTS idx_movies_genre_id ON movies(genre_id);
CREATE INDEX IF NOT EXISTS idx_movies_rating ON movies(rating);
CREATE INDEX IF NOT EXISTS idx_movies_year ON movies(year);
CREATE INDEX IF NOT EXISTS idx_movies_title ON movies USING gin(to_tsvector('spanish', title));

-- Insertar géneros
INSERT INTO genres (name, icon, color, description) VALUES
('Acción', 'sword', 'text-red-500', 'Aventuras llenas de adrenalina'),
('Comedia', 'laugh', 'text-yellow-500', 'Risas y momentos divertidos'),
('Drama', 'theater', 'text-blue-500', 'Historias profundas y emotivas'),
('Terror', 'ghost', 'text-purple-500', 'Suspenso y escalofríos'),
('Romance', 'heart', 'text-pink-500', 'Historias de amor apasionantes'),
('Ciencia Ficción', 'rocket', 'text-cyan-500', 'Futuros y mundos imaginarios'),
('Fantasía', 'wand', 'text-green-500', 'Magia y mundos fantásticos'),
('Thriller', 'shield', 'text-orange-500', 'Tensión y misterio constante'),
('Animación', 'palette', 'text-indigo-500', 'Arte animado para todas las edades'),
('Documental', 'camera', 'text-gray-500', 'Historias reales y educativas');

-- Insertar datos de muestra de películas
INSERT INTO movies (
  title, year, genre_id, rating, duration, director, poster, 
  description, synopsis, release_date, country, language, budget, box_office
) VALUES 
('Dune: Parte Dos', 2024, 
 (SELECT id FROM genres WHERE name = 'Ciencia Ficción'), 
 8.5, '166 min', 'Denis Villeneuve', '/dune-part-two-poster.png',
 'Paul Atreides se une a Chani y los Fremen mientras busca venganza contra los conspiradores que destruyeron a su familia.',
 'La segunda parte de la adaptación de Denis Villeneuve de la novela clásica de Frank Herbert.',
 '2024-03-01', 'Estados Unidos', 'Inglés', '$190M', '$711M'),

('Spider-Man: Cruzando el Multiverso', 2023,
 (SELECT id FROM genres WHERE name = 'Animación'),
 9.0, '140 min', 'Joaquim Dos Santos', '/spider-man-across-spider-verse-poster.png',
 'Miles Morales regresa para la próxima aventura en la saga ganadora del Oscar Spider-Verse.',
 'Una secuela revolucionaria que expande el universo Spider-Verse con una animación innovadora.',
 '2023-06-02', 'Estados Unidos', 'Inglés', '$100M', '$690M'),

('Oppenheimer', 2023,
 (SELECT id FROM genres WHERE name = 'Drama'),
 8.7, '180 min', 'Christopher Nolan', '/images/posters/oppenheimer-poster.png',
 'La historia del físico teórico estadounidense J. Robert Oppenheimer y el desarrollo de la bomba atómica.',
 'Un thriller biográfico épico que examina el enigma del hombre que debe arriesgar destruir el mundo para salvarlo.',
 '2023-07-21', 'Estados Unidos', 'Inglés', '$100M', '$952M'),

('Barbie', 2023,
 (SELECT id FROM genres WHERE name = 'Comedia'),
 7.8, '114 min', 'Greta Gerwig', '/barbie-movie-poster.png',
 'Barbie y Ken están teniendo el tiempo de sus vidas en el colorido mundo de Barbie Land.',
 'Una comedia subversiva que examina los temas de perfección, identidad y lo que significa ser humano.',
 '2023-07-21', 'Estados Unidos', 'Inglés', '$145M', '$1.446B'),

('John Wick 4', 2023,
 (SELECT id FROM genres WHERE name = 'Acción'),
 8.2, '169 min', 'Chad Stahelski', '/john-wick-4-poster.png',
 'John Wick descubre un camino para derrotar a la Mesa Alta.',
 'La cuarta entrega de la saga de acción que lleva las secuencias de combate coreografiadas a nuevas alturas.',
 '2023-03-24', 'Estados Unidos', 'Inglés', '$90M', '$440M'),

('La Sirenita', 2023,
 (SELECT id FROM genres WHERE name = 'Fantasía'),
 7.5, '135 min', 'Rob Marshall', '/little-mermaid-2023-poster.png',
 'La versión de acción real del clásico animado de Disney sobre una joven sirena.',
 'Una reimaginación musical vibrante del cuento clásico que combina nostalgia con una nueva perspectiva.',
 '2023-05-26', 'Estados Unidos', 'Inglés', '$250M', '$569M'),

('Paddington 2', 2017,
 (SELECT id FROM genres WHERE name = 'Comedia'),
 8.8, '103 min', 'Paul King', '/paddington-2-movie-poster.png',
 'El oso más querido regresa con más aventuras encantadoras.',
 'Paddington se establece cómodamente con la familia Brown en Windsor Gardens.',
 '2017-11-10', 'Reino Unido', 'Inglés', '$40M', '$227M'),

('Top Gun: Maverick', 2022,
 (SELECT id FROM genres WHERE name = 'Acción'),
 8.7, '130 min', 'Joseph Kosinski', '/top-gun-maverick-movie-poster.png',
 'Secuelas épicas con escenas aéreas impresionantes.',
 'Después de más de 30 años de servicio, Pete "Maverick" Mitchell empuja los límites como piloto de prueba.',
 '2022-05-27', 'Estados Unidos', 'Inglés', '$170M', '$1.489B'),

('Mad Max: Fury Road', 2015,
 (SELECT id FROM genres WHERE name = 'Acción'),
 8.1, '120 min', 'George Miller', '/mad-max-fury-road-movie-poster.png',
 'Acción post-apocalíptica sin parar.',
 'En un mundo post-apocalíptico, una mujer se rebela contra un líder tiránico.',
 '2015-05-15', 'Australia', 'Inglés', '$150M', '$375M'),

('Arrival', 2016,
 (SELECT id FROM genres WHERE name = 'Ciencia Ficción'),
 7.9, '116 min', 'Denis Villeneuve', '/arrival-movie-poster-amy-adams.png',
 'Ciencia ficción intelectual sobre comunicación alienígena.',
 'Cuando naves extraterrestres aterrizan en la Tierra, una lingüista es reclutada por el ejército.',
 '2016-11-11', 'Estados Unidos', 'Inglés', '$47M', '$203M');

-- Habilitar RLS (Row Level Security)
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE genres ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir lectura a todos los usuarios
CREATE POLICY "Allow read access for all users" ON movies
    FOR SELECT USING (true);

CREATE POLICY "Allow read access for all users" ON genres
    FOR SELECT USING (true);

-- Políticas para permitir escritura solo a usuarios autenticados
CREATE POLICY "Allow insert for authenticated users" ON movies
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow update for authenticated users" ON movies
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow delete for authenticated users" ON movies
    FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow insert for authenticated users" ON genres
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow update for authenticated users" ON genres
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow delete for authenticated users" ON genres
    FOR DELETE USING (auth.role() = 'authenticated');
