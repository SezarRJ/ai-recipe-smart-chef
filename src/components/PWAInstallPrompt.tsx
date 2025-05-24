
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show install prompt after a delay, only if not already installed
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      if (!isStandalone && !localStorage.getItem('pwa-install-dismissed')) {
        setTimeout(() => setShowPrompt(true), 3000);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA installed');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 lg:bottom-4 lg:left-auto lg:right-4 lg:w-80 bg-white rounded-lg shadow-lg border p-4 z-40 animate-slide-in-bottom">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-wasfah-orange to-wasfah-green rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <div>
            <h3 className="font-semibold text-sm">{t("app.name")}</h3>
            <p className="text-xs text-gray-500">Install app</p>
          </div>
        </div>
        <button onClick={handleDismiss} className="text-gray-400 hover:text-gray-600">
          <X size={16} />
        </button>
      </div>
      
      <p className="text-xs text-gray-600 mb-3">
        Install our app for a better experience with offline access and faster loading.
      </p>
      
      <div className="flex space-x-2">
        <Button 
          onClick={handleInstall}
          size="sm"
          className="flex-1 bg-gradient-to-r from-wasfah-orange to-wasfah-green"
        >
          <Download size={14} className="mr-1" />
          Install
        </Button>
        <Button onClick={handleDismiss} variant="outline" size="sm">
          Later
        </Button>
      </div>
    </div>
  );
};
