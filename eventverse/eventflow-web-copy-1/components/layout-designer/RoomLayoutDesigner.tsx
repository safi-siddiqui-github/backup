"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  LayoutData,
  SeatingElementType,
  SeatingRoomType,
  SeatingWallType,
} from "@/types/venue";
import {
  DoorOpen,
  Download,
  Eye,
  EyeOff,
  Grid3x3,
  Home,
  Move,
  RectangleHorizontal,
  Redo,
  Ruler,
  Save,
  Square,
  Trash2,
  Undo,
} from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// interface Wall {
//   id: string;
//   type: "exterior" | "interior" | "glass";
//   points: { x: number; y: number }[];
//   thickness: number;
//   color: string;
//   material?: string;
// }

// interface Room {
//   id: string;
//   name: string;
//   type:
//     | "dining"
//     | "conference"
//     | "ballroom"
//     | "lounge"
//     | "kitchen"
//     | "bathroom"
//     | "other";
//   walls: string[];
//   area: number;
//   color: string;
//   capacity?: number;
// }

// interface ArchitecturalElement {
//   id: string;
//   type: "door" | "window" | "column" | "stairs";
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   rotation: number;
//   wallId?: string;
//   subtype?: string;
// }

interface RoomLayoutDesignerProps {
  onSave?: (layout: LayoutData) => void;
  onExport?: () => void;
  onUseAsBackground?: (layout: LayoutData) => void;
  initialLayout?: LayoutData;
  viewMode?: "design" | "preview";
}

const RoomLayoutDesigner = ({
  onSave,
  onExport,
  onUseAsBackground,
  initialLayout,
  viewMode = "design",
}: RoomLayoutDesignerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentTool, setCurrentTool] = useState<
    "select" | "wall" | "door" | "window" | "room" | "measure" | "erase"
  >("wall");
  const [wallType, setWallType] = useState<"exterior" | "interior" | "glass">(
    "interior",
  );
  const [scale, setScale] = useState(10); // 1 pixel = 10 inches
  const [showGrid, setShowGrid] = useState(true);
  const [showMeasurements, setShowMeasurements] = useState(true);
  const [showRoomLabels, setShowRoomLabels] = useState(true);

  const [walls, setWalls] = useState<SeatingWallType[]>([]);
  const [rooms, setRooms] = useState<SeatingRoomType[]>([]);
  const [elements, setElements] = useState<SeatingElementType[]>([]);
  const [history, setHistory] = useState<LayoutData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const [isDrawing, setIsDrawing] = useState(false);
  const [currentWall, setCurrentWall] = useState<{ x: number; y: number }[]>(
    [],
  );
  const [selectedWall, setSelectedWall] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const GRID_SIZE = 20;
  // const WALL_THICKNESS = {
  //   exterior: 12,
  //   interior: 6,
  //   glass: 4,
  // };

  const WALL_THICKNESS = useMemo(
    () => ({
      exterior: 12,
      interior: 6,
      glass: 4,
    }),
    [],
  );

  useEffect(() => {
    if (initialLayout) {
      setWalls(initialLayout.walls || []);
      setRooms(initialLayout.rooms || []);
      setElements(initialLayout.elements || []);
    }
  }, [initialLayout]);

  const getCanvas = () => canvasRef.current;
  const getContext = useCallback(() => getCanvas()?.getContext("2d"), []);

  const snapToGrid = (x: number, y: number) => {
    return {
      x: Math.round(x / GRID_SIZE) * GRID_SIZE,
      y: Math.round(y / GRID_SIZE) * GRID_SIZE,
    };
  };

  const addToHistory = useCallback(() => {
    const state = { walls, rooms, elements };
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(state)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [walls, rooms, elements, history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setWalls(prevState.walls ?? []);
      setRooms(prevState.rooms ?? []);
      setElements(prevState.elements ?? []);
      setHistoryIndex(historyIndex - 1);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setWalls(nextState.walls ?? []);
      setRooms(nextState.rooms ?? []);
      setElements(nextState.elements ?? []);
      setHistoryIndex(historyIndex + 1);
    }
  }, [history, historyIndex]);

  const drawGrid = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      if (!showGrid) return;

      ctx.strokeStyle = "hsl(var(--border))";
      ctx.lineWidth = 0.5;

      for (let x = 0; x <= canvas.width; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y <= canvas.height; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    },
    [showGrid],
  );

  const drawWall = useCallback(
    (ctx: CanvasRenderingContext2D, wall: SeatingWallType) => {
      if (wall.points.length < 2) return;

      const thickness = WALL_THICKNESS[wall.type];

      ctx.strokeStyle = wall.color || "hsl(var(--foreground))";
      ctx.lineWidth = thickness;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(wall.points[0].x, wall.points[0].y);

      wall.points.forEach((point, index) => {
        if (index > 0) {
          ctx.lineTo(point.x, point.y);
        }
      });

      ctx.stroke();

      // Draw wall outline for better visibility
      ctx.strokeStyle = "hsl(var(--border))";
      ctx.lineWidth = thickness + 2;
      ctx.globalAlpha = 0.3;
      ctx.stroke();
      ctx.globalAlpha = 1;
    },
    [WALL_THICKNESS],
  );

  const drawRoom = useCallback(
    (ctx: CanvasRenderingContext2D, room: SeatingRoomType) => {
      const roomWalls = walls.filter((wall) => room.walls.includes(wall.id));
      if (roomWalls.length === 0) return;

      // Calculate room bounds for filling
      let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;
      roomWalls.forEach((wall) => {
        wall.points.forEach((point) => {
          minX = Math.min(minX, point.x);
          minY = Math.min(minY, point.y);
          maxX = Math.max(maxX, point.x);
          maxY = Math.max(maxY, point.y);
        });
      });

      // Fill room area
      ctx.fillStyle = room.color + "20"; // Add transparency
      ctx.fillRect(minX, minY, maxX - minX, maxY - minY);

      // Draw room label
      if (showRoomLabels) {
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;

        ctx.fillStyle = "hsl(var(--foreground))";
        ctx.font = "14px system-ui";
        ctx.textAlign = "center";
        ctx.fillText(room.name, centerX, centerY);

        // Room area
        ctx.font = "12px system-ui";
        ctx.fillText(`${room.area.toFixed(0)} sq ft`, centerX, centerY + 20);

        if (room.capacity) {
          ctx.fillText(`Cap: ${room.capacity}`, centerX, centerY + 35);
        }
      }
    },
    [showRoomLabels, walls],
  );

  const drawElement = (
    ctx: CanvasRenderingContext2D,
    element: SeatingElementType,
  ) => {
    ctx.save();
    ctx.translate(
      element.x + element.width / 2,
      element.y + element.height / 2,
    );
    ctx.rotate((element.rotation * Math.PI) / 180);
    ctx.translate(-element.width / 2, -element.height / 2);

    switch (element.type) {
      case "door":
        // Door opening
        ctx.strokeStyle = "hsl(var(--primary))";
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(0, 0, element.width, element.height);
        ctx.setLineDash([]);

        // Door swing arc
        ctx.beginPath();
        ctx.arc(0, 0, element.width * 0.8, 0, Math.PI / 2);
        ctx.stroke();
        break;

      case "window":
        ctx.strokeStyle = "hsl(var(--primary))";
        ctx.lineWidth = 4;
        ctx.strokeRect(0, 0, element.width, element.height);

        // Window lines
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(element.width / 2, 0);
        ctx.lineTo(element.width / 2, element.height);
        ctx.stroke();
        break;

      case "column":
        ctx.fillStyle = "hsl(var(--muted))";
        ctx.fillRect(0, 0, element.width, element.height);
        ctx.strokeStyle = "hsl(var(--border))";
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, element.width, element.height);
        break;

      case "stairs":
        ctx.strokeStyle = "hsl(var(--foreground))";
        ctx.lineWidth = 2;
        const steps = 8;
        for (let i = 0; i <= steps; i++) {
          const y = (element.height / steps) * i;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(element.width, y);
          ctx.stroke();
        }
        break;
    }

    ctx.restore();
  };

  const drawMeasurements = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      if (!showMeasurements) return;

      ctx.strokeStyle = "hsl(var(--muted-foreground))";
      ctx.fillStyle = "hsl(var(--muted-foreground))";
      ctx.lineWidth = 1;
      ctx.font = "10px system-ui";

      walls.forEach((wall) => {
        if (wall.points.length >= 2) {
          for (let i = 0; i < wall.points.length - 1; i++) {
            const p1 = wall.points[i];
            const p2 = wall.points[i + 1];

            const distance = Math.sqrt(
              Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2),
            );
            const realDistance = (distance / GRID_SIZE) * scale; // Convert to inches
            const feet = Math.floor(realDistance / 12);
            const inches = Math.round(realDistance % 12);

            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;

            ctx.fillText(`${feet}'${inches}"`, midX, midY - 5);
          }
        }
      });
    },
    [scale, showMeasurements, walls],
  );

  const redrawCanvas = useCallback(() => {
    const canvas = getCanvas();
    const ctx = getContext();
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    drawGrid(ctx, canvas);

    // Draw rooms (background)
    rooms.forEach((room) => drawRoom(ctx, room));

    // Draw walls
    walls.forEach((wall) => drawWall(ctx, wall));

    // Draw architectural elements
    elements.forEach((element) => drawElement(ctx, element));

    // Draw measurements
    drawMeasurements(ctx);

    // Draw current wall being drawn
    if (isDrawing && currentWall.length > 0) {
      ctx.strokeStyle = "hsl(var(--primary))";
      ctx.lineWidth = WALL_THICKNESS[wallType];
      ctx.setLineDash([5, 5]);

      ctx.beginPath();
      ctx.moveTo(currentWall[0].x, currentWall[0].y);
      currentWall.forEach((point, index) => {
        if (index > 0) {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [
    WALL_THICKNESS,
    currentWall,
    drawGrid,
    drawMeasurements,
    drawRoom,
    drawWall,
    elements,
    getContext,
    isDrawing,
    rooms,
    wallType,
    walls,
  ]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = getCanvas();
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    const snapped = snapToGrid(x, y);
    x = snapped.x;
    y = snapped.y;

    if (currentTool === "wall") {
      if (!isDrawing) {
        setIsDrawing(true);
        setCurrentWall([{ x, y }]);
      } else {
        setCurrentWall((prev) => [...prev, { x, y }]);
      }
    } else if (currentTool === "door") {
      const newElement: SeatingElementType = {
        id: `door-${Date.now()}`,
        type: "door",
        x: x - 20,
        y: y - 5,
        width: 40,
        height: 10,
        rotation: 0,
      };
      setElements((prev) => [...prev, newElement]);
      addToHistory();
    } else if (currentTool === "window") {
      const newElement: SeatingElementType = {
        id: `window-${Date.now()}`,
        type: "window",
        x: x - 25,
        y: y - 5,
        width: 50,
        height: 10,
        rotation: 0,
      };
      setElements((prev) => [...prev, newElement]);
      addToHistory();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = getCanvas();
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    const snapped = snapToGrid(x, y);
    x = snapped.x;
    y = snapped.y;

    if (currentTool === "wall") {
      setCurrentWall((prev) => {
        const newWall = [...prev];
        newWall[newWall.length - 1] = { x, y };
        return newWall;
      });
    }

    redrawCanvas();
  };

  const handleMouseUp = () => {
    // Wall drawing continues until right-click or escape
  };

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isDrawing && currentWall.length > 1) {
          // Finish current wall
          const newWall: SeatingWallType = {
            id: `wall-${Date.now()}`,
            type: wallType,
            points: [...currentWall],
            thickness: WALL_THICKNESS[wallType],
            color:
              wallType === "exterior"
                ? "hsl(var(--foreground))"
                : wallType === "glass"
                  ? "hsl(var(--primary))"
                  : "hsl(var(--muted-foreground))",
          };
          setWalls((prev) => [...prev, newWall]);
          addToHistory();
        }
        setIsDrawing(false);
        setCurrentWall([]);
      } else if (e.key === "Enter") {
        if (isDrawing && currentWall.length > 2) {
          // Close current wall as room
          const newWall: SeatingWallType = {
            id: `wall-${Date.now()}`,
            type: wallType,
            points: [...currentWall, currentWall[0]], // Close the shape
            thickness: WALL_THICKNESS[wallType],
            color:
              wallType === "exterior"
                ? "hsl(var(--foreground))"
                : wallType === "glass"
                  ? "hsl(var(--primary))"
                  : "hsl(var(--muted-foreground))",
          };
          setWalls((prev) => [...prev, newWall]);

          // Create room
          const area = calculatePolygonArea(currentWall);
          const newRoom: SeatingRoomType = {
            id: `room-${Date.now()}`,
            name: `Room ${rooms.length + 1}`,
            type: "other",
            walls: [newWall.id],
            area: ((area / (GRID_SIZE * GRID_SIZE)) * (scale * scale)) / 144, // Convert to sq ft
            color: "hsl(var(--primary))",
          };
          setRooms((prev) => [...prev, newRoom]);
          addToHistory();
        }
        setIsDrawing(false);
        setCurrentWall([]);
      } else if (e.ctrlKey || e.metaKey) {
        if (e.key === "z") {
          e.preventDefault();
          if (e.shiftKey) {
            redo();
          } else {
            undo();
          }
        }
      }
    },
    [
      isDrawing,
      currentWall,
      wallType,
      WALL_THICKNESS,
      addToHistory,
      rooms.length,
      scale,
      redo,
      undo,
    ],
  );

  const calculatePolygonArea = (points: { x: number; y: number }[]) => {
    let area = 0;
    const n = points.length;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      area += points[i].x * points[j].y;
      area -= points[j].x * points[i].y;
    }
    return Math.abs(area) / 2;
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    redrawCanvas();
  }, [
    walls,
    rooms,
    elements,
    currentWall,
    showGrid,
    showMeasurements,
    showRoomLabels,
    redrawCanvas,
  ]);

  const handleSave = () => {
    const layoutData = {
      walls,
      rooms,
      elements,
      scale,
      dimensions: { width: 1200, height: 800 },
      timestamp: Date.now(),
    };

    if (onSave) {
      onSave(layoutData);
    }
  };

  const handleUseAsBackground = () => {
    const layoutData = {
      walls,
      rooms,
      elements,
      scale,
      dimensions: { width: 1200, height: 800 },
      timestamp: Date.now(),
    };

    if (onUseAsBackground) {
      onUseAsBackground(layoutData);
    }
  };

  const handleExport = async () => {
    const canvas = getCanvas();
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `room-layout-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();
  };

  const handleClear = () => {
    setWalls([]);
    setRooms([]);
    setElements([]);
    setHistory([]);
    setHistoryIndex(-1);
    setIsDrawing(false);
    setCurrentWall([]);
    redrawCanvas();
  };

  if (viewMode === "preview") {
    return (
      <div className="h-full w-full">
        <canvas
          ref={canvasRef}
          width={1200}
          height={800}
          className="border-border h-full w-full rounded-lg border"
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
        />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      {/* Professional Toolbar */}
      <div className="bg-card flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Home className="text-primary h-5 w-5" />
          <h3 className="font-semibold">Room Layout Designer</h3>
          <Badge
            variant="outline"
            className="text-xs"
          >
            Professional Floor Planner
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          {/* Drawing Tools */}
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant={currentTool === "select" ? "default" : "outline"}
              onClick={() => setCurrentTool("select")}
            >
              <Move className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={currentTool === "wall" ? "default" : "outline"}
              onClick={() => setCurrentTool("wall")}
            >
              <RectangleHorizontal className="h-4 w-4" />
              Wall
            </Button>
            <Button
              size="sm"
              variant={currentTool === "door" ? "default" : "outline"}
              onClick={() => setCurrentTool("door")}
            >
              <DoorOpen className="h-4 w-4" />
              Door
            </Button>
            <Button
              size="sm"
              variant={currentTool === "window" ? "default" : "outline"}
              onClick={() => setCurrentTool("window")}
            >
              <Square className="h-4 w-4" />
              Window
            </Button>
          </div>

          <Separator
            orientation="vertical"
            className="h-6"
          />

          {/* Wall Type */}
          <div className="flex items-center gap-2">
            <Label className="text-sm">Wall:</Label>
            <Select
              value={wallType}
              onValueChange={(value) =>
                setWallType(value as SeatingWallType["type"])
              }
            >
              <SelectTrigger className="h-8 w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exterior">Exterior</SelectItem>
                <SelectItem value="interior">Interior</SelectItem>
                <SelectItem value="glass">Glass</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Scale */}
          <div className="flex items-center gap-2">
            <Label className="text-sm">Scale:</Label>
            <Input
              type="number"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="h-8 w-16"
              min="1"
              max="100"
            />
            <span className="text-muted-foreground text-xs">in/px</span>
          </div>

          <Separator
            orientation="vertical"
            className="h-6"
          />

          {/* View Options */}
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant={showGrid ? "default" : "outline"}
              onClick={() => setShowGrid(!showGrid)}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={showMeasurements ? "default" : "outline"}
              onClick={() => setShowMeasurements(!showMeasurements)}
            >
              <Ruler className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={showRoomLabels ? "default" : "outline"}
              onClick={() => setShowRoomLabels(!showRoomLabels)}
            >
              {showRoomLabels ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </Button>
          </div>

          <Separator
            orientation="vertical"
            className="h-6"
          />

          {/* History */}
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={undo}
              disabled={historyIndex <= 0}
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
            >
              <Redo className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleClear}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <Separator
            orientation="vertical"
            className="h-6"
          />

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              onClick={handleSave}
            >
              <Save className="mr-1 h-4 w-4" />
              Save
            </Button>
            {onUseAsBackground && (
              <Button
                size="sm"
                variant="default"
                onClick={handleUseAsBackground}
              >
                Use as Background
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={handleExport}
            >
              <Download className="mr-1 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-muted/50 text-muted-foreground border-b px-4 py-2 text-sm">
        {currentTool === "wall" && isDrawing && (
          <span>
            Click to add wall points • <kbd>Enter</kbd> to close room •{" "}
            <kbd>Esc</kbd> to finish wall
          </span>
        )}
        {currentTool === "wall" && !isDrawing && (
          <span>
            Click to start drawing walls • Hold <kbd>Shift</kbd> for straight
            lines
          </span>
        )}
        {currentTool === "door" && (
          <span>Click on walls to place doors • Drag to resize</span>
        )}
        {currentTool === "window" && (
          <span>Click on walls to place windows • Drag to resize</span>
        )}
        {currentTool === "select" && (
          <span>
            Click to select elements • Drag to move • Right-click for options
          </span>
        )}
      </div>

      {/* Canvas */}
      <div className="bg-muted/30 flex-1 overflow-auto p-4">
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={1200}
            height={800}
            className="border-border bg-card cursor-crosshair rounded-lg border shadow-sm"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsDrawing(false)}
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-muted/50 text-muted-foreground flex h-8 items-center justify-between border-t px-4 text-xs">
        <div className="flex items-center gap-4">
          <span>{walls.length} walls</span>
          <span>{rooms.length} rooms</span>
          <span>{elements.length} elements</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Scale: 1px = {scale}&quot;</span>
          <span>Grid: {showGrid ? "On" : "Off"}</span>
        </div>
      </div>
    </div>
  );
};

export default RoomLayoutDesigner;
