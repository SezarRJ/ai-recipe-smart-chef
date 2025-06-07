import React, { useState, useEffect, useRef } from 'react';
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
const Mic = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mic"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>;
const Image = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>;
const CheckCircle2 = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle-2"><circle cx="12" cy="12" r="10"/><path d="m8 12 2 2 4-4"/></svg>;
const Droplet = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-droplet"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3.2-5.4A7 7 0 0 0 5 15a7 7 0 0 0 7 7Z"/></svg>;
const Wine = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wine"><path d="M8 7V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3"/><path d="M12 11v6"/><path d="M12 17a5 5 0 0 0 5 5H7a5 5 0 0 0 5-5Z"/></svg>;
const Bottle = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bottle"><path d="M3 21h18"/><path d="M16 21v-3.5a2.5 2.5 0 0 0-2.5-2.5h-3A2.5 2.5 0 0 0 8 17.5V21"/><path d="M7 17.5V10c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v7.5"/><path d="M10 8V6a2 2 0 0 1 2-2c.7 0 1.3.2 1.8.6"/><path d="M12 4V2"/></svg>;
const Volume2 = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2"><path d="M11 5L6 9H2v6h4l5 4V5Z"/><path d="M17.8 7.2a10 10 0 0 1 0 9.6"/><path d="M20.4 5.6a14 14 0 0 1 0 12.8"/></svg>;
const VolumeX = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-x"><path d="M11 5L6 9H2v6h4l5 4V5Z"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>;
const Play = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const Pause = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pause"><rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/></svg>;
const SkipForward = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-skip-forward"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/></svg>;
const SkipBack = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-skip-back"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/></svg>;


// Placeholder for PageContainer component
const PageContainer = ({ header, className, children }) => (
  <div className={`font-sans ${className}`}>
    {header && (
      <header className="p-4 bg-white shadow-sm flex items-center justify-between">
        {header.showBackButton && (
          <button className="text-blue-700 text-lg font-bold">
            &larr; Back
          </button>
        )}
        <h1 className="text-xl font-bold text-blue-800">{header.title}</h1>
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
      ${isActive ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
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
  const [pantryIngredients, setPantryIngredients] = useState(''); // Changed to pantryIngredients
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
        if (pantryIngredients) prompt += ` Incorporate these pantry ingredients: ${pantryIngredients}.`;
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
              },
              "servingSuggestions": { "type": "STRING" }, // New field
              "abv": { "type": "STRING" } // New field
            },
            "propertyOrdering": ["recipeName", "description", "ingredients", "instructions", "servingSuggestions", "abv"]
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
          instructions: ["Mix ingredients.", "Serve with ice."],
          servingSuggestions: "Serve in a tall glass with a lemon slice.",
          abv: "Moderate (10-15%)"
        });
      }

    } catch (error) {
      console.error("Error generating drink:", error);
      // Display an error message to the user
      setGeneratedRecipe({
        recipeName: "Generation Failed",
        description: "Oops! Something went wrong while generating your drink. Please try again.",
        ingredients: [],
        instructions: [],
        servingSuggestions: "",
        abv: ""
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">Let AI Craft Your Custom Drink!</h3>
      <p className="text-gray-600 mb-6 text-center">Answer a few questions or let our AI surprise you with a unique recipe.</p>

      {/* Guided Creation Flow */}
      <div className="space-y-6 mb-8">
        <div>
          <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-2">1. What's your mood or occasion?</label>
          <select
            id="mood"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <label htmlFor="pantryIngredients" className="block text-sm font-medium text-gray-700 mb-2">4. What ingredients do you have on hand? (Pantry / Optional)</label>
          <input
            id="pantryIngredients"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., lime, mint, simple syrup"
            value={pantryIngredients}
            onChange={(e) => setPantryIngredients(e.target.value)} // Updated to pantryIngredients
          />
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <button
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
              onClick={() => console.log('Image Scan/Upload Clicked')} // Placeholder for image scan
            >
              <Image className="h-4 w-4" /> Image Scan
            </button>
            <button
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
              onClick={() => console.log('Voice Input Clicked')} // Placeholder for voice input
            >
              <Mic className="h-4 w-4" /> Voice Input
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
        <button
          onClick={() => generateDrink(false)}
          className="w-full sm:w-auto bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-blue-800 transition-all duration-300 transform hover:scale-105"
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
        <div className="text-center py-4 text-blue-700 font-medium">
          Creating your perfect drink...
        </div>
      )}

      {generatedRecipe && !isLoading && (
        <div className="mt-8 bg-blue-50 p-6 rounded-xl shadow-inner border border-blue-200 animate-fade-in">
          <h4 className="text-2xl font-bold text-blue-700 mb-3">{generatedRecipe.recipeName}</h4>
          <p className="text-gray-700 mb-4">{generatedRecipe.description}</p>

          <h5 className="text-lg font-semibold text-blue-600 mb-2">Ingredients:</h5>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            {generatedRecipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h5 className="text-lg font-semibold text-blue-600 mb-2">Instructions:</h5>
          <ol className="list-decimal list-inside text-gray-700 mb-4">
            {generatedRecipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          {generatedRecipe.abv && (
            <div className="mb-4 flex items-center text-gray-800">
              <Droplet className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-semibold">ABV:</span> {generatedRecipe.abv}
            </div>
          )}

          {generatedRecipe.servingSuggestions && (
            <div className="mb-4 flex items-start text-gray-800">
              <Wine className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
              <span className="font-semibold">Serving Suggestion:</span> {generatedRecipe.servingSuggestions}
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
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
  const [selectedABV, setSelectedABV] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State for selected recipe for detail view

  const mockRecipes = [
    { id: 1, name: "Classic Margarita", category: "Cocktail", difficulty: "Medium", ingredients: ["Tequila", "Lime Juice", "Triple Sec"], image: "https://placehold.co/300x200/FFDDC1/804000?text=Margarita", abv: "High (20-30%)", servingSuggestions: "Serve in a salt-rimmed margarita glass with a lime wedge.", instructions: ["Combine ingredients in a shaker with ice.", "Shake well and strain into prepared glass.", "Garnish with a lime wedge."] },
    { id: 2, name: "Mojito", category: "Cocktail", difficulty: "Easy", ingredients: ["Rum", "Mint", "Lime", "Soda Water"], image: "https://placehold.co/300x200/D1F0E0/2E8B57?text=Mojito", abv: "Moderate (10-15%)", servingSuggestions: "Serve in a highball glass over ice, garnished with mint sprig and lime.", instructions: ["Muddle mint and lime in a glass.", "Add rum and simple syrup, fill with ice.", "Top with soda water and stir gently."] },
    { id: 3, name: "Old Fashioned", category: "Cocktail", difficulty: "Hard", ingredients: ["Whiskey", "Bitters", "Sugar"], image: "https://placehold.co/300x200/E8E0D7/6A5ACD?text=Old+Fashioned", abv: "High (30-40%)", servingSuggestions: "Serve in an old-fashioned glass with a large ice cube and an orange peel.", instructions: ["Place sugar cube in glass, add bitters and a splash of water.", "Muddle until sugar dissolves.", "Add whiskey and large ice cube, stir until well chilled.", "Garnish with an orange peel."] },
    { id: 4, name: "Sparkling Elderflower Mocktail", category: "Mocktail", difficulty: "Easy", ingredients: ["Elderflower Syrup", "Sparkling Water", "Lemon"], image: "https://placehold.co/300x200/F5E6CC/A0522D?text=Mocktail", abv: "Non-alcoholic (0%)", servingSuggestions: "Serve in a champagne flute or wine glass with a lemon twist.", instructions: ["Combine elderflower syrup and lemon juice in a glass.", "Top with sparkling water and stir.", "Garnish with a lemon twist."] },
    { id: 5, name: "Gin & Tonic", category: "Cocktail", difficulty: "Easy", ingredients: ["Gin", "Tonic Water", "Lime"], image: "https://placehold.co/300x200/C1DDF0/004D40?text=Gin+Tonic", abv: "Moderate (15-20%)", servingSuggestions: "Serve in a highball glass with plenty of ice and a lime wedge.", instructions: ["Fill a glass with ice.", "Add gin and tonic water.", "Garnish with a lime wedge."] },
  ];

  const filteredRecipes = mockRecipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory ? recipe.category === selectedCategory : true;
    const matchesDifficulty = selectedDifficulty ? recipe.difficulty === selectedDifficulty : true;
    const matchesABV = selectedABV ? recipe.abv.includes(selectedABV) : true; // Simple ABV match

    return matchesSearch && matchesCategory && matchesDifficulty && matchesABV;
  });

  const closeModal = () => setSelectedRecipe(null);

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">Browse Our Delicious Recipes</h3>
      <p className="text-gray-600 mb-6 text-center">Find your next favorite drink by exploring our collection.</p>

      {/* Quick Filters / Popular Categories */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-blue-600 mb-3">Quick Filters:</h4>
        <div className="flex flex-wrap gap-2">
          {['Cocktail', 'Mocktail', 'Low-Alcohol', 'High-ABV'].map(cat => (
            <button
              key={cat}
              className={`py-2 px-4 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === cat ? 'bg-blue-700 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
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
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedABV}
          onChange={(e) => setSelectedABV(e.target.value)}
        >
          <option value="">All ABV</option>
          <option value="Non-alcoholic">Non-alcoholic</option>
          <option value="Low">Low ABV</option>
          <option value="Moderate">Moderate ABV</option>
          <option value="High">High ABV</option>
        </select>
      </div>

      {/* Recipe Cards Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <div
              key={recipe.id}
              className="bg-gray-100 rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-103 cursor-pointer"
              onClick={() => setSelectedRecipe(recipe)} // Open modal on click
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-40 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x200/CCCCCC/666666?text=No+Image"; }}
              />
              <div className="p-4">
                <h5 className="text-lg font-semibold text-blue-600 mb-1">{recipe.name}</h5>
                <p className="text-sm text-gray-600 mb-2">{recipe.category} | Difficulty: {recipe.difficulty}</p>
                <p className="text-xs text-gray-500">ABV: {recipe.abv}</p>
                <p className="text-xs text-gray-500">Key ingredients: {recipe.ingredients.slice(0, 3).join(', ')}{recipe.ingredients.length > 3 ? '...' : ''}</p>
                <button className="mt-3 bg-blue-700 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-800 transition-colors">
                  View Recipe
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-8">No recipes found matching your criteria.</p>
        )}
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h4 className="text-2xl font-bold text-blue-700 mb-3">{selectedRecipe.name}</h4>
            <p className="text-gray-700 mb-4">{selectedRecipe.category} | Difficulty: {selectedRecipe.difficulty}</p>

            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/CCCCCC/666666?text=No+Image"; }}
            />

            <h5 className="text-lg font-semibold text-blue-600 mb-2">Ingredients:</h5>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              {selectedRecipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h5 className="text-lg font-semibold text-blue-600 mb-2">Instructions:</h5>
            <ol className="list-decimal list-inside text-gray-700 mb-4">
              {selectedRecipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>

            <div className="mb-4 flex items-center text-gray-800">
              <Droplet className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-semibold">ABV:</span> {selectedRecipe.abv}
            </div>

            <div className="mb-4 flex items-start text-gray-800">
              <Wine className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
              <span className="font-semibold">Serving Suggestion:</span> {selectedRecipe.servingSuggestions}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
              <button
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                onClick={closeModal}
              >
                Close
              </button>
              <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Placeholder for CookMode component
const CookMode = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);

  // Mock recipe for cook mode with corresponding images
  const mockRecipe = {
    name: "AI-Generated Example Drink",
    ingredients: [
      "2 oz Vodka",
      "1 oz Fresh Lime Juice",
      "0.75 oz Simple Syrup",
      "Fresh mint sprigs",
      "Ice",
      "Soda Water"
    ],
    instructions: [
      "Gently muddle 5-6 fresh mint leaves with lime juice and simple syrup in a shaker.",
      "Add vodka and fill the shaker with ice.",
      "Shake vigorously until well chilled (about 15-20 seconds).",
      "Strain the mixture into a highball glass filled with fresh ice.",
      "Top with soda water.",
      "Garnish with a fresh mint sprig and a lime wheel."
    ],
    stepImages: [
      "https://placehold.co/400x250/A7D9FF/004D40?text=Step+1+Muddling", // Example image for muddling
      "https://placehold.co/400x250/A7D9FF/004D40?text=Step+2+Add+Vodka", // Example image for adding vodka
      "https://placehold.co/400x250/A7D9FF/004D40?text=Step+3+Shaking",    // Example image for shaking
      "https://placehold.co/400x250/A7D9FF/004D40?text=Step+4+Straining", // Example image for straining
      "https://placehold.co/400x250/A7D9FF/004D40?text=Step+5+Topping",   // Example image for topping
      "https://placehold.co/400x250/A7D9FF/004D40?text=Step+6+Garnish"    // Example image for garnishing
    ]
  };

  // Function to speak the current step
  const speakStep = (stepIndex) => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel(); // Stop any current speech
    }
    utteranceRef.current = new SpeechSynthesisUtterance(mockRecipe.instructions[stepIndex]);
    utteranceRef.current.lang = 'en-US'; // Set language

    // Auto-continue to the next step when the current speech ends
    utteranceRef.current.onend = () => {
      setIsSpeaking(false);
      if (stepIndex < mockRecipe.instructions.length - 1) {
        nextStep(); // Automatically move to the next step
      }
    };

    synthRef.current.speak(utteranceRef.current);
    setIsSpeaking(true);
  };

  // Stop speech
  const stopSpeech = () => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Move to next step
  const nextStep = () => {
    stopSpeech(); // Stop current speech before moving
    setCurrentStep(prev => {
      const next = Math.min(mockRecipe.instructions.length - 1, prev + 1);
      speakStep(next); // Speak the new step
      return next;
    });
  };

  // Move to previous step
  const prevStep = () => {
    stopSpeech(); // Stop current speech before moving
    setCurrentStep(prev => {
      const prevStep = Math.max(0, prev - 1);
      speakStep(prevStep); // Speak the new step
      return prevStep;
    });
  };

  // Handle ingredient checklist
  const handleIngredientCheck = (ingredient) => {
    setCheckedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(item => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  // Effect to stop speech when component unmounts or recipe changes
  useEffect(() => {
    return () => {
      if (synthRef.current.speaking) {
        synthRef.current.cancel();
      }
    };
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">Cook Mode: Step-by-Step Guidance</h3>
      <p className="text-gray-600 mb-6 text-center">Select a recipe from your favorites or browse, then come here for guided cooking.</p>

      <div className="bg-blue-50 p-6 rounded-lg shadow-inner">
        <h4 className="text-2xl font-bold text-blue-700 mb-4 text-center">{mockRecipe.name}</h4>

        {/* Current Step Image */}
        {mockRecipe.stepImages[currentStep] && (
          <img
            src={mockRecipe.stepImages[currentStep]}
            alt={`Step ${currentStep + 1}`}
            className="w-full h-48 object-cover rounded-lg mb-6 shadow-md"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/CCCCCC/666666?text=Step+Image"; }}
          />
        )}

        {/* Ingredients Checklist */}
        <div className="mb-6">
          <h5 className="text-lg font-semibold text-blue-700 mb-3">Ingredients Checklist:</h5>
          <div className="space-y-2">
            {mockRecipe.ingredients.map((ingredient, index) => (
              <label key={index} className="flex items-center text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 rounded-md mr-2"
                  checked={checkedIngredients.includes(ingredient)}
                  onChange={() => handleIngredientCheck(ingredient)}
                />
                <span className={`${checkedIngredients.includes(ingredient) ? 'line-through text-gray-500' : ''}`}>
                  {ingredient}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="mb-6">
          <h5 className="text-lg font-semibold text-blue-700 mb-3">Instructions:</h5>
          {mockRecipe.instructions.map((step, index) => (
            <div key={index} className={`p-4 mb-3 rounded-lg border-l-4 ${index === currentStep ? 'bg-blue-300 text-blue-900 border-blue-700 shadow-md' : 'bg-white border-gray-200 text-gray-800'} transition-all duration-300`}>
              <p className="font-semibold text-lg">Step {index + 1}:</p>
              <p className={`${index === currentStep ? 'text-blue-900' : 'text-gray-700'}`}>{step}</p>
            </div>
          ))}
        </div>

        {/* Voice Controls */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => speakStep(currentStep)}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors"
            disabled={isSpeaking}
          >
            <Play className="h-5 w-5" /> Play Step
          </button>
          <button
            onClick={stopSpeech}
            className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold flex items-center gap-2 hover:bg-red-600 transition-colors"
            disabled={!isSpeaking}
          >
            <VolumeX className="h-5 w-5" /> Stop Voice
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <SkipBack className="h-5 w-5" /> Previous Step
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep === mockRecipe.instructions.length - 1}
            className="bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {currentStep === mockRecipe.instructions.length - 1 ? 'Finish!' : 'Next Step'} <SkipForward className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Placeholder for CommunityFeed component
const CommunityFeed = () => (
  <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-200">
    <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">Community Creations</h3>
    <p className="text-gray-600 mb-6 text-center">See what others are crafting and share your own unique drinks!</p>
    <div className="bg-blue-50 p-6 rounded-lg text-center">
      <Users className="w-16 h-16 mx-auto text-blue-600 mb-4" />
      <p className="text-lg font-semibold text-gray-700">Discover trending drinks and user-submitted recipes.</p>
      <p className="text-gray-500 mt-2">Sharing and social features are under development!</p>
      <button className="mt-4 bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors">
        Share Your Drink
      </button>
    </div>
  </div>
);

// Placeholder for Favorites component
const Favorites = () => (
  <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-200">
    <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">Your Favorite Drinks</h3>
    <p className="text-gray-600 mb-6 text-center">Access all your saved recipes here. Organize them into collections!</p>
    <div className="bg-blue-50 p-6 rounded-lg text-center">
      <Heart className="w-16 h-16 mx-auto text-red-500 mb-4" />
      <p className="text-lg font-semibold text-gray-700">No favorites added yet.</p>
      <p className="text-gray-500 mt-2">Save recipes from AI Generator or Browse Recipes to see them here.</p>
      <button className="mt-4 bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors">
        Find New Favorites
      </button>
    </div>
  </div>
);

// Placeholder for FoodPairing component
const FoodPairing = () => {
  const foodPairings = [
    { drink: "Classic Margarita", food: "Tacos, Nachos, Spicy Mexican Dishes" },
    { drink: "Mojito", food: "Cuban Sandwiches, Fresh Salads, Grilled Seafood" },
    { drink: "Old Fashioned", food: "Steak, BBQ Ribs, Dark Chocolate" },
    { drink: "Sparkling Elderflower Mocktail", food: "Light Desserts, Fruit Tarts, Afternoon Tea" },
    { drink: "Gin & Tonic", food: "Mediterranean Tapas, Olives, Cured Meats" },
    { drink: "Whiskey Sour", food: "Fried Chicken, Spicy Asian Cuisine, Lemon Desserts" },
    { drink: "Cosmopolitan", food: "Sushi, Seafood Pasta, Goat Cheese Salad" },
    { drink: "Piña Colada", food: "Coconut Shrimp, Tropical Fruit Salad, Grilled Pineapple" },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">Perfect Pairings</h3>
      <p className="text-gray-600 mb-6 text-center">Discover the best food to complement your favorite drinks.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {foodPairings.map((pair, index) => (
          <div key={index} className="bg-blue-50 p-5 rounded-lg shadow-sm">
            <h4 className="font-semibold text-blue-600 mb-2">{pair.drink}</h4>
            <p className="text-gray-700"><span className="font-medium">Pairs well with:</span> {pair.food}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


const AlcoholRecipeAI = () => {
  const { t, direction } = useRTL();
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState<string>('ai-generator');

  // Define custom color palette for Tailwind CSS with light blue shades
  // This helps maintain a consistent branding throughout the app
  const tailwindConfig = `
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              // Updated to light blue color scheme
              'wasfah-deep-teal': '#1E3A8A', // Darker blue for primary elements (formerly deep teal)
              'wasfah-dark-teal': '#2563EB', // Slightly lighter blue for accents (formerly dark teal)
              'wasfah-medium-teal': '#60A5FA', // Mid-range blue (formerly medium teal)
              'wasfah-light-gray': '#F0F8FF', // Very light blue for background (formerly light gray)
              'wasfah-white': '#FFFFFF', // Pure white
              // New light blue shades for better integration
              'blue-50': '#EFF6FF',
              'blue-100': '#DBEAFE',
              'blue-200': '#BFDBFE',
              'blue-300': '#93C5FD',
              'blue-400': '#60A5FA',
              'blue-500': '#3B82F6',
              'blue-600': '#2563EB',
              'blue-700': '#1D4ED8',
              'blue-800': '#1E3A8A',
              'blue-900': '#1E40AF',
            },
            fontFamily: {
              sans: ['Inter', 'sans-serif'], // Using Inter font
            },
            animation: {
              'fade-in': 'fadeIn 0.5s ease-out',
            },
            keyframes: {
              fadeIn: {
                '0%': { opacity: '0' },
                '100%': { opacity: '1' },
              }
            }
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
        className="bg-gradient-to-br from-blue-100 to-wasfah-white min-h-screen font-sans" // Using new blue shades
      >
        {/* Section for main content with consistent spacing */}
        <div className="space-y-6 pb-6">
          {/* Hero section with a welcoming message */}
          <div className="text-center mb-8 p-4">
            <h2 className="text-3xl font-extrabold mb-3 text-blue-800">
              {t('Unleash Your Inner Mixologist', 'أطلق العنان لخبير المزج بداخلك')}
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {t('Generate unique recipes with AI, discover popular drinks, or master your favorite cocktails step-by-step.', 'أنشئ وصفات فريدة بالذكاء الاصطناعي، اكتشف المشروبات الشائعة، أو أتقن الكوكتيلات المفضلة لديك خطوة بخطوة.')}
            </p>
          </div>

          {/* Tabs component for navigation between different features */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* List of tabs for navigation */}
            {/* Adjusted grid for better mobile responsiveness: 2 columns on small, 3 on medium, 5 on larger screens */}
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 bg-blue-400 p-1 rounded-xl shadow-lg transition-all duration-300">
              {/* AI Generator Tab Trigger */}
              <TabsTrigger value="ai-generator">
                <div className="flex items-center space-x-2 justify-center">
                  <Brain className="h-5 w-5" />
                  <span className="hidden sm:inline">{t('AI Generator', 'مولد الذكاء الاصطناعي')}</span>
                  <span className="inline sm:hidden text-center">AI</span> {/* Shorter text for mobile */}
                </div>
              </TabsTrigger>
              {/* Browse Recipes Tab Trigger */}
              <TabsTrigger value="recipe-filters">
                <div className="flex items-center space-x-2 justify-center">
                  <Menu className="h-5 w-5" />
                  <span className="hidden sm:inline">{t('Browse Recipes', 'تصفح الوصفات')}</span>
                  <span className="inline sm:hidden text-center">Browse</span> {/* Shorter text for mobile */}
                </div>
              </TabsTrigger>
              {/* Cook Mode Tab Trigger */}
              <TabsTrigger value="cook-mode">
                <div className="flex items-center space-x-2 justify-center">
                  <Utensils className="h-5 w-5" />
                  <span className="hidden sm:inline">{t('Cook Mode', 'وضع التحضير')}</span>
                  <span className="inline sm:hidden text-center">Cook</span> {/* Shorter text for mobile */}
                </div>
              </TabsTrigger>
              {/* Community Tab Trigger */}
              <TabsTrigger value="community">
                <div className="flex items-center space-x-2 justify-center">
                  <Users className="h-5 w-5" />
                  <span className="hidden sm:inline">{t('Community', 'المجتمع')}</span>
                  <span className="inline sm:hidden text-center">Community</span> {/* Shorter text for mobile */}
                </div>
              </TabsTrigger>
              {/* Favorites Tab Trigger */}
              <TabsTrigger value="favorites">
                <div className="flex items-center space-x-2 justify-center">
                  <Heart className="h-5 w-5" />
                  <span className="hidden sm:inline">{t('Favorites', 'المفضلة')}</span>
                  <span className="inline sm:hidden text-center">Favs</span> {/* Shorter text for mobile */}
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
        <div className="bg-blue-100 py-8 px-4 rounded-xl shadow-lg border border-blue-200 mt-8">
          <h3 className="text-2xl font-bold mb-5 text-blue-800 text-center">
            {t('Food Pairing Recommendations', 'توصيات توافق الطعام')}
          </h3>
          <FoodPairing />
        </div>
      </PageContainer>
    </>
  );
};

export default AlcoholRecipeAI;
