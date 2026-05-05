"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GalleryContentTab } from "./GalleryContentTab";

type GalleryData = {
  title?: string;
  images?: string[];
  bgColor?: string;
  textColor?: string;
  displayMode?: string;
};

// Content Tab Data Type
type GalleryContentTabData = {
  title: string;
  images: string[];
  bgColor: string;
  textColor: string;
  displayMode?: string;
};

export default function GalleryEditForm({
  initial = {},
  onCancel,
  onSave,
}: {
  initial?: GalleryData;
  onCancel?: () => void;
  onSave?: (d: GalleryData) => void;
}) {
  // Initialize content data
  const [contentData, setContentData] = useState<GalleryContentTabData>({
    title: initial.title || "Image Gallery",
    images: Array.isArray(initial.images) ? initial.images.slice() : [],
    bgColor: initial.bgColor || "#ffffff",
    textColor: initial.textColor || "#111827",
    displayMode: initial.displayMode || "grid",
  });

  const handleSave = () => {
    const finalData: GalleryData = {
      title: contentData.title,
      images: contentData.images,
      bgColor: contentData.bgColor,
      textColor: contentData.textColor,
      displayMode: contentData.displayMode,
    };

    onSave?.(finalData);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl text-center font-bold mb-4">Edit Gallery Section</h2>

      <div className="flex-1 overflow-auto">
        <GalleryContentTab data={contentData} onChange={setContentData} />
      </div>

      <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
