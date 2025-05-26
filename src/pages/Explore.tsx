import { MobileNavigation } from "@/components/MobileNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, X } from "lucide-react";
import { motion } from "framer-motion";

// --- Data Definitions ---
const categoriesData = [
 {
 id: "food",
 name: "Food",
 subcategories: ["Main Dishes", "Appetizers", "Pickles", "Soups", "Sauces", "Others"]
 },
 {
 id: "desserts",
 name: "Desserts",
 subcategories: ["Traditional", "Western", "Pastries", "Ice Cream", "Others"]
 },
 {
 id: "drinks",
 name: "Drinks",
 subcategories: ["Detox", "Cocktails", "Alcoholic", "Hot Drinks", "Others"]
 }
];

const dietaryFilters = ["Normal", "Healthy", "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Low-Carb"];
const timeFilters = ["Under 30 mins", "Under 1 hour", "Over 1 hour"];
const difficultyFilters = ["Beginner", "Intermediate", "Expert"];
const cuisineFilters = ["Levant", "Italian", "Mexican", "Chinese", "Indian", "Japanese", "Thai", "Turkish", "Syrian", "Iraqi", "Yemeni", "American", "Moroccan", "Lebanese", "German"];
const allergenFilters = ["Dairy", "Gluten", "Tree Nuts", "Shellfish", "Soy", "Eggs"];
const mealTypeFilters = ["Any Meal", "Breakfast", "Lunch", "Dinner", "Dessert", "Snack"];
const religionFilters = ["Halal", "Kosher"];
const healthGoalFilters = ["Low Calorie", "Low Carb", "High Protein", "Low Fat"];

const units = ["piece", "g", "kg", "ml", "l", "cup", "tbsp", "tsp"];

// --- Helper Components ---
const AnimatedCard = ({ category, onSelect, selected }: { category: (typeof categoriesData)[0]; onSelect: (id: string) => void; selected: boolean }) => (
 <motion.div
 className="cursor-pointer rounded-lg shadow-md overflow-hidden"
 onClick={() => onSelect(category.id)}
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 animate={{ backgroundColor: selected ? "#f97316" : "#fff", color: selected ? "#fff" : "#333" }}
 transition={{ duration: 0.2 }}
 >
 <div className="p-6">
 <h3 className="font-semibold text-xl mb-2 text-center">{category.name}</h3>
 <p className="text-gray-600 text-sm text-center">({category.subcategories.join(", ")})</p>
 </div>
 </motion.div>
);

const IngredientInput = ({ ingredient, onChange, onRemove }: { ingredient: { id: string; name: string; quantity: string; unit: string }; onChange: (id: string, field: string, value: string) => void; onRemove: (id: string) => void }) => (
 <div key={ingredient.id} className="flex items-center gap-2 mb-2">
 <Input
 type="text"
 placeholder="Ingredient"
 value={ingredient.name}
 onChange={(e) => onChange(ingredient.id, 'name', e.target.value)}
 className="flex-1"
 />
 <Input
 type="number"
 placeholder="Qty"
 value={ingredient.quantity}
 onChange={(e) => onChange(ingredient.id, 'quantity', e.target.value)}
 className="w-24"
 />
 <Select value={ingredient.unit} onValueChange={(value) => onChange(ingredient.id, 'unit', value)}>
 <SelectTrigger className="w-24">
 <SelectValue placeholder="Unit" />
 </SelectTrigger>
 <SelectContent>
 {units.map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
 </SelectContent>
 </Select>
 <Button type="button" size="icon" variant="ghost" className="text-red-500" onClick={() => onRemove(ingredient.id)}>
 <X size={16} />
 </Button>
 </div>
);

const Explore = () => {
 const { t } = useLanguage();
 const navigate = useNavigate();
 const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
 const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
 const [dietary, setDietary] = useState<string | null>(null);
 const [cookingTime, setCookingTime] = useState<string | null>(null);
 const [difficulty, setDifficulty] = useState<string | null>(null);
 const [cuisine, setCuisine] = useState<string | null>(null);
 const [allergenFree, setAllergenFree] = useState<string | null>(null);
 const [mealType, setMealType] = useState<string | null>(null);
 const [religion, setReligion] = useState<string | null>(null);
 const [healthGoal, setHealthGoal] = useState<string | null>(null);
 const [ingredients, setIngredients] = useState<{ id: string; name: string; quantity: string; unit: string }[]>([]);
 const [newIngredientName, setNewIngredientName] = useState("");
 const [newIngredientQuantity, setNewIngredientQuantity] = useState("");
 const [newIngredientUnit, setNewIngredientUnit] = useState("piece");
 const [activeTab, setActiveTab] = useState("manual");
 const [smartPantry, setSmartPantry] = useState<string[]>(["Rice", "Chicken", "Onions"]);
 const [availablePantryIngredients, setAvailablePantryIngredients] = useState<string[]>([]);

 // --- Ingredient Handling ---
 const addIngredient = () => {
 if (newIngredientName.trim()) {
 setIngredients(prev => [...prev, { id: Date.now().toString(), name: newIngredientName.trim(), quantity: newIngredientQuantity || "1", unit: newIngredientUnit }]);
 setNewIngredientName("");
 setNewIngredientQuantity("");
 }
 };

 const updateIngredient = (id: string, field: string, value: string) => {
 setIngredients(prev => prev.map(ing => ing.id === id ? { ...ing, [field]: value } : ing));
 };

 const removeIngredient = (id: string) => {
 setIngredients(prev => prev.filter(ing => ing.id !== id));
 };

 const handlePantryIngredientSelect = (ingredient: string) => {
 const exists = ingredients.some(ing => ing.name.toLowerCase() === ingredient.toLowerCase());
 if (!exists) {
 setIngredients(prev => [...prev, { id: Date.now().toString(), name: ingredient, quantity: "1", unit: "piece" }]);
 }
 };

 useEffect(() => {
 // Simulate fetching available pantry ingredients
 setAvailablePantryIngredients(smartPantry.filter(item => !ingredients.some(ing => ing.name.toLowerCase() === item.toLowerCase())));
 }, [smartPantry, ingredients]);

 const handleFindRecipes = () => {
 const filtersToSend = { dietary, cookingTime, difficulty, cuisine, allergens: allergenFree, mealType, religion, healthGoal };
 const ingredientsToSend = ingredients.map(i => ({ name: i.name, quantity: i.quantity, unit: i.unit }));
 console.log("Filters:", filtersToSend);
 console.log("Ingredients:", ingredientsToSend);
 navigate('/recipes');
 };

 return (
 <div className="min-h-screen bg-gradient-to-br from-wasfah-cream via-white to-orange-50 pb-20 pt-4">
 <div className="container mx-auto px-4">
 <div className="flex items-center gap-4 mb-6">
 <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-2">
 <ArrowLeft size={20} />
 </Button>
 <div className="flex-1">
 <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">{t("nav.explore")}</h1>
 <p className="text-gray-600 text-sm sm:text-base">
 Find recipes based on categories, dietary needs, and ingredients.
 </p>
 </div>
 </div>

 {/* Main Category Selection */}
 <Card className="mb-6">
 <CardHeader><CardTitle>Explore by Category</CardTitle></CardHeader>
 <CardContent>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 {categoriesData.map(category => (
 <AnimatedCard
 key={category.id}
 category={category}
 onSelect={setSelectedCategory}
 selected={selectedCategory === category.id}
 />
 ))}
 </div>
 {selectedCategory && (
 <div className="mt-4">
 <h4 className="font-semibold mb-2">Select Subcategory</h4>
 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
 {categoriesData.find(c => c.id === selectedCategory)?.subcategories.map(sub => (
 <Button
 key={sub}
 variant={selectedSubcategory === sub ? "default" : "outline"}
 onClick={() => setSelectedSubcategory(sub)}
 >
 {sub}
 </Button>
 ))}
 </div>
 </div>
 )}
 </CardContent>
 </Card>

 {/* Advanced Filters */}
 <Card className="mb-6">
 <CardHeader><CardTitle>Advanced Filters</CardTitle></CardHeader>
 <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <Select onValueChange={setDietary} value={dietary}>
 <SelectTrigger className="w-full">
 <SelectValue placeholder="Dietary" />
 </SelectTrigger>
 <SelectContent>
 {dietaryFilters.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
 </SelectContent>
 </Select>
 <Select onValueChange={setCookingTime} value={cookingTime}>
 <SelectTrigger className="w-full">
 <SelectValue placeholder="Cooking Time" />
 </SelectTrigger>
 <SelectContent>
 {timeFilters.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
 </SelectContent>
 </Select>
 <Select onValueChange={setDifficulty} value={difficulty}>
 <SelectTrigger className="w-full">
 <SelectValue placeholder="Difficulty" />
 </SelectTrigger>
 <SelectContent>
 {difficultyFilters.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
 </SelectContent>
 </Select>
 <Select onValueChange={setCuisine} value={cuisine}>
 <SelectTrigger className="w-full">
 <SelectValue placeholder="Cuisine" />
 </SelectTrigger>
 <SelectContent>
 {cuisineFilters.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
 </SelectContent>
 </Select>
 <Select onValueChange={setAllergenFree} value={allergenFree}>
 <SelectTrigger className="w-full">
 <SelectValue placeholder="Allergen-Free" />
 </SelectTrigger>
 <SelectContent>
 {allergenFilters.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
 </SelectContent>
 </Select>
 <Select onValueChange={setMealType} value={mealType}>
 <SelectTrigger className="w-full">
 <SelectValue placeholder="Meal Type" />
 </SelectTrigger>
 <SelectContent>
 {mealTypeFilters.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
 </SelectContent>
 </Select>
 <Select onValueChange={setReligion} value={religion}>
 <SelectTrigger className="w-full">
 <SelectValue placeholder="Religious Dietary Restrictions" />
 </SelectTrigger>
 <SelectContent>
 {religionFilters.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
 </SelectContent>
 </Select>
 <Select onValueChange={setHealthGoal} value={healthGoal}>
 <SelectTrigger className="w-full">
 <SelectValue placeholder="Health Goals" />
 </SelectTrigger>
 <SelectContent>
 {healthGoalFilters.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
 </SelectContent>
 </Select>
 </CardContent>
 </Card>

 {/* Ingredient Input */}
 <Card className="mb-6">
 <CardHeader><CardTitle>Add Ingredients</CardTitle></CardHeader>
 <CardContent>
 <Tabs value={activeTab} onValueChange={setActiveTab}>
 <TabsList className="grid grid-cols-2">
 <TabsTrigger value="manual">Manual Entry</TabsTrigger>
 <TabsTrigger value="pantry">Smart Pantry</TabsTrigger>
 </TabsList>
 <TabsContent value="manual">
 <div className="flex gap-2 mb-4">
 <Input
 type="text"
 placeholder="Ingredient Name"
 value={newIngredientName}
 onChange={(e) => setNewIngredientName(e.target.value)}
 />
 <Input
 type="number"
 placeholder="Quantity"
 value={newIngredientQuantity}
 onChange={(e) => setNewIngredientQuantity(e.target.value)}
 className="w-24"
 />
 <Select value={newIngredientUnit} onValueChange={setNewIngredientUnit}>
 <SelectTrigger className="w-24">
 <SelectValue placeholder="Unit" />
 </SelectTrigger>
 <SelectContent>
 {units.map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
 </SelectContent>
 </Select>
 <Button type="button" onClick={addIngredient}>Add</Button>
 </div>
 {ingredients.map(ingredient => (
 <IngredientInput
 key={ingredient.id}
 ingredient={ingredient}
 onChange={updateIngredient}
 onRemove={removeIngredient}
 />
 ))}
 </TabsContent>
 <TabsContent value="pantry">
 <div className="flex flex-wrap gap-2">
 {availablePantryIngredients.map(item => (
 <Button key={item} size="sm" onClick={() => handlePantryIngredientSelect(item)}>{item}</Button>
 ))}
 {availablePantryIngredients.length === 0 && <p className="text-gray-500">Your pantry is up to date with your entered ingredients.</p>}
 </div>
 </TabsContent>
 </Tabs>
 </CardContent>
 </Card>

 <Button className="w-full" onClick={handleFindRecipes}>Find Recipes</Button>
 </div>
 <MobileNavigation />
 </div>
 );
};

export default Explore;
