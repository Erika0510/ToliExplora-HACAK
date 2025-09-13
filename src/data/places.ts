// ---------------------------
// 1. Interfaces
// ---------------------------
export interface Place {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  availability: "available" | "limited" | "unavailable";
  rating?: number;
  location: string;
  fullDescription: string;
  history: string;
  reviews: Review[];
  gallery: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  photos?: string[];
}

// ---------------------------
// 2. Importar imágenes locales
// ---------------------------
import festivalFolclorito from "@/assets/festivalfolclorito.avif";
import lechonaImg from "@/assets/lechona.png";
import feriaCafeImg from "@/assets/feria-cafe.png";
import magdalenaImg from "@/assets/magdalena.png";
import bambucoImg from "@/assets/banbuco.webp";
import sanjuanImg from "@/assets/sanpedro.png";
import sanpedroImg from "@/assets/Fiestas san pedro.jpg";
import cantoImg from "@/assets/canto.png";
import jazzImg from "@/assets/jazz.png";
import artesaniaImg from "@/assets/artesania.jpg";

import tamalImg from "@/assets/tamal.jpg";
import cafetoliImg from "@/assets/cafetoli.png";
import achirasImg from "@/assets/achiras.png";
import mazamorraImg from "@/assets/mazamorra.png";
import empanadasImg from "@/assets/empanadas.png";
import arepasImg from "@/assets/arepas.png";
import pescadoImg from "@/assets/pescado.png";
import aguapanelaImg from "@/assets/aguapanela.png";
import chichaImg from "@/assets/chicha.png";

import nevadoImg from "@/assets/nevado.png";
import combeimaImg from "@/assets/cañón del combeima.png";
import cerroImg from "@/assets/cerro-machin.png";
import lagunaImg from "@/assets/laguna-otun.png";
import lineaImg from "@/assets/lalinea.jpg";
import miradorImg from "@/assets/mirador-bella-vista.png";
import silencioImg from "@/assets/silencio.png";
import letrasImg from "@/assets/letras.png";
import edenImg from "@/assets/eden.jpg";

// ---------------------------
// 3. Lugares con imágenes únicas
// ---------------------------
export const places: Place[] = [
  // ---------------------------
  // FESTIVALES
  // ---------------------------
  {
    id: "festival-folclorico",
    name: "Festival Folclórico Colombiano",
    description: "La celebración más grande de música y danza tradicional en Ibagué.",
    image: festivalFolclorito,
    category: "festivals",
    availability: "available",
    rating: 4.9,
    location: "Ibagué, Tolima",
    fullDescription: "Durante junio, Ibagué se llena de música, danza y folclor colombiano.",
    history: "Fundado en 1959, hoy es Patrimonio Cultural de la Nación.",
    reviews: [],
    gallery: [],
  },
  {
    id: "festival-lechona",
    name: "Festival de la Lechona",
    description: "Homenaje al plato más representativo del Tolima.",
    image: lechonaImg,
    category: "festivals",
    availability: "available",
    rating: 4.7,
    location: "Espinal, Tolima",
    fullDescription: "Cada junio, Espinal rinde tributo a la lechona con desfiles y concursos.",
    history: "Nació como iniciativa de cocineras tradicionales.",
    reviews: [],
    gallery: [],
  },
  {
    id: "feria-cafe",
    name: "Feria Nacional del Café",
    description: "Celebración del café tolimense con concursos y catas.",
    image: feriaCafeImg,
    category: "festivals",
    availability: "available",
    rating: 4.8,
    location: "Líbano, Tolima",
    fullDescription: "Reúne productores y baristas en torno al café de origen.",
    history: "Surgió en los años 80 como vitrina cafetera.",
    reviews: [],
    gallery: [],
  },
  {
    id: "carnaval-magd",
    name: "Carnaval del Río Magdalena",
    description: "Fiesta fluvial en Honda en honor al río.",
    image: magdalenaImg,
    category: "festivals",
    availability: "available",
    rating: 4.5,
    location: "Honda, Tolima",
    fullDescription: "Desfiles náuticos, música y gastronomía junto al río.",
    history: "Rememora las tradiciones de navegantes y pescadores.",
    reviews: [],
    gallery: [],
  },
  {
    id: "festival-bambuco",
    name: "Encuentro Nacional de Bambuco",
    description: "Competencia de música tradicional andina.",
    image: bambucoImg,
    category: "festivals",
    availability: "available",
    rating: 4.6,
    location: "Teatro Tolima, Ibagué",
    fullDescription: "Músicos de todo el país interpretan el bambuco andino.",
    history: "Consolida a Ibagué como ciudad musical.",
    reviews: [],
    gallery: [],
  },
  {
    id: "festival-sanjuan",
    name: "Fiestas de San Juan",
    description: "Tradición tolimense con cabalgatas y desfiles.",
    image: sanjuanImg,
    category: "festivals",
    availability: "available",
    rating: 4.8,
    location: "Espinal, Tolima",
    fullDescription: "Celebración patronal y cultural con música y gastronomía.",
    history: "Patrimonio festivo de Espinal.",
    reviews: [],
    gallery: [],
  },
  {
    id: "festival-sampedro",
    name: "Fiestas de San Pedro",
    description: "Danzas y comparsas en municipios del Tolima.",
    image: sanpedroImg,
    category: "festivals",
    availability: "available",
    rating: 4.7,
    location: "Natagaima, Tolima",
    fullDescription: "Conciertos y cabalgatas para honrar a San Pedro.",
    history: "Fiesta religiosa transformada en carnaval popular.",
    reviews: [],
    gallery: [],
  },
  {
    id: "festival-musical",
    name: "Festival de Música Colombiana",
    description: "Concurso Nacional de Duetos Príncipes de la Canción.",
    image: cantoImg,
    category: "festivals",
    availability: "available",
    rating: 4.9,
    location: "Ibagué, Tolima",
    fullDescription: "Reúne a los mejores intérpretes de música andina.",
    history: "Evento insignia de la ciudad musical de Colombia.",
    reviews: [],
    gallery: [],
  },
  {
    id: "festival-jazz",
    name: "Festival de Jazz",
    description: "Espacio para los amantes del jazz y fusión musical.",
    image: jazzImg,
    category: "festivals",
    availability: "available",
    rating: 4.5,
    location: "Ibagué, Tolima",
    fullDescription: "Artistas nacionales e internacionales presentan jazz en vivo.",
    history: "Se ha vuelto un referente cultural en la región.",
    reviews: [],
    gallery: [],
  },
  {
    id: "festival-feria-artesanal",
    name: "Feria Artesanal del Tolima",
    description: "Exposición y venta de artesanías típicas.",
    image: artesaniaImg,
    category: "festivals",
    availability: "available",
    rating: 4.3,
    location: "Ibagué, Tolima",
    fullDescription: "Evento cultural con artistas, artesanos y música.",
    history: "Apoya a emprendedores locales.",
    reviews: [],
    gallery: [],
  },

  // ---------------------------
  // GASTRONOMÍA
  // ---------------------------
  {
    id: "lechona",
    name: "Lechona Tolimense",
    description: "El plato más emblemático del Tolima.",
    image: lechonaImg,
    category: "gastronomy",
    availability: "available",
    rating: 4.9,
    location: "Espinal, Tolima",
    fullDescription: "Cerdo relleno de arroz, arvejas y especias.",
    history: "Receta colonial que se transmite por generaciones.",
    reviews: [],
    gallery: [],
  },
  {
    id: "tamales",
    name: "Tamales Tolimenses",
    description: "Plato típico envuelto en hoja de plátano.",
    image: tamalImg,
    category: "gastronomy",
    availability: "available",
    rating: 4.8,
    location: "Ibagué, Tolima",
    fullDescription: "Preparado con arroz, garbanzos, carnes y huevo.",
    history: "Tradición en desayunos dominicales.",
    reviews: [],
    gallery: [],
  },
  {
    id: "cafe-memorias",
    name: "Café & Memorias",
    description: "Café boutique con ambiente cultural.",
    image: cafetoliImg,
    category: "gastronomy",
    availability: "available",
    rating: 4.7,
    location: "Ibagué, Tolima",
    fullDescription: "Cada taza cuenta la historia de caficultores locales.",
    history: "Fundado para rescatar la tradición cafetera.",
    reviews: [],
    gallery: [],
  },
  {
    id: "achiras",
    name: "Achiras del Huila",
    description: "Galletas crujientes hechas con almidón de achira.",
    image: achirasImg,
    category: "gastronomy",
    availability: "available",
    rating: 4.6,
    location: "Saldaña, Tolima",
    fullDescription: "Acompañan el café o chocolate.",
    history: "Receta ancestral indígena.",
    reviews: [],
    gallery: [],
  },
  {
    id: "mazamorra",
    name: "Mazamorra Tolimense",
    description: "Postre típico de maíz tierno y panela.",
    image: mazamorraImg,
    category: "gastronomy",
    availability: "available",
    rating: 4.5,
    location: "Tolima",
    fullDescription: "Se sirve con queso fresco y melao de panela.",
    history: "Herencia campesina.",
    reviews: [],
    gallery: [],
  },
  {
    id: "empanadas",
    name: "Empanadas Tolimenses",
    description: "Empanadas de maíz rellenas de carne y arroz.",
    image: empanadasImg,
    category: "gastronomy",
    availability: "available",
    rating: 4.8,
    location: "Tolima",
    fullDescription: "Se sirven con ají picante.",
    history: "Aperitivo tradicional en fiestas.",
    reviews: [],
    gallery: [],
  },
  {
    id: "arepas",
    name: "Arepas de Maíz Pelao",
    description: "Arepas tradicionales a la brasa.",
    image: arepasImg,
    category: "gastronomy",
    availability: "available",
    rating: 4.7,
    location: "Tolima",
    fullDescription: "Se comen con queso y chocolate caliente.",
    history: "Desayuno típico campesino.",
    reviews: [],
    gallery: [],
  },
  {
    id: "viudo",
    name: "Viudo de Pescado",
    description: "Plato típico con pescado de río y yuca.",
    image: pescadoImg,
    category: "gastronomy",
    availability: "available",
    rating: 4.6,
    location: "Honda, Tolima",
    fullDescription: "Preparación popular a orillas del Magdalena.",
    history: "Receta ribereña tradicional.",
    reviews: [],
    gallery: [],
  },
  {
    id: "aguapanela",
    name: "Aguapanela con Queso",
    description: "Infusión de panela acompañada de queso fresco.",
    image: aguapanelaImg,
    category: "gastronomy",
    availability: "available",
    rating: 4.9,
    location: "Tolima",
    fullDescription: "Bebida caliente reconfortante.",
    history: "Infaltable en casas campesinas.",
    reviews: [],
    gallery: [],
  },
  {
    id: "chicha",
    name: "Chicha de Maíz",
    description: "Bebida fermentada de maíz.",
    image: chichaImg,
    category: "gastronomy",
    availability: "available",
    rating: 4.4,
    location: "Tolima",
    fullDescription: "Se prepara en fiestas tradicionales.",
    history: "Herencia indígena.",
    reviews: [],
    gallery: [],
  },

  // ---------------------------
  // SENDERISMO
  // ---------------------------
  {
    id: "nevado-tolima",
    name: "Nevado del Tolima",
    description: "Montaña majestuosa y nevada del Parque Nacional Los Nevados.",
    image: nevadoImg,
    category: "hiking",
    availability: "limited",
    rating: 4.9,
    location: "Parque Nacional Los Nevados",
    fullDescription: "Ascenso exigente con vistas espectaculares.",
    history: "Considerada montaña sagrada por los indígenas.",
    reviews: [],
    gallery: [],
  },
  {
    id: "canon-combeima",
    name: "Cañón del Combeima",
    description: "Valle rodeado de montañas y ríos cristalinos.",
    image: combeimaImg,
    category: "hiking",
    availability: "available",
    rating: 4.7,
    location: "Ibagué, Tolima",
    fullDescription: "Perfecto para caminatas y observación de aves.",
    history: "Antiguo camino de arrieros.",
    reviews: [],
    gallery: [],
  },
  {
    id: "cerro-machin",
    name: "Cerro Machín",
    description: "Volcán dormido con rutas panorámicas.",
    image: cerroImg,
    category: "hiking",
    availability: "available",
    rating: 4.6,
    location: "Cajamarca, Tolima",
    fullDescription: "Sus senderos permiten vistas de todo el valle.",
    history: "Volcán activo muy vigilado en Colombia.",
    reviews: [],
    gallery: [],
  },
  {
    id: "laguna-otun",
    name: "Laguna del Otún",
    description: "Laguna cristalina rodeada de páramo.",
    image: lagunaImg,
    category: "hiking",
    availability: "available",
    rating: 4.8,
    location: "Parque Nacional Los Nevados",
    fullDescription: "Un espejo de agua que refleja las nubes.",
    history: "Considerada sagrada por comunidades indígenas.",
    reviews: [],
    gallery: [],
  },
  {
    id: "alto-linea",
    name: "Alto de la Línea",
    description: "Paso montañoso icónico de la cordillera.",
    image: lineaImg,
    category: "hiking",
    availability: "available",
    rating: 4.5,
    location: "Cordillera Central",
    fullDescription: "Punto estratégico de viajeros y arrieros.",
    history: "Ruta histórica del comercio cafetero.",
    reviews: [],
    gallery: [],
  },
  {
    id: "mirador-bella-vista",
    name: "Mirador Bella Vista",
    description: "Sendero corto con vistas panorámicas de Ibagué.",
    image: miradorImg,
    category: "hiking",
    availability: "available",
    rating: 4.6,
    location: "Ibagué, Tolima",
    fullDescription: "Perfecto para caminatas familiares.",
    history: "Muy visitado por locales y turistas.",
    reviews: [],
    gallery: [],
  },
  {
    id: "cascada-silencio",
    name: "Cascada El Silencio",
    description: "Cascada escondida en medio del bosque.",
    image: silencioImg,
    category: "hiking",
    availability: "available",
    rating: 4.7,
    location: "Anzoátegui, Tolima",
    fullDescription: "Acceso mediante sendero ecológico.",
    history: "Lugar sagrado para comunidades locales.",
    reviews: [],
    gallery: [],
  },
  {
    id: "paramo-letras",
    name: "Páramo de Letras",
    description: "Sendero de alta montaña con frailejones.",
    image: letrasImg,
    category: "hiking",
    availability: "limited",
    rating: 4.8,
    location: "Murillo, Tolima",
    fullDescription: "Ideal para ecoturismo y fotografía.",
    history: "Parte del ecosistema andino protegido.",
    reviews: [],
    gallery: [],
  },
  {
    id: "cascada-eden",
    name: "Cascada del Edén",
    description: "Caída de agua de 70 metros rodeada de selva.",
    image: edenImg,
    category: "hiking",
    availability: "available",
    rating: 4.9,
    location: "Chaparral, Tolima",
    fullDescription: "Un espectáculo natural imperdible.",
    history: "Considerada mística por comunidades indígenas.",
    reviews: [],
    gallery: [],
  },
];

// ---------------------------
// 4. Helpers
// ---------------------------
export const getPlacesByCategory = (category: string): Place[] => {
  return places.filter((place) => place.category === category);
};

export const getPlaceById = (id: string): Place | undefined => {
  return places.find((place) => place.id === id);
};
