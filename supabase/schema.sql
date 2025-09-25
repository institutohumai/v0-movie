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
WITH genre_ids AS (
  SELECT name, id FROM genres
)
INSERT INTO movies (
  title, year, genre_id, rating, duration, director, poster, 
  description, synopsis, release_date, country, language, budget, box_office
) VALUES 
('Dune: Parte Dos', 2024, (SELECT id FROM genre_ids WHERE name = 'Ciencia Ficción'), 8.5, '166 min', 'Denis Villeneuve',
 '/dune-part-two-poster.png',
 'Paul Atreides se une a Chani y los Fremen mientras busca venganza contra los conspiradores que destruyeron a su familia. Enfrentando una elección entre el amor de su vida y el destino del universo conocido, se esfuerza por prevenir un futuro terrible que solo él puede prever.',
 'La segunda parte de la adaptación de Denis Villeneuve de la novela clásica de Frank Herbert. Paul Atreides continúa su viaje épico mientras navega por la política, la religión y las fuerzas que luchan por el control del planeta desértico Arrakis.',
 '2024-03-01', 'Estados Unidos', 'Inglés', '$190M', '$711M'),

(2, 'Spider-Man: Cruzando el Multiverso', 'Animación', 9.0, 2023, '140 min', 'Joaquim Dos Santos',
 ARRAY['Shameik Moore', 'Hailee Steinfeld', 'Brian Tyree Henry', 'Luna Lauren Vélez'],
 '/spider-man-across-spider-verse-poster.png', 'Aventurero',
 'Miles Morales regresa para la próxima aventura en la saga ganadora del Oscar Spider-Verse. Después de reunirse con Gwen Stacy, el amigable Spider-Man del vecindario de Brooklyn es catapultado a través del Multiverso.',
 'Una secuela revolucionaria que expande el universo Spider-Verse con una animación innovadora y una narrativa emocionalmente resonante sobre el crecimiento y la responsabilidad.',
 ARRAY['Superhéroes', 'Multiverso', 'Familia'], '2023-06-02', 'Estados Unidos', 'Inglés', '$100M', '$690M'),

(3, 'Oppenheimer', 'Drama', 8.7, 2023, '180 min', 'Christopher Nolan',
 ARRAY['Cillian Murphy', 'Emily Blunt', 'Robert Downey Jr.', 'Matt Damon'],
 '/images/posters/oppenheimer-poster.png', 'Pensativo',
 'La historia del físico teórico estadounidense J. Robert Oppenheimer, su papel en el Proyecto Manhattan y el desarrollo de la bomba atómica durante la Segunda Guerra Mundial.',
 'Un thriller biográfico épico que examina el enigma del hombre que debe arriesgar destruir el mundo para salvarlo. Una exploración de la genialidad, la ambición y las consecuencias.',
 ARRAY['Biografía', 'Historia', 'Guerra'], '2023-07-21', 'Estados Unidos', 'Inglés', '$100M', '$952M'),

(4, 'Barbie', 'Comedia', 7.8, 2023, '114 min', 'Greta Gerwig',
 ARRAY['Margot Robbie', 'Ryan Gosling', 'America Ferrera', 'Kate McKinnon'],
 '/barbie-movie-poster.png', 'Feliz',
 'Barbie y Ken están teniendo el tiempo de sus vidas en el colorido y aparentemente perfecto mundo de Barbie Land. Sin embargo, cuando tienen la oportunidad de ir al mundo real, pronto descubren las alegrías y peligros de vivir entre los humanos.',
 'Una comedia subversiva que examina los temas de perfección, identidad y lo que significa ser humano a través del lente del icónico juguete.',
 ARRAY['Comedia', 'Fantasía', 'Sátira'], '2023-07-21', 'Estados Unidos', 'Inglés', '$145M', '$1.446B'),

(5, 'John Wick 4', 'Acción', 8.2, 2023, '169 min', 'Chad Stahelski',
 ARRAY['Keanu Reeves', 'Donnie Yen', 'Bill Skarsgård', 'Laurence Fishburne'],
 '/john-wick-4-poster.png', 'Emocionado',
 'John Wick descubre un camino para derrotar a la Mesa Alta. Pero antes de que pueda ganar su libertad, Wick debe enfrentarse a un nuevo enemigo con poderosas alianzas en todo el mundo.',
 'La cuarta entrega de la saga de acción que lleva las secuencias de combate coreografiadas y el mundo building a nuevas alturas cinematográficas.',
 ARRAY['Acción', 'Thriller', 'Venganza'], '2023-03-24', 'Estados Unidos', 'Inglés', '$90M', '$440M'),

(6, 'La Sirenita', 'Fantasía', 7.5, 2023, '135 min', 'Rob Marshall',
 ARRAY['Halle Bailey', 'Jonah Hauer-King', 'Melissa McCarthy', 'Javier Bardem'],
 '/little-mermaid-2023-poster.png', 'Nostálgico',
 'La versión de acción real del clásico animado de Disney sobre una joven sirena que hace un trato con una bruja del mar para intercambiar su hermosa voz por piernas humanas.',
 'Una reimaginación musical vibrante del cuento clásico que combina nostalgia con una nueva perspectiva contemporánea.',
 ARRAY['Musical', 'Fantasía', 'Romance'], '2023-05-26', 'Estados Unidos', 'Inglés', '$250M', '$569M'),

-- Películas adicionales por estado de ánimo
(7, 'Paddington 2', 'Familia', 8.8, 2017, '103 min', 'Paul King',
 ARRAY['Hugh Bonneville', 'Sally Hawkins', 'Brendan Gleeson', 'Julie Walters'],
 '/paddington-2-movie-poster.png', 'Feliz',
 'El oso más querido regresa con más aventuras encantadoras',
 'Paddington se establece cómodamente con la familia Brown en Windsor Gardens. Se ha convertido en un miembro popular de la comunidad, esparciendo alegría y mermelada dondequiera que vaya.',
 ARRAY['Familia', 'Aventura', 'Comedia'], '2017-11-10', 'Reino Unido', 'Inglés', '$40M', '$227M'),

(8, 'La La Land', 'Musical', 8.0, 2016, '128 min', 'Damien Chazelle',
 ARRAY['Ryan Gosling', 'Emma Stone', 'John Legend', 'Rosemarie DeWitt'],
 '/la-la-land-movie-poster.png', 'Feliz',
 'Un musical romántico lleno de color y música',
 'Una historia de amor y ambición ambientada en Los Ángeles moderno, entre una aspirante a actriz y un músico de jazz dedicado.',
 ARRAY['Musical', 'Romance', 'Drama'], '2016-12-09', 'Estados Unidos', 'Inglés', '$30M', '$448M'),

(9, 'Top Gun: Maverick', 'Acción', 8.7, 2022, '130 min', 'Joseph Kosinski',
 ARRAY['Tom Cruise', 'Miles Teller', 'Jennifer Connelly', 'Jon Hamm'],
 '/top-gun-maverick-movie-poster.png', 'Emocionado',
 'Secuelas épicas con escenas aéreas impresionantes',
 'Después de más de 30 años de servicio como uno de los mejores aviadores de la Marina, Pete "Maverick" Mitchell se encuentra donde pertenece, empujando los límites como un valiente piloto de prueba.',
 ARRAY['Acción', 'Drama', 'Aviación'], '2022-05-27', 'Estados Unidos', 'Inglés', '$170M', '$1.489B'),

(10, 'Mad Max: Fury Road', 'Acción', 8.1, 2015, '120 min', 'George Miller',
 ARRAY['Tom Hardy', 'Charlize Theron', 'Nicholas Hoult', 'Hugh Keays-Byrne'],
 '/mad-max-fury-road-movie-poster.png', 'Emocionado',
 'Acción post-apocalíptica sin parar',
 'En un mundo post-apocalíptico, una mujer se rebela contra un líder tiránico en busca de su tierra natal con la ayuda de un grupo de prisioneras y un drifter reacio.',
 ARRAY['Acción', 'Aventura', 'Ciencia Ficción'], '2015-05-15', 'Australia', 'Inglés', '$150M', '$375M');

-- Habilitar RLS (Row Level Security)
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura a todos los usuarios autenticados
CREATE POLICY "Allow read access for authenticated users" ON movies
    FOR SELECT USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

-- Política para permitir inserción solo a usuarios autenticados
CREATE POLICY "Allow insert for authenticated users" ON movies
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Política para permitir actualización solo a usuarios autenticados
CREATE POLICY "Allow update for authenticated users" ON movies
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Política para permitir eliminación solo a usuarios autenticados
CREATE POLICY "Allow delete for authenticated users" ON movies
    FOR DELETE USING (auth.role() = 'authenticated');
