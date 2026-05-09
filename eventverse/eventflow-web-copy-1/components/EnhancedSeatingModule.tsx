"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LocationContextProvider } from "@/hooks/useLocationContext";
import {
  VenueHierarchyProvider,
  useVenueHierarchy,
} from "@/hooks/useVenueHierarchy";
import type {
  Chair,
  Guest,
  LayoutData,
  SeatingArrangement,
  Table,
  VendorPresetUsage,
  VenueObject,
  VenuePreset,
} from "@/types/venue";
import { resetArrangement, smartAssignGuests } from "@/utils/smartAssignment";
import { Armchair, ArrowLeft, TableIcon, Users } from "lucide-react";
import { useRef, useState } from "react";
import ChairConfigDialog, { ChairConfig } from "./ChairConfigDialog";
import CompactNavigationHeader from "./CompactNavigationHeader";
import CompactVenueHeader from "./CompactVenueHeader";
import EnhancedTableConfigDialog, {
  TableConfig,
} from "./EnhancedTableConfigDialog";
import GuestAssignmentPanel from "./GuestAssignmentPanel";
import PrintDialog from "./PrintDialog";
import type { Seat } from "./Seat";
import SeatAssignmentDialog from "./SeatAssignmentDialog";
import SeatSwapDialog from "./SeatSwapDialog";
import SeatingAnalytics from "./SeatingAnalytics";
import SeatingCanvas from "./SeatingCanvas";
import VenueObjectDialog from "./VenueObjectDialog";
import SimpleLayoutDesigner from "./layout-designer/SimpleLayoutDesigner";
import VendorPresetSelector from "./seating/VendorPresetSelector";

interface EnhancedSeatingModuleProps {
  eventId?: string;
  onBack?: () => void;
}

const EnhancedSeatingModuleContent = ({ onBack }: { onBack?: () => void }) => {
  const { currentArrangement, updateArrangement } = useVenueHierarchy();

  const [unassignedGuests, setUnassignedGuests] = useState<Guest[]>([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      group: "Family",
      dietary: "Vegetarian",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      group: "Friends",
      dietary: "None",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@example.com",
      group: "VIP",
      dietary: "Gluten-free",
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma@example.com",
      group: "Family",
      dietary: "Vegan",
    },
    {
      id: 5,
      name: "Tom Brown",
      email: "tom@example.com",
      group: "Friends",
      dietary: "None",
    },
    {
      id: 6,
      name: "Lisa Chen",
      email: "lisa@example.com",
      group: "Colleagues",
      dietary: "None",
    },
    {
      id: 7,
      name: "David Wilson",
      email: "david@example.com",
      group: "VIP",
      dietary: "None",
    },
  ]);

  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [selectedChair, setSelectedChair] = useState<Chair | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [selectedVenueObject, setSelectedVenueObject] =
    useState<VenueObject | null>(null);
  const [showTableConfig, setShowTableConfig] = useState(false);
  const [showChairConfig, setShowChairConfig] = useState(false);
  const [showSeatAssignment, setShowSeatAssignment] = useState(false);
  const [showSeatSwap, setShowSeatSwap] = useState(false);
  const [showVenueObjectConfig, setShowVenueObjectConfig] = useState(false);
  const [showPrintDialog, setShowPrintDialog] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [viewMode, setViewMode] = useState<"design" | "preview">("design");
  const [isCreatingTable, setIsCreatingTable] = useState(false);
  const [isCreatingChair, setIsCreatingChair] = useState(false);
  const [isCreatingVenueObject, setIsCreatingVenueObject] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [showLayoutDesigner, setShowLayoutDesigner] = useState(false);
  const [layoutOpacity, setLayoutOpacity] = useState(0.3);
  const [showVendorPresets, setShowVendorPresets] = useState(false);
  const [currentPresetUsage, setCurrentPresetUsage] =
    useState<VendorPresetUsage | null>(null);

  if (!currentArrangement) {
    return (
      <LocationContextProvider>
        <div className="flex h-full flex-col">
          <CompactNavigationHeader />
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700">
                No Arrangement Selected
              </h3>
              <p className="text-gray-500">
                Please select or create an arrangement to get started.
              </p>
            </div>
          </div>
        </div>
      </LocationContextProvider>
    );
  }

  const handleSmartAssign = () => {
    const { tables: updatedTables, unassigned } = smartAssignGuests(
      unassignedGuests,
      currentArrangement.tables,
    );

    updateArrangement(currentArrangement.id, { tables: updatedTables });
    setUnassignedGuests(unassigned);
  };

  const handleReset = () => {
    const resetTables = resetArrangement(currentArrangement.tables);
    updateArrangement(currentArrangement.id, { tables: resetTables });

    // Reset chairs
    const resetChairs = (currentArrangement.chairs || []).map((chair) => ({
      ...chair,
      guest: undefined,
    }));

    // Restore all guests to unassigned
    const allGuests = [
      ...unassignedGuests,
      ...currentArrangement.tables.flatMap((table) => table.guests),
      ...(currentArrangement.chairs || [])
        .filter((chair) => chair.guest)
        .map((chair) => chair.guest!),
    ];
    updateArrangement(currentArrangement.id, { chairs: resetChairs });
    setUnassignedGuests(allGuests);
  };

  const handleExport = async () => {
    // if (!canvasRef.current?.exportImage) {
    //   console.error("Canvas export method not available");
    //   return;
    // }

    try {
      // const canvas = await canvasRef?.current?.exportImage();
      const canvas = await canvasRef?.current;
      if (canvas) {
        const link = document.createElement("a");
        link.download = `seating-chart-${currentArrangement.name.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.png`;
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();
      }
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export diagram. Please try again.");
    }
  };

  const handlePrint = () => {
    setShowPrintDialog(true);
  };

  const handleUpdateTable = (tableId: number, updates: Partial<Table>) => {
    const updatedTables = currentArrangement.tables.map((table) =>
      table.id === tableId ? { ...table, ...updates } : table,
    );
    updateArrangement(currentArrangement.id, { tables: updatedTables });
  };

  const handleUpdateSeat = (seatId: number, updates: Partial<Seat>) => {
    const updatedSeats = currentArrangement.seats.map((seat) =>
      seat.id === seatId ? { ...seat, ...updates } : seat,
    );
    updateArrangement(currentArrangement.id, { seats: updatedSeats });
  };

  const handleUpdateVenueObject = (
    objectId: number,
    updates: Partial<VenueObject>,
  ) => {
    const updatedObjects = currentArrangement.venueObjects.map((obj) =>
      obj.id === objectId ? { ...obj, ...updates } : obj,
    );
    updateArrangement(currentArrangement.id, { venueObjects: updatedObjects });
  };

  const handleUpdateChair = (chairId: number, updates: Partial<Chair>) => {
    const updatedChairs = (currentArrangement.chairs || []).map((chair) =>
      chair.id === chairId ? { ...chair, ...updates } : chair,
    );
    updateArrangement(currentArrangement.id, { chairs: updatedChairs });
  };

  const handleDeleteTable = (tableId: number) => {
    const updatedTables = currentArrangement.tables.filter(
      (table) => table.id !== tableId,
    );
    updateArrangement(currentArrangement.id, { tables: updatedTables });
    setSelectedTable(null);
  };

  const handleDeleteChair = (chairId: number) => {
    const updatedChairs = (currentArrangement.chairs || []).filter(
      (chair) => chair.id !== chairId,
    );
    updateArrangement(currentArrangement.id, { chairs: updatedChairs });
    setSelectedChair(null);
  };

  const handleDeleteVenueObject = (objectId: number) => {
    const updatedObjects = currentArrangement.venueObjects.filter(
      (obj) => obj.id !== objectId,
    );
    updateArrangement(currentArrangement.id, { venueObjects: updatedObjects });
    setSelectedVenueObject(null);
  };

  const handleAddTable = () => {
    setIsCreatingTable(true);
    setShowTableConfig(true);
  };

  const handleAddChair = () => {
    setIsCreatingChair(true);
    setShowChairConfig(true);
  };

  const handleAddVenueObject = () => {
    setIsCreatingVenueObject(true);
    setShowVenueObjectConfig(true);
  };

  const handleAssignChair = (chair: Chair) => {
    // Show assignment dialog for chair
    setSelectedChair(chair);
    setShowSeatAssignment(true);
  };

  const handleAssignGuestToChair = (guest: Guest, chairId: number) => {
    const updatedChairs = (currentArrangement.chairs || []).map((chair) =>
      chair.id === chairId ? { ...chair, guest } : chair,
    );
    updateArrangement(currentArrangement.id, { chairs: updatedChairs });
    setUnassignedGuests((prev) => prev.filter((g) => g.id !== guest.id));
  };

  const handleUnassignGuest = (guest: Guest, id: number) => {
    // Check if this is a table or chair based on the guest assignment
    const table = currentArrangement.tables.find((t) =>
      Object.values(t.seatAssignments || {}).some((g) => g.id === guest.id),
    );

    if (table) {
      // Handle table unassignment

      if (table?.seatAssignments) {
        const updatedSeatAssignments = { ...table.seatAssignments };

        Object.keys(updatedSeatAssignments).forEach((seatKey) => {
          const seatNumber = Number(seatKey); // convert string -> number
          if (updatedSeatAssignments[seatNumber]?.id === guest.id) {
            delete updatedSeatAssignments[seatNumber];
          }
        });

        // const updatedSeatAssignments = { ...table.seatAssignments };
        // Object.keys(updatedSeatAssignments).forEach((seatNumber) => {
        //   const seatNumber = Number(seatKey); // convert string -> number
        //   if (updatedSeatAssignments[seatNumber]?.id === guest.id) {
        //     delete updatedSeatAssignments[seatNumber];
        //   }
        // });

        const updatedTables = currentArrangement.tables.map((t) =>
          t.id === table.id
            ? { ...t, seatAssignments: updatedSeatAssignments }
            : t,
        );
        updateArrangement(currentArrangement.id, { tables: updatedTables });
      }
    } else {
      // Handle chair unassignment
      const updatedChairs = (currentArrangement.chairs || []).map((chair) =>
        chair.id === id ? { ...chair, guest: undefined } : chair,
      );
      updateArrangement(currentArrangement.id, { chairs: updatedChairs });
    }

    setUnassignedGuests((prev) => [...prev, guest]);
  };

  const handleSaveTableConfig = (config: TableConfig) => {
    if (isCreatingTable) {
      const newTable: Table = {
        id: Date.now(),
        name: config.name,
        seats: config.seats,
        shape: config.shape,
        x: 50 + currentArrangement.tables.length * 50,
        y: 50 + currentArrangement.tables.length * 50,
        guests: [],
        targetGroup: config.targetGroup,
        scale: config.scale,
        notes: config.notes,
        rotation: config.rotation,
        seatAssignments: {},
      };

      const updatedTables = [...currentArrangement.tables, newTable];
      updateArrangement(currentArrangement.id, { tables: updatedTables });
    } else if (selectedTable) {
      handleUpdateTable(selectedTable.id, config);
    }
    setShowTableConfig(false);
    setSelectedTable(null);
    setIsCreatingTable(false);
  };

  const handleSaveChairConfig = (config: ChairConfig) => {
    if (isCreatingChair) {
      const baseX = 100 + (currentArrangement.chairs || []).length * 50;
      const baseY = 100 + (currentArrangement.chairs || []).length * 50;
      const gridId =
        config.layoutType === "grid" ? `grid-${Date.now()}` : undefined;

      const newChairs: Chair[] = [];

      if (config.layoutType === "single") {
        newChairs.push({
          id: Date.now(),
          name: config.name,
          x: baseX,
          y: baseY,
          targetGroup: config.targetGroup,
          notes: config.notes,
          rotation: config.rotation,
          gridId,
        });
      } else {
        // Create grid of chairs
        const chairSpacing = 40;
        for (let row = 0; row < config.rows; row++) {
          for (let col = 0; col < config.columns; col++) {
            newChairs.push({
              id: Date.now() + row * config.columns + col,
              name: `${config.name} R${row + 1}C${col + 1}`,
              x: baseX + col * chairSpacing,
              y: baseY + row * chairSpacing,
              targetGroup: config.targetGroup,
              notes: config.notes,
              rotation: config.rotation,
              gridId,
            });
          }
        }
      }

      const updatedChairs = [
        ...(currentArrangement.chairs || []),
        ...newChairs,
      ];
      updateArrangement(currentArrangement.id, { chairs: updatedChairs });
    } else if (selectedChair) {
      handleUpdateChair(selectedChair.id, config);
    }
    setShowChairConfig(false);
    setSelectedChair(null);
    setIsCreatingChair(false);
  };

  const handleSaveVenueObjectConfig = (config: Partial<VenueObject>) => {
    if (isCreatingVenueObject) {
      const newObject: VenueObject = {
        id: Date.now(),
        name: config.name || "New Object",
        type: config.type || "stage",
        x: 50 + currentArrangement.venueObjects.length * 50,
        y: 50 + currentArrangement.venueObjects.length * 50,
        width: config.width || 200,
        height: config.height || 100,
        rotation: config.rotation || 0,
        color: config.color || "#8B5CF6",
      };

      const updatedObjects = [...currentArrangement.venueObjects, newObject];
      updateArrangement(currentArrangement.id, {
        venueObjects: updatedObjects,
      });
    } else if (selectedVenueObject) {
      handleUpdateVenueObject(selectedVenueObject.id, config);
    }
    setShowVenueObjectConfig(false);
    setSelectedVenueObject(null);
    setIsCreatingVenueObject(false);
  };

  const handleSaveLayout = (layoutData: LayoutData) => {
    updateArrangement(currentArrangement.id, { layoutData });
  };

  const handleUseAsBackground = (layoutData: LayoutData) => {
    updateArrangement(currentArrangement.id, { layoutData });
    setShowLayoutDesigner(false);
    setViewMode("design");
  };

  const handleSelectVendorPreset = (
    preset: VenuePreset,
    usageType: "as-is" | "template" | "modified" | "hybrid",
  ) => {
    // Create preset usage tracking
    const presetUsage: VendorPresetUsage = {
      id: `usage-${Date.now()}`,
      presetId: preset.id,
      eventId: currentArrangement.sectionId, // Using section ID as event reference
      hostId: "current-host", // This would come from auth context
      usageType,
      status: "active",
      bookedAt: new Date().toISOString(),
      modifications: [],
    };

    setCurrentPresetUsage(presetUsage);

    // Apply the preset based on usage type
    const arrangementUpdates: Partial<SeatingArrangement> = {};

    if (usageType === "as-is") {
      // Import exact layout without modifications
      arrangementUpdates.tables = preset.tables;
      arrangementUpdates.chairs = preset.chairs;
      arrangementUpdates.seats = preset.seats;
      arrangementUpdates.seatSections = preset.seatSections;
      arrangementUpdates.venueObjects = preset.venueObjects;
      arrangementUpdates.layoutData = preset.layoutData;
    } else if (usageType === "template") {
      // Copy structure but allow full customization
      arrangementUpdates.tables = preset.tables.map((table) => ({
        ...table,
        id: Date.now() + Math.random(), // New IDs for full independence
        guests: [],
        seatAssignments: {},
      }));
      arrangementUpdates.chairs = preset.chairs.map((chair) => ({
        ...chair,
        id: Date.now() + Math.random(),
        guest: undefined,
      }));
      arrangementUpdates.seats = preset.seats;
      arrangementUpdates.seatSections = preset.seatSections;
      arrangementUpdates.venueObjects = preset.venueObjects.map((obj) => ({
        ...obj,
        id: Date.now() + Math.random(),
      }));
      arrangementUpdates.layoutData = preset.layoutData;
    } else {
      // Modified or hybrid - import with vendor connection maintained
      arrangementUpdates.tables = preset.tables.map((table) => ({
        ...table,
        vendorPresetId: preset.id, // Mark as vendor-connected
        guests: [],
        seatAssignments: {},
      }));
      arrangementUpdates.chairs = preset.chairs.map((chair) => ({
        ...chair,
        vendorPresetId: preset.id,
        guest: undefined,
      }));
      arrangementUpdates.seats = preset.seats;
      arrangementUpdates.seatSections = preset.seatSections;
      arrangementUpdates.venueObjects = preset.venueObjects.map((obj) => ({
        ...obj,
        vendorPresetId: preset.id,
      }));
      arrangementUpdates.layoutData = preset.layoutData;
    }

    // Update the arrangement
    updateArrangement(currentArrangement.id, arrangementUpdates);
    setShowVendorPresets(false);

    // Show success message based on usage type
    const messages = {
      "as-is":
        "Vendor preset imported as-is. Layout is locked to vendor specifications.",
      template: "Vendor preset used as template. You can modify freely.",
      modified: "Vendor preset imported with modification tracking enabled.",
      hybrid:
        "Vendor preset imported in hybrid mode. Vendor elements are locked, custom additions allowed.",
    };

    // This would show a toast in a real implementation
    console.log(messages[usageType]);
  };

  const handleSwapSeats = (
    tableId: number,
    seatNumber1: number,
    seatNumber2: number,
  ) => {
    const table = currentArrangement.tables.find((t) => t.id === tableId);
    if (!table || !table.seatAssignments) return;

    const guest1 = table.seatAssignments[seatNumber1];
    const guest2 = table.seatAssignments[seatNumber2];

    if (!guest1 || !guest2) return;

    const updatedSeatAssignments = { ...table.seatAssignments };
    updatedSeatAssignments[seatNumber1] = guest2;
    updatedSeatAssignments[seatNumber2] = guest1;

    const updatedTables = currentArrangement.tables.map((t) =>
      t.id === tableId ? { ...t, seatAssignments: updatedSeatAssignments } : t,
    );

    updateArrangement(currentArrangement.id, { tables: updatedTables });
  };

  const totalAssigned =
    currentArrangement.venueType === "seat-based"
      ? currentArrangement.seats.filter((s) => s.status === "assigned").length
      : currentArrangement.tables.reduce(
          (sum, table) => sum + Object.keys(table.seatAssignments || {}).length,
          0,
        ) +
        (currentArrangement.chairs || []).filter((chair) => chair.guest).length;

  const totalCapacity =
    currentArrangement.venueType === "seat-based"
      ? currentArrangement.seats.length
      : currentArrangement.tables.reduce((sum, table) => sum + table.seats, 0) +
        (currentArrangement.chairs || []).length;

  return (
    <LocationContextProvider>
      <div className="flex h-full flex-col">
        {/* Ultra-Compact Navigation */}
        <CompactNavigationHeader />

        {/* Compact Action Header */}
        <CompactVenueHeader
          onSmartAssign={handleSmartAssign}
          onReset={handleReset}
          onExport={handleExport}
          onPrint={handlePrint}
          totalAssigned={totalAssigned}
          totalCapacity={totalCapacity}
          unassignedCount={unassignedGuests.length}
        />

        {/* Minimal Content Header */}
        <div className="flex h-8 items-center justify-between border-b bg-white px-3">
          <div className="flex items-center gap-2 text-sm">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="h-6 text-xs"
              >
                <ArrowLeft className="mr-1 h-3 w-3" />
                Back
              </Button>
            )}
            <Users className="h-4 w-4 text-purple-600" />
            <span className="font-medium">Seating</span>
            <Badge
              variant="outline"
              className="h-5 text-xs"
            >
              {currentArrangement?.venueType === "seat-based" ? (
                <>
                  <Armchair className="mr-1 h-3 w-3" />
                  Seats
                </>
              ) : (
                <>
                  <TableIcon className="mr-1 h-3 w-3" />
                  Tables
                </>
              )}
            </Badge>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant={
                !showLayoutDesigner && viewMode === "design"
                  ? "default"
                  : "outline"
              }
              size="sm"
              onClick={() => {
                setShowLayoutDesigner(false);
                setViewMode("design");
              }}
              className="h-6 text-xs"
            >
              Seating
            </Button>
            <Button
              variant={showLayoutDesigner ? "default" : "outline"}
              size="sm"
              onClick={() => setShowLayoutDesigner(true)}
              className="h-6 text-xs"
            >
              Layout
            </Button>
            <Button
              variant={
                !showLayoutDesigner && viewMode === "preview"
                  ? "default"
                  : "outline"
              }
              size="sm"
              onClick={() => {
                setShowLayoutDesigner(false);
                setViewMode("preview");
              }}
              className="h-6 text-xs"
            >
              Preview
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowVendorPresets(true)}
              className="h-6 text-xs"
            >
              Vendor Presets
            </Button>
            {currentArrangement?.layoutData && !showLayoutDesigner && (
              <div className="ml-2 flex items-center gap-1">
                <span className="text-muted-foreground text-xs">
                  Background:
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={layoutOpacity}
                  onChange={(e) => setLayoutOpacity(parseFloat(e.target.value))}
                  className="h-1 w-16"
                />
              </div>
            )}
          </div>
        </div>

        {/* Vendor Preset Usage Indicator */}
        {currentPresetUsage && (
          <div className="bg-primary/10 flex h-6 items-center justify-between border-b px-3 text-xs">
            <span className="text-primary font-medium">
              Using vendor preset:{" "}
              {currentPresetUsage.usageType === "as-is"
                ? "As-Is"
                : currentPresetUsage.usageType === "template"
                  ? "Template"
                  : currentPresetUsage.usageType === "modified"
                    ? "Modified"
                    : "Hybrid"}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPresetUsage(null)}
              className="h-4 text-xs"
            >
              Disconnect
            </Button>
          </div>
        )}

        {showLayoutDesigner ? (
          /* Layout Designer Mode */
          <div className="flex-1">
            <SimpleLayoutDesigner
              viewMode="design"
              initialLayout={currentArrangement?.layoutData}
              onSave={handleSaveLayout}
              onUseAsBackground={handleUseAsBackground}
              onExport={handleExport}
            />
          </div>
        ) : (
          /* Original Seating Mode */
          <div className="flex flex-1">
            {/* Canvas Area */}
            <div className="flex flex-1 flex-col">
              {/* Minimal Canvas Toolbar */}
              {currentArrangement?.venueType === "table-based" && (
                <div className="flex h-8 items-center gap-2 border-b bg-gray-50 px-3">
                  <Button
                    size="sm"
                    onClick={handleAddTable}
                    className="h-6 text-xs"
                  >
                    Add Table
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleAddChair}
                    className="h-6 text-xs"
                  >
                    Add Chairs
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleAddVenueObject}
                    className="h-6 text-xs"
                  >
                    Add Object
                  </Button>
                </div>
              )}

              {/* Canvas */}
              <div className="relative flex-1 bg-white">
                <SeatingCanvas
                  ref={canvasRef}
                  tables={currentArrangement?.tables || []}
                  chairs={currentArrangement?.chairs}
                  seats={currentArrangement?.seats || []}
                  seatSections={currentArrangement?.seatSections || []}
                  venueObjects={currentArrangement?.venueObjects || []}
                  venueType={currentArrangement?.venueType || "table-based"}
                  onUpdateTable={handleUpdateTable}
                  onUpdateChair={handleUpdateChair}
                  onUpdateSeat={handleUpdateSeat}
                  onUpdateVenueObject={handleUpdateVenueObject}
                  onSelectTable={setSelectedTable}
                  onSelectChair={setSelectedChair}
                  onSelectSeat={setSelectedSeat}
                  onSelectVenueObject={setSelectedVenueObject}
                  onDeleteTable={handleDeleteTable}
                  onDeleteChair={handleDeleteChair}
                  onDeleteVenueObject={handleDeleteVenueObject}
                  onConfigureTable={(table) => {
                    setSelectedTable(table);
                    setIsCreatingTable(false);
                    setShowTableConfig(true);
                  }}
                  onConfigureChair={(chair) => {
                    setSelectedChair(chair);
                    setIsCreatingChair(false);
                    setShowChairConfig(true);
                  }}
                  onConfigureVenueObject={(object) => {
                    setSelectedVenueObject(object);
                    setIsCreatingVenueObject(false);
                    setShowVenueObjectConfig(true);
                  }}
                  onAssignSeat={() => setShowSeatAssignment(true)}
                  onAssignChair={handleAssignChair}
                  onAssignIndividualSeat={() => setShowSeatAssignment(true)}
                  onSwapSeats={(table) => {
                    setSelectedTable(table);
                    setShowSeatSwap(true);
                  }}
                  selectedTable={selectedTable}
                  selectedChair={selectedChair}
                  selectedSeat={selectedSeat}
                  selectedVenueObject={selectedVenueObject}
                  layoutData={currentArrangement?.layoutData}
                  layoutOpacity={layoutOpacity}
                  viewMode={viewMode}
                />
              </div>
            </div>

            {/* Right Panel - Guest Management */}
            <div className="flex w-80 flex-col border-l bg-gray-50">
              <GuestAssignmentPanel
                guests={unassignedGuests}
                tables={currentArrangement?.tables || []}
                chairs={currentArrangement?.chairs}
                selectedTable={selectedTable}
                onAssignGuest={handleAssignGuestToChair}
                onUnassignGuest={handleUnassignGuest}
              />
            </div>
          </div>
        )}

        {/* Analytics Panel */}
        {showAnalytics && (
          <SeatingAnalytics
            tables={currentArrangement?.tables || []}
            unassignedGuests={unassignedGuests}
            onClose={() => setShowAnalytics(false)}
          />
        )}

        {/* Dialogs */}
        {showTableConfig && (
          <EnhancedTableConfigDialog
            table={selectedTable || undefined}
            onSave={handleSaveTableConfig}
            onClose={() => {
              setShowTableConfig(false);
              setSelectedTable(null);
              setIsCreatingTable(false);
            }}
            isCreating={isCreatingTable}
            availableGroups={["VIP", "Family", "Friends", "Colleagues"]}
          />
        )}

        {showChairConfig && (
          <ChairConfigDialog
            chair={selectedChair || undefined}
            onSave={handleSaveChairConfig}
            onClose={() => {
              setShowChairConfig(false);
              setSelectedChair(null);
              setIsCreatingChair(false);
            }}
            isCreating={isCreatingChair}
            availableGroups={["VIP", "Family", "Friends", "Colleagues"]}
          />
        )}

        {showVenueObjectConfig && (
          <VenueObjectDialog
            venueObject={selectedVenueObject || undefined}
            onSave={handleSaveVenueObjectConfig}
            onClose={() => {
              setShowVenueObjectConfig(false);
              setSelectedVenueObject(null);
              setIsCreatingVenueObject(false);
            }}
            isCreating={isCreatingVenueObject}
          />
        )}

        {showSeatAssignment && (
          <SeatAssignmentDialog
            table={selectedTable || undefined}
            seat={selectedSeat || undefined}
            availableGuests={unassignedGuests}
            onAssignGuest={() => {}}
            onUnassignSeat={() => {}}
            onClose={() => {
              setShowSeatAssignment(false);
              setSelectedSeat(null);
            }}
          />
        )}

        {showSeatSwap && selectedTable && (
          <SeatSwapDialog
            table={selectedTable}
            onSwapSeats={(seat1, seat2) =>
              handleSwapSeats(selectedTable.id, seat1, seat2)
            }
            onClose={() => {
              setShowSeatSwap(false);
              setSelectedTable(null);
            }}
          />
        )}

        {/* Print Dialog */}
        <PrintDialog
          open={showPrintDialog}
          onClose={() => setShowPrintDialog(false)}
          tables={currentArrangement?.tables || []}
          chairs={currentArrangement?.chairs}
          arrangementName={currentArrangement?.name || "Arrangement"}
          onExportDiagram={handleExport}
        />

        {/* Vendor Preset Selector */}
        {showVendorPresets && (
          <div className="bg-background fixed inset-0 z-50 overflow-auto">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Choose Vendor Preset</h2>
                <Button
                  variant="outline"
                  onClick={() => setShowVendorPresets(false)}
                >
                  Cancel
                </Button>
              </div>
              <VendorPresetSelector
                onSelectPreset={handleSelectVendorPreset}
                onClose={() => setShowVendorPresets(false)}
              />
            </div>
          </div>
        )}
      </div>
    </LocationContextProvider>
  );
};

const EnhancedSeatingModule = ({
  eventId,
  onBack,
}: EnhancedSeatingModuleProps) => {
  return (
    <VenueHierarchyProvider>
      <EnhancedSeatingModuleContent onBack={onBack} />
    </VenueHierarchyProvider>
  );
};

export default EnhancedSeatingModule;
