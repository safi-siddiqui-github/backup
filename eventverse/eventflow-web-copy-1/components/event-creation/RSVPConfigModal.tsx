"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { RSVPConfig } from "@/types/rsvp";
import { Calendar, HelpCircle, Settings, Users } from "lucide-react";
import { useState } from "react";

// interface RSVPConfig {
//   expectedGuests: number;
//   maxAttendees: number;
//   rsvpDeadline: string;
//   collectPhone: boolean;
//   collectDietary: boolean;
//   allowPlusOnes: boolean;
//   customQuestion: string;
// }

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: RSVPConfig) => void;
  initialConfig?: Partial<RSVPConfig>;
}

const RSVPConfigModal = ({ isOpen, onClose, onSave, initialConfig }: Props) => {
  const [config, setConfig] = useState<RSVPConfig>({
    expectedGuests: initialConfig?.expectedGuests || 30,
    maxAttendees: initialConfig?.maxAttendees || 60,
    rsvpDeadline: initialConfig?.rsvpDeadline || "",
    collectPhone: initialConfig?.collectPhone || false,
    collectDietary: initialConfig?.collectDietary || true,
    allowPlusOnes: initialConfig?.allowPlusOnes || true,
    customQuestion: initialConfig?.customQuestion || "",
  });

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  const updateConfig = (field: keyof RSVPConfig, value: unknown) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="text-primary h-5 w-5" />
            RSVP Configuration
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expectedGuests">Expected Guests</Label>
              <Input
                id="expectedGuests"
                type="number"
                min="1"
                value={config.expectedGuests}
                onChange={(e) =>
                  updateConfig("expectedGuests", parseInt(e.target.value) || 1)
                }
              />
            </div>
            <div>
              <Label htmlFor="maxAttendees">Max Attendees</Label>
              <Input
                id="maxAttendees"
                type="number"
                min={config.expectedGuests}
                value={config.maxAttendees}
                onChange={(e) =>
                  updateConfig("maxAttendees", parseInt(e.target.value) || 1)
                }
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="rsvpDeadline"
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              RSVP Deadline
            </Label>
            <Input
              id="rsvpDeadline"
              type="date"
              value={config.rsvpDeadline}
              onChange={(e) => updateConfig("rsvpDeadline", e.target.value)}
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="flex items-center gap-2 text-sm font-medium">
              <Settings className="h-4 w-4" />
              Guest Information Collection
            </h4>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="collectPhone"
                className="text-sm"
              >
                Collect phone numbers
              </Label>
              <Switch
                id="collectPhone"
                checked={config.collectPhone}
                onCheckedChange={(checked) =>
                  updateConfig("collectPhone", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="collectDietary"
                className="text-sm"
              >
                Collect dietary restrictions
              </Label>
              <Switch
                id="collectDietary"
                checked={config.collectDietary}
                onCheckedChange={(checked) =>
                  updateConfig("collectDietary", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="allowPlusOnes"
                className="text-sm"
              >
                Allow plus ones
              </Label>
              <Switch
                id="allowPlusOnes"
                checked={config.allowPlusOnes}
                onCheckedChange={(checked) =>
                  updateConfig("allowPlusOnes", checked)
                }
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="customQuestion"
              className="flex items-center gap-2"
            >
              <HelpCircle className="h-4 w-4" />
              Custom Question (Optional)
            </Label>
            <Textarea
              id="customQuestion"
              placeholder="Any custom question for your guests..."
              value={config.customQuestion}
              onChange={(e) => updateConfig("customQuestion", e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>Save RSVP Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RSVPConfigModal;
