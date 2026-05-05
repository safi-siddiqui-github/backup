"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapContentTab } from "./MapContentTab";

type MapData = {
  title?: string;
  subtitle?: string;
  description?: string;
  address?: string;
  bgColor?: string;
  textColor?: string;
};

// Content Tab Data Interface (now includes all styling)
interface MapContentTabData {
  title: string;
  subtitle: string;
  description: string;
  address: string;
  bgColor: string;
  textColor: string;
}

export default function MapEditForm({
  initial = {},
  onCancel,
  onSave,
}: {
  initial?: MapData;
  onCancel?: () => void;
  onSave?: (d: MapData) => void;
}) {
  // Initialize content data (now includes all styling)
  const [contentData, setContentData] = useState<MapContentTabData>({
    title: initial.title || "Find Us",
    subtitle: initial.subtitle || "Event location and directions",
    description: initial.description || "Interactive Map Coming Soon add a fake location with some more details",
    address: initial.address || "123 Event Street, City, Country",
    bgColor: initial.bgColor || "#ffffff",
    textColor: initial.textColor || "#111827",
  });

  const handleSave = () => {
    const finalData: MapData = {
      title: contentData.title,
      subtitle: contentData.subtitle,
      description: contentData.description,
      address: contentData.address,
      bgColor: contentData.bgColor,
      textColor: contentData.textColor,
    };

    onSave?.(finalData);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4">Edit Map Section</h2>

      <div className="flex-1 overflow-auto">
        <MapContentTab data={contentData} onChange={setContentData} />
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
