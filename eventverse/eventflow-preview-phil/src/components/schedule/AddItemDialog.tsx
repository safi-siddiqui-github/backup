import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, Bell, Type, AlignLeft } from "lucide-react";

interface ScheduleItem {
  id: number;
  title: string;
  type: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  notificationMessage?: string;
  notificationTime?: string;
}

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingItem: ScheduleItem | null;
  newItem: Partial<ScheduleItem>;
  onNewItemChange: (updates: Partial<ScheduleItem>) => void;
  agendaTypes: string[];
  locations: Array<{ name: string }>;
  notificationOptions: Array<{ label: string; value: string }>;
  onSubmit: () => void;
  selectedDate: Date;
}

const AddItemDialog = ({
  open,
  onOpenChange,
  editingItem,
  newItem,
  onNewItemChange,
  agendaTypes,
  locations,
  notificationOptions,
  onSubmit,
  selectedDate,
}: AddItemDialogProps) => {
  const calculateDuration = () => {
    if (newItem.startTime && newItem.endTime) {
      const [startHour, startMin] = newItem.startTime.split(':').map(Number);
      const [endHour, endMin] = newItem.endTime.split(':').map(Number);
      const duration = (endHour * 60 + endMin) - (startHour * 60 + startMin);
      if (duration > 0) {
        const hours = Math.floor(duration / 60);
        const mins = duration % 60;
        return `${hours}h ${mins}m`;
      }
    }
    return null;
  };

  const duration = calculateDuration();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            {editingItem ? "Edit Schedule Item" : "Add Schedule Item"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Required Fields Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Type className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-sm text-primary">Basic Information</h3>
            </div>

            {/* Agenda Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-semibold">
                Agenda Title *
              </Label>
              <Input
                id="title"
                value={newItem.title || ""}
                onChange={(e) => onNewItemChange({ title: e.target.value })}
                placeholder="e.g., Opening Keynote, Coffee Break"
                className="border-primary/30 focus:border-primary"
              />
            </div>

            {/* Agenda Type */}
            <div className="space-y-2">
              <Label htmlFor="type" className="text-sm font-semibold">
                Agenda Type *
              </Label>
              <Select
                value={newItem.type || ""}
                onValueChange={(value) => onNewItemChange({ type: value })}
              >
                <SelectTrigger className="border-primary/30 focus:border-primary">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {agendaTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Time Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime" className="text-sm font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Start Time *
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={newItem.startTime || ""}
                  onChange={(e) => onNewItemChange({ startTime: e.target.value })}
                  className="border-primary/30 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-sm font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  End Time *
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={newItem.endTime || ""}
                  onChange={(e) => onNewItemChange({ endTime: e.target.value })}
                  className="border-primary/30 focus:border-primary"
                />
              </div>
            </div>

            {/* Duration Display */}
            {duration && (
              <div className="p-3 rounded-lg bg-primary/10 dark:bg-primary/20 border border-primary/30">
                <p className="text-sm font-semibold text-primary">
                  Duration: {duration}
                </p>
              </div>
            )}

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Location *
              </Label>
              <Select
                value={newItem.location || ""}
                onValueChange={(value) => onNewItemChange({ location: value })}
              >
                <SelectTrigger className="border-primary/30 focus:border-primary">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc.name} value={loc.name}>
                      {loc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Optional Fields Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <AlignLeft className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold text-sm text-muted-foreground">Additional Details</h3>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold">
                Description
              </Label>
              <Textarea
                id="description"
                value={newItem.description || ""}
                onChange={(e) => onNewItemChange({ description: e.target.value })}
                placeholder="Add any additional details..."
                className="min-h-[80px]"
              />
            </div>
          </div>

          {/* Notification Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold text-sm text-muted-foreground">Notifications</h3>
            </div>

            <div className="p-4 rounded-lg bg-primary/5 border border-border space-y-3">
              <div className="space-y-2">
                <Label htmlFor="notificationTime" className="text-sm font-semibold">
                  Notification Time
                </Label>
                <Select
                  value={newItem.notificationTime || ""}
                  onValueChange={(value) => onNewItemChange({ notificationTime: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select notification time" />
                  </SelectTrigger>
                  <SelectContent>
                    {notificationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notificationMessage" className="text-sm font-semibold">
                  Notification Message
                </Label>
                <Textarea
                  id="notificationMessage"
                  value={newItem.notificationMessage || ""}
                  onChange={(e) => onNewItemChange({ notificationMessage: e.target.value })}
                  placeholder="e.g., Please arrive 10 minutes early"
                  className="min-h-[60px]"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              disabled={!newItem.title || !newItem.type || !newItem.startTime || !newItem.endTime || !newItem.location}
              className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              {editingItem ? "Update Item" : "Add Item"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
