  import { useState } from 'react';
  import { Link, useLocation } from 'react-router-dom';
  import { Button } from '@/components/ui/button';
  import { useLanguage } from '@/contexts/LanguageContext';
  import { useAuth } from '@/contexts/AuthContext';
  import { Globe, Menu, X, LogOut, User } from 'lucide-react';
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';

  const Header = () => {
    const { t, language, setLanguage } = useLanguage();
    const { user, profile, signOut } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

<<<<<<< HEAD
  const navigation = [
    { href: '/', label: t('nav.home') },
    { href: '/festivals', label: t('nav.festivals') },
    { href: '/hiking', label: t('nav.hiking') },
    { href: '/gastronomy', label: t('nav.gastronomy') },
   
  ];
=======
    const navigation = [
      { href: '/', label: t('nav.home') },
      { href: '/festivals', label: t('nav.festivals') },
      { href: '/hiking', label: t('nav.hiking') },
      { href: '/gastronomy', label: t('nav.gastronomy') },
      { href: '/towns', label: t('nav.towns') },
      { href: '/waterfalls', label: t('nav.waterfalls') },
    ];
>>>>>>> 3a4f26a (gamificacion)

    const toggleLanguage = () => {
      setLanguage(language === 'es' ? 'en' : 'es');
    };

    return (
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">T</span>
              </div>
              <span className="font-bold text-xl text-primary">ToliExplora</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm font-medium transition-smooth hover:text-primary ${
                    location.pathname === item.href
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Auth & Language & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>

                
                


                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span className="hidden md:inline text-sm font-medium">
                          {profile?.full_name || user.email}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="font-medium">
                        {profile?.full_name}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-sm text-muted-foreground">
                        {profile?.user_type}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {profile?.user_type === 'Empresario' && (
                        <DropdownMenuItem asChild>
                          <Link to="/business">Panel Empresarial</Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar Sesión
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                
                <div className="flex items-center space-x-2">

                  
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/auth">Iniciar Sesión</Link>
                  </Button>
                  <Button variant="default" size="sm" asChild>
                    <Link to="/auth">Registrarse</Link>
                  </Button>
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center space-x-1"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border">
              <div className="flex flex-col space-y-2 pt-4">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`px-4 py-2 text-sm font-medium transition-smooth hover:text-primary hover:bg-accent rounded-md ${
                      location.pathname === item.href
                        ? 'text-primary bg-accent'
                        : 'text-muted-foreground'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>
    );
  };

  export default Header;