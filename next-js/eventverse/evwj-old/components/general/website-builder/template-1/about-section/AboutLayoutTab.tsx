"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import CustomEditor from "../../RichTextEditor";
import { BackgroundSelectionModal, BackgroundData } from "./BackgroundSelectionModal";

type SizeOption = "small" | "medium" | "large" | "x-large";

type AboutEditData = {
  background?: BackgroundData;
  title: string;
  content: string;
  showTitle?: boolean;
  showContent?: boolean;
  buttonCount?: number;
  buttonText?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  button1Link?: string;
  button1Target?: string;
  // Layout
  layoutType?: string;
  heroImageUrl?: string;
  sideImageUrl?: string;
  headingSize?: SizeOption;
  textColor?: string;
  bgType?: string;
  bgImageUrl?: string;
  bgVideoUrl?: string;
  bgColor?: string;
  overlayGradient?: string;
  overlayColor?: string;
  overlayOpacity?: number;
};

type AboutLayoutTabProps = {
  data: AboutEditData;
  onChange: (data: AboutEditData) => void;
  onOpenBackgroundModal?: () => void;
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

export function AboutLayoutTab({ data, onChange, onOpenBackgroundModal }: AboutLayoutTabProps) {
  const updateData = (updates: Partial<AboutEditData>) => onChange({ ...data, ...updates });

  const [showBgModal, setShowBgModal] = React.useState(false);

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

  const renderPreviewBackground = (extraClass = '') => {
    const bg = data.background;
    if (!bg) return null;
    
    if (bg.type === 'image' && bg.value) {
      return <img src={bg.value} alt="bg preview" className={`absolute inset-0 w-full h-full object-cover ${extraClass}`} />;
    }
    if (bg.type === 'video' && bg.value) {
      return <video src={bg.value} className={`absolute inset-0 w-full h-full object-cover ${extraClass}`} muted loop playsInline />;
    }
    if (bg.type === 'color' && bg.value) {
      return <div className={`absolute inset-0 ${extraClass}`} style={{ backgroundColor: bg.value }} />;
    }
    return null;
  };

  const renderOverlay = () => {
    const bg = data.background;
    if (!bg) return null;
    if ((bg.overlayMode === 'gradient') && (bg as any).overlayGradient) {
      return <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: (bg as any).overlayGradient }} />;
    }
    if (bg.overlayColor) {
      const rgb = hexToRgb(bg.overlayColor);
      const alpha = typeof bg.overlayOpacity === 'number' ? bg.overlayOpacity : 0.5;
      const color = rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})` : bg.overlayColor;
      return <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: color }} />;
    }
    return null;
  };

  const handleBackgroundApply = (bgData: BackgroundData) => {
    updateData({ background: bgData });
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
            const previewImage = data.heroImageUrl || 'https://images.unsplash.com/photo-1763897236977-1baa4a026a6d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
            if (data.layoutType === 'center' || !data.layoutType) {
              const bg = renderPreviewBackground();
              return (
                <div className="w-full rounded-md overflow-hidden relative text-white">
                  {bg || <div className="absolute inset-0 bg-linear-to-br from-slate-800 to-slate-700" />}
                  <div className="relative h-40 flex items-center justify-center px-6">
                    <div className="text-center">
                      {data.showTitle && <div className="jodit-wysiwyg" dangerouslySetInnerHTML={{ __html: data.title || 'Title' }} />}
                      {data.showContent && <div className="jodit-wysiwyg mt-2" dangerouslySetInnerHTML={{ __html: data.content || 'Content' }} />}
                      {data.buttonCount === 1 && (
                        <button className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md">
                          {data.buttonText || 'Button'}
                        </button>
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
                      {data.showTitle && <div className="jodit-wysiwyg" dangerouslySetInnerHTML={{ __html: data.title || 'Title' }} />}
                      {data.showContent && <div className="jodit-wysiwyg mt-2" dangerouslySetInnerHTML={{ __html: data.content || 'Content' }} />}
                      {data.buttonCount === 1 && (
                        <button className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md">
                          {data.buttonText || 'Button'}
                        </button>
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
                      {data.showTitle && <div className="jodit-wysiwyg" dangerouslySetInnerHTML={{ __html: data.title || 'Title' }} />}
                      {data.showContent && <div className="jodit-wysiwyg mt-2" dangerouslySetInnerHTML={{ __html: data.content || 'Content' }} />}
                      {data.buttonCount === 1 && (
                        <button className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md">
                          {data.buttonText || 'Button'}
                        </button>
                      )}
                    </div>
                    <img src={previewImage} alt="preview" className="w-1/2 h-full object-cover" />
                  </div>
                </div>
              );
            }

            const bg = renderPreviewBackground();
            return (
              <div className="w-full rounded-md overflow-hidden relative text-white">
                {bg || <div className="absolute inset-0 bg-linear-to-br from-slate-800 to-slate-700" />}
                <div className="relative h-40 flex items-center justify-center px-6">
                  <div className="text-center">
                    {data.showTitle && <div className="jodit-wysiwyg" dangerouslySetInnerHTML={{ __html: data.title || 'Title' }} />}
                    {data.showContent && <div className="jodit-wysiwyg mt-2" dangerouslySetInnerHTML={{ __html: data.content || 'Content' }} />}
                    {data.buttonCount === 1 && (
                      <button className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md">
                        {data.buttonText || 'Button'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
 <Button
            variant="default"
            onClick={() => setShowBgModal(true)}
            className="w-full"
          >
            Change Background
          </Button>
        <div className="mt-3 space-y-4">
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
                <input type="checkbox" checked={data.showTitle ?? true} onChange={(e) => updateData({ showTitle: e.target.checked })} />
                <span className="text-sm">Show title</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={data.showContent ?? true} onChange={(e) => updateData({ showContent: e.target.checked })} />
                <span className="text-sm">Show content</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={(data.buttonCount ?? 1) === 1} onChange={(e) => updateData({ buttonCount: e.target.checked ? 1 : 0 })} />
                <span className="text-sm">Show button</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {data.showTitle && (
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <CustomEditor
            value={data.title}
            onChange={(value) => updateData({ title: value })}
          />
        </div>
      )}

      {data.showContent && (
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <CustomEditor
            value={data.content}
            onChange={(value) => updateData({ content: value })}
          />
        </div>
      )}

      {data.buttonCount === 1 && (
        <div className="space-y-3 border rounded-lg p-4">
          <h3 className="font-semibold text-sm">Button Settings</h3>
          
          <div className="space-y-2">
            <Label htmlFor="button-text">Button Text</Label>
            <Input
              id="button-text"
              value={data.buttonText}
              onChange={(e) => updateData({ buttonText: e.target.value })}
              placeholder="Learn More"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="button-link">Button Link</Label>
            <Input
              id="button-link"
              value={data.button1Link}
              onChange={(e) => updateData({ button1Link: e.target.value })}
              placeholder="/projects"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="button-target">Link Target</Label>
            <Select value={data.button1Target} onValueChange={(v) => updateData({ button1Target: v })}>
              <SelectTrigger id="button-target" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_self">Same tab</SelectItem>
                <SelectItem value="_blank">New tab</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="button-bg-color">Background Color</Label>
              <div className="flex gap-3 items-center">
                <Input
                  type="color"
                  value={data.buttonColor}
                  onChange={(e) => updateData({ buttonColor: e.target.value })}
                  className="w-20 h-10 cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="button-text-color">Text Color</Label>
              <div className="flex gap-3 items-center">
                <Input
                  type="color"
                  value={data.buttonTextColor}
                  onChange={(e) => updateData({ buttonTextColor: e.target.value })}
                  className="w-20 h-10 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Button Preview</Label>
            <div className="border rounded-md p-4 bg-muted flex items-center justify-center">
              <button
                className="px-6 py-2 rounded-md font-medium"
                style={{
                  backgroundColor: data.buttonColor,
                  color: data.buttonTextColor,
                }}
              >
                {data.buttonText || 'Preview text'}
              </button>
            </div>
          </div>
        </div>
      )}

      <BackgroundSelectionModal
        open={showBgModal}
        onOpenChange={setShowBgModal}
        initial={data.background}
        onApply={handleBackgroundApply}
      />
    </div>
  );
}