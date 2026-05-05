import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import NetworkingContentTab from './NetworkingContentTab';

export default function NetworkingEditForm({ initial = {}, onCancel, onSave }: any) {
  const [networkingData, setNetworkingData] = useState({
    title: initial.title || 'Network & Connect',
    subtitle: initial.subtitle || 'Meet fellow attendees and expand your professional network',
    description: initial.description || 'Join structured networking sessions, speed-dating rounds, and informal meetups to connect with peers, mentors, and potential collaborators.',
    activities: initial.activities && Array.isArray(initial.activities) 
      ? initial.activities 
      : [
          { title: 'Speed Networking', time: '10:30 AM', desc: 'Quick 5-min rounds to meet many attendees.' },
          { title: 'Mentor Roundtables', time: '2:00 PM', desc: 'Small-group discussions with industry mentors.' },
        ],
    cta: initial.cta || 'See Events',
  });

  const handleSave = () => {
    onSave(networkingData);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Edit Networking Section</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Configure networking activities and opportunities
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <NetworkingContentTab data={networkingData} onChange={setNetworkingData} />
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
