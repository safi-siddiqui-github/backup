import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  $createParagraphNode,
  TextNode,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode,
  INSERT_CHECK_LIST_COMMAND,
} from "@lexical/list";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  HeadingTagType,
} from "@lexical/rich-text";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $createCodeNode, $isCodeNode, CodeNode } from "@lexical/code";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Link as LinkIcon,
  Undo,
  Redo,
  Type,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Palette,
  Subscript,
  Superscript,
  ChevronDown,
  PaintBucket,
  ImageIcon,
  Smile,
  Video,
  Gift,
} from "lucide-react";

// Schadcn UI DropdownMenu
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import EmojiPicker from "emoji-picker-react";
import { INSERT_IMAGE_COMMAND } from "./plugings/ImagePlugin";
import { INSERT_YOUTUBE_COMMAND } from "./plugings/YouTubePlugin";
import LinkModal from "./plugings/LinkModal";

const LowPriority = 1;

const FONT_FAMILIES = [
  { value: "system", label: "System" },
  { value: "Arial", label: "Arial" },
  { value: "Georgia", label: "Georgia" },
  { value: "Courier New", label: "Courier New" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Verdana", label: "Verdana" },
];

const FONT_SIZES = ["12", "14", "16", "18", "20", "24", "28", "32", "36", "48"];

function Divider() {
  return <div className="w-px h-6 bg-gray-300 mx-1" />;
}


export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  // Insert emoji at cursor
  const handleEmojiClick = (emojiData: any) => {
    setShowEmojiPicker(false);
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.insertText(emojiData.emoji);
      }
    });
  };
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");
  const [fontSize, setFontSize] = useState("16");
  const [fontFamily, setFontFamily] = useState("system");
  const [alignment, setAlignment] = useState("left");
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");

    const [showLinkModal, setShowLinkModal] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsSubscript(selection.hasFormat("subscript"));
      setIsSuperscript(selection.hasFormat("superscript"));
      setIsCode(selection.hasFormat("code"));

      const node = selection.anchor.getNode();
      const parent = node.getParent();
      setIsLink($isLinkNode(parent) || $isLinkNode(node));

      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();

      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
        }
      }

      const style = elementDOM?.getAttribute("style") || "";
      const fontSizeMatch = style.match(/font-size:\s*(\d+)px/);
      if (fontSizeMatch) {
        setFontSize(fontSizeMatch[1]);
      } else {
        setFontSize("16");
      }

      const fontFamilyMatch = style.match(/font-family:\s*([^;]+)/);
      if (fontFamilyMatch) {
        setFontFamily(fontFamilyMatch[1].trim());
      } else {
        setFontFamily("system");
      }

      const colorMatch = style.match(/color:\s*(#[0-9a-f]{6}|rgb[^;]+)/i);
      if (colorMatch) {
        setTextColor(colorMatch[1]);
      } else {
        setTextColor("#000000");
      }

      const bgColorMatch = style.match(/background-color:\s*(#[0-9a-f]{6}|rgb[^;]+)/i);
      if (bgColorMatch) {
        setBgColor(bgColorMatch[1]);
      } else {
        setBgColor("#FFFFFF");
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {} as any,
        () => {
          updateToolbar();
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };


  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      });
    }
  };


  const formatCode = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createCodeNode());
      }
    });
  };

  

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value;
    setFontSize(size);
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes();
        nodes.forEach((node) => {
          if (node instanceof TextNode) {
            const element = editor.getElementByKey(node.getKey());
            if (element) {
              element.style.fontSize = `${size}px`;
            }
          }
        });
      }
    });
  };

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const family = e.target.value;
    setFontFamily(family);
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes();
        nodes.forEach((node) => {
          if (node instanceof TextNode) {
            const element = editor.getElementByKey(node.getKey());
            if (element && family !== "system") {
              element.style.fontFamily = family;
            }
          }
        });
      }
    });
  };

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setTextColor(color);
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes();
        nodes.forEach((node) => {
          if (node instanceof TextNode) {
            const element = editor.getElementByKey(node.getKey());
            if (element) {
              element.style.color = color;
            }
          }
        });
      }
    });
  };

  const handleBgColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setBgColor(color);
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes();
        nodes.forEach((node) => {
          if (node instanceof TextNode) {
            const element = editor.getElementByKey(node.getKey());
            if (element) {
              element.style.backgroundColor = color;
            }
          }
        });
      }
    });
  };

  const handleAlignment = (align: string) => {
    setAlignment(align);
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes();
        nodes.forEach((node) => {
          const element = editor.getElementByKey(node.getKey());
          if (element) {
            element.style.textAlign = align;
          }
        });
      }
    });
  };


  const insertLink = () => {
    setShowLinkModal(true);
  };

  // const insertLink = useCallback(() => {
  //   if (!isLink) {
  //     const url = prompt("Enter URL:");
  //     if (url) {
  //       editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
  //     }
  //   } else {
  //     editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
  //   }
  // }, [editor, isLink]);

  const insertImage = () => {
    const url = prompt("Enter image URL or search for GIF:");
    if (url) {
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
        src: url,
        altText: "Image",
      });
    }
  };

  const insertGIF = () => {
    const query = prompt("Enter search term for GIF:");
    if (query) {
      const gifUrl = `https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif`;
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
        src: gifUrl,
        altText: query,
      });
    }
  };

  const insertYouTube = () => {
    const url = prompt("Enter YouTube URL or Video ID:");
    if (url) {
      editor.dispatchCommand(INSERT_YOUTUBE_COMMAND, url);
    }
  };
  // Add handler for custom list styles
  // Removed custom list style handler; only bullet and numbered lists are supported now.

  return (
    <div className="flex flex-col gap-2 p-2 border-b border-gray-300 bg-gray-50 rounded-t-lg">
      <div className="flex items-center gap-1 flex-wrap">
        <button
          onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          aria-label="Undo"
          type="button"
        >
          <Undo size={18} />
        </button>
        <button
          onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          aria-label="Redo"
          type="button"
        >
          <Redo size={18} />
        </button>

        <Divider />

        <select
          value={fontFamily}
          onChange={handleFontFamilyChange}
          className="px-2 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 min-w-[80px] w-[100px] max-w-[120px]"
          aria-label="Font Family"
        >
          {FONT_FAMILIES.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>

        <select
          value={fontSize}
          onChange={handleFontSizeChange}
          className="px-2 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100"
          aria-label="Font Size"
        >
          {FONT_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <Divider />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={`px-2 py-1 border border-gray-300 bg-white cursor-pointer rounded flex items-center gap-2 transition-colors hover:bg-gray-100 focus:outline-none ${
                ["paragraph", "h1", "h2", "h3", "code", "quote"].includes(blockType) ? "bg-gray-200" : ""
              }`}
              aria-label="Text Type"
              type="button"
            >
              <span className="font-medium mr-1">
                {blockType === "paragraph" && "Text"}
                {blockType === "h1" && "Heading 1"}
                {blockType === "h2" && "Heading 2"}
                {blockType === "h3" && "Heading 3"}
                {blockType === "code" && "Code Block"}
                {blockType === "quote" && "Quote"}
              </span>
              <ChevronDown size={16} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="min-w-[140px] bg-white border border-gray-200 shadow-lg rounded-lg py-1 z-50"
          >
            <DropdownMenuItem
              onSelect={formatParagraph}
              className="flex items-center px-3 py-2 gap-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors"
            >
              <Type size={16} className="text-gray-600" />
              <span className="text-sm">Text</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => formatHeading("h1")}
              className="flex items-center px-3 py-2 gap-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors"
            >
              <Heading1 size={16} className="text-gray-600" />
              <span className="text-sm">Heading 1</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => formatHeading("h2")}
              className="flex items-center px-3 py-2 gap-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors"
            >
              <Heading2 size={16} className="text-gray-600" />
              <span className="text-sm">Heading 2</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => formatHeading("h3")}
              className="flex items-center px-3 py-2 gap-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors"
            >
              <Heading3 size={16} className="text-gray-600" />
              <span className="text-sm">Heading 3</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={formatCode}
              className="flex items-center px-3 py-2 gap-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors"
            >
              <Code size={16} className="text-gray-600" />
              <span className="text-sm">Code Block</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={formatQuote}
              className="flex items-center px-3 py-2 gap-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors"
            >
              <Quote size={16} className="text-gray-600" />
              <span className="text-sm">Quote</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Divider />

        <button
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
          className={`p-2 hover:bg-gray-200 rounded transition-colors ${
            isBold ? "bg-gray-300" : ""
          }`}
          aria-label="Bold"
          type="button"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
          className={`p-2 hover:bg-gray-200 rounded transition-colors ${
            isItalic ? "bg-gray-300" : ""
          }`}
          aria-label="Italic"
          type="button"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
          }
          className={`p-2 hover:bg-gray-200 rounded transition-colors ${
            isUnderline ? "bg-gray-300" : ""
          }`}
          aria-label="Underline"
          type="button"
        >
          <Underline size={18} />
        </button>
        <button
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
          }
          className={`p-2 hover:bg-gray-200 rounded transition-colors ${
            isStrikethrough ? "bg-gray-300" : ""
          }`}
          aria-label="Strikethrough"
          type="button"
        >
          <Strikethrough size={18} />
        </button>
        <button
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")
          }
          className={`p-2 hover:bg-gray-200 rounded transition-colors ${
            isSubscript ? "bg-gray-300" : ""
          }`}
          aria-label="Subscript"
          type="button"
        >
          <Subscript size={18} />
        </button>
        <button
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript")
          }
          className={`p-2 hover:bg-gray-200 rounded transition-colors ${
            isSuperscript ? "bg-gray-300" : ""
          }`}
          aria-label="Superscript"
          type="button"
        >
          <Superscript size={18} />
        </button>
        {/* <button
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
          className={`p-2 hover:bg-gray-200 rounded transition-colors ${
            isCode ? "bg-gray-300" : ""
          }`}
          aria-label="Code"
          type="button"
        >
          <Code size={18} />
        </button> */}

        <Divider />


        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={`px-2 py-1 border border-gray-300 bg-white cursor-pointer rounded flex items-center gap-2 transition-colors hover:bg-gray-100 focus:outline-none ${
                ["ul", "ol", "disc", "circle", "square", "decimal", "lower-alpha", "upper-alpha", "lower-roman", "upper-roman"].includes(blockType) ? "bg-gray-200" : ""
              }`}
              aria-label="List Style"
              type="button"
            >
              <span className="font-medium mr-1">
                {blockType === "ul" && "Bullet List"}
                {blockType === "ol" && "Numbered List"}
                {blockType === "disc" && "Disc List"}
                {blockType === "circle" && "Circle List"}
                {blockType === "square" && "Square List"}
                {blockType === "decimal" && "Decimal List"}
                {blockType === "lower-alpha" && "Lower Alpha List"}
                {blockType === "upper-alpha" && "Upper Alpha List"}
                {blockType === "lower-roman" && "Lower Roman List"}
                {blockType === "upper-roman" && "Upper Roman List"}
                {!["ul", "ol", "disc", "circle", "square", "decimal", "lower-alpha", "upper-alpha", "lower-roman", "upper-roman"].includes(blockType) && "List"}
              </span>
              <ChevronDown size={16} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="min-w-[160px] bg-white border border-gray-200 shadow-lg rounded-lg py-1 z-50"
          >
            <DropdownMenuItem
              onSelect={formatBulletList}
              className="flex items-center px-3 py-2 gap-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors"
            >
              <List size={16} className="text-gray-600" />
              <span className="text-sm">Bullet List</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={formatNumberedList}
              className="flex items-center px-3 py-2 gap-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors"
            >
              <ListOrdered size={16} className="text-gray-600" />
              <span className="text-sm">Numbered List</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
  </DropdownMenu>

  {/* Quote now in dropdown above */}

        <Divider />

        {/* <button
          onClick={insertLink}
          className={`p-2 hover:bg-gray-200 rounded transition-colors ${
            isLink ? "bg-gray-300" : ""
          }`}
          aria-label="Insert Link"
          type="button"
        >
          <LinkIcon size={18} />
        </button> */}

    
      

        {/* <Divider /> */}

        <div className="flex items-center gap-1">
          <Palette size={18} className="text-gray-600" />
          <div className="relative ">
            <input
              type="color"
              value={textColor}
              onChange={handleTextColorChange}
              className="w-8 h-8 rounded cursor-pointer border border-gray-300"
              aria-label="Text Color"
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <PaintBucket size={18} className="text-gray-600" />
          <div className="relative">
            <input
              type="color"
              value={bgColor}
              onChange={handleBgColorChange}
              className="w-8 h-8 rounded cursor-pointer border border-gray-300"
              aria-label="Background Color"
            />
          </div>
        </div>

     <Divider />
<button
            onClick={insertLink}
            className={`p-2 hover:bg-gray-200 rounded transition-colors ${
              isLink ? "bg-gray-300" : ""
            }`}
            aria-label="Insert Link"
            type="button"
          >
            <LinkIcon size={18} />
          </button>

          <button
            onClick={insertImage}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            aria-label="Insert Image"
            type="button"
          >
            <ImageIcon size={18} />
          </button>

          <button
            onClick={insertGIF}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            aria-label="Insert GIF"
            type="button"
          >
            <Gift size={18} />
          </button>

          <button
            onClick={insertYouTube}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            aria-label="Insert YouTube Video"
            type="button"
          >
            <Video size={18} />
          </button>
        <Divider />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={`px-2 py-1f border border-gray-300 bg-white cursor-pointer   rounded flex items-center gap-2 transition-colors hover:bg-gray-100 focus:outline-none ${
                ["left", "center", "right", "justify"].includes(alignment) ? "bg-gray-200" : ""
              }`}
              aria-label="Text Alignment"
              type="button"
            >
              <span className="font-medium mr-1">
                {alignment === "left" && "Left"}
                {alignment === "center" && "Center"}
                {alignment === "right" && "Right"}
                {alignment === "justify" && "Justify"}
              </span>
              <ChevronDown size={16} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="min-w-[140px] bg-white border border-gray-200 shadow-lg rounded-lg py-1 z-50"
          >
            <DropdownMenuItem
              onSelect={() => handleAlignment("left")}
              className="flex items-center px-3 py-2 gap-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors"
            >
              <AlignLeft size={16} className="text-gray-600" />
              <span className="text-sm">Left</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => handleAlignment("center")}
              className="flex items-center px-3 py-2 gap-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors"
            >
              <AlignCenter size={16} className="text-gray-600" />
              <span className="text-sm">Center</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => handleAlignment("right")}
              className="flex items-center px-3 py-2 gap-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors"
            >
              <AlignRight size={16} className="text-gray-600" />
              <span className="text-sm">Right</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => handleAlignment("justify")}
              className="flex items-center px-3 py-2 gap-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors"
            >
              <AlignJustify size={16} className="text-gray-600" />
              <span className="text-sm">Justify</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
       {showLinkModal && (
        <LinkModal
          editor={editor}
          onClose={() => setShowLinkModal(false)}
          isLink={isLink}
        />
      )}
    </div>
  );
}
