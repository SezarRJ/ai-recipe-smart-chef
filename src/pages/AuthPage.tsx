
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WasfahLogo } from '@/components/icons/WasfahLogo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Lock, User, ArrowRight, Languages, Loader2, Phone, Eye, EyeOff, KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

export default function AuthPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signUp, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Login states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register states
  const [registerFullName, setRegisterFullName] = useState('');
  const [registerMethod, setRegisterMethod] = useState('email');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerLanguage, setRegisterLanguage] = useState('en');

  // Forgot password states
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const t = (en: string, ar?: string) => language === 'ar' && ar ? ar : en;

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, loading, navigate]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const validatePhoneNumber = (phone: string) => {
    return /^\+?[\d\s-()]{10,}$/.test(phone);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(loginEmail)) {
      toast({
        title: t("Invalid Email", "بريد إلكتروني غير صحيح"),
        description: t("Please enter a valid email address", "يرجى إدخال عنوان بريد إلكتروني صحيح"),
        variant: "destructive",
      });
      return;
    }

    if (!validatePassword(loginPassword)) {
      toast({
        title: t("Invalid Password", "كلمة مرور غير صحيحة"),
        description: t("Password must be at least 6 characters", "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await signIn(loginEmail, loginPassword);
      toast({
        title: t("Login successful", "تسجيل الدخول ناجح"),
        description: t("Welcome back to WasfahAI!", "مرحبًا بك مرة أخرى في وصفة الذكاء الاصطناعي!"),
      });
      navigate('/home');
    } catch (error: any) {
      toast({
        title: t("Login failed", "فشل تسجيل الدخول"),
        description: error.message || t("Invalid credentials", "بيانات اعتماد غير صحيحة"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!registerFullName.trim()) {
      toast({
        title: t("Name Required", "الاسم مطلوب"),
        description: t("Please enter your full name", "يرجى إدخال اسمك الكامل"),
        variant: "destructive",
      });
      return;
    }

    if (registerMethod === 'email' && !validateEmail(registerEmail)) {
      toast({
        title: t("Invalid Email", "بريد إلكتروني غير صحيح"),
        description: t("Please enter a valid email address", "يرجى إدخال عنوان بريد إلكتروني صحيح"),
        variant: "destructive",
      });
      return;
    }

    if (registerMethod === 'phone' && !validatePhoneNumber(registerPhoneNumber)) {
      toast({
        title: t("Invalid Phone Number", "رقم هاتف غير صحيح"),
        description: t("Please enter a valid phone number", "يرجى إدخال رقم هاتف صحيح"),
        variant: "destructive",
      });
      return;
    }

    if (!validatePassword(registerPassword)) {
      toast({
        title: t("Invalid Password", "كلمة مرور غير صحيحة"),
        description: t("Password must be at least 6 characters", "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
        variant: "destructive",
      });
      return;
    }

    if (registerPassword !== confirmPassword) {
      toast({
        title: t("Passwords don't match", "كلمات المرور غير متطابقة"),
        description: t("Please make sure passwords match", "يرجى التأكد من تطابق كلمات المرور"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const email = registerMethod === 'email' ? registerEmail : `${registerPhoneNumber}@temp.wasfah.com`;
      
      await signUp(email, registerPassword, registerFullName);
      
      toast({
        title: t("Registration successful", "التسجيل ناجح"),
        description: t("Welcome to WasfahAI!", "مرحبًا بك في وصفة الذكاء الاصطناعي!"),
      });
      navigate('/home');
    } catch (error: any) {
      toast({
        title: t("Registration failed", "فشل التسجيل"),
        description: error.message || t("Registration failed", "فشل التسجيل"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(forgotEmail)) {
      toast({
        title: t("Invalid Email", "بريد إلكتروني غير صحيح"),
        description: t("Please enter a valid email address", "يرجى إدخال عنوان بريد إلكتروني صحيح"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResetSent(true);
      toast({
        title: t("Reset email sent", "تم إرسال رسالة إعادة التعيين"),
        description: t("Check your email for password reset instructions", "تحقق من بريدك الإلكتروني للحصول على تعليمات إعادة تعيين كلمة المرور"),
      });
    } catch (error: any) {
      toast({
        title: t("Reset failed", "فشل إعادة التعيين"),
        description: error.message || t("Failed to send reset email", "فشل في إرسال رسالة إعادة التعيين"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-wasfah-light-gray via-white to-wasfah-mint/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Left Section: Logo & Background */}
      <div className="relative w-full md:w-1/2 lg:w-2/5 xl:w-1/3 min-h-[30vh] md:min-h-screen
                   bg-gradient-to-br from-wasfah-deep-teal via-wasfah-bright-teal to-wasfah-teal 
                   flex flex-col items-center justify-center p-6 text-white overflow-hidden shadow-2xl">
        
        {/* Animated background elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0.3 }}
          animate={{ scale: 1.2, opacity: 0.1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          initial={{ scale: 1.2, opacity: 0.2 }}
          animate={{ scale: 0.8, opacity: 0.05 }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-20 left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"
        />

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center justify-center text-center"
        >
          <WasfahLogo className="h-28 w-28 sm:h-36 sm:w-36 mb-8 drop-shadow-2xl" />
          <h1 className="text-3xl sm:text-5xl font-bold text-center mb-6 drop-shadow-lg leading-tight">
            {t('Welcome to Wasfah AI', 'مرحبًا بك في وصفة الذكاء الاصطناعي')}
          </h1>
          <p className="text-lg sm:text-xl text-center opacity-90 max-w-md leading-relaxed">
            {t('Your ultimate companion for smart cooking and healthy living.', 'رفيقك الأمثل للطبخ الذكي والحياة الصحية.')}
          </p>
        </motion.div>

        {/* Language selector */}
        <div className="absolute top-6 right-6 z-20 w-40">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:border-white/50 transition-all duration-200">
              <div className="flex items-center text-sm font-medium">
                <Languages size={18} className="mr-2" />
                <SelectValue placeholder={t("Select language", "اختر اللغة")} />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800">
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code} className="font-medium">
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Right Section: Auth Forms */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white/80 backdrop-blur-sm dark:bg-gray-800/90 rounded-2xl shadow-2xl p-8 md:p-10 border border-white/20 dark:border-gray-700/50"
        >
          {!showForgotPassword ? (
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl p-1">
                <TabsTrigger
                  value="login"
                  className="text-base font-semibold data-[state=active]:bg-wasfah-bright-teal data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-200"
                >
                  {t('Login', 'تسجيل الدخول')}
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="text-base font-semibold data-[state=active]:bg-wasfah-bright-teal data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-200"
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
                    <TabsContent value="login" className="mt-6">
                      <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type="email"
                            placeholder={t("Email", "البريد الإلكتروني")}
                            className="pl-10 h-12 text-base bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-200/50 focus:border-wasfah-bright-teal transition-all duration-200"
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                          />
                        </div>
                        
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder={t("Password", "كلمة المرور")}
                            className="pl-10 pr-10 h-12 text-base bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-200/50 focus:border-wasfah-bright-teal transition-all duration-200"
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>

                        <div className="text-right">
                          <Button 
                            type="button"
                            variant="link" 
                            className="text-sm text-wasfah-bright-teal p-0 hover:underline font-medium"
                            onClick={() => setShowForgotPassword(true)}
                          >
                            {t('Forgot password?', 'هل نسيت كلمة المرور؟')}
                          </Button>
                        </div>

                        <Button
                          type="submit"
                          className="w-full h-12 bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal hover:from-wasfah-teal hover:to-wasfah-deep-teal transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl"
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
                    <TabsContent value="register" className="mt-6">
                      <form onSubmit={handleRegister} className="space-y-6">
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type="text"
                            placeholder={t("Full Name", "الاسم الكامل")}
                            className="pl-10 h-12 text-base bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-200/50 focus:border-wasfah-bright-teal transition-all duration-200"
                            required
                            value={registerFullName}
                            onChange={(e) => setRegisterFullName(e.target.value)}
                          />
                        </div>

                        <div className="w-full">
                          <Tabs value={registerMethod} onValueChange={setRegisterMethod} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg">
                              <TabsTrigger
                                value="email"
                                className="text-sm font-medium data-[state=active]:bg-wasfah-teal data-[state=active]:text-white rounded-md transition-all duration-200"
                              >
                                <Mail size={16} className="mr-1" /> {t('Email', 'البريد الإلكتروني')}
                              </TabsTrigger>
                              <TabsTrigger
                                value="phone"
                                className="text-sm font-medium data-[state=active]:bg-wasfah-teal data-[state=active]:text-white rounded-md transition-all duration-200"
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
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                  type="email"
                                  placeholder={t("Email", "البريد الإلكتروني")}
                                  className="pl-10 h-12 text-base bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-200/50 focus:border-wasfah-bright-teal transition-all duration-200"
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
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                  type="tel"
                                  placeholder={t("Phone Number (e.g., +1234567890)", "رقم الهاتف (مثال: +9665xxxxxxxx)")}
                                  className="pl-10 h-12 text-base bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-200/50 focus:border-wasfah-bright-teal transition-all duration-200"
                                  required={registerMethod === 'phone'}
                                  value={registerPhoneNumber}
                                  onChange={(e) => setRegisterPhoneNumber(e.target.value)}
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder={t("Password", "كلمة المرور")}
                            className="pl-10 pr-10 h-12 text-base bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-200/50 focus:border-wasfah-bright-teal transition-all duration-200"
                            required
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>

                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type="password"
                            placeholder={t("Confirm Password", "تأكيد كلمة المرور")}
                            className="pl-10 h-12 text-base bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-200/50 focus:border-wasfah-bright-teal transition-all duration-200"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>

                        <div className="relative">
                          <Languages className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Select value={registerLanguage} onValueChange={setRegisterLanguage}>
                            <SelectTrigger className="pl-10 h-12 text-base bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-200/50 focus:border-wasfah-bright-teal transition-all duration-200">
                              <SelectValue placeholder={t("Select language", "اختر اللغة")} />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800">
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
                          className="w-full h-12 bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal hover:from-wasfah-teal hover:to-wasfah-deep-teal transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl"
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
          ) : (
            // Forgot Password Form
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <KeyRound className="h-12 w-12 mx-auto text-wasfah-bright-teal mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('Reset Password', 'إعادة تعيين كلمة المرور')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {t('Enter your email to receive reset instructions', 'أدخل بريدك الإلكتروني لتلقي تعليمات إعادة التعيين')}
                </p>
              </div>

              {!resetSent ? (
                <form onSubmit={handleForgotPassword} className="space-y-6">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder={t("Email", "البريد الإلكتروني")}
                      className="pl-10 h-12 text-base bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-gray-200/50 focus:border-wasfah-bright-teal transition-all duration-200"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-wasfah-bright-teal to-wasfah-teal hover:from-wasfah-teal hover:to-wasfah-deep-teal transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {t('Sending...', 'جاري الإرسال...')}
                      </>
                    ) : (
                      t('Send Reset Email', 'إرسال رسالة إعادة التعيين')
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-gray-500 hover:text-gray-700"
                    onClick={() => setShowForgotPassword(false)}
                  >
                    {t('Back to Login', 'العودة لتسجيل الدخول')}
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t('Email Sent!', 'تم إرسال الرسالة!')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('Check your inbox for password reset instructions', 'تحقق من صندوق الوارد للحصول على تعليمات إعادة تعيين كلمة المرور')}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setResetSent(false);
                      setForgotEmail('');
                    }}
                  >
                    {t('Back to Login', 'العودة لتسجيل الدخول')}
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {!showForgotPassword && (
            <div className="mt-8 text-center">
              <Button
                variant="ghost"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium"
                onClick={handleSkip}
              >
                {t('Continue as guest', 'المتابعة كضيف')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
