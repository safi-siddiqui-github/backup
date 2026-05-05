"use client";

import { TWebsiteTemplate } from "./type";
import Image from "next/image";

type Props = {
  template: TWebsiteTemplate;
  onSelect: (template: TWebsiteTemplate) => void;
  selected?: boolean;
};

export default function TemplateCard({ template, onSelect, selected }: Props) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(template)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(template)}
  className={`rounded-2xl overflow-hidden bg-white dark:bg-black shadow-sm transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer border border-gray-200 dark:border-gray-700 h-full flex flex-col`}
    >
      <div className="relative h-36 w-full bg-black">
        <Image src={template.previewImageUrl} alt={template.name} fill className="object-cover" />

  {/* subtle gradient overlay to ensure white text */}
  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

        {/* premium badge (black/white only) */}
        {template.isPremium && (
          <div className="absolute top-3 right-3 inline-flex items-center gap-2 rounded-full bg-black/90 px-3 py-1 text-xs font-semibold text-white shadow">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/></svg>
            Premium
          </div>
        )}

        {/* title over image */}
        <div className="absolute left-4 bottom-4 text-white drop-shadow">
          <h4 className="text-sm font-bold leading-tight">{template.name}</h4>
          <div className="text-xs opacity-90">{template.category}</div>
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-gray-900 flex-1 flex flex-col min-h-0 overflow-hidden">
        <p className="text-sm text-gray-800 dark:text-gray-100 line-clamp-3 flex-1 overflow-hidden">{template.description}</p>

        <div className="mt-3 flex-none flex flex-wrap gap-2">
          {template.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-2 py-0.5 text-xs">
              <span className="h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-gray-200 inline-block" />
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-gray-700 dark:text-gray-200">{template.isPremium ? "Premium template" : "Free"}</div>
          <div className="flex items-center gap-2">
            <button onClick={() => onSelect(template)} className="text-sm inline-flex items-center gap-2 rounded-md px-3 py-1 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L12 12L22 12"/></svg>
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
