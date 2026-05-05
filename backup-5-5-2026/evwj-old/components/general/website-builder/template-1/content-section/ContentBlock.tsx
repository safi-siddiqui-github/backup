import React from 'react';

type ContentData = {
  title?: string;
  content?: string;
  background?: {
    type: 'color' | 'image' | 'video';
    value: string;
    overlayMode?: 'color' | 'gradient';
    overlayColor?: string;
    overlayOpacity?: number;
    overlayGradient?: string;
  };
  showTitle?: boolean;
  showContent?: boolean;
  textSize?: 'small' | 'medium' | 'large';
  titleSize?: 'small' | 'medium' | 'large';
  contentSize?: 'small' | 'medium' | 'large';
  size?: 'small' | 'medium' | 'large';
  textColor?: string;
  titleColor?: string;
  contentColor?: string;
  showButton?: boolean;
  buttonText?: string;
  buttonUrl?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  buttonBgOpacity?: number;
};

export default function ContentBlock({ data }: { data: ContentData }) {
  const renderBackground = () => {
    const bg = data.background;
    if (!bg) return null;
    if (bg.type === 'image') {
      return <img src={bg.value} alt="background" className="absolute inset-0 w-full h-full object-cover" />;
    }
    if (bg.type === 'video') {
      return <video src={bg.value} className="absolute inset-0 w-full h-full object-cover" muted loop playsInline />;
    }
    if (bg.type === 'color') {
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

  const titleStyle: React.CSSProperties = {};
  const contentStyle: React.CSSProperties = {};
  if (data.titleColor) titleStyle.color = data.titleColor;
  if (data.contentColor) contentStyle.color = data.contentColor;
  if (!data.titleColor && data.textColor) titleStyle.color = data.textColor;
  if (!data.contentColor && data.textColor) contentStyle.color = data.textColor;

  const titleSize = (data as any).titleSize || data.textSize || 'medium';
  const contentSize = (data as any).contentSize || data.textSize || 'medium';
  const titleClass = titleSize === 'small' ? 'text-sm' : titleSize === 'large' ? 'text-2xl' : 'text-xl';
  const contentClass = contentSize === 'small' ? 'text-xs' : contentSize === 'large' ? 'text-base' : 'text-sm';

  const blockSize = data.size || 'medium';
  const paddingClass = blockSize === 'small' ? 'p-4' : blockSize === 'large' ? 'p-12' : 'p-6';
  const minHeightClass = blockSize === 'small' ? 'min-h-[160px]' : blockSize === 'large' ? 'min-h-[420px]' : 'min-h-[260px]';

  return (
    <section className={`  ${paddingClass} ${minHeightClass} bg-white dark:bg-gray-900 relative overflow-hidden`}>
      {renderBackground()}
      {renderOverlay()}

      <div className="relative z-10">
        {(data.showTitle !== false) && data.title && (
          <h3 style={titleStyle} className={`${titleClass} font-semibold text-center jodit-wysiwyg`} dangerouslySetInnerHTML={{ __html: data.title }} />
        )}

        {(data.showContent !== false) ? (
          <div style={contentStyle} className={`mt-3 text-center ${contentClass} prose prose-sm max-w-none jodit-wysiwyg`} dangerouslySetInnerHTML={{ __html: data.content || '<p class="text-gray-400">Add your content here. You can include multiple paragraphs and format the text as needed.</p>' }} />
        ) : null}

        {data.showButton && (
          <div className="mt-6 flex justify-center">
            <a
              href={data.buttonUrl || '#'}
              className="inline-block rounded-md px-6 py-3 font-medium text-sm transition-colors hover:opacity-90"
              style={{
                backgroundColor: data.buttonBgColor || '#8f38f2',
                color: data.buttonTextColor || '#ffffff',
              }}
            >
              {data.buttonText || 'Learn More'}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
