'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center text-center bg-[#CFE7E7]">
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl text-green-900 px-6"
      >
        <h1 className="text-5xl font-bold mb-4"> Revolutionary Farmers </h1>
        <p className="text-lg mb-6">
          Empowering farmers through blockchain-powered trust and transparency.
        </p>

        {/* Buttons CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 text-lg">
            <Link href="/marketplace"> Explore the Marketplace → </Link>
          </Button>
          <Button
            asChild
            className="bg-white text-green-700 hover:bg-gray-200 px-6 py-3 text-lg border border-green-700"
          >
            <a href="/join-farmer"> Join as a Farmer </a>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
