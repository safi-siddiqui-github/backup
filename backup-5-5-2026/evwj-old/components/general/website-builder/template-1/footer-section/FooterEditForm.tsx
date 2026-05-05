"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FooterContentTab } from "./FooterContentTab";
import FooterBackgroundModal from "./FooterBackgroundModal";

type FooterLink = {
  label: string;
  href: string;
};

type FooterData = {
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
  dark?: boolean;
  bgColor?: string;
  textColor?: string;
  bgType?: string;
  bgImageUrl?: string;
  bgVideoUrl?: string;
  overlayMode?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  overlayGradient?: string;
};

type FooterEditFormProps = {
  initial: FooterData;
  onCancel: () => void;
  onSave: (d: FooterData) => Promise<void> | void;
};

type FooterContentTabData = {
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
};

export default function FooterEditForm({
  initial,
  onCancel,
  onSave,
}: FooterEditFormProps) {
  const [saving, setSaving] = useState(false);
  const [bgModalOpen, setBgModalOpen] = useState(false);
  const [bgData, setBgData] = useState({
    bgType: initial.bgType,
    bgColor: initial.bgColor,
    bgImageUrl: initial.bgImageUrl,
    bgVideoUrl: initial.bgVideoUrl,
    overlayMode: initial.overlayMode,
    overlayColor: initial.overlayColor,
    overlayOpacity: initial.overlayOpacity,
    overlayGradient: initial.overlayGradient,
  });

  const [contentData, setContentData] = useState<FooterContentTabData>({
    title: initial.title || "Company Name",
    description: initial.description || "Brief description about your company",
    logoUrl: initial.logoUrl,
    showLogo: initial.showLogo ?? !!initial.logoUrl,
    showTitle: initial.showTitle ?? true,
    showDescription: initial.showDescription ?? true,
    col1Title: initial.col1Title || "Quick Links",
    col2Title: initial.col2Title || "Resources",
    col1: initial.col1 || [],
    col2: initial.col2 || [],
    copyright: initial.copyright || "© 2025 Company Name",
    rightText: initial.rightText || "All rights reserved",
  });

  const handleSave = async () => {
    const finalData: FooterData = {
      title: contentData.title,
      description: contentData.description,
      logoUrl: contentData.logoUrl,
      showLogo: contentData.showLogo,
      showTitle: contentData.showTitle,
      showDescription: contentData.showDescription,
      col1Title: contentData.col1Title,
      col2Title: contentData.col2Title,
      col1: contentData.col1,
      col2: contentData.col2,
      copyright: contentData.copyright,
      rightText: contentData.rightText,
      dark: initial.dark,
      bgColor: bgData.bgColor,
      textColor: initial.textColor,
      bgType: bgData.bgType,
      bgImageUrl: bgData.bgImageUrl,
      bgVideoUrl: bgData.bgVideoUrl,
      overlayMode: bgData.overlayMode,
      overlayColor: bgData.overlayColor,
      overlayOpacity: bgData.overlayOpacity,
      overlayGradient: bgData.overlayGradient,
    };

    setSaving(true);
    await onSave(finalData);
    setSaving(false);
  };

  const isValid = contentData.title.trim().length > 0;

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4">Edit Footer Section</h2>

      <div className="flex gap-2 mb-4">
        <Button variant="outline" onClick={() => setBgModalOpen(true)} className="flex-1">
          Background
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        <FooterContentTab data={contentData} onChange={setContentData} bgData={bgData} />
      </div>

      <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!isValid || saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <FooterBackgroundModal
        isOpen={bgModalOpen}
        onClose={() => setBgModalOpen(false)}
        currentBg={{
          bgType: bgData.bgType,
          bgColor: bgData.bgColor,
          bgImageUrl: bgData.bgImageUrl,
          bgVideoUrl: bgData.bgVideoUrl,
          overlayMode: bgData.overlayMode,
          overlayColor: bgData.overlayColor,
          overlayOpacity: bgData.overlayOpacity,
          overlayGradient: bgData.overlayGradient,
        }}
        onSelectBg={(newBgData) => {
          setBgData(newBgData);
          setBgModalOpen(false);
        }}
      />
    </div>
  );
}
