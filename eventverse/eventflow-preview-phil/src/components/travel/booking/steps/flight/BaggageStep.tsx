import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

interface BaggageStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  bookingData: any;
}

const BaggageStep = ({ onNext, onBack, bookingData }: BaggageStepProps) => {
  const passengers = bookingData.categoryData?.passengers || [];
  const [baggage, setBaggage] = useState(
    passengers.map(() => ({ carryOn: true, checkedBags: 0, specialItems: [], totalFee: 0 }))
  );

  const updateBaggage = (index: number, field: string, value: any) => {
    const updated = [...baggage];
    updated[index] = { ...updated[index], [field]: value };
    
    // Calculate fees: $35 for first checked bag, $45 for second
    if (field === 'checkedBags') {
      updated[index].totalFee = value >= 1 ? 35 : 0;
      if (value >= 2) updated[index].totalFee += 45;
    }
    
    setBaggage(updated);
  };

  const handleSubmit = () => {
    const updatedPassengers = passengers.map((p: any, i: number) => ({
      ...p,
      baggage: baggage[i],
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
        <h2 className="text-2xl font-bold mb-2">Baggage Selection</h2>
        <p className="text-muted-foreground">Add checked bags for each passenger</p>
      </div>

      {passengers.map((passenger: any, index: number) => (
        <Card key={index} className="p-6">
          <h3 className="font-semibold mb-4">
            {passenger.firstName} {passenger.lastName}
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Carry-on Bag</p>
                <p className="text-sm text-muted-foreground">Included</p>
              </div>
              <Badge variant="secondary">Free</Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Checked Bags</p>
                <p className="text-sm text-muted-foreground">$35 for 1st, $45 for 2nd</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateBaggage(index, 'checkedBags', Math.max(0, baggage[index].checkedBags - 1))}
                  disabled={baggage[index].checkedBags === 0}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center font-medium">{baggage[index].checkedBags}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateBaggage(index, 'checkedBags', Math.min(2, baggage[index].checkedBags + 1))}
                  disabled={baggage[index].checkedBags === 2}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {baggage[index].totalFee > 0 && (
              <div className="text-right">
                <Badge>Total: ${baggage[index].totalFee}</Badge>
              </div>
            )}
          </div>
        </Card>
      ))}

      <Card className="p-4 bg-muted/50">
        <div className="flex justify-between items-center">
          <span>Total Baggage Fees</span>
          <span className="font-bold">
            ${baggage.reduce((sum, b) => sum + b.totalFee, 0)}
          </span>
        </div>
      </Card>

      <div className="flex justify-between gap-3">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit} size="lg" className="px-8">
          Continue to Extras
        </Button>
      </div>
    </div>
  );
};

export default BaggageStep;
