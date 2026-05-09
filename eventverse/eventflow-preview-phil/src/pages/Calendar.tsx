import { useState, useMemo, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCalendarData } from "@/hooks/useCalendarData";
import { CalendarItemDialog } from "@/components/calendar/CalendarItemDialog";
import { MeetingDialog } from "@/components/calendar/MeetingDialog";
import { TaskDialog } from "@/components/calendar/TaskDialog";
import { CalendarFilterSidebar } from "@/components/calendar/CalendarFilterSidebar";
import { CalendarItem, CalendarItemType, CalendarItemStatus } from "@/types/calendar";
import {
  Calendar as CalendarIcon,
  Users,
  CheckSquare,
  Filter,
  Search,
  Plus,
  List,
  Grid3x3,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TimelineItem } from "@/components/calendar/TimelineItem";
import { DateGroup } from "@/components/calendar/DateGroup";
import { cn } from "@/lib/utils";

const Calendar = () => {
  const { 
    calendarItems, 
    filters, 
    setFilters,
    externalCalendars,
    addGoogleCalendar,
    addOutlookCalendar,
    toggleCalendarVisibility,
    removeExternalCalendar,
  } = useCalendarData();
  const [selectedItem, setSelectedItem] = useState<CalendarItem | null>(null);
  const [showMeetingDialog, setShowMeetingDialog] = useState(false);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [view, setView] = useState<'month' | 'list'>('month');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [scheduleDate, setScheduleDate] = useState<Date | null>(null);
  const todayMarkerRef = useRef<HTMLDivElement>(null);

  const uniqueEvents = useMemo(() => {
    const eventMap = new Map();
    calendarItems.forEach(item => {
      if (item.eventId !== 'external' && !eventMap.has(item.eventId)) {
        eventMap.set(item.eventId, {
          id: item.eventId,
          name: item.eventName,
          color: item.eventColor,
        });
      }
    });
    return Array.from(eventMap.values());
  }, [calendarItems]);

  const monthDays = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const getItemsForDay = (day: Date) => {
    return calendarItems.filter(item => isSameDay(item.dueDate, day));
  };

  const filteredItems = calendarItems.filter(item => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.eventName.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const stats = {
    total: calendarItems.length,
    pending: calendarItems.filter(i => i.status === 'pending').length,
    inProgress: calendarItems.filter(i => i.status === 'in_progress').length,
    completed: calendarItems.filter(i => i.status === 'completed').length,
    overdue: calendarItems.filter(i => i.status === 'overdue').length,
  };

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => 
      a.dueDate.getTime() - b.dueDate.getTime()
    );
  }, [filteredItems]);

  const groupedByDate = useMemo(() => {
    const groups = new Map<string, typeof sortedItems>();
    sortedItems.forEach(item => {
      const dateKey = format(item.dueDate, 'yyyy-MM-dd');
      if (!groups.has(dateKey)) {
        groups.set(dateKey, []);
      }
      groups.get(dateKey)!.push(item);
    });
    return groups;
  }, [sortedItems]);

  const { pastDates, todayDate, upcomingDates } = useMemo(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const past: string[] = [];
    const upcoming: string[] = [];
    let todayKey: string | null = null;

    Array.from(groupedByDate.keys()).forEach(dateKey => {
      if (dateKey < today) past.push(dateKey);
      else if (dateKey === today) todayKey = dateKey;
      else upcoming.push(dateKey);
    });

    return {
      pastDates: past,
      todayDate: todayKey,
      upcomingDates: upcoming,
    };
  }, [groupedByDate]);

  const scrollToToday = () => {
    if (todayMarkerRef.current) {
      todayMarkerRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  };

  useEffect(() => {
    if (view === 'list') {
      setTimeout(scrollToToday, 100);
    }
  }, [view]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Calendar</h1>
              <p className="text-muted-foreground mt-1">
                Manage your events, tasks, and deadlines
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setShowMeetingDialog(true)}>
                  <Users className="w-4 h-4 mr-2" />
                  Meeting
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowTaskDialog(true)}>
                  <CheckSquare className="w-4 h-4 mr-2" />
                  Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-5 gap-4">
            <Card className="p-4">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Items</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-blue-600">{stats.pending}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-amber-600">{stats.inProgress}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
              <div className="text-sm text-muted-foreground">Overdue</div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar Layout */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <CalendarFilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            events={uniqueEvents}
            connectedCalendars={externalCalendars}
            onAddGoogleCalendar={addGoogleCalendar}
            onAddOutlookCalendar={addOutlookCalendar}
            onToggleCalendarVisibility={toggleCalendarVisibility}
            onRemoveCalendar={removeExternalCalendar}
          />

          {/* Main Content Area */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Search and View Toggle */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search calendar items..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <Tabs value={view} onValueChange={(v) => setView(v as 'month' | 'list')} className="w-auto">
                    <TabsList>
                      <TabsTrigger value="month" className="gap-2">
                        <Grid3x3 className="w-4 h-4" />
                        Month
                      </TabsTrigger>
                      <TabsTrigger value="list" className="gap-2">
                        <List className="w-4 h-4" />
                        List
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{filteredItems.length}</span> items found
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Calendar Views */}
            {view === 'month' ? (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">
                    {format(currentMonth, 'MMMM yyyy')}
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentMonth(new Date())}
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-semibold text-sm p-2 text-muted-foreground">
                      {day}
                    </div>
                  ))}
                  
                  {monthDays.map(day => {
                    const dayItems = getItemsForDay(day);
                    const isToday = isSameDay(day, new Date());
                    
                    return (
                      <div
                        key={day.toString()}
                        className={cn(
                          "min-h-[100px] border rounded-lg p-2 hover:bg-accent/50 transition-colors",
                          !isSameMonth(day, currentMonth) && "opacity-50",
                          isToday && "bg-primary/5 border-primary"
                        )}
                      >
                        <div className={cn(
                          "text-sm font-medium mb-1",
                          isToday && "text-primary font-bold"
                        )}>
                          {format(day, 'd')}
                        </div>
                        <div className="space-y-1">
                          {dayItems.slice(0, 3).map(item => (
                            <div
                              key={item.id}
                              onClick={() => setSelectedItem(item)}
                              className="text-xs p-1 rounded cursor-pointer hover:opacity-80 truncate"
                              style={{ backgroundColor: item.eventColor + '20', borderLeft: `3px solid ${item.eventColor}` }}
                            >
                              {item.title}
                            </div>
                          ))}
                          {dayItems.length > 3 && (
                            <div className="text-xs text-muted-foreground pl-1">
                              +{dayItems.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            ) : (
              <div className="relative">
                <ScrollArea className="h-[calc(100vh-400px)]">
                  <div className="relative pr-2">
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

                    {pastDates.length > 0 && (
                      <div className="space-y-6 pb-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-px flex-1 bg-border" />
                          <Badge variant="secondary" className="text-xs">
                            Past Events ({pastDates.reduce((acc, date) => 
                              acc + (groupedByDate.get(date)?.length || 0), 0
                            )})
                          </Badge>
                          <div className="h-px flex-1 bg-border" />
                        </div>

                        {pastDates.map(dateKey => (
                          <DateGroup
                            key={dateKey}
                            dateKey={dateKey}
                            items={groupedByDate.get(dateKey)!}
                            onItemClick={setSelectedItem}
                            isPast={true}
                          />
                        ))}
                      </div>
                    )}

                    <div 
                      ref={todayMarkerRef}
                      className="relative py-6 my-8"
                    >
                      <div className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg z-10" />
                      
                      <div className="flex items-center gap-4">
                        <div className="h-0.5 flex-1 bg-gradient-to-r from-border to-primary" />
                        <Badge className="bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">
                          TODAY - {format(new Date(), 'MMMM d, yyyy')}
                        </Badge>
                        <div className="h-0.5 flex-1 bg-gradient-to-l from-border to-primary" />
                      </div>
                    </div>

                    {todayDate && groupedByDate.get(todayDate) && (
                      <div className="space-y-4 pb-8 ml-8">
                        {groupedByDate.get(todayDate)!.map(item => (
                          <TimelineItem
                            key={item.id}
                            item={item}
                            onClick={setSelectedItem}
                            isToday={true}
                          />
                        ))}
                      </div>
                    )}

                    {upcomingDates.length > 0 && (
                      <div className="space-y-6 pt-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-px flex-1 bg-border" />
                          <Badge variant="secondary" className="text-xs">
                            Upcoming Events ({upcomingDates.reduce((acc, date) => 
                              acc + (groupedByDate.get(date)?.length || 0), 0
                            )})
                          </Badge>
                          <div className="h-px flex-1 bg-border" />
                        </div>

                        {upcomingDates.map(dateKey => (
                          <DateGroup
                            key={dateKey}
                            dateKey={dateKey}
                            items={groupedByDate.get(dateKey)!}
                            onItemClick={setSelectedItem}
                            isPast={false}
                          />
                        ))}
                      </div>
                    )}

                    {filteredItems.length === 0 && (
                      <Card className="p-12 text-center">
                        <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <p className="text-muted-foreground">No calendar items found</p>
                      </Card>
                    )}
                  </div>
                </ScrollArea>

                {view === 'list' && filteredItems.length > 0 && (
                  <Button
                    onClick={scrollToToday}
                    className="fixed bottom-8 right-8 shadow-lg z-50 rounded-full"
                    size="lg"
                  >
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Today
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <CalendarItemDialog
        item={selectedItem}
        open={!!selectedItem}
        onOpenChange={(open) => !open && setSelectedItem(null)}
      />
        <MeetingDialog 
          open={showMeetingDialog} 
          onOpenChange={(open) => {
            setShowMeetingDialog(open);
            if (!open) setScheduleDate(null);
          }}
          availableEvents={uniqueEvents}
          defaultDate={scheduleDate || undefined}
        />
        <TaskDialog 
          open={showTaskDialog} 
          onOpenChange={(open) => {
            setShowTaskDialog(open);
            if (!open) setScheduleDate(null);
          }}
          availableEvents={uniqueEvents}
          defaultDate={scheduleDate || undefined}
        />
    </div>
  );
};

export default Calendar;
