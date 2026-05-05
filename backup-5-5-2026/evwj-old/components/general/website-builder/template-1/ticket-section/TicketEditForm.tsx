import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import TicketContentTab from './TicketContentTab';

export default function TicketEditForm({ initial = {}, onCancel, onSave }: { initial?: any; onCancel: () => void; onSave: (d: any) => void }) {
  const [ticketData, setTicketData] = useState({
    title: initial.title || 'Get Your Tickets',
    subtitle: initial.subtitle || 'Choose the perfect ticket for your needs',
    tickets: Array.isArray(initial.tickets) && initial.tickets.length 
      ? initial.tickets 
      : [
          { 
            label: 'Early Bird', 
            price: '$299.00', 
            highlights: ['Full conference access', 'Welcome kit'], 
            availabilityText: '50 tickets available', 
            maxPerPerson: 5 
          },
        ],
  });

  const handleSave = () => {
    onSave(ticketData);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Edit Ticket Section</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Configure ticket types and pricing for your event
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <TicketContentTab data={ticketData} onChange={setTicketData} />
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
