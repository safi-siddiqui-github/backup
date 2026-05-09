"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Circle, Canvas as FabricCanvas, FabricText, Path, Rect } from "fabric";
import {
  Circle as CircleIcon,
  Download,
  Grid3X3,
  MousePointer2,
  Pencil,
  Save,
  Square,
  Trash2,
  Type,
  Undo,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface VenueDrawingCanvasProps {
  onSave?: (canvasData: string) => void;
  initialData?: string;
  venueId: string;
  floorName: string;
}

const VenueDrawingCanvas = ({
  onSave,
  initialData,
  venueId,
  floorName,
}: VenueDrawingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState("#3b82f6");
  const [activeTool, setActiveTool] = useState<
    "select" | "draw" | "rectangle" | "circle" | "text"
  >("select");
  const [showGrid, setShowGrid] = useState(true);
  const [brushSize, setBrushSize] = useState(2);
  const [textToAdd, setTextToAdd] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 1000,
      height: 700,
      backgroundColor: "#ffffff",
    });

    // Initialize the freeDrawingBrush
    canvas.freeDrawingBrush!.color = activeColor;
    canvas.freeDrawingBrush!.width = brushSize;

    // Add grid if enabled
    if (showGrid) {
      addGrid(canvas);
    }

    // Load initial data if provided
    if (initialData) {
      try {
        canvas.loadFromJSON(initialData, () => {
          canvas.renderAll();
        });
      } catch (error) {
        console.error("Failed to load canvas data:", error);
      }
    }

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [activeColor, brushSize, initialData, showGrid]);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = activeTool === "draw";

    if (activeTool === "draw" && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = activeColor;
      fabricCanvas.freeDrawingBrush.width = brushSize;
    }
  }, [activeTool, activeColor, brushSize, fabricCanvas]);

  const addGrid = (canvas: FabricCanvas) => {
    const gridSize = 20;
    const width = canvas.width || 1000;
    const height = canvas.height || 700;

    for (let i = 0; i < width / gridSize; i++) {
      canvas.add(
        new Path(`M ${i * gridSize} 0 L ${i * gridSize} ${height}`, {
          stroke: "#e5e7eb",
          strokeWidth: 1,
          selectable: false,
          evented: false,
          excludeFromExport: true,
        }),
      );
    }

    for (let i = 0; i < height / gridSize; i++) {
      canvas.add(
        new Path(`M 0 ${i * gridSize} L ${width} ${i * gridSize}`, {
          stroke: "#e5e7eb",
          strokeWidth: 1,
          selectable: false,
          evented: false,
          excludeFromExport: true,
        }),
      );
    }
  };

  const handleToolClick = (tool: typeof activeTool) => {
    setActiveTool(tool);

    if (!fabricCanvas) return;

    if (tool === "rectangle") {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: "transparent",
        stroke: activeColor,
        strokeWidth: 2,
        width: 100,
        height: 100,
      });
      fabricCanvas.add(rect);
      fabricCanvas.setActiveObject(rect);
    } else if (tool === "circle") {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: "transparent",
        stroke: activeColor,
        strokeWidth: 2,
        radius: 50,
      });
      fabricCanvas.add(circle);
      fabricCanvas.setActiveObject(circle);
    } else if (tool === "text" && textToAdd.trim()) {
      const text = new FabricText(textToAdd, {
        left: 100,
        top: 100,
        fill: activeColor,
        fontSize: 20,
        fontFamily: "Arial",
      });
      fabricCanvas.add(text);
      fabricCanvas.setActiveObject(text);
      setTextToAdd("");
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    if (showGrid) {
      addGrid(fabricCanvas);
    }
    fabricCanvas.renderAll();
    toast({
      title: "Canvas cleared",
      description: "Your venue layout has been cleared.",
    });
  };

  const handleSave = () => {
    if (!fabricCanvas) return;

    const canvasData = JSON.stringify(fabricCanvas.toJSON());
    onSave?.(canvasData);

    toast({
      title: "Layout saved",
      description: `Your ${floorName} layout has been saved successfully.`,
    });
  };

  const handleUndo = () => {
    // Fabric.js doesn't have built-in undo/redo, but we can implement basic functionality
    if (!fabricCanvas) return;
    const objects = fabricCanvas.getObjects();
    if (objects.length > 0) {
      fabricCanvas.remove(objects[objects.length - 1]);
      fabricCanvas.renderAll();
    }
  };

  const handleDeleteSelected = () => {
    if (!fabricCanvas) return;
    const activeObjects = fabricCanvas.getActiveObjects();
    activeObjects.forEach((obj) => fabricCanvas.remove(obj));
    fabricCanvas.discardActiveObject();
    fabricCanvas.renderAll();
  };

  const handleExport = () => {
    if (!fabricCanvas) return;

    // Hide grid for export
    const gridObjects = fabricCanvas
      .getObjects()
      .filter((obj) => obj.excludeFromExport);
    gridObjects.forEach((obj) => obj.set("visible", false));

    const dataURL = fabricCanvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 2,
    });

    // Show grid again
    gridObjects.forEach((obj) => obj.set("visible", true));
    fabricCanvas.renderAll();

    // Download the image
    const link = document.createElement("a");
    link.download = `${floorName.replace(/\s+/g, "_").toLowerCase()}_layout.png`;
    link.href = dataURL;
    link.click();

    toast({
      title: "Layout exported",
      description: "Your venue layout has been exported as an image.",
    });
  };

  const venueElements = [
    { name: "Stage", color: "#dc2626", icon: "🎭" },
    { name: "Bar", color: "#16a34a", icon: "🍸" },
    { name: "DJ Booth", color: "#9333ea", icon: "🎧" },
    { name: "Photo Area", color: "#ea580c", icon: "📸" },
    { name: "Entrance", color: "#0891b2", icon: "🚪" },
    { name: "Kitchen", color: "#65a30d", icon: "👨‍🍳" },
  ];

  const addVenueElement = (element: (typeof venueElements)[0]) => {
    if (!fabricCanvas) return;

    const rect = new Rect({
      left: 150,
      top: 150,
      fill: element.color + "40", // 40 for opacity
      stroke: element.color,
      strokeWidth: 2,
      width: 120,
      height: 80,
    });

    const text = new FabricText(element.name, {
      left: 160,
      top: 175,
      fill: element.color,
      fontSize: 14,
      fontWeight: "bold",
    });

    fabricCanvas.add(rect);
    fabricCanvas.add(text);
    fabricCanvas.renderAll();
  };

  return (
    <div className="flex h-full gap-6">
      {/* Left Toolbar */}
      <Card className="h-fit w-80">
        <CardHeader>
          <CardTitle className="text-sm">Drawing Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Tools */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={activeTool === "select" ? "default" : "outline"}
              size="sm"
              onClick={() => handleToolClick("select")}
            >
              <MousePointer2 className="h-4 w-4" />
            </Button>
            <Button
              variant={activeTool === "draw" ? "default" : "outline"}
              size="sm"
              onClick={() => handleToolClick("draw")}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant={activeTool === "rectangle" ? "default" : "outline"}
              size="sm"
              onClick={() => handleToolClick("rectangle")}
            >
              <Square className="h-4 w-4" />
            </Button>
            <Button
              variant={activeTool === "circle" ? "default" : "outline"}
              size="sm"
              onClick={() => handleToolClick("circle")}
            >
              <CircleIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={activeTool === "text" ? "default" : "outline"}
              size="sm"
              onClick={() => handleToolClick("text")}
            >
              <Type className="h-4 w-4" />
            </Button>
          </div>

          {/* Text Input for Text Tool */}
          {activeTool === "text" && (
            <div>
              <Label>Text to Add</Label>
              <Input
                value={textToAdd}
                onChange={(e) => setTextToAdd(e.target.value)}
                placeholder="Enter text"
                onKeyDown={(e) => e.key === "Enter" && handleToolClick("text")}
              />
            </div>
          )}

          <Separator />

          {/* Color Picker */}
          <div>
            <Label>Color</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                "#3b82f6",
                "#dc2626",
                "#16a34a",
                "#9333ea",
                "#ea580c",
                "#0891b2",
                "#65a30d",
                "#000000",
              ].map((color) => (
                <button
                  key={color}
                  className={`h-8 w-8 rounded border-2 ${activeColor === color ? "border-foreground" : "border-muted-foreground"}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setActiveColor(color)}
                />
              ))}
            </div>
            <Input
              type="color"
              value={activeColor}
              onChange={(e) => setActiveColor(e.target.value)}
              className="mt-2 h-8"
            />
          </div>

          {/* Brush Size for Drawing */}
          {activeTool === "draw" && (
            <div>
              <Label>Brush Size: {brushSize}px</Label>
              <input
                type="range"
                min="1"
                max="20"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="mt-1 w-full"
              />
            </div>
          )}

          <Separator />

          {/* Venue Elements */}
          <div>
            <Label className="text-sm font-medium">Venue Elements</Label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {venueElements.map((element) => (
                <Button
                  key={element.name}
                  variant="outline"
                  size="sm"
                  onClick={() => addVenueElement(element)}
                  className="flex h-auto flex-col items-center py-2 text-xs"
                >
                  <span className="text-lg">{element.icon}</span>
                  <span>{element.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleUndo}
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDeleteSelected}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleClear}
              className="w-full"
            >
              Clear Canvas
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="w-full"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Layout
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleExport}
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Image
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Canvas Area */}
      <div className="flex-1">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{floorName}</h3>
            <p className="text-muted-foreground text-sm">
              Design your venue layout
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={showGrid ? "default" : "outline"}
              size="sm"
              onClick={() => setShowGrid(!showGrid)}
            >
              <Grid3X3 className="h-4 w-4" />
              Grid
            </Button>
          </div>
        </div>

        <div className="border-border overflow-hidden rounded-lg border bg-white shadow-lg">
          <canvas
            ref={canvasRef}
            className="max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default VenueDrawingCanvas;
