"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import SectionBackgroundModal from './SectionBackgroundModal';
import { HeroLayoutTab } from './HeroLayoutTab';
import type { HeroData } from './types';

export default function HeroEditForm({
  initial,
  onCancel,
  onSave,
}: {
  initial: HeroData;
  onCancel: () => void;
  onSave: (d: HeroData) => void;
}) {
  const defaults: HeroData = {
    title: initial?.title || "Building a Concrete Future",
    subtitle: initial?.subtitle || "Honest, Reliable Builders since 1968",
    // description removed per request
    buttonText: initial?.buttonText || "View Projects",
    bgType: initial?.bgType || "image",
    bgImageUrl: initial?.bgImageUrl || "Enter you image link .....",
    bgVideoUrl: initial?.bgVideoUrl || "",
    overlayColor: initial?.overlayColor || "#000000",
    overlayOpacity: typeof initial?.overlayOpacity === "number" ? initial.overlayOpacity : 0.4,
    overlayMode: initial?.overlayMode || "color",
    overlayGradient: initial?.overlayGradient || 'linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.2))',
    headingSize: initial?.headingSize || "xl",
    titleSize: initial?.titleSize || initial?.headingSize || "xl",
    subtitleSize: initial?.subtitleSize || "md",
    titleColor: initial?.titleColor || initial?.textColor || "#ffffff",
    subtitleColor: initial?.subtitleColor || initial?.textColor || "#d1d5db",
    buttonCount: typeof initial?.buttonCount === "number" ? initial.buttonCount : 1,
    button1Link: initial?.button1Link || "/projects",
    button1Target: initial?.button1Target || "_self",
    bgColor: initial?.bgColor || "#1f2937",
    textColor: initial?.textColor || "#ffffff",
    buttonColor: initial?.buttonColor || "#ef4444",
    buttonTextColor: initial?.buttonTextColor || "#ffffff",
    button2Color: initial?.button2Color || "#ffffff",
    button2TextColor: initial?.button2TextColor || "#4b5563",
  };

  const [local, setLocal] = useState<HeroData>(defaults);
  const [activeTab, setActiveTab] = useState<"content" | "layout">("layout");
  const [isBgModalOpen, setIsBgModalOpen] = useState(false);

  React.useEffect(() => {
    setLocal(defaults);
  }, [initial]);

  const handleSave = () => {
    onSave(local);
  };

  const handleBgClose = useCallback(() => setIsBgModalOpen(false), []);

  const handleSelectBg = useCallback((data: Partial<HeroData>) => {
    setLocal(prev => ({ ...prev, ...data }));
  }, []);

  // Memoize modal to avoid creating new element on every render
  const backgroundModal = useMemo(() => (
    <SectionBackgroundModal
      isOpen={isBgModalOpen}
      onClose={handleBgClose}
      currentBg={{
        bgType: local.bgType,
        bgColor: local.bgColor,
        bgImageUrl: local.bgImageUrl,
        bgVideoUrl: local.bgVideoUrl,
        overlayMode: local.overlayMode,
        overlayColor: local.overlayColor,
        overlayOpacity: local.overlayOpacity,
        overlayGradient: local.overlayGradient,
      } as HeroData}
      onSelectBg={handleSelectBg}
    />
  ), [isBgModalOpen, handleBgClose, handleSelectBg, local.bgType, local.bgColor, local.bgImageUrl, local.bgVideoUrl, local.overlayMode, local.overlayColor, local.overlayOpacity, local.overlayGradient]);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold text-center mb-4">Edit Hero Section</h2>
      
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto py-4 max-h-[60vh]">
          <div className="mt-0">
            <HeroLayoutTab
              data={local}
              onChange={setLocal}
              onOpenBackgroundModal={() => setIsBgModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>

      {/* Background Selection Modal */}
      {backgroundModal}
    </div>
  );
}