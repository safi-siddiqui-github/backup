import React from 'react';
import Modal from '../Modal';

export default function PreviewModal({ open, onClose, blocks }: { open: boolean; onClose: () => void; blocks: any[] }) {
  return (
    <Modal open={!!open} title="Preview" onClose={onClose}>
      <div className="p-4">
        <h3 className="mb-3 text-lg font-semibold">Page preview</h3>
        <div className="space-y-4">
          {blocks.map((b) => (
            <div key={b.id} className="rounded-md p-3 bg-gray-50 dark:bg-gray-800">
              <div className="text-sm font-medium">{b.type}</div>
              <pre className="text-xs text-gray-500 mt-1">{JSON.stringify(b.data, null, 2)}</pre>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
