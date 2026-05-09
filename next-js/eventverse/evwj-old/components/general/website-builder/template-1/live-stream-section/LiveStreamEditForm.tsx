import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import LiveStreamContentTab from './LiveStreamContentTab';

export default function LiveStreamEditForm({ initial = {}, onCancel, onSave }: any) {
  const [streamData, setStreamData] = useState({
    title: initial.title || 'Watch Live',
    subtitle: initial.subtitle || 'Join us virtually for the live stream',
    streamUrl: initial.streamUrl || '',
  });

  const handleSave = () => {
    onSave(streamData);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Edit Live Stream Section</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Configure your event's live streaming settings
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <LiveStreamContentTab data={streamData} onChange={setStreamData} />
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
