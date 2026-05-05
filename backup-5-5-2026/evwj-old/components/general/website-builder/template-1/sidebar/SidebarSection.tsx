import React, { ReactNode } from 'react';

interface SidebarSectionProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export default function SidebarSection({ icon, title, children }: SidebarSectionProps) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-gray-500 dark:text-gray-400">{icon}</span>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
      </div>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
