"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState, useEffect } from 'react';
import { BackgroundSelectionModal, BackgroundData } from '../about-section/BackgroundSelectionModal';
import CustomEditor from "../../RichTextEditor";

type SizeOption = "small" | "medium" | "large" | "x-large";

type ContentData = {
  title?: string;
  content?: string;
  background?: BackgroundData;
  showTitle?: boolean;
  showContent?: boolean;
  size?: 'small' | 'medium' | 'large';
  textColor?: string;
  layoutType?: string;
  headingSize?: SizeOption;
  showButton?: boolean;
  buttonText?: string;
  buttonUrl?: string;
  buttonTextColor?: string;
  buttonBgColor?: string;
  heroImageUrl?: string;
};

type ContentContentTabProps = {
  data: ContentData;
  onChange: (data: ContentData) => void;
};

export function ContentContentTab({ data, onChange }: ContentContentTabProps) {
  const [showBgModal, setShowBgModal] = useState(false);

  const SIZE_CLASSES: Record<SizeOption, string> = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-2xl',
    'x-large': 'text-6xl md:text-7xl',
  };

  const handleBackgroundApply = (bg: BackgroundData) => {
    updateData({ background: bg });
  };

  const updateData = (updates: Partial<ContentData>) => {
    onChange({ ...data, ...updates });
  };

  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrl) {
        try {
          URL.revokeObjectURL(objectUrl);
        } catch (e) {}
      }
    };
  }, [objectUrl]);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (objectUrl) {
      try {
        URL.revokeObjectURL(objectUrl);
      } catch (e) {}
    }

    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    updateData({ heroImageUrl: url });
  };

  const renderPreviewBackground = (extraClass = '') => {
    const bg = data.background;
    if (!bg) return null;
    if (bg.type === 'image' && bg.value) return <img src={bg.value} alt="bg preview" className={`absolute inset-0 w-full h-full object-cover ${extraClass}`} />;
    if (bg.type === 'video' && bg.value) return <video src={bg.value} className={`absolute inset-0 w-full h-full object-cover ${extraClass}`} muted loop playsInline />;
    if (bg.type === 'color' && bg.value) return <div className={`absolute inset-0 ${extraClass}`} style={{ backgroundColor: bg.value }} />;
    return null;
  };

  return (
    <div className="space-y-6">
    
     

      <BackgroundSelectionModal
        open={showBgModal}
        onOpenChange={setShowBgModal}
        initial={data.background}
        onApply={handleBackgroundApply}
      />

      <div className="space-y-3 border rounded-lg p-4">
        <h3 className="font-semibold text-sm">Layout Presets</h3>
        <div className="flex gap-3 mt-3">
          <button
            type="button"
            onClick={() => updateData({ layoutType: 'center' })}
            className={`flex-1 border rounded p-3 text-sm text-left ${(data.layoutType === 'center' || !data.layoutType) ? 'ring-2 ring-indigo-500' : ''}`}
          >
            <div className="font-medium">Center</div>
            <div className="text-xs text-muted-foreground mt-1">Title and content centered</div>
          </button>

          <button
            type="button"
            onClick={() => updateData({ layoutType: 'image-left' })}
            className={`flex-1 border rounded p-3 text-sm text-left ${data.layoutType === 'image-left' ? 'ring-2 ring-indigo-500' : ''}`}
          >
            <div className="font-medium">Image Left</div>
            <div className="text-xs text-muted-foreground mt-1">Image on left, text on right</div>
          </button>

          <button
            type="button"
            onClick={() => updateData({ layoutType: 'image-right' })}
            className={`flex-1 border rounded p-3 text-sm text-left ${data.layoutType === 'image-right' ? 'ring-2 ring-indigo-500' : ''}`}
          >
            <div className="font-medium">Image Right</div>
            <div className="text-xs text-muted-foreground mt-1">Image on right, text on left</div>
          </button>
        </div>

        <div className="mt-3 w-full">
          {(() => {
            const previewImage = (data as any).heroImageUrl || 'https://example.com/foreground.jpg';
            const headingClass = SIZE_CLASSES[data.headingSize || 'medium'];

            if (data.layoutType === 'image-left') {
              return (
                <div className="w-full rounded-md overflow-hidden border bg-white relative">
                  {renderPreviewBackground()}
                  <div className="flex h-40 relative">
                    <img src={previewImage} alt="preview" className="w-1/2 h-full object-cover" />
                    <div className="w-1/2 p-4 flex flex-col justify-center">
                      {data.showTitle !== false && <div className={`${headingClass} font-semibold jodit-wysiwyg`} dangerouslySetInnerHTML={{ __html: data.title || 'Title Sample' }} />}
                      {data.showContent !== false && (
                        <div className="mt-1 text-sm jodit-wysiwyg" dangerouslySetInnerHTML={{ __html: data.content || 'Content sample' }} />
                      )}
                      {data.showButton && (
                        <div className="mt-3">
                          <button
                            className="px-4 py-2 rounded-md font-medium text-sm"
                            style={{
                              backgroundColor: (data as any).buttonBgColor || '#8f38f2',
                              color: (data as any).buttonTextColor || '#ffffff',
                            }}
                          >
                            {data.buttonText || 'Learn More'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            if (data.layoutType === 'image-right') {
              return (
                <div className="w-full rounded-md overflow-hidden border bg-white relative">
                  {renderPreviewBackground()}
                  <div className="flex h-40 relative">
                    <div className="w-1/2 p-4 flex flex-col justify-center">
                      {data.showTitle !== false && <div className={`${headingClass} font-semibold jodit-wysiwyg`} dangerouslySetInnerHTML={{ __html: data.title || 'Title Sample' }} />}
                      {data.showContent !== false && (
                        <div className="mt-1 text-sm jodit-wysiwyg" dangerouslySetInnerHTML={{ __html: data.content || 'Content sample' }} />
                      )}
                      {data.showButton && (
                        <div className="mt-3">
                          <button
                            className="px-4 py-2 rounded-md font-medium text-sm"
                            style={{
                              backgroundColor: (data as any).buttonBgColor || '#8f38f2',
                              color: (data as any).buttonTextColor || '#ffffff',
                            }}
                          >
                            {data.buttonText || 'Learn More'}
                          </button>
                        </div>
                      )}
                    </div>
                    <img src={previewImage} alt="preview" className="w-1/2 h-full object-cover" />
                  </div>
                </div>
              );
            }

            return (
              <div className="w-full rounded-md overflow-hidden relative text-white">
                {renderPreviewBackground() || <div className="absolute inset-0 bg-linear-to-br from-slate-800 to-slate-700" />}
                <div className="relative h-40 flex items-center justify-center px-6">
                  <div className="text-center">
                    {data.showTitle !== false && <div className={`${headingClass} font-bold jodit-wysiwyg`} dangerouslySetInnerHTML={{ __html: data.title || 'Title Sample' }} />}
                    {data.showContent !== false && (
                      <div className="mt-1 text-sm opacity-90 jodit-wysiwyg" dangerouslySetInnerHTML={{ __html: data.content || 'Content sample' }} />
                    )}
                    {data.showButton && (
                      <div className="mt-3 flex justify-center">
                        <button
                          className="px-4 py-2 rounded-md font-medium text-sm"
                          style={{
                            backgroundColor: (data as any).buttonBgColor || '#8f38f2',
                            color: (data as any).buttonTextColor || '#ffffff',
                          }}
                        >
                          {data.buttonText || 'Learn More'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        
      </div>
 <div>
            <button className="w-full px-3 py-2 rounded-md text-white bg-[#8f38f2] dark:bg-[#8f38f2]" onClick={() => setShowBgModal(true)}>Change Background</button>
          </div>
      <div className="mt-3 space-y-4">
        <div>
          <Label htmlFor="hero-image-upload">Side Image (Optional)</Label>
          <div className="flex items-center gap-3 mt-2">
            <Input
              id="hero-image-upload"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 rounded-md border bg-white text-sm"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload image
            </button>
            {data.heroImageUrl ? (
              <>
                <img src={data.heroImageUrl} alt="hero preview" className="w-28 h-16 object-cover rounded-md border" />
                <button
                  type="button"
                  className="text-sm text-red-600 underline"
                  onClick={() => updateData({ heroImageUrl: undefined })}
                >
                  Remove
                </button>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">No image selected</div>
            )}
          </div>
        </div>

        <div>
          <Label>Optional Elements</Label>
          <div className="flex gap-3 mt-2">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={data.showTitle !== false} onChange={(e) => updateData({ showTitle: e.target.checked })} />
              <span className="text-sm">Show title</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={data.showContent !== false} onChange={(e) => updateData({ showContent: e.target.checked })} />
              <span className="text-sm">Show content</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={data.showButton || false} onChange={(e) => updateData({ showButton: e.target.checked })} />
              <span className="text-sm">Show button</span>
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
          {data.showTitle !== false && (
            <div className="space-y-2">
              <Label htmlFor="content-title">Title</Label>
              <CustomEditor
                value={data.title || ""}
                onChange={(value) => updateData({ title: value })}
              />
            </div>
          )}
      </div>

      <div className="space-y-2">
        {data.showContent !== false && (
          <div>
            <Label htmlFor="content-text">Content</Label>
            <CustomEditor
              value={data.content || ""}
              onChange={(value) => updateData({ content: value })}
            />
          </div>
        )}
      </div>

      <div className="space-y-4 border-t pt-4">
        {data.showButton && (
          <div className="space-y-4 border rounded-lg p-4 bg-slate-50 dark:bg-slate-900">
            <h3 className="font-semibold text-sm">Button Settings</h3>
            
            <div className="space-y-2">
              <Label htmlFor="button-text">Button Text</Label>
              <Input
                id="button-text"
                value={data.buttonText || ""}
                onChange={(e) => updateData({ buttonText: e.target.value })}
                placeholder="Learn more"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="button-url">Button URL</Label>
              <Input
                id="button-url"
                value={data.buttonUrl || ""}
                onChange={(e) => updateData({ buttonUrl: e.target.value })}
                placeholder="Button URL Or path"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm">Button Text Color</Label>
                <div className="flex items-center gap-3">
                  <input
                    title="Button text color"
                    type="color"
                    value={(data as any).buttonTextColor || '#ffffff'}
                    onChange={(e) => updateData({ buttonTextColor: e.target.value })}
                    className="h-8 w-12 p-0 border rounded-md"
                  />
                  <div className="text-sm text-muted-foreground">Text color</div>
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-sm">Button Background Color</Label>
                <div className="flex items-center gap-3">
                  <input
                    title="Button background color"
                    type="color"
                    value={(data as any).buttonBgColor || '#8f38f2'}
                    onChange={(e) => updateData({ buttonBgColor: e.target.value })}
                    className="h-8 w-12 p-0 border rounded-md"
                  />
                  <div className="text-sm text-muted-foreground">Background color</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Button Preview</Label>
              <div className="flex justify-center p-4 bg-white dark:bg-slate-800 rounded-lg border">
                <button
                  className="px-6 py-3 rounded-md font-medium text-sm transition-colors hover:opacity-90"
                  style={{
                    backgroundColor: (data as any).buttonBgColor || '#8f38f2',
                    color: (data as any).buttonTextColor || '#ffffff',
                  }}
                >
                  {data.buttonText || 'Learn more'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
