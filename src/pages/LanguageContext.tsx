import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "es" | "en";

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  // 🌍 Comunes
  "common.available": { es: "Disponible", en: "Available" },
  "common.limited": { es: "Disponibilidad limitada", en: "Limited availability" },
  "common.unavailable": { es: "No disponible", en: "Unavailable" },
  "common.read_more": { es: "Leer más", en: "Read more" },
  "common.book_now": { es: "Reservar ahora", en: "Book now" },

  // 🏠 Home
  "home.title": { es: "Explora Tolima", en: "Explore Tolima" },
  "home.subtitle": { es: "Descubre cultura, naturaleza y gastronomía", en: "Discover culture, nature and gastronomy" },
  "home.categories": { es: "Categorías", en: "Categories" },
  "home.history.title": { es: "Nuestra historia", en: "Our History" },
  "home.history.text": { 
    es: "Tolima, tierra de música y tradición, te invita a recorrer sus paisajes y festivales únicos.", 
    en: "Tolima, land of music and tradition, invites you to explore its landscapes and unique festivals." 
  },

  // 🎉 Categorías
  "category.festivals.title": { es: "Fiestas", en: "Festivals" },
  "category.festivals.description": { 
    es: "Celebraciones tradicionales llenas de color y alegría.", 
    en: "Traditional celebrations full of color and joy." 
  },

  "category.hiking.title": { es: "Senderismo", en: "Hiking" },
  "category.hiking.description": { 
    es: "Explora montañas, volcanes y senderos mágicos.", 
    en: "Explore mountains, volcanoes and magical trails." 
  },

  "category.gastronomy.title": { es: "Gastronomía", en: "Gastronomy" },
  "category.gastronomy.description": { 
    es: "Disfruta la comida típica tolimense.", 
    en: "Enjoy Tolima’s traditional food." 
  },

  "category.default": { es: "Categoría", en: "Category" },
  "category.default_description": { 
    es: "Descubre lo mejor del Tolima.", 
    en: "Discover the best of Tolima." 
  },

  // ⭐ Sección destacados
  "category.featured": { 
    es: "Lugares destacados en {{category}}", 
    en: "Featured places in {{category}}" 
  },
  "category.featured_subtitle": { 
    es: "Descubre los mejores destinos en esta categoría", 
    en: "Discover the best destinations in this category" 
  },

  // ⏳ Próximamente
  "category.coming_soon": { es: "Próximamente", en: "Coming soon" },
  "category.coming_soon_description": { 
    es: "Estamos trabajando para traerte los mejores lugares en esta categoría. ¡Vuelve pronto para descubrir nuevas experiencias!", 
    en: "We are working to bring you the best places in this category. Check back soon to discover new experiences!" 
  },
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("es");

  const t = (key: string, vars: Record<string, string> = {}) => {
    const text = translations[key]?.[language] || key;
    return Object.keys(vars).reduce(
      (str, varKey) => str.replace(`{{${varKey}}}`, vars[varKey]),
      text
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
