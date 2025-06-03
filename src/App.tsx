
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { RTLProvider } from "@/contexts/RTLContext";
import BottomToolbar from "@/components/layout/BottomToolbar";

// Auth & Landing
import SplashScreen from "@/pages/SplashScreen";
import AuthPage from "@/pages/AuthPage";
import Index from "@/pages/Index";

// Main App Pages
import NewHomePage from "@/pages/NewHomePage";
import RecipesPage from "@/pages/RecipesPage";
import RecipeDetailPage from "@/pages/RecipeDetailPage";
import CookingModePage from "@/pages/CookingMode";
import ProfilePage from "@/pages/ProfilePage";
import MenuPage from "@/pages/MenuPage";

// New Feature Pages
import GlobalCuisinePage from "@/pages/GlobalCuisinePage";
import AIFeaturesPage from "@/pages/AIFeaturesPage";
import HealthTrackingPage from "@/pages/HealthTrackingPage";
import HealthTrackingHomePage from "@/pages/HealthTrackingHomePage";
import CreateRecipePage from "@/pages/CreateRecipePage";

// Admin Pages
import AdminPage from "@/pages/AdminPage";
import AdminDashboard from "@/pages/AdminDashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <RTLProvider>
              <TooltipProvider>
                <div className="min-h-screen bg-background font-sans antialiased">
                  <Routes>
                    {/* Auth & Landing Routes */}
                    <Route path="/" element={<SplashScreen />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/landing" element={<Index />} />
                    
                    {/* Main App Routes */}
                    <Route path="/home" element={<NewHomePage />} />
                    <Route path="/recipes" element={<RecipesPage />} />
                    <Route path="/recipe/:id" element={<RecipeDetailPage />} />
                    <Route path="/cooking/:id" element={<CookingModePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    
                    {/* New Feature Routes */}
                    <Route path="/global-cuisine" element={<GlobalCuisinePage />} />
                    <Route path="/ai-features" element={<AIFeaturesPage />} />
                    <Route path="/health-tracking" element={<HealthTrackingPage />} />
                    <Route path="/health-tracking-home" element={<HealthTrackingHomePage />} />
                    <Route path="/create-recipe" element={<CreateRecipePage />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminPage />}>
                      <Route index element={<AdminDashboard />} />
                    </Route>
                    
                    {/* Catch all route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                  
                  <BottomToolbar />
                  <Toaster />
                  <Sonner />
                </div>
              </TooltipProvider>
            </RTLProvider>
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
