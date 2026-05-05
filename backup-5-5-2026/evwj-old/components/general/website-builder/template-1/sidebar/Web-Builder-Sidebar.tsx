import React from 'react';
import { Lightbulb, X } from 'lucide-react';
import DraggableBlockItem from './DraggableBlockItem';
import SidebarSection from './SidebarSection';
import { blockConfig } from './block-config';

interface SidebarProps {
  isVisible: boolean;
  onClose?: () => void;
  onAddBlock?: (blockType: string) => void;
}

export default function Sidebar({ isVisible, onClose, onAddBlock }: SidebarProps) {
  if (!isVisible) return null;

  return (
    <aside className="w-96 shrink-0 rounded-xl bg-white/80 p-4 shadow-lg dark:bg-gray-900/80">
      <div className="sticky top-4 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Add Content Blocks</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Drag blocks to build your page</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-2 -mr-1 rounded-md p-2 text-gray-600 hover:bg-gray-100 lg:hidden dark:text-gray-300 dark:hover:bg-gray-800 cursor-pointer" aria-label="Close sidebar">
            <X size={18} />
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-col space-y-6 overflow-auto px-1 pb-4">
        {blockConfig.map((section) => (
          <SidebarSection key={section.title} icon={section.icon} title={section.title}>
            {section.items.filter((it: any) => it && it.title && it.tag).map((item: any) => (
              <DraggableBlockItem
                key={item.title as string}
                icon={item.icon}
                title={item.title as string}
                tag={item.tag as string}
                isPro={item.isPro}
                onClick={() => onAddBlock?.(item.tag as string)}
              />
            ))}
          </SidebarSection>
        ))}
      </div>

      <div className="sticky bottom-4 mt-4">
        <div className="rounded-lg bg-linear-to-r from-sky-50 to-indigo-50 p-3 text-sm text-sky-800 dark:from-gray-800 dark:to-gray-900 dark:text-sky-200">
          <div className="flex items-start gap-2">
            <Lightbulb size={16} className="mt-0.5 shrink-0" />
            <p><strong>Tip:</strong> Click a block to add it to the canvas and then customize it.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
