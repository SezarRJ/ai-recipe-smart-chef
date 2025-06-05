import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { RTLProvider } from './contexts/RTLContext';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { initializeAdminDemo, isAdminAuthenticated } from './lib/adminAuth';

// --- Import ALL your existing pages ---
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage'; // Old home page?
import NewHomePage from './pages/NewHomePage'; // New home page, likely the one you're using
import RecipeDetailPage from './pages/RecipeDetailPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage'; // This is the General Settings page
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminPage from './pages/AdminPage'; // Admin Layout/Shell
import AdminDashboard from './pages/admin/AdminDashboardPage';
import AdminUsers from './pages/admin/AdminUsersPage';
import AdminRecipes from './pages/admin/AdminRecipesPage';
import AdminIngredients from './pages/admin/AdminIngredientsPage';
import AdminIngredientImagesManager from './pages/admin/AdminIngredientImagesManager';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminSecurityPage from './pages/admin/AdminSecurityPage';
import AdminIntegrationsPage from './pages/admin/AdminIntegrationsPage';
import AdminIntegrationsManager from './pages/admin/AdminIntegrationsManager';
import AdminUserTypesPage from './pages/admin/AdminUserTypesPage';
import AdminAccountingPage from './pages/admin/AdminAccountingPage';
import AdminSystemPage from './pages/admin/AdminSystemPage';
import AdminMaintenancePage from './pages/admin/AdminMaintenancePage';
import AdminRewardsPage from './pages/admin/AdminRewardsPage';
import AdminCommunicationsPage from './pages/admin/AdminCommunicationsPage';
import AdminAdvertisementsPage from './pages/admin/AdminAdvertisementsPage';
import AdminNotificationSystem from './pages/admin/AdminNotificationSystem';
import CommunityPage from './pages/CommunityPage'; // App-level Community page
import ContentLibraryPage from './pages/admin/ContentLibraryPage';
import TranslationsPage from './pages/admin/TranslationsPage';
import LanguagesPage from './pages/admin/LanguagesPage';
import ImageControlPage from './pages/admin/ImageControlPage';
import NotificationsPage from './pages/NotificationsPage'; // User-facing notifications
import SubscriptionsPage from './pages/admin/SubscriptionsPage'; // Admin subscriptions view
import AdvertisementPage from './pages/admin/AdvertisementPage';
import SupportTicketsPage from './pages/admin/SupportTicketsPage';

// --- Import AI & Tool Related Pages (including ALL the new ones) ---
import AIFindByIngredientsPage from './pages/AIFindByIngredientsPage';
import ScanDishPage from './pages/ScanDishPage';
import GlobalCuisinePage from './pages/GlobalCuisinePage';
import AIFeaturesPage from './pages/AIFeaturesPage'; // AI Features Hub
import ToolsPage from './pages/ToolsPage'; // Tools Hub

// AI Feature Pages
import AICookingAssistantPage from './pages/ai/AICookingAssistantPage';
import RecipePersonalizerPage from './pages/ai/RecipePersonalizerPage';
import SmartMealPlannerPage from './pages/ai/SmartMealPlannerPage';
import DietaryAIAdvisorPage from './pages/ai/DietaryAIAdvisorPage';
import FitnessNutritionCoachPage from './pages/ai/FitnessNutritionCoachPage';
import MoodBasedRecipes from './pages/ai/MoodBasedRecipes'; // NEW
import SmartRecipeAdaptation from './pages/ai/SmartRecipeAdaptation'; // NEW
import VoiceRecipeAssistant from './pages/ai/VoiceRecipeAssistant'; // NEW

// Tool Pages
import NutritionCalculatorPage from './pages/NutritionCalculatorPage';
import RecipeScalerPage from './pages/RecipeScalerPage';

// Placeholder Components for other tools (from ToolsPage.tsx) - keep if you don't have real files
const CookingTimerPage = () => <div>Cooking Timer Page (Coming Soon!)</div>;
const UnitConverterPage = () => <div>Unit Converter Page (Coming Soon!)</div>;
const TemperatureGuidePage = () => <div>Temperature Guide Page (Coming Soon!)</div>;
const SubstitutionGuidePage = () => <div>Substitution Guide Page (Coming Soon!)</div>;
const CookingTechniquesPage = () => <div>Cooking Techniques Page (Coming Soon!)</div>;
const QuickRecipesPage = () => <div>Quick Recipes Page (Coming Soon!)</div>;


// Meal & Health Related Pages
import MealPlanPage from './pages/MealPlanPage';
import HealthTrackingHomePage from './pages/HealthTrackingHomePage';
import PantryPage from './pages/PantryPage';
import FavoritesPage from './pages/FavoritesPage';
import BodyInformationPage from './pages/BodyInformationPage';
import MicronutrientTracker from './pages/MicronutrientTracker'; // NEW


// User Settings Sub-pages (from SettingsPage.tsx)
import AppearancePage from './pages/AppearancePage';
import DietaryPreferencesPage from './pages/DietaryPreferencesPage';
import LoyaltyProgramPage from './pages/LoyaltyProgramPage';
import SubscriptionPage from './pages/SubscriptionPage';
import PrivacyDataPage from './pages/PrivacyDataPage';
import PaymentMethodsPage from './pages/PaymentMethodsPage';
import HelpSupportPage from './pages/HelpSupportPage';
import DeleteAccountPage from './pages/DeleteAccountPage';
import ConnectedDevicesPage from './pages/ConnectedDevicesPage';

// General App Pages
import ServicesPage from './pages/ServicesPage';
import RecipesPage from './pages/RecipesPage';
import CookingMode from './pages/CookingMode';
import MainSettingsPage from './pages/MainSettingsPage';

// UI Components
import BottomToolbar from './components/layout/BottomToolbar';


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const simulateLoadingAndAdminInit = async () => {
      await new Promise(resolve => setTimeout(1000, resolve));
      setLoading(false);
      initializeAdminDemo();
    };
    simulateLoadingAndAdminInit();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    return isAdminAuthenticated() ? (
      children
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <RTLProvider>
          <AuthProvider>
            <Router>
              <div className="relative">
                <Routes>
                  {/* --- Core Application Routes --- */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/home" element={<NewHomePage />} />
                  <Route path="/recipe/:id" element={<RecipeDetailPage />} />
                  <Route path="/cooking/:id" element={<CookingMode />} />

                  {/* --- User Profile & Settings Routes --- */}
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/settings" element={<MainSettingsPage />} />
                  <Route path="/body-information" element={<BodyInformationPage />} />
                  <Route path="/appearance" element={<AppearancePage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/dietary-preferences" element={<DietaryPreferencesPage />} />
                  <Route path="/connected-devices" element={<ConnectedDevicesPage />} />
                  <Route path="/loyalty-program" element={<LoyaltyProgramPage />} />
                  <Route path="/subscription" element={<SubscriptionPage />} />
                  <Route path="/privacy" element={<PrivacyDataPage />} />
                  <Route path="/payment-methods" element={<PaymentMethodsPage />} />
                  <Route path="/help" element={<HelpSupportPage />} />
                  <Route path="/delete-account" element={<DeleteAccountPage />} />

                  {/* --- Content & Feature Pages --- */}
                  <Route path="/about" element={<AboutUsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/global-cuisine" element={<GlobalCuisinePage />} />
                  <Route path="/meal-plan" element={<MealPlanPage />} />
                  <Route path="/health-tracking-home" element={<HealthTrackingHomePage />} />
                  <Route path="/micronutrient-tracker" element={<MicronutrientTracker />} /> {/* NEW: Micronutrient Tracker */}
                  <Route path="/pantry" element={<PantryPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/recipes" element={<RecipesPage />} />

                  {/* --- AI Features Hub and Sub-pages --- */}
                  <Route path="/ai-features" element={<AIFeaturesPage />} />
                  <Route path="/ai/scan-dish" element={<ScanDishPage />} />
                  <Route path="/ai/recipe-finder" element={<AIFindByIngredientsPage />} />
                  <Route path="/ai/cooking-assistant" element={<AICookingAssistantPage />} />
                  <Route path="/ai/recipe-personalizer" element={<RecipePersonalizerPage />} />
                  <Route path="/ai/meal-planner" element={<SmartMealPlannerPage />} />
                  <Route path="/ai/dietary-advisor" element={<DietaryAIAdvisorPage />} />
                  <Route path="/ai/fitness-coach" element={<FitnessNutritionCoachPage />} />
                  <Route path="/ai/mood-recipes" element={<MoodBasedRecipes />} /> {/* NEW */}
                  <Route path="/ai/smart-adaptation" element={<SmartRecipeAdaptation />} /> {/* NEW */}
                  <Route path="/ai/voice-assistant" element={<VoiceRecipeAssistant />} /> {/* NEW */}


                  {/* --- Tools Hub and Sub-pages --- */}
                  <Route path="/tools" element={<ToolsPage />} />
                  <Route path="/tools/nutrition-calculator" element={<NutritionCalculatorPage />} />
                  <Route path="/tools/recipe-scaler" element={<RecipeScalerPage />} />
                  <Route path="/tools/cooking-timer" element={<CookingTimerPage />} />
                  <Route path="/tools/unit-converter" element={<UnitConverterPage />} />
                  <Route path="/tools/temperature-guide" element={<TemperatureGuidePage />} />
                  <Route path="/tools/substitution-guide" element={<SubstitutionGuidePage />} />
                  <Route path="/tools/cooking-techniques" element={<CookingTechniquesPage />} />
                  <Route path="/tools/quick-recipes" element={<QuickRecipesPage />} />


                  {/* --- Admin Panel Routes (Protected by AdminRoute) --- */}
                  <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="recipes" element={<AdminRecipes />} />
                    <Route path="ingredients" element={<AdminIngredients />} />
                    <Route path="ingredient-images" element={<AdminIngredientImagesManager />} />
                    <Route path="images" element={<ImageControlPage />} />
                    <Route path="analytics" element={<AdminAnalyticsPage />} />
                    <Route path="settings" element={<AdminSettingsPage />} />
                    <Route path="security" element={<AdminSecurityPage />} />
                    <Route path="integrations" element={<AdminIntegrationsPage />} />
                    <Route path="integrations-manager" element={<AdminIntegrationsManager />} />
                    <Route path="user-types" element={<AdminUserTypesPage />} />
                    <Route path="accounting" element={<AdminAccountingPage />} />
                    <Route path="system" element={<AdminSystemPage />} />
                    <Route path="maintenance" element={<AdminMaintenancePage />} />
                    <Route path="rewards" element={<AdminRewardsPage />} />
                    <Route path="communications" element={<AdminCommunicationsPage />} />
                    <Route path="advertisements" element={<AdminAdvertisementsPage />} />
                    <Route path="community" element={<CommunityPage />} />
                    <Route path="content-library" element={<ContentLibraryPage />} />
                    <Route path="translations" element={<TranslationsPage />} />
                    <Route path="languages" element={<LanguagesPage />} />
                    <Route path="notification-system" element={<AdminNotificationSystem />} />
                    <Route path="subscriptions" element={<SubscriptionsPage />} />
                    <Route path="support-tickets" element={<SupportTicketsPage />} />
                    <Route path="advertisement" element={<AdvertisementPage />} />
                  </Route>

                  {/* --- Fallback Route (404) --- */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <BottomToolbar />
              </div>
            </Router>
          </AuthProvider>
        </RTLProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
