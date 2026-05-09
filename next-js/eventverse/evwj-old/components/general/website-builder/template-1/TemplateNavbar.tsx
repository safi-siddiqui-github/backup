"use client";

import React, { useState } from "react";
import { Menu, X, Pencil, Monitor, Tablet, Smartphone } from "lucide-react";

type Page = { id: string; title: string; slug: string; blocks: any[] };

export default function TemplateNavbar({
  pages,
  currentPageId,
  onSelectPage,
  onAddPage,
  settings,
  onEdit,
  viewport,
  setViewport,
}: {
  pages: Page[];
  currentPageId: string;
  onSelectPage: (id: string) => void;
  onAddPage: (title?: string) => void;
  settings?: {
    logoText?: string;
    logoUrl?: string;
    bg?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    showAuth?: boolean;
  };
  onEdit?: () => void;
  viewport: "desktop" | "tablet" | "mobile";
  setViewport: (v: "desktop" | "tablet" | "mobile") => void;
}) {
  const [open, setOpen] = useState(false);
  const rawBg =
    settings?.bg ||
    "bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F97316]";
  const isClassBg = typeof rawBg === "string" && rawBg.trim().startsWith("bg-");
  const wrapperClass = isClassBg ? rawBg : "";
  const wrapperStyle: React.CSSProperties | undefined = isClassBg
    ? undefined
    : { background: rawBg };
  const btnColor = settings?.buttonColor || "#ffffff";
  const btnTextColor = settings?.buttonTextColor || "#4f46e5";

  return (
    <div className="mb-0 shadow-xl group relative overflow-hidden">
      <div
        className={`${wrapperClass} flex items-center justify-between px-4 py-3 text-white`}
        style={wrapperStyle}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 shadow-inner backdrop-blur-lg flex items-center justify-center text-sm font-bold">
            {settings?.logoUrl ? (
              <img
                src={settings.logoUrl}
                alt="logo"
                className="w-9 h-9 object-cover rounded"
              />
            ) : (
              (settings?.logoText || "ED").slice(0, 2)
            )}
          </div>
          <div className="leading-tight">
            <div className="font-semibold text-base">
              {settings?.logoText || "EventDome"}
            </div>
            <div className="text-xs opacity-90">Website Builder</div>
          </div>
        </div>

        <div className="hidden md:flex flex-1 mx-6">
          <div className="flex items-center gap-2">
            {pages.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectPage(p.id)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${
                  p.id === currentPageId
                    ? "bg-white text-indigo-700 shadow-lg scale-105"
                    : "bg-white/20 text-white hover:bg-white/40"
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {settings?.showAuth !== false && (
            <>
              <button className="text-sm px-4 py-1.5 rounded-md bg-white/20 hover:bg-white/30 backdrop-blur-md">
                Login
              </button>
              <button
                style={{ backgroundColor: btnColor, color: btnTextColor }}
                className="text-sm px-4 py-1.5 rounded-md font-semibold shadow-md"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden bg-white/20 p-2 rounded-lg backdrop-blur-md"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white text-gray-700 shadow-xl p-4 space-y-3">
          <div className="flex flex-col gap-2">
            {pages.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setOpen(false);
                  onSelectPage(p.id);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                  p.id === currentPageId
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          {settings?.showAuth !== false && (
            <div className="flex flex-col gap-2 pt-2">
              <button className="px-4 py-2 rounded-md bg-gray-100">
                Login
              </button>
              <button
                className="px-4 py-2 rounded-md font-semibold"
                style={{ backgroundColor: btnColor, color: btnTextColor }}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}

      {onEdit && (
        <button
          onClick={onEdit}
          aria-label="Edit navbar"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white p-2 rounded-full shadow-lg"
        >
          <Pencil size={18} className="text-indigo-600" />
        </button>
      )}
    </div>
  );
}
