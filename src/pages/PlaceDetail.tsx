import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import ReviewForm from '@/components/ReviewForm';
import { getPlaceById } from '@/data/places';
import { 
  MapPin, 
  Star, 
  ArrowLeft, 
  Clock, 
  Users, 
  Camera,
  Calendar
} from 'lucide-react';

const PlaceDetail = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const { t } = useLanguage();
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  if (!id) return <div>Place not found</div>;
  
  const place = getPlaceById(id);
  
  if (!place) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-muted-foreground mb-4">
            Lugar no encontrado
          </h1>
          <Link to={`/${category}`}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a {category}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const [reviews, setReviews] = useState(place.reviews);

  const getAvailabilityColor = () => {
    switch (place.availability) {
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
    switch (place.availability) {
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

  const handleReviewSubmit = (newReview: any) => {
    setReviews(prev => [newReview, ...prev]);
    setShowReviewForm(false);
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container mx-auto px-4">
            <div className="flex items-start justify-between text-white">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <Link to={`/${category}`}>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Volver
                    </Button>
                  </Link>
                  <Badge className={getAvailabilityColor()}>
                    {getAvailabilityText()}
                  </Badge>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  {place.name}
                </h1>
                
                <div className="flex items-center space-x-6 text-lg">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>{place.location}</span>
                  </div>
                  
                  {averageRating > 0 && (
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 fill-accent text-accent" />
                      <span>{averageRating.toFixed(1)} ({reviews.length} {t('common.reviews')})</span>
                    </div>
                  )}
                </div>
              </div>
              
              {place.availability === 'available' && (
                <Button variant="accent" size="lg" className="hidden md:block">
                  {t('common.book_now')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card className="bg-gradient-card border-border shadow-soft">
                <CardHeader>
                  <CardTitle className="text-primary">Descripción</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {place.fullDescription}
                  </p>
                </CardContent>
              </Card>

              {/* History */}
              <Card className="bg-gradient-card border-border shadow-soft">
                <CardHeader>
                  <CardTitle className="text-primary">Historia</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {place.history}
                  </p>
                </CardContent>
              </Card>

              {/* Reviews Section */}
              <Card className="bg-gradient-card border-border shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-primary">
                      {t('common.reviews')} ({reviews.length})
                    </CardTitle>
                    {averageRating > 0 && (
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= averageRating
                                  ? 'fill-accent text-accent'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {averageRating.toFixed(1)} de 5
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setShowReviewForm(!showReviewForm)}
                  >
                    {t('common.write_review')}
                  </Button>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {showReviewForm && (
                    <ReviewForm 
                      placeId={place.id} 
                      onSubmit={handleReviewSubmit}
                    />
                  )}
                  
                  {reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-foreground">{review.author}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-4 w-4 ${
                                        star <= review.rating
                                          ? 'fill-accent text-accent'
                                          : 'text-muted-foreground'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {review.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground leading-relaxed">
                            {review.comment}
                          </p>
                          
                          {review.photos && review.photos.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 mt-3">
                              {review.photos.map((photo, index) => (
                                <img
                                  key={index}
                                  src={photo}
                                  alt={`Review photo ${index + 1}`}
                                  className="w-full h-20 object-cover rounded-lg"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Sé el primero en escribir una reseña
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
             
                
         
                 
  

              {/* Quick Facts */}
              <Card className="bg-gradient-card border-border shadow-soft">
                <CardHeader>
                  <CardTitle className="text-primary">Datos útiles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Mejor época: Todo el año
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Camera className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Perfecto para fotografía
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Apto para familias
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlaceDetail;