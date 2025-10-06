
import React from 'react';
import { useTranslations } from 'next-intl';
import { Target, Rocket } from 'lucide-react';
import Image from 'next/image';

const MissionVisionCard = ({ icon, title, points }: { icon: React.ReactNode; title: string; points: { title: string; description: string }[] }) => (
  <div className="rounded-3xl border border-brand-200 bg-gradient-to-b from-emerald-300 to-emerald-600 p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.035] active:scale-[0.97]">
    <div className="flex items-center mb-6">
      {icon}
      <h3 className="text-3xl font-bold text-white ml-4">{title}</h3>
    </div>
    <ul className="space-y-5">
      {points.map((point, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="text-white mt-1 h-2 w-2 rounded-full bg-forest-800 inline-block"></span>
          <div className='-mt-1.5 flex-1'>
            <p className="font-bold text-white text-lg">{point.title}</p>
            <p className="text-white text-sm md:text-base">{point.description}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export function NewMissionVision() {
  const t = useTranslations('NewMissionVision');

  const missionPoints = [
    { title: t('mission.points.0.title'), description: t('mission.points.0.description') },
    { title: t('mission.points.1.title'), description: t('mission.points.1.description') },
    { title: t('mission.points.2.title'), description: t('mission.points.2.description') },
    { title: t('mission.points.3.title'), description: t('mission.points.3.description') },
  ];

  const visionPoints = [
    { title: t('vision.points.0.title'), description: t('vision.points.0.description') },
    { title: t('vision.points.1.title'), description: t('vision.points.1.description') },
    { title: t('vision.points.2.title'), description: t('vision.points.2.description') },
    { title: t('vision.points.3.title'), description: t('vision.points.3.description') },
  ];

  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden">
      <Image
        src="/images/crops-collage.png"
        alt="Background"
        fill
        style={{ objectFit: 'cover' }}
        className="absolute top-0 left-0 w-full h-full -z-10 opacity-[0.07]"
      />
       <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            'radial-gradient(circle at center, rgba(255, 255, 255, 0.1), transparent 70%)',
        }}
      />
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-forest-800 mb-12 text-center">
          {t('title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <MissionVisionCard
            icon={<Target size={40} className="text-white" />}
            title={t('mission.title')}
            points={missionPoints}
          />
          <MissionVisionCard
            icon={<Rocket size={40} className="text-white" />}
            title={t('vision.title')}
            points={visionPoints}
          />
        </div>
      </div>
    </section>
  );
}
