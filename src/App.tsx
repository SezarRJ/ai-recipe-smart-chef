import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Added Navigate
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Explore from "./pages/Explore";
import MealPlanning from "./pages/MealPlanning";
import Pantry from "./pages/Pantry";
import Profile from "./pages/Profile";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // Import useAuth

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }) => { // Children prop type is React.ReactNode, removed if using JS
  const { session } = useAuth();

  if (!session) {
    // Redirect to home page if not logged in
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* AuthProvider wraps everything that needs authentication context */}
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/explore" element={<Explore />} />
              {/* Protected Routes */}
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
              <Route path="/profile" element={<Profile />} /> {/* Assuming Profile might also need protection, but not in provided diff */}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App; // Ensure App is exported if it's the main entry.
