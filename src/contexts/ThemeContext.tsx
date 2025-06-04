
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';
type ColorScheme = 'default' | 'warm' | 'cool' | 'forest' | 'ocean';

interface ThemeContextType {
  theme: ThemeMode;
  colorScheme: ColorScheme;
  setTheme: (theme: ThemeMode) => void;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleTheme: () => void;
  effectiveTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return (saved as ThemeMode) || 'system';
    }
    return 'system';
  });

  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('colorScheme');
      return (saved as ColorScheme) || 'default';
    }
    return 'default';
  });

  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const updateEffectiveTheme = () => {
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setEffectiveTheme(systemTheme);
      } else {
        setEffectiveTheme(theme);
      }
    };

    updateEffectiveTheme();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateEffectiveTheme);
      return () => mediaQuery.removeEventListener('change', updateEffectiveTheme);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (effectiveTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }

    // Apply smooth transition
    root.style.setProperty('--theme-transition', 'all 0.3s ease');
  }, [effectiveTheme]);

  useEffect(() => {
    localStorage.setItem('colorScheme', colorScheme);
    
    const root = document.documentElement;
    
    // Remove all color scheme classes
    root.classList.remove('scheme-default', 'scheme-warm', 'scheme-cool', 'scheme-forest', 'scheme-ocean');
    
    // Add current color scheme
    root.classList.add(`scheme-${colorScheme}`);

    // Apply color scheme specific CSS variables
    switch (colorScheme) {
      case 'warm':
        root.style.setProperty('--primary', '25 95% 53%'); // Orange
        root.style.setProperty('--accent', '45 93% 63%'); // Yellow
        break;
      case 'cool':
        root.style.setProperty('--primary', '221 83% 53%'); // Blue
        root.style.setProperty('--accent', '262 83% 58%'); // Purple
        break;
      case 'forest':
        root.style.setProperty('--primary', '142 76% 36%'); // Green
        root.style.setProperty('--accent', '84 81% 44%'); // Lime
        break;
      case 'ocean':
        root.style.setProperty('--primary', '200 98% 39%'); // Cyan
        root.style.setProperty('--accent', '204 94% 94%'); // Light blue
        break;
      default:
        // Use default Wasfah colors
        root.style.setProperty('--primary', '188 85% 35%');
        root.style.setProperty('--accent', '176 56% 55%');
        break;
    }
  }, [colorScheme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const setColorScheme = (scheme: ColorScheme) => {
    setColorSchemeState(scheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      colorScheme, 
      setTheme, 
      setColorScheme, 
      toggleTheme, 
      effectiveTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
