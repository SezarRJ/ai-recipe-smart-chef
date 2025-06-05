
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RTLProvider } from '@/contexts/RTLContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Index from './pages/Index';
import AuthPage from './pages/AuthPage';
import RecipesPage from './pages/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import CreateRecipePage from './pages/CreateRecipePage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import DietaryPreferencesPage from './pages/DietaryPreferencesPage';
import FavoritesPage from './pages/FavoritesPage';
import MealPlanPage from './pages/MealPlanPage';
import SearchPage from './pages/SearchPage';
import ScanDishPage from './pages/ScanDishPage';
import ScanIngredientsPage from './pages/ScanIngredientsPage';
import FindByIngredientsPage from './pages/FindByIngredientsPage';
import AIFindByIngredientsPage from './pages/AIFindByIngredientsPage';
import PantryPage from './pages/PantryPage';
import ShoppingListPage from './pages/ShoppingListPage';
import AiChefPage from './pages/AiChefPage';
import ServicesPage from './pages/ServicesPage';
import HelpPage from './pages/HelpPage';
import MainSettingsPage from './pages/MainSettingsPage';
import SettingsPage from './pages/SettingsPage';
import LanguageSettingsPage from './pages/LanguageSettingsPage';
import AppearancePage from './pages/AppearancePage';
import NotificationsPage from './pages/NotificationsPage';
import PaymentMethodsPage from './pages/PaymentMethodsPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFound from './pages/NotFound';
import BodyInformationPage from './pages/BodyInformationPage';
import HealthInformationPage from './pages/HealthInformationPage';
import NutritionGoalsPage from './pages/NutritionGoalsPage';
import MenuPage from './pages/MenuPage';
import GlobalCuisinePage from './pages/GlobalCuisinePage';
import CommunityPage from './pages/CommunityPage';
import ConnectedDevicesPage from './pages/ConnectedDevicesPage';
import LoyaltyProgramPage from './pages/LoyaltyProgramPage';
import SubscriptionPage from './pages/SubscriptionPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import AIFeaturesPage from './pages/AIFeaturesPage';
import SplashScreen from './pages/SplashScreen';
import SharedRecipesPage from './pages/SharedRecipesPage';
import SharedRecipesTrackingPage from './pages/SharedRecipesTrackingPage';
import IngredientSwapPage from './pages/IngredientSwapPage';
import NewHomePage from './pages/NewHomePage';
import HealthTrackingPage from './pages/HealthTrackingPage';
import HealthTrackingHomePage from './pages/HealthTrackingHomePage';
import SmartPantryPageWrapper from './pages/SmartPantryPageWrapper';
import CookingHistoryPage from './pages/CookingHistoryPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminRecipes from './pages/admin/AdminRecipes';
import AdminPage from './pages/AdminPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminSecurityPage from './pages/admin/AdminSecurityPage';
import AdminCommunicationsPage from './pages/admin/AdminCommunicationsPage';
import AdminRecipeApproval from './pages/admin/AdminRecipeApproval';
import AdminIngredients from './pages/admin/AdminIngredients';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <RTLProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/splash" element={<SplashScreen />} />
                <Route path="/:lang/home" element={<NewHomePage />} />
                <Route path="/home" element={<NewHomePage />} />
                <Route path="/:lang/auth" element={<AuthPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/:lang/recipes" element={<RecipesPage />} />
                <Route path="/recipes" element={<RecipesPage />} />
                <Route path="/:lang/recipes/:id" element={<RecipeDetailPage />} />
                <Route path="/recipes/:id" element={<RecipeDetailPage />} />
                <Route path="/:lang/create-recipe" element={<CreateRecipePage />} />
                <Route path="/create-recipe" element={<CreateRecipePage />} />
                <Route path="/:lang/profile" element={<ProfilePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/:lang/profile/edit" element={<EditProfilePage />} />
                <Route path="/profile/edit" element={<EditProfilePage />} />
                <Route path="/:lang/profile/dietary-preferences" element={<DietaryPreferencesPage />} />
                <Route path="/profile/dietary-preferences" element={<DietaryPreferencesPage />} />
                <Route path="/:lang/favorites" element={<FavoritesPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/:lang/meal-plan" element={<MealPlanPage />} />
                <Route path="/meal-plan" element={<MealPlanPage />} />
                <Route path="/:lang/search" element={<SearchPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/:lang/scan-dish" element={<ScanDishPage />} />
                <Route path="/scan-dish" element={<ScanDishPage />} />
                <Route path="/:lang/scan-ingredients" element={<ScanIngredientsPage />} />
                <Route path="/scan-ingredients" element={<ScanIngredientsPage />} />
                <Route path="/:lang/find-by-ingredients" element={<FindByIngredientsPage />} />
                <Route path="/find-by-ingredients" element={<FindByIngredientsPage />} />
                <Route path="/:lang/ai-find-by-ingredients" element={<AIFindByIngredientsPage />} />
                <Route path="/ai-find-by-ingredients" element={<AIFindByIngredientsPage />} />
                <Route path="/:lang/pantry" element={<PantryPage />} />
                <Route path="/pantry" element={<PantryPage />} />
                <Route path="/:lang/smart-pantry" element={<SmartPantryPageWrapper />} />
                <Route path="/smart-pantry" element={<SmartPantryPageWrapper />} />
                <Route path="/:lang/shopping-list" element={<ShoppingListPage />} />
                <Route path="/shopping-list" element={<ShoppingListPage />} />
                <Route path="/:lang/ai-chef" element={<AiChefPage />} />
                <Route path="/ai-chef" element={<AiChefPage />} />
                <Route path="/:lang/cooking-history" element={<CookingHistoryPage />} />
                <Route path="/cooking-history" element={<CookingHistoryPage />} />
                <Route path="/:lang/services" element={<ServicesPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/:lang/help" element={<HelpPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/:lang/settings" element={<MainSettingsPage />} />
                <Route path="/settings" element={<MainSettingsPage />} />
                <Route path="/:lang/quick-settings" element={<SettingsPage />} />
                <Route path="/quick-settings" element={<SettingsPage />} />
                <Route path="/:lang/settings/language" element={<LanguageSettingsPage />} />
                <Route path="/settings/language" element={<LanguageSettingsPage />} />
                <Route path="/:lang/settings/appearance" element={<AppearancePage />} />
                <Route path="/settings/appearance" element={<AppearancePage />} />
                <Route path="/:lang/settings/notifications" element={<NotificationsPage />} />
                <Route path="/settings/notifications" element={<NotificationsPage />} />
                <Route path="/:lang/settings/payment-methods" element={<PaymentMethodsPage />} />
                <Route path="/settings/payment-methods" element={<PaymentMethodsPage />} />
                <Route path="/:lang/settings/privacy" element={<PrivacyPage />} />
                <Route path="/settings/privacy" element={<PrivacyPage />} />
                <Route path="/:lang/body-information" element={<BodyInformationPage />} />
                <Route path="/body-information" element={<BodyInformationPage />} />
                <Route path="/:lang/health-information" element={<HealthInformationPage />} />
                <Route path="/health-information" element={<HealthInformationPage />} />
                <Route path="/:lang/nutrition-goals" element={<NutritionGoalsPage />} />
                <Route path="/nutrition-goals" element={<NutritionGoalsPage />} />
                <Route path="/:lang/menu" element={<MenuPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/:lang/global-cuisine" element={<GlobalCuisinePage />} />
                <Route path="/global-cuisine" element={<GlobalCuisinePage />} />
                <Route path="/:lang/community" element={<CommunityPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/:lang/connected-devices" element={<ConnectedDevicesPage />} />
                <Route path="/connected-devices" element={<ConnectedDevicesPage />} />
                <Route path="/:lang/loyalty-program" element={<LoyaltyProgramPage />} />
                <Route path="/loyalty-program" element={<LoyaltyProgramPage />} />
                <Route path="/:lang/subscription" element={<SubscriptionPage />} />
                <Route path="/subscription" element={<SubscriptionPage />} />
                <Route path="/:lang/payment-success" element={<PaymentSuccessPage />} />
                <Route path="/payment-success" element={<PaymentSuccessPage />} />
                <Route path="/:lang/ai-features" element={<AIFeaturesPage />} />
                <Route path="/ai-features" element={<AIFeaturesPage />} />
                <Route path="/:lang/shared-recipes" element={<SharedRecipesPage />} />
                <Route path="/shared-recipes" element={<SharedRecipesPage />} />
                <Route path="/:lang/shared-recipes-tracking" element={<SharedRecipesTrackingPage />} />
                <Route path="/shared-recipes-tracking" element={<SharedRecipesTrackingPage />} />
                <Route path="/:lang/ingredient-swap" element={<IngredientSwapPage />} />
                <Route path="/ingredient-swap" element={<IngredientSwapPage />} />
                <Route path="/:lang/health-tracking" element={<HealthTrackingPage />} />
                <Route path="/health-tracking" element={<HealthTrackingPage />} />
                <Route path="/:lang/health-tracking-home" element={<HealthTrackingHomePage />} />
                <Route path="/health-tracking-home" element={<HealthTrackingHomePage />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/recipes" element={<AdminRecipes />} />
                <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
                <Route path="/admin/settings" element={<AdminSettingsPage />} />
                <Route path="/admin/security" element={<AdminSecurityPage />} />
                <Route path="/admin/communications" element={<AdminCommunicationsPage />} />
                <Route path="/admin/recipe-approval" element={<AdminRecipeApproval />} />
                <Route path="/admin/ingredients" element={<AdminIngredients />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </RTLProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
