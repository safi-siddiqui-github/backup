import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

interface CarAddonsStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  bookingData: any;
}

const CarAddonsStep = ({ onNext, onBack, bookingData }: CarAddonsStepProps) => {
  const [addons, setAddons] = useState({
    gps: false,
    childSeats: 0,
    prepaidFuel: false,
    tollPass: false,
    skiRack: false,
  });

  const [fuelPolicy, setFuelPolicy] = useState('full-to-full');

  const costs = {
    gps: 12,
    childSeat: 10,
    prepaidFuel: 0,
    tollPass: 8,
    skiRack: 15,
  };

  const totalCost = 
    (addons.gps ? costs.gps : 0) +
    (addons.childSeats * costs.childSeat) +
    (addons.tollPass ? costs.tollPass : 0) +
    (addons.skiRack ? costs.skiRack : 0);

  const handleSubmit = () => {
    onNext({
      categoryData: {
        ...bookingData.categoryData,
        addons: {
          ...addons,
          cost: totalCost,
        },
        fuelPolicy,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Add-ons & Extras</h2>
        <p className="text-muted-foreground">Customize your rental experience</p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Equipment & Accessories</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 border rounded-lg">
            <Checkbox 
              checked={addons.gps}
              onCheckedChange={(checked) => setAddons({...addons, gps: checked as boolean})}
              id="gps"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label htmlFor="gps" className="font-medium cursor-pointer">
                  GPS Navigation System
                </label>
                <Badge variant="secondary">${costs.gps}/day</Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Child Safety Seats</p>
              <p className="text-sm text-muted-foreground">${costs.childSeat}/day each</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setAddons({...addons, childSeats: Math.max(0, addons.childSeats - 1)})}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center font-medium">{addons.childSeats}</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setAddons({...addons, childSeats: Math.min(3, addons.childSeats + 1)})}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border rounded-lg">
            <Checkbox 
              checked={addons.tollPass}
              onCheckedChange={(checked) => setAddons({...addons, tollPass: checked as boolean})}
              id="tollPass"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label htmlFor="tollPass" className="font-medium cursor-pointer">
                  Toll Transponder
                </label>
                <Badge variant="secondary">${costs.tollPass}/day</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                E-ZPass, SunPass included
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border rounded-lg">
            <Checkbox 
              checked={addons.skiRack}
              onCheckedChange={(checked) => setAddons({...addons, skiRack: checked as boolean})}
              id="skiRack"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label htmlFor="skiRack" className="font-medium cursor-pointer">
                  Ski/Snowboard Rack
                </label>
                <Badge variant="secondary">${costs.skiRack}/day</Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Fuel Policy</h3>
        <Select value={fuelPolicy} onValueChange={setFuelPolicy}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-to-full">Full to Full (Most Popular)</SelectItem>
            <SelectItem value="prepay">Prepay Fuel</SelectItem>
            <SelectItem value="same-to-same">Same to Same</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground mt-2">
          {fuelPolicy === 'full-to-full' && 'Pick up with full tank, return with full tank'}
          {fuelPolicy === 'prepay' && 'Pre-purchase full tank at discounted rate'}
          {fuelPolicy === 'same-to-same' && 'Return with same fuel level as pickup'}
        </p>
      </Card>

      <Card className="p-4 bg-muted/50">
        <div className="flex justify-between items-center">
          <span>Total Add-ons Cost (per day)</span>
          <span className="font-bold">${totalCost}</span>
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

export default CarAddonsStep;
