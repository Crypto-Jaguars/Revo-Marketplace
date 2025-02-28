import React from "react";
import { useTranslations } from "next-intl";

interface ToggleUserTypeProps {
  activeType: "farmer" | "buyer";
  onChange: (type: "farmer" | "buyer") => void;
}

const ToggleUserType: React.FC<ToggleUserTypeProps> = ({ activeType, onChange }) => {
  const t = useTranslations("HowItWorks.toggle");

  return (
    <div
      role="group"
      aria-label={t("switchUserType")}
      className="relative flex items-center bg-white rounded-full p-1 shadow-md border border-gray-300"
    >
      <div
        className="absolute top-1 left-1 h-[85%] bg-primary_green rounded-full transition-transform duration-300"
        style={{
          width: `calc(50% - 5px)`, 
          transform: activeType === "buyer" ? "translate3d(100%, 0, 0)" : "translate3d(0, 0, 0)",
        }}
        aria-hidden="true"
      />
      <button
        onClick={() => onChange("farmer")}
        className="relative z-10 flex-1 text-lg font-semibold transition-colors duration-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary_green"
        style={{ color: activeType === "farmer" ? "white" : "#4B5563" }}
        aria-pressed={activeType === "farmer"}
      >
        {t("farmer")}
      </button>
      <button
        onClick={() => onChange("buyer")}
        className="relative z-10 flex-1 text-lg font-semibold transition-colors duration-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary_green"
        style={{ color: activeType === "buyer" ? "white" : "#4B5563" }}
        aria-pressed={activeType === "buyer"}
      >
        {t("buyer")}
      </button>
    </div>
  );
};

export default ToggleUserType;
