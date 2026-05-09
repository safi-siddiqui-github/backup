"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface MapContentTabData {
  title: string;
  subtitle: string;
  description: string;
  address: string;
  bgColor: string;
  textColor: string;
}

interface MapContentTabProps {
  data: MapContentTabData;
  onChange: (data: MapContentTabData) => void;
}

const COLOR_PRESETS = {
  background: ["#ffffff", "#f8fafc", "#111827", "#1e293b", "#0ea5e9", "#8b5cf6", "#ec4899"],
  text: ["#111827", "#0f172a", "#ffffff", "#64748b", "#0ea5e9", "#8b5cf6"],
};

export function MapContentTab({ data, onChange }: MapContentTabProps) {
  const updateData = (updates: Partial<MapContentTabData>) => {
    onChange({ ...data, ...updates });
  };

  return (
    <div className="space-y-6">
      {/* Preview Section */}
      <div className="rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-inner">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100" style={{ color: data.textColor }}>
              {data.title || "Find Us"}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400" style={{ color: data.textColor }}>
              {data.subtitle || "Event location and directions"}
            </p>
          </div>
          
          {/* Map Preview */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="h-32 w-full rounded border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 flex items-center justify-center" style={{ backgroundColor: data.bgColor }}>
                <span className="text-sm text-slate-500">Interactive Map</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400" style={{ color: data.textColor }}>
                {data.description || "Map description..."}
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4" style={{ backgroundColor: data.bgColor, borderColor: data.textColor + '20' }}>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100" style={{ color: data.textColor }}>Address</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1" style={{ color: data.textColor }}>
                {data.address || "123 Event Street, City, Country"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Title Input */}
      <div className="space-y-2">
        <Label htmlFor="map-title">Title</Label>
        <Input
          id="map-title"
          type="text"
          placeholder="Find Us"
          value={data.title}
          onChange={(e) => updateData({ title: e.target.value })}
        />
      </div>

      {/* Subtitle Input */}
      <div className="space-y-2">
        <Label htmlFor="map-subtitle">Subtitle</Label>
        <Input
          id="map-subtitle"
          type="text"
          placeholder="Event location and directions"
          value={data.subtitle}
          onChange={(e) => updateData({ subtitle: e.target.value })}
        />
      </div>

      {/* Description Input */}
      <div className="space-y-2">
        <Label htmlFor="map-description">Description</Label>
        <Textarea
          id="map-description"
          placeholder="Add details about the location and how to get there..."
          value={data.description}
          onChange={(e) => updateData({ description: e.target.value })}
          rows={3}
        />
      </div>

      {/* Address Input */}
      <div className="space-y-2">
        <Label htmlFor="map-address">Address</Label>
        <Textarea
          id="map-address"
          placeholder="123 Event Street, City, Country"
          value={data.address}
          onChange={(e) => updateData({ address: e.target.value })}
          rows={2}
        />
        <p className="text-xs text-muted-foreground">
          Enter the full address of the event location
        </p>
      </div>

      {/* Background Style Section */}
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

      {/* Text Style Section */}
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
