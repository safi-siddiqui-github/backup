import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface DateTimeStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const DateTimeStep = ({ onNext, onBack }: DateTimeStepProps) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [partySize, setPartySize] = useState(1);

  const handleSubmit = () => {
    onNext({
      categoryData: {
        selectedDate: new Date(selectedDate),
        selectedTime,
        partySize,
      },
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Select Date & Time</h2>
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Date</Label>
            <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
          </div>
          <div>
            <Label>Time</Label>
            <Input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
          </div>
          <div>
            <Label>Number of Participants</Label>
            <Input type="number" min="1" value={partySize} onChange={(e) => setPartySize(Number(e.target.value))} />
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

export default DateTimeStep;
