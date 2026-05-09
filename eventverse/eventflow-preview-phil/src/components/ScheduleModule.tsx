import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import { format, addDays } from "date-fns";
import TimelineDaySelector from "@/components/schedule/TimelineDaySelector";
import TimelineAgendaItem from "@/components/schedule/TimelineAgendaItem";
import AgendaEmptyState from "@/components/schedule/AgendaEmptyState";
import AddItemDialog from "@/components/schedule/AddItemDialog";

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

interface EventProps {
  eventName: string;
  startDate: Date | string;
  endDate?: Date | string;
  locations: Array<{ name: string; address?: string }>;
}

interface ScheduleModuleProps {
  event: EventProps;
  onBack: () => void;
}

const agendaTypes = [
  "Registration", "Welcome", "Keynote", "Session", "Workshop", 
  "Break", "Lunch", "Dinner", "Networking", "Reception", 
  "Entertainment", "Closing", "Check-out", "Transportation", "Panel"
];

const notificationOptions = [
  { value: "5", label: "5 minutes before" },
  { value: "10", label: "10 minutes before" },
  { value: "15", label: "15 minutes before" },
  { value: "30", label: "30 minutes before" },
  { value: "60", label: "1 hour before" },
  { value: "120", label: "2 hours before" },
  { value: "240", label: "4 hours before" },
  { value: "1440", label: "1 day before" }
];

const ScheduleModule = ({ event, onBack }: ScheduleModuleProps) => {
  // Ensure dates are proper Date objects
  const eventStartDate = typeof event.startDate === 'string' ? new Date(event.startDate) : event.startDate;
  const eventEndDate = event.endDate 
    ? (typeof event.endDate === 'string' ? new Date(event.endDate) : event.endDate)
    : eventStartDate;

  // Generate all event dates
  const getEventDates = () => {
    const dates: Date[] = [];
    let currentDate = new Date(eventStartDate);
    const endDate = new Date(eventEndDate);
    
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate = addDays(currentDate, 1);
    }
    return dates;
  };

  const eventDates = getEventDates();
  const [selectedDate, setSelectedDate] = useState<Date>(eventStartDate);
  const [showAddAgenda, setShowAddAgenda] = useState(false);
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    {
      id: 1,
      title: "Registration & Welcome",
      type: "Registration",
      date: eventStartDate,
      startTime: "09:00",
      endTime: "09:30",
      location: event.locations[0]?.name || "Main Hall",
      description: "Guest registration and welcome reception",
      notificationMessage: "Welcome! Please proceed to registration.",
      notificationTime: "5"
    },
    {
      id: 2,
      title: "Opening Keynote",
      type: "Keynote",
      date: eventStartDate,
      startTime: "10:00",
      endTime: "11:00",
      location: event.locations[0]?.name || "Main Hall",
      description: "Opening ceremony and keynote presentation",
      notificationMessage: "Keynote starting in 5 minutes. Please take your seats.",
      notificationTime: "5"
    }
  ]);

  const [newItem, setNewItem] = useState<Partial<ScheduleItem>>({
    title: "",
    type: "",
    date: selectedDate,
    startTime: "",
    endTime: "",
    location: "",
    description: "",
    notificationMessage: "",
    notificationTime: "5"
  });

  const handleAddAgendaItem = () => {
    const itemToAdd: ScheduleItem = {
      ...newItem as ScheduleItem,
      id: Date.now(),
      date: newItem.date || selectedDate
    };
    setScheduleItems([...scheduleItems, itemToAdd]);
    resetForm();
    setShowAddAgenda(false);
  };

  const handleEditItem = (item: ScheduleItem) => {
    setEditingItem(item);
    setNewItem(item);
    setShowAddAgenda(true);
  };

  const handleUpdateItem = () => {
    if (editingItem) {
      setScheduleItems(scheduleItems.map(item => 
        item.id === editingItem.id ? { ...newItem as ScheduleItem, id: editingItem.id } : item
      ));
      setEditingItem(null);
      resetForm();
      setShowAddAgenda(false);
    }
  };

  const handleDeleteItem = (itemId: number) => {
    setScheduleItems(scheduleItems.filter(item => item.id !== itemId));
  };

  const resetForm = () => {
    setNewItem({
      title: "",
      type: "",
      date: selectedDate,
      startTime: "",
      endTime: "",
      location: "",
      description: "",
      notificationMessage: "",
      notificationTime: "5"
    });
  };

  const getItemsForDate = (date: Date) => {
    return scheduleItems.filter(item => {
      const itemDate = item.date instanceof Date ? item.date : new Date(item.date);
      return format(itemDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
    }).sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const getDayStats = (date: Date) => {
    const dayItems = getItemsForDate(date);
    let totalDuration = 0;
    
    dayItems.forEach(item => {
      const [startHour, startMin] = item.startTime.split(':').map(Number);
      const [endHour, endMin] = item.endTime.split(':').map(Number);
      const duration = (endHour * 60 + endMin) - (startHour * 60 + startMin);
      totalDuration += duration;
    });
    
    return {
      totalItems: dayItems.length,
      totalDuration
    };
  };

  const todayItems = getItemsForDate(selectedDate);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-6 h-6 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Event Schedule</h1>
                <p className="text-sm text-muted-foreground">{event.eventName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Timeline Day Selector */}
        <TimelineDaySelector
          eventDates={eventDates}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          getItemsForDate={getItemsForDate}
          getDayStats={getDayStats}
        />

        {/* Daily Agenda Section */}
        <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
            <div>
              <h2 className="text-2xl font-bold mb-1 text-foreground">
                {format(selectedDate, "EEEE, MMMM d")}
              </h2>
              <p className="text-muted-foreground">
                {todayItems.length} {todayItems.length === 1 ? 'item' : 'items'} scheduled
              </p>
            </div>
            <Button
              onClick={() => setShowAddAgenda(true)}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Schedule Item
            </Button>
          </div>

          {/* Timeline or Empty State */}
          {todayItems.length === 0 ? (
            <AgendaEmptyState onAddItem={() => setShowAddAgenda(true)} />
          ) : (
            <div className="space-y-1">
              {todayItems.map((item, index) => (
                <TimelineAgendaItem
                  key={item.id}
                  item={item}
                  isFirst={index === 0}
                  isLast={index === todayItems.length - 1}
                  onEdit={handleEditItem}
                  onDelete={handleDeleteItem}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <AddItemDialog
        open={showAddAgenda}
        onOpenChange={(open) => {
          setShowAddAgenda(open);
          if (!open) {
            setEditingItem(null);
            resetForm();
          }
        }}
        editingItem={editingItem}
        newItem={newItem}
        onNewItemChange={(updates) => setNewItem({ ...newItem, ...updates })}
        agendaTypes={agendaTypes}
        locations={event.locations}
        notificationOptions={notificationOptions}
        onSubmit={editingItem ? handleUpdateItem : handleAddAgendaItem}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default ScheduleModule;
