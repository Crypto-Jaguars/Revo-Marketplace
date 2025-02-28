import React, { useState } from "react";
import StepCard from "./StepCard";
import ToggleUserType from "./ToggleUserType";
import { useTranslations } from "next-intl";
import { ShoppingCart, CreditCard, Truck, Store, Package, ThumbsUp } from "lucide-react";

const HowItWorks = () => {
  const t = useTranslations("HowItWorks");
  const [activeType, setActiveType] = useState<"farmer" | "buyer">("farmer");

  const farmerSteps = [
    {
      icon: <Store className="w-10 h-10 text-white" />,
      title: t("farmerSteps.listProducts.title"),
      description: t("farmerSteps.listProducts.description")
    },
    {
      icon: <ThumbsUp className="w-10 h-10 text-white" />,
      title: t("farmerSteps.receiveOrders.title"),
      description: t("farmerSteps.receiveOrders.description")
    },
    {
      icon: <Package className="w-10 h-10 text-white" />,
      title: t("farmerSteps.prepareShipment.title"),
      description: t("farmerSteps.prepareShipment.description")
    }
  ];

  const buyerSteps = [
    {
      icon: <ShoppingCart className="w-10 h-10 text-white" />,
      title: t("buyerSteps.browsePurchase.title"),
      description: t("buyerSteps.browsePurchase.description")
    },
    {
      icon: <CreditCard className="w-10 h-10 text-white" />,
      title: t("buyerSteps.securePayment.title"),
      description: t("buyerSteps.securePayment.description")
    },
    {
      icon: <Truck className="w-10 h-10 text-white" />,
      title: t("buyerSteps.deliveryTracking.title"),
      description: t("buyerSteps.deliveryTracking.description")
    }
  ];

  return (
    <section className="w-full flex flex-col items-center py-32 text-center bg-white">
      <div className="max-w-6xl w-full px-6">
        <h2 className="text-5xl font-bold text-gray-900 mb-20">{t("title")}</h2>
        <div className="mb-20 flex justify-center">
          <ToggleUserType activeType={activeType} onChange={setActiveType} />
        </div>
        <div className="mt-20 flex justify-center gap-14 flex-wrap">
          {(activeType === "farmer" ? farmerSteps : buyerSteps).map((step, index) => (
            <StepCard key={index} icon={step.icon} title={step.title} description={step.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
