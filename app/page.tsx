"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ChevronRight,
  Film,
  Heart,
  Star,
  Users,
  Home,
  Compass,
  Smile,
  User,
  Search,
  TrendingUp,
  Clock,
  Play,
  Zap,
  Coffee,
  Moon,
  Sun,
  CloudRain,
  Mountain,
  Brain,
  Sword,
  Laugh,
  Drama,
  Ghost,
  Palette,
  Rocket,
  Wand2,
  Shield,
  Camera,
  X,
  ArrowLeft,
  Filter,
  Bookmark,
  Share,
  Calendar,
  MapPin,
  Users2,
  Award,
  Info,
  Edit,
  Bell,
  HelpCircle,
  LogOut,
} from "lucide-react"

export default function PeliculitaApp() {
  const [currentScreen, setCurrentScreen] = useState("home")
  const [selectedMood, setSelectedMood] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedMovie, setSelectedMovie] = useState<any>(null)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showMoodSelection, setShowMoodSelection] = useState(false)
  const [userCurrentMood, setUserCurrentMood] = useState("Feliz") // Default mood
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [userPreferences, setUserPreferences] = useState({
    name: "",
    favoriteGenres: [] as string[],
    watchingFrequency: "",
    preferredMoods: [] as string[],
  })

  const genres = [
    { name: "Acción", icon: Sword, color: "text-red-500", description: "Aventuras llenas de adrenalina" },
    { name: "Comedia", icon: Laugh, color: "text-yellow-500", description: "Risas y momentos divertidos" },
    { name: "Drama", icon: Drama, color: "text-blue-500", description: "Historias profundas y emotivas" },
    { name: "Terror", icon: Ghost, color: "text-purple-500", description: "Suspenso y escalofríos" },
    { name: "Romance", icon: Heart, color: "text-pink-500", description: "Historias de amor apasionantes" },
    { name: "Ciencia Ficción", icon: Rocket, color: "text-cyan-500", description: "Futuros y mundos imaginarios" },
    { name: "Fantasía", icon: Wand2, color: "text-green-500", description: "Magia y mundos fantásticos" },
    { name: "Thriller", icon: Shield, color: "text-orange-500", description: "Tensión y misterio constante" },
    { name: "Animación", icon: Palette, color: "text-indigo-500", description: "Arte animado para todas las edades" },
    { name: "Documental", icon: Camera, color: "text-gray-500", description: "Historias reales y educativas" },
  ]

  const moods = [
    { name: "Feliz", icon: Sun, color: "text-yellow-500", description: "Comedias y películas alegres" },
    { name: "Triste", icon: CloudRain, color: "text-blue-500", description: "Dramas emotivos y reflexivos" },
    { name: "Emocionado", icon: Zap, color: "text-orange-500", description: "Acción y aventuras épicas" },
    { name: "Relajado", icon: Coffee, color: "text-green-500", description: "Películas tranquilas y contemplativas" },
    { name: "Nostálgico", icon: Moon, color: "text-purple-500", description: "Clásicos y películas vintage" },
    { name: "Aventurero", icon: Mountain, color: "text-red-500", description: "Aventuras y exploración" },
    { name: "Romántico", icon: Heart, color: "text-pink-500", description: "Historias de amor y romance" },
    { name: "Pensativo", icon: Brain, color: "text-indigo-500", description: "Películas que invitan a reflexionar" },
  ]

  const frequencies = ["Diariamente", "Varias veces por semana", "Una vez por semana", "Ocasionalmente"]

  const allMovies = [
    {
      id: 1,
      title: "Dune: Parte Dos",
      genre: "Ciencia Ficción",
      rating: 8.5,
      year: 2024,
      duration: "166 min",
      director: "Denis Villeneuve",
      cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Oscar Isaac"],
      poster: "/dune-part-two-poster.png",
      mood: "Épico",
      description:
        "Paul Atreides se une a Chani y los Fremen mientras busca venganza contra los conspiradores que destruyeron a su familia. Enfrentando una elección entre el amor de su vida y el destino del universo conocido, se esfuerza por prevenir un futuro terrible que solo él puede prever.",
      synopsis:
        "La segunda parte de la adaptación de Denis Villeneuve de la novela clásica de Frank Herbert. Paul Atreides continúa su viaje épico mientras navega por la política, la religión y las fuerzas que luchan por el control del planeta desértico Arrakis.",
      tags: ["Épico", "Aventura", "Futurista"],
      releaseDate: "2024-03-01",
      country: "Estados Unidos",
      language: "Inglés",
      budget: "$190M",
      boxOffice: "$711M",
    },
    {
      id: 2,
      title: "Spider-Man: Cruzando el Multiverso",
      genre: "Animación",
      rating: 9.0,
      year: 2023,
      duration: "140 min",
      director: "Joaquim Dos Santos",
      cast: ["Shameik Moore", "Hailee Steinfeld", "Brian Tyree Henry", "Luna Lauren Vélez"],
      poster: "/spider-man-across-spider-verse-poster.png",
      mood: "Aventurero",
      description:
        "Miles Morales regresa para la próxima aventura en la saga ganadora del Oscar Spider-Verse. Después de reunirse con Gwen Stacy, el amigable Spider-Man del vecindario de Brooklyn es catapultado a través del Multiverso.",
      synopsis:
        "Una secuela revolucionaria que expande el universo Spider-Verse con una animación innovadora y una narrativa emocionalmente resonante sobre el crecimiento y la responsabilidad.",
      tags: ["Superhéroes", "Multiverso", "Familia"],
      releaseDate: "2023-06-02",
      country: "Estados Unidos",
      language: "Inglés",
      budget: "$100M",
      boxOffice: "$690M",
    },
    {
      id: 3,
      title: "Oppenheimer",
      genre: "Drama",
      rating: 8.7,
      year: 2023,
      duration: "180 min",
      director: "Christopher Nolan",
      cast: ["Cillian Murphy", "Emily Blunt", "Robert Downey Jr.", "Matt Damon"],
      poster: "/images/posters/oppenheimer-poster.png",
      mood: "Pensativo",
      description:
        "La historia del físico teórico estadounidense J. Robert Oppenheimer, su papel en el Proyecto Manhattan y el desarrollo de la bomba atómica durante la Segunda Guerra Mundial.",
      synopsis:
        "Un thriller biográfico épico que examina el enigma del hombre que debe arriesgar destruir el mundo para salvarlo. Una exploración de la genialidad, la ambición y las consecuencias.",
      tags: ["Biografía", "Historia", "Guerra"],
      releaseDate: "2023-07-21",
      country: "Estados Unidos",
      language: "Inglés",
      budget: "$100M",
      boxOffice: "$952M",
    },
    {
      id: 4,
      title: "Barbie",
      genre: "Comedia",
      rating: 7.8,
      year: 2023,
      duration: "114 min",
      director: "Greta Gerwig",
      cast: ["Margot Robbie", "Ryan Gosling", "America Ferrera", "Kate McKinnon"],
      poster: "/barbie-movie-poster.png",
      mood: "Feliz",
      description:
        "Barbie y Ken están teniendo el tiempo de sus vidas en el colorido y aparentemente perfecto mundo de Barbie Land. Sin embargo, cuando tienen la oportunidad de ir al mundo real, pronto descubren las alegrías y peligros de vivir entre los humanos.",
      synopsis:
        "Una comedia subversiva que examina los temas de perfección, identidad y lo que significa ser humano a través del lente del icónico juguete.",
      tags: ["Comedia", "Fantasía", "Sátira"],
      releaseDate: "2023-07-21",
      country: "Estados Unidos",
      language: "Inglés",
      budget: "$145M",
      boxOffice: "$1.446B",
    },
    {
      id: 5,
      title: "John Wick 4",
      genre: "Acción",
      rating: 8.2,
      year: 2023,
      duration: "169 min",
      director: "Chad Stahelski",
      cast: ["Keanu Reeves", "Donnie Yen", "Bill Skarsgård", "Laurence Fishburne"],
      poster: "/john-wick-4-poster.png",
      mood: "Emocionado",
      description:
        "John Wick descubre un camino para derrotar a la Mesa Alta. Pero antes de que pueda ganar su libertad, Wick debe enfrentarse a un nuevo enemigo con poderosas alianzas en todo el mundo.",
      synopsis:
        "La cuarta entrega de la saga de acción que lleva las secuencias de combate coreografiadas y el mundo building a nuevas alturas cinematográficas.",
      tags: ["Acción", "Thriller", "Venganza"],
      releaseDate: "2023-03-24",
      country: "Estados Unidos",
      language: "Inglés",
      budget: "$90M",
      boxOffice: "$440M",
    },
    {
      id: 6,
      title: "La Sirenita",
      genre: "Fantasía",
      rating: 7.5,
      year: 2023,
      duration: "135 min",
      director: "Rob Marshall",
      cast: ["Halle Bailey", "Jonah Hauer-King", "Melissa McCarthy", "Javier Bardem"],
      poster: "/little-mermaid-2023-poster.png",
      mood: "Nostálgico",
      description:
        "La versión de acción real del clásico animado de Disney sobre una joven sirena que hace un trato con una bruja del mar para intercambiar su hermosa voz por piernas humanas.",
      synopsis:
        "Una reimaginación musical vibrante del cuento clásico que combina nostalgia con una nueva perspectiva contemporánea.",
      tags: ["Musical", "Fantasía", "Romance"],
      releaseDate: "2023-05-26",
      country: "Estados Unidos",
      language: "Inglés",
      budget: "$250M",
      boxOffice: "$569M",
    },
  ]

  const moodMovies = {
    Feliz: [
      {
        id: 7,
        title: "Barbie",
        genre: "Comedia",
        rating: 7.8,
        year: 2023,
        poster: "/barbie-movie-poster.png",
        description: "Una aventura colorida y divertida en el mundo de Barbie",
      },
      {
        id: 8,
        title: "Paddington 2",
        genre: "Familia",
        rating: 8.8,
        year: 2017,
        poster: "/paddington-2-movie-poster.png",
        description: "El oso más querido regresa con más aventuras encantadoras",
      },
      {
        id: 9,
        title: "La La Land",
        genre: "Musical",
        rating: 8.0,
        year: 2016,
        poster: "/la-la-land-movie-poster.png",
        description: "Un musical romántico lleno de color y música",
      },
    ],
    Emocionado: [
      {
        id: 10,
        title: "John Wick 4",
        genre: "Acción",
        rating: 8.2,
        year: 2023,
        poster: "/john-wick-4-poster.png",
        description: "Acción intensa y coreografías de combate espectaculares",
      },
      {
        id: 11,
        title: "Top Gun: Maverick",
        genre: "Acción",
        rating: 8.7,
        year: 2022,
        poster: "/top-gun-maverick-movie-poster.png",
        description: "Secuelas épicas con escenas aéreas impresionantes",
      },
      {
        id: 12,
        title: "Mad Max: Fury Road",
        genre: "Acción",
        rating: 8.1,
        year: 2015,
        poster: "/mad-max-fury-road-movie-poster.png",
        description: "Acción post-apocalíptica sin parar",
      },
    ],
    Pensativo: [
      {
        id: 13,
        title: "Oppenheimer",
        genre: "Drama",
        rating: 8.7,
        year: 2023,
        poster: "/images/posters/oppenheimer-poster.png",
        description: "Un drama histórico profundo sobre el padre de la bomba atómica",
      },
      {
        id: 14,
        title: "Arrival",
        genre: "Ciencia Ficción",
        rating: 7.9,
        year: 2016,
        poster: "/arrival-movie-poster-amy-adams.png",
        description: "Ciencia ficción intelectual sobre comunicación alienígena",
      },
      {
        id: 15,
        title: "Blade Runner 2049",
        genre: "Ciencia Ficción",
        rating: 8.0,
        year: 2017,
        poster: "/blade-runner-2049-poster.png",
        description: "Una secuela visualmente impresionante que explora la humanidad",
      },
    ],
    Aventurero: [
      {
        id: 16,
        title: "Spider-Man: Cruzando el Multiverso",
        genre: "Animación",
        rating: 9.0,
        year: 2023,
        poster: "/spider-man-across-spider-verse-poster.png",
        description: "Una aventura animada a través del multiverso",
      },
      {
        id: 17,
        title: "Indiana Jones 5",
        genre: "Aventura",
        rating: 7.1,
        year: 2023,
        poster: "/indiana-jones-5-movie-poster.png",
        description: "La última aventura del arqueólogo más famoso",
      },
      {
        id: 18,
        title: "Dune: Parte Dos",
        genre: "Ciencia Ficción",
        rating: 8.5,
        year: 2024,
        poster: "/dune-part-two-poster.png",
        description: "Épica espacial llena de aventuras en planetas desérticos",
      },
    ],
    Nostálgico: [
      {
        id: 19,
        title: "La Sirenita",
        genre: "Fantasía",
        rating: 7.5,
        year: 2023,
        poster: "/little-mermaid-2023-poster.png",
        description: "Una nueva versión del clásico cuento de Disney",
      },
      {
        id: 20,
        title: "Casablanca",
        genre: "Romance",
        rating: 8.5,
        year: 1942,
        poster: "/casablanca-movie-poster-classic.png",
        description: "El clásico romance de todos los tiempos",
      },
      {
        id: 21,
        title: "E.T. el Extraterrestre",
        genre: "Ciencia Ficción",
        rating: 7.9,
        year: 1982,
        poster: "/et-extraterrestrial-movie-poster.png",
        description: "La historia conmovedora de amistad intergaláctica",
      },
    ],
    Romántico: [
      {
        id: 22,
        title: "Titanic",
        genre: "Romance",
        rating: 7.9,
        year: 1997,
        poster: "/titanic-movie-poster-leonardo-dicaprio.png",
        description: "La historia de amor más épica del cine",
      },
      {
        id: 23,
        title: "El Diario de Noah",
        genre: "Romance",
        rating: 7.8,
        year: 2004,
        poster: "/the-notebook-movie-poster.png",
        description: "Una historia de amor que trasciende el tiempo",
      },
      {
        id: 24,
        title: "Orgullo y Prejuicio",
        genre: "Romance",
        rating: 7.8,
        year: 2005,
        poster: "/pride-prejudice-movie-poster-keira-knightley.png",
        description: "Adaptación romántica de la novela clásica de Jane Austen",
      },
    ],
    Triste: [
      {
        id: 25,
        title: "Inside Out",
        genre: "Animación",
        rating: 8.1,
        year: 2015,
        poster: "/inside-out-pixar-movie-poster.png",
        description: "Una exploración emotiva de los sentimientos humanos",
      },
      {
        id: 26,
        title: "Manchester by the Sea",
        genre: "Drama",
        rating: 7.8,
        year: 2016,
        poster: "/manchester-by-the-sea-movie-poster.png",
        description: "Un drama profundo sobre pérdida y redención",
      },
      {
        id: 27,
        title: "Her",
        genre: "Drama",
        rating: 8.0,
        year: 2013,
        poster: "/her-movie-poster-joaquin-phoenix.png",
        description: "Una reflexión melancólica sobre el amor y la soledad",
      },
    ],
    Relajado: [
      {
        id: 28,
        title: "Mi Vecino Totoro",
        genre: "Animación",
        rating: 8.2,
        year: 1988,
        poster: "/my-neighbor-totoro-movie-poster.png",
        description: "Una historia tranquila y mágica de Studio Ghibli",
      },
      {
        id: 29,
        title: "Lost in Translation",
        genre: "Drama",
        rating: 7.7,
        year: 2003,
        poster: "/lost-in-translation-movie-poster.png",
        description: "Un drama contemplativo sobre conexiones humanas",
      },
      {
        id: 30,
        title: "El Gran Hotel Budapest",
        genre: "Comedia",
        rating: 8.1,
        year: 2014,
        poster: "/grand-budapest-hotel-movie-poster.png",
        description: "Una comedia visualmente elegante y relajante",
      },
    ],
  }

  const genreMovies = {
    accion: [
      {
        id: 1,
        title: "Mission: Impossible 7",
        poster: "/mission-impossible-7-poster.png",
        rating: 8.2,
        year: 2023,
        description: "Ethan Hunt regresa en su misión más peligrosa hasta la fecha.",
      },
      {
        id: 2,
        title: "Mad Max: Fury Road",
        poster: "/mad-max-fury-road-movie-poster.png",
        rating: 8.1,
        year: 2015,
        description: "Una persecución épica en un mundo post-apocalíptico.",
      },
      {
        id: 3,
        title: "John Wick 4",
        poster: "/john-wick-4-poster.png",
        rating: 7.8,
        year: 2023,
        description: "John Wick busca venganza contra la Mesa Alta.",
      },
    ],
    comedia: [
      {
        id: 4,
        title: "Barbie",
        poster: "/barbie-movie-poster.png",
        rating: 7.2,
        year: 2023,
        description: "Una aventura colorida en el mundo de Barbie.",
      },
      {
        id: 5,
        title: "Paddington 2",
        poster: "/paddington-2-movie-poster.png",
        rating: 8.0,
        year: 2017,
        description: "El oso más querido regresa con nuevas aventuras.",
      },
    ],
    drama: [
      {
        id: 6,
        title: "Oppenheimer",
        poster: "/images/posters/oppenheimer-poster.png",
        rating: 8.4,
        year: 2023,
        description: "La historia del padre de la bomba atómica.",
      },
      {
        id: 7,
        title: "Casablanca",
        poster: "/casablanca-movie-poster-classic.png",
        rating: 8.5,
        year: 1942,
        description: "Un clásico romántico en tiempos de guerra.",
      },
    ],
    cienciaFiccion: [
      {
        id: 8,
        title: "Dune: Part Two",
        poster: "/dune-part-two-poster.png",
        rating: 8.6,
        year: 2024,
        description: "Paul Atreides continúa su épico viaje.",
      },
      {
        id: 9,
        title: "Blade Runner 2049",
        poster: "/blade-runner-2049-poster.png",
        rating: 8.0,
        year: 2017,
        description: "Una secuela digna del clásico cyberpunk.",
      },
    ],
    terror: [
      {
        id: 10,
        title: "The Conjuring",
        poster: "/conjuring-poster.png",
        rating: 7.5,
        year: 2013,
        description: "Los Warren investigan una casa embrujada.",
      },
    ],
    romance: [
      {
        id: 11,
        title: "La La Land",
        poster: "/la-la-land-movie-poster.png",
        rating: 8.0,
        year: 2016,
        description: "Un musical romántico en Los Ángeles.",
      },
    ],
    aventura: [
      {
        id: 12,
        title: "Indiana Jones 5",
        poster: "/indiana-jones-5-movie-poster.png",
        rating: 6.9,
        year: 2023,
        description: "La última aventura del arqueólogo más famoso.",
      },
    ],
    animacion: [
      {
        id: 13,
        title: "Spider-Man: Across the Spider-Verse",
        poster: "/spider-man-across-spider-verse-poster.png",
        rating: 8.7,
        year: 2023,
        description: "Miles Morales viaja a través del multiverso.",
      },
    ],
  }

  const BottomNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex justify-around items-center py-2 max-w-md mx-auto">
        <Button
          variant={currentScreen === "home" ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentScreen("home")}
          className="flex flex-col items-center gap-1 h-auto py-2"
        >
          <Home className="w-5 h-5" />
          <span className="text-xs">Inicio</span>
        </Button>
        <Button
          variant={
            currentScreen === "discover" || currentScreen === "genre-results" || currentScreen === "feed"
              ? "default"
              : "ghost"
          }
          size="sm"
          onClick={() => setCurrentScreen("feed")}
          className="flex flex-col items-center gap-1 h-auto py-2"
        >
          <Compass className="w-5 h-5" />
          <span className="text-xs">Explorar</span>
        </Button>
        <Button
          variant={currentScreen === "mood" || currentScreen === "mood-results" ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentScreen("mood")}
          className="flex flex-col items-center gap-1 h-auto py-2"
        >
          <Smile className="w-5 h-5" />
          <span className="text-xs">Estado</span>
        </Button>
        <Button
          variant={currentScreen === "profile" ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentScreen("profile")}
          className="flex flex-col items-center gap-1 h-auto py-2"
        >
          <User className="w-5 h-5" />
          <span className="text-xs">Perfil</span>
        </Button>
      </div>
    </div>
  )

  // Welcome Screen
  if (currentScreen === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="mb-8">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Film className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Peliculita</h1>
              <p className="text-muted-foreground text-lg">Descubre películas perfectas para tu estado de ánimo</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-left">
                <Heart className="w-5 h-5 text-secondary" />
                <span className="text-sm">Recomendaciones personalizadas</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <Star className="w-5 h-5 text-secondary" />
                <span className="text-sm">Basado en tu estado de ánimo</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <Users className="w-5 h-5 text-secondary" />
                <span className="text-sm">Descubre nuevos géneros</span>
              </div>
            </div>

            <Button onClick={() => setCurrentScreen("onboarding")} className="w-full" size="lg">
              Comenzar
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Onboarding Flow
  if (currentScreen === "onboarding") {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto pt-8">
          {/* Progress indicator */}
          <div className="flex justify-center mb-8">
            {[0, 1, 2].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full mx-1 ${step <= onboardingStep ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>

          <Card>
            <CardContent className="p-6">
              {onboardingStep === 0 && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">¡Hola!</h2>
                  <p className="text-muted-foreground mb-6">¿Cómo te gustaría que te llamemos?</p>
                  <Input
                    placeholder="Tu nombre"
                    value={userPreferences.name}
                    onChange={(e) =>
                      setUserPreferences((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="mb-6"
                  />
                  <Button
                    onClick={() => setOnboardingStep(1)}
                    disabled={!userPreferences.name.trim()}
                    className="w-full"
                  >
                    Continuar
                  </Button>
                </div>
              )}

              {onboardingStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-center">¿Cuáles son tus géneros favoritos?</h2>
                  <p className="text-muted-foreground mb-6 text-center">
                    Selecciona al menos 3 géneros que más te gusten
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {genres.map((genre) => (
                      <Button
                        key={genre.name}
                        variant={userPreferences.favoriteGenres.includes(genre.name) ? "default" : "outline"}
                        onClick={() => {
                          setUserPreferences((prev) => ({
                            ...prev,
                            favoriteGenres: prev.favoriteGenres.includes(genre.name)
                              ? prev.favoriteGenres.filter((g) => g !== genre.name)
                              : [...prev.favoriteGenres, genre.name],
                          }))
                        }}
                        className="text-sm"
                      >
                        {genre.name}
                      </Button>
                    ))}
                  </div>
                  <Button
                    onClick={() => setOnboardingStep(2)}
                    disabled={userPreferences.favoriteGenres.length < 3}
                    className="w-full"
                  >
                    Continuar
                  </Button>
                </div>
              )}

              {onboardingStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-center">¿Con qué frecuencia ves películas?</h2>
                  <div className="space-y-3 mb-6">
                    {frequencies.map((frequency) => (
                      <Button
                        key={frequency}
                        variant={userPreferences.watchingFrequency === frequency ? "default" : "outline"}
                        onClick={() =>
                          setUserPreferences((prev) => ({
                            ...prev,
                            watchingFrequency: frequency,
                          }))
                        }
                        className="w-full justify-start"
                      >
                        {frequency}
                      </Button>
                    ))}
                  </div>
                  <Button
                    onClick={() => setCurrentScreen("home")}
                    disabled={!userPreferences.watchingFrequency}
                    className="w-full"
                  >
                    ¡Empezar a descubrir!
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentScreen === "home") {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">¡Hola, {userPreferences.name || "Usuario"}!</h1>
                <p className="text-primary-foreground/80">¿Qué quieres ver hoy?</p>
              </div>
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Buscar películas..." className="pl-10 bg-background text-foreground" />
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Mi Ánimo</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowMoodSelection(true)}>
                Cambiar
              </Button>
            </div>

            <Card
              className="cursor-pointer hover:shadow-md transition-all duration-200 bg-gradient-to-r from-blue-50 to-green-50"
              onClick={() => {
                setSelectedMood(userCurrentMood)
                setCurrentScreen("mood")
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {(() => {
                      const currentMoodData = moods.find((m) => m.name === userCurrentMood)
                      const IconComponent = currentMoodData?.icon
                      return IconComponent ? <IconComponent className={currentMoodData.color} /> : null
                    })()}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Estado: {userCurrentMood}</h3>
                    <p className="text-sm text-gray-600">
                      {moods.find((m) => m.name === userCurrentMood)?.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                </div>
              </CardContent>
            </Card>
          </div>

          {showMoodSelection && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <Card className="w-full max-w-sm max-h-[80vh] overflow-y-auto">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Cambiar Estado de Ánimo</h3>
                    <Button variant="ghost" size="sm" onClick={() => setShowMoodSelection(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {moods.map((mood) => (
                      <Card
                        key={mood.name}
                        className={`cursor-pointer transition-all duration-200 ${
                          userCurrentMood === mood.name ? "ring-2 ring-blue-50 bg-blue-50" : "hover:shadow-md"
                        }`}
                        onClick={() => {
                          setUserCurrentMood(mood.name)
                          setShowMoodSelection(false)
                        }}
                      >
                        <CardContent className="p-3 text-center">
                          <div className="text-xl mb-2">
                            <mood.icon className={mood.color} />
                          </div>
                          <h4 className="font-medium text-sm">{mood.name}</h4>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Featured Movies */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Destacadas para ti</h2>
              <Button variant="ghost" size="sm">
                Ver todas
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {allMovies.slice(0, 3).map((movie) => (
                <Card key={movie.id} className="flex-shrink-0 w-40">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={movie.poster || "/placeholder.svg"}
                        alt={movie.title}
                        className="w-full h-56 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="text-xs">
                          {movie.rating}
                        </Badge>
                      </div>
                      <Button size="sm" className="absolute bottom-2 right-2 w-8 h-8 rounded-full p-0">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm line-clamp-2 mb-1">{movie.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {movie.genre} • {movie.year}
                      </p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {movie.mood}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Trending Now */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <h2 className="text-lg font-semibold">Tendencias</h2>
              </div>
              <Button variant="ghost" size="sm">
                Ver todas
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {allMovies.slice(0, 3).map((movie) => (
                <Card key={movie.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={movie.poster || "/placeholder.svg"}
                        alt={movie.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute top-1 right-1">
                        <Badge variant="secondary" className="text-xs">
                          {movie.rating}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-2">
                      <h3 className="font-medium text-xs line-clamp-2">{movie.title}</h3>
                      <p className="text-xs text-muted-foreground">{movie.year}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recently Watched */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Visto recientemente</h2>
            </div>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-muted-foreground text-sm">
                  Aún no has visto ninguna película. ¡Explora nuestras recomendaciones!
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent"
                  onClick={() => setCurrentScreen("discover")}
                >
                  Descubrir películas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <BottomNavigation />
      </div>
    )
  }

  if (currentScreen === "discover") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-semibold text-gray-900">Descubrir por Género</h1>
            <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("home")}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {genres.map((genre) => (
              <Card
                key={genre.name}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedGenre === genre.name ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                }`}
                onClick={() => setSelectedGenre(genre.name)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">
                    <genre.icon className={genre.color} />
                  </div>
                  <h3 className="font-medium text-gray-900">{genre.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{genre.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedGenre && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Películas de {selectedGenre}</h2>
                <Badge variant="secondary">
                  {genreMovies[selectedGenre as keyof typeof genreMovies]?.length || 0} películas
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {genreMovies[selectedGenre as keyof typeof genreMovies]?.map((movie) => (
                  <Card key={movie.id} className="overflow-hidden">
                    <div className="aspect-[2/3] relative">
                      <img
                        src={movie.poster || "/placeholder.svg"}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-yellow-500 text-white">⭐ {movie.rating}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium text-sm mb-1 line-clamp-2">{movie.title}</h3>
                      <p className="text-xs text-gray-600 mb-2">
                        {movie.genre} • {movie.duration}
                      </p>
                      <p className="text-xs text-gray-700 line-clamp-2">{movie.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
        <BottomNavigation />
      </div>
    )
  }

  if (currentScreen === "feed") {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold">Explorar Películas</h1>
              <Button variant="ghost" size="sm" className="text-primary-foreground">
                <Filter className="w-5 h-5" />
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Buscar películas..." className="pl-10 bg-background text-foreground" />
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4">
          {/* Filter Tags */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
            <Badge variant="default" className="whitespace-nowrap">
              Todas
            </Badge>
            <Badge variant="outline" className="whitespace-nowrap">
              Populares
            </Badge>
            <Badge variant="outline" className="whitespace-nowrap">
              Recientes
            </Badge>
            <Badge variant="outline" className="whitespace-nowrap">
              Mejor Valoradas
            </Badge>
            <Badge variant="outline" className="whitespace-nowrap">
              Clásicos
            </Badge>
          </div>

          {/* Movies Grid */}
          <div className="grid grid-cols-2 gap-4">
            {allMovies.map((movie) => (
              <Card
                key={movie.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => {
                  setSelectedMovie(movie)
                  setCurrentScreen("movie-details")
                }}
              >
                <div className="aspect-[2/3] relative">
                  <img
                    src={movie.poster || "/placeholder.svg"}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-yellow-500 text-white text-xs">⭐ {movie.rating}</Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="text-xs">
                      {movie.year}
                    </Badge>
                  </div>
                  <Button size="sm" className="absolute bottom-2 right-2 w-8 h-8 rounded-full p-0">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm mb-1 line-clamp-2">{movie.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {movie.genre} • {movie.duration}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {movie.mood}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <BottomNavigation />
      </div>
    )
  }

  if (currentScreen === "movie-details" && selectedMovie) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative">
          <img
            src={selectedMovie.poster || "/placeholder.svg"}
            alt={selectedMovie.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 left-4 text-white bg-black/20 backdrop-blur-sm"
            onClick={() => setCurrentScreen("feed")}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="ghost" size="sm" className="text-white bg-black/20 backdrop-blur-sm">
              <Share className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white bg-black/20 backdrop-blur-sm">
              <Bookmark className="w-4 h-4" />
            </Button>
          </div>

          {/* Movie Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h1 className="text-2xl font-bold mb-2">{selectedMovie.title}</h1>
            <div className="flex items-center gap-4 mb-2">
              <Badge className="bg-yellow-500 text-white">⭐ {selectedMovie.rating}</Badge>
              <span className="text-sm">{selectedMovie.year}</span>
              <span className="text-sm">{selectedMovie.duration}</span>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">{selectedMovie.genre}</Badge>
              <Badge variant="outline" className="text-white border-white">
                {selectedMovie.mood}
              </Badge>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6">
          {/* Play Button */}
          <Button className="w-full" size="lg">
            <Play className="w-5 h-5 mr-2" />
            Reproducir Ahora
          </Button>

          {/* Synopsis */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Sinopsis</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{selectedMovie.description}</p>
          </div>

          {/* Movie Details */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Detalles</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Director</p>
                  <p className="text-sm text-muted-foreground">{selectedMovie.director}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users2 className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Reparto</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedMovie.cast.slice(0, 3).join(", ")}
                    {selectedMovie.cast.length > 3 && "..."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Fecha de Estreno</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedMovie.releaseDate).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">País</p>
                  <p className="text-sm text-muted-foreground">{selectedMovie.country}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Award className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Taquilla</p>
                  <p className="text-sm text-muted-foreground">{selectedMovie.boxOffice}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Etiquetas</h2>
            <div className="flex flex-wrap gap-2">
              {selectedMovie.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Similar Movies */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Películas Similares</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {allMovies
                .filter((movie) => movie.id !== selectedMovie.id && movie.genre === selectedMovie.genre)
                .slice(0, 4)
                .map((movie) => (
                  <Card
                    key={movie.id}
                    className="flex-shrink-0 w-24 cursor-pointer"
                    onClick={() => setSelectedMovie(movie)}
                  >
                    <CardContent className="p-0">
                      <img
                        src={movie.poster || "/placeholder.svg"}
                        alt={movie.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="p-2">
                        <h4 className="text-xs font-medium line-clamp-2">{movie.title}</h4>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>

        {/* Bottom spacing for safe area */}
        <div className="h-20" />
      </div>
    )
  }

  if (currentScreen === "mood") {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold">Películas {selectedMood}</h1>
                <p className="text-primary-foreground/80 text-sm">
                  {moods.find((m) => m.name === selectedMood)?.description}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMoodSelection(true)}
                  className="text-primary-foreground"
                >
                  Cambiar
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("home")}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {showMoodSelection && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <Card className="w-full max-w-sm max-h-[80vh] overflow-y-auto">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Cambiar Estado de Ánimo</h3>
                    <Button variant="ghost" size="sm" onClick={() => setShowMoodSelection(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {moods.map((mood) => (
                      <Card
                        key={mood.name}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedMood === mood.name ? "ring-2 ring-blue-50 bg-blue-50" : "hover:shadow-md"
                        }`}
                        onClick={() => {
                          setSelectedMood(mood.name)
                          setUserCurrentMood(mood.name)
                          setShowMoodSelection(false)
                        }}
                      >
                        <CardContent className="p-3 text-center">
                          <div className="text-xl mb-2">
                            <mood.icon className={mood.color} />
                          </div>
                          <h4 className="font-medium text-sm">{mood.name}</h4>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary">
                {moodMovies[selectedMood as keyof typeof moodMovies]?.length || 0} películas
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {moodMovies[selectedMood as keyof typeof moodMovies]?.map((movie) => (
                <Card key={movie.id} className="overflow-hidden">
                  <div className="aspect-[2/3] relative">
                    <img
                      src={movie.poster || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-yellow-500 text-white">⭐ {movie.rating}</Badge>
                    </div>
                    <Button
                      size="sm"
                      className="absolute bottom-2 right-2 w-8 h-8 rounded-full p-0 bg-green-500 hover:bg-green-600"
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm mb-1 line-clamp-2">{movie.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">
                      {movie.genre} • {movie.year}
                    </p>
                    <p className="text-xs text-gray-700 line-clamp-2">{movie.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <BottomNavigation />
      </div>
    )
  }

  if (currentScreen === "profile") {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold">Perfil</h1>
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("home")}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6">
          {/* User Info */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Información del Usuario</h2>
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Nombre</p>
                <p className="text-sm text-muted-foreground">{userPreferences.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <Info className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Géneros Favoritos</p>
                <p className="text-sm text-muted-foreground">{userPreferences.favoriteGenres.join(", ")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Frecuencia de Vistas</p>
                <p className="text-sm text-muted-foreground">{userPreferences.watchingFrequency}</p>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Configuración</h2>
            <div className="space-y-3">
              <Button variant="outline" size="sm" onClick={() => setCurrentScreen("edit-profile")}>
                <Edit className="w-4 h-4 mr-2" />
                Editar Perfil
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentScreen("notifications")}>
                <Bell className="w-4 h-4 mr-2" />
                Notificaciones
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentScreen("help")}>
                <HelpCircle className="w-4 h-4 mr-2" />
                Ayuda
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentScreen("logout")}>
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>

        <BottomNavigation />
      </div>
    )
  }

  if (currentScreen === "edit-profile") {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold">Editar Perfil</h1>
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("profile")}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6">
          {/* Name Input */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Nombre</h2>
            <Input
              placeholder="Tu nombre"
              value={userPreferences.name}
              onChange={(e) =>
                setUserPreferences((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="mb-6"
            />
          </div>

          {/* Favorite Genres */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Géneros Favoritos</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {genres.map((genre) => (
                <Button
                  key={genre.name}
                  variant={userPreferences.favoriteGenres.includes(genre.name) ? "default" : "outline"}
                  onClick={() => {
                    setUserPreferences((prev) => ({
                      ...prev,
                      favoriteGenres: prev.favoriteGenres.includes(genre.name)
                        ? prev.favoriteGenres.filter((g) => g !== genre.name)
                        : [...prev.favoriteGenres, genre.name],
                    }))
                  }}
                  className="text-sm"
                >
                  {genre.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Watching Frequency */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Frecuencia de Vistas</h2>
            <div className="space-y-3 mb-6">
              {frequencies.map((frequency) => (
                <Button
                  key={frequency}
                  variant={userPreferences.watchingFrequency === frequency ? "default" : "outline"}
                  onClick={() =>
                    setUserPreferences((prev) => ({
                      ...prev,
                      watchingFrequency: frequency,
                    }))
                  }
                  className="w-full justify-start"
                >
                  {frequency}
                </Button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <Button onClick={() => setCurrentScreen("profile")} className="w-full" size="lg">
            Guardar Cambios
          </Button>
        </div>

        <BottomNavigation />
      </div>
    )
  }

  if (currentScreen === "notifications") {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold">Notificaciones</h1>
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("profile")}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6">
          {/* Notification Settings */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Configuración de Notificaciones</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Notificaciones de Nuevas Películas</p>
                  <p className="text-sm text-muted-foreground">
                    Recibirás alertas sobre nuevas películas recomendadas.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Notificaciones de Películas Populares</p>
                  <p className="text-sm text-muted-foreground">
                    Recibirás alertas sobre películas populares en tu género favorito.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <Button onClick={() => setCurrentScreen("profile")} className="w-full" size="lg">
            Guardar Cambios
          </Button>
        </div>

        <BottomNavigation />
      </div>
    )
  }

  if (currentScreen === "help") {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold">Ayuda</h1>
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("profile")}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6">
          {/* Help Content */}
          <div>
            <h2 className="text-lg font-semibold mb-3">¿Necesitas Ayuda?</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Si tienes alguna pregunta o problema, por favor contáctanos a través de nuestro correo electrónico o redes
              sociales.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Información de Contacto</h2>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Correo Electrónico: soporte@peliculita.com</p>
              <p className="text-sm text-muted-foreground">Redes Sociales: @peliculita</p>
            </div>
          </div>
        </div>

        <BottomNavigation />
      </div>
    )
  }

  if (currentScreen === "logout") {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold">Cerrar Sesión</h1>
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("profile")}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6">
          {/* Logout Confirmation */}
          <div>
            <h2 className="text-lg font-semibold mb-3">¿Estás seguro de que quieres cerrar sesión?</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Al cerrar sesión, perderás tus preferencias y recomendaciones personalizadas.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button onClick={() => setCurrentScreen("profile")} className="flex-1" size="lg" variant="outline">
              Cancelar
            </Button>
            <Button onClick={() => alert("Sesión cerrada")} className="flex-1" size="lg">
              Cerrar Sesión
            </Button>
          </div>
        </div>

        <BottomNavigation />
      </div>
    )
  }

  return null
}
