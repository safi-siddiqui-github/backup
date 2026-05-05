import React, { useEffect, useRef } from 'react';
import type { AboutData } from './About.types';

const hexToRgb = (hex: string, opacity?: number): string => {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const int = parseInt(full, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  if (opacity !== undefined) {
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
};

export default function AboutBlock({
  data,
  onChange,
  onDelete,
}: {
  data: AboutData;
  onChange?: (d: AboutData) => void;
  onDelete?: () => void;
}) {
  const wrapperRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const el = wrapperRef.current;
    el.style.setProperty('--ev-about-bg', data.bgColor || '#ffffff');
    el.style.setProperty('--ev-about-text', data.textColor || '#111827');
    if (data.buttonColor) el.style.setProperty('--ev-about-btn-bg', data.buttonColor);
    if (data.buttonTextColor) el.style.setProperty('--ev-about-btn-text', data.buttonTextColor);
    if (data.button2Color) el.style.setProperty('--ev-about-btn2-bg', data.button2Color);
    if (data.button2TextColor) el.style.setProperty('--ev-about-btn2-text', data.button2TextColor);

    if ((data.bgType === 'image' || data.bgType === 'video') && data.overlayMode === 'gradient' && data.overlayGradient) {
      el.style.setProperty('--ev-about-overlay', data.overlayGradient);
    } else if ((data.bgType === 'image' || data.bgType === 'video') && data.overlayColor) {
      const hex = (data.overlayColor || '').replace('#', '');
      if (hex.length === 6) {
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const a = typeof data.overlayOpacity === 'number' ? data.overlayOpacity : 0.4;
        el.style.setProperty('--ev-about-overlay', `rgba(${r}, ${g}, ${b}, ${a})`);
      } else {
        el.style.setProperty('--ev-about-overlay', data.overlayColor as string);
      }
    } else {
      el.style.setProperty('--ev-about-overlay', 'transparent');
    }
  }, [data]);

  const titleStyle: React.CSSProperties = {};
  if (data.textColor) titleStyle.color = data.textColor;

  return (
    <section
      ref={wrapperRef as any}
      className="relative overflow-hidden py-12"
      style={(data as any).background?.type === 'color' || data.layout === 'side-image' ? { backgroundColor: (data as any).background?.value || data.bgColor || '#ffffff' } : data.bgType === 'color' ? { backgroundColor: 'var(--ev-about-bg)' } : undefined}
    >
      {data.layout !== 'side-image' && ((data as any).background?.type === 'video' && (data as any).background?.value) || (data.bgType === 'video' && data.bgVideoUrl) ? (
        <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
          <source src={(data as any).background?.value || data.bgVideoUrl} />
        </video>
      ) : null}

      {data.layout !== 'side-image' && ((data as any).background?.type === 'image' && (data as any).background?.value) || (data.bgType === 'image' && data.bgImageUrl) ? (
        <img src={(data as any).background?.value || data.bgImageUrl} alt={data.title || 'About background'} className="absolute inset-0 w-full h-full object-cover" />
      ) : null}

      {data.layout !== 'side-image' && ((data as any).background?.overlayColor || (data as any).background?.overlayGradient) || (data.bgType === 'image' || data.bgType === 'video') ? (
        <div className="absolute inset-0 pointer-events-none">
          {((data as any).background?.overlayMode === 'gradient') && (data as any).background?.overlayGradient ? (
            <div className="absolute inset-0" style={{ backgroundImage: (data as any).background.overlayGradient }} />
          ) : (data as any).background?.overlayColor ? (
            <div className="absolute inset-0" style={{ backgroundColor: hexToRgb((data as any).background.overlayColor, (data as any).background.overlayOpacity) }} />
          ) : (
            <div className="absolute inset-0" style={{ background: 'var(--ev-about-overlay)' }} />
          )}
        </div>
      ) : null}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(() => {
          const layoutType = data.layout || 'center';
          
          if (layoutType === 'center') {
            return (
              <div className="max-w-3xl mx-auto text-center">
                {data.showTitle !== false && data.title && <div className="jodit-wysiwyg font-bold text-4xl leading-tight" style={titleStyle} dangerouslySetInnerHTML={{ __html: data.title }} />}
                {data.showContent !== false && data.subtitle && <div className="jodit-wysiwyg mt-2 text-lg" style={titleStyle} dangerouslySetInnerHTML={{ __html: data.subtitle }} />}
                
                {data.ctaText && data.buttonCount !== 0 && (
                  <div className="mt-6">
                    <a href={data.ctaLink || '#'} className="inline-block rounded px-5 py-2 font-semibold" style={{ background: 'var(--ev-about-btn-bg)', color: 'var(--ev-about-btn-text)' }}>{data.ctaText}</a>
                  </div>
                )}
              </div>
            );
          }
          
          if (layoutType === 'image-left') {
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                {data.imageUrl && (
                  <div className="order-1 md:order-1">
                    <img src={data.imageUrl} alt={data.title || 'About image'} className="w-full h-80 object-cover rounded-lg shadow-lg" />
                  </div>
                )}
                <div className="order-2 md:order-2">
                  {data.showTitle !== false && data.title && <div className="jodit-wysiwyg font-bold text-4xl leading-tight" style={titleStyle} dangerouslySetInnerHTML={{ __html: data.title }} />}
                  {data.showContent !== false && data.subtitle && <div className="jodit-wysiwyg mt-2 text-lg" style={titleStyle} dangerouslySetInnerHTML={{ __html: data.subtitle }} />}
                  
                  {data.ctaText && data.buttonCount !== 0 && (
                    <div className="mt-6">
                      <a href={data.ctaLink || '#'} className="inline-block rounded px-5 py-2 font-semibold" style={{ background: 'var(--ev-about-btn-bg)', color: 'var(--ev-about-btn-text)' }}>{data.ctaText}</a>
                    </div>
                  )}
                </div>
              </div>
            );
          }
          
          if (layoutType === 'image-right') {
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                <div className="order-1 md:order-1">
                  {data.showTitle !== false && data.title && <div className="jodit-wysiwyg font-bold text-4xl leading-tight" style={titleStyle} dangerouslySetInnerHTML={{ __html: data.title }} />}
                  {data.showContent !== false && data.subtitle && <div className="jodit-wysiwyg mt-2 text-lg" style={titleStyle} dangerouslySetInnerHTML={{ __html: data.subtitle }} />}
                  
                  {data.ctaText && data.buttonCount !== 0 && (
                    <div className="mt-6">
                      <a href={data.ctaLink || '#'} className="inline-block rounded px-5 py-2 font-semibold" style={{ background: 'var(--ev-about-btn-bg)', color: 'var(--ev-about-btn-text)' }}>{data.ctaText}</a>
                    </div>
                  )}
                </div>
                {data.imageUrl && (
                  <div className="order-2 md:order-2">
                    <img src={data.imageUrl} alt={data.title || 'About image'} className="w-full h-80 object-cover rounded-lg shadow-lg" />
                  </div>
                )}
              </div>
            );
          }
          
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
              <div className="order-1 md:order-1">
                {data.showTitle !== false && data.title && <div className="jodit-wysiwyg font-bold text-4xl leading-tight" style={titleStyle} dangerouslySetInnerHTML={{ __html: data.title }} />}
                {data.showContent !== false && data.subtitle && <div className="jodit-wysiwyg mt-2 text-lg" style={titleStyle} dangerouslySetInnerHTML={{ __html: data.subtitle }} />}
                
                {data.ctaText && data.buttonCount !== 0 && (
                  <div className="mt-6">
                    <a href={data.ctaLink || '#'} className="inline-block rounded px-5 py-2 font-semibold" style={{ background: 'var(--ev-about-btn-bg)', color: 'var(--ev-about-btn-text)' }}>{data.ctaText}</a>
                  </div>
                )}
              </div>
              {data.imageUrl && (
                <div className="order-2 md:order-2">
                  <img src={data.imageUrl} alt={data.title || 'About image'} className="w-full h-80 object-cover rounded-lg shadow-lg" />
                </div>
              )}
            </div>
          );
        })()}
      </div>
    </section>
  );
}
