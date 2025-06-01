
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';

interface IngredientAutocompleteProps {
  onAddIngredient: (ingredient: string) => void;
  placeholder?: string;
}

// Common ingredients list for autocomplete
const COMMON_INGREDIENTS = [
  'Tomatoes', 'Onions', 'Garlic', 'Potatoes', 'Carrots', 'Bell Peppers', 'Cucumber',
  'Lettuce', 'Spinach', 'Broccoli', 'Mushrooms', 'Zucchini', 'Eggplant', 'Celery',
  'Chicken Breast', 'Ground Beef', 'Salmon', 'Shrimp', 'Eggs', 'Milk', 'Cheese',
  'Butter', 'Olive Oil', 'Salt', 'Black Pepper', 'Basil', 'Oregano', 'Thyme',
  'Garlic Powder', 'Paprika', 'Cumin', 'Cinnamon', 'Ginger', 'Lemon', 'Lime',
  'Rice', 'Pasta', 'Bread', 'Flour', 'Sugar', 'Honey', 'Vinegar', 'Soy Sauce',
  'Coconut Oil', 'Avocado', 'Bananas', 'Apples', 'Strawberries', 'Blueberries'
];

export const IngredientAutocomplete: React.FC<IngredientAutocompleteProps> = ({
  onAddIngredient,
  placeholder = "Type an ingredient..."
}) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (input.length > 0) {
      const filtered = COMMON_INGREDIENTS.filter(ingredient =>
        ingredient.toLowerCase().includes(input.toLowerCase())
      ).slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        } else if (input.trim()) {
          handleAddIngredient();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    onAddIngredient(suggestion);
    setInput('');
  };

  const handleAddIngredient = () => {
    if (input.trim()) {
      onAddIngredient(input.trim());
      setInput('');
      setShowSuggestions(false);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(e.relatedTarget as Node)) {
        setShowSuggestions(false);
      }
    }, 150);
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <Button 
          onClick={handleAddIngredient}
          disabled={!input.trim()}
          size="icon"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              onClick={() => handleSelectSuggestion(suggestion)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                index === selectedIndex ? 'bg-gray-100' : ''
              }`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
