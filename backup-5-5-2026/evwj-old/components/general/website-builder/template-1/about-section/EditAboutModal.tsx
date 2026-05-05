"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { AboutData, AboutLayout } from "./About.types";
import { AboutLayoutTab } from "./AboutLayoutTab";

 

type  EditAboutModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial: AboutData;
  onSave: (d: AboutData) => void;
}

type AboutEditData  = {
  background?: {
    type: 'color' | 'image' | 'video';
    value: string;
    overlayColor?: string;
    overlayOpacity?: number;
    overlayGradient?: string;
    overlayMode?: 'color' | 'gradient';
  };
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
  layoutType?: string;
  heroImageUrl?: string;
  sideImageUrl?: string;
  headingSize?: 'small' | 'medium' | 'large' | 'x-large';
  textColor?: string;
  bgType?: string;
  bgImageUrl?: string;
  bgVideoUrl?: string;
  bgColor?: string;
  overlayGradient?: string;
  overlayColor?: string;
  overlayOpacity?: number;
}

export function EditAboutModal({
  open,
  onOpenChange,
  initial,
  onSave,
}: EditAboutModalProps) {
  const [data, setData] = useState<AboutEditData>(() => ({
    background: initial.bgColor
      ? { type: "color", value: initial.bgColor }
      : undefined,
    title: initial.title || '',
    content: initial.subtitle || '',
    showTitle: true,
    showContent: true,
    buttonCount: 1,
    buttonText: initial.ctaText || 'Learn More',
    buttonColor: '#ef4444',
    buttonTextColor: '#ffffff',
    button1Link: initial.ctaLink || '/projects',
    button1Target: '_self',
    layoutType: initial.layout || 'center',
    heroImageUrl: initial.imageUrl,
    sideImageUrl: initial.sideImageUrl,
    headingSize: 'large',
    textColor: initial.textColor || '#000000',
    bgType: 'solid',
    bgColor: initial.bgColor || '#ffffff',
  }));

  React.useEffect(() => {
    setData({
      background: initial.bgColor
        ? { type: "color", value: initial.bgColor }
        : undefined,
      title: initial.title || '',
      content: initial.subtitle || '',
      showTitle: initial.showTitle ?? true,
      showContent: initial.showContent ?? true,
      buttonCount: 1,
      buttonText: initial.ctaText || 'Learn More',
      buttonColor: '#ef4444',
      buttonTextColor: '#ffffff',
      button1Link: initial.ctaLink || '/projects',
      button1Target: '_self',
      layoutType: 'center',
      heroImageUrl: initial.imageUrl,
      sideImageUrl: initial.sideImageUrl,
      headingSize: 'large',
      textColor: initial.textColor || '#000000',
      bgType: 'solid',
      bgColor: initial.bgColor || '#ffffff',
    });
  }, [initial]);

  const handleSave = () => {
    const updatedData: AboutData = {
      title: data.title,
      subtitle: data.content,
      imageUrl: data.heroImageUrl,
      bullets: initial.bullets,
      ctaText: data.buttonText,
      ctaLink: data.button1Link,
      layout: (data.layoutType || initial.layout) as AboutLayout | undefined,
      items: initial.items,
      bgColor: data.bgColor,
      textColor: data.textColor,
      showTitle: data.showTitle,
      showContent: data.showContent,
      sideImageUrl: data.sideImageUrl,
      buttonCount: data.buttonCount,
    };

    onSave(updatedData);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit About Section</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4">
          <AboutLayoutTab data={data} onChange={setData} onOpenBackgroundModal={() => {}} />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function EditAboutFormContent({
  initial,
  onCancel,
  onSave,
}: {
  initial: AboutData;
  onCancel: () => void;
  onSave: (d: AboutData) => void;
}) {
  const [data, setData] = useState<AboutEditData>(() => ({
    background: initial.bgColor
      ? { type: "color", value: initial.bgColor }
      : undefined,
    title: initial.title || '',
    content: initial.subtitle || '',
    showTitle: initial.showTitle ?? true,
    showContent: initial.showContent ?? true,
    buttonCount: 1,
    buttonText: initial.ctaText || 'Learn More',
    buttonColor: '#ef4444',
    buttonTextColor: '#ffffff',
    button1Link: initial.ctaLink || '/projects',
    button1Target: '_self',
    layoutType: initial.layout || 'center',
    heroImageUrl: initial.imageUrl,
    sideImageUrl: initial.sideImageUrl,
    headingSize: 'large',
    textColor: initial.textColor || '#000000',
    bgType: 'solid',
    bgColor: initial.bgColor || '#ffffff',
  }));

  React.useEffect(() => {
    setData({
      background: initial.bgColor
        ? { type: "color", value: initial.bgColor }
        : undefined,
      title: initial.title || '',
      content: initial.subtitle || '',
      showTitle: initial.showTitle ?? true,
      showContent: initial.showContent ?? true,
      buttonCount: 1,
      buttonText: initial.ctaText || 'Learn More',
      buttonColor: '#ef4444',
      buttonTextColor: '#ffffff',
      button1Link: initial.ctaLink || '/projects',
      button1Target: '_self',
      layoutType: initial.layout || 'center',
      heroImageUrl: initial.imageUrl,
      sideImageUrl: initial.sideImageUrl,
      headingSize: 'large',
      textColor: initial.textColor || '#000000',
      bgType: 'solid',
      bgColor: initial.bgColor || '#ffffff',
    });
  }, [initial]);

  const handleSave = () => {
    // Map back to AboutData
    const updatedData: AboutData = {
      title: data.title,
      subtitle: data.content,
      imageUrl: data.heroImageUrl,
      bullets: initial.bullets,
      ctaText: data.buttonText,
      ctaLink: data.button1Link,
      layout: (data.layoutType || initial.layout) as AboutLayout | undefined,
      items: initial.items,
      bgColor: data.bgColor,
      textColor: data.textColor,
      showTitle: data.showTitle,
      showContent: data.showContent,
      sideImageUrl: data.sideImageUrl,
      background: data.background,
      buttonCount: data.buttonCount,
    };

    onSave(updatedData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit About Section</h2>

      <div className="flex-1 overflow-y-auto py-4 max-h-[60vh]">
        <AboutLayoutTab data={data} onChange={setData} />
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}
