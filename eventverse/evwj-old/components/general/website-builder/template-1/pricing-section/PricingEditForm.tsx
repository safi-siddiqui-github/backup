import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import PricingContentTab from './PricingContentTab';

export default function PricingEditForm({ initial = {}, onCancel, onSave }: { initial?: any; onCancel: () => void; onSave: (d: any) => void }) {
  const [pricingData, setPricingData] = useState({
    title: initial.title || 'Meet Our Speakers',
    subtitle: initial.subtitle || 'Learn from industry experts and thought leaders',
    speakersText: (() => {
      try {
        return JSON.stringify(initial.speakers || [
          {
            name: 'Dr. Sarah Johnson',
            role: 'Chief Innovation Officer',
            company: 'InnovateTech Corp',
            bio: 'Dr. Johnson is a renowned technology researcher with over 15 years of experience in innovation strategy and emerging technologies.',
          },
          {
            name: 'Michael Chen',
            role: 'Senior AI Engineer',
            company: 'TechCorp',
            bio: 'Michael specializes in machine learning and AI development, with a focus on practical applications in software engineering.',
          },
        ], null, 2);
      } catch (e) {
        return '[]';
      }
    })(),
    ticketsText: (() => {
      try {
        return JSON.stringify(initial.tickets || [
          {
            label: 'Early Bird',
            price: '$299.00',
            sub: 'Perfect for individual attendees',
            highlights: ['Access to all sessions', 'Welcome reception', 'Lunch and coffee breaks', 'Digital resources', 'Networking opportunities'],
            availabilityText: '50 tickets available',
            cta: 'Get Early Bird Ticket',
          },
          {
            label: 'Professional',
            price: '$499.00',
            sub: 'Best value for professionals',
            highlights: ['Everything in Early Bird', 'VIP seating', 'Access to workshops', 'One-on-one speaker meetings', 'Certificate of completion'],
            availabilityText: '100 tickets available',
            cta: 'Get Professional Ticket',
          },
          {
            label: 'Enterprise',
            price: '$799.00',
            sub: 'For teams and organizations',
            highlights: ['Everything in Professional', 'Group discounts available', 'Custom training sessions', 'Dedicated support', 'Priority booking'],
            availabilityText: 'Contact sales',
            cta: 'Contact Sales',
          },
        ], null, 2);
      } catch (e) {
        return '[]';
      }
    })(),
  });

  const handleSave = () => {
    try {
      const speakers = JSON.parse(pricingData.speakersText);
      const tickets = JSON.parse(pricingData.ticketsText);
      onSave({ 
        title: pricingData.title, 
        subtitle: pricingData.subtitle, 
        speakers, 
        tickets 
      });
    } catch (e) {
      alert('JSON is invalid. Please correct speakers or tickets JSON.');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Edit Pricing Section</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Configure speakers and pricing tiers for your event
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <PricingContentTab data={pricingData} onChange={setPricingData} />
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
