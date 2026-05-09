"use client";

import React, { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

type CustomEditorProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
};

export default function CustomEditor<T extends FieldValues>({
  form,
  name,
}: CustomEditorProps<T>) {
  const editorRef = useRef<any>(null);
  const { watch, setValue } = form;

  const value = watch(name) ?? "";

  const onChange = (content: string) => {
    setValue(name, content as any, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  /** Convert file → Base64 */
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  /**
   * ⚠ IMPORTANT
   * Jodit typings are incomplete.
   * We intentionally cast config to `any`
   * to allow runtime-supported options.
   */
  const editorConfig = useMemo<any>(
    () => ({
      minHeight: 450,
      maxHeight: 550,
      placeholder: "Write your content here...",
      toolbarSticky: true,
      toolbarAdaptive: true,
      spellcheck: true,
      allowTabInside: true,

      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "image",
        "video",
        "|",
        "align",
        "undo",
        "redo",
        "hr",
      ],

      /** ❌ Disable URL usage */
      link: {
        processPasteLink: false,
      },

      /** ✅ FILE PICKER ONLY – BASE64 */
      uploader: {
        insertImageAsBase64URI: true,

        upload: async (files: File[]) => {
          const editor = editorRef.current;
          if (!editor) return;

          for (const file of files) {
            const base64 = await fileToBase64(file);

            // Images & GIFs
            if (file.type.startsWith("image/")) {
              editor.selection.insertImage(base64);
            }

            // Videos
            if (file.type.startsWith("video/")) {
              editor.selection.insertHTML(`
                <video controls style="max-width:100%; margin:10px 0;">
                  <source src="${base64}" type="${file.type}" />
                </video>
              `);
            }
          }
        },
      },

      /** Image settings */
      image: {
        insertImageAsBase64URI: true,
      },

      /** Video settings (runtime supported, TS ignored) */
      video: {
        useLink: false,
        useUpload: true,
      },
    }),
    []
  );

  return (
    <div className="mx-auto richtext-editor">
      {/* ✅ FULL STYLING (LIGHT + DARK) */}
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
          background: transparent !important;
          color: #000000 !important;
        }

        .richtext-editor .jodit-toolbar button:hover {
          background-color: #e5e7eb !important;
        }

        .richtext-editor .jodit-toolbar button.jodit-active {
          background-color: #d1d5db !important;
        }

        .richtext-editor .jodit-wysiwyg {
          background-color: #ffffff !important;
          color: #000000 !important;
        }

        .richtext-editor .jodit-wysiwyg ul,
        .richtext-editor .jodit-wysiwyg ol {
          margin: 1em 0;
          padding-left: 40px;
        }

        /* DARK MODE */
        .dark .richtext-editor .jodit-container {
          background-color: #030712 !important;
          color: #ffffff !important;
          border-color: #374151 !important;
        }

        .dark .richtext-editor .jodit-toolbar {
          background-color: #101828 !important;
        }

        .dark .richtext-editor .jodit-toolbar button {
          color: #ffffff !important;
        }

        .dark .richtext-editor .jodit-wysiwyg {
          background-color: #030712 !important;
          color: #ffffff !important;
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
}
