import React, { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    // prevent body scroll while modal is open
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center px-4 py-6 sm:py-12"
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Modal'}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl transform overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-900 sm:mx-4">
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-4 py-3 dark:border-gray-800">
          <div className="text-sm font-semibold text-gray-900 dark:text-white">{title}</div>
          <button onClick={onClose} aria-label="Close" className="rounded-md p-1 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[72vh] overflow-auto p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
