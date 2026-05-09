import React from 'react';

type Page = { id: string; title: string; slug: string; blocks: any[] };

export default function PageNav({ pages, currentPageId, onSelectPage, onAdd }: { pages: Page[]; currentPageId: string; onSelectPage: (id: string) => void; onAdd: () => void }) {
  return (
    <div className="mx-auto mt-4 max-w-8xl px-4">
      <nav className="flex items-center gap-3 overflow-auto">
        {pages.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelectPage(p.id)}
            className={`rounded-md px-3 py-1 text-sm ${p.id === currentPageId ? 'bg-indigo-600 text-white' : 'bg-white/10 text-gray-700 dark:text-gray-200'}`}>
            {p.title}
          </button>
        ))}
        <button onClick={onAdd} className="rounded-md px-3 py-1 text-sm bg-white/10 text-gray-700 dark:text-gray-200">+ Add page</button>
      </nav>
    </div>
  );
}
