
import { useState } from "react";
import { Home, Search, Calendar, ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";

export const MobileNavigation = () => {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="flex justify-around items-center h-16 px-4">
        <Link 
          to="/" 
          className={`flex flex-col items-center ${activeTab === "home" ? "text-wasfah-orange" : "text-gray-500"}`}
          onClick={() => handleTabChange("home")}
        >
          <Home size={22} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link 
          to="/explore" 
          className={`flex flex-col items-center ${activeTab === "explore" ? "text-wasfah-orange" : "text-gray-500"}`}
          onClick={() => handleTabChange("explore")}
        >
          <Search size={22} />
          <span className="text-xs mt-1">Explore</span>
        </Link>
        
        <Link 
          to="/meal-planning" 
          className={`flex flex-col items-center ${activeTab === "meal-planning" ? "text-wasfah-orange" : "text-gray-500"}`}
          onClick={() => handleTabChange("meal-planning")}
        >
          <Calendar size={22} />
          <span className="text-xs mt-1">Meal Plan</span>
        </Link>
        
        <Link 
          to="/pantry" 
          className={`flex flex-col items-center ${activeTab === "pantry" ? "text-wasfah-orange" : "text-gray-500"}`}
          onClick={() => handleTabChange("pantry")}
        >
          <ShoppingBag size={22} />
          <span className="text-xs mt-1">Pantry</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex flex-col items-center ${activeTab === "profile" ? "text-wasfah-orange" : "text-gray-500"}`}
          onClick={() => handleTabChange("profile")}
        >
          <User size={22} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};
