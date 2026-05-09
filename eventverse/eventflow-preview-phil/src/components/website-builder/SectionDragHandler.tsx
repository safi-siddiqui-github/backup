import { useState, useCallback } from 'react';

interface DragState {
  draggedIndex: number | null;
  dragOverIndex: number | null;
  isDragging: boolean;
}

export const useSectionDragHandler = (onReorder: (startIndex: number, endIndex: number) => void) => {
  const [dragState, setDragState] = useState<DragState>({
    draggedIndex: null,
    dragOverIndex: null,
    isDragging: false
  });

  const handleDragStart = useCallback((index: number, e: React.DragEvent) => {
    setDragState({
      draggedIndex: index,
      dragOverIndex: null,
      isDragging: true
    });
    
    // Add visual feedback to cursor
    document.body.style.cursor = 'grabbing';
  }, []);

  const handleDragOver = useCallback((index: number) => {
    setDragState(prev => {
      if (prev.draggedIndex === null) return prev;
      
      return {
        ...prev,
        dragOverIndex: index
      };
    });
  }, []);

  const handleDrop = useCallback((dropIndex: number) => {
    setDragState(prev => {
      if (prev.draggedIndex === null) {
        document.body.style.cursor = '';
        return {
          draggedIndex: null,
          dragOverIndex: null,
          isDragging: false
        };
      }
      
      // Don't reorder if dropping on the same position
      if (prev.draggedIndex === dropIndex) {
        document.body.style.cursor = '';
        return {
          draggedIndex: null,
          dragOverIndex: null,
          isDragging: false
        };
      }
      
      // Perform the reorder
      onReorder(prev.draggedIndex, dropIndex);
      
      // Reset drag state
      document.body.style.cursor = '';
      return {
        draggedIndex: null,
        dragOverIndex: null,
        isDragging: false
      };
    });
  }, [onReorder]);

  const resetDragState = useCallback(() => {
    setDragState({
      draggedIndex: null,
      dragOverIndex: null,
      isDragging: false
    });
    document.body.style.cursor = '';
  }, []);

  return {
    dragState,
    handleDragStart,
    handleDragOver,
    handleDrop,
    resetDragState
  };
};