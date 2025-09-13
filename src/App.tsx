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
import Gamification from "./pages/Gamification";
import Search from "./pages/Search"; // ✅ buscador inteligente

const queryClient = new QueryClient();

const AuthenticatedApp = () => {
  const { user, profile, loading } = useAuth();

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
        {/* 🔑 Ruta de login */}
        <Route
          path="/auth"
          element={!user ? <Auth /> : <Navigate to="/" replace />}
        />

        {/* 🔑 Si es empresario, puede entrar a su dashboard */}
        <Route
          path="/business"
          element={
            user && profile?.user_type === "Empresario" ? (
              <BusinessDashboard />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* 🔑 Página principal, pero si es empresario, lo manda directo a /business */}
        <Route
          path="/"
          element={
            user && profile?.user_type === "Empresario" ? (
              <Navigate to="/business" replace />
            ) : (
              <Home />
            )
          }
        />

        <Route path="/gamification" element={<Gamification />} />
        <Route path="/search" element={<Search />} /> {/* ✅ Buscador */}
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


