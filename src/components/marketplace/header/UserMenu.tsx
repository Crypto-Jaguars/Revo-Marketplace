import React from 'react';
import { UserCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslations } from 'next-intl';
import { useWallet } from '@/wallet/hooks/useWallet.hook';
import { useWalletStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useLanguageStore } from '@/store';

interface UserMenuProps {
  className?: string;
}

export function UserMenu({ className }: UserMenuProps) {
  const t = useTranslations('Marketplace.user');
  const { connectWallet, disconnectWallet } = useWallet();
  const { address } = useWalletStore();
  const { language } = useLanguageStore();
  const router = useRouter();

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      if (disconnectWallet) {
        await disconnectWallet();
        router.push(`/${language}`);
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 hover:opacity-80 transition-opacity">
          <UserCircle className="w-6 h-6 text-primary_green dark:bg-background-dark" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 p-1">
        {!address ? (
          <DropdownMenuItem
            onClick={handleConnect}
            className="cursor-pointer text-center justify-center font-medium"
          >
            {t('connect')}
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{t('wallet')}</p>
                <p className="text-xs text-muted-foreground">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push(`/${language}/account`)}>
              {t('profile')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(`/${language}/orders`)}>
              {t('orders')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDisconnect}>{t('disconnect')}</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
