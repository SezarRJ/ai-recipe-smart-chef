
import React, { Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { RTLProvider } from '@/contexts/RTLContext';
import { supabase } from './integrations/supabase/client';
import { useUserHealth } from '@/hooks/useUserHealth';
import SmartToolsPage from './pages/SmartToolsPage';
import MealTimingPage from './pages/MealTimingPage';

const HomePage = React.lazy(() => import('@/pages/HomePage'));
const RecipesPage = React.lazy(() => import('@/pages/RecipesPage'));
const CookingMode = React.lazy(() => import('@/pages/CookingMode'));
const AIFindByIngredientsPage = React.lazy(() => import('@/pages/AIFindByIngredientsPage'));
const NutritionGoalsPage = React.lazy(() => import('@/pages/NutritionGoalsPage'));
const HealthTrackingPage = React.lazy(() => import('@/pages/HealthTrackingPage'));
const BodyInformationPage = React.lazy(() => import('@/pages/BodyInformationPage'));
const DietaryPreferencesPage = React.lazy(() => import('@/pages/DietaryPreferencesPage'));

function App() {
  const [session, setSession] = useState(null);
	const {
		isHealthGoalsOpen,
		setIsHealthGoalsOpen,
		userWeight,
		setUserWeight,
		userHeight,
		setUserHeight,
		userTargetWeight,
		setUserTargetWeight,
	} = useUserHealth();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <RTLProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wasfah-orange mx-auto"></div></div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/cooking-mode/:id" element={<CookingMode />} />
            <Route path="/ai-find-by-ingredients" element={<AIFindByIngredientsPage />} />
            <Route path="/nutrition-goals" element={<NutritionGoalsPage />} />
            <Route path="/health-tracking" element={<HealthTrackingPage />} />
            <Route path="/body-information" element={<BodyInformationPage />} />
            <Route path="/dietary-preferences" element={<DietaryPreferencesPage />} />
            <Route path="/smart-tools" element={<SmartToolsPage />} />
            <Route path="/meal-timing" element={<MealTimingPage />} />
          </Routes>
        </Suspense>
        <Toaster />
      </Router>
    </RTLProvider>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default App;
