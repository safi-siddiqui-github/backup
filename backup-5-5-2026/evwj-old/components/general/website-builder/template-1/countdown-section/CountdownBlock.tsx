import React, { useEffect, useState } from 'react';

type CountdownData = {
  title?: string;
  subtitle?: string;
  targetDate?: string;
  message?: string;
  bgColor?: string;
  textColor?: string;
  numberColor?: string;
  labelColor?: string;
  background?: {
    type: 'color' | 'image' | 'video';
    value: string;
    overlayMode?: 'color' | 'gradient';
    overlayColor?: string;
    overlayOpacity?: number;
    overlayGradient?: string;
  };
  countdownStyle?: string;
  showTitle?: boolean;
  showSubtitle?: boolean;
  showMessage?: boolean;
};

function calculateRemaining(target: Date) {
  const now = new Date().getTime();
  const diff = Math.max(0, target.getTime() - now);
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds };
}

export default function CountdownBlock({ data }: { data: CountdownData }) {
  const [remaining, setRemaining] = useState(() => {
    if (!data.targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const t = new Date(data.targetDate);
    return isNaN(t.getTime()) ? { days: 0, hours: 0, minutes: 0, seconds: 0 } : calculateRemaining(t);
  });

  useEffect(() => {
    if (!data.targetDate) {
      setRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const t = new Date(data.targetDate);
    if (isNaN(t.getTime())) {
      setRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const interval = setInterval(() => {
      setRemaining(calculateRemaining(t));
    }, 1000);
    return () => clearInterval(interval);
  }, [data.targetDate]);

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
    return data.subtitle || "Don't miss out on this amazing event";
  };

  const renderBackground = () => {
    const bg = data.background;
    if (!bg) return null;
    if (bg.type === 'image' && bg.value) {
      return <img src={bg.value} alt="background" className="absolute inset-0 w-full h-full object-cover" />;
    }
    if (bg.type === 'video' && bg.value) {
      return <video src={bg.value} className="absolute inset-0 w-full h-full object-cover" muted loop playsInline autoPlay />;
    }
    if (bg.type === 'color' && bg.value) {
      return <div className="absolute inset-0" style={{ backgroundColor: bg.value }} />;
    }
    return null;
  };

  const renderOverlay = () => {
    const bg = data.background;
    if (!bg) return null;
    if (bg.overlayMode === 'gradient' && bg.overlayGradient) {
      return <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: bg.overlayGradient }} />;
    }
    if (bg.overlayColor) {
      const hex = bg.overlayColor;
      const op = typeof bg.overlayOpacity === 'number' ? bg.overlayOpacity : 0.4;
      const h = hex.replace('#', '');
      const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
      const int = parseInt(full, 16);
      const r = (int >> 16) & 255;
      const g = (int >> 8) & 255;
      const b = int & 255;
      return <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${op})` }} />;
    }
    return null;
  };

  const sectionStyle: React.CSSProperties = {};
  if (data.bgColor && !data.background) sectionStyle.backgroundColor = data.bgColor;

  const textStyle: React.CSSProperties = {};
  if (data.textColor) textStyle.color = data.textColor;

  const numberStyle: React.CSSProperties = {};
  if (data.numberColor) numberStyle.color = data.numberColor;

  const labelStyle: React.CSSProperties = {};
  if (data.labelColor) labelStyle.color = data.labelColor;

  const renderCountdown = () => {
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
              <div className="text-3xl font-bold" style={numberStyle}>{String(item.value).padStart(2, '0')}</div>
              <div className="text-xs uppercase tracking-wide" style={labelStyle}>{item.label}</div>
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
              <div className="text-2xl font-bold" style={numberStyle}>{String(item.value).padStart(2, '0')}</div>
              <div className="text-xs mt-1 uppercase tracking-wide" style={labelStyle}>{item.label}</div>
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
            <div className="text-3xl font-bold" style={numberStyle}>{String(item.value).padStart(2, '0')}</div>
            <div className="text-xs mt-1 uppercase tracking-wide" style={labelStyle}>{item.label}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section style={sectionStyle} className="p-8 text-center bg-white dark:bg-gray-900 relative overflow-hidden min-h-[300px] flex items-center justify-center">
      {renderBackground()}
      {renderOverlay()}

      <div className="relative z-10 w-full max-w-4xl">
        {(data.showTitle === true) && data.title && (
          <h2 style={textStyle} className="text-2xl font-semibold mb-4 jodit-wysiwyg" dangerouslySetInnerHTML={{ __html: data.title }} />
        )}
        {(data.showSubtitle === true) && (
          <p style={textStyle} className="mb-8 text-sm opacity-90 jodit-wysiwyg" dangerouslySetInnerHTML={{ __html: getDynamicSubtitle() }} />
        )}

        {renderCountdown()}

        {(data.showMessage === true) && data.message && (
          <p className="mt-6 text-sm opacity-80 jodit-wysiwyg" style={textStyle} dangerouslySetInnerHTML={{ __html: data.message }} />
        )}
      </div>
    </section>
  );
}
