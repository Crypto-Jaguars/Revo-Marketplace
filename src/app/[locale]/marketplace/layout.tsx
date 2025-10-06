import MarketplaceHeader from '@/components/marketplace/header/MarketplaceHeader';

interface MarketplaceLayoutProps {
  children: React.ReactNode;
}

export default function MarketplaceLayout({ children }: MarketplaceLayoutProps) {
  return (
    <>
      <MarketplaceHeader />
      {children}
    </>
  );
}
