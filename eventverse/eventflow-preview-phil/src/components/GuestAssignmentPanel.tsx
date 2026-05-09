
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Users, ArrowRight, ArrowLeft, Armchair, Filter } from "lucide-react";
import { GuestAvatar } from "./seating/GuestAvatar";
import { GuestProfileDialog } from "./seating/GuestProfileDialog";
import type { Table, Guest, Chair } from "@/types/venue";

interface GuestAssignmentPanelProps {
  guests: Guest[];
  tables: Table[];
  chairs?: Chair[];
  selectedTable: Table | null;
  onAssignGuest: (guest: Guest, tableOrChairId: number, seatNumber?: number) => void;
  onUnassignGuest: (guest: Guest, tableOrChairId: number) => void;
  draggedGuest: Guest | null;
  onSetDraggedGuest: (guest: Guest | null) => void;
}

const GuestAssignmentPanel = ({ 
  guests, 
  tables, 
  chairs = [],
  selectedTable, 
  onAssignGuest, 
  onUnassignGuest,
  draggedGuest,
  onSetDraggedGuest
}: GuestAssignmentPanelProps) => {
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string>("all");

  // Extract unique groups from all guests
  const availableGroups = useMemo(() => {
    const groupSet = new Set<string>();
    guests.forEach(g => g.group && groupSet.add(g.group));
    tables.forEach(table => {
      Object.values(table.seatAssignments || {}).forEach(guest => {
        guest.group && groupSet.add(guest.group);
      });
    });
    chairs.forEach(chair => {
      if (chair.guest?.group) groupSet.add(chair.guest.group);
    });
    return ["all", ...Array.from(groupSet).sort()];
  }, [guests, tables, chairs]);

  // Filter function
  const filterGuestsByGroup = (guestList: Guest[]) => {
    if (selectedGroup === "all") return guestList;
    return guestList.filter(g => g.group === selectedGroup);
  };

  const handleDragStart = (e: React.DragEvent, guest: Guest) => {
    console.log('🎯 Drag started:', guest.name);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify(guest));
    onSetDraggedGuest(guest);
  };

  const handleDragEnd = () => {
    console.log('🎯 Drag ended');
    onSetDraggedGuest(null);
  };

  const handleAssignToTable = (guest: Guest, tableId: number) => {
    console.log('Attempting to assign guest:', guest.name, 'to table:', tableId);
    
    const table = tables.find(t => t.id === tableId);
    if (!table) {
      console.error('Table not found:', tableId);
      return;
    }
    
    const assignedSeats = Object.keys(table.seatAssignments || {}).length;
    console.log('Current assigned seats:', assignedSeats, 'Total seats:', table.seats);
    
    if (assignedSeats >= table.seats) {
      console.warn('Table is full');
      return; // Table is full
    }
    
    // Find the next available seat number
    const nextSeatNumber = findNextAvailableSeat(table);
    console.log('Next available seat:', nextSeatNumber);
    
    if (nextSeatNumber) {
      console.log('Calling onAssignGuest with:', guest, tableId, nextSeatNumber);
      onAssignGuest(guest, tableId, nextSeatNumber);
    }
  };

  const handleAssignToChair = (guest: Guest, chairId: number) => {
    console.log('Attempting to assign guest:', guest.name, 'to chair:', chairId);
    onAssignGuest(guest, chairId);
  };

  const findNextAvailableSeat = (table: Table): number | null => {
    for (let i = 1; i <= table.seats; i++) {
      if (!table.seatAssignments?.[i]) {
        return i;
      }
    }
    return null;
  };

  const getDietaryBadgeColor = (dietary: string): string => {
    switch (dietary) {
      case "Vegetarian": return "bg-green-100 text-green-800";
      case "Vegan": return "bg-green-200 text-green-900";
      case "Gluten-free": return "bg-yellow-100 text-yellow-800";
      case "Halal": return "bg-blue-100 text-blue-800";
      case "Kosher": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getGroupColor = (group: string): string => {
    const colors: Record<string, string> = {
      "Family": "bg-pink-100 text-pink-800",
      "Friends": "bg-blue-100 text-blue-800",
      "Colleagues": "bg-purple-100 text-purple-800",
      "Plus Ones": "bg-orange-100 text-orange-800",
    };
    return colors[group] || "bg-gray-100 text-gray-600";
  };

  const handleAvatarClick = (guest: Guest, assignment?: { tableName?: string; seatNumber?: number; chairName?: string }) => {
    setSelectedGuest(guest);
    setShowProfileDialog(true);
  };

  return (
    <div className="flex-1 flex flex-col">
      <Tabs defaultValue="unassigned" className="flex-1 flex flex-col">
        <TabsList className="m-4 mb-2">
          <TabsTrigger value="unassigned" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Unassigned ({filterGuestsByGroup(guests).length})
          </TabsTrigger>
          <TabsTrigger value="tables" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Tables & Chairs
          </TabsTrigger>
        </TabsList>

        {/* Group Filter */}
        <div className="px-4 pb-2 border-b bg-muted/30">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger className="h-8 w-[180px] bg-background">
                <SelectValue placeholder="Filter by group" />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                <SelectItem value="all">All Groups</SelectItem>
                {availableGroups.filter(g => g !== "all").map(group => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedGroup !== "all" && (
              <Badge variant="secondary" className="text-xs">
                {filterGuestsByGroup(guests).length} guests
              </Badge>
            )}
          </div>
        </div>

        <TabsContent value="unassigned" className="flex-1 flex flex-col mt-0">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-3">
              {filterGuestsByGroup(guests).map((guest) => (
                <div
                  key={guest.id}
                  className="bg-white border rounded-lg p-3 cursor-move hover:shadow-md transition-shadow"
                  draggable
                  onDragStart={(e) => handleDragStart(e, guest)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <GuestAvatar
                      name={guest.name}
                      initials={guest.initials}
                      avatarColor={guest.avatarColor}
                      size="md"
                      showStatus
                      status="unassigned"
                      onClick={() => handleAvatarClick(guest)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900">{guest.name}</div>
                      <div className="text-sm text-gray-600 truncate">{guest.email}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    <Badge variant="outline" className={getGroupColor(guest.group)}>
                      {guest.group}
                    </Badge>
                    {guest.dietary !== "None" && (
                      <Badge variant="outline" className={getDietaryBadgeColor(guest.dietary)}>
                        {guest.dietary}
                      </Badge>
                    )}
                  </div>

                  {/* Quick Assign Buttons */}
                  <div className="flex gap-1 flex-wrap">
                    {/* Table assignments */}
                    {tables
                      .filter(table => {
                        const assignedCount = Object.keys(table.seatAssignments || {}).length;
                        return assignedCount < table.seats;
                      })
                      .slice(0, 2)
                      .map(table => {
                        const assignedCount = Object.keys(table.seatAssignments || {}).length;
                        const availableSeats = table.seats - assignedCount;
                        return (
                          <Button
                            key={table.id}
                            size="sm"
                            variant="outline"
                            className="text-xs h-6"
                            onClick={() => {
                              console.log('Quick assign button clicked for table:', table.id);
                              handleAssignToTable(guest, table.id);
                            }}
                            disabled={availableSeats === 0}
                          >
                            <ArrowRight className="w-3 h-3 mr-1" />
                            {table.name} ({assignedCount}/{table.seats})
                          </Button>
                        );
                      })}
                    
                    {/* Chair assignments */}
                    {chairs
                      .filter(chair => !chair.guest)
                      .slice(0, 1)
                      .map(chair => (
                        <Button
                          key={chair.id}
                          size="sm"
                          variant="outline"
                          className="text-xs h-6 text-orange-600"
                          onClick={() => handleAssignToChair(guest, chair.id)}
                        >
                          <Armchair className="w-3 h-3 mr-1" />
                          {chair.name}
                        </Button>
                      ))}
                  </div>
                </div>
              ))}

              {filterGuestsByGroup(guests).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>{selectedGroup === "all" ? "All guests have been assigned!" : `No guests in ${selectedGroup} group`}</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="tables" className="flex-1 flex flex-col mt-0">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {/* Tables */}
              {tables.map((table) => {
                const assignedGuests = Object.entries(table.seatAssignments || {});
                const filteredAssignedGuests = selectedGroup === "all" 
                  ? assignedGuests 
                  : assignedGuests.filter(([_, guest]) => guest.group === selectedGroup);
                const assignedCount = assignedGuests.length;
                
                // Hide table if no matching guests when filtering
                if (selectedGroup !== "all" && filteredAssignedGuests.length === 0) {
                  return null;
                }
                
                return (
                  <div
                    key={table.id}
                    className={`bg-white border rounded-lg overflow-hidden ${
                      selectedTable?.id === table.id ? 'ring-2 ring-purple-500' : ''
                    }`}
                  >
                    {/* Table Header */}
                    <div className="p-3 border-b bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{table.name}</div>
                          <div className="text-sm text-gray-600">
                            {assignedCount}/{table.seats} seats
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {assignedCount === table.seats && (
                            <Badge variant="default" className="bg-green-500">Full</Badge>
                          )}
                          {assignedCount > table.seats && (
                            <Badge variant="destructive">Over Capacity</Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Assigned Guests */}
                    <div className="p-3">
                      {filteredAssignedGuests.length > 0 ? (
                        <div className="space-y-2">
                          {filteredAssignedGuests.map(([seatNumber, guest]) => (
                            <div
                              key={`${table.id}-${seatNumber}`}
                              className="flex items-center gap-3 p-2 bg-gray-50 rounded"
                            >
                              <GuestAvatar
                                name={guest.name}
                                initials={guest.initials}
                                avatarColor={guest.avatarColor}
                                size="md"
                                showStatus
                                status="assigned"
                                onClick={() => handleAvatarClick(guest, { tableName: table.name, seatNumber: parseInt(seatNumber) })}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium">
                                  Seat {seatNumber}: {guest.name}
                                </div>
                                <div className="flex gap-1 mt-1">
                                  <Badge variant="outline" className={`text-xs ${getGroupColor(guest.group)}`}>
                                    {guest.group}
                                  </Badge>
                                  {guest.dietary !== "None" && (
                                    <Badge variant="outline" className={`text-xs ${getDietaryBadgeColor(guest.dietary)}`}>
                                      {guest.dietary}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-xs h-6"
                                onClick={() => onUnassignGuest(guest, table.id)}
                              >
                                <ArrowLeft className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500 text-sm">
                          No guests assigned
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Individual Chairs */}
              {chairs.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Armchair className="w-4 h-4" />
                    Individual Chairs ({chairs.length})
                  </h4>
                  <div className="space-y-2">
                    {chairs.map((chair) => (
                      <div
                        key={chair.id}
                        className="bg-white border rounded-lg p-3"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-sm">{chair.name}</div>
                            {chair.targetGroup && (
                              <Badge variant="outline" className="text-xs mt-1">
                                {chair.targetGroup}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {chair.guest ? (
                              <Badge variant="default" className="bg-orange-500">Occupied</Badge>
                            ) : (
                              <Badge variant="outline">Available</Badge>
                            )}
                          </div>
                        </div>

                        {chair.guest && (
                          <div className="mt-2 p-2 bg-orange-50 rounded border-l-2 border-orange-500">
                            <div className="flex items-center gap-3">
                              <GuestAvatar
                                name={chair.guest.name}
                                initials={chair.guest.initials}
                                avatarColor={chair.guest.avatarColor}
                                size="md"
                                showStatus
                                status="assigned"
                                onClick={() => handleAvatarClick(chair.guest!, { chairName: chair.name })}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium">{chair.guest.name}</div>
                                <div className="flex gap-1 mt-1">
                                  <Badge variant="outline" className={`text-xs ${getGroupColor(chair.guest.group)}`}>
                                    {chair.guest.group}
                                  </Badge>
                                  {chair.guest.dietary !== "None" && (
                                    <Badge variant="outline" className={`text-xs ${getDietaryBadgeColor(chair.guest.dietary)}`}>
                                      {chair.guest.dietary}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-xs h-6"
                                onClick={() => onUnassignGuest(chair.guest!, chair.id)}
                              >
                                <ArrowLeft className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* Guest Profile Dialog */}
      {selectedGuest && (
        <GuestProfileDialog
          guest={selectedGuest}
          isOpen={showProfileDialog}
          onClose={() => {
            setShowProfileDialog(false);
            setSelectedGuest(null);
          }}
          tableAssignment={
            tables.find(t =>
              Object.values(t.seatAssignments || {}).some(g => g.id === selectedGuest.id)
            )
              ? (() => {
                  const table = tables.find(t =>
                    Object.values(t.seatAssignments || {}).some(g => g.id === selectedGuest.id)
                  );
                  const seatNumber = Object.entries(table?.seatAssignments || {}).find(
                    ([_, g]) => g.id === selectedGuest.id
                  )?.[0];
                  return table && seatNumber
                    ? { tableName: table.name, seatNumber: parseInt(seatNumber) }
                    : undefined;
                })()
              : undefined
          }
          chairAssignment={
            chairs.find(c => c.guest?.id === selectedGuest.id)
              ? { chairName: chairs.find(c => c.guest?.id === selectedGuest.id)!.name }
              : undefined
          }
        />
      )}
    </div>
  );
};

export default GuestAssignmentPanel;
