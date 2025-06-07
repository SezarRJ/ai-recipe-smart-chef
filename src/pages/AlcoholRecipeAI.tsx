import React, { useState, useEffect } from 'react';
// These imports are placeholders. In a real application, you would import them from your component library.
// For demonstration, simplified versions are provided within this single file.
// import { PageContainer } from '@/components/layout/PageContainer';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useRTL } from '@/contexts/RTLContext';
// import AIDrinkGenerator from '@/components/alcohol/AIDrinkGenerator';
// import CommunityFeed from '@/components/alcohol/CommunityFeed';
// import Favorites from '@/components/alcohol/Favorites';
// import FoodPairing from '@/components/alcohol/FoodPairing';
// import CookMode from '@/components/alcohol/CookMode';
// import RecipeFilters from '@/components/alcohol/RecipeFilters';
// import { GlassWater, Brain, Users, Heart, Menu, Utensils } from 'lucide-react';

// Placeholder for lucide-react icons for demonstration purposes
const Brain = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain"><path d="M12 2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/><path d="M16 16c-2.4 0-4-.8-4-4v-2c0-2.4 1.6-4 4-4h2c2.4 0 4 1.6 4 4v2c0 2.4-1.6 4-4 4h-2Z"/><path d="M12 22a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Z"/><path d="M8 8c2.4 0 4 .8 4 4v2c0 2.4-1.6 4-4 4H6c-2.4 0-4-1.6-4-4v-2c0-2.4 1.6-4 4-4h2Z"/></svg>;
const Users = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const Heart = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
const Menu = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const Utensils = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-utensils"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2c0-1.1-.9-2-2-2h-4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2Z"/><path d="M17 2v20"/></svg>;
const GlassWater = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-glass-water"><path d="M15.2 22H8.8a2 2 0 0 1-2-1.76L4.5 9V4a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v5l-2.3 11.24a2 2 0 0 1-2.02 1.76Z"/><path d="M6.5 9H17.5"/></svg>;


// Placeholder for PageContainer component
const PageContainer = ({ header, className, children }) => (
  <div className={`font-sans ${className}`}>
    {header && (
      <header className="p-4 bg-white shadow-sm flex items-center justify-between">
        {header.showBackButton && (
          <button className="text-wasfah-deep-teal text-lg font-bold">
            &larr; Back
          </button>
        )}
        <h1 className="text-xl font-bold text-wasfah-deep-teal">{header.title}</h1>
        <div></div> {/* For alignment */}
      </header>
    )}
    <main className="container mx-auto p-4 max-w-5xl">
      {children}
    </main>
  </div>
);

// Placeholder for Tabs components (simplified)
const Tabs = ({ value, onValueChange, children }) => (
  <div data-value={value}>
    {React.Children.map(children, child =>
      React.cloneElement(child, { activeTab: value, onTabChange: onValueChange })
    )}
  </div>
);

const TabsList = ({ children, onTabChange, activeTab, className }) => (
  <div className={`flex justify-center bg-gray-100 rounded-lg p-1 space-x-1 ${className}`}>
    {React.Children.map(children, child =>
      React.cloneElement(child, {
        onClick: () => onTabChange(child.props.value),
        isActive: activeTab === child.props.value
      })
    )}
  </div>
);

const TabsTrigger = ({ value, onClick, isActive, children }) => (
  <button
    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200
      ${isActive ? 'bg-white text-wasfah-deep-teal shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const TabsContent = ({ value, activeTab, children }) => (
  <div className={`pt-4 ${activeTab === value ? 'block' : 'hidden'}`}>
    {children}
  </div>
);

// Placeholder for useRTL hook
const useRTL = () => {
  const t = (en, ar) => en; // Simple passthrough for English
  const direction = 'ltr'; // Default direction
  return { t, direction };
};

// Placeholder for AIDrinkGenerator component with enhanced UI
const AIDrinkGenerator = () => {
  const [mood, setMood] = useState('');
  const [baseAlcohol, setBaseAlcohol] = useState('');
  const [flavorProfile, setFlavorProfile] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock API call for generating a drink
  const generateDrink = async (isSurprise = false) => {
    setIsLoading(true);
    setGeneratedRecipe(null); // Clear previous recipe
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      let prompt = "Generate an alcohol drink recipe.";
      if (isSurprise) {
        prompt += " Surprise me with a unique and exciting drink!";
      } else {
        if (mood) prompt += ` It should fit a '${mood}' mood.`;
        if (baseAlcohol) prompt += ` Use ${baseAlcohol} as the base.`;
        if (flavorProfile) prompt += ` It should be mostly ${flavorProfile}.`;
        if (ingredients) prompt += ` Incorporate these ingredients: ${ingredients}.`;
      }

      // Simulate LLM call using gemini-2.0-flash
      const chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = {
        contents: chatHistory,
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              "recipeName": { "type": "STRING" },
              "description": { "type": "STRING" },
              "ingredients": {
                "type": "ARRAY",
                "items": { "type": "STRING" }
              },
              "instructions": {
                "type": "ARRAY",
                "items": { "type": "STRING" }
              }
            },
            "propertyOrdering": ["recipeName", "description", "ingredients", "instructions"]
          }
        }
      };
      const apiKey = ""; // Canvas will provide this at runtime
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const json = result.candidates[0].content.parts[0].text;
        const parsedJson = JSON.parse(json);
        setGeneratedRecipe(parsedJson);
      } else {
        console.error("Failed to generate drink: No candidates or content found in response.");
        // Fallback to a generic message if API response is unexpected
        setGeneratedRecipe({
          recipeName: "AI-Generated Drink (Fallback)",
          description: "A refreshing drink for any occasion.",
          ingredients: ["Water", "Sugar", "Lemon juice", "Optional: Your favorite spirit"],
          instructions: ["Mix ingredients.", "Serve with ice."]
        });
      }

    } catch (error) {
      console.error("Error generating drink:", error);
      // Display an error message to the user
      setGeneratedRecipe({
        recipeName: "Generation Failed",
        description: "Oops! Something went wrong while generating your drink. Please try again.",
        ingredients: [],
        instructions: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold text-wasfah-deep-teal mb-4 text-center">Let AI Craft Your Custom Drink!</h3>
      <p className="text-gray-600 mb-6 text-center">Answer a few questions or let our AI surprise you with a unique recipe.</p>

      {/* Guided Creation Flow */}
      <div className="space-y-6 mb-8">
        <div>
          <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-2">1. What's your mood or occasion?</label>
          <select
            id="mood"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wasfah-deep-teal"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option value="">Select mood/occasion (Optional)</option>
            <option value="Relaxing Evening">Relaxing Evening</option>
            <option value="Lively Party">Lively Party</option>
            <option value="Refreshing Summer">Refreshing Summer</option>
            <option value="Cozy Winter">Cozy Winter</option>
            <option value="Brunch">Brunch</option>
          </select>
        </div>

        <div>
          <label htmlFor="baseAlcohol" className="block text-sm font-medium text-gray-700 mb-2">2. Pick your preferred base alcohol:</label>
          <select
            id="baseAlcohol"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wasfah-deep-teal"
            value={baseAlcohol}
            onChange={(e) => setBaseAlcohol(e.target.value)}
          >
            <option value="">Select a base (Optional)</option>
            <option value="Vodka">Vodka</option>
            <option value="Gin">Gin</option>
            <option value="Rum">Rum</option>
            <option value="Whiskey">Whiskey</option>
            <option value="Tequila">Tequila</option>
            <option value="Non-alcoholic">Non-alcoholic</option>
          </select>
        </div>

        <div>
          <label htmlFor="flavorProfile" className="block text-sm font-medium text-gray-700 mb-2">3. What flavor profile are you craving?</label>
          <select
            id="flavorProfile"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wasfah-deep-teal"
            value={flavorProfile}
            onChange={(e) => setFlavorProfile(e.target.value)}
          >
            <option value="">Select flavor (Optional)</option>
            <option value="Sweet">Sweet</option>
            <option value="Sour">Sour / Tart</option>
            <option value="Bitter">Bitter</option>
            <option value="Spicy">Spicy</option>
            <option value="Balanced">Balanced</option>
          </select>
        </div>

        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">4. Any specific ingredients to include? (e.g., mint, lime, ginger)</label>
          <input
            id="ingredients"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wasfah-deep-teal"
            placeholder="e.g., fresh berries, cucumber, basil"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
        <button
          onClick={() => generateDrink(false)}
          className="w-full sm:w-auto bg-wasfah-deep-teal text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-wasfah-dark-teal transition-all duration-300 transform hover:scale-105"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate My Drink!'}
        </button>
        <button
          onClick={() => generateDrink(true)}
          className="w-full sm:w-auto bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-gray-300 transition-all duration-300 transform hover:scale-105"
          disabled={isLoading}
        >
          {isLoading ? 'Surprising...' : 'Surprise Me!'}
        </button>
      </div>

      {isLoading && (
        <div className="text-center py-4 text-wasfah-deep-teal font-medium">
          Creating your perfect drink...
        </div>
      )}

      {generatedRecipe && !isLoading && (
        <div className="mt-8 bg-wasfah-light-gray p-6 rounded-xl shadow-inner border border-gray-300 animate-fade-in">
          <h4 className="text-2xl font-bold text-wasfah-deep-teal mb-3">{generatedRecipe.recipeName}</h4>
          <p className="text-gray-700 mb-4">{generatedRecipe.description}</p>

          <h5 className="text-lg font-semibold text-wasfah-dark-teal mb-2">Ingredients:</h5>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            {generatedRecipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h5 className="text-lg font-semibold text-wasfah-dark-teal mb-2">Instructions:</h5>
          <ol className="list-decimal list-inside text-gray-700">
            {generatedRecipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          <div className="mt-6 flex justify-end gap-3">
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-600 transition-colors">
              Save to Favorites
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition-colors">
              Share Recipe
            </button>
            <button onClick={() => generateDrink(false)} className="bg-purple-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-purple-600 transition-colors">
              Tweak It!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Placeholder for RecipeFilters component
const RecipeFilters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const mockRecipes = [
    { id: 1, name: "Classic Margarita", category: "Cocktail", difficulty: "Medium", ingredients: ["Tequila", "Lime Juice", "Triple Sec"], image: "https://placehold.co/300x200/FFDDC1/804000?text=Margarita" },
    { id: 2, name: "Mojito", category: "Cocktail", difficulty: "Easy", ingredients: ["Rum", "Mint", "Lime", "Soda Water"], image: "https://placehold.co/300x200/D1F0E0/2E8B57?text=Mojito" },
    { id: 3, name: "Old Fashioned", category: "Cocktail", difficulty: "Hard", ingredients: ["Whiskey", "Bitters", "Sugar"], image: "https://placehold.co/300x200/E8E0D7/6A5ACD?text=Old+Fashioned" },
    { id: 4, name: "Sparkling Elderflower Mocktail", category: "Mocktail", difficulty: "Easy", ingredients: ["Elderflower Syrup", "Sparkling Water", "Lemon"], image: "https://placehold.co/300x200/F5E6CC/A0522D?text=Mocktail" },
  ];

  const filteredRecipes = mockRecipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory ? recipe.category === selectedCategory : true;
    const matchesDifficulty = selectedDifficulty ? recipe.difficulty === selectedDifficulty : true;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold text-wasfah-deep-teal mb-4 text-center">Browse Our Delicious Recipes</h3>
      <p className="text-gray-600 mb-6 text-center">Find your next favorite drink by exploring our collection.</p>

      {/* Quick Filters / Popular Categories */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-wasfah-dark-teal mb-3">Quick Filters:</h4>
        <div className="flex flex-wrap gap-2">
          {['Cocktail', 'Mocktail', 'Low-Alcohol'].map(cat => (
            <button
              key={cat}
              className={`py-2 px-4 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === cat ? 'bg-wasfah-deep-teal text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Advanced Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or ingredient..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wasfah-deep-teal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wasfah-deep-teal"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Recipe Cards Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <div key={recipe.id} className="bg-gray-100 rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-103 cursor-pointer">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-40 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x200/CCCCCC/666666?text=No+Image"; }}
              />
              <div className="p-4">
                <h5 className="text-lg font-semibold text-wasfah-dark-teal mb-1">{recipe.name}</h5>
                <p className="text-sm text-gray-600 mb-2">{recipe.category} | Difficulty: {recipe.difficulty}</p>
                <p className="text-xs text-gray-500">Key ingredients: {recipe.ingredients.join(', ')}</p>
                <button className="mt-3 bg-wasfah-deep-teal text-white py-2 px-4 rounded-md text-sm hover:bg-wasfah-dark-teal transition-colors">
                  View Recipe
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-8">No recipes found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

// Placeholder for CookMode component
const CookMode = () => (
  <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-200">
    <h3 className="text-xl font-bold text-wasfah-deep-teal mb-4 text-center">Cook Mode: Step-by-Step Guidance</h3>
    <p className="text-gray-600 mb-6 text-center">Select a recipe from your favorites or browse, then come here for guided cooking.</p>
    <div className="bg-gray-100 p-6 rounded-lg text-center">
      <Utensils className="w-16 h-16 mx-auto text-wasfah-dark-teal mb-4" />
      <p className="text-lg font-semibold text-gray-700">Recipe cooking steps will appear here.</p>
      <p className="text-gray-500 mt-2">Large text, hands-free navigation, and timers coming soon!</p>
      <button className="mt-4 bg-wasfah-deep-teal text-white py-2 px-4 rounded-lg hover:bg-wasfah-dark-teal transition-colors">
        Go to Browse Recipes
      </button>
    </div>
  </div>
);

// Placeholder for CommunityFeed component
const CommunityFeed = () => (
  <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-200">
    <h3 className="text-xl font-bold text-wasfah-deep-teal mb-4 text-center">Community Creations</h3>
    <p className="text-gray-600 mb-6 text-center">See what others are crafting and share your own unique drinks!</p>
    <div className="bg-gray-100 p-6 rounded-lg text-center">
      <Users className="w-16 h-16 mx-auto text-wasfah-dark-teal mb-4" />
      <p className="text-lg font-semibold text-gray-700">Discover trending drinks and user-submitted recipes.</p>
      <p className="text-gray-500 mt-2">Sharing and social features are under development!</p>
      <button className="mt-4 bg-wasfah-deep-teal text-white py-2 px-4 rounded-lg hover:bg-wasfah-dark-teal transition-colors">
        Share Your Drink
      </button>
    </div>
  </div>
);

// Placeholder for Favorites component
const Favorites = () => (
  <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-200">
    <h3 className="text-xl font-bold text-wasfah-deep-teal mb-4 text-center">Your Favorite Drinks</h3>
    <p className="text-gray-600 mb-6 text-center">Access all your saved recipes here. Organize them into collections!</p>
    <div className="bg-gray-100 p-6 rounded-lg text-center">
      <Heart className="w-16 h-16 mx-auto text-red-500 mb-4" />
      <p className="text-lg font-semibold text-gray-700">No favorites added yet.</p>
      <p className="text-gray-500 mt-2">Save recipes from AI Generator or Browse Recipes to see them here.</p>
      <button className="mt-4 bg-wasfah-deep-teal text-white py-2 px-4 rounded-lg hover:bg-wasfah-dark-teal transition-colors">
        Find New Favorites
      </button>
    </div>
  </div>
);

// Placeholder for FoodPairing component
const FoodPairing = () => (
  <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-200">
    <h3 className="text-xl font-bold text-wasfah-deep-teal mb-4 text-center">Perfect Pairings</h3>
    <p className="text-gray-600 mb-6 text-center">Discover the best food to complement your favorite drinks.</p>
    <div className="bg-gray-100 p-6 rounded-lg text-center">
      <GlassWater className="w-16 h-16 mx-auto text-blue-500 mb-4" />
      <p className="text-lg font-semibold text-gray-700">Explore classic and adventurous food and drink combinations.</p>
      <p className="text-gray-500 mt-2">Expert recommendations to elevate your dining experience!</p>
    </div>
  </div>
);


const AlcoholRecipeAI = () => {
  const { t, direction } = useRTL();
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState<string>('ai-generator');

  // Define custom color palette for Tailwind CSS
  // This helps maintain a consistent branding throughout the app
  const tailwindConfig = `
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              'wasfah-deep-teal': '#004D40', // Darker teal for primary elements
              'wasfah-dark-teal': '#00695C', // Slightly lighter teal for accents
              'wasfah-medium-teal': '#26A69A', // Mid-range teal
              'wasfah-light-gray': '#F5F5F5', // Light background gray
              'wasfah-white': '#FFFFFF', // Pure white
            },
            fontFamily: {
              sans: ['Inter', 'sans-serif'], // Using Inter font
            },
          },
        },
      };
    </script>
  `;

  return (
    // Inject Tailwind CSS config
    <>
      <div dangerouslySetInnerHTML={{ __html: tailwindConfig }} />
      {/* Main container for the page, styled with a gradient background and minimum height */}
      <PageContainer
        header={{
          title: t('Craft Your Perfect Drink', 'اصنع مشروبك المثالي'),
          showBackButton: true,
        }}
        className="bg-gradient-to-br from-wasfah-light-gray to-wasfah-white min-h-screen font-sans"
      >
        {/* Section for main content with consistent spacing */}
        <div className="space-y-6 pb-6">
          {/* Hero section with a welcoming message */}
          <div className="text-center mb-8 p-4">
            <h2 className="text-3xl font-extrabold mb-3 text-wasfah-deep-teal">
              {t('Unleash Your Inner Mixologist', 'أطلق العنان لخبير المزج بداخلك')}
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {t('Generate unique recipes with AI, discover popular drinks, or master your favorite cocktails step-by-step.', 'أنشئ وصفات فريدة بالذكاء الاصطناعي، اكتشف المشروبات الشائعة، أو أتقن الكوكتيلات المفضلة لديك خطوة بخطوة.')}
            </p>
          </div>

          {/* Tabs component for navigation between different features */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* List of tabs for navigation */}
            <TabsList className="grid w-full grid-cols-5 bg-wasfah-medium-teal p-1 rounded-xl shadow-lg transition-all duration-300">
              {/* AI Generator Tab Trigger */}
              <TabsTrigger value="ai-generator">
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>{t('AI Generator', 'مولد الذكاء الاصطناعي')}</span>
                </div>
              </TabsTrigger>
              {/* Browse Recipes Tab Trigger */}
              <TabsTrigger value="recipe-filters">
                <div className="flex items-center space-x-2">
                  <Menu className="h-5 w-5" />
                  <span>{t('Browse Recipes', 'تصفح الوصفات')}</span>
                </div>
              </TabsTrigger>
              {/* Cook Mode Tab Trigger */}
              <TabsTrigger value="cook-mode">
                <div className="flex items-center space-x-2">
                  <Utensils className="h-5 w-5" />
                  <span>{t('Cook Mode', 'وضع التحضير')}</span>
                </div>
              </TabsTrigger>
              {/* Community Tab Trigger */}
              <TabsTrigger value="community">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>{t('Community', 'المجتمع')}</span>
                </div>
              </TabsTrigger>
              {/* Favorites Tab Trigger */}
              <TabsTrigger value="favorites">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>{t('Favorites', 'المفضلة')}</span>
                </div>
              </TabsTrigger>
            </TabsList>

            {/* AI Generator Tab Content */}
            <TabsContent value="ai-generator" activeTab={activeTab}>
              <AIDrinkGenerator />
            </TabsContent>

            {/* Recipe Browsing and Filtering Tab Content */}
            <TabsContent value="recipe-filters" activeTab={activeTab}>
              <RecipeFilters />
            </TabsContent>

            {/* Cook Mode Tab Content */}
            <TabsContent value="cook-mode" activeTab={activeTab}>
              <CookMode />
            </TabsContent>

            {/* Community Features Tab Content */}
            <TabsContent value="community" activeTab={activeTab}>
              <CommunityFeed />
            </TabsContent>

            {/* User Favorites Tab Content */}
            <TabsContent value="favorites" activeTab={activeTab}>
              <Favorites />
            </TabsContent>
          </Tabs>
        </div>

        {/* Food Pairing Recommendations Section - outside of main tabs for persistent display */}
        <div className="bg-wasfah-light-gray py-8 px-4 rounded-xl shadow-lg border border-gray-200 mt-8">
          <h3 className="text-2xl font-bold mb-5 text-wasfah-deep-teal text-center">
            {t('Food Pairing Recommendations', 'توصيات توافق الطعام')}
          </h3>
          <FoodPairing />
        </div>
      </PageContainer>
    </>
  );
};

export default AlcoholRecipeAI;
