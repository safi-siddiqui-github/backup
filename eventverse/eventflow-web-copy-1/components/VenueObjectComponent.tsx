"use client";

import type { VenueObject } from "@/types/venue";
import React from "react";

interface VenueObjectComponentProps {
  venueObject: VenueObject;
  isSelected: boolean;
  onUpdate: (updates: Partial<VenueObject>) => void;
  onSelect: () => void;
  onDelete: () => void;
  onConfigure: () => void;
  viewMode: "design" | "preview";
}

const VenueObjectComponent = ({
  venueObject,
  isSelected,
  onUpdate,
  onSelect,
  onDelete,
  onConfigure,
  viewMode,
}: VenueObjectComponentProps) => {
  const handleDrag = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", "");
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  const getIcon = () => {
    switch (venueObject.type) {
      case "stage":
        return "🎭";
      case "podium":
        return "🎤";
      case "exit":
        return "🚪";
      case "dancefloor":
        return "💃";
      default:
        return "📦";
    }
  };

  return (
    <div
      draggable={viewMode === "design"}
      onDragStart={handleDrag}
      onClick={handleClick}
      className={`absolute cursor-pointer rounded-lg border-2 shadow-sm transition-all hover:shadow-md ${
        isSelected ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300"
      }`}
      style={{
        left: venueObject.x,
        top: venueObject.y,
        width: venueObject.width,
        height: venueObject.height,
        backgroundColor: venueObject.color || "#8B5CF6",
        transform: `rotate(${venueObject.rotation || 0}deg)`,
        transformOrigin: "center center",
      }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center p-2 text-white">
        <div className="text-2xl">{getIcon()}</div>
        <div className="text-center text-xs font-medium">
          {venueObject.name}
        </div>
      </div>

      {viewMode === "design" && isSelected && (
        <div className="absolute -top-8 left-0 flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onConfigure();
            }}
            className="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
          >
            Config
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default VenueObjectComponent;
