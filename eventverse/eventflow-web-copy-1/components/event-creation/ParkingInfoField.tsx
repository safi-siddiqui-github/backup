"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ParkingInfoData } from "@/types/parking";
import { Car, DollarSign, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

// interface ParkingInfoData {
//   hasParkingInfo: boolean;
//   parkingType?: "free" | "paid" | "valet" | "street" | "garage" | "lot";
//   parkingCost?: number;
//   parkingDetails?: string;
//   parkingMapUrl?: string;
//   validationAvailable?: boolean;
//   reservationRequired?: boolean;
//   alternativeOptions?: string;
// }

interface Props {
  data?: ParkingInfoData;
  onUpdate: (data: ParkingInfoData) => void;
}

const ParkingInfoField = ({
  data = { hasParkingInfo: false },
  onUpdate,
}: Props) => {
  const [localData, setLocalData] = useState<ParkingInfoData>(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleUpdate = (updates: Partial<ParkingInfoData>) => {
    const newData = { ...localData, ...updates };
    setLocalData(newData);
    onUpdate(newData);
  };

  const parkingTypes: {
    value: ParkingInfoData["parkingType"];
    label?: string;
    icon?: string;
  }[] = [
    { value: "free", label: "Free Parking", icon: "🅿️" },
    { value: "paid", label: "Paid Parking", icon: "💳" },
    { value: "valet", label: "Valet Service", icon: "🚗" },
    { value: "street", label: "Street Parking", icon: "🛣️" },
    { value: "garage", label: "Parking Garage", icon: "🏢" },
    { value: "lot", label: "Parking Lot", icon: "🚙" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Car className="text-muted-foreground h-5 w-5" />
        <Label
          htmlFor="parking-info"
          className="text-base font-medium"
        >
          Parking Information
        </Label>
        <Switch
          id="parking-info"
          checked={localData.hasParkingInfo}
          onCheckedChange={(checked) =>
            handleUpdate({ hasParkingInfo: checked })
          }
        />
      </div>

      {localData.hasParkingInfo && (
        <Card className="bg-muted/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Parking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Parking Type Selection */}
            <div>
              <Label className="mb-3 block text-sm font-medium">
                Parking Type
              </Label>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {parkingTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    className={`rounded-lg border p-3 text-left transition-colors ${
                      localData.parkingType === type.value
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted border-border"
                    }`}
                    onClick={() => handleUpdate({ parkingType: type.value })}
                  >
                    <div className="mb-1 text-lg">{type.icon}</div>
                    <div className="text-sm font-medium">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Parking Cost */}
            {(localData.parkingType === "paid" ||
              localData.parkingType === "valet") && (
              <div>
                <Label className="text-sm font-medium">Parking Cost</Label>
                <div className="mt-1 flex items-center gap-2">
                  <DollarSign className="text-muted-foreground h-4 w-4" />
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={localData.parkingCost || ""}
                    onChange={(e) =>
                      handleUpdate({
                        parkingCost: parseFloat(e.target.value) || undefined,
                      })
                    }
                    placeholder="0.00"
                    className="w-24"
                  />
                  <Select defaultValue="hourly">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">per hour</SelectItem>
                      <SelectItem value="daily">per day</SelectItem>
                      <SelectItem value="flat">flat rate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Additional Options */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="validation-available"
                  checked={localData.validationAvailable || false}
                  onCheckedChange={(checked) =>
                    handleUpdate({ validationAvailable: checked })
                  }
                />
                <Label
                  htmlFor="validation-available"
                  className="text-sm"
                >
                  Parking validation available
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="reservation-required"
                  checked={localData.reservationRequired || false}
                  onCheckedChange={(checked) =>
                    handleUpdate({ reservationRequired: checked })
                  }
                />
                <Label
                  htmlFor="reservation-required"
                  className="text-sm"
                >
                  Parking reservation required
                </Label>
              </div>
            </div>

            {/* Detailed Instructions */}
            <div>
              <Label className="text-sm font-medium">
                Parking Details & Directions
              </Label>
              <Textarea
                value={localData.parkingDetails || ""}
                onChange={(e) =>
                  handleUpdate({ parkingDetails: e.target.value })
                }
                placeholder="e.g., 'Enter through the main gate and follow signs to visitor parking. Validation is available at the event check-in.'"
                className="mt-1"
                rows={3}
              />
            </div>

            {/* Map/Directions URL */}
            <div>
              <Label className="text-sm font-medium">
                Map or Directions Link (Optional)
              </Label>
              <div className="mt-1 flex gap-2">
                <MapPin className="text-muted-foreground mt-2 h-4 w-4" />
                <Input
                  type="url"
                  value={localData.parkingMapUrl || ""}
                  onChange={(e) =>
                    handleUpdate({ parkingMapUrl: e.target.value })
                  }
                  placeholder="https://maps.google.com/..."
                  className="flex-1"
                />
              </div>
              <p className="text-muted-foreground mt-1 text-xs">
                Link to a map or detailed parking directions
              </p>
            </div>

            {/* Alternative Transportation */}
            <div>
              <Label className="text-sm font-medium">
                Alternative Transportation (Optional)
              </Label>
              <Textarea
                value={localData.alternativeOptions || ""}
                onChange={(e) =>
                  handleUpdate({ alternativeOptions: e.target.value })
                }
                placeholder="e.g., 'Public transit: Take Metro Line 2 to Main St. Uber/Lyft pickup zone available at side entrance.'"
                className="mt-1"
                rows={2}
              />
            </div>

            {/* Preview */}
            {localData.parkingType && (
              <div className="bg-primary/5 border-primary/20 mt-4 rounded-lg border p-3">
                <h4 className="text-primary mb-2 text-sm font-medium">
                  Parking Info Preview
                </h4>
                <div className="text-muted-foreground space-y-1 text-sm">
                  <p>
                    •{" "}
                    {
                      parkingTypes.find(
                        (t) => t.value === localData.parkingType,
                      )?.label
                    }
                  </p>
                  {localData.parkingCost && (
                    <p>• ${localData.parkingCost} cost</p>
                  )}
                  {localData.validationAvailable && (
                    <p>• Validation available</p>
                  )}
                  {localData.reservationRequired && (
                    <p>• Reservation required</p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ParkingInfoField;
