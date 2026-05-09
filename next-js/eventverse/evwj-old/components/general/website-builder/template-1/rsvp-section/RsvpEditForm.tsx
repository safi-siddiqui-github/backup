import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import RsvpContentTab from './RsvpContentTab';

type Props = {
  initial?: any;
  onSave: (payload: any) => void;
  onCancel?: () => void;
  onClose?: () => void;
};

export default function RsvpEditForm({ initial, onSave, onCancel, onClose }: Props) {
  const payload = initial || {};
  const callClose = () => {
    if (onCancel) onCancel();
    else if (onClose) onClose();
  };

  const [rsvpData, setRsvpData] = useState({
    title: payload?.title || 'RSVP',
    subtitle: payload?.subtitle || 'Please confirm your attendance',
    eventDate: payload?.eventDate || '2024-06-15',
    location: payload?.location || 'Grand Conference Center',
    fullNameLabel: payload?.fullNameLabel || 'Full Name *',
    emailLabel: payload?.emailLabel || 'Email Address *',
    attendingLabel: payload?.attendingLabel || 'Will you be attending? *',
    attendingOptions: payload?.attendingOptions || ['Yes', 'No', 'Maybe'],
    messageLabel: payload?.messageLabel || 'Additional Message',
    submitText: payload?.submitText || 'Submit RSVP',
  });

  const handleSave = () => {
    onSave(rsvpData);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Edit RSVP Section</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Configure RSVP form fields and labels
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <RsvpContentTab data={rsvpData} onChange={setRsvpData} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50 dark:bg-slate-900">
        <Button
          type="button"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            callClose();
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
