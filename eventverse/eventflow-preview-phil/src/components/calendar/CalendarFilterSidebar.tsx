import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar as CalendarIcon, Eye, EyeOff, Trash2 } from "lucide-react";
import { ExternalCalendar, CalendarFilters, CalendarItemType, CalendarItemStatus, CalendarItemPriority, ExternalCalendarProvider } from "@/types/calendar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalCalendarConnectionDialog } from "./ExternalCalendarConnectionDialog";

interface CalendarFilterSidebarProps {
  filters: CalendarFilters;
  onFiltersChange: (filters: CalendarFilters) => void;
  events: Array<{ id: string; name: string; color: string }>;
  connectedCalendars: ExternalCalendar[];
  onAddGoogleCalendar: (details: { email: string; accountName: string; selectedColor: string }) => void;
  onAddOutlookCalendar: (details: { email: string; accountName: string; selectedColor: string }) => void;
  onToggleCalendarVisibility: (calendarId: string) => void;
  onRemoveCalendar: (calendarId: string) => void;
}

const typeLabels: Record<CalendarItemType, string> = {
  milestone: 'Milestones',
  payment: 'Payments',
  meeting: 'Meetings',
  task: 'Tasks',
  deadline: 'Deadlines',
  rsvp: 'RSVP',
};

const statusLabels: Record<CalendarItemStatus, string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
  overdue: 'Overdue',
};

const priorityLabels: Record<CalendarItemPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const CalendarFilterSidebar = ({
  filters,
  onFiltersChange,
  events,
  connectedCalendars,
  onAddGoogleCalendar,
  onAddOutlookCalendar,
  onToggleCalendarVisibility,
  onRemoveCalendar,
}: CalendarFilterSidebarProps) => {
  const [showConnectionDialog, setShowConnectionDialog] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ExternalCalendarProvider | null>(null);
  const handleEventToggle = (eventId: string) => {
    const newEventIds = filters.eventIds.includes(eventId)
      ? filters.eventIds.filter(id => id !== eventId)
      : [...filters.eventIds, eventId];
    onFiltersChange({ ...filters, eventIds: newEventIds });
  };

  const handleTypeToggle = (type: CalendarItemType) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    onFiltersChange({ ...filters, types: newTypes });
  };

  const handleStatusToggle = (status: CalendarItemStatus) => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter(s => s !== status)
      : [...filters.statuses, status];
    onFiltersChange({ ...filters, statuses: newStatuses });
  };

  const handlePriorityToggle = (priority: CalendarItemPriority) => {
    const newPriorities = filters.priorities.includes(priority)
      ? filters.priorities.filter(p => p !== priority)
      : [...filters.priorities, priority];
    onFiltersChange({ ...filters, priorities: newPriorities });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      eventIds: [],
      types: [],
      statuses: [],
      priorities: [],
      dateRange: { start: null, end: null },
      externalCalendarIds: [],
      searchQuery: '',
    });
  };

  const hasActiveFilters = filters.eventIds.length > 0 || filters.types.length > 0 || 
    filters.statuses.length > 0 || filters.priorities.length > 0;

  const handleOpenConnectionDialog = (provider: ExternalCalendarProvider) => {
    setSelectedProvider(provider);
    setShowConnectionDialog(true);
  };

  const handleConnect = (
    provider: ExternalCalendarProvider,
    details: { email: string; accountName: string; syncAll: boolean; selectedColor: string }
  ) => {
    if (provider === 'google') {
      onAddGoogleCalendar(details);
    } else {
      onAddOutlookCalendar(details);
    }
  };

  return (
    <div className="w-64 flex-shrink-0 space-y-4">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Calendar Integrations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            onClick={() => handleOpenConnectionDialog('google')} 
            variant="outline" 
            className="w-full justify-start gap-2"
          >
            <div className="w-4 h-4 rounded-full bg-[#4285F4]" />
            Add Google Calendar
          </Button>
          <Button 
            onClick={() => handleOpenConnectionDialog('outlook')} 
            variant="outline" 
            className="w-full justify-start gap-2"
          >
            <div className="w-4 h-4 rounded-full bg-[#0078D4]" />
            Add Outlook Calendar
          </Button>

          {connectedCalendars.length > 0 && (
            <>
              <Separator className="my-4" />
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground uppercase">Connected Calendars</Label>
                <ScrollArea className="max-h-[200px]">
                  <div className="space-y-2">
                    {connectedCalendars.map(calendar => (
                      <div key={calendar.id} className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 group">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => onToggleCalendarVisibility(calendar.id)}
                        >
                          {calendar.visible ? (
                            <Eye className="h-3 w-3" />
                          ) : (
                            <EyeOff className="h-3 w-3 text-muted-foreground" />
                          )}
                        </Button>
                        <div 
                          className="w-3 h-3 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: calendar.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{calendar.accountName}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{calendar.email}</p>
                        </div>
                        <Badge variant="secondary" className="text-[10px] px-1">
                          {calendar.itemCount}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                          onClick={() => onRemoveCalendar(calendar.id)}
                        >
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Events Filter */}
          {events.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Events</Label>
              <div className="space-y-2">
                {events.map(event => (
                  <div key={event.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`event-${event.id}`}
                      checked={filters.eventIds.includes(event.id)}
                      onCheckedChange={() => handleEventToggle(event.id)}
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: event.color }}
                      />
                      <Label 
                        htmlFor={`event-${event.id}`} 
                        className="text-sm cursor-pointer truncate"
                      >
                        {event.name}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Type Filter */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Type</Label>
            <div className="space-y-2">
              {(Object.keys(typeLabels) as CalendarItemType[]).map(type => (
                <div key={type} className="flex items-center gap-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.types.includes(type)}
                    onCheckedChange={() => handleTypeToggle(type)}
                  />
                  <Label htmlFor={`type-${type}`} className="text-sm cursor-pointer">
                    {typeLabels[type]}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Status Filter */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Status</Label>
            <div className="space-y-2">
              {(Object.keys(statusLabels) as CalendarItemStatus[]).map(status => (
                <div key={status} className="flex items-center gap-2">
                  <Checkbox
                    id={`status-${status}`}
                    checked={filters.statuses.includes(status)}
                    onCheckedChange={() => handleStatusToggle(status)}
                  />
                  <Label htmlFor={`status-${status}`} className="text-sm cursor-pointer">
                    {statusLabels[status]}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Priority Filter */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Priority</Label>
            <div className="space-y-2">
              {(Object.keys(priorityLabels) as CalendarItemPriority[]).map(priority => (
                <div key={priority} className="flex items-center gap-2">
                  <Checkbox
                    id={`priority-${priority}`}
                    checked={filters.priorities.includes(priority)}
                    onCheckedChange={() => handlePriorityToggle(priority)}
                  />
                  <Label htmlFor={`priority-${priority}`} className="text-sm cursor-pointer">
                    {priorityLabels[priority]}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <>
              <Separator />
              <Button 
                onClick={handleClearFilters} 
                variant="outline" 
                className="w-full"
              >
                Clear All Filters
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <ExternalCalendarConnectionDialog
        open={showConnectionDialog}
        onOpenChange={setShowConnectionDialog}
        provider={selectedProvider}
        onConnect={handleConnect}
      />
    </div>
  );
};
