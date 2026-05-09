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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCalendarData } from "@/hooks/useCalendarData";
import { getEventColor } from "@/utils/calendarColors";
import { toast } from "sonner";
import { CalendarItemPriority } from "@/types/calendar";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableEvents: Array<{ id: string; name: string; color: string }>;
  defaultDate?: Date;
}

export const TaskDialog = ({ open, onOpenChange, availableEvents, defaultDate }: TaskDialogProps) => {
  const { addCalendarItem } = useCalendarData();
  const [date, setDate] = useState<Date | undefined>(defaultDate);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as CalendarItemPriority,
    assignedTo: '',
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
      type: 'task',
      title: formData.title,
      description: formData.description,
      dueDate: date,
      status: 'pending',
      priority: formData.priority,
      relatedTo: formData.assignedTo,
    });

    toast.success('Task created successfully');
    onOpenChange(false);
    setFormData({ title: '', description: '', priority: 'medium', assignedTo: '' });
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
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Add a new task to your calendar
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Finalize Guest List"
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
              <Label>Due Date *</Label>
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
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: CalendarItemPriority) => 
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignedTo">Assigned To</Label>
            <Input
              id="assignedTo"
              placeholder="e.g., Event Team"
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Task details and notes..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
