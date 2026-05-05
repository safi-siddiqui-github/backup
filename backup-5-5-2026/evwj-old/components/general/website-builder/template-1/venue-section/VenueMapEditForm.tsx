"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { VenueMapContentTab } from "./VenueMapContentTab";

interface VenueMapData {
  title: string;
  subtitle: string;
  address: string;
  embedUrl: string;
}

export default function VenueMapEditForm({ initial = {}, onCancel, onSave }: any) {
  // Initialize venue data
  const [venueData, setVenueData] = useState<VenueMapData>({
    title: initial.title || "Event Venue",
    subtitle: initial.subtitle || "Find your way around our venue",
    address: initial.address || "123 Event Street, City, Country",
    embedUrl: initial.embedUrl || "",
  });

  const handleSave = () => {
    onSave(venueData);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4">Edit Venue Map Section</h2>

      <div className="flex-1 overflow-y-auto px-1">
        <VenueMapContentTab data={venueData} onChange={setVenueData} />
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
