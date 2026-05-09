"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Extension } from "@tiptap/core";
import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
	AlignCenter,
	AlignLeft,
	AlignRight,
	Bold,
	FileText,
	Heading1,
	Heading2,
	Heading3,
	Image as ImageIcon,
	Italic,
	Link as LinkIcon,
	List,
	ListOrdered,
	Quote,
	Redo,
	Type,
	Underline as UnderlineIcon,
	Undo,
	Video,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

interface RichTextEditorProps {
	content?: string;
	onChange?: (content: string) => void;
	placeholder?: string;
	className?: string;
	editable?: boolean;
	onAddImage?: () => void;
	onAddVideo?: () => void;
	onAddText?: () => void;
}

const FONT_FAMILIES = [
	{ value: "Arial", label: "Arial" },
	{ value: "Helvetica", label: "Helvetica" },
	{ value: "Times New Roman", label: "Times New Roman" },
	{ value: "Courier New", label: "Courier New" },
	{ value: "Verdana", label: "Verdana" },
	{ value: "Georgia", label: "Georgia" },
	{ value: "Palatino", label: "Palatino" },
	{ value: "Garamond", label: "Garamond" },
	{ value: "Comic Sans MS", label: "Comic Sans MS" },
	{ value: "Trebuchet MS", label: "Trebuchet MS" },
	{ value: "Impact", label: "Impact" },
];

const FONT_SIZES = [
	{ value: "8px", label: "8" },
	{ value: "10px", label: "10" },
	{ value: "12px", label: "12" },
	{ value: "14px", label: "14" },
	{ value: "16px", label: "16" },
	{ value: "18px", label: "18" },
	{ value: "20px", label: "20" },
	{ value: "24px", label: "24" },
	{ value: "28px", label: "28" },
	{ value: "32px", label: "32" },
	{ value: "36px", label: "36" },
	{ value: "48px", label: "48" },
];

// Custom FontSize extension
const FontSize = Extension.create({
	name: "fontSize",

	addOptions() {
		return {
			types: ["textStyle"],
		};
	},

	addGlobalAttributes() {
		return [
			{
				types: this.options.types,
				attributes: {
					fontSize: {
						default: null,
						parseHTML: (element) => {
							const fontSize = element.style.fontSize;
							if (!fontSize) return null;
							// Return as-is if it already has 'px', otherwise add it
							return fontSize.includes("px") ? fontSize : `${fontSize}px`;
						},
						renderHTML: (attributes) => {
							if (!attributes.fontSize) {
								return {};
							}
							return {
								style: `font-size: ${attributes.fontSize}`,
							};
						},
					},
				},
			},
		];
	},

	addCommands() {
		return {
			setFontSize:
				(fontSize: string) =>
				({ chain, state }) => {
					return chain().focus().setMark("textStyle", { fontSize }).run();
				},
			unsetFontSize:
				() =>
				({ chain }) => {
					return chain()
						.focus()
						.setMark("textStyle", { fontSize: null })
						.removeEmptyTextStyle()
						.run();
				},
		};
	},
});

export function RichTextEditor({
	content = "",
	onChange,
	placeholder = "Enter your text here...",
	className,
	editable = true,
	onAddImage,
	onAddVideo,
	onAddText,
}: RichTextEditorProps) {
	const [updateTrigger, setUpdateTrigger] = useState(0);
	const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
	const [linkUrl, setLinkUrl] = useState("");
	const [linkText, setLinkText] = useState("");

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: {
					levels: [1, 2, 3],
				},
			}),
			Placeholder.configure({
				placeholder,
			}),
			TextStyle,
			Color,
			// Underline,
			FontFamily.configure({
				types: ["textStyle"],
			}),
			FontSize,
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			// Link.configure({
			//   openOnClick: false,
			//   HTMLAttributes: {
			//     class: "text-primary underline",
			//   },
			// }),
		],
		content,
		editable,
		immediatelyRender: false,
		onUpdate: ({ editor }) => {
			const html = editor.getHTML();
			onChange?.(html);
			// Force re-render to update active states
			setUpdateTrigger((prev) => prev + 1);
		},
		onSelectionUpdate: () => {
			// Force re-render when selection changes to update active states
			setUpdateTrigger((prev) => prev + 1);
		},
		editorProps: {
			attributes: {
				class: cn(
					"focus:outline-none min-h-[200px] max-w-none p-4 text-foreground dark:text-slate-200",
					"[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6 [&_h1]:text-foreground dark:[&_h1]:text-slate-200",
					"[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:text-foreground dark:[&_h2]:text-slate-200",
					"[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-foreground dark:[&_h3]:text-slate-200",
					"[&_p]:mb-3 [&_p]:text-foreground dark:[&_p]:text-slate-200",
					"[&_strong]:font-bold [&_strong]:text-foreground dark:[&_strong]:text-slate-100",
					"[&_em]:italic [&_em]:text-foreground dark:[&_em]:text-slate-200",
					"[&_u]:underline [&_u]:text-foreground dark:[&_u]:text-slate-200",
					"[&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-3 [&_ul]:text-foreground dark:[&_ul]:text-slate-200",
					"[&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-3 [&_ol]:text-foreground dark:[&_ol]:text-slate-200",
					"[&_li]:mb-1 [&_li]:text-foreground dark:[&_li]:text-slate-200",
					"[&_blockquote]:border-l-4 [&_blockquote]:border-muted [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:mb-3 [&_blockquote]:text-foreground dark:[&_blockquote]:text-slate-200",
					"[&_a]:text-primary [&_a]:underline",
					"[&_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_p.is-editor-empty:first-child::before]:text-muted-foreground [&_p.is-editor-empty:first-child::before]:float-left [&_p.is-editor-empty:first-child::before]:pointer-events-none [&_p.is-editor-empty:first-child::before]:h-0",
				),
			},
		},
	});

	const setHeading = useCallback(
		(level: 1 | 2 | 3) => {
			editor?.chain().focus().toggleHeading({ level }).run();
		},
		[editor],
	);

	const setFontFamily = useCallback(
		(fontFamily: string) => {
			if (!editor) return;
			editor.chain().focus().setFontFamily(fontFamily).run();
			setUpdateTrigger((prev) => prev + 1);
		},
		[editor],
	);

	const setFontSize = useCallback(
		(fontSize: string) => {
			if (!editor) return;
			editor.chain().focus().setFontSize(fontSize).run();
			// Force re-render to update font size display
			setUpdateTrigger((prev) => prev + 1);
		},
		[editor],
	);

	const setTextColor = useCallback(
		(color: string) => {
			if (!editor) return;
			editor.chain().focus().setColor(color).run();
		},
		[editor],
	);

	const setLink = useCallback(() => {
		if (!editor) return;

		// Get selected text
		const { from, to } = editor.state.selection;
		const selectedText = editor.state.doc.textBetween(from, to, " ");
		const previousUrl = editor.getAttributes("link").href;

		// If there's already a link, allow editing it
		if (previousUrl) {
			setLinkUrl(previousUrl);
			setLinkText(selectedText || previousUrl);
		} else {
			// If text is selected, use it as link text
			setLinkUrl("");
			setLinkText(selectedText);
		}

		setIsLinkDialogOpen(true);
	}, [editor]);

	const handleLinkSubmit = useCallback(() => {
		if (!editor || !linkUrl.trim()) {
			setIsLinkDialogOpen(false);
			return;
		}

		// Ensure URL has protocol
		let url = linkUrl.trim();
		if (!url.match(/^https?:\/\//i)) {
			url = `https://${url}`;
		}

		const { from, to } = editor.state.selection;
		const selectedText = editor.state.doc.textBetween(from, to, " ");

		if (selectedText) {
			// If text is selected, replace it with the link text and add the link
			if (linkText.trim()) {
				editor
					.chain()
					.focus()
					.deleteSelection()
					.insertContent(`<a href="${url}">${linkText.trim()}</a>`)
					.run();
			} else {
				// Use selected text as link text
				editor.chain().focus().setLink({ href: url }).run();
			}
		} else {
			// No text selected, insert link with custom text
			const textToInsert = linkText.trim() || url;
			editor
				.chain()
				.focus()
				.insertContent(`<a href="${url}">${textToInsert}</a>`)
				.run();
		}

		setIsLinkDialogOpen(false);
		setLinkUrl("");
		setLinkText("");
		setUpdateTrigger((prev) => prev + 1);
	}, [editor, linkUrl, linkText]);

	const handleRemoveLink = useCallback(() => {
		if (!editor) return;
		editor.chain().focus().extendMarkRange("link").unsetLink().run();
		setIsLinkDialogOpen(false);
		setLinkUrl("");
		setLinkText("");
		setUpdateTrigger((prev) => prev + 1);
	}, [editor]);

	const currentFontFamily = useMemo(() => {
		if (!editor) return FONT_FAMILIES[0]?.value || "";
		const fontFamily = editor.getAttributes("textStyle").fontFamily;
		return fontFamily || FONT_FAMILIES[0]?.value || "";
	}, [editor, updateTrigger]);

	const currentFontSize = useMemo(() => {
		if (!editor) return FONT_SIZES[0]?.value || "";
		const fontSize = editor.getAttributes("textStyle").fontSize;
		return fontSize || FONT_SIZES[0]?.value || "";
	}, [editor, updateTrigger]);

	if (!editor) {
		return null;
	}

	return (
		<div
			className={cn(
				"flex flex-col gap-2 overflow-hidden rounded-lg border",
				className,
			)}
		>
			{/* Toolbar */}
			<div className="bg-muted/30 flex flex-wrap items-center gap-1 border-b p-2 dark:bg-slate-800/50">
				{/* Font Family */}
				<Select
					value={currentFontFamily}
					onValueChange={(value) => setFontFamily(value)}
				>
					<SelectTrigger className="h-8 min-w-[140px] text-xs font-medium">
						<Type className="mr-1.5 h-3 w-3 flex-shrink-0" />
						<SelectValue className="text-foreground font-medium">
							{FONT_FAMILIES.find((f) => f.value === currentFontFamily)
								?.label ||
								FONT_FAMILIES[0]?.label ||
								"Font"}
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{FONT_FAMILIES.map((font) => (
							<SelectItem key={font.value} value={font.value}>
								<span style={{ fontFamily: font.value }}>{font.label}</span>
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{/* Font Size */}
				<Select
					value={currentFontSize}
					onValueChange={(value) => setFontSize(value)}
				>
					<SelectTrigger className="h-8 min-w-[95px] text-sm font-semibold">
						<svg
							className="mr-1.5 h-3.5 w-6 flex-shrink-0"
							viewBox="0 0 24 16"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<text
								x="0"
								y="12"
								fontSize="12"
								fontWeight="700"
								fill="currentColor"
							>
								A
							</text>
							<text
								x="8"
								y="10"
								fontSize="8"
								fontWeight="700"
								fill="currentColor"
							>
								A
							</text>
						</svg>
						<SelectValue className="text-foreground dark:text-foreground font-semibold">
							{FONT_SIZES.find((s) => s.value === currentFontSize)?.label ||
								FONT_SIZES[0]?.label ||
								"Size"}
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{FONT_SIZES.map((size) => (
							<SelectItem key={size.value} value={size.value}>
								<span className="font-medium">{size.label}</span>
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<div className="bg-border mx-1 h-6 w-px" />

				{/* Text Formatting */}
				<div className="flex items-center gap-1">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => {
							editor.chain().focus().toggleBold().run();
							setUpdateTrigger((prev) => prev + 1);
						}}
						disabled={!editor.can().chain().focus().toggleBold().run()}
						className={cn(
							"h-8 w-8 p-0 transition-all",
							editor.isActive("bold")
								? "bg-primary text-primary-foreground dark:bg-primary/80 border-primary/20 border shadow-sm dark:text-white"
								: "hover:bg-muted",
						)}
					>
						<Bold className="h-4 w-4" />
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => {
							editor.chain().focus().toggleItalic().run();
							setUpdateTrigger((prev) => prev + 1);
						}}
						disabled={!editor.can().chain().focus().toggleItalic().run()}
						className={cn(
							"h-8 w-8 p-0 transition-all",
							editor.isActive("italic")
								? "bg-primary text-primary-foreground dark:bg-primary/80 border-primary/20 border shadow-sm dark:text-white"
								: "hover:bg-muted",
						)}
					>
						<Italic className="h-4 w-4" />
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => {
							editor.chain().focus().toggleUnderline().run();
							setUpdateTrigger((prev) => prev + 1);
						}}
						className={cn(
							"h-8 w-8 p-0 transition-all",
							editor.isActive("underline")
								? "bg-primary text-primary-foreground dark:bg-primary/80 border-primary/20 border shadow-sm dark:text-white"
								: "hover:bg-muted",
						)}
					>
						<UnderlineIcon className="h-4 w-4" />
					</Button>
				</div>

				<div className="bg-border mx-1 h-6 w-px" />

				{/* Headings */}
				<div className="flex items-center gap-1">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => setHeading(1)}
						className={cn(
							"h-8 w-8 p-0 transition-all",
							editor.isActive("heading", { level: 1 })
								? "bg-primary text-primary-foreground dark:bg-primary/80 border-primary/20 border shadow-sm dark:text-white"
								: "hover:bg-muted",
						)}
					>
						<Heading1 className="h-4 w-4" />
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => setHeading(2)}
						className={cn(
							"h-8 w-8 p-0 transition-all",
							editor.isActive("heading", { level: 2 })
								? "bg-primary text-primary-foreground dark:bg-primary/80 border-primary/20 border shadow-sm dark:text-white"
								: "hover:bg-muted",
						)}
					>
						<Heading2 className="h-4 w-4" />
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => setHeading(3)}
						className={cn(
							"h-8 w-8 p-0 transition-all",
							editor.isActive("heading", { level: 3 })
								? "bg-primary text-primary-foreground dark:bg-primary/80 border-primary/20 border shadow-sm dark:text-white"
								: "hover:bg-muted",
						)}
					>
						<Heading3 className="h-4 w-4" />
					</Button>
				</div>

				<div className="bg-border mx-1 h-6 w-px" />

				{/* Lists */}
				<div className="flex items-center gap-1">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						className={cn(
							"h-8 w-8 p-0 transition-all",
							editor.isActive("bulletList")
								? "bg-primary text-primary-foreground dark:bg-primary/80 border-primary/20 border shadow-sm dark:text-white"
								: "hover:bg-muted",
						)}
					>
						<List className="h-4 w-4" />
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
						className={cn(
							"h-8 w-8 p-0 transition-all",
							editor.isActive("orderedList")
								? "bg-primary text-primary-foreground dark:bg-primary/80 border-primary/20 border shadow-sm dark:text-white"
								: "hover:bg-muted",
						)}
					>
						<ListOrdered className="h-4 w-4" />
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => editor.chain().focus().toggleBlockquote().run()}
						className={cn(
							"h-8 w-8 p-0 transition-all",
							editor.isActive("blockquote")
								? "bg-primary text-primary-foreground dark:bg-primary/80 border-primary/20 border shadow-sm dark:text-white"
								: "hover:bg-muted",
						)}
					>
						<Quote className="h-4 w-4" />
					</Button>
				</div>

				<div className="bg-border mx-1 h-6 w-px" />

				{/* Alignment */}
				<div className="flex items-center gap-1">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => editor.chain().focus().setTextAlign("left").run()}
						className={cn(
							"h-8 w-8 p-0 transition-all",
							editor.isActive({ textAlign: "left" })
								? "bg-primary text-primary-foreground dark:bg-primary/80 border-primary/20 border shadow-sm dark:text-white"
								: "hover:bg-muted",
						)}
					>
						<AlignLeft className="h-4 w-4" />
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => editor.chain().focus().setTextAlign("center").run()}
						className={cn(
							"h-8 w-8 p-0 transition-all",
							editor.isActive({ textAlign: "center" })
								? "bg-primary text-primary-foreground dark:bg-primary/80 border-primary/20 border shadow-sm dark:text-white"
								: "hover:bg-muted",
						)}
					>
						<AlignCenter className="h-4 w-4" />
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => editor.chain().focus().setTextAlign("right").run()}
						className={cn(
							"h-8 w-8 p-0 transition-all",
							editor.isActive({ textAlign: "right" })
								? "bg-primary text-primary-foreground dark:bg-primary/80 border-primary/20 border shadow-sm dark:text-white"
								: "hover:bg-muted",
						)}
					>
						<AlignRight className="h-4 w-4" />
					</Button>
				</div>

				<div className="bg-border mx-1 h-6 w-px" />

				{/* Link */}
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={setLink}
					className={cn(
						"h-8 w-8 p-0 transition-all",
						editor.isActive("link")
							? "bg-primary text-primary-foreground dark:bg-primary/80 border-primary/20 border shadow-sm dark:text-white"
							: "hover:bg-muted",
					)}
				>
					<LinkIcon className="h-4 w-4" />
				</Button>

				{/* Color Picker */}
				<div className="flex items-center gap-1">
					<input
						type="color"
						onChange={(e) => setTextColor(e.target.value)}
						className="border-border h-8 w-8 cursor-pointer rounded border"
						title="Text Color"
					/>
				</div>

				<div className="bg-border mx-1 h-6 w-px" />

				{/* Undo/Redo */}
				<div className="flex items-center gap-1">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => editor.chain().focus().undo().run()}
						disabled={!editor.can().chain().focus().undo().run()}
						className="h-8 w-8 p-0"
					>
						<Undo className="h-4 w-4" />
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => editor.chain().focus().redo().run()}
						disabled={!editor.can().chain().focus().redo().run()}
						className="h-8 w-8 p-0"
					>
						<Redo className="h-4 w-4" />
					</Button>
				</div>

				{/* Add Image/Video/Text Buttons - Only show if callbacks are provided */}
				{(onAddImage || onAddVideo || onAddText) && (
					<>
						<div className="bg-border mx-1 h-6 w-px" />
						<div className="flex items-center gap-1">
							{onAddImage && (
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={onAddImage}
									className="h-8 px-2 text-xs"
									title="Add Image"
								>
									<ImageIcon className="mr-1.5 h-4 w-4" />
									Add Image
								</Button>
							)}
							{onAddVideo && (
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={onAddVideo}
									className="h-8 px-2 text-xs"
									title="Add Video"
								>
									<Video className="mr-1.5 h-4 w-4" />
									Add Video
								</Button>
							)}
							{onAddText && (
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={onAddText}
									className="h-8 px-2 text-xs"
									title="Add Text"
								>
									<FileText className="mr-1.5 h-4 w-4" />
									Add Text
								</Button>
							)}
						</div>
					</>
				)}
			</div>

			{/* Editor Content */}
			<div className="focus-within:ring-ring bg-background min-h-[200px] rounded-b-lg focus-within:ring-2 focus-within:ring-offset-2">
				<style
					dangerouslySetInnerHTML={{
						__html: `
            .ProseMirror {
              color: inherit !important;
            }
            .dark .ProseMirror {
              color: rgb(226 232 240) !important;
            }
            .dark .ProseMirror p,
            .dark .ProseMirror h1,
            .dark .ProseMirror h2,
            .dark .ProseMirror h3,
            .dark .ProseMirror li,
            .dark .ProseMirror span,
            .dark .ProseMirror div {
              color: rgb(226 232 240) !important;
            }
          `,
					}}
				/>
				<div className="text-foreground dark:text-slate-200">
					<EditorContent editor={editor} />
				</div>
			</div>

			{/* Link Dialog */}
			<Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Add Link</DialogTitle>
						<DialogDescription>
							Enter the URL and link text. The link text will be clickable and
							take you to the URL.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="link-url">URL</Label>
							<Input
								id="link-url"
								placeholder="https://example.com"
								value={linkUrl}
								onChange={(e) => setLinkUrl(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										handleLinkSubmit();
									}
								}}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="link-text">Link Text</Label>
							<Input
								id="link-text"
								placeholder="Click here"
								value={linkText}
								onChange={(e) => setLinkText(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										handleLinkSubmit();
									}
								}}
							/>
							<p className="text-muted-foreground text-xs">
								{editor?.state.selection.empty
									? "Enter the text that will be displayed as the link"
									: "Selected text will be used if left empty"}
							</p>
						</div>
					</div>
					<DialogFooter>
						{editor?.getAttributes("link").href && (
							<Button
								type="button"
								variant="destructive"
								onClick={handleRemoveLink}
							>
								Remove Link
							</Button>
						)}
						<Button
							type="button"
							variant="outline"
							onClick={() => setIsLinkDialogOpen(false)}
						>
							Cancel
						</Button>
						<Button
							type="button"
							onClick={handleLinkSubmit}
							disabled={!linkUrl.trim()}
						>
							Add Link
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
