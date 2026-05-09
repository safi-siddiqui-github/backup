import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Shield } from "lucide-react";

interface FlightExtrasStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  bookingData: any;
}

const FlightExtrasStep = ({ onNext, onBack, bookingData }: FlightExtrasStepProps) => {
  const [insurance, setInsurance] = useState(false);
  const insuranceCost = 25;

  const handleSubmit = () => {
    onNext({
      categoryData: {
        ...bookingData.categoryData,
        insurance,
        insuranceCost: insurance ? insuranceCost : 0,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Extras & Add-ons</h2>
        <p className="text-muted-foreground">Enhance your flight experience</p>
      </div>

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <Checkbox 
            checked={insurance} 
            onCheckedChange={(checked) => setInsurance(checked as boolean)}
            id="insurance"
          />
          <div className="flex-1">
            <label htmlFor="insurance" className="font-medium cursor-pointer flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Travel Insurance
              <Badge variant="secondary">${insuranceCost}</Badge>
            </label>
            <p className="text-sm text-muted-foreground mt-2">
              Protect your trip with comprehensive coverage including:
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1 ml-4">
              <li>• Trip cancellation and interruption</li>
              <li>• Baggage loss or delay</li>
              <li>• Medical emergencies</li>
              <li>• 24/7 travel assistance</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-muted/50">
        <div className="flex justify-between items-center">
          <span>Total Extras</span>
          <span className="font-bold">
            ${insurance ? insuranceCost : 0}
          </span>
        </div>
      </Card>

      <div className="flex justify-between gap-3">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit} size="lg" className="px-8">
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default FlightExtrasStep;
