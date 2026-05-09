import React, { useState } from 'react';
import {
  ArrowLeft,
  Pencil,
  Monitor,
  MousePointer2,
  Tablet,
  Smartphone,
  Undo,
  Redo,
  Eye,
  Save,
  Menu,
  Sun,
  Moon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  onToggleSidebar?: () => void;
  onToggleDark?: () => void;
  isDark?: boolean;
  onChangeViewport?: (v: 'desktop' | 'tablet' | 'mobile') => void;
  viewport: 'desktop' | 'tablet' | 'mobile';
  setViewport: (v: 'desktop' | 'tablet' | 'mobile') => void;
};

export default function WebBuilderHeader({ onToggleSidebar, onToggleDark, isDark, onChangeViewport, viewport, setViewport }: Props) {


  const handleViewport = (v: 'desktop' | 'tablet' | 'mobile') => {
    setViewport(v);
    if (typeof onChangeViewport === 'function') onChangeViewport(v);
  };

  const iconSize = 16;
  const iconStrokeWidth = 2;

  return (
    <header className="w-full bg-linear-to-r from-sky-500 to-indigo-600 shadow-md">
      <div className="mx-auto flex w-full max-w-8xl items-center justify-between px-4 py-3 font-sans">

        <div className="flex items-center gap-3">
          <button onClick={onToggleSidebar} className="lg:hidden rounded p-2 text-white/90 hover:bg-white/10" aria-label="Open sidebar">
            <Menu size={18} strokeWidth={2} />
          </button>

          <a href="#" className="flex items-center gap-2 text-sm text-white/90 hover:text-white">
            <ArrowLeft size={iconSize} strokeWidth={iconStrokeWidth} />
            Back
          </a>
          <span className="text-base font-semibold text-white">test</span>
          <button className="rounded p-1 text-white/90 hover:bg-white/10" title="Edit name">
            <Pencil size={iconSize} strokeWidth={iconStrokeWidth} />
          </button>

          <div className="hidden md:flex overflow-hidden rounded-md bg-white/10">
            <button className="relative z-10 -mr-px inline-flex items-center gap-1.5 rounded-l-md bg-white/20 px-3 py-1.5 text-sm font-medium text-white">
              <Monitor size={iconSize} strokeWidth={iconStrokeWidth} />
              Standard
            </button>
            <button className="relative inline-flex items-center gap-1.5 rounded-r-md bg-white/5 px-3 py-1.5 text-sm font-medium text-white/90">
              <MousePointer2 size={iconSize} strokeWidth={iconStrokeWidth} />
              Canvas
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1 rounded-md bg-white/10 p-1">
            <Button
              onClick={() => handleViewport('desktop')}
              aria-pressed={viewport === 'desktop'}
              className={`rounded p-1.5 ${viewport === 'desktop' ? 'text-white bg-white/20 shadow-sm' : 'text-white/80 hover:bg-white/10'}`}
              title="Desktop view"
            >
              <Monitor size={iconSize} strokeWidth={iconStrokeWidth} />
            </Button>
            <Button
              onClick={() => handleViewport('tablet')}
              aria-pressed={viewport === 'tablet'}
              className={`rounded p-1.5 ${viewport === 'tablet' ? 'text-white bg-white/20' : 'text-white/80 hover:bg-white/10'}`}
              title="Tablet view"
            >
              <Tablet size={iconSize} strokeWidth={iconStrokeWidth} />
            </Button>
            <Button
              onClick={() => handleViewport('mobile')}
              aria-pressed={viewport === 'mobile'}
              className={`rounded p-1.5 ${viewport === 'mobile' ? 'text-white bg-white/20' : 'text-white/80 hover:bg-white/10'}`}
              title="Mobile view"
            >
              <Smartphone size={iconSize} strokeWidth={iconStrokeWidth} />
            </Button>
          </div>

          <button className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-white/90" title="Undo">
            <Undo size={iconSize} strokeWidth={iconStrokeWidth} />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-white/90" title="Redo">
            <Redo size={iconSize} strokeWidth={iconStrokeWidth} />
          </button>

          <button className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-sm font-medium text-white/90">
            <Eye size={iconSize} strokeWidth={iconStrokeWidth} />
            Preview
          </button>

          <Button
            onClick={onToggleDark}
            className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-sm font-medium text-white/90"
            aria-pressed={isDark}
            title="Toggle dark mode"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </Button>

          <Button className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-slate-800 shadow-sm hover:bg-white/90">
            <Save size={iconSize} strokeWidth={iconStrokeWidth} />
            Save
          </Button>
        </div>

      </div>
    </header>
  );
}