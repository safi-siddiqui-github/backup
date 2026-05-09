import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import SessionsContentTab from './SessionsContentTab';

export default function SessionsEditForm({ initial = {}, onCancel, onSave }: { initial?: any; onCancel: () => void; onSave: (d: any) => void }) {
  const [sessionsData, setSessionsData] = useState({
    title: initial.title || 'Conference Sessions',
    subtitle: initial.subtitle || 'Explore our diverse lineup of sessions and workshops',
    sessions: Array.isArray(initial.sessions) && initial.sessions.length 
      ? initial.sessions 
      : [
          {
            track: 'All Sessions',
            title: 'Opening Keynote: The Future of Innovation',
            speaker: 'Dr. Sarah Johnson',
            time: '09:00 - 10:00',
            location: 'Main Auditorium',
            level: 'Beginner',
            description: 'Join us for an inspiring keynote about emerging technologies and their impact on business.',
            tags: ['innovation', 'technology'],
          },
        ],
  });

  const handleSave = () => {
    onSave(sessionsData);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Edit Sessions Section</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Configure conference sessions and workshop details
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <SessionsContentTab data={sessionsData} onChange={setSessionsData} />
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
