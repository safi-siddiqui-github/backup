"use client";

import { useState, useRef } from "react";
import TemplateCard from "./TemplateCard";
import TemplatePreview from "./TemplatePreview";
import { websiteTemplates } from "./data";
import { TWebsiteTemplate } from "./type";
import { Monitor, Tablet, Smartphone, Plus, Trash2, Eye } from "lucide-react";

export default function WebsiteBuilderPage({
 
  setTempalte, template,
}: {
  template: string | null;
  setTempalte: (template: string) => void;
}) {
  const [selected, setSelected] = useState<TWebsiteTemplate | null>(null);
  const [websites, setWebsites] = useState<{ name: string; templateId: string }[]>([]);
  const [name, setName] = useState("My Event Website");
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const [view, setView] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const handleCreate = () => {
    if (!selected || !name.trim()) return alert("Please select a template and enter a name.");
    // Inform parent to open the editor for this template only after successful create
    try {
      setTempalte(selected.id);
    } catch (e) {
      // if parent didn't pass setTempalte or it's undefined, ignore
    }
    setWebsites([...websites, { name, templateId: selected.id }]);
    setName("");
  };

  return (
    <div className="">
      <div className="flex items-center max-w-8xl mx-auto   justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">Event Website Builder</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Create stunning websites for your events with professional templates.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSelected(null);
              setName("");
              // focus the name input when creating a new website
              setTimeout(() => nameInputRef.current?.focus(), 50);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-white dark:bg-gray-800 px-3 py-2 shadow-sm hover:shadow-md text-sm text-gray-900 dark:text-white"
          >
            <Plus className="h-4 w-4 text-indigo-600" /> New Website
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template List */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {websiteTemplates.map((t) => (
              <div key={t.id} className={`rounded-2xl overflow-hidden h-80 transition cursor-pointer flex`} onClick={() => setSelected(t)}>
                <TemplateCard template={t} onSelect={setSelected} />
              </div>
            ))}
        </div>

        {/* Preview & Actions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h4 className="text-lg font-semibold">Preview</h4>
              <div className="text-sm text-gray-500">{selected ? "Preview" : "Select a template to preview"}</div>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-md p-1">
              <button
                title="Desktop"
                onClick={() => setView("desktop")}
                className={`p-2 rounded-md ${view === "desktop" ? "bg-white shadow dark:bg-gray-700" : "text-gray-500 dark:text-gray-400"}`}
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button
                title="Tablet"
                onClick={() => setView("tablet")}
                className={`p-2 rounded-md ${view === "tablet" ? "bg-white shadow dark:bg-gray-700" : "text-gray-500 dark:text-gray-400"}`}
              >
                <Tablet className="h-4 w-4" />
              </button>
              <button
                title="Mobile"
                onClick={() => setView("mobile")}
                className={`p-2 rounded-md ${view === "mobile" ? "bg-white shadow dark:bg-gray-700" : "text-gray-500 dark:text-gray-400"}`}
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="border rounded-xl p-4 bg-white dark:bg-gray-900 dark:border-gray-700">
            <TemplatePreview template={selected} view={view} />
          </div>

          <div className="border p-4 rounded-xl bg-white dark:bg-gray-900 dark:border-gray-700">
            <h4 className="font-semibold mb-2 flex items-center gap-2"><Eye className="h-4 w-4 text-gray-500"/> Website Details</h4>
            <label className="block text-sm font-semibold mb-1">Website Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              ref={(el) => { nameInputRef.current = el }}
              placeholder="My Event Website"
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
            />
            <button
              onClick={handleCreate}
              disabled={!selected || !name.trim()}
              className={`mt-3 w-full inline-flex items-center cursor-pointer justify-center gap-2 text-white py-2 rounded-md ${!selected || !name.trim() ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
            >
              <Plus className="h-4 w-4" /> Create Website
            </button>
          </div>

          {/* User Websites */}
          <div className="border p-4 rounded-xl bg-white dark:bg-gray-900 dark:border-gray-700">
            <h4 className="font-semibold mb-2">Your Websites</h4>
            {websites.length === 0 ? (
              <p className="text-sm text-gray-400">No websites created yet.</p>
            ) : (
              <ul className="space-y-2">
                {websites.map((w, idx) => (
                  <li key={idx} className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2 text-gray-800 dark:text-gray-200"><Monitor className="h-4 w-4 text-gray-400 dark:text-gray-400" />{w.name}</span>
                    <button className="text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4"/></button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
