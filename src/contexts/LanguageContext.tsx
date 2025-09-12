import React, { createContext, useContext, useState } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.festivals': 'Fiestas',
    'nav.hiking': 'Senderismo',
    'nav.gastronomy': 'Gastronomía',
    'nav.towns': 'Pueblos',
    'nav.waterfalls': 'Cascadas',
    
    // Home page
    'home.title': 'Descubre el Tolima',
    'home.subtitle': 'Tu portal al corazón de Colombia',
    'home.history.title': 'Historia del Tolima',
    'home.history.text': 'El Tolima, tierra de contrastes y belleza natural, se encuentra en el corazón de Colombia. Con el majestuoso Nevado del Tolima como su corona y el río Magdalena como su arteria vital, este departamento ha sido cuna de culturas precolombinas, escenario de gestas libertadoras y hogar de tradiciones que perduran en el tiempo.',
    'home.explore': 'Explorar Destinos',
    'home.categories': 'Categorías',
    
    // Categories
    'category.festivals.title': 'Fiestas',
    'category.festivals.description': 'Celebraciones tradicionales llenas de color y alegría',
    'category.hiking.title': 'Senderismo',
    'category.hiking.description': 'Rutas espectaculares en paisajes únicos',
    'category.gastronomy.title': 'Gastronomía',
    'category.gastronomy.description': 'Sabores auténticos de la región',
    'category.towns.title': 'Pueblos',
    'category.towns.description': 'Arquitectura colonial y cultura viva',
    'category.waterfalls.title': 'Cascadas',
    'category.waterfalls.description': 'Caídas de agua en entornos naturales',
    
    // Common
    'common.available': 'Disponible',
    'common.limited': 'Disponibilidad limitada',
    'common.unavailable': 'No disponible',
    'common.read_more': 'Leer más',
    'common.book_now': 'Reservar ahora',
    'common.reviews': 'Reseñas',
    'common.rating': 'Calificación',
    'common.write_review': 'Escribir reseña',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.festivals': 'Festivals',
    'nav.hiking': 'Hiking',
    'nav.gastronomy': 'Gastronomy',
    'nav.towns': 'Towns',
    'nav.waterfalls': 'Waterfalls',
    
    // Home page
    'home.title': 'Discover Tolima',
    'home.subtitle': 'Your gateway to the heart of Colombia',
    'home.history.title': 'History of Tolima',
    'home.history.text': 'Tolima, a land of contrasts and natural beauty, lies in the heart of Colombia. With the majestic Nevado del Tolima as its crown and the Magdalena River as its vital artery, this department has been the cradle of pre-Columbian cultures, the scene of liberation battles, and home to traditions that endure through time.',
    'home.explore': 'Explore Destinations',
    'home.categories': 'Categories',
    
    // Categories
    'category.festivals.title': 'Festivals',
    'category.festivals.description': 'Traditional celebrations full of color and joy',
    'category.hiking.title': 'Hiking',
    'category.hiking.description': 'Spectacular routes in unique landscapes',
    'category.gastronomy.title': 'Gastronomy',
    'category.gastronomy.description': 'Authentic flavors of the region',
    'category.towns.title': 'Towns',
    'category.towns.description': 'Colonial architecture and living culture',
    'category.waterfalls.title': 'Waterfalls',
    'category.waterfalls.description': 'Water falls in natural settings',
    
    // Common
    'common.available': 'Available',
    'common.limited': 'Limited availability',
    'common.unavailable': 'Unavailable',
    'common.read_more': 'Read more',
    'common.book_now': 'Book now',
    'common.reviews': 'Reviews',
    'common.rating': 'Rating',
    'common.write_review': 'Write review',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['es']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};