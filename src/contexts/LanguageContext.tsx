import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define available languages
type LanguageCode = 'en' | 'ar' | 'fr' | 'es' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja';

// Translations interface
interface Translations {
  [key: string]: {
    [key in LanguageCode]?: string;
  };
}

// Define the context type
interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  translations: Translations;
  isRTL: boolean;
  availableLanguages: { code: LanguageCode; name: string; nativeName: string }[];
}

// Comprehensive translations
const translations: Translations = {
  // App branding
  "app.name": {
    en: "Wasfah AI",
    ar: "وصفة الذكاء الاصطناعي",
    fr: "Wasfah AI",
    es: "Wasfah AI",
    de: "Wasfah AI",
    it: "Wasfah AI",
    pt: "Wasfah AI",
    ru: "Wasfah AI",
    zh: "Wasfah AI",
    ja: "Wasfah AI",
  },
  "app.tagline": {
    en: "AI-Powered Recipe Discovery & Meal Planning",
    ar: "اكتشاف الوصفات وتخطيط الوجبات بالذكاء الاصطناعي",
    fr: "Découverte de recettes et planification de repas alimentée par l'IA",
    es: "Descubrimiento de recetas y planificación de comidas con IA",
    de: "KI-gestützte Rezeptentdeckung & Mahlzeitenplanung",
    it: "Scoperta di ricette e pianificazione pasti alimentata dall'IA",
    pt: "Descoberta de receitas e planejamento de refeições alimentado por IA",
    ru: "Поиск рецептов и планирование питания на основе ИИ",
    zh: "AI驱动的食谱发现和膳食规划",
    ja: "AI搭載のレシピ発見と食事計画",
  },

  // Navigation
  "nav.home": {
    en: "Home",
    ar: "الرئيسية",
    fr: "Accueil",
    es: "Inicio",
    de: "Startseite",
    it: "Home",
    pt: "Início",
    ru: "Главная",
    zh: "首页",
    ja: "ホーム",
  },
  "nav.explore": {
    en: "Explore",
    ar: "استكشاف",
    fr: "Explorer",
    es: "Explorar",
    de: "Entdecken",
    it: "Esplora",
    pt: "Explorar",
    ru: "Исследовать",
    zh: "探索",
    ja: "探索",
  },
  "nav.mealPlan": {
    en: "Meal Plan",
    ar: "خطة الوجبات",
    fr: "Plan de repas",
    es: "Plan de comidas",
    de: "Essensplan",
    it: "Piano pasti",
    pt: "Plano de refeições",
    ru: "План питания",
    zh: "膳食计划",
    ja: "食事プラン",
  },
  "nav.pantry": {
    en: "Pantry",
    ar: "المخزن",
    fr: "Garde-manger",
    es: "Despensa",
    de: "Speisekammer",
    it: "Dispensa",
    pt: "Despensa",
    ru: "Кладовая",
    zh: "储藏室",
    ja: "パントリー",
  },
  "nav.profile": {
    en: "Profile",
    ar: "الملف الشخصي",
    fr: "Profil",
    es: "Perfil",
    de: "Profil",
    it: "Profilo",
    pt: "Perfil",
    ru: "Профиль",
    zh: "个人资料",
    ja: "プロフィール",
  },

  // Search and filters
  "search.placeholder": {
    en: "Search recipes...",
    ar: "البحث عن الوصفات...",
    fr: "Rechercher des recettes...",
    es: "Buscar recetas...",
    de: "Rezepte suchen...",
    it: "Cerca ricette...",
    pt: "Pesquisar receitas...",
    ru: "Поиск рецептов...",
    zh: "搜索食谱...",
    ja: "レシピを検索...",
  },
  "search.filters": {
    en: "Filters",
    ar: "المرشحات",
    fr: "Filtres",
    es: "Filtros",
    de: "Filter",
    it: "Filtri",
    pt: "Filtros",
    ru: "Фильтры",
    zh: "筛选",
    ja: "フィルター",
  },
  "search.ingredients": {
    en: "Search by ingredients",
    ar: "البحث بالمكونات",
    fr: "Rechercher par ingrédients",
    es: "Buscar por ingredientes",
    de: "Nach Zutaten suchen",
    it: "Cerca per ingredienti",
    pt: "Pesquisar por ingredientes",
    ru: "Поиск по ингредиентам",
    zh: "按成分搜索",
    ja: "材料で検索",
  },

  // Categories
  "category.food": {
    en: "Food",
    ar: "طعام",
    fr: "Nourriture",
    es: "Comida",
    de: "Essen",
    it: "Cibo",
    pt: "Comida",
    ru: "Еда",
    zh: "食物",
    ja: "料理",
  },
  "category.desserts": {
    en: "Desserts",
    ar: "حلويات",
    fr: "Desserts",
    es: "Postres",
    de: "Desserts",
    it: "Dolci",
    pt: "Sobremesas",
    ru: "Десерты",
    zh: "甜点",
    ja: "デザート",
  },
  "category.drinks": {
    en: "Drinks",
    ar: "مشروبات",
    fr: "Boissons",
    es: "Bebidas",
    de: "Getränke",
    it: "Bevande",
    pt: "Bebidas",
    ru: "Напитки",
    zh: "饮品",
    ja: "飲み物",
  },

  // Common actions
  "action.add": {
    en: "Add",
    ar: "إضافة",
    fr: "Ajouter",
    es: "Agregar",
    de: "Hinzufügen",
    it: "Aggiungi",
    pt: "Adicionar",
    ru: "Добавить",
    zh: "添加",
    ja: "追加",
  },
  "action.save": {
    en: "Save",
    ar: "حفظ",
    fr: "Enregistrer",
    es: "Guardar",
    de: "Speichern",
    it: "Salva",
    pt: "Salvar",
    ru: "Сохранить",
    zh: "保存",
    ja: "保存",
  },
  "action.cancel": {
    en: "Cancel",
    ar: "إلغاء",
    fr: "Annuler",
    es: "Cancelar",
    de: "Abbrechen",
    it: "Annulla",
    pt: "Cancelar",
    ru: "Отмена",
    zh: "取消",
    ja: "キャンセル",
  },
  "action.login": {
    en: "Sign In",
    ar: "تسجيل الدخول",
    fr: "Se connecter",
    es: "Iniciar sesión",
    de: "Anmelden",
    it: "Accedi",
    pt: "Entrar",
    ru: "Войти",
    zh: "登录",
    ja: "ログイン",
  },
  "action.register": {
    en: "Get Started",
    ar: "ابدأ الآن",
    fr: "Commencer",
    es: "Comenzar",
    de: "Loslegen",
    it: "Inizia",
    pt: "Começar",
    ru: "Начать",
    zh: "开始",
    ja: "始める",
  },

  // Recipe details
  "recipe.cookingTime": {
    en: "Cooking Time",
    ar: "وقت الطبخ",
    fr: "Temps de cuisson",
    es: "Tiempo de cocción",
    de: "Kochzeit",
    it: "Tempo di cottura",
    pt: "Tempo de cozimento",
    ru: "Время приготовления",
    zh: "烹饪时间",
    ja: "調理時間",
  },
  "recipe.difficulty": {
    en: "Difficulty",
    ar: "الصعوبة",
    fr: "Difficulté",
    es: "Dificultad",
    de: "Schwierigkeit",
    it: "Difficoltà",
    pt: "Dificuldade",
    ru: "Сложность",
    zh: "难度",
    ja: "難易度",
  },
  "recipe.servings": {
    en: "Servings",
    ar: "الحصص",
    fr: "Portions",
    es: "Porciones",
    de: "Portionen",
    it: "Porzioni",
    pt: "Porções",
    ru: "Порции",
    zh: "份量",
    ja: "人分",
  },
  "recipe.ingredients": {
    en: "Ingredients",
    ar: "المكونات",
    fr: "Ingrédients",
    es: "Ingredientes",
    de: "Zutaten",
    it: "Ingredienti",
    pt: "Ingredientes",
    ru: "Ингредиенты",
    zh: "配料",
    ja: "材料",
  },

  // Authentication
  "auth.email": {
    en: "Email",
    ar: "البريد الإلكتروني",
    fr: "Email",
    es: "Correo electrónico",
    de: "E-Mail",
    it: "Email",
    pt: "Email",
    ru: "Электронная почта",
    zh: "电子邮件",
    ja: "メール",
  },
  "auth.password": {
    en: "Password",
    ar: "كلمة المرور",
    fr: "Mot de passe",
    es: "Contraseña",
    de: "Passwort",
    it: "Password",
    pt: "Senha",
    ru: "Пароль",
    zh: "密码",
    ja: "パスワード",
  },
  "auth.fullName": {
    en: "Full Name",
    ar: "الاسم الكامل",
    fr: "Nom complet",
    es: "Nombre completo",
    de: "Vollständiger Name",
    it: "Nome completo",
    pt: "Nome completo",
    ru: "Полное имя",
    zh: "全名",
    ja: "フルネーム",
  },
  "auth.confirmPassword": {
    en: "Confirm Password",
    ar: "تأكيد كلمة المرور",
    fr: "Confirmer le mot de passe",
    es: "Confirmar contraseña",
    de: "Passwort bestätigen",
    it: "Conferma password",
    pt: "Confirmar senha",
    ru: "Подтвердить пароль",
    zh: "确认密码",
    ja: "パスワード確認",
  },
  "auth.signingIn": {
    en: "Signing In...",
    ar: "تسجيل الدخول...",
    fr: "Connexion...",
    es: "Iniciando sesión...",
    de: "Anmeldung...",
    it: "Accesso...",
    pt: "Entrando...",
    ru: "Вход...",
    zh: "登录中...",
    ja: "ログイン中...",
  },
  "auth.creatingAccount": {
    en: "Creating Account...",
    ar: "إنشاء الحساب...",
    fr: "Création du compte...",
    es: "Creando cuenta...",
    de: "Konto erstellen...",
    it: "Creazione account...",
    pt: "Criando conta...",
    ru: "Создание аккаунта...",
    zh: "创建账户中...",
    ja: "アカウント作成中...",
  },

  // Error messages
  "error.title": {
    en: "Error",
    ar: "خطأ",
    fr: "Erreur",
    es: "Error",
    de: "Fehler",
    it: "Errore",
    pt: "Erro",
    ru: "Ошибка",
    zh: "错误",
    ja: "エラー",
  },
  "error.fillFields": {
    en: "Please fill in all fields",
    ar: "يرجى ملء جميع الحقول",
    fr: "Veuillez remplir tous les champs",
    es: "Por favor complete todos los campos",
    de: "Bitte füllen Sie alle Felder aus",
    it: "Si prega di compilare tutti i campi",
    pt: "Por favor, preencha todos os campos",
    ru: "Пожалуйста, заполните все поля",
    zh: "请填写所有字段",
    ja: "すべてのフィールドを入力してください",
  },
  "success.title": {
    en: "Success",
    ar: "نجح",
    fr: "Succès",
    es: "Éxito",
    de: "Erfolg",
    it: "Successo",
    pt: "Sucesso",
    ru: "Успех",
    zh: "成功",
    ja: "成功",
  },
  "success.signedIn": {
    en: "Signed in successfully!",
    ar: "تم تسجيل الدخول بنجاح!",
    fr: "Connexion réussie!",
    es: "¡Sesión iniciada con éxito!",
    de: "Erfolgreich angemeldet!",
    it: "Accesso riuscito!",
    pt: "Login realizado com sucesso!",
    ru: "Успешный вход!",
    zh: "登录成功！",
    ja: "ログインに成功しました！",
  },
  "action.backHome": {
    en: "Back to Home",
    ar: "العودة للرئيسية",
    fr: "Retour à l'accueil",
    es: "Volver al inicio",
    de: "Zurück zur Startseite",
    it: "Torna alla home",
    pt: "Voltar ao início",
    ru: "Вернуться домой",
    zh: "返回首页",
    ja: "ホームに戻る",
  },
};

// Available languages with their native names
const availableLanguages = [
  { code: 'en' as LanguageCode, name: 'English', nativeName: 'English' },
  { code: 'ar' as LanguageCode, name: 'Arabic', nativeName: 'العربية' },
  { code: 'fr' as LanguageCode, name: 'French', nativeName: 'Français' },
  { code: 'es' as LanguageCode, name: 'Spanish', nativeName: 'Español' },
  { code: 'de' as LanguageCode, name: 'German', nativeName: 'Deutsch' },
  { code: 'it' as LanguageCode, name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt' as LanguageCode, name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru' as LanguageCode, name: 'Russian', nativeName: 'Русский' },
  { code: 'zh' as LanguageCode, name: 'Chinese', nativeName: '中文' },
  { code: 'ja' as LanguageCode, name: 'Japanese', nativeName: '日本語' },
];

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    // Try to get saved language from localStorage
    const savedLanguage = localStorage.getItem('wasfah-language');
    if (savedLanguage && availableLanguages.some(lang => lang.code === savedLanguage)) {
      return savedLanguage as LanguageCode;
    }
    // Otherwise, try to detect browser language
    const browserLang = navigator.language.split('-')[0];
    if (availableLanguages.some(lang => lang.code === browserLang)) {
      return browserLang as LanguageCode;
    }
    return 'en';
  });

  // Save language preference
  useEffect(() => {
    localStorage.setItem('wasfah-language', language);
    document.documentElement.lang = language;
  }, [language]);

  // Function to get translation
  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language] || key;
    }
    return key; // Fallback to key if translation not found
  };

  // Check if language is RTL
  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      translations, 
      isRTL, 
      availableLanguages 
    }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-arabic' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
