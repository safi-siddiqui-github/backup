import React from 'react';

export default function FooterBlock({ data }: { data: any }) {
  const isDark = typeof data?.dark === 'boolean' ? data.dark : false;
  const bg = data?.bgColor ?? (isDark ? '#0f172a' : '#f8fafc');
  const text = data?.textColor ?? (isDark ? '#e6f1ff' : '#0f172a');
  const borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  const getBackgroundStyle = () => {
    const bgType = data?.bgType || 'solid';

    if (bgType === 'image' && data?.bgImageUrl) {
      return {
        backgroundImage: `url('${data.bgImageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      };
    }

    if (bgType === 'video') {
      return {
        backgroundColor: data?.bgColor || '#000000',
      };
    }

    return { backgroundColor: bg };
  };

  const getOverlayStyle = (): React.CSSProperties => {
    if (data?.bgType === 'solid' || !data?.bgType) {
      return {};
    }

    const overlayMode = data?.overlayMode || 'color';

    if (overlayMode === 'gradient') {
      return {
        background: data?.overlayGradient || 'linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.2))',
      };
    }

    if (data?.overlayColor) {
      const hex = data.overlayColor;
      const h = hex.replace('#', '');
      const full = h.length === 3 ? h.split('').map((c: string) => c + c).join('') : h;
      const int = parseInt(full, 16);
      const r = (int >> 16) & 255;
      const g = (int >> 8) & 255;
      const b = int & 255;
      const opacity = data?.overlayOpacity ?? 0.4;
      return {
        backgroundColor: `rgba(${r}, ${g}, ${b}, ${opacity})`,
      };
    }

    return {};
  };

  const linkStyle: React.CSSProperties = { color: text };

  return (
    <footer
      aria-labelledby="footer-heading"
      className="relative py-8 overflow-hidden"
      style={getBackgroundStyle()}
    >
      {data?.bgType === 'video' && data?.bgVideoUrl && (
        <video
          src={data.bgVideoUrl}
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {(data?.bgType === 'image' || data?.bgType === 'video') && (
        <div
          className="absolute inset-0 pointer-events-none z-1"
          style={getOverlayStyle()}
        />
      )}

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="max-w-xl">
              {data?.showLogo && data?.logoUrl ? (
                <>
                  <div className="flex items-center gap-4">
                    <img src={data.logoUrl} alt="Footer Logo" className="h-16 w-16 object-contain shrink-0 rounded-lg" />
                  </div>
                  {data?.showDescription !== false && data?.description && (
                    <div className="mt-4 text-sm leading-relaxed" style={{ color: text }}>
                      <div dangerouslySetInnerHTML={{ __html: data.description }} />
                    </div>
                  )}
                </>
              ) : data?.showTitle !== false ? (
                <>
                  <div id="footer-heading" className="font-semibold text-lg leading-tight" style={{ color: text }}>
                    <div dangerouslySetInnerHTML={{ __html: data?.title || 'About' }} />
                  </div>
                  {data?.showDescription !== false && data?.description && (
                    <div className="mt-2 text-sm leading-relaxed" style={{ color: text }}>
                      <div dangerouslySetInnerHTML={{ __html: data.description }} />
                    </div>
                  )}
                </>
              ) : null}
            </div>

            {Array.isArray(data?.col1) && data.col1.length > 0 && (
              <nav aria-label={data?.col1Title || 'Resources'}>
                <h4 className="font-semibold text-sm" style={{ color: text }}>{data?.col1Title || 'Resources'}</h4>
                <ul className="mt-2 grid grid-cols-1 gap-2 text-sm">
                  {data.col1.map((l: any, i: number) => (
                    <li key={i}>
                      <a
                        href={l?.href || '#'}
                        style={linkStyle}
                        className="block rounded px-2 py-1 transition-colors duration-150 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        aria-label={l?.label}
                      >
                        {l?.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {Array.isArray(data?.col2) && data.col2.length > 0 && (
              <nav aria-label={data?.col2Title || 'Company'}>
                <h4 className="font-semibold text-sm" style={{ color: text }}>{data?.col2Title || 'Company'}</h4>
                <ul className="mt-2 grid grid-cols-1 gap-2 text-sm">
                  {data.col2.map((l: any, i: number) => (
                    <li key={i}>
                      <a
                        href={l?.href || '#'}
                        style={linkStyle}
                        className="block rounded px-2 py-1 transition-colors duration-150 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        aria-label={l?.label}
                      >
                        {l?.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>

          <div className="mt-6 border-t pt-4 text-sm" style={{ borderColor }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-sm" style={{ color: text }}>{data?.copyright ?? `© ${new Date().getFullYear()} EventDome`}</div>
              <div className="text-sm" style={{ color: text }}>{data?.rightText ?? ''}</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
