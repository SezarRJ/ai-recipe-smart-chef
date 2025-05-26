
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.781a3bca068947fcb2d19df54fefda67',
  appName: 'Wasfah AI',
  webDir: 'dist',
  server: {
    url: 'https://781a3bca-0689-47fc-b2d1-9df54fefda67.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#FFF8F0",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      spinnerColor: "#F97316",
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "large",
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: "light",
      backgroundColor: "#F97316"
    },
    Keyboard: {
      resize: "body",
      style: "dark",
      resizeOnFullScreen: true
    },
    Camera: {
      permissions: {
        camera: "Camera access is needed to scan ingredients and dishes.",
        photos: "Photo library access is needed to save recipe images."
      }
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#F97316",
      sound: "beep.wav"
    }
  },
  ios: {
    scheme: "Wasfah AI"
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
