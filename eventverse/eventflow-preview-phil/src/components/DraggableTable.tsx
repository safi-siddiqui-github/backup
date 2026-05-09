import React, { useState, useRef } from 'react';
import { Settings, ArrowLeftRight, Trash2 } from 'lucide-react';
import type { Table as TableType } from '@/types/venue';
import { GuestAvatar, getInitials, getAvatarColor } from '@/components/seating/GuestAvatar';

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
  draggedGuest?: Partial<{ id: number; name: string; initials: string; avatarColor: string; }> | null;
  onDropGuestToSeat?: (seatNumber: number) => void;
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
  draggedGuest,
  onDropGuestToSeat
}: DraggableTableProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const tableRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (viewMode !== "design") return;
    
    e.stopPropagation();
    onSelect();
    
    if ((e.target as HTMLElement).classList.contains('resize-handle')) {
      setIsResizing(true);
    } else {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - table.x,
        y: e.clientY - table.y
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
        const newScale = Math.max(0.5, Math.min(2, (e.clientX - rect.left) / 100));
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
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart]);

  const getGroupBadgeColor = (group: string): string => {
    const colors: Record<string, string> = {
      "VIP": "bg-purple-100 text-purple-800",
      "Family": "bg-pink-100 text-pink-800",
      "Friends": "bg-blue-100 text-blue-800",
      "Colleagues": "bg-indigo-100 text-indigo-800",
      "Plus Ones": "bg-orange-100 text-orange-800",
    };
    return colors[group] || "bg-gray-100 text-gray-600";
  };

  // Calculate chair positions for rectangular tables following the exact pattern
  const calculateRectangularChairPositions = () => {
    const totalSeats = table.seats;
    const scale = table.scale || 1;
    const tableWidth = (table.shape === 'long-rectangular' ? 120 : 100) * scale;
    const tableHeight = 60 * scale;
    const chairPadding = 25 * scale; // Scale the padding
    const chairSize = 15; // Chair radius for positioning
    
    // Always 1 left, 1 right. Top and bottom grow.
    let leftSeats = totalSeats >= 2 ? 1 : 0;
    let rightSeats = totalSeats >= 2 ? 1 : 0;
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
    
    console.log(`Table ${table.name}: ${totalSeats} seats -> L:${leftSeats} T:${topSeats} R:${rightSeats} B:${bottomSeats}`);
    
    const positions = [];
    let seatIndex = 0;
    
    // Helper function to add chair position
    const addChair = (x: number, y: number) => {
      positions.push({
        seatNumber: seatIndex + 1,
        x: x - chairSize,
        y: y - chairSize
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
      const x = topSeats === 1 
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
      const x = bottomSeats === 1 
        ? tableWidth / 2 
        : (tableWidth / (bottomSeats + 1)) * (i + 1);
      addChair(x, tableHeight + chairPadding);
    }
    
    return positions;
  };

  const renderChairs = () => {
    const chairs = [];
    const scale = table.scale || 1;
    const tableWidth = table.shape === 'round' ? 80 : table.shape === 'long-rectangular' ? 120 : 100;
    const tableHeight = table.shape === 'round' ? 80 : 60;
    const chairSize = 15; // Half of chair width/height for positioning
    const chairPadding = 25; // Distance from table edge to chair

    let chairPositions = [];

    if (table.shape === 'round') {
      // Round table logic remains the same
      for (let i = 0; i < table.seats; i++) {
        const radius = (Math.min(tableWidth, tableHeight) / 2 + chairPadding) * scale;
        const angle = (i / table.seats) * 2 * Math.PI;
        const chairX = (tableWidth / 2) + Math.cos(angle) * radius - chairSize;
        const chairY = (tableHeight / 2) + Math.sin(angle) * radius - chairSize;
        
        chairPositions.push({
          seatNumber: i + 1,
          x: chairX,
          y: chairY
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
          className={`absolute w-6 h-6 flex items-center justify-center text-xs cursor-pointer rounded transition-colors ${
            assignedGuest ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'
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
          onDragOver={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (draggedGuest && !assignedGuest) {
              e.currentTarget.classList.add('ring-2', 'ring-green-400');
            } else if (draggedGuest && assignedGuest) {
              e.currentTarget.classList.add('ring-2', 'ring-red-400');
            }
          }}
          onDragLeave={(e) => {
            e.currentTarget.classList.remove('ring-2', 'ring-green-400', 'ring-red-400');
          }}
          onDrop={(e) => {
            e.stopPropagation();
            e.preventDefault();
            e.currentTarget.classList.remove('ring-2', 'ring-green-400', 'ring-red-400');
            console.log('💺 Drop on seat:', seatNumber, 'draggedGuest:', draggedGuest, 'assignedGuest:', assignedGuest);
            if (draggedGuest && !assignedGuest && onDropGuestToSeat) {
              console.log('✅ Calling onDropGuestToSeat');
              onDropGuestToSeat(seatNumber);
            } else {
              console.log('❌ Drop prevented:', {
                hasDraggedGuest: !!draggedGuest,
                seatOccupied: !!assignedGuest,
                hasHandler: !!onDropGuestToSeat
              });
            }
          }}
          title={assignedGuest ? `${assignedGuest.name} (Seat ${seatNumber})` : `Seat ${seatNumber}`}
        >
          🪑
        </div>
      );

      if (assignedGuest) {
        chairs.push(
          <div
            key={`avatar-${seatNumber}`}
            className="absolute pointer-events-none z-10"
            style={{
              left: x - 4,
              top: y - 32,
            }}
            title={`${assignedGuest.name} - Seat ${seatNumber}`}
          >
            <GuestAvatar
              name={assignedGuest.name}
              initials={assignedGuest.initials}
              avatarColor={getAvatarColor(assignedGuest.id)}
              size="sm"
              showStatus={true}
              status="assigned"
            />
          </div>
        );
      }
    });

    return chairs;
  };

  const tableWidth = table.shape === 'round' ? 80 : table.shape === 'long-rectangular' ? 120 : 100;
  const tableHeight = table.shape === 'round' ? 80 : 60;

  return (
    <div
      ref={tableRef}
      className={`absolute select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        left: table.x,
        top: table.y,
        transform: `rotate(${table.rotation || 0}deg) scale(${table.scale || 1})`,
        transformOrigin: 'center center'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Table */}
      <div
        className={`border-2 bg-white shadow-sm hover:shadow-md transition-all ${
          isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
        } ${table.shape === 'round' ? 'rounded-full' : 'rounded-lg'}`}
        style={{
          width: tableWidth,
          height: tableHeight,
        }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center p-2">
          <div className="text-xs font-medium text-gray-800 truncate">{table.name}</div>
          <div className="text-xs text-gray-500">{table.seats} seats</div>
          {table.targetGroup && (
            <div className={`text-xs px-1.5 py-0.5 rounded mt-0.5 ${getGroupBadgeColor(table.targetGroup)}`}>
              {table.targetGroup}
            </div>
          )}
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
          className="resize-handle absolute w-3 h-3 bg-blue-500 border border-white rounded-full cursor-se-resize"
          style={{
            right: -6,
            bottom: -6
          }}
        />
      )}

      {/* Action buttons with icons */}
      {viewMode === "design" && isSelected && (
        <div className="absolute -top-8 left-0 flex gap-1 z-10">
          <button
            onClick={(e) => { e.stopPropagation(); onConfigure(); }}
            className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            title="Configure"
          >
            <Settings className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onSwapSeats(); }}
            className="w-6 h-6 flex items-center justify-center bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            title="Swap Seats"
          >
            <ArrowLeftRight className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DraggableTable;
