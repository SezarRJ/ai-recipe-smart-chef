
import React from 'react';
import { Share2, Facebook, Instagram, Twitter, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/components/analytics/GoogleAnalytics';

interface SocialShareProps {
  title: string;
  description: string;
  imageUrl?: string;
  url?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({
  title,
  description,
  imageUrl,
  url = window.location.href,
}) => {
  const { toast } = useToast();

  const shareData = {
    title,
    text: description,
    url,
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        trackEvent('recipe_share', { method: 'native' });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: 'Link copied!',
        description: 'Recipe link has been copied to clipboard.',
      });
      trackEvent('recipe_share', { method: 'copy_link' });
    } catch (error) {
      toast({
        title: 'Failed to copy',
        description: 'Please copy the link manually.',
        variant: 'destructive',
      });
    }
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    trackEvent('recipe_share', { method: 'facebook' });
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    trackEvent('recipe_share', { method: 'twitter' });
  };

  const shareToInstagram = () => {
    // Instagram doesn't have a direct web share API
    // This would typically open the Instagram app or direct to posting
    toast({
      title: 'Instagram Sharing',
      description: 'Copy the link and share it in your Instagram story or post!',
    });
    handleCopyLink();
    trackEvent('recipe_share', { method: 'instagram' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Share Recipe
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button onClick={handleNativeShare} className="w-full" variant="outline">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={shareToFacebook} variant="outline" className="text-blue-600">
            <Facebook className="h-4 w-4 mr-2" />
            Facebook
          </Button>
          <Button onClick={shareToTwitter} variant="outline" className="text-blue-400">
            <Twitter className="h-4 w-4 mr-2" />
            Twitter
          </Button>
          <Button onClick={shareToInstagram} variant="outline" className="text-pink-600">
            <Instagram className="h-4 w-4 mr-2" />
            Instagram
          </Button>
          <Button onClick={handleCopyLink} variant="outline">
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialShare;
