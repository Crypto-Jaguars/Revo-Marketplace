import type { ReactNode } from 'react';

interface OrderHistoryLayoutProps {
  sidebar: ReactNode;
  content: ReactNode;
}

export function OrderHistoryLayout({ sidebar, content }: OrderHistoryLayoutProps) {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        <aside className="space-y-6">{sidebar}</aside>
        <main>{content}</main>
      </div>
    </div>
  );
}
