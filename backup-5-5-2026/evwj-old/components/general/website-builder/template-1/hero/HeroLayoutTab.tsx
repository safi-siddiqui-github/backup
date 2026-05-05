"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { HeroData } from "./types";
import { Button } from "@/components/ui/button";
import CustomEditor from "../../RichTextEditor";
 
interface HeroLayoutTabProps {
  data: HeroData;
  onChange: (data: HeroData) => void;
  onOpenBackgroundModal?: () => void;
}

export function HeroLayoutTab({ data, onChange, onOpenBackgroundModal }: HeroLayoutTabProps) {
  const updateData = (updates: Partial<HeroData>) => onChange({ ...data, ...updates });

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const sideFileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateData({ heroImageUrl: String(reader.result) });
    };
    reader.readAsDataURL(file);
  };

  const handleSideFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      // sideImageUrl may not be declared in HeroData type; cast to any to avoid type error
      updateData({ sideImageUrl: String(reader.result) } as any);
    };
    reader.readAsDataURL(file);
  };

  const renderPreviewBackground = (extraClass = '') => {
    if (data.bgType === 'image' && data.bgImageUrl) {
      return <img src={data.bgImageUrl  } alt="bg preview" className={`absolute inset-0 w-full h-full object-cover ${extraClass}`} />;
    }
    if (data.bgType === 'video' && data.bgVideoUrl) {
      return (
        <video src={data.bgVideoUrl} className={`absolute inset-0 w-full h-full object-cover ${extraClass}`} muted loop playsInline />
      );
    }
    if (data.bgColor) {
      return <div className={`absolute inset-0 ${extraClass}`} style={{ backgroundColor: data.bgColor }} />;
    }
    return null;
  };

  const hexToRgb = (hex?: string) => {
    if (!hex) return null;
    const cleaned = hex.replace('#', '');
    const bigint = parseInt(cleaned, 16);
    if (cleaned.length === 3) {
      const r = (bigint >> 8) & 0xf;
      const g = (bigint >> 4) & 0xf;
      const b = bigint & 0xf;
      return { r: (r << 4) | r, g: (g << 4) | g, b: (b << 4) | b };
    }
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  const renderOverlay = () => {
    if ((data as any).overlayGradient) {
      return <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: (data as any).overlayGradient }} />;
    }
    if ((data as any).overlayColor) {
      const rgb = hexToRgb((data as any).overlayColor);
      const alpha = typeof (data as any).overlayOpacity === 'number' ? (data as any).overlayOpacity : 0.5;
      const color = rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})` : (data as any).overlayColor;
      return <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: color }} />;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Layout Presets */}
      <div className="space-y-2 border rounded-lg p-4">
        <h3 className="font-semibold text-sm">Layout Presets</h3>
        <div className="flex gap-3 mt-3">
          <button
            type="button"
            onClick={() => updateData({ layoutType: 'center' })}
            className={`flex-1 border rounded p-3 text-sm text-left ${data.layoutType === 'center' ? 'ring-2 ring-indigo-500' : ''}`}
          >
            <div className="font-medium">Center</div>
            <div className="text-xs text-muted-foreground mt-1">Title, subtitle and buttons centered over background</div>
          </button>

          <button
            type="button"
            onClick={() => updateData({ layoutType: 'image-left' })}
            className={`flex-1 border rounded p-3 text-sm text-left ${data.layoutType === 'image-left' ? 'ring-2 ring-indigo-500' : ''}`}
          >
            <div className="font-medium">Image Left</div>
            <div className="text-xs text-muted-foreground mt-1">Image on left, text + buttons on right</div>
          </button>

          <button
            type="button"
            onClick={() => updateData({ layoutType: 'image-right' })}
            className={`flex-1 border rounded p-3 text-sm text-left ${data.layoutType === 'image-right' ? 'ring-2 ring-indigo-500' : ''}`}
          >
            <div className="font-medium">Image Right</div>
            <div className="text-xs text-muted-foreground mt-1">Image on right, text + buttons on left</div>
          </button>
        </div>

        <div className="mt-3 w-full">
     

          {(() => {
            const previewImage = data.heroImageUrl || 'https://images.unsplash.com/photo-1763897236977-1baa4a026a6d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

            if (data.layoutType === 'center' || !data.layoutType) {
              const bg = renderPreviewBackground();
              return (
                <div className="w-full rounded-md overflow-hidden relative text-white">
                  {bg || <div className="absolute inset-0 bg-linear-to-br from-slate-800 to-slate-700" />}
                  <div className="relative h-40 flex items-center justify-center px-6">
                    <div className="text-center">
                      <div className="text-lg font-bold jodit-wysiwyg" dangerouslySetInnerHTML={{ __html: data.title || '<p>Title Sample</p>' }} />
                      {data.showSubtitle !== false && (
                        <div className="mt-1 text-sm opacity-90 jodit-wysiwyg" dangerouslySetInnerHTML={{ __html: data.subtitle || '<p>Subtitle Sample</p>' }} />
                      )}
                      {data.buttonCount === 1 && (
                        <div className="mt-3 flex items-center justify-center">
                          <Button
                            className="px-4 py-2 rounded text-sm font-medium"
                            style={{ backgroundColor: data.buttonColor || '#ef4444', color: data.buttonTextColor || '#ffffff' }}
                          >{data.buttonText || 'Primary'}</Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            if (data.layoutType === 'image-left') {
              return (
                <div className="w-full rounded-md overflow-hidden border bg-white relative">
                  {renderPreviewBackground()}
                  <div className="flex h-40 relative">
                    <img src={previewImage} alt="preview" className="w-1/2 h-full object-cover" />
                    <div className="w-1/2 p-4 flex flex-col justify-center">
                      <div className="text-md font-semibold jodit-wysiwyg" dangerouslySetInnerHTML={{ __html: data.title || '<p>Title Sample</p>' }} />
                      {data.showSubtitle !== false && (
                        <div className="mt-1 text-sm jodit-wysiwyg" dangerouslySetInnerHTML={{ __html: data.subtitle || '<p>Subtitle Sample</p>' }} />
                      )}
                      {data.buttonCount === 1 && (
                        <div className="mt-3 flex gap-2">
                          <Button
                            className="px-3 py-1 rounded text-sm"
                            style={{ backgroundColor: data.buttonColor || '#ef4444', color: data.buttonTextColor || '#ffffff' }}
                          >{data.buttonText || 'Learn More'}</Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div className="w-full rounded-md overflow-hidden border bg-white relative">
                {renderPreviewBackground()}
                <div className="flex h-40 relative">
                  <div className="w-1/2 p-4 flex flex-col justify-center">
                    <div className="text-md font-semibold jodit-wysiwyg" dangerouslySetInnerHTML={{ __html: data.title || '<p>Title Sample</p>' }} />
                    {data.showSubtitle !== false && (
                      <div className="mt-1 text-sm jodit-wysiwyg" dangerouslySetInnerHTML={{ __html: data.subtitle || '<p>Subtitle Sample</p>' }} />
                    )}
                    {data.buttonCount === 1 && (
                      <div className="mt-3 flex gap-2">
                        <Button
                          className="px-3 py-1 rounded text-sm"
                          style={{ backgroundColor: data.buttonColor || '#ef4444', color: data.buttonTextColor || '#ffffff' }}
                        >{data.buttonText || 'Learn More'}</Button>
                      </div>
                    )}
                  </div>
                  <img src={previewImage} alt="preview" className="w-1/2 h-full object-cover" />
                </div>
              </div>
            );
          })()}
        </div>
<Button
                  variant="default"
                  onClick={() => onOpenBackgroundModal?.()}
                  className="w-full dark:bg-gray-800 mt-2 dark:hover:text-black dark:hover:bg-gray-950 transition-all duration-300 ease-linear dark:border-gray-900 dark:text-white"
                >
                  Change Background
                </Button>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            
            

              {/* Side image upload for image-left / image-right layouts */}
              <div className="mt-3">
                <Label htmlFor="side-image-upload">Side Image (for Image Left/Right layouts)</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Input
                    id="side-image-upload"
                    ref={sideFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleSideFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 rounded-md border bg-white dark:bg-gray-900 text-sm"
                    onClick={() => sideFileInputRef.current?.click()}
                  >
                    Upload side image
                  </button>
                  {(data as any).sideImageUrl ? (
                    <>
                      <img src={(data as any).sideImageUrl} alt="side preview" className="w-28 h-16 object-cover rounded-md border" />
                      <button
                        type="button"
                        className="text-sm text-red-600 underline"
                        onClick={() => updateData({ sideImageUrl: undefined } as any)}
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <div className="text-sm text-muted-foreground">No side image selected</div>
                  )}
                </div>
              </div>
          </div>

          <div className="flex flex-col justify-end">
            <Label>Optional Elements</Label>
            <div className="flex items-center gap-3 mt-2">
              <label htmlFor="show-subtitle" className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  id="show-subtitle"
                  type="checkbox"
                  checked={data.showSubtitle ?? true}
                  onChange={(e) => updateData({ showSubtitle: e.target.checked })}
                />
                <span className="text-sm">Show subtitle</span>
              </label>
              <label htmlFor="show-button" className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  id="show-button"
                  type="checkbox"
                  checked={(data.buttonCount ?? 1) === 1}
                  onChange={(e) => updateData({ buttonCount: e.target.checked ? 1 : 0 })}
                />
                <span className="text-sm">Show button</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Title Style */}
      <div className="space-y-3 border rounded-lg p-4">
        <h3 className="font-semibold text-sm">Title Style</h3>

        <div className="space-y-2">
          
          <CustomEditor
            value={data.title || ''}
            onChange={(content) => updateData({ title: content })}
          />
        </div>

        <div className="space-y-2">
          <Label>Title Sample Preview</Label>
          <div className="border rounded-md p-4">
            <div className="jodit-wysiwyg" dangerouslySetInnerHTML={{ __html: data.title || '<p>Title Sample</p>' }} />
          </div>
        </div>
      </div>

      {/* Subtitle Style */}
      {data.showSubtitle !== false && (
        <div className="space-y-3 border rounded-lg p-4">
          <h3 className="font-semibold text-sm">Subtitle Style</h3>

          <div className="space-y-2">
          
            <CustomEditor
              value={data.subtitle || ''}
              onChange={(content) => updateData({ subtitle: content })}
            />
          </div>

          <div className="space-y-2">
            <Label>Subtitle Sample Preview</Label>
            <div className="border rounded-md p-4">
              <div className="jodit-wysiwyg" dangerouslySetInnerHTML={{ __html: data.subtitle || '<p>Subtitle Sample</p>' }} />
            </div>
          </div>
        </div>
      )}

      {/* Primary Button Style */}
      {data.buttonCount === 1 && (
        <div className="space-y-3 border rounded-lg p-4">
          <h3 className="font-semibold text-sm">Primary Button Style</h3>

          <div className="space-y-2">
            <Label htmlFor="primary-text">Button Text</Label>
            <Input
              id="primary-text"
              type="text"
              value={data.buttonText || ''}
              onChange={(e) => updateData({ buttonText: e.target.value })}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="primary-bg-color">Background Color</Label>
            <div className="flex gap-3 items-center">
              <Input
                type="color"
                value={data.buttonColor || "#ef4444"}
                onChange={(e) => updateData({ buttonColor: e.target.value })}
                className="w-20 h-10 cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="primary-text-color">Text Color</Label>
            <div className="flex gap-3 items-center">
              <Input
                type="color"
                value={data.buttonTextColor || "#ffffff"}
                onChange={(e) => updateData({ buttonTextColor: e.target.value })}
                className="w-20 h-10 cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="primary-link">Link</Label>
            <Input
              id="primary-link"
              type="text"
              value={data.button1Link || ''}
              onChange={(e) => updateData({ button1Link: e.target.value })}
              placeholder="/projects"
              className="w-full"
            />
          </div>

        

          <div className="space-y-2">
            <Label>Sample Preview</Label>
            <div className="border rounded-md p-4 bg-muted flex items-center justify-center">
              <Button
                className="px-6 py-2 rounded font-medium"
                style={{ backgroundColor: data.buttonColor || '#ef4444', color: data.buttonTextColor || '#ffffff' }}
              >
                {data.buttonText || "Preview text"}
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
