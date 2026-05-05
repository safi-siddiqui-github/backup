import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import SocialFeedContentTab from './SocialFeedContentTab';

export default function SocialFeedEditForm({ initial = {}, onCancel, onSave }: { initial?: any; onCancel: () => void; onSave: (d: any) => void }) {
  const [socialFeedData, setSocialFeedData] = useState({
    title: initial.title || 'Join the Conversation',
    subtitle: initial.subtitle || 'Follow us on social media for live updates',
    posts: Array.isArray(initial.posts) && initial.posts.length 
      ? initial.posts 
      : [
          { 
            author: 'Sarah Johnson', 
            handle: '@sarahjdev', 
            time: '2 hours ago', 
            platform: 'Twitter', 
            avatar: '', 
            content: 'Amazing keynote!', 
            likes: 42, 
            comments: 8, 
            shares: 12 
          },
        ],
  });

  const handleSave = () => {
    onSave(socialFeedData);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Edit Social Feed Section</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Configure social media posts and engagement
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <SocialFeedContentTab data={socialFeedData} onChange={setSocialFeedData} />
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
