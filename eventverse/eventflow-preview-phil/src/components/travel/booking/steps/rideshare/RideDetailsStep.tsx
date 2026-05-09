import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface RideDetailsStepProps {
  onNext: (data: any) => void;
  bookingData: any;
  item: any;
}

const RideDetailsStep = ({ onNext, item }: RideDetailsStepProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    onNext({
      guestInfo: { fullName: name, email: '', phone },
      categoryData: { passengerName: name, passengerPhone: phone },
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Ride Details</h2>
      <Card className="p-6">
        <div className="space-y-4">
          <div><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><Label>Phone</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
        </div>
      </Card>
      <Button onClick={handleSubmit} className="w-full">Continue to Payment</Button>
    </div>
  );
};

export default RideDetailsStep;
