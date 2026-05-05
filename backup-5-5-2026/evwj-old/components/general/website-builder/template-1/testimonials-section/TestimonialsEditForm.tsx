import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import TestimonialsContentTab from './TestimonialsContentTab';

export default function TestimonialsEditForm({ initial = {}, onCancel, onSave }: { initial?: any; onCancel: () => void; onSave: (d: any) => void }) {
  const [testimonialsData, setTestimonialsData] = useState({
    title: initial.title || 'What Attendees Say',
    subtitle: initial.subtitle || 'Hear from previous event participants',
    testimonials: Array.isArray(initial.testimonials) && initial.testimonials.length 
      ? initial.testimonials 
      : [
          { 
            name: 'Jennifer Martinez', 
            role: 'Product Manager', 
            company: 'StartupCo', 
            quote: "This event exceeded my expectations! The speakers were incredible and I made valuable connections.", 
            rating: 5 
          },
        ],
  });

  const handleSave = () => {
    onSave(testimonialsData);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Edit Testimonials Section</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Showcase feedback from your event attendees
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <TestimonialsContentTab data={testimonialsData} onChange={setTestimonialsData} />
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
