"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Palette, Monitor, Film } from "lucide-react";

type FooterBackgroundModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentBg: {
    bgType?: string;
    bgColor?: string;
    bgImageUrl?: string;
    bgVideoUrl?: string;
    overlayMode?: string;
    overlayColor?: string;
    overlayOpacity?: number;
    overlayGradient?: string;
  };
  onSelectBg: (data: any) => void;
};

const dummyBackgrounds = [
  { id: "img1", type: "image", imageUrl: "https://images.unsplash.com/photo-1763760523160-4b6f9375ddc5?q=80&w=409&auto=format&fit=crop&ixlib=rb-4.1.0", label: "Mountains" },
  { id: "img2", type: "image", imageUrl: "https://images.unsplash.com/photo-1763718678099-fdb5c2f9cc50?q=80&w=813&auto=format&fit=crop&ixlib=rb-4.1.0", label: "Citrus" },
];

export default function FooterBackgroundModal({ isOpen, onClose, currentBg, onSelectBg }: FooterBackgroundModalProps) {
  if (!isOpen) return null;

  const [bgSelectionTab, setBgSelectionTab] = useState<"color" | "image" | "video">(
    currentBg.bgType === "video" ? "video" : currentBg.bgType === "image" ? "image" : "color"
  );
  const [localBgData, setLocalBgData] = useState({
    bgType: currentBg.bgType || "solid",
    bgColor: currentBg.bgColor || "#ffffff",
    bgImageUrl: currentBg.bgImageUrl || "",
    bgVideoUrl: currentBg.bgVideoUrl || "",
    overlayMode: currentBg.overlayMode || "color",
    overlayColor: currentBg.overlayColor || "#000000",
    overlayOpacity: currentBg.overlayOpacity || 0.4,
    overlayGradient: currentBg.overlayGradient || "linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.2))",
  });

  const [localObjectUrl, setLocalObjectUrl] = useState<string | null>(null);
  const [localVideoObjectUrl, setLocalVideoObjectUrl] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    return () => {
      if (localObjectUrl) try { URL.revokeObjectURL(localObjectUrl); } catch (e) {}
      if (localVideoObjectUrl) try { URL.revokeObjectURL(localVideoObjectUrl); } catch (e) {}
    };
  }, [localObjectUrl, localVideoObjectUrl]);

  const handleClose = () => {
    setMounted(false);
    setTimeout(() => onClose(), 220);
  };

  const handleApply = () => {
    onSelectBg({ ...localBgData });
    handleClose();
  };

  const updateLocal = (field: string, value: any) => {
    setLocalBgData((prev) => ({ ...prev, [field]: value }));
  };

  const hexToRgb = (hex: string) => {
    const h = hex.replace("#", "");
    const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    const int = parseInt(full, 16);
    const r = (int >> 16) & 255;
    const g = (int >> 8) & 255;
    const b = int & 255;
    return { r, g, b };
  };

  const overlayBackground = () => {
    if (localBgData.overlayMode === "gradient") {
      return localBgData.overlayGradient;
    }
    const color = localBgData.overlayColor;
    const opacity = localBgData.overlayOpacity;
    const { r, g, b } = hexToRgb(color);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${mounted ? "opacity-100" : "opacity-0"}`}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      <div className={`relative bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col border border-white/10 transition-all duration-300 transform ${mounted ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"}`}>
        <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
          <h3 className="text-xl font-semibold dark:text-white">Footer Background</h3>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 grow overflow-y-auto">
          <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 mb-4">
            <button
              onClick={() => setBgSelectionTab("color")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${bgSelectionTab === "color" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 dark:text-gray-400"}`}
            >
              <Palette size={16} />
              Color
            </button>
            <button
              onClick={() => setBgSelectionTab("image")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${bgSelectionTab === "image" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 dark:text-gray-400"}`}
            >
              <Monitor size={16} />
              Image
            </button>
            <button
              onClick={() => setBgSelectionTab("video")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${bgSelectionTab === "video" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 dark:text-gray-400"}`}
            >
              <Film size={16} />
              Video
            </button>
          </div>

          {bgSelectionTab === "color" && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Background Color</label>
              <input
                type="color"
                value={localBgData.bgColor || "#ffffff"}
                onChange={(e) => {
                  updateLocal("bgColor", e.target.value);
                  updateLocal("bgType", "solid");
                }}
                className="w-full h-12 p-1 border rounded-md cursor-pointer dark:bg-gray-700"
              />
              <div className="mt-4 p-4 rounded-lg border dark:border-gray-700" style={{ backgroundColor: localBgData.bgColor }}>
                <p className="text-xs text-gray-500">Preview</p>
              </div>
            </div>
          )}

          {bgSelectionTab === "image" && (
            <div className="space-y-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">Upload an image or choose a preset.</div>
              
              {localObjectUrl || localBgData.bgImageUrl ? (
                <div className="relative w-full rounded-lg overflow-hidden border bg-black/5">
                  <div className="aspect-video w-full h-auto bg-gray-100 dark:bg-gray-800 relative">
                    <img src={localObjectUrl || localBgData.bgImageUrl} alt="preview" className="w-full h-full object-cover" />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (localObjectUrl) try { URL.revokeObjectURL(localObjectUrl); } catch (e) { /* ignore */ }
                      setLocalObjectUrl(null);
                      updateLocal("bgImageUrl", "");
                      updateLocal("bgType", localBgData.bgColor ? "solid" : undefined);
                    }}
                    className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1 shadow border"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="w-full aspect-video rounded-lg border-dashed border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-sm text-gray-500">
                  No image selected
                </div>
              )}

              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border text-sm"
              >
                Upload Image
              </button>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const url = URL.createObjectURL(f);
                  if (localObjectUrl) try { URL.revokeObjectURL(localObjectUrl); } catch (e) {}
                  setLocalObjectUrl(url);
                  updateLocal("bgType", "image");
                  updateLocal("bgImageUrl", url);
                }}
                className="hidden"
              />

              <div className="grid grid-cols-2 gap-2">
                {dummyBackgrounds.map((bg) => (
                  <div
                    key={bg.id}
                    className={`relative w-full h-24 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${bg.imageUrl === localBgData.bgImageUrl ? "border-blue-500 ring-2 ring-blue-500" : "border-gray-200 dark:border-gray-600 hover:border-blue-300"}`}
                    onClick={() => {
                      updateLocal("bgType", "image");
                      updateLocal("bgImageUrl", bg.imageUrl);
                    }}
                  >
                    <img src={bg.imageUrl} alt={bg.label} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-end p-1 bg-gradient-to-t from-black/30 text-white text-xs">
                      <span>{bg.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {bgSelectionTab === "video" && (
            <div className="space-y-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">Upload a video file (MP4).</div>

              {localVideoObjectUrl || localBgData.bgVideoUrl ? (
                <div className="relative w-full rounded-lg overflow-hidden border bg-black/5">
                  <div className="aspect-video w-full h-auto bg-black">
                    <video
                      src={localVideoObjectUrl || localBgData.bgVideoUrl}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      controls
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (localVideoObjectUrl) try { URL.revokeObjectURL(localVideoObjectUrl); } catch (e) {}
                      setLocalVideoObjectUrl(null);
                      updateLocal("bgVideoUrl", "");
                      updateLocal("bgType", localBgData.bgColor ? "solid" : undefined);
                    }}
                    className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1 shadow border"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="w-full aspect-video rounded-lg border-dashed border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-sm text-gray-500">
                  No video selected
                </div>
              )}

              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border text-sm"
              >
                Upload Video
              </button>
              <input
                ref={videoInputRef}
                type="file"
                accept="video/mp4,video/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const url = URL.createObjectURL(f);
                  if (localVideoObjectUrl) try { URL.revokeObjectURL(localVideoObjectUrl); } catch (e) {}
                  setLocalVideoObjectUrl(url);
                  updateLocal("bgType", "video");
                  updateLocal("bgVideoUrl", url);
                }}
                className="hidden"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 p-4 border-t dark:border-gray-700">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
