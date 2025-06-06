import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { RTLProvider } from '@/contexts/RTLContext';
import { AuthProvider } from '@/contexts/AuthContext';

// Import all page components
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import NewHomePage from '@/NewHomePage';
import RecipeDetailPage from '@/pages/RecipeDetailPage';
import CookingMode from '@/pages/CookingMode';
import ProfilePage from '@/pages/ProfilePage';
import MainSettingsPage from '@/pages/MainSettingsPage';
import BodyInformationPage from '@/pages/BodyInformationPage';
import AppearancePage from '@/pages/AppearancePage';
import NotificationsPage from '@/pages/NotificationsPage';
import DietaryPreferencesPage from '@/pages/DietaryPreferencesPage';
import ConnectedDevicesPage from '@/pages/ConnectedDevicesPage';
import LoyaltyProgramPage from '@/pages/LoyaltyProgramPage';
import SubscriptionPage from '@/pages/SubscriptionPage';
import PrivacyDataPage from '@/pages/PrivacyDataPage';
import PaymentMethodsPage from '@/pages/PaymentMethodsPage';
import HelpSupportPage from '@/pages/HelpSupportPage';
import DeleteAccountPage from '@/pages/DeleteAccountPage';
import AboutUsPage from '@/pages/AboutUsPage';
import ContactPage from '@/pages/ContactPage';
import GlobalCuisinePage from '@/pages/GlobalCuisinePage';
import MealPlanPage from '@/pages/MealPlanPage';
import HealthTrackingHomePage from '@/pages/HealthTrackingHomePage';
import MicronutrientTracker from '@/components/ai/MicronutrientTracker';
import PantryPage from '@/pages/PantryPage';
import FavoritesPage from '@/pages/FavoritesPage';
import CommunityPage from '@/pages/CommunityPage';
import ServicesPage from '@/pages/ServicesPage';
import RecipesPage from '@/pages/RecipesPage';
import AIFeaturesPage from '@/pages/AIFeaturesPage';
import ScanDishPage from '@/pages/ScanDishPage';
import AIFindByIngredientsPage from '@/AIFindByIngredientsPage';
import AICookingAssistantPage from '@/components/ai/AICookingAssistantPage';
import RecipePersonalizerPage from '@/components/ai/RecipePersonalizerPage';
import SmartMealPlannerPage from '@/components/ai/SmartMealPlannerPage';
import DietaryAIAdvisorPage from '@/components/ai/DietaryAIAdvisorPage';
import FitnessNutritionCoachPage from '@/components/ai/FitnessNutritionCoachPage';
import MoodBasedRecipes from '@/components/ai/MoodBasedRecipes';
import SmartRecipeAdaptation from '@/components/ai/SmartRecipeAdaptation';
import VoiceRecipeAssistantPage from '@/components/ai/VoiceRecipeAssistant';
import ToolsPage from '@/pages/ToolsPage';
import NutritionCalculatorPage from '@/pages/admin/AdminAnalyticsPage';
import RecipeScalerPage from '@/pages/admin/AdminRecipesPage';
import CookingTimerPage from '@/pages/admin/AdminSettingsPage';
import UnitConverterPage from '@/pages/admin/AdminUsersPage';
import TemperatureGuidePage from '@/pages/admin/AdminSystemPage';
import SubstitutionGuidePage from '@/pages/admin/AdminSecurityPage';
import CookingTechniquesPage from '@/pages/admin/AdminMaintenancePage';
import QuickRecipesPage from '@/pages/admin/AdminRewardsPage';
import AdminRoute from '@/components/admin/AdminAuthGuard';
import AdminPage from '@/pages/AdminPage';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminRecipes from '@/pages/admin/AdminRecipes';
import AdminIngredients from '@/pages/admin/AdminIngredientsPage';
import AdminIngredientImagesManager from '@/components/AdminIngredientImagesManager';
import ImageControlPage from '@/pages/admin/ImageControlPage';
import AdminAnalyticsPage from '@/pages/admin/AdminAnalyticsPage';
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage';
import AdminSecurityPage from '@/pages/admin/AdminSecurityPage';
import AdminIntegrationsPage from '@/pages/admin/AdminIntegrationsPage';
import AdminIntegrationsManager from '@/pages/admin/AdminIntegrationsManager';
import AdminUserTypesPage from '@/pages/admin/AdminUserTypesPage';
import AdminAccountingPage from '@/pages/admin/AdminAccountingPage';
import AdminSystemPage from '@/pages/admin/AdminSystemPage';
import AdminMaintenancePage from '@/pages/admin/AdminMaintenancePage';
import AdminRewardsPage from '@/pages/admin/AdminRewardsPage';
import AdminCommunicationsPage from '@/pages/admin/AdminCommunicationsPage';
import AdminAdvertisementsPage from '@/pages/admin/AdminAdvertisementsPage';
import ContentLibraryPage from '@/pages/admin/ContentLibraryPage';
import TranslationsPage from '@/pages/admin/TranslationsPage';
import LanguagesPage from '@/pages/admin/LanguagesPage';
import AdminNotificationSystem from '@/pages/admin/AdminNotificationSystem';
import SubscriptionsPage from '@/pages/admin/SubscriptionsPage';
import SupportTicketsPage from '@/pages/admin/SupportTicketsPage';
import AdvertisementPage from '@/pages/admin/AdvertisementPage';
import NotFoundPage from '@/pages/NotFoundPage';
import BottomToolbar from '@/components/layout/BottomToolbar';

// --- NEW Placeholder Components for Health & Wellness Features ---
const NutritionTrackingPage = () => <div>Nutrition Tracking Page (Coming Soon!)</div>;
const WeightManagementPage = () => <div>Weight Management Page (Coming Soon!)</div>;
const ActivityMonitorPage = () => <div>Activity Monitor Page (Coming Soon!)</div>;
const HealthGoalsPage = () => <div>Health Goals Page (Coming Soon!)</div>;
const MealTimingPage = () => <div>Meal Timing Page (Coming Soon!)</div>;

// Default recipe for VoiceRecipeAssistant
const defaultRecipe = {
  title: "Sample Recipe",
  instructions: [
    "Prepare your ingredients",
    "Follow the cooking steps",
    "Enjoy your meal"
  ]
};

const App = () => {
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
                  <Route path="/micronutrient-tracker" element={<MicronutrientTracker />} />
                  <Route path="/pantry" element={<PantryPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/recipes" element={<RecipesPage />} />

                  {/* --- Health & Wellness Feature Routes --- */}
                  <Route path="/health/nutrition-tracking" element={<NutritionTrackingPage />} />
                  <Route path="/health/weight-management" element={<WeightManagementPage />} />
                  <Route path="/health/activity-monitor" element={<ActivityMonitorPage />} />
                  <Route path="/health/health-goals" element={<HealthGoalsPage />} />
                  <Route path="/health/meal-timing" element={<MealTimingPage />} />
                  <Route path="/nutrition-goals" element={<NutritionGoalsPage />} />
                  <Route path="/meal-timing" element={<MealTimingPage />} />
                  <Route path="/micronutrient-tracker" element={<MicronutrientTracker />} />

                  {/* --- AI Features Hub and Sub-pages --- */}
                  <Route path="/ai-features" element={<AIFeaturesPage />} />
                  <Route path="/ai/scan-dish" element={<ScanDishPage />} />
                  <Route path="/ai/recipe-finder" element={<AIFindByIngredientsPage />} />
                  <Route path="/ai-find-by-ingredients" element={<AIFindByIngredientsPage />} />
                  <Route path="/ai/cooking-assistant" element={<AICookingAssistantPage />} />
                  <Route path="/ai/recipe-personalizer" element={<RecipePersonalizerPage />} />
                  <Route path="/ai/meal-planner" element={<SmartMealPlannerPage />} />
                  <Route path="/ai/dietary-advisor" element={<DietaryAIAdvisorPage />} />
                  <Route path="/ai/fitness-coach" element={<FitnessNutritionCoachPage />} />
                  <Route path="/ai/mood-recipes" element={<MoodBasedRecipes />} />
                  <Route path="/ai/smart-adaptation" element={<SmartRecipeAdaptation />} />
                  <Route path="/ai/voice-assistant" element={<VoiceRecipeAssistantPage recipe={defaultRecipe} />} />

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
