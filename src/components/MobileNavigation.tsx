
import { useState, useEffect } from "react";
import { Home, Search, Calendar, ShoppingBag, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const MobileNavigation = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("home");
  const { t } = useLanguage();

  useEffect(() => {
    // Update active tab based on current route
    const path = location.pathname;
    if (path === "/") setActiveTab("home");
    else if (path === "/explore") setActiveTab("explore");
    else if (path === "/meal-planning") setActiveTab("meal-planning");
    else if (path === "/pantry") setActiveTab("pantry");
    else if (path === "/profile" || path === "/settings" || path === "/health-information" || path === "/dietary-preferences") setActiveTab("profile");
  }, [location.pathname]);

  const navItems = [
    {
      id: "home",
      path: "/",
      icon: Home,
      label: t("nav.home"),
    },
    {
      id: "explore",
      path: "/explore",
      icon: Search,
      label: t("nav.explore"),
    },
    {
      id: "meal-planning",
      path: "/meal-planning",
      icon: Calendar,
      label: t("nav.mealPlan"),
    },
    {
      id: "pantry",
      path: "/pantry",
      icon: ShoppingBag,
      label: t("nav.pantry"),
    },
    {
      id: "profile",
      path: "/profile",
      icon: User,
      label: t("nav.profile"),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden">
      <div className="flex justify-around items-center h-16 px-2 safe-area-pb">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Link 
              key={item.id}
              to={item.path} 
              className={`flex flex-col items-center justify-center flex-1 py-2 px-1 transition-colors ${
                isActive ? "text-wasfah-orange" : "text-gray-500"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={20} className={isActive ? "text-wasfah-orange" : ""} />
              <span className="text-xs mt-1 font-medium truncate max-w-full">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
