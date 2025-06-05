
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { ModernHeroSection } from '@/components/home/ModernHeroSection';
import { ModernFeatureCards } from '@/components/home/ModernFeatureCards';
import { ModernFeaturedRecipes } from '@/components/home/ModernFeaturedRecipes';

const HomePage = () => {
  return (
    <PageContainer>
      <div className="space-y-6">
        <ModernHeroSection />
        <ModernFeatureCards />
        <ModernFeaturedRecipes />
      </div>
    </PageContainer>
  );
};

export default HomePage;
