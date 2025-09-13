import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import PlaceDetail from "./pages/PlaceDetail";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import BusinessDashboard from "./pages/BusinessDashboard";
import { useEffect } from "react";
import Gamification from "./pages/Gamification";

// 👇 Importamos la nueva página del buscador inteligente
import Search from "./pages/Search";

const queryClient = new QueryClient();

const AuthenticatedApp = () => {
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (!loading && user && profile) {
      // Redirección según tipo de usuario
      if (
        profile.user_type === "Empresario" &&
        window.location.pathname === "/"
      ) {
        window.location.href = "/business";
      } else if (
        profile.user_type === "Turista" &&
        window.location.pathname === "/business"
      ) {
        window.location.href = "/";
      }
    }
  }, [user, profile, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/auth"
          element={!user ? <Auth /> : <Navigate to="/" replace />}
        />
        <Route
          path="/business"
          element={
            user && profile?.user_type === "Empresario" ? (
              <BusinessDashboard />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/gamification" element={<Gamification />} />

        {/* ✅ Nueva ruta para el buscador inteligente */}
        <Route path="/search" element={<Search />} />

        {/* ✅ Rutas dinámicas para categorías */}
        <Route path="/:category" element={<CategoryPage />} />
        <Route path="/:category/:id" element={<PlaceDetail />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthenticatedApp />
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;

