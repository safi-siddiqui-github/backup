"use client";

import React, { useEffect, useRef, useState } from 'react';
import { X, Trash2, Play, Palette, Monitor, Film } from 'lucide-react';
 
import OverlaySettings from '../hero/OverlaySettings';
import TabButton from '../hero/TabButton';

export type BackgroundData = {
  type: 'color' | 'image' | 'video';
  value: string;  
  overlayMode?: 'color' | 'gradient';
  overlayColor?: string;
  overlayOpacity?: number;
  overlayGradient?: string;
}

export type BackgroundType = 'color' | 'image' | 'video' | 'solid';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: BackgroundData;
  onApply: (data: BackgroundData) => void;
};

const PRESET_BACKGROUNDS = [
  { id: 'img1', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1763760523160-4b6f9375ddc5?q=80&w=409&auto=format&fit=crop&ixlib=rb-4.1.0', label: 'Mountains' },
  { id: 'img2', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1763718678099-fdb5c2f9cc50?q=80&w=813&auto=format&fit=crop&ixlib=rb-4.1.0', label: 'Citrus' },
  { id: 'img3', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1763742150863-1e1ce92195bc?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0', label: 'Mountains 2' },
  { id: 'img4', type: 'image', imageUrl: 'https://plus.unsplash.com/premium_photo-1672329273045-fc09b2298fcc?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0', label: 'Citrus 2' },
];

export function BackgroundSelectionModal({ open, onOpenChange, initial, onApply }: Props) {
  const [mounted, setMounted] = useState(false);
  const initialTab: BackgroundType = initial?.type === 'video' ? 'video' : (initial?.type === 'image' ? 'image' : 'color');
  const [tab, setTab] = useState<BackgroundType>(initialTab as BackgroundType);

  const [local, setLocal] = useState<any>({
    bgType: initial?.type || 'color',
    bgColor: initial && initial.type === 'color' ? initial.value : '#ffffff',
    bgImageUrl: initial && initial.type === 'image' ? initial.value : '',
    bgVideoUrl: initial && initial.type === 'video' ? initial.value : '',
    overlayMode: initial?.overlayMode || 'color',
    overlayColor: initial?.overlayColor || '#000000',
    overlayOpacity: typeof initial?.overlayOpacity === 'number' ? initial?.overlayOpacity : 0.4,
    overlayGradient: undefined,
  });

  const [localImageData, setLocalImageData] = useState<string | null>(null);
  const [localVideoData, setLocalVideoData] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    return () => {
    };
  }, []);

  const handleClose = () => {
    setMounted(false);
    setTimeout(() => onOpenChange(false), 220);
  };

  const updateLocal = (k: string, v: any) => setLocal((p: any) => ({ ...p, [k]: v }));

  const handleApply = () => {
    let value = '';
    if (local.bgType === 'color' || local.bgType === 'solid') value = local.bgColor || '';
    if (local.bgType === 'image') value = local.bgImageUrl || '';
    if (local.bgType === 'video') value = local.bgVideoUrl || '';

    const out: BackgroundData = {
      type: local.bgType === 'solid' ? 'color' : (local.bgType as any),
      value,
      overlayMode: local.overlayMode,
      overlayColor: local.overlayColor,
      overlayOpacity: local.overlayOpacity,
    };
    onApply(out);
    handleClose();
  };

  const hexToRgb = (hex: string) => {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
    const int = parseInt(full, 16);
    const r = (int >> 16) & 255;
    const g = (int >> 8) & 255;
    const b = int & 255;
    return { r, g, b };
  };

  const overlayBackground = () => {
    if ((local.overlayMode || 'color') === 'gradient') return local.overlayGradient || '';
    const color = local.overlayColor || '#000000';
    const opacity = typeof local.overlayOpacity === 'number' ? local.overlayOpacity : 0.4;
    const { r, g, b } = hexToRgb(color);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const onChooseImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setLocalImageData(dataUrl);
      updateLocal('bgType', 'image');
      updateLocal('bgImageUrl', dataUrl);
    };
    reader.readAsDataURL(f);
  };

  const onChooseVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setLocalVideoData(dataUrl);
      updateLocal('bgType', 'video');
      updateLocal('bgVideoUrl', dataUrl);
    };
    reader.readAsDataURL(f);
  };

  return (
    open ? (
      <div className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className={`relative bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-xl max-h-[80vh] flex flex-col border border-white/10 transition-all duration-300 transform ${mounted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}`}>
          <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
            <h3 className="text-xl font-semibold dark:text-white">Section Background</h3>
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1">
              <X size={20} />
            </button>
          </div>

          <div className="p-4 grow overflow-y-auto">
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
              <TabButton icon={Palette} label="Color" active={tab === 'color'} onClick={() => setTab('color')} />
              <TabButton icon={Monitor} label="Image" active={tab === 'image'} onClick={() => setTab('image')} />
              <TabButton icon={Film} label="Video" active={tab === 'video'} onClick={() => setTab('video')} />
            </div>

            {tab === 'color' && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Solid Color</label>
                <input
                  title="Background color"
                  type="color"
                  value={local.bgColor || '#ffffff'}
                  onChange={(e) => { updateLocal('bgColor', e.target.value); updateLocal('bgType', 'color'); }}
                  className="w-full h-10 p-1 border rounded-md cursor-pointer dark:bg-gray-700"
                />
              </div>
            )}

            {tab === 'image' && (
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">Upload an image or choose a preset from the gallery below.</div>
                <div className="space-y-3">
                  {(localImageData || local.bgImageUrl) ? (
                    <div className="relative w-full rounded-lg overflow-hidden border bg-black/5 shadow-sm">
                      <div className="aspect-video w-full h-auto bg-gray-100 dark:bg-gray-800 relative">
                        <img src={localImageData || local.bgImageUrl} alt="background preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 pointer-events-none" style={{ background: overlayBackground(), mixBlendMode: 'multiply' }} />
                      </div>
                      <button type="button" title="Remove image" onClick={() => { setLocalImageData(null); updateLocal('bgImageUrl', ''); updateLocal('bgType', local.bgColor ? 'color' : undefined); }} className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1 shadow border">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-full aspect-video rounded-lg border-dashed border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-sm text-gray-500">Upload an image or choose a preset from the gallery below. No image selected</div>
                  )}

                  <div className="flex items-center gap-3">
                    <input ref={imageInputRef} title="Upload image" type="file" accept="image/*" onChange={onChooseImage} className="hidden" />
                    <button type="button" onClick={() => imageInputRef.current?.click()} className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border text-sm">Upload Image</button>
                    {localImageData && <span className="ml-2 text-xs text-gray-500 truncate max-w-[220px]">Uploaded</span>}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3 max-h-48 overflow-y-auto p-1 border rounded-md dark:border-gray-700">
                  {PRESET_BACKGROUNDS.map((bg) => (
                    <div key={bg.id} className={`relative w-full h-20 rounded-md overflow-hidden border-2 transition-all ${bg.type === 'image' && local.bgImageUrl === (bg as any).imageUrl ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'} cursor-pointer flex items-center justify-center`} onClick={() => { updateLocal('bgType', 'image'); updateLocal('bgImageUrl', (bg as any).imageUrl); }}>
                      <img src={(bg as any).imageUrl} alt={bg.label} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-end p-1 bg-linear-to-t from-black/30 text-white text-xs">{bg.label}</div>
                    </div>
                  ))}
                </div>

                <OverlaySettings localBgData={local} updateLocal={(field: keyof any, value: any) => updateLocal(field as string, value)} />
              </div>
            )}

            {tab === 'video' && (
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">Upload a video file (MP4) to use as a background.</div>
                <div className="space-y-3">
                  {(localVideoData || local.bgVideoUrl) ? (
                    <div className="relative w-full rounded-lg overflow-hidden border bg-black/5 shadow-sm">
                      <div className="aspect-video w-full h-auto bg-black relative">
                        <video src={localVideoData || local.bgVideoUrl} className="w-full h-full object-cover" muted loop playsInline controls />
                        <div className="absolute inset-0 pointer-events-none" style={{ background: overlayBackground(), mixBlendMode: 'multiply' }} />
                      </div>
                      <button type="button" title="Remove video" onClick={() => { setLocalVideoData(null); updateLocal('bgVideoUrl', ''); updateLocal('bgType', local.bgColor ? 'color' : undefined); }} className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1 shadow border">
                        <Trash2 size={14} />
                      </button>
                      <div className="absolute left-3 bottom-3 flex items-center gap-2 bg-black/40 text-white text-xs px-2 py-1 rounded"><Play size={14} /><span>Preview</span></div>
                    </div>
                  ) : (
                    <div className="w-full aspect-video rounded-lg border-dashed border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-sm text-gray-500">No video selected</div>
                  )}

                  <div className="flex items-center gap-3">
                    <input ref={videoInputRef} title="Upload video" type="file" accept="video/mp4,video/*" onChange={onChooseVideo} className="hidden" />
                    <button type="button" onClick={() => videoInputRef.current?.click()} className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border text-sm">Upload Video</button>
                    {localVideoData && <span className="ml-2 text-xs text-gray-500 truncate max-w-[220px]">Uploaded</span>}
                  </div>
                </div>

                <OverlaySettings localBgData={local} updateLocal={(field: keyof any, value: any) => updateLocal(field as string, value)} />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 p-4 border-t dark:border-gray-700">
            <button onClick={handleClose} className="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
            <button onClick={handleApply} className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">Apply</button>
          </div>
        </div>
      </div>
    ) : null
  );
}

export default BackgroundSelectionModal;
