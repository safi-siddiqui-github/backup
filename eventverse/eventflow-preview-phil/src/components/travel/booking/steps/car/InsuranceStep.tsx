import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Shield } from "lucide-react";

interface InsuranceStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  bookingData: any;
}

const InsuranceStep = ({ onNext, onBack, bookingData }: InsuranceStepProps) => {
  const [insurance, setInsurance] = useState({
    cdw: false,
    lis: false,
    pai: false,
    pec: false,
    roadsideAssistance: false,
  });

  const costs = {
    cdw: 25,
    lis: 15,
    pai: 10,
    pec: 8,
    roadsideAssistance: 7,
  };

  const totalCost = Object.entries(insurance).reduce((sum, [key, value]) => {
    return sum + (value ? costs[key as keyof typeof costs] : 0);
  }, 0);

  const handleSubmit = () => {
    onNext({
      categoryData: {
        ...bookingData.categoryData,
        insurance: {
          ...insurance,
          cost: totalCost,
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Insurance & Protection</h2>
        <p className="text-muted-foreground">Protect yourself and the vehicle</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 border rounded-lg">
            <Checkbox 
              checked={insurance.cdw}
              onCheckedChange={(checked) => setInsurance({...insurance, cdw: checked as boolean})}
              id="cdw"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label htmlFor="cdw" className="font-medium cursor-pointer">
                  Collision Damage Waiver (CDW)
                </label>
                <Badge variant="secondary">${costs.cdw}/day</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Covers damage to the rental vehicle
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border rounded-lg">
            <Checkbox 
              checked={insurance.lis}
              onCheckedChange={(checked) => setInsurance({...insurance, lis: checked as boolean})}
              id="lis"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label htmlFor="lis" className="font-medium cursor-pointer">
                  Liability Insurance Supplement (LIS)
                </label>
                <Badge variant="secondary">${costs.lis}/day</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Additional liability protection
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border rounded-lg">
            <Checkbox 
              checked={insurance.pai}
              onCheckedChange={(checked) => setInsurance({...insurance, pai: checked as boolean})}
              id="pai"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label htmlFor="pai" className="font-medium cursor-pointer">
                  Personal Accident Insurance (PAI)
                </label>
                <Badge variant="secondary">${costs.pai}/day</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Medical coverage for driver and passengers
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border rounded-lg">
            <Checkbox 
              checked={insurance.pec}
              onCheckedChange={(checked) => setInsurance({...insurance, pec: checked as boolean})}
              id="pec"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label htmlFor="pec" className="font-medium cursor-pointer">
                  Personal Effects Coverage (PEC)
                </label>
                <Badge variant="secondary">${costs.pec}/day</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Protects personal belongings in the vehicle
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border rounded-lg">
            <Checkbox 
              checked={insurance.roadsideAssistance}
              onCheckedChange={(checked) => setInsurance({...insurance, roadsideAssistance: checked as boolean})}
              id="roadside"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label htmlFor="roadside" className="font-medium cursor-pointer">
                  24/7 Roadside Assistance
                </label>
                <Badge variant="secondary">${costs.roadsideAssistance}/day</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Emergency towing, flat tire, lockout service
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-muted/50">
        <div className="flex justify-between items-center">
          <span>Total Insurance Cost (per day)</span>
          <span className="font-bold">${totalCost}</span>
        </div>
      </Card>

      <div className="flex justify-between gap-3">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit} size="lg" className="px-8">
          Continue to Add-ons
        </Button>
      </div>
    </div>
  );
};

export default InsuranceStep;
