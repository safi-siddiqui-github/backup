import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

interface Item {
  id: string;
  img: string;
  url: string;
  width: number; // original image width
  height: number; // original image height
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number; // computed width
  h: number; // computed height
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const gap = useMedia(
    ['(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [16, 12, 8],
    6
  );

  const [containerRef, { width: containerWidth }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  // Compute Masonry layout with variable heights and widths
  const grid = useMemo<GridItem[]>(() => {
    if (!containerWidth) return [];

    const colHeights = new Array(columns).fill(0);
    const totalGap = (columns - 1) * gap;
    const columnWidth = (containerWidth - totalGap) / columns;

    return items.map(item => {
      const aspectRatio = item.height / item.width;
      const w = columnWidth; // each column has same width
      const h = columnWidth * aspectRatio; // variable height based on aspect ratio

      // place in shortest column
      const colIndex = colHeights.indexOf(Math.min(...colHeights));
      const x = colIndex * (columnWidth + gap);
      const y = colHeights[colIndex];

      colHeights[colIndex] += h + gap;

      return { ...item, x, y, w, h };
    });
  }, [columns, items, containerWidth, gap]);

  const hasMounted = useRef(false);

  const getInitialPosition = (item: GridItem) => {
    switch (animateFrom) {
      case 'top':
        return { x: item.x, y: -item.h - 100 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 100 };
      case 'left':
        return { x: -item.w - 100, y: item.y };
      case 'right':
        return { x: window.innerWidth + 100, y: item.y };
      case 'center':
        return { x: containerWidth / 2 - item.w / 2, y: 100 };
      case 'random':
      default:
        return { x: item.x, y: Math.random() * window.innerHeight };
    }
  };

  // Animate items on mount and on resize
  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: 'blur(10px)' })
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger
          }
        );
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: 'auto'
        });
      }
    });

    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease, containerWidth]);

  const containerHeight = useMemo(() => {
    if (!grid.length) return 0;
    return Math.max(...grid.map(item => item.y + item.h)) + gap;
  }, [grid, gap]);

  // Hover effects
  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (scaleOnHover) gsap.to(`[data-key="${id}"]`, { scale: hoverScale, duration: 0.3 });
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }
  };

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (scaleOnHover) gsap.to(`[data-key="${id}"]`, { scale: 1, duration: 0.3 });
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden" style={{ height: containerHeight }}>
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute"
          style={{ willChange: 'transform, width, height, opacity' }}
          onClick={() => window.open(item.url, '_blank', 'noopener')}
          onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}
          onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}
        >
          <div
            className="relative w-full h-full bg-cover bg-center rounded-lg shadow-lg cursor-pointer transition-all"
            style={{ backgroundImage: `url(${item.img})` }}
          >
            {colorShiftOnHover && (
              <div className="color-overlay absolute inset-0 rounded-lg bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
