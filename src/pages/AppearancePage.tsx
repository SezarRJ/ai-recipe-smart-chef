
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sun, Moon, Monitor, Palette, Type, Eye, Volume2, Accessibility } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { toast } from 'sonner';

const AppearancePage = () => {
  const [theme, setTheme] = useState('system');
  const [fontSize, setFontSize] = useState('medium');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [rtlSupport, setRtlSupport] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system';
    const savedFontSize = localStorage.getItem('fontSize') || 'medium';
    const savedReduceMotion = localStorage.getItem('reduceMotion') === 'true';
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    const savedSoundEffects = localStorage.getItem('soundEffects') !== 'false';
    const savedRtlSupport = localStorage.getItem('rtlSupport') === 'true';

    setTheme(savedTheme);
    setFontSize(savedFontSize);
    setReduceMotion(savedReduceMotion);
    setHighContrast(savedHighContrast);
    setSoundEffects(savedSoundEffects);
    setRtlSupport(savedRtlSupport);

    // Apply theme
    applyTheme(savedTheme);
    applyFontSize(savedFontSize);
    applyAccessibilitySettings(savedReduceMotion, savedHighContrast);
  }, []);

  const applyTheme = (newTheme: string) => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(newTheme);
    }
  };

  const applyFontSize = (newFontSize: string) => {
    const root = window.document.documentElement;
    root.classList.remove('font-small', 'font-medium', 'font-large');
    root.classList.add(`font-${newFontSize}`);
  };

  const applyAccessibilitySettings = (motion: boolean, contrast: boolean) => {
    const root = window.document.documentElement;
    
    if (motion) {
      root.style.setProperty('--animation-duration', '0s');
      root.classList.add('reduce-motion');
    } else {
      root.style.removeProperty('--animation-duration');
      root.classList.remove('reduce-motion');
    }

    if (contrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
    toast.success('Theme updated successfully!');
  };

  const handleFontSizeChange = (newFontSize: string) => {
    setFontSize(newFontSize);
    localStorage.setItem('fontSize', newFontSize);
    applyFontSize(newFontSize);
    toast.success('Font size updated successfully!');
  };

  const handleReduceMotionChange = (checked: boolean) => {
    setReduceMotion(checked);
    localStorage.setItem('reduceMotion', checked.toString());
    applyAccessibilitySettings(checked, highContrast);
    toast.success(checked ? 'Motion reduced' : 'Motion restored');
  };

  const handleHighContrastChange = (checked: boolean) => {
    setHighContrast(checked);
    localStorage.setItem('highContrast', checked.toString());
    applyAccessibilitySettings(reduceMotion, checked);
    toast.success(checked ? 'High contrast enabled' : 'High contrast disabled');
  };

  const handleSoundEffectsChange = (checked: boolean) => {
    setSoundEffects(checked);
    localStorage.setItem('soundEffects', checked.toString());
    toast.success(checked ? 'Sound effects enabled' : 'Sound effects disabled');
  };

  const handleRtlSupportChange = (checked: boolean) => {
    setRtlSupport(checked);
    localStorage.setItem('rtlSupport', checked.toString());
    document.documentElement.dir = checked ? 'rtl' : 'ltr';
    toast.success(checked ? 'RTL support enabled' : 'RTL support disabled');
  };

  const resetToDefaults = () => {
    const defaults = {
      theme: 'system',
      fontSize: 'medium',
      reduceMotion: false,
      highContrast: false,
      soundEffects: true,
      rtlSupport: false
    };

    setTheme(defaults.theme);
    setFontSize(defaults.fontSize);
    setReduceMotion(defaults.reduceMotion);
    setHighContrast(defaults.highContrast);
    setSoundEffects(defaults.soundEffects);
    setRtlSupport(defaults.rtlSupport);

    Object.entries(defaults).forEach(([key, value]) => {
      localStorage.setItem(key, value.toString());
    });

    applyTheme(defaults.theme);
    applyFontSize(defaults.fontSize);
    applyAccessibilitySettings(defaults.reduceMotion, defaults.highContrast);
    document.documentElement.dir = 'ltr';

    toast.success('Settings reset to defaults!');
  };

  return (
    <PageContainer
      header={{
        title: 'Appearance',
        showBackButton: true,
      }}
    >
      <div className="container px-4 py-6 space-y-6 pb-24">
        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Palette className="h-5 w-5 mr-2 text-wasfah-bright-teal" />
              Theme Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={theme} onValueChange={handleThemeChange}>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <RadioGroupItem value="light" id="light" />
                  <Sun className="h-5 w-5 text-orange-500" />
                  <div className="flex-1">
                    <Label htmlFor="light" className="font-medium">Light</Label>
                    <p className="text-sm text-muted-foreground">Clean and bright interface</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <RadioGroupItem value="dark" id="dark" />
                  <Moon className="h-5 w-5 text-blue-500" />
                  <div className="flex-1">
                    <Label htmlFor="dark" className="font-medium">Dark</Label>
                    <p className="text-sm text-muted-foreground">Easy on the eyes in low light</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <RadioGroupItem value="system" id="system" />
                  <Monitor className="h-5 w-5 text-gray-500" />
                  <div className="flex-1">
                    <Label htmlFor="system" className="font-medium">System</Label>
                    <p className="text-sm text-muted-foreground">Follow your device settings</p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Typography Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Type className="h-5 w-5 mr-2 text-wasfah-bright-teal" />
              Font Size Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={fontSize} onValueChange={handleFontSizeChange}>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <RadioGroupItem value="small" id="small" />
                  <div className="flex-1">
                    <Label htmlFor="small" className="font-medium text-sm">Small</Label>
                    <p className="text-xs text-muted-foreground">Compact text for more content</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <RadioGroupItem value="medium" id="medium" />
                  <div className="flex-1">
                    <Label htmlFor="medium" className="font-medium">Medium</Label>
                    <p className="text-sm text-muted-foreground">Standard text size (recommended)</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <RadioGroupItem value="large" id="large" />
                  <div className="flex-1">
                    <Label htmlFor="large" className="font-medium text-lg">Large</Label>
                    <p className="text-base text-muted-foreground">Larger text for better readability</p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Accessibility Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Accessibility className="h-5 w-5 mr-2 text-wasfah-bright-teal" />
              Accessibility Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center space-x-3">
                <Eye className="h-5 w-5 text-purple-500" />
                <div>
                  <Label htmlFor="reduce-motion" className="font-medium">Reduce Motion</Label>
                  <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                </div>
              </div>
              <Switch
                id="reduce-motion"
                checked={reduceMotion}
                onCheckedChange={handleReduceMotionChange}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center space-x-3">
                <Eye className="h-5 w-5 text-blue-500" />
                <div>
                  <Label htmlFor="high-contrast" className="font-medium">High Contrast</Label>
                  <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                </div>
              </div>
              <Switch
                id="high-contrast"
                checked={highContrast}
                onCheckedChange={handleHighContrastChange}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center space-x-3">
                <Volume2 className="h-5 w-5 text-green-500" />
                <div>
                  <Label htmlFor="sound-effects" className="font-medium">Sound Effects</Label>
                  <p className="text-sm text-muted-foreground">Enable audio feedback</p>
                </div>
              </div>
              <Switch
                id="sound-effects"
                checked={soundEffects}
                onCheckedChange={handleSoundEffectsChange}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center space-x-3">
                <Monitor className="h-5 w-5 text-orange-500" />
                <div>
                  <Label htmlFor="rtl-support" className="font-medium">RTL Support</Label>
                  <p className="text-sm text-muted-foreground">Right-to-left text direction</p>
                </div>
              </div>
              <Switch
                id="rtl-support"
                checked={rtlSupport}
                onCheckedChange={handleRtlSupportChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Reset Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reset Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <p className="text-sm text-muted-foreground">
                Reset all appearance settings to their default values.
              </p>
              <Button variant="outline" onClick={resetToDefaults} className="w-fit">
                Reset to Defaults
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default AppearancePage;
