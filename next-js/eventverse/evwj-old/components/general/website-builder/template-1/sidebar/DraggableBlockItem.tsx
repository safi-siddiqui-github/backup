import React, { ReactNode } from 'react';
import ProBadge from './ProBadge';
 

interface DraggableBlockItemProps {
  icon: ReactNode;
  title: string;
  tag: string;
  isPro?: boolean;
  onClick?: () => void;
}

export default function DraggableBlockItem({ icon, title, tag, isPro = false, onClick }: DraggableBlockItemProps) {
  return (
    <div
      tabIndex={0}
      role="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-lg bg-white p-3 shadow-sm transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 dark:bg-gray-800 ${isPro ? 'ring-1 ring-amber-200/60' : ''} border border-transparent hover:border-sky-400/40 dark:hover:border-sky-500/40 cursor-pointer`}
    >
      <div className="shrink-0 text-gray-500 dark:text-gray-400">{icon}</div>
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex items-center">
          <span className="font-medium text-gray-900 dark:text-white">{title}</span>
          {isPro && <div className="ml-2 lg:hidden"><ProBadge /></div>}
        </div>
        <span className="mt-0.5 inline-block rounded-full bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">{tag}</span>
      </div>
      {isPro && <div className="ml-2 hidden lg:block"><ProBadge /></div>}
    </div>
  );
}
