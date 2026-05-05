"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X, Monitor, Film, Palette, Play, Trash2 } from 'lucide-react';
import type { HeroData } from './types';
import TabButton from './TabButton';
import OverlaySettings from './OverlaySettings';

const dummyBackgrounds = [
  { id: 'img1', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1763760523160-4b6f9375ddc5?q=80&w=409&auto=format&fit=crop&ixlib=rb-4.1.0', label: 'Mountains' },
  { id: 'img2', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1763718678099-fdb5c2f9cc50?q=80&w=813&auto=format&fit=crop&ixlib=rb-4.1.0', label: 'Citrus' },
  { id: 'img3', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1763742150863-1e1ce92195bc?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0', label: 'Mountains 2' },
  { id: 'img4', type: 'image', imageUrl: 'https://plus.unsplash.com/premium_photo-1672329273045-fc09b2298fcc?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0', label: 'Citrus 2' },
];

const SectionBackgroundModal = ({ isOpen, onClose, currentBg, onSelectBg }: {
  isOpen: boolean;
  onClose: () => void;
  currentBg: HeroData;
  onSelectBg: (data: Partial<HeroData>) => void;
}) => {
  if (!isOpen) return null;

  const initialBgTab: 'color' | 'image' | 'video' = currentBg.bgType === 'video' ? 'video' : (currentBg.bgType === 'image' ? 'image' : 'color');
  const [bgSelectionTab, setBgSelectionTab] = useState<'color' | 'image' | 'video'>(initialBgTab);
  const [localBgData, setLocalBgData] = useState<Partial<HeroData>>({
    bgType: currentBg.bgType,
    bgColor: currentBg.bgColor || '#ffffff',
    bgImageUrl: currentBg.bgImageUrl || '',
    bgVideoUrl: currentBg.bgVideoUrl || '',
    overlayMode: currentBg.overlayMode || 'color',
    overlayColor: currentBg.overlayColor || '#000000',
    overlayOpacity: currentBg.overlayOpacity || 0.4,
    overlayGradient: currentBg.overlayGradient || 'linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.2))',
  });

  const [localObjectUrl, setLocalObjectUrl] = useState<string | null>(null);
  const [localVideoObjectUrl, setLocalVideoObjectUrl] = useState<string | null>(null);
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    
    const onChooseImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (!f) return;
      const url = URL.createObjectURL(f);
      setLocalObjectUrl(url);
      updateLocal('bgImageUrl', url);
      setLocalBgData(prev => ({ ...prev, bgType: 'image' }));
    };
    
    const onChooseVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (!f) return;
      const url = URL.createObjectURL(f);
      setLocalVideoObjectUrl(url);
      updateLocal('bgVideoUrl', url);
      setLocalBgData(prev => ({ ...prev, bgType: 'video' }));
    };
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (localObjectUrl) {
        try { URL.revokeObjectURL(localObjectUrl); } catch (e) { /* ignore */ }
      }
      if (localVideoObjectUrl) {
        try { URL.revokeObjectURL(localVideoObjectUrl); } catch (e) { /* ignore */ }
      }
    };
  }, [localObjectUrl, localVideoObjectUrl]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setMounted(false);
    setTimeout(() => onClose(), 220);
  };

  const handleApply = () => {
    onSelectBg({ ...localBgData });
    // animate out then close
    handleClose();
  };

  const updateLocal = (field: keyof HeroData, value: any) => {
    setLocalBgData(prev => ({ ...prev, [field]: value }));
  };

  // helper: convert hex + alpha to rgba() string
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
    if ((localBgData.overlayMode || 'color') === 'gradient') {
      return localBgData.overlayGradient || '';
    }
    const color = localBgData.overlayColor || '#000000';
    const opacity = typeof localBgData.overlayOpacity === 'number' ? localBgData.overlayOpacity : 0.4;
    const { r, g, b } = hexToRgb(color);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* backdrop with glass blur */}
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
            <TabButton icon={Palette} label="Color" active={bgSelectionTab === 'color'} onClick={() => setBgSelectionTab('color')} />
            <TabButton icon={Monitor} label="Image" active={bgSelectionTab === 'image'} onClick={() => setBgSelectionTab('image')} />
            <TabButton icon={Film} label="Video" active={bgSelectionTab === 'video'} onClick={() => setBgSelectionTab('video')} />
          </div>

          {bgSelectionTab === 'color' && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Solid Color</label>
              <input
                title="Background color"
                type="color"
                value={localBgData.bgColor || '#ffffff'}
                onChange={(e) => {
                  updateLocal('bgColor', e.target.value);
                  updateLocal('bgType', 'solid');
                }}
                className="w-full h-10 p-1 border rounded-md cursor-pointer dark:bg-gray-700"
              />
            </div>
          )}

          {bgSelectionTab === 'image' && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">Upload an image or choose a preset from the gallery below.</div>
              <div className="space-y-3">
                {/* Preview area */}
                {(localObjectUrl || localBgData.bgImageUrl) ? (
                  <div className="relative w-full rounded-lg overflow-hidden border bg-black/5 shadow-sm">
                    <div className="aspect-video w-full h-auto bg-gray-100 dark:bg-gray-800 relative">
                      <img
                        src={localObjectUrl || localBgData.bgImageUrl}
                        alt="background preview"
                        className="w-full h-full object-cover"
                      />
                      {/* overlay layer (color or gradient) */}
                      <div className="absolute inset-0 pointer-events-none" style={{ background: overlayBackground(), mixBlendMode: 'multiply' }} />
                    </div>
                    <button
                      type="button"
                      title="Remove image"
                      onClick={() => {
                        if (localObjectUrl) {
                          try { URL.revokeObjectURL(localObjectUrl); } catch (e) {}
                          setLocalObjectUrl(null);
                        }
                        updateLocal('bgImageUrl', '');
                        updateLocal('bgType', localBgData.bgColor ? 'solid' : undefined);
                      }}
                      className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1 shadow border"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="w-full aspect-video rounded-lg border-dashed border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-sm text-gray-500">Upload an image or choose a preset from the gallery below. No image selected</div>
                )}

                <div className="flex items-center gap-3">
                  <input
                    ref={imageInputRef}
                    title="Upload image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files && e.target.files[0];
                      if (!f) return;
                      const url = URL.createObjectURL(f);
                      if (localObjectUrl) { try { URL.revokeObjectURL(localObjectUrl); } catch (e) {} }
                      setLocalObjectUrl(url);
                      updateLocal('bgType', 'image');
                      updateLocal('bgImageUrl', url);
                    }}
                    className="hidden"
                  />
                  <button type="button" onClick={() => imageInputRef.current?.click()} className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border text-sm">Upload Image</button>
                  {localObjectUrl && <span className="ml-2 text-xs text-gray-500 truncate max-w-[220px]">Uploaded</span>}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 max-h-48 overflow-y-auto p-1 border rounded-md dark:border-gray-700">
                {dummyBackgrounds.map((bg) => (
                  <div
                    key={bg.id}
                    className={`relative w-full h-20 rounded-md overflow-hidden border-2 transition-all ${bg.type === 'image' && localBgData.bgImageUrl === (bg as any).imageUrl ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'} cursor-pointer flex items-center justify-center`}
                    onClick={() => {
                      // apply preset depending on its type
                      if ((bg as any).type === 'image') {
                        updateLocal('bgType', 'image');
                        updateLocal('bgImageUrl', (bg as any).imageUrl);
                      } else if ((bg as any).type === 'solid') {
                        updateLocal('bgType', 'solid');
                        updateLocal('bgColor', (bg as any).color);
                      } else if ((bg as any).type === 'gradient') {
                        updateLocal('bgType', 'solid');
                        updateLocal('overlayMode', 'gradient');
                        updateLocal('overlayGradient', (bg as any).gradient);
                      }
                    }}
                  >
                    {(bg as any).type === 'image' && <img src={(bg as any).imageUrl} alt={bg.label} className="w-full h-full object-cover" />}
                    {(bg as any).type === 'solid' && <div className={`w-full h-full bg-[${(bg as any).color}]`} />}
                    {(bg as any).type === 'gradient' && <div className={`w-full h-full bg-[${(bg as any).gradient}]`} />}
                    <div className="absolute inset-0 flex items-end p-1 bg-linear-to-t from-black/30 text-white text-xs">{bg.label}</div>
                  </div>
                ))}
                {/* If no image URL entered, show a textual placeholder cell */}
                {!localBgData.bgImageUrl && !localObjectUrl && (
                  <div className="col-span-4 p-3 text-sm text-gray-500 dark:text-gray-400">Upload an image or choose a preset from the gallery below. No image selected</div>
                )}
              </div>

              <OverlaySettings localBgData={localBgData} updateLocal={updateLocal} />
            </div>
          )}

          {bgSelectionTab === 'video' && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">Upload a video file (MP4) to use as a background.</div>
              <div className="space-y-3">
                {(localVideoObjectUrl || localBgData.bgVideoUrl) ? (
                  <div className="relative w-full rounded-lg overflow-hidden border bg-black/5 shadow-sm">
                    <div className="aspect-video w-full h-auto bg-black relative">
                      <video
                        src={localVideoObjectUrl || localBgData.bgVideoUrl}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        controls
                      />
                      {/* overlay layer (color or gradient) */}
                      <div className="absolute inset-0 pointer-events-none" style={{ background: overlayBackground(), mixBlendMode: 'multiply' }} />
                    </div>
                    <button
                      type="button"
                      title="Remove video"
                      onClick={() => {
                        if (localVideoObjectUrl) {
                          try { URL.revokeObjectURL(localVideoObjectUrl); } catch (e) {}
                          setLocalVideoObjectUrl(null);
                        }
                        updateLocal('bgVideoUrl', '');
                        updateLocal('bgType', localBgData.bgColor ? 'solid' : undefined);
                      }}
                      className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1 shadow border"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="absolute left-3 bottom-3 flex items-center gap-2 bg-black/40 text-white text-xs px-2 py-1 rounded">
                      <Play size={14} />
                      <span>Preview</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-video rounded-lg border-dashed border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-sm text-gray-500">No video selected</div>
                )}

                <div className="flex items-center gap-3">
                  <input
                    ref={videoInputRef}
                    title="Upload video"
                    type="file"
                    accept="video/mp4,video/*"
                    onChange={(e) => {
                      const f = e.target.files && e.target.files[0];
                      if (!f) return;
                      const url = URL.createObjectURL(f);
                      if (localVideoObjectUrl) { try { URL.revokeObjectURL(localVideoObjectUrl); } catch (e) {} }
                      setLocalVideoObjectUrl(url);
                      updateLocal('bgType', 'video');
                      updateLocal('bgVideoUrl', url);
                    }}
                    className="hidden"
                  />
                  <button type="button" onClick={() => videoInputRef.current?.click()} className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border text-sm">Upload Video</button>
                  {localVideoObjectUrl && <span className="ml-2 text-xs text-gray-500 truncate max-w-[220px]">Uploaded</span>}
                </div>
              </div>
              <OverlaySettings localBgData={localBgData} updateLocal={updateLocal} />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 p-4 border-t dark:border-gray-700">
          <button onClick={handleClose} className="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
          <button onClick={handleApply} className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default SectionBackgroundModal;
