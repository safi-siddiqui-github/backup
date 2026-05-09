import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, X } from "lucide-react";
import { useState } from "react";

const hotelGuestSchema = z.object({
  primaryGuest: z.string().min(2, "Primary guest name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  earlyCheckIn: z.boolean().optional(),
  lateCheckout: z.boolean().optional(),
  bedPreference: z.string().optional(),
  floorPreference: z.string().optional(),
  loyaltyNumber: z.string().optional(),
  specialRequests: z.string().optional(),
});

type HotelGuestForm = z.infer<typeof hotelGuestSchema>;

interface HotelGuestInfoStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const HotelGuestInfoStep = ({ onNext, onBack }: HotelGuestInfoStepProps) => {
  const [additionalGuests, setAdditionalGuests] = useState<string[]>([]);
  
  const { register, handleSubmit, formState: { errors } } = useForm<HotelGuestForm>({
    resolver: zodResolver(hotelGuestSchema),
  });

  const addGuest = () => {
    setAdditionalGuests([...additionalGuests, '']);
  };

  const removeGuest = (index: number) => {
    setAdditionalGuests(additionalGuests.filter((_, i) => i !== index));
  };

  const updateGuest = (index: number, value: string) => {
    const updated = [...additionalGuests];
    updated[index] = value;
    setAdditionalGuests(updated);
  };

  const onSubmit = (data: HotelGuestForm) => {
    const guestInfo = {
      fullName: data.primaryGuest,
      email: data.email,
      phone: data.phone,
    };

    const categoryData = {
      primaryGuest: data.primaryGuest,
      additionalGuests: additionalGuests.filter(g => g.trim() !== ''),
      specialRequests: {
        earlyCheckIn: data.earlyCheckIn,
        lateCheckout: data.lateCheckout,
        bedPreference: data.bedPreference,
        floorPreference: data.floorPreference,
        accessibility: [],
        other: data.specialRequests,
      },
      loyaltyNumber: data.loyaltyNumber,
    };

    onNext({ guestInfo, categoryData });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Guest Information</h2>
        <p className="text-muted-foreground">Please provide your details for the hotel reservation</p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Primary Guest</h3>
        <div className="space-y-4">
          <div>
            <Label>Full Name *</Label>
            <Input {...register('primaryGuest')} placeholder="John Doe" />
            {errors.primaryGuest && (
              <p className="text-xs text-destructive mt-1">{errors.primaryGuest.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Email *</Label>
              <Input {...register('email')} type="email" placeholder="john@example.com" />
              {errors.email && (
                <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Label>Phone *</Label>
              <Input {...register('phone')} placeholder="(555) 123-4567" />
              {errors.phone && (
                <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label>Loyalty Program Number (Optional)</Label>
            <Input {...register('loyaltyNumber')} placeholder="Enter your loyalty number" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Additional Guests</h3>
          <Button type="button" variant="outline" size="sm" onClick={addGuest}>
            <Plus className="w-4 h-4 mr-1" />
            Add Guest
          </Button>
        </div>
        <div className="space-y-3">
          {additionalGuests.map((guest, index) => (
            <div key={index} className="flex gap-2">
              <Input 
                value={guest}
                onChange={(e) => updateGuest(index, e.target.value)}
                placeholder="Guest name" 
              />
              <Button type="button" variant="ghost" size="icon" onClick={() => removeGuest(index)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {additionalGuests.length === 0 && (
            <p className="text-sm text-muted-foreground">No additional guests added</p>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Room Preferences</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Bed Preference</Label>
              <Select onValueChange={(value) => register('bedPreference').onChange({ target: { value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="king">King Bed</SelectItem>
                  <SelectItem value="queen">Queen Bed</SelectItem>
                  <SelectItem value="two-queens">Two Queen Beds</SelectItem>
                  <SelectItem value="twin">Twin Beds</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Floor Preference</Label>
              <Select onValueChange={(value) => register('floorPreference').onChange({ target: { value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Floor</SelectItem>
                  <SelectItem value="low">Low Floor</SelectItem>
                  <SelectItem value="any">No Preference</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Special Requests</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox {...register('earlyCheckIn')} id="earlyCheckIn" />
                <label htmlFor="earlyCheckIn" className="text-sm cursor-pointer">
                  Early Check-in (if available)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox {...register('lateCheckout')} id="lateCheckout" />
                <label htmlFor="lateCheckout" className="text-sm cursor-pointer">
                  Late Checkout (if available)
                </label>
              </div>
            </div>
          </div>

          <div>
            <Label>Additional Notes</Label>
            <Textarea 
              {...register('specialRequests')}
              placeholder="Any other special requests or requirements..."
              rows={3}
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-between gap-3">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" size="lg" className="px-8">
          Continue to Payment
        </Button>
      </div>
    </form>
  );
};

export default HotelGuestInfoStep;
