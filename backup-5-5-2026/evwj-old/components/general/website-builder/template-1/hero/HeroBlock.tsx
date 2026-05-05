"use client";

import React, { useEffect, useRef } from 'react';
import type { HeroData } from './types';

export default function HeroBlock({
  data,
  
}: {
  data: HeroData;
 
}) {
  // === 1. Background Styling ===
  // We'll set dynamic colors via CSS variables on the wrapper to avoid inline styles.
  const wrapperRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const el = wrapperRef.current;
    // background color
    el.style.setProperty('--ev-hero-bg', data.bgColor || '#1f2937');
    // text color
    el.style.setProperty('--ev-hero-text', data.textColor || '#ffffff');
    // primary/secondary button colors
    if (data.buttonColor) el.style.setProperty('--ev-hero-btn-bg', data.buttonColor);
    if (data.buttonTextColor) el.style.setProperty('--ev-hero-btn-text', data.buttonTextColor);
    if (data.button2Color) el.style.setProperty('--ev-hero-btn2-bg', data.button2Color);
    if (data.button2TextColor) el.style.setProperty('--ev-hero-btn2-text', data.button2TextColor);

    // overlay: either gradient or rgba color
    if ((data.bgType === 'image' || data.bgType === 'video') && data.overlayMode === 'gradient' && data.overlayGradient) {
      el.style.setProperty('--ev-hero-overlay', data.overlayGradient);
    } else if ((data.bgType === 'image' || data.bgType === 'video') && data.overlayColor) {
      const hex = data.overlayColor.replace('#', '');
      if (hex.length === 6) {
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const a = typeof data.overlayOpacity === 'number' ? data.overlayOpacity : 0.4;
        el.style.setProperty('--ev-hero-overlay', `rgba(${r}, ${g}, ${b}, ${a})`);
      } else {
        el.style.setProperty('--ev-hero-overlay', data.overlayColor as string);
      }
    } else {
      el.style.setProperty('--ev-hero-overlay', 'transparent');
    }
  }, [data.bgColor, data.textColor, data.buttonColor, data.buttonTextColor, data.button2Color, data.button2TextColor, data.bgType, data.bgImageUrl, data.bgVideoUrl, data.overlayMode, data.overlayColor, data.overlayOpacity, data.overlayGradient]);

  // === 2. Text/Content Styling ===
  const titleStyle: React.CSSProperties = {};
  if (data.textColor) titleStyle.color = data.textColor;
  const subtitleStyle: React.CSSProperties = {};
  if (data.subtitleColor) subtitleStyle.color = data.subtitleColor;
  else if (data.textColor) subtitleStyle.color = data.textColor;
  const descStyle: React.CSSProperties = {};
  if (data.textColor) descStyle.color = data.textColor;
  // Only set style keys when values are provided to avoid overriding Tailwind fallbacks
  const makeStyle = (bg?: string, color?: string): React.CSSProperties => {
    const s: React.CSSProperties = {};
    if (bg) s.backgroundColor = bg;
    if (color) s.color = color;
    return s;
  };

  const primaryBtnStyle: React.CSSProperties = makeStyle(data.buttonColor, data.buttonTextColor);
 

   
  const renderSideImage = (imageOnLeft: boolean) => (
    <div className="relative z-10 w-full max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
        {imageOnLeft && (
          <div className="order-1 md:order-1">
            {(data as any).sideImageUrl || data.heroImageUrl ? (
              <img src={(data as any).sideImageUrl || data.heroImageUrl} alt={data.title || 'Hero image'} className="w-full h-80 object-cover shadow-lg" />
            ) : (
              <div className="w-full h-80 bg-gray-200 dark:bg-slate-800 flex items-center justify-center text-sm text-gray-500">Image placeholder</div>
            )}
          </div>
        )}

        <div className="order-2 md:order-2">
          <div className={`text-left`}> 
            {data.title && <div className="jodit-wysiwyg" style={titleStyle} dangerouslySetInnerHTML={{ __html: data.title }} />}
            {data.showSubtitle !== false && data.subtitle && <div className="jodit-wysiwyg" style={subtitleStyle} dangerouslySetInnerHTML={{ __html: data.subtitle }} />}
         

            {(data.buttonCount ?? 1) >= 1 && (
              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <a
                  href={data.button1Link || '#'}
                  target={data.button1Target || '_self'}
                  rel={data.button1Target === '_blank' ? 'noreferrer noopener' : undefined}
                  className={`inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold ${!data.buttonColor ? 'bg-blue-600 dark:bg-blue-500 text-white' : ''}`}
                >
                  {data.buttonText || 'Learn More'}
                </a>
                
              </div>
            )}
          </div>
        </div>

        {!imageOnLeft && (
          <div className="order-3 md:order-3">
            {(data as any).sideImageUrl || data.heroImageUrl ? (
              <img src={(data as any).sideImageUrl || data.heroImageUrl} alt={data.title || 'Hero image'} className="w-full h-80 object-cover rounded-lg shadow-lg" />
            ) : (
              <div className="w-full h-80 bg-gray-200 dark:bg-slate-800 rounded-lg flex items-center justify-center text-sm text-gray-500">Image placeholder</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
 

  return (
    <section
      ref={wrapperRef as any}
      className={`relative overflow-hidden min-h-[400px] flex items-center justify-center py-20 px-4`}
      style={data.bgType === 'solid' ? { backgroundColor: 'var(--ev-hero-bg)' } : undefined}
    >
      {/* Background Video Layer */}
      {data.bgType === 'video' && data.bgVideoUrl && (
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={data.bgVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Background Image Layer */}
      {data.bgType === 'image' && data.bgImageUrl && (
        <img src={data.bgImageUrl} alt={data.title || 'Background image'} className="absolute inset-0 w-full h-full object-cover" />
      )}
      {/* Overlay Layer */}
      {(data.bgType === 'image' || data.bgType === 'video') && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: 'var(--ev-hero-overlay)' }} />
        </div>
      )}

          {/* Content Layer */}
          {
            (() => {
              const imageUrl = data.heroImageUrl || 'https://plus.unsplash.com/premium_photo-1764533873501-bee26e5ea0f6?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

              // Helper: nicely styled subtitle (not just plain text)
              const Subtitle = ({ text }: { text: string }) => (
                <div className="jodit-wysiwyg" dangerouslySetInnerHTML={{ __html: text }} />
              );

              // Layout switch
              if (data.layoutType === 'image-left') {
                return (
                  <div className="relative z-10 w-full flex items-center justify-center">
                    {renderSideImage(true)}
                  </div>
                );
              }

              if (data.layoutType === 'image-right') {
                return (
                  <div className="relative z-10 w-full flex items-center justify-center">
                    {renderSideImage(false)}
                  </div>
                );
              }

              // Default: centered layout
              return (
                <div className="relative z-10 w-full flex flex-col items-center justify-center">
                  {data.title && (
                    <div className="jodit-wysiwyg" style={titleStyle} dangerouslySetInnerHTML={{ __html: data.title }} />
                  )}

                  {data.showSubtitle !== false && data.subtitle && <Subtitle text={data.subtitle} />}

                 

                  {(data.buttonCount ?? 1) >= 1 && (
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                      <a
                        href={data.button1Link || '#'}
                        target={data.button1Target || '_self'}
                        rel={data.button1Target === '_blank' ? 'noreferrer noopener' : undefined}
                        className={`inline-flex items-center justify-center w-full sm:w-auto rounded-lg px-6 py-3 font-semibold transition-transform hover:scale-[1.02] shadow-lg ${!data.buttonColor ? 'bg-blue-600 dark:bg-blue-500 text-white' : ''}`}
                        role="button"
                        aria-label={data.buttonText || 'Primary action'}
                        style={primaryBtnStyle}
                      >
                        {data.buttonText || 'Learn More'}
                      </a>
                    </div>
                  )}
                </div>
              );
            })()
          }
        </section>
                                        
  );
}