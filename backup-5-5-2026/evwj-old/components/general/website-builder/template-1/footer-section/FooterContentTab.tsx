"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import RichTextEditor from "../../RichTextEditor";

type FooterLink = {
  label: string;
  href: string;
};

type FooterContentTabData ={
  title: string;
  description: string;
  logoUrl?: string;
  showLogo?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  col1Title: string;
  col2Title: string;
  col1: FooterLink[];
  col2: FooterLink[];
  copyright: string;
  rightText: string;
  bgType?: string;
  bgColor?: string;
  bgImageUrl?: string;
  bgVideoUrl?: string;
  overlayMode?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  overlayGradient?: string;
}

type FooterContentTabProps = {
  data: FooterContentTabData;
  onChange: (data: FooterContentTabData) => void;
  bgData?: {
    bgType?: string;
    bgColor?: string;
    bgImageUrl?: string;
    bgVideoUrl?: string;
    overlayMode?: string;
    overlayColor?: string;
    overlayOpacity?: number;
    overlayGradient?: string;
  };
};

export function FooterContentTab({ data, onChange, bgData }: FooterContentTabProps) {
  const updateData = (updates: Partial<FooterContentTabData>) => {
    onChange({ ...data, ...updates });
  };

  const updateLink = (list: "col1" | "col2", i: number, patch: Partial<FooterLink>) => {
    const updated = [...data[list]];
    updated[i] = { ...updated[i], ...patch };
    updateData({ [list]: updated });
  };

  const addLink = (list: "col1" | "col2") => {
    updateData({
      [list]: [...data[list], { label: "New Link", href: "#" }],
    });
  };

  const removeLink = (list: "col1" | "col2", i: number) => {
    const updated = data[list].filter((_, idx) => idx !== i);
    updateData({ [list]: updated });
  };

  const getPreviewBackgroundStyle = () => {
    const bg = bgData || {};
    const bgType = bg.bgType || 'solid';

    if (bgType === 'image' && bg.bgImageUrl) {
      return {
        backgroundImage: `url('${bg.bgImageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }

    if (bgType === 'video') {
      return {
        backgroundColor: bg.bgColor || '#000000',
      };
    }

    return { backgroundColor: bg.bgColor || '#f1f5f9' };
  };

  const getPreviewOverlayStyle = (): React.CSSProperties => {
    const bg = bgData || {};
    if (bg.bgType === 'solid' || !bg.bgType) {
      return {};
    }

    const overlayMode = bg.overlayMode || 'color';

    if (overlayMode === 'gradient') {
      return {
        background: bg.overlayGradient || 'linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.2))',
      };
    }

    if (bg.overlayColor) {
      const hex = bg.overlayColor;
      const h = hex.replace('#', '');
      const full = h.length === 3 ? h.split('').map((c: string) => c + c).join('') : h;
      const int = parseInt(full, 16);
      const r = (int >> 16) & 255;
      const g = (int >> 8) & 255;
      const b = int & 255;
      const opacity = bg.overlayOpacity ?? 0.4;
      return {
        backgroundColor: `rgba(${r}, ${g}, ${b}, ${opacity})`,
      };
    }

    return {};
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 shadow-inner" style={getPreviewBackgroundStyle()}>
        {(bgData?.bgType === 'image' || bgData?.bgType === 'video') && (
          <div className="absolute inset-0 pointer-events-none" style={getPreviewOverlayStyle()} />
        )}
        
        <div className="relative z-10 p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              {data.logoUrl && data.showLogo ? (
                <>
                  <div className="flex items-center gap-4">
                    <img src={data.logoUrl} alt="Footer Logo" className="h-14 w-14 object-contain rounded-lg" />
                  </div>
                  {data.showDescription !== false && (
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      <div dangerouslySetInnerHTML={{ __html: data.description || "Footer description text" }} />
                    </div>
                  )}
                </>
              ) : data.showTitle !== false ? (
                <>
                  <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    <div dangerouslySetInnerHTML={{ __html: data.title || "Footer Title" }} />
                  </div>
                  {data.showDescription !== false && (
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      <div dangerouslySetInnerHTML={{ __html: data.description || "Footer description text" }} />
                    </div>
                  )}
                </>
              ) : null}
            </div>
            
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {data.col1Title || "Column 1"}
                </p>
                <div className="space-y-1">
                  {data.col1.slice(0, 3).map((link, i) => (
                    <p key={i} className="text-slate-600 dark:text-slate-400">{link.label}</p>
                  ))}
                  {data.col1.length > 3 && (
                    <p className="text-xs text-slate-500">+{data.col1.length - 3} more</p>
                  )}
                </div>
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {data.col2Title || "Column 2"}
                </p>
                <div className="space-y-1">
                  {data.col2.slice(0, 3).map((link, i) => (
                    <p key={i} className="text-slate-600 dark:text-slate-400">{link.label}</p>
                  ))}
                  {data.col2.length > 3 && (
                    <p className="text-xs text-slate-500">+{data.col2.length - 3} more</p>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t pt-3 mt-4 flex justify-between text-xs text-slate-500">
              <span>{data.copyright || "© 2025 Company"}</span>
              <span>{data.rightText || "All rights reserved"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 border rounded-lg p-4">
        <h3 className="font-semibold text-sm">General Information</h3>
        
        <div className="space-y-2">
          <div className="mt-2 flex items-center gap-2">
            <input
              id="footer-show-title"
              type="checkbox"
              checked={data.showTitle !== false}
              onChange={(e) => updateData({ showTitle: e.target.checked, showLogo: false })}
              disabled={data.showLogo === true}
            />
            <Label htmlFor="footer-show-title">Show title</Label>
            {data.showLogo && (
              <span className="text-xs text-muted-foreground">Disable logo to show title.</span>
            )}
          </div>
          {data.showTitle !== false && (
            <>
              <Label htmlFor="footer-title">Footer Title</Label>
              <RichTextEditor
                value={data.title}
                onChange={(value) => updateData({ title: value })}
              />
            </>
          )}
        </div>

        <div className="space-y-2">
          <div className="mt-2 flex items-center gap-2">
            <input
              id="footer-show-description"
              type="checkbox"
              checked={data.showDescription !== false}
              onChange={(e) => updateData({ showDescription: e.target.checked })}
            />
            <Label htmlFor="footer-show-description">Show description</Label>
          </div>
          {data.showDescription !== false && (
            <>
              <Label htmlFor="footer-description">Description</Label>
              <RichTextEditor
                value={data.description}
                onChange={(value) => updateData({ description: value })}
              />
            </>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="footer-logo">Logo (optional)</Label>
          <div className="flex items-center gap-3">
            <Input
              id="footer-logo"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                  const url = ev.target?.result as string;
                  if (url) updateData({ logoUrl: url, showLogo: true, showTitle: false });
                };
                reader.readAsDataURL(file);
              }}
            />
            {data.logoUrl && (
              <div className="flex items-center gap-2">
                <img src={data.logoUrl} alt="Logo preview" className="h-8 w-auto object-contain rounded" />
                <Button variant="ghost" size="sm" onClick={() => updateData({ logoUrl: undefined, showTitle: false })}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <input
              id="footer-show-logo"
              type="checkbox"
              checked={!!data.showLogo}
              onChange={(e) => updateData({ showLogo: e.target.checked, showTitle: false })}
              disabled={data.showTitle === true}
            />
            <Label htmlFor="footer-show-logo">Show logo</Label>
            {data.showTitle && (
              <span className="text-xs text-muted-foreground">Disable title to show logo.</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">Upload a brand logo and toggle display next to the title.</p>
        </div>
      </div>

      <div className="space-y-3 border rounded-lg p-4">
        <h3 className="font-semibold text-sm">Link Columns</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Column 1 */}
          <div className="space-y-3 border rounded-md p-3 bg-slate-50 dark:bg-slate-900">
            <div className="space-y-2">
              <Label htmlFor="col1-title">Column 1 Title</Label>
              <Input
                id="col1-title"
                type="text"
                placeholder="Quick Links"
                value={data.col1Title}
                onChange={(e) => updateData({ col1Title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Links</Label>
                <span className="text-xs text-muted-foreground">{data.col1.length} links</span>
              </div>
              
              {data.col1.map((link, i) => (
                <div key={i} className="space-y-2 border rounded-md p-2 bg-white dark:bg-slate-800">
                  <Input
                    type="text"
                    placeholder="Link Label"
                    value={link.label}
                    onChange={(e) => updateLink("col1", i, { label: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="URL"
                      value={link.href}
                      onChange={(e) => updateLink("col1", i, { href: e.target.value })}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLink("col1", i)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() => addLink("col1")}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Link
              </Button>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-3 border rounded-md p-3 bg-slate-50 dark:bg-slate-900">
            <div className="space-y-2">
              <Label htmlFor="col2-title">Column 2 Title</Label>
              <Input
                id="col2-title"
                type="text"
                placeholder="Resources"
                value={data.col2Title}
                onChange={(e) => updateData({ col2Title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Links</Label>
                <span className="text-xs text-muted-foreground">{data.col2.length} links</span>
              </div>
              
              {data.col2.map((link, i) => (
                <div key={i} className="space-y-2 border rounded-md p-2 bg-white dark:bg-slate-800">
                  <Input
                    type="text"
                    placeholder="Link Label"
                    value={link.label}
                    onChange={(e) => updateLink("col2", i, { label: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="URL"
                      value={link.href}
                      onChange={(e) => updateLink("col2", i, { href: e.target.value })}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLink("col2", i)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() => addLink("col2")}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Link
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 border rounded-lg p-4">
        <h3 className="font-semibold text-sm">Bottom Bar</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="copyright">Copyright Text</Label>
            <Input
              id="copyright"
              type="text"
              placeholder="© 2025 Company Name"
              value={data.copyright}
              onChange={(e) => updateData({ copyright: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="right-text">Right Text</Label>
            <Input
              id="right-text"
              type="text"
              placeholder="All rights reserved"
              value={data.rightText}
              onChange={(e) => updateData({ rightText: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
