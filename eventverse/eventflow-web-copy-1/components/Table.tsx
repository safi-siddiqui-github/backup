"use client";

import type { Table as TableType } from "@/types/venue";
import React from "react";

interface TableProps {
  table: TableType;
  isSelected: boolean;
  onUpdate: (updates: Partial<TableType>) => void;
  onSelect: () => void;
  onDelete: () => void;
  onConfigure: () => void;
  onAssignSeat: () => void;
  onSwapSeats: () => void;
  viewMode: "design" | "preview";
}

const Table = ({
  table,
  isSelected,
  onUpdate,
  onSelect,
  onDelete,
  onConfigure,
  onAssignSeat,
  onSwapSeats,
  viewMode,
}: TableProps) => {
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
      className={`absolute cursor-pointer rounded-lg border-2 bg-white shadow-sm transition-all hover:shadow-md ${
        isSelected ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300"
      } ${table.shape === "round" ? "rounded-full" : ""}`}
      style={{
        left: table.x,
        top: table.y,
        width:
          table.shape === "round"
            ? 80
            : table.shape === "long-rectangular"
              ? 120
              : 100,
        height: table.shape === "round" ? 80 : 60,
        transform: `rotate(${table.rotation || 0}deg) scale(${table.scale || 1})`,
        transformOrigin: "center center",
      }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center p-2">
        <div className="truncate text-xs font-medium text-gray-800">
          {table.name}
        </div>
        <div className="text-xs text-gray-500">{table.seats} seats</div>
        {Object.keys(table.seatAssignments || {}).length > 0 && (
          <div className="text-xs text-green-600">
            {Object.keys(table.seatAssignments || {}).length} assigned
          </div>
        )}
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
              onAssignSeat();
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

export default Table;
