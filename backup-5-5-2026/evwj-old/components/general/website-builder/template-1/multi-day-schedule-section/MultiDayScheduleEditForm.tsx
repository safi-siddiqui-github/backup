import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import MultiDayScheduleContentTab from './MultiDayScheduleContentTab';

export default function MultiDayScheduleEditForm({ initial = {}, onCancel, onSave }: { initial?: any; onCancel: () => void; onSave: (d: any) => void }) {
  const [scheduleData, setScheduleData] = useState({
    title: initial.title || 'Event Schedule',
    subtitle: initial.subtitle || 'Full agenda for all event days',
    daysText: (() => {
      try {
        return JSON.stringify(initial.days || [
          {
            date: 'Friday, March 15',
            dateLabel: 'Friday, March 15',
            events: [
              { start: '8:00 AM', end: '9:00 AM', title: 'Registration & Welcome Coffee', type: 'break', description: 'Get your badge and enjoy coffee while networking', location: 'Main Lobby', btn: 'Add to Calendar' },
              { start: '9:00 AM', end: '10:00 AM', title: 'Opening Keynote', type: 'keynote', description: 'Welcome address and vision for the future', location: 'Main Auditorium', btn: 'Add to Calendar' },
              { start: '10:30 AM', end: '12:00 PM', title: 'AI Workshop', type: 'workshop', description: 'Hands-on AI development workshop', location: 'Workshop Room 1', btn: 'Add to Calendar' },
              { start: '12:00 PM', end: '1:30 PM', title: 'Networking Lunch', type: 'networking', description: 'Connect with peers over lunch', location: 'Dining Hall', btn: 'Add to Calendar' },
            ],
          },
        ], null, 2);
      } catch (e) {
        return '[]';
      }
    })(),
  });

  const handleSave = () => {
    try {
      const days = JSON.parse(scheduleData.daysText);
      onSave({ 
        title: scheduleData.title, 
        subtitle: scheduleData.subtitle, 
        days 
      });
    } catch (e) {
      alert('Days JSON is invalid. Please correct it.');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Edit Multi-Day Schedule Section</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Configure the complete event schedule across multiple days
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <MultiDayScheduleContentTab data={scheduleData} onChange={setScheduleData} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50 dark:bg-slate-900">
        <Button
          type="button"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onCancel();
          }}
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleSave();
          }}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
