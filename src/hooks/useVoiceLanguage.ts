
import { useState, useEffect } from 'react';

interface VoiceLanguageConfig {
  code: string;
  name: string;
  speechSynthesisLang: string;
  speechRecognitionLang: string;
}

export const useVoiceLanguage = () => {
  const [deviceLanguage, setDeviceLanguage] = useState('en');
  const [voiceConfig, setVoiceConfig] = useState<VoiceLanguageConfig | null>(null);

  const supportedLanguages: Record<string, VoiceLanguageConfig> = {
    'en': {
      code: 'en',
      name: 'English',
      speechSynthesisLang: 'en-US',
      speechRecognitionLang: 'en-US'
    },
    'ar': {
      code: 'ar',
      name: 'Arabic',
      speechSynthesisLang: 'ar-SA',
      speechRecognitionLang: 'ar-SA'
    },
    'fr': {
      code: 'fr',
      name: 'French',
      speechSynthesisLang: 'fr-FR',
      speechRecognitionLang: 'fr-FR'
    },
    'es': {
      code: 'es',
      name: 'Spanish',
      speechSynthesisLang: 'es-ES',
      speechRecognitionLang: 'es-ES'
    },
    'de': {
      code: 'de',
      name: 'German',
      speechSynthesisLang: 'de-DE',
      speechRecognitionLang: 'de-DE'
    },
    'it': {
      code: 'it',
      name: 'Italian',
      speechSynthesisLang: 'it-IT',
      speechRecognitionLang: 'it-IT'
    }
  };

  useEffect(() => {
    // Detect device language
    const detectedLanguage = navigator.language.split('-')[0];
    setDeviceLanguage(detectedLanguage);
    
    // Set voice configuration based on detected language
    const config = supportedLanguages[detectedLanguage] || supportedLanguages['en'];
    setVoiceConfig(config);
  }, []);

  const speak = (text: string, language?: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const langConfig = language ? supportedLanguages[language] : voiceConfig;
      
      if (langConfig) {
        utterance.lang = langConfig.speechSynthesisLang;
      }
      
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = (onResult: (text: string) => void, language?: string) => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      const langConfig = language ? supportedLanguages[language] : voiceConfig;
      if (langConfig) {
        recognition.lang = langConfig.speechRecognitionLang;
      }
      
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };
      
      recognition.start();
      return recognition;
    }
    return null;
  };

  return {
    deviceLanguage,
    voiceConfig,
    speak,
    startListening,
    supportedLanguages
  };
};
