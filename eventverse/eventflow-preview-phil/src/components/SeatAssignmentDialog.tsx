
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Users, UserX } from "lucide-react";
import type { Guest, Table } from "@/types/venue";
import type { Seat } from "@/types/venue";

interface SeatAssignmentDialogProps {
  table?: Table;
  seatNumber?: number;
  seat?: Seat;
  availableGuests: Guest[];
  onAssignGuest: (guest: Guest, seatNumber: number) => void;
  onUnassignSeat: (seatNumber: number) => void;
  onClose: () => void;
}

const SeatAssignmentDialog = ({
  table,
  seatNumber,
  seat,
  availableGuests,
  onAssignGuest,
  onUnassignSeat,
  onClose
}: SeatAssignmentDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGuests = availableGuests.filter(guest =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isTableSeat = !!(table && seatNumber);
  const isIndividualSeat = !!seat;
  
  const currentGuest = isTableSeat 
    ? table?.seatAssignments?.[seatNumber!]
    : seat?.guest;

  const seatLabel = isTableSeat 
    ? `${table?.name} - Seat ${seatNumber}`
    : seat 
    ? `Section ${seat.sectionId} - Row ${seat.row}, Seat ${seat.seatNumber}`
    : "Unknown Seat";

  const handleAssign = (guest: Guest) => {
    const effectiveSeatNumber = isTableSeat ? seatNumber! : seat!.id;
    onAssignGuest(guest, effectiveSeatNumber);
    onClose();
  };

  const handleUnassign = () => {
    const effectiveSeatNumber = isTableSeat ? seatNumber! : seat!.id;
    onUnassignSeat(effectiveSeatNumber);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Guest to {seatLabel}</DialogTitle>
          <DialogDescription>
            Select a guest to assign to this seat or manage current assignment.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current Assignment */}
          {currentGuest ? (
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-purple-800">{currentGuest.name}</div>
                  <div className="text-sm text-purple-600">
                    {currentGuest.group}
                    {currentGuest.dietary && currentGuest.dietary !== "None" && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        {currentGuest.dietary}
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleUnassign}
                  className="text-red-600 hover:text-red-700"
                >
                  <UserX className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-center text-gray-500">
              <Users className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              No guest assigned
            </div>
          )}

          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search guests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Available Guests */}
          <div className="max-h-60 overflow-y-auto space-y-2">
            {filteredGuests.length > 0 ? (
              filteredGuests.map(guest => (
                <div
                  key={guest.id}
                  className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleAssign(guest)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{guest.name}</div>
                      <div className="text-sm text-gray-600">
                        {guest.group}
                        {guest.dietary && guest.dietary !== "None" && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            {guest.dietary}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Assign
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-6">
                {searchTerm ? "No guests match your search" : "No available guests"}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SeatAssignmentDialog;
