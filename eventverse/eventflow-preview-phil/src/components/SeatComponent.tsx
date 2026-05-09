
import React from 'react';
import type { Seat } from '@/types/venue';
import { GuestAvatar, getInitials, getAvatarColor } from '@/components/seating/GuestAvatar';

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
  viewMode
}: SeatComponentProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  const getStatusColor = () => {
    switch (seat.status) {
      case 'assigned': return 'bg-green-500';
      case 'reserved': return 'bg-yellow-500';
      case 'blocked': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`absolute cursor-pointer border-2 rounded-lg shadow-sm hover:shadow-md transition-all ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
      } ${getStatusColor()}`}
      style={{
        left: seat.x,
        top: seat.y,
        width: 30,
        height: 30
      }}
    >
      <div className="w-full h-full flex items-center justify-center text-xs font-medium text-white">
        {seat.seatNumber}
      </div>
      
      {seat.guest && (
        <div 
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 pointer-events-none z-10"
          title={seat.guest.name}
        >
          <GuestAvatar
            name={seat.guest.name}
            initials={seat.guest.initials}
            avatarColor={getAvatarColor(seat.guest.id)}
            size="sm"
            showStatus={true}
            status="assigned"
          />
        </div>
      )}
      
      {viewMode === "design" && isSelected && (
        <div className="absolute -top-8 left-0">
          <button
            onClick={(e) => { e.stopPropagation(); onAssign(); }}
            className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
          >
            Assign
          </button>
        </div>
      )}
    </div>
  );
};

export default SeatComponent;
