import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, UserCircle, Building2, Linkedin, Facebook, Image as ImageIcon } from 'lucide-react';

interface SpeakersData {
  title: string;
  subtitle: string;
  speakers: Array<{
    name: string;
    role: string;
    company: string;
    bio: string;
    image: string;
    linkedin: string;
    facebook: string;
  }>;
}

interface SpeakersContentTabProps {
  data: SpeakersData;
  onChange: (data: SpeakersData) => void;
}

export default function SpeakersContentTab({ data, onChange }: SpeakersContentTabProps) {
  const updateSpeaker = (idx: number, patch: Partial<SpeakersData['speakers'][0]>) => {
    const updatedSpeakers = data.speakers.map((it, i) => (i === idx ? { ...it, ...patch } : it));
    onChange({ ...data, speakers: updatedSpeakers });
  };

  const addSpeaker = () => {
    const newSpeaker = {
      name: 'New Speaker',
      role: 'Role',
      company: 'Company',
      bio: '',
      image: '',
      linkedin: '',
      facebook: '',
    };
    onChange({ ...data, speakers: [...data.speakers, newSpeaker] });
  };

  const removeSpeaker = (idx: number) => {
    const updatedSpeakers = data.speakers.filter((_, i) => i !== idx);
    onChange({ ...data, speakers: updatedSpeakers });
  };

  return (
    <div className="space-y-6">
      {/* Preview Section */}
      <div className="rounded-lg border bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-500 rounded-lg">
            <UserCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {data.title || 'Meet Our Speakers'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {data.subtitle || 'Learn from industry experts and thought leaders'}
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          {data.speakers.length > 0 ? (
            data.speakers.slice(0, 3).map((speaker, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-950 rounded-lg border p-4 flex gap-3"
              >
                <div className="flex-shrink-0">
                  {speaker.image ? (
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling;
                          if (fallback) (fallback as HTMLElement).style.display = 'flex';
                        }}
                      />
                      <div className="hidden w-full h-full items-center justify-center">
                        <UserCircle className="h-10 w-10 text-gray-400" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold text-xl">
                      {speaker.name ? speaker.name.charAt(0).toUpperCase() : '?'}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                    {speaker.name || 'Speaker Name'}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {speaker.role || 'Role'}
                    {speaker.company && ` at ${speaker.company}`}
                  </p>
                  {speaker.bio && (
                    <p className="text-xs text-gray-700 dark:text-gray-300 mt-2 line-clamp-2">
                      {speaker.bio}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    {speaker.linkedin && (
                      <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded">
                        <Linkedin className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                    {speaker.facebook && (
                      <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded">
                        <Facebook className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-950 rounded-lg border">
              No speakers added yet
            </div>
          )}
          {data.speakers.length > 3 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              +{data.speakers.length - 3} more speakers
            </p>
          )}
        </div>
      </div>

      {/* Section Header */}
      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Section Header</h3>
        
        <div className="space-y-2">
          <Label htmlFor="speakers-title">Title</Label>
          <Input
            id="speakers-title"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="Meet Our Speakers"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="speakers-subtitle">Subtitle</Label>
          <Input
            id="speakers-subtitle"
            value={data.subtitle}
            onChange={(e) => onChange({ ...data, subtitle: e.target.value })}
            placeholder="Learn from industry experts and thought leaders"
          />
        </div>
      </div>

      {/* Speakers Management */}
      <div className="space-y-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Event Speakers</h3>
          <Button
            type="button"
            onClick={addSpeaker}
            size="sm"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Speaker
          </Button>
        </div>

        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {data.speakers.map((speaker, idx) => (
            <div key={idx} className="rounded-lg border bg-slate-50 dark:bg-slate-900 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Speaker {idx + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSpeaker(idx)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label htmlFor={`speaker-name-${idx}`}>Name</Label>
                  <Input
                    id={`speaker-name-${idx}`}
                    value={speaker.name}
                    onChange={(e) => updateSpeaker(idx, { name: e.target.value })}
                    placeholder="Dr. Sarah Johnson"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`speaker-role-${idx}`}>Role</Label>
                  <Input
                    id={`speaker-role-${idx}`}
                    value={speaker.role}
                    onChange={(e) => updateSpeaker(idx, { role: e.target.value })}
                    placeholder="Chief Innovation Officer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`speaker-company-${idx}`}>Company</Label>
                  <Input
                    id={`speaker-company-${idx}`}
                    value={speaker.company}
                    onChange={(e) => updateSpeaker(idx, { company: e.target.value })}
                    placeholder="InnovateTech Corp"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`speaker-image-${idx}`} className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Profile Image URL
                </Label>
                <Input
                  id={`speaker-image-${idx}`}
                  value={speaker.image}
                  onChange={(e) => updateSpeaker(idx, { image: e.target.value })}
                  placeholder="https://example.com/speaker-photo.jpg"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Optional: URL to speaker's profile photo
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`speaker-bio-${idx}`}>Bio</Label>
                <Textarea
                  id={`speaker-bio-${idx}`}
                  value={speaker.bio}
                  onChange={(e) => updateSpeaker(idx, { bio: e.target.value })}
                  placeholder="Speaker's background, expertise, and achievements..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor={`speaker-linkedin-${idx}`} className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn URL
                  </Label>
                  <Input
                    id={`speaker-linkedin-${idx}`}
                    value={speaker.linkedin}
                    onChange={(e) => updateSpeaker(idx, { linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`speaker-facebook-${idx}`} className="flex items-center gap-2">
                    <Facebook className="h-4 w-4" />
                    Facebook URL
                  </Label>
                  <Input
                    id={`speaker-facebook-${idx}`}
                    value={speaker.facebook}
                    onChange={(e) => updateSpeaker(idx, { facebook: e.target.value })}
                    placeholder="https://facebook.com/username"
                  />
                </div>
              </div>
            </div>
          ))}

          {data.speakers.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <UserCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No speakers added yet</p>
              <p className="text-xs mt-1">Click "Add Speaker" to create your first speaker profile</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
