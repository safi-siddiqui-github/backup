import React, { useMemo, useState } from 'react';

// Simple logo loop slider (CSS-based marquee) with pause-on-hover and name overlay
export default function SponsorShowcaseBlock({ data }: { data: any }) {
  const { title = 'Our Sponsors', subtitle = 'Thank you to our amazing sponsors who make this event possible', sponsors = [] } = data || {};

  const items = Array.isArray(sponsors) && sponsors.length > 0 ? sponsors : [
    { name: 'TechCorp', logo: 'https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?auto=format&fit=crop&w=600&q=80' },
    { name: 'InnovateLabs', logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80' },
    { name: 'EventCo', logo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80' },
  ];

  // Decide whether to loop: loop when more than 5 sponsors
  const shouldLoop = items.length > 5;

  // Duplicate for seamless looping when needed
  const loopItems = useMemo(() => (shouldLoop ? [...items, ...items] : items), [items, shouldLoop]);

  const animationDuration = Math.max(12, items.length * 3); // at least 12s, scale with number of items

  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>

        <div className="relative overflow-hidden">
          {/* Inline <style> for keyframes so we don't rely on global CSS */}
          <style>{`@keyframes sponsor-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
          {shouldLoop ? (
            <div
              className="flex items-center gap-6 whitespace-nowrap will-change-transform"
              style={{
                animation: `sponsor-scroll ${animationDuration}s linear infinite`,
                animationPlayState: isPaused ? 'paused' : 'running',
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => { setIsPaused(false); setHoveredIndex(null); }}
            >
              {loopItems.map((s: any, i: number) => (
                <div
                  key={`${s.name}-${i}`}
                  className="inline-flex items-center justify-center relative w-32 h-32"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <img
                    src={s.logo}
                    alt={s.name}
                    className="w-full h-full object-contain bg-transparent rounded-none p-0"
                  />

                  {/* Name overlay shown on hover */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium transition-opacity ${hoveredIndex === i ? 'opacity-100' : 'opacity-0'}`}
                    style={{ pointerEvents: 'none' }}
                  >
                    {s.name}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-6 flex-wrap">
              {loopItems.map((s: any, i: number) => (
                <div
                  key={`${s.name}-${i}`}
                  className="inline-flex items-center justify-center relative w-32 h-32"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <img
                    src={s.logo}
                    alt={s.name}
                    className="w-20 h-20  object-cover bg-transparent rounded-none  "
                  />

                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-medium transition-opacity ${hoveredIndex === i ? 'opacity-100' : 'opacity-0'}`}
                    style={{ pointerEvents: 'none' }}
                  >
                    {s.name}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Hint: pause on hover */}
          <div className="sr-only">Hover logos to pause and reveal the sponsor name</div>
        </div>
      </div>
    </section>
  );
}
