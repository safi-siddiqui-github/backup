import type {
  Chair as ChairType,
  LayoutData,
  Seat as SeatType,
  Table as TableType,
  VenueObject as VenueObjectType,
} from "@/types/venue";
import html2canvas from "html2canvas";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import DraggableChair from "./DraggableChair";
import DraggableTable from "./DraggableTable";
import DraggableVenueObject from "./DraggableVenueObject";
import LayoutRenderer from "./LayoutRenderer";
import SeatComponent from "./SeatComponent";

interface SeatingCanvasProps {
  tables: TableType[];
  chairs?: ChairType[];
  seats?: SeatType[];
  seatSections?: any[];
  venueObjects: VenueObjectType[];
  venueType: "table-based" | "seat-based";
  layoutData?: LayoutData;
  layoutOpacity?: number;
  onUpdateTable: (tableId: number, updates: Partial<TableType>) => void;
  onUpdateChair: (chairId: number, updates: Partial<ChairType>) => void;
  onUpdateChairGrid?: (gridId: string, updates: Partial<ChairType>) => void;
  onUpdateSeat: (seatId: number, updates: Partial<SeatType>) => void;
  onUpdateVenueObject: (
    objectId: number,
    updates: Partial<VenueObjectType>,
  ) => void;
  onSelectTable: (table: TableType | null) => void;
  onSelectChair: (chair: ChairType | null) => void;
  onSelectSeat: (seat: SeatType | null) => void;
  onSelectVenueObject: (object: VenueObjectType | null) => void;
  onDeleteTable: (tableId: number) => void;
  onDeleteChair: (chairId: number) => void;
  onDeleteChairGrid?: (gridId: string) => void;
  onDeleteVenueObject: (objectId: number) => void;
  onConfigureTable: (table: TableType) => void;
  onConfigureChair: (chair: ChairType) => void;
  onConfigureVenueObject: (object: VenueObjectType) => void;
  onAssignSeat: () => void;
  onAssignChair: (chair: ChairType) => void;
  onAssignIndividualSeat: () => void;
  onSwapSeats: (table: TableType) => void;
  selectedTable: TableType | null;
  selectedChair: ChairType | null;
  selectedSeat: SeatType | null;
  selectedVenueObject: VenueObjectType | null;
  selectedGridId?: string | null;
  onSelectGrid?: (gridId: string) => void;
  viewMode?: "design" | "preview";
  getGridChairs?: (gridId: string) => ChairType[];
  draggedGuest?: Partial<{
    id: number;
    name: string;
    initials: string;
    avatarColor: string;
  }> | null;
  onDropGuestToSeat?: (tableId: number, seatNumber: number) => void;
}

const SeatingCanvas = forwardRef<any, SeatingCanvasProps>(
  (
    {
      tables,
      chairs = [],
      seats = [],
      seatSections = [],
      venueObjects,
      venueType,
      layoutData,
      layoutOpacity = 0.3,
      onUpdateTable,
      onUpdateChair,
      onUpdateChairGrid,
      onUpdateSeat,
      onUpdateVenueObject,
      onSelectTable,
      onSelectChair,
      onSelectSeat,
      onSelectVenueObject,
      onDeleteTable,
      onDeleteChair,
      onDeleteChairGrid,
      onDeleteVenueObject,
      onConfigureTable,
      onConfigureChair,
      onConfigureVenueObject,
      onAssignSeat,
      onAssignChair,
      onAssignIndividualSeat,
      onSwapSeats,
      selectedTable,
      selectedChair,
      selectedSeat,
      selectedVenueObject,
      selectedGridId,
      onSelectGrid,
      viewMode = "design",
      getGridChairs,
      draggedGuest,
      onDropGuestToSeat,
    },
    ref,
  ) => {
    const canvasRef = useRef<HTMLDivElement>(null);

    // Memoize handlers to prevent unnecessary re-renders
    const handleUpdateTable = useCallback(
      (tableId: number) => (updates: Partial<TableType>) => {
        onUpdateTable(tableId, updates);
      },
      [onUpdateTable],
    );

    const handleUpdateChair = useCallback(
      (chairId: number) => (updates: Partial<ChairType>) => {
        onUpdateChair(chairId, updates);
      },
      [onUpdateChair],
    );

    const handleUpdateSeat = useCallback(
      (seatId: number) => (updates: Partial<SeatType>) => {
        onUpdateSeat(seatId, updates);
      },
      [onUpdateSeat],
    );

    const handleUpdateVenueObject = useCallback(
      (objectId: number) => (updates: Partial<VenueObjectType>) => {
        onUpdateVenueObject(objectId, updates);
      },
      [onUpdateVenueObject],
    );

    // Stable table/chair IDs for comparison
    const tableIds = useMemo(() => tables.map((t) => t.id).join(","), [tables]);
    const chairIds = useMemo(() => chairs.map((c) => c.id).join(","), [chairs]);
    const seatIds = useMemo(() => seats.map((s) => s.id).join(","), [seats]);
    const venueObjectIds = useMemo(
      () => venueObjects.map((v) => v.id).join(","),
      [venueObjects],
    );

    useEffect(() => {
      console.log(tables, canvasRef.current);
      console.log("here");
    }, [tables, canvasRef]);

    const handleDeleteTable = useCallback(
      (tableId: number) => () => {
        onDeleteTable(tableId);
      },
      [onDeleteTable],
    );

    const handleDeleteChair = useCallback(
      (chairId: number) => () => {
        onDeleteChair(chairId);
      },
      [onDeleteChair],
    );

    const handleDeleteVenueObject = useCallback(
      (objectId: number) => () => {
        onDeleteVenueObject(objectId);
      },
      [onDeleteVenueObject],
    );

    const handleConfigureTable = useCallback(
      (table: TableType) => () => {
        onConfigureTable(table);
      },
      [onConfigureTable],
    );

    const handleConfigureChair = useCallback(
      (chair: ChairType) => () => {
        onConfigureChair(chair);
      },
      [onConfigureChair],
    );

    const handleConfigureVenueObject = useCallback(
      (object: VenueObjectType) => () => {
        onConfigureVenueObject(object);
      },
      [onConfigureVenueObject],
    );

    const handleSelectTable = useCallback(
      (table: TableType) => () => {
        onSelectTable(table);
      },
      [onSelectTable],
    );

    const handleSelectChair = useCallback(
      (chair: ChairType) => () => {
        onSelectChair(chair);
      },
      [onSelectChair],
    );

    const handleSelectSeat = useCallback(
      (seat: SeatType) => () => {
        onSelectSeat(seat);
      },
      [onSelectSeat],
    );

    const handleSelectVenueObject = useCallback(
      (object: VenueObjectType) => () => {
        onSelectVenueObject(object);
      },
      [onSelectVenueObject],
    );

    const handleAssignChair = useCallback(
      (chair: ChairType) => () => {
        onAssignChair(chair);
      },
      [onAssignChair],
    );

    const handleSwapSeats = useCallback(
      (table: TableType) => () => {
        onSwapSeats(table);
      },
      [onSwapSeats],
    );

    const handleDropGuestToSeat = useCallback(
      (tableId: number) => (seatNumber: number) => {
        onDropGuestToSeat?.(tableId, seatNumber);
      },
      [onDropGuestToSeat],
    );

    const exportImage = useCallback(async () => {
      if (!canvasRef.current) {
        throw new Error("Canvas reference not found");
      }

      try {
        // Hide UI controls for export
        const controlElements =
          canvasRef.current.querySelectorAll("[data-ui-control]");
        controlElements.forEach((el) => {
          (el as HTMLElement).style.display = "none";
        });

        // Remove selection highlights
        const selectedElements = canvasRef.current.querySelectorAll(
          ".ring-2, .ring-blue-500, .border-blue-500",
        );
        const originalStyles: {
          element: HTMLElement;
          originalClass: string;
        }[] = [];
        selectedElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          originalStyles.push({
            element: htmlEl,
            originalClass: htmlEl.className,
          });
          htmlEl.className = htmlEl.className.replace(
            /ring-2|ring-blue-500|border-blue-500/g,
            "",
          );
        });

        const canvas = await html2canvas(canvasRef.current, {
          scale: 2,
          backgroundColor: "#ffffff",
          useCORS: true,
          allowTaint: true,
          ignoreElements: (element) => {
            return (
              element.hasAttribute("data-ui-control") ||
              element.classList.contains("tooltip") ||
              element.classList.contains("popover")
            );
          },
        });

        // Restore UI controls
        controlElements.forEach((el) => {
          (el as HTMLElement).style.display = "";
        });

        // Restore original styles
        originalStyles.forEach(({ element, originalClass }) => {
          element.className = originalClass;
        });

        return canvas;
      } catch (error) {
        console.error("Export failed:", error);
        throw error;
      }
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        exportImage,
      }),
      [exportImage],
    );

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
    };

    const handleClick = (e: React.MouseEvent) => {
      if (e.target === canvasRef.current) {
        onSelectTable(null);
        onSelectChair(null);
        onSelectSeat(null);
        onSelectVenueObject(null);
      }
    };

    const handleTableSeatAssignment = useCallback(
      (table: TableType, seatNumber: number) => {
        onSelectTable(table);
        onAssignSeat();
      },
      [onSelectTable, onAssignSeat],
    );

    // Memoize rendered items to prevent unnecessary re-renders
    const renderedVenueObjects = useMemo(
      () =>
        venueObjects.map((obj) => (
          <DraggableVenueObject
            key={obj.id}
            venueObject={obj}
            isSelected={selectedVenueObject?.id === obj.id}
            onUpdate={handleUpdateVenueObject(obj.id)}
            onSelect={handleSelectVenueObject(obj)}
            onDelete={handleDeleteVenueObject(obj.id)}
            onConfigure={handleConfigureVenueObject(obj)}
            viewMode={viewMode}
          />
        )),
      [
        venueObjectIds, // Use stable ID string instead of array
        venueObjects, // Keep for deep changes
        selectedVenueObject?.id,
        handleUpdateVenueObject,
        handleSelectVenueObject,
        handleDeleteVenueObject,
        handleConfigureVenueObject,
        viewMode,
      ],
    );

    const renderedTables = useMemo(
      () =>
        venueType === "table-based"
          ? tables.map((table) => (
            <DraggableTable
              key={table.id}
              table={table}
              isSelected={selectedTable?.id === table.id}
              onUpdate={handleUpdateTable(table.id)}
              onSelect={handleSelectTable(table)}
              onDelete={handleDeleteTable(table.id)}
              onConfigure={handleConfigureTable(table)}
              onAssignSeat={(seatNumber) =>
                handleTableSeatAssignment(table, seatNumber)
              }
              onSwapSeats={handleSwapSeats(table)}
              viewMode={viewMode}
              draggedGuest={draggedGuest}
              onDropGuestToSeat={
                onDropGuestToSeat
                  ? handleDropGuestToSeat(table.id)
                  : undefined
              }
            />
          ))
          : [],
      [
        venueType,
        tableIds, // Use stable ID string
        tables, // Keep for deep changes like position updates
        selectedTable?.id,
        handleUpdateTable,
        handleSelectTable,
        handleDeleteTable,
        handleConfigureTable,
        handleTableSeatAssignment,
        handleSwapSeats,
        viewMode,
        draggedGuest,
        onDropGuestToSeat,
        handleDropGuestToSeat,
      ],
    );

    const renderedChairs = useMemo(
      () =>
        venueType === "table-based"
          ? chairs.map((chair) => (
            <DraggableChair
              key={chair.id}
              chair={chair}
              isSelected={selectedChair?.id === chair.id}
              isGridSelected={selectedGridId === chair.gridId}
              onUpdate={handleUpdateChair(chair.id)}
              onSelect={handleSelectChair(chair)}
              onSelectGrid={() =>
                chair.gridId && onSelectGrid
                  ? onSelectGrid(chair.gridId)
                  : undefined
              }
              onDelete={handleDeleteChair(chair.id)}
              onConfigure={handleConfigureChair(chair)}
              onAssign={handleAssignChair(chair)}
              onDeleteGrid={
                chair.gridId && onDeleteChairGrid
                  ? () => onDeleteChairGrid(chair.gridId!)
                  : undefined
              }
              onUpdateGrid={onUpdateChairGrid}
              gridChairs={
                chair.gridId && getGridChairs
                  ? getGridChairs(chair.gridId)
                  : []
              }
              viewMode={viewMode}
            />
          ))
          : [],
      [
        venueType,
        chairIds, // Use stable ID string
        chairs, // Keep for deep changes
        selectedChair?.id,
        selectedGridId,
        handleUpdateChair,
        handleSelectChair,
        onSelectGrid,
        handleDeleteChair,
        handleConfigureChair,
        handleAssignChair,
        onDeleteChairGrid,
        onUpdateChairGrid,
        getGridChairs,
        viewMode,
      ],
    );

    const renderedSeats = useMemo(
      () =>
        venueType === "seat-based"
          ? seats.map((seat) => (
            <SeatComponent
              key={seat.id}
              seat={seat}
              isSelected={selectedSeat?.id === seat.id}
              onUpdate={handleUpdateSeat(seat.id)}
              onSelect={handleSelectSeat(seat)}
              onAssign={onAssignIndividualSeat}
              viewMode={viewMode}
            />
          ))
          : [],
      [
        venueType,
        seatIds, // Use stable ID string
        seats, // Keep for deep changes
        selectedSeat?.id,
        handleUpdateSeat,
        handleSelectSeat,
        onAssignIndividualSeat,
        viewMode,
      ],
    );

    return (
      <div
        ref={canvasRef}
        data-canvas-ref
        className="bg-muted/20 relative h-full w-full overflow-hidden"
        style={{ minHeight: "600px" }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="absolute inset-0">
          {/* Background Layout */}
          {layoutData && (
            <LayoutRenderer
              layoutData={layoutData}
              opacity={layoutOpacity}
              className="z-0"
            />
          )}

          {/* Venue Objects */}
          {renderedVenueObjects}

          {/* Tables */}
          {renderedTables}

          {/* Individual Chairs */}
          {renderedChairs}

          {/* Individual Seats */}
          {renderedSeats}
        </div>

        {/* UI Controls */}
        {viewMode === "design" && (
          <div
            data-ui-control
            className="bg-background/90 border-border absolute top-4 right-4 rounded-lg border p-2 shadow-sm backdrop-blur-sm"
          >
            <div className="text-muted-foreground text-xs">
              {tables.length} tables • {chairs.length} chairs •{" "}
              {venueObjects.length} objects
            </div>
          </div>
        )}
      </div>
    );
  },
);

SeatingCanvas.displayName = "SeatingCanvas";

export default SeatingCanvas;
