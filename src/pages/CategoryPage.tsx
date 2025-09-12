import { useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import PlaceCard from '@/components/PlaceCard';
import { getPlacesByCategory } from '@/data/places';
import { Calendar, Mountain, UtensilsCrossed, Building, Waves } from 'lucide-react';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { t } = useLanguage();
  
  if (!category) return <div>Category not found</div>;
  
  const places = getPlacesByCategory(category);
  
  const getCategoryIcon = () => {
    switch (category) {
      case 'festivals':
        return Calendar;
      case 'hiking':
        return Mountain;
      case 'gastronomy':
        return UtensilsCrossed;
      //case 'towns':
       // return Building;
      //case 'waterfalls':
       // return Waves;
      //default:
       // return Mountain;
    }
  };

  const getCategoryTitle = () => {
    return t(`category.${category}.title`);
  };

  const getCategoryDescription = () => {
    return t(`category.${category}.description`);
  };

  const IconComponent = getCategoryIcon();

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-nature py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-primary-foreground">
            <IconComponent className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {getCategoryTitle()}
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90">
              {getCategoryDescription()}
            </p>
          </div>
        </div>
      </section>

      {/* Places Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {places.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary mb-4">
                  Lugares destacados en {getCategoryTitle()}
                </h2>
                <p className="text-muted-foreground">
                  Descubre los mejores destinos en esta categoría
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {places.map((place) => (
                  <PlaceCard
                    key={place.id}
                    id={place.id}
                    name={place.name}
                    description={place.description}
                    image={place.image}
                    availability={place.availability}
                    rating={place.rating}
                    location={place.location}
                    category={place.category}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <IconComponent className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
              <h3 className="text-2xl font-bold text-muted-foreground mb-4">
                Próximamente
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Estamos trabajando para traerte los mejores lugares en esta categoría. 
                ¡Vuelve pronto para descubrir nuevas experiencias!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;