import React from "react";
import FeatureCard from "./FeatureCard";
import { useTranslations } from "next-intl";
import { ShieldCheck, Users, Leaf } from "lucide-react";

const AboutUs = () => {
  const t = useTranslations("AboutUs");

  const features = [
    {
      icon: <ShieldCheck className="w-14 h-14 text-green-600" />,
      title: t("features.smartContracts.title"),
      description: t("features.smartContracts.description")
    },
    {
      icon: <Users className="w-14 h-14 text-green-600" />,
      title: t("features.trustSystem.title"),
      description: t("features.trustSystem.description")
    },
    {
      icon: <Leaf className="w-14 h-14 text-green-600" />,
      title: t("features.supplyChain.title"),
      description: t("features.supplyChain.description")
    }
  ];

  return (
    <section className="w-full flex justify-center py-24 text-center bg-white">
      <div className="max-w-6xl w-full px-10">
        <h2 className="text-5xl font-bold text-gray-900 mb-14">{t("title")}</h2>
        <p className="mt-8 text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
          {t("description")}
        </p>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
