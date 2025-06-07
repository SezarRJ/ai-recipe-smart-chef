
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share2, Star } from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

const CommunityFeed = () => {
  const { t } = useRTL();

  const mockPosts = [
    {
      id: 1,
      user: 'DrinkMaster',
      drink: t('Tropical Sunset', 'غروب استوائي'),
      rating: 4.8,
      likes: 45,
      comments: 12,
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      user: 'MixologyPro',
      drink: t('Spiced Manhattan', 'مانهاتن بالتوابل'),
      rating: 4.6,
      likes: 32,
      comments: 8,
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=200&fit=crop'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('Community Feed', 'تغذية المجتمع')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            {t('Discover amazing drink recipes shared by our community', 'اكتشف وصفات المشروبات الرائعة التي يشاركها مجتمعنا')}
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {mockPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <img
                  src={post.image}
                  alt={post.drink}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{post.user}</span>
                    <Badge variant="outline">{t('Verified', 'موثق')}</Badge>
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{post.drink}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{post.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;
