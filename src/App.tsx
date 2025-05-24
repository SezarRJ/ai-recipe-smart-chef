
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Explore from "./pages/Explore";
import MealPlanning from "./pages/MealPlanning";
import Pantry from "./pages/Pantry";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import RecipeDetail from "./pages/RecipeDetail";
import CookingMode from "./pages/CookingMode";
import ShoppingLists from "./pages/ShoppingLists";
import DietaryPreferences from "./pages/DietaryPreferences";
import HealthInformation from "./pages/HealthInformation";
import Subscription from "./pages/Subscription";
import PaymentMethods from "./pages/PaymentMethods";
import CookingHistory from "./pages/CookingHistory";
import CreateRecipe from "./pages/CreateRecipe";
import SharedRecipes from "./pages/SharedRecipes";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Settings from "./pages/Settings";
import GlobalCuisine from "./pages/GlobalCuisine";
import DishScanner from "./pages/DishScanner";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wasfah-orange"></div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

// PWA registration hook
const usePWA = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);
};

const AppContent = () => {
  usePWA();

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/global-cuisine" element={<GlobalCuisine />} />
        <Route path="/dish-scanner" element={<DishScanner />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/cooking/:id" element={<CookingMode />} />
        <Route path="/meal-planning" element={
          <ProtectedRoute>
            <MealPlanning />
          </ProtectedRoute>
        } />
        <Route path="/pantry" element={
          <ProtectedRoute>
            <Pantry />
          </ProtectedRoute>
        } />
        <Route path="/shopping-lists" element={
          <ProtectedRoute>
            <ShoppingLists />
          </ProtectedRoute>
        } />
        <Route path="/dietary-preferences" element={
          <ProtectedRoute>
            <DietaryPreferences />
          </ProtectedRoute>
        } />
        <Route path="/health-information" element={
          <ProtectedRoute>
            <HealthInformation />
          </ProtectedRoute>
        } />
        <Route path="/subscription" element={
          <ProtectedRoute>
            <Subscription />
          </ProtectedRoute>
        } />
        <Route path="/payment-methods" element={
          <ProtectedRoute>
            <PaymentMethods />
          </ProtectedRoute>
        } />
        <Route path="/cooking-history" element={
          <ProtectedRoute>
            <CookingHistory />
          </ProtectedRoute>
        } />
        <Route path="/create-recipe" element={
          <ProtectedRoute>
            <CreateRecipe />
          </ProtectedRoute>
        } />
        <Route path="/shared-recipes" element={
          <ProtectedRoute>
            <SharedRecipes />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <PWAInstallPrompt />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
