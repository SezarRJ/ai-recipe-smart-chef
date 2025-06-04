
import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

// Helper function for className merging
function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams();

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    
    // Update the URL to reflect the new language
    const currentPath = location.pathname;
    const currentLang = lang || language;
    
    let newPath: string;
    
    // If the path starts with a language code, replace it
    if (currentPath.startsWith(`/${currentLang}/`)) {
      newPath = currentPath.replace(`/${currentLang}/`, `/${newLang}/`);
    } else if (currentPath === `/${currentLang}`) {
      newPath = `/${newLang}`;
    } else if (currentPath === '/') {
      // If on root, navigate to new language home
      newPath = `/${newLang}/home`;
    } else {
      // If no language prefix, add one
      newPath = `/${newLang}${currentPath}`;
    }
    
    navigate(newPath, { replace: true });
  };

  const currentLanguage = lang || language;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 hover:bg-wasfah-bright-teal/10 border-wasfah-bright-teal/20">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline font-medium">{currentLanguage.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200 shadow-lg z-50">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={cn(
              'flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors',
              currentLanguage === lang.code ? 'bg-wasfah-bright-teal/10 text-wasfah-bright-teal font-semibold' : ''
            )}
          >
            <Globe className="h-4 w-4" />
            <div className="flex flex-col">
              <span className="font-medium">{lang.nativeName}</span>
              <span className="text-xs text-gray-500">{lang.name}</span>
            </div>
            {currentLanguage === lang.code && (
              <div className="ml-auto w-2 h-2 bg-wasfah-bright-teal rounded-full" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
