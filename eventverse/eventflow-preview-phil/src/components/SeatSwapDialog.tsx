
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRightLeft, Users } from "lucide-react";
import type { Table, Guest } from "@/types/venue";

interface SeatSwapDialogProps {
  table: Table;
  onSwapSeats: (seatNumber1: number, seatNumber2: number) => void;
  onClose: () => void;
}

const SeatSwapDialog = ({ table, onSwapSeats, onClose }: SeatSwapDialogProps) => {
  const [selectedSeat1, setSelectedSeat1] = useState<number | null>(null);
  const [selectedSeat2, setSelectedSeat2] = useState<number | null>(null);

  // Get occupied seats
  const occupiedSeats = Object.entries(table.seatAssignments || {}).map(([seatNumber, guest]) => ({
    seatNumber: parseInt(seatNumber),
    guest
  }));

  const handleSwap = () => {
    if (selectedSeat1 !== null && selectedSeat2 !== null) {
      onSwapSeats(selectedSeat1, selectedSeat2);
      onClose();
    }
  };

  const isSwapValid = selectedSeat1 !== null && selectedSeat2 !== null && selectedSeat1 !== selectedSeat2;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5" />
            Swap Seats - {table.name}
          </DialogTitle>
          <DialogDescription>
            Select two occupied seats to swap their guests
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4" />
              <span className="font-medium">Table Overview</span>
            </div>
            <div className="text-sm space-y-1">
              <div>Total seats: {table.seats}</div>
              <div>Occupied seats: {occupiedSeats.length}</div>
              <div>Available seats: {table.seats - occupiedSeats.length}</div>
            </div>
          </div>

          {occupiedSeats.length < 2 ? (
            <div className="text-center py-4 text-gray-500">
              <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>At least 2 occupied seats are required for swapping</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>First Seat</Label>
                <Select value={selectedSeat1?.toString() || ""} onValueChange={(value) => setSelectedSeat1(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select first seat" />
                  </SelectTrigger>
                  <SelectContent>
                    {occupiedSeats.map(({ seatNumber, guest }) => (
                      <SelectItem key={seatNumber} value={seatNumber.toString()}>
                        <div className="flex items-center justify-between w-full">
                          <span>Seat {seatNumber}</span>
                          <Badge variant="outline" className="ml-2">{guest.name}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-center">
                <ArrowRightLeft className="w-6 h-6 text-gray-400" />
              </div>

              <div className="space-y-2">
                <Label>Second Seat</Label>
                <Select value={selectedSeat2?.toString() || ""} onValueChange={(value) => setSelectedSeat2(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select second seat" />
                  </SelectTrigger>
                  <SelectContent>
                    {occupiedSeats
                      .filter(({ seatNumber }) => seatNumber !== selectedSeat1)
                      .map(({ seatNumber, guest }) => (
                        <SelectItem key={seatNumber} value={seatNumber.toString()}>
                          <div className="flex items-center justify-between w-full">
                            <span>Seat {seatNumber}</span>
                            <Badge variant="outline" className="ml-2">{guest.name}</Badge>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedSeat1 !== null && selectedSeat2 !== null && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-sm">
                    <div className="font-medium mb-1">Preview Swap:</div>
                    <div className="space-y-1">
                      <div>
                        Seat {selectedSeat1}: <span className="font-medium">{occupiedSeats.find(s => s.seatNumber === selectedSeat1)?.guest.name}</span>
                        {" → "}
                        <span className="font-medium">{occupiedSeats.find(s => s.seatNumber === selectedSeat2)?.guest.name}</span>
                      </div>
                      <div>
                        Seat {selectedSeat2}: <span className="font-medium">{occupiedSeats.find(s => s.seatNumber === selectedSeat2)?.guest.name}</span>
                        {" → "}
                        <span className="font-medium">{occupiedSeats.find(s => s.seatNumber === selectedSeat1)?.guest.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSwap} 
            disabled={!isSwapValid}
            className="flex items-center gap-2"
          >
            <ArrowRightLeft className="w-4 h-4" />
            Swap Seats
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SeatSwapDialog;
