import { useState } from "react";
import { CalendarItem, CalendarItemStatus } from "@/types/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Calendar, Clock, Tag, User, MapPin, CheckCircle2, XCircle, CalendarClock, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCalendarData } from "@/hooks/useCalendarData";
import { toast } from "sonner";

interface CalendarItemDialogProps {
  item: CalendarItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CalendarItemDialog = ({ item, open, onOpenChange }: CalendarItemDialogProps) => {
  const { updateCalendarItem, deleteCalendarItem } = useCalendarData();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState<Date | undefined>(item?.dueDate);
  const [rescheduleTime, setRescheduleTime] = useState(item?.dueTime || '');

  if (!item) return null;

  const handleStatusChange = (status: CalendarItemStatus) => {
    updateCalendarItem(item.id, { status });
    toast.success(`Status updated to ${status}`);
  };

  const handleReschedule = () => {
    if (!rescheduleDate) {
      toast.error('Please select a date');
      return;
    }
    updateCalendarItem(item.id, {
      dueDate: rescheduleDate,
      dueTime: rescheduleTime || undefined,
    });
    toast.success('Event rescheduled successfully');
    setShowReschedule(false);
  };

  const handleDelete = () => {
    deleteCalendarItem(item.id);
    toast.success('Event deleted successfully');
    onOpenChange(false);
    setShowDeleteAlert(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-xl">{item.title}</DialogTitle>
              <DialogDescription className="mt-2">
                {item.description || 'No description provided'}
              </DialogDescription>
            </div>
            <Badge
              variant="outline"
              className={cn(
                "capitalize",
                item.status === 'overdue' && "bg-destructive/10 text-destructive border-destructive/20",
                item.status === 'completed' && "bg-success/10 text-success border-success/20",
                item.status === 'in_progress' && "bg-primary/10 text-primary border-primary/20"
              )}
            >
              {item.status.replace('_', ' ')}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Event Info */}
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.eventColor }}
            />
            <span className="font-medium">{item.eventName}</span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Due Date</p>
                <p className="text-sm text-muted-foreground">
                  {format(item.dueDate, 'MMMM d, yyyy')}
                </p>
              </div>
            </div>

            {item.dueTime && (
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-sm text-muted-foreground">{item.dueTime}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-2">
              <Tag className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Type</p>
                <p className="text-sm text-muted-foreground capitalize">{item.type}</p>
              </div>
            </div>

            {item.priority && (
              <div className="flex items-start gap-2">
                <Tag className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Priority</p>
                  <Badge variant="secondary" className="text-xs capitalize">
                    {item.priority}
                  </Badge>
                </div>
              </div>
            )}

            {item.relatedTo && (
              <div className="flex items-start gap-2 col-span-2">
                <User className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Related To</p>
                  <p className="text-sm text-muted-foreground">{item.relatedTo}</p>
                </div>
              </div>
            )}

            {item.metadata?.location && (
              <div className="flex items-start gap-2 col-span-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{item.metadata.location}</p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-4 border-t">
            {/* Primary Actions */}
            <div className="flex gap-2">
              <Popover open={showReschedule} onOpenChange={setShowReschedule}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex-1">
                    <CalendarClock className="w-4 h-4 mr-2" />
                    Reschedule
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4" align="start">
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block">New Date</Label>
                      <CalendarComponent
                        mode="single"
                        selected={rescheduleDate}
                        onSelect={setRescheduleDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reschedule-time">Time (Optional)</Label>
                      <Input
                        id="reschedule-time"
                        type="time"
                        value={rescheduleTime}
                        onChange={(e) => setRescheduleTime(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowReschedule(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleReschedule} className="flex-1">
                        Save
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                variant="outline"
                onClick={() => setShowDeleteAlert(true)}
                className="flex-1 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>

            {/* Status Actions */}
            <div className="flex gap-2">
              {item.status !== 'completed' && (
                <Button
                  onClick={() => handleStatusChange('completed')}
                  variant="default"
                  className="flex-1"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Mark Complete
                </Button>
              )}
              {item.status === 'completed' && (
                <Button
                  onClick={() => handleStatusChange('pending')}
                  variant="outline"
                  className="flex-1"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reopen
                </Button>
              )}
              <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>"{item.title}"</strong> scheduled for{' '}
              {format(item.dueDate, 'MMMM d, yyyy')}.
              {item.metadata?.externalCalendarId && (
                <span className="block mt-2 text-muted-foreground">
                  Note: This will only remove it from your view. It will remain in your external calendar.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
};
