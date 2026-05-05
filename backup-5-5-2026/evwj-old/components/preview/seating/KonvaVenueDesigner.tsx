"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import type {
  Chair,
  Guest,
  LayoutData,
  Table,
  VenueObject,
} from "@/types/venue";
import type Konva from "konva";
import type { KonvaEventObject } from "konva/lib/Node";
import {
  Armchair,
  Box,
  ChevronDown,
  Circle as CircleIcon,
  DoorOpen,
  Download,
  Grid3x3,
  Hand,
  Home,
  Layers,
  MousePointer2,
  Redo,
  RotateCcw,
  Rows3,
  Ruler,
  Save,
  Settings,
  Square,
  Store,
  Table as TableIconLucide,
  Trash2,
  Type,
  Undo,
  X,
  ZoomIn,
  ZoomOut,
  Users,
  ChevronLeft,
  ChevronRight,
  DollarSign,
} from "lucide-react";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Circle,
  Group,
  Layer,
  Line,
  Path,
  Rect,
  Stage,
  Text,
  Transformer,
} from "react-konva";

// New component imports

// ============================================================================
// TYPES
// ============================================================================

interface Wall {
  id: string;
  type: "exterior" | "interior" | "glass";
  points: number[]; // [x1, y1, x2, y2, ...]
  thickness: number;
  color: string;
}

interface Door {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  type: "single" | "double" | "sliding";
}

interface Window {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

interface ChairRow {
  id: string;
  name?: string;
  chairs: ChairInRow[];
  x: number;
  y: number;
  rotation: number;
  spacing: number;
  curved: boolean;
  curveRadius?: number;
  group?: string; // Group assignment (VIP, Family, etc.)
}

interface ChairInRow {
  id: string;
  offsetX: number;
  offsetY: number;
  rotation: number;
  guest?: any;
}

interface VenueTable {
  id: string;
  name: string;
  x: number;
  y: number;
  shape: "round" | "rectangular" | "square" | "booth";
  width: number;
  height: number;
  rotation: number;
  seats: number;
  color: string;
  seatAssignments: Record<number, any>;
  guests?: any[]; // Array of guests assigned to this table
  chairPositions?: Array<{ x: number; y: number; rotation: number }>; // Custom chair positions
  group?: string; // Group assignment (VIP, Family, etc.)
}

interface Section {
  id: string;
  name: string;
  points: number[];
  color: string;
  x: number;
  y: number;
  rotation: number;
  closed?: boolean;
  pricing?: {
    highestPrice: number;
    priceDifference: number;
    differenceType: "%" | "$";
  };
}

interface TableGroup {
  id: string;
  name: string;
  color: string;
}

interface VenueObjectItem {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  color: string;
}

interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  fill: string;
  fontStyle: string;
  align: string;
  rotation: number;
}

interface HistoryState {
  walls: Wall[];
  doors: Door[];
  windows: Window[];
  chairRows: ChairRow[];
  tables: VenueTable[];
  objects: VenueObjectItem[];
  textElements: TextElement[];
  sections: Section[];
}

type Tool =
  | "select"
  | "pan"
  | "wall"
  | "door"
  | "window"
  | "chair-row"
  | "chair-single"
  | "table"
  | "object"
  | "booth"
  | "text"
  | "draw"
  | "erase"
  | "section-add";

interface KonvaVenueDesignerProps {
  onSave?: (layout: LayoutData) => void;
  onExport?: () => void;
  initialLayout?: LayoutData;
  width?: number;
  height?: number;
  mode?: "design" | "seating"; // New prop: design mode for layout, seating mode for guest assignment
  viewMode?: "design" | "preview"; // Existing prop from parent
  // Seating mode props
  draggedGuest?: Partial<Guest> | null;
  onDropGuestToSeat?: (tableId: number, seatNumber: number) => void;
  onDropGuestToChair?: (chairId: number) => void;
  onUpdateTable?: (tableId: number, updates: Partial<Table>) => void;
  onUpdateChair?: (chairId: number, updates: Partial<Chair>) => void;
  // List of chairs from seating arrangement
  chairs?: Chair[];
  // Selection sync
  externalSelectedIds?: string[];
  onSelectIds?: (ids: string[]) => void;
  // Sidebar state
  sidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
  ticketMode?: boolean;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const GRID_SIZE = 20;
const SNAP_THRESHOLD = 10;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 3;

const WALL_COLORS = {
  exterior: "#1f2937",
  interior: "#6b7280",
  glass: "#3b82f6",
};

const WALL_THICKNESS = {
  exterior: 12,
  interior: 6,
  glass: 4,
};

const TABLE_COLORS = [
  "#f0f9ff",
  "#fef3c7",
  "#d1fae5",
  "#fce7f3",
  "#e0e7ff",
  "#f3e8ff",
];

const OBJECT_TYPES = [
  { type: "stage", name: "Stage", color: "#8b5cf6", icon: "🎭" },
  { type: "podium", name: "Podium", color: "#6366f1", icon: "🎤" },
  { type: "dancefloor", name: "Dance Floor", color: "#ec4899", icon: "💃" },
  { type: "bar", name: "Bar", color: "#f59e0b", icon: "🍸" },
  { type: "buffet", name: "Buffet", color: "#10b981", icon: "🍽️" },
  { type: "booth", name: "Vendor Booth", color: "#06b6d4", icon: "🏪" },
  { type: "tent", name: "Tent", color: "#84cc16", icon: "⛺" },
  { type: "exit", name: "Exit", color: "#ef4444", icon: "🚪" },
  { type: "restroom", name: "Restroom", color: "#64748b", icon: "🚻" },
  { type: "plant", name: "Plant/Decor", color: "#22c55e", icon: "🌿" },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const KonvaVenueDesigner = forwardRef<any, KonvaVenueDesignerProps>(
  (
    {
      onSave,
      onExport,
      initialLayout,
      width = 1200,
      height = 600,
      mode = "design",
      viewMode,
      draggedGuest,
      onDropGuestToSeat,
      onDropGuestToChair,
      onUpdateTable,
      onUpdateChair,
      chairs = [],
      externalSelectedIds,
      onSelectIds,
      sidebarCollapsed = false,
      onToggleSidebar,
      ticketMode = false,
    },
    ref,
  ) => {
    // Refs
    const stageRef = useRef<Konva.Stage>(null);
    const layerRef = useRef<Konva.Layer>(null);
    const transformerRef = useRef<Konva.Transformer>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Canvas state - responsive sizing
    const [stageSize, setStageSize] = useState({ width, height });
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Hover state for drag and drop highlighting
    const [hoveredSeatId, setHoveredSeatId] = useState<string | null>(null);

    // Responsive canvas sizing
    const updateSize = useCallback(() => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;

        setStageSize({
          width: containerWidth || width,
          height: containerHeight || height,
        });
      }
    }, [width, height]);

    useEffect(() => {
      let timeoutId: NodeJS.Timeout;

      const debouncedUpdate = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(updateSize, 150);
      };

      // Initial size
      updateSize();

      window.addEventListener("resize", debouncedUpdate);

      return () => {
        window.removeEventListener("resize", debouncedUpdate);
        clearTimeout(timeoutId);
      };
    }, [updateSize]);

    // Tool state
    const [currentTool, setCurrentTool] = useState<Tool>("select");
    const [wallType, setWallType] = useState<"exterior" | "interior" | "glass">(
      "interior",
    );
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    // Notify parent of internal selection changes
    const updateSelection = useCallback(
      (newIds: string[]) => {
        setSelectedIds(newIds);
        onSelectIds?.(newIds);
      },
      [onSelectIds],
    );

    // Sync external selection to internal state
    useEffect(() => {
      if (externalSelectedIds !== undefined) {
        updateSelection(externalSelectedIds);
      }
    }, [externalSelectedIds, updateSelection]);

    // Drawing state
    const [isDrawing, setIsDrawing] = useState(false);
    const [drawingPoints, setDrawingPoints] = useState<number[]>([]);
    const [dragStartPos, setDragStartPos] = useState<{
      x: number;
      y: number;
    } | null>(null);

    // Chair row creation state
    const [chairInteractionPhase, setChairInteractionPhase] = useState<number>(0); // 0: Idle, 1: Expanding, 2: Rotating
    const [chairRowPreview, setChairRowPreview] = useState<{
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      count: number;
      rowCount: number;
      dirY: number; // Stacking direction for rows
    } | null>(null);

    // Venue elements
    const [walls, setWalls] = useState<Wall[]>([]);
    const [doors, setDoors] = useState<Door[]>([]);
    const [windows, setWindows] = useState<Window[]>([]);
    const [chairRows, setChairRows] = useState<ChairRow[]>([]);
    const [tables, setTables] = useState<VenueTable[]>([]);
    const [objects, setObjects] = useState<VenueObjectItem[]>([]);
    const [textElements, setTextElements] = useState<TextElement[]>([]);

    // UI state
    const [showGrid, setShowGrid] = useState(true);
    const [showMeasurements, setShowMeasurements] = useState(true);
    const [snapToGrid, setSnapToGrid] = useState(true);

    // Section Configuration
    const [sections, setSections] = useState<Section[]>([]);
    const [sectionConfig, setSectionConfig] = useState({
      name: "Section",
      color: "#e2e8f0",
      width: 200,
      height: 200,
      rows: 4,
      cols: 4,
      seatSpacing: 40,
    });
    const [isCreatingSection, setIsCreatingSection] = useState(false);

    // Drawing lines state (for connected lines with measurements)
    const [drawingLines, setDrawingLines] = useState<
      Array<{
        id: string;
        points: number[]; // [x1, y1, x2, y2, ...]
      }>
    >([]);
    const [currentDrawingLine, setCurrentDrawingLine] = useState<{
      points: number[];
    } | null>(null);
    // Drawing section state (for polygon sections)
    const [currentDrawingSection, setCurrentDrawingSection] = useState<{
      points: number[];
    } | null>(null);

    // History for undo/redo
    const [history, setHistory] = useState<HistoryState[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    // Chair row configuration
    const [chairRowConfig, setChairRowConfig] = useState({
      spacing: 50,
      curved: false,
      curveRadius: 200,
      chairsPerRow: 10,
      multipleRows: 1,
      rowSpacing: 50,
    });

    // Table configuration
    const [tableConfig, setTableConfig] = useState({
      shape: "round" as "round" | "rectangular" | "square" | "booth",
      seats: 8,
      width: 70, // Auto-calculated for 8 seats round (reduced from 115)
      height: 70,
    });

    // Object configuration
    const [objectType, setObjectType] = useState("stage");

    // Text configuration
    const [textConfig, setTextConfig] = useState({
      fontSize: 16,
      fontFamily: "Arial",
      fill: "#ffffff",
      fontStyle: "normal",
      align: "left",
    });
    const [isEditingText, setIsEditingText] = useState(false);

    // Group management
    const [tableGroups, setTableGroups] = useState<TableGroup[]>([
      { id: "colleagues", name: "Colleagues", color: "#e0e7ff" },
      { id: "family", name: "Family", color: "#d1fae5" },
      { id: "friends", name: "Friends", color: "#dbeafe" },
      { id: "plus-ones", name: "Plus Ones", color: "#fed7aa" },
      { id: "vip", name: "VIP", color: "#fef3c7" },
    ]);

    // Settings drawer state
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [editingTableId, setEditingTableId] = useState<string | null>(null);
    const [isChairSettingsOpen, setIsChairSettingsOpen] = useState(false);
    const [editingChairRowId, setEditingChairRowId] = useState<string | null>(
      null,
    );

    // Multi-selection settings drawer state
    const [isMultiSettingsOpen, setIsMultiSettingsOpen] = useState(false);
    const [multiSelectionType, setMultiSelectionType] = useState<
      "chairs" | "tables" | "booths" | "sections" | "mixed" | null
    >(null);

    // Drag selection state
    const [selectionRect, setSelectionRect] = useState<{
      x: number;
      y: number;
      width: number;
      height: number;
    } | null>(null);
    const [isDragSelecting, setIsDragSelecting] = useState(false);

    // Text settings drawer
    const [isTextSettingsOpen, setIsTextSettingsOpen] = useState(false);
    const [editingTextElementId, setEditingTextElementId] = useState<
      string | null
    >(null);

    // Delete confirmation
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<{
      id: string;
      type: string;
      hasGuests?: boolean;
    } | null>(null);
    const [dontAskAgain, setDontAskAgain] = useState(false);
    const [isClearDrawingsDialogOpen, setIsClearDrawingsDialogOpen] =
      useState(false);

    // Inline text editing
    const [editingTextId, setEditingTextId] = useState<string | null>(null);
    const [editingTextValue, setEditingTextValue] = useState("");
    const textInputRef = useRef<HTMLInputElement>(null);

    // Track dragging state for floating buttons
    const [isDraggingItem, setIsDraggingItem] = useState(false);

    // Section settings drawer state
    const [isSectionSettingsOpen, setIsSectionSettingsOpen] = useState(false);
    const [editingSectionId, setEditingSectionId] = useState<string | null>(null);

    // ============================================================================
    // LOAD INITIAL LAYOUT
    // ============================================================================

    // Track the previous initialLayout to detect what changed
    const prevInitialLayoutRef = useRef<typeof initialLayout | null>(null);

    useEffect(() => {
      console.log(
        "KonvaVenueDesigner - Loading initial layout:",
        initialLayout,
      );

      if (!initialLayout) return;

      const prevLayout = prevInitialLayoutRef.current;

      // In seating mode, check if only seatAssignments changed (common case during guest assignment)
      if (mode === "seating" && prevLayout?.tables && initialLayout.tables) {
        const tablesCountSame =
          prevLayout.tables.length === initialLayout.tables.length;
        const chairsCountSame =
          (prevLayout.chairs?.length || 0) ===
          (initialLayout.chairs?.length || 0);
        const objectsCountSame =
          (prevLayout.venueObjects?.length || 0) ===
          (initialLayout.venueObjects?.length || 0);

        if (tablesCountSame && chairsCountSame && objectsCountSame) {
          console.log("Optimized update: Updating seat assignments and guests");

          // Update tables
          setTables((prevTables) => {
            return prevTables.map((venueTable) => {
              // Find matching table in initialLayout
              const tableIdNum = venueTable.id.replace("-table", "");
              const matchingTable = initialLayout.tables?.find(
                (t) => String(t.id) === tableIdNum,
              );

              if (matchingTable) {
                return {
                  ...venueTable,
                  seatAssignments: matchingTable.seatAssignments || {},
                  guests: matchingTable.guests || [],
                  // Sync dimensions and shape in case they changed in design mode
                  width: matchingTable.width || venueTable.width,
                  height: matchingTable.height || venueTable.height,
                  seats: matchingTable.seats || venueTable.seats,
                  shape: matchingTable.shape as any || venueTable.shape,
                };
              }
              return venueTable;
            });
          });

          // Update chair rows
          setChairRows((prevRows) => {
            return prevRows.map((row) => {
              let rowUpdated = false;
              const newChairs = row.chairs.map((chair) => {
                // Match by original numeric ID
                const originalId = parseInt(chair.id.split("-")[0]);
                const matchingChair = initialLayout.chairs?.find(
                  (c) => c.id === originalId,
                );

                if (matchingChair && matchingChair.guest !== chair.guest) {
                  rowUpdated = true;
                  return { ...chair, guest: matchingChair.guest };
                }
                return chair;
              });

              return rowUpdated ? { ...row, chairs: newChairs } : row;
            });
          });

          prevInitialLayoutRef.current = initialLayout;
          return; // Skip full reload
        }
      }

      // Full reload for design mode or when structure changed
      console.log("Full reload: Structure changed or design mode");

      // Load walls
      if (initialLayout.walls && initialLayout.walls.length > 0) {
        console.log("Loading walls:", initialLayout.walls.length);
        setWalls(initialLayout.walls);
      }

      // Load tables - convert from Table type to VenueTable type
      if (initialLayout.tables && initialLayout.tables.length > 0) {
        console.log("Loading tables:", initialLayout.tables.length);
        const convertedTables: VenueTable[] = initialLayout.tables.map((t) => {
          const dims = calculateTableDimensions(t.shape as any, t.seats || 8);
          return {
            id: `${t.id}-table`,
            name: t.name,
            shape: t.shape as "round" | "rectangular" | "square" | "booth",
            x: t.x,
            y: t.y,
            width: t.width || dims.width,
            height: t.height || dims.height,
            seats: t.seats || 8,
            rotation: t.rotation || 0,
            group: t.targetGroup, // Map targetGroup back to group
            color: "#f0f9ff", // Default color
            seatAssignments: t.seatAssignments || {}, // Include seat assignments
            guests: t.guests || [], // Include guests array
          };
        });
        console.log("Converted tables:", convertedTables);
        setTables(convertedTables);
      }

      // Load chairs - convert from Chair type to ChairRow type
      if (initialLayout.chairs && initialLayout.chairs.length > 0) {
        console.log("Loading chairs:", initialLayout.chairs.length);
        // Group chairs by gridId to recreate chair rows
        const chairsByGrid = initialLayout.chairs.reduce(
          (acc, chair) => {
            const gridId = chair.gridId || `chair-${chair.id}`;
            if (!acc[gridId]) {
              acc[gridId] = [];
            }
            acc[gridId].push(chair);
            return acc;
          },
          {} as Record<string, typeof initialLayout.chairs>,
        );

        const convertedChairRows: ChairRow[] = Object.entries(chairsByGrid).map(
          ([gridId, chairs]) => {
            // Calculate average position for the row
            const avgX =
              chairs.reduce((sum, c) => sum + c.x, 0) / chairs.length;
            const avgY =
              chairs.reduce((sum, c) => sum + c.y, 0) / chairs.length;
            const avgRotation =
              chairs.reduce((sum, c) => sum + (c.rotation || 0), 0) /
              chairs.length;

            return {
              id: gridId,
              name: chairs[0]?.name || "Chair Row",
              x: avgX,
              y: avgY,
              rotation: avgRotation,
              spacing: 50, // Default spacing
              curved: false, // Default not curved
              chairs: chairs.map((c, index) => ({
                id: `${c.id}-${index}`,
                offsetX: c.x - avgX,
                offsetY: c.y - avgY,
                rotation: (c.rotation || 0) - avgRotation,
                guest: c.guest, // Fix: Include guest property
              })),
              group: chairs[0]?.targetGroup, // Map targetGroup back to group
            };
          },
        );
        console.log("Converted chair rows:", convertedChairRows);
        setChairRows(convertedChairRows);
      }

      // Load venue objects
      if (initialLayout.venueObjects && initialLayout.venueObjects.length > 0) {
        console.log(
          "Loading venue objects:",
          initialLayout.venueObjects.length,
        );
        const convertedObjects: VenueObjectItem[] =
          initialLayout.venueObjects.map((o) => ({
            id: `${o.id}-object`,
            name: o.name,
            type: o.type,
            x: o.x,
            y: o.y,
            width: o.width,
            height: o.height,
            rotation: o.rotation || 0,
            color: o.color || "#e5e7eb",
          }));
        console.log("Converted objects:", convertedObjects);
        setObjects(convertedObjects);
      }

      // Load sections
      if (initialLayout.sections && initialLayout.sections.length > 0) {
        console.log("Loading sections:", initialLayout.sections.length);
        setSections(initialLayout.sections);
      }

      // Update the ref for next comparison
      prevInitialLayoutRef.current = initialLayout;
    }, [initialLayout, mode]);

    // ============================================================================
    // UTILITY FUNCTIONS
    // ============================================================================

    const snapToGridValue = useCallback(
      (value: number) => {
        if (!snapToGrid) return value;
        return Math.round(value / GRID_SIZE) * GRID_SIZE;
      },
      [snapToGrid],
    );
    const getPointerPosition = useCallback(() => {
      const stage = stageRef.current;
      if (!stage) return { x: 0, y: 0 };

      const pointerPos = stage.getPointerPosition();
      if (!pointerPos) return { x: 0, y: 0 };

      // Transform to account for stage position and scale
      return {
        x: (pointerPos.x - position.x) / scale,
        y: (pointerPos.y - position.y) / scale,
      };
    }, [position, scale]);

    const calculateTableDimensions = useCallback(
      (
        shape: "round" | "rectangular" | "square" | "booth",
        seats: number,
      ): { width: number; height: number } => {
        if (shape === "round") {
          // Reduced default size - increase size based on seat count
          const diameter = Math.max(50, 30 + seats * 5);
          return { width: diameter, height: diameter };
        } else if (shape === "rectangular" || shape === "square") {
          // Reduced default size - width increases with more seats, height stays relatively stable
          const width = Math.max(50, 25 + Math.ceil(seats / 2) * 20);
          const height = seats > 10 ? 70 : 50;
          return { width, height };
        } else if (shape === "booth") {
          return { width: 80, height: 80 };
        }
        return { width: 60, height: 60 };
      },
      [],
    );

    const generateId = () =>
      `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // ============================================================================
    // HISTORY MANAGEMENT
    // ============================================================================

    const saveToHistory = useCallback(() => {
      const state: HistoryState = {
        walls: JSON.parse(JSON.stringify(walls)),
        doors: JSON.parse(JSON.stringify(doors)),
        windows: JSON.parse(JSON.stringify(windows)),
        chairRows: JSON.parse(JSON.stringify(chairRows)),
        tables: JSON.parse(JSON.stringify(tables)),
        objects: JSON.parse(JSON.stringify(objects)),
        textElements: JSON.parse(JSON.stringify(textElements)),
        sections: JSON.parse(JSON.stringify(sections)),
      };

      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(state);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }, [
      walls,
      doors,
      windows,
      chairRows,
      tables,
      objects,
      textElements,
      sections,
      history,
      historyIndex,
    ]);

    const undo = useCallback(() => {
      if (historyIndex > 0) {
        const prevState = history[historyIndex - 1];
        setWalls(prevState.walls);
        setDoors(prevState.doors);
        setWindows(prevState.windows);
        setChairRows(prevState.chairRows);
        setTables(prevState.tables);
        setObjects(prevState.objects);
        setTextElements(prevState.textElements);
        setSections(prevState.sections);
        setHistoryIndex(historyIndex - 1);
      }
    }, [history, historyIndex]);

    const redo = useCallback(() => {
      if (historyIndex < history.length - 1) {
        const nextState = history[historyIndex + 1];
        setWalls(nextState.walls);
        setDoors(nextState.doors);
        setWindows(nextState.windows);
        setChairRows(nextState.chairRows);
        setTables(nextState.tables);
        setObjects(nextState.objects);
        setTextElements(nextState.textElements);
        setSections(nextState.sections);
        setHistoryIndex(historyIndex + 1);
      }
    }, [history, historyIndex]);

    // ============================================================================
    // EVENT HANDLERS
    // ============================================================================

    const handleStageMouseDown = useCallback(
      (e: KonvaEventObject<MouseEvent>) => {
        const pos = getPointerPosition();
        const snappedX = snapToGridValue(pos.x);
        const snappedY = snapToGridValue(pos.y);

        // Check if clicking on empty space
        const clickedOnEmpty = e.target === e.target.getStage();

        if (currentTool === "select") {
          if (clickedOnEmpty) {
            // Start drag selection
            if (!e.evt.shiftKey) {
              updateSelection([]);
            }
            setIsDragSelecting(true);
            setSelectionRect({
              x: pos.x,
              y: pos.y,
              width: 0,
              height: 0,
            });
          }
          return;
        }

        if (currentTool === "pan") {
          return; // Pan is handled by stage draggable
        }

        if (currentTool === "wall") {
          if (!isDrawing) {
            setIsDrawing(true);
            setDrawingPoints([snappedX, snappedY]);
          } else {
            // Add point to wall
            setDrawingPoints((prev) => [...prev, snappedX, snappedY]);
          }
          return;
        }

        if (currentTool === "door") {
          const newDoor: Door = {
            id: generateId(),
            x: snappedX - 30,
            y: snappedY - 5,
            width: 60,
            height: 10,
            rotation: 0,
            type: "single",
          };
          setDoors((prev) => [...prev, newDoor]);
          saveToHistory();
          return;
        }

        if (currentTool === "window") {
          const newWindow: Window = {
            id: generateId(),
            x: snappedX - 40,
            y: snappedY - 5,
            width: 80,
            height: 10,
            rotation: 0,
          };
          setWindows((prev) => [...prev, newWindow]);
          saveToHistory();
          return;
        }

        if (currentTool === "chair-row") {
          if (chairInteractionPhase === 0) {
            // Click 1: Start Preview (Set Anchor)
            setIsDrawing(true);
            setDragStartPos({ x: snappedX, y: snappedY });
            setChairRowPreview({
              startX: snappedX,
              startY: snappedY,
              endX: snappedX,
              endY: snappedY,
              count: 1,
              rowCount: 1,
              dirY: 1,
            });
            setChairInteractionPhase(1); // Move to baseline definition
          } else if (chairInteractionPhase === 1) {
            // Click 2: Lock baseline (width/angle) -> Start depth expansion
            setChairInteractionPhase(2);
          } else if (chairInteractionPhase === 2 && chairRowPreview) {
            // Click 3: Lock depth and commit
            const dx = chairRowPreview.endX - chairRowPreview.startX;
            const dy = chairRowPreview.endY - chairRowPreview.startY;
            const angle = Math.atan2(dy, dx);
            const count = chairRowPreview.count;
            const rowCount = chairRowPreview.rowCount || 1;

            if (count > 0 && rowCount > 0) {
              const newRows: ChairRow[] = [];
              const dirY = chairRowPreview.dirY || 1;

              for (
                let rowIndex = 0;
                rowIndex < rowCount;
                rowIndex++
              ) {
                const rowOffset = rowIndex * chairRowConfig.rowSpacing * dirY;
                // Currently Phase 2 rotates the WHOLE block.
                // We need to calculate the top-left of each row properly relative to the anchor (which is now top-left of block maybe?)
                // Actually, if we use Phase 2 for rotation, we assume the user rotated the "Vector" from Start to End.

                // Let's assume Start is Top-Left.
                // Angle is rotation of the whole block.
                const perpAngle = angle + Math.PI / 2;

                // If we want the rows to stack "down", it's usually +90deg from the line.
                const rowStartX =
                  chairRowPreview.startX + Math.cos(perpAngle) * rowOffset;
                const rowStartY =
                  chairRowPreview.startY + Math.sin(perpAngle) * rowOffset;

                const chairs: ChairInRow[] = [];
                for (let i = 0; i < count; i++) {
                  chairs.push({
                    id: generateId(),
                    offsetX: i * chairRowConfig.spacing,
                    offsetY: 0,
                    rotation: 0,
                  });
                }

                newRows.push({
                  id: generateId(),
                  name: `Chair Row ${chairRows.length + newRows.length + 1}`,
                  chairs,
                  x: rowStartX,
                  y: rowStartY,
                  rotation: (angle * 180) / Math.PI,
                  spacing: chairRowConfig.spacing,
                  curved: chairRowConfig.curved,
                  curveRadius: chairRowConfig.curveRadius,
                  group: undefined,
                });
              }

              setChairRows((prev) => [...prev, ...newRows]);
              saveToHistory();
            }

            // Reset Interaction
            setChairInteractionPhase(0);
            setChairRowPreview(null);
            setDragStartPos(null);
            setIsDrawing(false);
          }
          return;
        }

        if (currentTool === "chair-single") {
          const newChairRow: ChairRow = {
            id: generateId(),
            name: `Chair ${chairRows.length + 1}`,
            chairs: [
              {
                id: generateId(),
                offsetX: 0,
                offsetY: 0,
                rotation: 0,
              },
            ],
            x: snappedX,
            y: snappedY,
            rotation: 0,
            spacing: 50,
            curved: false,
            group: undefined,
          };
          setChairRows((prev) => [...prev, newChairRow]);
          saveToHistory();
          return;
        }

        if (currentTool === "table") {
          const newTable: VenueTable = {
            id: generateId(),
            name: `Table ${tables.length + 1}`,
            x: snappedX,
            y: snappedY,
            shape: tableConfig.shape,
            width: tableConfig.width,
            height: tableConfig.height,
            rotation: 0,
            seats: tableConfig.seats,
            color: "#ffffff", // White for unassigned
            seatAssignments: {},
            group: undefined, // Unassigned
          };
          setTables((prev) => [...prev, newTable]);
          saveToHistory();
          return;
        }

        if (currentTool === "object") {
          const objType = OBJECT_TYPES.find((o) => o.type === objectType);
          const newObject: VenueObjectItem = {
            id: generateId(),
            name: objType?.name || "Object",
            type: objectType,
            x: snappedX,
            y: snappedY,
            width: 150,
            height: 100,
            rotation: 0,
            color: objType?.color || "#6b7280",
          };
          setObjects((prev) => [...prev, newObject]);
          saveToHistory();
          return;
        }

        if (currentTool === "booth") {
          const newBooth: VenueTable = {
            id: generateId(),
            name: `Booth ${tables.filter((t) => t.shape === "booth").length + 1}`,
            x: snappedX,
            y: snappedY,
            shape: "booth",
            width: 120,
            height: 80,
            rotation: 0,
            seats: 4,
            color: "#ffffff", // White for unassigned
            seatAssignments: {},
            group: undefined, // Unassigned
          };
          setTables((prev) => [...prev, newBooth]);
          saveToHistory();
          return;
        }

        if (currentTool === "section-add") {
          if (!currentDrawingSection) {
            // Start new section polygon with first point
            setCurrentDrawingSection({
              points: [snappedX, snappedY, snappedX, snappedY], // Start with two points for preview
            });
          } else {
            // Add a confirmed point and start preview for next point
            const currentPoints = currentDrawingSection.points;
            // Replace the preview point with the clicked point, and add a new preview point
            const newPoints = [
              ...currentPoints.slice(0, -2),
              snappedX,
              snappedY,
              snappedX,
              snappedY,
            ];
            setCurrentDrawingSection({
              points: newPoints,
            });
          }
          return;
        }

        if (currentTool === "draw") {
          if (!currentDrawingLine) {
            // Start new connected line with first point
            setCurrentDrawingLine({
              points: [snappedX, snappedY, snappedX, snappedY], // Start with two points for preview
            });
          } else {
            // Add a confirmed point and start preview for next point
            const currentPoints = currentDrawingLine.points;
            // Replace the preview point with the clicked point, and add a new preview point
            const newPoints = [
              ...currentPoints.slice(0, -2),
              snappedX,
              snappedY,
              snappedX,
              snappedY,
            ];
            setCurrentDrawingLine({
              points: newPoints,
            });
          }
          return;
        }

        if (currentTool === "text") {
          const newTextId = generateId();
          const newText: TextElement = {
            id: newTextId,
            text: "Text",
            x: snappedX,
            y: snappedY,
            fontSize: textConfig.fontSize,
            fontFamily: textConfig.fontFamily,
            fill: textConfig.fill,
            fontStyle: textConfig.fontStyle,
            align: textConfig.align,
            rotation: 0,
          };
          setTextElements((prev) => [...prev, newText]);
          // Start editing immediately
          setEditingTextId(newTextId);
          setEditingTextValue("Text");
          setTimeout(() => {
            if (textInputRef.current) {
              textInputRef.current.focus();
              textInputRef.current.select();
            }
          }, 10);
          saveToHistory();
          return;
        }
      },
      [
        currentTool,
        isDrawing,
        currentDrawingLine,
        currentDrawingSection,
        getPointerPosition,
        snapToGridValue,
        saveToHistory,
        chairInteractionPhase,
        chairRowPreview,
        chairRowConfig,
        chairRows.length,
        tableConfig,
        tables.length,
        objectType,
        objects.length,
        textElements.length,
        sections.length,
        ticketMode,
        isDragSelecting,
        selectionRect,
      ],
    );

    const handleStageMouseMove = useCallback(
      (e: KonvaEventObject<MouseEvent>) => {
        const pos = getPointerPosition();
        const snappedX = snapToGridValue(pos.x);
        const snappedY = snapToGridValue(pos.y);

        // Handle drag selection
        if (isDragSelecting && selectionRect) {
          setSelectionRect({
            x: selectionRect.x,
            y: selectionRect.y,
            width: pos.x - selectionRect.x,
            height: pos.y - selectionRect.y,
          });
          return;
        }

        // Update drawing line preview
        if (
          currentTool === "draw" &&
          currentDrawingLine &&
          currentDrawingLine.points.length >= 2
        ) {
          setCurrentDrawingLine((prev) => {
            const newPoints = [
              ...prev!.points.slice(0, -2),
              snappedX,
              snappedY,
            ];
            return { points: newPoints };
          });
        }

        // Update section drawing preview
        if (
          currentTool === "section-add" &&
          currentDrawingSection &&
          currentDrawingSection.points.length >= 2
        ) {
          setCurrentDrawingSection((prev) => {
            const newPoints = [
              ...prev!.points.slice(0, -2),
              snappedX,
              snappedY,
            ];
            return { points: newPoints };
          });
        }

        if (!isDrawing) return;

        if (currentTool === "wall" && drawingPoints.length >= 2) {
          // Update last point for preview
          setDrawingPoints((prev) => {
            const newPoints = [...prev];
            newPoints[newPoints.length - 2] = snappedX;
            newPoints[newPoints.length - 1] = snappedY;
            return newPoints;
          });
        }

        if (currentTool === "chair-row" && dragStartPos) {
          if (chairInteractionPhase === 1) {
            // Phase 1: Define Baseline (Width and Angle)
            const dx = snappedX - dragStartPos.x;
            const dy = snappedY - dragStartPos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Calculate columns based on distance
            const cols = Math.max(1, Math.floor(distance / chairRowConfig.spacing) + 1);
            const angle = Math.atan2(dy, dx);
            const fixedLength = (cols > 1) ? (cols - 1) * chairRowConfig.spacing : 0;

            setChairRowPreview({
              startX: dragStartPos.x,
              startY: dragStartPos.y,
              endX: dragStartPos.x + Math.cos(angle) * fixedLength,
              endY: dragStartPos.y + Math.sin(angle) * fixedLength,
              count: cols,
              rowCount: 1, // Start with one row
              dirY: 1,
            });
          } else if (chairInteractionPhase === 2) {
            // Phase 2: Expand Depth (Perpendicular to baseline)
            setChairRowPreview((prev) => {
              if (!prev) return null;

              const dx = prev.endX - prev.startX;
              const dy = prev.endY - prev.startY;
              const angle = Math.atan2(dy, dx);
              const perpAngle = angle + Math.PI / 2;

              // Current mouse vector from anchor
              const mdx = snappedX - dragStartPos.x;
              const mdy = snappedY - dragStartPos.y;

              // Project mouse vector onto perpendicular unit vector to get depth
              const perpUnitX = Math.cos(perpAngle);
              const perpUnitY = Math.sin(perpAngle);
              const depth = mdx * perpUnitX + mdy * perpUnitY;

              const rows = Math.max(1, Math.floor(Math.abs(depth) / chairRowConfig.rowSpacing) + 1);

              return {
                ...prev,
                rowCount: rows,
                dirY: Math.sign(depth) || 1,
              };
            });
          }
        }
      },
      [
        isDrawing,
        currentTool,
        currentDrawingLine,
        currentDrawingSection,
        drawingPoints,
        dragStartPos,
        getPointerPosition,
        snapToGridValue,
        chairInteractionPhase,
        chairRowPreview,
        chairRowConfig,
        isDragSelecting,
        selectionRect,
      ],
    );

    const handleStageMouseUp = useCallback(() => {
      // Handle drag selection completion
      if (isDragSelecting && selectionRect) {
        // Calculate normalized rectangle (handle negative width/height)
        const x1 = Math.min(
          selectionRect.x,
          selectionRect.x + selectionRect.width,
        );
        const y1 = Math.min(
          selectionRect.y,
          selectionRect.y + selectionRect.height,
        );
        const x2 = Math.max(
          selectionRect.x,
          selectionRect.x + selectionRect.width,
        );
        const y2 = Math.max(
          selectionRect.y,
          selectionRect.y + selectionRect.height,
        );

        // Find all items within selection rectangle
        const newSelectedIds: string[] = [];

        // Check chair rows
        chairRows.forEach((row) => {
          if (row.x >= x1 && row.x <= x2 && row.y >= y1 && row.y <= y2) {
            newSelectedIds.push(row.id);
          }
        });

        // Check tables and booths
        tables.forEach((table) => {
          if (
            table.x >= x1 &&
            table.x <= x2 &&
            table.y >= y1 &&
            table.y <= y2
          ) {
            newSelectedIds.push(table.id);
          }
        });

        // Check objects
        objects.forEach((obj) => {
          if (obj.x >= x1 && obj.x <= x2 && obj.y >= y1 && obj.y <= y2) {
            newSelectedIds.push(obj.id);
          }
        });

        updateSelection(newSelectedIds);
        setIsDragSelecting(false);
        setSelectionRect(null);
        return;
      }

      // NOTE: Chair row commit is now handled in handleStageMouseDown (Click 3)
      // to support the Multi-Click interaction model.
      // Drag selection end logic remains above this block.
    }, [
      currentTool,
      chairRowPreview,
      dragStartPos,
      chairRowConfig,
      saveToHistory,
      isDragSelecting,
      selectionRect,
      chairRows,
      tables,
      objects,
      updateSelection,
    ]);

    // Handle keyboard shortcuts
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        // Escape to finish wall drawing or finish drawing line
        if (e.key === "Escape") {
          // Finish drawing line and save it
          if (
            currentTool === "draw" &&
            currentDrawingLine &&
            currentDrawingLine.points.length >= 4
          ) {
            const newDrawingLine = {
              id: generateId(),
              points: currentDrawingLine.points.slice(0, -2), // Remove the last preview point
            };
            setDrawingLines((prev) => [...prev, newDrawingLine]);
            setCurrentDrawingLine(null);
            saveToHistory();
            return;
          }

          // Clear current drawing line if it exists but isn't long enough
          if (currentTool === "draw" && currentDrawingLine) {
            setCurrentDrawingLine(null);
            return;
          }

          // Finish drawing section and save it as polygon
          if (
            currentTool === "section-add" &&
            currentDrawingSection &&
            currentDrawingSection.points.length >= 6 // At least 3 points (6 numbers)
          ) {
            const sectionNumber = sections.length + 1;
            const absolutePoints = currentDrawingSection.points.slice(0, -2); // Remove preview point

            // Calculate centroid to use as x, y anchor
            const centroid = getCentroid(absolutePoints);

            // Make points relative to centroid
            const relativePoints = absolutePoints.map((p, i) =>
              i % 2 === 0 ? p - centroid.x : p - centroid.y
            );

            const newSection: Section = {
              id: generateId(),
              name: `Section ${sectionNumber}`,
              points: relativePoints,
              x: centroid.x,
              y: centroid.y,
              rotation: 0,
              color: sectionConfig.color,
              closed: true,
              pricing: {
                highestPrice: 100, // Default start
                priceDifference: 10,
                differenceType: "$",
              },
            };
            setSections((prev) => [...prev, newSection]);
            setCurrentDrawingSection(null);
            setCurrentTool("select"); // Switch to select tool
            saveToHistory();
            return;
          }

          // Clear current section drawing if it exists but isn't long enough
          if (currentTool === "section-add" && currentDrawingSection) {
            setCurrentDrawingSection(null);
            return;
          }

          if (currentTool === "chair-row" && chairInteractionPhase > 0) {
            // Do NOT reset phase on MouseUp for 3-click interaction
            // Only reset if we want to cancel? No, cancellation is ESC.
            // Just finish the drag-selection/interaction logic if any.
            setIsDrawing(false);
            return;
          }

          if (
            isDrawing &&
            currentTool === "wall" &&
            drawingPoints.length >= 4
          ) {
            // Finish wall
            const newWall: Wall = {
              id: generateId(),
              type: wallType,
              points: drawingPoints,
              thickness: WALL_THICKNESS[wallType],
              color: WALL_COLORS[wallType],
            };
            setWalls((prev) => [...prev, newWall]);
            saveToHistory();
          }

          setIsDrawing(false);
          setDrawingPoints([]);
          setChairRowPreview(null);
          setDragStartPos(null);
          setChairInteractionPhase(0); // Ensure phase is reset on cancellation
          return;
        }

        // Enter to close wall as room
        if (e.key === "Enter" && isDrawing && currentTool === "wall") {
          if (drawingPoints.length >= 6) {
            // Close the shape
            const closedPoints = [
              ...drawingPoints,
              drawingPoints[0],
              drawingPoints[1],
            ];
            const newWall: Wall = {
              id: generateId(),
              type: wallType,
              points: closedPoints,
              thickness: WALL_THICKNESS[wallType],
              color: WALL_COLORS[wallType],
            };
            setWalls((prev) => [...prev, newWall]);
            saveToHistory();
          }
          setIsDrawing(false);
          setDrawingPoints([]);
          return;
        }

        // Keyboard deletion disabled - use delete button instead
        // This prevents accidental deletions while typing or navigating

        // Undo/Redo
        if ((e.ctrlKey || e.metaKey) && e.key === "z") {
          e.preventDefault();
          if (e.shiftKey) {
            redo();
          } else {
            undo();
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [
      isDrawing,
      currentTool,
      drawingPoints,
      currentDrawingLine,
      wallType,
      selectedIds,
      saveToHistory,
      undo,
      redo,
      currentDrawingSection,
      sections.length,
    ]);

    // Handle zoom
    const handleWheel = useCallback(
      (e: KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();

        const stage = stageRef.current;
        if (!stage) return;

        const oldScale = scale;
        const pointer = stage.getPointerPosition();
        if (!pointer) return;

        const mousePointTo = {
          x: (pointer.x - position.x) / oldScale,
          y: (pointer.y - position.y) / oldScale,
        };

        const direction = e.evt.deltaY > 0 ? -1 : 1;

        // Calculate a dynamic minimum zoom that ensures canvas stays visible
        // Prevent zooming out beyond the point where canvas would be smaller than viewport
        const minZoomX = stageSize.width / (stageSize.width * 2);
        const minZoomY = stageSize.height / (stageSize.height * 2);
        const dynamicMinZoom = Math.max(
          MIN_ZOOM,
          Math.max(minZoomX, minZoomY),
          0.5,
        );

        const newScale = Math.min(
          MAX_ZOOM,
          Math.max(dynamicMinZoom, oldScale + direction * 0.1),
        );

        // Only update if scale actually changed
        if (newScale === oldScale) return;

        const newPos = {
          x: pointer.x - mousePointTo.x * newScale,
          y: pointer.y - mousePointTo.y * newScale,
        };

        // Constrain position to keep canvas visible
        // Relaxed constraints to prevent objects from disappearing
        const padding = 50;
        const newX = newPos.x;
        const newY = newPos.y;

        setScale(newScale);
        setPosition({ x: newX, y: newY });
      },
      [scale, position, stageSize],
    );

    // ============================================================================
    // GEOMETRIC HELPERS
    // ============================================================================

    const getCentroid = useCallback((points: number[]) => {
      if (!points || points.length < 2) return { x: 0, y: 0 };
      let x = 0;
      let y = 0;
      const pointCount = points.length / 2;
      for (let i = 0; i < points.length; i += 2) {
        x += points[i];
        y += points[i + 1];
      }
      return { x: x / pointCount, y: y / pointCount };
    }, []);

    const isPointInPolygon = useCallback((x: number, y: number, points: number[]) => {
      let isInside = false;
      const pointCount = points.length / 2;
      for (let i = 0, j = pointCount - 1; i < pointCount; j = i++) {
        const xi = points[i * 2], yi = points[i * 2 + 1];
        const xj = points[j * 2], yj = points[j * 2 + 1];

        const intersect = ((yi > y) !== (yj > y)) &&
          (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) isInside = !isInside;
      }
      return isInside;
    }, []);

    const rotatePoint = useCallback((x: number, y: number, cx: number, cy: number, angleDegrees: number) => {
      const angleRad = (angleDegrees * Math.PI) / 180;
      const cos = Math.cos(angleRad);
      const sin = Math.sin(angleRad);
      const nx = cos * (x - cx) - sin * (y - cy) + cx;
      const ny = sin * (x - cx) + cos * (y - cy) + cy;
      return { x: nx, y: ny };
    }, []);

    // ============================================================================
    // SELECTION HANDLING
    // ============================================================================

    const handleSelect = useCallback(
      (id: string, e: KonvaEventObject<MouseEvent>) => {
        if (currentTool !== "select") return;

        e.cancelBubble = true;

        const transformer = transformerRef.current;
        if (!transformer) return;

        let newSelection = [id];

        // If selecting a section, auto-select all items inside it for real-time interaction
        const section = sections.find(s => s.id === id);
        if (section) {
          // Transform relative points to absolute for PIP check
          const absPoints: number[] = [];
          for (let i = 0; i < section.points.length; i += 2) {
            const rotated = rotatePoint(section.points[i], section.points[i + 1], 0, 0, section.rotation);
            absPoints.push(rotated.x + section.x, rotated.y + section.y);
          }

          // Find chairs
          chairRows.forEach(row => {
            const rad = (row.rotation * Math.PI) / 180;
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);
            const isInside = row.chairs.some(chair => {
              const gx = row.x + chair.offsetX * cos - chair.offsetY * sin;
              const gy = row.y + chair.offsetX * sin + chair.offsetY * cos;
              return isPointInPolygon(gx, gy, absPoints);
            });
            if (isInside) newSelection.push(row.id);
          });

          // Find tables
          tables.forEach(t => {
            if (isPointInPolygon(t.x, t.y, absPoints)) newSelection.push(t.id);
          });

          // Find objects
          objects.forEach(o => {
            if (isPointInPolygon(o.x, o.y, absPoints)) newSelection.push(o.id);
          });
        }

        if (e.evt.shiftKey) {
          // Multi-select merge
          updateSelection(Array.from(new Set([...selectedIds, ...newSelection])));
        } else {
          updateSelection(newSelection);
        }
      },
      [currentTool, selectedIds, updateSelection, sections, chairRows, tables, objects, rotatePoint, isPointInPolygon],
    );

    // Update transformer when selection changes
    useEffect(() => {
      const transformer = transformerRef.current;
      const stage = stageRef.current;
      if (!transformer || !stage) return;

      const nodes = selectedIds
        .map((id) => stage.findOne(`#${id}`))
        .filter(Boolean) as Konva.Node[];

      transformer.nodes(nodes);

      // Disable resizing for chairs (both standalone chair rows and table/booth chairs)
      const hasChairs = selectedIds.some(
        (id) =>
          chairRows.some((row) => row.id === id) || id.includes("-chair-"),
      );

      const hasSections = selectedIds.some(
        (id) => sections.some((s) => s.id === id)
      );

      if (hasChairs && !hasSections) {
        // Only allow rotation and movement for chairs, no resizing
        transformer.enabledAnchors([]);
        transformer.rotateEnabled(true);
      } else {
        // Full transform capabilities for other elements
        transformer.enabledAnchors([
          "top-left",
          "top-right",
          "bottom-left",
          "bottom-right",
          "middle-left",
          "middle-right",
          "top-center",
          "bottom-center",
        ]);
        transformer.rotateEnabled(true);
      }

      transformer.getLayer()?.batchDraw();
    }, [selectedIds, chairRows]);

    // ============================================================================
    // ELEMENT UPDATE HANDLERS
    // ============================================================================

    const handleDragEnd = useCallback(
      (type: string, id: string, e: KonvaEventObject<DragEvent>) => {
        const node = e.target;
        const x = snapToGridValue(node.x());
        const y = snapToGridValue(node.y());

        switch (type) {
          case "door":
            setDoors((prev) =>
              prev.map((d) => (d.id === id ? { ...d, x, y } : d)),
            );
            break;
          case "window":
            setWindows((prev) =>
              prev.map((w) => (w.id === id ? { ...w, x, y } : w)),
            );
            break;
          case "chairRow":
            setChairRows((prev) =>
              prev.map((c) => (c.id === id ? { ...c, x, y } : c)),
            );
            break;
          case "table":
            setTables((prev) =>
              prev.map((t) => (t.id === id ? { ...t, x, y } : t)),
            );
            break;
          case "object":
            setObjects((prev) =>
              prev.map((o) => (o.id === id ? { ...o, x, y } : o)),
            );
            break;
          case "section":
            setSections((prev) =>
              prev.map((s) => (s.id === id ? { ...s, x, y } : s)),
            );
            break;
          case "text":
            setTextElements((prev) =>
              prev.map((txt) => (txt.id === id ? { ...txt, x, y } : txt)),
            );
            break;
        }
        saveToHistory();
      },
      [snapToGridValue, saveToHistory],
    );

    const handleTransformEnd = useCallback(
      (type: string, id: string, e: KonvaEventObject<Event>) => {
        const node = e.target;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        const rotation = node.rotation();

        // Get original dimensions from state (Groups don't have width/height)
        let originalWidth = 100;
        let originalHeight = 100;
        let originalFontSize = 16;

        switch (type) {
          case "door": {
            const door = doors.find((d) => d.id === id);
            if (door) {
              originalWidth = door.width;
              originalHeight = door.height;
            }
            break;
          }
          case "window": {
            const win = windows.find((w) => w.id === id);
            if (win) {
              originalWidth = win.width;
              originalHeight = win.height;
            }
            break;
          }
          case "table": {
            const table = tables.find((t) => t.id === id);
            if (table) {
              originalWidth = table.width;
              originalHeight = table.height;
            }
            break;
          }
          case "object": {
            const obj = objects.find((o) => o.id === id);
            if (obj) {
              originalWidth = obj.width;
              originalHeight = obj.height;
            }
            break;
          }
          case "text": {
            const txt = textElements.find((t) => t.id === id);
            if (txt) {
              originalFontSize = txt.fontSize;
            }
            break;
          }
        }

        // Calculate new dimensions
        const newWidth = Math.max(20, Math.abs(originalWidth * scaleX));
        const newHeight = Math.max(20, Math.abs(originalHeight * scaleY));
        const newFontSize = Math.max(8, Math.abs(originalFontSize * scaleY));

        // Calculate scale ratios for proportional chair scaling
        const scaleRatioX = newWidth / originalWidth;
        const scaleRatioY = newHeight / originalHeight;
        // Use average scale ratio for uniform scaling
        const scaleRatio = (scaleRatioX + scaleRatioY) / 2;

        // Reset scale on node
        node.scaleX(1);
        node.scaleY(1);

        const updates = {
          x: snapToGridValue(node.x()),
          y: snapToGridValue(node.y()),
          rotation: rotation,
          width: newWidth,
          height: newHeight,
          fontSize: newFontSize,
        };

        switch (type) {
          case "door":
            setDoors((prev) =>
              prev.map((d) => (d.id === id ? { ...d, ...updates } : d)),
            );
            break;
          case "window":
            setWindows((prev) =>
              prev.map((w) => (w.id === id ? { ...w, ...updates } : w)),
            );
            break;
          case "chairRow":
            setChairRows((prev) =>
              prev.map((c) =>
                c.id === id
                  ? {
                    ...c,
                    x: updates.x,
                    y: updates.y,
                    rotation: updates.rotation,
                    chairs: c.chairs.map((chair) => ({
                      ...chair,
                      offsetX: chair.offsetX * scaleX,
                      offsetY: chair.offsetY * scaleY,
                    })),
                  }
                  : c,
              ),
            );
            break;
          case "table":
            setTables((prev) =>
              prev.map((t) => {
                if (t.id !== id) return t;

                // If table has custom chair positions, scale them proportionally
                let scaledChairPositions = t.chairPositions;
                if (scaledChairPositions && scaledChairPositions.length > 0) {
                  scaledChairPositions = scaledChairPositions.map((pos) => ({
                    x: pos.x * scaleRatio,
                    y: pos.y * scaleRatio,
                    rotation: pos.rotation, // Rotation doesn't change
                  }));
                }

                return {
                  ...t,
                  ...updates,
                  chairPositions: scaledChairPositions,
                };
              }),
            );
            break;
          case "object":
            setObjects((prev) =>
              prev.map((o) => (o.id === id ? { ...o, ...updates } : o)),
            );
            break;
          case "section":
            setSections((prev) =>
              prev.map((s) =>
                s.id === id
                  ? {
                    ...s,
                    x: updates.x,
                    y: updates.y,
                    rotation: updates.rotation,
                    points: s.points.map((p, i) =>
                      i % 2 === 0 ? p * scaleX : p * scaleY,
                    ),
                  }
                  : s,
              ),
            );
            break;
          case "text":
            setTextElements((prev) =>
              prev.map((txt) =>
                txt.id === id
                  ? {
                    ...txt,
                    x: updates.x,
                    y: updates.y,
                    rotation: updates.rotation,
                    fontSize: updates.fontSize || txt.fontSize,
                  }
                  : txt,
              ),
            );
            break;
        }
        saveToHistory();
      },
      [doors, windows, tables, objects, snapToGridValue, saveToHistory],
    );

    // ============================================================================
    // RENDER HELPERS
    // ============================================================================

    // Calculate how many chairs are inside a section
    const getSectionChairCount = useCallback((section: Section) => {
      let count = 0;

      // Transform relative points to absolute for PIP check
      const absPoints: number[] = [];
      for (let i = 0; i < section.points.length; i += 2) {
        const rotated = rotatePoint(section.points[i], section.points[i + 1], 0, 0, section.rotation);
        absPoints.push(rotated.x + section.x, rotated.y + section.y);
      }

      // 1. Check standalone chair rows
      chairRows.forEach(row => {
        const rad = (row.rotation * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);

        row.chairs.forEach(chair => {
          const globalX = row.x + chair.offsetX * cos - chair.offsetY * sin;
          const globalY = row.y + chair.offsetX * sin + chair.offsetY * cos;

          if (isPointInPolygon(globalX, globalY, absPoints)) {
            count++;
          }
        });
      });

      // 2. Check chairs in tables/booths
      tables.forEach(table => {
        if (isPointInPolygon(table.x, table.y, absPoints)) {
          count += table.seats;
        }
      });

      return count;
    }, [chairRows, tables, rotatePoint, isPointInPolygon]);

    // Calculate dynamic pricing for a section
    // Returns a map of seatId -> price
    const calculateSectionPricing = useCallback((section: Section): Map<string, number> => {
      const pricingMap = new Map<string, number>();
      if (!section.pricing) return pricingMap;

      const { highestPrice, priceDifference, differenceType } = section.pricing;

      // 1. Gather all chairs inside the section with their absolute positions
      const chairs: Array<{ id: string; x: number; y: number }> = [];
      const absPoints: number[] = [];

      // Get section absolute boundary
      for (let i = 0; i < section.points.length; i += 2) {
        const rotated = rotatePoint(section.points[i], section.points[i + 1], 0, 0, section.rotation);
        absPoints.push(rotated.x + section.x, rotated.y + section.y);
      }

      // Collect standalone chairs
      chairRows.forEach(row => {
        const rad = (row.rotation * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);

        row.chairs.forEach((chair, index) => {
          const globalX = row.x + chair.offsetX * cos - chair.offsetY * sin;
          const globalY = row.y + chair.offsetX * sin + chair.offsetY * cos;
          if (isPointInPolygon(globalX, globalY, absPoints)) {
            // Create a unique ID for individual seat in a row
            chairs.push({ id: `${row.id}-${index}`, x: globalX, y: globalY });
          }
        });
      });

      // Collect table seats (approximate as table center for simplicity, or specific if positions known)
      tables.forEach(table => {
        if (isPointInPolygon(table.x, table.y, absPoints)) {
          // For tables, we usually price per table or per seat. 
          // If we treat them as individual seats, we need positions.
          // Using simplified logic: entire table gets same price based on table center Y
          // But to be precise, we need per-seat.
          if (table.chairPositions) {
            const rad = (table.rotation || 0) * Math.PI / 180;
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);
            table.chairPositions.forEach((pos, index) => {
              const gx = table.x + pos.x * cos - pos.y * sin;
              const gy = table.y + pos.x * sin + pos.y * cos;
              chairs.push({ id: `${table.id}-${index}`, x: gx, y: gy });
            });
          } else {
            // Fallback for simple shapes without positions
            for (let i = 0; i < table.seats; i++) {
              chairs.push({ id: `${table.id}-${i}`, x: table.x, y: table.y });
            }
          }
        }
      });

      if (chairs.length === 0) return pricingMap;

      // 2. Transform positions to Local Section Space (un-rotate)
      // We only care about Y relative to section rotation to determine "depth".
      // Assuming Section Points[0] or bounding box top is "Front".
      // Actually, we can just rotate the point by -section.rotation.

      const localChairs = chairs.map(c => {
        // Rotate around section center (section.x, section.y) by -section.rotation
        const local = rotatePoint(c.x, c.y, section.x, section.y, -section.rotation);
        return { ...c, localY: local.y };
      });

      // 3. Group into Rows
      // Sort by local Y
      localChairs.sort((a, b) => a.localY - b.localY);

      const rows: Array<typeof localChairs> = [];
      if (localChairs.length > 0) {
        let currentRow = [localChairs[0]];
        let rowY = localChairs[0].localY;
        const tolerance = 20; // 20px tolerance for a "visual row"

        for (let i = 1; i < localChairs.length; i++) {
          if (Math.abs(localChairs[i].localY - rowY) < tolerance) {
            currentRow.push(localChairs[i]);
          } else {
            rows.push(currentRow);
            currentRow = [localChairs[i]];
            rowY = localChairs[i].localY;
          }
        }
        rows.push(currentRow);
      }

      // 4. Assign Prices
      rows.forEach((row, rowIndex) => {
        // Invert: Highest price is at the BACK (last row)
        // So we subtract the difference based on how far we are from the LAST row index.
        const multiplier = rows.length - 1 - rowIndex;

        let price = highestPrice;
        if (multiplier > 0) {
          if (differenceType === "$") {
            price = highestPrice - (multiplier * priceDifference);
          } else {
            price = highestPrice * (1 - (multiplier * (priceDifference / 100)));
          }
        }
        // Prevent negative prices
        price = Math.max(0, Math.round(price * 100) / 100);

        row.forEach(c => {
          pricingMap.set(c.id, price);
        });
      });

      return pricingMap;
    }, [chairRows, tables, rotatePoint, isPointInPolygon]);


    // Calculate total seats in a selection of IDs
    const getSelectionSeatCount = useCallback((ids: string[]) => {
      let count = 0;
      ids.forEach(id => {
        const row = chairRows.find(r => r.id === id);
        if (row) {
          count += row.chairs.length;
        }
        const table = tables.find(t => t.id === id);
        if (table) {
          count += table.seats;
        }
      });
      return count;
    }, [chairRows, tables]);

    // NEW: Memoize global pricing map for rendering tags
    const allSeatPrices = useMemo(() => {
      const map = new Map<string, number>();
      if (!ticketMode) return map; // Only relevant in ticket mode

      sections.forEach(section => {
        if (section.pricing) {
          const sectionPrices = calculateSectionPricing(section);
          sectionPrices.forEach((price, id) => map.set(id, price));
        }
      });
      return map;
    }, [sections, ticketMode, calculateSectionPricing]);


    // ============================================================================
    // RENDER HELPERS
    // ============================================================================

    // Reusable Chair Icon Component
    const ChairIcon = ({
      fill = "#f3f4f6",
      stroke = "#9ca3af",
      strokeWidth = 1.5,
      showNumber = false,
      number = "",
    }: {
      fill?: string;
      stroke?: string;
      strokeWidth?: number;
      showNumber?: boolean;
      number?: string;
    }) => {
      // Scale factor to make chairs smaller (70% of original size)
      const scale = 0.7;

      return (
        <Group>
          {/* Chair back - tall backrest */}
          <Rect
            x={-12 * scale}
            y={-20 * scale}
            width={24 * scale}
            height={12 * scale}
            fill="#d1d5db"
            stroke={stroke}
            strokeWidth={strokeWidth}
            cornerRadius={3 * scale}
          />
          {/* Chair back support posts */}
          <Rect
            x={-10 * scale}
            y={-10 * scale}
            width={3 * scale}
            height={8 * scale}
            fill="#9ca3af"
            stroke={stroke}
            strokeWidth={0.5}
          />
          <Rect
            x={7 * scale}
            y={-10 * scale}
            width={3 * scale}
            height={8 * scale}
            fill="#9ca3af"
            stroke={stroke}
            strokeWidth={0.5}
          />
          {/* Chair seat - main sitting area */}
          <Rect
            x={-14 * scale}
            y={-4 * scale}
            width={28 * scale}
            height={22 * scale}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            cornerRadius={4 * scale}
          />
          {/* Chair seat cushion detail */}
          <Rect
            x={-11 * scale}
            y={-1 * scale}
            width={22 * scale}
            height={16 * scale}
            fill={fill}
            stroke={stroke}
            strokeWidth={0.5}
            cornerRadius={2 * scale}
            opacity={0.7}
          />
          {/* Chair legs - front left */}
          <Rect
            x={-12 * scale}
            y={16 * scale}
            width={4 * scale}
            height={8 * scale}
            fill="#6b7280"
            stroke={stroke}
            strokeWidth={0.5}
            cornerRadius={1 * scale}
          />
          {/* Chair legs - front right */}
          <Rect
            x={8 * scale}
            y={16 * scale}
            width={4 * scale}
            height={8 * scale}
            fill="#6b7280"
            stroke={stroke}
            strokeWidth={0.5}
            cornerRadius={1 * scale}
          />
          {/* Chair legs - back left */}
          <Rect
            x={-12 * scale}
            y={-2 * scale}
            width={4 * scale}
            height={6 * scale}
            fill="#6b7280"
            stroke={stroke}
            strokeWidth={0.5}
            cornerRadius={1 * scale}
          />
          {/* Chair legs - back right */}
          <Rect
            x={8 * scale}
            y={-2 * scale}
            width={4 * scale}
            height={6 * scale}
            fill="#6b7280"
            stroke={stroke}
            strokeWidth={0.5}
            cornerRadius={1 * scale}
          />
          {/* Seat number */}
          {showNumber && (
            <Text
              text={number}
              x={-14 * scale}
              y={-4 * scale}
              width={28 * scale}
              height={22 * scale}
              fontSize={7}
              fontStyle="bold"
              fill="#374151"
              align="center"
              verticalAlign="middle"
            />
          )}
        </Group>
      );
    };

    // Reusable Door Icon Component
    const DoorIcon = ({
      width,
      height,
      isSelected = false,
    }: {
      width: number;
      height: number;
      isSelected?: boolean;
    }) => (
      <Group>
        {/* Door frame - outer */}
        <Rect
          width={width}
          height={height}
          fill="#78350f"
          stroke={isSelected ? "#3b82f6" : "#451a03"}
          strokeWidth={isSelected ? 3 : 2}
          cornerRadius={3}
        />
        {/* Door panel - main door surface */}
        <Rect
          x={height * 0.3}
          y={height * 0.3}
          width={width - height * 0.6}
          height={height * 0.4}
          fill="#92400e"
          stroke="#78350f"
          strokeWidth={1}
          cornerRadius={2}
        />
        {/* Door handle */}
        <Circle
          x={width - height * 0.5}
          y={height / 2}
          radius={height * 0.25}
          fill="#fbbf24"
          stroke="#f59e0b"
          strokeWidth={1}
        />
        {/* Door handle detail */}
        <Circle
          x={width - height * 0.5}
          y={height / 2}
          radius={height * 0.15}
          fill="#fcd34d"
          stroke="#f59e0b"
          strokeWidth={0.5}
        />
        {/* Door panels - decorative */}
        <Rect
          x={height * 0.4}
          y={height * 0.15}
          width={width - height * 0.8}
          height={height * 0.25}
          fill="transparent"
          stroke="#78350f"
          strokeWidth={1.5}
          cornerRadius={2}
        />
        <Rect
          x={height * 0.4}
          y={height * 0.6}
          width={width - height * 0.8}
          height={height * 0.25}
          fill="transparent"
          stroke="#78350f"
          strokeWidth={1.5}
          cornerRadius={2}
        />
        {/* Door swing arc indicator */}
        <Path
          data={`M 0 0 Q ${width * 0.7} ${-width * 0.5} ${width * 0.8} ${-width * 0.8}`}
          stroke="#f59e0b"
          strokeWidth={1.5}
          dash={[4, 4]}
          opacity={0.7}
        />
      </Group>
    );

    // Reusable Window Icon Component
    const WindowIcon = ({
      width,
      height,
      isSelected = false,
    }: {
      width: number;
      height: number;
      isSelected?: boolean;
    }) => {
      const frameThickness = Math.min(height * 0.15, 4);
      const glassInset = frameThickness;
      const mullionWidth = Math.max(2, height * 0.08);

      return (
        <Group>
          {/* Window frame - outer frame */}
          <Rect
            width={width}
            height={height}
            fill="#1e3a8a"
            stroke={isSelected ? "#3b82f6" : "#1e40af"}
            strokeWidth={isSelected ? 3 : 2.5}
            cornerRadius={2}
          />

          {/* Large glass area - much more visible */}
          <Rect
            x={glassInset}
            y={glassInset}
            width={width - glassInset * 2}
            height={height - glassInset * 2}
            fill="#dbeafe"
            stroke="#93c5fd"
            strokeWidth={0.5}
            opacity={0.75}
            cornerRadius={1}
          />

          {/* Glass shine effect - larger and more prominent */}
          <Rect
            x={glassInset + 2}
            y={glassInset + 2}
            width={(width - glassInset * 2) * 0.5}
            height={(height - glassInset * 2) * 0.25}
            fill="#ffffff"
            opacity={0.6}
            cornerRadius={2}
          />

          {/* Secondary shine */}
          <Rect
            x={width - glassInset - (width - glassInset * 2) * 0.3}
            y={height - glassInset - (height - glassInset * 2) * 0.2}
            width={(width - glassInset * 2) * 0.25}
            height={(height - glassInset * 2) * 0.15}
            fill="#ffffff"
            opacity={0.4}
            cornerRadius={1}
          />

          {/* Window divider - vertical mullion (thinner) */}
          <Rect
            x={width / 2 - mullionWidth / 2}
            y={glassInset}
            width={mullionWidth}
            height={height - glassInset * 2}
            fill="#1e40af"
            stroke="#1e3a8a"
            strokeWidth={0.5}
          />

          {/* Window divider - horizontal mullion (thinner) */}
          <Rect
            x={glassInset}
            y={height / 2 - mullionWidth / 2}
            width={width - glassInset * 2}
            height={mullionWidth}
            fill="#1e40af"
            stroke="#1e3a8a"
            strokeWidth={0.5}
          />

          {/* Glass pane reflections in each quadrant */}
          <Line
            points={[
              glassInset + 3,
              glassInset + 3,
              width / 2 - mullionWidth,
              glassInset + 3,
            ]}
            stroke="#ffffff"
            strokeWidth={1}
            opacity={0.3}
          />
          <Line
            points={[
              width / 2 + mullionWidth,
              glassInset + 3,
              width - glassInset - 3,
              glassInset + 3,
            ]}
            stroke="#ffffff"
            strokeWidth={1}
            opacity={0.3}
          />
        </Group>
      );
    };

    const renderGrid = useMemo(() => {
      if (!showGrid) return null;

      const lines = [];

      // Calculate the visible area in canvas coordinates
      const startX = Math.floor(-position.x / scale / GRID_SIZE) * GRID_SIZE;
      const endX =
        Math.ceil((stageSize.width - position.x) / scale / GRID_SIZE) *
        GRID_SIZE;
      const startY = Math.floor(-position.y / scale / GRID_SIZE) * GRID_SIZE;
      const endY =
        Math.ceil((stageSize.height - position.y) / scale / GRID_SIZE) *
        GRID_SIZE;

      // Vertical lines
      for (let x = startX; x <= endX; x += GRID_SIZE) {
        lines.push(
          <Line
            key={`v-${x}`}
            points={[x, startY, x, endY]}
            stroke="#e5e7eb"
            strokeWidth={0.5}
          />,
        );
      }

      // Horizontal lines
      for (let y = startY; y <= endY; y += GRID_SIZE) {
        lines.push(
          <Line
            key={`h-${y}`}
            points={[startX, y, endX, y]}
            stroke="#e5e7eb"
            strokeWidth={0.5}
          />,
        );
      }

      return lines;
    }, [showGrid, stageSize, scale, position]);

    const renderChairRow = useCallback(
      (row: ChairRow) => {
        const chairs = row.chairs.map((chair, index) => {
          const chairX = chair.offsetX;
          const chairY = chair.offsetY;

          return (
            <Group
              key={chair.id}
              x={chairX}
              y={chairY}
              rotation={chair.rotation}
            >
              <ChairIcon
                fill="#f3f4f6"
                stroke="#9ca3af"
                strokeWidth={1.5}
                showNumber={true}
                number={String(index + 1)}
              />
            </Group>
          );
        });

        return (
          <Group
            key={row.id}
            id={row.id}
            x={row.x}
            y={row.y}
            rotation={row.rotation}
            draggable={mode === "design" && currentTool === "select"}
            onClick={(e) => handleSelect(row.id, e)}
            onDragStart={() => setIsDraggingItem(true)}
            onDragEnd={(e) => {
              setIsDraggingItem(false);
              handleDragEnd("chairRow", row.id, e);
            }}
            onTransformEnd={(e) => handleTransformEnd("chairRow", row.id, e)}
          >
            {chairs}

            {/* Price Tag (Ticket Mode) */}
            {ticketMode && row.chairs.length > 0 && allSeatPrices.get(`${row.id}-0`) !== undefined && (
              <Group
                x={0}
                y={-25}
              // Counter-rotate to keep text horizontal if needed, but relative to row is usually best for association
              // rotation={-row.rotation} 
              >
                <Rect
                  x={-20}
                  y={-10}
                  width={40}
                  height={20}
                  fill="#10b981"
                  stroke="#059669"
                  strokeWidth={1}
                  cornerRadius={4}
                  shadowColor="black"
                  shadowBlur={2}
                  shadowOpacity={0.1}
                />
                <Text
                  x={-20}
                  y={-10}
                  width={40}
                  height={20}
                  text={`$${allSeatPrices.get(`${row.id}-0`)}`}
                  fill="white"
                  fontSize={11}
                  fontStyle="bold"
                  align="center"
                  verticalAlign="middle"
                />
              </Group>
            )}
          </Group>
        );
      },
      [currentTool, handleSelect, handleDragEnd, handleTransformEnd, mode],
    );

    // Render individual chairs from seating arrangement
    const renderIndividualChair = useCallback(
      (chair: Chair, index: number) => {
        // Use index to ensure unique key even if chair.id is duplicated
        const chairId = `chair-${chair.id}-${index}`;
        const uniqueKey = `individual-chair-${chair.id}-${index}`;
        const isSelected = selectedIds.includes(chairId);
        const isOccupied = !!chair.guest;
        const isHovered = hoveredSeatId === chairId;
        const isDropTarget =
          mode === "seating" && draggedGuest && !isOccupied && isHovered;

        return (
          <Group
            key={uniqueKey}
            id={chairId}
            name="chair-group"
            chairId={chair.id}
            x={chair.x}
            y={chair.y}
            rotation={chair.rotation || 0}
            draggable={mode === "design" && currentTool === "select"}
            onClick={(e) => {
              e.cancelBubble = true;
              // In seating mode, clicking a chair with a dragged guest triggers assignment
              if (mode === "seating" && draggedGuest && !isOccupied) {
                console.log(
                  "🎯 Individual chair clicked! Chair ID:",
                  chair.id,
                  "Guest:",
                  draggedGuest,
                );
                onDropGuestToChair?.(parseInt(String(chair.id)));
                setHoveredSeatId(null);
              } else {
                handleSelect(chairId, e);
              }
            }}
            onMouseEnter={() => {
              if (mode === "seating" && draggedGuest && !isOccupied) {
                console.log("🟡 Hovering over individual chair:", chairId);
                setHoveredSeatId(chairId);
              }
            }}
            onMouseLeave={() => {
              if (hoveredSeatId === chairId) {
                console.log("⚪ Left individual chair:", chairId);
                setHoveredSeatId(null);
              }
            }}
            onDragStart={() => setIsDraggingItem(true)}
            onDragEnd={(e) => {
              setIsDraggingItem(false);
              const node = e.target;
              const x = node.x();
              const y = node.y();
              onUpdateChair?.(chair.id, { x, y });
              saveToHistory();
            }}
            onTransformEnd={(e) => {
              const node = e.target as any;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();
              const rotation = node.rotation();

              node.scaleX(1);
              node.scaleY(1);

              onUpdateChair?.(chair.id, { rotation });
              saveToHistory();
            }}
          >
            <ChairIcon
              fill={
                isDropTarget
                  ? "#fef08a" // Yellow highlight when hovering with dragged guest
                  : isOccupied
                    ? "#86efac" // Green when occupied
                    : "#f3f4f6" // Gray when empty
              }
              stroke={
                isDropTarget ? "#facc15" : isSelected ? "#3b82f6" : "#9ca3af"
              }
              strokeWidth={isSelected || isDropTarget ? 2 : 1.5}
              showNumber={false}
              number=""
            />

            {/* Guest Avatar/Name - Show if chair is occupied */}
            {chair.guest &&
              (() => {
                const guest = chair.guest;
                const initials =
                  guest.initials ||
                  guest.name?.substring(0, 2).toUpperCase() ||
                  "??";
                const avatarColor = guest.avatarColor || "#3b82f6";

                return (
                  <>
                    {/* Avatar Circle */}
                    <Circle
                      x={0}
                      y={-5}
                      radius={12}
                      fill={avatarColor}
                      stroke="#ffffff"
                      strokeWidth={1.5}
                    />

                    {/* Initials */}
                    <Text
                      text={initials}
                      x={0}
                      y={-5}
                      fontSize={10}
                      fontStyle="bold"
                      fill="#ffffff"
                      align="center"
                      verticalAlign="middle"
                      width={24}
                      offsetX={12}
                    />

                    {/* Guest Name Below */}
                    <Text
                      text={guest.name}
                      x={0}
                      y={12}
                      fontSize={8}
                      fill="#374151"
                      align="center"
                      width={60}
                      offsetX={30}
                      wrap="none"
                      ellipsis={true}
                    />
                  </>
                );
              })()}

            {/* Chair Name/Label */}
            {mode === "design" && (
              <Text
                text={chair.name}
                x={0}
                y={20}
                fontSize={8}
                fill="#6b7280"
                align="center"
                width={60}
                offsetX={30}
              />
            )}
          </Group>
        );
      },
      [
        mode,
        currentTool,
        selectedIds,
        draggedGuest,
        hoveredSeatId,
        handleSelect,
        onDropGuestToChair,
        onUpdateChair,
        saveToHistory,
      ],
    );

    const handleChairDragEnd = useCallback(
      (tableId: string, chairIndex: number, e: KonvaEventObject<DragEvent>) => {
        const node = e.target;
        let x = node.x();
        let y = node.y();

        // Constrain chair movement to stay within reasonable distance from table
        const maxDistance = 150; // Maximum distance from table center
        const distance = Math.sqrt(x * x + y * y);

        if (distance > maxDistance) {
          // Clamp to max distance
          const angle = Math.atan2(y, x);
          x = Math.cos(angle) * maxDistance;
          y = Math.sin(angle) * maxDistance;
        }

        setTables((prev) =>
          prev.map((t) => {
            if (t.id !== tableId) return t;

            // Initialize chairPositions if not exists
            if (!t.chairPositions) {
              // Create default positions
              const defaultPositions = Array.from({ length: t.seats }).map(
                (_, i) => {
                  const angle = (i / t.seats) * Math.PI * 2 - Math.PI / 2;
                  const seatRadius = t.width / 2 + 30;
                  return {
                    x: Math.cos(angle) * seatRadius,
                    y: Math.sin(angle) * seatRadius,
                    rotation: (angle * 180) / Math.PI + 90,
                  };
                },
              );
              t.chairPositions = defaultPositions;
            }

            // Calculate rotation to face the table
            const angleToTable = Math.atan2(y, x);
            const rotation = (angleToTable * 180) / Math.PI + 90;

            // Update specific chair position
            const newPositions = [...t.chairPositions];
            newPositions[chairIndex] = {
              x,
              y,
              rotation,
            };

            return { ...t, chairPositions: newPositions };
          }),
        );
        saveToHistory();
      },
      [saveToHistory],
    );

    const renderTable = useCallback(
      (table: VenueTable) => {
        const isSelected = selectedIds.includes(table.id);

        // Calculate chair positions dynamically based on current table size
        const calculateChairPositions = () => {
          const positions = [];
          // Scale chair padding proportionally with table size
          // Base padding is 20, scales with table size
          const basePadding = 20;
          const tableSizeFactor = Math.min(table.width, table.height) / 50; // Normalize to base size
          const chairPadding = basePadding * Math.max(0.8, Math.min(1.5, tableSizeFactor));

          if (table.shape === "round") {
            // Round table - chairs in a circle
            for (let i = 0; i < table.seats; i++) {
              const angle = (i / table.seats) * Math.PI * 2 - Math.PI / 2;
              const seatRadius = table.width / 2 + chairPadding;
              positions.push({
                x: Math.cos(angle) * seatRadius,
                y: Math.sin(angle) * seatRadius,
                rotation: (angle * 180) / Math.PI + 90,
              });
            }
          } else if (table.shape === "rectangular" || table.shape === "square") {
            // New logic: Only Top and Bottom sides
            const width = table.width;
            const height = table.height;
            const totalSeats = table.seats;

            // Split seats between Top and Bottom
            // If odd, put more on Top
            const topSeats = Math.ceil(totalSeats / 2);
            const bottomSeats = Math.floor(totalSeats / 2);

            // Top side (Left to Right)
            for (let i = 0; i < topSeats; i++) {
              // Distribute evenly along width
              // -width/2 to +width/2
              // x = -width/2 + (width / (count + 1)) * (i + 1)
              const x = -width / 2 + (width / (topSeats + 1)) * (i + 1);
              const y = -height / 2 - chairPadding;
              positions.push({ x, y, rotation: 0 });
            }

            // Bottom side (Right to Left to match traditional seating numbering often going clockwise/counter-clockwise,
            // or just Left to Right effectively, but rotated)
            // Let's do Standard Left to Right (visual) but on bottom
            for (let i = 0; i < bottomSeats; i++) {
              // Note: If we want them visually aligned, we can use same formula but y is positive
              // If we want "around the table" flow, order might differ, but visual placement is key here.
              // Let's place them Left to Right relative to the screen
              const x = -width / 2 + (width / (bottomSeats + 1)) * (i + 1); // Same distribution
              const y = height / 2 + chairPadding;
              positions.push({ x, y, rotation: 180 });
            }

          } else {
            // Booth tables (legacy logic) - chairs around perimeter
            const width = table.width;
            const height = table.height;
            const totalSeats = table.seats;

            // Distribute chairs around the perimeter
            const perimeter = 2 * (width + height);
            const longSides = width > height ? 2 : height > width ? 0 : 1;
            const shortSides = width > height ? 0 : height > width ? 2 : 1;

            // Calculate seats per side proportionally
            const seatsOnLongSide = Math.ceil(totalSeats * 0.4); // 40% on long sides
            // ... (rest of legacy logic remains if truly needed for booths, or simplified)
            // For now, retaining a simplified version of the previous perimeter logic for Booths

            // Re-implementing the original comprehensive perimeter logic just for booths/fallback
            const seatsOnShortSide = Math.floor(
              (totalSeats - seatsOnLongSide * longSides) / (2 + shortSides),
            );

            let seatIndex = 0;

            // Top side
            const topSeats =
              width >= height ? seatsOnLongSide : seatsOnShortSide;
            for (let i = 0; i < topSeats && seatIndex < totalSeats; i++) {
              const x = -width / 2 + (width / (topSeats + 1)) * (i + 1);
              const y = -height / 2 - chairPadding;
              positions.push({ x, y, rotation: 0 });
              seatIndex++;
            }

            // Right side
            const rightSeats =
              height > width ? seatsOnLongSide : seatsOnShortSide;
            for (let i = 0; i < rightSeats && seatIndex < totalSeats; i++) {
              const x = width / 2 + chairPadding;
              const y = -height / 2 + (height / (rightSeats + 1)) * (i + 1);
              positions.push({ x, y, rotation: 90 });
              seatIndex++;
            }

            // Bottom side
            const bottomSeats =
              width >= height ? seatsOnLongSide : seatsOnShortSide;
            for (let i = 0; i < bottomSeats && seatIndex < totalSeats; i++) {
              const x = width / 2 - (width / (bottomSeats + 1)) * (i + 1);
              const y = height / 2 + chairPadding;
              positions.push({ x, y, rotation: 180 });
              seatIndex++;
            }

            // Left side
            const leftSeats =
              height > width ? seatsOnLongSide : seatsOnShortSide;
            for (let i = 0; i < leftSeats && seatIndex < totalSeats; i++) {
              const x = -width / 2 - chairPadding;
              const y = height / 2 - (height / (leftSeats + 1)) * (i + 1);
              positions.push({ x, y, rotation: 270 });
              seatIndex++;
            }

            // If we still have seats left, distribute them evenly
            while (seatIndex < totalSeats) {
              const side = seatIndex % 4;
              if (side === 0) {
                const x = 0;
                const y = -height / 2 - chairPadding;
                positions.push({ x, y, rotation: 0 });
              } else if (side === 1) {
                const x = width / 2 + chairPadding;
                const y = 0;
                positions.push({ x, y, rotation: 90 });
              } else if (side === 2) {
                const x = 0;
                const y = height / 2 + chairPadding;
                positions.push({ x, y, rotation: 180 });
              } else {
                const x = -width / 2 - chairPadding;
                const y = 0;
                positions.push({ x, y, rotation: 270 });
              }
              seatIndex++;
            }
          }

          return positions;
        };

        // Use custom positions if manually adjusted, otherwise calculate
        const chairPositions =
          table.chairPositions || calculateChairPositions();

        return (
          <Group
            key={table.id}
            id={table.id}
            x={table.x}
            y={table.y}
            rotation={table.rotation}
            draggable={mode === "design" && currentTool === "select"}
            onClick={(e) => handleSelect(table.id, e)}
            onDragStart={() => setIsDraggingItem(true)}
            onDragEnd={(e) => {
              setIsDraggingItem(false);
              handleDragEnd("table", table.id, e);
            }}
            onTransformEnd={(e) => handleTransformEnd("table", table.id, e)}
          >
            {/* Table shape */}
            {table.shape === "round" ? (
              <Circle
                radius={table.width / 2}
                fill={table.color}
                stroke={isSelected ? "#3b82f6" : "#000000"}
                strokeWidth={isSelected ? 4 : 2}
                shadowColor={isSelected ? "#3b82f6" : undefined}
                shadowBlur={isSelected ? 10 : 0}
                shadowOpacity={isSelected ? 0.5 : 0}
              />
            ) : table.shape === "booth" ? (
              <Rect
                width={table.width}
                height={table.height}
                offsetX={table.width / 2}
                offsetY={table.height / 2}
                fill={table.color}
                stroke={isSelected ? "#3b82f6" : "#000000"}
                strokeWidth={isSelected ? 4 : 2}
                cornerRadius={8}
                shadowColor={isSelected ? "#3b82f6" : undefined}
                shadowBlur={isSelected ? 10 : 0}
                shadowOpacity={isSelected ? 0.5 : 0}
              />
            ) : (
              <Rect
                width={table.width}
                height={table.height}
                offsetX={table.width / 2}
                offsetY={table.height / 2}
                fill={table.color}
                stroke={isSelected ? "#3b82f6" : "#000000"}
                strokeWidth={isSelected ? 4 : 2}
                cornerRadius={table.shape === "rectangular" ? 4 : 0}
                shadowColor={isSelected ? "#3b82f6" : undefined}
                shadowBlur={isSelected ? 10 : 0}
                shadowOpacity={isSelected ? 0.5 : 0}
              />
            )}

            {/* Table name */}
            <Text
              text={table.name}
              fontSize={12}
              fontStyle="bold"
              fill="#374151"
              align="center"
              verticalAlign="middle"
              width={table.width}
              offsetX={table.width / 2}
              y={table.group ? -20 : -10}
            />

            {/* Group name below table name */}
            {table.group &&
              (() => {
                const groupInfo = tableGroups.find((g) => g.id === table.group);
                return groupInfo ? (
                  <Text
                    text={groupInfo.name}
                    fontSize={10}
                    fill="#000000"
                    fontStyle="bold"
                    align="center"
                    verticalAlign="middle"
                    width={table.width}
                    offsetX={table.width / 2}
                    y={-5}
                  />
                ) : null;
              })()}

            {/* Seat count */}
            <Text
              text={`${table.seats} seats`}
              fontSize={10}
              fill="#6b7280"
              align="center"
              verticalAlign="middle"
              width={table.width}
              offsetX={table.width / 2}
              y={table.group ? 10 : 5}
            />

            {/* Render draggable chairs around table */}
            {chairPositions.map((chairPos, i) => {
              const chairId = `${table.id}-chair-${i}`;
              const seatId = `${table.id}-seat-${i}`;
              const seatNumber = i + 1; // Seats are 1-indexed in seatAssignments
              const isChairSelected = selectedIds.includes(chairId);
              const isOccupied = !!table.seatAssignments?.[seatNumber];
              const isHovered = hoveredSeatId === seatId;
              const isDropTarget =
                mode === "seating" && draggedGuest && !isOccupied && isHovered;

              return (
                <Group
                  key={chairId}
                  id={chairId}
                  name="seat-group"
                  tableId={table.id}
                  seatNumber={seatNumber}
                  seatId={seatId}
                  x={chairPos.x}
                  y={chairPos.y}
                  rotation={chairPos.rotation}
                  draggable={mode === "design" && currentTool === "select"}
                  onClick={(e) => {
                    e.cancelBubble = true;
                    // In seating mode, clicking a chair with a guest can trigger assignment
                    if (mode === "seating" && draggedGuest && !isOccupied) {
                      console.log(
                        "🎯 Seat clicked! Table ID:",
                        table.id,
                        "Seat Number:",
                        seatNumber,
                        "Guest:",
                        draggedGuest,
                      );
                      onDropGuestToSeat?.(parseInt(String(table.id)), seatNumber);
                      setHoveredSeatId(null);
                    } else {
                      handleSelect(chairId, e);
                    }
                  }}
                  onMouseEnter={() => {
                    if (mode === "seating" && draggedGuest && !isOccupied) {
                      console.log(
                        "🟡 Hovering over seat:",
                        seatId,
                        "Table:",
                        table.id,
                        "Seat#:",
                        seatNumber,
                      );
                      setHoveredSeatId(seatId);
                    }
                  }}
                  onMouseLeave={() => {
                    if (hoveredSeatId === seatId) {
                      console.log("⚪ Left seat:", seatId);
                      setHoveredSeatId(null);
                    }
                  }}
                  onDragEnd={(e) => {
                    e.cancelBubble = true;
                    handleChairDragEnd(table.id, i, e);
                  }}
                  dragBoundFunc={(pos) => {
                    // Constrain chair movement relative to table position
                    const dx = pos.x - table.x;
                    const dy = pos.y - table.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const maxDistance = 150;

                    if (distance > maxDistance) {
                      const angle = Math.atan2(dy, dx);
                      return {
                        x: table.x + Math.cos(angle) * maxDistance,
                        y: table.y + Math.sin(angle) * maxDistance,
                      };
                    }
                    return pos;
                  }}
                >
                  <ChairIcon
                    fill={
                      isDropTarget
                        ? "#fef08a" // Yellow highlight when hovering with dragged guest
                        : isOccupied
                          ? "#86efac" // Green when occupied
                          : "#f3f4f6" // Gray when empty
                    }
                    stroke={
                      isDropTarget
                        ? "#facc15"
                        : isChairSelected
                          ? "#3b82f6"
                          : "#9ca3af"
                    }
                    strokeWidth={isChairSelected || isDropTarget ? 2 : 1.5}
                    showNumber={!isOccupied}
                    number={String(i + 1)}
                  />

                  {/* Guest Avatar/Name - Show if seat is assigned */}
                  {table.seatAssignments?.[seatNumber] &&
                    (() => {
                      const guest = table.seatAssignments[seatNumber];
                      const initials =
                        guest.initials ||
                        guest.name?.substring(0, 2).toUpperCase() ||
                        "??";
                      const avatarColor = guest.avatarColor || "#3b82f6";

                      return (
                        <>
                          {/* Avatar Circle */}
                          <Circle
                            x={0}
                            y={-5}
                            radius={12}
                            fill={avatarColor}
                            stroke="#ffffff"
                            strokeWidth={2}
                          />
                          {/* Initials */}
                          <Text
                            text={initials}
                            x={0}
                            y={-5}
                            fontSize={10}
                            fontStyle="bold"
                            fill="#ffffff"
                            align="center"
                            verticalAlign="middle"
                            offsetX={initials.length * 3}
                            offsetY={5}
                          />
                          {/* Guest Name - Always visible in seating mode */}
                          {guest.name && mode === "seating" && (
                            <Text
                              text={guest.name}
                              x={0}
                              y={15}
                              fontSize={8}
                              fill="#ffffff"
                              align="center"
                              verticalAlign="top"
                              offsetX={guest.name.length * 2.5}
                            />
                          )}
                        </>
                      );
                    })()}
                </Group>
              );
            })}
          </Group>
        );
      },
      [
        currentTool,
        selectedIds,
        handleSelect,
        handleDragEnd,
        handleTransformEnd,
        handleChairDragEnd,
        tableGroups,
        mode,
        draggedGuest,
        onDropGuestToSeat,
        hoveredSeatId,
      ],
    );

    const renderObject = useCallback(
      (obj: VenueObjectItem) => {
        const isSelected = selectedIds.includes(obj.id);
        const objType = OBJECT_TYPES.find((o) => o.type === obj.type);

        return (
          <Group
            key={obj.id}
            id={obj.id}
            x={obj.x}
            y={obj.y}
            rotation={obj.rotation}
            draggable={currentTool === "select"}
            onClick={(e) => handleSelect(obj.id, e)}
            onDragStart={() => setIsDraggingItem(true)}
            onDragEnd={(e) => {
              setIsDraggingItem(false);
              handleDragEnd("object", obj.id, e);
            }}
            onTransformEnd={(e) => handleTransformEnd("object", obj.id, e)}
          >
            <Rect
              width={obj.width}
              height={obj.height}
              offsetX={obj.width / 2}
              offsetY={obj.height / 2}
              fill={obj.color + "40"}
              stroke={isSelected ? "#3b82f6" : obj.color}
              strokeWidth={isSelected ? 3 : 2}
              cornerRadius={8}
              dash={obj.type === "booth" || obj.type === "tent" ? [10, 5] : []}
            />

            {/* Object icon/emoji */}
            <Text
              text={objType?.icon || "📦"}
              fontSize={24}
              align="center"
              verticalAlign="middle"
              width={obj.width}
              height={obj.height}
              offsetX={obj.width / 2}
              offsetY={obj.height / 2 + 10}
            />

            {/* Object name */}
            <Text
              text={obj.name}
              fontSize={11}
              fontStyle="bold"
              fill="#374151"
              align="center"
              width={obj.width}
              offsetX={obj.width / 2}
              y={obj.height / 2 - 25}
            />
          </Group>
        );
      },
      [
        currentTool,
        selectedIds,
        handleSelect,
        handleDragEnd,
        handleTransformEnd,
      ],
    );

    const renderTextElement = useCallback(
      (textEl: TextElement) => {
        const isSelected = selectedIds.includes(textEl.id);

        return (
          <Text
            key={textEl.id}
            id={textEl.id}
            text={textEl.text}
            x={textEl.x}
            y={textEl.y}
            fontSize={textEl.fontSize}
            fontFamily={textEl.fontFamily}
            fill={textEl.fill}
            fontStyle={textEl.fontStyle}
            align={textEl.align}
            rotation={textEl.rotation}
            draggable={currentTool === "select"}
            onClick={(e) => handleSelect(textEl.id, e)}
            onDragStart={() => setIsDraggingItem(true)}
            onDragEnd={(e) => {
              setIsDraggingItem(false);
              handleDragEnd("text", textEl.id, e);
            }}
            onTransformEnd={(e) => handleTransformEnd("text", textEl.id, e)}
            onDblClick={() => {
              setEditingTextId(textEl.id);
              setEditingTextValue(textEl.text);
              setTimeout(() => {
                if (textInputRef.current) {
                  textInputRef.current.focus();
                  textInputRef.current.select();
                }
              }, 10);
            }}
            stroke={isSelected ? "#3b82f6" : undefined}
            strokeWidth={isSelected ? 0.5 : 0}
          />
        );
      },
      [
        currentTool,
        selectedIds,
        handleSelect,
        handleDragEnd,
        handleTransformEnd,
      ],
    );

    const handleTextEdit = useCallback(() => {
      if (editingTextId) {
        if (editingTextValue.trim()) {
          setTextElements((prev) =>
            prev.map((txt) =>
              txt.id === editingTextId
                ? { ...txt, text: editingTextValue }
                : txt,
            ),
          );
          saveToHistory();
        } else {
          // If empty, delete the text element
          setTextElements((prev) =>
            prev.filter((txt) => txt.id !== editingTextId),
          );
        }
      }
      setIsEditingText(false);
      setEditingTextId(null);
      setEditingTextValue("");
    }, [editingTextId, editingTextValue, saveToHistory]);

    // Handle opening settings for a table/booth
    const handleOpenSettings = useCallback((tableId: string) => {
      setEditingTableId(tableId);
      setIsSettingsOpen(true);
    }, []);

    // Handle opening settings for a chair row
    const handleOpenChairSettings = useCallback((chairRowId: string) => {
      setEditingChairRowId(chairRowId);
      setIsChairSettingsOpen(true);
    }, []);

    // Handle opening settings for a section
    const handleOpenSectionSettings = useCallback((sectionId: string) => {
      setEditingSectionId(sectionId);
      setIsSectionSettingsOpen(true);
    }, []);

    // Handle updating a section
    const handleUpdateSection = useCallback((sectionId: string, updates: any) => {
      setSections((prev) =>
        prev.map((s) => (s.id === sectionId ? { ...s, ...updates } : s))
      );
    }, []);

    // Helper function to detect multi-selection type
    const getMultiSelectionType = useCallback(
      (ids: string[]): "chairs" | "tables" | "booths" | "sections" | "mixed" | null => {
        if (ids.length <= 1) return null;

        let hasChairs = false;
        let hasTables = false;
        let hasBooths = false;
        let hasSections = false;

        ids.forEach((id) => {
          // Check if it's a chair row
          if (chairRows.some((row) => row.id === id)) {
            hasChairs = true;
          }
          // Check if it's a section
          if (sections.some((s) => s.id === id)) {
            hasSections = true;
          }
          // Check if it's a table or booth
          const table = tables.find((t) => t.id === id);
          if (table) {
            if (table.shape === "booth") {
              hasBooths = true;
            } else {
              hasTables = true;
            }
          }
        });

        // Count how many different types are selected
        const typeCount = [hasChairs, hasTables, hasBooths, hasSections].filter(
          Boolean,
        ).length;

        if (typeCount > 1) return "mixed";
        if (hasChairs) return "chairs";
        if (hasBooths) return "booths";
        if (hasSections) return "sections";
        return "tables";
      },
      [chairRows, tables, sections],
    );

    // Handle opening multi-selection settings
    const handleOpenMultiSettings = useCallback(() => {
      const selectionType = getMultiSelectionType(selectedIds);
      if (selectionType) {
        setMultiSelectionType(selectionType);
        setIsMultiSettingsOpen(true);
      }
    }, [selectedIds, getMultiSelectionType]);

    // Handle bulk group assignment for multi-selection
    const handleBulkGroupAssignment = useCallback(
      (groupId: string | undefined) => {
        const group = groupId && groupId !== "unassigned" ? groupId : undefined;
        const groupColor = group
          ? tableGroups.find((g) => g.id === group)?.color || "#ffffff"
          : "#ffffff";

        selectedIds.forEach((id) => {
          // Update chairs
          if (chairRows.some((row) => row.id === id)) {
            setChairRows((prev) =>
              prev.map((row) => (row.id === id ? { ...row, group } : row)),
            );
          }
          // Update tables/booths
          const table = tables.find((t) => t.id === id);
          if (table) {
            setTables((prev) =>
              prev.map((t) =>
                t.id === id ? { ...t, group, color: groupColor } : t,
              ),
            );
          }
        });

        saveToHistory();
      },
      [selectedIds, chairRows, tables, tableGroups, saveToHistory],
    );

    // Handle bulk shape change for tables only (not booths)
    const handleBulkShapeChange = useCallback(
      (shape: "round" | "rectangular") => {
        selectedIds.forEach((id) => {
          const table = tables.find((t) => t.id === id);
          // Only change shape for non-booth tables
          if (table && table.shape !== "booth") {
            setTables((prev) =>
              prev.map((t) => {
                if (t.id !== id || t.shape === "booth") return t;

                // Adjust dimensions based on shape
                let width = t.width;
                let height = t.height;

                if (shape === "round") {
                  const dims = calculateTableDimensions("round", t.seats);
                  width = dims.width;
                  height = dims.height;
                } else if (shape === "rectangular") {
                  const dims = calculateTableDimensions("rectangular", t.seats);
                  width = dims.width;
                  height = dims.height;
                }

                return { ...t, shape, width, height };
              }),
            );
          }
        });

        saveToHistory();
      },
      [selectedIds, tables, saveToHistory],
    );

    const handleOpenTextSettings = useCallback((textId: string) => {
      setEditingTextElementId(textId);
      setIsTextSettingsOpen(true);
    }, []);

    // Handle updating table settings
    const handleUpdateTable = useCallback(
      (tableId: string, updates: Partial<VenueTable>) => {
        setTables((prev) =>
          prev.map((t) => {
            if (t.id !== tableId) return t;

            // If group is being updated, update color
            if (updates.group !== undefined) {
              const group = tableGroups.find((g) => g.id === updates.group);
              if (group) {
                updates.color = group.color;
              } else if (updates.group === undefined || updates.group === "") {
                updates.color = "#ffffff"; // White for unassigned
              }
            }

            // Auto-resize if seats or shape changed
            const newShape = (updates.shape as any) || t.shape;
            const newSeats = updates.seats !== undefined ? updates.seats : t.seats;

            if (updates.seats !== undefined || updates.shape !== undefined) {
              const dims = calculateTableDimensions(newShape, newSeats);
              updates.width = dims.width;
              updates.height = dims.height;
            }

            return { ...t, ...updates };
          }),
        );
        saveToHistory();
      },
      [tableGroups, saveToHistory, calculateTableDimensions],
    );

    // Direct delete function (used when skip confirmation is enabled)
    const handleConfirmDeleteDirect = useCallback(
      (id: string, type: string) => {
        switch (type) {
          case "table":
          case "booth":
            setTables((prev) => prev.filter((t) => t.id !== id));
            setIsSettingsOpen(false);
            break;
          case "chair-row":
            setChairRows((prev) =>
              prev.filter((row) => row.id !== id),
            );
            setIsChairSettingsOpen(false);
            break;
          case "door":
            setDoors((prev) => prev.filter((d) => d.id !== id));
            break;
          case "window":
            setWindows((prev) => prev.filter((w) => w.id !== id));
            break;
          case "object":
            setObjects((prev) => prev.filter((o) => o.id !== id));
            break;
          case "text":
            setTextElements((prev) =>
              prev.filter((txt) => txt.id !== id),
            );
            setIsTextSettingsOpen(false);
            break;
          case "section":
            setSections((prev) => prev.filter((s) => s.id !== id));
            setIsSectionSettingsOpen(false);
            break;
          case "drawing":
            setDrawingLines((prev) =>
              prev.filter((line) => line.id !== id),
            );
            break;
        }

        updateSelection([]);
        saveToHistory();
      },
      [saveToHistory, updateSelection],
    );

    // Handle delete confirmation
    const handleDeleteClick = useCallback(
      (id: string, type: string) => {
        // Check if user has set "Don't ask again" preference
        const skipConfirmation = localStorage.getItem("skipDeleteConfirmation") === "true";

        if (skipConfirmation) {
          // Skip dialog and delete directly
          handleConfirmDeleteDirect(id, type);
          return;
        }

        let hasGuests = false;

        if (type === "table" || type === "booth") {
          const table = tables.find((t) => t.id === id);
          if (
            table &&
            ((table.seatAssignments &&
              Object.keys(table.seatAssignments).length > 0) ||
              (table.guests && table.guests.length > 0))
          ) {
            hasGuests = true;
          }
        } else if (type === "chair-row" || type === "chair-single") {
          const row = chairRows.find((r) => r.id === id);
          if (row && row.chairs.some((c) => c.guest)) {
            hasGuests = true;
          }
        } else if (type === "object") {
          const obj = objects.find((o) => o.id === id);
          // Check for assigned vendor in objects (booths, tents, etc.)
          if (obj && (obj as any).assignedVendor) {
            hasGuests = true;
          }
        }

        setItemToDelete({ id, type, hasGuests });
        setIsDeleteDialogOpen(true);
      },
      [tables, chairRows, handleConfirmDeleteDirect],
    );

    // Handle updating chair row settings
    const handleUpdateChairRow = useCallback(
      (chairRowId: string, updates: Partial<ChairRow>) => {
        setChairRows((prev) =>
          prev.map((row) => {
            if (row.id !== chairRowId) return row;
            return { ...row, ...updates };
          }),
        );
        saveToHistory();
      },
      [saveToHistory],
    );

    // Handle updating text element settings
    const handleUpdateTextElement = useCallback(
      (textId: string, updates: Partial<TextElement>) => {
        setTextElements((prev) =>
          prev.map((txt) => (txt.id === textId ? { ...txt, ...updates } : txt)),
        );
        saveToHistory();
      },
      [saveToHistory],
    );

    // Handle confirmed delete
    const handleConfirmDelete = useCallback(() => {
      if (!itemToDelete) return;

      // Save preference if checkbox is checked
      if (dontAskAgain) {
        localStorage.setItem("skipDeleteConfirmation", "true");
      }

      switch (itemToDelete.type) {
        case "table":
        case "booth":
          setTables((prev) => prev.filter((t) => t.id !== itemToDelete.id));
          setIsSettingsOpen(false);
          break;
        case "chair-row":
          setChairRows((prev) =>
            prev.filter((row) => row.id !== itemToDelete.id),
          );
          setIsChairSettingsOpen(false);
          break;
        case "section":
          setSections((prev) => prev.filter((s) => s.id !== itemToDelete.id));
          setIsSectionSettingsOpen(false);
          break;
        case "door":
          setDoors((prev) => prev.filter((d) => d.id !== itemToDelete.id));
          break;
        case "window":
          setWindows((prev) => prev.filter((w) => w.id !== itemToDelete.id));
          break;
        case "object":
          setObjects((prev) => prev.filter((o) => o.id !== itemToDelete.id));
          break;
        case "text":
          setTextElements((prev) =>
            prev.filter((txt) => txt.id !== itemToDelete.id),
          );
          setIsTextSettingsOpen(false);
          break;
        case "drawing":
          setDrawingLines((prev) =>
            prev.filter((line) => line.id !== itemToDelete.id),
          );
          break;
      }

      updateSelection([]);
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
      setDontAskAgain(false);
      saveToHistory();
    }, [itemToDelete, dontAskAgain, saveToHistory, updateSelection]);

    // ============================================================================
    // SAVE & EXPORT
    // ============================================================================

    const handleSave = useCallback(() => {
      // Convert to LayoutData format
      const layoutData: LayoutData = {
        tables: tables.map((t) => {
          // Find if this table belongs to any section
          const parentSection = sections.find((s) =>
            isPointInPolygon(t.x, t.y, s.points),
          );

          return {
            id: parseInt(t.id.split("-")[0]) || Date.now(),
            name: t.name,
            seats: t.seats,
            shape: t.shape,
            x: t.x,
            y: t.y,
            width: t.width,
            height: t.height,
            guests: t.seatAssignments ? Object.values(t.seatAssignments) : [],
            rotation: t.rotation,
            seatAssignments: t.seatAssignments || {},
            sectionId: parentSection?.id, // Assign section ID
            targetGroup: t.group, // Map group to targetGroup
          };
        }) as Table[],
        chairs: chairRows.flatMap((row) =>
          row.chairs.map((chair, index) => {
            const rad = (row.rotation * Math.PI) / 180;
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);
            const globalX =
              row.x + chair.offsetX * cos - chair.offsetY * sin;
            const globalY =
              row.y + chair.offsetX * sin + chair.offsetY * cos;

            // Find if this chair belongs to any section
            const parentSection = sections.find((s) =>
              isPointInPolygon(globalX, globalY, s.points),
            );

            return {
              id: parseInt(chair.id.split("-")[0]) || Date.now() + index,
              name: row.name || `Chair ${index + 1}`,
              x: globalX,
              y: globalY,
              rotation: row.rotation + chair.rotation,
              layoutType: "grid" as const,
              gridId: row.id,
              sectionId: parentSection?.id, // Assign section ID
              targetGroup: row.group, // Map group to targetGroup
              guest: chair.guest, // Preserve guest assignment
            };
          }),
        ) as Chair[],
        venueObjects: objects.map((o) => ({
          id: parseInt(o.id.split("-")[0]) || Date.now(),
          name: o.name,
          type: o.type as VenueObject["type"],
          x: o.x,
          y: o.y,
          width: o.width,
          height: o.height,
          rotation: o.rotation,
          color: o.color,
        })) as VenueObject[],
        seats: [],
        walls: walls,
        sections: sections, // Save sections
        dimensions: { width: stageSize.width, height: stageSize.height },
      };

      onSave?.(layoutData);
    }, [
      tables,
      chairRows,
      objects,
      walls,
      sections,
      stageSize,
      onSave,
      isPointInPolygon,
    ]);

    const handleExportImage = useCallback(() => {
      const stage = stageRef.current;
      if (!stage) return;

      // Calculate bounding box of all elements
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      let hasElements = false;

      // Check tables
      tables.forEach(table => {
        hasElements = true;
        minX = Math.min(minX, table.x - table.width / 2);
        minY = Math.min(minY, table.y - table.height / 2);
        maxX = Math.max(maxX, table.x + table.width / 2);
        maxY = Math.max(maxY, table.y + table.height / 2);
      });

      // Check chair rows (approximate size)
      chairRows.forEach(row => {
        hasElements = true;
        minX = Math.min(minX, row.x);
        minY = Math.min(minY, row.y);
        // Estimate row size - this is a simplification
        maxX = Math.max(maxX, row.x + 200);
        maxY = Math.max(maxY, row.y + 100);
      });

      // Check objects
      objects.forEach(obj => {
        hasElements = true;
        minX = Math.min(minX, obj.x);
        minY = Math.min(minY, obj.y);
        maxX = Math.max(maxX, obj.x + obj.width);
        maxY = Math.max(maxY, obj.y + obj.height);
      });

      // Check walls
      walls.forEach(wall => {
        hasElements = true;
        wall.points.forEach((p, i) => {
          if (i % 2 === 0) { // x
            minX = Math.min(minX, p);
            maxX = Math.max(maxX, p);
          } else { // y
            minY = Math.min(minY, p);
            maxY = Math.max(maxY, p);
          }
        });
      });

      // If no elements, export default view
      if (!hasElements) {
        minX = 0;
        minY = 0;
        maxX = stage.width();
        maxY = stage.height();
      }

      // Add padding
      const padding = 50;
      const x = minX - padding;
      const y = minY - padding;
      const width = (maxX - minX) + (padding * 2);
      const height = (maxY - minY) + (padding * 2);

      const dataURL = stage.toDataURL({
        x,
        y,
        width,
        height,
        pixelRatio: 2,
        mimeType: "image/jpeg",
        quality: 0.9
      });

      const link = document.createElement("a");
      link.download = `venue-layout-${Date.now()}.jpeg`;
      link.href = dataURL;
      link.click();
    }, [tables, chairRows, objects, walls]);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      handleResize: () => {
        updateSize();
      },
      exportImage: async () => {
        handleExportImage();
        return null;
        // Note: original implementation returning dataURL in imperative handle might differ,
        // but here we just want to match the signature.
        // Actually KonvaSeatingCanvas expects it to return promise of null or string?
        // Previous code in KonvaSeatingCanvas: return stageRef.current.toDataURL...
        // Let's implement it properly here.
      },
      getSeatAtPosition: (pos: { x: number; y: number }) => {
        const stage = stageRef.current;
        if (!stage) return null;

        // Debug logging
        // console.log("getSeatAtPosition called with:", pos);

        // Convert client coordinates to stage coordinates
        const stageRect = stage.container().getBoundingClientRect();
        // console.log("Stage Rect:", stageRect);

        // Ensure pos is within the stage container
        // if (
        //   pos.x < stageRect.left ||
        //   pos.x > stageRect.right ||
        //   pos.y < stageRect.top ||
        //   pos.y > stageRect.bottom
        // ) {
        //   console.log("Position outside stage bounds");
        //   return null;
        // }

        // Check for intersections
        // Note: getIntersection is computationally expensive, verify if we can optimize?
        // But for single drop checks it's fine.

        // Sometimes getIntersection might return null if the "hit" graph isn't updated?
        // Force a redraw of hit graph if needed? stage.batchDraw() usually handles it.
        const shapeAtPos = stage.getIntersection(pos);
        // console.log("Shape at pos:", shapeAtPos);

        if (!shapeAtPos) {
          // Fallback: check pointer position from stage if available (might not be during external drag)
          // console.log("No shape detection via intersection.");
          return null;
        }

        if (shapeAtPos) {
          // Check if it's part of a seat group
          let node: Konva.Node | null = shapeAtPos as unknown as Konva.Node;

          // Casting stage to unknown then Node to avoid type mismatch
          const stageNode = stage as unknown as Konva.Node;

          while (node && node !== stageNode) {
            // Check for seat ID in attributes or name
            const seatId = node.attrs.id; // seat-{tableId}-{seatNumber}
            const chairId = node.attrs.id; // chair-{chairId}

            if (seatId && typeof seatId === 'string' && seatId.startsWith('seat-')) {
              const parts = seatId.split('-');
              if (parts.length === 3) {
                return { tableId: parseInt(parts[1]), seatNumber: parseInt(parts[2]), id: seatId };
              }
            }

            if (chairId && typeof chairId === 'string' && chairId.startsWith('chair-')) {
              const parts = chairId.split('-');
              if (parts.length === 2 && !isNaN(parseInt(parts[1]))) {
                return { chairId: parseInt(parts[1]), id: chairId };
              }
            }

            // Also check for name convention if IDs are not on the group but on shapes
            if (node.name() === 'seat-group') {
              const tId = node.attrs.tableId;
              const sNum = node.attrs.seatNumber;
              const sId = node.attrs.seatId; // existing seatId for string matching
              if (tId !== undefined && sNum !== undefined) {
                // Construct ID if not present
                const constructedId = sId || `seat-${tId}-${sNum}`;
                // Use parseInt to handle IDs like "123-table"
                const numericTableId = typeof tId === 'string' ? parseInt(tId) : Number(tId);
                return { tableId: numericTableId, seatNumber: Number(sNum), id: constructedId };
              }
            }

            if (node.name() === 'chair-group') {
              const cId = node.attrs.chairId;
              if (cId !== undefined) {
                const constructedId = `chair-${cId}`;
                // Use parseInt to handle IDs like "123-chair" or similar
                const numericChairId = typeof cId === 'string' ? parseInt(cId) : Number(cId);
                return { chairId: numericChairId, id: constructedId };
              }
            }

            const parent: Konva.Container | null = node.getParent();
            node = parent as Konva.Node | null;
          }
        }
        return null;
      },
      highlightSeatAtPosition: (pos: { x: number; y: number } | null) => {
        if (!pos) {
          setHoveredSeatId(null);
          return;
        }
        // Reuse logic via copy-paste for now
        const stage = stageRef.current;
        if (!stage) return;

        const shapeAtPos = stage.getIntersection(pos);

        if (shapeAtPos) {
          let node: Konva.Node | null = shapeAtPos as unknown as Konva.Node;
          const stageNode = stage as unknown as Konva.Node;

          while (node && node !== stageNode) {
            // Check for names we just added
            if (node.name() === 'seat-group') {
              // Use seatId attribute if available, or construct it
              const sId = node.attrs.seatId;
              const tId = node.attrs.tableId;
              const sNum = node.attrs.seatNumber;

              if (sId) {
                setHoveredSeatId(sId);
                return;
              } else if (tId !== undefined && sNum !== undefined) {
                // In renderTable: const seatId = `${table.id}-seat-${i}`;
                // And seatNumber = i + 1;
                // So we need to reconstruct: `${tId}-seat-${sNum - 1}`.
                // BUT, keep in mind tId might be string or number.
                setHoveredSeatId(`${tId}-seat-${Number(sNum) - 1}`);
                return;
              }
            }
            if (node.name() === 'chair-group') {
              // chairId is `${chair.id}-${index}` in renderIndividualChair sometimes?
              // In renderIndividualChair: const chairId = `chair-${chair.id}-${index}`;
              // But I only added chairId={chair.id}.
              // Using the node.id() is safest because it is unique per rendered chair.
              setHoveredSeatId(node.id());
              return;
            }

            const parent: Konva.Container | null = node.getParent();
            node = parent as Konva.Node | null;
          }
        }
        setHoveredSeatId(null);
      }
    }));

    // Override exportImage in imperative handle to return dataURL if needed by parent
    // The previous code in KonvaSeatingCanvas called exportImage() and expected return value.
    // Let's redefine implementation in useImperativeHandle to match expectation.

    const handleClear = useCallback(() => {
      setWalls([]);
      setDoors([]);
      setWindows([]);
      setChairRows([]);
      setTables([]);
      setObjects([]);
      setTextElements([]);
      updateSelection([]);
      setHistory([]);
      setHistoryIndex(-1);
    }, [updateSelection]);

    // ============================================================================
    // ZOOM CONTROLS
    // ============================================================================

    const zoomIn = () => setScale((s) => Math.min(MAX_ZOOM, s + 0.1));
    const zoomOut = () => {
      setScale((s) => {
        // Calculate a dynamic minimum zoom that ensures canvas stays visible
        const minZoomX = stageSize.width / (stageSize.width * 2);
        const minZoomY = stageSize.height / (stageSize.height * 2);
        const dynamicMinZoom = Math.max(
          MIN_ZOOM,
          Math.max(minZoomX, minZoomY),
          0.5,
        );
        return Math.max(dynamicMinZoom, s - 0.1);
      });
    };
    const resetZoom = () => {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    };

    // ============================================================================
    // RENDER
    // ============================================================================

    // Get currently editing table
    const editingTable = editingTableId
      ? tables.find((t) => t.id === editingTableId)
      : null;

    return (
      <div className="flex h-full w-full flex-col overflow-hidden">
        {/* Text Editing Dialog */}
        <Dialog
          open={isEditingText}
          onOpenChange={setIsEditingText}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Text</DialogTitle>
              <DialogDescription>
                Update the text content below
              </DialogDescription>
            </DialogHeader>
            <Textarea
              value={editingTextValue}
              onChange={(e) => setEditingTextValue(e.target.value)}
              placeholder="Enter text..."
              className="min-h-24"
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditingText(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleTextEdit}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                <span className="block mb-2">
                  This will permanently delete this{" "}
                  {itemToDelete?.type === "chair-row"
                    ? "chair row"
                    : itemToDelete?.type === "booth"
                      ? "booth"
                      : itemToDelete?.type === "table"
                        ? "table"
                        : itemToDelete?.type === "door"
                          ? "door"
                          : itemToDelete?.type === "window"
                            ? "window"
                            : itemToDelete?.type === "object"
                              ? "object"
                              : itemToDelete?.type === "text"
                                ? "text element"
                                : itemToDelete?.type === "drawing"
                                  ? "drawing line"
                                  : "item"}
                  . This action cannot be undone.
                </span>
                {itemToDelete?.hasGuests && (
                  <span className="block font-semibold text-destructive mt-4 p-2 bg-destructive/10 rounded border border-destructive/20">
                    ⚠️ WARNING: This item has guests assigned to it. Deleting it
                    will unassign all guests.
                  </span>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex items-center space-x-2 px-6 py-2">
              <Checkbox
                id="dont-ask-again"
                checked={dontAskAgain}
                onCheckedChange={(checked) => setDontAskAgain(checked === true)}
              />
              <Label
                htmlFor="dont-ask-again"
                className="text-sm font-normal cursor-pointer"
              >
                Don't ask me again
              </Label>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setItemToDelete(null);
                  setDontAskAgain(false);
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                className="bg-destructive hover:bg-destructive/90 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Clear Drawings Confirmation Dialog */}
        <AlertDialog
          open={isClearDrawingsDialogOpen}
          onOpenChange={setIsClearDrawingsDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear All Drawings?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all {drawingLines.length} drawing
                line{drawingLines.length !== 1 ? "s" : ""}. This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => setIsClearDrawingsDialogOpen(false)}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setDrawingLines([]);
                  setCurrentDrawingLine(null);
                  setIsClearDrawingsDialogOpen(false);
                  saveToHistory();
                }}
                className="bg-destructive hover:bg-destructive/90 text-white"
              >
                Clear All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Settings Drawer */}
        <Sheet
          open={isSettingsOpen}
          onOpenChange={setIsSettingsOpen}
        >
          <SheetContent className="flex w-[400px] flex-col px-6 sm:w-[540px]">
            <div className="flex-1 overflow-y-auto">
              <SheetHeader className="pb-4">
                <SheetTitle>
                  {editingTable?.shape === "booth" ? "Booth" : "Table"} Settings
                </SheetTitle>
                <SheetDescription>
                  Configure {editingTable?.name} settings
                </SheetDescription>
              </SheetHeader>

              {editingTable && (
                <div className="mt-6 space-y-6 px-1">
                  {/* Table/Booth Name */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="table-name"
                      className="text-sm font-medium"
                    >
                      Name
                    </Label>
                    <Input
                      id="table-name"
                      value={editingTable.name}
                      onChange={(e) =>
                        handleUpdateTable(editingTable.id, {
                          name: e.target.value,
                        })
                      }
                      placeholder="Enter name..."
                      className="w-full"
                    />
                  </div>

                  {/* Group Assignment */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="table-group"
                      className="text-sm font-medium"
                    >
                      Group Assignment
                    </Label>
                    <Select
                      value={editingTable.group || "unassigned"}
                      onValueChange={(value) =>
                        handleUpdateTable(editingTable.id, {
                          group: value === "unassigned" ? undefined : value,
                        })
                      }
                    >
                      <SelectTrigger
                        id="table-group"
                        className="w-full"
                      >
                        <SelectValue placeholder="Select group..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded border bg-white" />
                            <span>Unassigned</span>
                          </div>
                        </SelectItem>
                        {tableGroups.map((group) => (
                          <SelectItem
                            key={group.id}
                            value={group.id}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="h-4 w-4 rounded border"
                                style={{ backgroundColor: group.color }}
                              />
                              <span>{group.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-muted-foreground text-xs">
                      Assign to a group to organize and color-code
                    </p>
                  </div>

                  {/* Shape Selection (Tables only) */}
                  {editingTable.shape !== "booth" && (
                    <div className="space-y-3">
                      <Label
                        htmlFor="table-shape"
                        className="text-sm font-medium"
                      >
                        Table Shape
                      </Label>
                      <Select
                        value={editingTable.shape === "square" ? "rectangular" : editingTable.shape}
                        onValueChange={(value: any) =>
                          handleUpdateTable(editingTable.id, { shape: value })
                        }
                      >
                        <SelectTrigger
                          id="table-shape"
                          className="w-full"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="round">Round</SelectItem>
                          <SelectItem value="rectangular">Rectangle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Number of Seats */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="table-seats"
                      className="text-sm font-medium"
                    >
                      Number of Seats
                    </Label>
                    <Input
                      id="table-seats"
                      type="number"
                      min={2}
                      max={20}
                      value={editingTable.seats || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "") {
                          handleUpdateTable(editingTable.id, {
                            seats: 0,
                          });
                          return;
                        }
                        const num = Number(val);
                        if (!isNaN(num)) {
                          handleUpdateTable(editingTable.id, {
                            seats: num > 20 ? 20 : num,
                          });
                        }
                      }}
                      onBlur={(e) => {
                        const val = Number(e.target.value);
                        if (isNaN(val) || val < 2) {
                          handleUpdateTable(editingTable.id, {
                            seats: 2,
                          });
                        }
                      }}
                      className="w-full"
                    />
                    <p className="text-muted-foreground pt-1 text-xs">
                      Max: 20 seats • Chairs will be arranged around the{" "}
                      {editingTable.shape === "booth" ? "booth" : "table"}
                    </p>
                  </div>

                  {/* Color Preview */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Current Color</Label>
                    <div className="flex items-center gap-3">
                      <div
                        className="h-12 w-12 rounded-lg border-2"
                        style={{ backgroundColor: editingTable.color }}
                      />
                      <div className="text-muted-foreground text-sm">
                        {editingTable.group
                          ? `${tableGroups.find((g) => g.id === editingTable.group)?.name} group color`
                          : "Unassigned (white)"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Delete Button - Fixed at bottom */}
            {editingTable && (
              <div className="mt-auto shrink-0 border-t pt-6 pb-4">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    handleDeleteClick(
                      editingTable.id,
                      editingTable.shape === "booth" ? "booth" : "table",
                    );
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete {editingTable.shape === "booth" ? "Booth" : "Table"}
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* Chair Settings Drawer */}
        <Sheet
          open={isChairSettingsOpen}
          onOpenChange={setIsChairSettingsOpen}
        >
          <SheetContent className="flex w-[400px] flex-col px-6 sm:w-[540px]">
            <div className="flex-1 overflow-y-auto">
              <SheetHeader className="pb-4">
                <SheetTitle>Chair Row Settings</SheetTitle>
                <SheetDescription>
                  Configure chair row settings
                </SheetDescription>
              </SheetHeader>

              {(() => {
                const editingChairRow = editingChairRowId
                  ? chairRows.find((row) => row.id === editingChairRowId)
                  : null;

                if (!editingChairRow) return null;

                return (
                  <div className="mt-6 space-y-6 px-1">
                    {/* Chair Row Name */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="chair-name"
                        className="text-sm font-medium"
                      >
                        Name
                      </Label>
                      <Input
                        id="chair-name"
                        value={
                          editingChairRow.name ||
                          `Chair Row ${chairRows.indexOf(editingChairRow) + 1}`
                        }
                        onChange={(e) =>
                          handleUpdateChairRow(editingChairRow.id, {
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter name..."
                        className="w-full"
                      />
                    </div>

                    {/* Group Assignment */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="chair-group"
                        className="text-sm font-medium"
                      >
                        Group Assignment
                      </Label>
                      <Select
                        value={editingChairRow.group || "unassigned"}
                        onValueChange={(value) =>
                          handleUpdateChairRow(editingChairRow.id, {
                            group: value === "unassigned" ? undefined : value,
                          })
                        }
                      >
                        <SelectTrigger
                          id="chair-group"
                          className="w-full"
                        >
                          <SelectValue placeholder="Select group..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unassigned">
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded border bg-white" />
                              <span>Unassigned</span>
                            </div>
                          </SelectItem>
                          {tableGroups.map((group) => (
                            <SelectItem
                              key={group.id}
                              value={group.id}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className="h-4 w-4 rounded border"
                                  style={{ backgroundColor: group.color }}
                                />
                                <span>{group.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-muted-foreground pt-1 text-xs">
                        Assign to a group to organize chairs
                      </p>
                    </div>

                    {/* Number of Chairs */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="chair-count"
                        className="text-sm font-medium"
                      >
                        Number of Chairs
                      </Label>
                      <Input
                        id="chair-count"
                        type="number"
                        min={1}
                        value={editingChairRow.chairs.length || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "") {
                            // Temporary 0 to allow backspace
                            handleUpdateChairRow(editingChairRow.id, {
                              chairs: [],
                            });
                            return;
                          }
                          const newCount = Number(val);
                          if (!isNaN(newCount)) {
                            const currentCount = editingChairRow.chairs.length;
                            let newChairs = [...editingChairRow.chairs];

                            if (newCount > currentCount) {
                              // Add more chairs
                              const spacing = editingChairRow.spacing || 15;
                              for (let i = currentCount; i < newCount; i++) {
                                newChairs.push({
                                  id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${i}`,
                                  offsetX: i * spacing,
                                  offsetY: 0,
                                  rotation: 0,
                                });
                              }
                            } else if (newCount < currentCount) {
                              // Remove chairs from the end
                              newChairs = newChairs.slice(0, newCount);
                            }

                            handleUpdateChairRow(editingChairRow.id, {
                              chairs: newChairs,
                            });
                          }
                        }}
                        onBlur={(e) => {
                          const val = Number(e.target.value);
                          if (isNaN(val) || val < 1) {
                            // Ensure at least 1 chair on blur
                            const newChairs = [
                              {
                                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-0`,
                                offsetX: 0,
                                offsetY: 0,
                                rotation: 0,
                              },
                            ];
                            handleUpdateChairRow(editingChairRow.id, {
                              chairs: newChairs,
                            });
                          }
                        }}
                        className="w-full"
                      />
                      <p className="text-muted-foreground pt-1 text-xs">
                        Configure row length
                      </p>
                    </div>

                    {/* Chair Spacing */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="chair-spacing"
                        className="text-sm font-medium"
                      >
                        Chair Spacing (px)
                      </Label>
                      <Input
                        id="chair-spacing"
                        type="number"
                        min={20}
                        max={150}
                        step={5}
                        value={editingChairRow.spacing || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            handleUpdateChairRow(editingChairRow.id, {
                              spacing: 0,
                            });
                            return;
                          }
                          const newSpacing = Number(value);
                          if (!isNaN(newSpacing)) {
                            const newChairs = editingChairRow.chairs.map(
                              (chair, index) => ({
                                ...chair,
                                offsetX: index * newSpacing,
                              }),
                            );
                            handleUpdateChairRow(editingChairRow.id, {
                              spacing: newSpacing,
                              chairs: newChairs,
                            });
                          }
                        }}
                        onBlur={(e) => {
                          // Ensure valid value on blur
                          const value = Number(e.target.value);
                          if (isNaN(value) || value < 20) {
                            handleUpdateChairRow(editingChairRow.id, {
                              spacing: 50,
                            });
                          } else if (value > 150) {
                            handleUpdateChairRow(editingChairRow.id, {
                              spacing: 150,
                            });
                          }
                        }}
                        className="w-full"
                      />
                      <p className="text-muted-foreground pt-1 text-xs">
                        Distance between chairs: {editingChairRow.spacing}px
                      </p>
                    </div>

                    {/* Section & Pricing Info */}
                    {(() => {
                      // Find if this row is inside any section
                      const parentSection = sections.find(section => {
                        // Check center of row
                        const rad = (editingChairRow.rotation * Math.PI) / 180;
                        const cos = Math.cos(rad);
                        const sin = Math.sin(rad);
                        // Simply check row x,y (start) or approx center
                        // Let's use row.x, row.y for simplicity as anchor
                        // or better, check if any chair is inside

                        // We need to check intersection. Reuse logic? 
                        // For now, simple PIP on row origin.

                        // Transform relative points
                        const absPoints = [];
                        for (let i = 0; i < section.points.length; i += 2) {
                          const rotated = rotatePoint(section.points[i], section.points[i + 1], 0, 0, section.rotation);
                          absPoints.push(rotated.x + section.x, rotated.y + section.y);
                        }
                        return isPointInPolygon(editingChairRow.x, editingChairRow.y, absPoints);
                      });

                      if (!parentSection || !parentSection.pricing) return null;

                      // Calculate price for this row
                      const prices = calculateSectionPricing(parentSection);
                      // Get price of first chair in row
                      const firstSeatId = `${editingChairRow.id}-0`;
                      const price = prices.get(firstSeatId);

                      if (price === undefined) return null;

                      return (
                        <div className="space-y-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-blue-600" />
                            <Label className="text-sm font-semibold text-blue-900">Ticket Price</Label>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-blue-700">Section: {parentSection.name}</span>
                            <span className="text-lg font-bold text-blue-700">${price}</span>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Current Info */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">
                        Row Information
                      </Label>
                      <div className="text-muted-foreground space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Position:</span>
                          <span>
                            X: {Math.round(editingChairRow.x)}, Y:{" "}
                            {Math.round(editingChairRow.y)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rotation:</span>
                          <span>{Math.round(editingChairRow.rotation)}°</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Curved:</span>
                          <span>{editingChairRow.curved ? "Yes" : "No"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Delete Button - Fixed at bottom */}
            {editingChairRowId && (
              <div className="mt-auto shrink-0 border-t pt-6 pb-4">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    handleDeleteClick(editingChairRowId, "chair-row");
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Chair Row
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* Text Settings Drawer */}
        <Sheet
          open={isTextSettingsOpen}
          onOpenChange={setIsTextSettingsOpen}
        >
          <SheetContent className="flex w-[400px] flex-col px-6 sm:w-[540px]">
            <div className="flex-1 overflow-y-auto">
              <SheetHeader className="pb-4">
                <SheetTitle>Text Settings</SheetTitle>
                <SheetDescription>
                  Configure text appearance and style
                </SheetDescription>
              </SheetHeader>

              {(() => {
                const editingText = editingTextElementId
                  ? textElements.find((txt) => txt.id === editingTextElementId)
                  : null;

                if (!editingText) return null;

                return (
                  <div className="mt-6 space-y-6 px-1">
                    {/* Text Content */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="text-content"
                        className="text-sm font-medium"
                      >
                        Text Content
                      </Label>
                      <Textarea
                        id="text-content"
                        value={editingText.text}
                        onChange={(e) =>
                          handleUpdateTextElement(editingText.id, {
                            text: e.target.value,
                          })
                        }
                        placeholder="Enter text..."
                        className="min-h-[80px] w-full"
                      />
                    </div>

                    {/* Font Size */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="text-font-size"
                        className="text-sm font-medium"
                      >
                        Font Size
                      </Label>
                      <Input
                        id="text-font-size"
                        type="number"
                        min={8}
                        max={120}
                        value={editingText.fontSize || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "") {
                            handleUpdateTextElement(editingText.id, {
                              fontSize: 0,
                            });
                            return;
                          }
                          const num = Number(val);
                          if (!isNaN(num)) {
                            handleUpdateTextElement(editingText.id, {
                              fontSize: num,
                            });
                          }
                        }}
                        className="w-full"
                      />
                      <p className="text-muted-foreground pt-1 text-xs">
                        Current: {editingText.fontSize}px
                      </p>
                    </div>

                    {/* Text Color */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="text-color"
                        className="text-sm font-medium"
                      >
                        Text Color
                      </Label>
                      <div className="flex items-center gap-3">
                        <Input
                          id="text-color"
                          type="color"
                          value={editingText.fill}
                          onChange={(e) =>
                            handleUpdateTextElement(editingText.id, {
                              fill: e.target.value,
                            })
                          }
                          className="h-10 w-20"
                        />
                        <Input
                          type="text"
                          value={editingText.fill}
                          onChange={(e) =>
                            handleUpdateTextElement(editingText.id, {
                              fill: e.target.value,
                            })
                          }
                          className="flex-1"
                          placeholder="#000000"
                        />
                      </div>
                    </div>

                    {/* Font Family */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="text-font-family"
                        className="text-sm font-medium"
                      >
                        Font Family
                      </Label>
                      <Select
                        value={editingText.fontFamily}
                        onValueChange={(value) =>
                          handleUpdateTextElement(editingText.id, {
                            fontFamily: value,
                          })
                        }
                      >
                        <SelectTrigger
                          id="text-font-family"
                          className="w-full"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Arial">Arial</SelectItem>
                          <SelectItem value="Helvetica">Helvetica</SelectItem>
                          <SelectItem value="Times New Roman">
                            Times New Roman
                          </SelectItem>
                          <SelectItem value="Courier New">
                            Courier New
                          </SelectItem>
                          <SelectItem value="Georgia">Georgia</SelectItem>
                          <SelectItem value="Verdana">Verdana</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Font Style */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="text-font-style"
                        className="text-sm font-medium"
                      >
                        Font Style
                      </Label>
                      <Select
                        value={editingText.fontStyle || "normal"}
                        onValueChange={(value) =>
                          handleUpdateTextElement(editingText.id, {
                            fontStyle: value,
                          })
                        }
                      >
                        <SelectTrigger
                          id="text-font-style"
                          className="w-full"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="bold">Bold</SelectItem>
                          <SelectItem value="italic">Italic</SelectItem>
                          <SelectItem value="bold italic">
                            Bold Italic
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Text Alignment */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="text-align"
                        className="text-sm font-medium"
                      >
                        Text Alignment
                      </Label>
                      <Select
                        value={editingText.align || "left"}
                        onValueChange={(value: any) =>
                          handleUpdateTextElement(editingText.id, {
                            align: value,
                          })
                        }
                      >
                        <SelectTrigger
                          id="text-align"
                          className="w-full"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Left</SelectItem>
                          <SelectItem value="center">Center</SelectItem>
                          <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Position Info */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Position</Label>
                      <div className="text-muted-foreground space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>X:</span>
                          <span>{Math.round(editingText.x)}px</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Y:</span>
                          <span>{Math.round(editingText.y)}px</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rotation:</span>
                          <span>{Math.round(editingText.rotation || 0)}°</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Delete Button - Fixed at bottom */}
            {editingTextElementId && (
              <div className="mt-auto shrink-0 border-t pt-6 pb-4">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    handleDeleteClick(editingTextElementId, "text");
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Text
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* Section Settings Drawer */}
        <Sheet
          open={isSectionSettingsOpen}
          onOpenChange={setIsSectionSettingsOpen}
        >
          <SheetContent className="flex w-[400px] flex-col px-6 sm:w-[540px]">
            <div className="flex-1 overflow-y-auto">
              <SheetHeader className="pb-4">
                <SheetTitle>Section Settings</SheetTitle>
                <SheetDescription>
                  Configure the guest section
                </SheetDescription>
              </SheetHeader>

              {(() => {
                const editingSection = sections.find(
                  (s) => s.id === editingSectionId,
                );
                if (!editingSection) return null;

                return (
                  <div className="space-y-6 pt-4">
                    {/* Section Name */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="section-name"
                        className="text-sm font-medium"
                      >
                        Section Name
                      </Label>
                      <Input
                        id="section-name"
                        value={editingSection.name}
                        onChange={(e) =>
                          handleUpdateSection(editingSection.id, {
                            name: e.target.value,
                          })
                        }
                        placeholder="e.g. Premium North"
                        className="w-full"
                      />
                    </div>

                    {/* Section Color */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="section-color"
                        className="text-sm font-medium"
                      >
                        Section Color
                      </Label>
                      <div className="flex items-center gap-3">
                        <Input
                          id="section-color"
                          type="color"
                          value={editingSection.color}
                          onChange={(e) =>
                            handleUpdateSection(editingSection.id, {
                              color: e.target.value,
                            })
                          }
                          className="h-10 w-20"
                        />
                        <Input
                          type="text"
                          value={editingSection.color}
                          onChange={(e) =>
                            handleUpdateSection(editingSection.id, {
                              color: e.target.value,
                            })
                          }
                          className="flex-1"
                          placeholder="#000000"
                        />
                      </div>
                    </div>

                    {/* Ticket Pricing (Ticket Mode) */}
                    {
                      editingSection.pricing && (
                        <div className="space-y-4 pt-4 border-t">
                          <h4 className="font-semibold flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            Ticket Pricing
                          </h4>

                          <div className="space-y-3">
                            <Label className="text-sm font-medium">Highest Price (Front Row)</Label>
                            <div className="relative">
                              <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                              <Input
                                type="number"
                                className="pl-7"
                                value={editingSection.pricing.highestPrice}
                                onChange={(e) => handleUpdateSection(editingSection.id, {
                                  pricing: {
                                    ...editingSection.pricing,
                                    highestPrice: Number(e.target.value)
                                  }
                                })}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-3">
                              <Label className="text-sm font-medium">Price Drop</Label>
                              <Input
                                type="number"
                                value={editingSection.pricing.priceDifference}
                                onChange={(e) => handleUpdateSection(editingSection.id, {
                                  pricing: {
                                    ...editingSection.pricing,
                                    priceDifference: Number(e.target.value)
                                  }
                                })}
                              />
                            </div>
                            <div className="space-y-3">
                              <Label className="text-sm font-medium">Decrease By</Label>
                              <Select
                                value={editingSection.pricing.differenceType}
                                onValueChange={(val: "$" | "%") => handleUpdateSection(editingSection.id, {
                                  pricing: {
                                    ...editingSection.pricing,
                                    differenceType: val
                                  }
                                })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="$">Amount ($)</SelectItem>
                                  <SelectItem value="%">Percent (%)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <p className="text-xs text-muted-foreground bg-blue-50 text-blue-800 p-2 rounded">
                            Prices decrease row-by-row from front to back.
                          </p>

                          {/* Price Breakdown Preview */}
                          <div className="bg-muted/30 rounded-lg p-3 space-y-2 max-h-40 overflow-y-auto border">
                            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price Breakdown (Preview)</Label>
                            <div className="space-y-1">
                              {(() => {
                                const prices = calculateSectionPricing(editingSection);
                                const uniquePrices = new Set(prices.values());
                                const sortedUniquePrices = Array.from(uniquePrices).sort((a, b) => b - a);

                                if (sortedUniquePrices.length === 0) return <p className="text-xs text-muted-foreground">No seats detected.</p>;

                                return sortedUniquePrices.map((price, idx) => (
                                  <div key={idx} className="flex justify-between text-xs">
                                    <span>Row Group {idx + 1}</span>
                                    <span className="font-medium">${price}</span>
                                  </div>
                                ));
                              })()}
                            </div>
                          </div>
                        </div>
                      )
                    }

                    {/* Additional info placeholder */}
                    <div className="bg-muted/50 rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Total Seats</span>
                        <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-bold">
                          {getSectionChairCount(editingSection)}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-2 text-xs">
                        This section contains {editingSection.points.length / 2} boundary points.
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Delete Button - Fixed at bottom */}
            {editingSectionId && (
              <div className="mt-auto shrink-0 border-t pt-6 pb-4">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    handleDeleteClick(editingSectionId, "section");
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Section
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* Multi-Selection Settings Drawer */}
        <Sheet
          open={isMultiSettingsOpen}
          onOpenChange={setIsMultiSettingsOpen}
        >
          <SheetContent className="flex w-[400px] flex-col px-6 sm:w-[540px]">
            <div className="flex-1 overflow-y-auto">
              <SheetHeader className="pb-4">
                <SheetTitle>
                  {multiSelectionType === "mixed"
                    ? "Selection Settings"
                    : `${multiSelectionType === "chairs" ? "Chairs" : multiSelectionType === "booths" ? "Booths" : multiSelectionType === "sections" ? "Sections" : "Tables"} Settings`}
                </SheetTitle>
                <SheetDescription>
                  Configure your selection ({getSelectionSeatCount(selectedIds)} seats total)
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6 px-1">
                {/* Selection Info */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Selection Summary
                  </Label>
                  <div className="bg-muted/50 rounded-lg border p-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          Total Capacity:
                        </span>
                        <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-bold">
                          {getSelectionSeatCount(selectedIds)} seats
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Group Assignment - Available for all selection types */}
                <div className="space-y-3">
                  <Label
                    htmlFor="multi-group"
                    className="text-sm font-medium"
                  >
                    {multiSelectionType === "mixed"
                      ? "Assign Group to All"
                      : "Group Assignment"}
                  </Label>
                  {(() => {
                    // Determine the current group value for the selection
                    let currentGroupValue = "";
                    const groups = selectedIds.map((id) => {
                      const chairRow = chairRows.find((row) => row.id === id);
                      if (chairRow) return chairRow.group || "unassigned";
                      const table = tables.find((t) => t.id === id);
                      if (table) return table.group || "unassigned";
                      return "unassigned";
                    });

                    // If all items have the same group, show it
                    const uniqueGroups = [...new Set(groups)];
                    if (uniqueGroups.length === 1) {
                      currentGroupValue = uniqueGroups[0];
                    }

                    return (
                      <Select
                        value={currentGroupValue}
                        onValueChange={(value) => {
                          if (value && value !== "") {
                            handleBulkGroupAssignment(
                              value === "unassigned" ? undefined : value,
                            );
                          }
                        }}
                      >
                        <SelectTrigger
                          id="multi-group"
                          className="w-full"
                        >
                          <SelectValue placeholder="Select a group to assign..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unassigned">
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded border bg-white" />
                              <span>Unassigned</span>
                            </div>
                          </SelectItem>
                          {tableGroups.map((group) => (
                            <SelectItem
                              key={group.id}
                              value={group.id}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className="h-4 w-4 rounded border"
                                  style={{ backgroundColor: group.color }}
                                />
                                <span>{group.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    );
                  })()}
                  <p className="text-muted-foreground text-xs">
                    {multiSelectionType === "mixed"
                      ? "This will assign all selected items to the same group"
                      : `Assign all selected ${multiSelectionType} to a group`}
                  </p>
                </div>

                {/* Type-specific settings for non-mixed selections */}
                {multiSelectionType !== "mixed" && (
                  <>
                    {/* Additional settings for chairs */}
                    {multiSelectionType === "chairs" && (
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">
                          Bulk Chair Settings
                        </Label>
                        <div className="bg-muted/50 rounded-lg border p-4">
                          <p className="text-muted-foreground text-sm">
                            Individual chair row settings (spacing, count, etc.)
                            can be adjusted by selecting each row individually.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Additional settings for tables */}
                    {multiSelectionType === "tables" && (
                      <div className="space-y-3">
                        <Label
                          htmlFor="bulk-table-shape"
                          className="text-sm font-medium"
                        >
                          Change Shape for All Tables
                        </Label>
                        {(() => {
                          // Determine current shape if all tables have the same shape
                          let currentShapeValue = "";
                          const shapes = selectedIds
                            .map((id) => {
                              const table = tables.find((t) => t.id === id);
                              return table?.shape;
                            })
                            .filter((shape) => shape && shape !== "booth");

                          // If all tables have the same shape, show it
                          const uniqueShapes = [...new Set(shapes)];
                          if (
                            uniqueShapes.length === 1 &&
                            (uniqueShapes[0] === "round" ||
                              uniqueShapes[0] === "rectangular" ||
                              uniqueShapes[0] === "square")
                          ) {
                            currentShapeValue = uniqueShapes[0] === "square" ? "rectangular" : uniqueShapes[0];
                          }

                          return (
                            <Select
                              value={currentShapeValue}
                              onValueChange={(value: "round" | "rectangular") => {
                                if (value) {
                                  handleBulkShapeChange(value);
                                }
                              }}
                            >
                              <SelectTrigger
                                id="bulk-table-shape"
                                className="w-full"
                              >
                                <SelectValue placeholder="Select a shape..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="round">Round</SelectItem>
                                <SelectItem value="rectangular">Rectangle</SelectItem>
                              </SelectContent>
                            </Select>
                          );
                        })()}
                        <p className="text-muted-foreground text-xs">
                          Change the shape of all selected tables at once.
                          Individual seat counts can be adjusted by selecting
                          each table separately.
                        </p>
                      </div>
                    )}

                    {/* Booths - No shape change option */}
                    {multiSelectionType === "booths" && (
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">
                          Bulk Booth Settings
                        </Label>
                        <div className="bg-muted/50 rounded-lg border p-4">
                          <p className="text-muted-foreground text-sm">
                            Individual booth settings (seats, size, etc.) can be
                            adjusted by selecting each booth individually.
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}

              </div>
            </div>

            {/* Delete All Button - Fixed at bottom */}
            <div className="mt-auto shrink-0 border-t pt-6 pb-4">
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  // Delete all selected items
                  selectedIds.forEach((id) => {
                    const table = tables.find((t) => t.id === id);
                    if (table) {
                      setTables((prev) => prev.filter((t) => t.id !== id));
                    } else if (chairRows.some((row) => row.id === id)) {
                      setChairRows((prev) =>
                        prev.filter((row) => row.id !== id),
                      );
                    }
                  });
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove all {getSelectionSeatCount(selectedIds)} seats
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Toolbar - Only show in design mode */}
        {
          mode === "design" && (
            <div className="bg-card flex shrink-0 flex-wrap items-center justify-between gap-2 border-b p-3">
              <div className="flex items-center gap-2">
                <Home className="text-primary h-5 w-5" />
                <h3 className="font-semibold">Venue Designer</h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Tool Selection - Reorganized with Dropdowns */}
                <div className="flex items-center gap-1">
                  {/* Select Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        variant={
                          currentTool === "select" || currentTool === "pan"
                            ? "default"
                            : "outline"
                        }
                        className="gap-1"
                      >
                        {currentTool === "select" ? (
                          <MousePointer2 className="h-4 w-4" />
                        ) : currentTool === "pan" ? (
                          <Hand className="h-4 w-4" />
                        ) : (
                          <MousePointer2 className="h-4 w-4" />
                        )}
                        <span className="text-xs">Select</span>
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setCurrentTool("select")}>
                        <MousePointer2 className="mr-2 h-4 w-4" />
                        <span>Select & Transform</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCurrentTool("pan")}>
                        <Hand className="mr-2 h-4 w-4" />
                        <span>Pan Canvas</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Add Layout Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        variant={
                          currentTool === "draw" ||
                            currentTool === "door" ||
                            currentTool === "window" ||
                            currentTool === "section-add"
                            ? "default"
                            : "outline"
                        }
                        className="gap-1"
                      >
                        <Layers className="h-4 w-4" />
                        <span className="text-xs">Add Layout</span>
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setCurrentTool("draw")}>
                        <Ruler className="mr-2 h-4 w-4" />
                        <span>Draw Lines</span>
                      </DropdownMenuItem>
                      {/* Add Section - Only in Ticket Mode */}
                      {ticketMode && (
                        <DropdownMenuItem onClick={() => setCurrentTool("section-add")}>
                          <Grid3x3 className="mr-2 h-4 w-4" />
                          <span>Draw Section</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setCurrentTool("door")}>
                        <DoorOpen className="mr-2 h-4 w-4" />
                        <span>Add Door</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCurrentTool("window")}>
                        <Square className="mr-2 h-4 w-4" />
                        <span>Add Window</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Seating Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        variant={
                          currentTool === "chair-row" ||
                            currentTool === "chair-single" ||
                            currentTool === "table" ||
                            currentTool === "booth"
                            ? "default"
                            : "outline"
                        }
                        className="gap-1"
                      >
                        <TableIconLucide className="h-4 w-4" />
                        <span className="text-xs">Seating</span>
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <Armchair className="mr-2 h-4 w-4" />
                          <span>Add Chair</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem
                            onClick={() => setCurrentTool("chair-single")}
                          >
                            <Armchair className="mr-2 h-4 w-4" />
                            <span>Single Chair</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setCurrentTool("chair-row")}
                          >
                            <Rows3 className="mr-2 h-4 w-4" />
                            <span>Chair Row (Drag)</span>
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                      {/* Tables and Booths - Only in RSVP Mode (not Ticket Mode) */}
                      {!ticketMode && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              <TableIconLucide className="mr-2 h-4 w-4" />
                              <span>Add Table</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => {
                                  const dims = calculateTableDimensions("round", tableConfig.seats);
                                  setTableConfig((c) => ({
                                    ...c,
                                    shape: "round",
                                    width: dims.width,
                                    height: dims.height,
                                  }));
                                  setCurrentTool("table");
                                }}
                              >
                                <CircleIcon className="mr-2 h-4 w-4" />
                                <span>Round Table</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  const dims = calculateTableDimensions("rectangular", tableConfig.seats);
                                  setTableConfig((c) => ({
                                    ...c,
                                    shape: "rectangular",
                                    width: dims.width,
                                    height: dims.height,
                                  }));
                                  setCurrentTool("table");
                                }}
                              >
                                <Square className="mr-2 h-4 w-4" />
                                <span>Rectangular Table</span>
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                          <DropdownMenuItem onClick={() => setCurrentTool("booth")}>
                            <Store className="mr-2 h-4 w-4" />
                            <span>Add Booth</span>
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Objects Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        variant={currentTool === "object" ? "default" : "outline"}
                        className="gap-1"
                      >
                        <Box className="h-4 w-4" />
                        <span className="text-xs">Objects</span>
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {OBJECT_TYPES.map((obj) => (
                        <DropdownMenuItem
                          key={obj.type}
                          onClick={() => {
                            setCurrentTool("object");
                            setObjectType(obj.type);
                          }}
                        >
                          <Box className="mr-2 h-4 w-4" />
                          <span>{obj.name}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Text Tool */}
                  <Button
                    size="sm"
                    variant={currentTool === "text" ? "default" : "outline"}
                    onClick={() => setCurrentTool("text")}
                    className="gap-1"
                  >
                    <Type className="h-4 w-4" />
                    <span className="text-xs">Add text</span>
                  </Button>
                </div>

                <Separator
                  orientation="vertical"
                  className="h-8"
                />

                {/* Wall Type (when wall tool selected) */}
                {currentTool === "wall" && (
                  <Select
                    value={wallType}
                    onValueChange={(v: any) => setWallType(v)}
                  >
                    <SelectTrigger className="h-8 w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exterior">Exterior</SelectItem>
                      <SelectItem value="glass">Glass</SelectItem>
                    </SelectContent>
                  </Select>
                )}

                {/* Chair Row Config (when chair-row tool selected) */}
                {currentTool === "chair-row" && (
                  <div className="flex items-center gap-2">
                    <Label className="text-xs">Spacing:</Label>
                    <Input
                      type="number"
                      value={chairRowConfig.spacing || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "") {
                          setChairRowConfig((c) => ({
                            ...c,
                            spacing: 0,
                          }));
                          return;
                        }
                        const num = Number(val);
                        if (!isNaN(num)) {
                          setChairRowConfig((c) => ({
                            ...c,
                            spacing: num,
                          }));
                        }
                      }}
                      className="h-8 w-16"
                      min={30}
                      max={100}
                    />
                    <Label className="text-xs">Rows:</Label>
                    <Input
                      type="number"
                      value={chairRowConfig.multipleRows || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "") {
                          setChairRowConfig((c) => ({
                            ...c,
                            multipleRows: 0,
                          }));
                          return;
                        }
                        const num = Number(val);
                        if (!isNaN(num)) {
                          setChairRowConfig((c) => ({
                            ...c,
                            multipleRows: num,
                          }));
                        }
                      }}
                      className="h-8 w-14"
                      min={1}
                      max={20}
                    />
                  </div>
                )}

                {/* Clear Drawings button (when drawing lines exist) */}
                {drawingLines.length > 0 && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsClearDrawingsDialogOpen(true)}
                    className="gap-1 text-red-600 hover:border-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                    <span className="text-xs">
                      Clear Drawings ({drawingLines.length})
                    </span>
                  </Button>
                )}

                {/* Table Config (when table tool selected) */}
                {currentTool === "table" && (
                  <div className="flex items-center gap-2">
                    <Select
                      value={tableConfig.shape === "square" ? "rectangular" : tableConfig.shape}
                      onValueChange={(v: any) => {
                        const dims = calculateTableDimensions(v, tableConfig.seats);
                        setTableConfig((c) => ({
                          ...c,
                          shape: v,
                          width: dims.width,
                          height: dims.height
                        }));
                      }}
                    >
                      <SelectTrigger className="h-8 w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="round">Round</SelectItem>
                        <SelectItem value="rectangular">Rectangle</SelectItem>
                      </SelectContent>
                    </Select>
                    <Label className="text-xs">Seats:</Label>
                    <Input
                      type="number"
                      value={tableConfig.seats || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "") {
                          setTableConfig((c) => ({
                            ...c,
                            seats: 0,
                          }));
                          return;
                        }
                        const seats = Number(val);
                        if (!isNaN(seats)) {
                          const finalSeats = seats > 20 ? 20 : seats;
                          const dims = calculateTableDimensions(
                            tableConfig.shape,
                            finalSeats,
                          );
                          setTableConfig((c) => ({
                            ...c,
                            seats: finalSeats,
                            width: dims.width,
                            height: dims.height,
                          }));
                        }
                      }}
                      onBlur={(e) => {
                        const val = Number(e.target.value);
                        if (isNaN(val) || val < 2) {
                          const seats = 2;
                          const dims = calculateTableDimensions(
                            tableConfig.shape,
                            seats,
                          );
                          setTableConfig((c) => ({
                            ...c,
                            seats: seats,
                            width: dims.width,
                            height: dims.height,
                          }));
                        }
                      }}
                      className="h-8 w-14"
                      min={2}
                      max={20}
                    />
                    <span className="text-muted-foreground ml-1 text-[10px]">
                      (Max 20)
                    </span>
                  </div>
                )}

                {/* Object Type (when object tool selected) */}
                {currentTool === "object" && (
                  <Select
                    value={objectType}
                    onValueChange={setObjectType}
                  >
                    <SelectTrigger className="h-8 w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {OBJECT_TYPES.map((obj) => (
                        <SelectItem
                          key={obj.type}
                          value={obj.type}
                        >
                          {obj.icon} {obj.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {/* Text Config (when text tool selected) */}
                {currentTool === "text" && (
                  <div className="flex items-center gap-2">
                    <Label className="text-xs">Size:</Label>
                    <Input
                      type="number"
                      value={textConfig.fontSize || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "") {
                          setTextConfig((c) => ({
                            ...c,
                            fontSize: 0,
                          }));
                          return;
                        }
                        const num = Number(val);
                        if (!isNaN(num)) {
                          setTextConfig((c) => ({
                            ...c,
                            fontSize: num,
                          }));
                        }
                      }}
                      className="h-8 w-14"
                      min={8}
                      max={72}
                    />
                    <Label className="text-xs">Color:</Label>
                    <Input
                      type="color"
                      value={textConfig.fill}
                      onChange={(e) =>
                        setTextConfig((c) => ({ ...c, fill: e.target.value }))
                      }
                      className="h-8 w-16"
                    />
                    <Select
                      value={textConfig.fontFamily}
                      onValueChange={(v) =>
                        setTextConfig((c) => ({ ...c, fontFamily: v }))
                      }
                    >
                      <SelectTrigger className="h-8 w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Times New Roman">Times</SelectItem>
                        <SelectItem value="Courier New">Courier</SelectItem>
                        <SelectItem value="Georgia">Georgia</SelectItem>
                        <SelectItem value="Verdana">Verdana</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={textConfig.fontStyle}
                      onValueChange={(v) =>
                        setTextConfig((c) => ({ ...c, fontStyle: v }))
                      }
                    >
                      <SelectTrigger className="h-8 w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="bold">Bold</SelectItem>
                        <SelectItem value="italic">Italic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Separator
                  orientation="vertical"
                  className="h-8"
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
                </div>

                <Separator
                  orientation="vertical"
                  className="h-8"
                />

                {/* Zoom Controls */}
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={zoomOut}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="w-14 text-center text-xs">
                    {Math.round(scale * 100)}%
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={zoomIn}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={resetZoom}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                <Separator
                  orientation="vertical"
                  className="h-8"
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
                  className="h-8"
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
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleExportImage}
                  >
                    <Download className="mr-1 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          )
        }

        {/* Seating Mode Header */}
        {
          mode === "seating" && (
            <div className="bg-card flex shrink-0 items-center justify-between gap-2 border-b p-3">
              <div className="flex items-center gap-2">
                <Armchair className="text-primary h-5 w-5" />
                <h3 className="font-semibold">Seating Arrangement</h3>
                <span className="text-muted-foreground ml-2 text-xs">
                  View layout and assign guests to seats
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={sidebarCollapsed ? "outline" : "secondary"}
                  onClick={onToggleSidebar}
                  className={`gap-2 ${!sidebarCollapsed ? "bg-purple-100 text-purple-700 hover:bg-purple-200" : ""}`}
                >
                  <Users className="h-4 w-4" />
                  <span className="text-xs">Guest List</span>
                  {sidebarCollapsed ? (
                    <ChevronLeft className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </Button>

                <div className="bg-border h-6 w-px mx-1" />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      variant={
                        currentTool === "select" || currentTool === "pan"
                          ? "default"
                          : "outline"
                      }
                      className="gap-1"
                    >
                      {currentTool === "select" ? (
                        <MousePointer2 className="h-4 w-4" />
                      ) : currentTool === "pan" ? (
                        <Hand className="h-4 w-4" />
                      ) : (
                        <MousePointer2 className="h-4 w-4" />
                      )}
                      <span className="text-xs">Select</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setCurrentTool("select")}>
                      <MousePointer2 className="mr-2 h-4 w-4" />
                      <span>Select</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCurrentTool("pan")}>
                      <Hand className="mr-2 h-4 w-4" />
                      <span>Pan Canvas</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="bg-border h-6 w-px mx-1" />

                {/* Zoom Controls */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={zoomOut}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="w-14 text-center text-xs">
                  {Math.round(scale * 100)}%
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={zoomIn}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetZoom}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )
        }

        {/* Instructions - Only show in design mode */}
        {
          mode === "design" && (
            <div className="bg-muted/50 text-muted-foreground shrink-0 border-b px-4 py-2 text-sm">
              {currentTool === "wall" && (
                <span>
                  Click to place wall points • Press{" "}
                  <kbd className="bg-muted rounded px-1">Esc</kbd> to finish •
                  Press <kbd className="bg-muted rounded px-1">Enter</kbd> to
                  close as room
                </span>
              )}
              {currentTool === "chair-row" && (
                <span>
                  <strong>Drag</strong> to create a row of chairs • Configure
                  spacing and number of rows above
                </span>
              )}
              {currentTool === "select" && (
                <span>
                  Click to select • Shift+Click for multi-select •{" "}
                  <strong>Drag</strong> for area selection • Drag handles to
                  transform • Press{" "}
                  <kbd className="bg-muted rounded px-1">Delete</kbd> to remove
                </span>
              )}
              {currentTool === "pan" && (
                <span>Drag to pan the canvas • Scroll to zoom</span>
              )}
              {(currentTool === "door" || currentTool === "window") && (
                <span>
                  Click to place • Select and drag to move • Use handles to
                  resize/rotate
                </span>
              )}
              {currentTool === "table" && (
                <span>
                  Click to place table • Configure shape and seats above
                </span>
              )}
              {currentTool === "object" && (
                <span>Click to place object • Select type above</span>
              )}
              {currentTool === "booth" && (
                <span>Click to place vendor booth with chairs</span>
              )}
              {currentTool === "text" && (
                <span>
                  Click to place text and start typing • Double-click existing
                  text to edit • Configure style above
                </span>
              )}
              {currentTool === "draw" && (
                <span>
                  Click to draw connected lines with measurements • Each segment
                  shows its length • Press{" "}
                  <kbd className="bg-muted rounded px-1">Esc</kbd> to finish and
                  save
                </span>
              )}
              {currentTool === "section-add" && (
                <span>
                  Click to place section points • Press{" "}
                  <kbd className="bg-muted rounded px-1">Esc</kbd> to finish and
                  save section
                </span>
              )}
            </div>
          )
        }

        {/* Canvas - Full Width */}
        <div
          ref={containerRef}
          className="bg-muted/30 relative w-full flex-1 overflow-hidden"
          style={{ minHeight: "600px" }}
        >
          {/* Floating action buttons for selected items - Only show in design mode */}
          {mode === "design" &&
            !isDraggingItem &&
            selectedIds.length > 0 &&
            (() => {
              // Multi-selection handling
              if (selectedIds.length > 1) {
                const selectionType = getMultiSelectionType(selectedIds);
                if (!selectionType) return null;

                const stage = stageRef.current;
                const container = containerRef.current;
                if (!stage || !container) return null;

                // Priority: If exactly one section is selected, treat it as the primary for settings
                const selectedSections = sections.filter(s => selectedIds.includes(s.id));
                const primarySection = selectedSections.length === 1 ? selectedSections[0] : null;

                // Calculate center position of all selected items
                let avgX = 0,
                  avgY = 0,
                  validCount = 0;
                selectedIds.forEach((id) => {
                  const chairRow = chairRows.find((row) => row.id === id);
                  const table = tables.find((t) => t.id === id);
                  const item = chairRow || table || sections.find(s => s.id === id);
                  if (item && "x" in item && "y" in item) {
                    avgX += item.x;
                    avgY += item.y;
                    validCount++;
                  }
                });

                if (validCount === 0) return null;
                avgX /= validCount;
                avgY /= validCount;

                const buttonX = avgX * scale + position.x;
                const buttonY = avgY * scale + position.y - 80;

                const containerRect = container.getBoundingClientRect();
                const clampedX = Math.max(
                  10,
                  Math.min(buttonX, containerRect.width - 200),
                );
                const clampedY = Math.max(10, buttonY);

                return (
                  <div
                    className="pointer-events-auto absolute z-50 flex gap-2"
                    style={{
                      left: `${clampedX}px`,
                      top: `${clampedY}px`,
                    }}
                  >
                    <div className="rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white shadow-lg">
                      {getSelectionSeatCount(selectedIds)} seats selected
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-9 bg-white px-3 shadow-lg hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (primarySection) {
                          handleOpenSectionSettings(primarySection.id);
                        } else {
                          handleOpenMultiSettings();
                        }
                      }}
                      title="Settings"
                    >
                      <Settings className="mr-1 h-4 w-4" />
                      Settings
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-9 px-3 shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Delete all selected items
                        selectedIds.forEach((id) => {
                          const table = tables.find((t) => t.id === id);
                          if (table) {
                            handleDeleteClick(
                              id,
                              table.shape === "booth" ? "booth" : "table",
                            );
                          } else if (chairRows.some((row) => row.id === id)) {
                            handleDeleteClick(id, "chair-row");
                          }
                        });
                      }}
                      title="Delete All"
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      Remove all seats
                    </Button>
                  </div>
                );
              }

              // Single selection handling (existing code)
              const selectedId = selectedIds[0];
              const selectedTable = tables.find((t) => t.id === selectedId);
              const selectedChairRow = chairRows.find(
                (row) => row.id === selectedId,
              );
              const selectedDoor = doors.find((d) => d.id === selectedId);
              const selectedWindow = windows.find((w) => w.id === selectedId);
              const selectedObject = objects.find((o) => o.id === selectedId);
              const selectedText = textElements.find(
                (txt) => txt.id === selectedId,
              );
              const selectedDrawing = drawingLines.find(
                (line) => line.id === selectedId,
              );
              const selectedSection = sections.find(
                (s) => s.id === selectedId,
              );

              const selectedItem =
                selectedTable ||
                selectedChairRow ||
                selectedDoor ||
                selectedWindow ||
                selectedObject ||
                selectedText ||
                selectedSection ||
                selectedDrawing;
              if (!selectedItem) return null;

              const stage = stageRef.current;
              const container = containerRef.current;
              if (!stage || !container) return null;

              // Get container bounds
              const containerRect = container.getBoundingClientRect();

              // Calculate position for buttons relative to container
              let buttonX, buttonY;
              if (selectedDrawing) {
                // For drawing lines, position at the midpoint of first segment
                if (selectedDrawing.points.length >= 4) {
                  buttonX =
                    ((selectedDrawing.points[0] + selectedDrawing.points[2]) /
                      2) *
                    scale +
                    position.x;
                  buttonY =
                    ((selectedDrawing.points[1] + selectedDrawing.points[3]) /
                      2) *
                    scale +
                    position.y -
                    60;
                } else {
                  buttonX = selectedDrawing.points[0] * scale + position.x;
                  buttonY = selectedDrawing.points[1] * scale + position.y - 60;
                }
              } else if (selectedSection) {
                buttonX = selectedSection.x * scale + position.x;
                buttonY = selectedSection.y * scale + position.y - 60;
              } else if ("x" in selectedItem && "y" in selectedItem) {
                buttonX = selectedItem.x * scale + position.x;
                buttonY = selectedItem.y * scale + position.y - 60;
              } else {
                return null; // Can't position button
              }

              // Make sure buttons are visible within container
              const clampedX = Math.max(
                10,
                Math.min(buttonX, containerRect.width - 100),
              );
              const clampedY = Math.max(10, buttonY);

              // Determine if item has settings (tables, booths, chair rows, and text)
              const hasSettings =
                selectedTable || selectedChairRow || selectedText || selectedSection;

              return (
                <div
                  className="pointer-events-auto absolute z-50 flex gap-2"
                  style={{
                    left: `${clampedX}px`,
                    top: `${clampedY}px`,
                  }}
                >
                  {hasSettings && (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-9 w-9 bg-white p-0 shadow-lg hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (selectedTable) {
                          handleOpenSettings(selectedTable.id);
                        } else if (selectedChairRow) {
                          handleOpenChairSettings(selectedChairRow.id);
                        } else if (selectedText) {
                          handleOpenTextSettings(selectedText.id);
                        } else if (selectedSection) {
                          handleOpenSectionSettings(selectedSection.id);
                        }
                      }}
                      title="Settings"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-9 w-9 p-0 shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (selectedTable) {
                        handleDeleteClick(
                          selectedTable.id,
                          selectedTable.shape === "booth" ? "booth" : "table",
                        );
                      } else if (selectedChairRow) {
                        handleDeleteClick(selectedChairRow.id, "chair-row");
                      } else if (selectedDoor) {
                        handleDeleteClick(selectedDoor.id, "door");
                      } else if (selectedWindow) {
                        handleDeleteClick(selectedWindow.id, "window");
                      } else if (selectedObject) {
                        handleDeleteClick(selectedObject.id, "object");
                      } else if (selectedText) {
                        handleDeleteClick(selectedText.id, "text");
                      } else if (selectedSection) {
                        handleDeleteClick(selectedSection.id, "section");
                      } else if (selectedDrawing) {
                        handleDeleteClick(selectedDrawing.id, "drawing");
                      }
                    }}
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })()}

          {/* Inline text editing input */}
          {editingTextId &&
            (() => {
              const editingText = textElements.find(
                (txt) => txt.id === editingTextId,
              );
              if (!editingText) return null;

              const inputX = editingText.x * scale + position.x;
              const inputY = editingText.y * scale + position.y;

              return (
                <input
                  ref={textInputRef}
                  type="text"
                  value={editingTextValue}
                  onChange={(e) => setEditingTextValue(e.target.value)}
                  onBlur={handleTextEdit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleTextEdit();
                    } else if (e.key === "Escape") {
                      setEditingTextId(null);
                      setEditingTextValue("");
                    }
                  }}
                  className="absolute z-50 rounded border-2 border-blue-500 bg-white px-2 py-1 shadow-lg outline-none"
                  style={{
                    left: `${inputX}px`,
                    top: `${inputY}px`,
                    fontSize: `${editingText.fontSize * scale}px`,
                    fontFamily: editingText.fontFamily,
                    color: editingText.fill,
                    fontWeight: editingText.fontStyle?.includes("bold")
                      ? "bold"
                      : "normal",
                    fontStyle: editingText.fontStyle?.includes("italic")
                      ? "italic"
                      : "normal",
                    minWidth: "100px",
                  }}
                />
              );
            })()}

          <Stage
            ref={stageRef}
            width={stageSize.width}
            height={stageSize.height}
            scaleX={scale}
            scaleY={scale}
            x={position.x}
            y={position.y}
            draggable={currentTool === "pan"}
            onMouseDown={handleStageMouseDown}
            onMouseMove={handleStageMouseMove}
            onMouseUp={handleStageMouseUp}
            onDragEnd={(e) => {
              if (currentTool === "pan") {
                setPosition({ x: e.target.x(), y: e.target.y() });
              }
            }}
            style={{
              cursor:
                mode === "seating" && draggedGuest
                  ? "copy" // Show copy cursor when dragging a guest
                  : currentTool === "pan"
                    ? "grab"
                    : currentTool === "select"
                      ? "default"
                      : "crosshair",
            }}
          >
            {/* Grid Layer */}
            <Layer listening={false}>{renderGrid}</Layer>

            {/* Main Layer */}
            <Layer ref={layerRef}>
              {/* Walls */}
              {walls.map((wall) => (
                <Line
                  key={wall.id}
                  id={wall.id}
                  points={wall.points}
                  stroke={wall.color}
                  strokeWidth={wall.thickness}
                  lineCap="round"
                  lineJoin="round"
                  onClick={(e) => handleSelect(wall.id, e)}
                />
              ))}

              {/* Drawing preview wall */}
              {isDrawing &&
                currentTool === "wall" &&
                drawingPoints.length >= 2 && (
                  <Line
                    points={drawingPoints}
                    stroke={WALL_COLORS[wallType]}
                    strokeWidth={WALL_THICKNESS[wallType]}
                    lineCap="round"
                    lineJoin="round"
                    dash={[10, 5]}
                    opacity={0.7}
                  />
                )}

              {/* Doors */}
              {doors.map((door) => {
                const isSelected = selectedIds.includes(door.id);
                return (
                  <Group
                    key={door.id}
                    id={door.id}
                    x={door.x}
                    y={door.y}
                    rotation={door.rotation}
                    draggable={currentTool === "select"}
                    onClick={(e) => handleSelect(door.id, e)}
                    onDragStart={() => setIsDraggingItem(true)}
                    onDragEnd={(e) => {
                      setIsDraggingItem(false);
                      handleDragEnd("door", door.id, e);
                    }}
                    onTransformEnd={(e) =>
                      handleTransformEnd("door", door.id, e)
                    }
                  >
                    <DoorIcon
                      width={door.width}
                      height={door.height}
                      isSelected={isSelected}
                    />
                  </Group>
                );
              })}

              {/* Windows */}
              {windows.map((window) => {
                const isSelected = selectedIds.includes(window.id);
                return (
                  <Group
                    key={window.id}
                    id={window.id}
                    x={window.x}
                    y={window.y}
                    rotation={window.rotation}
                    draggable={currentTool === "select"}
                    onClick={(e) => handleSelect(window.id, e)}
                    onDragStart={() => setIsDraggingItem(true)}
                    onDragEnd={(e) => {
                      setIsDraggingItem(false);
                      handleDragEnd("window", window.id, e);
                    }}
                    onTransformEnd={(e) =>
                      handleTransformEnd("window", window.id, e)
                    }
                  >
                    <WindowIcon
                      width={window.width}
                      height={window.height}
                      isSelected={isSelected}
                    />
                  </Group>
                );
              })}

              {/* Sections - Only in Ticket Mode */}
              {sections.map((section) => {
                const isSelected = selectedIds.includes(section.id);

                return (
                  <Group
                    key={section.id}
                    id={section.id}
                    x={section.x}
                    y={section.y}
                    rotation={section.rotation}
                    draggable={mode === "design" && currentTool === "select"}
                    onClick={(e) => handleSelect(section.id, e)}
                    onDragStart={() => setIsDraggingItem(true)}
                    onDragEnd={(e) => {
                      setIsDraggingItem(false);
                      handleDragEnd("section", section.id, e);
                    }}
                    onTransformEnd={(e) =>
                      handleTransformEnd("section", section.id, e)
                    }
                  >
                    {/* Section Background Polygon - now using relative points */}
                    <Line
                      points={section.points}
                      fill={section.color}
                      stroke={isSelected ? "#3b82f6" : "#94a3b8"}
                      strokeWidth={isSelected ? 2 : 1}
                      closed={true}
                      opacity={0.5}
                    />
                    {/* Section Label at Top of Section - Non-listening */}
                    {(() => {
                      // Find the bounding box in relative coordinates
                      let minX = section.points[0];
                      let maxX = section.points[0];
                      let minY = section.points[1];

                      for (let i = 0; i < section.points.length; i += 2) {
                        minX = Math.min(minX, section.points[i]);
                        maxX = Math.max(maxX, section.points[i]);
                        minY = Math.min(minY, section.points[i + 1]);
                      }

                      const centerX = (minX + maxX) / 2;

                      return (
                        <Group
                          x={centerX}
                          y={minY - 30} // Position above the top edge with consistent padding
                          listening={false}
                        >
                          <Text
                            text={section.name}
                            fontSize={24}
                            fontStyle="bold"
                            fill="#374151"
                            align="center"
                            width={400} // Increased width to accommodate longer names
                            offsetX={200}
                            offsetY={0}
                          />
                          <Text
                            text={`${getSectionChairCount(section)} seats`}
                            fontSize={14}
                            fill="#6b7280"
                            align="center"
                            width={400}
                            offsetX={200}
                            offsetY={-26}
                          />
                        </Group>
                      );
                    })()}
                  </Group>
                );
              })}

              {/* Current Drawing Section Preview */}
              {currentDrawingSection && (
                <Group>
                  <Line
                    points={currentDrawingSection.points}
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dash={[10, 5]}
                    lineCap="round"
                    lineJoin="round"
                  />
                  {/* Fill preview with low opacity if closed indicator */}
                  <Line
                    points={currentDrawingSection.points}
                    fill="#3b82f6"
                    opacity={0.2}
                    closed={currentDrawingSection.points.length >= 6}
                  />
                </Group>
              )}

              {/* Chair Rows */}
              {chairRows.map(renderChairRow)}

              {/* Chair Row Preview (while dragging) */}
              {chairRowPreview && (
                <Group opacity={0.6}>
                  <Line
                    points={[
                      chairRowPreview.startX,
                      chairRowPreview.startY,
                      chairRowPreview.endX,
                      chairRowPreview.endY,
                    ]}
                    stroke="#6366f1"
                    strokeWidth={2}
                    dash={[10, 5]}
                  />

                  {/* Render Grid of Chairs */}
                  {Array.from({ length: chairRowPreview.rowCount || 1 }).map((_, rowIndex) => {
                    const dirY = chairRowPreview.dirY || 1;
                    const dx = chairRowPreview.endX - chairRowPreview.startX;
                    const dy = chairRowPreview.endY - chairRowPreview.startY;
                    const angle = Math.atan2(dy, dx);
                    const perpAngle = angle + Math.PI / 2;

                    const rowOffsetX = Math.cos(perpAngle) * (rowIndex * chairRowConfig.rowSpacing * dirY);
                    const rowOffsetY = Math.sin(perpAngle) * (rowIndex * chairRowConfig.rowSpacing * dirY);

                    return (
                      <Group key={rowIndex} x={rowOffsetX} y={rowOffsetY}>
                        {Array.from({ length: chairRowPreview.count }).map((_, i) => {
                          const t =
                            chairRowPreview.count > 1
                              ? i / (chairRowPreview.count - 1)
                              : 0;

                          const x =
                            chairRowPreview.startX +
                            (chairRowPreview.endX - chairRowPreview.startX) * t;

                          const y =
                            chairRowPreview.startY +
                            (chairRowPreview.endY - chairRowPreview.startY) * t;

                          const dx = chairRowPreview.endX - chairRowPreview.startX;
                          const dy = chairRowPreview.endY - chairRowPreview.startY;
                          const angle = Math.atan2(dy, dx);
                          const rotation = (angle * 180) / Math.PI;

                          return (
                            <Group
                              key={i}
                              x={x}
                              y={y}
                              rotation={rotation}
                            >
                              <ChairIcon
                                fill="#e0e7ff"
                                stroke="#6366f1"
                                strokeWidth={1.5}
                                showNumber={false}
                                number=""
                              />
                            </Group>
                          );
                        })}
                      </Group>
                    );
                  })}

                  {/* Seat count highlight */}
                  <Group
                    x={(chairRowPreview.startX + chairRowPreview.endX) / 2}
                    y={(chairRowPreview.startY + chairRowPreview.endY) / 2 - 40}
                  >
                    <Rect
                      x={-50}
                      y={-12}
                      width={100}
                      height={24}
                      fill="#6366f1"
                      cornerRadius={12}
                      shadowBlur={10}
                      shadowOpacity={0.2}
                    />
                    <Text
                      text={`${chairRowPreview.count} x ${chairRowPreview.rowCount || 1}`}
                      x={-50}
                      y={-12}
                      width={100}
                      height={24}
                      fontSize={12}
                      fontStyle="bold"
                      fill="#ffffff"
                      align="center"
                      verticalAlign="middle"
                    />
                  </Group>
                </Group>
              )}

              {/* Tables */}
              {tables.map(renderTable)}

              {/* Individual Chairs from seating arrangement - render AFTER tables so they're on top */}
              {mode === "seating" &&
                chairs &&
                chairs.length > 0 &&
                chairs.map((chair, index) =>
                  renderIndividualChair(chair, index),
                )}

              {/* Objects */}
              {objects.map(renderObject)}

              {/* Text Elements */}
              {textElements.map(renderTextElement)}

              {/* Drawing Lines with Measurements */}
              {drawingLines.map((drawLine) => {
                const isSelected = selectedIds.includes(drawLine.id);
                const segments = [];

                // Create segments with measurements
                for (let i = 0; i < drawLine.points.length - 2; i += 2) {
                  const x1 = drawLine.points[i];
                  const y1 = drawLine.points[i + 1];
                  const x2 = drawLine.points[i + 2];
                  const y2 = drawLine.points[i + 3];

                  const dx = x2 - x1;
                  const dy = y2 - y1;
                  const length = Math.sqrt(dx * dx + dy * dy);
                  const lengthInMeters = (length / 20).toFixed(2);
                  const midX = (x1 + x2) / 2;
                  const midY = (y1 + y2) / 2;
                  let angle = Math.atan2(dy, dx);

                  // Keep text right-side up (flip if upside down)
                  let labelRotation = (angle * 180) / Math.PI;
                  if (labelRotation > 90 || labelRotation < -90) {
                    labelRotation += 180;
                  }

                  segments.push({
                    x1,
                    y1,
                    x2,
                    y2,
                    midX,
                    midY,
                    labelRotation,
                    lengthInMeters,
                    index: i,
                  });
                }

                return (
                  <Group
                    key={drawLine.id}
                    id={drawLine.id}
                    onClick={(e) => handleSelect(drawLine.id, e)}
                  >
                    {/* Main connected line */}
                    <Line
                      points={drawLine.points}
                      stroke={isSelected ? "#3b82f6" : "#ef4444"}
                      strokeWidth={isSelected ? 3 : 2}
                      lineCap="round"
                      lineJoin="round"
                    />

                    {/* Points at each vertex */}
                    {drawLine.points.map((_, i) => {
                      if (i % 2 === 0) {
                        const x = drawLine.points[i];
                        const y = drawLine.points[i + 1];
                        return (
                          <Circle
                            key={`point-${i}`}
                            x={x}
                            y={y}
                            radius={isSelected ? 5 : 4}
                            fill={isSelected ? "#3b82f6" : "#ef4444"}
                          />
                        );
                      }
                      return null;
                    })}

                    {/* Measurement labels for each segment */}
                    {segments.map((seg) => (
                      <Group
                        key={`label-${seg.index}`}
                        x={seg.midX}
                        y={seg.midY}
                        rotation={seg.labelRotation}
                      >
                        <Rect
                          x={-30}
                          y={-12}
                          width={60}
                          height={24}
                          fill="#ffffff"
                          stroke={isSelected ? "#3b82f6" : "#ef4444"}
                          strokeWidth={isSelected ? 2 : 1}
                          cornerRadius={4}
                        />
                        <Text
                          text={`${seg.lengthInMeters}m`}
                          fontSize={11}
                          fontStyle="bold"
                          fill={isSelected ? "#3b82f6" : "#ef4444"}
                          align="center"
                          verticalAlign="middle"
                          width={60}
                          height={24}
                          offsetX={30}
                          offsetY={12}
                        />
                      </Group>
                    ))}
                  </Group>
                );
              })}

              {/* Current drawing line preview */}
              {currentDrawingLine &&
                currentDrawingLine.points.length >= 2 &&
                (() => {
                  const segments = [];

                  // Create segments with measurements for preview
                  for (
                    let i = 0;
                    i < currentDrawingLine.points.length - 2;
                    i += 2
                  ) {
                    const x1 = currentDrawingLine.points[i];
                    const y1 = currentDrawingLine.points[i + 1];
                    const x2 = currentDrawingLine.points[i + 2];
                    const y2 = currentDrawingLine.points[i + 3];

                    const dx = x2 - x1;
                    const dy = y2 - y1;
                    const length = Math.sqrt(dx * dx + dy * dy);
                    const lengthInMeters = (length / 20).toFixed(2);
                    const midX = (x1 + x2) / 2;
                    const midY = (y1 + y2) / 2;
                    let angle = Math.atan2(dy, dx);

                    // Keep text right-side up (flip if upside down)
                    let labelRotation = (angle * 180) / Math.PI;
                    if (labelRotation > 90 || labelRotation < -90) {
                      labelRotation += 180;
                    }

                    segments.push({
                      x1,
                      y1,
                      x2,
                      y2,
                      midX,
                      midY,
                      labelRotation,
                      lengthInMeters,
                      index: i,
                    });
                  }

                  return (
                    <Group opacity={0.7}>
                      {/* Preview connected line */}
                      <Line
                        points={currentDrawingLine.points}
                        stroke="#ef4444"
                        strokeWidth={2}
                        lineCap="round"
                        lineJoin="round"
                        dash={[8, 4]}
                      />

                      {/* Points at each vertex */}
                      {currentDrawingLine.points.map((_, i) => {
                        if (i % 2 === 0) {
                          const x = currentDrawingLine.points[i];
                          const y = currentDrawingLine.points[i + 1];
                          return (
                            <Circle
                              key={`preview-point-${i}`}
                              x={x}
                              y={y}
                              radius={4}
                              fill="#ef4444"
                            />
                          );
                        }
                        return null;
                      })}

                      {/* Measurement labels for each segment */}
                      {segments.map((seg) => (
                        <Group
                          key={`preview-label-${seg.index}`}
                          x={seg.midX}
                          y={seg.midY}
                          rotation={seg.labelRotation}
                        >
                          <Rect
                            x={-30}
                            y={-12}
                            width={60}
                            height={24}
                            fill="#ffffff"
                            stroke="#ef4444"
                            strokeWidth={1}
                            cornerRadius={4}
                            shadowColor="#000000"
                            shadowBlur={10}
                            shadowOpacity={0.3}
                          />
                          <Text
                            text={`${seg.lengthInMeters}m`}
                            fontSize={11}
                            fontStyle="bold"
                            fill="#ef4444"
                            align="center"
                            verticalAlign="middle"
                            width={60}
                            height={24}
                            offsetX={30}
                            offsetY={12}
                          />
                        </Group>
                      ))}
                    </Group>
                  );
                })()}

              {/* Drag Selection Rectangle */}
              {selectionRect && (
                <Rect
                  x={Math.min(
                    selectionRect.x,
                    selectionRect.x + selectionRect.width,
                  )}
                  y={Math.min(
                    selectionRect.y,
                    selectionRect.y + selectionRect.height,
                  )}
                  width={Math.abs(selectionRect.width)}
                  height={Math.abs(selectionRect.height)}
                  fill="rgba(59, 130, 246, 0.1)"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dash={[5, 5]}
                  listening={false}
                />
              )}

              {/* Transformer */}
              {/* Transformer - Only in design mode */}
              {mode === "design" && (
                <Transformer
                  ref={transformerRef}
                  boundBoxFunc={(oldBox, newBox) => {
                    // Limit minimum size
                    const minSize = 20;
                    if (Math.abs(newBox.width) < minSize) {
                      newBox.width =
                        minSize * Math.sign(newBox.width) || minSize;
                    }
                    if (Math.abs(newBox.height) < minSize) {
                      newBox.height =
                        minSize * Math.sign(newBox.height) || minSize;
                    }
                    return newBox;
                  }}
                  rotateEnabled={true}
                  rotationSnaps={[0, 45, 90, 135, 180, 225, 270, 315]}
                  rotationSnapTolerance={5}
                  keepRatio={false}
                  enabledAnchors={[
                    "top-left",
                    "top-right",
                    "bottom-left",
                    "bottom-right",
                    "middle-left",
                    "middle-right",
                    "top-center",
                    "bottom-center",
                  ]}
                  anchorSize={10}
                  anchorCornerRadius={5}
                  borderStroke="#3b82f6"
                  borderStrokeWidth={2}
                  anchorStroke="#3b82f6"
                  anchorFill="#ffffff"
                  rotateAnchorOffset={30}
                  padding={2}
                />
              )}
            </Layer>
          </Stage>
        </div>

        {/* Status Bar */}
        <div className="bg-muted/50 text-muted-foreground flex h-8 shrink-0 items-center justify-between border-t px-4 text-xs">
          <div className="flex items-center gap-4">
            <span>{walls.length} walls</span>
            <span>{doors.length} doors</span>
            <span>{windows.length} windows</span>
            <span>
              {chairRows.reduce((acc, r) => acc + r.chairs.length, 0)} chairs
            </span>
            <span>{tables.length} tables</span>
            <span>{objects.length} objects</span>
            <span>{textElements.length} text labels</span>
          </div>
          <div className="flex items-center gap-4">
            <span>
              Tool: <strong>{currentTool}</strong>
            </span>
            <span>
              Zoom: <strong>{Math.round(scale * 100)}%</strong>
            </span>
            {selectedIds.length > 0 && (
              <span>
                Selected: <strong>{selectedIds.length}</strong>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  },
);

KonvaVenueDesigner.displayName = "KonvaVenueDesigner";

// Wrap with React.memo to prevent unnecessary re-renders
// Only re-render if critical props change
export default React.memo(KonvaVenueDesigner, (prevProps, nextProps) => {
  // In seating mode, optimize for performance
  if (prevProps.mode === "seating" && nextProps.mode === "seating") {
    // Only re-render if draggedGuest reference changes (not deep equality)
    // This allows hover states to update without full re-renders
    if (prevProps.draggedGuest !== nextProps.draggedGuest) {
      return false; // Re-render
    }

    // Check if any layout data changed by comparing references
    if (
      prevProps.initialLayout?.tables !== nextProps.initialLayout?.tables ||
      prevProps.initialLayout?.chairs !== nextProps.initialLayout?.chairs ||
      prevProps.initialLayout?.venueObjects !== nextProps.initialLayout?.venueObjects ||
      prevProps.initialLayout?.walls !== nextProps.initialLayout?.walls
    ) {
      return false; // Re-render to let useEffect handle optimized updates
    }

    // Check for sidebar state changes
    if (prevProps.sidebarCollapsed !== nextProps.sidebarCollapsed) {
      return false; // Re-render
    }

    // Check for selection changes
    if (prevProps.externalSelectedIds !== nextProps.externalSelectedIds) {
      return false; // Re-render
    }

    // Skip render if nothing significant changed
    return true;
  }

  // In design mode, only prevent render if nothing changed at all
  return false; // Always re-render in design mode for safety
});
