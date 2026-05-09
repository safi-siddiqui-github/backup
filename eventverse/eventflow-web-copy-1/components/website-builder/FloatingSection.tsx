"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/types/website";
import { GripVertical, Maximize2, Minimize2, Minus, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

interface FloatingSectionProps {
  section: Section;
  isSelected: boolean;
  editMode: boolean;
  onSelect: (sectionId: string | null) => void;
  onUpdate: (sectionId: string, updates: Partial<Section>) => void;
  onDelete: (sectionId: string) => void;
  children: React.ReactNode;
}

type WindowState = "normal" | "minimized" | "maximized";

export const FloatingSection = ({
  section,
  isSelected,
  editMode,
  onSelect,
  onUpdate,
  onDelete,
  children,
}: FloatingSectionProps) => {
  const [windowState, setWindowState] = useState<WindowState>("normal");
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [originalPosition, setOriginalPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // const coordinates = section.positioning?.coordinates || {
  //   x: 0,
  //   y: 0,
  //   width: 200,
  //   height: 100,
  // };

  const coordinates = useMemo(
    () =>
      section.positioning?.coordinates || {
        x: 0,
        y: 0,
        width: 200,
        height: 100,
      },
    [],
  );

  const handleMinimize = useCallback(() => {
    if (windowState === "minimized") {
      setWindowState("normal");
      toast.success("Window restored");
    } else {
      setWindowState("minimized");
      toast.success("Window minimized");
    }
  }, [windowState]);

  const handleMaximize = useCallback(() => {
    if (windowState === "maximized") {
      setWindowState("normal");
      toast.success("Window restored");
    } else {
      if (windowState === "normal") {
        // Store original position before maximizing
        setOriginalPosition({
          x: coordinates.x,
          y: coordinates.y,
          width: coordinates.width || 200,
          height: coordinates.height || 100,
        });
      }
      setWindowState("maximized");
      toast.success("Window maximized");
    }
  }, [windowState, coordinates]);

  const handleClose = useCallback(() => {
    onDelete(section.id);
    toast.success("Floating section removed");
  }, [section.id, onDelete]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!editMode || windowState === "maximized") return;

      e.stopPropagation();
      setIsDragging(true);
      onSelect(section.id);

      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        dragStartPos.current = { x: e.clientX, y: e.clientY };
      }
    },
    [editMode, windowState, section.id, onSelect],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || windowState === "maximized") return;

      const deltaX = e.clientX - dragStartPos.current.x;
      const deltaY = e.clientY - dragStartPos.current.y;

      const newX = Math.max(0, coordinates.x + deltaX);
      const newY = Math.max(0, coordinates.y + deltaY);

      onUpdate(section.id, {
        positioning: {
          ...section.positioning!,
          coordinates: {
            ...coordinates,
            x: newX,
            y: newY,
          },
        },
      });

      dragStartPos.current = { x: e.clientX, y: e.clientY };
    },
    [
      isDragging,
      windowState,
      coordinates,
      section.id,
      section.positioning,
      onUpdate,
    ],
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      toast.success("Section repositioned");
    }
  }, [isDragging]);

  // Global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Handle resize drag
  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!editMode) return;
      e.stopPropagation();
      setIsResizing(true);
      dragStartPos.current = { x: e.clientX, y: e.clientY };
    },
    [editMode],
  );

  const handleResizeMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;

      const deltaX = e.clientX - dragStartPos.current.x;
      const deltaY = e.clientY - dragStartPos.current.y;

      const newWidth = Math.max(150, (coordinates.width || 200) + deltaX);
      const newHeight = Math.max(100, (coordinates.height || 100) + deltaY);

      onUpdate(section.id, {
        positioning: {
          ...section.positioning!,
          coordinates: {
            ...coordinates,
            width: newWidth,
            height: newHeight,
          },
        },
      });

      dragStartPos.current = { x: e.clientX, y: e.clientY };
    },
    [isResizing, coordinates, section.id, section.positioning, onUpdate],
  );

  const handleResizeMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      toast.success("Section resized");
    }
  }, [isResizing]);

  // Global resize event listeners
  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleResizeMouseMove);
      document.addEventListener("mouseup", handleResizeMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleResizeMouseMove);
        document.removeEventListener("mouseup", handleResizeMouseUp);
      };
    }
  }, [isResizing, handleResizeMouseMove, handleResizeMouseUp]);

  const getWindowStyle = () => {
    const baseStyle: React.CSSProperties = {
      position: "absolute",
      zIndex: section.positioning?.zIndex || 1000,
    };

    switch (windowState) {
      case "minimized":
        return {
          ...baseStyle,
          left: coordinates.x,
          top: coordinates.y,
          width: 200,
          height: 40,
          transition: "all 0.3s ease",
        };
      case "maximized":
        return {
          ...baseStyle,
          left: 20,
          top: 20,
          right: 20,
          bottom: 20,
          width: "calc(100% - 40px)",
          height: "calc(100% - 40px)",
          transition: "all 0.3s ease",
        };
      default:
        return {
          ...baseStyle,
          left: coordinates.x,
          top: coordinates.y,
          width: coordinates.width || 200,
          height: coordinates.height || 100,
          minWidth: 150,
          minHeight: 100,
        };
    }
  };

  return (
    <Card
      ref={sectionRef}
      className={`floating-section ${isSelected ? "ring-2 ring-violet-500 ring-offset-1" : "ring-1 ring-gray-200"} ${isDragging ? "opacity-80 shadow-2xl" : "shadow-lg"} ${editMode ? "hover:shadow-xl" : ""} overflow-hidden transition-shadow duration-200`}
      style={getWindowStyle()}
      onClick={(e) => {
        e.stopPropagation();
        if (editMode) onSelect(section.id);
      }}
    >
      {/* Window Header */}
      <div
        className={`flex cursor-move items-center justify-between border-b bg-gradient-to-r from-violet-100 to-blue-100 p-2 select-none ${windowState === "minimized" ? "rounded-b-lg" : ""} `}
        onMouseDown={handleMouseDown}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <GripVertical className="h-3 w-3 flex-shrink-0 text-gray-500" />
          <Badge
            variant="outline"
            className="bg-white/70 text-xs"
          >
            {section.type}
          </Badge>
          {windowState !== "minimized" && (
            <span className="truncate text-xs text-gray-600">
              {section.content.title || "Floating Content"}
            </span>
          )}
        </div>

        {/* Window Controls */}
        {editMode && (
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-yellow-200"
              onClick={(e) => {
                e.stopPropagation();
                handleMinimize();
              }}
              title="Minimize"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-green-200"
              onClick={(e) => {
                e.stopPropagation();
                handleMaximize();
              }}
              title={windowState === "maximized" ? "Restore" : "Maximize"}
            >
              {windowState === "maximized" ? (
                <Minimize2 className="h-3 w-3" />
              ) : (
                <Maximize2 className="h-3 w-3" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-red-200"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              title="Close"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      {/* Window Content */}
      {windowState !== "minimized" && (
        <div className="relative h-full overflow-hidden">
          <div className="h-full overflow-auto p-3">{children}</div>

          {/* Resize Handle */}
          {editMode && windowState === "normal" && (
            <div
              className="absolute right-0 bottom-0 h-4 w-4 cursor-nw-resize bg-gray-300 opacity-50 hover:opacity-80"
              style={{
                clipPath: "polygon(100% 0%, 0% 100%, 100% 100%)",
              }}
              onMouseDown={handleResizeMouseDown}
              title="Resize"
            />
          )}
        </div>
      )}
    </Card>
  );
};
