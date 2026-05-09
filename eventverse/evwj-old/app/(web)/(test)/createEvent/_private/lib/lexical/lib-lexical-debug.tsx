import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import { $getRoot, EditorState } from "lexical";

interface Command {
  type: string;
  payload: string;
  timestamp: number;
}

export default function DebugPanel() {
  const [editor] = useLexicalComposerContext();
  const [editorState, setEditorState] = useState("");
  const [commands, setCommands] = useState<Command[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState: state }) => {
      state.read(() => {
        const root = $getRoot();
        const debugInfo = {
          root: root.getType(),
          children: root.getChildrenSize(),
          content: root.getTextContent().substring(0, 100),
        };
        setEditorState(JSON.stringify(debugInfo, null, 2));
      });
    });
  }, [editor]);

  useEffect(() => {
    const observers = new Map();

    const registerCommandObserver = (commandName: string) => {
      const listener = (payload: unknown) => {
        setCommands((prev) => [
          ...prev.slice(-19),
          {
            type: commandName,
            payload: JSON.stringify(payload).substring(0, 50),
            timestamp: Date.now(),
          },
        ]);
        return false;
      };
      return listener;
    };

    return () => {
      observers.forEach((listener) => {
        listener();
      });
    };
  }, [editor]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 px-3 py-1 bg-gray-800 text-white rounded text-sm hover:bg-gray-900 transition-colors"
        type="button"
      >
        Debug
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-gray-900 text-gray-100 rounded-lg shadow-2xl border border-gray-700 max-h-96 flex flex-col">
      <div className="flex justify-between items-center p-3 border-b border-gray-700">
        <span className="text-sm font-semibold">Debug Panel</span>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-200 text-lg"
          type="button"
        >
          ×
        </button>
      </div>

      <div className="flex-1 overflow-y-auto text-xs font-mono">
        <div className="p-3 border-b border-gray-700">
          <div className="text-gray-400 mb-1">Editor State:</div>
          <pre className="whitespace-pre-wrap break-words text-green-400">
            {editorState}
          </pre>
        </div>

        <div className="p-3">
          <div className="text-gray-400 mb-2">Commands:</div>
          <div className="space-y-1">
            {commands.length === 0 ? (
              <div className="text-gray-500">No commands yet...</div>
            ) : (
              commands.map((cmd, idx) => (
                <div key={idx} className="text-yellow-400">
                  <span className="text-blue-400">
                    {idx + 1}.
                  </span>{" "}
                  {cmd.type}: <span className="text-purple-400">{cmd.payload}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="p-2 border-t border-gray-700 text-xs text-gray-500">
        {commands.length} commands recorded
      </div>
    </div>
  );
}
