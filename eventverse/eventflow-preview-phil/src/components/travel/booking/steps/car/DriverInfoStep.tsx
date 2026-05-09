import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Plus, X, User } from "lucide-react";

interface DriverInfoStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const DriverInfoStep = ({ onNext, onBack }: DriverInfoStepProps) => {
  const [primaryDriver, setPrimaryDriver] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    licenseNumber: '',
    licenseState: '',
    licenseExpiry: '',
  });

  const [additionalDrivers, setAdditionalDrivers] = useState<any[]>([]);

  const addDriver = () => {
    setAdditionalDrivers([...additionalDrivers, {
      fullName: '',
      dateOfBirth: '',
      licenseNumber: '',
      licenseState: '',
      licenseExpiry: '',
    }]);
  };

  const removeDriver = (index: number) => {
    setAdditionalDrivers(additionalDrivers.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const guestInfo = {
      fullName: primaryDriver.fullName,
      email: primaryDriver.email,
      phone: primaryDriver.phone,
    };

    const categoryData = {
      primaryDriver: {
        ...primaryDriver,
        dateOfBirth: new Date(primaryDriver.dateOfBirth),
        licenseExpiry: new Date(primaryDriver.licenseExpiry),
      },
      additionalDrivers: additionalDrivers.map(d => ({
        ...d,
        dateOfBirth: new Date(d.dateOfBirth),
        licenseExpiry: new Date(d.licenseExpiry),
      })),
    };

    onNext({ guestInfo, categoryData });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Driver Information</h2>
        <p className="text-muted-foreground">Provide driver's license details</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5" />
          <h3 className="font-semibold">Primary Driver</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Full Name *</Label>
            <Input 
              value={primaryDriver.fullName}
              onChange={(e) => setPrimaryDriver({...primaryDriver, fullName: e.target.value})}
              placeholder="As shown on license"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Email *</Label>
              <Input 
                type="email"
                value={primaryDriver.email}
                onChange={(e) => setPrimaryDriver({...primaryDriver, email: e.target.value})}
              />
            </div>
            <div>
              <Label>Phone *</Label>
              <Input 
                value={primaryDriver.phone}
                onChange={(e) => setPrimaryDriver({...primaryDriver, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Date of Birth *</Label>
              <Input 
                type="date"
                value={primaryDriver.dateOfBirth}
                onChange={(e) => setPrimaryDriver({...primaryDriver, dateOfBirth: e.target.value})}
              />
            </div>
            <div>
              <Label>License Number *</Label>
              <Input 
                value={primaryDriver.licenseNumber}
                onChange={(e) => setPrimaryDriver({...primaryDriver, licenseNumber: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>License State *</Label>
              <Input 
                value={primaryDriver.licenseState}
                onChange={(e) => setPrimaryDriver({...primaryDriver, licenseState: e.target.value})}
                placeholder="NY"
              />
            </div>
            <div>
              <Label>License Expiry *</Label>
              <Input 
                type="date"
                value={primaryDriver.licenseExpiry}
                onChange={(e) => setPrimaryDriver({...primaryDriver, licenseExpiry: e.target.value})}
              />
            </div>
          </div>
        </div>
      </Card>

      {additionalDrivers.map((driver, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Additional Driver {index + 1}</h3>
            <Button variant="ghost" size="icon" onClick={() => removeDriver(index)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          {/* Similar fields as primary driver */}
        </Card>
      ))}

      <Button variant="outline" onClick={addDriver} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Additional Driver (+$15/day)
      </Button>

      <div className="flex justify-between gap-3">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit} size="lg" className="px-8">
          Continue to Insurance
        </Button>
      </div>
    </div>
  );
};

export default DriverInfoStep;
