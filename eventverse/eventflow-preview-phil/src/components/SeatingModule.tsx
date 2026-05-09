import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, TableIcon, Armchair, Plus, RotateCcw, Download, Printer, BarChart3, Eye, EyeOff, Table as TableIconLucide, Box, Palette, Store } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import SeatingCanvas from "./SeatingCanvas";
import GuestAssignmentPanel from "./GuestAssignmentPanel";
import SeatingAnalytics from "./SeatingAnalytics";
import EnhancedTableConfigDialog from "./EnhancedTableConfigDialog";
import SeatAssignmentDialog from "./SeatAssignmentDialog";
import SeatSwapDialog from "./SeatSwapDialog";
import VenueObjectDialog from "./VenueObjectDialog";
import ChairConfigDialog from "./ChairConfigDialog";
import PrintDialog from "./PrintDialog";
import VenueTemplateDialog from "./VenueTemplateDialog";
import { smartAssignGuests, resetArrangement } from "@/utils/smartAssignment";
import type { Guest, Table, VenueObject, Chair } from "@/types/venue";
import type { Seat } from "@/types/venue";

interface SeatingCanvasRef {
  exportImage: () => Promise<HTMLCanvasElement>;
}

interface SeatingModuleProps {
  eventId?: string;
  onBack?: () => void;
}

const SeatingModule = ({ eventId, onBack }: SeatingModuleProps) => {
  const [tables, setTables] = useState<Table[]>([
    { id: 1, name: "Table 1", seats: 8, shape: "round", x: 150, y: 150, guests: [], targetGroup: "Family", scale: 1, rotation: 0, seatAssignments: {} },
    { id: 2, name: "Table 2", seats: 6, shape: "round", x: 350, y: 150, guests: [], targetGroup: "Friends", scale: 1, rotation: 0, seatAssignments: {} },
    { id: 3, name: "Head Table", seats: 12, shape: "long-rectangular", x: 250, y: 50, guests: [], targetGroup: "VIP", scale: 1.2, rotation: 0, seatAssignments: {} }
  ]);

  const [chairs, setChairs] = useState<Chair[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [venueObjects, setVenueObjects] = useState<VenueObject[]>([
    { id: 1, name: "Stage", type: "stage", x: 250, y: 20, width: 200, height: 80, rotation: 0, color: "#8B5CF6" },
    { id: 2, name: "Exit", type: "exit", x: 50, y: 250, width: 60, height: 100, rotation: 0, color: "#EF4444" }
  ]);

  const [unassignedGuests, setUnassignedGuests] = useState<Guest[]>([
    { id: 1, name: "John Smith", email: "john@example.com", group: "Family", dietary: "Vegetarian" },
    { id: 2, name: "Sarah Johnson", email: "sarah@example.com", group: "Friends", dietary: "None" },
    { id: 3, name: "Mike Wilson", email: "mike@example.com", group: "VIP", dietary: "Gluten-free" },
    { id: 4, name: "Emma Davis", email: "emma@example.com", group: "Family", dietary: "Vegan" },
    { id: 5, name: "Tom Brown", email: "tom@example.com", group: "Friends", dietary: "None" },
    { id: 6, name: "Lisa Chen", email: "lisa@example.com", group: "Colleagues", dietary: "None" },
    { id: 7, name: "David Wilson", email: "david@example.com", group: "VIP", dietary: "None" }
  ]);
  const [draggedGuest, setDraggedGuest] = useState<Guest | null>(null);

  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [selectedChair, setSelectedChair] = useState<Chair | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [selectedVenueObject, setSelectedVenueObject] = useState<VenueObject | null>(null);
  const [selectedGridId, setSelectedGridId] = useState<string | null>(null);
  const [showTableConfig, setShowTableConfig] = useState(false);
  const [showChairConfig, setShowChairConfig] = useState(false);
  const [showSeatAssignment, setShowSeatAssignment] = useState(false);
  const [showSeatSwap, setShowSeatSwap] = useState(false);
  const [showVenueObjectConfig, setShowVenueObjectConfig] = useState(false);
  const [showPrintDialog, setShowPrintDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [viewMode, setViewMode] = useState<"design" | "preview">("design");
  const [isCreatingTable, setIsCreatingTable] = useState(false);
  const [isCreatingChair, setIsCreatingChair] = useState(false);
  const [isCreatingVenueObject, setIsCreatingVenueObject] = useState(false);
  const [venueType] = useState<"table-based" | "seat-based">("table-based");
  const canvasRef = useRef<SeatingCanvasRef>(null);

  const handleSmartAssign = () => {
    console.log('Smart assign clicked - starting assignment process');
    console.log('Unassigned guests before:', unassignedGuests.length);
    console.log('Tables before:', tables.map(t => `${t.name}: ${Object.keys(t.seatAssignments || {}).length}/${t.seats}`));
    
    const { tables: updatedTables, unassigned } = smartAssignGuests(unassignedGuests, tables);
    
    console.log('Smart assign results:');
    console.log('Updated tables:', updatedTables.map(t => `${t.name}: ${Object.keys(t.seatAssignments || {}).length}/${t.seats}`));
    console.log('Remaining unassigned:', unassigned.length);
    
    setTables(updatedTables);
    setUnassignedGuests(unassigned);
    
    console.log('State updated successfully');
  };

  const handleReset = () => {
    const resetTables = resetArrangement(tables);
    setTables(resetTables);
    
    const resetChairs = chairs.map(chair => ({ ...chair, guest: undefined }));
    setChairs(resetChairs);
    
    const allGuests = [
      ...unassignedGuests,
      ...tables.flatMap(table => table.guests),
      ...chairs.filter(chair => chair.guest).map(chair => chair.guest!)
    ];
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
        link.download = `seating-chart-${Date.now()}.png`;
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
    setTables(prev => prev.map(table =>
      table.id === tableId ? { ...table, ...updates } : table
    ));
  };

  const handleUpdateSeat = (seatId: number, updates: Partial<Seat>) => {
    setSeats(prev => prev.map(seat =>
      seat.id === seatId ? { ...seat, ...updates } : seat
    ));
  };

  const handleUpdateVenueObject = (objectId: number, updates: Partial<VenueObject>) => {
    setVenueObjects(prev => prev.map(obj =>
      obj.id === objectId ? { ...obj, ...updates } : obj
    ));
  };

  const handleUpdateChair = (chairId: number, updates: Partial<Chair>) => {
    setChairs(prev => {
      const chair = prev.find(c => c.id === chairId);
      if (!chair) return prev;
      
      // If this chair is part of a grid and we're updating position, update all chairs in the grid
      if (chair.gridId && (updates.x !== undefined || updates.y !== undefined)) {
        const gridChairs = prev.filter(c => c.gridId === chair.gridId);
        const deltaX = updates.x !== undefined ? updates.x - chair.x : 0;
        const deltaY = updates.y !== undefined ? updates.y - chair.y : 0;
        
        return prev.map(c => {
          if (c.gridId === chair.gridId) {
            return {
              ...c,
              x: c.x + deltaX,
              y: c.y + deltaY,
              ...updates
            };
          }
          return c;
        });
      }
      
      // Regular single chair update
      return prev.map(chair =>
        chair.id === chairId ? { ...chair, ...updates } : chair
      );
    });
  };

  const handleSelectChair = (chair: Chair) => {
    if (chair.gridId) {
      setSelectedGridId(chair.gridId);
      setSelectedChair(chair);
    } else {
      setSelectedChair(chair);
      setSelectedGridId(null);
    }
    // Clear other selections
    setSelectedTable(null);
    setSelectedSeat(null);
    setSelectedVenueObject(null);
  };

  const handleSelectGrid = (gridId: string) => {
    setSelectedGridId(gridId);
    const firstChairInGrid = chairs.find(c => c.gridId === gridId);
    if (firstChairInGrid) {
      setSelectedChair(firstChairInGrid);
    }
    // Clear other selections
    setSelectedTable(null);
    setSelectedSeat(null);
    setSelectedVenueObject(null);
  };

  const handleDeleteTable = (tableId: number) => {
    setTables(prev => prev.filter(table => table.id !== tableId));
    setSelectedTable(null);
  };

  const handleDeleteChair = (chairId: number) => {
    setChairs(prev => prev.filter(chair => chair.id !== chairId));
    setSelectedChair(null);
    setSelectedGridId(null);
  };

  const handleDeleteChairGrid = (gridId: string) => {
    const gridChairs = chairs.filter(chair => chair.gridId === gridId);
    const chairCount = gridChairs.length;
    
    if (confirm(`Delete entire grid with ${chairCount} chairs?`)) {
      setChairs(prev => prev.filter(chair => chair.gridId !== gridId));
      setSelectedChair(null);
      setSelectedGridId(null);
    }
  };

  const handleDeleteVenueObject = (objectId: number) => {
    setVenueObjects(prev => prev.filter(obj => obj.id !== objectId));
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
    setSelectedChair(chair);
    setShowSeatAssignment(true);
  };

  const handleAssignGuestToSeat = (guest: Guest, idOrTableId: number, seatNumber?: number) => {
    console.log('=== ASSIGN GUEST TO SEAT ===');
    console.log('Guest:', guest.name, 'ID:', guest.id);
    console.log('Target ID:', idOrTableId, 'Seat Number:', seatNumber);
    console.log('Current unassigned guests count:', unassignedGuests.length);
    
    if (seatNumber !== undefined) {
      // Table seat assignment
      const table = tables.find(t => t.id === idOrTableId);
      if (!table) {
        console.error('Table not found for assignment, ID:', idOrTableId);
        return;
      }
      
      console.log('Assigning to table:', table.name);
      console.log('Current seat assignments:', table.seatAssignments);
      
      const updatedSeatAssignments = { 
        ...table.seatAssignments || {}
      };
      updatedSeatAssignments[seatNumber] = guest;
      
      console.log('New seat assignments:', updatedSeatAssignments);
      
      setTables(prev => {
        const updated = prev.map(table =>
          table.id === idOrTableId 
            ? { ...table, seatAssignments: updatedSeatAssignments }
            : table
        );
        console.log('Tables state will be updated');
        return updated;
      });
    } else {
      // Individual chair assignment
      console.log('Assigning to chair:', idOrTableId);
      setChairs(prev => {
        const updated = prev.map(chair =>
          chair.id === idOrTableId ? { ...chair, guest } : chair
        );
        console.log('Chairs state will be updated');
        return updated;
      });
    }
    
    setUnassignedGuests(prev => {
      const updated = prev.filter(g => g.id !== guest.id);
      console.log('Unassigned guests will be updated. New count:', updated.length);
      console.log('Removed guest:', guest.name);
      return updated;
    });
    
    console.log('=== ASSIGNMENT COMPLETE ===');
  };

  const handleDropGuestToSeat = (tableId: number, seatNumber: number) => {
    if (!draggedGuest) return;

    const table = tables.find(t => t.id === tableId);
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

    setTables(prev => prev.map(t =>
      t.id === tableId ? { ...t, seatAssignments: updatedSeatAssignments } : t
    ));

    setUnassignedGuests(prev => prev.filter(g => g.id !== draggedGuest.id));
    setDraggedGuest(null);
  };

  const handleUnassignSeat = (seatId: number) => {
    // Check if this is a table seat or individual chair
    let unassignedGuest: Guest | null = null;

    if (selectedTable) {
      const guest = selectedTable.seatAssignments?.[seatId];
      if (guest) {
        unassignedGuest = guest;
        const updatedSeatAssignments = { ...selectedTable.seatAssignments };
        delete updatedSeatAssignments[seatId];
        
        setTables(prev => prev.map(table =>
          table.id === selectedTable.id 
            ? { ...table, seatAssignments: updatedSeatAssignments }
            : table
        ));
      }
    } else {
      // Individual chair
      const chair = chairs.find(c => c.id === seatId);
      if (chair?.guest) {
        unassignedGuest = chair.guest;
        setChairs(prev => prev.map(chair =>
          chair.id === seatId ? { ...chair, guest: undefined } : chair
        ));
      }
    }

    if (unassignedGuest) {
      setUnassignedGuests(prev => [...prev, unassignedGuest!]);
    }
  };

  const handleSaveTableConfig = (config: any) => {
    if (isCreatingTable) {
      // Generate the next table number starting from 1
      const existingTableNumbers = tables
        .map(t => t.name)
        .filter(name => name.startsWith('Table '))
        .map(name => parseInt(name.replace('Table ', '')))
        .filter(num => !isNaN(num));
      
      const nextTableNumber = existingTableNumbers.length > 0 
        ? Math.max(...existingTableNumbers) + 1 
        : 1;
      
      const newTable: Table = {
        id: Date.now(),
        name: config.name || `Table ${nextTableNumber}`,
        seats: config.seats,
        shape: config.shape,
        x: 50 + (tables.length * 50),
        y: 50 + (tables.length * 50),
        guests: [],
        targetGroup: config.targetGroup,
        scale: config.scale,
        notes: config.notes,
        rotation: config.rotation,
        seatAssignments: {}
      };
      
      setTables(prev => [...prev, newTable]);
    } else if (selectedTable) {
      handleUpdateTable(selectedTable.id, config);
    }
    setShowTableConfig(false);
    setSelectedTable(null);
    setIsCreatingTable(false);
  };

  const handleSaveChairConfig = (config: any) => {
    if (isCreatingChair) {
      const baseX = 100 + (chairs.length * 50);
      const baseY = 100 + (chairs.length * 50);
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
      
      setChairs(prev => [...prev, ...newChairs]);
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
        x: 50 + (venueObjects.length * 50),
        y: 50 + (venueObjects.length * 50),
        width: config.width || 200,
        height: config.height || 100,
        rotation: config.rotation || 0,
        color: config.color || "#8B5CF6"
      };
      
      setVenueObjects(prev => [...prev, newObject]);
    } else if (selectedVenueObject) {
      handleUpdateVenueObject(selectedVenueObject.id, config);
    }
    setShowVenueObjectConfig(false);
    setSelectedVenueObject(null);
    setIsCreatingVenueObject(false);
  };

  const handleSwapSeats = (tableId: number, seatNumber1: number, seatNumber2: number) => {
    const table = tables.find(t => t.id === tableId);
    if (!table || !table.seatAssignments) return;

    const guest1 = table.seatAssignments[seatNumber1];
    const guest2 = table.seatAssignments[seatNumber2];

    if (!guest1 || !guest2) return;

    const updatedSeatAssignments = { ...table.seatAssignments };
    updatedSeatAssignments[seatNumber1] = guest2;
    updatedSeatAssignments[seatNumber2] = guest1;

    setTables(prev => prev.map(t =>
      t.id === tableId ? { ...t, seatAssignments: updatedSeatAssignments } : t
    ));
  };

  const totalAssigned = venueType === "seat-based" 
    ? seats.filter(s => s.status === 'assigned').length
    : tables.reduce((sum, table) => sum + Object.keys(table.seatAssignments || {}).length, 0) +
      chairs.filter(chair => chair.guest).length;
    
  const totalCapacity = venueType === "seat-based"
    ? seats.length
    : tables.reduce((sum, table) => sum + table.seats, 0) + chairs.length;

  const getGridChairs = (gridId: string) => {
    return chairs.filter(chair => chair.gridId === gridId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <div>
              <h1 className="text-xl font-semibold">Seating Arrangements</h1>
              <p className="text-sm text-gray-600">Design your venue layout and assign guests</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              {totalAssigned}/{totalCapacity} Assigned
            </Badge>
            <Badge variant="outline" className="text-sm">
              {unassignedGuests.length} Unassigned
            </Badge>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white border-b px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button onClick={handleSmartAssign} className="text-sm">
              Smart Assign
            </Button>
            <Button onClick={handleReset} variant="outline" className="text-sm">
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
            <Button onClick={() => setShowTemplateDialog(true)} variant="outline" className="text-sm">
              Templates
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant={viewMode === "design" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("design")}
            >
              <Eye className="w-4 h-4 mr-1" />
              Design
            </Button>
            <Button 
              variant={viewMode === "preview" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("preview")}
            >
              <EyeOff className="w-4 h-4 mr-1" />
              Preview
            </Button>
            <Button onClick={() => setShowAnalytics(true)} variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-1" />
              Analytics
            </Button>
            <Button onClick={handleExport} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
            <Button onClick={handlePrint} variant="outline" size="sm">
              <Printer className="w-4 h-4 mr-1" />
              Print
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Canvas Toolbar */}
          {venueType === "table-based" && (
            <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50">
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm">
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
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TableIcon className="w-4 h-4" />
                <span>{tables.length} tables</span>
                <span>•</span>
                <Armchair className="w-4 h-4" />
                <span>{chairs.length} chairs</span>
                <span>•</span>
                <Users className="w-4 h-4" />
                <span>{totalAssigned} assigned</span>
              </div>
            </div>
          )}

          {/* Canvas */}
          <div className="flex-1 relative">
            <SeatingCanvas
              ref={canvasRef}
              tables={tables}
              chairs={chairs}
              seats={seats}
              seatSections={[]}
              venueObjects={venueObjects}
              venueType={venueType}
              onUpdateTable={handleUpdateTable}
              onUpdateChair={handleUpdateChair}
              onUpdateSeat={handleUpdateSeat}
              onUpdateVenueObject={handleUpdateVenueObject}
              onSelectTable={setSelectedTable}
              onSelectChair={handleSelectChair}
              onSelectSeat={setSelectedSeat}
              onSelectVenueObject={setSelectedVenueObject}
              onDeleteTable={handleDeleteTable}
              onDeleteChair={handleDeleteChair}
              onDeleteChairGrid={handleDeleteChairGrid}
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
              selectedGridId={selectedGridId}
              onSelectGrid={handleSelectGrid}
              viewMode={viewMode}
              getGridChairs={getGridChairs}
              draggedGuest={draggedGuest}
              onDropGuestToSeat={handleDropGuestToSeat}
            />
          </div>
        </div>

        {/* Right Panel - Guest Management */}
        <div className="w-80 border-l bg-white">
          <GuestAssignmentPanel
            guests={unassignedGuests}
            tables={tables}
            chairs={chairs}
            selectedTable={selectedTable}
            onAssignGuest={handleAssignGuestToSeat}
            onUnassignGuest={(guest, id) => {
              // Find if guest is assigned to a table or chair and unassign
              const table = tables.find(t => 
                Object.values(t.seatAssignments || {}).some(g => g.id === guest.id)
              );
              
              if (table) {
                // Table guest unassignment
                const updatedSeatAssignments = { ...table.seatAssignments };
                Object.keys(updatedSeatAssignments).forEach(seatNumber => {
                  if (updatedSeatAssignments[seatNumber].id === guest.id) {
                    delete updatedSeatAssignments[seatNumber];
                  }
                });
                
                setTables(prev => prev.map(t =>
                  t.id === table.id ? { ...t, seatAssignments: updatedSeatAssignments } : t
                ));
              } else {
                // Chair guest unassignment
                setChairs(prev => prev.map(chair =>
                  chair.guest?.id === guest.id ? { ...chair, guest: undefined } : chair
                ));
              }
              
              setUnassignedGuests(prev => [...prev, guest]);
            }}
            draggedGuest={draggedGuest}
            onSetDraggedGuest={setDraggedGuest}
          />
        </div>
      </div>

      {/* Analytics Panel */}
      {showAnalytics && (
        <SeatingAnalytics
          tables={tables}
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
          existingTables={tables}
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
          seatNumber={1} // This should be set based on which seat was clicked
          seat={selectedSeat || undefined}
          availableGuests={unassignedGuests}
          onAssignGuest={handleAssignGuestToSeat}
          onUnassignSeat={handleUnassignSeat}
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

      {showTemplateDialog && (
        <VenueTemplateDialog
          onSelectTemplate={(template) => {
            setTables(template.tables.map((t, i) => ({ ...t, id: i + 1 })));
            setVenueObjects(template.venueObjects.map((o, i) => ({ ...o, id: i + 1 })));
            setShowTemplateDialog(false);
          }}
          onClose={() => setShowTemplateDialog(false)}
        />
      )}

      {/* Print Dialog */}
      <PrintDialog
        open={showPrintDialog}
        onClose={() => setShowPrintDialog(false)}
        tables={tables}
        chairs={chairs}
        arrangementName="Seating Arrangement"
        onExportDiagram={handleExport}
      />
    </div>
  );
};

export default SeatingModule;
