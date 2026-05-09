import { useState, useEffect, useMemo } from 'react';
import { CalendarItem, CalendarItemType, CalendarItemStatus, CalendarItemPriority, ExternalCalendar, CalendarFilters } from '@/types/calendar';
import { mockCalendarItems, mockExternalCalendars, mockExternalCalendarItems } from '@/data/mockCalendarData';
import { isBefore, startOfDay } from 'date-fns';
import { toast } from 'sonner';

export const useCalendarData = () => {
  const [calendarItems, setCalendarItems] = useState<CalendarItem[]>(mockCalendarItems);
  const [externalCalendars, setExternalCalendars] = useState<ExternalCalendar[]>(mockExternalCalendars);
  const [externalCalendarItems, setExternalCalendarItems] = useState<CalendarItem[]>(mockExternalCalendarItems);
  const [filters, setFilters] = useState<CalendarFilters>({
    eventIds: [],
    types: [],
    statuses: [],
    priorities: [],
    dateRange: { start: null, end: null },
    externalCalendarIds: [],
    searchQuery: '',
  });

  // Auto-update overdue items
  useEffect(() => {
    const updateOverdueItems = () => {
      const now = startOfDay(new Date());
      setCalendarItems(prev => prev.map(item => {
        if (item.status !== 'completed' && isBefore(startOfDay(item.dueDate), now)) {
          return { ...item, status: 'overdue' as CalendarItemStatus };
        }
        return item;
      }));
    };

    updateOverdueItems();
    const interval = setInterval(updateOverdueItems, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Combine internal and external calendar items
  const allCalendarItems = useMemo(() => {
    const visibleExternalCalendars = externalCalendars
      .filter(cal => cal.visible)
      .map(cal => cal.id);
    
    const visibleExternalItems = externalCalendarItems.filter(item => 
      visibleExternalCalendars.includes(item.metadata?.externalCalendarId || '')
    );
    
    return [...calendarItems, ...visibleExternalItems];
  }, [calendarItems, externalCalendarItems, externalCalendars]);

  const filteredItems = useMemo(() => {
    return allCalendarItems.filter(item => {
      // Event filter
      if (filters.eventIds.length > 0 && !filters.eventIds.includes(item.eventId)) {
        return false;
      }
      
      // Type filter
      if (filters.types.length > 0 && !filters.types.includes(item.type)) {
        return false;
      }
      
      // Status filter
      if (filters.statuses.length > 0 && !filters.statuses.includes(item.status)) {
        return false;
      }
      
      // Priority filter
      if (filters.priorities.length > 0 && item.priority && !filters.priorities.includes(item.priority)) {
        return false;
      }
      
      // Date range filter
      if (filters.dateRange.start && item.dueDate < filters.dateRange.start) {
        return false;
      }
      if (filters.dateRange.end && item.dueDate > filters.dateRange.end) {
        return false;
      }
      
      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.eventName.toLowerCase().includes(query) ||
          item.relatedTo?.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  }, [allCalendarItems, filters]);

  const upcomingItems = useMemo(() => {
    const now = new Date();
    return filteredItems
      .filter(item => item.status !== 'completed' && !isBefore(item.dueDate, now))
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
      .slice(0, 5);
  }, [filteredItems]);

  const addCalendarItem = (item: Omit<CalendarItem, 'id'>) => {
    const newItem: CalendarItem = {
      ...item,
      id: `cal-${Date.now()}`,
    };
    setCalendarItems(prev => [...prev, newItem]);
  };

  const updateCalendarItem = (id: string, updates: Partial<CalendarItem>) => {
    setCalendarItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteCalendarItem = (id: string) => {
    setCalendarItems(prev => prev.filter(item => item.id !== id));
  };

  const addGoogleCalendar = (details: { email: string; accountName: string; selectedColor: string }) => {
    const newCalendar: ExternalCalendar = {
      id: `google-${Date.now()}`,
      provider: 'google',
      accountName: details.accountName,
      email: details.email,
      color: details.selectedColor,
      visible: true,
      lastSynced: new Date(),
      itemCount: Math.floor(Math.random() * 15) + 5,
    };
    setExternalCalendars(prev => [...prev, newCalendar]);
    toast.success('Google Calendar connected successfully');
  };

  const addOutlookCalendar = (details: { email: string; accountName: string; selectedColor: string }) => {
    const newCalendar: ExternalCalendar = {
      id: `outlook-${Date.now()}`,
      provider: 'outlook',
      accountName: details.accountName,
      email: details.email,
      color: details.selectedColor,
      visible: true,
      lastSynced: new Date(),
      itemCount: Math.floor(Math.random() * 15) + 5,
    };
    setExternalCalendars(prev => [...prev, newCalendar]);
    toast.success('Outlook Calendar connected successfully');
  };

  const toggleCalendarVisibility = (calendarId: string) => {
    setExternalCalendars(prev => prev.map(cal => 
      cal.id === calendarId ? { ...cal, visible: !cal.visible } : cal
    ));
  };

  const removeExternalCalendar = (calendarId: string) => {
    setExternalCalendars(prev => prev.filter(cal => cal.id !== calendarId));
    setExternalCalendarItems(prev => prev.filter(item => 
      item.metadata?.externalCalendarId !== calendarId
    ));
    toast.success('Calendar disconnected successfully');
  };

  return {
    calendarItems: filteredItems,
    upcomingItems,
    filters,
    setFilters,
    addCalendarItem,
    updateCalendarItem,
    deleteCalendarItem,
    externalCalendars,
    addGoogleCalendar,
    addOutlookCalendar,
    toggleCalendarVisibility,
    removeExternalCalendar,
  };
};
