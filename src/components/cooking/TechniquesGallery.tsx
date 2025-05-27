
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TechniqueAnimation } from './TechniqueAnimation';

// Sample technique data
const cookingTechniques = {
  basic: [
    {
      id: 'chopping',
      title: 'Proper Chopping',
      description: 'Learn the correct way to hold a knife and chop vegetables safely and efficiently.',
      animationUrl: '/placeholder.svg',
      tips: [
        'Keep fingers curled under when holding food to avoid cuts',
        'Rock the knife rather than lifting it completely for faster chopping',
      ]
    },
    {
      id: 'sauteing',
      title: 'Sautéing',
      description: 'Master the technique of quickly cooking food in a small amount of oil over high heat.',
      animationUrl: '/placeholder.svg',
      tips: [
        'Make sure your pan is hot before adding ingredients',
        'Don\'t overcrowd the pan - cook in batches if needed',
      ]
    }
  ],
  intermediate: [
    {
      id: 'folding',
      title: 'Folding Ingredients',
      description: 'Learn how to gently combine ingredients without losing volume or air.',
      animationUrl: '/placeholder.svg',
      tips: [
        'Use a large flexible spatula for best results',
        'Cut through the center, then scrape around the bowl in a figure-8 pattern'
      ]
    },
    {
      id: 'emulsion',
      title: 'Creating an Emulsion',
      description: 'Combine ingredients like oil and vinegar that normally don\'t mix using the proper technique.',
      animationUrl: '/placeholder.svg',
      tips: [
        'Add oil very slowly while whisking continuously',
        'Using mustard can help stabilize your emulsion'
      ]
    }
  ],
  advanced: [
    {
      id: 'flambeing',
      title: 'Flambéing',
      description: 'Master the dramatic technique of adding alcohol to a hot pan to create a controlled flame.',
      animationUrl: '/placeholder.svg',
      tips: [
        'Always remove the pan from heat before adding alcohol',
        'Have a lid nearby to smother flames if necessary'
      ]
    },
    {
      id: 'tempering',
      title: 'Tempering Chocolate',
      description: 'Learn to melt and cool chocolate to get that perfect snap and glossy finish.',
      animationUrl: '/placeholder.svg',
      tips: [
        'Use a thermometer for precise temperature control',
        'Avoid any water contact with your chocolate to prevent seizing'
      ]
    }
  ]
};

export const TechniquesGallery: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-xl font-bold text-wasfah-deep-teal mb-4">Cooking Techniques</h2>
        
        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            {cookingTechniques.basic.map((technique) => (
              <TechniqueAnimation
                key={technique.id}
                title={technique.title}
                description={technique.description}
                animationUrl={technique.animationUrl}
                tips={technique.tips}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="intermediate">
            {cookingTechniques.intermediate.map((technique) => (
              <TechniqueAnimation
                key={technique.id}
                title={technique.title}
                description={technique.description}
                animationUrl={technique.animationUrl}
                tips={technique.tips}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="advanced">
            {cookingTechniques.advanced.map((technique) => (
              <TechniqueAnimation
                key={technique.id}
                title={technique.title}
                description={technique.description}
                animationUrl={technique.animationUrl}
                tips={technique.tips}
              />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
