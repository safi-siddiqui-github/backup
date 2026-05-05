import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import SpeakersContentTab from './SpeakersContentTab';

export default function SpeakersEditForm({ initial = {}, onCancel, onSave }: { initial?: any; onCancel: () => void; onSave: (d: any) => void }) {
  const [speakersData, setSpeakersData] = useState({
    title: initial.title || 'Meet Our Speakers',
    subtitle: initial.subtitle || 'Learn from industry experts and thought leaders',
    speakers: Array.isArray(initial.speakers) && initial.speakers.length 
      ? initial.speakers 
      : [
          {
            name: 'Dr. Sarah Johnson',
            role: 'Chief Innovation Officer',
            company: 'InnovateTech Corp',
            bio: 'Dr. Johnson is a renowned technology researcher with over 15 years of experience in innovation strategy and emerging technologies.',
            image: '',
            linkedin: '',
            facebook: '',
          },
        ],
  });

  const handleSave = () => {
    onSave(speakersData);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Edit Speakers Section</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Configure speaker profiles and information
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <SpeakersContentTab data={speakersData} onChange={setSpeakersData} />
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
