"use client";

import type {
  LayoutData,
  SeatingElementType,
  SeatingRoomType,
  SeatingWallType,
} from "@/types/venue";
import { useEffect, useRef } from "react";

interface LayoutRendererProps {
  layoutData: LayoutData;
  opacity?: number;
  className?: string;
}

const LayoutRenderer = ({
  layoutData,
  opacity = 0.3,
  className = "",
}: LayoutRendererProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = layoutData.dimensions.width;
    canvas.height = layoutData.dimensions.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the layout with specified opacity
    ctx.globalAlpha = opacity;

    // Draw walls if they exist (new format)
    if (layoutData.walls?.length) {
      layoutData.walls.forEach((wall: SeatingWallType) => {
        if (wall.points?.length >= 2) {
          ctx.strokeStyle = wall.color || "hsl(var(--foreground))";
          ctx.lineWidth = wall.thickness || 6;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          ctx.beginPath();
          ctx.moveTo(wall.points[0].x, wall.points[0].y);
          wall.points.forEach((point, index: number) => {
            if (index > 0) {
              ctx.lineTo(point.x, point.y);
            }
          });
          ctx.stroke();
        }
      });
    }

    // Draw rooms if they exist (new format)
    if (layoutData.rooms?.length) {
      layoutData.rooms.forEach((room: SeatingRoomType) => {
        // Simple room representation - could be enhanced
        ctx.fillStyle = (room.color || "hsl(var(--primary))") + "20";
        // Basic room rendering - in a real implementation,
        // you'd calculate the room bounds from the associated walls
      });
    }

    // Draw architectural elements if they exist (new format)
    if (layoutData.elements?.length) {
      layoutData.elements.forEach((element: SeatingElementType) => {
        ctx.save();
        ctx.translate(
          element.x + element.width / 2,
          element.y + element.height / 2,
        );
        ctx.rotate((element.rotation * Math.PI) / 180);
        ctx.translate(-element.width / 2, -element.height / 2);

        switch (element.type) {
          case "door":
            ctx.strokeStyle = "hsl(var(--primary))";
            ctx.lineWidth = 3;
            ctx.setLineDash([5, 5]);
            ctx.strokeRect(0, 0, element.width, element.height);
            ctx.setLineDash([]);
            break;
          case "window":
            ctx.strokeStyle = "hsl(var(--primary))";
            ctx.lineWidth = 4;
            ctx.strokeRect(0, 0, element.width, element.height);
            break;
        }

        ctx.restore();
      });
    }

    // Legacy path support (old format)
    if (layoutData.paths?.length) {
      layoutData.paths.forEach((path) => {
        ctx.beginPath();
        ctx.strokeStyle = path.color || "#2563eb";
        ctx.lineWidth = path.lineWidth || 2;

        if (path.type === "freehand") {
          if (path?.points && path?.points?.length > 0) {
            ctx.moveTo(path?.points[0]?.x ?? 0, path.points[0].y ?? 0);
            path.points.forEach((point) => {
              ctx.lineTo(point?.x ?? 0, point?.y ?? 0);
            });
            ctx.stroke();
          }
        } else if (path.type === "rectangle") {
          ctx.rect(
            path?.x ?? 0,
            path?.y ?? 0,
            path?.width ?? 0,
            path.height ?? 0,
          );
          ctx.stroke();
        } else if (path.type === "circle") {
          ctx.arc(path?.x ?? 0, path?.y ?? 0, path.radius ?? 0, 0, 2 * Math.PI);
          ctx.stroke();
        }
      });
    }

    ctx.globalAlpha = 1; // Reset alpha
  }, [layoutData, opacity]);

  if (
    !layoutData.walls?.length &&
    !layoutData.paths?.length &&
    !layoutData.rooms?.length &&
    !layoutData.elements?.length
  ) {
    return null;
  }

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default LayoutRenderer;
