 "use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, EditorState } from "lexical";

export function OnChangePlugin({ onChange }: { onChange?: (value: string) => void }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!onChange) return;
    return editor.registerUpdateListener(({ editorState }: { editorState: EditorState }) => {
      editorState.read(() => {
        const text = $getRoot().getTextContent();
        onChange(text);
      });
    });
  }, [editor, onChange]);

  return null;
}
