// "use client";

// // import EmojiPicker from "emoji-picker-react";
// import { $generateHtmlFromNodes } from "@lexical/html";
// import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
// import { LexicalComposer } from "@lexical/react/LexicalComposer";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import { ContentEditable } from "@lexical/react/LexicalContentEditable";
// import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
// import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
// import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
// import { ListPlugin } from "@lexical/react/LexicalListPlugin";
// import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// import { createEditor, LexicalEditor } from "lexical";
// import { Trash2, X } from "lucide-react";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { FieldValues, Path, UseFormReturn } from "react-hook-form";
// // import { ImageNode } from "./node/ImageNode";
// // import { YouTubeNode } from "./node/YouTubeNode";
// import { TOGGLE_LINK_COMMAND } from "@lexical/link";
// import {
//   $createParagraphNode,
//   $createTextNode,
//   $getRoot,
//   $getSelection,
//   $isRangeSelection,
//   COMMAND_PRIORITY_LOW,
//   EditorState,
//   SELECTION_CHANGE_COMMAND,
// } from "lexical";

// import { CodeHighlightNode } from "@lexical/code";
// import { AutoLinkNode, LinkNode } from "@lexical/link";
// import { ListItemNode } from "@lexical/list";
// import { HeadingNode, QuoteNode } from "@lexical/rich-text";
// // import DebugPanel from "./lib-lexical-debug";
// // import ImagePlugin from "./plugings/ImagePlugin";
// // import YouTubePlugin from "./plugings/YouTubePlugin";

// import { $createCodeNode, CodeNode } from "@lexical/code";
// import { $isLinkNode } from "@lexical/link";
// import {
//   $isListNode,
//   INSERT_ORDERED_LIST_COMMAND,
//   INSERT_UNORDERED_LIST_COMMAND,
//   ListNode,
//   REMOVE_LIST_COMMAND,
// } from "@lexical/list";
// import {
//   $createHeadingNode,
//   $createQuoteNode,
//   $isHeadingNode,
//   HeadingTagType,
// } from "@lexical/rich-text";
// import { $setBlocksType } from "@lexical/selection";
// import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
// import {
//   FORMAT_TEXT_COMMAND,
//   REDO_COMMAND,
//   TextNode,
//   UNDO_COMMAND,
// } from "lexical";
// import {
//   AlignCenter,
//   AlignJustify,
//   AlignLeft,
//   AlignRight,
//   Bold,
//   ChevronDown,
//   Code,
//   Gift,
//   Heading1,
//   Heading2,
//   Heading3,
//   ImageIcon,
//   Italic,
//   Link as LinkIcon,
//   List,
//   ListOrdered,
//   PaintBucket,
//   Palette,
//   Quote,
//   Redo,
//   Strikethrough,
//   Subscript,
//   Superscript,
//   Type,
//   Underline,
//   Undo,
//   Video,
// } from "lucide-react";

// // Schadcn UI DropdownMenu
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@radix-ui/react-dropdown-menu";
// // import { INSERT_IMAGE_COMMAND } from "./plugings/ImagePlugin";
// // import { INSERT_YOUTUBE_COMMAND } from "./plugings/YouTubePlugin";
// import { $isElementNode, $isTextNode } from "lexical";

// const LowPriority = 1;

// const FONT_FAMILIES = [
//   { value: "system", label: "System" },
//   { value: "Arial", label: "Arial" },
//   { value: "Georgia", label: "Georgia" },
//   { value: "Courier New", label: "Courier New" },
//   { value: "Times New Roman", label: "Times New Roman" },
//   { value: "Verdana", label: "Verdana" },
// ];

// const FONT_SIZES = ["12", "14", "16", "18", "20", "24", "28", "32", "36", "48"];

// /* =======================
//    Theme
// ======================= */
// const editorTheme = {
//   paragraph: "mb-2",
//   quote: "border-l-4 border-gray-300 pl-4 italic my-4",
//   heading: {
//     h1: "text-4xl font-bold mb-4",
//     h2: "text-3xl font-bold mb-3",
//     h3: "text-2xl font-bold mb-2",
//   },
//   list: {
//     nested: { listitem: "list-none" },
//     ol: "list-decimal list-inside my-2",
//     ul: "list-disc list-inside my-2",
//     listitem: "ml-4",
//   },
//   link: "text-blue-600 underline cursor-pointer",
//   text: {
//     bold: "font-bold",
//     italic: "italic",
//     underline: "underline",
//     strikethrough: "line-through",
//     code: "bg-gray-100 px-1 py-0.5 rounded font-mono text-sm",
//   },
//   code: "bg-gray-900 text-gray-100 p-4 rounded-lg my-4 font-mono text-sm overflow-x-auto",
// };

// /* =======================
//    Editor Config
// ======================= */
// const initialConfig = {
//   namespace: "LexicalEditor",
//   theme: editorTheme,
//   nodes: [
//     HeadingNode,
//     QuoteNode,
//     ListNode,
//     ListItemNode,
//     CodeNode,
//     CodeHighlightNode,
//     LinkNode,
//     AutoLinkNode,
//     // ImageNode,
//     // YouTubeNode,
//   ],
//   onError(error: Error) {
//     console.error("Lexical error:", error);
//   },
// };

// /* =======================
//    OnChange Plugin
// ======================= */
// function OnChangePlugin({ onChange }: { onChange?: (value: string) => void }) {
//   const [editor] = useLexicalComposerContext();

//   useEffect(() => {
//     if (!onChange) return;

//     return editor.registerUpdateListener(
//       ({ editorState }: { editorState: EditorState }) => {
//         editorState.read(() => {
//           onChange($getRoot().getTextContent());
//         });
//       },
//     );
//   }, [editor, onChange]);

//   return null;
// }

// /* =======================
//    Initial Value Plugin
// ======================= */
// function SetInitialValuePlugin({ value }: { value?: string }) {
//   const [editor] = useLexicalComposerContext();
//   const didSet = useRef(false);

//   useEffect(() => {
//     if (!value || didSet.current) return;

//     editor.update(() => {
//       const root = $getRoot();
//       root.clear();

//       const paragraph = $createParagraphNode();
//       paragraph.append($createTextNode(value));
//       root.append(paragraph);
//     });

//     didSet.current = true;
//   }, [editor, value]);

//   return null;
// }

// /* =======================
//    Emoji Picker Plugin
// ======================= */
// function EmojiPlugin() {
//   const [editor] = useLexicalComposerContext();
//   const [showPicker, setShowPicker] = useState(false);

//   //   const handleEmojiClick = (emojiData: any) => {
//   //     setShowPicker(false);

//   //     editor.update(() => {
//   //       const selection = $getSelection();
//   //       if ($isRangeSelection(selection)) {
//   //         selection.insertText(emojiData.emoji);
//   //       }
//   //     });
//   //   };

//   return (
//     <>
//       {showPicker && (
//         <div className="absolute top-12 right-2 z-50">
//           {/* <EmojiPicker
//             onEmojiClick={handleEmojiClick}
//             height={350}
//             width={300}
//           /> */}
//           Emoji Picker
//         </div>
//       )}
//     </>
//   );
// }

// function RHFOnChangePlugin<T extends FieldValues>({
//   form,
//   name,
// }: {
//   form: UseFormReturn<T>;
//   name: Path<T>;
// }) {
//   const [editor] = useLexicalComposerContext();

//   useEffect(() => {
//     return editor.registerUpdateListener(({ editorState }) => {
//       const serializeNode = (node) => {
//         if ($isTextNode(node)) {
//           return {
//             text: node.getText(),
//             format: node.getFormat(),
//             style: node.getStyle(),
//             link: node.getLink?.() || null,
//           };
//         } else if ($isElementNode(node)) {
//           return {
//             type: node.getType(),
//             align: node.getFormat(),
//             indent: node.getIndent(),
//             children: node.getChildren().map(serializeNode),
//           };
//         }
//       };

//       let rootJson = {};
//       editorState.read(() => {
//         rootJson = serializeNode($getRoot());
//       });

//       form.setValue(name, rootJson, { shouldDirty: true, shouldTouch: true });
//     });
//   }, [editor, form, name]);

//   return null;
// }

// function RHFInitialValuePlugin<T extends FieldValues>({
//   form,
//   name,
// }: {
//   form: UseFormReturn<T>;
//   name: Path<T>;
// }) {
//   const [editor] = useLexicalComposerContext();
//   const initialized = useRef(false);

//   useEffect(() => {
//     if (initialized.current) return;

//     const value = form.getValues(name);
//     if (!value || typeof value !== "object") return;

//     try {
//       editor.setEditorState(editor.parseEditorState(value));
//       initialized.current = true;
//     } catch (error) {
//       console.error("Invalid Lexical JSON", error);
//     }
//   }, [editor, form, name]);

//   return null;
// }

// export function getStyledHtmlFromJson(json: string) {
//   const parsed = JSON.parse(json);

//   const editor = createEditor({
//     namespace: "read",
//     nodes: [
//       HeadingNode,
//       QuoteNode,
//       ListNode,
//       ListItemNode,
//       CodeNode,
//       CodeHighlightNode,
//       LinkNode,
//       AutoLinkNode,
//       // ImageNode,
//       // YouTubeNode,
//     ],
//     onError: () => {},
//   });

//   editor.setEditorState(editor.parseEditorState(parsed));

//   let html = "";
//   editor.getEditorState().read(() => {
//     html = $generateHtmlFromNodes(editor);
//   });

//   return html;
// }

// export default function LexicalEditorComponent<T extends FieldValues>({
//   form,
//   name,
// }: {
//   form: UseFormReturn<T>;
//   name: Path<T>;
// }) {
//   const contentEditableRef = useRef<HTMLDivElement>(null);

//   return (
//     <div className="rounded-lg border bg-white shadow-sm">
//       <LexicalComposer initialConfig={initialConfig}>
//         <ToolbarPlugin />
//         <EmojiPlugin />
//         <FloatingToolbarPlugin />

//         <RichTextPlugin
//           contentEditable={
//             <ContentEditable
//               ref={contentEditableRef}
//               className="min-h-[300px] p-4 outline-none"
//             />
//           }
//           placeholder={
//             <div className="absolute top-4 left-4 text-gray-400">
//               Write description...
//             </div>
//           }
//           ErrorBoundary={LexicalErrorBoundary}
//         />

//         <HistoryPlugin />
//         <ListPlugin />
//         <LinkPlugin />
//         <AutoFocusPlugin />

//         <RHFOnChangePlugin<T>
//           form={form}
//           name={name}
//         />
//         <RHFInitialValuePlugin<T>
//           form={form}
//           name={name}
//         />
//       </LexicalComposer>
//     </div>
//   );
// }

// // Devider component
// function Divider() {
//   return <div className="mx-1 h-6 w-px bg-gray-300" />;
// }

// function ToolbarPlugin() {
//   const [editor] = useLexicalComposerContext();
//   //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);

//   //   const handleEmojiClick = (emojiData: any) => {
//   // 	setShowEmojiPicker(false);
//   // 	editor.update(() => {
//   // 	  const selection = $getSelection();
//   // 	  if ($isRangeSelection(selection)) {
//   // 		selection.insertText(emojiData.emoji);
//   // 	  }
//   // 	});
//   //   };
//   const [isBold, setIsBold] = useState(false);
//   const [isItalic, setIsItalic] = useState(false);
//   const [isUnderline, setIsUnderline] = useState(false);
//   const [isStrikethrough, setIsStrikethrough] = useState(false);
//   const [isSubscript, setIsSubscript] = useState(false);
//   const [isSuperscript, setIsSuperscript] = useState(false);
//   const [isCode, setIsCode] = useState(false);
//   const [isLink, setIsLink] = useState(false);
//   const [blockType, setBlockType] = useState("paragraph");
//   const [fontSize, setFontSize] = useState("16");
//   const [fontFamily, setFontFamily] = useState("system");
//   const [alignment, setAlignment] = useState("left");
//   const [textColor, setTextColor] = useState("#000000");
//   const [bgColor, setBgColor] = useState("#FFFFFF");

//   const [showLinkModal, setShowLinkModal] = useState(false);

//   const updateToolbar = useCallback(() => {
//     const selection = $getSelection();
//     if ($isRangeSelection(selection)) {
//       setIsBold(selection.hasFormat("bold"));
//       setIsItalic(selection.hasFormat("italic"));
//       setIsUnderline(selection.hasFormat("underline"));
//       setIsStrikethrough(selection.hasFormat("strikethrough"));
//       setIsSubscript(selection.hasFormat("subscript"));
//       setIsSuperscript(selection.hasFormat("superscript"));
//       setIsCode(selection.hasFormat("code"));

//       const node = selection.anchor.getNode();
//       const parent = node.getParent();
//       setIsLink($isLinkNode(parent) || $isLinkNode(node));

//       const anchorNode = selection.anchor.getNode();
//       const element =
//         anchorNode.getKey() === "root"
//           ? anchorNode
//           : anchorNode.getTopLevelElementOrThrow();

//       const elementKey = element.getKey();
//       const elementDOM = editor.getElementByKey(elementKey);

//       if (elementDOM !== null) {
//         if ($isListNode(element)) {
//           const parentList = $getNearestNodeOfType(anchorNode, ListNode);
//           const type = parentList ? parentList.getTag() : element.getTag();
//           setBlockType(type);
//         } else {
//           const type = $isHeadingNode(element)
//             ? element.getTag()
//             : element.getType();
//           setBlockType(type);
//         }
//       }

//       const style = elementDOM?.getAttribute("style") || "";
//       const fontSizeMatch = style.match(/font-size:\s*(\d+)px/);
//       if (fontSizeMatch) {
//         setFontSize(fontSizeMatch[1]);
//       } else {
//         setFontSize("16");
//       }

//       const fontFamilyMatch = style.match(/font-family:\s*([^;]+)/);
//       if (fontFamilyMatch) {
//         setFontFamily(fontFamilyMatch[1].trim());
//       } else {
//         setFontFamily("system");
//       }

//       const colorMatch = style.match(/color:\s*(#[0-9a-f]{6}|rgb[^;]+)/i);
//       if (colorMatch) {
//         setTextColor(colorMatch[1]);
//       } else {
//         setTextColor("#000000");
//       }

//       const bgColorMatch = style.match(
//         /background-color:\s*(#[0-9a-f]{6}|rgb[^;]+)/i,
//       );
//       if (bgColorMatch) {
//         setBgColor(bgColorMatch[1]);
//       } else {
//         setBgColor("#FFFFFF");
//       }
//     }
//   }, [editor]);

//   useEffect(() => {
//     return mergeRegister(
//       editor.registerUpdateListener(({ editorState }) => {
//         editorState.read(() => {
//           updateToolbar();
//         });
//       }),
//       editor.registerCommand(
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         {} as any,
//         () => {
//           updateToolbar();
//           return false;
//         },
//         LowPriority,
//       ),
//     );
//   }, [editor, updateToolbar]);

//   const formatParagraph = () => {
//     editor.update(() => {
//       const selection = $getSelection();
//       if ($isRangeSelection(selection)) {
//         $setBlocksType(selection, () => $createParagraphNode());
//       }
//     });
//   };

//   const formatHeading = (headingSize: HeadingTagType) => {
//     if (blockType !== headingSize) {
//       editor.update(() => {
//         const selection = $getSelection();
//         if ($isRangeSelection(selection)) {
//           $setBlocksType(selection, () => $createHeadingNode(headingSize));
//         }
//       });
//     }
//   };

//   const formatBulletList = () => {
//     if (blockType !== "ul") {
//       editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
//     } else {
//       editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
//     }
//   };

//   const formatNumberedList = () => {
//     if (blockType !== "ol") {
//       editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
//     } else {
//       editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
//     }
//   };

//   const formatQuote = () => {
//     if (blockType !== "quote") {
//       editor.update(() => {
//         const selection = $getSelection();
//         if ($isRangeSelection(selection)) {
//           $setBlocksType(selection, () => $createQuoteNode());
//         }
//       });
//     }
//   };

//   const formatCode = () => {
//     editor.update(() => {
//       const selection = $getSelection();
//       if ($isRangeSelection(selection)) {
//         $setBlocksType(selection, () => $createCodeNode());
//       }
//     });
//   };

//   const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const size = e.target.value;
//     setFontSize(size);
//     editor.update(() => {
//       const selection = $getSelection();
//       if ($isRangeSelection(selection)) {
//         const nodes = selection.getNodes();
//         nodes.forEach((node) => {
//           if (node instanceof TextNode) {
//             const element = editor.getElementByKey(node.getKey());
//             if (element) {
//               element.style.fontSize = `${size}px`;
//             }
//           }
//         });
//       }
//     });
//   };

//   const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const family = e.target.value;
//     setFontFamily(family);
//     editor.update(() => {
//       const selection = $getSelection();
//       if ($isRangeSelection(selection)) {
//         const nodes = selection.getNodes();
//         nodes.forEach((node) => {
//           if (node instanceof TextNode) {
//             const element = editor.getElementByKey(node.getKey());
//             if (element && family !== "system") {
//               element.style.fontFamily = family;
//             }
//           }
//         });
//       }
//     });
//   };

//   const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const color = e.target.value;
//     setTextColor(color);
//     editor.update(() => {
//       const selection = $getSelection();
//       if ($isRangeSelection(selection)) {
//         const nodes = selection.getNodes();
//         nodes.forEach((node) => {
//           if (node instanceof TextNode) {
//             const element = editor.getElementByKey(node.getKey());
//             if (element) {
//               element.style.color = color;
//             }
//           }
//         });
//       }
//     });
//   };

//   const handleBgColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const color = e.target.value;
//     setBgColor(color);
//     editor.update(() => {
//       const selection = $getSelection();
//       if ($isRangeSelection(selection)) {
//         const nodes = selection.getNodes();
//         nodes.forEach((node) => {
//           if (node instanceof TextNode) {
//             const element = editor.getElementByKey(node.getKey());
//             if (element) {
//               element.style.backgroundColor = color;
//             }
//           }
//         });
//       }
//     });
//   };

//   const handleAlignment = (align: string) => {
//     setAlignment(align);
//     editor.update(() => {
//       const selection = $getSelection();
//       if ($isRangeSelection(selection)) {
//         const nodes = selection.getNodes();
//         nodes.forEach((node) => {
//           const element = editor.getElementByKey(node.getKey());
//           if (element) {
//             element.style.textAlign = align;
//           }
//         });
//       }
//     });
//   };

//   const insertLink = () => {
//     setShowLinkModal(true);
//   };

//   // const insertLink = useCallback(() => {
//   //   if (!isLink) {
//   //     const url = prompt("Enter URL:");
//   //     if (url) {
//   //       editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
//   //     }
//   //   } else {
//   //     editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
//   //   }
//   // }, [editor, isLink]);

//   //   const insertImage = () => {
//   // 	const url = prompt("Enter image URL or search for GIF:");
//   // 	if (url) {
//   // 	  editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
//   // 		src: url,
//   // 		altText: "Image",
//   // 	  });
//   // 	}
//   //   };

//   //   const insertGIF = () => {
//   // 	const query = prompt("Enter search term for GIF:");
//   // 	if (query) {
//   // 	  const gifUrl = `https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif`;
//   // 	  editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
//   // 		src: gifUrl,
//   // 		altText: query,
//   // 	  });
//   // 	}
//   //   };

//   //   const insertYouTube = () => {
//   // 	const url = prompt("Enter YouTube URL or Video ID:");
//   // 	if (url) {
//   // 	  editor.dispatchCommand(INSERT_YOUTUBE_COMMAND, url);
//   // 	}
//   //   };
//   // Add handler for custom list styles
//   // Removed custom list style handler; only bullet and numbered lists are supported now.

//   return (
//     <div className="flex flex-col gap-2 rounded-t-lg border-b border-gray-300 bg-gray-50 p-2">
//       <div className="flex flex-wrap items-center gap-1">
//         <button
//           onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
//           className="rounded p-2 transition-colors hover:bg-gray-200"
//           aria-label="Undo"
//           type="button"
//         >
//           <Undo size={18} />
//         </button>
//         <button
//           onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
//           className="rounded p-2 transition-colors hover:bg-gray-200"
//           aria-label="Redo"
//           type="button"
//         >
//           <Redo size={18} />
//         </button>

//         <Divider />

//         <select
//           value={fontFamily}
//           onChange={handleFontFamilyChange}
//           className="w-[100px] max-w-[120px] min-w-20 rounded border border-gray-300 px-2 py-1 text-sm hover:bg-gray-100"
//           aria-label="Font Family"
//         >
//           {FONT_FAMILIES.map((f) => (
//             <option
//               key={f.value}
//               value={f.value}
//             >
//               {f.label}
//             </option>
//           ))}
//         </select>

//         <select
//           value={fontSize}
//           onChange={handleFontSizeChange}
//           className="rounded border border-gray-300 px-2 py-1 text-sm hover:bg-gray-100"
//           aria-label="Font Size"
//         >
//           {FONT_SIZES.map((size) => (
//             <option
//               key={size}
//               value={size}
//             >
//               {size}
//             </option>
//           ))}
//         </select>

//         <Divider />

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <button
//               className={`flex cursor-pointer items-center gap-2 rounded border border-gray-300 bg-white px-2 py-1 transition-colors hover:bg-gray-100 focus:outline-none ${
//                 ["paragraph", "h1", "h2", "h3", "code", "quote"].includes(
//                   blockType,
//                 )
//                   ? "bg-gray-200"
//                   : ""
//               }`}
//               aria-label="Text Type"
//               type="button"
//             >
//               <span className="mr-1 font-medium">
//                 {blockType === "paragraph" && "Text"}
//                 {blockType === "h1" && "Heading 1"}
//                 {blockType === "h2" && "Heading 2"}
//                 {blockType === "h3" && "Heading 3"}
//                 {blockType === "code" && "Code Block"}
//                 {blockType === "quote" && "Quote"}
//               </span>
//               <ChevronDown size={16} />
//             </button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             align="end"
//             className="z-50 min-w-[140px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
//           >
//             <DropdownMenuItem
//               onSelect={formatParagraph}
//               className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-100"
//             >
//               <Type
//                 size={16}
//                 className="text-gray-600"
//               />
//               <span className="text-sm">Text</span>
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               onSelect={() => formatHeading("h1")}
//               className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-100"
//             >
//               <Heading1
//                 size={16}
//                 className="text-gray-600"
//               />
//               <span className="text-sm">Heading 1</span>
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               onSelect={() => formatHeading("h2")}
//               className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-100"
//             >
//               <Heading2
//                 size={16}
//                 className="text-gray-600"
//               />
//               <span className="text-sm">Heading 2</span>
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               onSelect={() => formatHeading("h3")}
//               className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-100"
//             >
//               <Heading3
//                 size={16}
//                 className="text-gray-600"
//               />
//               <span className="text-sm">Heading 3</span>
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               onSelect={formatCode}
//               className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-100"
//             >
//               <Code
//                 size={16}
//                 className="text-gray-600"
//               />
//               <span className="text-sm">Code Block</span>
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               onSelect={formatQuote}
//               className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-100"
//             >
//               <Quote
//                 size={16}
//                 className="text-gray-600"
//               />
//               <span className="text-sm">Quote</span>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>

//         <Divider />

//         <button
//           onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
//           className={`rounded p-2 transition-colors hover:bg-gray-200 ${
//             isBold ? "bg-gray-300" : ""
//           }`}
//           aria-label="Bold"
//           type="button"
//         >
//           <Bold size={18} />
//         </button>
//         <button
//           onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
//           className={`rounded p-2 transition-colors hover:bg-gray-200 ${
//             isItalic ? "bg-gray-300" : ""
//           }`}
//           aria-label="Italic"
//           type="button"
//         >
//           <Italic size={18} />
//         </button>
//         <button
//           onClick={() =>
//             editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
//           }
//           className={`rounded p-2 transition-colors hover:bg-gray-200 ${
//             isUnderline ? "bg-gray-300" : ""
//           }`}
//           aria-label="Underline"
//           type="button"
//         >
//           <Underline size={18} />
//         </button>
//         <button
//           onClick={() =>
//             editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
//           }
//           className={`rounded p-2 transition-colors hover:bg-gray-200 ${
//             isStrikethrough ? "bg-gray-300" : ""
//           }`}
//           aria-label="Strikethrough"
//           type="button"
//         >
//           <Strikethrough size={18} />
//         </button>
//         <button
//           onClick={() =>
//             editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")
//           }
//           className={`rounded p-2 transition-colors hover:bg-gray-200 ${
//             isSubscript ? "bg-gray-300" : ""
//           }`}
//           aria-label="Subscript"
//           type="button"
//         >
//           <Subscript size={18} />
//         </button>
//         <button
//           onClick={() =>
//             editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript")
//           }
//           className={`rounded p-2 transition-colors hover:bg-gray-200 ${
//             isSuperscript ? "bg-gray-300" : ""
//           }`}
//           aria-label="Superscript"
//           type="button"
//         >
//           <Superscript size={18} />
//         </button>
//         {/* <button
// 		  onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
// 		  className={`p-2 hover:bg-gray-200 rounded transition-colors ${
// 			isCode ? "bg-gray-300" : ""
// 		  }`}
// 		  aria-label="Code"
// 		  type="button"
// 		>
// 		  <Code size={18} />
// 		</button> */}

//         <Divider />

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <button
//               className={`flex cursor-pointer items-center gap-2 rounded border border-gray-300 bg-white px-2 py-1 transition-colors hover:bg-gray-100 focus:outline-none ${
//                 [
//                   "ul",
//                   "ol",
//                   "disc",
//                   "circle",
//                   "square",
//                   "decimal",
//                   "lower-alpha",
//                   "upper-alpha",
//                   "lower-roman",
//                   "upper-roman",
//                 ].includes(blockType)
//                   ? "bg-gray-200"
//                   : ""
//               }`}
//               aria-label="List Style"
//               type="button"
//             >
//               <span className="mr-1 font-medium">
//                 {blockType === "ul" && "Bullet List"}
//                 {blockType === "ol" && "Numbered List"}
//                 {blockType === "disc" && "Disc List"}
//                 {blockType === "circle" && "Circle List"}
//                 {blockType === "square" && "Square List"}
//                 {blockType === "decimal" && "Decimal List"}
//                 {blockType === "lower-alpha" && "Lower Alpha List"}
//                 {blockType === "upper-alpha" && "Upper Alpha List"}
//                 {blockType === "lower-roman" && "Lower Roman List"}
//                 {blockType === "upper-roman" && "Upper Roman List"}
//                 {![
//                   "ul",
//                   "ol",
//                   "disc",
//                   "circle",
//                   "square",
//                   "decimal",
//                   "lower-alpha",
//                   "upper-alpha",
//                   "lower-roman",
//                   "upper-roman",
//                 ].includes(blockType) && "List"}
//               </span>
//               <ChevronDown size={16} />
//             </button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             align="end"
//             className="z-50 min-w-40 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
//           >
//             <DropdownMenuItem
//               onSelect={formatBulletList}
//               className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-100"
//             >
//               <List
//                 size={16}
//                 className="text-gray-600"
//               />
//               <span className="text-sm">Bullet List</span>
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               onSelect={formatNumberedList}
//               className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-100"
//             >
//               <ListOrdered
//                 size={16}
//                 className="text-gray-600"
//               />
//               <span className="text-sm">Numbered List</span>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>

//         {/* Quote now in dropdown above */}

//         <Divider />

//         {/* <button
// 		  onClick={insertLink}
// 		  className={`p-2 hover:bg-gray-200 rounded transition-colors ${
// 			isLink ? "bg-gray-300" : ""
// 		  }`}
// 		  aria-label="Insert Link"
// 		  type="button"
// 		>
// 		  <LinkIcon size={18} />
// 		</button> */}

//         {/* <Divider /> */}

//         <div className="flex items-center gap-1">
//           <Palette
//             size={18}
//             className="text-gray-600"
//           />
//           <div className="relative">
//             <input
//               type="color"
//               value={textColor}
//               onChange={handleTextColorChange}
//               className="h-8 w-8 cursor-pointer rounded border border-gray-300"
//               aria-label="Text Color"
//             />
//           </div>
//         </div>

//         <div className="flex items-center gap-1">
//           <PaintBucket
//             size={18}
//             className="text-gray-600"
//           />
//           <div className="relative">
//             <input
//               type="color"
//               value={bgColor}
//               onChange={handleBgColorChange}
//               className="h-8 w-8 cursor-pointer rounded border border-gray-300"
//               aria-label="Background Color"
//             />
//           </div>
//         </div>

//         <Divider />
//         <button
//           onClick={insertLink}
//           className={`rounded p-2 transition-colors hover:bg-gray-200 ${
//             isLink ? "bg-gray-300" : ""
//           }`}
//           aria-label="Insert Link"
//           type="button"
//         >
//           <LinkIcon size={18} />
//         </button>

//         <button
//           // onClick={insertImage}
//           className="rounded p-2 transition-colors hover:bg-gray-200"
//           aria-label="Insert Image"
//           type="button"
//         >
//           <ImageIcon size={18} />
//         </button>

//         <button
//           // onClick={insertGIF}
//           className="rounded p-2 transition-colors hover:bg-gray-200"
//           aria-label="Insert GIF"
//           type="button"
//         >
//           <Gift size={18} />
//         </button>

//         <button
//           // onClick={insertYouTube}
//           className="rounded p-2 transition-colors hover:bg-gray-200"
//           aria-label="Insert YouTube Video"
//           type="button"
//         >
//           <Video size={18} />
//         </button>
//         <Divider />

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <button
//               className={`py-1f flex cursor-pointer items-center gap-2 rounded border border-gray-300 bg-white px-2 transition-colors hover:bg-gray-100 focus:outline-none ${
//                 ["left", "center", "right", "justify"].includes(alignment)
//                   ? "bg-gray-200"
//                   : ""
//               }`}
//               aria-label="Text Alignment"
//               type="button"
//             >
//               <span className="mr-1 font-medium">
//                 {alignment === "left" && "Left"}
//                 {alignment === "center" && "Center"}
//                 {alignment === "right" && "Right"}
//                 {alignment === "justify" && "Justify"}
//               </span>
//               <ChevronDown size={16} />
//             </button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             align="end"
//             className="z-50 min-w-[140px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
//           >
//             <DropdownMenuItem
//               onSelect={() => handleAlignment("left")}
//               className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-100"
//             >
//               <AlignLeft
//                 size={16}
//                 className="text-gray-600"
//               />
//               <span className="text-sm">Left</span>
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               onSelect={() => handleAlignment("center")}
//               className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-100"
//             >
//               <AlignCenter
//                 size={16}
//                 className="text-gray-600"
//               />
//               <span className="text-sm">Center</span>
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               onSelect={() => handleAlignment("right")}
//               className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-100"
//             >
//               <AlignRight
//                 size={16}
//                 className="text-gray-600"
//               />
//               <span className="text-sm">Right</span>
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               onSelect={() => handleAlignment("justify")}
//               className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-100"
//             >
//               <AlignJustify
//                 size={16}
//                 className="text-gray-600"
//               />
//               <span className="text-sm">Justify</span>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       {showLinkModal && (
//         <LinkModal
//           editor={editor}
//           onClose={() => setShowLinkModal(false)}
//           isLink={isLink}
//         />
//       )}
//     </div>
//   );
// }

// function getDOMRangeRect(
//   nativeSelection: Selection,
//   rootElement: HTMLElement,
// ): DOMRect {
//   const domRange = nativeSelection.getRangeAt(0);

//   let rect: DOMRect;

//   if (nativeSelection.anchorNode === rootElement) {
//     let inner = rootElement;
//     while (inner.firstElementChild != null) {
//       inner = inner.firstElementChild as HTMLElement;
//     }
//     rect = inner.getBoundingClientRect();
//   } else {
//     rect = domRange.getBoundingClientRect();
//   }

//   return rect;
// }

// function setFloatingElemPosition(
//   targetRect: DOMRect | null,
//   floatingElem: HTMLElement,
//   anchorElem: HTMLElement,
// ): void {
//   const scrollerElem = anchorElem.parentElement;

//   if (targetRect === null || !scrollerElem) {
//     floatingElem.style.opacity = "0";
//     floatingElem.style.transform = "translate(-10000px, -10000px)";
//     return;
//   }

//   const floatingElemRect = floatingElem.getBoundingClientRect();
//   const anchorElementRect = anchorElem.getBoundingClientRect();
//   const editorScrollerRect = scrollerElem.getBoundingClientRect();

//   let top = targetRect.top - floatingElemRect.height - 10;
//   let left =
//     targetRect.left - floatingElemRect.width / 2 + targetRect.width / 2;

//   if (top < editorScrollerRect.top) {
//     top = targetRect.bottom + 10;
//   }

//   if (left < editorScrollerRect.left) {
//     left = editorScrollerRect.left + 10;
//   }

//   if (left + floatingElemRect.width > editorScrollerRect.right) {
//     left = editorScrollerRect.right - floatingElemRect.width - 10;
//   }

//   top -= anchorElementRect.top;
//   left -= anchorElementRect.left;

//   floatingElem.style.opacity = "1";
//   floatingElem.style.transform = `translate(${left}px, ${top}px)`;
// }

// function FloatingToolbarPlugin() {
//   const [editor] = useLexicalComposerContext();
//   const [isText, setIsText] = useState(false);
//   const [isLink, setIsLink] = useState(false);
//   const [isBold, setIsBold] = useState(false);
//   const [isItalic, setIsItalic] = useState(false);
//   const [isUnderline, setIsUnderline] = useState(false);
//   const [isStrikethrough, setIsStrikethrough] = useState(false);
//   const [fontSize, setFontSize] = useState("16");
//   const [textColor, setTextColor] = useState("#000000");
//   const [showColorPicker, setShowColorPicker] = useState(false);
//   const [showFontSize, setShowFontSize] = useState(false);

//   const popupRef = useRef<HTMLDivElement>(null);
//   const colorPickerRef = useRef<HTMLDivElement>(null);

//   const updatePopup = useCallback(() => {
//     editor.getEditorState().read(() => {
//       const selection = $getSelection();

//       const popupElement = popupRef.current;
//       const nativeSelection = window.getSelection();

//       if (popupElement === null) {
//         return;
//       }

//       const rootElement = editor.getRootElement();
//       if (
//         selection !== null &&
//         nativeSelection !== null &&
//         !nativeSelection.isCollapsed &&
//         rootElement !== null &&
//         rootElement.contains(nativeSelection.anchorNode)
//       ) {
//         const domRange = getDOMRangeRect(nativeSelection, rootElement);

//         setFloatingElemPosition(domRange, popupElement, rootElement);
//       } else {
//         setFloatingElemPosition(null, popupElement, rootElement!);
//       }
//     });
//   }, [editor]);

//   const updateToolbar = useCallback(() => {
//     const selection = $getSelection();
//     if ($isRangeSelection(selection)) {
//       setIsBold(selection.hasFormat("bold"));
//       setIsItalic(selection.hasFormat("italic"));
//       setIsUnderline(selection.hasFormat("underline"));
//       setIsStrikethrough(selection.hasFormat("strikethrough"));

//       const node = selection.anchor.getNode();
//       const parent = node.getParent();
//       setIsLink($isLinkNode(parent) || $isLinkNode(node));

//       if (!selection.isCollapsed()) {
//         setIsText(true);
//       } else {
//         setIsText(false);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         colorPickerRef.current &&
//         !colorPickerRef.current.contains(event.target as Node)
//       ) {
//         setShowColorPicker(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     editor.getEditorState().read(() => {
//       updateToolbar();
//     });
//     return mergeRegister(
//       editor.registerUpdateListener(({ editorState }) => {
//         editorState.read(() => {
//           updateToolbar();
//         });
//       }),
//       editor.registerCommand(
//         SELECTION_CHANGE_COMMAND,
//         () => {
//           updateToolbar();
//           updatePopup();
//           return false;
//         },
//         COMMAND_PRIORITY_LOW,
//       ),
//     );
//   }, [editor, updateToolbar, updatePopup]);

//   useEffect(() => {
//     const onResize = () => {
//       updatePopup();
//     };
//     window.addEventListener("resize", onResize);

//     return () => {
//       window.removeEventListener("resize", onResize);
//     };
//   }, [updatePopup]);

//   const insertLink = () => {
//     if (!isLink) {
//       const url = prompt("Enter URL:");
//       if (url) {
//         editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
//       }
//     } else {
//       editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
//     }
//   };

//   const handleFontSizeChange = (size: string) => {
//     setFontSize(size);
//     setShowFontSize(false);
//   };

//   const handleColorChange = (color: string) => {
//     setTextColor(color);
//     setShowColorPicker(false);
//   };

//   const FONT_SIZES = ["12", "14", "16", "18", "20", "24", "28", "32"];
//   const COLORS = [
//     "#000000",
//     "#FF0000",
//     "#00FF00",
//     "#0000FF",
//     "#FFFF00",
//     "#FF00FF",
//     "#00FFFF",
//     "#FFA500",
//     "#800080",
//     "#008000",
//   ];

//   if (!isText) {
//     return null;
//   }

//   return (
//     <div
//       ref={popupRef}
//       className="absolute top-0 left-0 z-50 flex items-center gap-1 rounded-lg bg-gray-900 px-2 py-1.5 text-white opacity-0 shadow-lg transition-opacity"
//       style={{ pointerEvents: "auto" }}
//     >
//       <button
//         onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
//         className={`rounded p-1.5 transition-colors hover:bg-gray-700 ${
//           isBold ? "bg-gray-700" : ""
//         }`}
//         aria-label="Bold"
//         type="button"
//       >
//         <Bold size={16} />
//       </button>

//       <button
//         onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
//         className={`rounded p-1.5 transition-colors hover:bg-gray-700 ${
//           isItalic ? "bg-gray-700" : ""
//         }`}
//         aria-label="Italic"
//         type="button"
//       >
//         <Italic size={16} />
//       </button>

//       <button
//         onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
//         className={`rounded p-1.5 transition-colors hover:bg-gray-700 ${
//           isUnderline ? "bg-gray-700" : ""
//         }`}
//         aria-label="Underline"
//         type="button"
//       >
//         <Underline size={16} />
//       </button>

//       <button
//         onClick={() =>
//           editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
//         }
//         className={`rounded p-1.5 transition-colors hover:bg-gray-700 ${
//           isStrikethrough ? "bg-gray-700" : ""
//         }`}
//         aria-label="Strikethrough"
//         type="button"
//       >
//         <Strikethrough size={16} />
//       </button>

//       <div className="mx-1 h-5 w-px bg-gray-600" />

//       <div className="relative">
//         <button
//           onClick={() => setShowFontSize(!showFontSize)}
//           className="flex items-center gap-1 rounded p-1.5 transition-colors hover:bg-gray-700"
//           aria-label="Font Size"
//           type="button"
//         >
//           <Type size={16} />
//           <span className="text-xs">{fontSize}</span>
//         </button>

//         {showFontSize && (
//           <div className="absolute top-full z-50 mt-1 min-w-[80px] rounded bg-white py-1 text-black shadow-lg">
//             {FONT_SIZES.map((size) => (
//               <button
//                 key={size}
//                 onClick={() => handleFontSizeChange(size)}
//                 className="block w-full px-3 py-1 text-left text-sm hover:bg-gray-100"
//                 type="button"
//               >
//                 {size}px
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       <div
//         className="relative"
//         ref={colorPickerRef}
//       >
//         <button
//           onClick={() => setShowColorPicker(!showColorPicker)}
//           className="rounded p-1.5 transition-colors hover:bg-gray-700"
//           aria-label="Text Color"
//           type="button"
//         >
//           <Palette size={16} />
//         </button>

//         {showColorPicker && (
//           <div className="absolute top-full z-50 mt-1 rounded bg-white p-2 shadow-lg">
//             <div className="grid grid-cols-5 gap-1">
//               {COLORS.map((color) => (
//                 <button
//                   key={color}
//                   onClick={() => handleColorChange(color)}
//                   className="h-6 w-6 rounded border border-gray-300 transition-transform hover:scale-110"
//                   style={{ backgroundColor: color }}
//                   type="button"
//                   aria-label={`Color ${color}`}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="mx-1 h-5 w-px bg-gray-600" />

//       <button
//         onClick={insertLink}
//         className={`rounded p-1.5 transition-colors hover:bg-gray-700 ${
//           isLink ? "bg-gray-700" : ""
//         }`}
//         aria-label="Link"
//         type="button"
//       >
//         <LinkIcon size={16} />
//       </button>
//     </div>
//   );
// }

// type LinkModalProps = {
//   editor: LexicalEditor;
//   onClose: () => void;
//   isLink: boolean;
// };

// function LinkModal({ editor, onClose, isLink }: LinkModalProps) {
//   const [linkUrl, setLinkUrl] = useState("");
//   const [linkText, setLinkText] = useState("");

//   useEffect(() => {
//     editor.getEditorState().read(() => {
//       const selection = $getSelection();
//       if ($isRangeSelection(selection)) {
//         const node = selection.anchor.getNode();
//         const parent = node.getParent();

//         if ($isLinkNode(parent)) {
//           setLinkUrl(parent.getURL());
//         } else if ($isLinkNode(node)) {
//           setLinkUrl(node.getURL());
//         }

//         const text = selection.getTextContent();
//         setLinkText(text);
//       }
//     });
//   }, [editor]);

//   const handleInsertLink = () => {
//     if (!linkUrl) return;

//     editor.update(() => {
//       const selection = $getSelection();
//       if ($isRangeSelection(selection)) {
//         if (linkText && selection.isCollapsed()) {
//           selection.insertText(linkText);
//         }
//       }
//     });

//     editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
//     onClose();
//   };

//   const handleRemoveLink = () => {
//     editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
//     onClose();
//   };

//   return (
//     <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center">
//       <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
//         <div className="mb-4 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <LinkIcon
//               size={20}
//               className="text-blue-600"
//             />
//             <h3 className="text-lg font-semibold">
//               {isLink ? "Edit Link" : "Insert Link"}
//             </h3>
//           </div>
//           <button
//             onClick={onClose}
//             className="rounded p-1 transition-colors hover:bg-gray-100"
//             type="button"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <label className="mb-1 block text-sm font-medium text-gray-700">
//               Link Text
//             </label>
//             <input
//               type="text"
//               value={linkText}
//               onChange={(e) => setLinkText(e.target.value)}
//               placeholder="Enter text to display"
//               className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label className="mb-1 block text-sm font-medium text-gray-700">
//               URL
//             </label>
//             <input
//               type="url"
//               value={linkUrl}
//               onChange={(e) => setLinkUrl(e.target.value)}
//               placeholder="https://example.com"
//               className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               autoFocus
//             />
//           </div>

//           <div className="flex items-center gap-2 pt-2">
//             <button
//               onClick={handleInsertLink}
//               disabled={!linkUrl}
//               className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
//               type="button"
//             >
//               {isLink ? "Update Link" : "Insert Link"}
//             </button>

//             {isLink && (
//               <button
//                 onClick={handleRemoveLink}
//                 className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
//                 type="button"
//               >
//                 <Trash2 size={16} />
//                 Remove
//               </button>
//             )}

//             <button
//               onClick={onClose}
//               className="rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-100"
//               type="button"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
