import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface SeatSelectionStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  bookingData: any;
}

const SeatSelectionStep = ({ onNext, onBack, bookingData }: SeatSelectionStepProps) => {
  const passengers = bookingData.categoryData?.passengers || [];
  const [selections, setSelections] = useState(
    passengers.map(() => ({ preference: 'window', extraLegroom: false, fee: 0 }))
  );

  const updateSelection = (index: number, field: string, value: any) => {
    const updated = [...selections];
    updated[index] = { ...updated[index], [field]: value };
    if (field === 'extraLegroom') {
      updated[index].fee = value ? 35 : 0;
    }
    setSelections(updated);
  };

  const handleSubmit = () => {
    const updatedPassengers = passengers.map((p: any, i: number) => ({
      ...p,
      seat: {
        seatNumber: `${Math.floor(Math.random() * 30) + 1}${['A', 'B', 'C', 'D', 'E', 'F'][Math.floor(Math.random() * 6)]}`,
        ...selections[i],
      },
    }));

    onNext({
      categoryData: {
        ...bookingData.categoryData,
        passengers: updatedPassengers,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Select Seats</h2>
        <p className="text-muted-foreground">Choose seat preferences for each passenger</p>
      </div>

      {passengers.map((passenger: any, index: number) => (
        <Card key={index} className="p-6">
          <h3 className="font-semibold mb-4">
            {passenger.firstName} {passenger.lastName}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Seat Preference</label>
              <div className="flex gap-2">
                {['window', 'aisle', 'middle'].map((type) => (
                  <Button
                    key={type}
                    type="button"
                    variant={selections[index].preference === type ? 'default' : 'outline'}
                    onClick={() => updateSelection(index, 'preference', type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Extra Legroom</p>
                <p className="text-sm text-muted-foreground">More space and comfort</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">+$35</Badge>
                <Button
                  type="button"
                  variant={selections[index].extraLegroom ? 'default' : 'outline'}
                  onClick={() => updateSelection(index, 'extraLegroom', !selections[index].extraLegroom)}
                >
                  {selections[index].extraLegroom ? 'Selected' : 'Add'}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}

      <Card className="p-4 bg-muted/50">
        <div className="flex justify-between items-center">
          <span>Total Seat Fees</span>
          <span className="font-bold">
            ${selections.reduce((sum, s) => sum + s.fee, 0)}
          </span>
        </div>
      </Card>

      <div className="flex justify-between gap-3">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit} size="lg" className="px-8">
          Continue to Baggage
        </Button>
      </div>
    </div>
  );
};

export default SeatSelectionStep;
