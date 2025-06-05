
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  ChefHat, 
  Star,
  TrendingUp,
  Calendar,
  Search,
  Plus
} from 'lucide-react';
import { useRTL } from '@/contexts/RTLContext';

interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  type: 'recipe' | 'tip' | 'question' | 'review';
  timestamp: string;
  tags: string[];
}

const CommunityPage = () => {
  const { t, direction } = useRTL();
  const [selectedTab, setSelectedTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');

  const posts: CommunityPost[] = [
    {
      id: '1',
      author: 'Sarah Ahmed',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      title: 'Perfect Hummus Recipe',
      content: 'Just tried this amazing hummus recipe and it came out perfect! The secret is using tahini at room temperature.',
      image: 'https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=400&h=300&fit=crop',
      likes: 24,
      comments: 8,
      shares: 3,
      type: 'recipe',
      timestamp: '2 hours ago',
      tags: ['Middle Eastern', 'Vegetarian', 'Healthy']
    },
    {
      id: '2',
      author: 'Chef Omar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      title: 'Knife Skills Tips',
      content: 'Here are 5 essential knife techniques every home cook should master. Practice makes perfect!',
      likes: 67,
      comments: 15,
      shares: 12,
      type: 'tip',
      timestamp: '4 hours ago',
      tags: ['Cooking Tips', 'Techniques', 'Basics']
    },
    {
      id: '3',
      author: 'Fatima Kitchen',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      title: 'Best spice for biryani?',
      content: 'I\'m making biryani for the first time. What spices are absolutely essential for authentic flavor?',
      likes: 12,
      comments: 23,
      shares: 2,
      type: 'question',
      timestamp: '6 hours ago',
      tags: ['Indian', 'Spices', 'Help Needed']
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'recipe': return <ChefHat className="h-4 w-4" />;
      case 'tip': return <Star className="h-4 w-4" />;
      case 'question': return <MessageSquare className="h-4 w-4" />;
      case 'review': return <Heart className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      'recipe': 'bg-green-100 text-green-800',
      'tip': 'bg-blue-100 text-blue-800',
      'question': 'bg-orange-100 text-orange-800',
      'review': 'bg-purple-100 text-purple-800'
    };
    return (
      <Badge className={colors[type] || 'bg-gray-100 text-gray-800'}>
        {getTypeIcon(type)}
        <span className="ml-1 capitalize">{type}</span>
      </Badge>
    );
  };

  const stats = {
    totalMembers: 15420,
    activeToday: 1340,
    postsThisWeek: 245,
    recipesShared: 892
  };

  return (
    <PageContainer 
      header={{ 
        title: t("Community", "المجتمع"), 
        showBackButton: true 
      }}
    >
      <div className="p-4 pb-24 space-y-6">
        {/* Community Header */}
        <div className="bg-gradient-to-br from-wasfah-bright-teal to-wasfah-deep-teal p-6 rounded-lg text-white text-center">
          <h1 className="text-2xl font-bold mb-2">{t("Cooking Community", "مجتمع الطبخ")}</h1>
          <p className="opacity-90 mb-4">{t("Share recipes, ask questions, and connect with fellow food lovers", "شارك الوصفات واسأل واتواصل مع محبي الطعام")}</p>
          <Button variant="secondary" className="bg-white text-wasfah-bright-teal hover:bg-gray-100">
            <Plus className="h-4 w-4 mr-2" />
            {t("Share Your Recipe", "شارك وصفتك")}
          </Button>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-5 w-5 text-wasfah-bright-teal" />
              </div>
              <p className="text-2xl font-bold">{stats.totalMembers.toLocaleString()}</p>
              <p className="text-sm text-gray-600">{t("Members", "الأعضاء")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold">{stats.activeToday.toLocaleString()}</p>
              <p className="text-sm text-gray-600">{t("Active Today", "نشط اليوم")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <MessageSquare className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold">{stats.postsThisWeek}</p>
              <p className="text-sm text-gray-600">{t("Posts This Week", "المنشورات هذا الأسبوع")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <ChefHat className="h-5 w-5 text-orange-500" />
              </div>
              <p className="text-2xl font-bold">{stats.recipesShared}</p>
              <p className="text-sm text-gray-600">{t("Recipes Shared", "الوصفات المشاركة")}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t("Search community posts...", "ابحث في منشورات المجتمع...")}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed">{t("Feed", "التغذية")}</TabsTrigger>
            <TabsTrigger value="recipes">{t("Recipes", "الوصفات")}</TabsTrigger>
            <TabsTrigger value="tips">{t("Tips", "النصائح")}</TabsTrigger>
            <TabsTrigger value="questions">{t("Q&A", "الأسئلة")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value={selectedTab} className="mt-6 space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <img 
                        src={post.avatar} 
                        alt={post.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{post.author}</p>
                        <p className="text-sm text-gray-500">{post.timestamp}</p>
                      </div>
                    </div>
                    {getTypeBadge(post.type)}
                  </div>

                  {/* Post Content */}
                  <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                  <p className="text-gray-700 mb-4">{post.content}</p>

                  {/* Post Image */}
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                      <button className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 hover:text-wasfah-bright-teal transition-colors">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 hover:text-wasfah-bright-teal transition-colors">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 hover:text-wasfah-bright-teal transition-colors">
                        <Share2 className="h-4 w-4" />
                        <span className="text-sm">{post.shares}</span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default CommunityPage;
