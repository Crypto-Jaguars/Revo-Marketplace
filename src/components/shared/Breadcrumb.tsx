"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
  items: { label: string; href: string; isCurrent?: boolean }[]; 
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {

  const pathname = usePathname();

  const getCurrentTranslation = (pathname: string) => {
    const pathParts = pathname.split('/');
    const translationPath = pathParts.filter(part => part === "es" || part === "en");
    return translationPath[0] || "en";
  }

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4">
      <ol className="list-none p-0 inline-flex">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.isCurrent ? (
              <span className="text-black">{item.label}</span> 
            ) : (
              <Link href={item.href === '/' ? item.href : `/${getCurrentTranslation(pathname)}${item.href}`} className="hover:underline">
                {item.label}
              </Link>
            )}
            {index < items.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
