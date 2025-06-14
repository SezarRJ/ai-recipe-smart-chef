
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
          </Routes>
          <Toaster />
        </div>
      </Router>
    </RTLProvider>
  );
};

export default App;
