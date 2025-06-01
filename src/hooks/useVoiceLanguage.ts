
import { useState, useEffect } from 'react';
import { VoiceLanguage } from '@/types/index';

const supportedVoices: VoiceLanguage[] = [
  { code: 'en', name: 'English', voice: 'en-US', rtl: false },
  { code: 'ar', name: 'العربية', voice: 'ar-SA', rtl: true },
  { code: 'tr', name: 'Türkçe', voice: 'tr-TR', rtl: false },
  { code: 'es', name: 'Español', voice: 'es-ES', rtl: false },
  { code: 'fr', name: 'Français', voice: 'fr-FR', rtl: false },
  { code: 'zh', name: '中文', voice: 'zh-CN', rtl: false },
];

export const useVoiceLanguage = () => {
  const [currentVoice, setCurrentVoice] = useState<VoiceLanguage>(supportedVoices[0]);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    // Detect device language
    const deviceLanguage = navigator.language || navigator.languages?.[0] || 'en';
    const languageCode = deviceLanguage.split('-')[0];
    
    const matchedVoice = supportedVoices.find(voice => voice.code === languageCode);
    if (matchedVoice) {
      setCurrentVoice(matchedVoice);
    }

    // Load available voices
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = (text: string, voiceCode?: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel(); // Stop any ongoing speech
      
      const utterance = new SpeechSynthesisUtterance(text);
      const targetVoice = voiceCode ? supportedVoices.find(v => v.code === voiceCode) : currentVoice;
      
      if (targetVoice) {
        const systemVoice = availableVoices.find(voice => 
          voice.lang.startsWith(targetVoice.voice.split('-')[0])
        );
        
        if (systemVoice) {
          utterance.voice = systemVoice;
        }
        utterance.lang = targetVoice.voice;
      }
      
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      speechSynthesis.speak(utterance);
      
      return utterance;
    }
    return null;
  };

  const stop = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  const isSupported = 'speechSynthesis' in window;

  return {
    currentVoice,
    setCurrentVoice,
    supportedVoices,
    availableVoices,
    speak,
    stop,
    isSupported
  };
};
