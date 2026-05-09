
import { useCallback, useState } from 'react';

interface ResizeState {
  isResizing: boolean;
  direction: string;
  startSize: { width: number; height: number };
  startPosition: { x: number; y: number };
  startMouse: { x: number; y: number };
}

interface UseResizeProps {
  onResize?: (item: any, newSize: { width: number; height: number }, newPosition?: { x: number; y: number }) => void;
  onResizeEnd?: (item: any) => void;
  minSize?: { width: number; height: number };
  maxSize?: { width: number; height: number };
  maintainAspectRatio?: boolean;
}

export const useResize = ({
  onResize,
  onResizeEnd,
  minSize = { width: 50, height: 50 },
  maxSize = { width: 500, height: 500 },
  maintainAspectRatio = false
}: UseResizeProps) => {
  const [resizedItem, setResizedItem] = useState<any>(null);
  const [resizeState, setResizeState] = useState<ResizeState>({
    isResizing: false,
    direction: '',
    startSize: { width: 0, height: 0 },
    startPosition: { x: 0, y: 0 },
    startMouse: { x: 0, y: 0 }
  });

  const handleResizeStart = useCallback((e: React.MouseEvent, item: any, direction: string) => {
    e.stopPropagation();
    
    const currentSize = {
      width: item.width || 120,
      height: item.height || 80
    };
    
    setResizedItem(item);
    setResizeState({
      isResizing: true,
      direction,
      startSize: currentSize,
      startPosition: { x: item.x, y: item.y },
      startMouse: { x: e.clientX, y: e.clientY }
    });
  }, []);

  const handleResizeMove = useCallback((e: React.MouseEvent) => {
    if (!resizedItem || !resizeState.isResizing) return;

    const deltaX = e.clientX - resizeState.startMouse.x;
    const deltaY = e.clientY - resizeState.startMouse.y;
    
    let newWidth = resizeState.startSize.width;
    let newHeight = resizeState.startSize.height;
    let newX = resizeState.startPosition.x;
    let newY = resizeState.startPosition.y;

    const { direction } = resizeState;

    // Calculate new dimensions based on resize direction
    if (direction.includes('e')) {
      newWidth = Math.max(minSize.width, Math.min(maxSize.width, resizeState.startSize.width + deltaX));
    }
    if (direction.includes('w')) {
      newWidth = Math.max(minSize.width, Math.min(maxSize.width, resizeState.startSize.width - deltaX));
      newX = resizeState.startPosition.x + deltaX;
    }
    if (direction.includes('s')) {
      newHeight = Math.max(minSize.height, Math.min(maxSize.height, resizeState.startSize.height + deltaY));
    }
    if (direction.includes('n')) {
      newHeight = Math.max(minSize.height, Math.min(maxSize.height, resizeState.startSize.height - deltaY));
      newY = resizeState.startPosition.y + deltaY;
    }

    // Maintain aspect ratio if required
    if (maintainAspectRatio) {
      const aspectRatio = resizeState.startSize.width / resizeState.startSize.height;
      if (direction.includes('e') || direction.includes('w')) {
        newHeight = newWidth / aspectRatio;
      } else {
        newWidth = newHeight * aspectRatio;
      }
    }

    onResize?.(resizedItem, { width: newWidth, height: newHeight }, { x: newX, y: newY });
  }, [resizedItem, resizeState, onResize, minSize, maxSize, maintainAspectRatio]);

  const handleResizeEnd = useCallback(() => {
    if (resizedItem) {
      onResizeEnd?.(resizedItem);
    }
    
    setResizedItem(null);
    setResizeState({
      isResizing: false,
      direction: '',
      startSize: { width: 0, height: 0 },
      startPosition: { x: 0, y: 0 },
      startMouse: { x: 0, y: 0 }
    });
  }, [resizedItem, onResizeEnd]);

  return {
    resizedItem,
    isResizing: resizeState.isResizing,
    handleResizeStart,
    handleResizeMove,
    handleResizeEnd
  };
};
