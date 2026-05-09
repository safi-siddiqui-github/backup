"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type SizeOption = "small" | "medium" | "large" | "x-large";

type StyleConfig = {
  color: string;
  size: SizeOption;
};

type ButtonStyleConfig = {
  backgroundColor: string;
  textColor: string;
};

type LayoutTabData = {
  headingSize: SizeOption;
  textColor: string;
  titleStyle: StyleConfig;
  subtitleStyle: StyleConfig;
  primaryButtonStyle: ButtonStyleConfig;
  secondaryButtonStyle: ButtonStyleConfig;
  layoutType?: string;
  heroImageUrl?: string;
  bgType?: string;
  bgImageUrl?: string;
  bgVideoUrl?: string;
  bgColor?: string;
  title?: string;
  subtitle?: string;
  titleColor?: string;
  subtitleColor?: string;
  showSubtitle?: boolean;
  buttonCount?: number;
  buttonText?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  titleSize?: string;
  subtitleSize?: string;
};

type LayoutTabProps = {
  data: LayoutTabData;
  onChange: (data: LayoutTabData) => void;
};

const SIZE_OPTIONS = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
  { value: "x-large", label: "X-Large (6xl/7xl)" },
];

const SIZE_CLASSES = {
  small: "text-sm",
  medium: "text-base",
  large: "text-2xl",
  "x-large": "text-6xl md:text-7xl",
};

export function LayoutTab({ data, onChange }: LayoutTabProps) {
  const updateData = (updates: Partial<LayoutTabData>) => {
    onChange({ ...data, ...updates });
  };
  const updateTitleStyle = (updates: Partial<StyleConfig>) => {
    updateData({ titleStyle: { ...data.titleStyle, ...updates } });
  };

  const updateSubtitleStyle = (updates: Partial<StyleConfig>) => {
    updateData({ subtitleStyle: { ...data.subtitleStyle, ...updates } });
  };

  const updatePrimaryButtonStyle = (updates: Partial<ButtonStyleConfig>) => {
    updateData({ primaryButtonStyle: { ...data.primaryButtonStyle, ...updates } });
  };

  const updateSecondaryButtonStyle = (updates: Partial<ButtonStyleConfig>) => {
    updateData({ secondaryButtonStyle: { ...data.secondaryButtonStyle, ...updates } });
  };

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateData({ heroImageUrl: String(reader.result) });
    };
    reader.readAsDataURL(file);
  };

  const renderPreviewBackground = (extraClass = '') => {
    const bgType = (data as any).bgType || (data as any).background?.type;
    const bgValue = (data as any).bgImageUrl || (data as any).background?.value || (data as any).bgColor || (data as any).background?.value;
    const bgVideo = (data as any).bgVideoUrl || (data as any).background?.value;
    if (bgType === 'image' && bgValue) {
      return <img src={bgValue} alt="bg preview" className={`absolute inset-0 w-full h-full object-cover ${extraClass}`} />;
    }
    if (bgType === 'video' && bgVideo) {
      return <video src={bgVideo} className={`absolute inset-0 w-full h-full object-cover ${extraClass}`} muted loop playsInline />;
    }
    if ((data as any).bgColor) {
      return <div className={`absolute inset-0 ${extraClass}`} style={{ backgroundColor: (data as any).bgColor }} />;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 border rounded-lg p-4">
        <h3 className="font-semibold text-sm">Layout Presets</h3>
        <div className="flex gap-3 mt-3">
          <button
            type="button"
            onClick={() => updateData({ layoutType: 'center' })}
            className={`flex-1 border rounded p-3 text-sm text-left ${(data.layoutType === 'center' || !data.layoutType) ? 'ring-2 ring-indigo-500' : ''}`}
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
            const previewImage = data.heroImageUrl || 'https://example.com/foreground.jpg';
            if (data.layoutType === 'center' || !data.layoutType) {
              const bg = renderPreviewBackground();
              return (
                <div className="w-full rounded-md overflow-hidden relative text-white">
                  {bg || <div className="absolute inset-0 bg-linear-to-br from-slate-800 to-slate-700" />}
                  <div className="relative h-40 flex items-center justify-center px-6">
                    <div className="text-center">
                      <div className="text-lg font-bold" style={{ color: (data as any).titleColor || data.textColor || '#ffffff' }}>{(data as any).title || 'Title Sample'}</div>
                      {((data as any).showSubtitle ?? true) && (
                        <div className="mt-1 text-sm opacity-90" style={{ color: (data as any).subtitleColor || data.textColor || 'rgba(255,255,255,0.9)' }}>{(data as any).subtitle || 'Subtitle Sample'}</div>
                      )}
                      {((data as any).buttonCount || 0) === 1 && (
                        <div className="mt-3 flex items-center justify-center">
                          <Button
                            className="px-4 py-2 rounded text-sm font-medium"
                            style={{ backgroundColor: (data as any).buttonColor || '#ef4444', color: (data as any).buttonTextColor || '#ffffff' }}
                          >{(data as any).buttonText || 'Primary'}</Button>
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
                      <div className="text-md font-semibold" style={{ color: (data as any).titleColor || data.textColor || '#111827' }}>{(data as any).title || 'Title Sample'}</div>
                      {((data as any).showSubtitle ?? true) && (
                        <div className="mt-1 text-sm" style={{ color: (data as any).subtitleColor || data.textColor || '#6b7280' }}>{(data as any).subtitle || 'Subtitle Sample'}</div>
                      )}
                      {((data as any).buttonCount || 0) === 1 && (
                        <div className="mt-3 flex gap-2">
                          <Button
                            className="px-3 py-1 rounded text-sm"
                            style={{ backgroundColor: (data as any).buttonColor || '#ef4444', color: (data as any).buttonTextColor || '#ffffff' }}
                          >{(data as any).buttonText || 'Learn More'}</Button>
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
                    <div className="text-md font-semibold" style={{ color: (data as any).titleColor || data.textColor || '#111827' }}>{(data as any).title || 'Title Sample'}</div>
                    {((data as any).showSubtitle ?? true) && (
                      <div className="mt-1 text-sm" style={{ color: (data as any).subtitleColor || data.textColor || '#6b7280' }}>{(data as any).subtitle || 'Subtitle Sample'}</div>
                    )}
                    {((data as any).buttonCount || 0) === 1 && (
                      <div className="mt-3 flex gap-2">
                        <Button
                          className="px-3 py-1 rounded text-sm"
                          style={{ backgroundColor: (data as any).buttonColor || '#ef4444', color: (data as any).buttonTextColor || '#ffffff' }}
                        >{(data as any).buttonText || 'Learn More'}</Button>
                      </div>
                    )}
                  </div>
                  <img src={previewImage} alt="preview" className="w-1/2 h-full object-cover" />
                </div>
              </div>
            );
          })()}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="hero-image-upload">Hero Image (optional)</Label>
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
              {(data as any).heroImageUrl ? (
                <>
                  <img src={(data as any).heroImageUrl} alt="hero preview" className="w-28 h-16 object-cover rounded-md border" />
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

          <div className="flex flex-col justify-end">
            <Label>Optional Elements</Label>
            <div className="flex items-center gap-3 mt-2">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={(data as any).showSubtitle ?? true} onChange={(e) => updateData({ showSubtitle: e.target.checked })} />
                <span className="text-sm">Show subtitle</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={((data as any).buttonCount ?? 1) === 1} onChange={(e) => updateData({ buttonCount: e.target.checked ? 1 : 0 })} />
                <span className="text-sm">Show button</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="heading-size">Heading Size</Label>
        <Select value={data.headingSize} onValueChange={(v) => updateData({ headingSize: v as SizeOption })}>
          <SelectTrigger id="heading-size" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SIZE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="text-color">Text Color</Label>
        <div className="flex gap-3 items-center">
          <Input
            type="color"
            value={data.textColor}
            onChange={(e) => updateData({ textColor: e.target.value })}
            className="w-20 h-10 cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-3 border rounded-lg p-4">
        <h3 className="font-semibold text-sm">Title Style</h3>
        
        <div className="space-y-2">
          <Label htmlFor="title-color">Title Color</Label>
          <div className="flex gap-3 items-center">
            <Input
              type="color"
              value={data.titleStyle.color}
              onChange={(e) => updateTitleStyle({ color: e.target.value })}
              className="w-20 h-10 cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title-size">Size</Label>
          <Select value={data.titleStyle.size} onValueChange={(v) => updateTitleStyle({ size: v as SizeOption })}>
            <SelectTrigger id="title-size" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SIZE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Title Sample Preview</Label>
          <div className="border rounded-md p-4 bg-muted">
            <p
              className={SIZE_CLASSES[data.titleStyle.size]}
              style={{ color: data.titleStyle.color }}
            >
              Title Sample
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 border rounded-lg p-4">
        <h3 className="font-semibold text-sm">Subtitle Style</h3>
        
        <div className="space-y-2">
          <Label htmlFor="subtitle-color">Subtitle Color</Label>
          <div className="flex gap-3 items-center">
            <Input
              type="color"
              value={data.subtitleStyle.color}
              onChange={(e) => updateSubtitleStyle({ color: e.target.value })}
              className="w-20 h-10 cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle-size">Size</Label>
          <Select value={data.subtitleStyle.size} onValueChange={(v) => updateSubtitleStyle({ size: v as SizeOption })}>
            <SelectTrigger id="subtitle-size" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SIZE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Subtitle Sample Preview</Label>
          <div className="border rounded-md p-4 bg-muted">
            <p
              className={SIZE_CLASSES[data.subtitleStyle.size]}
              style={{ color: data.subtitleStyle.color }}
            >
              Subtitle Sample
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 border rounded-lg p-4">
        <h3 className="font-semibold text-sm">Primary Button Style</h3>
        
        <div className="space-y-2">
          <Label htmlFor="primary-bg-color">Background Color</Label>
          <div className="flex gap-3 items-center">
            <Input
              type="color"
              value={data.primaryButtonStyle.backgroundColor}
              onChange={(e) => updatePrimaryButtonStyle({ backgroundColor: e.target.value })}
              className="w-20 h-10 cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="primary-text-color">Text Color</Label>
          <div className="flex gap-3 items-center">
            <Input
              type="color"
              value={data.primaryButtonStyle.textColor}
              onChange={(e) => updatePrimaryButtonStyle({ textColor: e.target.value })}
              className="w-20 h-10 cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Sample Preview</Label>
          <div className="border rounded-md p-4 bg-muted flex items-center justify-center">
            <button
              className="px-6 py-2 rounded-md font-medium"
              style={{
                backgroundColor: data.primaryButtonStyle.backgroundColor,
                color: data.primaryButtonStyle.textColor,
              }}
            >
              Preview text
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3 border rounded-lg p-4">
        <h3 className="font-semibold text-sm">Secondary Button Style</h3>
        
        <div className="space-y-2">
          <Label htmlFor="secondary-bg-color">Background Color</Label>
          <div className="flex gap-3 items-center">
            <Input
              type="color"
              value={data.secondaryButtonStyle.backgroundColor}
              onChange={(e) => updateSecondaryButtonStyle({ backgroundColor: e.target.value })}
              className="w-20 h-10 cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="secondary-text-color">Text Color</Label>
          <div className="flex gap-3 items-center">
            <Input
              type="color"
              value={data.secondaryButtonStyle.textColor}
              onChange={(e) => updateSecondaryButtonStyle({ textColor: e.target.value })}
              className="w-20 h-10 cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Sample Preview</Label>
          <div className="border rounded-md p-4 bg-muted flex items-center justify-center">
            <button
              className="px-6 py-2 rounded-md font-medium"
              style={{
                backgroundColor: data.secondaryButtonStyle.backgroundColor,
                color: data.secondaryButtonStyle.textColor,
              }}
            >
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
