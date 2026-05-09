"use client";

import type { Chair as ChairType } from "@/types/venue";
import React from "react";

interface ChairProps {
  chair: ChairType;
  isSelected: boolean;
  onUpdate: (updates: Partial<ChairType>) => void;
  onSelect: () => void;
  onDelete: () => void;
  onConfigure: () => void;
  onAssign: () => void;
  viewMode: "design" | "preview";
}

const Chair = ({
  chair,
  isSelected,
  onUpdate,
  onSelect,
  onDelete,
  onConfigure,
  onAssign,
  viewMode,
}: ChairProps) => {
  const handleDrag = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", "");
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  return (
    <div
      draggable={viewMode === "design"}
      onDragStart={handleDrag}
      onClick={handleClick}
      className={`absolute cursor-pointer rounded-lg border-2 bg-gray-100 shadow-sm transition-all hover:shadow-md ${
        isSelected ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300"
      }`}
      style={{
        left: chair.x,
        top: chair.y,
        width: 40,
        height: 40,
        transform: `rotate(${chair.rotation || 0}deg)`,
        transformOrigin: "center center",
      }}
    >
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-xs font-medium text-gray-800">🪑</div>
      </div>

      {chair.guest && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 transform rounded bg-green-100 px-1 text-xs whitespace-nowrap">
          {chair.guest.name}
        </div>
      )}

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
              onAssign();
            }}
            className="rounded bg-green-500 px-2 py-1 text-xs text-white hover:bg-green-600"
          >
            Assign
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

export default Chair;
