import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReviewFormProps {
  placeId: string;
  onSubmit: (review: any) => void;
}

const ReviewForm = ({ placeId, onSubmit }: ReviewFormProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleStarHover = (value: number) => {
    setHoveredRating(value);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos = Array.from(files).slice(0, 3); // Limit to 3 photos
      setPhotos(prev => [...prev, ...newPhotos].slice(0, 3));
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!author.trim() || !comment.trim() || rating === 0) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive"
      });
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      author: author.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0],
      photos: photos.map(photo => URL.createObjectURL(photo))
    };

    onSubmit(newReview);
    
    // Reset form
    setRating(0);
    setAuthor('');
    setComment('');
    setPhotos([]);
    
    toast({
      title: "¡Reseña enviada!",
      description: "Tu reseña ha sido publicada exitosamente",
    });
  };

  return (
    <Card className="bg-gradient-card border-border shadow-medium">
      <CardHeader>
        <CardTitle className="text-primary">
          {t('common.write_review')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <Label className="text-base font-medium text-foreground">
              {t('common.rating')} *
            </Label>
            <div className="flex items-center space-x-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-colors"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-accent text-accent'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 && `${rating}/5`}
              </span>
            </div>
          </div>

          {/* Author Name */}
          <div>
            <Label htmlFor="author" className="text-base font-medium text-foreground">
              Tu nombre *
            </Label>
            <Input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Ingresa tu nombre"
              className="mt-1"
              required
            />
          </div>

          {/* Comment */}
          <div>
            <Label htmlFor="comment" className="text-base font-medium text-foreground">
              Tu reseña *
            </Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comparte tu experiencia..."
              className="mt-1"
              rows={4}
              required
            />
          </div>

          {/* Photo Upload */}
          <div>
            <Label className="text-base font-medium text-foreground">
              Fotos (opcional)
            </Label>
            <div className="mt-2">
              {photos.length < 3 && (
                <Label htmlFor="photos" className="cursor-pointer">
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Haz clic para subir fotos (máximo 3)
                    </span>
                  </div>
                  <Input
                    id="photos"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </Label>
              )}
              
              {photos.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-destructive/90"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Button type="submit" variant="nature" className="w-full">
            Publicar reseña
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;