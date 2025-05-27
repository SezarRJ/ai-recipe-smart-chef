import React, { useState, useCallback } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart, MessageSquare, Share2, Users, Award, ChefHat, Star } from 'lucide-react';
import { mockRecipes } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Add social interaction data to recipes
const communityRecipes = mockRecipes.slice(0, 10).map((recipe) => ({
  ...recipe,
  author: {
    id: `user-${Math.floor(Math.random() * 1000)}`,
    name: ['Chef Alex', 'Sarah J.', 'Michael T.', 'Lisa Wong', 'Ahmad H.'][Math.floor(Math.random() * 5)],
    avatar: `/placeholder.svg`,
    level: Math.floor(Math.random() * 10) + 1,
  },
  likes: Math.floor(Math.random() * 100) + 10,
  comments: Math.floor(Math.random() * 30) + 5,
  shares: Math.floor(Math.random() * 20),
  timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
  isLiked: Math.random() > 0.5,
}));

// Mock comments
const mockComments = [
  { id: '1', author: 'Chef Maria', avatar: '/placeholder.svg', content: 'This recipe is amazing! I added a bit more garlic and it was perfect.', timestamp: '2 hours ago', likes: 5 },
  { id: '2', author: 'John D.', avatar: '/placeholder.svg', content: 'Thanks for sharing this! My family loved it.', timestamp: '5 hours ago', likes: 3 },
  { id: '3', author: 'Sarah K.', avatar: '/placeholder.svg', content: 'Can this be made with almond flour instead?', timestamp: '1 day ago', likes: 2 },
  { id: '4', author: 'Ali M.', avatar: '/placeholder.svg', content: 'I tried this yesterday and it was delicious! Highly recommend.', timestamp: '2 days ago', likes: 8 }
];

// Popular members
const popularMembers = [
  { id: '1', name: 'Chef Alex', avatar: '/placeholder.svg', recipes: 45, followers: 1200, level: 9 },
  { id: '2', name: 'Maria C.', avatar: '/placeholder.svg', recipes: 32, followers: 850, level: 7 },
  { id: '3', name: 'Hassan K.', avatar: '/placeholder.svg', recipes: 28, followers: 720, level: 8 },
  { id: '4', name: 'Emma L.', avatar: '/placeholder.svg', recipes: 19, followers: 650, level: 6 }
];

const CommunityPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('popular');

  const handleLike = useCallback((recipeId) => {
    toast({
      title: "Recipe Liked",
      description: "This recipe has been added to your favorites."
    });
  }, [toast]);

  const handleShare = useCallback((recipeId) => {
    toast({
      title: "Share Options",
      description: "Share options opened for this recipe."
    });
  }, [toast]);

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000; // in seconds

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <PageContainer header={{ title: "Community", showBackButton: true }}>
      <div className="p-4 space-y-6 pb-24">
        <div className="bg-gradient-to-r from-wasfah-deep-teal to-wasfah-bright-teal rounded-lg p-6 text-white">
          <div className="flex items-center mb-3">
            <Users className="h-6 w-6 mr-2" />
            <h1 className="text-xl font-bold">WasfahAI Community</h1>
          </div>
          <p className="opacity-90">Connect with home chefs, share recipes, and discover culinary inspiration</p>

          <div className="flex flex-wrap mt-4 gap-3">
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="space-y-4">
            {communityRecipes.slice(0, 5).sort((a, b) => b.likes - a.likes).map((recipe) => (
              <RecipePostCard
                key={recipe.id}
                recipe={recipe}
                onLike={handleLike}
                onShare={handleShare}
              />
            ))}
          </TabsContent>

          <TabsContent value="latest" className="space-y-4">
            {communityRecipes.slice(0, 5).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).map((recipe) => (
              <RecipePostCard
                key={recipe.id}
                recipe={recipe}
                onLike={handleLike}
                onShare={handleShare}
              />
            ))}
          </TabsContent>

          <TabsContent value="members" className="space-y-4">
            <h2 className="text-lg font-medium text-wasfah-deep-teal flex items-center">
              <Award className="mr-2 h-5 w-5" /> Popular Members
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {popularMembers.map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="relative">
                      <Avatar className="h-16 w-16 mb-2">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 bg-wasfah-bright-teal text-white text-xs font-bold h-6 w-6 rounded-full flex items-center justify-center">
                        {member.level}
                      </div>
                    </div>

                    <h3 className="font-medium">{member.name}</h3>

                    <div className="mt-2 text-sm text-gray-600 space-y-1">
                      <div className="flex items-center justify-center">
                        <ChefHat className="h-3.5 w-3.5 mr-1" />
                        <span>{member.recipes} Recipes</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Users className="h-3.5 w-3.5 mr-1" />
                        <span>{member.followers} Followers</span>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      Follow
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-2">
              View All Members
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

interface RecipePostCardProps {
  recipe: any;
  onLike: (recipeId: string) => void;
  onShare: (recipeId: string) => void;
}

const RecipePostCard: React.FC<RecipePostCardProps> = ({ recipe, onLike, onShare }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(mockComments);

  const handleComment = useCallback(() => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now().toString(),
        author: 'Current User',
        avatar: '/placeholder.svg',
        content: commentText,
        timestamp: 'Just now',
        likes: 0
      };
      setComments([...comments, newComment]);
      setCommentText('');
    }
  }, [commentText, comments]);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center mb-3">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={recipe.author.avatar} />
              <AvatarFallback>{recipe.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <span className="font-medium">{recipe.author.name}</span>
                <div className="ml-2 bg-gray-100 text-xs px-2 rounded-full flex items-center">
                  <ChefHat className="h-3 w-3 mr-1 text-wasfah-bright-teal" />
                  <span>Level {recipe.author.level}</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">{new Date(recipe.timestamp).toLocaleDateString()}</div>
            </div>
          </div>

          <Link to={`/recipe/${recipe.id}`}>
            <h3 className="font-bold text-lg text-wasfah-deep-teal mb-1">{recipe.title}</h3>
          </Link>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
        </div>

        <Link to={`/recipe/${recipe.id}`}>
          <div
            className="w-full h-56 bg-cover bg-center"
            style={{ backgroundImage: `url(${recipe.image})` }}
          />
        </Link>

        <div className="p-4">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <div className="flex items-center mr-4">
              <Heart className={`h-4 w-4 mr-1 ${recipe.isLiked ? 'fill-wasfah-coral-red text-wasfah-coral-red' : ''}`} />
              <span>{recipe.likes} likes</span>
            </div>
            <div className="flex items-center mr-4">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{recipe.comments} comments</span>
            </div>
            <div className="flex items-center">
              <Share2 className="h-4 w-4 mr-1" />
              <span>{recipe.shares} shares</span>
            </div>
          </div>

          <div className="flex space-x-2 border-t border-b py-2">
            <Button
              variant="ghost"
              size="sm"
              className={`flex-1 ${recipe.isLiked ? 'text-wasfah-coral-red' : ''}`}
              onClick={() => onLike(recipe.id)}
              aria-label="Like"
            >
              <Heart className={`h-4 w-4 mr-2 ${recipe.isLiked ? 'fill-wasfah-coral-red' : ''}`} />
              Like
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1"
              onClick={() => setShowComments(!showComments)}
              aria-label="Comment"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Comment
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1"
              onClick={() => onShare(recipe.id)}
              aria-label="Share"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {showComments && (
            <div className="mt-4 space-y-4">
              <ScrollArea className="h-48 pr-4">
                <div className="space-y-4">
                  {comments.map(comment => (
                    <div key={comment.id} className="flex">
                      <Avatar className="h-8 w-8 mr-3 mt-1">
                        <AvatarImage src={comment.avatar} />
                        <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <div className="font-medium text-sm">{comment.author}</div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span className="mr-2">{comment.timestamp}</span>
                          <button className="hover:text-wasfah-coral-red">Like ({comment.likes})</button>
                          <span className="mx-2">•</span>
                          <button>Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex items-center mt-3">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Input
                  className="flex-1 bg-gray-100 border-0"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  aria-label="Comment input"
                />
                <Button
                  size="sm"
                  className="ml-2"
                  onClick={handleComment}
                  disabled={!commentText.trim()}
                  aria-label="Post comment"
                >
                  Post
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityPage;
