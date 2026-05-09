import { useState, useRef, useCallback, useEffect } from 'react';
import { Section, SectionType, Coordinates } from '@/types/website';

interface DragState {
  isDragging: boolean;
  draggedSection: Section | null;
  dragType: 'new-section' | 'reposition-section' | 'resize-section';
  startPosition: { x: number; y: number };
  currentPosition: { x: number; y: number };
  dragOffset: { x: number; y: number };
  originalSection?: Section;
}

interface DropZone {
  id: string;
  name: string;
  bounds: { x: number; y: number; width: number; height: number };
  isActive: boolean;
}

interface UnifiedDragOptions {
  canvasRef: React.RefObject<HTMLElement>;
  gridSize?: number;
  snapToGrid?: boolean;
  showGuides?: boolean;
  onSectionUpdate: (sectionId: string, updates: Partial<Section>) => void;
  onSectionCreate?: (sectionType: SectionType, position: Coordinates, content?: any) => void;
}

export const useUnifiedDrag = ({
  canvasRef,
  gridSize = 20,
  snapToGrid = true,
  showGuides = true,
  onSectionUpdate,
  onSectionCreate
}: UnifiedDragOptions) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedSection: null,
    dragType: 'new-section',
    startPosition: { x: 0, y: 0 },
    currentPosition: { x: 0, y: 0 },
    dragOffset: { x: 0, y: 0 }
  });

  const [dropZones, setDropZones] = useState<DropZone[]>([]);
  const dragStartTime = useRef<number>(0);

  // Convert screen coordinates to canvas coordinates
  const screenToCanvas = useCallback((screenX: number, screenY: number) => {
    if (!canvasRef.current) return { x: screenX, y: screenY };
    
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: screenX - rect.left,
      y: screenY - rect.top
    };
  }, [canvasRef]);

  // Snap coordinates to grid
  const snapToGridFn = useCallback((x: number, y: number) => {
    if (!snapToGrid) return { x, y };
    return {
      x: Math.round(x / gridSize) * gridSize,
      y: Math.round(y / gridSize) * gridSize
    };
  }, [snapToGrid, gridSize]);

  // Generate drop zones based on canvas size
  const generateDropZones = useCallback(() => {
    if (!canvasRef.current) return [];

    const rect = canvasRef.current.getBoundingClientRect();
    const zones: DropZone[] = [
      {
        id: 'top-left',
        name: 'Top Left',
        bounds: { x: 0, y: 0, width: 200, height: 150 },
        isActive: false
      },
      {
        id: 'top-right',
        name: 'Top Right',
        bounds: { x: rect.width - 200, y: 0, width: 200, height: 150 },
        isActive: false
      },
      {
        id: 'bottom-left',
        name: 'Bottom Left',
        bounds: { x: 0, y: rect.height - 150, width: 200, height: 150 },
        isActive: false
      },
      {
        id: 'bottom-right',
        name: 'Bottom Right',
        bounds: { x: rect.width - 200, y: rect.height - 150, width: 200, height: 150 },
        isActive: false
      },
      {
        id: 'center',
        name: 'Center',
        bounds: { 
          x: rect.width / 2 - 100, 
          y: rect.height / 2 - 75, 
          width: 200, 
          height: 150 
        },
        isActive: false
      }
    ];

    return zones;
  }, [canvasRef]);

  // Start dragging a new section from library
  const startNewSectionDrag = useCallback((
    sectionType: SectionType,
    startEvent: React.MouseEvent,
    defaultContent?: any
  ) => {
    const canvasCoords = screenToCanvas(startEvent.clientX, startEvent.clientY);
    const snappedCoords = snapToGridFn(canvasCoords.x, canvasCoords.y);

    const tempSection: Section = {
      id: `temp-${Date.now()}`,
      type: sectionType,
      content: defaultContent || { title: `New ${sectionType}`, description: 'Edit this content' },
      styling: {},
      order: 0,
      positioning: {
        type: 'absolute',
        coordinates: { x: snappedCoords.x, y: snappedCoords.y, width: 200, height: 100 },
        zIndex: 1000,
        responsive: {
          desktop: { x: snappedCoords.x, y: snappedCoords.y, width: 200, height: 100 },
          tablet: { x: snappedCoords.x, y: snappedCoords.y, width: 180, height: 90 },
          mobile: { x: snappedCoords.x, y: snappedCoords.y, width: 160, height: 80 }
        },
        isFloating: true
      }
    };

    setDragState({
      isDragging: true,
      draggedSection: tempSection,
      dragType: 'new-section',
      startPosition: canvasCoords,
      currentPosition: snappedCoords,
      dragOffset: { x: 100, y: 50 } // Center of default section size
    });

    setDropZones(generateDropZones());
    dragStartTime.current = Date.now();
  }, [screenToCanvas, snapToGridFn, generateDropZones]);

  // Start dragging an existing section
  const startSectionDrag = useCallback((
    section: Section,
    startEvent: React.MouseEvent,
    dragType: 'reposition-section' | 'resize-section' = 'reposition-section'
  ) => {
    const canvasCoords = screenToCanvas(startEvent.clientX, startEvent.clientY);
    const sectionCoords = section.positioning?.coordinates || { x: 0, y: 0, width: 200, height: 100 };

    setDragState({
      isDragging: true,
      draggedSection: section,
      dragType,
      startPosition: canvasCoords,
      currentPosition: { x: sectionCoords.x, y: sectionCoords.y },
      dragOffset: {
        x: canvasCoords.x - sectionCoords.x,
        y: canvasCoords.y - sectionCoords.y
      },
      originalSection: section
    });

    if (dragType === 'reposition-section') {
      setDropZones(generateDropZones());
    }

    dragStartTime.current = Date.now();
  }, [screenToCanvas, generateDropZones]);

  // Update drag position
  const updateDragPosition = useCallback((moveEvent: MouseEvent | React.MouseEvent) => {
    if (!dragState.isDragging) return;

    const canvasCoords = screenToCanvas(moveEvent.clientX, moveEvent.clientY);

    let newPosition: { x: number; y: number };

    if (dragState.dragType === 'resize-section') {
      // Handle resizing
      const deltaX = canvasCoords.x - dragState.startPosition.x;
      const deltaY = canvasCoords.y - dragState.startPosition.y;
      const originalCoords = dragState.originalSection?.positioning?.coordinates;
      
      if (originalCoords) {
        newPosition = {
          x: Math.max(0, originalCoords.width + deltaX),
          y: Math.max(0, originalCoords.height + deltaY)
        };
      } else {
        newPosition = { x: 200, y: 100 };
      }
    } else {
      // Handle repositioning
      const targetX = canvasCoords.x - dragState.dragOffset.x;
      const targetY = canvasCoords.y - dragState.dragOffset.y;
      newPosition = snapToGridFn(Math.max(0, targetX), Math.max(0, targetY));
    }

    // Update active drop zones
    const updatedZones = dropZones.map(zone => ({
      ...zone,
      isActive: canvasCoords.x >= zone.bounds.x &&
                canvasCoords.x <= zone.bounds.x + zone.bounds.width &&
                canvasCoords.y >= zone.bounds.y &&
                canvasCoords.y <= zone.bounds.y + zone.bounds.height
    }));

    setDropZones(updatedZones);
    setDragState(prev => ({
      ...prev,
      currentPosition: newPosition
    }));
  }, [dragState, screenToCanvas, snapToGridFn, dropZones]);

  // End drag operation
  const endDrag = useCallback(() => {
    if (!dragState.isDragging || !dragState.draggedSection) {
      setDragState({
        isDragging: false,
        draggedSection: null,
        dragType: 'new-section',
        startPosition: { x: 0, y: 0 },
        currentPosition: { x: 0, y: 0 },
        dragOffset: { x: 0, y: 0 }
      });
      setDropZones([]);
      return;
    }

    const dragDuration = Date.now() - dragStartTime.current;
    const activeZone = dropZones.find(zone => zone.isActive);

    // Determine final position
    let finalPosition = dragState.currentPosition;
    if (activeZone) {
      finalPosition = {
        x: activeZone.bounds.x + 20,
        y: activeZone.bounds.y + 20
      };
    }

    if (dragState.dragType === 'new-section') {
      // Create new section
      if (onSectionCreate && dragState.draggedSection.positioning) {
        const coordinates: Coordinates = {
          x: finalPosition.x,
          y: finalPosition.y,
          width: dragState.draggedSection.positioning.coordinates.width,
          height: dragState.draggedSection.positioning.coordinates.height
        };
        
        onSectionCreate(
          dragState.draggedSection.type,
          coordinates,
          dragState.draggedSection.content
        );
      }
    } else if (dragState.dragType === 'reposition-section') {
      // Update existing section position
      const updates: Partial<Section> = {
        positioning: {
          ...dragState.draggedSection.positioning!,
          coordinates: {
            ...dragState.draggedSection.positioning!.coordinates,
            x: finalPosition.x,
            y: finalPosition.y
          }
        }
      };
      onSectionUpdate(dragState.draggedSection.id, updates);
    } else if (dragState.dragType === 'resize-section') {
      // Update section size
      const updates: Partial<Section> = {
        positioning: {
          ...dragState.draggedSection.positioning!,
          coordinates: {
            ...dragState.draggedSection.positioning!.coordinates,
            width: finalPosition.x,
            height: finalPosition.y
          }
        }
      };
      onSectionUpdate(dragState.draggedSection.id, updates);
    }

    // Reset state
    setDragState({
      isDragging: false,
      draggedSection: null,
      dragType: 'new-section',
      startPosition: { x: 0, y: 0 },
      currentPosition: { x: 0, y: 0 },
      dragOffset: { x: 0, y: 0 }
    });
    setDropZones([]);
  }, [dragState, dropZones, onSectionUpdate, onSectionCreate]);

  // Global mouse event handlers
  useEffect(() => {
    if (!dragState.isDragging) return;

    const handleMouseMove = (e: MouseEvent) => updateDragPosition(e);
    const handleMouseUp = () => endDrag();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState.isDragging, updateDragPosition, endDrag]);

  return {
    dragState,
    dropZones,
    startNewSectionDrag,
    startSectionDrag,
    updateDragPosition,
    endDrag,
    screenToCanvas,
    snapToGrid: snapToGridFn,
    showGuides,
    gridSize
  };
};