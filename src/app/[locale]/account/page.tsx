'use client';

import WithAuthProtect from '@/constants/helpers/WithAuth';
import { ProfileForm } from '@/components/account/ProfileForm';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

function AccountPage() {
  const t = useTranslations('Account');

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      {/* Header breadcrumb */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-500">
            {t('page.breadcrumb.home')}
          </Link>
          <span className="text-gray-500">/</span>
          <span>{t('page.breadcrumb.account')}</span>
        </div>
        <div className="text-sm">{t('page.welcome', { name: 'Diego' })}</div>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Navigation */}
        <aside className="w-64">
          <div className="space-y-8">
            <div>
              <h2 className="font-semibold mb-4">{t('page.navigation.manageAccount.title')}</h2>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-600 text-sm hover:text-black">
                  {t('page.navigation.manageAccount.profile')}
                </Link>
                <Link href="#" className="block text-gray-600 text-sm hover:text-black">
                  {t('page.navigation.manageAccount.address')}
                </Link>
              </div>
            </div>

            <div>
              <h2 className="font-semibold mb-4">{t('page.navigation.orders.title')}</h2>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-600 text-sm hover:text-black">
                  {t('page.navigation.orders.returns')}
                </Link>
                <Link href="#" className="block text-gray-600 text-sm hover:text-black">
                  {t('page.navigation.orders.cancellations')}
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          <h1 className="text-xl font-medium text-[#375B42] mb-6">{t('page.title')}</h1>
          <ProfileForm />
        </main>
      </div>
    </div>
  );
}

export default WithAuthProtect(AccountPage);
