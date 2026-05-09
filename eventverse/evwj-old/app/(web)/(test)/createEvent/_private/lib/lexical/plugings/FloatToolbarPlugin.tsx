import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_LOW,
} from "lexical";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { mergeRegister } from "@lexical/utils";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link as LinkIcon,
  Palette,
  Type,
} from "lucide-react";

function getDOMRangeRect(nativeSelection: Selection, rootElement: HTMLElement): DOMRect {
  const domRange = nativeSelection.getRangeAt(0);

  let rect: DOMRect;

  if (nativeSelection.anchorNode === rootElement) {
    let inner = rootElement;
    while (inner.firstElementChild != null) {
      inner = inner.firstElementChild as HTMLElement;
    }
    rect = inner.getBoundingClientRect();
  } else {
    rect = domRange.getBoundingClientRect();
  }

  return rect;
}

function setFloatingElemPosition(
  targetRect: DOMRect | null,
  floatingElem: HTMLElement,
  anchorElem: HTMLElement
): void {
  const scrollerElem = anchorElem.parentElement;

  if (targetRect === null || !scrollerElem) {
    floatingElem.style.opacity = "0";
    floatingElem.style.transform = "translate(-10000px, -10000px)";
    return;
  }

  const floatingElemRect = floatingElem.getBoundingClientRect();
  const anchorElementRect = anchorElem.getBoundingClientRect();
  const editorScrollerRect = scrollerElem.getBoundingClientRect();

  let top = targetRect.top - floatingElemRect.height - 10;
  let left = targetRect.left - floatingElemRect.width / 2 + targetRect.width / 2;

  if (top < editorScrollerRect.top) {
    top = targetRect.bottom + 10;
  }

  if (left < editorScrollerRect.left) {
    left = editorScrollerRect.left + 10;
  }

  if (left + floatingElemRect.width > editorScrollerRect.right) {
    left = editorScrollerRect.right - floatingElemRect.width - 10;
  }

  top -= anchorElementRect.top;
  left -= anchorElementRect.left;

  floatingElem.style.opacity = "1";
  floatingElem.style.transform = `translate(${left}px, ${top}px)`;
}

export default function FloatingToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isText, setIsText] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [fontSize, setFontSize] = useState("16");
  const [textColor, setTextColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontSize, setShowFontSize] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const updatePopup = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();

      const popupElement = popupRef.current;
      const nativeSelection = window.getSelection();

      if (popupElement === null) {
        return;
      }

      const rootElement = editor.getRootElement();
      if (
        selection !== null &&
        nativeSelection !== null &&
        !nativeSelection.isCollapsed &&
        rootElement !== null &&
        rootElement.contains(nativeSelection.anchorNode)
      ) {
        const domRange = getDOMRangeRect(nativeSelection, rootElement);

        setFloatingElemPosition(domRange, popupElement, rootElement);
      } else {
        setFloatingElemPosition(null, popupElement, rootElement!);
      }
    });
  }, [editor]);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));

      const node = selection.anchor.getNode();
      const parent = node.getParent();
      setIsLink($isLinkNode(parent) || $isLinkNode(node));

      if (!selection.isCollapsed()) {
        setIsText(true);
      } else {
        setIsText(false);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateToolbar();
    });
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          updatePopup();
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, updateToolbar, updatePopup]);

  useEffect(() => {
    const onResize = () => {
      updatePopup();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [updatePopup]);

  const insertLink = () => {
    if (!isLink) {
      const url = prompt("Enter URL:");
      if (url) {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
      }
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  };

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
    setShowFontSize(false);
  };

  const handleColorChange = (color: string) => {
    setTextColor(color);
    setShowColorPicker(false);
  };

  const FONT_SIZES = ["12", "14", "16", "18", "20", "24", "28", "32"];
  const COLORS = [
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#008000",
  ];

  if (!isText) {
    return null;
  }

  return (
    <div
      ref={popupRef}
      className="absolute top-0 left-0 z-50 flex items-center gap-1 bg-gray-900 text-white rounded-lg shadow-lg px-2 py-1.5 opacity-0 transition-opacity"
      style={{ pointerEvents: "auto" }}
    >
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        className={`p-1.5 hover:bg-gray-700 rounded transition-colors ${
          isBold ? "bg-gray-700" : ""
        }`}
        aria-label="Bold"
        type="button"
      >
        <Bold size={16} />
      </button>

      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        className={`p-1.5 hover:bg-gray-700 rounded transition-colors ${
          isItalic ? "bg-gray-700" : ""
        }`}
        aria-label="Italic"
        type="button"
      >
        <Italic size={16} />
      </button>

      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        className={`p-1.5 hover:bg-gray-700 rounded transition-colors ${
          isUnderline ? "bg-gray-700" : ""
        }`}
        aria-label="Underline"
        type="button"
      >
        <Underline size={16} />
      </button>

      <button
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }
        className={`p-1.5 hover:bg-gray-700 rounded transition-colors ${
          isStrikethrough ? "bg-gray-700" : ""
        }`}
        aria-label="Strikethrough"
        type="button"
      >
        <Strikethrough size={16} />
      </button>

      <div className="w-px h-5 bg-gray-600 mx-1" />

      <div className="relative">
        <button
          onClick={() => setShowFontSize(!showFontSize)}
          className="p-1.5 hover:bg-gray-700 rounded transition-colors flex items-center gap-1"
          aria-label="Font Size"
          type="button"
        >
          <Type size={16} />
          <span className="text-xs">{fontSize}</span>
        </button>

        {showFontSize && (
          <div className="absolute top-full mt-1 bg-white text-black rounded shadow-lg py-1 min-w-[80px] z-50">
            {FONT_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => handleFontSizeChange(size)}
                className="block w-full text-left px-3 py-1 hover:bg-gray-100 text-sm"
                type="button"
              >
                {size}px
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative" ref={colorPickerRef}>
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="p-1.5 hover:bg-gray-700 rounded transition-colors"
          aria-label="Text Color"
          type="button"
        >
          <Palette size={16} />
        </button>

        {showColorPicker && (
          <div className="absolute top-full mt-1 bg-white rounded shadow-lg p-2 z-50">
            <div className="grid grid-cols-5 gap-1">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  type="button"
                  aria-label={`Color ${color}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-px h-5 bg-gray-600 mx-1" />

      <button
        onClick={insertLink}
        className={`p-1.5 hover:bg-gray-700 rounded transition-colors ${
          isLink ? "bg-gray-700" : ""
        }`}
        aria-label="Link"
        type="button"
      >
        <LinkIcon size={16} />
      </button>
    </div>
  );
}
