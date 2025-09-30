"use client";

import Link from "next/link";
import { Wheat } from "lucide-react"; 
import { useState } from "react";
import clsx from "clsx";

export default function FloatingButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="hidden md:block fixed top-6 right-6 z-50">
      <Link
        href="/producers"
        aria-label="Support your local producer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className={clsx(
          "flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500",
          "bg-gradient-to-br from-[#38b66a] to-[#1f5f35] hover:scale-110 hover:shadow-2xl"
        )}
      >
        <Wheat className="w-8 h-8 text-white" />
      </Link>

      {/* Tooltip */}
      <div
        className={clsx(
          "absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-2 rounded-md text-sm text-white bg-gray-800 shadow-md transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        Support your local producer
      </div>
    </div>
  );
}
