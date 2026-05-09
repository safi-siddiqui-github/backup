
import React, { useState } from 'react';
import { Settings, Trash2 } from 'lucide-react';
import type { VenueObject } from '@/types/venue';

interface DraggableVenueObjectProps {
  venueObject: VenueObject;
  isSelected: boolean;
  onUpdate: (updates: Partial<VenueObject>) => void;
  onSelect: () => void;
  onDelete: () => void;
  onConfigure: () => void;
  viewMode: "design" | "preview";
}

const DraggableVenueObject = ({
  venueObject,
  isSelected,
  onUpdate,
  onSelect,
  onDelete,
  onConfigure,
  viewMode
}: DraggableVenueObjectProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (viewMode !== "design") return;
    
    e.stopPropagation();
    onSelect();
    
    if ((e.target as HTMLElement).classList.contains('resize-handle')) {
      setIsResizing(true);
    } else {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - venueObject.x,
        y: e.clientY - venueObject.y
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      onUpdate({ x: Math.max(0, newX), y: Math.max(0, newY) });
    } else if (isResizing) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      onUpdate({ 
        width: Math.max(50, venueObject.width + deltaX),
        height: Math.max(30, venueObject.height + deltaY)
      });
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

  const getIcon = () => {
    switch (venueObject.type) {
      case 'stage': return '🎭';
      case 'podium': return '🎤';
      case 'exit': return '🚪';
      case 'dancefloor': return '💃';
      case 'tent': return '⛺';
      case 'booth': return '🏪';
      default: return '📦';
    }
  };

  const isTentOrBooth = venueObject.type === 'tent' || venueObject.type === 'booth';
  const hasVendorAssigned = venueObject.assignedVendor;

  return (
    <div
      className={`absolute select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        left: venueObject.x,
        top: venueObject.y,
        width: venueObject.width,
        height: venueObject.height,
        transform: `rotate(${venueObject.rotation || 0}deg)`,
        transformOrigin: 'center center'
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className={`w-full h-full border-2 rounded-lg shadow-sm hover:shadow-md transition-all ${
          isSelected ? 'border-blue-500 ring-2 ring-blue-200' : isTentOrBooth && !hasVendorAssigned ? 'border-dashed border-orange-300' : 'border-gray-300'
        } ${isTentOrBooth && !hasVendorAssigned ? 'bg-orange-50' : ''}`}
        style={{
          backgroundColor: isTentOrBooth && !hasVendorAssigned ? undefined : (venueObject.color || '#8B5CF6'),
        }}
      >
        <div className={`w-full h-full flex flex-col items-center justify-center p-2 ${isTentOrBooth && !hasVendorAssigned ? 'text-gray-600' : 'text-white'}`}>
          <div className="text-2xl">{getIcon()}</div>
          <div className="text-xs font-medium text-center">{venueObject.name}</div>
          
          {/* Vendor assignment indicator */}
          {isTentOrBooth && hasVendorAssigned && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] px-1 py-0.5 text-center truncate">
              {venueObject.assignedVendor.vendorBusinessName}
            </div>
          )}
          
          {isTentOrBooth && !hasVendorAssigned && (
            <div className="absolute bottom-0 left-0 right-0 bg-gray-200 text-gray-600 text-[10px] px-1 py-0.5 text-center">
              Unassigned
            </div>
          )}
        </div>
      </div>

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
      
      {viewMode === "design" && isSelected && (
        <div className="absolute -top-8 left-0 flex gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onConfigure(); }}
            className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            title="Configure"
          >
            <Settings className="w-3 h-3" />
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

export default DraggableVenueObject;
