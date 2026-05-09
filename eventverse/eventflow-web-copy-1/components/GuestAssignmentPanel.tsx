"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Chair, Guest, Table } from "@/types/venue";
import { Armchair, ArrowLeft, ArrowRight, User, Users } from "lucide-react";
import { useState } from "react";

interface GuestAssignmentPanelProps {
  guests: Guest[];
  tables: Table[];
  chairs?: Chair[];
  selectedTable: Table | null;
  onAssignGuest: (
    guest: Guest,
    tableOrChairId: number,
    seatNumber?: number,
  ) => void;
  onUnassignGuest: (guest: Guest, tableOrChairId: number) => void;
}

const GuestAssignmentPanel = ({
  guests,
  tables,
  chairs = [],
  selectedTable,
  onAssignGuest,
  onUnassignGuest,
}: GuestAssignmentPanelProps) => {
  const [draggedGuest, setDraggedGuest] = useState<Guest | null>(null);

  const handleDragStart = (guest: Guest) => {
    setDraggedGuest(guest);
  };

  const handleAssignToTable = (guest: Guest, tableId: number) => {
    console.log(
      "Attempting to assign guest:",
      guest.name,
      "to table:",
      tableId,
    );

    const table = tables.find((t) => t.id === tableId);
    if (!table) {
      console.error("Table not found:", tableId);
      return;
    }

    const assignedSeats = Object.keys(table.seatAssignments || {}).length;
    console.log(
      "Current assigned seats:",
      assignedSeats,
      "Total seats:",
      table.seats,
    );

    if (assignedSeats >= table.seats) {
      console.warn("Table is full");
      return; // Table is full
    }

    // Find the next available seat number
    const nextSeatNumber = findNextAvailableSeat(table);
    console.log("Next available seat:", nextSeatNumber);

    if (nextSeatNumber) {
      console.log(
        "Calling onAssignGuest with:",
        guest,
        tableId,
        nextSeatNumber,
      );
      onAssignGuest(guest, tableId, nextSeatNumber);
    }
  };

  const handleAssignToChair = (guest: Guest, chairId: number) => {
    console.log(
      "Attempting to assign guest:",
      guest.name,
      "to chair:",
      chairId,
    );
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
      case "Vegetarian":
        return "bg-green-100 text-green-800";
      case "Vegan":
        return "bg-green-200 text-green-900";
      case "Gluten-free":
        return "bg-yellow-100 text-yellow-800";
      case "Halal":
        return "bg-blue-100 text-blue-800";
      case "Kosher":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getGroupColor = (group: string): string => {
    const colors: Record<string, string> = {
      Family: "bg-pink-100 text-pink-800",
      Friends: "bg-blue-100 text-blue-800",
      Colleagues: "bg-purple-100 text-purple-800",
      "Plus Ones": "bg-orange-100 text-orange-800",
    };
    return colors[group] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="flex flex-1 flex-col">
      <Tabs
        defaultValue="unassigned"
        className="flex flex-1 flex-col"
      >
        <TabsList className="m-4 mb-2">
          <TabsTrigger
            value="unassigned"
            className="flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            Unassigned ({guests.length})
          </TabsTrigger>
          <TabsTrigger
            value="tables"
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Tables & Chairs
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="unassigned"
          className="mt-0 flex flex-1 flex-col"
        >
          <ScrollArea className="flex-1">
            <div className="space-y-3 p-4">
              {guests.map((guest) => (
                <div
                  key={guest.id}
                  className="cursor-move rounded-lg border bg-white p-3 transition-shadow hover:shadow-md"
                  draggable
                  onDragStart={() => handleDragStart(guest)}
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <div className="font-medium text-gray-900">
                        {guest.name}
                      </div>
                      <div className="text-sm text-gray-600">{guest.email}</div>
                    </div>
                  </div>

                  <div className="mb-3 flex flex-wrap gap-1">
                    <Badge
                      variant="outline"
                      className={getGroupColor(guest.group)}
                    >
                      {guest.group}
                    </Badge>
                    {guest.dietary !== "None" && (
                      <Badge
                        variant="outline"
                        className={getDietaryBadgeColor(guest.dietary)}
                      >
                        {guest.dietary}
                      </Badge>
                    )}
                  </div>

                  {/* Quick Assign Buttons */}
                  <div className="flex flex-wrap gap-1">
                    {/* Table assignments */}
                    {tables
                      .filter((table) => {
                        const assignedCount = Object.keys(
                          table.seatAssignments || {},
                        ).length;
                        return assignedCount < table.seats;
                      })
                      .slice(0, 2)
                      .map((table) => {
                        const assignedCount = Object.keys(
                          table.seatAssignments || {},
                        ).length;
                        const availableSeats = table.seats - assignedCount;
                        return (
                          <Button
                            key={table.id}
                            size="sm"
                            variant="outline"
                            className="h-6 text-xs"
                            onClick={() => {
                              console.log(
                                "Quick assign button clicked for table:",
                                table.id,
                              );
                              handleAssignToTable(guest, table.id);
                            }}
                            disabled={availableSeats === 0}
                          >
                            <ArrowRight className="mr-1 h-3 w-3" />
                            {table.name} ({assignedCount}/{table.seats})
                          </Button>
                        );
                      })}

                    {/* Chair assignments */}
                    {chairs
                      .filter((chair) => !chair.guest)
                      .slice(0, 1)
                      .map((chair) => (
                        <Button
                          key={chair.id}
                          size="sm"
                          variant="outline"
                          className="h-6 text-xs text-orange-600"
                          onClick={() => handleAssignToChair(guest, chair.id)}
                        >
                          <Armchair className="mr-1 h-3 w-3" />
                          {chair.name}
                        </Button>
                      ))}
                  </div>
                </div>
              ))}

              {guests.length === 0 && (
                <div className="py-8 text-center text-gray-500">
                  <User className="mx-auto mb-3 h-12 w-12 opacity-50" />
                  <p>All guests have been assigned!</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent
          value="tables"
          className="mt-0 flex flex-1 flex-col"
        >
          <ScrollArea className="flex-1">
            <div className="space-y-4 p-4">
              {/* Tables */}
              {tables.map((table) => {
                const assignedGuests = Object.entries(
                  table.seatAssignments || {},
                );
                const assignedCount = assignedGuests.length;

                return (
                  <div
                    key={table.id}
                    className={`overflow-hidden rounded-lg border bg-white ${
                      selectedTable?.id === table.id
                        ? "ring-2 ring-purple-500"
                        : ""
                    }`}
                  >
                    {/* Table Header */}
                    <div className="border-b bg-gray-50 p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{table.name}</div>
                          <div className="text-sm text-gray-600">
                            {assignedCount}/{table.seats} seats
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {assignedCount === table.seats && (
                            <Badge
                              variant="default"
                              className="bg-green-500"
                            >
                              Full
                            </Badge>
                          )}
                          {assignedCount > table.seats && (
                            <Badge variant="destructive">Over Capacity</Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Assigned Guests */}
                    <div className="p-3">
                      {assignedCount > 0 ? (
                        <div className="space-y-2">
                          {assignedGuests.map(([seatNumber, guest]) => (
                            <div
                              key={`${table.id}-${seatNumber}`}
                              className="flex items-center justify-between rounded bg-gray-50 p-2"
                            >
                              <div>
                                <div className="text-sm font-medium">
                                  Seat {seatNumber}: {guest.name}
                                </div>
                                <div className="mt-1 flex gap-1">
                                  <Badge
                                    variant="outline"
                                    className={`text-xs ${getGroupColor(guest.group)}`}
                                  >
                                    {guest.group}
                                  </Badge>
                                  {guest.dietary !== "None" && (
                                    <Badge
                                      variant="outline"
                                      className={`text-xs ${getDietaryBadgeColor(guest.dietary)}`}
                                    >
                                      {guest.dietary}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 text-xs"
                                onClick={() => onUnassignGuest(guest, table.id)}
                              >
                                <ArrowLeft className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-4 text-center text-sm text-gray-500">
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
                  <h4 className="mb-3 flex items-center gap-2 font-medium text-gray-700">
                    <Armchair className="h-4 w-4" />
                    Individual Chairs ({chairs.length})
                  </h4>
                  <div className="space-y-2">
                    {chairs.map((chair) => (
                      <div
                        key={chair.id}
                        className="rounded-lg border bg-white p-3"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium">
                              {chair.name}
                            </div>
                            {chair.targetGroup && (
                              <Badge
                                variant="outline"
                                className="mt-1 text-xs"
                              >
                                {chair.targetGroup}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {chair.guest ? (
                              <Badge
                                variant="default"
                                className="bg-orange-500"
                              >
                                Occupied
                              </Badge>
                            ) : (
                              <Badge variant="outline">Available</Badge>
                            )}
                          </div>
                        </div>

                        {chair.guest && (
                          <div className="mt-2 rounded border-l-2 border-orange-500 bg-orange-50 p-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium">
                                  {chair.guest.name}
                                </div>
                                <div className="mt-1 flex gap-1">
                                  <Badge
                                    variant="outline"
                                    className={`text-xs ${getGroupColor(chair.guest.group)}`}
                                  >
                                    {chair.guest.group}
                                  </Badge>
                                  {chair.guest.dietary !== "None" && (
                                    <Badge
                                      variant="outline"
                                      className={`text-xs ${getDietaryBadgeColor(chair.guest.dietary)}`}
                                    >
                                      {chair.guest.dietary}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 text-xs"
                                onClick={() =>
                                  onUnassignGuest(chair.guest!, chair.id)
                                }
                              >
                                <ArrowLeft className="h-3 w-3" />
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
    </div>
  );
};

export default GuestAssignmentPanel;
