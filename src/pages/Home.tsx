import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, MapPin, UtensilsCrossed, Mountain, Waves, Building } from 'lucide-react';
import { useState, useEffect } from "react";
import { useSearch } from "@/hooks/useSearch";
import SearchBar from "@/components/SearchBar";

// ✅ Importando imágenes desde src/assets con alias
import festivalCard from '@/assets/festival-card.jpg';
import hikingCard from '@/assets/hiking-card.jpg';
import gastronomyCard from '@/assets/gastronomy-card.jpg';
import townsCard from '@/assets/towns-card.jpg';
import waterfallsCard from '@/assets/waterfalls-card.jpg';

import carrusel1 from "@/assets/carrusel1.png";
import carrusel2 from "@/assets/carrusel2.png";
import carrusel3 from "@/assets/carrusel3.png";
import carrusel4 from "@/assets/carrusel4.png";
import carrusel5 from "@/assets/carrusel5.png";

// Carrusel: imágenes para el hero
const TOLIMA_IMAGES = [
  carrusel1,
  carrusel2,
  carrusel3,
  carrusel4,
  carrusel5
];

const Home = () => {
  const { t } = useLanguage();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % TOLIMA_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const categories = [
    {
      title: t('category.festivals.title'),
      description: t('category.festivals.description'),
      href: '/festivals',
      image: festivalCard,
      icon: Calendar,
      gradient: 'from-accent to-accent-light'
    },
    {
      title: t('category.hiking.title'),
      description: t('category.hiking.description'),
      href: '/hiking',
      image: hikingCard,
      icon: Mountain,
      gradient: 'from-primary to-primary-light'
    },
    {
      title: t('category.gastronomy.title'),
      description: t('category.gastronomy.description'),
      href: '/gastronomy',
      image: gastronomyCard,
      icon: UtensilsCrossed,
      gradient: 'from-secondary to-secondary-light'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Carrusel Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Fondo dinámico */}
        <div className="absolute inset-0">
          {TOLIMA_IMAGES.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image}
                alt={`Paisaje del Tolima ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ))}
        </div>

        {/* Texto encima del carrusel */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            {t('home.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow-lg max-w-2xl mx-auto">
            {t('home.subtitle')}
          </p>
          
          <SearchBar />

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Button variant="hero" size="lg" className="text-lg px-8">
              {t('home.explore')}
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-background/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary">
              {t('common.read_more')}
            </Button>
          </div>

          {/* Indicadores del carrusel */}
          <div className="flex justify-center space-x-2 mt-12">
            {TOLIMA_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImage
                    ? "bg-primary scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-card border-border shadow-medium">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-primary mb-4">
                  {t('home.history.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed text-center">
                  {t('home.history.text')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              {t('home.categories')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explora las maravillas del Tolima a través de nuestras categorías especializadas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Link key={index} to={category.href} className="group">
                  <Card className="h-full overflow-hidden bg-gradient-card border-border hover:shadow-strong transition-smooth group-hover:scale-105">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-70`}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <IconComponent className="h-12 w-12 mx-auto mb-2 drop-shadow-lg" />
                          <h3 className="text-2xl font-bold drop-shadow-lg">{category.title}</h3>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground text-center">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            ¿Listo para tu próxima aventura?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Descubre lugares únicos, vive experiencias auténticas y crea recuerdos inolvidables en el corazón de Colombia.
          </p>
          <Button variant="accent" size="lg" className="text-lg px-8">
            Comenzar exploración
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
