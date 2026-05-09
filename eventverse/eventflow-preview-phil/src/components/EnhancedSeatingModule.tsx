import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, TableIcon, Armchair, Plus, Table as TableIconLucide, Box, Palette, Store } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { VenueHierarchyProvider, useVenueHierarchy } from "@/hooks/useVenueHierarchy";
import { LocationContextProvider } from "@/hooks/useLocationContext";
import CompactNavigationHeader from "./CompactNavigationHeader";
import CompactVenueHeader from "./CompactVenueHeader";
import SeatingCanvas from "./SeatingCanvas";
import GuestAssignmentPanel from "./GuestAssignmentPanel";
import SeatingAnalytics from "./SeatingAnalytics";
import EnhancedTableConfigDialog from "./EnhancedTableConfigDialog";
import SeatAssignmentDialog from "./SeatAssignmentDialog";
import SeatSwapDialog from "./SeatSwapDialog";
import VenueObjectDialog from "./VenueObjectDialog";
import ChairConfigDialog from "./ChairConfigDialog";
import PrintDialog from "./PrintDialog";
import { smartAssignGuests, resetArrangement } from "@/utils/smartAssignment";
import type { Guest, Table, VenueObject, Chair } from "@/types/venue";
import type { Seat, SeatSection } from '@/types/venue';
import SimpleLayoutDesigner from "./layout-designer/SimpleLayoutDesigner";
import VendorPresetSelector from "./seating/VendorPresetSelector";
import type { VenuePreset, VendorPresetUsage } from "@/types/venue";
import { mockGuests } from "./seating/mockGuestData";

interface EnhancedSeatingModuleProps {
  eventId?: string;
  onBack?: () => void;
}

const EnhancedSeatingModuleContent = ({ onBack }: { onBack?: () => void }) => {
  const {
    currentArrangement,
    updateArrangement
  } = useVenueHierarchy();

  const [unassignedGuests, setUnassignedGuests] = useState<Guest[]>(mockGuests);
  const [draggedGuest, setDraggedGuest] = useState<Guest | null>(null);

  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [selectedChair, setSelectedChair] = useState<Chair | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [selectedVenueObject, setSelectedVenueObject] = useState<VenueObject | null>(null);
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
  const canvasRef = useRef<any>(null);

  const [showLayoutDesigner, setShowLayoutDesigner] = useState(false);
  const [layoutOpacity, setLayoutOpacity] = useState(0.3);
  const [showVendorPresets, setShowVendorPresets] = useState(false);
  const [currentPresetUsage, setCurrentPresetUsage] = useState<VendorPresetUsage | null>(null);

  if (!currentArrangement) {
    return (
      <LocationContextProvider>
        <div className="h-full flex flex-col">
          <CompactNavigationHeader />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700">No Arrangement Selected</h3>
              <p className="text-gray-500">Please select or create an arrangement to get started.</p>
            </div>
          </div>
        </div>
      </LocationContextProvider>
    );
  }

  const handleSmartAssign = () => {
    const { tables: updatedTables, unassigned } = smartAssignGuests(
      unassignedGuests,
      currentArrangement.tables
    );
    
    updateArrangement(currentArrangement.id, { tables: updatedTables });
    setUnassignedGuests(unassigned);
  };

  const handleReset = () => {
    const resetTables = resetArrangement(currentArrangement.tables);
    updateArrangement(currentArrangement.id, { tables: resetTables });
    
    // Reset chairs
    const resetChairs = (currentArrangement.chairs || []).map(chair => ({
      ...chair,
      guest: undefined
    }));
    
    // Restore all guests to unassigned
    const allGuests = [
      ...unassignedGuests,
      ...currentArrangement.tables.flatMap(table => table.guests),
      ...(currentArrangement.chairs || []).filter(chair => chair.guest).map(chair => chair.guest!)
    ];
    updateArrangement(currentArrangement.id, { chairs: resetChairs });
    setUnassignedGuests(allGuests);
  };

  const handleExport = async () => {
    if (!canvasRef.current?.exportImage) {
      console.error('Canvas export method not available');
      return;
    }

    try {
      const canvas = await canvasRef.current.exportImage();
      if (canvas) {
        const link = document.createElement('a');
        link.download = `seating-chart-${currentArrangement.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export diagram. Please try again.');
    }
  };

  const handlePrint = () => {
    setShowPrintDialog(true);
  };

  const handleUpdateTable = (tableId: number, updates: Partial<Table>) => {
    const updatedTables = currentArrangement.tables.map(table =>
      table.id === tableId ? { ...table, ...updates } : table
    );
    updateArrangement(currentArrangement.id, { tables: updatedTables });
  };

  const handleUpdateSeat = (seatId: number, updates: Partial<Seat>) => {
    const updatedSeats = currentArrangement.seats.map(seat =>
      seat.id === seatId ? { ...seat, ...updates } : seat
    );
    updateArrangement(currentArrangement.id, { seats: updatedSeats });
  };

  const handleUpdateVenueObject = (objectId: number, updates: Partial<VenueObject>) => {
    const updatedObjects = currentArrangement.venueObjects.map(obj =>
      obj.id === objectId ? { ...obj, ...updates } : obj
    );
    updateArrangement(currentArrangement.id, { venueObjects: updatedObjects });
  };

  const handleUpdateChair = (chairId: number, updates: Partial<Chair>) => {
    const updatedChairs = (currentArrangement.chairs || []).map(chair =>
      chair.id === chairId ? { ...chair, ...updates } : chair
    );
    updateArrangement(currentArrangement.id, { chairs: updatedChairs });
  };

  const handleDeleteTable = (tableId: number) => {
    const updatedTables = currentArrangement.tables.filter(table => table.id !== tableId);
    updateArrangement(currentArrangement.id, { tables: updatedTables });
    setSelectedTable(null);
  };

  const handleDeleteChair = (chairId: number) => {
    const updatedChairs = (currentArrangement.chairs || []).filter(chair => chair.id !== chairId);
    updateArrangement(currentArrangement.id, { chairs: updatedChairs });
    setSelectedChair(null);
  };

  const handleDeleteVenueObject = (objectId: number) => {
    const updatedObjects = currentArrangement.venueObjects.filter(obj => obj.id !== objectId);
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
    const updatedChairs = (currentArrangement.chairs || []).map(chair =>
      chair.id === chairId ? { ...chair, guest } : chair
    );
    updateArrangement(currentArrangement.id, { chairs: updatedChairs });
    setUnassignedGuests(prev => prev.filter(g => g.id !== guest.id));
  };

  const handleUnassignGuest = (guest: Guest, id: number) => {
    // Check if this is a table or chair based on the guest assignment
    const table = currentArrangement.tables.find(t => 
      Object.values(t.seatAssignments || {}).some(g => g.id === guest.id)
    );
    
    if (table) {
      // Handle table unassignment
      const updatedSeatAssignments = { ...table.seatAssignments };
      Object.keys(updatedSeatAssignments).forEach(seatNumber => {
        if (updatedSeatAssignments[seatNumber].id === guest.id) {
          delete updatedSeatAssignments[seatNumber];
        }
      });
      
      const updatedTables = currentArrangement.tables.map(t =>
        t.id === table.id ? { ...t, seatAssignments: updatedSeatAssignments } : t
      );
      updateArrangement(currentArrangement.id, { tables: updatedTables });
    } else {
      // Handle chair unassignment
      const updatedChairs = (currentArrangement.chairs || []).map(chair =>
        chair.id === id ? { ...chair, guest: undefined } : chair
      );
      updateArrangement(currentArrangement.id, { chairs: updatedChairs });
    }
    
    setUnassignedGuests(prev => [...prev, guest]);
  };

  const handleDropGuestToSeat = (tableId: number, seatNumber: number) => {
    if (!draggedGuest) return;

    const table = currentArrangement.tables.find(t => t.id === tableId);
    if (!table) return;

    // Check if seat is already occupied
    if (table.seatAssignments?.[seatNumber]) {
      console.warn('Seat already occupied');
      return;
    }

    // Assign guest to the seat
    const updatedSeatAssignments = {
      ...table.seatAssignments,
      [seatNumber]: draggedGuest
    };

    const updatedTables = currentArrangement.tables.map(t =>
      t.id === tableId ? { ...t, seatAssignments: updatedSeatAssignments } : t
    );

    updateArrangement(currentArrangement.id, { tables: updatedTables });
    setUnassignedGuests(prev => prev.filter(g => g.id !== draggedGuest.id));
    setDraggedGuest(null);
  };

  const handleSaveTableConfig = (config: any) => {
    if (isCreatingTable) {
      const newTable: Table = {
        id: Date.now(),
        name: config.name,
        seats: config.seats,
        shape: config.shape,
        x: 50 + (currentArrangement.tables.length * 50),
        y: 50 + (currentArrangement.tables.length * 50),
        guests: [],
        targetGroup: config.targetGroup,
        scale: config.scale,
        notes: config.notes,
        rotation: config.rotation,
        seatAssignments: {}
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

  const handleSaveChairConfig = (config: any) => {
    if (isCreatingChair) {
      const baseX = 100 + ((currentArrangement.chairs || []).length * 50);
      const baseY = 100 + ((currentArrangement.chairs || []).length * 50);
      const gridId = config.layoutType === "grid" ? `grid-${Date.now()}` : undefined;
      
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
          gridId
        });
      } else {
        // Create grid of chairs
        const chairSpacing = 40;
        for (let row = 0; row < config.rows; row++) {
          for (let col = 0; col < config.columns; col++) {
            newChairs.push({
              id: Date.now() + row * config.columns + col,
              name: `${config.name} R${row + 1}C${col + 1}`,
              x: baseX + (col * chairSpacing),
              y: baseY + (row * chairSpacing),
              targetGroup: config.targetGroup,
              notes: config.notes,
              rotation: config.rotation,
              gridId
            });
          }
        }
      }
      
      const updatedChairs = [...(currentArrangement.chairs || []), ...newChairs];
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
        x: 50 + (currentArrangement.venueObjects.length * 50),
        y: 50 + (currentArrangement.venueObjects.length * 50),
        width: config.width || 200,
        height: config.height || 100,
        rotation: config.rotation || 0,
        color: config.color || "#8B5CF6"
      };
      
      const updatedObjects = [...currentArrangement.venueObjects, newObject];
      updateArrangement(currentArrangement.id, { venueObjects: updatedObjects });
    } else if (selectedVenueObject) {
      handleUpdateVenueObject(selectedVenueObject.id, config);
    }
    setShowVenueObjectConfig(false);
    setSelectedVenueObject(null);
    setIsCreatingVenueObject(false);
  };

  const handleSaveLayout = (layoutData: any) => {
    updateArrangement(currentArrangement.id, { layoutData });
  };

  const handleUseAsBackground = (layoutData: any) => {
    updateArrangement(currentArrangement.id, { layoutData });
    setShowLayoutDesigner(false);
    setViewMode("design");
  };

  const handleSelectVendorPreset = (preset: VenuePreset, usageType: "as-is" | "template" | "modified" | "hybrid") => {
    // Create preset usage tracking
    const presetUsage: VendorPresetUsage = {
      id: `usage-${Date.now()}`,
      presetId: preset.id,
      eventId: currentArrangement.sectionId, // Using section ID as event reference
      hostId: "current-host", // This would come from auth context
      usageType,
      status: "active",
      bookedAt: new Date().toISOString(),
      modifications: []
    };

    setCurrentPresetUsage(presetUsage);

    // Apply the preset based on usage type
    const arrangementUpdates: any = {};

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
      arrangementUpdates.tables = preset.tables.map(table => ({
        ...table,
        id: Date.now() + Math.random(), // New IDs for full independence
        guests: [],
        seatAssignments: {}
      }));
      arrangementUpdates.chairs = preset.chairs.map(chair => ({
        ...chair,
        id: Date.now() + Math.random(),
        guest: undefined
      }));
      arrangementUpdates.seats = preset.seats;
      arrangementUpdates.seatSections = preset.seatSections;
      arrangementUpdates.venueObjects = preset.venueObjects.map(obj => ({
        ...obj,
        id: Date.now() + Math.random()
      }));
      arrangementUpdates.layoutData = preset.layoutData;
    } else {
      // Modified or hybrid - import with vendor connection maintained
      arrangementUpdates.tables = preset.tables.map(table => ({
        ...table,
        vendorPresetId: preset.id, // Mark as vendor-connected
        guests: [],
        seatAssignments: {}
      }));
      arrangementUpdates.chairs = preset.chairs.map(chair => ({
        ...chair,
        vendorPresetId: preset.id,
        guest: undefined
      }));
      arrangementUpdates.seats = preset.seats;
      arrangementUpdates.seatSections = preset.seatSections;
      arrangementUpdates.venueObjects = preset.venueObjects.map(obj => ({
        ...obj,
        vendorPresetId: preset.id
      }));
      arrangementUpdates.layoutData = preset.layoutData;
    }

    // Update the arrangement
    updateArrangement(currentArrangement.id, arrangementUpdates);
    setShowVendorPresets(false);
    
    // Show success message based on usage type
    const messages = {
      "as-is": "Vendor preset imported as-is. Layout is locked to vendor specifications.",
      "template": "Vendor preset used as template. You can modify freely.",
      "modified": "Vendor preset imported with modification tracking enabled.",
      "hybrid": "Vendor preset imported in hybrid mode. Vendor elements are locked, custom additions allowed."
    };

    // This would show a toast in a real implementation
    console.log(messages[usageType]);
  };

  const handleSwapSeats = (tableId: number, seatNumber1: number, seatNumber2: number) => {
    const table = currentArrangement.tables.find(t => t.id === tableId);
    if (!table || !table.seatAssignments) return;

    const guest1 = table.seatAssignments[seatNumber1];
    const guest2 = table.seatAssignments[seatNumber2];

    if (!guest1 || !guest2) return;

    const updatedSeatAssignments = { ...table.seatAssignments };
    updatedSeatAssignments[seatNumber1] = guest2;
    updatedSeatAssignments[seatNumber2] = guest1;

    const updatedTables = currentArrangement.tables.map(t =>
      t.id === tableId ? { ...t, seatAssignments: updatedSeatAssignments } : t
    );
    
    updateArrangement(currentArrangement.id, { tables: updatedTables });
  };

  const totalAssigned = currentArrangement.venueType === "seat-based" 
    ? currentArrangement.seats.filter(s => s.status === 'assigned').length
    : currentArrangement.tables.reduce((sum, table) => sum + Object.keys(table.seatAssignments || {}).length, 0) +
      (currentArrangement.chairs || []).filter(chair => chair.guest).length;
    
  const totalCapacity = currentArrangement.venueType === "seat-based"
    ? currentArrangement.seats.length
    : currentArrangement.tables.reduce((sum, table) => sum + table.seats, 0) +
      (currentArrangement.chairs || []).length;

  return (
    <LocationContextProvider>
      <div className="h-full flex flex-col">
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
        <div className="h-8 flex justify-between items-center px-3 border-b bg-white">
          <div className="flex items-center gap-2 text-sm">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack} className="h-6 text-xs">
                <ArrowLeft className="w-3 h-3 mr-1" />
                Back
              </Button>
            )}
            <Users className="w-4 h-4 text-purple-600" />
            <span className="font-medium">Seating</span>
            <Badge variant="outline" className="text-xs h-5">
              {currentArrangement?.venueType === 'seat-based' ? (
                <><Armchair className="w-3 h-3 mr-1" />Seats</>
              ) : (
                <><TableIcon className="w-3 h-3 mr-1" />Tables</>
              )}
            </Badge>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant={!showLayoutDesigner && viewMode === "design" ? "default" : "outline"}
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
              variant={!showLayoutDesigner && viewMode === "preview" ? "default" : "outline"}
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
              <div className="flex items-center gap-1 ml-2">
                <span className="text-xs text-muted-foreground">Background:</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={layoutOpacity}
                  onChange={(e) => setLayoutOpacity(parseFloat(e.target.value))}
                  className="w-16 h-1"
                />
              </div>
            )}
          </div>
        </div>

        {/* Vendor Preset Usage Indicator */}
        {currentPresetUsage && (
          <div className="h-6 bg-primary/10 border-b px-3 flex items-center justify-between text-xs">
            <span className="text-primary font-medium">
              Using vendor preset: {currentPresetUsage.usageType === "as-is" ? "As-Is" : 
                                    currentPresetUsage.usageType === "template" ? "Template" :
                                    currentPresetUsage.usageType === "modified" ? "Modified" : "Hybrid"}
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
          <div className="flex-1 flex">
              {/* Canvas Area */}
            <div className="flex-1 flex flex-col">
              {/* Minimal Canvas Toolbar */}
              {currentArrangement?.venueType === "table-based" && (
                <div className="h-8 flex items-center px-3 border-b bg-gray-50 gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" className="h-6 text-xs">
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56 bg-background z-50">
                      <DropdownMenuLabel>Add to Canvas</DropdownMenuLabel>
                      <DropdownMenuItem onClick={handleAddTable}>
                        <TableIconLucide className="w-4 h-4 mr-2" />
                        Add Table
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleAddChair}>
                        <Armchair className="w-4 h-4 mr-2" />
                        Add Chairs
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleAddVenueObject}>
                        <Box className="w-4 h-4 mr-2" />
                        Add Objects
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleAddVenueObject}>
                        <Palette className="w-4 h-4 mr-2" />
                        Add Decor
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleAddVenueObject}>
                        <Store className="w-4 h-4 mr-2" />
                        Add Vendor Booth/Tent
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              {/* Canvas */}
              <div className="flex-1 relative bg-white">
                <SeatingCanvas
                  ref={canvasRef}
                  tables={currentArrangement?.tables || []}
                  chairs={currentArrangement?.chairs}
                  seats={currentArrangement?.seats || []}
                  seatSections={currentArrangement?.seatSections || []}
                  venueObjects={currentArrangement?.venueObjects || []}
                  venueType={(currentArrangement?.venueType as 'seat-based' | 'table-based') || "table-based"}
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
                  draggedGuest={draggedGuest}
                  onDropGuestToSeat={handleDropGuestToSeat}
                />
              </div>
            </div>

            {/* Right Panel - Guest Management */}
            <div className="w-80 border-l bg-gray-50 flex flex-col">
              <GuestAssignmentPanel
                guests={unassignedGuests}
                tables={currentArrangement?.tables || []}
                chairs={currentArrangement?.chairs}
                selectedTable={selectedTable}
                onAssignGuest={handleAssignGuestToChair}
                onUnassignGuest={handleUnassignGuest}
                draggedGuest={draggedGuest}
                onSetDraggedGuest={setDraggedGuest}
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
            onSwapSeats={(seat1, seat2) => handleSwapSeats(selectedTable.id, seat1, seat2)}
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
          <div className="fixed inset-0 bg-background z-50 overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Choose Vendor Preset</h2>
                <Button variant="outline" onClick={() => setShowVendorPresets(false)}>
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

const EnhancedSeatingModule = ({ eventId, onBack }: EnhancedSeatingModuleProps) => {
  return (
    <EnhancedSeatingModuleContent onBack={onBack} />
  );
};

export default EnhancedSeatingModule;
