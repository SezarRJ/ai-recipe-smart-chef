
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Eye, Award, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  content: string;
  timestamp: string;
}

export interface RecipeSocialInteractionsProps {
  recipeId: string;
  commentCount: number;
  shares: number;
  rating: number;
  ratingCount: number;
  usedCount: number;
  isLiked?: boolean;
  comments?: Comment[];
  onLike?: (recipeId: string) => void;
  onShare?: (recipeId: string) => void;
  onComment?: (recipeId: string, comment: string) => void;
  className?: string;
  variant?: 'default' | 'compact';
}

export const RecipeSocialInteractions: React.FC<RecipeSocialInteractionsProps> = ({
  recipeId,
  commentCount,
  shares,
  rating,
  ratingCount,
  usedCount,
  isLiked = false,
  comments = [],
  onLike,
  onShare,
  onComment,
  className,
  variant = 'default',
}) => {
  const { toast } = useToast();
  const [liked, setLiked] = useState<boolean>(isLiked);
  const [localCommentCount, setLocalCommentCount] = useState<number>(commentCount);
  const [localShares, setLocalShares] = useState<number>(shares);
  const [showCommentsDialog, setShowCommentsDialog] = useState<boolean>(false);
  const [showShareDialog, setShowShareDialog] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>('');
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  
  // Format the rating to one decimal place if it's not a whole number
  const formattedRating = rating % 1 === 0 ? rating : rating.toFixed(1);
  
  const handleLike = () => {
    setLiked(prev => !prev);
    toast({
      title: liked ? "Removed from favorites" : "Added to favorites",
      description: liked ? "Recipe removed from your favorites" : "Recipe added to your favorites",
    });
    if (onLike) onLike(recipeId);
  };
  
  const handleShare = () => {
    setShowShareDialog(true);
    if (onShare) onShare(recipeId);
  };
  
  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        userId: 'current-user',
        username: 'You',
        content: newComment,
        timestamp: new Date().toISOString(),
      };
      
      setLocalComments(prev => [comment, ...prev]);
      setLocalCommentCount(prev => prev + 1);
      setNewComment('');
      
      toast({
        title: "Comment added",
        description: "Your comment has been added to this recipe",
      });
      
      if (onComment) onComment(recipeId, newComment);
    }
  };
  
  const shareToSocial = (platform: string) => {
    setLocalShares(prev => prev + 1);
    setShowShareDialog(false);
    toast({
      title: "Recipe shared",
      description: `Recipe has been shared to ${platform}`,
    });
  };

  return (
    <div className={cn("flex flex-wrap items-center text-sm text-gray-500", className)}>
      <div className="mr-4 flex items-center">
        <Eye className="h-4 w-4 mr-1" />
        <span>{usedCount} used</span>
      </div>
      
      <div className="mr-4 flex items-center">
        <Award className="h-4 w-4 mr-1 text-yellow-500" />
        <span>{formattedRating} ({ratingCount})</span>
      </div>
      
      <div className="flex-1"></div>
      
      <button
        onClick={handleLike}
        className={cn(
          "flex items-center mr-3 transition-colors", 
          liked ? "text-red-500" : "hover:text-red-500"
        )}
      >
        <Heart className={cn("h-4 w-4 mr-1", liked ? "fill-current" : "")} />
        {variant === 'default' && <span>Favorite</span>}
      </button>
      
      <button 
        onClick={() => setShowCommentsDialog(true)}
        className="flex items-center mr-3 hover:text-wasfah-deep-teal transition-colors"
      >
        <MessageCircle className="h-4 w-4 mr-1" />
        {variant === 'default' ? <span>Comments ({localCommentCount})</span> : <span>{localCommentCount}</span>}
      </button>
      
      <button 
        onClick={handleShare}
        className="flex items-center hover:text-wasfah-bright-teal transition-colors"
      >
        <Share2 className="h-4 w-4 mr-1" />
        {variant === 'default' ? <span>Share ({localShares})</span> : <span>{localShares}</span>}
      </button>
      
      {/* Comments Dialog */}
      <Dialog open={showCommentsDialog} onOpenChange={setShowCommentsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
            <DialogDescription>
              View and add comments for this recipe.
            </DialogDescription>
          </DialogHeader>
          
          <div className="max-h-[50vh] overflow-y-auto">
            <div className="space-y-4 py-4">
              {localComments.length > 0 ? (
                localComments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Avatar className="h-8 w-8">
                      {comment.avatar && <AvatarImage src={comment.avatar} alt={comment.username} />}
                      <AvatarFallback>{comment.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-sm">{comment.username}</p>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{comment.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-20"
            />
            <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
              Post Comment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Recipe</DialogTitle>
            <DialogDescription>
              Share this amazing recipe with others!
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-3 py-4">
            <Button variant="outline" onClick={() => shareToSocial("WhatsApp")} className="w-full">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.57-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"></path>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm.029 18.88c-1.739 0-3.444-.426-4.96-1.232l-3.493 1.146 1.169-3.467a10.29 10.29 0 0 1-1.337-5.059c.001-5.699 4.648-10.346 10.347-10.346 5.7 0 10.346 4.648 10.346 10.347 0 5.699-4.647 10.346-10.346 10.346-.015 0-.029 0-.044-.001-.024.001-.054.001-.082.001z"></path>
              </svg>
              WhatsApp
            </Button>
            <Button variant="outline" onClick={() => shareToSocial("Facebook")} className="w-full">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.1 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0"></path>
              </svg>
              Facebook
            </Button>
            <Button variant="outline" onClick={() => shareToSocial("Twitter")} className="w-full">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.044.765.126 1.125C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-14 0-.21-.005-.418-.014-.627.961-.689 1.8-1.56 2.46-2.548z"></path>
              </svg>
              Twitter
            </Button>
            <Button variant="outline" onClick={() => shareToSocial("Email")} className="w-full">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z"></path>
              </svg>
              Email
            </Button>
          </div>
          
          <DialogFooter>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast({
                  title: "Link copied",
                  description: "Recipe link copied to clipboard",
                });
              }}
            >
              Copy Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
