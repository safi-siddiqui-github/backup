"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MapStyleTabData {
  bgColor: string;
  textColor: string;
}

interface MapStyleTabProps {
  data: MapStyleTabData;
  onChange: (data: MapStyleTabData) => void;
}

const COLOR_PRESETS = {
  background: ["#ffffff", "#f8fafc", "#111827", "#1e293b", "#0ea5e9", "#8b5cf6", "#ec4899"],
  text: ["#111827", "#0f172a", "#ffffff", "#64748b", "#0ea5e9", "#8b5cf6"],
};

export function MapStyleTab({ data, onChange }: MapStyleTabProps) {
  const updateData = (updates: Partial<MapStyleTabData>) => {
    onChange({ ...data, ...updates });
  };

  return (
    <div className="space-y-6">
      {/* Background Color */}
      <div className="space-y-3 border rounded-lg p-4">
        <h3 className="font-semibold text-sm">Background Style</h3>
        
        <div className="space-y-2">
          <Label htmlFor="map-bg-color">Background Color</Label>
          <div className="flex gap-3 items-center">
            <Input
              type="color"
              value={data.bgColor || "#ffffff"}
              onChange={(e) => updateData({ bgColor: e.target.value })}
              className="w-20 h-10 cursor-pointer"
            />
            <Input
              id="map-bg-color"
              type="text"
              value={data.bgColor || ""}
              onChange={(e) => updateData({ bgColor: e.target.value })}
              placeholder="#ffffff"
              className="flex-1"
            />
          </div>
        </div>

        {/* Color Presets */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Quick Colors</Label>
          <div className="flex gap-2 flex-wrap">
            {COLOR_PRESETS.background.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => updateData({ bgColor: color })}
                className="w-10 h-8 rounded-md border-2 hover:border-primary transition-colors"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-2">
          <Label>Background Preview</Label>
          <div className="border rounded-md p-4 bg-muted">
            <div
              className="w-full h-24 rounded-lg border shadow-sm flex items-center justify-center"
              style={{ backgroundColor: data.bgColor || "#ffffff" }}
            >
              <span className="text-xs text-slate-500">Section Background</span>
            </div>
          </div>
        </div>
      </div>

      {/* Text Color */}
      <div className="space-y-3 border rounded-lg p-4">
        <h3 className="font-semibold text-sm">Text Style</h3>
        
        <div className="space-y-2">
          <Label htmlFor="map-text-color">Text Color</Label>
          <div className="flex gap-3 items-center">
            <Input
              type="color"
              value={data.textColor || "#111827"}
              onChange={(e) => updateData({ textColor: e.target.value })}
              className="w-20 h-10 cursor-pointer"
            />
            <Input
              id="map-text-color"
              type="text"
              value={data.textColor || ""}
              onChange={(e) => updateData({ textColor: e.target.value })}
              placeholder="#111827"
              className="flex-1"
            />
          </div>
        </div>

        {/* Color Presets */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Quick Colors</Label>
          <div className="flex gap-2 flex-wrap">
            {COLOR_PRESETS.text.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => updateData({ textColor: color })}
                className="w-10 h-8 rounded-md border-2 hover:border-primary transition-colors"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-2">
          <Label>Text Preview</Label>
          <div className="border rounded-md p-4 bg-muted">
            <h4
              className="text-xl font-bold"
              style={{ color: data.textColor || "#111827" }}
            >
              Find Us
            </h4>
            <p
              className="text-sm mt-1"
              style={{ color: data.textColor || "#111827" }}
            >
              Event location and directions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
