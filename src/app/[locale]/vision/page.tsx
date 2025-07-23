'use client';

import Team from '@/components/about/team';
import Testimonials from '@/components/about/testimonials';
import VisionMission from '@/components/about/visionMission';
import WithAuthProtect from '@/constants/helpers/WithAuth';
import { useTranslations } from 'next-intl';

function VisionPage() {
  const t = useTranslations('Account');

  return (
    <>
      <VisionMission />
      <Team />
      <Testimonials />
    </>
  );
}

export default WithAuthProtect(VisionPage);
