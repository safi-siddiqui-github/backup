import React, { useState, useEffect } from 'react';
import Modal from './Modal';

export default function TemplateNavbarEditor({
  open,
  initial,
  onClose,
  onSave,
}: {
  open: boolean;
  initial?: any;
  onClose: () => void;
  onSave: (settings: any) => void;
}) {
  const initialBg = typeof initial?.bg === 'string' && initial.bg.trim().startsWith('#') ? initial.bg : (typeof initial?.bg === 'string' && initial.bg.trim().startsWith('rgb') ? initial.bg : '#7c3aed');
  const [logoText, setLogoText] = useState(initial?.logoText || 'EventDome');
  const [logoUrl, setLogoUrl] = useState(initial?.logoUrl || '');
  const [bg, setBg] = useState<string>(initialBg);
  const [buttonColor, setButtonColor] = useState(initial?.buttonColor || '#ffffff');
  const [buttonTextColor, setButtonTextColor] = useState(initial?.buttonTextColor || '#4f46e5');
  const [showAuth, setShowAuth] = useState(initial?.showAuth ?? true);

  useEffect(() => {
    setLogoText(initial?.logoText || 'EventDome');
    setLogoUrl(initial?.logoUrl || '');
    setBg(typeof initial?.bg === 'string' ? initial.bg : '#7c3aed');
    setButtonColor(initial?.buttonColor || '#ffffff');
    setButtonTextColor(initial?.buttonTextColor || '#4f46e5');
    setShowAuth(initial?.showAuth ?? true);
  }, [initial]);

  function handleSave() {
    onSave({ logoText, logoUrl, bg, buttonColor, buttonTextColor, showAuth });
    onClose();
  }

  return (
    <Modal open={open} title="Edit Navbar" onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Logo text</label>
          <input value={logoText} onChange={(e) => setLogoText(e.target.value)} className="mt-1 w-full rounded border px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Logo image URL</label>
          <input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className="mt-1 w-full rounded border px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Navbar background (solid color)</label>
          <div className="mt-3 flex items-center gap-3">
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-12 h-10 p-0 border rounded" />
            <input value={bg} onChange={(e) => setBg(e.target.value)} className="mt-1 w-full rounded border px-3 py-2" />
          </div>

          <div className="mt-3">
            <div className="text-sm text-gray-700 mb-2">Preview</div>
            <div className={`rounded-md p-3 text-white`} style={{ background: bg }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/30 rounded flex items-center justify-center text-xs">{logoText?.slice(0,2) ?? 'ED'}</div>
                  <div className="text-sm font-semibold">{logoText || 'EventDome'}</div>
                </div>
                <div className="flex items-center gap-2">
                  {showAuth && (
                    <>
                      <button className="text-sm px-2 py-0.5 rounded bg-white/20">Login</button>
                      <button style={{ backgroundColor: buttonColor, color: buttonTextColor }} className="text-sm px-2 py-0.5 rounded font-semibold">Sign Up</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Button color (hex)</label>
            <input value={buttonColor} onChange={(e) => setButtonColor(e.target.value)} className="mt-1 w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Button text color (hex)</label>
            <input value={buttonTextColor} onChange={(e) => setButtonTextColor(e.target.value)} className="mt-1 w-full rounded border px-3 py-2" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input id="showAuth" type="checkbox" checked={showAuth} onChange={(e) => setShowAuth(e.target.checked)} />
          <label htmlFor="showAuth" className="text-sm text-gray-700">Show Login / Sign Up buttons</label>
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={(e) => { e.stopPropagation(); onClose && onClose(); }} className="rounded border px-3 py-1">Cancel</button>
          <button type="button" onClick={(e) => { e.stopPropagation(); handleSave(); }} className="rounded bg-indigo-600 px-3 py-1 text-white">Save</button>
        </div>
      </div>
    </Modal>
  );
}
