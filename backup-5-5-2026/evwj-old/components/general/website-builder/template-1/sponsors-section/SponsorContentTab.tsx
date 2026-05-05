import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Award, Image as ImageIcon } from 'lucide-react';

interface SponsorData {
  title: string;
  subtitle: string;
  sponsors: Array<{
    name: string;
    logo: string;
  }>;
}

interface SponsorContentTabProps {
  data: SponsorData;
  onChange: (data: SponsorData) => void;
}

export default function SponsorContentTab({ data, onChange }: SponsorContentTabProps) {
  const updateSponsor = (idx: number, key: string, value: string) => {
    const updatedSponsors = data.sponsors.map((sp, i) => (i === idx ? { ...sp, [key]: value } : sp));
    onChange({ ...data, sponsors: updatedSponsors });
  };

  const addSponsor = () => {
    const newSponsor = {
      name: 'New Sponsor',
      logo: '',
    };
    onChange({ ...data, sponsors: [...data.sponsors, newSponsor] });
  };

  const removeSponsor = (idx: number) => {
    const updatedSponsors = data.sponsors.filter((_, i) => i !== idx);
    onChange({ ...data, sponsors: updatedSponsors });
  };

  return (
    <div className="space-y-6">
      {/* Preview Section */}
      <div className="rounded-lg border bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-500 rounded-lg">
            <Award className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {data.title || 'Our Sponsors'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {data.subtitle || 'Thank you to our amazing sponsors who make this event possible'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data.sponsors.length > 0 ? (
            data.sponsors.map((sponsor, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-950 rounded-lg border p-4 flex flex-col items-center justify-center group hover:shadow-md transition-shadow"
              >
                {sponsor.logo ? (
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling;
                        if (fallback) (fallback as HTMLElement).style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center font-medium">
                  {sponsor.name || 'Sponsor'}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-950 rounded-lg border">
              No sponsors added yet
            </div>
          )}
        </div>
      </div>

      {/* Section Header */}
      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Section Header</h3>
        
        <div className="space-y-2">
          <Label htmlFor="sponsor-title">Title</Label>
          <Input
            id="sponsor-title"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="Our Sponsors"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sponsor-subtitle">Subtitle</Label>
          <Input
            id="sponsor-subtitle"
            value={data.subtitle}
            onChange={(e) => onChange({ ...data, subtitle: e.target.value })}
            placeholder="Thank you to our amazing sponsors who make this event possible"
          />
        </div>
      </div>

      {/* Sponsors Management */}
      <div className="space-y-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Sponsor Logos</h3>
          <Button
            type="button"
            onClick={addSponsor}
            size="sm"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Sponsor
          </Button>
        </div>

        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {data.sponsors.map((sponsor, idx) => (
            <div key={idx} className="rounded-lg border bg-slate-50 dark:bg-slate-900 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sponsor {idx + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSponsor(idx)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-start gap-3">
                {/* Logo Preview */}
                <div className="flex-shrink-0">
                  {sponsor.logo ? (
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-800 flex items-center justify-center border">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling;
                          if (fallback) (fallback as HTMLElement).style.display = 'flex';
                        }}
                      />
                      <div className="hidden w-full h-full items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-gray-400" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center border">
                      <ImageIcon className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Form Fields */}
                <div className="flex-1 space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor={`sponsor-name-${idx}`}>Sponsor Name</Label>
                    <Input
                      id={`sponsor-name-${idx}`}
                      value={sponsor.name}
                      onChange={(e) => updateSponsor(idx, 'name', e.target.value)}
                      placeholder="TechCorp"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`sponsor-logo-${idx}`}>Logo URL</Label>
                    <Input
                      id={`sponsor-logo-${idx}`}
                      value={sponsor.logo}
                      onChange={(e) => updateSponsor(idx, 'logo', e.target.value)}
                      placeholder="https://example.com/logo.png"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Enter the full URL to the sponsor's logo image
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {data.sponsors.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Award className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No sponsors added yet</p>
              <p className="text-xs mt-1">Click "Add Sponsor" to add your first sponsor</p>
            </div>
          )}
        </div>

        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-800 dark:text-blue-200">
            <strong>Tip:</strong> Logos will be displayed in a grid layout. For best results, use square logos with transparent backgrounds (PNG format recommended).
          </p>
        </div>
      </div>
    </div>
  );
}
