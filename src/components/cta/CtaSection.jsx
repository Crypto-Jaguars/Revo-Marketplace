"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { useLanguageStore } from "@/store/languageStore" 

export default function CTASection() {
  const t = useTranslations("cta")
  const { language } = useLanguageStore() 
  
  return (
    <section className="w-full bg-[#d8e8ea] py-16">
      <motion.div
        className="container mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.1,
          ease: "easeOut",
        }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">{t("ready")}</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={`/${language}/sales`} // Ruta dinámica con el idioma actual
            className="inline-flex h-12 items-center justify-center rounded-md bg-[#3b5d42] px-8 text-sm font-medium text-white shadow hover:bg-[#2e4a34] focus:outline-none focus:ring-2 focus:ring-[#3b5d42] focus:ring-offset-2 transition-colors duration-200"
          >
            {t("startSelling")}
          </Link>
          <Link
            href={`/${language}/products`} // Ruta dinámica con el idioma actual
            className="inline-flex h-12 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3b5d42] focus:ring-offset-2 transition-colors duration-200"
          >
            {t("exploreProducts")}
          </Link>
        </div>
      </motion.div>
    </section>
  )
}