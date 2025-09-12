import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2, Building, MapPin, FileText, Tag } from 'lucide-react';

interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  municipality: string;
  created_at: string;
}

const BusinessDashboard = () => {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [business, setBusiness] = useState<Business | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    municipality: ''
  });

  const categories = [
    'Restaurante',
    'Hotel',
    'Guía Turístico',
    'Aventura y Deportes',
    'Transporte',
    'Artesanías',
    'Eventos y Festivales',
    'Otro'
  ];

  const municipalities = [
    'Ibagué',
    'Espinal',
    'Girardot',
    'Melgar',
    'Honda',
    'Líbano',
    'Mariquita',
    'Fresno',
    'Herveo',
    'Cajamarca',
    'Otro'
  ];

  useEffect(() => {
    if (user) {
      fetchBusiness();
    }
  }, [user]);

  const fetchBusiness = async () => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching business:', error);
        return;
      }

      if (data) {
        setBusiness(data);
        setFormData({
          name: data.name,
          description: data.description,
          category: data.category,
          municipality: data.municipality
        });
      }
    } catch (error) {
      console.error('Error fetching business:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.category || !formData.municipality) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      if (business) {
        // Update existing business
        const { error } = await supabase
          .from('businesses')
          .update(formData)
          .eq('id', business.id);

        if (error) throw error;

        toast({
          title: "¡Negocio actualizado!",
          description: "Los datos de tu negocio han sido actualizados correctamente"
        });
      } else {
        // Create new business
        const { error } = await supabase
          .from('businesses')
          .insert({
            ...formData,
            user_id: user?.id
          });

        if (error) throw error;

        toast({
          title: "¡Negocio registrado!",
          description: "Tu negocio ha sido registrado exitosamente en ToliExplora"
        });
      }

      fetchBusiness();
    } catch (error: any) {
      console.error('Error saving business:', error);
      toast({
        title: "Error",
        description: error.message || "Ocurrió un error al guardar los datos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Panel Empresarial</h1>
            <p className="text-muted-foreground">
              Hola {profile?.full_name}, gestiona tu negocio en ToliExplora
            </p>
          </div>

          <Card className="shadow-medium border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-primary" />
                <span>{business ? 'Actualizar Negocio' : 'Registrar Negocio'}</span>
              </CardTitle>
              <CardDescription>
                {business 
                  ? 'Modifica los datos de tu negocio registrado'
                  : 'Completa la información de tu negocio para aparecer en ToliExplora'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center space-x-2">
                    <Building className="h-4 w-4" />
                    <span>Nombre del Negocio</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ej: Restaurante El Tolimense"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Descripción</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe tu negocio, servicios que ofreces, especialidades, etc."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Tag className="h-4 w-4" />
                    <span>Categoría</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la categoría de tu negocio" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Municipio</span>
                  </Label>
                  <Select
                    value={formData.municipality}
                    onValueChange={(value) => setFormData({ ...formData, municipality: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el municipio donde está ubicado" />
                    </SelectTrigger>
                    <SelectContent>
                      {municipalities.map((municipality) => (
                        <SelectItem key={municipality} value={municipality}>
                          {municipality}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {business ? 'Actualizando...' : 'Registrando...'}
                    </>
                  ) : (
                    business ? 'Actualizar Negocio' : 'Registrar Negocio'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {business && (
            <Card className="mt-6 shadow-medium border-border">
              <CardHeader>
                <CardTitle className="text-primary">Tu Negocio Registrado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground">{business.name}</h3>
                  <p className="text-sm text-muted-foreground">{business.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {business.category}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                    {business.municipality}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Registrado el {new Date(business.created_at).toLocaleDateString('es-CO')}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;