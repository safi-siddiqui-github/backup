"use client";

import React from 'react';
import type { Icon as LucideIcon } from 'lucide-react';

const TabButton = ({ icon: Icon, label, active, onClick }: { icon: any; label: string; active: boolean; onClick: () => void }) => (
  <button
    className={`py-2 px-3 flex-1 text-sm font-medium flex items-center justify-center transition-colors ${
      active
        ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
    }`}
    onClick={onClick}
  >
    <Icon size={16} className="mr-1" /> {label}
  </button>
);

export default TabButton;
