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
    const ro = new ResizeObserver(([entry]) => setSize(entry.contentRect));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as const;
};

const preloadImages = async (urls: string[]) =>
  await Promise.all(urls.map(src => new Promise<void>(resolve => {
    const img = new Image();
    img.src = src;
    img.onload = img.onerror = () => resolve();
  })));

interface Item {
  id: string;
  img: string;
  url: string;
  width: number;
  height: number;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
  rotate?: number;
}

interface DynamicGalleryProps {
  items: Item[];
  layout?: 'masonry' | 'overlap' | 'diagonal' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
}

const DynamicGallery: React.FC<DynamicGalleryProps> = ({
  items,
  layout = 'masonry',
  scaleOnHover = true,
  hoverScale = 1.05
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const gap = 16;
  const [containerRef, { width: containerWidth }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo<GridItem[]>(() => {
    if (!containerWidth) return [];

    if (layout === 'masonry') {
      const colHeights = new Array(columns).fill(0);
      const columnWidth = (containerWidth - (columns - 1) * gap) / columns;

      return items.map(item => {
        const aspectRatio = item.height / item.width;
        const w = columnWidth;
        const h = columnWidth * aspectRatio;
        const colIndex = colHeights.indexOf(Math.min(...colHeights));
        const x = colIndex * (columnWidth + gap);
        const y = colHeights[colIndex];
        colHeights[colIndex] += h + gap;
        return { ...item, x, y, w, h };
      });
    }

    if (layout === 'overlap') {
      return items.map((item, i) => {
        const w = containerWidth / 3;
        const h = w * (item.height / item.width);
        return { ...item, x: (i % 3) * (w * 0.7), y: Math.floor(i / 3) * (h * 0.7), w, h };
      });
    }

    if (layout === 'diagonal') {
      return items.map((item, i) => {
        const w = containerWidth / 4;
        const h = w * (item.height / item.width);
        return { ...item, x: i * (w / 2) % containerWidth, y: i * (h / 2), w, h };
      });
    }

    if (layout === 'random') {
      return items.map(item => {
        const w = 150 + Math.random() * 150;
        const h = 100 + Math.random() * 200;
        return {
          ...item,
          x: Math.random() * (containerWidth - w),
          y: Math.random() * 800,
          w,
          h,
          rotate: (Math.random() - 0.5) * 10
        };
      });
    }

    return [];
  }, [items, columns, containerWidth, layout]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps: any = { x: item.x, y: item.y, width: item.w, height: item.h, rotate: item.rotate || 0 };

      if (!hasMounted.current) {
        gsap.fromTo(
          selector,
          { opacity: 0, ...animProps, scale: 0.8 },
          { opacity: 1, ...animProps, scale: 1, duration: 0.8, ease: 'power3.out', delay: index * 0.05 }
        );
      } else {
        gsap.to(selector, { ...animProps, duration: 0.6, ease: 'power3.out' });
      }
    });

    hasMounted.current = true;
  }, [grid, imagesReady]);

  const handleMouseEnter = (id: string) => {
    if (scaleOnHover) gsap.to(`[data-key="${id}"]`, { scale: hoverScale, duration: 0.3 });
  };

  const handleMouseLeave = (id: string) => {
    if (scaleOnHover) gsap.to(`[data-key="${id}"]`, { scale: 1, duration: 0.3 });
  };

  const containerHeight = useMemo(() => {
    if (!grid.length) return 0;
    return Math.max(...grid.map(item => item.y + item.h)) + gap;
  }, [grid]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden" style={{ height: containerHeight }}>
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute cursor-pointer rounded-xl shadow-lg overflow-hidden"
          onClick={() => window.open(item.url, '_blank', 'noopener')}
          onMouseEnter={() => handleMouseEnter(item.id)}
          onMouseLeave={() => handleMouseLeave(item.id)}
          style={{ willChange: 'transform, width, height, rotate' }}
        >
          <div
            className="w-full h-full bg-cover bg-center transition-all"
            style={{ backgroundImage: `url(${item.img})` }}
          />
        </div>
      ))}
    </div>
  );
};

export default DynamicGallery;
