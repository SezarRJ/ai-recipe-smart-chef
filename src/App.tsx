import React, { Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { ThemeProvider } from '@/components/theme-provider';
import { RTLProvider } from '@/contexts/RTLContext';
import { Auth } from '@supabase/ui';
import { supabase } from './integrations/supabase/client';
import { PageLoader } from '@/components/layout/PageLoader';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import { TermsOfServicePage } from '@/pages/TermsOfServicePage';
import { ContactUsPage } from '@/pages/ContactUsPage';
import { AboutUsPage } from '@/pages/AboutUsPage';
import { useUserHealth } from '@/hooks/useUserHealth';
import SmartToolsPage from './pages/SmartToolsPage';
import MealTimingPage from './pages/MealTimingPage';

const HomePage = React.lazy(() => import('@/pages/HomePage'));
const RecipePage = React.lazy(() => import('@/pages/RecipePage'));
const RecipesPage = React.lazy(() => import('@/pages/RecipesPage'));
const CookingMode = React.lazy(() => import('@/pages/CookingMode'));
const AIFindByIngredientsPage = React.lazy(() => import('@/pages/AIFindByIngredientsPage'));
const HealthDashboardPage = React.lazy(() => import('@/pages/HealthDashboardPage'));
const NutritionGoalsPage = React.lazy(() => import('@/pages/NutritionGoalsPage'));
const HealthTrackingPage = React.lazy(() => import('@/pages/HealthTrackingPage'));
const BodyInformationPage = React.lazy(() => import('@/pages/BodyInformationPage'));
const DietaryPreferencesPage = React.lazy(() => import('@/pages/DietaryPreferencesPage'));

function App() {
  const { toast } = useToast();
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
    <ThemeProvider defaultTheme="system" storageKey="vite-react-theme">
      <RTLProvider>
        <Router>
          <ScrollToTop />
          <SiteHeader />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/recipe/:id" element={<RecipePage />} />
              <Route path="/recipes" element={<RecipesPage />} />
              <Route path="/cooking-mode/:id" element={<CookingMode />} />
              <Route path="/ai-find-by-ingredients" element={<AIFindByIngredientsPage />} />
              <Route path="/health-dashboard" element={<HealthDashboardPage />} />
              <Route path="/nutrition-goals" element={<NutritionGoalsPage />} />
              <Route path="/health-tracking" element={<HealthTrackingPage />} />
              <Route path="/body-information" element={<BodyInformationPage />} />
              <Route path="/dietary-preferences" element={<DietaryPreferencesPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/smart-tools" element={<SmartToolsPage />} />
              <Route path="/meal-timing" element={<MealTimingPage />} />
            </Routes>
          </Suspense>
          <SiteFooter />
        </Router>
        <Toaster />
      </RTLProvider>
    </ThemeProvider>
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
