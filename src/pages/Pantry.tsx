
import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Plus, ShoppingBag } from "lucide-react";

const Pantry = () => {
  const { t } = useLanguage();
  
  // Placeholder pantry items
  const pantryCategories = [
    {
      name: "Fridge",
      items: [
        { name: "Milk", quantity: "1L", expiry: "2025-05-30" },
        { name: "Eggs", quantity: "6", expiry: "2025-05-28" },
        { name: "Cheese", quantity: "200g", expiry: "2025-06-05" }
      ]
    },
    {
      name: "Cupboard",
      items: [
        { name: "Rice", quantity: "2kg", expiry: "2025-12-31" },
        { name: "Pasta", quantity: "500g", expiry: "2025-11-15" },
        { name: "Flour", quantity: "1kg", expiry: "2025-10-20" }
      ]
    },
    {
      name: "Spices",
      items: [
        { name: "Salt", quantity: "500g", expiry: "2026-05-30" },
        { name: "Pepper", quantity: "100g", expiry: "2026-04-15" },
        { name: "Cumin", quantity: "50g", expiry: "2026-03-20" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20">
      <div className="pt-4 px-4 pb-2">
        <h1 className="text-3xl font-display font-bold">{t("nav.pantry")}</h1>
        <p className="text-gray-600">Manage your ingredients and reduce waste</p>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-display font-semibold">My Pantry</h2>
          <button className="flex items-center space-x-1 bg-wasfah-orange text-white px-3 py-1 rounded-lg text-sm">
            <Plus size={16} />
            <span>Add Item</span>
          </button>
        </div>
        
        {pantryCategories.map((category) => (
          <div key={category.name} className="mb-6">
            <h3 className="font-medium text-gray-700 mb-2">{category.name}</h3>
            
            <div className="bg-white rounded-xl shadow-md">
              {category.items.map((item, index) => (
                <div 
                  key={item.name} 
                  className={`flex justify-between items-center p-4 ${
                    index !== category.items.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">Expires: {item.expiry}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm">{item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-wasfah-orange to-wasfah-green text-white py-3 rounded-xl font-semibold mt-4">
          <ShoppingBag size={18} />
          <span>Generate Shopping List</span>
        </button>
      </div>
      
      <MobileNavigation />
    </div>
  );
};

export default Pantry;
