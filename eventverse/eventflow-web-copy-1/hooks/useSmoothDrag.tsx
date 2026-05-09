
import { useCallback, useRef, useState } from 'react';

interface DragState {
  isDragging: boolean;
  dragOffset: { x: number; y: number };
  startPosition: { x: number; y: number };
}

interface UseSmoothDragProps {
  onDragStart?: (item: any, position: { x: number; y: number }) => void;
  onDragMove?: (item: any, position: { x: number; y: number }) => void;
  onDragEnd?: (item: any) => void;
  throttleMs?: number;
}

export const useSmoothDrag = ({
  onDragStart,
  onDragMove,
  onDragEnd,
  throttleMs = 16 // ~60fps
}: UseSmoothDragProps) => {
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
    startPosition: { x: 0, y: 0 }
  });
  
  const lastMoveTime = useRef(0);
  const animationFrame = useRef<number>();

  const handleMouseDown = useCallback((e: React.MouseEvent, item: any, containerRef: React.RefObject<HTMLElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const offset = {
      x: x - item.x,
      y: y - item.y
    };
    
    setDraggedItem(item);
    setDragState({
      isDragging: true,
      dragOffset: offset,
      startPosition: { x: item.x, y: item.y }
    });
    
    onDragStart?.(item, { x, y });
  }, [onDragStart]);

  const handleMouseMove = useCallback((e: React.MouseEvent, containerRef: React.RefObject<HTMLElement>) => {
    if (!draggedItem || !dragState.isDragging) return;
    
    const now = performance.now();
    if (now - lastMoveTime.current < throttleMs) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    
    animationFrame.current = requestAnimationFrame(() => {
      const x = e.clientX - rect.left - dragState.dragOffset.x;
      const y = e.clientY - rect.top - dragState.dragOffset.y;
      
      onDragMove?.(draggedItem, { x, y });
      lastMoveTime.current = now;
    });
  }, [draggedItem, dragState, onDragMove, throttleMs]);

  const handleMouseUp = useCallback(() => {
    if (draggedItem) {
      onDragEnd?.(draggedItem);
    }
    
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    
    setDraggedItem(null);
    setDragState({
      isDragging: false,
      dragOffset: { x: 0, y: 0 },
      startPosition: { x: 0, y: 0 }
    });
  }, [draggedItem, onDragEnd]);

  return {
    draggedItem,
    isDragging: dragState.isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  };
};
