import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface ParticipantInfoStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  bookingData: any;
}

const ParticipantInfoStep = ({ onNext, onBack, bookingData }: ParticipantInfoStepProps) => {
  const [participants, setParticipants] = useState([{ fullName: '', age: 0, email: '', phone: '' }]);
  const [emergencyContact, setEmergencyContact] = useState({ name: '', phone: '' });

  const handleSubmit = () => {
    onNext({
      guestInfo: { fullName: participants[0].fullName, email: participants[0].email, phone: participants[0].phone },
      categoryData: { ...bookingData.categoryData, participants, emergencyContact },
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Participant Information</h2>
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input value={participants[0].fullName} onChange={(e) => setParticipants([{...participants[0], fullName: e.target.value}])} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Age</Label>
              <Input type="number" value={participants[0].age} onChange={(e) => setParticipants([{...participants[0], age: Number(e.target.value)}])} />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" value={participants[0].email} onChange={(e) => setParticipants([{...participants[0], email: e.target.value}])} />
            </div>
            <div>
              <Label>Phone</Label>
              <Input value={participants[0].phone} onChange={(e) => setParticipants([{...participants[0], phone: e.target.value}])} />
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Emergency Contact</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Name</Label>
            <Input value={emergencyContact.name} onChange={(e) => setEmergencyContact({...emergencyContact, name: e.target.value})} />
          </div>
          <div>
            <Label>Phone</Label>
            <Input value={emergencyContact.phone} onChange={(e) => setEmergencyContact({...emergencyContact, phone: e.target.value})} />
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

export default ParticipantInfoStep;
