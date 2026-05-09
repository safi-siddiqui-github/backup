
import { useState, useRef } from 'react';

interface DragState {
  isDragging: boolean;
  draggedItem: any;
  dragType: 'new-field' | 'reorder-field';
  insertIndex: number;
}

export const useFormBuilderDrag = () => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedItem: null,
    dragType: 'new-field',
    insertIndex: -1
  });

  const dragImageRef = useRef<HTMLElement | null>(null);

  const startDrag = (item: any, type: 'new-field' | 'reorder-field') => {
    setDragState({
      isDragging: true,
      draggedItem: item,
      dragType: type,
      insertIndex: -1
    });
  };

  const updateInsertIndex = (index: number) => {
    setDragState(prev => ({
      ...prev,
      insertIndex: index
    }));
  };

  const endDrag = () => {
    setDragState({
      isDragging: false,
      draggedItem: null,
      dragType: 'new-field',
      insertIndex: -1
    });
  };

  const createDragImage = (element: HTMLElement, text: string) => {
    const dragImage = document.createElement('div');
    dragImage.className = 'bg-white border-2 border-blue-500 rounded-lg p-3 shadow-lg opacity-90';
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    dragImage.style.left = '-1000px';
    dragImage.style.zIndex = '9999';
    dragImage.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 bg-blue-500 rounded"></div>
        <span class="text-sm font-medium">${text}</span>
      </div>
    `;
    document.body.appendChild(dragImage);
    
    setTimeout(() => {
      if (document.body.contains(dragImage)) {
        document.body.removeChild(dragImage);
      }
    }, 100);
    
    return dragImage;
  };

  return {
    dragState,
    startDrag,
    updateInsertIndex,
    endDrag,
    createDragImage
  };
};
