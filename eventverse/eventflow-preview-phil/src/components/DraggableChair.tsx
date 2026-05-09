
import React, { useState, useRef } from 'react';
import { Settings, Trash2, Grid3X3 } from 'lucide-react';
import type { Chair as ChairType } from '@/types/venue';
import { GuestAvatar, getInitials, getAvatarColor } from '@/components/seating/GuestAvatar';

interface DraggableChairProps {
  chair: ChairType;
  isSelected: boolean;
  onUpdate: (updates: Partial<ChairType>) => void;
  onSelect: () => void;
  onDelete: () => void;
  onConfigure: () => void;
  onAssign: () => void;
  onDeleteGrid?: () => void;
  onUpdateGrid?: (gridId: string, updates: Partial<ChairType>) => void;
  gridChairs?: ChairType[];
  viewMode: "design" | "preview";
  isGridSelected?: boolean;
  onSelectGrid?: () => void;
}

const DraggableChair = ({
  chair,
  isSelected,
  onUpdate,
  onSelect,
  onDelete,
  onConfigure,
  onAssign,
  onDeleteGrid,
  onUpdateGrid,
  gridChairs = [],
  viewMode,
  isGridSelected = false,
  onSelectGrid
}: DraggableChairProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialPositions, setInitialPositions] = useState<{[id: number]: {x: number, y: number}}>({});

  const isPartOfGrid = chair.gridId && gridChairs.length > 1;
  const gridSize = gridChairs.length;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (viewMode !== "design") return;
    
    e.stopPropagation();
    
    // If this chair is part of a grid, select the entire grid
    if (isPartOfGrid && onSelectGrid) {
      onSelectGrid();
    } else {
      onSelect();
    }
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - chair.x,
      y: e.clientY - chair.y
    });

    // Store initial positions for all chairs that will be moved
    if (isPartOfGrid) {
      const positions: {[id: number]: {x: number, y: number}} = {};
      gridChairs.forEach(gridChair => {
        positions[gridChair.id] = { x: gridChair.x, y: gridChair.y };
      });
      setInitialPositions(positions);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      if (isPartOfGrid) {
        // Calculate the delta movement from this chair's original position
        const deltaX = newX - chair.x;
        const deltaY = newY - chair.y;
        
        // Update all chairs in the grid by applying the same delta
        gridChairs.forEach(gridChair => {
          const initialPos = initialPositions[gridChair.id];
          if (initialPos) {
            const newGridX = Math.max(0, initialPos.x + deltaX);
            const newGridY = Math.max(0, initialPos.y + deltaY);
            
            // Update each chair individually using the onUpdate function
            onUpdate({ 
              x: newGridX, 
              y: newGridY,
              gridId: chair.gridId // Ensure gridId is maintained
            });
          }
        });
      } else {
        // Individual chair movement
        onUpdate({ x: Math.max(0, newX), y: Math.max(0, newY) });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setInitialPositions({});
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart, initialPositions, isPartOfGrid, gridChairs]);

  return (
    <div
      className={`absolute select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        left: chair.x,
        top: chair.y,
        transform: `rotate(${chair.rotation || 0}deg)`,
        transformOrigin: 'center center'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Grid highlight background for all chairs in selected grid */}
      {isPartOfGrid && isGridSelected && (
        <div className="absolute inset-0 bg-blue-100 rounded-lg opacity-40 -z-10 transform scale-125" />
      )}
      
      {/* Grid connection lines - show when grid is selected */}
      {isPartOfGrid && isGridSelected && (
        <div className="absolute inset-0 border-2 border-blue-300 border-dashed rounded-lg opacity-60 -z-5 transform scale-110" />
      )}
      
      <div
        className={`w-10 h-10 border-2 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all ${
          isSelected || isGridSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
        } ${isPartOfGrid ? 'border-dashed' : ''}`}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-xs font-medium text-gray-800">🪑</div>
        </div>
      </div>
      
      {chair.guest && (
        <div 
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 pointer-events-none z-10"
          title={chair.guest.name}
        >
          <GuestAvatar
            name={chair.guest.name}
            initials={chair.guest.initials}
            avatarColor={getAvatarColor(chair.guest.id)}
            size="sm"
            showStatus={true}
            status="assigned"
          />
        </div>
      )}
      
      {/* Enhanced grid indicator */}
      {isPartOfGrid && (
        <div className="absolute -bottom-3 -right-3 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
          {gridSize}
        </div>
      )}
      
      {/* Grid size badge */}
      {isPartOfGrid && isGridSelected && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs bg-blue-500 text-white px-2 py-1 rounded whitespace-nowrap">
          Grid {gridSize} chairs
        </div>
      )}
      
      {viewMode === "design" && (isSelected || isGridSelected) && (
        <div className="absolute -top-8 left-0 flex gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onConfigure(); }}
            className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            title="Configure"
          >
            <Settings className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onAssign(); }}
            className="w-6 h-6 flex items-center justify-center bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            title="Assign Guest"
          >
            👤
          </button>
          {isPartOfGrid && onDeleteGrid && (
            <button
              onClick={(e) => { e.stopPropagation(); onDeleteGrid(); }}
              className="w-6 h-6 flex items-center justify-center bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
              title={`Delete Grid (${gridSize} chairs)`}
            >
              <Grid3X3 className="w-3 h-3" />
            </button>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            title={isPartOfGrid ? "Delete Single Chair" : "Delete"}
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DraggableChair;
