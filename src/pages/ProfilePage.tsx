
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Mail, Heart, ChefHat, Globe, Award, Target, Scale, LogOut } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { mockUser } from '@/data/mockData';
import { SignOut } from '@/components/auth/SignOut';
import { useRTL } from '@/contexts/RTLContext';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { t } = useRTL();

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  return (
    <PageContainer
      header={{
        title: t('Profile', 'الملف الشخصي', 'Profil'),
        showBackButton: true,
        actions: (
          <Button onClick={handleEditProfile} className="bg-wasfah-bright-teal hover:bg-wasfah-teal dark:bg-wasfah-teal dark:hover:bg-wasfah-deep-teal text-white">
            <Edit size={16} className="mr-2 rtl:ml-2 rtl:mr-0" />
            {t('Edit Profile', 'تعديل الملف الشخصي', 'Profili Düzenle')}
          </Button>
        ),
      }}
    >
      <div className="container px-4 py-6 space-y-6 pb-24">
        {/* Profile Header */}
        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 rtl:sm:space-x-reverse">
              <div className="w-24 h-24 sm:w-20 sm:h-20 bg-wasfah-bright-teal dark:bg-wasfah-deep-teal rounded-full flex items-center justify-center text-white text-3xl sm:text-2xl font-bold flex-shrink-0">
                {mockUser.name.charAt(0)}
              </div>
              <div className="flex-1 text-center sm:text-left rtl:sm:text-right">
                <h1 className="text-2xl sm:text-3xl font-bold text-wasfah-deep-teal dark:text-wasfah-bright-teal mb-1">
                  {mockUser.name}
                </h1>
                <div className="flex items-center justify-center sm:justify-start rtl:sm:justify-end text-gray-600 dark:text-gray-400 text-sm mb-1">
                  <Mail size={16} className="mr-2 rtl:ml-2 rtl:mr-0" />
                  {mockUser.email}
                </div>
                {mockUser.chefAvatar && (
                  <div className="flex items-center justify-center sm:justify-start rtl:sm:justify-end mt-2">
                    <ChefHat size={16} className="mr-2 rtl:ml-2 rtl:mr-0 text-wasfah-bright-teal dark:text-wasfah-mint" />
                    <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-200">{mockUser.chefAvatar}</Badge>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Body Information */}
        <Card className="hover:shadow-md transition-shadow duration-300 dark:bg-gray-800">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between text-lg font-semibold text-gray-800 dark:text-gray-200">
              <div className="flex items-center">
                <Scale size={20} className="mr-2 rtl:ml-2 rtl:mr-0 text-wasfah-bright-teal dark:text-wasfah-mint" />
                {t('Body Information', 'معلومات الجسم', 'Vücut Bilgisi')}
              </div>
              <Link to="/body-information">
                <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                  <Edit size={14} className="mr-1 rtl:ml-1 rtl:mr-0" />
                  {t('Edit', 'تعديل', 'Düzenle')}
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-wasfah-deep-teal dark:text-wasfah-bright-teal">70 kg</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('Weight', 'الوزن', 'Kilo')}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-wasfah-deep-teal dark:text-wasfah-bright-teal">175 cm</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('Height', 'الطول', 'Boy')}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-lg font-bold text-wasfah-deep-teal dark:text-wasfah-bright-teal">22.9</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{t('BMI', 'مؤشر كتلة الجسم', 'BMI')}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-lg font-bold text-wasfah-deep-teal dark:text-wasfah-bright-teal">25</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{t('Age', 'العمر', 'Yaş')}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-lg font-bold text-wasfah-deep-teal dark:text-wasfah-bright-teal">Active</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{t('Activity', 'النشاط', 'Aktivite')}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dietary Preferences */}
        <Card className="hover:shadow-md transition-shadow duration-300 dark:bg-gray-800">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between text-lg font-semibold text-gray-800 dark:text-gray-200">
              <div className="flex items-center">
                <Heart size={20} className="mr-2 rtl:ml-2 rtl:mr-0 text-wasfah-coral-red dark:text-pink-400" />
                {t('Dietary Preferences', 'التفضيلات الغذائية', 'Beslenme Tercihleri')}
              </div>
              <Link to="/dietary-preferences">
                <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                  <Edit size={14} className="mr-1 rtl:ml-1 rtl:mr-0" />
                  {t('Edit', 'تعديل', 'Düzenle')}
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockUser.dietaryPreferences && mockUser.dietaryPreferences.length > 0 && (
              <div>
                <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">{t('Current Preferences', 'التفضيلات الحالية', 'Mevcut Tercihler')}</h3>
                <div className="flex flex-wrap gap-2">
                  {mockUser.dietaryPreferences.map((pref, index) => (
                    <Badge key={index} variant="outline" className="dark:border-gray-600 dark:text-gray-300">{pref}</Badge>
                  ))}
                </div>
              </div>
            )}

            {mockUser.cuisinePreferences && mockUser.cuisinePreferences.length > 0 && (
              <div>
                <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">{t('Cuisine Preferences', 'تفضيلات المطبخ', 'Mutfak Tercihleri')}</h3>
                <div className="flex flex-wrap gap-2">
                  {mockUser.cuisinePreferences.map((cuisine, index) => (
                    <Badge key={index} variant="outline" className="flex items-center dark:border-gray-600 dark:text-gray-300">
                      <Globe size={12} className="mr-1 rtl:ml-1 rtl:mr-0" />
                      {cuisine}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {mockUser.allergies && mockUser.allergies.length > 0 && (
              <div>
                <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">{t('Allergies', 'الحساسيات', 'Alerjiler')}</h3>
                <div className="flex flex-wrap gap-2">
                  {mockUser.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive" className="dark:bg-red-900/30 dark:text-red-300 dark:border-red-700">{allergy}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Nutritional Goals */}
        {mockUser.nutritionalGoals && (
          <Card className="hover:shadow-md transition-shadow duration-300 dark:bg-gray-800">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
                <Target size={20} className="mr-2 rtl:ml-2 rtl:mr-0 text-wasfah-bright-teal dark:text-wasfah-mint" />
                {t('Nutritional Goals', 'الأهداف الغذائية', 'Beslenme Hedefleri')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-wasfah-deep-teal dark:text-wasfah-bright-teal">
                    {mockUser.nutritionalGoals.calories}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('Daily Calories', 'السعرات الحرارية اليومية', 'Günlük Kalori')}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-wasfah-deep-teal dark:text-wasfah-bright-teal">
                    {mockUser.nutritionalGoals.protein}g
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('Daily Protein', 'البروتين اليومي', 'Günlük Protein')}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <Card className="hover:shadow-md transition-shadow duration-300 dark:bg-gray-800">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
              <Award size={20} className="mr-2 rtl:ml-2 rtl:mr-0 text-wasfah-mint dark:text-green-400" />
              {t('Stats', 'الإحصائيات', 'İstatistikler')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-wasfah-deep-teal dark:text-wasfah-bright-teal">24</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('Recipes Cooked', 'وصفات مطبوخة', 'Pişirilen Tarifler')}</div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-wasfah-deep-teal dark:text-wasfah-bright-teal">12</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('Favorites', 'المفضلة', 'Favoriler')}</div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-wasfah-deep-teal dark:text-wasfah-bright-teal">7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('Day Streak', 'أيام متتالية', 'Günlük Seri')}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Log Out Button */}
        <div className="pt-4">
          <SignOut className="w-full" />
        </div>
      </div>
    </PageContainer>
  );
}
