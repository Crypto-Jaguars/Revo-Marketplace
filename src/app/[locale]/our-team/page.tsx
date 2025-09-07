'use client';

import { FaGithub } from 'react-icons/fa';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
interface TeamMember {
  name: string;
  role: string;
  roleEs: string;
  github: string;
  avatar: string;
  bio: string;
  bioEs: string;
  languages: string;
  expertise: string[];
}

const teamMembers: TeamMember[] = [
  {
    name: 'Francisco Campos',
    role: 'Co-Founder & Full-Stack Developer',
    roleEs: 'Co‑Founder y Desarrollador Full‑Stack',
    github: 'https://github.com/sasasamaes',
    avatar: '/images/francisco.jpg',
    bio: 'Full‑stack development and product architecture.',
    bioEs: 'Desarrollo full‑stack y arquitectura de producto.',
    languages: 'ES, EN',
    expertise: ['Full‑Stack', 'Web', 'Product'],
  },
  {
    name: 'Diego Barquero',
    role: 'Co-Founder & Backend Developer',
    roleEs: 'Co‑Founder y Desarrollador Backend',
    github: 'https://github.com/DiegoB1911',
    avatar: '/images/diego.jpg',
    bio: 'Backend services and integrations.',
    bioEs: 'Servicios backend e integraciones.',
    languages: 'ES, EN',
    expertise: ['Backend', 'APIs'],
  },
  {
    name: 'Sebastián Salazar',
    role: 'Co-Founder & Mobile App Developer',
    roleEs: 'Co‑Founder y Desarrollador de Apps Móviles',
    github: 'https://github.com/salazarsebas',
    avatar: '/images/sebas.jpg',
    bio: 'Mobile experiences and UX.',
    bioEs: 'Experiencias móviles y UX.',
    languages: 'ES, EN',
    expertise: ['Mobile', 'React Native'],
  },
  {
    name: 'Matias Aguilar',
    role: 'Co-Founder & Smart Contract Developer',
    roleEs: 'Co‑Founder y Desarrollador de Smart Contracts',
    github: 'https://github.com/aguilar1x',
    avatar: '/images/matias.jpg',
    bio: 'On-chain logic and security.',
    bioEs: 'Lógica on‑chain y seguridad.',
    languages: 'ES, EN',
    expertise: ['Blockchain', 'Smart Contracts'],
  },
  {
    name: 'Manuel Jiménez G',
    role: 'Co-Founder & Frontend Developer',
    roleEs: 'Co‑Founder y Desarrollador Frontend',
    github: 'https://github.com/ManuelJG1999',
    avatar: '/images/manuel.jpg',
    bio: 'UI engineering and performance.',
    bioEs: 'Ingeniería de UI y desempeño.',
    languages: 'ES, EN',
    expertise: ['Frontend', 'UI'],
  },
];

export default function OurTeamPage() {
  const t = useTranslations('OurTeam');
const isEs = useLocale().startsWith('es');
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-100 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('title')}</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>
      </div>

      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white flex flex-col justify-between  items-center rounded-2xl p-6 text-center shadow-sm border-2 border-green-200"
              >
                <div className="relative mx-auto mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border border-green-400 mx-auto">
                  <Image
                      src={member.avatar || '/placeholder.svg'}
                      alt={`Portrait of ${member.name}`}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <h3 className="text-gray-900 font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{isEs ? member.roleEs : member.role}</p>
                <p className="text-gray-500 text-xs mb-3">{isEs ? member.bioEs : member.bio}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {member.expertise.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="text-gray-500 text-xs mb-3">
                  {' '}
                  <span className="font-medium">{t('languages')}:</span> {member.languages}
                </p>

                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors text-sm font-medium"
                  aria-label={`GitHub profile of ${member.name}`}
                >
                  <FaGithub size={16} />
                  <span>GitHub</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
