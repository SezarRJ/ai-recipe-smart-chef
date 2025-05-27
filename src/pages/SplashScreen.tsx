// src/components/onboarding/SplashScreenEnhanced.tsx

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, Camera, ChefHat, Sparkles, Users, Heart, ArrowRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

// Placeholder for useRTL if it's not actually defined yet for translation
const useRTL = () => ({
  t: (english: string, arabic?: string) => english // Simple mock for demonstration, defaulting to English
});


// Enhanced splash screen content with more engaging features
const splashScreens = [
  {
    id: 'welcome',
    title: 'Welcome to Wasfah AI',
    subtitle: 'Your Personal AI Chef',
    description: 'Transform your cooking experience with intelligent recipe recommendations tailored to your taste and dietary needs.',
    image: '/lovable-uploads/d2f93f09-f195-4ab8-91bc-f9369a0fa2e8.png',
    icon: <Sparkles className="w-8 h-8 text-white" />, // Added text-white for icon visibility
    gradient: 'from-orange-400 to-pink-500',
    features: ['50,000+ Recipes', 'AI-Powered', 'Personalized'],
    animation: 'float',
    position: 'top', // Added position for image alignment
  },
  {
    id: 'scan',
    title: 'Scan Any Dish',
    subtitle: 'Instant Recognition',
    description: 'Point your camera at any dish to discover ingredients, nutritional info, and cooking tips instantly!',
    image: '/lovable-uploads/fe3b59a8-1853-4e9f-90d0-2c00d1a21d78.png',
    icon: <Camera className="w-8 h-8 text-white" />,
    gradient: 'from-blue-400 to-cyan-500',
    features: ['Calorie Counter', 'Ingredient List', 'Allergen Detection'],
    animation: 'pulse',
    position: 'center'
  },
  {
    id: 'chef',
    title: 'Your AI Chef Assistant',
    subtitle: 'Cook Like a Pro',
    description: 'Get step-by-step guidance, cooking tips, and real-time assistance from our advanced AI chef.',
    image: '/lovable-uploads/9b05b1e3-4b54-4a1e-9961-e5d2a7da7672.png',
    icon: <ChefHat className="w-8 h-8 text-white" />,
    gradient: 'from-purple-400 to-indigo-500',
    features: ['Voice Commands', 'Timer Alerts', 'Skill Levels'],
    animation: 'bounce',
    position: 'center'
  },
  {
    id: 'community',
    title: 'Join the Community',
    subtitle: 'Share & Discover',
    description: 'Connect with food lovers worldwide. Share your creations and discover authentic recipes from every culture.',
    image: '/lovable-uploads/3d48f7fe-a194-4102-a10d-a942ddfb054c.png',
    icon: <Users className="w-8 h-8 text-white" />,
    gradient: 'from-green-400 to-teal-500',
    features: ['Recipe Sharing', 'Chef Ratings', 'Live Events'],
    animation: 'slide',
    position: 'center'
  },
  {
    id: 'health',
    title: 'Track Your Health',
    subtitle: 'Personalized Nutrition & Goals',
    description: 'Monitor your nutrition, set health goals, and get AI-driven tips to maintain a balanced lifestyle.',
    image: '/lovable-uploads/health-tracking-splash.png', // Placeholder image
    icon: <Heart className="w-8 h-8 text-white" />,
    gradient: 'from-red-400 to-rose-500',
    features: ['Calorie Tracking', 'Macro Insights', 'Goal Setting'],
    animation: 'fade',
    position: 'bottom'
  }
];

// Framer Motion variants for slide transitions
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

// Framer Motion variants for text transitions (subtle slide-in)
const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
};

export default function SplashScreenEnhanced() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // 0 for initial, 1 for next, -1 for prev
  const [progress, setProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false); // State for confetti
  const [isMuted, setIsMuted] = useState(true); // Audio mute state
  const audioRef = useRef<HTMLAudioElement>(new Audio('/audio/ambient_music.mp3')); // Path to your ambient audio
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate(); // Hook for navigation
  const { t } = useRTL(); // Use the RTL context for translation

  const totalSlides = splashScreens.length;
  const activeSlide = splashScreens[currentSlide];

  // Auto-advance logic
  const startAutoProgress = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setProgress(0); // Reset progress for the new slide

    intervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(intervalRef.current!);
          if (currentSlide < totalSlides - 1) {
            setDirection(1);
            setCurrentSlide((prev) => prev + 1);
          } else {
            // Last slide, show confetti and prepare for app entry
            setShowConfetti(true);
            setTimeout(() => {
              if (audioRef.current) audioRef.current.pause(); // Pause audio on complete
              // *** CHANGE 1: Navigate to AuthPage after confetti for the last slide ***
              navigate('/auth');
            }, 3000); // Confetti duration
          }
          return 100;
        }
        return prevProgress + (100 / (5 * 1000 / 100)); // Advance 1% every 50ms for 5-second total
      });
    }, 50); // Update every 50ms
  }, [currentSlide, totalSlides, navigate]);

  useEffect(() => {
    startAutoProgress();

    // Clean up interval on component unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioRef.current) audioRef.current.pause(); // Ensure audio stops
    };
  }, [currentSlide, startAutoProgress]);

  // Audio management
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3; // Default volume
      if (!isMuted) {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted]);

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
    } else {
      setShowConfetti(true);
      setTimeout(() => {
        if (audioRef.current) audioRef.current.pause();
        // *** CHANGE 2: Navigate to AuthPage after confetti for 'Get Started' button ***
        navigate('/auth');
      }, 3000);
    }
  };

  const handleSkip = () => {
    if (audioRef.current) audioRef.current.pause();
    // *** CHANGE 3: Navigate to AuthPage when 'Skip' is clicked ***
    navigate('/auth');
  };

  const handleAudioToggle = () => {
    setIsMuted(!isMuted);
  };

  // Helper for image positioning
  const getImageClasses = (position) => {
    switch (position) {
      case 'top': return 'object-top';
      case 'bottom': return 'object-bottom';
      default: return 'object-center';
    }
  };


  return (
    <div
      className={`relative flex flex-col h-screen w-screen overflow-hidden text-white
      bg-gradient-to-br ${activeSlide.gradient}
      dark:from-gray-900 dark:to-gray-800 dark:text-gray-200`} // Dark mode for background
    >
      {showConfetti && <Confetti className="w-full h-full" numberOfPieces={300} recycle={false} gravity={0.5} />}

      {/* Audio Toggle */}
      <button
        onClick={handleAudioToggle}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
      >
        {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
      </button>

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0 flex flex-col items-center justify-between p-8 sm:p-12 md:p-16"
        >
          {/* Background Image with subtle parallax/transform */}
          <motion.img
            src={activeSlide.image}
            alt={activeSlide.title}
            className={`absolute inset-0 w-full h-full ${getImageClasses(activeSlide.position)} object-cover opacity-20`} // Lower opacity for background
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          {/* Overlay to darken image */}
          <div className={`absolute inset-0 bg-gradient-to-b ${activeSlide.gradient} opacity-80 mix-blend-multiply`}></div>

          <div className="relative z-10 flex flex-col items-center justify-center text-center mt-auto mb-auto max-w-lg mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="p-3 bg-white/20 rounded-full mb-4 shadow-lg"
            >
              {activeSlide.icon}
            </motion.div>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-4xl sm:text-5xl font-extrabold mb-2 leading-tight drop-shadow-lg"
            >
              {t(activeSlide.title, activeSlide.title)}
            </motion.h1>
            <motion.h2
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-xl sm:text-2xl font-semibold mb-4 opacity-90"
            >
              {t(activeSlide.subtitle, activeSlide.subtitle)}
            </motion.h2>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-base sm:text-lg opacity-80 mb-6 max-w-md"
            >
              {t(activeSlide.description, activeSlide.description)}
            </motion.p>

            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {activeSlide.features.map((feature, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
                  className="bg-white/20 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm"
                >
                  {t(feature, feature)}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Controls at the bottom */}
          <div className="relative z-10 w-full max-w-md flex flex-col items-center space-y-4 pb-4">
            <Progress value={progress} className="w-full h-2 rounded-full bg-white/30 [&>*]:bg-white" />
            <div className="flex justify-between w-full">
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="text-white/80 hover:bg-white/10"
              >
                {t('Skip', 'تخطي')}
              </Button>
              <Button
                onClick={handleNext}
                className="bg-white text-gray-800 hover:bg-gray-100 flex items-center shadow-lg"
              >
                {currentSlide < totalSlides - 1 ? t('Next', 'التالي') : t('Get Started', 'البدء')}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
