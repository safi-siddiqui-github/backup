
import React from 'react';

interface ResizeHandleProps {
  direction: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
  onMouseDown: (e: React.MouseEvent, direction: string) => void;
  isVisible: boolean;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ direction, onMouseDown, isVisible }) => {
  if (!isVisible) return null;

  const getPositionStyles = () => {
    const baseStyles = "absolute w-2 h-2 bg-blue-500 border border-white rounded-sm hover:bg-blue-600 cursor-";
    
    switch (direction) {
      case 'n':
        return `${baseStyles}n-resize -top-1 left-1/2 transform -translate-x-1/2`;
      case 's':
        return `${baseStyles}s-resize -bottom-1 left-1/2 transform -translate-x-1/2`;
      case 'e':
        return `${baseStyles}e-resize -right-1 top-1/2 transform -translate-y-1/2`;
      case 'w':
        return `${baseStyles}w-resize -left-1 top-1/2 transform -translate-y-1/2`;
      case 'ne':
        return `${baseStyles}ne-resize -top-1 -right-1`;
      case 'nw':
        return `${baseStyles}nw-resize -top-1 -left-1`;
      case 'se':
        return `${baseStyles}se-resize -bottom-1 -right-1`;
      case 'sw':
        return `${baseStyles}sw-resize -bottom-1 -left-1`;
      default:
        return baseStyles;
    }
  };

  return (
    <div
      className={getPositionStyles()}
      onMouseDown={(e) => {
        e.stopPropagation();
        onMouseDown(e, direction);
      }}
    />
  );
};

export default ResizeHandle;
