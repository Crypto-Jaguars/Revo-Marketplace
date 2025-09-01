'use client';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { Twitter, Linkedin, MessageCircle, Share2 } from 'lucide-react';

export function SocialShareButtons() {
  const t = useTranslations('Waitlist.social');
  
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const shareText = t('shareText');
  const hashtags = 'RevoFarmers,AgTech,Blockchain';

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtags}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleGenericShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Revolutionary Farmers',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        variant="outline"
        size="sm"
        onClick={handleTwitterShare}
        className="bg-blue-500 text-white hover:bg-blue-600 border-0"
      >
        <Twitter className="w-4 h-4 mr-1" />
        Twitter
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleLinkedInShare}
        className="bg-blue-700 text-white hover:bg-blue-800 border-0"
      >
        <Linkedin className="w-4 h-4 mr-1" />
        LinkedIn
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleWhatsAppShare}
        className="bg-green-500 text-white hover:bg-green-600 border-0"
      >
        <MessageCircle className="w-4 h-4 mr-1" />
        WhatsApp
      </Button>

      {typeof navigator !== 'undefined' && 'share' in navigator && typeof navigator.share === 'function' && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleGenericShare}
          className="bg-gray-600 text-white hover:bg-gray-700 border-0"
        >
          <Share2 className="w-4 h-4 mr-1" />
          {t('share')}
        </Button>
      )}
    </div>
  );
}