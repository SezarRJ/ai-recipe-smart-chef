import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WasfahLogo } from '@/components/icons/WasfahLogo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// Import Phone icon for mobile number
import { Mail, Lock, User, ArrowRight, Languages, Loader2, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';

// Mock useRTL for demonstration if it's not available
const useRTL = () => {
  return { t: (text: string, _arabicText?: string) => text };
};

export default function AuthPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en'); // Default to English for now

  // Form states
  const [loginIdentifier, setLoginIdentifier] = useState(''); // Can be email or phone
  const [loginPassword, setLoginPassword] = useState('');

  const [registerFullName, setRegisterFullName] = useState('');
  const [registerMethod, setRegisterMethod] = useState('email'); // 'email' or 'phone'
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState(''); // New state for phone number
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerLanguage, setRegisterLanguage] = useState('en');

  const { t } = useRTL(); // Initialize translation hook

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // In a real application, you'd send loginIdentifier (which could be email or phone) and loginPassword to your backend.
    // Your backend would then need to verify if it's an email or phone number and authenticate accordingly.
    // Example: const response = await loginApi({ identifier: loginIdentifier, password: loginPassword });

    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

    setIsLoading(false);
    toast({
      title: t("Login successful", "تسجيل الدخول ناجح"),
      description: t("Welcome back to WasfahAI!", "مرحبًا بك مرة أخرى في وصفة الذكاء الاصطناعي!"),
      duration: 3000,
    });
    navigate('/home'); // Navigate to /home (or your main app dashboard)
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Collect data based on selected registration method
    const registrationData = {
      fullName: registerFullName,
      password: registerPassword,
      language: registerLanguage,
      method: registerMethod,
      email: registerMethod === 'email' ? registerEmail : undefined,
      phoneNumber: registerMethod === 'phone' ? registerPhoneNumber : undefined,
    };

    // In a real application, you'd send registrationData to your backend.
    // Your backend would then validate the chosen method and handle registration.
    // Example: const response = await registerApi(registrationData);

    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

    setIsLoading(false);
    toast({
      title: t("Registration successful", "التسجيل ناجح"),
      description: t("Welcome to WasfahAI!", "مرحبًا بك في وصفة الذكاء الاصطناعي!"),
      duration: 3000,
    });
    navigate('/home'); // Navigate to /home (or your main app dashboard)
  };

  const handleSkip = () => {
    navigate('/home'); // Navigate to /home (or your main app dashboard) as guest
  };

  const languages = [
    { code: 'en', name: t('English', 'الإنجليزية') },
    { code: 'ar', name: t('Arabic', 'العربية') },
    { code: 'fr', name: t('French', 'الفرنسية') },
    { code: 'es', name: t('Spanish', 'الإسبانية') }
  ];

  // Variants for Framer Motion transitions
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-wasfah-light-gray dark:bg-gray-900">
      {/* Left Section: Logo & Background (Responsive) */}
      <div className="relative w-full md:w-1/2 lg:w-2/5 xl:w-1/3 min-h-[30vh] md:min-h-screen
                   bg-gradient-to-br from-wasfah-deep-teal to-wasfah-teal flex flex-col items-center justify-center
                   p-6 text-white overflow-hidden shadow-xl md:shadow-none">
        {/* Background animation elements */}
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

        {/* Language Selector (positioned at top right for desktop, still in this section for mobile) */}
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
                        {/* Changed type to 'text' and placeholder to allow either email or phone */}
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <Input
                          type="text" // Can be 'email' or 'tel' on mobile, but 'text' is flexible for a single login field
                          placeholder={t("Email or Phone Number", "البريد الإلكتروني أو رقم الهاتف")}
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

                      {/* NEW: Registration Method Selector */}
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

                      {/* Conditional Input based on registerMethod */}
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
                                required={registerMethod === 'email'} // Required only if email is selected
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
                                type="tel" // Use 'tel' for mobile number input
                                placeholder={t("Phone Number (e.g., +1234567890)", "رقم الهاتف (مثال: +9665xxxxxxxx)")}
                                className="pl-10 h-12 text-base dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                                required={registerMethod === 'phone'} // Required only if phone is selected
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
