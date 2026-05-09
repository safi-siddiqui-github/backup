import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCalendarData } from "@/hooks/useCalendarData";
import { getEventColor } from "@/utils/calendarColors";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableEvents: Array<{ id: string; name: string; color: string }>;
  defaultDate?: Date;
}

export const MeetingDialog = ({ open, onOpenChange, availableEvents, defaultDate }: MeetingDialogProps) => {
  const { addCalendarItem } = useCalendarData();
  const [date, setDate] = useState<Date | undefined>(defaultDate);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    time: '',
    duration: '60',
    attendees: '',
  });

  const handleSubmit = () => {
    if (!formData.title || !date || !selectedEventId) {
      toast.error('Please fill in all required fields including event');
      return;
    }

    const selectedEvent = availableEvents.find(e => e.id === selectedEventId);

    addCalendarItem({
      eventId: selectedEventId,
      eventName: selectedEvent?.name || '',
      eventColor: selectedEvent?.color || getEventColor(selectedEventId),
      type: 'meeting',
      title: formData.title,
      description: formData.description,
      dueDate: date,
      dueTime: formData.time,
      status: 'pending',
      priority: 'medium',
      relatedTo: formData.attendees,
      metadata: {
        location: formData.location,
        duration: parseInt(formData.duration),
      },
    });

    toast.success('Meeting scheduled successfully');
    onOpenChange(false);
    setFormData({ title: '', description: '', location: '', time: '', duration: '60', attendees: '' });
    setDate(undefined);
    setSelectedEventId('');
  };

  useEffect(() => {
    if (defaultDate) {
      setDate(defaultDate);
    }
  }, [defaultDate]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Schedule Meeting</DialogTitle>
          <DialogDescription>
            Create a new meeting or appointment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Meeting Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Venue Walkthrough"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="event">Related Event *</Label>
            <Select
              value={selectedEventId}
              onValueChange={setSelectedEventId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose an event" />
              </SelectTrigger>
              <SelectContent>
                {availableEvents.map(event => (
                  <SelectItem key={event.id} value={event.id}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: event.color }}
                      />
                      {event.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  className="pl-9"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Main Office"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="60"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="attendees">Attendees</Label>
            <Input
              id="attendees"
              placeholder="e.g., John Smith, Event Planner"
              value={formData.attendees}
              onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Agenda / Notes</Label>
            <Textarea
              id="description"
              placeholder="Meeting agenda and notes..."
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Schedule Meeting</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
