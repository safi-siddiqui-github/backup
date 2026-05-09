"use client";

import Image from "next/image";
import { TWebsiteTemplate } from "./type";

type Props = {
  template?: TWebsiteTemplate | null;
  view?: "desktop" | "tablet" | "mobile";
};

export default function TemplatePreview({ template, view = "desktop" }: Props) {
  if (!template)
    return (
      <div className="border border-dashed rounded-xl flex items-center justify-center h-80 text-gray-400 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900">
        Select a template to preview
      </div>
    );
  const frameClass = () => {
    switch (view) {
      case "tablet":
        return "w-[420px] h-96";
      case "mobile":
        return "w-[260px] h-[620px]";
      case "desktop":
      default:
        return "w-full h-60";
    }
  };

  return (
    <div className="w-full">
      <div className="mb-3">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{template.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{template.description}</p>
      </div>

      <div className={`border rounded-xl overflow-hidden bg-white dark:bg-gray-900 dark:border-gray-700 ${frameClass()}`}>
        <Image
          src={template.previewImageUrl}
          alt={template.name}
          width={800}
          height={600}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
