"use client";

import type {
  Chair as ChairType,
  LayoutData,
  SeatSection,
  Seat as SeatType,
  Table as TableType,
  VenueObject as VenueObjectType,
} from "@/types/venue";
import html2canvas from "html2canvas";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import DraggableChair from "./DraggableChair";
import DraggableTable from "./DraggableTable";
import DraggableVenueObject from "./DraggableVenueObject";
import LayoutRenderer from "./layout-designer/LayoutRenderer";
import SeatComponent from "./SeatComponent";

interface SeatingCanvasProps {
  tables: TableType[];
  chairs?: ChairType[];
  seats?: SeatType[];
  seatSections?: SeatSection[];
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
}

const SeatingCanvas = forwardRef<unknown, SeatingCanvasProps>(
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
    },
    ref,
  ) => {
    const canvasRef = useRef<HTMLDivElement>(null);

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

    const handleTableSeatAssignment = (
      table: TableType,
      seatNumber: number,
    ) => {
      onSelectTable(table);
      onAssignSeat();
    };

    return (
      <div
        ref={canvasRef}
        data-canvas-ref
        className="relative h-full w-full overflow-hidden bg-gray-50"
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
          {venueObjects.map((obj) => (
            <DraggableVenueObject
              key={obj.id}
              venueObject={obj}
              isSelected={selectedVenueObject?.id === obj.id}
              onUpdate={(updates) => onUpdateVenueObject(obj.id, updates)}
              onSelect={() => onSelectVenueObject(obj)}
              onDelete={() => onDeleteVenueObject(obj.id)}
              onConfigure={() => onConfigureVenueObject(obj)}
              viewMode={viewMode}
            />
          ))}

          {/* Tables */}
          {venueType === "table-based" &&
            tables.map((table) => (
              <DraggableTable
                key={table.id}
                table={table}
                isSelected={selectedTable?.id === table.id}
                onUpdate={(updates) => onUpdateTable(table.id, updates)}
                onSelect={() => onSelectTable(table)}
                onDelete={() => onDeleteTable(table.id)}
                onConfigure={() => onConfigureTable(table)}
                onAssignSeat={(seatNumber) =>
                  handleTableSeatAssignment(table, seatNumber)
                }
                onSwapSeats={() => onSwapSeats(table)}
                viewMode={viewMode}
              />
            ))}

          {/* Individual Chairs */}
          {venueType === "table-based" &&
            chairs.map((chair) => (
              <DraggableChair
                key={chair.id}
                chair={chair}
                isSelected={selectedChair?.id === chair.id}
                isGridSelected={selectedGridId === chair.gridId}
                onUpdate={(updates) => onUpdateChair(chair.id, updates)}
                onSelect={() => onSelectChair(chair)}
                onSelectGrid={() =>
                  chair.gridId && onSelectGrid
                    ? onSelectGrid(chair.gridId)
                    : undefined
                }
                onDelete={() => onDeleteChair(chair.id)}
                onConfigure={() => onConfigureChair(chair)}
                onAssign={() => onAssignChair(chair)}
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
            ))}

          {/* Individual Seats */}
          {venueType === "seat-based" &&
            seats.map((seat) => (
              <SeatComponent
                key={seat.id}
                seat={seat}
                isSelected={selectedSeat?.id === seat.id}
                onUpdate={(updates) => onUpdateSeat(seat.id, updates)}
                onSelect={() => onSelectSeat(seat)}
                onAssign={() => onAssignIndividualSeat()}
                viewMode={viewMode}
              />
            ))}
        </div>

        {/* UI Controls */}
        {viewMode === "design" && (
          <div
            data-ui-control
            className="absolute top-4 right-4 rounded-lg bg-white/90 p-2 shadow-sm backdrop-blur-sm"
          >
            <div className="text-xs text-gray-600">
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
