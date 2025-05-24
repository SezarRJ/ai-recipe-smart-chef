
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
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/" replace />;
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
        <Route path="/explore" element={<Explore />} />
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
        <Route path="/profile" element={<Profile />} />
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
