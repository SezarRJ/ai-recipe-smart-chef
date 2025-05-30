
import React, { useState, useCallback } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart, MessageSquare, Share2, Users, Award, ChefHat, Star, Send } from 'lucide-react';
import { mockRecipes } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Mock Data
const communityRecipes = mockRecipes.slice(0, 10).map((recipe, index) => ({
  ...recipe,
  image: recipe.image || `https://images.unsplash.com/photo-15${(100000 + index * 1000).toString().substring(0, 6)}?auto=format&fit=crop&w=1200&q=80`,
  author: {
    id: `user-${Math.floor(Math.random() * 1000)}`,
    name: ['Chef Alex', 'Sarah J.', 'Michael T.', 'Lisa Wong', 'Ahmad H.', 'Maria C.', 'Hassan K.', 'Emma L.'][index % 8],
    avatar: `/placeholder-avatar.png`,
    level: Math.floor(Math.random() * 10) + 1,
  },
  likes: Math.floor(Math.random() * 100) + 10,
  comments: Math.floor(Math.random() * 30) + 5,
  shares: Math.floor(Math.random() * 20),
  timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
  isLiked: Math.random() > 0.5,
}));

const mockComments = [
  { id: '1', author: 'Chef Maria', avatar: '/placeholder-avatar.png', content: 'This recipe is amazing! I added a bit more garlic and it was perfect.', timestamp: '2 hours ago', likes: 5 },
  { id: '2', author: 'John D.', avatar: '/placeholder-avatar.png', content: 'Thanks for sharing this! My family loved it.', timestamp: '5 hours ago', likes: 3 },
  { id: '3', author: 'Sarah K.', avatar: '/placeholder-avatar.png', content: 'Can this be made with almond flour instead?', timestamp: '1 day ago', likes: 2 },
  { id: '4', author: 'Ali M.', avatar: '/placeholder-avatar.png', content: 'I tried this yesterday and it was delicious! Highly recommend.', timestamp: '2 days ago', likes: 8 }
];

const popularMembers = [
  { id: '1', name: 'Chef Alex', avatar: '/placeholder-avatar.png', recipes: 45, followers: 1200, level: 9 },
  { id: '2', name: 'Maria C.', avatar: '/placeholder-avatar.png', recipes: 32, followers: 850, level: 7 },
  { id: '3', name: 'Hassan K.', avatar: '/placeholder-avatar.png', recipes: 28, followers: 720, level: 8 },
  { id: '4', name: 'Emma L.', avatar: '/placeholder-avatar.png', recipes: 19, followers: 650, level: 6 }
];

const CommunityPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('popular');

  const handleLike = useCallback((recipeId) => {
    console.log(`Simulating like for recipe: ${recipeId}`);
    toast({
      title: "Recipe Interaction",
      description: "Simulated: Liked recipe."
    });
  }, [toast]);

  const handleShare = useCallback((recipeId) => {
    console.log(`Simulating share for recipe: ${recipeId}`);
    toast({
      title: "Recipe Interaction",
      description: "Simulated: Share options opened."
    });
  }, [toast]);

  const handleFollow = useCallback((memberId) => {
    console.log(`Simulating follow for member: ${memberId}`);
    toast({
      title: "Member Interaction",
      description: "Simulated: Followed member."
    });
  }, [toast]);

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000;

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <PageContainer header={{ title: "Community", showBackButton: true }}>
      <div className="p-4 space-y-8 pb-24">
        {/* Community Header Card */}
        <div className="bg-gradient-to-r from-wasfah-deep-teal to-wasfah-bright-teal rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center mb-3">
            <Users className="h-6 w-6 mr-3" />
            <h1 className="text-2xl font-bold">WasfahAI Community</h1>
          </div>
          <p className="opacity-90 text-sm sm:text-base">Connect with home chefs, share recipes, and discover culinary inspiration</p>

          <div className="flex flex-wrap mt-4 gap-x-4 gap-y-2">
            <div className="bg-white/20 rounded-full px-4 py-1 text-sm flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>5,230 Members</span>
            </div>
            <div className="bg-white/20 rounded-full px-4 py-1 text-sm flex items-center">
              <ChefHat className="h-4 w-4 mr-1" />
              <span>12,450 Recipes</span>
            </div>
            <div className="bg-white/20 rounded-full px-4 py-1 text-sm flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>Active Community</span>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          {/* Popular Recipes Tab */}
          <TabsContent value="popular" className="space-y-6">
            {communityRecipes.slice().sort((a, b) => b.likes - a.likes).map((recipe) => (
              <RecipePostCard
                key={recipe.id}
                recipe={recipe}
                onLike={handleLike}
                onShare={handleShare}
                formatTimeAgo={formatTimeAgo}
              />
            ))}
          </TabsContent>

          {/* Latest Recipes Tab */}
          <TabsContent value="latest" className="space-y-6">
            {communityRecipes.slice().sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).map((recipe) => (
              <RecipePostCard
                key={recipe.id}
                recipe={recipe}
                onLike={handleLike}
                onShare={handleShare}
                formatTimeAgo={formatTimeAgo}
              />
            ))}
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <h2 className="text-xl font-bold text-wasfah-deep-teal dark:text-wasfah-bright-teal flex items-center mb-4">
              <Award className="mr-3 h-6 w-6" />
              Popular Members
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularMembers.map((member) => (
                <MemberCard key={member.id} member={member} onFollow={handleFollow} />
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4">
              View All Members
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

// Recipe Post Card Component
interface RecipePostCardProps {
  recipe: any;
  onLike: (recipeId: string) => void;
  onShare: (recipeId: string) => void;
  formatTimeAgo: (date: Date) => string;
}

const RecipePostCard: React.FC<RecipePostCardProps> = ({ recipe, onLike, onShare, formatTimeAgo }) => {
  const [isLiked, setIsLiked] = useState(recipe.isLiked);
  const [localLikes, setLocalLikes] = useState(recipe.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [localComments, setLocalComments] = useState(mockComments);

  const { toast } = useToast();

  const handleLocalLike = useCallback(() => {
    setIsLiked(prev => !prev);
    setLocalLikes(prev => prev + (isLiked ? -1 : 1));
    onLike(recipe.id);
  }, [isLiked, onLike, recipe.id]);

  const handleLocalComment = useCallback(() => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now().toString(),
        author: 'Current User',
        avatar: '/placeholder-avatar.png',
        content: commentText,
        timestamp: 'Just now',
        likes: 0
      };
      setLocalComments(prev => [...prev, newComment]);
      setCommentText('');
      toast({ title: "Comment Posted", description: "Your comment has been added." });
    }
  }, [commentText, toast]);

  const handleToggleComments = useCallback(() => {
    setShowComments(prev => !prev);
  }, []);

  return (
    <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        {/* Author Info */}
        <div className="p-4 flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={recipe.author.avatar} alt={recipe.author.name} />
            <AvatarFallback>{recipe.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center">
              <span className="font-medium text-gray-800 dark:text-gray-200">{recipe.author.name}</span>
              <div className="ml-2 bg-gray-100 dark:bg-gray-700 text-xs px-2 py-0.5 rounded-full flex items-center text-gray-700 dark:text-gray-300">
                <ChefHat className="h-3 w-3 mr-1 text-wasfah-bright-teal dark:text-wasfah-mint" />
                <span>Level {recipe.author.level}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{formatTimeAgo(new Date(recipe.timestamp))}</div>
          </div>
        </div>

        {/* Recipe Image */}
        <Link to={`/recipe/${recipe.id}`}>
          <div
            className="w-full h-60 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${recipe.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
        </Link>

        {/* Recipe Title and Description */}
        <div className="p-4">
          <Link to={`/recipe/${recipe.id}`}>
            <h3 className="font-bold text-xl text-wasfah-deep-teal dark:text-wasfah-bright-teal mb-1 hover:underline">{recipe.title}</h3>
          </Link>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-2">{recipe.description}</p>

          {recipe.rating && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
              <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
              <span>{recipe.rating} ({recipe.ratingCount || 0})</span>
            </div>
          )}
        </div>

        {/* Interaction Counts */}
        <div className="px-4 pb-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center mr-4">
            <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-wasfah-coral-red text-wasfah-coral-red' : ''}`} />
            <span>{localLikes} likes</span>
          </div>
          <div className="flex items-center mr-4">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{localComments.length} comments</span>
          </div>
          <div className="flex items-center">
            <Share2 className="h-4 w-4 mr-1" />
            <span>{recipe.shares} shares</span>
          </div>
        </div>

        {/* Interaction Buttons */}
        <div className="flex space-x-1 border-t border-gray-200 dark:border-gray-700 py-2 px-2">
          <Button
            variant="ghost"
            size="sm"
            className={`flex-1 flex items-center justify-center ${isLiked ? 'text-wasfah-coral-red hover:text-wasfah-coral-red/80' : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'}`}
            onClick={handleLocalLike}
            aria-label="Like"
          >
            <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-wasfah-coral-red' : ''}`} />
            Like
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            onClick={handleToggleComments}
            aria-label="Comment"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Comment
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            onClick={() => onShare(recipe.id)}
            aria-label="Share"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-0 p-4 border-t border-gray-200 dark:border-gray-700">
            <ScrollArea className="h-48 pr-4 mb-4">
              <div className="space-y-4">
                {localComments.map(comment => (
                  <div key={comment.id} className="flex">
                    <Avatar className="h-8 w-8 mr-3 mt-1 flex-shrink-0">
                      <AvatarImage src={comment.avatar} alt={comment.author} />
                      <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-gray-800 dark:text-gray-200">
                        <div className="font-medium text-sm">{comment.author}</div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span className="mr-2">{comment.timestamp}</span>
                        <button className="hover:underline">Like ({comment.likes})</button>
                        <span className="mx-2">•</span>
                        <button className="hover:underline">Reply</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Add Comment Input */}
            <div className="flex items-center">
              <Avatar className="h-9 w-9 mr-3 flex-shrink-0">
                <AvatarImage src="/placeholder-avatar.png" alt="Current User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Input
                className="flex-1 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLocalComment()}
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={handleLocalComment}
                className="ml-2 text-wasfah-bright-teal hover:text-wasfah-deep-teal"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Member Card Component
interface MemberCardProps {
  member: any;
  onFollow: (memberId: string) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onFollow }) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">{member.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{member.recipes} recipes • {member.followers} followers</p>
          <div className="flex items-center mt-1">
            <ChefHat className="h-3 w-3 mr-1 text-wasfah-bright-teal" />
            <span className="text-xs text-gray-500">Level {member.level}</span>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onFollow(member.id)}
          className="text-wasfah-bright-teal border-wasfah-bright-teal hover:bg-wasfah-bright-teal hover:text-white"
        >
          Follow
        </Button>
      </div>
    </Card>
  );
};

export default CommunityPage;
