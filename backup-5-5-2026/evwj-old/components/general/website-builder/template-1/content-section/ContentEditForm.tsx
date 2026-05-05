"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContentContentTab } from "./ContentContentTab";

type ContentData = {
  title?: string;
  content?: string;
  showButton?: boolean;
  buttonText?: string;
  buttonUrl?: string;
  background?: any;
};

export default function ContentEditForm({
  initial = {},
  onCancel,
  onSave,
}: {
  initial?: ContentData;
  onCancel?: () => void;
  onSave?: (d: ContentData) => void;
}) {
  const [contentData, setContentData] = useState<ContentData>({
    title: initial.title || "",
    content: initial.content || "",
    showButton: initial.showButton || false,
    buttonText: initial.buttonText || "",
    buttonUrl: initial.buttonUrl || "",
    background: initial.background || undefined,
  });

  const handleSave = () => {
    onSave?.(contentData);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4">Edit Content Section</h2>

      <div className="flex-1 overflow-y-auto py-4">
        <ContentContentTab data={contentData as any} onChange={(d) => setContentData({ ...contentData, ...d })} />
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
