import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Star } from 'lucide-react';

interface PlaceCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  availability: 'available' | 'limited' | 'unavailable';
  rating?: number;
  location?: string;
  category: string;
}

const PlaceCard = ({ id, name, description, image, availability, rating, location, category }: PlaceCardProps) => {
  const { t } = useLanguage();

  const getAvailabilityColor = () => {
    switch (availability) {
      case 'available':
        return 'bg-primary text-primary-foreground';
      case 'limited':
        return 'bg-accent text-accent-foreground';
      case 'unavailable':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getAvailabilityText = () => {
    switch (availability) {
      case 'available':
        return t('common.available');
      case 'limited':
        return t('common.limited');
      case 'unavailable':
        return t('common.unavailable');
      default:
        return '';
    }
  };

  return (
    <Card className="group overflow-hidden bg-gradient-card border-border hover:shadow-medium transition-smooth">
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
          <div className="absolute top-3 right-3">
            <Badge className={getAvailabilityColor()}>
              {getAvailabilityText()}
            </Badge>
          </div>
          {rating && (
            <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-1">{name}</h3>
        {location && (
          <div className="flex items-center text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{location}</span>
          </div>
        )}
        <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Link to={`/${category}/${id}`}>
          <Button variant="outline" size="sm">
            {t('common.read_more')}
          </Button>
        </Link>
       
       
      </CardFooter>
    </Card>
  );
};

export default PlaceCard;