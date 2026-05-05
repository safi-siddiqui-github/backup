"use client";

import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

/* =======================
   Lexical Core
======================= */
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

/* =======================
   Lexical Nodes
======================= */
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { ImageNode } from "./node/ImageNode";
import { YouTubeNode } from "./node/YouTubeNode";

/* =======================
   Lexical Utils
======================= */
import {
  $getSelection,
  $isRangeSelection,
} from "lexical";

/* =======================
   Plugins
======================= */
import ToolbarPlugin from "./lib-lexical-toolbar";
import FloatingToolbarPlugin from "./plugings/FloatToolbarPlugin";
import ImagePlugin from "./plugings/ImagePlugin";
import YouTubePlugin from "./plugings/YouTubePlugin";
import DebugPanel from "./lib-lexical-debug";

/* =======================
   React Hook Form
======================= */
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

/* =======================
   Theme
======================= */
const editorTheme = {
  paragraph: "mb-2",
  quote: "border-l-4 border-gray-300 pl-4 italic my-4",
  heading: {
    h1: "text-4xl font-bold mb-4",
    h2: "text-3xl font-bold mb-3",
    h3: "text-2xl font-bold mb-2",
  },
  list: {
    ol: "list-decimal list-inside my-2",
    ul: "list-disc list-inside my-2",
    listitem: "ml-4",
  },
  link: "text-blue-600 underline",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
    code: "bg-gray-100 px-1 rounded font-mono text-sm",
  },
};

/* =======================
   Editor Config
======================= */
const initialConfig = {
  namespace: "LexicalEditor",
  theme: editorTheme,
  nodes: [
    HeadingNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    LinkNode,
    AutoLinkNode,
    CodeNode,
    CodeHighlightNode,
    ImageNode,
    YouTubeNode,
  ],
  onError(error: Error) {
    console.error(error);
  },
};

/* =======================
   RHF → Save JSON
======================= */
function RHFOnChangePlugin<T extends FieldValues>({
  form,
  name,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      const json = JSON.stringify(editorState.toJSON());

      form.setValue(name, json as any, {
        shouldDirty: true,
        shouldTouch: true,
      });
    });
  }, [editor, form, name]);

  return null;
}

/* =======================
   RHF → Load JSON
======================= */
function RHFInitialValuePlugin<T extends FieldValues>({
  form,
  name,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
}) {
  const [editor] = useLexicalComposerContext();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const value = form.getValues(name);
    if (!value) return;

    try {
      const parsed = JSON.parse(value as string);
      const editorState = editor.parseEditorState(parsed);
      editor.setEditorState(editorState);
      initialized.current = true;
    } catch (e) {
      console.error("Invalid Lexical JSON", e);
    }
  }, [editor, form, name]);

  return null;
}

/* =======================
   Emoji Plugin
======================= */
function EmojiPlugin() {
  const [editor] = useLexicalComposerContext();
  const [open, setOpen] = useState(false);

  const onEmojiClick = (emoji: any) => {
    setOpen(false);
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.insertText(emoji.emoji);
      }
    });
  };

  return (
    <>
      {open && (
        <div className="absolute top-12 right-2 z-50">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </>
  );
}

/* =======================
   MAIN COMPONENT
======================= */
export default function LexicalEditorComponent<T extends FieldValues>({
  form,
  name,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
}) {
  const contentEditableRef = useRef<HTMLDivElement>(null);

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <EmojiPlugin />
        <FloatingToolbarPlugin />

        <RichTextPlugin
          contentEditable={
            <ContentEditable
              ref={contentEditableRef}
              className="min-h-[300px] p-4 outline-none"
            />
          }
          placeholder={
            <div className="absolute top-4 left-4 text-gray-400">
              Write description...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <ImagePlugin />
        <YouTubePlugin />
        <AutoFocusPlugin />

        {/* 🔥 RHF INTEGRATION */}
        <RHFOnChangePlugin form={form} name={name} />
        <RHFInitialValuePlugin form={form} name={name} />

        <DebugPanel />
      </LexicalComposer>
    </div>
  );
}
