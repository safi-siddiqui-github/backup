import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ScheduleContentTab from './ScheduleContentTab';

export default function ScheduleEditForm({ initial = {}, onCancel, onSave }: { initial?: any; onCancel: () => void; onSave: (d: any) => void }) {
  const [scheduleData, setScheduleData] = useState({
    title: initial.title || 'Event Schedule',
    subtitle: initial.subtitle || "Don't miss out on these exciting sessions",
    sessionsText: (() => {
      try {
        return JSON.stringify(initial.sessions || [
          {
            date: 'Saturday, June 15, 2024',
            items: [
              { time: '8:00 AM - 9:00 AM', title: 'Registration & Coffee', description: '', location: 'Main Lobby' },
              { time: '9:00 AM - 10:00 AM', title: 'Opening Keynote', description: 'Welcome address and industry overview', location: 'Main Auditorium' },
            ],
          },
        ], null, 2);
      } catch (e) {
        return '[]';
      }
    })(),
  });

  const handleSave = () => {
    let sessions = [];
    try {
      sessions = JSON.parse(scheduleData.sessionsText);
    } catch (e) {
      alert('Sessions JSON is invalid. Please correct it.');
      return;
    }
    onSave({ 
      title: scheduleData.title, 
      subtitle: scheduleData.subtitle, 
      sessions 
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Edit Schedule Section</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Configure the event schedule and session details
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <ScheduleContentTab data={scheduleData} onChange={setScheduleData} />
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
