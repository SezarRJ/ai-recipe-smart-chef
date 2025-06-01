
import { Moon, Sun, Monitor, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, colorScheme, setTheme, setColorScheme, effectiveTheme } = useTheme();

  const colorSchemes = [
    { value: 'default', label: 'Wasfah', color: 'bg-wasfah-bright-teal' },
    { value: 'warm', label: 'Warm', color: 'bg-orange-500' },
    { value: 'cool', label: 'Cool', color: 'bg-blue-500' },
    { value: 'forest', label: 'Forest', color: 'bg-green-500' },
    { value: 'ocean', label: 'Ocean', color: 'bg-cyan-500' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 rounded-xl hover:bg-accent/10"
        >
          {effectiveTheme === 'light' ? (
            <Sun className="h-4 w-4 text-orange-500" />
          ) : (
            <Moon className="h-4 w-4 text-blue-500" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 glass-card border-border/50"
      >
        <DropdownMenuLabel className="font-semibold">Theme Mode</DropdownMenuLabel>
        <DropdownMenuItem 
          onClick={() => setTheme('light')}
          className={`flex items-center gap-2 ${theme === 'light' ? 'bg-accent/20' : ''}`}
        >
          <Sun className="h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-accent/20' : ''}`}
        >
          <Moon className="h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('system')}
          className={`flex items-center gap-2 ${theme === 'system' ? 'bg-accent/20' : ''}`}
        >
          <Monitor className="h-4 w-4" />
          System
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="font-semibold flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Color Scheme
        </DropdownMenuLabel>
        {colorSchemes.map((scheme) => (
          <DropdownMenuItem
            key={scheme.value}
            onClick={() => setColorScheme(scheme.value as any)}
            className={`flex items-center gap-2 ${colorScheme === scheme.value ? 'bg-accent/20' : ''}`}
          >
            <div className={`w-3 h-3 rounded-full ${scheme.color}`} />
            {scheme.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
