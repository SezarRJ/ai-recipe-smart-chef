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
import { initializeAdminDemo, isAdminAuthenticated } from './lib/adminAuth'; // Assuming this correctly handles admin auth state

// --- Import ALL your pages ---
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
import AdminPage from './pages/AdminPage'; // Admin Layout/Shell

// Admin Dashboard & Sub-pages
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

// AI & Tool Related Pages
import AIFindByIngredientsPage from './pages/AIFindByIngredientsPage';
import ScanDishPage from './pages/ScanDishPage';
import GlobalCuisinePage from './pages/GlobalCuisinePage';
import AIFeaturesPage from './pages/AIFeaturesPage'; // AI Features Hub
import ToolsPage from './pages/ToolsPage'; // Tools Hub (e.g., Recipe Scaler, Nutrition Calc)

// Meal & Health Related Pages
import MealPlanPage from './pages/MealPlanPage';
import HealthTrackingHomePage from './pages/HealthTrackingHomePage';
import PantryPage from './pages/PantryPage';
import FavoritesPage from './pages/FavoritesPage';

// User Settings Sub-pages (from SettingsPage.tsx)
import BodyInformationPage from './pages/BodyInformationPage'; // NEW
import AppearancePage from './pages/AppearancePage';
import DietaryPreferencesPage from './pages/DietaryPreferencesPage';
import LoyaltyProgramPage from './pages/LoyaltyProgramPage';
import SubscriptionPage from './pages/SubscriptionPage'; // User-facing subscription management
import PrivacyDataPage from './pages/PrivacyDataPage';
import PaymentMethodsPage from './pages/PaymentMethodsPage';
import HelpSupportPage from './pages/HelpSupportPage';
import DeleteAccountPage from './pages/DeleteAccountPage';
import ConnectedDevicesPage from './pages/ConnectedDevicesPage';

// General App Pages
import ServicesPage from './pages/ServicesPage';
import RecipesPage from './pages/RecipesPage';
import CookingMode from './pages/CookingMode';

// UI Components
import BottomToolbar from './components/layout/BottomToolbar';

// Import NEW pages for tools & AI features
import NutritionCalculatorPage from './pages/NutritionCalculatorPage';
import RecipeScalerPage from './pages/RecipeScalerPage';

// Placeholder/Coming Soon Components for new AI Features (if not yet built)
// Create these files in src/pages/ai/ if you want to organize them this way
// For now, inline div elements are used, but dedicated components are better.
const AICookingAssistantPage = () => <div>AI Cooking Assistant Page (Coming Soon!)</div>;
const RecipePersonalizerPage = () => <div>AI Recipe Personalizer Page (Coming Soon!)</div>;
const SmartMealPlannerPage = () => <div>AI Smart Meal Planner Page (Coming Soon!)</div>;
const DietaryAIAdvisorPage = () => <div>AI Dietary Advisor Page (Coming Soon!)</div>;
const FitnessNutritionCoachPage = () => <div>AI Fitness & Nutrition Coach Page (Coming Soon!)</div>;

// Placeholder/Coming Soon Components for other tools (from ToolsPage.tsx)
const CookingTimerPage = () => <div>Cooking Timer Page (Coming Soon!)</div>;
const UnitConverterPage = () => <div>Unit Converter Page (Coming Soon!)</div>;
const TemperatureGuidePage = () => <div>Temperature Guide Page (Coming Soon!)</div>;
const SubstitutionGuidePage = () => <div>Substitution Guide Page (Coming Soon!)</div>;
const CookingTechniquesPage = () => <div>Cooking Techniques Page (Coming Soon!)</div>;
const QuickRecipesPage = () => <div>Quick Recipes Page (Coming Soon!)</div>;


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Initialize admin demo accounts (as per your existing code)
    initializeAdminDemo();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Admin Route Guard
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
                  <Route path="/home" element={<NewHomePage />} /> {/* Main user home page */}
                  <Route path="/recipe/:id" element={<RecipeDetailPage />} />
                  <Route path="/cooking/:id" element={<CookingMode />} />

                  {/* --- User Profile & Settings Routes --- */}
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/settings" element={<SettingsPage />} /> {/* Your settings hub */}
                  <Route path="/body-information" element={<BodyInformationPage />} /> {/* New: Body Info */}
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
                  <Route path="/pantry" element={<PantryPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/community" element={<CommunityPage />} /> {/* User-facing community */}
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/recipes" element={<RecipesPage />} />

                  {/* --- AI Features Hub and Sub-pages --- */}
                  <Route path="/ai-features" element={<AIFeaturesPage />} /> {/* AI Features Hub */}
                  <Route path="/ai/scan-dish" element={<ScanDishPage />} /> {/* Direct path from AI Features */}
                  <Route path="/ai/recipe-finder" element={<AIFindByIngredientsPage />} /> {/* Direct path from AI Features */}
                  {/* New AI Features routes (from AIFeaturesPage) */}
                  <Route path="/ai/cooking-assistant" element={<AICookingAssistantPage />} />
                  <Route path="/ai/recipe-personalizer" element={<RecipePersonalizerPage />} />
                  <Route path="/ai/meal-planner" element={<SmartMealPlannerPage />} />
                  <Route path="/ai/dietary-advisor" element={<DietaryAIAdvisorPage />} />
                  <Route path="/ai/fitness-coach" element={<FitnessNutritionCoachPage />} />


                  {/* --- Tools Hub and Sub-pages --- */}
                  <Route path="/tools" element={<ToolsPage />} /> {/* Tools Hub (New in prev response) */}
                  <Route path="/tools/nutrition-calculator" element={<NutritionCalculatorPage />} /> {/* New: Nutrition Calc */}
                  <Route path="/tools/recipe-scaler" element={<RecipeScalerPage />} /> {/* New: Recipe Scaler */}
                  {/* Other tools from ToolsPage.tsx */}
                  <Route path="/tools/cooking-timer" element={<CookingTimerPage />} />
                  <Route path="/tools/unit-converter" element={<UnitConverterPage />} />
                  <Route path="/tools/temperature-guide" element={<TemperatureGuidePage />} />
                  <Route path="/tools/substitution-guide" element={<SubstitutionGuidePage />} />
                  <Route path="/tools/cooking-techniques" element={<CookingTechniquesPage />} />
                  <Route path="/tools/quick-recipes" element={<QuickRecipesPage />} />


                  {/* --- Admin Panel Routes (Protected by AdminRoute) --- */}
                  <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>}>
                    <Route index element={<AdminDashboard />} /> {/* Default admin route */}
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
                    <Route path="community" element={<CommunityPage />} /> {/* Admin view of community? */}
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
                <BottomToolbar /> {/* This toolbar is likely present on most user-facing pages */}
              </div>
            </Router>
          </AuthProvider>
        </RTLProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
