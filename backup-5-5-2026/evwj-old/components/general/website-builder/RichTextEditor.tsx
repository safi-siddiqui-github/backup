"use client";

import React, { useMemo, useRef } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

interface CustomEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomEditor: React.FC<CustomEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<any>(null);

  const editorConfig = useMemo(
    () => ({
      minHeight: 450,
      maxHeight: 550,
      defaultLineHeight: 1.4,
      placeholder: "Write your content here...",
      toolbarSticky: true,
      toolbarButtonSize: "middle" as const,
      showTooltip: true,
      buttons: "full",
      direction: "ltr" as const,
      enter: "p" as const,
      spellcheck: true,
      enableDragAndDrop: false,
      toolbarAdaptive: true,
      useSplitMode: false,
      allowTabInside: true,
      removeButtons: [],
      defaultActionOnPaste: "insert_as_html" as const,
    }),
    []
  );

  return (
    <div className="mx-auto richtext-editor">
      <style>{`
        .richtext-editor .jodit-container {
          background-color: #ffffff !important;
          color: #000000 !important;
          border: 1px solid #cccccc !important;
        }

        .richtext-editor .jodit-toolbar {
          background-color: #f9f9f9 !important;
          border-bottom: 1px solid #cccccc !important;
        }

        .richtext-editor .jodit-toolbar button {
          background-color: transparent !important;
          color: #000000 !important;
          border: none !important;
        }

        .richtext-editor .jodit-toolbar button:hover {
          background-color: #e5e5e5 !important;
          color: #000000 !important;
        }

        .richtext-editor .jodit-toolbar button.jodit-active {
          background-color: #d1d5db !important;
          color: #000000 !important;
        }

        .richtext-editor .jodit-wysiwyg {
          background-color: #ffffff !important;
          color: #000000 !important;
          border: none !important;
        }

        .richtext-editor .jodit-wysiwyg:focus {
          outline: none !important;
        }

        .richtext-editor .jodit-wysiwyg p,
        .richtext-editor .jodit-wysiwyg div,
        .richtext-editor .jodit-wysiwyg span {
          color: #000000 !important;
        }

        .richtext-editor .jodit-wysiwyg h1,
        .richtext-editor .jodit-wysiwyg h2,
        .richtext-editor .jodit-wysiwyg h3,
        .richtext-editor .jodit-wysiwyg h4,
        .richtext-editor .jodit-wysiwyg h5,
        .richtext-editor .jodit-wysiwyg h6 {
          color: #000000 !important;
        }

        .richtext-editor .jodit-popup {
          background-color: #f9f9f9 !important;
          border: 1px solid #cccccc !important;
          color: #000000 !important;
        }

        .richtext-editor .jodit-popup__content {
          background-color: #f9f9f9 !important;
          color: #000000 !important;
        }

        .richtext-editor .jodit-popup button {
          background-color: transparent !important;
          color: #000000 !important;
        }

        .richtext-editor .jodit-popup button:hover {
          background-color: #e5e5e5 !important;
        }

        .richtext-editor .jodit-color-picker .jodit-color-picker__groups {
          background-color: #f9f9f9 !important;
        }

        .richtext-editor .jodit-color-picker__group {
          background-color: #ffffff !important;
        }

        .richtext-editor .jodit-color-picker__native {
          background-color: #ffffff !important;
          color: #000000 !important;
        }

        .richtext-editor .jodit-filebrowser {
          background-color: #f9f9f9 !important;
          color: #000000 !important;
        }

        .richtext-editor .jodit-filebrowser__files {
          background-color: #ffffff !important;
        }

        .richtext-editor .jodit-filebrowser__file {
          background-color: #ffffff !important;
          color: #000000 !important;
        }

        .richtext-editor .jodit-filebrowser__file:hover {
          background-color: #e5e5e5 !important;
        }

        .richtext-editor .jodit-dialog {
          background-color: #f9f9f9 !important;
          color: #000000 !important;
          border: 1px solid #cccccc !important;
        }

        .richtext-editor .jodit-dialog__panel {
          background-color: #f9f9f9 !important;
        }

        .richtext-editor .jodit-dialog input,
        .richtext-editor .jodit-dialog textarea,
        .richtext-editor .jodit-dialog select {
          background-color: #ffffff !important;
          color: #000000 !important;
          border: 1px solid #cccccc !important;
        }

        .richtext-editor .jodit-dialog button {
          background-color: #d1d5db !important;
          color: #000000 !important;
          border: none !important;
        }

        .richtext-editor .jodit-dialog button:hover {
          background-color: #9ca3af !important;
        }

        .richtext-editor .jodit-status-bar {
          background-color: #f9f9f9 !important;
          color: #6b7280 !important;
          border-top: 1px solid #cccccc !important;
        }

        .richtext-editor .jodit-resizer {
          background-color: #cccccc !important;
        }

        .richtext-editor .jodit-resizer:hover {
          background-color: #9ca3af !important;
        }

        /* Scrollbar styling for light mode */
        .richtext-editor .jodit-wysiwyg::-webkit-scrollbar {
          width: 8px;
        }

        .richtext-editor .jodit-wysiwyg::-webkit-scrollbar-track {
          background: #ffffff;
        }

        .richtext-editor .jodit-wysiwyg::-webkit-scrollbar-thumb {
          background: #cccccc;
          border-radius: 4px;
        }

        .richtext-editor .jodit-wysiwyg::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }

        /* Dark Mode Styles for Rich Text Editor */
        .dark .richtext-editor .jodit-container {
          background-color: #030712 !important;
          color: #ffffff !important;
          border: 1px solid #374151 !important;
        }

        .dark .richtext-editor .jodit-toolbar {
          background-color: #101828 !important;
          border-bottom: 1px solid #374151 !important;
        }

        .dark .richtext-editor .jodit-toolbar button {
          background-color: transparent !important;
          color: #ffffff !important;
          border: none !important;
        }

        .dark .richtext-editor .jodit-toolbar button:hover {
          background-color: #374151 !important;
          color: #ffffff !important;
        }

        .dark .richtext-editor .jodit-toolbar button.jodit-active {
          background-color: #4b5563 !important;
          color: #ffffff !important;
        }

        .dark .richtext-editor .jodit-wysiwyg {
          background-color: #030712 !important;
          color: #ffffff !important;
          border: none !important;
        }

        .dark .richtext-editor .jodit-wysiwyg:focus {
          outline: none !important;
        }

        .dark .richtext-editor .jodit-wysiwyg p,
        .dark .richtext-editor .jodit-wysiwyg div,
        .dark .richtext-editor .jodit-wysiwyg span {
          color: #ffffff !important;
        }

        .dark .richtext-editor .jodit-wysiwyg h1,
        .dark .richtext-editor .jodit-wysiwyg h2,
        .dark .richtext-editor .jodit-wysiwyg h3,
        .dark .richtext-editor .jodit-wysiwyg h4,
        .dark .richtext-editor .jodit-wysiwyg h5,
        .dark .richtext-editor .jodit-wysiwyg h6 {
          color: #ffffff !important;
        }

        .dark .richtext-editor .jodit-popup {
          background-color: #101828 !important;
          border: 1px solid #374151 !important;
          color: #ffffff !important;
        }

        .dark .richtext-editor .jodit-popup__content {
          background-color: #101828 !important;
          color: #ffffff !important;
        }

        .dark .richtext-editor .jodit-popup button {
          background-color: transparent !important;
          color: #ffffff !important;
        }

        .dark .richtext-editor .jodit-popup button:hover {
          background-color: #374151 !important;
        }

        .dark .richtext-editor .jodit-color-picker .jodit-color-picker__groups {
          background-color: #101828 !important;
        }

        .dark .richtext-editor .jodit-color-picker__group {
          background-color: #030712 !important;
        }

        .dark .richtext-editor .jodit-color-picker__native {
          background-color: #030712 !important;
          color: #ffffff !important;
        }

        .dark .richtext-editor .jodit-filebrowser {
          background-color: #101828 !important;
          color: #ffffff !important;
        }

        .dark .richtext-editor .jodit-filebrowser__files {
          background-color: #030712 !important;
        }

        .dark .richtext-editor .jodit-filebrowser__file {
          background-color: #030712 !important;
          color: #ffffff !important;
        }

        .dark .richtext-editor .jodit-filebrowser__file:hover {
          background-color: #374151 !important;
        }

        .dark .richtext-editor .jodit-dialog {
          background-color: #101828 !important;
          color: #ffffff !important;
          border: 1px solid #374151 !important;
        }

        .dark .richtext-editor .jodit-dialog__panel {
          background-color: #101828 !important;
        }

        .dark .richtext-editor .jodit-dialog input,
        .dark .richtext-editor .jodit-dialog textarea,
        .dark .richtext-editor .jodit-dialog select {
          background-color: #030712 !important;
          color: #ffffff !important;
          border: 1px solid #374151 !important;
        }

        .dark .richtext-editor .jodit-dialog button {
          background-color: #4b5563 !important;
          color: #ffffff !important;
          border: none !important;
        }

        .dark .richtext-editor .jodit-dialog button:hover {
          background-color: #6b7280 !important;
        }

        .dark .richtext-editor .jodit-status-bar {
          background-color: #101828 !important;
          color: #9ca3af !important;
          border-top: 1px solid #374151 !important;
        }

        .dark .richtext-editor .jodit-resizer {
          background-color: #374151 !important;
        }

        .dark .richtext-editor .jodit-resizer:hover {
          background-color: #4b5563 !important;
        }

        /* Scrollbar styling for dark mode */
        .dark .richtext-editor .jodit-wysiwyg::-webkit-scrollbar {
          width: 8px;
        }

        .dark .richtext-editor .jodit-wysiwyg::-webkit-scrollbar-track {
          background: #030712;
        }

        .dark .richtext-editor .jodit-wysiwyg::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 4px;
        }

        .dark .richtext-editor .jodit-wysiwyg::-webkit-scrollbar-thumb:hover {
          background: #4b5563;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .richtext-editor .jodit-toolbar {
            flex-wrap: wrap;
          }

          .richtext-editor .jodit-toolbar button {
            min-width: 32px;
            height: 32px;
          }
        }

        /* List styling */
        .richtext-editor .jodit-wysiwyg ul,
        .richtext-editor .jodit-wysiwyg ol {
          margin: 1em 0 !important;
          padding-left: 40px !important;
          list-style-type: initial !important;
          list-style-position: outside !important;
        }
        .richtext-editor .jodit-wysiwyg ul ul,
        .richtext-editor .jodit-wysiwyg ol ol {
          margin: 0 !important;
          padding-left: 20px !important;
        }
        .richtext-editor .jodit-wysiwyg li {
          margin: 0.25em 0 !important;
        }
      `}</style>

      <JoditEditor
        ref={editorRef}
        value={value}
        config={editorConfig}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomEditor;
