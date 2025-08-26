'use client';

import React from 'react';
import { X } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  t: (key: string) => string; 
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, t }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 relative max-w-lg w-full">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          aria-label="Close login modal"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold text-center mb-5">{t('SignIn.title')}</h2>
        <div className="flex flex-col gap-3">
          <button style={{color:'white'}} className="py-2 px-4 bg-gradient-to-b from-green-500 to-green-700 text-white text-sm font-semibold rounded-full border-2 border-green-800 shadow-lg transition-transform transform hover:scale-105 hover:brightness-95 active:translate-y-px">
            {t('LoginModal.farmerButton')}
          </button>
          <button style={{color:'white'}} className="py-2 px-4 bg-gradient-to-b from-green-500 to-green-700 text-white text-sm font-semibold rounded-full border-2 border-green-800 shadow-lg transition-transform transform hover:scale-105 hover:brightness-95 active:translate-y-px">
            {t('LoginModal.buyerButton')}
          </button>
          <button className="border border-green-600 text-green-600 py-2 rounded-full shadow-md hover:bg-green-50 transition-colors text-sm">
            {t('LoginModal.walletButton')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;