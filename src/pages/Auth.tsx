import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Loader2, User, Building } from 'lucide-react';
import LoginWithGoogle from "../LoginWithGoogle";



const Auth = () => {
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    password: '',
    userType: '' as 'Turista' | 'Empresario' | ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await signIn(loginData.email, loginData.password);
      
      if (error) {
        toast({
          title: "Error de autenticación",
          description: error.message === 'Invalid login credentials' 
            ? "Credenciales incorrectas. Verifica tu email y contraseña." 
            : error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente"
        });
        // Redirect will be handled by useEffect in App component
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error inesperado",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerData.fullName || !registerData.email || !registerData.password || !registerData.userType) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    if (registerData.password.length < 6) {
      toast({
        title: "Error",
        description: "La contraseña debe tener al menos 6 caracteres",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp(
        registerData.email,
        registerData.password,
        registerData.fullName,
        registerData.userType
      );
      
      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: "Usuario existente",
            description: "Este email ya está registrado. Intenta iniciar sesión.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Error de registro",
            description: error.message,
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "¡Cuenta creada!",
          description: "Tu cuenta ha sido creada exitosamente. Ya puedes iniciar sesión."
        });
        // Switch to login tab
        const loginTab = document.querySelector('[value="login"]') as HTMLElement;
        loginTab?.click();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error inesperado",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
 const [tab, setTab] = useState("login");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">ToliExplora</h1>
          <p className="text-muted-foreground">Descubre las maravillas del Tolima</p>
        </div>

        <Card className="shadow-medium border-border">
          <Tabs value={tab} onValueChange={setTab} className="w-full">

            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
              
            </TabsList>
            
            <TabsContent value="login">
              <CardHeader>
                <CardTitle>Bienvenido de vuelta</CardTitle>
                <CardDescription>
                  Ingresa tus credenciales para acceder a tu cuenta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Correo electrónico</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Contraseña</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Iniciando sesión...
                      </>
                    ) : (
                      'Iniciar Sesión'
                    )}
                  </Button>
                  <div className="mt-4">
                    <p className="text-center text-sm text-gray-500 mb-2">o continúa con</p>
                    <LoginWithGoogle />
  </div>
                </form>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="register">
              <CardHeader>
                <CardTitle>Crear cuenta</CardTitle>
                <CardDescription>
                  Únete a ToliExplora y descubre experiencias únicas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Nombre completo</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Tu nombre completo"
                      value={registerData.fullName}
                      onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Correo electrónico</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Contraseña</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo de usuario</Label>
                    <Select
                      value={registerData.userType}
                      onValueChange={(value: 'Turista' | 'Empresario') => 
                        setRegisterData({ ...registerData, userType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu tipo de usuario" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Turista">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>Turista</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="Empresario">
                          <div className="flex items-center space-x-2">
                            <Building className="h-4 w-4" />
                            <span>Empresario</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creando cuenta...
                      </>
                    ) : (
                      'Crear Cuenta'
                    )}
                    
                  </Button>
                  <div className="mt-4">
                    <p className="text-center text-sm text-gray-500 mb-2">o continúa con</p>
                      <LoginWithGoogle />
                  </div>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Auth;