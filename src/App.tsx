import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RTLProvider } from "@/contexts/RTLContext";
import NewHomePage from "./pages/NewHomePage";
import MenuPage from "./pages/MenuPage";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import FavoritesPage from "./pages/FavoritesPage";
import FindByIngredientsPage from "./pages/FindByIngredientsPage";
import PantryPage from "./pages/PantryPage";
import MealPlanPage from "./pages/MealPlanPage";
import SearchPage from "./pages/SearchPage";
import CommunityPage from "./pages/CommunityPage";
import MainSettingsPage from "./pages/MainSettingsPage";
import ProfilePage from "./pages/ProfilePage";
import DietaryPreferencesPage from "./pages/DietaryPreferencesPage";
import LanguageSettingsPage from "./pages/LanguageSettingsPage";
import NotificationsPage from "./pages/NotificationsPage";
import AppearancePage from "./pages/AppearancePage";
import ConnectedDevicesPage from "./pages/ConnectedDevicesPage";
import PrivacyPage from "./pages/PrivacyPage";
import HelpPage from "./pages/HelpPage";
import AuthPage from "./pages/AuthPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import PaymentMethodsPage from "./pages/PaymentMethodsPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import NutritionGoalsPage from "./pages/NutritionGoalsPage";
import BodyInformationPage from "./pages/BodyInformationPage";
import HealthInformationPage from "./pages/HealthInformationPage";
import HealthTrackingPage from "./pages/HealthTrackingPage";
import HealthTrackingHomePage from "./pages/HealthTrackingHomePage";
import ScanDishPage from "./pages/ScanDishPage";
import ScanIngredientsPage from "./pages/ScanIngredientsPage";
import LoyaltyProgramPage from "./pages/LoyaltyProgramPage";
import GlobalCuisinePage from "./pages/GlobalCuisinePage";
import IngredientSwapPage from "./pages/IngredientSwapPage";
import SharedRecipesPage from "./pages/SharedRecipesPage";
import SharedRecipesTrackingPage from "./pages/SharedRecipesTrackingPage";
import SplashScreen from "./pages/SplashScreen";
import ShoppingListPage from "./pages/ShoppingListPage";
import NotFound from "./pages/NotFound";
// Import the new EditProfilePage
import EditProfilePage from "./pages/EditProfilePage"; // Make sure this path is correct

// Admin pages
import AdminPage from "./pages/AdminPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminRecipes from "./pages/admin/AdminRecipes";
import AdminSubscriptionManager from "./pages/admin/AdminSubscriptionManager";
import AdminRewardsManager from "./pages/admin/AdminRewardsManager";
import AdminLanguageManager from "./pages/admin/AdminLanguageManager";
import AdminSystemMonitoring from "./pages/admin/AdminSystemMonitoring";
import AdminUserTypesManager from "./pages/admin/AdminUserTypesManager";
import AdminAccountingManager from "./pages/admin/AdminAccountingManager";
import AdminIntegrationsManager from "./pages/admin/AdminIntegrationsManager";
import AdminIngredientImagesManager from "./pages/admin/AdminIngredientImagesManager";
import AdminTranslationsManager from "./pages/admin/AdminTranslationsManager";
import AdminContentLibrary from "./pages/admin/AdminContentLibrary";
import { AdminAuthGuard } from "./components/admin/AdminAuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RTLProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Redirect root to new home page */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Main app routes */}
            <Route path="/home" element={<NewHomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
            <Route path="/create-recipe" element={<CreateRecipePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/find-by-ingredients" element={<FindByIngredientsPage />} />
            <Route path="/pantry" element={<PantryPage />} />
            <Route path="/meal-plan" element={<MealPlanPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/settings" element={<MainSettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* Add the route for EditProfilePage */}
            <Route path="/profile/edit" element={<EditProfilePage />} />
            <Route path="/dietary-preferences" element={<DietaryPreferencesPage />} />
            <Route path="/language-settings" element={<LanguageSettingsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/appearance" element={<AppearancePage />} />
            <Route path="/connected-devices" element={<ConnectedDevicesPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/payment-methods" element={<PaymentMethodsPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/nutrition-goals" element={<NutritionGoalsPage />} />
            <Route path="/body-information" element={<BodyInformationPage />} />
            <Route path="/health-information" element={<HealthInformationPage />} />
            <Route path="/health-tracking" element={<HealthTrackingPage />} />
            <Route path="/health-tracking-home" element={<HealthTrackingHomePage />} />
            <Route path="/scan-dish" element={<ScanDishPage />} />
            <Route path="/scan-ingredients" element={<ScanIngredientsPage />} />
            <Route path="/loyalty-program" element={<LoyaltyProgramPage />} />
            <Route path="/global-cuisine" element={<GlobalCuisinePage />} />
            <Route path="/ingredient-swap" element={<IngredientSwapPage />} />
            <Route path="/shared-recipes" element={<SharedRecipesPage />} />
            <Route path="/shared-recipes-tracking" element={<SharedRecipesTrackingPage />} />
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/shopping-list" element={<ShoppingListPage />} />

            {/* Admin routes - accessible to both admin and super admin */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/*" element={
              <AdminAuthGuard>
                <Routes>
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="user-types" element={
                    <AdminAuthGuard requireSuperAdmin={true}>
                      <AdminUserTypesManager />
                    </AdminAuthGuard>
                  } />
                  <Route path="recipes" element={<AdminRecipes />} />
                  <Route path="ingredients" element={<div>Admin Ingredients</div>} />
                  <Route path="ingredient-images" element={<AdminIngredientImagesManager />} />
                  <Route path="translations" element={<AdminTranslationsManager />} />
                  <Route path="subscriptions" element={<AdminSubscriptionManager />} />
                  <Route path="accounting" element={
                    <AdminAuthGuard requireSuperAdmin={true}>
                      <AdminAccountingManager />
                    </AdminAuthGuard>
                  } />
                  <Route path="rewards" element={<AdminRewardsManager />} />
                  <Route path="languages" element={<AdminLanguageManager />} />
                  <Route path="integrations" element={
                    <AdminAuthGuard requireSuperAdmin={true}>
                      <AdminIntegrationsManager />
                    </AdminAuthGuard>
                  } />
                  <Route path="system" element={
                    <AdminAuthGuard requireSuperAdmin={true}>
                      <AdminSystemMonitoring />
                    </AdminAuthGuard>
                  } />
                  <Route path="analytics" element={<div>Admin Analytics</div>} />
                  <Route path="communications" element={<div>Admin Communications</div>} />
                  <Route path="security" element={
                    <AdminAuthGuard requireSuperAdmin={true}>
                      <div>Admin Security</div>
                    </AdminAuthGuard>
                  } />
                  <Route path="maintenance" element={
                    <AdminAuthGuard requireSuperAdmin={true}>
                      <div>Admin Maintenance</div>
                    </AdminAuthGuard>
                  } />
                  <Route path="settings" element={
                    <AdminAuthGuard requireSuperAdmin={true}>
                      <div>Admin Settings</div>
                    </AdminAuthGuard>
                  } />
                  <Route path="content-library" element={<AdminContentLibrary />} />
                </Routes>
              </AdminAuthGuard>
            } />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </RTLProvider>
  </QueryClientProvider>
);

export default App;
