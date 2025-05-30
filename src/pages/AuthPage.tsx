import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WasfahLogo } from '@/components/icons/WasfahLogo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Lock, User, ArrowRight, Languages, Loader2, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

// Mock useRTL for demonstration if it's not available
const useRTL = () => {
  return { t: (text: string, _arabicText?: string) => text };
};

export default function AuthPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en');

  // Form states
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerFullName, setRegisterFullName] = useState('');
  const [registerMethod, setRegisterMethod] = useState('email');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerLanguage, setRegisterLanguage] = useState('en');

  const { t } = useRTL();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginIdentifier,
        password: loginPassword,
      });

      if (error) throw error;

      toast({
        title: t("Login successful", "تسجيل الدخول ناجح"),
        description: t("Welcome back to WasfahAI!", "مرحبًا بك مرة أخرى في وصفة الذكاء الاصطناعي!"),
      });
      navigate('/home');
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const email = registerMethod === 'email' ? registerEmail : `${registerPhoneNumber}@temp.com`;
      
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: registerPassword,
        options: {
          data: {
            full_name: registerFullName,
            preferred_language: registerLanguage,
            registration_method: registerMethod,
            phone_number: registerMethod === 'phone' ? registerPhoneNumber : undefined,
          }
        }
      });

      if (error) throw error;

      toast({
        title: t("Registration successful", "التسجيل ناجح"),
        description: t("Welcome to WasfahAI!", "مرحبًا بك في وصفة الذكاء الاصطناعي!"),
      });
      navigate('/home');
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Registration failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/home`
        }
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Google login failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/home`
        }
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Facebook login failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSkip = () => {
    navigate('/home');
  };

  const languages = [
    { code: 'en', name: t('English', 'الإنجليزية') },
    { code: 'ar', name: t('Arabic', 'العربية') },
    { code: 'fr', name: t('French', 'الفرنسية') },
    { code: 'es', name: t('Spanish', 'الإسبانية') }
  ];

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-wasfah-light-gray dark:bg-gray-900">
      {/* Left Section: Logo & Background */}
      <div className="relative w-full md:w-1/2 lg:w-2/5 xl:w-1/3 min-h-[30vh] md:min-h-screen
                   bg-gradient-to-br from-wasfah-deep-teal to-wasfah-teal flex flex-col items-center justify-center
                   p-6 text-white overflow-hidden shadow-xl md:shadow-none">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-wasfah-bright-teal/30 to-transparent"
        ></motion.div>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center justify-center"
        >
          <WasfahLogo className="h-24 w-24 sm:h-32 sm:w-32 mb-6 drop-shadow-md" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-4 drop-shadow-lg leading-tight">
            {t('Welcome to Wasfah AI', 'مرحبًا بك في وصفة الذكاء الاصطناعي')}
          </h1>
          <p className="text-base sm:text-lg text-center opacity-80 max-w-sm">
            {t('Your ultimate companion for smart cooking and healthy living.', 'رفيقك الأمثل للطبخ الذكي والحياة الصحية.')}
          </p>
        </motion.div>

        <div className="absolute top-4 right-4 z-20 w-32">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="bg-transparent text-white border-white/50 hover:border-white transition-colors dark:text-gray-200 dark:border-gray-600 dark:hover:border-gray-500">
              <div className="flex items-center text-sm">
                <Languages size={16} className="mr-2" />
                <SelectValue placeholder={t("Select language", "اختر اللغة")} />
              </div>
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:text-gray-200">
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Right Section: Auth Forms */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 md:p-10 border border-gray-100 dark:border-gray-700">
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 dark:bg-gray-700">
              <TabsTrigger
                value="login"
                className={`text-lg font-semibold data-[state=active]:bg-wasfah-bright-teal data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:bg-wasfah-bright-teal dark:data-[state=active]:text-white dark:text-gray-300`}
              >
                {t('Login', 'تسجيل الدخول')}
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className={`text-lg font-semibold data-[state=active]:bg-wasfah-bright-teal data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:bg-wasfah-bright-teal dark:data-[state=active]:text-white dark:text-gray-300`}
              >
                {t('Register', 'التسجيل')}
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              {activeTab === 'login' && (
                <motion.div
                  key="loginForm"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <TabsContent value="login" className="mt-4">
                    <form onSubmit={handleLogin} className="space-y-6">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <Input
                          type="email"
                          placeholder={t("Email", "البريد الإلكتروني")}
                          className="pl-10 h-12 text-base dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                          required
                          value={loginIdentifier}
                          onChange={(e) => setLoginIdentifier(e.target.value)}
                        />
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <Input
                          type="password"
                          placeholder={t("Password", "كلمة المرور")}
                          className="pl-10 h-12 text-base dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                        />
                      </div>
                      <div className="text-right">
                        <Button variant="link" className="text-sm text-wasfah-bright-teal p-0 hover:underline dark:text-wasfah-mint">
                          {t('Forgot password?', 'هل نسيت كلمة المرور؟')}
                        </Button>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 bg-wasfah-bright-teal hover:bg-wasfah-teal transition-colors text-lg font-semibold flex items-center justify-center dark:bg-wasfah-bright-teal dark:hover:bg-wasfah-teal"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            {t('Logging in...', 'جاري تسجيل الدخول...')}
                          </>
                        ) : (
                          t('Login', 'تسجيل الدخول')
                        )}
                      </Button>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-white dark:bg-gray-800 px-2 text-gray-500">
                            {t('Or continue with', 'أو تابع مع')}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleGoogleLogin}
                          className="w-full"
                        >
                          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Google
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleFacebookLogin}
                          className="w-full"
                        >
                          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          Facebook
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                </motion.div>
              )}

              {activeTab === 'register' && (
                <motion.div
                  key="registerForm"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <TabsContent value="register" className="mt-4">
                    <form onSubmit={handleRegister} className="space-y-6">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <Input
                          type="text"
                          placeholder={t("Full Name", "الاسم الكامل")}
                          className="pl-10 h-12 text-base dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                          required
                          value={registerFullName}
                          onChange={(e) => setRegisterFullName(e.target.value)}
                        />
                      </div>

                      <div className="w-full">
                        <Tabs value={registerMethod} onValueChange={setRegisterMethod} className="w-full">
                          <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100 dark:bg-gray-700">
                            <TabsTrigger
                              value="email"
                              className={`text-sm font-medium data-[state=active]:bg-wasfah-teal data-[state=active]:text-white dark:data-[state=active]:bg-wasfah-teal dark:data-[state=active]:text-white dark:text-gray-300`}
                            >
                              <Mail size={16} className="mr-1" /> {t('Email', 'البريد الإلكتروني')}
                            </TabsTrigger>
                            <TabsTrigger
                              value="phone"
                              className={`text-sm font-medium data-[state=active]:bg-wasfah-teal data-[state=active]:text-white dark:data-[state=active]:bg-wasfah-teal dark:data-[state=active]:text-white dark:text-gray-300`}
                            >
                              <Phone size={16} className="mr-1" /> {t('Phone', 'الهاتف')}
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>

                      <AnimatePresence mode="wait">
                        {registerMethod === 'email' && (
                          <motion.div
                            key="registerEmailInput"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                              <Input
                                type="email"
                                placeholder={t("Email", "البريد الإلكتروني")}
                                className="pl-10 h-12 text-base dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                                required={registerMethod === 'email'}
                                value={registerEmail}
                                onChange={(e) => setRegisterEmail(e.target.value)}
                              />
                            </div>
                          </motion.div>
                        )}
                        {registerMethod === 'phone' && (
                          <motion.div
                            key="registerPhoneInput"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                              <Input
                                type="tel"
                                placeholder={t("Phone Number (e.g., +1234567890)", "رقم الهاتف (مثال: +9665xxxxxxxx)")}
                                className="pl-10 h-12 text-base dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                                required={registerMethod === 'phone'}
                                value={registerPhoneNumber}
                                onChange={(e) => setRegisterPhoneNumber(e.target.value)}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <Input
                          type="password"
                          placeholder={t("Password", "كلمة المرور")}
                          className="pl-10 h-12 text-base dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                          required
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                        />
                      </div>
                      <div className="relative">
                        <Languages className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <Select value={registerLanguage} onValueChange={setRegisterLanguage}>
                          <SelectTrigger className="pl-10 h-12 text-base dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                            <SelectValue placeholder={t("Select language", "اختر اللغة")} />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-800 dark:text-gray-200">
                            {languages.map((lang) => (
                              <SelectItem key={lang.code} value={lang.code}>
                                {lang.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 bg-wasfah-bright-teal hover:bg-wasfah-teal transition-colors text-lg font-semibold flex items-center justify-center dark:bg-wasfah-bright-teal dark:hover:bg-wasfah-teal"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            {t('Registering...', 'جاري التسجيل...')}
                          </>
                        ) : (
                          t('Register', 'التسجيل')
                        )}
                      </Button>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-white dark:bg-gray-800 px-2 text-gray-500">
                            {t('Or register with', 'أو سجل مع')}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleGoogleLogin}
                          className="w-full"
                        >
                          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Google
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleFacebookLogin}
                          className="w-full"
                        >
                          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          Facebook
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Tabs>

          <div className="mt-8 text-center">
            <Button
              variant="ghost"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={handleSkip}
            >
              {t('Continue as guest', 'المتابعة كضيف')} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
