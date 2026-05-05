import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import SponsorContentTab from './SponsorContentTab';

export default function SponsorShowcaseEditForm({ initial = {}, onCancel, onSave }: any) {
  const [sponsorData, setSponsorData] = useState({
    title: initial.title || 'Our Sponsors',
    subtitle: initial.subtitle || 'Thank you to our amazing sponsors who make this event possible',
    sponsors: Array.isArray(initial.sponsors) && initial.sponsors.length 
      ? initial.sponsors 
      : [
          { name: 'TechCorp', logo: 'https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?auto=format&fit=crop&w=600&q=80' },
          { name: 'InnovateLabs', logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80' },
        ],
  });

  const handleSave = () => {
    onSave(sponsorData);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Edit Sponsors Section</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Showcase your event sponsors and partners
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <SponsorContentTab data={sponsorData} onChange={setSponsorData} />
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
