import { useState, useEffect, useCallback, RefObject } from 'react';

interface ContainerBounds {
  width: number;
  height: number;
  left: number;
  top: number;
}

export const useContainerBounds = (containerRef: RefObject<HTMLElement>) => {
  const [bounds, setBounds] = useState<ContainerBounds>({
    width: 0,
    height: 0,
    left: 0,
    top: 0
  });

  const updateBounds = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setBounds({
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top
      });
    }
  }, []);

  useEffect(() => {
    updateBounds();
    
    const resizeObserver = new ResizeObserver(updateBounds);
    const scrollHandler = () => updateBounds();
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    window.addEventListener('resize', updateBounds);
    window.addEventListener('scroll', scrollHandler);
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [updateBounds]);

  const isWithinBounds = useCallback((x: number, y: number, width: number, height: number) => {
    return (
      x >= 0 &&
      y >= 0 &&
      x + width <= bounds.width &&
      y + height <= bounds.height
    );
  }, [bounds]);

  const constrainToBounds = useCallback((x: number, y: number, width: number, height: number) => {
    const minWidth = 100;
    const minHeight = 60;
    const maxWidth = bounds.width || 1200;
    const maxHeight = bounds.height || 800;
    
    // Ensure minimum dimensions
    const safeWidth = Math.max(minWidth, width);
    const safeHeight = Math.max(minHeight, height);
    
    // Constrain to container bounds
    const constrainedWidth = Math.min(safeWidth, maxWidth - Math.max(0, x));
    const constrainedHeight = Math.min(safeHeight, maxHeight - Math.max(0, y));
    const constrainedX = Math.max(0, Math.min(x, maxWidth - constrainedWidth));
    const constrainedY = Math.max(0, Math.min(y, maxHeight - constrainedHeight));
    
    return {
      x: constrainedX,
      y: constrainedY,
      width: constrainedWidth,
      height: constrainedHeight
    };
  }, [bounds]);

  return {
    bounds,
    updateBounds,
    isWithinBounds,
    constrainToBounds
  };
};