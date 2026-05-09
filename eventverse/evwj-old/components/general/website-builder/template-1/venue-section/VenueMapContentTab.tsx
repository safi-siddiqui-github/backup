"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin } from "lucide-react";

interface VenueMapContentTabData {
  title: string;
  subtitle: string;
  address: string;
  embedUrl: string;
}

interface VenueMapContentTabProps {
  data: VenueMapContentTabData;
  onChange: (data: VenueMapContentTabData) => void;
}

export function VenueMapContentTab({ data, onChange }: VenueMapContentTabProps) {
  const updateData = (updates: Partial<VenueMapContentTabData>) => {
    onChange({ ...data, ...updates });
  };

  return (
    <div className="space-y-6">
      {/* Preview Section */}
      <div className="rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-inner">
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {data.title || "Event Venue"}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {data.subtitle || "Find your way around our venue"}
            </p>
          </div>
          
          {/* Map Preview */}
          <div className="space-y-3">
            <div className="aspect-video rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              {data.embedUrl ? (
                <div className="text-center text-slate-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-medium">Map Embedded</p>
                  <p className="text-xs mt-1">Interactive map will display here</p>
                </div>
              ) : (
                <div className="text-center text-slate-400">
                  <MapPin className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No map URL provided</p>
                </div>
              )}
            </div>
            
            {/* Address Card */}
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Address</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {data.address || "123 Event Street, City, Country"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Title Input */}
      <div className="space-y-2">
        <Label htmlFor="venue-title">Venue Title</Label>
        <Input
          id="venue-title"
          type="text"
          placeholder="Event Venue"
          value={data.title}
          onChange={(e) => updateData({ title: e.target.value })}
        />
      </div>

      {/* Subtitle Input */}
      <div className="space-y-2">
        <Label htmlFor="venue-subtitle">Subtitle</Label>
        <Input
          id="venue-subtitle"
          type="text"
          placeholder="Find your way around our venue"
          value={data.subtitle}
          onChange={(e) => updateData({ subtitle: e.target.value })}
        />
      </div>

      {/* Address Input */}
      <div className="space-y-2">
        <Label htmlFor="venue-address">Venue Address</Label>
        <Textarea
          id="venue-address"
          placeholder="123 Event Street, City, Country"
          value={data.address}
          onChange={(e) => updateData({ address: e.target.value })}
          rows={3}
        />
        <p className="text-xs text-muted-foreground">
          Enter the complete address of the venue
        </p>
      </div>

      {/* Map Embed URL */}
      <div className="space-y-2">
        <Label htmlFor="venue-embed">Map Embed URL (Optional)</Label>
        <Textarea
          id="venue-embed"
          placeholder="https://www.google.com/maps/embed?..."
          value={data.embedUrl}
          onChange={(e) => updateData({ embedUrl: e.target.value })}
          rows={4}
        />
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            Provide an embed URL (iframe src) to show an interactive map preview
          </p>
          <p className="text-xs text-muted-foreground">
            <strong>How to get:</strong> Go to Google Maps → Share → Embed a map → Copy HTML
          </p>
        </div>
      </div>

      {/* URL Status */}
      {data.embedUrl && (
        <div className="rounded-lg border p-3 bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Map URL configured
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-1 truncate">
            {data.embedUrl}
          </p>
        </div>
      )}
    </div>
  );
}
