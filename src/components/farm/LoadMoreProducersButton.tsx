"use client";

import { MouseEventHandler } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface LoadMoreProducersButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  noWrapper?: boolean;
}

export function LoadMoreProducersButton({
  onClick,
  disabled,
  loading,
  noWrapper = false,
}: LoadMoreProducersButtonProps) {
  const t = useTranslations('Producers');

  const btn = (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={t('loadMoreAria')}
      className="border-[#2a7035] text-[#2a7035] hover:bg-[#2a7035] hover:text-white focus-visible:ring-[#2a7035] transition-colors"
   >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {t('loadMore')}
    </Button>
  );

  if (noWrapper) return btn;

  return <div className="w-full flex justify-center mt-8">{btn}</div>;
}

export default LoadMoreProducersButton;
