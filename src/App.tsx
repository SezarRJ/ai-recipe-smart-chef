import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RTLProvider } from '@/contexts/RTLContext';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/Index';
import GlobalCuisinePage from '@/pages/GlobalCuisinePage';
import AIFeaturesPage from '@/pages/AIFeaturesPage';
import HealthTrackingHomePage from '@/pages/HealthTrackingHomePage';
import SettingsPage from '@/pages/SettingsPage';
import AlcoholRecipeAI from '@/pages/AlcoholRecipeAI';
import AIFindByIngredientsPage from '@/pages/AIFindByIngredientsPage';
import ServicesPage from '@/pages/ServicesPage';
import SubscriptionPage from '@/pages/SubscriptionPage';
import LoyaltyProgramPage from '@/pages/LoyaltyProgramPage';
import ProfilePage from '@/pages/ProfilePage';
import NotificationsPage from '@/pages/NotificationsPage';
import LanguagePage from '@/pages/LanguagePage';
import AppearancePage from '@/pages/AppearancePage';
import SoundSettingsPage from '@/pages/SoundSettingsPage';
import AppPreferencesPage from '@/pages/AppPreferencesPage';
import PrivacyPage from '@/pages/PrivacyPage';
import HelpPage from '@/pages/HelpPage';
import RateAppPage from '@/pages/RateAppPage';
import ScanDishPage from "@/pages/ScanDishPage";
import VoiceAssistantPage from "@/pages/VoiceAssistantPage";
import RecipePersonalizerPage from "@/pages/RecipePersonalizerPage";
import SmartMealPlannerPage from "@/components/ai/SmartMealPlannerPage";
import SmartShoppingListsPage from "@/pages/SmartShoppingListsPage";
import MealPlanningServicePage from "@/pages/MealPlanningServicePage";

const App = () => {
  return (
    <RTLProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-wasfah-light-gray to-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/global-cuisine" element={<GlobalCuisinePage />} />
            <Route path="/ai-features" element={<AIFeaturesPage />} />
            <Route path="/health-tracking-home" element={<HealthTrackingHomePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/alcohol-drinks" element={<AlcoholRecipeAI />} />
            <Route path="/ai-find-by-ingredients" element={<AIFindByIngredientsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/loyalty-program" element={<LoyaltyProgramPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/language" element={<LanguagePage />} />
            <Route path="/appearance" element={<AppearancePage />} />
            <Route path="/sound-settings" element={<SoundSettingsPage />} />
            <Route path="/app-preferences" element={<AppPreferencesPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/rate-app" element={<RateAppPage />} />
            {/* ADDED AI SERVICE ROUTES */}
            <Route path="/scan-dish" element={<ScanDishPage />} />
            <Route path="/voice-assistant" element={<VoiceAssistantPage />} />
            <Route path="/recipe-personalizer" element={<RecipePersonalizerPage />} />
            <Route path="/smart-meal-planner" element={<SmartMealPlannerPage />} />
            <Route path="/smart-shopping-lists" element={<SmartShoppingListsPage />} />
            <Route path="/meal-planning-service" element={<MealPlanningServicePage />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </RTLProvider>
  );
};

export default App;
