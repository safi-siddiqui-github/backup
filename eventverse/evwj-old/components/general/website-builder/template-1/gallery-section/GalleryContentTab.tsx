"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Image as ImageIcon } from "lucide-react";
import RichTextEditor from "../../RichTextEditor";



type GalleryContentTabData = {
  title: string;
  images: string[];
  bgColor: string;
  textColor: string;
  displayMode?: string;
};

type GalleryContentTabProps = {
  data: GalleryContentTabData;
  onChange: (data: GalleryContentTabData) => void;
};

export function GalleryContentTab({ data, onChange }: GalleryContentTabProps)  {
  const updateData = (updates: Partial<GalleryContentTabData>) => {
    onChange({ ...data, ...updates });
  };

  const displayMode = data.displayMode || 'grid';

  const handleRemoveImage = (idx: number) => {
    updateData({ images: data.images.filter((_, i) => i !== idx) });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (result) {
            updateData({ images: [...data.images, result] });
          }
        };
        reader.readAsDataURL(file);
      }
    });

    // Reset the input
    event.target.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Title Input */}
      <div className="space-y-2">
        <Label htmlFor="gallery-title">Gallery Title</Label>
        <RichTextEditor
          value={data.title}
          onChange={(value) => updateData({ title: value })}
        />
      </div>

      {/* Title Preview */}
      <div className="space-y-2">
        <Label>Title Preview</Label>
        <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900">
          <div dangerouslySetInnerHTML={{ __html: data.title }} />
        </div>
      </div>

      {/* Display Mode */}
      <div className="space-y-2">
        <Label>Display Mode</Label>
        <select
          value={displayMode}
          onChange={(e) => updateData({ displayMode: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="grid">Normal Grid View</option>
          <option value="dome">Masonry Gallery View</option>
          <option value="stack">Stack View</option>
         
        </select>
      </div>

      {/* Images Management */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Gallery Images</Label>
          <span className="text-xs text-muted-foreground">
            {data.images.length} {data.images.length === 1 ? 'image' : 'images'}
          </span>
        </div>

       

        {/* Add Images */}
        <div className="space-y-2 border rounded-lg p-4 bg-slate-50 dark:bg-slate-900">
          <Label htmlFor="image-upload">Upload Images</Label>
          <div className="space-y-2">
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground">
              Select multiple images to add to your gallery. Supported formats: JPG, PNG, GIF, WebP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
