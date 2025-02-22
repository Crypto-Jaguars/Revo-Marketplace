import React from "react";
import { useTranslations } from "next-intl";

interface ToggleUserTypeProps {
  activeType: "farmer" | "buyer";
  onChange: (type: "farmer" | "buyer") => void;
}

const ToggleUserType: React.FC<ToggleUserTypeProps> = ({ activeType, onChange }) => {
  const t = useTranslations("HowItWorks.toggle");

  return (
    <div className="relative flex items-center bg-white rounded-full p-1 shadow-md border border-gray-300">
      <div
        className={`absolute top-1 left-1 h-[85%] bg-[#375B42] rounded-full transition-all duration-300`}
        style={{
          width: `calc(50% - 5px)`, 
          transform: activeType === "buyer" ? "translateX(100%)" : "translateX(0)",
        }}
      />
      <button
        onClick={() => onChange("farmer")}
        className="relative z-10 flex-1 text-lg font-semibold transition-colors duration-300 px-4 py-2"
        style={{ color: activeType === "farmer" ? "white" : "#4B5563" }}
      >
        {t("farmer")}
      </button>
      <button
        onClick={() => onChange("buyer")}
        className="relative z-10 flex-1 text-lg font-semibold transition-colors duration-300 px-4 py-2"
        style={{ color: activeType === "buyer" ? "white" : "#4B5563" }}
      >
        {t("buyer")}
      </button>
    </div>
  );
};

export default ToggleUserType;
