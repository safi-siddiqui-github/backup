"use client";

import React, { useEffect, useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import type { HeroData } from './types';
import { Input } from '@/components/ui/input';

function hexToRgb(hex: string) {
  if (!hex || typeof hex !== 'string') return { r: 0, g: 0, b: 0 };
  const cleaned = hex.trim().replace('#', '');
  const full = cleaned.length === 3 ? cleaned.split('').map(c => c + c).join('') : cleaned;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return { r: 0, g: 0, b: 0 };
  const int = parseInt(full, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return { r, g, b };
}

function hexWithAlpha(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex || '#000000');
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const OverlaySettings = ({ localBgData, updateLocal }: { localBgData: Partial<HeroData>; updateLocal: (field: keyof HeroData, value: any) => void }) => {
  const [colorA, setColorA] = useState('#000000');
  const [colorB, setColorB] = useState('#000000');
  const [alphaA, setAlphaA] = useState(60);
  const [alphaB, setAlphaB] = useState(20);
  const [angle, setAngle] = useState(180);

  useEffect(() => {
    const g = localBgData.overlayGradient;
    const mode = localBgData.overlayMode ?? 'color';
    if (mode === 'gradient' && typeof g === 'string') {
      const m = g.match(/linear-gradient\s*\(\s*([0-9]+)deg\s*,\s*rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)\s*,\s*rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)\s*\)/i);
      if (m) {
        const ang = parseInt(m[1], 10);
        const r1 = parseInt(m[2], 10), g1 = parseInt(m[3], 10), b1 = parseInt(m[4], 10), a1 = parseFloat(m[5]);
        const r2 = parseInt(m[6], 10), g2 = parseInt(m[7], 10), b2 = parseInt(m[8], 10), a2 = parseFloat(m[9]);
        const toHex = (r: number, g: number, b: number) => '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
        const parsedA = toHex(r1, g1, b1);
        const parsedB = toHex(r2, g2, b2);
        const parsedAlphaA = Math.round(a1 * 100);
        const parsedAlphaB = Math.round(a2 * 100);
        if (parsedA !== colorA) setColorA(parsedA);
        if (parsedB !== colorB) setColorB(parsedB);
        if (parsedAlphaA !== alphaA) setAlphaA(parsedAlphaA);
        if (parsedAlphaB !== alphaB) setAlphaB(parsedAlphaB);
        if (ang !== angle) setAngle(ang);
      }
    } else if (mode === 'color') {
      const c = localBgData.overlayColor ?? '#000000';
      const op = Math.round(((localBgData.overlayOpacity ?? 0.4) * 100));
      if (c !== colorA) setColorA(c);
      if (op !== alphaA) setAlphaA(op);
      const defaultB = Math.max(0, op - 40);
      if (c !== colorB) setColorB(c);
      if (defaultB !== alphaB) setAlphaB(defaultB);
      if (180 !== angle) setAngle(180);
    }
  }, [localBgData.overlayGradient, localBgData.overlayColor, localBgData.overlayOpacity, localBgData.overlayMode]);

  const lastSentGradient = React.useRef<string | null>(null);
  const sendTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const gradient = `linear-gradient(${angle}deg, ${hexWithAlpha(colorA, alphaA / 100)}, ${hexWithAlpha(colorB, alphaB / 100)})`;
    if ((localBgData.overlayMode ?? 'color') === 'gradient') {
      const current = (localBgData.overlayGradient || '').trim();
      if (current === gradient.trim() || lastSentGradient.current === gradient.trim()) return;
      if (sendTimer.current) {
        clearTimeout(sendTimer.current);
      }
      // schedule update
      sendTimer.current = setTimeout(() => {
        updateLocal('overlayGradient', gradient);
        lastSentGradient.current = gradient.trim();
        sendTimer.current = null;
      }, 120);
    }
    return () => {
      if (sendTimer.current) {
        clearTimeout(sendTimer.current);
        sendTimer.current = null;
      }
    };
  }, [colorA, colorB, alphaA, alphaB, angle, localBgData.overlayMode, localBgData.overlayGradient]);

  return (
    <fieldset className="border p-4 rounded-md dark:border-gray-700">
    <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 px-1">Overlay Settings</legend>
    <div className="space-y-3">
      <div>
        <Label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Mode</Label>
        <div className="flex items-center gap-4 mt-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="overlayMode" value="color" checked={(localBgData.overlayMode ?? 'color') === 'color'} onChange={() => updateLocal('overlayMode', 'color')} />
            <span>Color</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="overlayMode" value="gradient" checked={(localBgData.overlayMode ?? 'color') === 'gradient'} onChange={() => updateLocal('overlayMode', 'gradient')} />
            <span>Gradient</span>
          </label>
        </div>
      </div>

      {(localBgData.overlayMode ?? 'color') === 'color' ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="block text-xs text-gray-600 dark:text-gray-300">Color</Label>
              <input title="Overlay color" type="color" value={localBgData.overlayColor || '#000000'} onChange={(e) => updateLocal('overlayColor', e.target.value)} className="mt-1 h-8 w-full p-0 border rounded-md dark:bg-gray-700" />
            </div>
            <div>
              <Label className="block text-xs text-gray-600 dark:text-gray-300">Opacity</Label>
              <div className="flex gap-2 items-center mt-1">
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[Math.round(((localBgData.overlayOpacity ?? 0.4) * 100))]}
                  onValueChange={(value) => updateLocal('overlayOpacity', value[0] / 100)}
                  className="flex-1"
                />
                <span className="text-xs text-gray-500 w-12 text-right">
                  {Math.round((localBgData.overlayOpacity ?? 0.4) * 100)}%
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label className="block text-xs text-gray-600 dark:text-gray-300">Preview</Label>
            <div className="mt-2 rounded overflow-hidden border relative" style={{ background: hexWithAlpha(localBgData.overlayColor || '#000000', (localBgData.overlayOpacity ?? 0.4)) }}>
              <div className="h-14" />
              <div className="absolute inset-0 flex items-end justify-end p-2">
                <div className="bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {Math.round((localBgData.overlayOpacity ?? 0.4) * 100)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <Label className="block text-xs text-gray-600 dark:text-gray-300">Gradient Builder</Label>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="block text-xs text-gray-500">Start Color</Label>
              <Input type="color" value={colorA} onChange={(e) => setColorA(e.target.value)} className="mt-1 h-8 w-full p-0 border rounded-md" />
              <div className="flex items-center gap-2 mt-2">
                <Label className="text-xs">Depth</Label>
                <Slider min={0} max={100} step={1} value={[Math.round(alphaA)]} onValueChange={(val) => setAlphaA(val[0])} className="flex-1" />
                <span className="text-xs w-10 text-right">{Math.round(alphaA)}%</span>
              </div>
            </div>

            <div>
              <Label className="block text-xs text-gray-500">End Color</Label>
              <Input type="color" value={colorB} onChange={(e) => setColorB(e.target.value)} className="mt-1 h-8 w-full p-0 border rounded-md" />
              <div className="flex items-center gap-2 mt-2">
                <Label className="text-xs">Depth</Label>
                <Slider min={0} max={100} step={1} value={[Math.round(alphaB)]} onValueChange={(val) => setAlphaB(val[0])} className="flex-1" />
                <span className="text-xs w-10 text-right">{Math.round(alphaB)}%</span>
              </div>
            </div>
          </div>

          <div>
            <Label className="block text-xs text-gray-500">Angle</Label>
            <div className="flex items-center gap-3 mt-1">
              <Slider min={0} max={360} step={1} value={[angle]} onValueChange={(val) => setAngle(val[0])} className="flex-1" />
              <span className="text-xs w-12 text-right">{angle}°</span>
            </div>
          </div>


          <div>
            <Label className="block text-xs text-gray-600 dark:text-gray-300">Preview</Label>
            <div className="mt-2 rounded overflow-hidden border relative" style={{ background: localBgData.overlayGradient || `linear-gradient(${angle}deg, ${hexWithAlpha(colorA, alphaA/100)}, ${hexWithAlpha(colorB, alphaB/100)})` }}>
              <div className="h-20" />
              <div className="absolute left-2 top-2 bg-black/40 text-white text-xs px-2 py-1 rounded">
                {Math.round(alphaA)}% • {Math.round(alphaB)}% • {angle}°
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  </fieldset>
);
};
 
export default OverlaySettings;
