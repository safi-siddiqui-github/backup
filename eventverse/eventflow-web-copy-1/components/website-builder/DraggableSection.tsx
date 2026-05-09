"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/types/website";
import { Edit, GripVertical, Trash2 } from "lucide-react";
import React, { RefObject, useCallback, useRef, useState } from "react";
import { SectionRenderer } from "./SectionRenderer";
import { SectionResizeHandles } from "./SectionResizeHandles";

interface DraggableSectionProps {
  section: Section;
  index: number;
  isSelected: boolean;
  isPreviewMode: boolean;
  containerRef: RefObject<HTMLElement>;
  onSelect: (sectionId: string, position?: { x: number; y: number }) => void;
  onDragStart: (index: number, e: React.DragEvent) => void;
  onDragOver: (index: number) => void;
  onDrop: (index: number) => void;
  onResize: (sectionId: string, updates: Partial<Section>) => void;
  onDelete: (sectionId: string) => void;
  isDragOver: boolean;
  draggedIndex: number | null;
}

export const DraggableSection = ({
  section,
  index,
  isSelected,
  isPreviewMode,
  containerRef,
  onSelect,
  onDragStart,
  onDragOver,
  onDrop,
  onResize,
  onDelete,
  isDragOver,
  draggedIndex,
}: DraggableSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      if (isPreviewMode || isResizing) return;

      e.stopPropagation();

      // Set drag data
      e.dataTransfer.setData("text/plain", section.id);
      e.dataTransfer.setData("application/x-section-index", index.toString());
      e.dataTransfer.effectAllowed = "move";

      // Simple drag image without complex transformations
      const dragImage = document.createElement("div");
      dragImage.textContent = `Moving section ${index + 1}`;
      dragImage.style.cssText = `
      position: absolute;
      top: -1000px;
      left: -1000px;
      background: var(--primary);
      color: var(--primary-foreground);
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      white-space: nowrap;
    `;
      document.body.appendChild(dragImage);
      e.dataTransfer.setDragImage(dragImage, 0, 0);

      // Cleanup drag image
      setTimeout(() => {
        if (document.body.contains(dragImage)) {
          document.body.removeChild(dragImage);
        }
      }, 0);

      setIsDragging(true);
      document.body.style.cursor = "grabbing";
      onDragStart(index, e);
    },
    [isPreviewMode, isResizing, section.id, index, onDragStart],
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    document.body.style.cursor = "";

    // Reset draggable to prevent accidental drags
    if (sectionRef.current) {
      sectionRef.current.draggable = false;
    }
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isPreviewMode) return;

      // Don't interfere with resize handles or action buttons
      const target = e.target as HTMLElement;
      if (
        target.closest(".resize-handle") ||
        target.closest(".action-button")
      ) {
        e.stopPropagation();
        return;
      }

      // Enable dragging for the section
      if (sectionRef.current) {
        sectionRef.current.draggable = true;
      }
    },
    [isPreviewMode],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = "move";
      onDragOver(index);
    },
    [index, onDragOver],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const draggedSectionId = e.dataTransfer.getData("text/plain");
      const draggedIndex = parseInt(
        e.dataTransfer.getData("application/x-section-index"),
      );

      // Only drop if it's a valid section and not dropping on itself
      if (
        draggedSectionId &&
        section.id !== draggedSectionId &&
        !isNaN(draggedIndex)
      ) {
        onDrop(index);
      }
    },
    [index, onDrop, section.id],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (isPreviewMode || isDragging || isResizing) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate optimal position for floating editor
      let x = rect.right + 20;
      let y = rect.top;

      // Adjust if editor would go off-screen
      if (x + 400 > viewportWidth) {
        x = Math.max(20, rect.left - 420);
      }

      if (y + 600 > viewportHeight) {
        y = Math.max(20, viewportHeight - 620);
      }

      onSelect(section.id, { x, y });
    },
    [isPreviewMode, isDragging, isResizing, section.id, onSelect],
  );

  return (
    <div
      ref={sectionRef}
      data-section-id={section.id}
      draggable={false}
      className={`group relative min-h-[60px] transition-all duration-200 ${!isPreviewMode ? "hover:ring-primary/50 hover:shadow-md hover:ring-2" : ""} ${isSelected ? "ring-primary shadow-lg ring-2" : ""} ${isDragOver && draggedIndex !== index ? "ring-dashed bg-blue-50/50 ring-2 ring-blue-500" : ""} ${isDragging ? "scale-95 opacity-50 shadow-2xl" : ""} ${isResizing ? "pointer-events-none" : ""} `}
      style={{
        position:
          section.positioning?.type === "absolute" ? "absolute" : "relative",
        left:
          section.positioning?.type === "absolute"
            ? section.positioning.coordinates.x
            : undefined,
        top:
          section.positioning?.type === "absolute"
            ? section.positioning.coordinates.y
            : undefined,
        width: section.styling?.width || "auto",
        height: section.styling?.height || "auto",
        minHeight: section.styling?.minHeight || "60px",
        zIndex: section.positioning?.zIndex || "auto",
      }}
      onMouseDown={handleMouseDown}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {/* Drop Zone Indicator - Above */}
      {isDragOver && draggedIndex !== index && draggedIndex !== null && (
        <div className="absolute -top-2 right-0 left-0 z-20 h-1 animate-pulse rounded-full bg-blue-500 shadow-lg">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded bg-blue-500 px-2 py-1 text-xs whitespace-nowrap text-white">
            Drop here
          </div>
        </div>
      )}

      {/* Drop Zone Indicator - Below */}
      {isDragOver && draggedIndex !== index && draggedIndex !== null && (
        <div className="absolute right-0 -bottom-2 left-0 z-20 h-1 animate-pulse rounded-full bg-blue-500 shadow-lg" />
      )}

      {/* Drag Handle & Action Buttons */}
      {!isPreviewMode && (
        <div className="absolute top-2 left-2 z-10 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            size="sm"
            variant="secondary"
            className="action-button drag-handle h-6 cursor-move px-2"
            onMouseDown={(e) => {
              e.stopPropagation();
              if (sectionRef.current) {
                sectionRef.current.draggable = true;
              }
            }}
            onMouseUp={() => {
              if (sectionRef.current) {
                sectionRef.current.draggable = false;
              }
            }}
            draggable={false}
          >
            <GripVertical className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Action Buttons - Top Right */}
      {!isPreviewMode && (
        <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            size="sm"
            variant="secondary"
            className="action-button h-6 px-2 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              const rect = e.currentTarget
                .closest("[data-section-id]")
                ?.getBoundingClientRect();
              if (rect) {
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                let x = rect.right + 20;
                let y = rect.top;

                if (x + 400 > viewportWidth) {
                  x = Math.max(20, rect.left - 420);
                }

                if (y + 600 > viewportHeight) {
                  y = Math.max(20, viewportHeight - 620);
                }

                onSelect(section.id, { x, y });
              }
            }}
          >
            <Edit className="mr-1 h-3 w-3" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="action-button h-6 px-2 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(section.id);
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Section Content */}
      <div className={`relative ${isDragging ? "pointer-events-none" : ""}`}>
        <SectionRenderer section={section} />
      </div>

      {/* Resize Handles */}
      {!isPreviewMode && isSelected && (
        <SectionResizeHandles
          section={section}
          containerRef={containerRef}
          onResize={onResize}
          onResizeStart={() => setIsResizing(true)}
          onResizeEnd={() => setIsResizing(false)}
        />
      )}
    </div>
  );
};
