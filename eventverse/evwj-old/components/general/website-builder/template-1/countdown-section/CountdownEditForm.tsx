"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CountdownContentTab } from "./CountdownContentTab";

type CountdownData = {
  title?: string;
  subtitle?: string;
  targetDate?: string;
  message?: string;
  bgColor?: string;
  textColor?: string;
  numberColor?: string;
  labelColor?: string;
  background?: any;
  countdownStyle?: string;
};

export default function CountdownEditForm({
  initial = {},
  onCancel,
  onSave,
}: {
  initial?: CountdownData;
  onCancel?: () => void;
  onSave?: (d: CountdownData) => void;
}) {
  const [contentData, setContentData] = useState<CountdownData>({
    title: initial.title || "",
    subtitle: initial.subtitle || "",
    targetDate: initial.targetDate || "",
    message: initial.message || "",
    bgColor: initial.bgColor || "#ffffff",
    textColor: initial.textColor || "#111827",
    numberColor: initial.numberColor || "#111827",
    labelColor: initial.labelColor || "#6b7280",
    background: initial.background || undefined,
    countdownStyle: initial.countdownStyle || "classic",
  });

  const handleSave = () => {
    onSave?.(contentData);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4">Edit Countdown Section</h2>

      <div className="flex-1 overflow-y-auto py-4">
        <CountdownContentTab data={contentData} onChange={(d) => setContentData({ ...contentData, ...d })} />
      </div>

      <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}

