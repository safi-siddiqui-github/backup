"use client";

import type { Table as TableType } from "@/types/venue";
import { ArrowLeftRight, Settings, Trash2 } from "lucide-react";
import React, { useRef, useState } from "react";

interface DraggableTableProps {
  table: TableType;
  isSelected: boolean;
  onUpdate: (updates: Partial<TableType>) => void;
  onSelect: () => void;
  onDelete: () => void;
  onConfigure: () => void;
  onAssignSeat: (seatNumber: number) => void;
  onSwapSeats: () => void;
  viewMode: "design" | "preview";
}

const DraggableTable = ({
  table,
  isSelected,
  onUpdate,
  onSelect,
  onDelete,
  onConfigure,
  onAssignSeat,
  onSwapSeats,
  viewMode,
}: DraggableTableProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const tableRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (viewMode !== "design") return;

    e.stopPropagation();
    onSelect();

    if ((e.target as HTMLElement).classList.contains("resize-handle")) {
      setIsResizing(true);
    } else {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - table.x,
        y: e.clientY - table.y,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      onUpdate({ x: Math.max(0, newX), y: Math.max(0, newY) });
    } else if (isResizing) {
      const rect = tableRef.current?.getBoundingClientRect();
      if (rect) {
        const newScale = Math.max(
          0.5,
          Math.min(2, (e.clientX - rect.left) / 100),
        );
        onUpdate({ scale: newScale });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  React.useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart]);

  // Calculate chair positions for rectangular tables following the exact pattern
  const calculateRectangularChairPositions = () => {
    const totalSeats = table.seats;
    const scale = table.scale || 1;
    const tableWidth = (table.shape === "long-rectangular" ? 120 : 100) * scale;
    const tableHeight = 60 * scale;
    const chairPadding = 25 * scale; // Scale the padding
    const chairSize = 15; // Chair radius for positioning

    // Always 1 left, 1 right. Top and bottom grow.
    const leftSeats = totalSeats >= 2 ? 1 : 0;
    const rightSeats = totalSeats >= 2 ? 1 : 0;
    let topSeats = 0;
    let bottomSeats = 0;

    // Calculate top and bottom based on your exact pattern
    const remainingSeats = totalSeats - leftSeats - rightSeats;

    if (remainingSeats > 0) {
      if (remainingSeats === 1) {
        topSeats = 1; // 3 total: 1 left, 1 top, 1 right
      } else if (remainingSeats === 2) {
        topSeats = 1;
        bottomSeats = 1; // 4 total: 1 left, 1 top, 1 right, 1 bottom
      } else {
        // For 5+ seats, distribute remaining between top and bottom
        // Top gets one more if odd number
        topSeats = Math.ceil(remainingSeats / 2);
        bottomSeats = Math.floor(remainingSeats / 2);
      }
    }

    console.log(
      `Table ${table.name}: ${totalSeats} seats -> L:${leftSeats} T:${topSeats} R:${rightSeats} B:${bottomSeats}`,
    );

    const positions: { seatNumber: number; x: number; y: number }[] = [];
    let seatIndex = 0;

    // Helper function to add chair position
    const addChair = (x: number, y: number) => {
      positions.push({
        seatNumber: seatIndex + 1,
        x: x - chairSize,
        y: y - chairSize,
      });
      seatIndex++;
    };

    // Left chairs
    for (let i = 0; i < leftSeats; i++) {
      const y = tableHeight / 2; // Center vertically
      addChair(-chairPadding, y);
    }

    // Top chairs
    for (let i = 0; i < topSeats; i++) {
      const x =
        topSeats === 1
          ? tableWidth / 2
          : (tableWidth / (topSeats + 1)) * (i + 1);
      addChair(x, -chairPadding);
    }

    // Right chairs
    for (let i = 0; i < rightSeats; i++) {
      const y = tableHeight / 2; // Center vertically
      addChair(tableWidth + chairPadding, y);
    }

    // Bottom chairs
    for (let i = 0; i < bottomSeats; i++) {
      const x =
        bottomSeats === 1
          ? tableWidth / 2
          : (tableWidth / (bottomSeats + 1)) * (i + 1);
      addChair(x, tableHeight + chairPadding);
    }

    return positions;
  };

  const renderChairs = () => {
    const chairs: React.JSX.Element[] = [];
    const scale = table.scale || 1;
    const tableWidth =
      table.shape === "round"
        ? 80
        : table.shape === "long-rectangular"
          ? 120
          : 100;
    const tableHeight = table.shape === "round" ? 80 : 60;
    const chairSize = 15; // Half of chair width/height for positioning
    const chairPadding = 25; // Distance from table edge to chair

    let chairPositions = [];

    if (table.shape === "round") {
      // Round table logic remains the same
      for (let i = 0; i < table.seats; i++) {
        const radius =
          (Math.min(tableWidth, tableHeight) / 2 + chairPadding) * scale;
        const angle = (i / table.seats) * 2 * Math.PI;
        const chairX = tableWidth / 2 + Math.cos(angle) * radius - chairSize;
        const chairY = tableHeight / 2 + Math.sin(angle) * radius - chairSize;

        chairPositions.push({
          seatNumber: i + 1,
          x: chairX,
          y: chairY,
        });
      }
    } else {
      // Use the new rectangular logic
      chairPositions = calculateRectangularChairPositions();
    }

    chairPositions.forEach(({ seatNumber, x, y }) => {
      const assignedGuest = table.seatAssignments?.[seatNumber];

      chairs.push(
        <div
          key={seatNumber}
          className={`absolute flex h-6 w-6 cursor-pointer items-center justify-center rounded text-xs transition-colors ${
            assignedGuest
              ? "border-green-300 bg-green-100"
              : "border-gray-300 bg-gray-100"
          } border hover:bg-blue-100`}
          style={{
            left: x,
            top: y,
          }}
          onClick={(e) => {
            e.stopPropagation();
            console.log(`Chair ${seatNumber} clicked for table ${table.name}`);
            onAssignSeat(seatNumber);
          }}
          title={
            assignedGuest
              ? `${assignedGuest.name} (Seat ${seatNumber})`
              : `Seat ${seatNumber}`
          }
        >
          🪑
        </div>,
      );

      if (assignedGuest) {
        chairs.push(
          <div
            key={`name-${seatNumber}`}
            className="pointer-events-none absolute rounded border bg-white px-1 text-xs shadow-sm"
            style={{
              left: x - 10,
              top: y - 20,
              fontSize: "10px",
            }}
          >
            {assignedGuest.name.split(" ")[0]}
          </div>,
        );
      }
    });

    return chairs;
  };

  const tableWidth =
    table.shape === "round"
      ? 80
      : table.shape === "long-rectangular"
        ? 120
        : 100;
  const tableHeight = table.shape === "round" ? 80 : 60;

  return (
    <div
      ref={tableRef}
      className={`absolute select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{
        left: table.x,
        top: table.y,
        transform: `rotate(${table.rotation || 0}deg) scale(${table.scale || 1})`,
        transformOrigin: "center center",
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Table */}
      <div
        className={`border-2 bg-white shadow-sm transition-all hover:shadow-md ${
          isSelected
            ? "border-blue-500 ring-2 ring-blue-200"
            : "border-gray-300"
        } ${table.shape === "round" ? "rounded-full" : "rounded-lg"}`}
        style={{
          width: tableWidth,
          height: tableHeight,
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
      </div>

      {/* Chairs around table */}
      {renderChairs()}

      {/* Resize handle */}
      {viewMode === "design" && isSelected && (
        <div
          className="resize-handle absolute h-3 w-3 cursor-se-resize rounded-full border border-white bg-blue-500"
          style={{
            right: -6,
            bottom: -6,
          }}
        />
      )}

      {/* Action buttons with icons */}
      {viewMode === "design" && isSelected && (
        <div className="absolute -top-8 left-0 z-10 flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onConfigure();
            }}
            className="flex h-6 w-6 items-center justify-center rounded bg-blue-500 text-white transition-colors hover:bg-blue-600"
            title="Configure"
          >
            <Settings className="h-3 w-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSwapSeats();
            }}
            className="flex h-6 w-6 items-center justify-center rounded bg-purple-500 text-white transition-colors hover:bg-purple-600"
            title="Swap Seats"
          >
            <ArrowLeftRight className="h-3 w-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="flex h-6 w-6 items-center justify-center rounded bg-red-500 text-white transition-colors hover:bg-red-600"
            title="Delete"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DraggableTable;
