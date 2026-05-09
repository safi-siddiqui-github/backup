import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface WaiverStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  bookingData: any;
}

const WaiverStep = ({ onNext, onBack, bookingData }: WaiverStepProps) => {
  const [waiverSigned, setWaiverSigned] = useState(false);
  const [photoConsent, setPhotoConsent] = useState(false);

  const handleSubmit = () => {
    onNext({ categoryData: { ...bookingData.categoryData, waiverSigned, photoConsent, waiverSignature: 'E-Signature' } });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Waiver & Agreement</h2>
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox checked={waiverSigned} onCheckedChange={(c) => setWaiverSigned(c as boolean)} id="waiver" />
            <label htmlFor="waiver" className="text-sm cursor-pointer">I acknowledge the risks and sign the waiver</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox checked={photoConsent} onCheckedChange={(c) => setPhotoConsent(c as boolean)} id="photo" />
            <label htmlFor="photo" className="text-sm cursor-pointer">I consent to photos/videos</label>
          </div>
        </div>
      </Card>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={handleSubmit} disabled={!waiverSigned}>Continue to Payment</Button>
      </div>
    </div>
  );
};

export default WaiverStep;
