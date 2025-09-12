export interface Place {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  availability: 'available' | 'limited' | 'unavailable';
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

import festivalCard from '@/assets/festival-card.jpg';
import hikingCard from '@/assets/hiking-card.jpg';
import gastronomyCard from '@/assets/gastronomy-card.jpg';
import townsCard from '@/assets/towns-card.jpg';
import waterfallsCard from '@/assets/waterfalls-card.jpg';

export const places: Place[] = [
  // Festivals
  {
    id: 'festival-san-juan-ibague',
    name: 'Festival Folclórico Colombiano',
    description: 'El festival más importante de música folclórica de Colombia, celebrado cada año en Ibagué.',
    image: festivalCard,
    category: 'festivals',
    availability: 'available',
    rating: 4.8,
    location: 'Ibagué, Tolima',
    fullDescription: 'El Festival Folclórico Colombiano es una celebración anual que reúne lo mejor de la música tradicional colombiana. Durante una semana, Ibagué se convierte en el epicentro cultural del país.',
    history: 'Fundado en 1959, este festival ha sido la plataforma de lanzamiento de grandes artistas folclóricos colombianos. Con más de 60 años de historia, se ha consolidado como el evento cultural más importante del Tolima.',
    reviews: [
      {
        id: '1',
        author: 'María González',
        rating: 5,
        comment: 'Una experiencia cultural increíble. La música, los bailes y el ambiente son únicos.',
        date: '2024-06-15'
      },
      {
        id: '2',
        author: 'Carlos Rodríguez',
        rating: 4,
        comment: 'Excelente organización y gran variedad de artistas. Muy recomendado.',
        date: '2024-06-10'
      }
    ],
    gallery: [festivalCard]
  },
  
  // Hiking
  {
    id: 'nevado-tolima',
    name: 'Nevado del Tolima',
    description: 'Ascenso al volcán nevado más alto del departamento, una experiencia única para montañistas.',
    image: hikingCard,
    category: 'hiking',
    availability: 'limited',
    rating: 4.9,
    location: 'Parque Nacional Los Nevados',
    fullDescription: 'El Nevado del Tolima es un estratovolcán que alcanza los 5,215 metros de altura. Es considerado uno de los ascensos más desafiantes y hermosos de Colombia.',
    history: 'Este majestuoso volcán ha sido sagrado para las culturas indígenas de la región. Su nombre proviene de la palabra "Ibanasca" que significa "pueblo de nieves" en lengua pijao.',
    reviews: [
      {
        id: '3',
        author: 'Ana Martínez',
        rating: 5,
        comment: 'Desafío físico increíble con vistas espectaculares. Una experiencia que no olvidaré jamás.',
        date: '2024-07-20'
      }
    ],
    gallery: [hikingCard]
  },
  
  // Gastronomy
  {
    id: 'lechona-tolimense',
    name: 'Lechona Tolimense',
    description: 'Degusta el plato más emblemático del Tolima en sus lugares de origen.',
    image: gastronomyCard,
    category: 'gastronomy',
    availability: 'available',
    rating: 4.7,
    location: 'Espinal, Tolima',
    fullDescription: 'La lechona tolimense es un plato tradicional que consiste en un cerdo relleno de arroz, carne, arveja y especias, cocinado lentamente en horno de leña.',
    history: 'Este plato tiene sus raíces en la época colonial y se ha convertido en el símbolo gastronómico del Tolima. Cada familia tiene su receta secreta transmitida de generación en generación.',
    reviews: [
      {
        id: '4',
        author: 'Pedro Hernández',
        rating: 5,
        comment: 'La mejor lechona que he probado en mi vida. Sabor auténtico y tradicional.',
        date: '2024-08-05'
      }
    ],
    gallery: [gastronomyCard]
  },
  
  // Towns
  {
    id: 'honda-tolima',
    name: 'Villa de San Bartolomé de Honda',
    description: 'Pueblo colonial histórico conocido como la "Ciudad de los Puentes".',
    image: townsCard,
    category: 'towns',
    availability: 'available',
    rating: 4.6,
    location: 'Honda, Tolima',
    fullDescription: 'Honda es un municipio histórico fundado en 1539, famoso por su arquitectura colonial y sus múltiples puentes sobre el río Magdalena.',
    history: 'Durante la época colonial, Honda fue un puerto fluvial de gran importancia en la ruta hacia el interior del país. Su arquitectura colonial se conserva hasta hoy como testimonio de su pasado glorioso.',
    reviews: [
      {
        id: '5',
        author: 'Sofía Ramírez',
        rating: 4,
        comment: 'Hermoso pueblo colonial con mucha historia. Los puentes son impresionantes.',
        date: '2024-07-30'
      }
    ],
    gallery: [townsCard]
  },
  
  // Waterfalls
  {
    id: 'cascada-del-eden',
    name: 'Cascada del Edén',
    description: 'Una impresionante caída de agua de 70 metros rodeada de vegetación exuberante.',
    image: waterfallsCard,
    category: 'waterfalls',
    availability: 'available',
    rating: 4.8,
    location: 'Chaparral, Tolima',
    fullDescription: 'La Cascada del Edén es una formación natural espectacular donde el agua cae desde una altura de 70 metros creando un espectáculo natural único.',
    history: 'Esta cascada ha sido considerada sagrada por las comunidades indígenas locales. Su acceso se abrió al público hace pocos años, convirtiéndose en un destino eco-turístico popular.',
    reviews: [
      {
        id: '6',
        author: 'Luis Torres',
        rating: 5,
        comment: 'Lugar mágico e impresionante. El sendero está bien marcado y la cascada es espectacular.',
        date: '2024-08-12'
      }
    ],
    gallery: [waterfallsCard]
  }
];

export const getPlacesByCategory = (category: string): Place[] => {
  return places.filter(place => place.category === category);
};

export const getPlaceById = (id: string): Place | undefined => {
  return places.find(place => place.id === id);
};