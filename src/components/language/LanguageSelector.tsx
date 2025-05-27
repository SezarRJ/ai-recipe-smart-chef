
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRTL } from '@/contexts/RTLContext';
import { useToast } from '@/hooks/use-toast';

interface LanguageSelectorProps {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | null;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', rtl: false },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷', rtl: false },
  { code: 'es', name: 'Español', flag: '🇪🇸', rtl: false },
  { code: 'fr', name: 'Français', flag: '🇫🇷', rtl: false },
  { code: 'zh', name: '中文', flag: '🇨🇳', rtl: false },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'ghost',
  size = 'icon'
}) => {
  const { language, setLanguage } = useRTL();
  const { toast } = useToast();
  
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    const selectedLanguage = languages.find(l => l.code === lang);
    
    toast({
      title: lang === 'ar' ? "تم تغيير اللغة" : 
             lang === 'tr' ? "Dil Değiştirildi" : 
             "Language Changed",
      description: lang === 'ar' 
        ? "تم تغيير لغة التطبيق إلى العربية" 
        : lang === 'tr'
        ? "Uygulama dili Türkçe olarak değiştirildi"
        : `The app language has been changed to ${selectedLanguage?.name}`,
    });
  };
  
  const currentLanguage = languages.find(l => l.code === language);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="relative">
          <Globe className="h-5 w-5" />
          {size !== 'icon' && currentLanguage && (
            <span className="ml-2">{currentLanguage.name}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200 shadow-lg rounded-lg">
        <DropdownMenuGroup>
          {languages.map((lang) => (
            <DropdownMenuItem 
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex items-center cursor-pointer hover:bg-gray-100 ${
                lang.code === language ? 'bg-gray-100' : ''
              }`}
            >
              <span className="mr-2 text-xl">{lang.flag}</span>
              <span className={`${lang.rtl ? 'text-right' : 'text-left'} flex-1`}>
                {lang.name}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
