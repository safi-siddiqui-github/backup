import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface DiningGuestInfoStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  bookingData: any;
}

const DiningGuestInfoStep = ({ onNext, onBack, bookingData }: DiningGuestInfoStepProps) => {
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const handleSubmit = () => {
    onNext({
      guestInfo: { fullName: guestName, email: guestEmail, phone: guestPhone },
      categoryData: { ...bookingData.categoryData, guestName, guestEmail, guestPhone, specialRequests, dietaryRestrictions: [], highChairNeeded: false, wheelchairAccessible: false },
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Guest Information</h2>
      <Card className="p-6">
        <div className="space-y-4">
          <div><Label>Name</Label><Input value={guestName} onChange={(e) => setGuestName(e.target.value)} /></div>
          <div><Label>Email</Label><Input type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} /></div>
          <div><Label>Phone</Label><Input value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} /></div>
          <div><Label>Special Requests</Label><Textarea value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} /></div>
        </div>
      </Card>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={handleSubmit}>Continue to Payment</Button>
      </div>
    </div>
  );
};

export default DiningGuestInfoStep;
