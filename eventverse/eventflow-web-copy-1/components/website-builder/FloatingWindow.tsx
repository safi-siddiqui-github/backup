"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GripVertical, Maximize2, Minimize2, Minus, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface FloatingWindowProps {
  id: string;
  title: string;
  type?: string;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  onPositionChange?: (id: string, position: { x: number; y: number }) => void;
  onSizeChange?: (id: string, size: { width: number; height: number }) => void;
  onClose?: (id: string) => void;
  className?: string;
  children: React.ReactNode;
  zIndex?: number;
}

type WindowState = "normal" | "minimized" | "maximized";

export const FloatingWindow = ({
  id,
  title,
  type,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 300, height: 200 },
  onPositionChange,
  onSizeChange,
  onClose,
  className = "",
  children,
  zIndex = 1000,
}: FloatingWindowProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [windowState, setWindowState] = useState<WindowState>("normal");
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [originalState, setOriginalState] = useState({
    position: initialPosition,
    size: initialSize,
  });

  const windowRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  // Handle minimize
  const handleMinimize = useCallback(() => {
    if (windowState === "minimized") {
      setWindowState("normal");
      toast.success(`${title} restored`);
    } else {
      setOriginalState({ position, size });
      setWindowState("minimized");
      toast.success(`${title} minimized`);
    }
  }, [windowState, position, size, title]);

  // Handle maximize
  const handleMaximize = useCallback(() => {
    if (windowState === "maximized") {
      setPosition(originalState.position);
      setSize(originalState.size);
      setWindowState("normal");
      toast.success(`${title} restored`);
    } else {
      setOriginalState({ position, size });
      setPosition({ x: 20, y: 20 });
      setSize({
        width: window.innerWidth - 40,
        height: window.innerHeight - 100,
      });
      setWindowState("maximized");
      toast.success(`${title} maximized`);
    }
  }, [windowState, position, size, originalState, title]);

  // Handle close
  const handleClose = useCallback(() => {
    onClose?.(id);
    toast.success(`${title} closed`);
  }, [id, onClose, title]);

  // Handle drag start
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (windowState === "maximized") return;

      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);

      const rect = windowRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }

      startPos.current = { x: e.clientX, y: e.clientY };
    },
    [windowState],
  );

  // Handle drag move
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startPos.current.x;
      const deltaY = e.clientY - startPos.current.y;

      const newPosition = {
        x: Math.max(
          0,
          Math.min(window.innerWidth - size.width, position.x + deltaX),
        ),
        y: Math.max(0, Math.min(window.innerHeight - 100, position.y + deltaY)),
      };

      setPosition(newPosition);
      onPositionChange?.(id, newPosition);
      startPos.current = { x: e.clientX, y: e.clientY };
    },
    [isDragging, position, size, id, onPositionChange],
  );

  // Handle drag end
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle resize start
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    startPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Handle resize move
  const handleResizeMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;

      const deltaX = e.clientX - startPos.current.x;
      const deltaY = e.clientY - startPos.current.y;

      const newSize = {
        width: Math.max(200, size.width + deltaX),
        height: Math.max(150, size.height + deltaY),
      };

      setSize(newSize);
      onSizeChange?.(id, newSize);
      startPos.current = { x: e.clientX, y: e.clientY };
    },
    [isResizing, size, id, onSizeChange],
  );

  // Handle resize end
  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
  }, []);

  // Add global event listeners
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

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleResizeMove);
      document.addEventListener("mouseup", handleResizeEnd);
      return () => {
        document.removeEventListener("mousemove", handleResizeMove);
        document.removeEventListener("mouseup", handleResizeEnd);
      };
    }
  }, [isResizing, handleResizeMove, handleResizeEnd]);

  // Get window style based on state
  const getWindowStyle = (): React.CSSProperties => {
    const baseStyle = {
      position: "fixed" as const,
      zIndex,
      transition:
        windowState !== "normal"
          ? "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          : "none",
    };

    switch (windowState) {
      case "minimized":
        return {
          ...baseStyle,
          left: position.x,
          top: position.y,
          width: 250,
          height: 40,
        };
      case "maximized":
        return {
          ...baseStyle,
          left: 20,
          top: 20,
          width: window.innerWidth - 40,
          height: window.innerHeight - 100,
        };
      default:
        return {
          ...baseStyle,
          left: position.x,
          top: position.y,
          width: size.width,
          height: size.height,
        };
    }
  };

  return (
    <Card
      ref={windowRef}
      className={`floating-window overflow-hidden select-none ${isDragging ? "opacity-90 shadow-2xl" : "shadow-lg hover:shadow-xl"} ${className} transition-shadow duration-200`}
      style={getWindowStyle()}
    >
      {/* Window Header */}
      <div
        className={`window-header flex cursor-move items-center justify-between border-b border-violet-200 bg-gradient-to-r from-violet-100 via-purple-100 to-blue-100 px-3 py-2 select-none ${windowState === "minimized" ? "rounded-b-lg" : ""} `}
        onMouseDown={handleMouseDown}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <GripVertical className="h-4 w-4 flex-shrink-0 text-violet-600" />
          {type && (
            <Badge
              variant="outline"
              className="border-violet-200 bg-white/80 text-xs"
            >
              {type}
            </Badge>
          )}
          <span className="truncate text-sm font-medium text-gray-700">
            {title}
          </span>
        </div>

        {/* Window Controls */}
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-gray-600 hover:bg-yellow-200/80"
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
            className="h-7 w-7 p-0 text-gray-600 hover:bg-green-200/80"
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
            className="h-7 w-7 p-0 text-gray-600 hover:bg-red-200/80"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            title="Close"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Window Content */}
      {windowState !== "minimized" && (
        <div className="window-content relative h-full overflow-hidden">
          <div className="h-full overflow-auto p-4">{children}</div>

          {/* Resize Handle */}
          {windowState === "normal" && (
            <div
              className="absolute right-0 bottom-0 h-4 w-4 cursor-nw-resize opacity-60 transition-opacity hover:opacity-100"
              style={{
                background:
                  "linear-gradient(135deg, transparent 0%, transparent 30%, #8b5cf6 30%, #8b5cf6 100%)",
                clipPath: "polygon(100% 0%, 0% 100%, 100% 100%)",
              }}
              onMouseDown={handleResizeStart}
              title="Resize"
            />
          )}
        </div>
      )}
    </Card>
  );
};
