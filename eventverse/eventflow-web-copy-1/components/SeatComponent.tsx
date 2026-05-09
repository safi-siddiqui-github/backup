"use client";

import type { Seat } from "@/types/venue";
import React from "react";

interface SeatComponentProps {
  seat: Seat;
  isSelected: boolean;
  onUpdate: (updates: Partial<Seat>) => void;
  onSelect: () => void;
  onAssign: () => void;
  viewMode: "design" | "preview";
}

const SeatComponent = ({
  seat,
  isSelected,
  onUpdate,
  onSelect,
  onAssign,
  viewMode,
}: SeatComponentProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  const getStatusColor = () => {
    switch (seat.status) {
      case "assigned":
        return "bg-green-500";
      case "reserved":
        return "bg-yellow-500";
      case "blocked":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`absolute cursor-pointer rounded-lg border-2 shadow-sm transition-all hover:shadow-md ${
        isSelected ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300"
      } ${getStatusColor()}`}
      style={{
        left: seat.x,
        top: seat.y,
        width: 30,
        height: 30,
      }}
    >
      <div className="flex h-full w-full items-center justify-center text-xs font-medium text-white">
        {seat.seatNumber}
      </div>

      {seat.guest && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 transform rounded bg-green-100 px-1 text-xs whitespace-nowrap">
          {seat.guest.name}
        </div>
      )}

      {viewMode === "design" && isSelected && (
        <div className="absolute -top-8 left-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAssign();
            }}
            className="rounded bg-green-500 px-2 py-1 text-xs text-white hover:bg-green-600"
          >
            Assign
          </button>
        </div>
      )}
    </div>
  );
};

export default SeatComponent;
