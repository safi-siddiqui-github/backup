import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface ReservationDetailsStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const ReservationDetailsStep = ({ onNext, onBack }: ReservationDetailsStepProps) => {
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [seatingArea, setSeatingArea] = useState('indoor');

  const handleSubmit = () => {
    onNext({
      categoryData: {
        reservationDate: new Date(reservationDate),
        reservationTime,
        partySize,
        seatingPreference: { area: seatingArea, type: 'table', special: [] },
      },
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Reservation Details</h2>
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Date</Label>
              <Input type="date" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} />
            </div>
            <div>
              <Label>Time</Label>
              <Input type="time" value={reservationTime} onChange={(e) => setReservationTime(e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Party Size</Label>
            <Input type="number" min="1" value={partySize} onChange={(e) => setPartySize(Number(e.target.value))} />
          </div>
          <div>
            <Label>Seating Preference</Label>
            <Select value={seatingArea} onValueChange={setSeatingArea}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="indoor">Indoor</SelectItem>
                <SelectItem value="outdoor">Outdoor</SelectItem>
                <SelectItem value="patio">Patio</SelectItem>
                <SelectItem value="bar">Bar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={handleSubmit}>Continue</Button>
      </div>
    </div>
  );
};

export default ReservationDetailsStep;
