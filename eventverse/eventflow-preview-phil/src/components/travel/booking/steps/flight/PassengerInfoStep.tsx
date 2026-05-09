import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Plus, X, User } from "lucide-react";

interface PassengerInfoStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const PassengerInfoStep = ({ onNext, onBack }: PassengerInfoStepProps) => {
  const [passengers, setPassengers] = useState([
    { firstName: '', lastName: '', dateOfBirth: '', gender: '', email: '', phone: '' }
  ]);

  const addPassenger = () => {
    setPassengers([...passengers, { firstName: '', lastName: '', dateOfBirth: '', gender: '', email: '', phone: '' }]);
  };

  const removePassenger = (index: number) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index));
    }
  };

  const updatePassenger = (index: number, field: string, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handleSubmit = () => {
    const categoryData = {
      passengers: passengers.map(p => ({
        ...p,
        dateOfBirth: new Date(p.dateOfBirth),
      })),
      primaryContactEmail: passengers[0].email,
      primaryContactPhone: passengers[0].phone,
    };

    const guestInfo = {
      fullName: `${passengers[0].firstName} ${passengers[0].lastName}`,
      email: passengers[0].email,
      phone: passengers[0].phone,
    };

    onNext({ guestInfo, categoryData });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Passenger Information</h2>
        <p className="text-muted-foreground">Enter details for all passengers as they appear on their ID</p>
      </div>

      {passengers.map((passenger, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <h3 className="font-semibold">Passenger {index + 1} {index === 0 && '(Primary Contact)'}</h3>
            </div>
            {passengers.length > 1 && (
              <Button variant="ghost" size="icon" onClick={() => removePassenger(index)}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name *</Label>
                <Input 
                  value={passenger.firstName}
                  onChange={(e) => updatePassenger(index, 'firstName', e.target.value)}
                  placeholder="John"
                />
              </div>
              <div>
                <Label>Last Name *</Label>
                <Input 
                  value={passenger.lastName}
                  onChange={(e) => updatePassenger(index, 'lastName', e.target.value)}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date of Birth *</Label>
                <Input 
                  type="date"
                  value={passenger.dateOfBirth}
                  onChange={(e) => updatePassenger(index, 'dateOfBirth', e.target.value)}
                />
              </div>
              <div>
                <Label>Gender *</Label>
                <Select onValueChange={(value) => updatePassenger(index, 'gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {index === 0 && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Email *</Label>
                  <Input 
                    type="email"
                    value={passenger.email}
                    onChange={(e) => updatePassenger(index, 'email', e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label>Phone *</Label>
                  <Input 
                    value={passenger.phone}
                    onChange={(e) => updatePassenger(index, 'phone', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}

      <Button variant="outline" onClick={addPassenger} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Another Passenger
      </Button>

      <div className="flex justify-between gap-3">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit} size="lg" className="px-8">
          Continue to Seat Selection
        </Button>
      </div>
    </div>
  );
};

export default PassengerInfoStep;
