"use client";

import { useContainerBounds } from "@/hooks/useContainerBounds";
import { Section } from "@/types/website";
import React, { RefObject, useCallback, useRef, useState } from "react";

interface SectionResizeHandlesProps {
  section: Section;
  containerRef: RefObject<HTMLElement>;
  onResize: (sectionId: string, updates: Partial<Section>) => void;
  onResizeStart: () => void;
  onResizeEnd: () => void;
}

type ResizeDirection = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w";

export const SectionResizeHandles = ({
  section,
  containerRef,
  onResize,
  onResizeStart,
  onResizeEnd,
}: SectionResizeHandlesProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] =
    useState<ResizeDirection | null>(null);
  const initialMousePos = useRef({ x: 0, y: 0 });
  const initialSize = useRef({ width: 0, height: 0 });
  const initialPosition = useRef({ x: 0, y: 0 });

  const { constrainToBounds } = useContainerBounds(containerRef);

  const handleMouseDown = useCallback(
    (direction: ResizeDirection, e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      setIsResizing(true);
      setResizeDirection(direction);
      onResizeStart();

      initialMousePos.current = { x: e.clientX, y: e.clientY };

      // Get current section dimensions and position
      const sectionElement = e.currentTarget.closest(
        "[data-section-id]",
      ) as HTMLElement;
      if (!sectionElement) return;

      const sectionRect = sectionElement.getBoundingClientRect();

      // Use actual rendered dimensions
      initialSize.current = {
        width: sectionRect.width,
        height: sectionRect.height,
      };

      // For absolute positioned elements, get position relative to container
      if (section.positioning?.type === "absolute" && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        initialPosition.current = {
          x:
            sectionRect.left -
            containerRect.left +
            containerRef.current.scrollLeft,
          y:
            sectionRect.top -
            containerRect.top +
            containerRef.current.scrollTop,
        };
      } else {
        initialPosition.current = { x: 0, y: 0 };
      }

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const currentDirection = resizeDirection;
        if (!currentDirection) return;

        const deltaX = moveEvent.clientX - initialMousePos.current.x;
        const deltaY = moveEvent.clientY - initialMousePos.current.y;

        let newWidth = initialSize.current.width;
        let newHeight = initialSize.current.height;
        let newX = initialPosition.current.x;
        let newY = initialPosition.current.y;

        // Handle width changes
        if (currentDirection.includes("e")) {
          newWidth = Math.max(100, initialSize.current.width + deltaX);
        } else if (currentDirection.includes("w")) {
          newWidth = Math.max(100, initialSize.current.width - deltaX);
          if (section.positioning?.type === "absolute") {
            newX = initialPosition.current.x + deltaX;
          }
        }

        // Handle height changes
        if (currentDirection.includes("s")) {
          newHeight = Math.max(60, initialSize.current.height + deltaY);
        } else if (currentDirection.includes("n")) {
          newHeight = Math.max(60, initialSize.current.height - deltaY);
          if (section.positioning?.type === "absolute") {
            newY = initialPosition.current.y + deltaY;
          }
        }

        // Apply constraints if available
        let finalWidth = newWidth;
        let finalHeight = newHeight;
        let finalX = newX;
        let finalY = newY;

        if (constrainToBounds && section.positioning?.type === "absolute") {
          const constrained = constrainToBounds(
            newX,
            newY,
            newWidth,
            newHeight,
          );
          finalWidth = constrained.width;
          finalHeight = constrained.height;
          finalX = constrained.x;
          finalY = constrained.y;
        }

        // Update section styling
        const updates: Partial<typeof section> = {
          styling: {
            ...section.styling,
            width: `${finalWidth}px`,
            height: `${finalHeight}px`,
            minHeight: `${finalHeight}px`,
          },
        };

        // Update positioning for absolute elements
        if (section.positioning?.type === "absolute") {
          updates.positioning = {
            ...section.positioning,
            coordinates: {
              ...section.positioning.coordinates,
              x: finalX,
              y: finalY,
              width: finalWidth,
              height: finalHeight,
            },
          };
        }

        onResize(section.id, updates);
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        setResizeDirection(null);
        onResizeEnd();
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
      };

      document.body.style.cursor = `${direction}-resize`;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [
      onResizeStart,
      section.positioning,
      section.styling,
      section.id,
      containerRef,
      resizeDirection,
      constrainToBounds,
      onResize,
      onResizeEnd,
    ],
  );

  const handleStyles: Record<ResizeDirection, string> = {
    nw: "top-0 left-0 cursor-nw-resize -translate-x-1 -translate-y-1",
    n: "top-0 left-1/2 -translate-x-1/2 -translate-y-1 cursor-n-resize",
    ne: "top-0 right-0 cursor-ne-resize translate-x-1 -translate-y-1",
    e: "top-1/2 right-0 -translate-y-1/2 translate-x-1 cursor-e-resize",
    se: "bottom-0 right-0 cursor-se-resize translate-x-1 translate-y-1",
    s: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1 cursor-s-resize",
    sw: "bottom-0 left-0 cursor-sw-resize -translate-x-1 translate-y-1",
    w: "top-1/2 left-0 -translate-y-1/2 -translate-x-1 cursor-w-resize",
  };

  return (
    <>
      {(Object.keys(handleStyles) as ResizeDirection[]).map((direction) => (
        <div
          key={direction}
          className={`resize-handle bg-primary absolute z-40 h-3 w-3 cursor-pointer rounded-full border-2 border-white shadow-md transition-all duration-150 hover:scale-125 ${handleStyles[direction]} ${isResizing && resizeDirection === direction ? "bg-primary-foreground scale-125 shadow-lg" : ""} `}
          onMouseDown={(e) => handleMouseDown(direction, e)}
          style={{ cursor: `${direction}-resize` }}
        />
      ))}

      {/* Visual feedback during resize */}
      {isResizing && (
        <div className="border-primary bg-primary/5 pointer-events-none absolute inset-0 z-10 border-2 border-dashed">
          <div className="bg-primary text-primary-foreground absolute top-1 left-1 rounded px-1 text-xs">
            {section.styling?.width} × {section.styling?.height}
          </div>
        </div>
      )}
    </>
  );
};
