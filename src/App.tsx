
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
import AuthPage from "@/pages/AuthPage";
import Index from "@/pages/Index";
import SplashScreen from "@/pages/SplashScreen";

// Main App Pages
import NewHomePage from "@/pages/NewHomePage";
import RecipesPage from "@/pages/RecipesPage";
import RecipeDetailPage from "@/pages/RecipeDetailPage";
import ProfilePage from "@/pages/ProfilePage";
import MenuPage from "@/pages/MenuPage";
import SettingsPage from "@/pages/SettingsPage";
import SystemSettingsPage from "@/pages/SystemSettingsPage";
import MainSettingsPage from "@/pages/MainSettingsPage";

// Feature Pages
import GlobalCuisinePage from "@/pages/GlobalCuisinePage";
import AIFeaturesPage from "@/pages/AIFeaturesPage";
import HealthTrackingPage from "@/pages/HealthTrackingPage";
import HealthTrackingHomePage from "@/pages/HealthTrackingHomePage";
import CreateRecipePage from "@/pages/CreateRecipePage";

// Admin Pages
import AdminPage from "@/pages/AdminPage";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsersPage from "@/pages/admin/AdminUsersPage";
import AdminRecipesPage from "@/pages/admin/AdminRecipesPage";
import AdminIngredientsPage from "@/pages/admin/AdminIngredientsPage";
import AdminTranslationsPage from "@/pages/admin/AdminTranslationsPage";
import AdminLanguagePage from "@/pages/admin/AdminLanguagePage";
import AdminUserTypePage from "@/pages/admin/AdminUserTypePage";
import AdminSubscriptionPage from "@/pages/admin/AdminSubscriptionPage";
import AdminSystemPage from "@/pages/admin/AdminSystemPage";
import AdminMaintenancePage from "@/pages/admin/AdminMaintenancePage";
import AdminSupportTicketsPage from "@/pages/admin/AdminSupportTicketsPage";
import AdminContentLibraryPage from "@/pages/admin/AdminContentLibraryPage";
import AdminIconsManagerPage from "@/pages/admin/AdminIconsManagerPage";
import AdminCommunityManagementPage from "@/pages/admin/AdminCommunityManagementPage";
import AdminRewardsPage from "@/pages/admin/AdminRewardsPage";
import AdminAnalyticsPage from "@/pages/admin/AdminAnalyticsPage";
import AdminCommunicationsPage from "@/pages/admin/AdminCommunicationsPage";
import AdminSecurityPage from "@/pages/admin/AdminSecurityPage";
import AdminSettingsPage from "@/pages/admin/AdminSettingsPage";
import AdminAccountingPage from "@/pages/admin/AdminAccountingPage";
import AdminIntegrationsPage from "@/pages/admin/AdminIntegrationsPage";
import AdminNotificationsPage from "@/pages/admin/AdminNotificationsPage";

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
                    {/* Root redirect */}
                    <Route path="/" element={<Index />} />
                    
                    {/* Language-based routes */}
                    <Route path="/:lang" element={<Index />} />
                    <Route path="/:lang/auth" element={<AuthPage />} />
                    <Route path="/:lang/splash" element={<SplashScreen />} />
                    <Route path="/:lang/home" element={<NewHomePage />} />
                    <Route path="/:lang/recipes" element={<RecipesPage />} />
                    <Route path="/:lang/recipe/:id" element={<RecipeDetailPage />} />
                    <Route path="/:lang/profile" element={<ProfilePage />} />
                    <Route path="/:lang/menu" element={<MenuPage />} />
                    <Route path="/:lang/settings" element={<MainSettingsPage />} />
                    <Route path="/:lang/quick-settings" element={<SettingsPage />} />
                    <Route path="/:lang/system-settings" element={<SystemSettingsPage />} />
                    <Route path="/:lang/global-cuisine" element={<GlobalCuisinePage />} />
                    <Route path="/:lang/ai-features" element={<AIFeaturesPage />} />
                    <Route path="/:lang/health-tracking" element={<HealthTrackingPage />} />
                    <Route path="/:lang/health-tracking-home" element={<HealthTrackingHomePage />} />
                    <Route path="/:lang/create-recipe" element={<CreateRecipePage />} />
                    
                    {/* Non-language routes (fallback) */}
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/splash" element={<SplashScreen />} />
                    <Route path="/home" element={<NewHomePage />} />
                    <Route path="/recipes" element={<RecipesPage />} />
                    <Route path="/recipe/:id" element={<RecipeDetailPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/settings" element={<MainSettingsPage />} />
                    <Route path="/quick-settings" element={<SettingsPage />} />
                    <Route path="/system-settings" element={<SystemSettingsPage />} />
                    <Route path="/global-cuisine" element={<GlobalCuisinePage />} />
                    <Route path="/ai-features" element={<AIFeaturesPage />} />
                    <Route path="/health-tracking" element={<HealthTrackingPage />} />
                    <Route path="/health-tracking-home" element={<HealthTrackingHomePage />} />
                    <Route path="/create-recipe" element={<CreateRecipePage />} />
                    
                    {/* System Settings Routes */}
                    <Route path="/:lang/subscription" element={<div className="p-8 text-center">Subscription page coming soon...</div>} />
                    <Route path="/:lang/loyalty-program" element={<div className="p-8 text-center">Loyalty Program page coming soon...</div>} />
                    <Route path="/:lang/favorites" element={<div className="p-8 text-center">Favorites page coming soon...</div>} />
                    <Route path="/:lang/my-recipes" element={<div className="p-8 text-center">My Recipes page coming soon...</div>} />
                    <Route path="/:lang/preferences" element={<div className="p-8 text-center">Preferences page coming soon...</div>} />
                    <Route path="/:lang/dietary-preferences" element={<div className="p-8 text-center">Dietary Preferences page coming soon...</div>} />
                    <Route path="/:lang/body-information" element={<div className="p-8 text-center">Body Information page coming soon...</div>} />
                    <Route path="/:lang/connected-devices" element={<div className="p-8 text-center">Connected Devices page coming soon...</div>} />
                    <Route path="/:lang/privacy" element={<div className="p-8 text-center">Privacy & Data page coming soon...</div>} />
                    <Route path="/:lang/payment-methods" element={<div className="p-8 text-center">Payment Methods page coming soon...</div>} />
                    <Route path="/:lang/help" element={<div className="p-8 text-center">Help & Support page coming soon...</div>} />
                    <Route path="/:lang/notifications" element={<div className="p-8 text-center">Notifications page coming soon...</div>} />
                    <Route path="/:lang/appearance" element={<div className="p-8 text-center">Appearance page coming soon...</div>} />
                    <Route path="/:lang/delete-account" element={<div className="p-8 text-center">Delete Account page coming soon...</div>} />
                    
                    {/* Non-language system routes */}
                    <Route path="/subscription" element={<div className="p-8 text-center">Subscription page coming soon...</div>} />
                    <Route path="/loyalty-program" element={<div className="p-8 text-center">Loyalty Program page coming soon...</div>} />
                    <Route path="/favorites" element={<div className="p-8 text-center">Favorites page coming soon...</div>} />
                    <Route path="/my-recipes" element={<div className="p-8 text-center">My Recipes page coming soon...</div>} />
                    <Route path="/preferences" element={<div className="p-8 text-center">Preferences page coming soon...</div>} />
                    <Route path="/dietary-preferences" element={<div className="p-8 text-center">Dietary Preferences page coming soon...</div>} />
                    <Route path="/body-information" element={<div className="p-8 text-center">Body Information page coming soon...</div>} />
                    <Route path="/connected-devices" element={<div className="p-8 text-center">Connected Devices page coming soon...</div>} />
                    <Route path="/privacy" element={<div className="p-8 text-center">Privacy & Data page coming soon...</div>} />
                    <Route path="/payment-methods" element={<div className="p-8 text-center">Payment Methods page coming soon...</div>} />
                    <Route path="/help" element={<div className="p-8 text-center">Help & Support page coming soon...</div>} />
                    <Route path="/notifications" element={<div className="p-8 text-center">Notifications page coming soon...</div>} />
                    <Route path="/appearance" element={<div className="p-8 text-center">Appearance page coming soon...</div>} />
                    <Route path="/delete-account" element={<div className="p-8 text-center">Delete Account page coming soon...</div>} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminPage />}>
                      <Route index element={<AdminDashboard />} />
                      <Route path="users" element={<AdminUsersPage />} />
                      <Route path="user-types" element={<AdminUserTypePage />} />
                      <Route path="recipes" element={<AdminRecipesPage />} />
                      <Route path="ingredients" element={<AdminIngredientsPage />} />
                      <Route path="translations" element={<AdminTranslationsPage />} />
                      <Route path="languages" element={<AdminLanguagePage />} />
                      <Route path="subscriptions" element={<AdminSubscriptionPage />} />
                      <Route path="accounting" element={<AdminAccountingPage />} />
                      <Route path="rewards" element={<AdminRewardsPage />} />
                      <Route path="integrations" element={<AdminIntegrationsPage />} />
                      <Route path="system" element={<AdminSystemPage />} />
                      <Route path="analytics" element={<AdminAnalyticsPage />} />
                      <Route path="communications" element={<AdminCommunicationsPage />} />
                      <Route path="support" element={<AdminSupportTicketsPage />} />
                      <Route path="community" element={<AdminCommunityManagementPage />} />
                      <Route path="notifications" element={<AdminNotificationsPage />} />
                      <Route path="content-library" element={<AdminContentLibraryPage />} />
                      <Route path="icons-manager" element={<AdminIconsManagerPage />} />
                      <Route path="security" element={<AdminSecurityPage />} />
                      <Route path="maintenance" element={<AdminMaintenancePage />} />
                      <Route path="settings" element={<AdminSettingsPage />} />
                    </Route>
                    
                    {/* Fallback route */}
                    <Route path="*" element={<Navigate to="/en/home" replace />} />
                  </Routes>
                  <BottomToolbar />
                </div>
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </RTLProvider>
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
