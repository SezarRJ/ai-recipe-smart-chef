
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-muted-foreground">404</span>
          </div>
          <CardTitle className="text-2xl">{t('error.notFound')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            {t('error.pageNotFoundDescription')}
          </p>
          
          <div className="space-y-2">
            <Button 
              onClick={() => navigate('/')} 
              className="w-full"
              size="lg"
            >
              <Home className="h-4 w-4 mr-2" />
              {t('action.backHome')}
            </Button>
            
            <Button 
              onClick={() => navigate('/search')} 
              variant="outline"
              className="w-full"
              size="lg"
            >
              <Search className="h-4 w-4 mr-2" />
              {t('action.searchRecipes')}
            </Button>
            
            <Button 
              onClick={() => navigate(-1)} 
              variant="ghost"
              className="w-full"
              size="lg"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('common.previous')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
