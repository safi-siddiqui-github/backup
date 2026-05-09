"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BackgroundSelectionModal, BackgroundData } from "../about-section/BackgroundSelectionModal";
import CustomEditor from "../../RichTextEditor";

type CountdownData = {
  title?: string;
  subtitle?: string;
  targetDate?: string;
  message?: string;
  bgColor?: string;
  textColor?: string;
  numberColor?: string;
  labelColor?: string;
  background?: BackgroundData;
  countdownStyle?: string;
  showTitle?: boolean;
  showSubtitle?: boolean;
  showMessage?: boolean;
};

type CountdownContentTabProps = {
  data: CountdownData;
  onChange: (data: CountdownData) => void;
};

export function CountdownContentTab({ data, onChange }: CountdownContentTabProps) {
  const [showBgModal, setShowBgModal] = useState(false);

  const updateData = (updates: Partial<CountdownData>) => {
    onChange({ ...data, ...updates });
  };

  const handleBackgroundApply = (bg: BackgroundData) => {
    updateData({ background: bg });
  };

  const formatEventDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDynamicSubtitle = () => {
    if (data.targetDate) {
      return `Event starts on ${formatEventDate(data.targetDate)}`;
    }
    return data.subtitle || "Don't miss out on this amazing event";
  };

  const renderPreviewBackground = (extraClass = '') => {
    const bg = data.background;
    if (!bg) return null;
    if (bg.type === 'image' && bg.value) return <img src={bg.value} alt="bg preview" className={`absolute inset-0 w-full h-full object-cover ${extraClass}`} />;
    if (bg.type === 'video' && bg.value) return <video src={bg.value} className={`absolute inset-0 w-full h-full object-cover ${extraClass}`} muted loop playsInline autoPlay />;
    if (bg.type === 'color' && bg.value) return <div className={`absolute inset-0 ${extraClass}`} style={{ backgroundColor: bg.value }} />;
    return null;
  };

  const renderCountdownPreview = () => {
    const calculateRemaining = (target: Date) => {
      const now = new Date().getTime();
      const diff = Math.max(0, target.getTime() - now);
      const seconds = Math.floor(diff / 1000) % 60;
      const minutes = Math.floor(diff / (1000 * 60)) % 60;
      const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      return { days, hours, minutes, seconds };
    };

    let targetDate: Date | null = null;
    if (data.targetDate) {
      try {
        let dateString = data.targetDate;
        if (dateString.includes('T') && !dateString.includes(':')) {
          dateString += ':00';
        } else if (dateString.match(/T\d{2}:\d{2}$/)) {
          dateString += ':00';
        }
        
        targetDate = new Date(dateString);
        
        const now = new Date();
        if (isNaN(targetDate.getTime()) || targetDate <= now) {
          targetDate = null;
        }
      } catch (e) {
        targetDate = null;
      }
    }

    const remaining = targetDate ? calculateRemaining(targetDate) : { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const style = data.countdownStyle || 'classic';

    if (style === 'minimal') {
      return (
        <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
          {[
            { value: remaining.days, label: 'Days' },
            { value: remaining.hours, label: 'Hours' },
            { value: remaining.minutes, label: 'Minutes' },
            { value: remaining.seconds, label: 'Seconds' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-white">{String(item.value).padStart(2, '0')}</div>
              <div className="text-xs text-white/80 uppercase tracking-wide">{item.label}</div>
            </div>
          ))}
        </div>
      );
    }

    if (style === 'cards') {
      return (
        <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
          {[
            { value: remaining.days, label: 'Days' },
            { value: remaining.hours, label: 'Hours' },
            { value: remaining.minutes, label: 'Minutes' },
            { value: remaining.seconds, label: 'Seconds' }
          ].map((item, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
              <div className="text-2xl font-bold text-white">{String(item.value).padStart(2, '0')}</div>
              <div className="text-xs text-white/80 mt-1 uppercase tracking-wide">{item.label}</div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
        {[
          { value: remaining.days, label: 'Days' },
          { value: remaining.hours, label: 'Hours' },
          { value: remaining.minutes, label: 'Minutes' },
          { value: remaining.seconds, label: 'Seconds' }
        ].map((item, index) => (
          <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-white">{String(item.value).padStart(2, '0')}</div>
            <div className="text-xs text-white/80 mt-1 uppercase tracking-wide">{item.label}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">

      {/* Background Selection Modal */}
      <BackgroundSelectionModal
        open={showBgModal}
        onOpenChange={setShowBgModal}
        initial={data.background}
        onApply={handleBackgroundApply}
      />

      {/* Countdown Style Presets */}
      <div className="space-y-3 border rounded-lg p-4">
        <h3 className="font-semibold text-sm">Countdown Style Presets</h3>
        <div className="flex gap-3 mt-3">
          <button
            type="button"
            onClick={() => updateData({ countdownStyle: 'classic' })}
            className={`flex-1 border rounded p-3 text-sm text-left ${(data.countdownStyle === 'classic' || !data.countdownStyle) ? 'ring-2 ring-indigo-500' : ''}`}
          >
            <div className="font-medium">Classic</div>
            <div className="text-xs text-muted-foreground mt-1">Glassmorphism cards with backdrop blur</div>
          </button>

          <button
            type="button"
            onClick={() => updateData({ countdownStyle: 'minimal' })}
            className={`flex-1 border rounded p-3 text-sm text-left ${data.countdownStyle === 'minimal' ? 'ring-2 ring-indigo-500' : ''}`}
          >
            <div className="font-medium">Minimal</div>
            <div className="text-xs text-muted-foreground mt-1">Clean numbers without card backgrounds</div>
          </button>

          <button
            type="button"
            onClick={() => updateData({ countdownStyle: 'cards' })}
            className={`flex-1 border rounded p-3 text-sm text-left ${data.countdownStyle === 'cards' ? 'ring-2 ring-indigo-500' : ''}`}
          >
            <div className="font-medium">Cards</div>
            <div className="text-xs text-muted-foreground mt-1">Semi-transparent cards with borders</div>
          </button>
        </div>

        <div className="mt-3 w-full">
          {/* Preview */}
          <div className="w-full rounded-md overflow-hidden relative text-white min-h-[200px] flex items-center justify-center">
            {renderPreviewBackground() || <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-700" />}
            <div className="relative z-10 text-center space-y-4">
              {data.showTitle === true && <div className="jodit-wysiwyg text-2xl font-bold" dangerouslySetInnerHTML={{ __html: data.title || 'Event Countdown' }} />}
              {data.showSubtitle === true && <div className="jodit-wysiwyg text-sm opacity-90" dangerouslySetInnerHTML={{ __html: data.subtitle || "Don't miss out on this amazing event" }} />}
              {renderCountdownPreview()}
              {data.showMessage === true && data.message && <div className="jodit-wysiwyg text-sm opacity-80 mt-4" dangerouslySetInnerHTML={{ __html: data.message }} />}
            </div>
          </div>
        </div>

        <Button
          variant="default"
          onClick={() => setShowBgModal(true)}
          className="w-full"
        >
          Change Background
        </Button>
      </div>

      {/* Optional Elements */}
      <div className="space-y-4">
        <div>
          <Label>Optional Elements</Label>
          <div className="flex gap-3 mt-2">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={data.showTitle === true} onChange={(e) => updateData({ showTitle: e.target.checked })} />
              <span className="text-sm">Show title</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={data.showSubtitle === true} onChange={(e) => updateData({ showSubtitle: e.target.checked })} />
              <span className="text-sm">Show subtitle</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={data.showMessage === true} onChange={(e) => updateData({ showMessage: e.target.checked })} />
              <span className="text-sm">Show message</span>
            </label>
          </div>
        </div>
      </div>

      {/* Target Date */}
      <div className="space-y-2">
        <Label htmlFor="countdown-date">Event Start Date & Time</Label>
        <Input
          id="countdown-date"
          type="datetime-local"
          value={data.targetDate || ""}
          onChange={(e) => updateData({ targetDate: e.target.value })}
          min={new Date().toISOString().slice(0, 16)}
        />
        <p className="text-xs text-muted-foreground">
          Select the date and time when the event will start
        </p>
      </div>

      {/* Title */}
      {data.showTitle === true && (
        <div className="space-y-2">
          <Label htmlFor="countdown-title">Title</Label>
          <CustomEditor
            value={data.title || ""}
            onChange={(value) => updateData({ title: value })}
          />
        </div>
      )}

      {/* Subtitle */}
      {data.showSubtitle === true && (
        <div className="space-y-2">
          <Label htmlFor="countdown-subtitle">Subtitle</Label>
          <CustomEditor
            value={data.subtitle || ""}
            onChange={(value) => updateData({ subtitle: value })}
          />
        </div>
      )}

      {/* Message */}
      {data.showMessage === true && (
        <div className="space-y-2">
          <Label htmlFor="countdown-message">Message (Optional)</Label>
          <CustomEditor
            value={data.message || ""}
            onChange={(value) => updateData({ message: value })}
          />
        </div>
      )}
    </div>
  );
}
