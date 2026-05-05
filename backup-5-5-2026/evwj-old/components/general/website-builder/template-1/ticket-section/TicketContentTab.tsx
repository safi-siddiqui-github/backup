import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Ticket } from 'lucide-react';

interface TicketData {
  title: string;
  subtitle: string;
  tickets: Array<{
    label: string;
    price: string;
    highlights: string[];
    availabilityText: string;
    maxPerPerson: number;
  }>;
}

interface TicketContentTabProps {
  data: TicketData;
  onChange: (data: TicketData) => void;
}

export default function TicketContentTab({ data, onChange }: TicketContentTabProps) {
  const updateTicket = (idx: number, patch: Partial<TicketData['tickets'][0]>) => {
    const updatedTickets = data.tickets.map((t, i) => (i === idx ? { ...t, ...patch } : t));
    onChange({ ...data, tickets: updatedTickets });
  };

  const addTicket = () => {
    const newTicket = {
      label: 'New Ticket',
      price: '$0.00',
      highlights: ['Access included'],
      availabilityText: 'Available',
      maxPerPerson: 1,
    };
    onChange({ ...data, tickets: [...data.tickets, newTicket] });
  };

  const removeTicket = (idx: number) => {
    const updatedTickets = data.tickets.filter((_, i) => i !== idx);
    onChange({ ...data, tickets: updatedTickets });
  };

  return (
    <div className="space-y-6">
      {/* Preview Section */}
      <div className="rounded-lg border bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Ticket className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {data.title || 'Get Your Tickets'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {data.subtitle || 'Choose the perfect ticket for your needs'}
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          {data.tickets.length > 0 ? (
            data.tickets.map((ticket, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-950 rounded-lg border p-4 shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {ticket.label || 'Ticket Name'}
                    </h4>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {ticket.price || '$0.00'}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded">
                    Max: {ticket.maxPerPerson}
                  </span>
                </div>
                {ticket.highlights && ticket.highlights.length > 0 && (
                  <ul className="space-y-1 mb-2">
                    {ticket.highlights.map((h, i) => (
                      <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                {ticket.availabilityText && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {ticket.availabilityText}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-950 rounded-lg border">
              No tickets added yet
            </div>
          )}
        </div>
      </div>

      {/* Section Header */}
      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Section Header</h3>
        
        <div className="space-y-2">
          <Label htmlFor="ticket-title">Title</Label>
          <Input
            id="ticket-title"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="Get Your Tickets"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ticket-subtitle">Subtitle</Label>
          <Input
            id="ticket-subtitle"
            value={data.subtitle}
            onChange={(e) => onChange({ ...data, subtitle: e.target.value })}
            placeholder="Choose the perfect ticket for your needs"
          />
        </div>
      </div>

      {/* Tickets Management */}
      <div className="space-y-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Ticket Types</h3>
          <Button
            type="button"
            onClick={addTicket}
            size="sm"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Ticket
          </Button>
        </div>

        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {data.tickets.map((ticket, idx) => (
            <div key={idx} className="rounded-lg border bg-slate-50 dark:bg-slate-900 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ticket {idx + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTicket(idx)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor={`ticket-label-${idx}`}>Ticket Name</Label>
                  <Input
                    id={`ticket-label-${idx}`}
                    value={ticket.label}
                    onChange={(e) => updateTicket(idx, { label: e.target.value })}
                    placeholder="Early Bird"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`ticket-price-${idx}`}>Price</Label>
                  <Input
                    id={`ticket-price-${idx}`}
                    value={ticket.price}
                    onChange={(e) => updateTicket(idx, { price: e.target.value })}
                    placeholder="$299.00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`ticket-highlights-${idx}`}>Highlights (comma-separated)</Label>
                <Textarea
                  id={`ticket-highlights-${idx}`}
                  value={(ticket.highlights || []).join(', ')}
                  onChange={(e) =>
                    updateTicket(idx, {
                      highlights: e.target.value
                        .split(',')
                        .map((s: string) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="Full conference access, Welcome kit, Lunch included"
                  rows={2}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Enter features or benefits included with this ticket
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`ticket-availability-${idx}`}>Availability Text</Label>
                <Input
                  id={`ticket-availability-${idx}`}
                  value={ticket.availabilityText}
                  onChange={(e) => updateTicket(idx, { availabilityText: e.target.value })}
                  placeholder="50 tickets available"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`ticket-max-${idx}`}>Max Per Person</Label>
                <Input
                  id={`ticket-max-${idx}`}
                  type="number"
                  min="1"
                  value={ticket.maxPerPerson}
                  onChange={(e) =>
                    updateTicket(idx, { maxPerPerson: Number(e.target.value) || 1 })
                  }
                  className="w-32"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Maximum tickets per purchase
                </p>
              </div>
            </div>
          ))}

          {data.tickets.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Ticket className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No tickets added yet</p>
              <p className="text-xs mt-1">Click "Add Ticket" to create your first ticket type</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
