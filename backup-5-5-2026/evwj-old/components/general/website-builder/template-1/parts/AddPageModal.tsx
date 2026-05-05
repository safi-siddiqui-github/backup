import React from 'react';
import Modal from '../Modal';

type Props = {
  open: boolean;
  onClose: () => void;
  createPage: (title?: string, templateKey?: string, slugOverride?: string) => { id: string; initialBlocks: any[] } | undefined;
  onOpenEditorForId?: (id: string) => void;
};

export default function AddPageModal({ open, onClose, createPage, onOpenEditorForId }: Props) {
  const [newPageTemplate, setNewPageTemplate] = React.useState<string>('blank');
  const [newPageTitle, setNewPageTitle] = React.useState<string>('');
  const [newPageSlug, setNewPageSlug] = React.useState<string>('');

  return (
    <Modal open={!!open} title="Add New Page" onClose={onClose}>
      <div className="space-y-4">
        <p className="text-sm text-gray-600">Choose a template and configure your new page</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { key: 'blank', name: 'Blank Page', desc: 'Start with an empty page' },
            { key: 'about', name: 'About', desc: 'Tell your story' },
            { key: 'contact', name: 'Contact', desc: 'Contact information and form' },
            { key: 'gallery', name: 'Gallery', desc: 'Photo and media gallery' },
            { key: 'schedule', name: 'Schedule', desc: 'Event timeline and agenda' },
            { key: 'testimonials', name: 'Testimonials', desc: 'Customer reviews and feedback' },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => {
                const title = t.name;
                const result = createPage(title, t.key);
                onClose();
                setNewPageTitle('');
                setNewPageSlug('');
                setNewPageTemplate('blank');
                if (result && result.initialBlocks && result.initialBlocks.length > 0) {
                  onOpenEditorForId?.(result.initialBlocks[0].id);
                }
              }}
              className={`text-left rounded border p-3 hover:shadow border-gray-200`}>
              <div className="font-medium">{t.name}</div>
              <div className="text-xs text-gray-500">{t.desc}</div>
            </button>
          ))}
        </div>

        <div>
          <label className="block text-xs text-gray-600">Page Name</label>
          <input value={newPageTitle} onChange={(e) => setNewPageTitle(e.target.value)} placeholder="e.g., About Us" className="mt-1 w-full rounded border px-2 py-1 dark:bg-gray-800 dark:border-gray-700" />
        </div>

        <div>
          <label className="block text-xs text-gray-600">Page Path</label>
          <div className="mt-1 flex">
            <div className="inline-flex items-center rounded-l border border-r-0 px-3 bg-gray-50 text-sm">/</div>
            <input value={newPageSlug} onChange={(e) => setNewPageSlug(e.target.value)} placeholder="about-us" className="flex-1 rounded-r border px-2 py-1 dark:bg-gray-800 dark:border-gray-700" />
          </div>
          <div className="text-xs text-gray-400 mt-1">Preview: /{newPageSlug || newPageTitle.toLowerCase().replace(/\s+/g, '-')}</div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={() => { onClose(); setNewPageTitle(''); setNewPageSlug(''); setNewPageTemplate('blank'); }} className="rounded border px-3 py-1">Cancel</button>
          <button onClick={() => {
            const title = newPageTitle || 'New Page';
            const result = createPage(title, newPageTemplate || 'blank', newPageSlug || undefined);
            onClose();
            setNewPageTitle(''); setNewPageSlug(''); setNewPageTemplate('blank');
            if (result && result.initialBlocks && result.initialBlocks.length > 0) {
              onOpenEditorForId?.(result.initialBlocks[0].id);
            }
          }} className="rounded bg-blue-600 px-3 py-1 text-white">Create Page</button>
        </div>
      </div>
    </Modal>
  );
}
